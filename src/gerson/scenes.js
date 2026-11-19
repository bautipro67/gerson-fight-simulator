// Gerson's scenes around the fight (obj_dw_church_arena in room_dw_church_arena, Chapter 4):
// - before the first fight (con 2-12): Susie finds the Magic Axe on its anvil, Gerson asks her to pay
//   for it, then for a haircut; her swings all miss, his hammer comes down and the fight starts;
// - after a loss (con 15, 20-22): what they say depends on how many times Susie lost (flag 853);
// - the rematch (scr_text 1389-1390, then con 25 -> 11): "What, ready to fight again!?" and the choice;
// - after the win (con 15, 30): the JusticeAxe and the ShadowCrystal, then the farewell (con 60-61).
// The room is its pre-rendered picture (tools/render_rooms.py). Each scene ends where the game gives
// Kris back to the player; the simulator's end screen follows. Susie always has room for the axe.
import {
  G, global, Instance, defineObject, defineScript, S, instance_create, instance_create_depth, instance_destroy,
  instance_exists, instancesOf, draw_sprite_ext, random, irandom_range, point_distance, font_add_sprite_ext, bgr,
  clamp, lerp,
} from '../runtime/gm.js?v=20261119162321';
import { snd_init, mus_loop_ext, mus_play, snd_free_all } from '../runtime/audio.js?v=20261119162321';
import { loadMusic } from '../runtime/assets.js?v=20261119162321';
import {
  scr_dark_marker, scr_marker, scr_lerpvar_instance, scr_var_delayed, snd_play_x, scr_darksize,
} from './common.js?v=20261119162321';
import {
  c, c_waitcustom_end, scr_cutscene_make, scr_actor_setup, scr_depth, d_ex, scr_flip, loadRoom, enterRoom,
  scr_jump_to_point_sprite, registerText,
} from '../screens/cutscene.js?v=20261119162321';
import { startBattle } from '../battle/setup.js?v=20261119162321';
import { gotoRoom, fadeOut } from '../screens/common.js?v=20261119162321';

const BS = String.fromCharCode(92);
const ROOM = 'room_dw_church_arena', ROOM_W = 1280, ROOM_H = 480;
const MUSIC = ['church_dark_study.ogg', 'gerson_theme_intro.ogg', 'fanfare.ogg', 'gerson_defeated.ogg', 'ch4_extra_boss.ogg'];
const song = () => (global.currentsong ??= [null, null]);
// Susie's losses so far (flag 853): it changes the lines and where the party stands.
const losses = () => G.gersonLosses ?? 0;
// scr_calculate_move_distance(x1, y1, x2, y2, speed)
const moveTime = (x1, y1, x2, y2, sp = 6) => Math.max(1, Math.round(point_distance(x1, y1, x2, y2) / sp));

// ---------------------------------------------------------------- obj_npc_gerson

// Gerson in the room: current_state picks an animation (obj_npc_gerson Step), drawn from
// current_sprite_index. His sprites face left; facing_right mirrors him.
const UP = 'spr_gerson_outfit_walk_up', CANE = 'spr_gerson_outfit_walk_cane';
const STATES = {
  2: ['spr_gerson_beard_thinking', 0.1], 3: ['spr_gerson_shifty', 0.1], 5: ['spr_gerson_outfit_laugh_left', 0.2],
  7: ['spr_gerson_outfit_genki', 0.2], 8: ['spr_gerson_point_left', 0.1], 10: ['spr_gerson_battle_overworld', 0],
  11: ['spr_gerson_laugh_scene', 0.2], 12: ['spr_gerson_bow_shake', 0.1],
};
class NpcGerson extends Instance {
  create() {
    this.sprite_index = CANE; // (obj_npc_gerson's own sprite: scr_flip works from it)
    Object.assign(this, {
      image_xscale: 2, image_yscale: 2, image_speed: 0, state: 0, current_state: 0, state_loaded: false, state_init: false,
      current_sprite_index: CANE, anim_index: 0, anim_speed: 0, anim_timer: 0, facing_right: false, facing_up: false,
      color_blend: 0xffffff, thinking_loop: false, thinking_timer: 0,
    });
    scr_depth(this);
  }
  step() {
    if (this.facing_right && this.image_xscale != -2) scr_flip(this, 'x');
    if (!this.facing_right && this.image_xscale != 2) scr_flip(this, 'x');
    if (this.state !== this.current_state) {
      this.state = this.current_state;
      this.state_init = false;
      this.state_loaded = false;
      if (this.state != 2 && this.state != 3) this.thinking_loop = false;
    }
    const st = this.state;
    const first = !this.state_init;
    if (first && st >= 0 && st <= 21) this.state_init = true;
    if (st == 0 && first) {
      this.anim_speed = 0;
      this.anim_index = 0;
      this.state_loaded = true;
    }
    if (st == 1 || st == 9) {
      if (first) {
        this.current_sprite_index = st == 1 && this.facing_up ? UP : CANE;
        this.anim_speed = st == 1 ? 0.2 : 0;
        this.anim_index = 0;
        this.state_loaded = true;
      }
      this.current_sprite_index = this.facing_up ? UP : CANE;
    }
    if (STATES[st] && first) {
      [this.current_sprite_index, this.anim_speed] = STATES[st];
      this.anim_index = 0;
      this.state_loaded = true;
    }
    if (st == 4 && first) {
      this.state_loaded = true;
      this.thinking_loop = true;
      this.thinking_timer = 0;
    }
    if (st == 6 && first) {
      this.current_sprite_index = 'spr_gerson_bow';
      this.anim_speed = 0;
      this.anim_index = 0;
      scr_lerpvar_instance(this, 'anim_index', 0, 2, 12);
      scr_var_delayed(this, 'state_loaded', true, 13);
    }
    if (st == 19) {
      if (first) {
        this.anim_timer = 0;
        this.current_sprite_index = 'spr_gerson_smear_battle_ready';
        this.anim_speed = 0;
        this.anim_index = 1;
      }
      this.anim_timer += 1;
      if (this.anim_timer == 4) this.anim_index = 0;
      if (this.anim_timer == 30) this.state_loaded = true;
    }
    if (st == 20) {
      if (first) {
        this.anim_timer = 0;
        this.current_sprite_index = 'spr_gerson_outfit_genki';
        this.anim_speed = 0;
        this.anim_index = 0;
      }
      this.anim_timer += 1;
      if (this.anim_timer == 1) scr_jump_to_point_sprite(this, this.x, this.y, 8, 8, 'spr_gerson_outfit_genki', 'spr_gerson_outfit_genki');
      if (this.anim_timer == 14) {
        this.current_sprite_index = CANE;
        this.anim_speed = 0;
        this.anim_index = 0;
        this.state_loaded = true;
      }
    }
    if (this.thinking_loop) {
      this.thinking_timer += 1;
      if (this.thinking_timer == 1) this.current_state = 2;
      if (this.thinking_timer == 70) this.current_state = 3;
      if (this.thinking_timer == 110) this.thinking_timer = 0;
    }
  }
  draw() {
    this.anim_index += this.anim_speed;
    draw_sprite_ext(this.current_sprite_index, this.anim_index, this.x, this.y, this.image_xscale, 2, 0, this.color_blend, 1);
  }
}
defineObject('obj_npc_gerson', NpcGerson);

// The simulator's way into a scene: black, clearing over 20 frames.
class SceneFadeIn extends Instance {
  create() { this.depth = -1000; this.image_alpha = 1; }
  draw() {
    this.image_alpha -= 0.05;
    if (this.image_alpha <= 0) { instance_destroy(this); return; }
    draw_sprite_ext('spr_pixel_white', 0, G.camX - 20, G.camY - 20, 170, 130, 0, 0, this.image_alpha);
  }
}
defineObject('obj_sim_church_fadein', SceneFadeIn);

