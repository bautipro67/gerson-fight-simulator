// The green SOUL's shield and spears (Chapter 4): obj_spearblocker (the shield, steered with the
// arrows; turning into an incoming spear just before it lands is a JUST block), obj_spearshot (spears,
// shells, red hammers, long notes...), scr_spearpattern / scr_spearpattern_reset (an enemy's
// queued attack list), scr_spearshot (what each queued entry spawns), and the small effects:
// obj_spearblocker_piece, obj_shield_just_particle, obj_just_text, obj_green_heart_particle,
// obj_follow_spear, obj_arrow_long_particle.
//
// The Hammer of Justice and the Sound of Justice share this code; only the Hammer is ported, so the
// Sound of Justice branches (statue sounds, shadow power colours) are left out.
import {
  G, global, Instance, defineObject, defineScript, instance_create, instance_create_depth, instance_destroy, instancesOf,
  instance_find, instance_number, lengthdir_x, lengthdir_y, lerp, angle_difference, point_direction, point_distance,
  draw_sprite_ext, draw_self, d3d_set_fog, draw_set_alpha, draw_set_color, draw_line, draw_circle, draw_text,
  draw_set_halign, merge_color, make_color_rgb, choose, random, irandom, snd_play, snd_stop, snd_volume, snd_is_playing,
  up_p, down_p, left_p, right_p, up_h, down_h, left_h, right_h, sprite_set_offset, S,
} from './rt.js?v=20261113214419';
import { first, i_ex, camerax, cameray, camerawidth, cameraheight, scr_bullet_init, snd_play_pitch, snd_play_x, scr_afterimage } from './common.js?v=20261113214419';

const HEART = 'obj_heart';
const BLOCKER = 'obj_spearblocker';
const SPEAR = 'obj_spearshot';
const GERSON = 'obj_hammer_of_justice_enemy';

// d_line / d_circle: draw_line / draw_circle (with a 1 px offset on consoles only).
const d_line = (x1, y1, x2, y2) => draw_line(x1, y1, x2, y2);
const d_circle = (x, y, r, outline) => draw_circle(x, y, r, outline);
const scr_wrap = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ---------------------------------------------------------------- the attack list

export function scr_spearpattern_reset(self) {
  self.attackcount = 0;
  self.attackcountmax = 0;
  self.list_attackdirection = [];
  self.list_attackspeed = [];
  self.list_attackframes = [];
  self.list_attackspecial = [];
  self.list_attackspecial2 = [];
  self.list_attackwait = [];
  for (let i = 0; i < 100; i++) {
    self.list_attackdirection[i] = 0;
    self.list_attackspeed[i] = 0;
    self.list_attackframes[i] = 0;
    self.list_attackspecial[i] = 0;
    self.list_attackspecial2[i] = 0;
    self.list_attackwait[i] = 5;
  }
}

const SPEAR_DIRS = { u: 270, d: 90, r: 180, l: 0, dr: 135, dl: 45, ur: 225, ul: 315 };
const SPEAR_SPOTS = {
  right1: [75, -36, 270], right2: [75, 36, 270], up1: [-36, -75, undefined], up2: [50, -75, -3],
  left1: [-75, -36, 90], left2: [-75, 36, 90], down1: [-36, 75, 180], down2: [36, 75, 180],
  diag1: [90, -90, 315], diag2: [-90, -90, 45], diag3: [-90, 90, 135], diag4: [90, 90, 225],
};
// scr_spearpattern(direction, speed, frames, special, wait[, special2])
export function scr_spearpattern(self, a0, a1, a2, a3, a4, a5) {
  let d = a0, s = a1, f = a2;
  if (typeof a0 === 'string') {
    if (a0 in SPEAR_DIRS) d = SPEAR_DIRS[a0];
    const spot = SPEAR_SPOTS[a0];
    if (spot) {
      d = spot[0];
      s = spot[1];
      if (spot[2] !== undefined) f = spot[2];
    }
  }
  const n = self.attackcountmax;
  self.list_attackdirection[n] = d;
  self.list_attackspeed[n] = s;
  self.list_attackframes[n] = f;
  self.list_attackspecial[n] = a3;
  self.list_attackwait[n] = a4;
  if (a5 !== undefined) self.list_attackspecial2[n] = a5;
  self.attackcountmax += 1;
}

// A spear / shell / hammer flying at the shield: placed at (-9999, -9999) and put on its line by
// its first Step.
function newSpear(dir, spd, frames, extra) {
  const s = instance_create(-9999, -9999, SPEAR);
  s.special = 0;
  s.direction = dir;
  s.fakespeed = spd;
  s.len = spd * frames;
  s.image_angle = s.direction;
  return Object.assign(s, extra);
}

const SWINGDOWN_SPECIAL = [0, 4, 1, 3, 2, 4, 1, 3, 2];
// Fixed teleport spots of the swing-down hammers (scr_spearshot special 4), from the box centre.
const SWINGDOWN_SPOTS = {
  10: (gt, h) => [gt.x + 116, h.y + 26, 0], 11: gt => [gt.x + 116, gt.y + 55, 0], 12: gt => [gt.x - 116, gt.y - 65, 180],
  13: gt => [gt.x + 116, gt.y + 41, 0], 14: gt => [gt.x - 116, gt.y - 49, 180], 15: gt => [gt.x - 116, gt.y + 41 - 40, 180],
  16: gt => [gt.x + 116, gt.y - 49 + 46, 0], 17: gt => [gt.x - 41, gt.y + 115, 270], 18: gt => [gt.x + 7, gt.y + 115, 270],
};

