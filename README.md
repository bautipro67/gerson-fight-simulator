# Gerson Fight Simulator: the Hammer of Justice

**▶ Play now: https://bautipro67.github.io/gerson-fight-simulator/**

Play the **Hammer of Justice** (Gerson Boom) fight, the secret boss of **DELTARUNE Chapter 4**, for free in your browser, on PC or mobile. No download needed.

![Gerson Fight Simulator](og.png)

- Susie fights alone and your SOUL turns **green**: turn the shield to block Gerson's spears, bounce his shells and survive the hammer swings.
- Every turn of the fight in order, with Gerson's story of the prophecy and the arena changing with each chapter he tells.
- Rude Buster gets batted back, your items get stolen, OKHeal impresses him, and the last turn ends with Susie's haircut, as in the game.
- The battle logic is ported from the original game, so it plays like the real fight.
- **Practice mode** (Bad Time Simulator style): face the attacks in order; lose your HP bar and the attack restarts, survive it and you move on. Pick the starting attack and 90 / 45 / 1 HP. Scores with ranks and a saved best for full runs. Direct link: [`?practice`](https://bautipro67.github.io/gerson-fight-simulator/?practice).
- **EQUIPMENT**: pick Susie's weapon and armors (Chapter 3 and 4 gear) and the items you bring.
- **Codes**: type a secret code in the Codes box under the game to unlock extras.
- **OPTIONS**: volume, easy mode (half damage), **SOUL hats** and **CONTROLS** to remap every button on keyboard and gamepad. Options are remembered in the browser.
- **Pause** with Esc / P (Start on a gamepad): continue, restart, volume, quit to title.
- **Sandbox mode** to repeat any attack freely: [`?sandbox&attack=0`](https://bautipro67.github.io/gerson-fight-simulator/?sandbox&attack=0) (`[` / `]` switch attacks, `I` invincibility).
- Touch controls on phones and tablets, fullscreen button.

Also by the same fan: [Jevil](https://bautipro67.github.io/jevil-fight-simulator/), [Spamton NEO](https://bautipro67.github.io/spamton-neo-fight-simulator/) and [Roaring Knight](https://bautipro67.github.io/roaring-knight-fight-simulator/) fight simulators. See [all the DELTARUNE fight simulators](https://bautipro67.github.io/).

## Controls

| Key | Action |
|---|---|
| Z / Enter | Confirm |
| X / Shift | Cancel |
| Arrow keys | Move / turn the green shield (two at once for diagonals) |
| Esc / P | Pause |

**Gamepad** (Xbox, PlayStation, Switch): A / Cross confirms, B / Circle cancels, D-pad or left stick moves, Start pauses. Browsers only turn on sound after a click or key press, so click the page once.

## Run it locally

```
python -m http.server 8000
```

Then open `http://localhost:8000`.

## How it was made

- `tools/datawin.py` reads GameMaker `data.win` files (sprites, fonts, sounds).
- `tools/gmdis.py` decompiles the game's bytecode so the fight could be studied.
- `tools/extract_assets.py` extracts only the assets this fight uses into `assets/` (Chapter 4).
- `tools/gml2js_obj.py` and `tools/gen_attacks.sh` translate Gerson's attack objects from the decompiled code; `tools/postfix.py` holds the hand fixes.
- `tools/stamp_version.py` stamps a version on every file before publishing, so browsers never mix old and new files.
- `src/runtime/` is a small GameMaker-like engine in JavaScript; `src/battle/` and `src/gerson/` are the ported fight.

## Credits

DELTARUNE and all its characters, graphics, music and sounds are © Toby Fox. This is a free, non-commercial fan project, not affiliated with Toby Fox or 8-4. If you enjoy it, get the real game: https://deltarune.com

---

*Simulador de la pelea contra el Martillo de la Justicia (Gerson) de DELTARUNE, jugable gratis en el navegador.*
