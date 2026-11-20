// Chapter 4 battle scripts that Chapter 3 did not have: scr_heroblcon, scr_battle_sprite_set /
// scr_battle_sprite_reset, draw_sprite_ext_flash, scr_spellget, scr_flag_get, scr_enemy_drawhurt_generic.
import { global, defineScript, instancesOf, instance_create, draw_sprite_ext, d3d_set_fog, sprite_get_number, S } from '../runtime/gm.js?v=20261120034301';

const HERO = { 1: 'obj_herokris', kris: 'obj_herokris', kr: 'obj_herokris', 2: 'obj_herosusie', susie: 'obj_herosusie',
  su: 'obj_herosusie', 3: 'obj_heroralsei', ralsei: 'obj_heroralsei', ra: 'obj_heroralsei', 4: 'obj_heronoelle',
  noelle: 'obj_heronoelle', no: 'obj_heronoelle' };

// scr_heroblcon(hero): a speech balloon to the right of that hero (side -1).
defineScript('scr_heroblcon', who => {
  const h = instancesOf(HERO[who] ?? '')[0];
  if (!h) return false;
  const b = S.scr_enemyblcon(h.x + 100, h.y + 40, 10);
  b.side = -1;
  return b;
});

// scr_battle_sprite_set(hero, sprite, speed, loop): the hero plays a sprite (state 8); without loop
// it goes back to idle after the sprite's last frame.
defineScript('scr_battle_sprite_set', (who, spr, spd, loop) => {
  for (const h of instancesOf(HERO[who] ?? 'obj_herokris')) {
    h.state = 8;
    h.hurt = 0;
    h.attacktimer = 0;
    h.sprite_index = spr;
    h.image_speed = spd;
    h.image_index = 0;
    if (loop == 0) h.maxframes = sprite_get_number(spr);
    global.faceaction[h.myself] = 0;
  }
});
defineScript('scr_battle_sprite_reset', who => {
  for (const h of instancesOf(HERO[who] ?? 'obj_herokris')) {
    h.state = 0;
    h.hurt = 0;
    h.attacktimer = 0;
    h.attacked = 0;
    global.faceaction[h.myself] = 0;
  }
});

defineScript('draw_sprite_ext_flash', (spr, sub, x, y, xs, ys, rot, col, alpha) => {
  d3d_set_fog(true, col, 0, 1);
  draw_sprite_ext(spr, sub, x, y, xs, ys, rot, col, alpha);
  d3d_set_fog(false, 0, 0, 0);
});

// scr_spellget(char, spell): adds the spell to the first free slot unless the character has it.
defineScript('scr_spellget', (c, spell) => {
  let open = -1, have = 0;
  for (let j = 0; j < 12; j++) {
    if (global.spell[c][j] == spell) have = 1;
    if (open == -1 && global.spell[c][j] == 0) open = j;
  }
  if (open >= 0 && have == 0) global.spell[c][open] = spell;
});

defineScript('scr_flag_get', n => global.flag[n]);

// scr_enemy_drawhurt_generic(): monster scope.
defineScript('scr_enemy_drawhurt_generic', m => {
  if (m.state == 3 && m.hurttimer >= 0) draw_sprite_ext(m.hurtsprite, 0, m.x + m.shakex + m.hurtspriteoffx, m.y + m.hurtspriteoffy, 2, 2, 0, m.image_blend, 1);
});

// ---------------------------------------------------------------- scr_damage (Chapter 4)
// scr_damage_calculation(damage, slot): each point of defense takes 3, 2 or 1 off depending on how
// big the hit is next to the target's max HP (above 1/5, above 1/8, below).
function damageCalculation(dmg, slot) {
  const def = global.battledf[slot];
  const maxhp = global.maxhp[global.char[slot]];
  const a = maxhp / 5, b = maxhp / 8;
  for (let i = 0; i < def; i++) dmg -= dmg > a ? 3 : dmg > b ? 2 : 1;
  return Math.max(dmg, 1);
}
defineScript('scr_damage_calculation', damageCalculation);
// scr_element_damage_reduction(element, char): armor elements take a share of matching damage off.
function elementReduction(el, c) {
  let r = 1;
  if (el != 0) {
    for (let i = 0; i < 2; i++) {
      const e = global.itemelement?.[c]?.[i + 1] ?? 0;
      const amt = global.itemelementamount?.[c]?.[i + 1] ?? 0;
      if (e != 0) {
        if (e == el) r -= amt;
        if (e == 9 && (el == 2 || el == 8)) r -= amt;
        if (e == 10) r -= amt;
      }
    }
  }
  return r;
}
defineScript('scr_element_damage_reduction', elementReduction);