// scr_spearshot(a0, a1, a2, special, special2): the enemy always calls it with five arguments.
export function scr_spearshot(self, a0, a1, a2, a3, a4) {
  const gers = first(GERSON);
  const gt = first('obj_growtangle');
  const heart = first(HEART);
  const blocker = first(BLOCKER);
  const hideGerson = () => {
    if (gers && gers.visible) {
      gers.visible = false;
      const t = instance_create(gers.x + 45, gers.y + 45, 'obj_gerson_teleport');
      t.depth = gers.depth;
    }
  };
  if (a3 === 1) instance_create(self.x - 5, self.y + 4, 'obj_gerson_green_switch');
  else if (a3 === 2) {
    const ham = instance_create(heart.x - 20, heart.y - 20, 'obj_giant_hammer');
    ham.type = 2;
    ham.dir = a0;
  } else if (a3 === 3) {
    for (const b of instancesOf(BLOCKER)) b.diagonal_transform = 1;
    for (const e of instancesOf(GERSON)) e.diagonal_enabled = 1;
  } else if (a3 === 400) {
    hideGerson();
  } else if (a3 === 4) {
    hideGerson();
    let t;
    if (a2 === -5) {
      t = instance_create(camerax() + a0, cameray() + a1, 'obj_gerson_teleport');
      t.type = 2;
      t.swingdowntype = -3;
      t.image_alpha = 0;
      t.image_angle = 90;
    } else if (a2 === -4 || a2 === -3) {
      const ex = gers.swingdown_ex;
      t = instance_create(gt.x + a0 + lengthdir_x(130, ex * 45), gt.y + a1 + 20 + lengthdir_y(130, ex * 45), 'obj_gerson_teleport');
      t.type = 2;
      t.swingdowntype = a2;
      t.image_angle = ex * 45;
      t.image_alpha = 0;
      gers.swingdown_ex += 1;
      if (a2 === -4 && gers.swingdown_ex >= 1 && gers.swingdown_ex <= 8) t.special = SWINGDOWN_SPECIAL[gers.swingdown_ex];
    } else if (SWINGDOWN_SPOTS[a2]) {
      const [x, y, ang] = SWINGDOWN_SPOTS[a2](gt, heart);
      t = instance_create(x, y, 'obj_gerson_teleport');
      t.type = 2;
      t.swingdowntype = a2;
      if (ang) t.image_angle = ang;
      else if (a2 === 16) t.image_angle = 0;
      t.image_alpha = 0;
    } else {
      t = instance_create(camerax() + a0, cameray() + a1, 'obj_gerson_teleport');
      t.type = 2;
      t.swingdowntype = a2;
      t.image_alpha = 0;
    }
  } else if (a3 === 5) instance_create(a0, a1, 'obj_gerson_box_hit_controller');
  else if (a3 === 6) instance_create(a0, a1, 'obj_gerson_bell_attack_controller');
  else if (a3 === 7) instance_create(a0, a1, 'obj_gerson_hammer_bro_attack_controller');
  else if (a3 === 8) gers.goldcon = 1;
  else if (a3 === 9) {
    gers.sprite_index = 'spr_gerson_laugh';
    gers.state = 12;
  } else if (a3 === 10 || a3 === 10.5) {
    gers.visible = false;
    gers.sprite_index = 'spr_gerson_idle';
    gers.state = 0;
    const t = a3 === 10 ? instance_create(gers.x + 45, gers.y + 45, 'obj_gerson_teleport') : instance_create(gers.x + 60, gers.y + 35, 'obj_gerson_teleport');
    t.type = 10;
    if (a3 === 10) global.turntimer = 2;
  } else if (a3 === 11) {
    if (gers.visible) instance_create(gers.x + 45, gers.y + 45, 'obj_gerson_teleport');
    const t = instance_create(gt.x - 150, gt.y + 15, 'obj_gerson_teleport');
    t.type = 4;
  } else if (a3 === 12) {
    hideGerson();
    if (gt) {
      const t = instance_create(gt.x + 150, gt.y + 15, 'obj_gerson_teleport');
      t.type = 5;
    }
  } else if (a3 === 13) {
    if (gers) {
      gers.visible = false;
      const t = instance_create_depth(self.x, self.y, self.depth, 'obj_gerson_squishes_box');
      t.type = 5;
    }
  } else if (a3 === 14) {
    if (blocker) {
      const s = instance_create(blocker.x + lengthdir_x(a2, a0 + 180), blocker.y + lengthdir_y(a2, a0 + 180), SPEAR);
      Object.assign(s, { direction: a0, fakespeed: 0, len: a2, image_alpha: 0, fadespear: 1, fadespeed: 25, fadespeartimermax: a1 });
      s.image_angle = s.direction;
      s.fadespeardist = a4;
    }
  } else if (a3 === 16) newSpear(a0, a1, a2, { swingaround: 1 });
  else if (a3 === 17 || a3 === 18) {
    const s = instance_create(blocker.x + lengthdir_x(a2, a0 + 180), blocker.y + lengthdir_y(a2, a0 + 180), SPEAR);
    Object.assign(s, { direction: a0, fakespeed: 0.2, len: a2, image_alpha: 0, fadespear: a3 === 17 ? 3 : 4, fadewaitmax: a1 });
    s.image_angle = s.direction;
  } else if (a3 === 19) newSpear(a0, a1, a2, { bouncespear: 1, hp: 2, maxhp: 2 });
  else if (a3 === 20) newSpear(a0, a1, a2, { bouncespear: 2, hp: 3, maxhp: 3 });
  else if (a3 === 20.1) newSpear(a0, a1, a2, { bouncespear: 2, hp: 2, maxhp: 2 });
  else if (a3 === 21) newSpear(a0, a1, a2, { bouncespear: 2, hp: 9, maxhp: 9 });
  else if (a3 === 21.6) newSpear(a0, a1, a2, { bouncespear: 1, hp: 6, maxhp: 6 });
  else if (a3 === 21.65) newSpear(a0, a1, a2, { bouncespear: 2, hp: 6, maxhp: 6 });
  else if (a3 === 21.66) newSpear(a0, a1, a2, { bouncespear: 2, hp: 5, maxhp: 5 });
  else if (a3 === 21.9) newSpear(a0, a1, a2, { bouncespear: 1, hp: 9, maxhp: 9 });
  else if (a3 === 22) newSpear(a0, a1, a2, { bouncespear: 2, fastbounce: 1, hp: 3, maxhp: 3 });
  else if (a3 === 23) self.fasterheart = true;
  else if (a3 === 24) {
    const t = instance_create(a0, a1, 'obj_gerson_speen');
    t.type = 6;
    t.user0?.();
  } else if (a3 === 25) {
    const s = instance_create(-9999, -9999, SPEAR);
    Object.assign(s, { direction: a0, fakespeed: a1, len: a1 * a2, longspear: 1 });
    s.image_angle = s.direction;
    s.longnotepieces = a4;
  } else if (a3 === 26) {
    global.monsterattackname[self.myself] = 'gerson rudebuster';
    const dc = S.scr_bulletspawner(self, self.x, self.y, 'obj_dbulletcontroller');
    dc.type = 250;
  } else if (a3 === 27) {
    const t = instance_create(self.x, self.y, 'obj_gerson_growtangle_transform');
    t.shrink = true;
  } else if (a3 === 28) self.swingdown_multitelegraph = a0;
  else if (a3 === 29) instance_create(self.x, self.y, 'obj_gerson_darken');
  else if (a3 === 30) newSpear(a0, a1, a2, { breakshield: 1, sprite_index: 'spr_spear_arrow' });
  else if (a3 === 31) instance_create(self.x, self.y, 'obj_gerson_growtangle');
  else if (a3 === 32) {
    if (gt) {
      let s;
      if (a2 >= 0 || a2 === -3) {
        s = instance_create(gt.x + a0, gt.y + a1, 'obj_gerson_swing_down_new');
        s.image_angle = a2;
        s.direction = a2 + 270;
        s.gravity_direction = a2 + 270;
        if (a2 === -3) s.version = 1;
      }
      if (a2 === -1) {
        s = instance_create(gt.x + 70, heart.y, 'obj_gerson_swing_down_new');
        s.image_angle = 270;
        s.direction = 540;
        s.gravity_direction = 540;
      }
      if (a2 === -2) {
        s = instance_create(gt.x - 70, heart.y, 'obj_gerson_swing_down_new');
        s.image_angle = 90;
        s.direction = 360;
        s.gravity_direction = 360;
      }
    }
  } else if (a3 === 33) {
    for (const d of instancesOf('obj_gerson_darken')) d.con = 1;
  } else if (a3 === 34) {
    if (self.introtalkcon === 0) self.introtalkcon = 1;
  } else if (a3 === 35) newSpear(a0, a1, a2, { redhammer: 1, grav: 0.3 });
  else if (a3 === 355) newSpear(a0, a1, a2, { redhammer: 1, redhammerfakeout: 1 });
  else if (a3 === 36) {
    if (!i_ex(BLOCKER)) instance_create(self.x, self.y, BLOCKER);
  } else if (a3 === 37) {
    const o = first('obj_gerson_darkness_overlay');
    if (o) o.scalecon = a0;
  } else if (a3 === 38) snd_play_x('snd_soundbattle_leadin', 1, a0);
  else if (a3 === 39) snd_play_x('snd_soundbattle_leadin_short', 1, a0);
  else if (a3 === 40) newSpear(a0, a1, a2, { bouncespear: 1, slowbounce: 1, hp: 3, maxhp: 3 });
  else if (a3 === 40.4) newSpear(a0, a1, a2, { bouncespear: 1, slowbounce: 1, hp: 2, maxhp: 2 });
  else if (a3 === 40.5) newSpear(a0, a1, a2, { bouncespear: 2, slowbounce: 1, hp: 4, maxhp: 4 });
  else if (a3 === 40.6) newSpear(a0, a1, a2, { bouncespear: 2, slowbounce: 1, hp: 3, maxhp: 3, gigashell: true });
  else if (a3 === 40.75) newSpear(a0, a1, a2, { bouncespear: 2, slowbounce: 1, hp: 3, maxhp: 3 });
  else if (a3 === 41) newSpear(a0, a1, a2, { bouncespear: 2, slowbounce: 2, hp: 3, maxhp: 3 });
  else if (a3 === 41.1) newSpear(a0, a1, a2, { bouncespear: 2, slowbounce: 2, hp: 3, maxhp: 3, gigashell: true });
  else if (a3 === 42) newSpear(a0, a1, a2, { bouncespear: 2, slowbounce: 3, hp: 3, maxhp: 3 });
  else if (a3 === 42.1) newSpear(a0, a1, a2, { bouncespear: 2, slowbounce: 3, hp: 2, maxhp: 2, gigashell: true });
  else if (a3 === 42.2) newSpear(a0, a1, a2, { bouncespear: 2, slowbounce: 4, hp: 3, maxhp: 3, gigashell: true });
  else if (a3 === 43) {
    if (blocker) Object.assign(blocker, { shadowpowertarget: a0, shadowpowertimermax: a1, shadowpowercon: 1, shadowpowertimer: 0 });
  } else if (a3 === 50) instance_create(a0, a1, 'obj_box_throw_controller');
  else if (a3 === 51) instance_create(a0, a1, 'obj_hammer_bounce_controller');
  else if (a3 === 52) instance_create(a0, a1, 'obj_gerson_shell_kick_controller');
  else if (a3 === 53) instance_create(a0, a1, 'obj_gerson_box_rumble_controller');
  else if (a3 === 54) {
    // (the Sound of Justice's red flash)
  } else if (a3 === 55) {
    for (const b of instancesOf(BLOCKER)) b.vanish = 1;
    for (const s of instancesOf(SPEAR)) instance_destroy(s);
    S.scr_heartcolor('red');
  } else {
    const s = newSpear(a0, a1, a2, {});
    s.special = a3;
    s.swingaround = a4;
    if (a3 > 20) {
      s.image_angle = a3;
      if (s.image_angle === 360) s.image_angle = 0;
    }
  }
}
defineScript('scr_spearpattern', scr_spearpattern);
defineScript('scr_spearpattern_reset', scr_spearpattern_reset);
defineScript('scr_spearshot', scr_spearshot);

