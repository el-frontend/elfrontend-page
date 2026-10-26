# v4 · Signal (creator bento)

Chosen variant **A · Signal** from the Claude Design canvas
https://claude.ai/artifact/EaRERh1qGoaSCep463zLLQ (variants B · Caribe and C · Console were not picked).

- `signal-desktop.dc.html`: 1440px fluid page (12-column bento, stacks at narrow widths)
- `signal-phone.dc.html`: 390px phone layout

These are prototypes in the canvas's Design Component format (`<x-dc>` markup, a
`DCLogic` class for state, images as canvas `/_blob/` ids). Match the visuals; the
implementation lives in `src/modules/v4/` and is served at `/`.

## Tokens

| Token | Dark | Light |
|---|---|---|
| bg | `#0C0D10` | `#F3F3EF` |
| surface 1 | `#15171C` | `#FFFFFF` |
| surface 2 | `#1B1E25` | `#ECECE6` |
| line | `#2A2E37` | `#DCDCD4` |
| text | `#F2F3F5` | `#121316` |
| muted | `#A2A8B3` | `#575C66` |
| accent | `#FF6A3D` | `#FF6A3D` |
| text on accent | `#140803` | `#140803` |
| accent as text | `#FF6A3D` | `#A8350E` |

Type: Bricolage Grotesque 700/800 (display), Geist (body), Geist Mono (labels).
Radii: tiles 24px, inner media 14px, buttons 14px / pills 999px. Gap 16px.