// scr_damage(bullet): the bullet's `damage` hits `target` (0-2 a party slot, 3 everyone, 4 a random
// one). Against the Hammer of Justice every hit takes at least 5, and Susie cannot fall: at 0 HP she
// is healed and the fight ends (endcon 1).
defineScript('scr_damage', inst => {
  const g = global;
  if (!(g.inv < 0)) return;
  S.scr_damage_cache();
  let element = 0;
  if (typeof inst.element === 'number') element = inst.element;
  const gerson = instancesOf('obj_hammer_of_justice_enemy')[0];
  if (gerson) gerson.gothitlastturn += 1;
  if (inst.target < 3 && g.hp[g.char[inst.target]] <= 0) {
    S.scr_randomtarget_old(inst);
    inst.target = inst.mytarget;
    const h = g.charinstance[inst.target];
    if (h) {
      h.image_blend = 0xffffff;
      h.darkify = 0;
    }
  }
  let remtarget = -1;
  if (inst.target == 4) {
    remtarget = 4;
    S.scr_randomtarget_old(inst);
    inst.target = inst.mytarget;
    const avg = S.scr_party_hpaverage();
    for (let k = 0; k < 2; k++) {
      if (g.hp[g.char[inst.target]] / g.maxhp[g.char[inst.target]] < avg / 2) {
        S.scr_randomtarget_old(inst);
        inst.target = inst.mytarget;
      }
    }
    if (inst.target == 0 && g.hp[g.char[0]] / g.maxhp[g.char[0]] < 0.35) {
      S.scr_randomtarget_old(inst);
      inst.target = inst.mytarget;
    }
    const h = g.charinstance[inst.target];
    if (h) {
      h.image_blend = 0xffffff;
      h.darkify = 0;
    }
  }
  let chartarget = 3;
  let tdamage = inst.damage;
  if (inst.target < 3) {
    tdamage = damageCalculation(tdamage, inst.target);
    chartarget = g.char[inst.target];
    if (g.charaction[inst.target] == 10) tdamage = Math.ceil(2 * tdamage / 3);
    tdamage = Math.ceil(tdamage * elementReduction(element, g.char[inst.target]));
    if (tdamage < 1) tdamage = 1;
  }
  if (!instancesOf('obj_shake').length) instance_create(0, 0, 'obj_shake');
  const hero = g.charinstance[inst.target];
  if (hero && hero.alive) {
    hero.hurt = 1;
    hero.hurttimer = 0;
  }
  let hpdiff = tdamage;
  for (const w of instancesOf('obj_dmgwriter')) if (w.delaytimer >= 1) w.killactive = 1;
  let doomtype = -1;
  for (const h of instancesOf('obj_heart')) h.dmgnoise = 1;
  if (inst.target < 3) {
    if (g.hp[chartarget] <= 0) {
      doomtype = 4;
      g.hp[chartarget] -= Math.round(tdamage / 4);
      hpdiff = Math.round(tdamage / 4);
    } else {
      if (gerson && g.hp[chartarget] - tdamage <= 0) hpdiff = Math.round(g.hp[chartarget]);
      if (gerson && tdamage < 5) tdamage = 5;
      if (gerson && hpdiff < 5) hpdiff = 5;
      g.hp[chartarget] -= tdamage;
      if (g.hp[chartarget] <= 0) {
        if (gerson) {
          if (g.hp[2] < 1) {
            g.hp[2] = g.maxhp[2];
            S.scr_battle_sprite_set('susie', 'spr_susie_dw_landed', 0, true);
            gerson.attackcon = 0;
            gerson.talked = -1;
            gerson.endcon = 1;
            g.flag[36] = 1;
            g.batmusic?.[1]?.setVolume?.(0, 90);
            gerson.user14();
            g.turntimer = 0;
            for (const c of instancesOf('obj_battlecontroller')) {
              c.noreturn = 1;
              c.intro = 2;
            }
            for (const t of instancesOf('obj_tensionbar')) {
              t.alarm[5] = 15;
              t.hspeed = -10;
              t.friction = -0.4;
            }
          }
        } else {
          hpdiff = Math.abs(g.hp[chartarget] - g.maxhp[chartarget] / 2);
          doomtype = 4;
          g.hp[chartarget] = Math.round(-g.maxhp[chartarget] / 2);
          S.scr_dead(inst.target);
        }
      }
    }
    if (gerson && tdamage < 5) tdamage = 5;
    if (gerson && hpdiff < 5) hpdiff = 5;
    const h = g.charinstance[inst.target];
    const w = instance_create(h.x, h.y + h.myheight - 24, 'obj_dmgwriter');
    w.damage = hpdiff;
    w.type = doomtype;
  }
  if (inst.target == 3) {
    for (let i = 0; i < 3; i++) {
      const c = g.char[i];
      if (g.hp[c] >= 0) {
        tdamage = damageCalculation(tdamage, i);
        tdamage = Math.ceil(tdamage * elementReduction(element, c));
        if (g.charaction[i] == 10) g.hp[c] -= Math.ceil(3 * tdamage / 4);
        else g.hp[c] -= tdamage;
        if (g.hp[c] <= 0) g.hp[c] = Math.round(-g.maxhp[0] / 2);
      }
    }
  }
  g.inv = g.invc * 40;
  S.scr_damage_check?.();
  let gameover = 1;
  for (let i = 0; i < 3; i++) if (g.char[i] != 0 && g.hp[g.char[i]] > 0) gameover = 0;
  if (gameover == 1) S.scr_gameover();
  if (remtarget != -1) inst.target = remtarget;
});