// scr_heartcolor("red" | "yellow")
defineScript('scr_heartcolor', c => {
  if (c === 'red' || c === 0) {
    for (const h of instancesOf(HEART)) {
      h.color = 0;
      h.sprite_index = 'spr_dodgeheart';
    }
  }
  if (c === 'yellow' || c === 1) {
    for (const h of instancesOf(HEART)) {
      h.color = 1;
      h.sprite_index = 'spr_yellowheart';
    }
    for (const g of instancesOf('obj_grazebox')) g.sprite_index = 'spr_grazeappear_yellow';
  }
});

// ---------------------------------------------------------------- obj_spearshot

class SpearShot extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_nothing';
  }
  create() {
    scr_bullet_init(this);
    Object.assign(this, {
      image_speed: 0, fakespeed: 2, len: 100, grav: 0, hp: 2, maxhp: 2, destroyonhit: 1, special: 0, giant: 0, after: -1,
      swingaround: false, redhammer: 0, redhammersiner: 0, spearblockerx: 0, spearblockery: 0, redhammerfakeout: 0,
      redhammersign: 0, introlen: 50, introdirection: 50, timer: 0, siner: 0, testtimer: 0, testcon: 0, init: 0,
      x1: this.x, y1: this.y, x2: this.x, y2: this.y, x3: 0, y3: 0, dir2: this.direction + 120, savedir: 0, fadespear: 0,
      fadespeartimer: 0, fadespeartimermax: 0, fadespeardist: 80, fadespeed: 8, fadewaitmax: 10, flashalpha: 0,
      extra_angle: 0, savex: this.x, savey: this.y, type: 0, bouncespear: 0, bouncespeartimer: 0, bouncespearcon: 0,
      bouncespeardir: 0, frozentimer: 0, hitstopbounce: 0, fastbounce: 0, slowbounce: 0, shakeduration: 0,
      shakeintensity: 2, pink1: make_color_rgb(255, 127, 184), pink2: make_color_rgb(255, 178, 212),
      pink3: make_color_rgb(255, 204, 226), spinindex: 3, longspear: 0, longnotebeingheld: false, longnotepieces: 30,
      longnoteindex: 0, pitchcount: 30, breakshield: 0, leadinsfx: 0, willhitnextframe: false, hurtsquish: false,
      gigashell: false,
    });
    this.len2 = this.len;
    const ov = first('obj_gerson_darkness_overlay');
    if (ov) this.depth = ov.depth + 1;
  }
  step() {
    const blocker = first(BLOCKER);
    if (!i_ex(HEART) || !blocker || global.turntimer < 1) {
      instance_destroy(this);
      return;
    }
    if (this.frozentimer > 0) {
      this.frozentimer -= 1;
      return;
    }
    if (this.bouncespear > 0) {
      if (this.bouncespearcon === 0) {
        this.sprite_index = 'spr_bounce_shell_idle';
        this.image_xscale = 1.5;
        this.image_yscale = 1.5;
        this.savedir = this.direction;
        this.bouncespearcon = -1;
        this.testcon = 0;
      }
      if (this.bouncespearcon === 1) {
        this.image_index += 1;
        this.bouncespeartimer += 1;
        if (this.bouncespeartimer === 5) {
          this.bouncespearcon = 2;
          this.fakespeed = -20;
          this.grav = 1.2;
          if (this.bouncespear === 1) this.sprite_index = 'spr_bounce_shell_idle';
          if (this.bouncespear === 2) {
            if (this.sprite_index !== 'spr_bounce_shell_hit_center') {
              this.image_index = 1;
              this.sprite_index = 'spr_bounce_shell_hit_center';
              if (this.direction === 270) this.y -= 16;
              if (this.direction === 180) this.x -= 16;
              if (this.direction === 90) this.y += 16;
              if (this.direction === 0) this.x += 16;
            }
            this.fakespeed = -17;
            this.grav = 1;
            if (this.hitstopbounce === 1) {
              this.fakespeed = -19;
              this.grav = 1.25;
            }
            if (this.fastbounce === 1) {
              this.fakespeed = -38;
              this.grav = 6;
            }
          }
          const SLOW = { 1: [-10, 0.35], 2: [-10, 0.25], 3: [-10, 0.2], 4: [-11, 0.24] }[this.slowbounce];
          if (SLOW) [this.fakespeed, this.grav] = SLOW;
          this.bouncespeartimer = 0;
        } else return;
      } else this.hurtsquish = false;
      if (this.bouncespearcon === 2) {
        this.x3 += 1;
        if (this.bouncespear === 1) {
          this.x = Math.round(blocker.x + lengthdir_x(this.len, this.direction + 180));
          this.y = Math.round(blocker.y + lengthdir_y(this.len, this.direction + 180));
        }
        if (this.bouncespear === 2) {
          this.bouncespeartimer += 1;
          this.fakespeed += this.grav;
          this.len -= this.fakespeed;
          let duration = 34;
          if (this.hitstopbounce === 1) duration = 30;
          if (this.fastbounce === 1) duration = 12;
          const SLOWD = { 1: [60, 54], 2: [80, 74], 3: [100, 94], 4: [110, 104] }[this.slowbounce];
          if (SLOWD) duration = this.hitstopbounce === 1 ? SLOWD[1] : SLOWD[0];
          duration += this.testcon;
          this.spinindex = this.bouncespeartimer / duration * 14.5;
          let sd = this.savedir;
          if (this.bouncespeardir === 0) {
            sd = this.savedir + 270;
            if (this.bouncespeartimer <= duration) sd = lerp(this.savedir + 180, this.savedir + 270, this.bouncespeartimer / duration);
            this.direction = this.savedir + 90;
          }
          if (this.bouncespeardir === 180) {
            sd = this.savedir + 90;
            if (this.bouncespeartimer <= duration) sd = lerp(this.savedir + 180, this.savedir + 90, this.bouncespeartimer / duration);
            this.direction = this.savedir - 90;
          }
          this.x = blocker.x + lengthdir_x(this.len, sd);
          this.y = blocker.y + lengthdir_y(this.len, sd);
        }
      }
    }
    if (this.fadespear === 1) {
      this.image_alpha += 0.1;
      this.fadespeartimer += 1;
      if (this.fadespeartimer === 1) {
        this.savedir = this.direction;
        this.savex = this.x;
        this.savey = this.y;
        this.type = choose(0, 1);
      }
      const k = this.fadespeartimer / this.fadespeartimermax, d = this.fadespeardist;
      const a = this.image_angle;
      if (a === 0 || a === 180) this.y = lerp(this.type === 1 ? this.savey + d : this.savey - d, this.savey, k);
      if (a === 90 || a === 270) this.x = lerp(this.type === 1 ? this.savex + d : this.savex - d, this.savex, k);
      if (this.fadespeartimer === this.fadespeartimermax) {
        this.speed = 0;
        this.direction = this.savedir;
        this.fakespeed = this.fadespeed;
        this.fadespeartimer = 0;
        this.fadespear = 0;
        this.init = 1;
      }
      return;
    }
    if (this.fadespear === 3 || this.fadespear === 4) {
      if (this.fadespear === 3) {
        if (this.image_alpha === 0) this.savedir = this.direction;
        this.image_alpha = lerp(this.image_alpha, 1.8, 0.16);
      } else this.image_alpha += 0.1;
      this.fadespeartimer += 1;
      if (this.fadespeartimer === 1) this.fakespeed = -0.5;
      if (this.fadespeartimer === 20) this.fakespeed = 0;
      if (this.fadespeartimer === this.fadewaitmax - 12) {
        snd_play_pitch('snd_bell_bounce_short', 1.3);
        this.sprite_index = 'spr_spear_arrow_highlight';
        this.flashalpha = 1;
      }
      if (this.fadespeartimer === this.fadewaitmax) {
        this.fakespeed = 15;
        this.init = 1;
      }
      if (this.fadespeartimer < this.fadewaitmax) {
        if (this.fadespear === 4) {
          if (this.len < 190) this.direction += 1;
          else this.direction -= 1;
        }
        this.len -= this.fakespeed;
        this.x = blocker.x + lengthdir_x(this.len, this.direction + 180);
        this.y = blocker.y + lengthdir_y(this.len, this.direction + 180);
        return;
      }
    }
    const rotateradius = this.giant || this.redhammer ? 70 : 90;
    const a = this.bouncespearcon === 2 && this.bouncespear === 2 ? 1 : 0;
    if ((this.special === 0 || (this.special !== 0 && this.len > rotateradius)) && a === 0) {
      this.fakespeed += this.grav;
      this.len -= this.fakespeed;
    }
    if (this.special !== 0 && this.len <= rotateradius) {
      this.len = rotateradius;
      let sp = this.special;
      if (sp === 360) sp = 0;
      for (let r = 0; r < 20; r++) {
        const dir = this.direction - sp;
        let diff = dir;
        if (Math.abs(dir) > 180) diff = this.direction > sp ? -1 * (360 - this.direction + sp) : 360 - sp + this.direction;
        if (this.direction === sp) { /* already there */ } else if (diff > 2) this.direction -= 1;
        else if (diff < 2) this.direction += 1;
        else this.direction = sp;
        if (this.direction > 360) this.direction -= 360;
        if (this.direction < 0) this.direction += 360;
        if (sp === this.direction) this.special = 0;
      }
    }
    if (this.redhammer !== 0) {
      this.spearblockerx = blocker.x;
      this.spearblockery = blocker.y;
      this.x1 = this.spearblockerx + lengthdir_x(this.len, this.direction + 180);
      this.y1 = this.spearblockery + lengthdir_y(this.len, this.direction + 180);
    } else {
      this.x1 = blocker.x + lengthdir_x(this.len, this.direction + 180);
      this.y1 = blocker.y + lengthdir_y(this.len, this.direction + 180);
    }
    if (this.init === 0) {
      this.init = 1;
      this.dir2 = this.direction + 90;
      this.len2 = this.len + 50;
    }
    if (this.timer < 25 && this.swingaround === 1) {
      this.timer += 1;
      this.dir2 = lerp(this.dir2, this.direction + 180, this.timer / 25);
      this.len2 = lerp(this.len2, this.len, this.timer / 25);
      this.x = blocker.x + lengthdir_x(this.len2, this.dir2);
      this.y = blocker.y + lengthdir_y(this.len2, this.dir2);
    } else if (this.bouncespearcon !== 2) {
      this.x = this.x1;
      this.y = this.y1;
    }
    if (this.len < 50) this.user0();
  }
  // Reaching the shield: blocked (JUST if the shield turned just before), or the SOUL is hit.
  user0() {
    const heart = first(HEART);
    if (!heart) {
      instance_destroy(this);
      return;
    }
    if (this.redhammer) {
      if (this.x < camerax() - 30 || this.x > camerax() + camerawidth() + 30 || this.y < cameray() - 30 || this.y > cameray() + cameraheight() + 30) instance_destroy(this);
    }
    const blocker = first(BLOCKER);
    if (!blocker) return;
    let shielddir = blocker.image_angle + 180;
    if (shielddir >= 360) shielddir -= 360;
    let breakshield = false;
    let shieldlength = 50, shieldradius = 36;
    if (blocker.diagonal_enabled === 1) {
      shieldlength = 30;
      shieldradius = 46;
    }
    this.longnotebeingheld = false;
    const parryradius = shieldradius;
    if (this.bouncespear === 1 && this.hp === 1) shieldradius -= 30;
    if (this.bouncespear === 2 && this.bouncespearcon === 2 && this.sprite_index === 'spr_bounce_shell_hit_center') shieldradius += 10;
    if (this.longspear === 1 && blocker.diagonal_enabled === 0) shieldradius += 5;
    if (this.redhammer) shieldradius += 15;
    let dontblockshell = false;
    const dh = point_distance(this.x, this.y, heart.x + 10, heart.y + 10);
    if (this.bouncespear === 1 && (this.len > 36 || dh > 36)) dontblockshell = true;
    if (this.bouncespear === 2 && (this.len > 46 || dh > 46)) dontblockshell = true;
    if (this.bouncespear > 0 && (this.shakeduration > 0 || (this.bouncespearcon === 2 && this.fakespeed < 0))) dontblockshell = true;
    // (the decompiler could not rebuild this condition; read from the bytecode)
    const facing = (Math.abs(angle_difference(shielddir, this.image_angle)) < shieldlength && this.bouncespear !== 2)
      || (Math.abs(angle_difference(shielddir, this.direction)) < shieldlength && this.bouncespear === 2);
    if (this.len < shieldradius && !dontblockshell && facing) {
      if (this.redhammer === 1) breakshield = true;
      else if (this.longspear === 1) {
        this.longnotebeingheld = true;
        this.len = shieldradius;
        this.x = blocker.x + lengthdir_x(this.len, this.direction + 180);
        this.y = blocker.y + lengthdir_y(this.len, this.direction + 180);
        return;
      } else {
        if (blocker.just > 0) {
          S.scr_tensionheal(2.5);
          if (this.bouncespear > 0 && this.hp > 1) {
            snd_play('snd_parry_fast_nodelay');
            blocker.parryflashtimer = 6;
            this.spinindex = 0;
          } else snd_play('snd_bell_bounce_short');
          blocker.justflash = 1.8;
          blocker.user1();
        } else {
          S.scr_tensionheal(1.25);
          if (this.giant === 0) snd_play('snd_bell');
        }
        blocker.image_angle = blocker.idealdir;
        blocker.bullethitid = this;
        blocker.user0();
        if (this.bouncespear > 0 && this.hp > 1) {
          this.x3 = 0;
          if (this.shakeduration !== 5) this.hp -= 1;
          this.bouncespearcon = 1;
          this.savedir = this.direction;
          this.sprite_index = this.bouncespear === 1 ? 'spr_bounce_shell_squish2' : 'spr_bounce_shell_squish';
          this.image_angle = this.direction;
          this.image_index = 1;
          this.len = parryradius - (this.bouncespear === 1 || this.bouncespear === 2 ? 12 : 5);
          this.x = blocker.x + lengthdir_x(this.len, this.direction + 180);
          this.y = blocker.y + lengthdir_y(this.len, this.direction + 180);
          this.bouncespeartimer = 0;
          this.shakeduration = 5;
          this.hitstopbounce = 1;
        } else {
          if (this.bouncespear === 2) {
            this.len = parryradius - 10;
            this.x = blocker.x + lengthdir_x(this.len, this.direction + 180);
            this.y = blocker.y + lengthdir_y(this.len, this.direction + 180);
            const scale = this.gigashell ? 1 : 0.75;
            const anim = instance_create(this.x, this.y, 'obj_gerson_animation');
            anim.sprite_index = 'spr_bounce_shell_idle';
            anim.spinindex = this.spinindex - 0.5;
            anim.image_xscale = scale;
            anim.image_yscale = scale;
            anim.image_angle = point_direction(this.x, this.y, heart.x + 10, heart.y + 10);
            anim.image_speed = 60;
          }
          if (breakshield) this.user1();
          instance_destroy(this);
        }
        return;
      }
    }
    let heartcollisionlen = 16;
    if (this.bouncespear > 0) heartcollisionlen = 2;
    if (this.bouncespearcon === 2 && this.sprite_index !== 'spr_bounce_shell_hit_center') heartcollisionlen -= 10;
    if (this.bouncespear === 2) heartcollisionlen += 14;
    let hitheart = false;
    if (this.len < heartcollisionlen) {
      const a = Math.max(0, (global.hp[2] - 30) / 250);
      this.damage = lerp(12, 90, a);
      if (this.redhammer) {
        breakshield = true;
        hitheart = true;
        global.inv = -1;
        S.scr_damage(this);
      } else {
        S.scr_damage(this);
        if (this.bouncespear > 0) {
          this.x3 = 0;
          this.hp = 0;
          this.bouncespearcon = 1;
          this.savedir = this.direction;
          this.sprite_index = this.bouncespear === 1 ? 'spr_bounce_shell_squish2' : 'spr_bounce_shell_squish';
          this.image_angle = this.direction;
          this.image_index = 1;
          this.len = parryradius - 40;
          this.x = blocker.x + lengthdir_x(this.len, this.direction + 180);
          this.y = blocker.y + lengthdir_y(this.len, this.direction + 180);
          this.bouncespeartimer = 0;
          this.shakeduration = 5;
          this.hitstopbounce = 1;
          this.hurtsquish = true;
        }
        if ((this.bouncespear > 0 && this.hp < 1) || this.bouncespear === 0) {
          if (breakshield) this.user1();
          instance_destroy(this);
        }
      }
    }
    if (breakshield) shatterShield(this, hitheart);
  }
  // The red hammer broke through: the SOUL turns red again.
  user1() {
    for (const h of instancesOf(HEART)) {
      h.color = 0;
      h.sprite_index = 'spr_dodgeheart';
    }
    for (const b of instancesOf(BLOCKER)) b.vanish = 1;
    for (const s of instancesOf(SPEAR)) instance_destroy(s);
  }
  cleanUp() {
    snd_stop('snd_organ_enemy_loop_temp');
  }
  draw() {
    const heart = first(HEART);
    if (!heart) {
      instance_destroy(this);
      return;
    }
    const blocker = first(BLOCKER);
    let shakelen = 0, shakedir = 0;
    if (this.shakeduration > 0) {
      this.shakeduration -= 1;
      if (this.shakeduration === 2) shakelen = -4;
      if (this.shakeduration === 4) shakelen = 4;
      if (this.shakeduration === 0) shakelen = 0;
      shakedir = this.direction + 90;
    }
    const ox = lengthdir_x(shakelen, shakedir), oy = lengthdir_y(shakelen, shakedir);
    if (this.longspear === 1) this.image_index = this.longnotebeingheld ? 1 : 0;
    if ((this.fadespear === 3 || this.fadespear === 4) && blocker) this.image_angle = point_direction(this.x, this.y, blocker.x, blocker.y);
    if (this.redhammer === 1) {
      this.redhammersiner += 1;
      const col = merge_color(0xffffff, 0xff0000, 0.4 + Math.sin(this.redhammersiner / 8) / 3);
      let shakex = 0;
      if (this.redhammerfakeout === 1) {
        this.redhammersiner += 1;
        if (this.redhammersiner === 350) this.fakespeed = 0;
        if (this.redhammersiner === 410) {
          this.fakespeed = -15;
          this.grav = 3;
        }
        if (this.redhammersiner > 420) {
          const af = scr_afterimage(this);
          af.sprite_index = 'spr_gerson_red_hammer';
          af.image_blend = col;
          af.image_xscale = 2;
          af.image_yscale = 2;
          af.fadeSpeed = 0.15;
        }
        if (this.redhammersiner > 200 && this.redhammersiner < 410) shakex = random(4);
        this.redhammersign = this.redhammersiner % 2 === 0 ? -1 : 1;
      }
      draw_sprite_ext('spr_gerson_red_hammer', 3, this.x + shakex * this.redhammersign + ox, this.y + oy, 2, 2, this.image_angle, col, this.image_alpha);
    } else if (this.bouncespear > 0) {
      const SHELL = { 8: this.pink3, 7: this.pink2, 6: this.pink1, 5: 0xff0000, 4: 0x800080, 3: 0x00ffff, 2: 0x00ff00, 1: 0xffff00 };
      const shellcolor = SHELL[this.hp] ?? 0xffffff;
      const scale = this.gigashell ? 1 : 0.75;
      const angle = point_direction(this.x, this.y, heart.x + 10, heart.y + 10);
      if (this.bouncespearcon === -1) this.spinindex += 0.5;
      if (this.bouncespear === 1) this.spinindex = 0;
      if (!(this.len < -20)) {
        const colour = {
          spr_bounce_shell_idle: 'spr_bounce_shell_idle_color', spr_bounce_shell_hit_center: 'spr_bounce_shell_hit_center_color',
          spr_bounce_shell_squish: 'spr_bounce_shell_squish_color', spr_bounce_shell_squish2: 'spr_bounce_shell_squish2_color',
        }[this.sprite_index];
        if (colour) draw_sprite_ext(colour, this.spinindex, this.x + ox, this.y + oy, scale, scale, angle, shellcolor, this.image_alpha);
        draw_sprite_ext(this.sprite_index, this.spinindex, this.x + ox, this.y + oy, scale, scale, angle, this.image_blend, this.image_alpha);
      }
    } else {
      draw_sprite_ext(this.sprite_index, this.image_index, this.x + ox, this.y + oy, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
    }
    if (this.flashalpha > 0) {
      this.flashalpha -= 0.1;
      const scale = lerp(2, 0, this.flashalpha);
      d3d_set_fog(true, 0xffffff, 0, 1);
      draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale + scale, this.image_yscale + scale, this.image_angle, 0xffffff, this.flashalpha);
      d3d_set_fog(false, 0xffffff, 0, 0);
    }
    if (this.longspear === 1) this.drawLongNote();
  }
  drawLongNote() {
    const ang = this.image_angle;
    draw_sprite_ext('spr_spear_arrow_long_piece', this.longnotebeingheld ? 1 : 0, this.x + lengthdir_x(1, ang + 180), this.y + lengthdir_y(1, ang + 180), this.image_xscale * this.longnotepieces, this.image_yscale, ang, this.image_blend, this.image_alpha);
    const barlength = this.longnotepieces * 2 - 2;
    if (!this.longnotebeingheld) return;
    if (this.longnotepieces % 1 === 0) {
      for (let r = 0; r < 3; r++) {
        for (const [off, dy] of [[3, -3], [2, -2], [1, -1], [-1, -1], [-2, -2]]) {
          const p = instance_create(this.x + lengthdir_x(barlength - random(Math.abs(this.fakespeed)), ang + 180) + lengthdir_x(off, ang + 270), this.y + dy + lengthdir_y(barlength, ang + 180) + lengthdir_y(off, ang + 270), 'obj_arrow_long_particle');
          p.image_index = 3;
        }
      }
    }
    for (const p of instancesOf('obj_arrow_long_particle')) p.direction = ang + 180 - 45 + irandom(90);
    this.longnoteindex += 1;
    if (this.longnoteindex === 1) this.damage = Math.round(this.damage / 2);
    const scale = 1.5;
    if (choose(0, 1) === 1) draw_sprite_ext('spr_sparks2', this.longnoteindex, this.x + lengthdir_x(1, ang + 180), this.y + lengthdir_y(1, ang + 180), scale, scale, ang, this.image_blend, this.image_alpha);
    else draw_sprite_ext('spr_sparks2', this.longnoteindex + 2, this.x + lengthdir_x(1, ang + 180), this.y + lengthdir_y(1, ang + 180), scale, -scale, ang, this.image_blend, this.image_alpha);
    snd_stop('snd_organ_enemy_loop_temp');
    this.pitchcount -= 1;
    snd_play_pitch('snd_organ_enemy_loop_temp', Math.max(0.5, 2 - this.pitchcount / 60));
    this.longnotepieces -= Math.ceil(this.fakespeed / 2);
    if (this.longnotepieces < 0) {
      const inst = instance_create_depth(this.x, this.y, this.depth - 1000, 'obj_animation');
      Object.assign(inst, { sprite_index: 'spr_finisher_explosion_quick', image_speed: 1, image_angle: ang, image_xscale: 0.2, image_yscale: 0.2 });
      snd_play_x('snd_queen_punched_lower_heavy', 0.5, 2);
      instance_destroy(this);
    }
  }
}
defineObject(SPEAR, SpearShot);

