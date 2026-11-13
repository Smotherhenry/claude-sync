---
name: reel
description: Erstellt ein vertikales Reel (9:16, 1080x1920, MP4) mit lokalen Werkzeugen. Nutzen, wenn der Nutzer /reel eingibt oder ein Reel, Short oder TikTok-Video erstellen will. Antworte immer auf Deutsch.
---

# /reel – Reel-Erstellung

Antworte immer auf Deutsch. Arbeite in einem eigenen Ordner `C:\reels\<kurzer-name>\`
(kurzer Pfad, wegen der Windows-Pfadlänge).

## Schritt 0: Stilprofil wählen und lesen
Stilprofile liegen unter `C:\Users\paulh\.claude\skills\reel\styles\<name>\`. Jeder dieser
Ordner enthält `<name>.md` UND direkt daneben, im selben Ordner, die Foto-/Video-Referenzen
dazu (jpg/png/mp4/mov) — alles zu einem Profil bleibt in einem Ordner zusammen.

- Nennt der Aufruf einen Profilnamen (z.B. `/reel style1 reddit`) → genau dieses Profil laden.
- Fehlt der Name und es gibt genau ein Profil → das nehmen.
- Fehlt der Name und es gibt mehrere Profile → kurz fragen, welches gemeint ist.
- Gibt es noch kein Profil → neuen Ordner `styles\<name>\` mit `<name>.md` nach demselben
  Aufbau wie `styles/style1/style1.md` anlegen.

Lies die gewählte `<name>.md` vollständig und wende sie an, ohne danach erneut zu fragen.
Felder, die dort leer oder mit `____` markiert sind, erfragst du jetzt kurz (nur die wirklich
leeren, nicht alles neu) und trägst die Antwort anschließend per Edit dort ein, damit sie beim
nächsten Mal nicht mehr fehlt.

**Referenzen (Abschnitt 9 des Profils):** Schau im selben Ordner `styles\<name>\` nach Bild-/
Videodateien. Liegen welche da, aber die Tabelle in Abschnitt 9 ist leer, frage kurz nach, was
an jeder Datei genau übernommen werden soll (Farben, Schnitt-Tempo, Schriftstil, Kameraführung,
Übergänge, Stimmung ...), und trag die Antwort ein. Nutze diese Referenzen dann aktiv beim
Bauen in Schritt 4 (z.B. Farben/Schrift aus einem Referenzbild übernehmen, Schnitt-Rhythmus
eines Referenzvideos nachbilden) — nicht nur als Deko in der Datei.

Wenn der Nutzer in diesem Aufruf ausdrücklich etwas anderes will als im Profil steht
(z.B. "diesmal fröhlich statt gruselig"), gilt das nur für diesen einen Durchlauf — frage, ob
das Profil dauerhaft geändert werden soll, und ändere es nur nach einem Ja.

## Schritt 1: Story-Quelle klären
Die Quelle wird JEDES MAL im Aufruf selbst festgelegt, nicht im Profil — sie ist von Mal zu
Mal unterschiedlich. Lies die Argumente des `/reel`-Aufrufs:

- Enthalten sie "reddit" (oder ähnlich: "story suchen", "reddit story") → Weg A.
- Enthalten sie ein Skript/einen Text (oder "skript", "mit folgendem text", ein längerer
  eingefügter Text, ein Dateipfad) → Weg B.
- Ist es nicht eindeutig (z.B. nur `/reel style1` ohne weitere Angabe) → kurz nachfragen,
  welcher der beiden Wege diesmal gewünscht ist. Nicht raten und nicht aus dem Profil ableiten.

**A) Reddit-Suche**
- Durchsuche die im Profil (Abschnitt 1) genannten Subreddits (oder passende, falls leer) per
  WebSearch/Browser nach Geschichten, die zu Genre und Mindest-Upvotes passen.
- Zeige 3–5 Kandidaten mit Titel, Subreddit, Link und 1-Satz-Zusammenfassung. Keine ganzen
  Texte wörtlich zitieren (Urheberrecht) — selbst zu einem Erzähl-Skript umschreiben.
- Lass den Nutzer eine Story wählen, BEVOR du weiterarbeitest.

**B) Eigenes Skript**
- Nutzer liefert den Text direkt oder als Datei. Übernimm ihn, kürze/strukturiere ihn fürs
  Reel-Tempo aus dem Profil.

## Schritt 2: Skript & Szenenplan erstellen
- Hook in den ersten 2 Sekunden (Stil aus Profil-Abschnitt 6), dann kurze Szenen (2–4 s),
  Call-to-Action am Ende.
- Zeige Skript und Szenenliste dem Nutzer und hole ein "Ja", BEVOR du Audio/Video erzeugst.

## Schritt 3: Vertonung mit VoiceStudio
- Nutze VoiceStudio lokal (kein Key, keine Kosten) für die Sprachausgabe, Stimmprofil nach
  Profil-Abschnitt 3.
- Voraussetzung: VoiceStudio-App läuft und die lokale Laufzeit ist installiert. Falls nicht,
  sag das klar und biete an, sie zu starten/prüfen, statt einfach auf Text-only auszuweichen.
- Exportiere die Audiodatei (WAV/MP3) in den Projektordner.

## Schritt 4: Bild/Video bauen
- Werkzeuge je nach Bedarf und Verfügbarkeit:
  - **ffmpeg** für Schnitt, Untertitel-Einbrennen, Audio-Mix, Export. Falls es fehlt, Installation
    (`winget install Gyan.FFmpeg`) vorher erfragen.
  - **Playwright** (global installiert) für animierte Text-/HTML-Szenen, als Frames/Video erfasst.
  - **Bild-/Videogenerierung** (z.B. Canva oder ein anderer vom Nutzer genannter Dienst) NUR auf
    ausdrücklichen Wunsch — braucht ggf. einen Account/API-Key und kann Kosten verursachen. Key
    nie selbst eingeben oder abfragen.
- Format: 1080x1920, 30 fps, H.264, AAC, `-pix_fmt yuv420p`, `-movflags +faststart`.
- Text im sicheren Bereich (≈150 px oben/unten, 60 px seitlich), Farben/Schrift/Untertitel-Stil
  und Logo nach Profil-Abschnitt 4, Referenzen aus Abschnitt 9 aktiv einbeziehen (siehe Schritt 0).
- Musik nur aus eigenen Dateien des Nutzers (Profil-Abschnitt 5) oder eindeutig lizenzfrei.

## Schritt 5: Export je Plattform
- Nutze die Tabelle in Profil-Abschnitt 7 (Format, Maximallänge, Dateiname-Schema) und
  erzeuge für jede dort angehakte Plattform eine passend zugeschnittene/benannte Datei.
- Hochladen selbst macht NIEMALS dieser Skill — nur die fertige(n) Datei(en) bereitstellen.

## Schritt 6: Prüfen und liefern
- Prüfe jede Ausgabedatei mit `ffprobe` (Auflösung, Dauer, Audiospur vorhanden) und einem
  Vorschau-Frame.
- Schicke die fertigen Dateien mit `SendUserFile`.
- Nenne Pfad, Dauer, Größe je Datei und was nicht umgesetzt werden konnte.

## Grenzen
- Nichts auf Instagram, TikTok, YouTube usw. hochladen oder posten.
- Keine Käufe, keine Konten anlegen, keine Keys eingeben.
- Keine echten Personen imitieren, keine fremden Stimmen klonen ohne deren ausdrückliche
  Zustimmung.
- Reddit-Inhalte nie wörtlich kopieren, nur sinngemäß umschreiben.
- Bei Downloads (Modelle, Schriften, Musik, Programme) vorher Name, Quelle, Größe nennen und
  fragen.