// ---------------------------------------------------------------- obj_dw_church_arena

class ChurchArena extends Instance {
  create() {
    this.visible = false;
    this.con = -1;
    this.customcon = 0;
    this.gerson_npc = null;
    // The anvil (an obj_npc_room) and, until Susie takes it, the axe on it.
    const anvil = scr_dark_marker(780, 200, 'bg_dw_gerson_arena_anvil');
    anvil.depth = 100000 - (200 * 10 + 30 * 2 * 10); // (scr_depth ran with the NPC's own 34x30 sprite)
    this.anvil_npc = anvil;
    this.axe_marker = scr_dark_marker(anvil.x + 30, anvil.y - 26, 'bg_dw_gerson_arena_axe');
    this.axe_marker.depth = anvil.depth - 10;
    Object.assign(this, {
      axe_timer: 0, axe_hover: false, slow_writer: false, susie_attack_fx: false, susie_attack_timer: 0, miss_fx: false,
      miss_fx_offset: 0, miss_counter: 0, fanfare: null, kind: 'pre',
    });
    const w = scr_dark_marker(-10, -10, 'spr_pixel_white');
    Object.assign(w, { image_xscale: 999, image_yscale: 999, depth: 100, image_alpha: 0 });
    this.whiteall = w;
  }
  alarm0() {
    this.con += 1;
  }

  // scr_maincharacters_actors: Kris, Susie and Ralsei as actors where they stand.
  makeActors(k, su, ra) {
    this.master = scr_cutscene_make(this);
    const add = (n, name, [x, y, spr]) => {
      const a = instance_create(x, y, 'obj_actor');
      scr_actor_setup(n, a, name);
      a.sprite_index = spr ?? a.dsprite;
      return a;
    };
    this.kr = 0;
    this.su = 1;
    this.ra = 2;
    this.kr_actor = add(0, 'kris', k);
    this.su_actor = add(1, 'susie', su);
    this.ra_actor = add(2, 'ralsei', ra);
    for (const kc of instancesOf('obj_mainchara')) {
      kc.x = k[0];
      kc.y = k[1];
      kc.visible = false;
    }
  }
  makeGerson(x, y, depth) {
    const g = instance_create(x, y, 'obj_npc_gerson');
    if (depth !== undefined) g.depth = depth;
    this.gerson_npc = g;
    return g;
  }

  step() {
    if (this.con == 2) this.startPre();
    if (this.con == 5 && this.customcon == 1 && !d_ex()) {
      this.con = 9;
      this.alarm[0] = 12;
      snd_play_x('motor_upper_quick_mid', 0.7, 0.7);
      instance_create_depth(G.camX + 320 + 50, G.camY + 140, this.su_actor.depth + 1, 'obj_gerson_swing_down_new');
    }
    if (this.con == 10 && this.customcon == 1 && !d_ex()) this.hammerOfJustice();
    if (this.con == 11 && this.customcon == 1 && !d_ex()) this.startFight();
    if (this.con == 22 && this.customcon == 1 && !d_ex()) this.walkBackAfterLoss();
    if (this.con == 25 && !d_ex() && !instance_exists('obj_cutscene_master')) this.rematchPan();
    if (this.con == 50 && !instance_exists('obj_cutscene_master')) this.afterWalkBack();
    if (this.con == 62 && !instance_exists('obj_cutscene_master')) this.finish('win');
    this.effects();
  }

  // The swings, the MISSes, the slow "(You got the" and the floating axe.
  effects() {
    const su = this.su_actor, ger = this.gerson_npc;
    if (this.susie_attack_fx && su && ger) {
      this.susie_attack_timer += 1;
      if (this.susie_attack_timer == 1) {
        snd_play_x('snd_laz_c', 1, 0.9);
        su.sprite_index = 'spr_susieb_attack';
        const an = instance_create(su.x, su.y, 'obj_animator');
        Object.assign(an, { target: su, initframe: 0, endframe: 5, fake_image_speed: 0.5 });
      }
      if (this.susie_attack_timer == 12) {
        const a = instance_create(ger.x + 60 + random(6), ger.y - 10 + random(6), 'obj_basicattack');
        Object.assign(a, { sprite_index: 'spr_attack_mash2', image_speed: 0.5, maxindex: 4 });
      }
      if (this.susie_attack_timer == 16) this.miss_fx = true;
    }
    if (this.miss_fx && ger) {
      this.miss_fx = false;
      this.miss_counter += 1;
      const offset = this.miss_counter > 3 ? this.miss_counter - 3 : 0;
      this.miss_fx_offset = -10 + -18 * offset;
      const d = instance_create(ger.x, ger.y + this.miss_fx_offset, 'obj_dmgwriter');
      Object.assign(d, { delay: 4, type: 1, specialmessage: 3, damage: 0 });
    }
    if (this.slow_writer) {
      for (const w of instancesOf('obj_writer')) {
        w.rate = 6;
        w.skippable = 0;
      }
    }
    const axe = this.axe_marker;
    if (this.axe_hover && axe && axe.alive) {
      this.axe_timer += 1;
      axe.y -= Math.sin(this.axe_timer / 8) / 2;
      if (this.axe_timer % 4 == 0) {
        const s = instance_create(axe.x + 16 + irandom_range(-20, 30), axe.y + 10, 'obj_afterimage');
        Object.assign(s, { image_speed: 0.25, image_alpha: 2, sprite_index: 'spr_shine', visible: true, gravity: 0.25, depth: axe.depth - 10, fadeSpeed: 0.08 });
        scr_darksize(s);
      }
    }
  }