// The shield breaks into pieces (a red hammer got through): obj_spearshot Other_10's end.
function shatterShield(spear, hitheart) {
  for (const h of instancesOf(HEART)) {
    const anim = instance_create(h.x + 10, h.y + 10, 'obj_animation');
    Object.assign(anim, { sprite_index: 'spr_finisher_explosion', image_speed: 0.5, image_index: 0, image_xscale: 1, image_yscale: 1 });
    h.color = 0;
    h.sprite_index = 'spr_heart';
    const fake = instance_create(h.x, h.y, 'obj_gerson_fakeheart');
    if ([0, 90, 180, 270].includes(spear.image_angle)) fake.directionhit = spear.image_angle;
    fake.speed = 12;
    fake.friction = 0.6;
    if (hitheart) for (const m of instancesOf('obj_event_manager')) m.trigger_event?.(1);
  }
  for (const b of instancesOf(BLOCKER)) {
    snd_play('snd_queen_punched_lower_heavy');
    const ang = b.image_angle;
    const piece = (x, y, a, idx, spr) => {
      const p = instance_create(x, y, 'obj_spearblocker_piece');
      p.image_angle = a;
      if (idx !== undefined) p.image_index = idx;
      if (spr) p.sprite_index = spr;
      return p;
    };
    const p1 = piece(b.x + lengthdir_x(32, ang - 35), b.y + lengthdir_y(32, ang - 35), ang, 1);
    const p2 = piece(b.x + lengthdir_x(32, ang + 35), b.y + lengthdir_y(32, ang + 35), ang, 0);
    const circ = 'spr_green_circle_piece';
    const p3 = piece(b.x + lengthdir_x(30, 45), b.y + lengthdir_y(30, 45), 0, undefined, circ);
    const p4 = piece(b.x + lengthdir_x(30, 135), b.y + lengthdir_y(30, 135), 90, undefined, circ);
    const p5 = piece(b.x + lengthdir_x(30, 225), b.y + lengthdir_y(30, 225), 180, undefined, circ);
    const p6 = piece(b.x + lengthdir_x(30, 315), b.y + lengthdir_y(30, 315), 270, undefined, circ);
    const set = (p, v, h) => { p.vspeed = v; p.hspeed = h; };
    const a = spear.image_angle;
    if (a === 0 || a === 180) {
      const s = a === 0 ? 1 : -1;
      set(p1, -9 - random(6), s * (4 + random(2)));
      set(p2, 5 + random(6), s * (4 + random(2)));
      set(p3, -9 - random(6), s * (4 + random(2)));
      set(p4, -9 - random(6), s * (4 + random(2)));
      set(p5, 5 + random(6), s * (4 + random(2)));
      set(p6, 5 + random(6), s * (4 + random(2)));
    }
    if (a === 270) {
      set(p1, 1 - random(6), 7 + random(4));
      set(p2, 1 - random(6), -7 - random(4));
      set(p3, 1 + random(6), 7 + random(4));
      set(p4, 1 + random(6), -7 - random(4));
      set(p5, 1 - random(6), -7 - random(4));
      set(p6, 1 - random(6), 7 + random(4));
    }
    if (a === 90) {
      set(p1, -9 - random(3), 7 + random(2));
      set(p2, -9 - random(3), -7 + random(2));
      set(p3, -9 - random(3), 7 + random(2));
      set(p4, -9 - random(3), -7 + random(2));
      set(p5, -9 - random(3), -7 + random(2));
      set(p6, -9 - random(3), 7 + random(2));
    }
    for (const h of instancesOf(HEART)) {
      h.color = 0;
      h.sprite_index = 'spr_heart';
    }
    instance_create(b.x, b.y, 'obj_shake');
    instance_destroy(b);
  }
}

