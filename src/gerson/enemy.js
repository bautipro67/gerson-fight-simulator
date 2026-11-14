// THE HAMMER OF JUSTICE: obj_hammer_of_justice_enemy (Create, Step, End Step, Draw, Alarm_4/6/7,
// Other_10 (src/gerson/patterns.js), Other_22, Other_24, CleanUp).
// Susie fights alone with a green SOUL. Every turn Gerson talks (the story of the prophecy), then
// his queued attack plays out entry by entry through scr_spearshot. There is no HP race: FIGHT,
// Susie's healing and Rude Buster raise `progress`, and the fight ends when the last attack has
// played (or when Susie falls, which only ends the fight).
import {
  G, global, Instance, defineObject, instance_create, instance_create_depth, instance_destroy, instance_exists,
  instancesOf, choose, irandom, random, lerp, draw_sprite_ext, draw_self, d3d_set_fog, draw_set_color, draw_set_halign,
  sprite_set_offset, button3_p, snd_play, snd_stop, snd_loop, snd_volume, snd_pitch, S,
} from './rt.js?v=20261114055615';
import { first, camerax, cameray, camerawidth, cameraheight, i_ex, tagParent, scr_afterimage, scr_shakeobj, snd_play_pitch, snd_play_x } from './common.js?v=20261114055615';
import { scr_spearpattern_reset, scr_spearshot } from './spears.js?v=20261114055615';
import { gersonPatterns } from './patterns.js?v=20261114055615';
import { MonsterParent } from '../battle/misc.js?v=20261114055615';

const writer = () => i_ex('obj_writer');
const killWriters = () => { for (const w of instancesOf('obj_writer')) instance_destroy(w); };
// mus_volume / mus_fade on global.batmusic[1] (the playing voice).
const musVolume = (v, frames) => global.batmusic?.[1]?.setVolume?.(v, frames);

const LINES = {
  1: 'So you got moves,&so what?/%',
  2: "You're facing a hero.&There isn't anything&that's gonna stand&in our way!/%",
  3: 'So the story goes,&so the story goes./%',
  '3b': "But ain't every story&better with a little&twist?/%",
  4: 'H... huh?&Something&feels... off.../%',
  5: "You won't&learn anything&runnin' away,&y'know!/%",
  6: "If you've got&guts, let's see&how you deal&facing everything&head-on!!/%",
  7: '(Kris, help&me out!)/%',
  8: "If you've got guts,&c'mon and let your&axe do the talking!/%",
  9: 'You gotta BLOCK, you&understand?!/%',
  '9b': "(Kris, don't mess&this up)/%",
  12: "As long as you're GREEN,&you can't run away!/%",
  '12b': 'Unless you FACE DANGER&HEAD ON... These bullets&will do you in!/%',
  13: 'Did you ever hear&that old tale?/%',
  14: 'Yes, the old tale,&based upon the&prophecy.../%',
  '14b': 'Lord of the Hammer./%',
  '14c': 'Think I heard about it.&What happens?/%',
  15: 'Chapter 1&The March of&the Dark King./%',
  16: 'The heroes defeat&the king and&stop the dragon./%',
  18: 'Chapter 2&The City of &the Shining./%',
  '18b': 'The heroes do&battle in chariots&to save the Queen./%',
  19: 'Chapter 3, The &Isles of &Northernlight./%',
  20: 'The heroes travel&among the islands&and catch a glimpse&of a lost land./%',
  21: 'Chapter 4, The&Trials of the &Holy Hammer./%',
  22: 'A great smith gives&the heroes a&terrible weapon./%',
  23: 'Chapter 5, The &Field of Pink &and Gold./%',
  24: 'The vast garden is&charred in an inferno&of jealousy./%',
  25: '...What happens next?/%',
  26: 'Geheheh! Who knows?/%',
  27: 'There was only one more&chapter... After that,/%',
  28: 'It all stopped./%',
  29: 'That next book, it&never did get written./%',
  30: 'The story, it became so &grand, so overwhelming,/%',
  31: 'Some say it swallowed up&the author himself./%',
  35: 'The ones who could write&the next, the youth,&the pen was lying&there for them to&pick up./%',
  36: 'To make the next page./%',
  37: '...they never did./%',
  38: 'But you, my dear?&I see a story lit&up in your eyes.../%',
  39: "Burnin' bright...&Burnin' black.&Burnin' up&everything./%",
  40: "The bell's ringin' now.&Seems we've reached&the final rounds./%",
  41: 'So... how do you &think it all ends?/%',
  42: 'No, how do you want&it to end?/%',
  43: 'An ending, huh.../%',
  44: '...If I could choose… &I guess.../%',
  45: "I wouldn't have an &ending!/%",
  46: "It's just better if&stuff just...&goes on forever, right?/%",
  47: "Gah ha ha ha&ha ha ha!!! Well&ain't that somethin'./%",
  48: 'At this late hour,&with the bells ringing&out their justice./%',
  49: 'You choose eternity./%',
  50: 'Miss, hold on&dearly to that thought./%',
  51: 'For the tides of fate&are drawing close./%',
  52: 'And soon, an ocean&of ink shall wash&across the pages./%',
  53: 'But... there is one&thing that can&overwrite the dark./%',
  54: 'A white pen,&known as hope./%',
  55: 'Miss! I believe...&this is what you hold./%',
  56: 'Me? Nah, Kris&has the pen./%',
  57: "My weapon's like a&hairbrush or something./%",
  58: 'Geh-hahahahaha!&Is that so?&Is that SO???/%',
  59: 'Yep.&Now shut up&and give me&that axe!/%',
  64: 'Wh... what kind&of cheap trick&was that!?/%',
  65: "Sorry, thought you'd hit&it back! Geh heh heh!/%",
  66: "Oh yeah!? I'll show&you!! Kris, let's use&it again!!/%",
  67: "Hmm, dunno what&you just did,&but you should&probably keep&it up!/%",
  68: "... y'know, since&you're gonna&lose if ya&don't, gahah!/%",
  69: "Whew, gaha! What a rush!&You're really pickin'&this stuff up fast!&Now it's my turn...!/%",
  70: "Before, you said you&fancied yourself a&hero, didn't ya?&Hmmm... That's&real interesting./%",
  71: "Now, I don't know&much about \"heroes\"...&... But I know that&whatever ya call 'em,&there is someone./%",
  72: "Someone who'll never&give up trying to&do the right thing,&no matter what./%",
  73: "There's no prophecy&or legend 'bout anyone&like that./%",
  74: "It's just something&I know is true./%",
  75: "Now, where's my&haircut!? Geh ha ha!!/%",
  76: "Now, where's my&haircut? Geh ha ha!/%",
  77: "You aren't givin' up&now, are ya?/%",
  78: 'Put some shell into&it, will ya?/%',
  79: '*\\EA (Hey Kris, if this guy wants a haircut, let\'s ATTACK...!)',
};
const say = key => S.msgset(0, LINES[key]);