  // ---- con 2: Susie finds the axe, Gerson comes for his money, then the haircut
  startPre() {
    this.con = 4;
    this.alarm[0] = 30;
    const id = this;
    // (from where Kris crossed x 410, the others behind)
    this.makeActors([412, 251, 'spr_krisr_dark'], [366, 236, 'spr_susie_walk_right_dw'], [326, 240, 'spr_ralsei_walk_right']);
    const { kr, su, ra, su_actor, axe_marker: axe } = this;
    const ger = this.makeGerson(G.camX - 100, G.camY - 100, 96000);
    c.var_instance(ger, 'facing_right', true);
    c.sel(kr); c.facing('r');
    c.sel(ra); c.facing('r');
    c.sel(su); c.facing('r');
    c.emote('!');
    c.wait(30);
    c.mus2('volume', 0, 60);
    c.pannable(1);
    c.pan(520, G.camY, 60);
    c.sel(su);
    c.walkdirect_wait(805, su_actor.y, 60);
    c.walkdirect_wait(805, 185, 15);
    c.facing('u');
    c.mus('free_all');
    c.msgside('bottom');
    c.speaker('susie');
    c.msgsetloc(0, BS + 'E6* Damn..^1. I dunno what this axe is^1, but it looks awesome!/%');
    c.talk_wait();
    c.customfunc(() => { id.fanfare = mus_play(snd_init('fanfare.ogg')); });
    c.var_instance(id, 'axe_hover', true);
    c.var_instance(axe, 'image_index', 1);
    c.var_lerp_to_instance(axe, 'y', axe.y - 60, 30, 3, 'inout');
    c.wait(8);
    c.sel(su); c.facing('r');
    c.wait(4);
    c.sprite('spr_susie_catch');
    c.wait(30);
    c.var_instance(id, 'slow_writer', true);
    c.speaker('no_name');
    c.msgsetloc(0, '* (You got the%%');
    c.talk_wait();
    c.var_instance(id, 'slow_writer', false);
    c.mus('free_all');
    c.var_instance(id, 'axe_hover', false);
    c.var_instance(axe, 'image_index', 0);
    c.var_lerp_to_instance(axe, 'y', axe.y, 8, 3, 'inout');
    c.wait(6);
    c.sel(su);
    c.sprite('spr_susie_shock_r');
    c.shakeobj();
    c.soundplay('snd_impact');
    c.shake();
    c.wait(15);
    c.speaker('gerson');
    c.msgsetloc(0, '* Wait a tick^1! You gotta pay for that!/%');
    c.talk_wait();
    c.mus2('initloop', 'gerson_theme_intro.ogg', 0);
    c.sel(su); c.facing('l');
    c.var_instance(ger, 'x', 485);
    c.var_instance(ger, 'y', 200);
    c.var_instance(ger, 'current_state', 1);
    c.var_lerp_to_instance(ger, 'x', 760, 120);
    c.wait(120);
    c.var_instance(ger, 'current_state', 0);
    c.wait(15);
    c.sel(su);
    c.facing('susieunhappy');
    c.facing('l');
    c.speaker('susie');
    c.msgsetloc(0, BS + 'EK* ..^1. Pay!? The heck are you talking about?/%');
    c.talk_wait();
    c.var_instance(ger, 'current_state', 1);
    c.var_lerp_to_instance(ger, 'x', 955, 70);
    c.delaycmd4(71, 'var', ger, 'current_state', 2);
    c.sel(su);
    c.autowalk(0);
    c.delaycmd4(20, 'facing', 'd');
    c.delaycmd(20, 'imagespeed', 0.2);
    c.delaycmd4(20, 'walk', 'u', 2, 4);
    c.delaycmd4(60, 'walk', 'd', 2, 4);
    c.delaycmd(65, 'autowalk', 1);
    c.delayfacing(65, 'r');
    c.speaker('gerson');
    c.msgsetloc(0, "* This is still the inside of my study^1, ain't it?/%");
    c.talk();
    c.wait(72);
    c.var_instance(ger, 'facing_right', false);
    c.wait(15);
    c.wait_talk();
    c.soundplay('snd_gerlaugh');
    c.var_instance(ger, 'current_state', 5);
    c.wait(60);
    c.var_instance(ger, 'current_state', 0);
    c.var_instance(ger, 'current_sprite_index', 'spr_gerson_look_diagonal');
    c.speaker('gerson');
    c.msgsetloc(0, "* Nothin' else was free^1, so why'd ya think we'd start here?/");
    c.facenext('susie', '2');
    c.msgnextloc(BS + "E2* Haha^1, good one. I'm taking the axe now./");
    c.facenext('gerson', 0);
    c.msgnextloc("* ..^1. don't think I'm serious? Check the price tag!/");
    c.facenext('susie', 6);
    c.msgnextloc(BS + 'E6* Huh...? Price..^1. what?/%');
    c.talk();
    c.wait_box(2);
    c.sel(su); c.sprite('spr_susie_walk_right_dw');
    c.var_instance(ger, 'current_state', 9);
    c.wait_box(4);
    c.var_instance(ger, 'current_state', 8);
    c.sel(su); c.sprite('spr_susie_surprised_left'); c.flip('x');
    c.wait_talk();
    c.var_instance(ger, 'current_state', 9);
    c.sel(su); c.facing('u'); c.flip('x');
    c.wait(4);
    c.sprite('spr_susie_hand_hips'); c.flip('x'); c.addxy(0, -4);
    c.speaker('susie');
    c.msgsetloc(0, BS + 'EB* ..^1. it says it costs..^1. uh.../%');
    c.talk_wait();
    c.sel(su); c.sprite('spr_susie_shocked_behind'); c.flip('x'); c.addxy(-8, 4);
    c.emote('!', 30, 16, 1);
    c.shakeobj();
    c.wait(30);
    c.speaker('susie');
    c.msgsetloc(0, BS + 'EE* $999^1,999^1,999!?/');
    c.facenext('gerson', 0);
    c.msgnextloc("* Geh heh heh^1, didn't realize it was still on discount!/");
    c.msgnextloc("* ..^1. But I know. You worked real hard to get here. So how 'bout a trade?/");
    c.msgnextloc('* If you^1, and you alone^1, can best my challenge..^1. I give it to ya. For free./');
    c.facenext('susie', '2');
    c.msgnextloc(BS + "E2* Heh^1, knew you'd say that. What do you want?/");
    c.facenext('gerson', 0);
    c.msgnextloc('* Hmm..^1. how about.../');
    c.msgnextloc('* ..^1. a haircut?/');
    c.facenext('susie', 6);
    c.msgnextloc(BS + 'E6* ..^1. a HAIRCUT?/');
    c.msgnextloc(BS + 'E9* Alright^1, sure. Which hair you want me to cut?/');
    c.facenext('gerson', 0);
    c.msgnextloc("* Oh^1, any of 'em./%");
    c.talk();
    c.wait_box(2);
    c.sel(su); c.sprite('spr_susie_surprised_left'); c.flip('x'); c.addxy(-18, 0);
    c.var_instance(ger, 'current_state', 5);
    c.wait_box(3);
    c.var_instance(ger, 'current_state', 6);
    c.wait_box(4);
    c.var_instance(ger, 'current_state', 9);
    c.wait_box(6);
    c.sel(su); c.sprite('spr_susie_walk_right_dw'); c.flip('x');
    c.wait_box(8);
    c.var_instance(ger, 'current_state', 2);
    c.wait_box(9);
    c.var_instance(ger, 'current_state', 9);
    c.sel(su); c.sprite('spr_susie_surprised_left'); c.flip('x');
    c.wait_box(12);
    c.sel(su); c.sprite('spr_susie_walk_right_dw'); c.flip('x');
    c.wait_box(14);
    c.var_instance(ger, 'current_state', 2);
    c.wait_talk();
    c.soundplay('snd_gerlaugh');
    c.var_instance(ger, 'current_state', 5);
    c.wait(60);
    c.var_instance(ger, 'current_state', 9);
    c.speaker('gerson');
    c.msgsetloc(0, "* They're all too long^1, see^1! Just get one^1, and I'll give it to ya./%");
    c.talk_wait();
    c.sel(su);
    c.autowalk(0);
    c.imagespeed(0.2);
    c.walk('l', 4, 18);
    c.delaycmd(19, 'halt');
    c.speaker('susie');
    c.msgsetloc(0, BS + "EA* Alright^1, I'll start with your beard.../%");
    c.talk_wait();
    c.wait(30);
    c.mus2('volume', 0, 30);
    c.var_instance(id, 'susie_attack_timer', 0);
    c.var_instance(id, 'susie_attack_fx', true);
    c.wait(10);
    c.var_instance(ger, 'current_state', 0);
    c.var_instance(ger, 'current_sprite_index', 'spr_gerson_head_tilt_forward');
    c.wait(4);
    c.wait(30);
    c.var_instance(ger, 'current_sprite_index', CANE);
    c.wait(60);
    c.speaker('susie');
    c.msgsetloc(0, BS + 'E6* H..^1. huh?/%');
    c.talk_wait();
    c.var_instance(id, 'susie_attack_timer', 0);
    c.wait(12);
    c.var_instance(ger, 'current_state', 0);
    c.var_instance(ger, 'current_sprite_index', 'spr_gerson_head_tilt_forward');
    c.wait(24);
    c.var_instance(ger, 'current_sprite_index', CANE);
    c.wait(30);
    c.speaker('susie');
    c.msgsetloc(0, BS + 'EH* STAY STILL!!!/%');
    c.talk_wait();
    c.var_instance(id, 'susie_attack_timer', 0);
    c.wait(12);
    c.var_instance(ger, 'current_sprite_index', 'spr_gerson_duck');
    c.var_lerp_to_instance(ger, 'x', 921, 12, 3, 'out');
    c.wait(8);
    c.var_instance(id, 'susie_attack_timer', 0);
    c.wait(8);
    c.var_instance(ger, 'current_sprite_index', 'spr_gerson_outfit_genki');
    c.var_lerp_to_instance(ger, 'x', 881, 12, 3, 'out');
    c.wait(8);
    c.var_instance(id, 'susie_attack_timer', 0);
    c.wait(8);
    c.var_instance(ger, 'current_sprite_index', 'spr_gerson_head_tilt_forward');
    c.var_lerp_to_instance(ger, 'x', 901, 12, 3, 'out');
    c.wait(24);
    c.var_instance(ger, 'current_sprite_index', CANE);
    c.var_instance(id, 'susie_attack_fx', false);
    c.wait(30);
    c.soundplay('snd_gerlaugh');
    c.var_instance(ger, 'current_state', 5);
    c.wait(60);
    c.sel(su); c.sprite('spr_susie_idle');
    c.speaker('susie');
    c.msgsetloc(0, BS + 'EQ* ..^1. Heheheh..^1.  I get it./');
    c.msgnextloc(BS + "E2* You think I'm gonna go easy on you^1, huh?/%");
    c.talk();
    c.wait_box(1);
    c.sel(su); c.autodepth(0); c.depth(95000); c.sprite('spr_susieb_attackready'); c.shakeobj();
    c.var_instance(ger, 'current_state', 9);
    c.wait_talk();
    c.wait(15);
    c.sel(su); c.autowalk(0); c.sprite('spr_susie_idle'); c.halt();
    c.wait(5);
    c.var_instance(ger, 'current_state', -1);
    c.var_instance(ger, 'anim_speed', 0.2);
    c.var_instance(ger, 'current_sprite_index', 'spr_gerson_cane_spin');
    c.soundplay_x('snd_laz_c', 1, 0.9);
    c.sprite('spr_susieb_attack');
    c.var_lerp_to('image_index', 5, 6);
    c.var_lerp_to('x', 840, 6);
    c.wait(3);
    c.var_instance(ger, 'current_sprite_index', 'spr_gerson_cane_spin_loop');
    c.wait(3);
    c.var_instance(ger, 'visible', 0);
    c.wait(1);
    c.shakeobj();
    c.wait(30);
    c.sel(su); c.sprite('spr_susie_idle_surprise');
    c.speaker('susie');
    c.msgsetloc(0, BS + 'E6* What the.../');
    c.facenext('gerson', 0);
    c.msgnextloc('* Ah^1, so you wanna get serious^1, do ya...?/');
    c.msgnextloc('* Then tell me first^1, can you hear it?/');
    c.msgnextloc('* Can you hear its song^1, singing from the deep...?/');
    c.msgnextloc('* That..^1. is the ringing.../%');
    c.talk();
    c.wait_box(2);
    c.sel(su); c.sprite('spr_susie_idle');
    c.wait_talk();
    c.wait(30);
    c.sel(su); c.sprite('spr_susie_idle_surprise');
    c.waitcustom();
    void kr; void ra;
  }

