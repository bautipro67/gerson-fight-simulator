// What the self test plays in the Gerson simulator (see tools/selftest/runner.js for the helpers).
// Each scenario: name, settings (G.settings while it runs), start(ctx), until(ctx) (its end; none
// for the sandbox runs, which only have to run without errors), frames (the most it may take),
// and optionally status(ctx) (shown when it does not end), input(ctx, frame) (returns
// true when it played the frame itself) and menu(ctx) (the battle menu option to take instead of FIGHT).
export const title = 'Gerson Fight Simulator';

export function scenarios({ S, sandbox, has, first }) {
  const ending = () => has(/^obj_sim_ending$/);
  const battle = () => has(/^obj_battlecontroller$/);
  const list = [
    { name: 'story: the Magic Axe scene, the whole fight, the win scenes and the farewell', settings: { scenes: true, intro: true },
      start: () => S.startGersonFight(), until: ending, end: 'the result screen', frames: 40000 },
    { name: 'the whole fight with SCENES off', settings: { scenes: false, intro: true },
      start: () => S.startGersonFight(), until: ending, end: 'the result screen', frames: 30000 },
    { name: 'after a loss: the scene, TRY AGAIN, the rematch question and "Go Susie!"', settings: { scenes: true },
      start: () => S.startGersonAfterScene('lose'), until: battle, end: 'the battle', frames: 12000 },
    { name: 'the rematch answered "Sorry, not enough time."', settings: { scenes: true },
      start: () => S.startGersonRematch(),
      input: ({ first: f, press, KEY }) => {
        const ch = f('obj_choicer_neo');
        if (ch && ch.canchoose == 1 && ch.mychoice < 0) { press(KEY.right, 0); return true; }
        return false;
      },
      until: ending, end: 'the result screen', frames: 6000 },
    { name: 'practice mode, every attack in order', start: () => sandbox.startPractice({ start: 0, hp: 90 }),
      until: ctx => ctx.practiceDone(), status: ctx => ctx.practiceStatus(), end: 'the practice results', frames: 40000 },
  ];
  sandbox.ATTACKS.forEach((a, i) => list.push({
    name: `sandbox ${i}: ${a[2]}`, sandbox: true, frames: 1500,
    start: () => sandbox.startSandbox(new URLSearchParams('attack=' + i)),
  }));
  return list;
}
