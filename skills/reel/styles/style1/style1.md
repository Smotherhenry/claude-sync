# Stilprofil: style1

Dieses Profil wird verwendet, wenn du `/reel style1 ...` aufrufst. Leere Felder werden beim
nächsten Mal erfragt und hier ergänzt. Fotos/Videos als Referenz legst du direkt in diesen
Ordner (`styles\style1\`), neben diese Datei (siehe Abschnitt 9).

## 1. Quelle der Story
Wird NICHT hier festgelegt, sondern jedes Mal direkt im Befehl, z.B.:
`/reel style1 reddit` oder `/reel style1 skript: <mein Text>`
Nur die Einstellungen für die Reddit-Suche gelten hier als Vorgabe, falls diese Quelle
gewählt wird:
- Subreddits: ____
- Genre: ____
- Mindest-Upvotes: ____

## 2. Ton und Erzählweise
- Stimmung: gruselig, spannende Erzählung (Atmosphäre wichtiger als Schock-Effekte), ruhig
- Perspektive: meistens neutraler Erzähler, manchmal Dialog-Einschübe
- Tempo: eher ruhig/getragen
- Sprache: Englisch

## 3. Stimme (VoiceStudio)
- Stimmprofil / geklonte Referenzstimme: `voice_isolated_attempt.mp3` (im selben Ordner) —
  per ffmpeg aus `audio_6af6ecbf4c7487.91392957.mp3` isoliert (Mitte-Extraktion + Filter),
  Stimme vom Nutzer als "perfekt, etwas raschelig" bestätigt. Für diese Störung in VoiceStudio
  bei Bedarf ein Rauschfilter/Denoise vor dem Klonen anwenden.
- Männlich/weiblich/neutral, Tonlage (tief/hoch), Sprechgeschwindigkeit: ____
- Betonung/Emotion (monoton vs. ausdrucksstark): ____

## 4. Bild und Text
- Hintergrund: möglichst NAH an den Referenzen (Abschnitt 9) — Grafikstil/Artworks 1:1
  am Vorbild orientieren, nicht nur grob ähnlich
- Farbpalette: wie in den Referenzvideos — fast schwarzer Hintergrund (~#0D0D0D) mit grellem
  Pink/Magenta (~#FF2D78) als Akzentfarbe
- Schriftart und Schriftgröße: fett, weiß, serifenlos (ähnlich Referenzvideos), gut lesbar
- Untertitel-Stil: weißer Text, einzelne Schlüsselwörter in Pink/Magenta hervorgehoben
- Logo/Wasserzeichen: kein Logo

## 5. Musik
- Keine eigene Musikdatei — passende lizenzfreie/stimmungspassende Musik auswählen, die die
  gruselige, ruhige Atmosphäre (Abschnitt 2) unterstützt, ähnlich der Stimmung in den Referenzen
- Lautstärke relativ zur Stimme: deutlich leiser als die Stimme, Stimme muss klar verständlich bleiben

## 6. Aufbau
- Ziel-Länge: ____ Sekunden
- Hook-Satz-Stil (erste 2 Sekunden): ____
- Call-to-Action am Ende (z.B. "folge für mehr"): ____

## 7. Export & Upload-Vorgaben je Plattform
(Ich lade nichts automatisch hoch — das bleibt bei dir. Diese Angaben
bestimmen nur, wie die fertige Datei zugeschnitten/benannt wird.)

| Plattform   | Format      | Max. Länge | Dateiname-Schema       |
|-------------|-------------|------------|-------------------------|
| Instagram   | 1080x1920   | 90s        | style1_ig_<titel>.mp4   |
| TikTok      | 1080x1920   | 60s        | style1_tiktok_<titel>.mp4 |

## 8. Sonstiges
- Dinge, die NIE vorkommen sollen: keine Vorgabe
- Dinge, die IMMER vorkommen sollen: keine Vorgabe

## 9. Referenz-Fotos & -Videos
Lege Dateien direkt in diesen Ordner `styles/style1/` ab, neben `style1.md`
(Bilder: jpg/png, Videos: mp4/mov).
Trag hier kurz ein, WAS an jeder Datei nachgeahmt werden soll — ohne diese Angabe wird
die Referenz nur allgemein als "ungefähr so" verwendet:

| Datei | Was genau übernehmen? (Farben, Schnitt-Tempo, Schriftstil, Bildkomposition, Kameraführung, Übergänge, Stimmung ...) |
|-------|------------------------------------------------------------------------------------------------------------------|
| ____  | ____                                                                                                                |