  // ---- con 10: Susie blocks the hammer, Gerson names it, and she jumps into place
  hammerOfJustice() {
    this.con = 11;
    this.customcon = 0;
    c_waitcustom_end();
    const { su, su_actor, gerson_npc: ger } = this;
    c.sel(su); c.sprite('spr_susie_defend'); c.halt();
    c.var_lerp_to('image_index', 4, 12);
    c.lerp_var_instance(su_actor, 'x', su_actor.x, su_actor.x - 120, 12, 3, 'out');
    c.wait(30);
    c.sel(su); c.sprite('spr_susie_idle');
    c.wait(30);
    c.var_instance(ger, 'facing_right', false);
    c.var_instance(ger, 'x', 980);
    c.var_instance(ger, 'y', 161);
    c.var_instance(ger, 'visible', 1);
    c.var_instance(ger, 'current_state', 19);
    c.wait(30);
    c.msgside('bottom');
    c.speaker('gerson');
    c.msgsetloc(0, '* ..^1. of the Hammer of Justice!/%');
    c.talk_wait();
    c.wait(4);
    c.var_instance(ger, 'current_state', 11);
    c.soundplay('snd_jump');
    c.sel(su); c.sprite('spr_susie_jump_back');
    c.jump(623, 149, 16, 16);
    c.wait(16);
    c.sprite('spr_susie_idle');
    c.shakeobj();
    c.wait(20);
    c.waitcustom();
  }

  // ---- con 11: the fight starts where the scene left everyone (scr_battle 160)
  startFight() {
    this.con = 12;
    const ger = this.gerson_npc, su = this.su_actor;
    const rematch = losses() > 0;
    const actors = [];
    if (rematch) {
      for (const a of [this.kr_actor, this.ra_actor]) {
        if (a && a.alive && a.visible) actors.push({ x: a.x, y: a.y, sprite: a.sprite_index, index: a.image_index, xscale: a.image_xscale, depth: a.depth });
      }
    }
    snd_free_all();
    startBattle({
      intro: true,
      retry: rematch,
      scene: {
        rematch,
        susie: [su.x, su.y],
        gerson: { x: ger.x, y: ger.y, sprite: ger.current_sprite_index, index: ger.anim_index, speed: ger.anim_speed, xscale: ger.image_xscale },
        actors,
        axe: this.axe_marker && this.axe_marker.alive && this.axe_marker.visible,
      },
    });
  }

  // ---- after the fight (con 15): everyone back in the room, behind a white screen
  setupAfter() {
    // (the game goes on with the cutscene from before the fight, which put the text at the bottom)
    c.msgside('bottom');
    this.whiteall.image_alpha = 1;
    this.anvil_npc.image_alpha = 1;
    if (this.axe_marker) this.axe_marker.image_alpha = 1;
  }

