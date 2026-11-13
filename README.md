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