// ---------------------------------------------------------------- obj_spearblocker

class SpearBlocker extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_spearblocker';
  }
  create() {
    for (const h of instancesOf(HEART)) h.color = 2;
    Object.assign(this, {
      idealdir: 90, dir: 90, neg: 0, idealdirprevious: 0, diagonal_enabled: 0, diagonal_transform: 0, origin_offset: 0,
      just: 0, justlength: 4, justflash: 0, bullethitid: -1, funni: 777, flash: 0, radius: 30, vanish: 0, bumpaxecon: 0,
      dark_brown: make_color_rgb(100, 0, 15), light_green: make_color_rgb(62, 79, 57), shadowpower: 0, shadowpowerstart: 0,
      shadowpowertarget: 0, shadowpowercon: 0, shadowpowertimer: 0, shadowpowertimermax: 0, wascymbalplayingprev: false,
      image_speed: 0, image_alpha: 0, shake: 0, fadealpha: 0, image_angle_prev: 0, frozentimer: 0, parryflashtimer: 0,
      transformflashtimer: 0, transformtimer: 0, forceheartpos: true,
    });
    const g = first(GERSON);
    if (g && g.diagonal_enabled === 1) this.diagonal_transform = 1;
  }
  // A spear was blocked: the shield snaps to where it points and flashes.
  user0() {
    this.image_angle = this.idealdir;
    this.flash = 5;
  }
  // JUST: three sparks fly out.
  user1() {
    for (let r = 0; r < 3; r++) {
      const p = instance_create(this.x + lengthdir_x(36, this.image_angle - 30 + irandom(60)), this.y + lengthdir_y(36, this.image_angle - 30 + irandom(60)), 'obj_shield_just_particle');
      p.depth = this.depth - 1;
      p.direction = this.idealdir;
    }
  }
  // The square (an octagon once diagonals unlock) around the SOUL.
  user2() {
    if (this.diagonal_enabled && this.transformtimer < 10) this.transformtimer += 1;
    const side = lerp(28, 33, this.transformtimer / 10);
    const prog = lerp(0, 17, this.transformtimer / 10);
    let sx = 0, sy = 0;
    if (this.shake > 0) {
      sx = -10 + random(20);
      sy = -10 + random(20);
    }
    const xx = this.x + sx, yy = this.y + sy;
    const edges = () => {
      d_line(xx + side, yy - side + prog, xx + side, yy + side - prog);
      d_line(xx - side + prog, yy - side, xx + side - prog, yy - side);
      d_line(xx - side, yy - side + prog, xx - side, yy + side - prog);
      d_line(xx - side + prog, yy + side, xx + side - prog, yy + side);
    };
    const corners = () => {
      d_line(xx + side, yy - side + prog, xx + side - prog, yy - side);
      d_line(xx - side, yy - side + prog, xx - side + prog, yy - side);
      d_line(xx - side, yy + side - prog, xx - side + prog, yy + side);
      d_line(xx + side - prog, yy + side, xx + side, yy + side - prog);
    };
    edges();
    if (this.diagonal_enabled === 1) {
      corners();
      if (this.transformflashtimer > 0) {
        this.transformflashtimer -= 1;
        draw_set_alpha(0);
        d3d_set_fog(true, 0xffffff, 0, 1);
        corners();
        d3d_set_fog(false, 0, 0, 0);
        draw_set_alpha(0);
      }
    }
  }
  cleanUp() {
    sprite_set_offset('spr_spearblocker', 32, 32);
  }
  draw() {
    if (this.frozentimer > 0) {
      this.frozentimer -= 1;
      return;
    }
    this.image_angle_prev = this.image_angle;
    if (this.just > 0) this.just -= 1;
    if (this.shadowpowercon === 1) {
      this.shadowpowertimer += 1;
      this.shadowpower = lerp(this.shadowpowerstart, this.shadowpowertarget, this.shadowpowertimer / this.shadowpowertimermax);
      if (this.shadowpowertimer >= this.shadowpowertimermax) {
        if (this.shadowpower === 0.85) this.shadowpower = 1;
        this.shadowpowerstart = this.shadowpowertarget;
        this.shadowpowertimer = 0;
        this.shadowpowercon = 0;
      }
    }
    const turn = (dir, near, other) => {
      if (near.includes(this.idealdir)) this.bumpaxecon = 1;
      this.idealdir = dir;
      this.just = this.justlength;
      if (other) this.just = this.justlength + 2;
    };
    if (down_p()) turn(270, [270, 225, 315], left_p() || right_p());
    if (up_p()) turn(90, [90, 45, 135], left_p() || right_p());
    if (left_p()) turn(180, [180, 135, 225], up_p() || down_p());
    if (right_p()) turn(0, [0, 45, 315], up_p() || down_p());
    const gers = first(GERSON);
    if (this.diagonal_transform === 1) {
      this.diagonal_enabled = 1;
      if (this.image_yscale === 1 && !snd_is_playing('snd_jump') && gers && gers.transformsfx === 0) snd_play('snd_jump');
      this.image_yscale = lerp(this.image_yscale, 0.6, 0.2);
      if (this.image_yscale < 0.62) {
        this.image_yscale = 0.6;
        this.diagonal_transform = 0;
      }
      if (this.radius === 30 && gers && gers.transformsfx === 0) {
        gers.transformsfx = 1;
        snd_play('snd_jump');
        this.transformflashtimer = 70;
      }
      this.radius = lerp(this.radius, 35, 0.2);
      this.origin_offset = lerp(this.origin_offset, 5, 0.2);
      sprite_set_offset('spr_spearblocker', 32 - this.origin_offset, 32);
      if (this.radius > 34) {
        this.radius = 35;
        sprite_set_offset('spr_spearblocker', 27, 32);
        this.diagonal_transform = 0;
      }
    }
    if (up_h()) this.idealdir = 90;
    if (right_h()) this.idealdir = 0;
    if (left_h()) this.idealdir = 180;
    if (down_h()) this.idealdir = 270;
    if (this.diagonal_enabled === 1) {
      if (up_h() && right_h()) this.idealdir = 45;
      if (left_h() && up_h()) this.idealdir = 135;
      if (down_h() && left_h()) this.idealdir = 225;
      if (right_h() && down_h()) this.idealdir = 315;
    }
    if (this.idealdir !== this.idealdirprevious) {
      this.just = this.justlength;
      this.bumpaxecon = 1;
    }
    this.idealdirprevious = this.idealdir;
    // The shield's little bump when it turns: its origin steps 30 -> 31 -> 32 (25 -> 27 diagonal).
    const base = this.diagonal_enabled === 1 ? 27 : 32;
    if (this.bumpaxecon === 1) {
      sprite_set_offset('spr_spearblocker', base - 2, 32);
      this.bumpaxecon = 2;
      const w = snd_play('snd_wing');
      snd_volume(w, 0.8, 0);
    } else if (this.bumpaxecon === 2) {
      sprite_set_offset('spr_spearblocker', base - 1, 32);
      this.bumpaxecon = 3;
    } else if (this.bumpaxecon === 3) {
      sprite_set_offset('spr_spearblocker', base, 32);
      this.bumpaxecon = 0;
    }
    const heart = first(HEART);
    if (heart) {
      this.x = heart.x + 10;
      this.y = heart.y + 10;
    }
    if (!heart || global.turntimer < 1) instance_destroy(this);
    const rep = Math.ceil(Math.abs(angle_difference(this.idealdir, this.image_angle) * 0.666));
    let dontmove = false;
    for (const s of instancesOf(SPEAR)) if (s.bouncespearcon === 1 && s.bouncespeartimer < 3) dontmove = true;
    if (!dontmove) {
      for (let r = 0; r < rep; r++) {
        const dir = this.image_angle - this.idealdir;
        let diff = dir;
        if (Math.abs(dir) > 180) diff = this.image_angle > this.idealdir ? -1 * (360 - this.image_angle + this.idealdir) : 360 - this.idealdir + this.image_angle;
        if (this.image_angle === this.idealdir) { /* there */ } else if (diff > 2) this.image_angle -= 1;
        else if (diff < 2) this.image_angle += 1;
        else this.image_angle = this.idealdir;
        if (this.image_angle > 360) this.image_angle -= 360;
        if (this.image_angle < 0) this.image_angle += 360;
      }
    }
    // The spear that lands next is highlighted.
    const spears = instancesOf(SPEAR);
    if (spears.length) {
      let best = 9999, bestId = null;
      for (const s of spears) {
        if (s.bouncespear === 0) s.sprite_index = 'spr_spear_arrow';
        if (s.longspear === 1) s.sprite_index = 'spr_spear_arrow_long';
        const t = s.len / s.fakespeed;
        if (t < best) {
          bestId = s;
          best = t;
        }
      }
      if (bestId && bestId.alive && bestId.fadespear !== 3 && bestId.bouncespear === 0 && bestId.longspear === 0) bestId.sprite_index = 'spr_spear_arrow_highlight';
    }
    if (this.vanish === 1) {
      this.image_alpha -= 0.1;
      if (this.image_alpha < 0) instance_destroy(this);
    } else if (this.image_alpha < 1) this.image_alpha += 0.2;
    draw_set_alpha(this.image_alpha);
    let sx = 0, sy = 0;
    if (this.shake > 0) {
      this.shake -= 1;
      sx = -10 + random(20);
      sy = -10 + random(20);
    }
    sx += 1;
    sy += 1;
    if (this.flash < 2) this.image_index = 0;
    else {
      this.image_index = 1;
      this.flash -= 1;
    }
    draw_set_color(0x008000);
    this.user2();
    draw_sprite_ext('spr_spearblocker', this.image_index, this.x + sx, this.y + sy, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
    draw_set_color(0xffffff);
    if (this.parryflashtimer > 0) {
      this.parryflashtimer -= 1;
      draw_set_alpha(scr_wrap(this.parryflashtimer / 2, 0, 1));
      d3d_set_fog(true, 0xffffff, 0, 1);
      this.user2();
      d3d_set_fog(false, 0, 0, 0);
      draw_set_alpha(0);
    }
    if (this.justflash > 0) {
      d3d_set_fog(true, 0xffffff, 0, 1);
      draw_sprite_ext('spr_spearblocker', 2, this.x + sx, this.y + sy, this.image_xscale, this.image_yscale, this.image_angle, 0xffffff, this.justflash);
      d3d_set_fog(false, 0, 0, 0);
      this.justflash -= 0.5;
    }
    draw_set_alpha(1);
    if (this.fadealpha > 0) {
      d3d_set_fog(true, 0xffffff, 0, 1);
      d_circle(this.x + sx, this.y + sy, this.radius, true);
      draw_sprite_ext('spr_spearblocker', 2, this.x + sx, this.y + sy, this.image_xscale, this.image_yscale, this.image_angle, 0xffffff, this.fadealpha);
      d3d_set_fog(false, 0, 0, 0);
      this.fadealpha -= 0.05;
    }
  }
}
defineObject(BLOCKER, SpearBlocker);

