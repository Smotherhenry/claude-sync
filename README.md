# claude-sync

Geräteübergreifende Ablage für:
- `skills/reel` – Reel-Erstellungs-Skill mit Stilprofil `style1`
- `skills/graphify` – Codebase-Wissensgraph-Skill
- `reels/the-list` – Projektdateien von "The List" (Skript, Audio, Video, Referenzen)

## Einrichtung auf einem neuen Gerät
1. Repo klonen: `git clone <repo-url> claude-sync`
2. Skills verlinken/kopieren:
   - Windows: Inhalt von `skills/reel` nach `%USERPROFILE%\.claude\skills\reel` kopieren
   - Inhalt von `skills/graphify` nach `%USERPROFILE%\.claude\skills\graphify` kopieren
3. Reel-Projekt bei Bedarf nach `C:\reels\the-list` kopieren (oder dort weiterarbeiten, wo es liegt).

## claude-mem Gedächtnis in einer Claude-Code-Cloud-Sitzung wiederherstellen

Funktioniert NUR in einer echten Cloud-Sitzung von Claude Code (mit Shell-Zugriff),
NICHT im normalen Browser-Chat auf claude.ai.

1. Dieses Repo in der Cloud-Sitzung klonen (oder ist bereits vorhanden).
2. claude-mem frisch installieren: `npx claude-mem install --setup defer`
3. Worker stoppen, falls er schon läuft: `npx claude-mem stop` (falls vorhanden)
4. Die mitgelieferte Datenbank einspielen:
   ```bash
   cp memory/claude-mem/claude-mem.db* ~/.claude-mem/
   cp memory/chroma/chroma.sqlite3 ~/.claude-mem/chroma/
   ```
5. Worker neu starten: `npx claude-mem start`

Hinweis: `memory/claude-mem/settings.json` ist nur zur Referenz beigelegt (ohne Secrets/Tokens,
die waren beim Export alle leer) — nicht automatisch überschreiben, sondern bei Bedarf einzelne
Werte manuell übernehmen.
