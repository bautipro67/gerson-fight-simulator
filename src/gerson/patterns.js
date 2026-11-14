// obj_hammer_of_justice_enemy Other_10 (event_user(0)): queues this turn's attack (scr_spearpattern entries,
// read back by the enemy's Step through scr_spearshot) and picks the next turn's pattern.
// Generated from the decompiled GML by tools/gml2js.py (a mechanical translation); do not edit by hand:
//   python -I tools/gml2js.py research/code/gml_Object_obj_hammer_of_justice_enemy_Other_10.gml \
//     --self scr_spearpattern --funcs choose,irandom,clamp,string=String,scr_debug_print=debugPrint
/* eslint-disable */
import { global, choose, irandom, clamp } from './rt.js?v=20261114041602';
import { scr_spearpattern } from './spears.js?v=20261114041602';

const debugPrint = () => {};

export function gersonPatterns() {
  let beat, speardistance, special, heartframestotal, spearspeed, heartframes, totalheartframes, rand, prev, a, c, beat2, b, aa, len, _spd, _time_to_heart, i, _dir, _direction, currentdistance;

  this.attackcount = 0;
  this.attackcountmax = 0;
  this.attacktimer = 0;
  this.swingdown_ex = 0;
  if (this.trueturn >= 20)
  {
      this.attackpattern = 19;
  }
  if (this.attackpattern == 100)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      beat = 16;
      speardistance = 80;
      special = 14;
      heartframestotal = 100;
      beat = 16;
      heartframestotal = 100;
      scr_spearpattern(this, "u", 40, heartframestotal, special, 40, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", 20, heartframestotal, special, 10, 120);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", 20, heartframestotal, special, 10, 120);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", 40, heartframestotal, special, 0, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 20, heartframestotal, special, 0, 150);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 30, heartframestotal, special, 40, 400);
      heartframestotal = heartframestotal + beat;
      heartframestotal = 130;
      scr_spearpattern(this, "u", 65, heartframestotal, special, 0, 40);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "d", 30, heartframestotal, special, 0, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", 40, heartframestotal, special, 0, 160);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 55, heartframestotal, special, 50, 300);
      heartframestotal = heartframestotal + beat;
      heartframestotal = 130;
      scr_spearpattern(this, "l", 30, heartframestotal, special, 0, 160);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", 37, heartframestotal, special, 0, 300);
      heartframestotal = heartframestotal + beat * 2;
      scr_spearpattern(this, "u", 45, heartframestotal, special, 0, 300);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 55, heartframestotal, special, 0, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 65, heartframestotal, special, 50, 300);
      heartframestotal = heartframestotal + beat;
      heartframestotal = 130;
      scr_spearpattern(this, "l", 65, heartframestotal, special, 0, 40);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 30, heartframestotal, special, 0, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", 40, heartframestotal, special, 0, 160);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "d", 55, heartframestotal, special, 50, 300);
      heartframestotal = heartframestotal + beat;
  }
  if (this.attackpattern == 101)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      beat = 10;
      speardistance = 80;
      special = 14;
      heartframestotal = 100;
      scr_spearpattern(this, "d", 200, heartframestotal + 70, special, 20, 260);
      scr_spearpattern(this, "u", 165, heartframestotal + 50, special, 0, 140);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", 60, heartframestotal, special, 0, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 70, heartframestotal, special, 0, 340);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", 80, heartframestotal, special, 0, 200);
      heartframestotal = heartframestotal + (beat + 16);
      scr_spearpattern(this, "d", 100, heartframestotal, special, 0, 340);
      heartframestotal = heartframestotal + beat;
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", 120, heartframestotal, special, 0, 250);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 130, heartframestotal, special, 180, 340);
      heartframestotal = heartframestotal + beat;
  }
  if (this.attackpattern == 110)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      beat = 9;
      special = 19;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, 90);
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, 50);
      scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, special, beat);
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "ur", spearspeed, heartframes, special, 50);
      scr_spearpattern(this, "dl", spearspeed * 1.2, heartframes, special, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "dr", spearspeed, heartframes, special, beat);
  }
  if (this.attackpattern == 111)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      beat = 9;
      special = 20;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, 90);
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, 120);
  }
  if (this.attackpattern == 112)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      beat = 9;
      special = 21;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, 50);
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 35);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 25);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 38);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 25);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 20);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 18);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 6);
  }
  if (this.attackpattern == 120)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, "u", 10, 50, 25, 60, 100);
      scr_spearpattern(this, "r", 10, 50, 25, 22, 30);
      scr_spearpattern(this, "l", 10, 50, 25, 10, 15);
      scr_spearpattern(this, "d", 10, 50, 25, 40, 30);
  }
  if (this.attackpattern == 140)
  {
      beat = 40;
      special = 32;
      scr_spearpattern(this, "up1", 0, 0, special, beat);
      scr_spearpattern(this, "up2", 0, 0, special, beat);
      scr_spearpattern(this, "left1", 0, 0, special, beat);
      scr_spearpattern(this, "left2", 0, 0, special, beat);
      scr_spearpattern(this, "down1", 0, 0, special, beat);
      scr_spearpattern(this, "down2", 0, 0, special, beat);
      scr_spearpattern(this, "right1", 0, 0, special, beat);
      scr_spearpattern(this, "right2", 0, 0, special, beat);
      scr_spearpattern(this, "diag1", 0, 0, special, beat);
      scr_spearpattern(this, "diag2", 0, 0, special, beat);
      scr_spearpattern(this, "diag3", 0, 0, special, beat);
      scr_spearpattern(this, "diag4", 0, 0, special, beat);
      scr_spearpattern(this, 0, -70, 0, special, beat);
      scr_spearpattern(this, 70, 0, 270, special, beat);
      scr_spearpattern(this, 90, -90, 315, special, beat);
      scr_spearpattern(this, -90, -90, 45, special, beat);
      scr_spearpattern(this, -90, 90, 135, special, beat);
      scr_spearpattern(this, 90, 90, 225, special, beat);
      scr_spearpattern(this, 0, 0, 0, 10, 1);
  }
  if (this.attackpattern == 150)
  {
      scr_spearpattern(this, 0, 10, 60, 26, 9999);
      scr_spearpattern(this, 0, 10, 60, 0, 9999);
  }
  if (this.attackpattern == 160)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 10);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "l", spearspeed, heartframes, 19, 20);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "r", spearspeed, heartframes, 19, 26);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 18);
      scr_spearpattern(this, "r", spearspeed, heartframes, 19, 11);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 20);
      scr_spearpattern(this, "l", spearspeed, heartframes, 19, 26);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 20);
  }
  if (this.attackpattern == 170)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 1);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 40, 40);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "dl", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "dr", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 35);
      scr_spearpattern(this, "d", spearspeed, heartframes, 40, 26);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 8);
  }
  if (this.attackpattern == 180)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 20);
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "l", spearspeed, heartframes, 40, 15);
      scr_spearpattern(this, "u", spearspeed, heartframes, 41, 10);
      scr_spearpattern(this, "d", spearspeed, heartframes, 42, 12);
      scr_spearpattern(this, "r", spearspeed, heartframes, 41, 8);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 40, 35);
      scr_spearpattern(this, "dl", spearspeed, heartframes, 41, 10);
      scr_spearpattern(this, "dr", spearspeed, heartframes, 42, 51);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 19, 12);
  }
  if (this.attackpattern == 200)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 1);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 45);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 20);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "d", spearspeed, heartframes, 20, 20);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 28);
  }
  if (this.attackpattern == 210)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 10);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 24);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 10);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 25);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 25);
  }
  if (this.attackpattern == 211)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 10);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 25);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 14);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 40);
      scr_spearpattern(this, "d", spearspeed, heartframes, 20, 12);
      scr_spearpattern(this, "r", spearspeed, heartframes, 20, 14);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 25);
  }
  if (this.attackpattern == 212)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 10);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 20);
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 14);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 20);
      scr_spearpattern(this, "r", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "r", spearspeed, heartframes, 20, 14);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 40);
  }
  if (this.attackpattern == 213)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 20);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 31);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 33);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 31);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 28);
  }
  if (this.attackpattern == 220)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 10);
      scr_spearpattern(this, 0, 0, 0, 3, 10);
      beat = 9;
      special = 20;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "r", 18, 30, 0, 0);
      scr_spearpattern(this, "dr", 18, 37, 0, 0);
      scr_spearpattern(this, "d", 18, 44, 0, 0);
      scr_spearpattern(this, "u", 18, 20, 20, 9);
      scr_spearpattern(this, "ur", 18, 50, 0, 9);
      scr_spearpattern(this, "r", 18, 50, 0, 6);
      scr_spearpattern(this, "ur", 18, 50, 0, 21);
      scr_spearpattern(this, "ul", 18, 50, 0, 0);
      scr_spearpattern(this, "ur", 18, 63, 0, 0);
      scr_spearpattern(this, "l", 20, 50, 20, 9);
      scr_spearpattern(this, "r", 18, 50, 0, 9);
      scr_spearpattern(this, "u", 18, 50, 0, 7);
      scr_spearpattern(this, "ur", 18, 50, 0, 16);
      scr_spearpattern(this, "u", 18, 50, 0, 9);
      scr_spearpattern(this, "l", 18, 50, 0, 12);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "dl", 18, 45, 0, 12);
      scr_spearpattern(this, "u", 16, heartframes, 20, 7);
      scr_spearpattern(this, "l", 16, heartframes, 20, 7);
      scr_spearpattern(this, "r", 16, heartframes, 20, 7);
      scr_spearpattern(this, "ul", 18, 57, 0, 0);
      scr_spearpattern(this, "d", 16, heartframes, 20, 72);
      scr_spearpattern(this, "ur", 16, heartframes, 20, 11);
      scr_spearpattern(this, "ul", 16, heartframes, 20, 11);
      scr_spearpattern(this, "dr", 12, heartframes, 20, 7);
      scr_spearpattern(this, "u", 16, 50, 0, 31);
      scr_spearpattern(this, "r", 16, 50, 0, 0);
  }
  if (this.attackpattern == 230)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      beat = 52;
      special = 35;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, 0, 0, 0, 1, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, 0, 0, 0, 1, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, 0, 0, 0, 1, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, beat);
  }
  if (this.attackpattern == 240)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 60);
      scr_spearpattern(this, choose("u", "r", "d", "l"), 8, 30, 16, 50);
      beat = 10;
      special = 16;
      spearspeed = 8;
      heartframes = 29;
      totalheartframes = heartframes;
      for (let _r1 = 0, _n1 = (1); _r1 < _n1; _r1++)
      {
          rand = choose(1, 2, 3);
          if (rand == 1)
          {
              scr_spearpattern(this, "ur", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "dl", spearspeed * 1.2, heartframes, special, beat - 4);
          }
          if (rand == 2)
          {
              scr_spearpattern(this, "dr", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "ur", spearspeed * 1.2, heartframes, special, beat - 4);
          }
          if (rand == 3)
          {
              scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "ur", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed * 1.2, heartframes, special, beat - 4);
          }
          rand = choose(1, 2, 3);
          if (rand == 1)
          {
              scr_spearpattern(this, "l", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "r", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "l", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "l", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "r", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "l", spearspeed * 1, heartframes, special, beat + 8);
          }
          if (rand == 2)
          {
              scr_spearpattern(this, "u", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "d", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "u", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "d", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "u", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "d", spearspeed * 1, heartframes, special, beat + 8);
          }
          if (rand == 3)
          {
              scr_spearpattern(this, "ul", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed * 1, heartframes, special, beat + 8);
          }
          rand = choose(1, 2, 3);
          if (rand == 1)
          {
              scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, special, beat * 0.5);
              scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "ur", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "ur", spearspeed, heartframes, special, beat);
          }
          if (rand == 2)
          {
              scr_spearpattern(this, "ur", spearspeed * 0.8, heartframes, special, beat * 0.5);
              scr_spearpattern(this, "ur", spearspeed * 0.8, heartframes, special, beat);
              scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed, heartframes, special, beat);
          }
          if (rand == 3)
          {
              scr_spearpattern(this, "dl", spearspeed * 0.8, heartframes, special, beat * 0.5);
              scr_spearpattern(this, "dl", spearspeed * 0.8, heartframes, special, beat);
              scr_spearpattern(this, "d", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "d", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed, heartframes, special, beat);
          }
      }
      scr_spearpattern(this, choose("u", "r", "d", "l"), spearspeed * 0.8, heartframes, special, beat);
  }
  if (this.attackpattern == 0)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 30);
      scr_spearpattern(this, 0, 0, 0, 34, 20);
      beat = 14;
      spearspeed = 8;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat * 2);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, beat * 2);
      scr_spearpattern(this, "d", spearspeed * 0.8, heartframes, 0, beat * 2);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, beat * 2);
  }
  if (this.attackpattern == 1)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 15);
      beat = 16;
      spearspeed = 6;
      heartframes = 50;
      heartframestotal = heartframes;
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", spearspeed * 0.8, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat * 2;
      scr_spearpattern(this, "d", spearspeed * 0.6, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat * 0.5;
      spearspeed = 18;
      beat = 8;
      scr_spearpattern(this, "r", spearspeed, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", spearspeed, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", spearspeed, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", spearspeed, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", spearspeed, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", spearspeed, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat * 1.2;
      scr_spearpattern(this, "u", spearspeed * 0.7, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat * 0.35;
      scr_spearpattern(this, "u", spearspeed * 0.7, heartframestotal, 0, 0);
      heartframestotal = heartframestotal + beat * 0.35;
      scr_spearpattern(this, "u", spearspeed * 0.7, heartframestotal, 0, 0);
  }
  if (this.attackpattern == 2)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 0);
      beat = 9;
      spearspeed = 14;
      heartframes = 50;
      heartframestotal = heartframes;
      scr_spearpattern(this, "l", 6, 110, 0, 0);
      scr_spearpattern(this, "r", 14, 40, 0, 0);
      scr_spearpattern(this, "u", 10, 50, 0, 0);
      scr_spearpattern(this, "d", 10, 60, 0, 0);
      scr_spearpattern(this, "r", 14, 70, 0, 0);
      scr_spearpattern(this, "d", 10, 80, 0, 0);
      scr_spearpattern(this, "u", 10, 90, 0, 0);
      scr_spearpattern(this, "r", 18, 115, 0, 0);
      scr_spearpattern(this, "u", 10, 130, 0, 0);
      scr_spearpattern(this, "d", 10, 140, 0, 0);
      scr_spearpattern(this, "l", 14, 150, 0, 0);
      scr_spearpattern(this, "d", 10, 160, 0, 0);
      scr_spearpattern(this, "u", 10, 170, 0, 0);
      scr_spearpattern(this, "l", 14, 180, 0, 0);
      scr_spearpattern(this, "l", 18, 190, 0, 0);
      scr_spearpattern(this, "r", 6, 205, 0, 0);
  }
  if (this.attackpattern == 3)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 0);
      beat = 10;
      spearspeed = 14;
      heartframes = 40;
      scr_spearpattern(this, "u", spearspeed - 4, heartframes, 0, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed - 6, heartframes, 0, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, beat * 2);
      scr_spearpattern(this, "u", spearspeed - 4, heartframes, 0, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed - 4, heartframes, 0, beat);
      scr_spearpattern(this, "ul", spearspeed * 0.3, heartframes * 3, 0, 0);
      scr_spearpattern(this, "l", spearspeed + 6, heartframes, 0, beat * 2);
      scr_spearpattern(this, "u", spearspeed - 4, heartframes, 0, beat);
      scr_spearpattern(this, "r", spearspeed + 6, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed - 4, heartframes, 0, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, beat);
      scr_spearpattern(this, 0, 0, 0, 3, beat * 2);
      scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, 0, beat * 2);
      scr_spearpattern(this, "ur", spearspeed + 4, heartframes, 0, beat);
  }
  if (this.attackpattern == 4)
  {
      beat = 10;
      spearspeed = 14;
      heartframes = 40;
      scr_spearpattern(this, 0, 0, 0, 36, 8);
      scr_spearpattern(this, "u", 1, 280, 355, 16);
      scr_spearpattern(this, 0, 0, 0, 9, 65);
      scr_spearpattern(this, "d", spearspeed - 4, heartframes, 0, beat);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, beat);
      scr_spearpattern(this, "d", spearspeed - 4, heartframes, 0, beat);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 0, beat * 2);
      scr_spearpattern(this, 0, 0, 0, 400, 1);
      scr_spearpattern(this, "d", spearspeed - 4, heartframes, 0, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, beat);
      scr_spearpattern(this, "d", spearspeed - 4, heartframes, 0, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 65);
      scr_spearpattern(this, 0, -70, 0, 32, 45);
      scr_spearpattern(this, 0, 0, 0, 10, 1);
  }
  if (this.attackpattern == 5)
  {
      scr_spearpattern(this, this.x, this.y, 60, 50, 9999);
  }
  if (this.attackpattern == 5.5)
  {
      beat = 25;
      scr_spearpattern(this, 0, -70, 0, 32, 8);
      for (let _r2 = 0, _n2 = (6); _r2 < _n2; _r2++)
      {
          if (prev == 0)
          {
              a = choose(1, 2);
          }
          if (prev == 1)
          {
              a = choose(0, 2);
          }
          if (prev == 2)
          {
              a = choose(0, 1);
          }
          prev = a;
          if (a == 0)
          {
              scr_spearpattern(this, "up1", 0, 0, 32, beat);
          }
          if (a == 1)
          {
              scr_spearpattern(this, 0, -70, 0, 32, beat);
          }
          if (a == 2)
          {
              scr_spearpattern(this, "up2", 0, 0, 32, beat);
          }
      }
      scr_spearpattern(this, 300, 125, -5, 4, 0);
      scr_spearpattern(this, 378, 125, -5, 4, 25);
      scr_spearpattern(this, 0, 0, -1, 32, 41);
      scr_spearpattern(this, 0, 0, 0, 10, 1);
  }
  if (this.attackpattern == 6)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 0);
      beat = 10;
      spearspeed = 12;
      heartframes = 40;
      scr_spearpattern(this, "ul", spearspeed - 2, heartframes, 0, beat);
      scr_spearpattern(this, "ul", spearspeed - 2, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed - 2, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed - 2, heartframes, 0, beat);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 0, beat * 1.5);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 0, beat * 3);
      scr_spearpattern(this, "ul", spearspeed + 2, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed + 2, heartframes, 0, beat);
      scr_spearpattern(this, "ur", spearspeed + 2, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed + 2, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "u", spearspeed + 2, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "ul", spearspeed + 2, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed + 4, heartframes, 0, beat);
      scr_spearpattern(this, "ur", spearspeed + 8, heartframes, 0, beat * 3);
      beat = 8;
      scr_spearpattern(this, "d", spearspeed + 4, heartframes, 0, beat * 1.5);
      scr_spearpattern(this, "dl", spearspeed + 8, heartframes, 0, beat * 1.5);
      scr_spearpattern(this, "d", spearspeed + 4, heartframes, 0, beat);
      scr_spearpattern(this, "dr", spearspeed + 8, heartframes, 0, beat);
  }
  if (this.attackpattern == 7)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 0);
      beat = 10;
      spearspeed = 12;
      heartframes = 40;
      scr_spearpattern(this, "l", spearspeed * 1.2, heartframes, 0, beat);
      scr_spearpattern(this, "l", spearspeed * 1.1, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "l", spearspeed * 1, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "r", spearspeed * 1.2, heartframes, 0, beat);
      scr_spearpattern(this, "r", spearspeed * 1.1, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "r", spearspeed * 1, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "u", spearspeed * 0.6, heartframes, 0, beat);
      scr_spearpattern(this, "ul", spearspeed * 0.8, heartframes, 0, beat * 1.2);
      scr_spearpattern(this, "d", spearspeed * 0.6, heartframes, 0, beat);
      scr_spearpattern(this, "dr", spearspeed * 0.8, heartframes, 0, beat);
      scr_spearpattern(this, "r", spearspeed * 1.2, heartframes, 0, beat);
      scr_spearpattern(this, "r", spearspeed * 1.1, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "r", spearspeed * 1, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "l", spearspeed * 1.2, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "l", spearspeed * 1.1, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "l", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "d", spearspeed * 0.6, heartframes, 0, beat);
      scr_spearpattern(this, "dr", spearspeed * 0.8, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed * 0.6, heartframes, 0, beat + 20);
      scr_spearpattern(this, "u", spearspeed, heartframes, 19, 70);
      scr_spearpattern(this, "l", spearspeed, heartframes, 19, 15);
      scr_spearpattern(this, "r", spearspeed, heartframes, 19, 15);
  }
  if (this.attackpattern == 8)
  {
      scr_spearpattern(this, this.x, this.y, 60, 51, 9999);
  }
  if (this.attackpattern == 9)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 0);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 16;
      speardistance = 80;
      special = 14;
      heartframestotal = 100;
      prev = 1;
      scr_spearpattern(this, "u", 12, 40, 19, 14);
      scr_spearpattern(this, "l", 12, 40, 19, 14);
      scr_spearpattern(this, "d", 12, 40, 19, 50);
      scr_spearpattern(this, "r", 12, 50, 35, 44);
      beat = 16;
      scr_spearpattern(this, 0, -70, 0, 32, beat);
      for (let _r3 = 0, _n3 = (6); _r3 < _n3; _r3++)
      {
          if (prev == 0)
          {
              a = choose(1, 2);
          }
          if (prev == 1)
          {
              a = choose(0, 2);
          }
          if (prev == 2)
          {
              a = choose(0, 1);
          }
          prev = a;
          if (a == 0)
          {
              scr_spearpattern(this, "up1", 0, 0, 32, beat);
          }
          if (a == 1)
          {
              scr_spearpattern(this, 0, -70, 0, 32, beat);
          }
          if (a == 2)
          {
              scr_spearpattern(this, "up2", 0, 0, 32, beat);
          }
      }
      scr_spearpattern(this, 300, 125, -5, 4, 0);
      scr_spearpattern(this, 378, 125, -5, 4, 25);
      scr_spearpattern(this, 0, 0, -1, 32, 41);
      scr_spearpattern(this, 0, 0, 0, 10, 1);
  }
  if (this.attackpattern == 10)
  {
      scr_spearpattern(this, 0, -70, 0, 32, this.swingdownbeatspeed);
      prev = 1;
      for (let _r4 = 0, _n4 = (7); _r4 < _n4; _r4++)
      {
          if (prev == 0)
          {
              a = choose(1, 2);
          }
          if (prev == 1)
          {
              a = choose(0, 2);
          }
          if (prev == 2)
          {
              a = choose(0, 1);
          }
          prev = a;
          if (irandom(100) < 25)
          {
              scr_spearpattern(this, 0, 0, choose(-1, -2), 32, this.swingdownbeatspeed);
              continue;
          }
          if (a == 0)
          {
              scr_spearpattern(this, "up1", 0, 0, 32, this.swingdownbeatspeed);
          }
          if (a == 1)
          {
              scr_spearpattern(this, 0, -70, 0, 32, this.swingdownbeatspeed);
          }
          if (a == 2)
          {
              scr_spearpattern(this, "up2", 0, 0, 32, this.swingdownbeatspeed);
          }
      }
      scr_spearpattern(this, 0, 0, choose(-1, -2), 32, this.swingdownbeatspeed + 10);
      this.swingdownbeatspeed = this.swingdownbeatspeed - 1;
      if (this.swingdownbeatspeed < 19)
      {
          this.swingdownbeatspeed = 19;
      }
      beat = 44;
      scr_spearpattern(this, 0, 0, 0, 11, beat);
      scr_spearpattern(this, 0, 0, 0, 12, beat);
      scr_spearpattern(this, 0, 0, 0, 11, beat);
      scr_spearpattern(this, 0, 0, 0, 12, beat);
      scr_spearpattern(this, 0, 0, 0, 10, 1);
  }
  if (this.attackpattern == 11)
  {
      scr_spearpattern(this, this.x, this.y, 60, 50, 9999);
  }
  if (this.attackpattern == 12)
  {
      beat = 9;
      special = 19;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, 0, 0, 0, 36, 0);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      scr_spearpattern(this, "u", spearspeed, 40, special, beat);
      scr_spearpattern(this, "l", spearspeed, 40, special, beat);
      scr_spearpattern(this, "r", spearspeed, 40, special, beat);
      scr_spearpattern(this, "d", spearspeed, 40, special, 42);
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 40.4, 23);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 7);
      scr_spearpattern(this, "dl", spearspeed, heartframes, 0, 7);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 7);
      scr_spearpattern(this, "dr", spearspeed, heartframes, 0, 7);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "d", spearspeed, heartframes, 40.4, 23);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 7);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, 7);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 7);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 0, 7);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 35);
      spearspeed = 4;
      heartframes = 90;
      scr_spearpattern(this, "u", 3, 129, 0, 0);
      scr_spearpattern(this, "dr", 4, 106, 0, 0);
      scr_spearpattern(this, "dr", 4, 114, 0, 8);
      scr_spearpattern(this, "l", 12, 30, 0, 8);
      scr_spearpattern(this, "r", 12, 38, 0, 8);
      scr_spearpattern(this, "d", 12, 38, 0, 8);
      scr_spearpattern(this, "ul", spearspeed + 8, heartframes - 40, 0, 0);
      scr_spearpattern(this, "dl", spearspeed + 9, heartframes - 30, 0, 0);
  }
  if (this.attackpattern == 13)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 0);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 8;
      spearspeed = 12;
      heartframes = 40;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 94);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 20, 82);
      heartframes = 155;
      spearspeed = 5;
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 0);
      scr_spearpattern(this, "dr", spearspeed, heartframes + 8, 0, 0);
      scr_spearpattern(this, "r", spearspeed, heartframes + 16, 0, 0);
      scr_spearpattern(this, "ul", spearspeed, heartframes + 24, 0, 0);
      scr_spearpattern(this, "l", spearspeed, heartframes + 32, 0, 0);
      scr_spearpattern(this, "ur", spearspeed * 2, heartframes + 40, 0, 0);
      scr_spearpattern(this, "dl", spearspeed * 3, heartframes + 48, 0, 0);
      scr_spearpattern(this, "u", spearspeed * 4, heartframes + 56, 0, 0);
      heartframes = 40;
      spearspeed = 12;
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 10);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 20, 10);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 36);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 33);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 33);
  }
  if (this.attackpattern == 14)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 0);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "l", spearspeed, heartframes, 19, 16);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "dr", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "r", spearspeed, heartframes, 19, 20);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 18);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 20);
      heartframes = 40;
      scr_spearpattern(this, "ul", 6, 146, 0, 0);
      scr_spearpattern(this, "r", 12, heartframes, 20, 12);
      scr_spearpattern(this, "ur", 12, heartframes, 20, 12);
      scr_spearpattern(this, "u", 12, heartframes, 20, 102);
      scr_spearpattern(this, "dr", 12, heartframes, 20, 12);
      scr_spearpattern(this, "r", 12, heartframes, 20, 12);
      scr_spearpattern(this, "ur", 12, heartframes, 20, 77);
      scr_spearpattern(this, "u", 15, 40, 0, 5);
      scr_spearpattern(this, "u", 15, 40, 0, 5);
      scr_spearpattern(this, "u", 15, 40, 0, 5);
      scr_spearpattern(this, "u", 15, 40, 0, 18);
      scr_spearpattern(this, "u", 25, 30, 35, 36);
  }
  if (this.attackpattern == 15)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 0);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 17);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 20);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "d", spearspeed, heartframes, 20, 12);
      scr_spearpattern(this, "r", spearspeed, heartframes, 20, 14);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 35);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 14);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 20);
  }
  if (this.attackpattern == 16)
  {
      scr_spearpattern(this, this.x, this.y, 60, 52, 9999);
  }
  if (this.attackpattern == 17)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 0);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 9;
      special = 20;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, 91);
      beat = 9;
      special = 21;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, 16);
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 24);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 20);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 10);
      scr_spearpattern(this, "r", 10, 50, 0, 20);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 20);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 0, 20);
      scr_spearpattern(this, "dl", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "dr", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "dr", spearspeed, heartframes, 0, 20);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 5);
  }
  if (this.attackpattern == 18)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 40);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      scr_spearpattern(this, "l", 12, 50, 35, 40);
      scr_spearpattern(this, 0, 0, 0, 29, 20);
      scr_spearpattern(this, 0, 0, 0, 27, 20);
      beat = 18;
      special = 32;
      scr_spearpattern(this, 70, 0, 270, special, beat);
      scr_spearpattern(this, "diag1", 0, 0, special, beat);
      scr_spearpattern(this, 0, -70, 0, special, beat);
      scr_spearpattern(this, "diag2", 0, 0, special, beat);
      scr_spearpattern(this, -70, 0, 90, special, beat);
      scr_spearpattern(this, "diag3", 0, 0, special, beat);
      scr_spearpattern(this, 0, 70, 180, special, beat);
      scr_spearpattern(this, "diag4", 0, 0, special, 60);
      scr_spearpattern(this, 0, 0, 0, 31, 5);
      c = 0;
      beat2 = 8;
      beat = 30;
      for (let _r5 = 0, _n5 = (2); _r5 < _n5; _r5++)
      {
          if (c == 1)
          {
              scr_spearpattern(this, 0, 0, 0, 1, 1);
          }
          c = 1;
          scr_spearpattern(this, "l", 16, 20, 30, beat2);
          scr_spearpattern(this, "up1", 0, 0, 32, beat);
          scr_spearpattern(this, 0, 0, 0, 1, 1);
          scr_spearpattern(this, "r", 16, 20, 30, beat2);
          scr_spearpattern(this, "up2", 0, 0, 32, beat);
          beat2 = beat2 - 1;
      }
      scr_spearpattern(this, 0, 0, 0, 1, 8);
      scr_spearpattern(this, "u", 16, 20, 30, beat2);
      scr_spearpattern(this, choose("right1", "left1"), 0, 0, 32, beat);
      beat2 = beat2 - 1;
      b = 0;
      for (let _r6 = 0, _n6 = (8); _r6 < _n6; _r6++)
      {
          b = choose(0, 1, 2, 3);
          if (b == 0)
          {
              scr_spearpattern(this, 0, 0, 0, 1, 1);
              scr_spearpattern(this, "l", 16, 20, 30, beat2);
              scr_spearpattern(this, choose("up1", "down1"), 0, 0, 32, beat);
          }
          if (b == 1)
          {
              scr_spearpattern(this, 0, 0, 0, 1, 1);
              scr_spearpattern(this, "r", 16, 20, 30, beat2);
              scr_spearpattern(this, choose("up2", "down2"), 0, 0, 32, beat);
          }
          if (b == 3)
          {
              scr_spearpattern(this, 0, 0, 0, 1, 1);
              scr_spearpattern(this, "u", 16, 20, 30, beat2);
              scr_spearpattern(this, choose("right1", "left1"), 0, 0, 32, beat);
          }
          if (b == 4)
          {
              scr_spearpattern(this, 0, 0, 0, 1, 1);
              scr_spearpattern(this, "d", 16, 20, 30, beat2);
              scr_spearpattern(this, choose("right2", "left2"), 0, 0, 32, beat);
          }
          beat2 = beat2 - 1;
          if (beat2 < 0)
          {
              beat2 = 0;
          }
      }
      scr_spearpattern(this, 3, 0, 0, 28, 0);
      scr_spearpattern(this, 0, 0, 0, 33, 0);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 27);
      scr_spearpattern(this, 0, 0, 0, 9, 60);
      scr_spearpattern(this, 0, 0, 0, 10, 1);
  }
  if (this.attackpattern == 19)
  {
      scr_spearpattern(this, 0, 0, 0, 36, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      scr_spearpattern(this, "u", 8, 47, 41.1, 10);
      scr_spearpattern(this, "l", 6, 55, 42.1, 20);
      scr_spearpattern(this, "ur", 10, 47, 40.6, 8);
      scr_spearpattern(this, "r", 12, 47, 21.66, 116);
      scr_spearpattern(this, "u", 10, 47, 20.1, 55);
      scr_spearpattern(this, "l", 18, 50, 35, 55);
      scr_spearpattern(this, "diag1", 0, 0, 32, 16);
      scr_spearpattern(this, 0, -70, 0, 32, 15);
      scr_spearpattern(this, "diag2", 0, 0, 32, 14);
      scr_spearpattern(this, -70, 0, 90, 32, 13);
      scr_spearpattern(this, "diag3", 0, 0, 32, 12);
      scr_spearpattern(this, 0, 70, 180, 32, 11);
      scr_spearpattern(this, "diag4", 0, 0, 32, 10);
      scr_spearpattern(this, 70, 0, 270, 32, 9);
      scr_spearpattern(this, "diag1", 0, 0, 32, 8);
      scr_spearpattern(this, 0, -70, 0, 32, 8);
      scr_spearpattern(this, "diag2", 0, 0, 32, 7);
      scr_spearpattern(this, -70, 0, 90, 32, 7);
      scr_spearpattern(this, "diag3", 0, 0, 32, 7);
      scr_spearpattern(this, 0, 70, 180, 32, 7);
      scr_spearpattern(this, "diag4", 0, 0, 32, 7);
      scr_spearpattern(this, 70, 0, 270, 32, 6);
      scr_spearpattern(this, "diag1", 0, 0, 32, 6);
      scr_spearpattern(this, 0, -70, 0, 32, 21);
      scr_spearpattern(this, 0, 0, 0, 27, 10);
      scr_spearpattern(this, 3, 0, 0, 28, 0);
      scr_spearpattern(this, 0, 0, -3, 4, 2);
      scr_spearpattern(this, 0, 0, -3, 4, 2);
      scr_spearpattern(this, 0, 0, -3, 4, 2);
      scr_spearpattern(this, 0, 0, -3, 4, 2);
      scr_spearpattern(this, 0, 0, -3, 4, 2);
      scr_spearpattern(this, 0, 0, -3, 4, 2);
      scr_spearpattern(this, 0, 0, -3, 4, 2);
      scr_spearpattern(this, 0, 0, -3, 4, 38);
      scr_spearpattern(this, 0, 0, 0, 10.5, 8);
      scr_spearpattern(this, 0, 0, 0, 9, 60);
  }
  if (this.attackpattern == 20)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 16;
      speardistance = 80;
      special = 14;
      heartframestotal = 100;
      beat = 16;
      heartframestotal = 100;
      scr_spearpattern(this, "u", 40, heartframestotal, special, 40, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", 20, heartframestotal, special, 10, 120);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", 20, heartframestotal, special, 10, 120);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", 40, heartframestotal, special, 0, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 20, heartframestotal, special, 0, 150);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 30, heartframestotal, special, 40, 400);
      heartframestotal = heartframestotal + beat;
      heartframestotal = 130;
      scr_spearpattern(this, "u", 65, heartframestotal, special, 0, 40);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "d", 30, heartframestotal, special, 0, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", 40, heartframestotal, special, 0, 160);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 55, heartframestotal, special, 50, 300);
      heartframestotal = heartframestotal + beat;
      heartframestotal = 130;
      scr_spearpattern(this, "l", 30, heartframestotal, special, 0, 160);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", 37, heartframestotal, special, 0, 300);
      heartframestotal = heartframestotal + beat * 2;
      scr_spearpattern(this, "u", 45, heartframestotal, special, 0, 300);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 55, heartframestotal, special, 0, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 65, heartframestotal, special, 50, 300);
      heartframestotal = heartframestotal + beat;
      heartframestotal = 130;
      scr_spearpattern(this, "l", 65, heartframestotal, special, 0, 40);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 30, heartframestotal, special, 0, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", 40, heartframestotal, special, 0, 160);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "d", 55, heartframestotal, special, 50, 300);
      heartframestotal = heartframestotal + beat;
  }
  if (this.attackpattern == 21)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 10;
      speardistance = 80;
      special = 14;
      heartframestotal = 100;
      scr_spearpattern(this, "d", 200, heartframestotal + 70, special, 20, 260);
      scr_spearpattern(this, "u", 165, heartframestotal + 50, special, 0, 140);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", 60, heartframestotal, special, 0, 80);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 70, heartframestotal, special, 0, 340);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", 80, heartframestotal, special, 0, 200);
      heartframestotal = heartframestotal + (beat + 16);
      scr_spearpattern(this, "d", 100, heartframestotal, special, 0, 340);
      heartframestotal = heartframestotal + beat;
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "l", 120, heartframestotal, special, 0, 250);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "r", 130, heartframestotal, special, 180, 340);
      heartframestotal = heartframestotal + beat;
  }
  if (this.attackpattern == 22)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 9;
      special = 19;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, 90);
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, 50);
      scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, special, beat);
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "ur", spearspeed, heartframes, special, 50);
      scr_spearpattern(this, "dl", spearspeed * 1.2, heartframes, special, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "dr", spearspeed, heartframes, special, beat);
  }
  if (this.attackpattern == 23)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 9;
      special = 20;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, 90);
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, 120);
  }
  if (this.attackpattern == 24)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 9;
      special = 21;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, 50);
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 35);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 25);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 38);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 25);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 4);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 20);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 18);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 6);
  }
  if (this.attackpattern == 25)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      scr_spearpattern(this, "u", 10, 50, 25, 60, 100);
      scr_spearpattern(this, "r", 10, 50, 25, 22, 30);
      scr_spearpattern(this, "l", 10, 50, 25, 10, 15);
      scr_spearpattern(this, "d", 10, 50, 25, 40, 30);
  }
  if (this.attackpattern == 26)
  {
      beat = 40;
      special = 32;
      scr_spearpattern(this, "up1", 0, 0, special, beat);
      scr_spearpattern(this, "up2", 0, 0, special, beat);
      scr_spearpattern(this, "left1", 0, 0, special, beat);
      scr_spearpattern(this, "left2", 0, 0, special, beat);
      scr_spearpattern(this, "down1", 0, 0, special, beat);
      scr_spearpattern(this, "down2", 0, 0, special, beat);
      scr_spearpattern(this, "right1", 0, 0, special, beat);
      scr_spearpattern(this, "right2", 0, 0, special, beat);
      scr_spearpattern(this, "diag1", 0, 0, special, beat);
      scr_spearpattern(this, "diag2", 0, 0, special, beat);
      scr_spearpattern(this, "diag3", 0, 0, special, beat);
      scr_spearpattern(this, "diag4", 0, 0, special, beat);
      scr_spearpattern(this, 0, -70, 0, special, beat);
      scr_spearpattern(this, 70, 0, 270, special, beat);
      scr_spearpattern(this, 90, -90, 315, special, beat);
      scr_spearpattern(this, -90, -90, 45, special, beat);
      scr_spearpattern(this, -90, 90, 135, special, beat);
      scr_spearpattern(this, 90, 90, 225, special, beat);
      scr_spearpattern(this, 0, 0, 0, 10, 1);
  }
  if (this.attackpattern == 27)
  {
      scr_spearpattern(this, 0, 10, 60, 26, 9999);
      scr_spearpattern(this, 0, 10, 60, 0, 9999);
  }
  if (this.attackpattern == 28)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 10);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "l", spearspeed, heartframes, 19, 20);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "r", spearspeed, heartframes, 19, 26);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 18);
      scr_spearpattern(this, "r", spearspeed, heartframes, 19, 11);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 20);
      scr_spearpattern(this, "l", spearspeed, heartframes, 19, 26);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 20);
  }
  if (this.attackpattern == 29)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 1);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 40, 40);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "dl", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "dr", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 35);
      scr_spearpattern(this, "d", spearspeed, heartframes, 40, 26);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 8);
  }
  if (this.attackpattern == 30)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 20);
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "l", spearspeed, heartframes, 40, 15);
      scr_spearpattern(this, "u", spearspeed, heartframes, 41, 10);
      scr_spearpattern(this, "d", spearspeed, heartframes, 42, 12);
      scr_spearpattern(this, "r", spearspeed, heartframes, 41, 8);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 40, 35);
      scr_spearpattern(this, "dl", spearspeed, heartframes, 41, 10);
      scr_spearpattern(this, "dr", spearspeed, heartframes, 42, 51);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 19, 12);
  }
  if (this.attackpattern == 31)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 1);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 45);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 20);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "d", spearspeed, heartframes, 20, 20);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 28);
  }
  if (this.attackpattern == 32)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 10);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 24);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 10);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 25);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 6);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 25);
  }
  if (this.attackpattern == 33)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 10);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 25);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 14);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 40);
      scr_spearpattern(this, "d", spearspeed, heartframes, 20, 12);
      scr_spearpattern(this, "r", spearspeed, heartframes, 20, 14);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 30);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 25);
  }
  if (this.attackpattern == 34)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 10);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 20);
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 14);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 20);
      scr_spearpattern(this, "r", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "r", spearspeed, heartframes, 20, 14);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 28);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 5);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 40);
  }
  if (this.attackpattern == 35)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 20);
      beat = 9;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "u", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 31);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 33);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "l", spearspeed, heartframes, 20, 9);
      scr_spearpattern(this, "r", spearspeed, heartframes, 0, 31);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 28);
  }
  if (this.attackpattern == 36)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 10);
      scr_spearpattern(this, 0, 0, 0, 3, 20);
      beat = 9;
      special = 20;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, 100);
      scr_spearpattern(this, "ur", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "ul", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "dl", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "dr", spearspeed, heartframes, special, 120);
  }
  if (this.attackpattern == 37)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      beat = 52;
      special = 35;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, 0, 0, 0, 1, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, 0, 0, 0, 1, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, 0, 0, 0, 1, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, beat);
  }
  if (this.attackpattern == 38)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 0);
      scr_spearpattern(this, 0, 0, 0, 3, 60);
      scr_spearpattern(this, choose("u", "r", "d", "l"), 8, 30, 16, 50);
      beat = 10;
      special = 16;
      spearspeed = 8;
      heartframes = 29;
      totalheartframes = heartframes;
      for (let _r7 = 0, _n7 = (1); _r7 < _n7; _r7++)
      {
          rand = choose(1, 2, 3);
          if (rand == 1)
          {
              scr_spearpattern(this, "ur", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "dl", spearspeed * 1.2, heartframes, special, beat - 4);
          }
          if (rand == 2)
          {
              scr_spearpattern(this, "dr", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "ur", spearspeed * 1.2, heartframes, special, beat - 4);
          }
          if (rand == 3)
          {
              scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "ur", spearspeed * 1.2, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed * 1.2, heartframes, special, beat - 4);
          }
          rand = choose(1, 2, 3);
          if (rand == 1)
          {
              scr_spearpattern(this, "l", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "r", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "l", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "l", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "r", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "l", spearspeed * 1, heartframes, special, beat + 8);
          }
          if (rand == 2)
          {
              scr_spearpattern(this, "u", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "d", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "u", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "d", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "u", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "d", spearspeed * 1, heartframes, special, beat + 8);
          }
          if (rand == 3)
          {
              scr_spearpattern(this, "ul", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed * 1, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed * 1, heartframes, special, beat + 8);
          }
          rand = choose(1, 2, 3);
          if (rand == 1)
          {
              scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, special, beat * 0.5);
              scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "ul", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "ur", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "ur", spearspeed, heartframes, special, beat);
          }
          if (rand == 2)
          {
              scr_spearpattern(this, "ur", spearspeed * 0.8, heartframes, special, beat * 0.5);
              scr_spearpattern(this, "ur", spearspeed * 0.8, heartframes, special, beat);
              scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed, heartframes, special, beat);
          }
          if (rand == 3)
          {
              scr_spearpattern(this, "dl", spearspeed * 0.8, heartframes, special, beat * 0.5);
              scr_spearpattern(this, "dl", spearspeed * 0.8, heartframes, special, beat);
              scr_spearpattern(this, "d", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "d", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed, heartframes, special, beat);
              scr_spearpattern(this, "dr", spearspeed, heartframes, special, beat);
          }
      }
      scr_spearpattern(this, choose("u", "r", "d", "l"), spearspeed * 0.8, heartframes, special, beat);
  }
  if (this.attackpattern == 39)
  {
      beat = 44;
      scr_spearpattern(this, 0, 0, 0, 11, beat);
      scr_spearpattern(this, 0, 0, 0, 12, beat);
      scr_spearpattern(this, 0, 0, 0, 12, beat);
      scr_spearpattern(this, 0, 0, 0, 11, beat);
      scr_spearpattern(this, 0, 0, 0, 27, 1);
      prev = 1;
      beat = 26;
      for (let _r8 = 0, _n8 = (14); _r8 < _n8; _r8++)
      {
          scr_spearpattern(this, choose("up1", "up2", "right1", "right2", "left1", "left2", "down1", "down2"), 0, 0, 32, beat);
          if (beat > 16)
          {
              beat = beat - 1;
          }
      }
      scr_spearpattern(this, 1, 0, 0, 28, 20);
      scr_spearpattern(this, 364, 145, -1, 4, 0);
      scr_spearpattern(this, 0, 0, 13, 4, 0);
      scr_spearpattern(this, 0, 0, 15, 4, 0);
      scr_spearpattern(this, 0, 0, 18, 4, 20);
      scr_spearpattern(this, 2, 0, 0, 28, 0);
      scr_spearpattern(this, 282, 145, -1, 4, 0);
      scr_spearpattern(this, 0, 0, 17, 4, 0);
      scr_spearpattern(this, 0, 0, 14, 4, 0);
      scr_spearpattern(this, 0, 0, 16, 4, 35);
      scr_spearpattern(this, 0, 0, 0, 10, 1);
  }
  if (this.attackpattern == 40)
  {
      beat = 9;
      special = 19;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      scr_spearpattern(this, "u", spearspeed, heartframes, special, 90);
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "l", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "r", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, 50);
      scr_spearpattern(this, "ul", spearspeed * 1.2, heartframes, special, beat);
      scr_spearpattern(this, "u", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "ur", spearspeed, heartframes, special, 50);
      scr_spearpattern(this, "dl", spearspeed * 1.2, heartframes, special, beat);
      scr_spearpattern(this, "d", spearspeed, heartframes, special, beat);
      scr_spearpattern(this, "dr", spearspeed, heartframes, special, 60);
      beat = 9;
      special = 20;
      spearspeed = 12;
      heartframes = 50;
      scr_spearpattern(this, "u", spearspeed, heartframes, special, 80);
      scr_spearpattern(this, "l", spearspeed, heartframes, special, 80);
      scr_spearpattern(this, "r", spearspeed, heartframes, special, 120);
  }
  if (this.attackpattern == 41)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 11, 30, 2, 31);
      scr_spearpattern(this, 0, 0, 0, 11, 38);
      scr_spearpattern(this, 0, 0, 0, 12, 33);
      scr_spearpattern(this, 0, 0, 0, 11, 33);
      scr_spearpattern(this, 0, 0, 0, 12, 4);
      scr_spearpattern(this, 268, 145, -1, 4, 20);
      scr_spearpattern(this, 378, 145, -1, 4, 40);
      scr_spearpattern(this, 378, 125, 0, 4, 1);
      scr_spearpattern(this, 268, 135, -1, 4, 30);
      scr_spearpattern(this, 378, 135, -1, 4, 1);
      scr_spearpattern(this, 268, 135, 0, 4, 30);
      scr_spearpattern(this, 0, 0, 0, 11, 33);
      scr_spearpattern(this, 0, 0, 0, 12, 36);
      scr_spearpattern(this, 0, 0, 0, 12, 5);
      scr_spearpattern(this, 115, 135, -1, 4, 32);
      scr_spearpattern(this, 0, 0, 0, 10, 1);
  }
  if (this.attackpattern == 42)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      special = 22;
      spearspeed = 6;
      heartframes = 50;
      scr_spearpattern(this, "u", 18, heartframes, special, 90);
      scr_spearpattern(this, "l", 18, heartframes, special, 12);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 36);
      scr_spearpattern(this, "l", spearspeed, heartframes, 0, 8);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 24);
      scr_spearpattern(this, "r", 18, heartframes, special, 9);
      scr_spearpattern(this, "u", spearspeed, heartframes, 0, 31);
      scr_spearpattern(this, "d", spearspeed, heartframes, 0, 20);
  }
  if (this.attackpattern == 43)
  {
      scr_spearpattern(this, 100, 145, -1, 13, 35);
      scr_spearpattern(this, 100, 145, -1, 4, 5);
      scr_spearpattern(this, 150, 145, -1, 4, 5);
      scr_spearpattern(this, 200, 145, -1, 4, 5);
      scr_spearpattern(this, 250, 145, -1, 4, 5);
      scr_spearpattern(this, 300, 145, -1, 4, 5);
      scr_spearpattern(this, 350, 145, -1, 4, 5);
      scr_spearpattern(this, 400, 145, -1, 4, 5);
      scr_spearpattern(this, 450, 145, -1, 4, 40);
      scr_spearpattern(this, 550, 145, -1, 4, 5);
      scr_spearpattern(this, 500, 145, -1, 4, 5);
      scr_spearpattern(this, 450, 145, -1, 4, 5);
      scr_spearpattern(this, 400, 145, -1, 4, 5);
      scr_spearpattern(this, 350, 145, -1, 4, 5);
      scr_spearpattern(this, 300, 145, -1, 4, 5);
      scr_spearpattern(this, 250, 145, -1, 4, 5);
      scr_spearpattern(this, 200, 145, -1, 4, 35);
      scr_spearpattern(this, 100, 145, -1, 4, 1);
      scr_spearpattern(this, 150, 145, -1, 4, 1);
      scr_spearpattern(this, 300, 145, -1, 4, 1);
      scr_spearpattern(this, 350, 145, -1, 4, 1);
      scr_spearpattern(this, 500, 145, -1, 4, 1);
      scr_spearpattern(this, 550, 145, -1, 4, 17);
      scr_spearpattern(this, 200, 145, -1, 4, 1);
      scr_spearpattern(this, 250, 145, -1, 4, 1);
      scr_spearpattern(this, 400, 145, -1, 4, 1);
      scr_spearpattern(this, 450, 145, -1, 4, 20);
      scr_spearpattern(this, 100, 145, -2, 4, 1);
      scr_spearpattern(this, 150, 145, -2, 4, 1);
      scr_spearpattern(this, 200, 145, -2, 4, 1);
      scr_spearpattern(this, 250, 145, -2, 4, 1);
      scr_spearpattern(this, 300, 145, -2, 4, 1);
      scr_spearpattern(this, 350, 145, -2, 4, 1);
      scr_spearpattern(this, 470, 145, -2, 4, 1);
      scr_spearpattern(this, 520, 145, -2, 4, 35);
      scr_spearpattern(this, 80, 145, -2, 4, 1);
      scr_spearpattern(this, 130, 145, -2, 4, 1);
      scr_spearpattern(this, 300, 145, -2, 4, 1);
      scr_spearpattern(this, 350, 145, -2, 4, 1);
      scr_spearpattern(this, 400, 145, -2, 4, 1);
      scr_spearpattern(this, 450, 145, -2, 4, 1);
      scr_spearpattern(this, 500, 145, -2, 4, 35);
      scr_spearpattern(this, 200, 145, -1, 4, 1);
      scr_spearpattern(this, 250, 145, -1, 4, 1);
      scr_spearpattern(this, 400, 145, -1, 4, 1);
      scr_spearpattern(this, 450, 145, -1, 4, 17);
      scr_spearpattern(this, 100, 145, -1, 4, 1);
      scr_spearpattern(this, 150, 145, -1, 4, 1);
      scr_spearpattern(this, 300, 145, -1, 4, 1);
      scr_spearpattern(this, 350, 145, -1, 4, 1);
      scr_spearpattern(this, 500, 145, -1, 4, 1);
      scr_spearpattern(this, 550, 145, -1, 4, 29);
      scr_spearpattern(this, 0, 0, 0, 10, 5);
  }
  if (this.attackpattern == 44)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 16;
      spearspeed = 25;
      heartframes = 100;
      heartframestotal = heartframes;
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframestotal, 14, 10);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframestotal, 14, 10);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframestotal, 14, 10);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, 270, 8, 30, 16, 10);
      scr_spearpattern(this, 270, 8, 30, 16, 10);
      scr_spearpattern(this, 270, 8, 30, 16, 21);
      scr_spearpattern(this, "l", spearspeed * 0.8, heartframestotal, 14, 10);
      heartframestotal = heartframestotal + beat;
      scr_spearpattern(this, "d", spearspeed * 0.6, heartframestotal, 14, 10);
      heartframestotal = heartframestotal + beat * 0.5;
      scr_spearpattern(this, "r", spearspeed, heartframestotal, 14, 10);
      scr_spearpattern(this, "r", spearspeed, heartframestotal, 14, 10);
      scr_spearpattern(this, "l", spearspeed, heartframestotal, 14, 10);
      scr_spearpattern(this, "l", spearspeed, heartframestotal, 14, 10);
      scr_spearpattern(this, "r", spearspeed, heartframestotal, 14, 10);
      scr_spearpattern(this, "l", spearspeed, heartframestotal, 14, 10);
      scr_spearpattern(this, "u", spearspeed * 0.7, heartframestotal, 14, 10);
      scr_spearpattern(this, "d", spearspeed * 0.7, heartframestotal, 14, 10);
      scr_spearpattern(this, "u", spearspeed * 0.7, heartframestotal, 14, 10);
      scr_spearpattern(this, 0, 8, 30, 16, 3);
      scr_spearpattern(this, 0, 8, 30, 16, 3);
      scr_spearpattern(this, 0, 8, 30, 16, 3);
      scr_spearpattern(this, 0, 8, 30, 16, 3);
      scr_spearpattern(this, 0, 8, 30, 16, 7);
      scr_spearpattern(this, 180, 8, 30, 16, 3);
      scr_spearpattern(this, 180, 8, 30, 16, 3);
      scr_spearpattern(this, 180, 8, 30, 16, 3);
      scr_spearpattern(this, 180, 8, 30, 16, 3);
      scr_spearpattern(this, 180, 8, 30, 16, 14);
      scr_spearpattern(this, 180, 8, 30, 360, 3);
      scr_spearpattern(this, 180, 8, 30, 360, 3);
      scr_spearpattern(this, 180, 8, 30, 360, 3);
      scr_spearpattern(this, 180, 8, 30, 360, 3);
      scr_spearpattern(this, 180, 8, 30, 360, 12);
      scr_spearpattern(this, 90, 8, 30, 270, 3);
      scr_spearpattern(this, 90, 8, 30, 270, 3);
      scr_spearpattern(this, 90, 8, 30, 270, 3);
      scr_spearpattern(this, 90, 8, 30, 270, 3);
      scr_spearpattern(this, 90, 8, 30, 270, 20);
      aa = 38;
      beat = 18;
      len = 150;
      scr_spearpattern(this, 0, aa + beat * 7, len, 17, 0);
      scr_spearpattern(this, 45, aa + beat * 10, len, 17, 0);
      scr_spearpattern(this, 90, aa + beat * 14, len, 17, 0);
      scr_spearpattern(this, 135, aa + beat * 4, len, 17, 0);
      scr_spearpattern(this, 180, aa + beat * 11, len, 17, 0);
      scr_spearpattern(this, 225, aa + beat * 3, len, 17, 0);
      scr_spearpattern(this, 270, aa + beat * 1, len, 17, 0);
      scr_spearpattern(this, 315, aa + beat * 15, len, 17, 0);
      len = 200;
      scr_spearpattern(this, 0, aa + beat * 0, len, 17, 0);
      scr_spearpattern(this, 45, aa + beat * 5, len, 17, 0);
      scr_spearpattern(this, 90, aa + beat * 6, len, 17, 0);
      scr_spearpattern(this, 135, aa + beat * 13, len, 17, 0);
      scr_spearpattern(this, 180, aa + beat * 9, len, 17, 0);
      scr_spearpattern(this, 225, aa + beat * 8, len, 17, 0);
      scr_spearpattern(this, 270, aa + beat * 12, len, 17, 0);
      scr_spearpattern(this, 315, aa + beat * 2, len, 17, 320);
      len = 150;
      scr_spearpattern(this, 0, aa + beat * 7, len, 18, 0);
      scr_spearpattern(this, 45, aa + beat * 10, len, 18, 0);
      scr_spearpattern(this, 90, aa + beat * 14, len, 18, 0);
      scr_spearpattern(this, 135, aa + beat * 4, len, 18, 0);
      scr_spearpattern(this, 180, aa + beat * 11, len, 18, 0);
      scr_spearpattern(this, 225, aa + beat * 3, len, 18, 0);
      scr_spearpattern(this, 270, aa + beat * 1, len, 18, 0);
      scr_spearpattern(this, 315, aa + beat * 15, len, 18, 0);
      len = 200;
      scr_spearpattern(this, 0, aa + beat * 0, len, 18, 0);
      scr_spearpattern(this, 45, aa + beat * 5, len, 18, 0);
      scr_spearpattern(this, 90, aa + beat * 6, len, 18, 0);
      scr_spearpattern(this, 135, aa + beat * 13, len, 18, 0);
      scr_spearpattern(this, 180, aa + beat * 9, len, 18, 0);
      scr_spearpattern(this, 225, aa + beat * 8, len, 18, 0);
      scr_spearpattern(this, 270, aa + beat * 12, len, 18, 0);
      scr_spearpattern(this, 315, aa + beat * 2, len, 18, 150);
  }
  if (this.attackpattern == 45)
  {
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 3);
      scr_spearpattern(this, 0, 0, -3, 4, 27);
      scr_spearpattern(this, 0, 0, 0, 9, 60);
      scr_spearpattern(this, 0, 0, 0, 10, 5);
  }
  if (this.attackpattern == 46)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      scr_spearpattern(this, 0, 0, 0, 8, 11);
      scr_spearpattern(this, 270, 8, 30, 0, 3);
      scr_spearpattern(this, 270, 8, 30, 0, 3);
      scr_spearpattern(this, 270, 8, 30, 0, 3);
      scr_spearpattern(this, 270, 8, 30, 0, 3);
      scr_spearpattern(this, 180, 11, 30, 0, 3);
      scr_spearpattern(this, 180, 11, 30, 0, 3);
      scr_spearpattern(this, 180, 11, 30, 0, 3);
      scr_spearpattern(this, 180, 11, 30, 0, 3);
      scr_spearpattern(this, 0, 11, 30, 0, 3);
      scr_spearpattern(this, 0, 11, 30, 0, 3);
      scr_spearpattern(this, 0, 11, 30, 0, 3);
      scr_spearpattern(this, 0, 11, 30, 0, 3);
      scr_spearpattern(this, 90, 8, 30, 0, 3);
      scr_spearpattern(this, 90, 8, 30, 0, 3);
      scr_spearpattern(this, 90, 8, 30, 0, 3);
      scr_spearpattern(this, 90, 8, 30, 0, 31);
      scr_spearpattern(this, 270, 0, 0, 2, 41);
      scr_spearpattern(this, 358, 115, 0, 4, 30);
      scr_spearpattern(this, 0, 0, 0, 1, 11);
      scr_spearpattern(this, 90, 0, 0, 2, 41);
      scr_spearpattern(this, 278, 115, -1, 4, 30);
      scr_spearpattern(this, 0, 0, 0, 1, 11);
      scr_spearpattern(this, 0, 0, 0, 2, 41);
      scr_spearpattern(this, 358, 115, 0, 4, 30);
      scr_spearpattern(this, 0, 0, 0, 1, 11);
      scr_spearpattern(this, 180, 0, 0, 2, 41);
      scr_spearpattern(this, 278, 115, -1, 4, 20);
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 11, 30, 0, 10);
      scr_spearpattern(this, 180, 11, 30, 0, 10);
      scr_spearpattern(this, 0, 11, 30, 0, 21);
      scr_spearpattern(this, 180, 11, 30, 0, 10);
      scr_spearpattern(this, 0, 11, 30, 0, 10);
      scr_spearpattern(this, 180, 11, 30, 0, 21);
      scr_spearpattern(this, 270, 0, 0, 2, 51);
      scr_spearpattern(this, 268, 115, 60, 4, 1);
      scr_spearpattern(this, 316, 115, 60, 4, 1);
      scr_spearpattern(this, 358, 115, 0, 4, 20);
      scr_spearpattern(this, 0, 0, 0, 9, 61);
  }
  if (this.attackpattern == 47)
  {
      scr_spearpattern(this, 100, 145, -1, 13, 35);
      scr_spearpattern(this, 100, 145, -1, 4, 5);
      scr_spearpattern(this, 150, 145, -1, 4, 5);
      scr_spearpattern(this, 200, 145, -1, 4, 5);
      scr_spearpattern(this, 250, 145, -1, 4, 5);
      scr_spearpattern(this, 300, 145, -1, 4, 5);
      scr_spearpattern(this, 350, 145, -1, 4, 5);
      scr_spearpattern(this, 400, 145, -1, 4, 5);
      scr_spearpattern(this, 450, 145, -1, 4, 40);
      scr_spearpattern(this, 550, 145, -1, 4, 8);
      scr_spearpattern(this, 500, 145, -1, 4, 8);
      scr_spearpattern(this, 450, 145, -1, 4, 8);
      scr_spearpattern(this, 400, 145, -1, 4, 8);
      scr_spearpattern(this, 350, 145, -1, 4, 8);
      scr_spearpattern(this, 300, 145, -1, 4, 8);
      scr_spearpattern(this, 250, 145, -1, 4, 8);
      scr_spearpattern(this, 200, 145, -1, 4, 35);
      scr_spearpattern(this, 100, 145, -1, 4, 1);
      scr_spearpattern(this, 150, 145, -1, 4, 1);
      scr_spearpattern(this, 300, 145, -1, 4, 1);
      scr_spearpattern(this, 350, 145, -1, 4, 1);
      scr_spearpattern(this, 500, 145, -1, 4, 1);
      scr_spearpattern(this, 550, 145, -1, 4, 12);
      scr_spearpattern(this, 100, 145, -1, 4, 1);
      scr_spearpattern(this, 150, 145, -1, 4, 1);
      scr_spearpattern(this, 200, 145, -1, 4, 1);
      scr_spearpattern(this, 250, 145, -1, 4, 1);
      scr_spearpattern(this, 400, 145, -1, 4, 1);
      scr_spearpattern(this, 450, 145, -1, 4, 20);
      scr_spearpattern(this, 100, 145, -2, 4, 1);
      scr_spearpattern(this, 150, 145, -2, 4, 1);
      scr_spearpattern(this, 200, 145, -2, 4, 1);
      scr_spearpattern(this, 250, 145, -2, 4, 1);
      scr_spearpattern(this, 300, 145, -2, 4, 1);
      scr_spearpattern(this, 350, 145, -2, 4, 1);
      scr_spearpattern(this, 470, 145, -2, 4, 1);
      scr_spearpattern(this, 520, 145, -2, 4, 35);
      scr_spearpattern(this, 80, 145, -2, 4, 1);
      scr_spearpattern(this, 130, 145, -2, 4, 1);
      scr_spearpattern(this, 300, 145, -2, 4, 1);
      scr_spearpattern(this, 350, 145, -2, 4, 1);
      scr_spearpattern(this, 400, 145, -2, 4, 1);
      scr_spearpattern(this, 450, 145, -2, 4, 1);
      scr_spearpattern(this, 500, 145, -2, 4, 35);
      scr_spearpattern(this, 200, 145, -1, 4, 1);
      scr_spearpattern(this, 250, 145, -1, 4, 1);
      scr_spearpattern(this, 400, 145, -1, 4, 1);
      scr_spearpattern(this, 450, 145, -1, 4, 12);
      scr_spearpattern(this, 100, 145, -1, 4, 1);
      scr_spearpattern(this, 150, 145, -1, 4, 1);
      scr_spearpattern(this, 300, 145, -1, 4, 1);
      scr_spearpattern(this, 350, 145, -1, 4, 1);
      scr_spearpattern(this, 500, 145, -1, 4, 1);
      scr_spearpattern(this, 550, 145, -1, 4, 40);
      scr_spearpattern(this, 0, 0, 0, 10, 50);
  }
  if (this.attackpattern == 48)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 268, 115, 60, 4, 1);
      scr_spearpattern(this, 316, 115, 60, 4, 1);
      scr_spearpattern(this, 364, 115, 60, 4, 9999);
      scr_spearpattern(this, 0, 5, 60, 0, 9999);
  }
  if (this.attackpattern == 49)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      scr_spearpattern(this, 0, 11, 30, 2, 1);
      scr_spearpattern(this, 0, 5, 60, 5, 240);
  }
  if (this.attackpattern == 50)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      scr_spearpattern(this, 270, 8, 30, 0, 10);
      scr_spearpattern(this, 225, 13, 30, 0, 10);
      scr_spearpattern(this, 270, 8, 30, 0, 21);
      scr_spearpattern(this, 270, 8, 30, 0, 10);
      scr_spearpattern(this, 315, 13, 30, 0, 10);
      scr_spearpattern(this, 270, 8, 30, 0, 21);
      scr_spearpattern(this, 270, 8, 30, 0, 10);
      scr_spearpattern(this, 225, 13, 30, 0, 10);
      scr_spearpattern(this, 270, 8, 30, 0, 10);
      scr_spearpattern(this, 315, 13, 30, 0, 10);
      scr_spearpattern(this, 135, 13, 30, 0, 10);
      scr_spearpattern(this, 45, 13, 30, 0, 10);
      scr_spearpattern(this, 180, 11, 30, 0, 10);
  }
  if (this.attackpattern == 51)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 1);
      _spd = 12;
      _time_to_heart = 50;
      for (let _r9 = 0, _n9 = (2); _r9 < _n9; _r9++)
      {
          scr_spearpattern(this, 270, _spd, _time_to_heart, 0, 15);
          scr_spearpattern(this, 315, _spd, _time_to_heart, 0, 15);
          scr_spearpattern(this, 0, _spd, _time_to_heart, 0, 15);
          scr_spearpattern(this, 45, _spd, _time_to_heart, 0, 15);
          scr_spearpattern(this, 90, _spd, _time_to_heart, 0, 15);
          scr_spearpattern(this, 135, _spd, _time_to_heart, 0, 15);
          scr_spearpattern(this, 180, _spd, _time_to_heart, 0, 15);
          scr_spearpattern(this, 225, _spd, _time_to_heart, 0, 15);
          _spd = _spd + 3;
      }
  }
  if (this.attackpattern == 52)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 60);
      scr_spearpattern(this, 90, 8, 40, 315, 45);
      scr_spearpattern(this, 180, 8, 40, 225, 40);
      scr_spearpattern(this, 270, 5, 60, 135, 45);
  }
  if (this.attackpattern == 53)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 0);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      beat = 4;
      spearspeed = 9;
      heartframes = 40;
      i = 0;
      while (i < 5)
      {
          _dir = 90 + i * 45;
          scr_spearpattern(this, _dir, spearspeed, heartframes, 0, beat);
          i = i + 1;
      }
      scr_spearpattern(this, 0, 0, 0, 3, 8);
      i = 0;
      while (i < 5)
      {
          _dir = 180 - i * 45;
          scr_spearpattern(this, _dir, spearspeed, heartframes, 0, beat);
          i = i + 1;
      }
      scr_spearpattern(this, 0, 0, 0, 3, 8);
      i = 0;
      while (i < 5)
      {
          _dir = 90 + i * 45;
          scr_spearpattern(this, _dir, spearspeed, heartframes, 0, beat);
          i = i + 1;
      }
      scr_spearpattern(this, 0, 0, 0, 3, 8);
      i = 0;
      while (i < 11)
      {
          _dir = 180 - i * 45;
          scr_spearpattern(this, _dir, spearspeed, heartframes, 0, beat);
          i = i + 1;
      }
      i = 0;
      while (i < 30)
      {
          _dir = 90 + i * 45;
          scr_spearpattern(this, _dir, spearspeed, heartframes, 0, beat);
          spearspeed = spearspeed + 0.5;
          i = i + 1;
      }
      scr_spearpattern(this, 0, 0, 0, 3, 8);
  }
  if (this.attackpattern == 54)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 1);
      beat = 8;
      spearspeed = 12;
      heartframes = 40;
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, beat);
      scr_spearpattern(this, "ul", spearspeed, heartframes, 0, beat);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 0, beat);
      scr_spearpattern(this, "ur", spearspeed, heartframes, 0, beat);
      scr_spearpattern(this, "l", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "l", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat);
      scr_spearpattern(this, "ur", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "ur", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "ul", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "ul", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "r", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "r", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat);
      scr_spearpattern(this, "ul", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "ul", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "ur", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "ur", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat * 0.5);
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat);
      scr_spearpattern(this, "d", spearspeed * 0.8, heartframes, 0, beat);
      scr_spearpattern(this, "l", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "r", spearspeed * 1, heartframes, 0, beat);
      scr_spearpattern(this, "u", spearspeed * 0.8, heartframes, 0, beat);
  }
  if (this.attackpattern == 55)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 40);
      beat = 15;
      spearspeed = 10;
      heartframes = 40;
      b = 0;
      i = 0;
      while (i < 16)
      {
          _direction = 90 * choose(0, 1, 2, 3);
          scr_spearpattern(this, _direction, spearspeed, heartframes, 0, beat);
          scr_spearpattern(this, _direction + choose(-45, 45, 90, 180, 270), spearspeed, heartframes, 0, beat);
          if (spearspeed < 20)
          {
              spearspeed = spearspeed + 2;
          }
          if (i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7)
          {
              beat = beat - 1;
          }
          i = i + 1;
      }
  }
  if (this.attackpattern == 56)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 60);
      scr_spearpattern(this, 0, 0, 0, 3, 1);
      beat = 7;
      spearspeed = 3;
      heartframes = 120;
      i = 0;
      while (i < 24)
      {
          _direction = choose(0, 90, 180, 270);
          scr_spearpattern(this, _direction, spearspeed, heartframes, 0, beat);
          scr_spearpattern(this, _direction + choose(-45, 45, 90, 180, 270), spearspeed, heartframes, 0, beat);
          i = i + 1;
      }
  }
  if (this.attackpattern == 57 || this.attackpattern == 58)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 20);
      scr_spearpattern(this, 0, 0, 0, 3, 20);
      beat = 10;
      spearspeed = 12;
      heartframes = 20;
      totalheartframes = heartframes;
      if (this.attackpattern == 56)
      {
          spearspeed = 6;
          beat = 8;
      }
      if (this.attackpattern == 57)
      {
          spearspeed = 7;
          beat = 7;
      }
      if (this.attackpattern == 58)
      {
          spearspeed = 8;
          beat = 6;
      }
      i = 0;
      while (i < 20)
      {
          _direction = 90 * choose(0, 1, 2, 3);
          scr_spearpattern(this, _direction, spearspeed, totalheartframes, 0, 0);
          totalheartframes = totalheartframes + beat;
          scr_spearpattern(this, _direction + choose(-45, 45, 90, 180, 270), spearspeed, totalheartframes, 0, 0);
          totalheartframes = totalheartframes + beat;
          i = i + 1;
      }
  }
  if (this.attackpattern == 56.5)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 1);
      beat = 20;
      spearspeed = 20;
      heartframes = 40;
      currentdistance = 40;
      i = 0;
      while (i < 51)
      {
          scr_spearpattern(this, 180 + i * 45, clamp(spearspeed - i * 0.5, 5, 20), currentdistance, 0, 1);
          currentdistance = currentdistance + clamp(beat - i, 3, 20);
          i = i + 1;
      }
  }
  if (this.attackpattern == 57)
  {
      scr_spearpattern(this, 0, 0, 0, 1, 1);
      scr_spearpattern(this, 0, 0, 0, 3, 0);
      scr_spearpattern(this, 270, 8, 30, 0, 3);
      scr_spearpattern(this, 270, 8, 30, 0, 3);
      scr_spearpattern(this, 270, 8, 30, 0, 3);
      scr_spearpattern(this, 270, 8, 30, 0, 3);
      scr_spearpattern(this, 180, 11, 30, 0, 3);
      scr_spearpattern(this, 180, 11, 30, 0, 3);
      scr_spearpattern(this, 180, 11, 30, 0, 3);
      scr_spearpattern(this, 180, 11, 30, 0, 3);
      scr_spearpattern(this, 0, 11, 30, 0, 3);
      scr_spearpattern(this, 0, 11, 30, 0, 3);
      scr_spearpattern(this, 0, 11, 30, 0, 3);
      scr_spearpattern(this, 0, 11, 30, 0, 3);
      scr_spearpattern(this, 90, 8, 30, 0, 3);
      scr_spearpattern(this, 90, 8, 30, 0, 3);
      scr_spearpattern(this, 90, 8, 30, 0, 3);
      scr_spearpattern(this, 90, 8, 30, 0, 5);
      scr_spearpattern(this, 270, 8, 30, 0, 5);
      scr_spearpattern(this, 270, 8, 30, 0, 5);
      scr_spearpattern(this, 180, 11, 30, 0, 5);
      scr_spearpattern(this, 180, 11, 30, 0, 5);
      scr_spearpattern(this, 0, 11, 30, 0, 5);
      scr_spearpattern(this, 270, 8, 30, 0, 5);
      scr_spearpattern(this, 90, 8, 30, 0, 5);
      scr_spearpattern(this, 180, 11, 30, 0, 5);
      scr_spearpattern(this, 90, 8, 30, 0, 3);
      scr_spearpattern(this, 90, 8, 30, 0, 3);
      scr_spearpattern(this, 90, 8, 30, 0, 5);
      scr_spearpattern(this, 90, 8, 30, 0, 5);
      scr_spearpattern(this, 0, 11, 30, 0, 5);
      scr_spearpattern(this, 0, 11, 30, 0, 5);
      scr_spearpattern(this, 180, 11, 30, 0, 5);
      scr_spearpattern(this, 180, 11, 30, 0, 5);
      scr_spearpattern(this, 270, 8, 30, 0, 5);
      scr_spearpattern(this, 270, 8, 30, 0, 5);
      scr_spearpattern(this, 0, 11, 30, 0, 3);
      scr_spearpattern(this, 0, 11, 30, 0, 5);
      scr_spearpattern(this, 180, 11, 30, 0, 5);
      scr_spearpattern(this, 270, 8, 30, 0, 5);
      scr_spearpattern(this, 270, 8, 30, 0, 5);
      scr_spearpattern(this, 180, 11, 30, 0, 3);
      scr_spearpattern(this, 180, 11, 30, 0, 5);
      scr_spearpattern(this, 0, 11, 30, 0, 5);
      scr_spearpattern(this, 270, 8, 30, 0, 5);
      scr_spearpattern(this, 270, 8, 30, 0, 5);
  }
  if (this.attackpattern == 70)
  {
      scr_spearpattern(this, this.x, this.y, 60, 50, 9999);
  }
  if (this.attackpattern == 71)
  {
      scr_spearpattern(this, this.x, this.y, 60, 51, 9999);
  }
  if (this.attackpattern == 72)
  {
      scr_spearpattern(this, this.x, this.y, 60, 52, 9999);
  }
  if (this.attackpattern == 73)
  {
      scr_spearpattern(this, this.x, this.y, 60, 53, 9999);
  }
  if (this.attackpattern > 69 && this.attackpattern < 72)
  {
      this.boxoffset = true;
  }
  else
  {
      this.boxoffset = false;
  }
  debugPrint("turn=" + String(this.trueturn));
  debugPrint("balloonturn=" + String(this.turn));
  debugPrint("attackpattern=" + String(this.attackpattern));
  if (this.trueturn == 0)
  {
      this.attackpattern = 1;
  }
  else if (this.trueturn == 1)
  {
      this.attackpattern = 2;
  }
  else if (this.trueturn == 2)
  {
      this.attackpattern = 3;
  }
  else if (this.trueturn == 3)
  {
      this.attackpattern = 4;
  }
  else if (this.trueturn == 4)
  {
      this.attackpattern = 72;
  }
  else if (this.trueturn == 5)
  {
      this.attackpattern = 70;
  }
  else if (this.trueturn == 6)
  {
      this.attackpattern = 6;
  }
  else if (this.trueturn == 7)
  {
      this.attackpattern = 7;
  }
  else if (this.trueturn == 8)
  {
      this.attackpattern = 12;
  }
  else if (this.trueturn == 9)
  {
      this.attackpattern = 9;
  }
  else if (this.trueturn == 10)
  {
      this.attackpattern = 47;
  }
  else if (this.trueturn == 11)
  {
      this.attackpattern = 70;
  }
  else if (this.trueturn == 12)
  {
      this.attackpattern = 13;
  }
  else if (this.trueturn == 13)
  {
      this.attackpattern = 14;
  }
  else if (this.trueturn == 14)
  {
      this.attackpattern = 53;
  }
  else if (this.trueturn == 15)
  {
      this.attackpattern = 55;
  }
  else if (this.trueturn == 16)
  {
      this.attackpattern = 56;
  }
  else if (this.trueturn == 17)
  {
      this.attackpattern = 220;
  }
  else if (this.trueturn == 20)
  {
      this.attackpattern = 19;
      this.trueturn = 14;
      this.reachedendphase = 1;
  }
  this.trueturn = this.trueturn + 1;
  this.turn = this.turn + 1;
}
void global;
