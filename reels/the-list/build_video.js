// Builds per-scene video cards from scenes.json, concatenates, adds ambient bed, exports.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = 'C:\\reels\\the-list';
const VIDEO = path.join(ROOT, 'video');
fs.mkdirSync(VIDEO, { recursive: true });

const scenes = JSON.parse(fs.readFileSync(path.join(ROOT, 'scenes.json'), 'utf-8'));

const W = 1080, H = 1920, FPS = 30;
const BG = '0x0D0D0D';
const PINK = '0xFF2D78';
const FONT = 'C\\:/Windows/Fonts/arialbd.ttf'; // escaped for ffmpeg filter arg

function log(m) { console.log(`[video] ${m}`); }

function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars) { lines.push(cur.trim()); cur = w; }
    else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\\\\\').replace(/:/g, '\\:').replace(/'/g, "\u2019");
}

function buildSceneVideo(scene) {
  const outFile = path.join(VIDEO, `scene_${scene.n}.mp4`);
  if (fs.existsSync(outFile)) { log(`skip (exists) ${outFile}`); return outFile; }
  const dur = scene.duration + 0.5; // small tail

  const filters = [];
  // Screen text (HUD rule/status card), centered upper-middle, pink accent on first line
  if (scene.screenText) {
    const lines = scene.screenText.split('\n');
    lines.forEach((line, i) => {
      const isFirst = i === 0;
      const color = isFirst ? PINK : 'white';
      const size = isFirst ? 54 : 46;
      const yExpr = `(h*0.30)+${i * 70}`;
      filters.push(
        `drawtext=fontfile='${FONT}':text='${esc(line)}':fontcolor=${color}:fontsize=${size}:` +
        `x=(w-text_w)/2:y=${yExpr}:box=0:line_spacing=10:expansion=none`
      );
    });
  }
  // Narration caption, lower third, white, wrapped
  const capLines = wrap(scene.caption, 28).slice(0, 4);
  const capStartY = scene.screenText ? 'h*0.72' : 'h*0.42';
  capLines.forEach((line, i) => {
    filters.push(
      `drawtext=fontfile='${FONT}':text='${esc(line)}':fontcolor=white:fontsize=44:` +
      `x=(w-text_w)/2:y=${capStartY}+${i * 58}:box=1:boxcolor=0x0D0D0D@0.55:boxborderw=14:line_spacing=8:expansion=none`
    );
  });

  const vf = filters.join(',');
  const args = [
    '-y', '-f', 'lavfi', '-i', `color=c=${BG}:s=${W}x${H}:d=${dur}:r=${FPS}`,
    '-i', scene.audioFile,
    '-vf', vf,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '44100',
    '-shortest',
    outFile,
  ];
  log(`Rendering scene ${scene.n} (${dur.toFixed(2)}s)`);
  execFileSync('ffmpeg', args);
  return outFile;
}

const sceneFiles = scenes.map(buildSceneVideo);

// Concat all scene videos
const listFile = path.join(VIDEO, 'concat_list.txt');
fs.writeFileSync(listFile, sceneFiles.map(f => `file '${f.replace(/\\/g, '/')}'`).join('\n'));
const rawFull = path.join(VIDEO, 'full_raw.mp4');
log('Concatenating scenes...');
execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', rawFull]);

function ffprobeDuration(file) {
  return parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1', file]).toString().trim());
}
const totalDur = ffprobeDuration(rawFull);
log(`Total duration: ${totalDur.toFixed(2)}s`);

// Ambient mood bed: two low sine tones with slow amplitude wobble, mixed quiet under narration.
const musicFile = path.join(VIDEO, 'ambient_bed.wav');
log('Generating ambient bed...');
execFileSync('ffmpeg', ['-y',
  '-f', 'lavfi', '-i', `sine=frequency=82:duration=${totalDur}`,
  '-f', 'lavfi', '-i', `sine=frequency=123:duration=${totalDur}`,
  '-filter_complex',
  `[0:a]volume=0.05,tremolo=f=0.15:d=0.3[a0];[1:a]volume=0.03,tremolo=f=0.12:d=0.25[a1];[a0][a1]amix=inputs=2:duration=longest[aout]`,
  '-map', '[aout]', musicFile]);

// Final mix: narration (from full_raw video's audio) + ambient bed, narration stays dominant.
const finalFile = path.join(ROOT, 'the-list_final.mp4');
log('Mixing final audio + video...');
execFileSync('ffmpeg', ['-y',
  '-i', rawFull, '-i', musicFile,
  '-filter_complex', '[0:a][1:a]amix=inputs=2:duration=first:weights=1 1[aout]',
  '-map', '0:v', '-map', '[aout]',
  '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
  '-movflags', '+faststart',
  finalFile]);

log(`DONE -> ${finalFile}`);