  // con 20 / 21: Susie couldn't keep up.
  startLose() {
    this.kind = 'lose';
    this.con = 21;
    this.customcon = 0;
    this.alarm[0] = 30;
    global.fighting = 0;
    const n = losses();
    const near = n >= 2;
    this.makeActors(near ? [737, 214, 'spr_krisr_dark'] : [470, 251, 'spr_krisr_dark'], [790, 197, 'spr_susie_walk_right_dw_unhappy'],
      near ? [682, 202, 'spr_ralsei_walk_right'] : [380, 238, 'spr_ralsei_walk_right']);
    this.setupAfter();
    const ger = this.makeGerson(840, 210, 97300);
    ger.current_state = 9;
    const { su, kr, ra, whiteall } = this;
    for (const a of [this.kr_actor, this.ra_actor]) a.facing = 'r';
    c.sel(su); c.sprite('spr_susie_walk_right_dw_unhappy');
    c.var_instance(ger, 'facing_right', false);
    c.var_instance(ger, 'current_state', 9);
    c.wait(30);
    c.var_lerp_to_instance(whiteall, 'image_alpha', 0, 60);
    c.wait(90);
    if (n == 1) {
      c.sel(su); c.sprite('spr_susie_look_down_right_dw');
      c.speaker('susie');
      c.msgsetloc(0, BS + "EV* ..^1. damn..^1. I..^1. couldn't keep up.../");
      c.facenext('gerson', 0);
      c.msgnextloc('* Geheheh..^1. well^1, you gave it your best shot!/%');
      c.talk();
      c.wait_box(2);
      c.var_instance(ger, 'current_state', 6);
      c.wait_talk();
      c.var_instance(ger, 'current_state', 9);
      c.var_instance(ger, 'facing_up', true);
      c.var_instance(ger, 'facing_right', true);
      c.wait(4);
      c.var_instance(ger, 'current_state', 1);
      c.var_lerp_to_instance(ger, 'y', 190, 20);
      c.wait(21);
      c.var_instance(ger, 'current_state', 9);
      c.sel(su); c.facing('u');
      c.speaker('gerson');
      c.msgsetloc(0, '* Here./');
      c.facenext('susie', '6');
      c.msgnextloc(BS + 'E6* ..^1. huh?/%');
      c.talk_wait();
      c.sel(su); c.autowalk(1);
      c.walkdirect_wait(790, 178, 16);
      c.facing('u');
      c.speaker('gerson');
      c.msgsetloc(0, "* I saw the fire in your eyes..^1. that's proof enough for me./");
      c.msgnextloc('* Take it. And this crystal^1, too./%');
      c.talk_wait();
      c.sel(su);
      c.emote('...', 30);
      c.wait(30);
      c.sprite('spr_susie_hand_hips'); c.flip('x'); c.addxy(0, -4);
      c.speaker('susie');
      c.msgsetloc(0, BS + 'EV* .../');
      c.msgnextloc(BS + 'EL* Nah. Keep it./');
      c.facenext('gerson', 0);
      c.msgnextloc("* ..^1. you don't want it?/");
      c.facenext('susie', 'V');
      c.msgnextloc(BS + 'EV* Of course I do. But.../');
      c.msgnextloc(BS + "EW* You're gonna need something to give me.../");
      c.msgnextloc(BS + 'EY* ..^1. after our rematch!/');
      c.facenext('gerson', 0);
      c.msgnextloc('* ..^1. Wahahahaha!!!/');
      c.msgnextloc("* You've got guts^1, kid^1! I like that!/%");
      c.talk();
      c.wait_box(1);
      c.sel(su); c.sprite('spr_susie_hand_up'); c.addxy(0, -2);
      c.wait_box(3);
      c.sel(su); c.facing('r'); c.flip('x'); c.addxy(0, 6);
      c.var_instance(ger, 'facing_up', false);
      c.var_instance(ger, 'facing_right', false);
      c.wait_box(5);
      c.sel(su); c.sprite('spr_susie_look_down_right_dw');
      c.wait_box(6);
      c.sel(su); c.facing('r');
      c.wait_box(7);
      c.sel(su); c.sprite('spr_susie_pose'); c.shakeobj();
      c.wait_box(9);
      c.sel(su); c.facing('r');
      c.soundplay('snd_gerlaugh');
      c.var_instance(ger, 'current_state', 5);
      c.wait_box(10);
      c.var_instance(ger, 'current_state', 9);
      c.wait_talk();
    } else if (n == 2) {
      c.sel(su); c.sprite('spr_susie_look_down_right_dw');
      c.speaker('susie');
      c.msgsetloc(0, BS + 'EV* D..^1. damnit!/');
      c.facenext('gerson', 0);
      c.msgnextloc("* You aren't giving up^1, are ya?/");
      c.facenext('susie', 'Q');
      c.msgnextloc(BS + "EQ* Hell no^1! Kris^1, let's try again!/%");
      c.talk();
      c.wait_box(2);
      c.var_instance(ger, 'current_state', 2);
      c.wait_box(4);
      c.sel(su); c.facing('l');
      c.var_instance(ger, 'current_state', 9);
      c.wait_talk();
    } else {
      c.sel(su); c.sprite('spr_susie_look_down_right_dw');
      c.var_instance(ger, 'current_state', 6);
      c.speaker('gerson');
      c.msgsetloc(0, "* It's all right^1, it's all right./");
      c.msgnextloc("* How 'bout you give it another shot?/%");
      c.talk();
      c.wait_box(1);
      c.sel(su); c.facing('r');
      c.var_instance(ger, 'current_state', 9);
      c.wait_talk();
    }
    c.waitcustom();
    void kr; void ra;
  }

  // con 22: the party goes back towards the door (or stays near Gerson after two losses).
  walkBackAfterLoss() {
    this.con = 50;
    this.customcon = 0;
    c.wait(16);
    c_waitcustom_end();
    const { su, kr_actor } = this;
    if (losses() < 2) {
      c.mus2('volume', 0, 60);
      c.pannable(1);
      c.panobj(kr_actor, 60);
      c.sel(su); c.autowalk(1);
      c.walkdirect_wait(660, 232, 30);
      c.walkdirect_wait(546, 232, 30);
      c.facing('l');
      c.sel(su);
      c.walkdirect_wait(416, 234, 20);
      c.facing('r');
    } else {
      c.mus2('volume', 0, 20);
      c.pannable(1);
      c.panobj(kr_actor, 20);
      c.sel(su);
      c.facing('l');
      c.wait(21);
    }
    c.pannable(0);
    this.endCutscene();
  }

  // The game gives Kris back here (c_actortokris, c_terminatekillactors); the simulator keeps the
  // actors where they stand and moves on.
  endCutscene() {
    c.call(() => {
      for (const k of instancesOf('obj_mainchara')) {
        k.x = this.kr_actor.x;
        k.y = this.kr_actor.y;
      }
      for (const m of instancesOf('obj_cutscene_master')) m.terminate = 1;
    });
  }

  // A new cutscene with the actors already in the room.
  adoptActors() {
    this.master = scr_cutscene_make(this);
    const keep = (n, name, a) => { this.master.actor_id[n] = a; this.master.actor_name[n] = name; };
    keep(0, 'kris', this.kr_actor);
    keep(1, 'susie', this.su_actor);
    keep(2, 'ralsei', this.ra_actor);
  }

  afterWalkBack() {
    snd_free_all();
    global.interact = 0;
    if (this.gerson_npc) {
      this.gerson_npc.current_state = 9;
      scr_depth(this.gerson_npc);
    }
    if (this.kind === 'win') this.farewell();
    else this.finish('lose');
  }

  finish(kind) {
    if (this.finished) return;
    this.finished = true;
    this.con = -1;
    fadeOut(30, () => S.startEnding(kind, { afterScene: true }));
  }

  // ---- the rematch: talking to Gerson after a loss (obj_npc_room in the arena: scr_text 1389, then
  // 1390 after the choice). "Go Susie!" sets con 25; "Sorry, not enough time." leaves him for later,
  // and the simulator goes back to the result screen.
  startRematch() {
    this.kind = 'rematch';
    const near = losses() >= 2;
    this.makeActors(near ? [737, 214, 'spr_krisr_dark'] : [470, 251, 'spr_krisr_dark'],
      near ? [790, 197, 'spr_susie_walk_left_dw'] : [416, 234, 'spr_susie_walk_right_dw'],
      near ? [682, 202, 'spr_ralsei_walk_right'] : [380, 238, 'spr_ralsei_walk_right']);
    for (const a of [this.kr_actor, this.ra_actor]) a.facing = 'r';
    this.su_actor.facing = near ? 'l' : 'r';
    const ger = this.makeGerson(840, 210, 97300);
    ger.current_state = 9;
    G.camX = clamp(this.kr_actor.x - (320 - 19), 0, ROOM_W - 640);
    instance_create(0, 0, 'obj_sim_church_fadein');
    c.wait(20);
    c.msgside('bottom');
    c.call(() => {
      global.msc = 1389;
      S.scr_text(global.msc);
    });
    c.talk_wait();
    c.call(() => {
      for (const m of instancesOf('obj_cutscene_master')) m.terminate = 1;
      if (this.con != 25) this.finish('lose');
    });
  }

  // con 25: back to the arena, then con 11 starts the fight.
  rematchPan() {
    this.con = 11;
    this.customcon = 0;
    this.adoptActors();
    c.pannable(1);
    c.pan(520, G.camY, 15);
    c.wait(16);
    c.waitcustom();
  }

