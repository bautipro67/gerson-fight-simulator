// The end screen. With SCENES on it comes after the arena's scene (src/gerson/scenes.js) and only shows
// the result and TRY AGAIN / TITLE. With SCENES off it stands in for that scene: on a win (Susie's
// finishing move and the haircut) the first lines of the win scene over gerson_defeated.ogg; when
// Susie falls, the first lines of the loss scene. Then the result and the menu.
import {
  G, global, Instance, defineObject, defineScript, S, instance_create, instance_exists, draw_sprite_ext,
  draw_set_color, draw_set_font, draw_set_alpha, draw_rectangle,
} from '../runtime/gm.js?v=20261114013728';
import { snd_init, mus_loop_ext, mus_volume, mus_stop } from '../runtime/audio.js?v=20261114013728';
import { startBattle } from '../battle/setup.js?v=20261114013728';
import { gotoRoom, scr_darkbox, fadeOut, centerText } from './common.js?v=20261114013728';

const BS = String.fromCharCode(92);
// Susie's lines carry her face (\F S), Gerson's switch to his voice with no face (\F0 \Tg).
const SUSIE = e => BS + 'TX ' + BS + 'F0 ' + BS + 'E' + e + ' ' + BS + 'FS ' + BS + 'TS %';
const GERSON = BS + 'TX ' + BS + 'F0 ' + BS + 'Tg %';
const LINES = {
  // obj_dw_church_arena, after the haircut
  win: {
    msg: [
      SUSIE('2'), BS + "E2* H..^1. How's that^1, old man!?/%",
    ],
    msg2: [
      GERSON, '* Wahahahahaha!^1! That was the most fun I ever had!/',
      SUSIE('9'), BS + 'E9* See how I used my healing just now!?/',
      GERSON, '* Geheheheh!/%',
    ],
    title: 'YOU GAVE THE HAMMER OF JUSTICE A HAIRCUT!',
    color: 0xffff00,
    sprite: 'spr_gerson_headtilt_nohair',
    music: 'gerson_defeated.ogg',
  },
  // obj_dw_church_arena, after Susie falls
  lose: {
    msg: [
      SUSIE('V'), BS + "EV* ..^1. damn..^1. I..^1. couldn't keep up.../",
      GERSON, '* Geheheh..^1. well^1, you gave it your best shot!/%',
    ],
    title: 'THE HAMMER OF JUSTICE WON...',
    color: 0xffffff,
    sprite: 'spr_gerson_laugh',
    music: null,
  },
};

class Ending extends Instance {
  create() {
    this.depth = 2;
    this.kind = 'win';
    this.con = 0;
    this.t = 0;
    this.writer = null;
    this.cur_jewel = 0;
    this.titlealpha = 0;
    this.afterScene = false;
    this.music = null;
  }
  // msg: pairs of [face line, text], as scr_anyface + msgnext write them.
  say(lines) {
    global.fc = 0;
    global.typer = 6;
    global.msg = new Array(100).fill('%%');
    lines.forEach((s, i) => { global.msg[i] = s; });
    this.writer = instance_create(58, 340, 'obj_writer');
    this.writer.dialoguer = 1;
    this.face = instance_create(54, 344, 'obj_face');
    this.face.depth = 1;
  }
  step() {
    const d = LINES[this.kind];
    this.t += 1;
    if (this.afterScene && this.con == 0) {
      this.con = 1;
      this.second = true;
    }
    if (this.con == 0 && this.t == 1 && d.music && !this.music) {
      this.music = snd_init(d.music);
      mus_loop_ext(this.music, 1, 1);
    }
    if (this.con == 0 && this.t >= 45) {
      this.con = 1;
      this.say(d.msg);
    }
    // the win scene goes on after Susie's line (the music starts there in the game)
    if (this.con == 1 && !instance_exists(this.writer) && d.msg2 && !this.second) {
      this.second = true;
      this.say(d.msg2);
    }
    if (this.con == 1 && !instance_exists(this.writer)) {
      this.con = 3;
      this.t = 0;
      global.fc = 0;
      const menu = instance_create(236, 360, 'obj_sim_heartmenu');
      menu.setup(['TRY AGAIN', 'TITLE'], (i) => {
        if (this.music) mus_volume(this.music, 0, 20);
        fadeOut(20, () => {
          if (this.music) mus_stop(this.music);
          if (i == 0) {
            if (G.settings?.scenes !== false) S.startGersonRematch();
            else startBattle({ intro: G.settings?.intro !== false, retry: true });
          }
          else S.startTitle();
        });
      }, 'fnt_mainbig', 32);
    }
  }
  draw() {
    const d = LINES[this.kind];
    const a = this.con >= 3 ? 1 : Math.min(1, this.t / 30);
    const bob = Math.cos(this.t / 8) * 8;
    void bob;
    draw_sprite_ext(d.sprite, this.con >= 1 ? Math.min(3, this.t / 3) : 0, 250, 90, 2, 2, 0, 0xffffff, a);
    if (this.con >= 1 && this.con <= 2) {
      draw_set_color(0);
      draw_rectangle(38, 326, 602, 464, false);
      scr_darkbox(this, 24, 312, 616, 478);
    }
    if (this.con >= 3) {
      this.titlealpha = Math.min(1, this.titlealpha + 0.05);
      draw_set_alpha(this.titlealpha);
      draw_set_font('fnt_mainbig');
      draw_set_color(d.color);
      centerText(320, 300, d.title);
      draw_set_alpha(1);
    }
  }
}
defineObject('obj_sim_ending', Ending);

defineScript('startEnding', (kind, opts = {}) => {
  gotoRoom();
  global.fighting = 0;
  const e = instance_create(0, 0, 'obj_sim_ending');
  e.kind = kind === 'lose' ? 'lose' : 'win';
  e.afterScene = !!opts.afterScene;
});
