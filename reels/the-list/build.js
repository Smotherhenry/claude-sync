// Orchestrates TTS generation per scene segment, then builds video cards + final export.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = 'C:\\reels\\the-list';
const AUDIO = path.join(ROOT, 'audio');
const VIDEO = path.join(ROOT, 'video');
for (const d of [AUDIO, VIDEO]) fs.mkdirSync(d, { recursive: true });

const VOICE_ID = '1d2e2ec2';
const INSTR_NORMAL = 'calm, slightly hoarse, mysterious true-crime narrator, quiet steady pace';
const INSTR_WHISPER = 'hushed whisper, very quiet, secretive, slightly hoarse, close to the microphone';

// Scenes: each has optional screenText (HUD overlay) and narration segments.
// seg.type: 'normal' | 'whisper'. seg.pauseAfter: seconds of silence to insert after this segment.
const scenes = [
  {
    n: 1,
    screenText: 'RULE 1\nNEVER TAKE CASH YOU CAN\u2019T EXPLAIN',
    segs: [
      { type: 'normal', text: "Three a.m. The last night clerk left a list under the register. Laminated. No name.", pauseAfter: 0.6 },
      { type: 'normal', text: "Rule number one... Never take cash you can't explain." },
    ],
  },
  {
    n: 2,
    screenText: '',
    segs: [
      { type: 'normal', text: "At 3:12, a man in a gray coat slides an envelope across the counter. Five hundred dollars. He says, \"Just ring up a pack of gum.\"", pauseAfter: 0.5 },
      { type: 'normal', text: "The list says: Banks ask. Feds ask harder." },
    ],
  },
  {
    n: 3,
    screenText: 'RULE 2\nTHE CAMERA THAT MATTERS',
    segs: [
      { type: 'normal', text: 'Rule two.', pauseAfter: 0.3 },
      { type: 'whisper', text: 'The camera over the register is not the one that matters.' },
    ],
  },
  {
    n: 4,
    screenText: 'RULE 3\nLYING TO A FEDERAL AGENT IS A CRIME\n18 U.S.C. \u00a7 1001',
    segs: [
      { type: 'normal', text: "The gray coat is gone. The next customer is a woman in a dark suit. Badge on her belt. She doesn't buy anything.", pauseAfter: 0.5 },
      { type: 'normal', text: 'Did you see anyone here tonight? Every answer is either the truth or a crime.' },
    ],
  },
  {
    n: 5,
    screenText: 'CASH $4,210 \u00b7 LOGGED $0\nSUSPICION 0% \u2192 6%',
    segs: [
      { type: 'normal', text: 'Cash on hand, four thousand two hundred ten. Logged, zero. Suspicion, six percent.', pauseAfter: 0.6 },
      { type: 'normal', text: 'Someone else has been counting too.' },
    ],
  },
  {
    n: 6,
    screenText: "RULE 4\nDON'T BE THE ONE WHO STAYS",
    segs: [
      { type: 'normal', text: 'Under the list, in handwriting that looks like yours...', pauseAfter: 0.4 },
      { type: 'whisper', text: "Rule four. Don't be the one who stays." },
    ],
  },
  {
    n: 7,
    screenText: 'PART 2 TOMORROW\nCOMMENT TAKE OR REFUSE',
    segs: [
      { type: 'normal', text: 'Part two tomorrow.', pauseAfter: 0.4 },
      { type: 'normal', text: 'Comment TAKE or REFUSE.', pauseAfter: 0.3 },
      { type: 'whisper', text: 'The majority writes part two.' },
    ],
  },
];

function log(msg) { console.log(`[build] ${msg}`); }

function ttsToFile(text, type, outFile) {
  if (fs.existsSync(outFile)) { log(`skip (exists) ${outFile}`); return; }
  const body = JSON.stringify({
    model: 'omnivoice',
    input: text,
    voice: VOICE_ID,
    instructions: type === 'whisper' ? INSTR_WHISPER : INSTR_NORMAL,
    response_format: 'mp3',
    speed: 0.95,
  });
  const tmp = outFile + '.raw';
  log(`TTS -> ${outFile} :: "${text.slice(0, 60)}..."`);
  execFileSync('curl', ['-s', '-X', 'POST', 'http://127.0.0.1:3900/v1/audio/speech',
    '-H', 'Content-Type: application/json', '-d', body, '-o', tmp, '-m', '300']);
  const buf = fs.readFileSync(tmp);
  if (buf.slice(0, 1).toString() === '{') {
    throw new Error(`TTS error for ${outFile}: ${buf.toString().slice(0, 500)}`);
  }
  fs.renameSync(tmp, outFile);
}

function ffprobeDuration(file) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1', file]).toString().trim();
  return parseFloat(out);
}

function makeSilence(seconds, outFile) {
  execFileSync('ffmpeg', ['-y', '-f', 'lavfi', '-i', `anullsrc=r=24000:cl=mono`,
    '-t', String(seconds), '-q:a', '9', outFile]);
}

// 1. Generate all TTS segments
for (const scene of scenes) {
  scene.segs.forEach((seg, i) => {
    const f = path.join(AUDIO, `s${scene.n}_seg${i}.mp3`);
    ttsToFile(seg.text, seg.type, f);
    seg.file = f;
  });
}
log('All TTS segments generated.');

// 2. Concat segments per scene with silence gaps -> scene_N.mp3, track duration
for (const scene of scenes) {
  const parts = [];
  scene.segs.forEach((seg, i) => {
    parts.push(seg.file);
    if (seg.pauseAfter) {
      const sfile = path.join(AUDIO, `s${scene.n}_pause${i}.mp3`);
      if (!fs.existsSync(sfile)) makeSilence(seg.pauseAfter, sfile);
      parts.push(sfile);
    }
  });
  const listFile = path.join(AUDIO, `s${scene.n}_list.txt`);
  fs.writeFileSync(listFile, parts.map(p => `file '${p.replace(/\\/g, '/')}'`).join('\n'));
  const outFile = path.join(AUDIO, `scene_${scene.n}.mp3`);
  execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', outFile]);
  scene.audioFile = outFile;
  scene.duration = ffprobeDuration(outFile);
  log(`Scene ${scene.n} audio duration: ${scene.duration.toFixed(2)}s`);
}

fs.writeFileSync(path.join(ROOT, 'scenes.json'), JSON.stringify(scenes.map(s => ({
  n: s.n, screenText: s.screenText, audioFile: s.audioFile, duration: s.duration,
  caption: s.segs.map(x => x.text).join(' '),
})), null, 2));

log('DONE_AUDIO_PHASE');