  // con 30: Susie won.
  startWin() {
    this.kind = 'win';
    this.con = 50;
    this.customcon = 0;
    global.fighting = 0;
    this.makeActors([470, 251, 'spr_krisr_dark'], [750, 197, 'spr_susie_hold_hair'], [380, 238, 'spr_ralsei_walk_right']);
    for (const a of [this.kr_actor, this.ra_actor]) a.facing = 'r';
    this.setupAfter();
    const ger = this.makeGerson(840, 210, 97300);
    ger.current_state = 0;
    ger.current_sprite_index = 'spr_gerson_shocked';
    const { su, whiteall, axe_marker: axe } = this;
    const n = losses();
    c.sel(su); c.sprite('spr_susie_hold_hair'); c.setxy(750, 197);
    c.var_instance(ger, 'facing_right', false);
    c.var_instance(ger, 'current_state', 0);
    c.var_instance(ger, 'current_sprite_index', 'spr_gerson_shocked');
    c.var_instance(ger, 'x', 840);
    c.var_instance(ger, 'y', 210);
    c.wait(30);
    c.var_lerp_to_instance(whiteall, 'image_alpha', 0, 60);
    c.wait(60);
    c.wait(15);
    c.speaker('susie');
    c.msgsetloc(0, BS + "E2* H..^1. How's that^1, old man!?/%");
    c.talk_wait();
    c.soundplay('snd_gerlaugh');
    c.var_instance(ger, 'current_state', 5);
    c.wait(60);
    c.mus2('initloop', 'gerson_defeated.ogg', 0);
    c.speaker('gerson');
    c.msgsetloc(0, '* Wahahahahaha!^1! That was the most fun I ever had!/');
    c.facenext('susie', '9');
    c.msgnextloc(BS + 'E9* See how I used my healing just now!?/');
    c.facenext('gerson', 0);
    c.msgnextloc('* Geheheheh!/%');
    c.talk();
    c.wait_box(2);
    c.var_instance(ger, 'current_state', 9);
    c.sel(su); c.facing('r');
    c.wait_talk();
    c.wait(30);
    c.sel(su); c.autowalk(1);
    c.walkdirect_wait(790, 197, 8);
    c.var_instance(ger, 'facing_up', true);
    c.var_instance(ger, 'facing_right', true);
    c.sel(su);
    c.walkdirect_wait(790, 178, 8);
    c.facing('u');
    c.wait(30);
    c.speaker('susie');
    c.msgsetloc(0, BS + 'EA* Guess this is mine now^1, huh./%');
    c.talk_wait();
    c.wait(5);
    c.soundplay('snd_noise');
    c.sel(su); c.sprite('spr_susie_up_reach');
    c.wait(6);
    c.var_instance(axe, 'visible', 0);
    c.facing('u');
    c.soundplay('snd_item');
    c.speaker('no_name');
    c.msgsetloc(0, '* (JusticeAxe was added to your WEAPONS.)/%');
    c.talk_wait();
    c.var_instance(ger, 'current_state', 1);
    c.var_lerp_to_instance(ger, 'y', 190, 20);
    c.wait(21);
    c.var_instance(ger, 'current_state', 9);
    c.speaker('gerson');
    c.msgsetloc(0, '* And..^1. take this^1, too./');
    c.msgnextloc('* For some reason^1, I found this weird piece-a glass in my desk./');
    c.msgnextloc('* Felt like someone really wanted me to use this thing./');
    c.msgnextloc("* But it didn't interest me^1, so you can take it./");
    c.facenext('no_name', 0);
    c.msgnextloc('* (ShadowCrystal was added to your KEY ITEMS.)/%');
    c.talk();
    c.wait_box(4);
    c.soundplay('snd_item');
    c.wait_talk();
    c.wait(15);
    if (n == 0) {
      c.var_instance(ger, 'facing_up', false);
      c.var_instance(ger, 'facing_right', false);
      c.sel(su); c.facing('r');
      c.speaker('gerson');
      c.msgsetloc(0, '* The truth is^1, I was gonna give you it all if you beat me or not./');
      c.msgnextloc('* But woomph^1, you actually put up quite a fight!/%');
      c.talk();
      c.wait_box(1);
      c.var_instance(ger, 'current_state', 20);
      c.wait_talk();
      c.wait_if(ger, 'state_loaded', '=', true);
      c.wait(5);
      c.soundplay('snd_gerlaugh');
      c.var_instance(ger, 'current_state', 5);
      c.wait(60);
      c.sel(su); c.autowalk(0); c.sprite('spr_susie_head_scratch_dw'); c.imagespeed(0.2); c.addxy(0, -6);
      c.var_instance(ger, 'current_state', 9);
      c.speaker('susie');
      c.msgsetloc(0, BS + "EL* Well^1, maybe you're losing your touch./");
      c.facenext('gerson', 0);
      c.msgnextloc('* Oh^1, far from it!/');
      c.msgnextloc("* ..^1. You weren't truly fighting by yourself^1, were ya?/");
      c.facenext('susie', 'K');
      c.msgnextloc(BS + 'EK* ..^1. huh?/');
      c.msgnextloc(BS + 'E6* ..^1. oh^1, you mean Kris. Yeah./');
      c.msgnextloc(BS + 'EK* Guess I kinda needed their help to win./');
      c.facenext('gerson', 0);
      c.msgnextloc("* Well^1, don't sell your own skills short either./");
      c.msgnextloc("* You're something real special yourself.../");
      c.facenext('susie', '9');
      c.msgnextloc(BS + "E9* Heh. You weren't bad either./");
      c.facenext('gerson', 0);
      c.msgnextloc('* Now go enjoy that Axe^1! Geh heh heh!/');
      c.facenext('susie', '2');
      c.msgnextloc(BS + 'E2* Alright. Heh./%');
      c.talk();
      c.wait_box(2);
      c.sel(su); c.halt();
      c.var_instance(ger, 'current_state', 5);
      c.wait_box(3);
      c.var_instance(ger, 'current_state', 2);
      c.wait_box(5);
      c.sel(su); c.facing('susieunhappy'); c.facing('r'); c.addxy(0, 6);
      c.var_instance(ger, 'anim_speed', 0);
      c.wait_box(6);
      c.sel(su); c.facing('susieunhappy'); c.facing('r');
      c.wait_box(7);
      c.sel(su); c.sprite('spr_susie_look_down_right_dw');
      c.wait_box(9);
      c.var_instance(ger, 'current_state', 12);
      c.wait_box(10);
      c.sel(su); c.facing('susiedarkeyes'); c.facing('r');
      c.var_instance(ger, 'current_state', 9);
      c.wait_box(12);
      c.sel(su); c.autowalk(0); c.sprite('spr_susie_head_scratch_dw'); c.imagespeed(0.2); c.addxy(0, -6);
      c.wait_box(14);
      c.var_instance(ger, 'current_state', 20);
      c.sel(su); c.facing('susiedarkeyes'); c.facing('r'); c.addxy(0, 6); c.halt();
      c.wait_box(16);
      c.var_instance(ger, 'current_state', 9);
      c.wait_talk();
    } else {
      c.var_instance(ger, 'facing_up', false);
      c.var_instance(ger, 'facing_right', false);
      c.sel(su); c.sprite('spr_susie_pose'); c.shakeobj();
      c.speaker('susie');
      if (n < 5) c.msgsetloc(0, BS + 'E9* Knew it was worth having a rematch!/%');
      else {
        c.msgsetloc(0, BS + 'E9* FINALLY!!/');
        c.msgnextloc(BS + "E2* Was starting to wonder if I'd ever win.../%");
      }
      c.talk_wait();
      c.sel(su); c.facing('r');
      c.var_instance(ger, 'current_state', 6);
      c.speaker('gerson');
      c.msgsetloc(0, '* Perseverance. Each time^1, you get a little better./');
      c.msgnextloc("* ..^1. that's all I wanted to see./");
      c.msgnextloc("* Can't think I'm gonna be the toughest thing you'll face./");
      c.msgnextloc("* But next time^1, you'll be ready./");
      c.msgnextloc("* Don't give up^1, and give 'em hell!/");
      c.facenext('susie', '9');
      c.msgnextloc(BS + "E9* Don't have to tell me that^1, old man!!/%");
      c.talk();
      c.wait_box(1);
      c.wait_if(ger, 'state_loaded', '=', true);
      c.var_instance(ger, 'current_state', 9);
      c.wait_box(2);
      c.wait_if(ger, 'state_loaded', '=', true);
      c.var_instance(ger, 'current_state', 2);
      c.wait_box(3);
      c.wait_if(ger, 'state_loaded', '=', true);
      c.var_instance(ger, 'current_state', 9);
      c.wait_box(4);
      c.wait_if(ger, 'state_loaded', '=', true);
      c.var_instance(ger, 'current_state', 20);
      c.wait_box(6);
      c.wait_if(ger, 'state_loaded', '=', true);
      c.var_instance(ger, 'current_state', 9);
      c.wait_talk();
    }
    c.mus2('volume', 0, 60);
    c.pannable(1);
    c.panobj(this.kr_actor, 60);
    c.sel(su); c.autowalk(1);
    c.walkdirect_wait(660, 232, 30);
    c.walkdirect_wait(546, 232, 30);
    c.facing('l');
    c.sel(su);
    c.walkdirect_wait(416, 234, 20);
    c.facing('r');
    c.var_instance(ger, 'facing_up', true);
    c.var_instance(ger, 'facing_right', true);
    c.pannable(0);
    this.endCutscene();
  }