// The first line of each turn: [turn test, line, ballooncon, balloonend, Susie speaks]
// (the rest of each conversation follows ballooncon in NEXT_LINE).
const NEXT_LINE = {
  1: ['2', 2, 0, 1], 2: ['3', 2.5, 0, 0], 2.5: ['3b', 0, 1, 0], 2.8: ['9b', 0, 1, 1], 2.9: ['12b', 0, 1, 0],
  10: ['14', 10.1, 0, 0], 10.1: ['14b', 10.2, 0, 0], 10.2: ['14c', 0, 1, 1], 11: ['16', 12, 1, 0], 11.5: ['18b', 0, 1, 0],
  23: ['20', 0, 1, 0], 24: ['22', 0, 1, 0], 25: ['24', 0, 1, 0], 26: ['26', 27, 0, 0], 27: ['27', 28, 0, 0],
  28: ['28', 0, 1, 0], 29: ['30', 30, 0, 0], 30: ['31', 0, 1, 0], 31: ['33', 32, 0, 0], 32: ['34', 0, 1, 0],
  33: ['36', 34, 0, 0], 34: ['37', 0, 1, 0], 35: ['39', 0, 1, 0], 36: ['41', 37, 0, 0], 37: ['42', 0, 1, 0],
  38: ['44', 39, 0, 1], 39: ['45', 40, 0, 1], 40: ['46', 0, 1, 1], 41: ['48', 42, 0, 0], 42: ['49', 0, 1, 0],
  43: ['51', 44, 0, 0], 44: ['52', 0, 1, 0], 45: ['54', 46, 0, 0], 46: ['55', 47, 0, 0], 47: ['56', 48, 0, 1],
  48: ['57', 49, 0, 1], 49: ['58', 50, 0, 0], 50: ['59', 0, 1, 1], 51: ['68', 0, 1, 0], 52: ['72', 0, 1, 0],
  53: ['74', 54, 0, 0], 54: ['75', 0, 1, 0],
};