// ---------------------------------------------------------------- small effects

class SpearBlockerPiece extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_spearblocker_piece';
  }
  create() {
    this.gravity = 0.3;
    this.gravity_direction = 270;
    this.timer = 0;
    this.dir = choose(-1, 1);
    this.rotatespeed = 4 + random(8);
    this.image_speed = 0;
  }
  step() {
    this.image_angle += this.rotatespeed * this.dir;
    this.timer += 1;
    if (this.timer > 18) this.image_alpha -= 0.1;
    if (this.image_alpha < 0) instance_destroy(this);
  }
}
defineObject('obj_spearblocker_piece', SpearBlockerPiece);

class ShieldJustParticle extends Instance {
  create() {
    this.spd = 4 + irandom(5);
    this.image_xscale = random(0.3) + 0.4;
    this.image_yscale = this.image_xscale;
    this.image_blend = make_color_rgb(229, 208, 0);
    this.sprite_index = 'spr_organ_enemy_particle3';
    this.image_alpha = 0.2;
  }
  step() {
    this.x += lengthdir_x(this.spd, this.direction);
    this.y += lengthdir_y(this.spd, this.direction);
    this.spd *= 0.85;
    this.image_xscale *= 0.85;
    this.image_yscale *= 0.85;
    if (this.image_xscale + this.image_yscale < 0.16) instance_destroy(this);
    this.image_angle += 45;
    this.image_alpha += 0.2;
  }
}
defineObject('obj_shield_just_particle', ShieldJustParticle);