  // ---- con 61: "Well, I'll be seeing you around now." (when Kris heads for the door)
  farewell() {
    this.con = 62;
    this.adoptActors();
    const { kr, su, ra, kr_actor, su_actor, ra_actor, gerson_npc: ger } = this;
    c.wait(30);
    c.var_instance(ger, 'facing_up', false);
    c.var_instance(ger, 'facing_right', false);
    c.msgside('top');
    c.speaker('gerson');
    c.msgsetloc(0, "* Well^1, I'll be seeing you around now./%");
    c.talk_wait();
    c.var_instance(ger, 'x', 680);
    c.var_instance(ger, 'y', 250);
    c.var_instance(ger, 'depth', 95000);
    const kt = moveTime(kr_actor.x, kr_actor.y, 346, 251, 4);
    c.sel(kr); c.walkdirect(346, 251, kt); c.delayfacing(kt + 1, 'r');
    const st = moveTime(su_actor.x, su_actor.y, 520, 235, 4);
    c.sel(su); c.walkdirect(520, 235, st); c.delayfacing(st + 1, 'r');
    const rt = moveTime(ra_actor.x, ra_actor.y, 440, 239, 4);
    c.sel(ra); c.walkdirect(440, 239, rt); c.delayfacing(rt + 1, 'r');
    c.pannable(1);
    c.pan(220, G.camY, 60);
    c.wait(61);
    c.speaker('susie');
    c.msgsetloc(0, BS + 'E0* ..^1. yeah. I guess we will./%');
    c.talk_wait();
    c.wait(5);
    c.sel(su); c.sprite('spr_susie_look_down_right_dw');
    c.wait(30);
    c.sel(su); c.walkdirect_wait(583, 234, 30);
    c.wait(15);
    c.speaker('susie');
    c.msgsetloc(0, BS + "ED* Why'd you..^1. help me so much?/");
    c.msgnextloc(BS + "ED* You didn't have to./");
    c.facenext('gerson', 0);
    c.msgnextloc('* You remind me a bit of someone I used to know./');
    c.facenext('susie', 6);
    c.msgnextloc(BS + 'E6* ..^1. Who?/');
    c.facenext('gerson', 0);
    c.msgnextloc('* Just a character from that old story.../');
    c.facenext('susie', 20);
    c.msgnextloc(BS + "EK* ..^1. Lord of the Hammer^1, huh. Hell if I'm reading that./");
    c.msgnextloc(BS + 'E0* ..^1. though^1, wait a sec./');
    c.msgnextloc(BS + "E1* Isn't that..^1. what Dragon Blazers was based on?/");
    c.facenext('gerson', 0);
    c.msgnextloc('* Yep^1, yep. And so they changed parts of the story./');
    c.msgnextloc("* Of course^1, the biggest fans got mad..^1. but^1, isn't it interesting?/");
    c.msgnextloc('* The book was already just an interpretation of something else./');
    c.msgnextloc("* Stories can be retold. They can be changed..^1. That's what I believe./");
    c.facenext('susie', '0');
    c.msgnextloc(BS + 'E0* ..^1. huh./');
    c.facenext('gerson', 0);
    c.msgnextloc('* The words on a wall called you a hero./');
    c.msgnextloc("* ..^1. Whatever you end up being^1, I'm sure it'll be tremendous./%");
    c.talk();
    c.wait_box(1);
    c.sel(su); c.sprite('spr_susie_look_down_right_dw');
    c.wait_box(3);
    c.sel(su); c.sprite('spr_susie_surprised_step_back'); c.halt();
    c.var_instance(ger, 'current_state', 2);
    c.wait_box(5);
    c.sel(su); c.facing('r'); c.walk('r', 2, 4);
    c.wait_if(ger, 'state_loaded', '=', true);
    c.var_instance(ger, 'current_state', 9);
    c.wait_box(7);
    c.wait_if(ger, 'state_loaded', '=', true);
    c.var_instance(ger, 'current_state', 6);
    c.wait_box(9);
    c.sel(su); c.facing('r');
    c.wait_box(10);
    c.sel(su); c.sprite('spr_susie_surprised_step_back'); c.halt();
    c.wait_box(11);
    c.sel(su); c.autowalk(0); c.sprite('spr_susie_head_scratch_dw'); c.imagespeed(0.2); c.addxy(0, -6);
    c.wait_box(13);
    c.sel(su); c.facing('r'); c.addxy(0, 6); c.halt();
    c.wait_if(ger, 'state_loaded', '=', true);
    c.var_instance(ger, 'current_state', 2);
    c.wait_box(14);
    c.wait_if(ger, 'state_loaded', '=', true);
    c.var_instance(ger, 'current_state', 6);
    c.wait_box(15);
    c.wait_if(ger, 'state_loaded', '=', true);
    c.var_instance(ger, 'current_state', 9);
    c.wait_box(16);
    c.wait_if(ger, 'state_loaded', '=', true);
    c.var_instance(ger, 'current_state', 2);
    c.sel(su); c.sprite('spr_susie_walk_right_dw_unhappy');
    c.wait_box(18);
    c.sel(su); c.sprite('spr_susie_look_down_right_dw');
    c.wait_if(ger, 'state_loaded', '=', true);
    c.var_instance(ger, 'current_state', 9);
    c.wait_box(20);
    c.wait_if(ger, 'state_loaded', '=', true);
    c.var_instance(ger, 'current_state', 2);
    c.wait_box(21);
    c.sel(su); c.sprite('spr_susie_walk_right_dw_unhappy');
    c.wait_if(ger, 'state_loaded', '=', true);
    c.var_instance(ger, 'current_state', 6);
    c.wait_talk();
    c.wait_if(ger, 'state_loaded', '=', true);
    c.var_instance(ger, 'current_state', 9);
    c.wait(30);
    c.sel(su); c.sprite('spr_susie_walk_right_dw_unhappy');
    c.speaker('susie');
    c.msgsetloc(0, BS + 'EV* .../');
    c.msgnextloc(BS + 'E7* ..^1. anyway^1, which Dragon Blazers character am I?/%');
    c.talk();
    c.wait_box(1);
    c.sel(su); c.autowalk(1); c.sprite('spr_susie_walk_right_dw');
    c.wait_talk();
    c.soundplay('snd_gerlaugh');
    c.var_instance(ger, 'current_state', 5);
    c.wait(60);
    c.speaker('gerson');
    c.msgsetloc(0, '* Gahahaha^1, right!/%');
    c.talk_wait();
    c.var_instance(ger, 'current_state', 1);
    c.var_lerp_to_instance(ger, 'y', 270, 20);
    c.wait(20);
    c.var_instance(ger, 'current_state', 9);
    c.wait(8);
    c.var_instance(ger, 'current_state', 1);
    c.var_lerp_to_instance(ger, 'x', 284, 120);
    c.wait(30);
    c.sel(su); c.facing('d'); c.delayfacing(10, 'l');
    c.sel(ra); c.delayfacing(40, 'd'); c.delayfacing(50, 'l');
    c.sel(kr); c.delayfacing(60, 'd'); c.delayfacing(70, 'l');
    c.wait(90);
    c.var_instance(ger, 'current_state', 9);
    c.var_instance(ger, 'facing_right', true);
    c.wait(30);
    c.speaker('gerson');
    c.msgsetloc(0, '* You are..^1. the Dragon./%');
    c.talk_wait();
    c.var_instance(ger, 'current_state', 1);
    c.var_lerp_to_instance(ger, 'y', 500, 90);
    c.wait(30);
    c.panobj(kr_actor, 60);
    c.sel(su); c.walkdirect_wait(385, 236, 60);
    c.facing('l');
    c.sel(ra); c.facing('l');
    c.speaker('susie');
    c.msgsetloc(0, BS + "E9* Heheh. That's what I was hoping./%");
    c.talk_wait();
    c.sel(kr); c.facing('d');
    c.sel(su); c.facing('l');
    c.sel(ra); c.facing('l');
    c.pannable(0);
    c.wait(30);
    this.endCutscene();
  }
}
defineObject('obj_dw_church_arena', ChurchArena);