export class HammerOfJusticeEnemy extends MonsterParent {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_idle';
  }
  create() {
    S.scr_enemy_object_init(this);
    global.invc = 0.5;
    this.progress = 0;
    for (const b of instancesOf('obj_battleback')) instance_destroy(b);
    Object.assign(this, {
      recruitcount: 1, talkmax: 90, image_speed: 1 / 6, idlesprite: 'spr_gerson_idle', hurtsprite: 'spr_gerson_idle',
      sparedsprite: 'spr_gerson_idle', hairindex: 0, movesiner: 0, attackpattern: 0, boxoffset: false, trueturn: 0,
      difficulty: 0, turn: 0, phase: 1, patternstate: 0, rr: -1,
    });
    scr_spearpattern_reset(this);
    Object.assign(this, {
      attacktimer: 0, attackcon: 0, rtimer: 0, talked: 0, talkedcon: 0, dodgetimer: 0, attackdebug: -1, difficultydebug: -1,
      musicdebug: 0, songtime: 0, songplaying: 1, resumeinterval: 1.715, diagonal_enabled: 0, transformsfx: 0,
      postenemyturnevent: 0, postturntimer: 0, reachedendphase: 0, balloonorder: 0, ballooncon: 0, balloonend: 1,
      susietalks: 0, rudebusterhitcount: 0, rudebusterhitcountmax: 1, susiehitbyrudebustercount: 0,
      susiehitbyrudebustercon: 0, rudebusterdelay: 0, swingtimer: 0, swingdown_ex: 0, swingdown_multitelegraph: 0,
      goldalpha: 0, goldcon: 0, hitbox_con: 0, hitbox_timer: 0, endcon: 0, endtimer: 0, end_cutscene_version: 0,
      frozentimer: 0, fasterheart: false, swingdownbeatspeed: 23,
      savebattlecontrollerdepth: first('obj_battlecontroller')?.depth ?? 0, rudebusterflashcon: 0, rudebusterflashtimer: 0,
      susieusedultimateheal: 0, gothitlastturn: 0, beenhit: false, introtalkcon: 0, introballooncon: 0,
      firstconversationhappened: 0, nothitevent: false, mercylaughcon: 0, mercylaughtimer: 0, mercylaughcount: 9,
      spinxscale: 1, spinspeed: 5, saverudebusterstarcount: 9, spintimer: 0, spinindex: 0, init: 0, squishbox: false,
      repeatonce: 0, have_used_final_attack: false, laughtimer: 0, talktimer: 0, thissprite: 'spr_gerson_idle',
    });
    S.scr_spellget(2, 11);
    // A retry (flag 853) skips the first turn's lesson.
    if (S.scr_flag_get(853) != 0) {
      this.trueturn = 1;
      this.turn = 1;
      this.attackpattern = 1;
      this.repeatonce = 1;
    }
    for (const n of ['justice_reached_25_first_time', 'justice_reached_50_first_time', 'justice_reached_75_first_time',
      'justice_attacked_twice', 'justice_healed', 'justice_rudebuster', 'justice_item', 'justice_attempts']) global[n] ??= 0;
    this.justice_healed = 0;
    this.justice_rudebuster = 0;
    this.justice_item = 0;
    this.haveattacked = false;
    this.nohairsprite = false;
    this.endshaketimer = 0;
    this.resetsusie = 0;
  }
  // Other_10: this turn's attack (scr_spearpattern list) and the next turn's pattern.
  user0() { gersonPatterns.call(this); }
  user11() {}
  // Other_22: position + monster setup.
  user12() {
    global.monsterx[this.myself] = this.x + this.sprite_width / 2;
    global.monstery[this.myself] = this.y + this.sprite_height / 2;
    S.scr_monstersetup(this);
  }
  user13() {}
  // Other_24: everything an attack left behind goes away.
  user14() {
    this.attackcount = 0;
    this.visible = true;
    this.attacktimer = 0;
    this.attackcon = 0;
    scr_spearpattern_reset(this);
    for (const o of ['obj_gerson_hammer_bro_attack_controller', 'obj_gerson_hammer_bro_hammer', 'obj_gerson_box_hit_controller',
      'obj_gerson_box_hit', 'obj_box_hit_bullet', 'obj_gerson_bell_attack_controller', 'obj_gerson_bell', 'obj_gerson_bell_hit',
      'obj_gerson_bell_bullet', 'obj_gerson_bell_bullet_radial', 'obj_gerson_swing_down', 'obj_gerson_hits_box',
      'obj_gerson_squishes_box', 'obj_gerson_teleport', 'obj_follow_spear', 'obj_spearblocker', 'obj_spearblocker_piece',
      'obj_spearshot', 'obj_giant_hammer', 'obj_just_text', 'obj_green_heart_particle']) {
      for (const i of instancesOf(o)) instance_destroy(i);
    }
  }
  alarm4() { this.con += 1; }
  alarm6() {
    if (this.balloonend == 1) this.talked = 1;
    else {
      this.talked = 0.6;
      this.talktimer = 0;
    }
  }
  alarm7() { this.talktimer = 0; }
  cleanUp() {
    sprite_set_offset('spr_spearblocker', 32, 32);
    global.invc = 1;
    global.sp = 4;
  }

  // The speaker's balloon: Susie's (scr_heroblcon) or Gerson's.
  balloon() {
    if (this.susietalks == 1 && i_ex('obj_herosusie')) {
      global.typer = 75;
      S.scr_heroblcon('susie');
    } else S.scr_enemyblcon(this, this.x - 10, global.monstery[this.myself], 10);
  }
  // Confirm skips a line after 15 frames; a line that finished closes by itself.
  lineDone() {
    return (button3_p() && this.talktimer > 15) || !writer();
  }

  step() {
    if (global.inv > 19) global.inv = 19;
    if (this.rudebusterdelay > 0) this.rudebusterdelay -= 1;
    const m = this.myself;
    global.mercymod[m] = 0;
    for (const c of instancesOf('obj_battlecontroller')) c.hidestar = 1;
    const heart = first('obj_heart');
    if (heart) {
      global.sp = 5;
      heart.wspeed = 5;
    }
    global.automiss ??= [];
    for (let i = 0; i < 3; i++) global.automiss[i] = 1;
    if (this.init == 0) {
      this.init = 1;
      global.canactsus[m][0] = 0;
      global.actnamesus[m][0] = '';
      global.actsimulsus[m][0] = 0;
      global.actactorsus[m][0] = 0;
      global.actcostsus[m][0] = 0;
      global.battlespell[1][0] = -1;
      global.battleactcount[1] = 0;
      global.battlespellname[1][0] = '';
      global.battlespelldesc[1][0] = '';
      S.scr_spellmenu_setup();
    }
    if (global.monster[m] == 1) this.stepAlive();
    if (global.myfight == 3) {
      if (this.actcon == 20 || this.actconsus == 20 || this.actconral == 20) {
        if (S.scr_terminate_writer()) {
          this.actconsus = -1;
          this.actconral = -1;
          this.actcon = 1;
        }
      }
      if (this.actcon == 1 && !writer()) S.scr_nextact(this);
    }
    if (this.state == 3) S.scr_enemy_hurt(this);
    // The queued attack: one entry, then wait its time (while no box attack is running).
    if (this.attackcon == 1 && !writer()) {
      if (this.attackcount < this.attackcountmax) {
        const k = this.attackcount;
        scr_spearshot(this, this.list_attackdirection[k], this.list_attackspeed[k], this.list_attackframes[k], this.list_attackspecial[k], this.list_attackspecial2[k]);
        this.attackcon = 2;
      } else {
        this.attackcon = 3;
        this.rudebusterhitcount = 0;
        this.swingdown_ex = 0;
      }
      this.attackcount += 1;
    }
    if (this.attackcon == 2 && !i_ex('obj_gerson_growtangle')) {
      this.attacktimer += 1;
      if (this.attacktimer >= this.list_attackwait[this.attackcount - 1] && !writer()) {
        this.attacktimer = 0;
        this.attackcon = 1;
        if (this.reachedendphase == 1) this.have_used_final_attack = true;
      }
    }
    if (this.attackcon == 3 && global.turntimer > 10 && !i_ex('obj_spearshot')) {
      global.turntimer = 10;
      this.attackcon = 0;
    }
    const ctrl = first('obj_battlecontroller');
    if (this.attackcon == 0 && ctrl) ctrl.depth = this.savebattlecontrollerdepth;
    if (this.hitbox_con == 1 || this.hitbox_con == 2) {
      const s = this.hitbox_con == 1 ? 16 : -16;
      this.hitbox_con = 0;
      for (const gt of instancesOf('obj_growtangle')) {
        gt.hspeed = s;
        gt.friction = 0.8;
        for (const h of instancesOf('obj_heart')) {
          h.hspeed = s;
          h.friction = 0.8;
        }
      }
    }
    if (this.mercylaughcon == 1) {
      this.mercylaughtimer += 1;
      this.state = 12;
      sprite_set_offset('spr_gerson_laugh', 14, 22);
      this.sprite_index = 'spr_gerson_laugh';
      if (this.mercylaughtimer == 1) snd_play('snd_mercyadd');
      if (this.mercylaughtimer % 2 == 0) instance_create(this.x + 10 + irandom(80), this.y - 60 + irandom(40), 'obj_gerson_progress_star');
      if (this.mercylaughtimer == (this.mercylaughcount + 1) * 2 - 1) {
        this.state = 0;
        this.sprite_index = 'spr_gerson_idle';
        this.mercylaughcon = 0;
        this.mercylaughtimer = 0;
      }
    }
    for (const gt of instancesOf('obj_growtangle')) {
      if (gt.hspeed != 0) {
        const a = scr_afterimage(gt);
        if (a) a.fadeSpeed = 0.2;
      }
    }
    this.stepEnding();
  }

  stepAlive() {
    const m = this.myself;
    if (this.susiehitbyrudebustercon == 1 && this.endcon == 0) {
      // Gerson batted Rude Buster back into Susie.
      this.susiehitbyrudebustercon = 1.1;
      killWriters();
      global.typer = 75;
      say(64);
      S.scr_heroblcon('susie');
      this.talktimer = 0;
    } else if (this.susiehitbyrudebustercon == 1.1) {
      this.talktimer += 1;
      if (this.lineDone()) {
        this.susiehitbyrudebustercon = 1.2;
        killWriters();
        global.typer = 86;
        say(65);
        S.scr_enemyblcon(this, this.x - 10, global.monstery[m], 10);
        this.talktimer = 0;
      }
    } else if (this.susiehitbyrudebustercon == 1.2) {
      this.talktimer += 1;
      if (this.lineDone()) {
        this.susiehitbyrudebustercon = 2;
        killWriters();
        global.typer = 75;
        say(66);
        S.scr_heroblcon('susie');
        this.talktimer = 0;
      }
    }
    if (this.susiehitbyrudebustercon == 2) {
      this.talktimer += 1;
      if (this.lineDone()) {
        killWriters();
        this.susiehitbyrudebustercon = 0;
        this.talktimer = 0;
      }
    }
    if (S.scr_isphase('enemytalk') && this.endcon == 0 && this.talked == 0 && this.susiehitbyrudebustercon == 0 && this.rudebusterdelay == 0
      && !i_ex('obj_gerson_item_steal_anim') && !i_ex('obj_rudebuster_bolt') && !i_ex('obj_gerson_rudebuster')) this.startTalk();
    if (this.talked == 0.6) {
      this.talktimer += 1;
      if (this.lineDone()) {
        killWriters();
        const next = NEXT_LINE[this.ballooncon];
        if (next) {
          say(next[0]);
          this.ballooncon = next[1];
          this.balloonend = next[2];
          if (next[3]) this.susietalks = 1;
        }
        this.talked = 0.7;
        global.typer = 86;
        this.balloon();
        this.susietalks = 0;
        this.alarm[6] = 1;
      }
    }
    if (this.talked == 1 && S.scr_isphase('enemytalk')) {
      this.talktimer += 1;
      if (this.lineDone()) {
        killWriters();
        global.mnfight = 1.5;
      }
    }
    if (global.mnfight == 1.5) {
      if (!i_ex('obj_growtangle')) instance_create(camerax() + camerawidth() / 2, cameray() + cameraheight() / 2, 'obj_growtangle');
      for (const gt of instancesOf('obj_growtangle')) if (this.boxoffset) gt.y -= 50;
      const gt = first('obj_growtangle');
      for (const c of instancesOf('obj_battlecontroller')) c.depth = gt.depth + 2;
      gt.depth -= 2;
      const hp = first('obj_heroparent');
      for (const d of instancesOf('obj_darkener')) if (hp) d.depth = hp.depth + 3;
      if (!i_ex('obj_moveheart') && !i_ex('obj_heart')) S.scr_moveheart();
      global.mnfight = 2;
      S.scr_turntimer(90);
    }
    if (S.scr_isphase('bullets') && this.attacked == 0) {
      this.rtimer += 1;
      if (this.rtimer == 12) this.startAttack();
    }
    if (this.introtalkcon == 1 && this.stepIntroTalk()) return;
    if (global.mnfight == 2 && global.turntimer <= 1 && this.postenemyturnevent == 0 && this.end_cutscene_version == 0 && this.reachedendphase == 0) {
      if (this.have_used_final_attack) {
        this.talked = -1;
        this.endcon = 1;
        this.end_cutscene_version = 1;
        global.charturn = 2;
        musVolume(0, 90);
        return;
      }
      this.postturntimer = 0;
      this.postenemyturnevent = 1;
      // The last turns before the end fill the progress up.
      const PROG = { 16: [2, 30], 17: [3, 24], 18: [4, 24], 19: [5, 20] }[this.trueturn];
      if (PROG && this.endcon == 0) {
        this.postenemyturnevent = PROG[0];
        this.progress += PROG[1];
        snd_play('snd_mercyadd');
      }
    }
    if (global.mnfight == 2 && global.turntimer <= 0 && this.postenemyturnevent == 0 && this.reachedendphase == 1) {
      if (this.have_used_final_attack) {
        this.talked = -1;
        this.endcon = 1;
        this.end_cutscene_version = 1;
        global.charturn = 3;
        global.myfight = -1;
        global.mnfight = -1;
        global.turntimer = -1;
        musVolume(0, 90);
        return;
      }
      this.postenemyturnevent = 1;
    }
    const STARS = { 2: 30, 3: 24, 4: 24, 5: 20 }[this.postenemyturnevent];
    if (STARS && this.endcon == 0) {
      this.postturntimer += 1;
      instance_create(this.x + 10 + irandom(80), this.y - 60 + irandom(40), 'obj_gerson_progress_star');
      if (this.postturntimer >= STARS) {
        this.postturntimer = 0;
        this.postenemyturnevent = 6;
      }
    }
  }

  // The enemy's turn starts: pick the first line of this turn's conversation.
  startTalk() {
    S.scr_randomtarget(this);
    if (!i_ex('obj_darkener')) instance_create(0, 0, 'obj_darkener');
    sprite_set_offset('spr_spearblocker', 32, 32);
    global.sp = 4;
    this.ballooncon = 0;
    this.balloonsubcon = 0;
    this.balloonend = 1;
    this.talkedcon = 0;
    this.rtimer = 0;
    this.postenemyturnevent = 0;
    this.swingdown_multitelegraph = 0;
    if (this.gothitlastturn > 0) this.beenhit = true;
    this.squishbox = false;
    global.typer = 86;
    this.rr = choose(0, 1, 2);
    this.attackcon = 0;
    if (this.progress >= 84) {
      this.phase = 4;
      this.trueturn = 20;
    }
    let noballoon = false;
    const t = this.turn;
    const set = (key, con, end, sus) => {
      say(key);
      this.ballooncon = con;
      this.balloonend = end;
      if (sus) this.susietalks = 1;
    };
    if (this.trueturn >= 20) set(53, 45, 0);
    else if (t == 0 && global.justice_attempts == 0) set(1, 1, 0, 1);
    else if (t == 0 && (global.justice_attempts > 0 || this.firstconversationhappened == 1)) {
      this.ballooncon = 1;
      this.balloonend = 1;
      noballoon = true;
    } else if (t == 1 && this.gothitlastturn > 0 && this.repeatonce == 0) {
      // Hit during the first lesson: it is played again.
      set(9, 2.8, 0);
      this.turn = 0;
      this.trueturn = 0;
      this.attackpattern = 0;
      this.repeatonce = 1;
    } else if ((t == 1 && this.gothitlastturn == 0) || (t == 1 && this.repeatonce == 1)) set(12, 2.9, 0);
    else {
      const FIRST = { 2: [13, 10], 3: [15, 11], 4: [18, 11.5], 5: [19, 23], 6: [21, 24], 7: [23, 25], 8: [25, 26], 9: [29, 29],
        10: [35, 33], 11: [38, 35], 12: [40, 36], 13: [43, 38, 1], 14: [47, 41], 15: [50, 43], 16: [70, 0], 17: [71, 52], 18: [73, 53] }[t];
      if (FIRST) set(FIRST[0], FIRST[1], FIRST[1] == 0 ? 1 : 0, FIRST[2]);
      else {
        say([76, 77, 78][this.rr]);
        this.ballooncon = 0;
        this.balloonend = 1;
      }
    }
    if (noballoon) {
      this.talked = 1;
      this.talktimer = 0;
    } else {
      this.balloon();
      this.susietalks = 0;
      this.gothitlastturn = 0;
      this.user0();
      if (this.ballooncon == 0) {
        this.talked = 1;
        this.talktimer = 0;
      } else {
        this.talked = 0.6;
        this.talktimer = 0;
      }
    }
  }

  // Twelve frames into the bullet phase the attack starts and the next turn's message is chosen.
  startAttack() {
    this.attackcon = 1;
    this.rudebusterhitcount = 0;
    S.scr_turntimer(999);
    global.typer = 6;
    global.fc = 0;
    this.rr = choose(0, 1);
    const rand = irandom(100);
    if (rand < 33 && global.hp[0] > global.maxhp[0] * 0.8) this.rr = 7;
    if (rand < 33 && global.hp[0] < global.maxhp[0] * 0.4) this.rr = 8;
    if (rand < 23 && this.turn > 8) this.rr = 6;
    if (rand < 13) this.rr = 2;
    if (rand == 4 || rand == 5) this.rr = 3;
    if (rand == 2 || rand == 3) this.rr = 4;
    if (rand == 0 || rand == 1) this.rr = 5;
    const MSG = ['* The air crackles green with freedom.', '* The bells ring in justice...', "* The bell of justice is ringing... it's for you.",
      '* The bell of justice tolls... for a frog. No, a turtle!', '* The white wind howls!', '* Smells like steel and leather.',
      "* It's one shell of a battle!", '* Susie rolls her head confidently.', '* Susie grits her teeth.'];
    const bm = global.battlemsg;
    if (this.haveattacked == 0 && this.turn == 2) {
      bm[0] = LINES[79];
      this.ballooncon = 0;
      S.scr_speaker('susie');
    } else if (global.justice_attacked_twice == 2) {
      bm[0] = "* The opponent seems impressed with Susie's guts!";
      global.justice_attacked_twice += 1;
    } else if (this.justice_healed == 1) {
      bm[0] = "* The opponent's seems very impressed with Susie's magic...!";
      this.justice_healed += 1;
    } else if (this.justice_rudebuster == 1) {
      bm[0] = '* The opponent is reeling from the Rude Buster!';
      this.justice_rudebuster += 1;
    } else if (this.justice_item == 1) {
      bm[0] = '* Your ITEMs were taken!';
      this.justice_item += 1;
    } else if (this.progress >= 25 && global.justice_reached_25_first_time == 0) {
      bm[0] = '* Things are finally starting to get serious!';
      global.justice_reached_25_first_time += 1;
    } else if (this.progress >= 50 && global.justice_reached_50_first_time == 0) {
      bm[0] = "* A bead of sweat forms on the old man's forehead...";
      global.justice_reached_50_first_time += 1;
    } else if (this.progress >= 75 && global.justice_reached_75_first_time == 0) {
      bm[0] = '* The opponent is finally slowing down! ... or speeding up!?';
      global.justice_reached_75_first_time += 1;
    } else bm[0] = MSG[this.rr];
    this.attacked = 1;
  }

  // The first turn's lesson (scr_spearshot special 34): Susie feels off, Gerson explains the green SOUL.
  // Returns true where the GML exits the Step.
  stepIntroTalk() {
    if (global.turntimer < 0) {
      killWriters();
      return true;
    }
    this.talktimer += 1;
    global.turntimer += 1;
    if (this.lineDone() || this.ballooncon == 0) {
      killWriters();
      let drawabove = false;
      const susie = first('obj_herosusie');
      if (this.ballooncon == 0 && (global.justice_attempts > 0 || this.firstconversationhappened == 1)) {
        say(8);
        this.ballooncon = 4;
      } else if (this.ballooncon == 0) {
        say(4);
        this.ballooncon = 1;
        this.susietalks = 1;
        drawabove = true;
        for (const s of instancesOf('obj_herosusie')) {
          scr_shakeobj(s);
          s.state = 8;
          s.hurt = 0;
          s.attacktimer = 0;
          s.sprite_index = 'spr_susie_hurt_lookright';
          s.image_speed = 0;
          s.image_index = 0;
        }
      } else if (this.ballooncon == 1) {
        say(5);
        this.ballooncon = 2;
        this.susietalks = 0;
      } else if (this.ballooncon == 2) {
        say(6);
        this.ballooncon = 3;
        this.susietalks = 0;
      } else if (this.ballooncon == 3) {
        say(7);
        this.ballooncon = 4;
        this.susietalks = 1;
      } else if (this.ballooncon == 4) {
        for (const s of instancesOf('obj_herosusie')) {
          s.state = 0;
          s.hurt = 0;
          s.attacktimer = 0;
          s.attacked = 0;
        }
        this.ballooncon = -1;
        this.introtalkcon = -1;
        return true;
      }
      void drawabove;
      global.typer = 50;
      if (this.susietalks == 1 && susie) {
        global.typer = 75;
        if (this.ballooncon == 1) S.scr_enemyblcon(susie.x - 40, susie.y - 78, 10).side = 2;
        if (this.ballooncon == 4) S.scr_enemyblcon(susie.x - 25, susie.y - 55, 10).side = 2;
      } else {
        global.typer = 86;
        const OFF = { 2: [430, -96], 3: [418, -116], 4: [430, -106] }[this.ballooncon];
        if (OFF && susie) S.scr_enemyblcon(camerax() + OFF[0], susie.y + OFF[1], 10).side = 2;
      }
      const blocker = first('obj_spearblocker');
      for (const b of instancesOf('obj_battleblcon')) if (blocker) b.depth = blocker.depth - 10;
      this.susietalks = 0;
      this.firstconversationhappened = true;
      this.talktimer = 0;
    }
    return false;
  }

  // The end: version 0 (Susie fell) fades to white; version 1 (the last attack played) is Susie's
  // finishing move and the haircut.
  stepEnding() {
    const susie = first('obj_herosusie');
    if (this.end_cutscene_version == 0) {
      if (this.endcon == 1) {
        this.endtimer += 1;
        if (this.endtimer == 1) {
          S.scr_fadeout(30);
          for (const f of instancesOf('obj_fadeout')) {
            f.image_blend = 0xffffff;
            f.depth = 2;
          }
        }
        if (this.endtimer == 3) {
          killWriters();
          for (const f of instancesOf('obj_face')) instance_destroy(f);
        }
        if (this.endtimer == 60) {
          global.myfight = -1;
          global.mnfight = -1;
          global.fighting = 0;
          for (const c of instancesOf('obj_battlecontroller')) {
            c.victory = 1;
            c.skipvictory = 1;
          }
          global.flag[36] = 1;
          global.flag[39] = 1;
          this.endcon = 2;
          // (the simulator's own ending screen picks this up)
          G.gersonResult = 'lose';
        }
      }
      return;
    }
    if (this.endcon == 1) {
      this.endtimer += 1;
      global.charturn = 2;
      if (this.endtimer == 1) {
        musVolume(0, 90);
        for (const c of instancesOf('obj_battlecontroller')) S.scr_mnendturn(c);
      }
      if (this.endtimer == 90) {
        S.msgsetloc(0, '... Alright,&I figured it out./%');
        global.typer = 75;
        S.scr_heroblcon('susie');
      }
      if ((button3_p() && this.endtimer > 105) || (!writer() && this.endtimer > 90)) {
        killWriters();
        this.endcon = 2;
        this.endtimer = 0;
      }
    }
    if (this.endcon == 2) {
      this.endtimer += 1;
      if (this.endtimer == 1 && susie) {
        susie.x -= 35;
        susie.y -= 28;
        S.scr_battle_sprite_set('susie', 'spr_susie_heal_charge2', 0.5, false);
      }
      if (this.endtimer == 6) S.scr_battle_sprite_set('susie', 'spr_susie_heal_charge2_loop', 0.5, true);
      if (this.endtimer == 30 && susie) {
        S.msgsetloc(0, 'You wanna see what&I got, then.../%');
        global.typer = 75;
        S.scr_enemyblcon(susie.x + 100 + 35, susie.y + 40 + 28, 10).side = -1;
      }
      if ((button3_p() && this.endtimer > 45) || (!writer() && this.endtimer > 30)) {
        killWriters();
        this.endcon = 3;
        this.endtimer = 0;
        S.scr_battle_sprite_set('susie', 'spr_susie_heal_charge_loop', 0.5, true);
        const s = snd_loop('snd_chargeshot_charge');
        snd_volume(s, 0, 0);
        snd_volume(s, 0.2, 30);
      }
    }
    if (this.endcon == 3) {
      this.endtimer += 1;
      if ((button3_p() && this.endtimer > 15) || !writer()) {
        killWriters();
        this.endcon = 4;
        this.endtimer = 0;
      }
    }
    if (this.endcon == 4) {
      this.endtimer += 1;
      if (this.endtimer == 30 && susie) {
        S.msgsetloc(0, 'Take THIS!!!/%');
        global.typer = 75;
        S.scr_enemyblcon(susie.x + 100 + 35, susie.y + 40 + 28, 10).side = -1;
      }
      if ((button3_p() && this.endtimer > 45) || (!writer() && this.endtimer > 30)) {
        killWriters();
        this.endcon = 5;
        this.endtimer = 0;
        this.siner -= 14;
      }
    }
    if (this.endcon == 5) this.stepFinisher(susie);
    for (const c of instancesOf('obj_battlecontroller')) c.damagenoise = 0;
  }

  stepFinisher(susie) {
    this.endtimer += 1;
    const t = this.endtimer;
    if (t == 1) {
      S.scr_battle_sprite_set('susie', 'spr_susie_heal_end', 0.5, false);
      const s = snd_loop('snd_chargeshot_charge');
      snd_volume(s, 0, 0);
      snd_volume(s, 0.2, 30);
    }
    if (t == 6 && susie) {
      const p = instance_create(susie.x + 86, susie.y + 60, 'obj_susie_heal_projectile');
      Object.assign(p, { gravity: 1, gravity_direction: 8, image_xscale: 3, image_yscale: 3, image_speed: 1, image_angle: 8 });
      snd_stop('snd_chargeshot_charge');
      snd_play_x('snd_heartshot_dr_b', 0.4, 0.4);
    }
    if (t == 28 && susie) {
      susie.x = susie.xstart;
      susie.y = susie.ystart;
    }
    if (t == 25) {
      S.msgsetloc(0, 'Ha, ya missed.');
      global.typer = 86;
      S.scr_enemyblcon(this, this.x - 10, global.monstery[this.myself], 10);
    }
    if (t == 46) killWriters();
    if (t == 45) {
      S.scr_battle_sprite_set('susie', 'spr_susieb_attack', 0.5, false);
      const a = instance_create(global.monsterx[this.myself] - 40, global.monstery[this.myself] - 4, 'obj_basicattack');
      Object.assign(a, { sprite_index: 'spr_attack_cut1_purple', image_speed: 0.25, image_xscale: 0.75, image_yscale: 0.75, image_angle: 45, maxindex: 4 });
      const ls = snd_play('snd_laz_c');
      snd_pitch(ls, 0.7);
      this.nohairsprite = true;
      snd_play('snd_old_man_grunt');
      S.scr_fadeout(60);
      const tb = first('obj_tensionbar');
      for (const f of instancesOf('obj_fadeout')) {
        f.image_blend = 0xffffff;
        if (tb) f.depth = tb.depth - 1;
      }
      const fade = first('obj_fadeout');
      for (const [ang, hs] of [[20, -0.5], [-20, 0.5]]) {
        const hair = instance_create(this.x + 25, this.y + 32, 'obj_gerson_hair2');
        hair.image_speed = 0;
        hair.image_index = 0;
        hair.image_angle = ang;
        hair.hspeed += hs;
        if (fade) hair.depth = fade.depth - 1;
      }
    }
    if (t == 55) S.scr_battle_sprite_set('susie', 'spr_susie_attack_end', 0.5, true);
    if (t == 105) {
      for (const c of instancesOf('obj_battlecontroller')) c.skipvictory = 1;
      global.mag[2] += 4;
      global.flag[1569] = 1;
      G.gersonResult = 'win';
      S.scr_wincombat();
    }
  }

  // End Step: the SOUL stays inside the squished box.
  endStep() {
    const h = first('obj_heart'), gt = first('obj_growtangle');
    if (this.squishbox == 1 && h && gt) {
      if (h.x < gt.x - 210) h.x = gt.x - 210;
      if (h.x > gt.x + 215 - 20) h.x = gt.x + 215 - 20;
      if (h.y < gt.y - 37) h.y = gt.y - 37;
      if (h.y > gt.y + 37 - 20) h.y = gt.y + 37 - 20;
    }
  }

  draw() {
    if (this.state == 0 && this.endcon < 5) this.movesiner += 1 / 3;
    if (this.state != 13) this.x = this.xstart + Math.sin(this.movesiner / 5) * 10;
    if (this.rudebusterflashcon == 1) {
      this.rudebusterflashtimer += 1;
      if (this.rudebusterflashtimer > 4 && Math.sin(this.rudebusterflashtimer / 3) < 0) {
        this.rudebusterflashtimer = 0;
        this.rudebusterflashcon = 0;
      }
    }
    // The hair waves with the idle animation (14 frames).
    if (this.state == 0 || this.state == 3) {
      const HAIR_Y = [5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 3, 4, 6, 7, 5];
      const idx = this.siner % 14;
      const hx = 18, hy = HAIR_Y[Math.max(0, Math.floor(idx))] ?? 0;
      const px = this.x + hx * 2, py = this.y + hy * 2;
      draw_sprite_ext('spr_gerson_hair', this.hairindex, px, py, 2, 2, this.image_angle, this.image_blend, this.image_alpha);
      if (this.flash == 1) S.draw_sprite_ext_flash('spr_gerson_hair', this.hairindex, px, py, 2, 2, this.image_angle, this.image_blend, -Math.cos(this.fsiner / 5) * 0.4 + 0.6);
      this.hairindex += this.state == 0 ? 0.2 : 0.1;
      d3d_set_fog(true, 0xffffff, 0, 1);
      draw_sprite_ext('spr_gerson_hair', this.hairindex, px, py, 2, 2, this.image_angle, this.image_blend, Math.sin(this.rudebusterflashtimer / 3));
      d3d_set_fog(false, 0, 0, 0);
    }
    S.scr_enemy_drawhurt_generic(this);
    if (this.endcon > 4) {
      this.siner += 1 / 3;
      if (this.siner > 3) this.siner = 3;
      if (this.endcon == 5 && this.endtimer >= 25) {
        if (this.nohairsprite == 1) {
          this.endshaketimer += 1;
          const SHAKE = { 1: 7, 2: -6, 3: 5, 4: -4, 5: 3, 6: -2, 7: 1 }[this.endshaketimer];
          if (SHAKE) this.x += SHAKE;
          S.draw_monster_body_part(this, 'spr_gerson_headtilt_nohair', this.siner, this.x, this.y);
        } else S.draw_monster_body_part(this, 'spr_gerson_headtilt', this.siner, this.x, this.y);
      } else S.draw_monster_body_part(this, this.thissprite, this.siner, this.x, this.y);
    } else if (this.state == 0) {
      this.fsiner += 1;
      this.siner += 1 / 3;
      if (this.siner > 14) this.siner -= 14;
      this.thissprite = this.idlesprite;
      if (global.mercymod[this.myself] >= global.mercymax[this.myself]) this.thissprite = this.sparedsprite;
      S.draw_monster_body_part(this, this.thissprite, this.siner, this.x, this.y);
    }
    if (this.state == 0 || this.state == 3) {
      d3d_set_fog(true, 0xffffff, 0, 1);
      draw_sprite_ext(this.hurtsprite, 0, this.x + this.shakex + this.hurtspriteoffx, this.y + this.hurtspriteoffy, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, Math.sin(this.rudebusterflashtimer / 3));
      d3d_set_fog(false, 0, 0, 0);
    }
    if (this.goldcon == 1) {
      d3d_set_fog(true, 0xffff00, 0, 1);
      if (global.turntimer >= 1) {
        if (this.goldalpha < 0.3) this.goldalpha += 0.01;
      } else if (this.goldalpha > 0) this.goldalpha -= 0.01;
      this.image_alpha = this.goldalpha;
      S.scr_enemy_drawidle_generic(this, 1 / 6);
      this.image_alpha = 1;
      d3d_set_fog(false, 0, 0, 0);
    }
    if (this.state == 10) this.drawSmash();
    if (this.state == 11) this.drawRudeBusterBack();
    if (this.state == 12) {
      const gt = first('obj_growtangle');
      if (gt) this.depth = gt.depth;
      this.image_index += 0.23333333333333334;
      draw_self(this);
      this.laughtimer += 1;
      if (this.laughtimer == 1) snd_play('snd_gerlaugh');
      if (this.laughtimer == 62) {
        this.laughtimer = 0;
        this.state = 0;
        if (this.attackpattern == 19) global.turntimer = 2;
      }
    }
    if (this.state == 13) this.drawDodge();
    if (this.state == 14) this.drawSpin();
    if (this.becomeflash == 0) this.flash = 0;
    this.becomeflash = 0;
    draw_set_color(0xffffff);
    draw_set_halign(0);
  }

  // state 10: Gerson stops Rude Buster with his hammer...
  drawSmash() {
    this.image_speed = 0;
    this.image_index += 0.5;
    draw_self(this);
    if (this.image_index >= 3) {
      this.state = 11;
      this.swingtimer = 0;
      scr_shakeobj(this);
      instance_create(this.x, this.y, 'obj_shake');
      for (const b of instancesOf('obj_rudebuster_bolt')) instance_destroy(b);
      snd_play('snd_criticalswing');
      for (const a of instancesOf('obj_afterimage')) instance_destroy(a);
      let a = instance_create(this.x - 70 + 10, this.y - 15 + 20, 'obj_animation');
      Object.assign(a, { sprite_index: 'spr_susie_gerson_hitbback_fx_2', image_speed: 1, image_angle: 40, image_xscale: 3, image_yscale: 3 });
      a = instance_create(this.x - 46 + 10, this.y - 12 + 20, 'obj_animation');
      Object.assign(a, { sprite_index: 'spr_gerson_hit_fx3', image_index: 1, image_speed: 0.5, image_angle: 14, image_xscale: 2, image_yscale: 2 });
    }
  }

  // state 11: ... and bats it back at Susie.
  drawRudeBusterBack() {
    this.swingtimer += 1;
    const t = this.swingtimer;
    if (t < 12) {
      const scale = Math.sin((t + 1) / 0.68) * 0.2;
      draw_sprite_ext('spr_gerson_rude_orb1', 0, this.x - 48 + 10, this.y - 15 + 20, 0.6 + scale, 1 - scale * 0.5, 22, 0xffffff, this.image_alpha);
    }
    if (t >= 3 && t <= 10) this.x += t % 2 == 1 ? -2 : 2;
    draw_self(this);
    if (t == 11) this.image_index = 10;
    if (t == 12) {
      const blast = instance_create(this.x - 40, this.y + 20, 'obj_gerson_rudebuster');
      blast.battlemode = 0;
      blast.target = first('obj_herosusie');
      blast.image_alpha = 1;
      snd_play('snd_rudebuster_swing');
      this.rudebusterhitcount += 1;
      instance_create(this.x, this.y, 'obj_shake');
      for (const ang of [0, 30]) {
        const a = instance_create(this.x - 40, this.y + 20, 'obj_animation');
        Object.assign(a, { sprite_index: 'spr_susie_gerson_hitbback_fx_2', image_speed: 1, image_angle: ang, image_xscale: 3, image_yscale: 3 });
      }
    }
    if (t >= 0) {
      if (this.image_index < 13) {
        this.image_index += 0.5;
        if (this.image_index >= 11 && t < 11) this.image_index = 4;
      }
      if (t == 25) {
        this.state = 0;
        this.swingtimer = 0;
        this.image_speed = 1 / 6;
        this.sprite_index = 'spr_gerson_idle';
      }
    }
  }

  // state 13: FIGHT misses, Gerson teleports out of the way (and is impressed: progress + 4).
  drawDodge() {
    draw_self(this);
    this.dodgetimer += 1;
    if (this.dodgetimer == 2) {
      const tg = global.chartarget[this.myself];
      const a = instance_create(global.monsterx[tg] + random(6) - 20, global.monstery[tg] + random(6), 'obj_basicattack');
      Object.assign(a, { sprite_index: 'spr_attack_mash2', image_speed: 0.5, maxindex: 4 });
      this.progress += 4;
      S.scr_tensionheal(60);
      snd_stop('motor_swing_down');
      this.image_alpha = 0;
      if (global.justice_attacked_twice < 2) global.justice_attacked_twice += 1;
      snd_play('snd_mercyadd');
      const xx = this.x + 88, yy = this.y - 88;
      instance_create(xx - 20, yy - 10, 'obj_gerson_progress_star');
      for (const [dx, d] of [[0, 2], [18, 4], [36, 6]]) instance_create(xx + dx, yy + dx, 'obj_gerson_progress_star').delay = d;
    }
    if (this.dodgetimer == 3) {
      this.image_speed = 1 / 6;
      this.image_alpha = 1;
      this.sprite_index = 'spr_gerson_dodge';
      this.image_xscale = 2;
      this.image_yscale = 2;
      this.x -= 40;
      this.y -= 30;
      this.speed = 16;
      this.friction = 4;
    }
    if (this.dodgetimer == 38) {
      this.dodgetimer = 0;
      this.state = 0;
      this.sprite_index = 'spr_gerson_idle';
      this.x -= 80;
    }
  }

  // state 14: the spin after Rude Buster lands (progress + 1 per star).
  drawSpin() {
    this.spintimer += 1;
    if (this.spintimer < 10) {
      this.spinindex += 2 / 3;
      draw_sprite_ext('spr_gerson_spin_smear', this.spinindex, this.x + 55, this.y + 68, 2, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
    }
    if (this.spintimer == 10) {
      this.spinindex = 0;
      snd_play('snd_mercyadd');
    }
    if (this.spintimer >= 10) {
      if (this.spinindex < 11) this.spinindex += 0.5;
      if (this.spinindex >= 11) this.spinindex += 0.25;
      if (this.spinindex > 13) this.spinindex = 13;
      draw_sprite_ext('spr_gerson_spin', this.spinindex, this.x + 48, this.y + 72, 2, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
      if (this.saverudebusterstarcount > 0 && this.spintimer > 20 && this.spintimer % 2 == 0) {
        this.saverudebusterstarcount -= 1;
        this.progress += 1;
        instance_create(this.x + 10 + irandom(80), this.y - 60 + irandom(40), 'obj_gerson_progress_star');
      }
    }
    if (this.spintimer == 50) {
      this.spintimer = 0;
      this.state = 0;
    }
  }
}
defineObject('obj_hammer_of_justice_enemy', HammerOfJusticeEnemy);

void [instance_create_depth, instance_exists, lerp, snd_play_pitch];