class JustText extends Instance {
  create() {
    this.timer = 0;
  }
  draw() {
    draw_set_color(0xffffff);
    draw_set_halign(1);
    draw_text(this.x, this.y, 'JUST!');
    draw_set_halign(0);
    this.timer += 1;
    if (this.timer === 31) instance_destroy(this);
    if (!i_ex(HEART) || global.turntimer < 2) instance_destroy(this);
  }
}
defineObject('obj_just_text', JustText);

class GreenHeartParticle extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_green_heart_particle';
  }
  create() {
    this.image_xscale = 1 + random(2);
    this.image_yscale = 1 + random(2);
    this.timer = 0;
  }
  step() {
    this.timer += 1;
    this.image_xscale = lerp(this.image_xscale, 0, this.timer / 20);
    this.image_yscale = lerp(this.image_yscale, 0, this.timer / 20);
    if (this.timer === 20) instance_destroy(this);
  }
}
defineObject('obj_green_heart_particle', GreenHeartParticle);

class ArrowLongParticle extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_spear_arrow_long_particle';
  }
  create() {
    this.image_xscale = 1.5;
    this.image_yscale = 1.5;
    this.direction = -45 + irandom(90);
    this.speed = 3;
    this.image_speed = 0;
  }
  step() {
    this.image_xscale -= 0.2;
    this.image_yscale -= 0.2;
    this.speed -= 0.3;
    if (this.speed < 0) instance_destroy(this);
  }
}
defineObject('obj_arrow_long_particle', ArrowLongParticle);

void [instance_find, instance_number, draw_self, G, cameraheight];