// ---------------------------------------------------------------- the battle in the room

// From the scene into the fight (con 11-12): the room stays behind the arena background, the anvil
// and the axe fade out over 15 frames (the anvil in front of everything meanwhile). In a rematch
// (flag 853 > 0) Kris and Ralsei fade out over 16 frames, and the arena only appears after a flash
// 44 frames in (the background waits with con -1; _flash_step_two / _flash_step_three).
class BattleRoom extends Instance {
  create() {
    this.depth = 1000100;
    this.t = 0;
    this.flash = null;
    this.scene = null;
  }
  setup(scene, bg) {
    this.scene = scene;
    this.bg = bg;
    const fade = (m, time) => scr_lerpvar_instance(m, 'image_alpha', 1, 0, time, 2, 'out');
    const anvil = scr_dark_marker(780, 200, 'bg_dw_gerson_arena_anvil');
    anvil.depth = 0;
    fade(anvil, 15);
    if (scene.axe) {
      const axe = scr_dark_marker(810, 174, 'bg_dw_gerson_arena_axe');
      axe.depth = 97390;
      fade(axe, 15);
    }
    if (scene.rematch) {
      for (const a of scene.actors) {
        const m = scr_marker(a.x, a.y, a.sprite);
        Object.assign(m, { image_index: a.index, image_xscale: a.xscale, image_yscale: 2, depth: a.depth });
        scr_lerpvar_instance(m, 'image_alpha', 1, 0, 16);
        scr_var_delayed(m, 'visible', false, 16);
      }
      if (bg) {
        bg.delay = 50;
        bg.con = -1;
      }
    }
  }
  step() {
    this.t += 1;
    if (!this.scene?.rematch) return;
    if (this.t == 44) {
      const f = scr_marker(0, 0, 'spr_pixel_white');
      Object.assign(f, { image_xscale: ROOM_W, image_yscale: ROOM_H, image_blend: bgr(11718399), image_alpha: 0, depth: -999 });
      this.flash = f;
      if (this.bg) {
        scr_var_delayed(this.bg, 'con', 0, 4);
        scr_var_delayed(this.bg, 'image_alpha', 1, 4);
      }
      scr_lerpvar_instance(f, 'image_alpha', 0, 1, 4);
    }
    if (this.t == 48 && this.flash) scr_lerpvar_instance(this.flash, 'image_alpha', 1, 0, 25);
  }
  draw() {
    draw_sprite_ext('room:' + ROOM, 0, 0, 0, 1, 1, 0, 0xffffff, 1);
  }
}
defineObject('obj_sim_church_battleroom', BattleRoom);

// ---------------------------------------------------------------- entry points

async function enterArena() {
  await Promise.all([loadRoom(ROOM), ...MUSIC.map(m => loadMusic(m).catch(() => {}))]);
  const keep = G.gersonLosses;
  gotoRoom();
  G.gersonLosses = keep;
  global.interact = 1;
  global.facing = 1;
  global.currentsong = [null, null];
  global.damagefont = font_add_sprite_ext('spr_numbersfontbig', '0123456789', true, 0);
  // (the hammer that comes down in the first scene is the battle's obj_gerson_swing_down_new, which
  // reads Susie's HP)
  global.hp ??= [0, 90, 290, 70];
  global.maxhp ??= [0, 90, 290, 70];
  enterRoom(ROOM, ROOM_W, ROOM_H);
  instance_create(0, 0, 'obj_time');
  const k = instance_create(412, 251, 'obj_mainchara');
  k.cutscene = 1;
  return instance_create(0, 40, 'obj_dw_church_arena');
}

// BEGIN with SCENES on: the scene before the first fight.
export async function startGersonFight() {
  G.gersonLosses = 0;
  if (G.settings?.scenes === false) return startBattle({ intro: G.settings?.intro !== false });
  const a = await enterArena();
  G.camX = clamp(412 - (320 - 19), 0, ROOM_W - 640);
  // the room's music (obj_musicer_dw_gerson_study)
  const s = song();
  s[0] = snd_init('church_dark_study.ogg');
  s[1] = mus_loop_ext(s[0], 0.7, 1);
  instance_create(0, 0, 'obj_sim_church_fadein');
  a.con = 1;
  a.alarm[0] = 20;
}

// After the fight: 'win' or 'lose' (the screen is white, as the battle left it).
export async function startGersonAfterScene(kind) {
  if (kind === 'lose') G.gersonLosses = losses() + 1;
  const a = await enterArena();
  G.camX = 520;
  if (kind === 'lose') a.startLose();
  else a.startWin();
}

// TRY AGAIN with SCENES on.
export async function startGersonRematch() {
  if (G.settings?.scenes === false) return startBattle({ intro: G.settings?.intro !== false, retry: true });
  const a = await enterArena();
  a.startRematch();
}

// scr_text 1389 / 1390: the rematch question and Susie's answer.
registerText(1389, () => {
  global.choicemsg = ['#Go Susie!#Go Susie!', '#Sorry, not#enough time.', '', ''];
  S.scr_speaker('gerson');
  S.msgsetloc(0, '* What^1, ready to fight again!?/');
  S.scr_anyface_next('susie', 2);
  S.msgnextloc(BS + 'E2* Whaddya say^1, Kris?/');
  S.msgnext(BS + 'C2');
});
registerText(1390, () => {
  if (global.choice == 0) {
    for (const a of instancesOf('obj_dw_church_arena')) a.con = 25;
    S.scr_speaker('susie');
    S.msgsetloc(0, BS + "EH* Get ready^1, 'cause I'm not gonna hold anything back!/%");
  }
  if (global.choice == 1) {
    S.scr_speaker('susie');
    S.msgsetloc(0, BS + "EA* Sorry. We'll kick your ass later^1, old man./%");
  }
});

defineScript('startGersonFight', startGersonFight);
defineScript('startGersonAfterScene', startGersonAfterScene);
defineScript('startGersonRematch', startGersonRematch);
void lerp;
