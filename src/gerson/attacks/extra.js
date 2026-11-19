// Bells, Gerson's Rude Buster, the giant hammer and the box effects (machine-translated from the Chapter 4 GML by tools/gen_attacks.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  G, Instance, S, angle_difference, button1_p, button2_p, button3_p, choose, d3d_set_fog, defineObject, draw_clear_alpha, draw_get_color, draw_self, draw_set_alpha, draw_set_blend_mode, draw_set_color, draw_sprite_ext, draw_surface_ext, draw_text_color, global, instance_create, instance_create_depth, instance_destroy, instance_exists, instance_find, instance_nearest, instance_number, instancesOf, irandom, lengthdir_x, lengthdir_y, lerp, merge_color, point_direction, point_distance, random, snd_play, sprite_set_offset, surface_create, surface_exists, surface_reset_target, surface_set_target,
} from '../rt.js?v=20261119142826';
import {
  cameraheight, camerawidth, camerax, cameray, gt_maxx, gt_maxy, gt_minx, gt_miny, i_ex, room_height, room_width, scr_afterimage, scr_bullet_init, scr_lerpvar, scr_shakeobj, snd_play_pitch,
} from '../common.js?v=20261119142826';
import {
  EXIT, O, P, T, W,
} from '../gml.js?v=20261119142826';

// obj_gerson_bell_attack_controller (default sprite None, depth 0)
class GersonBellAttackController extends Instance {
  cleanUp() {
    this.gers = instance_create(O('obj_hammer_of_justice_enemy').x + 45, O('obj_hammer_of_justice_enemy').y + 45, 'obj_gerson_teleport');
    this.gers.type = 10;
    instance_destroy(this);
  }
  create() {
    this.timer = 0;
    this.con = 0;
    this.bell = instance_create(O('obj_growtangle').x - 175 - 60, O('obj_growtangle').y - 60, 'obj_gerson_bell');
    this.bell = instance_create(O('obj_growtangle').x + 130 + 30, O('obj_growtangle').y - 60, 'obj_gerson_bell');
    this.leftgerson = instance_create(O('obj_growtangle').x - 280 - 60, O('obj_growtangle').y, 'obj_gerson_teleport');
    this.leftgerson.type = 3;
    this.leftgerson.depth = O('obj_gerson_bell').depth - 2;
    this.rightgerson = instance_create(O('obj_growtangle').x + 280 + 30, O('obj_growtangle').y, 'obj_gerson_teleport');
    this.rightgerson.type = 3;
    this.rightgerson.image_xscale = - 2;
    this.rightgerson.depth = O('obj_gerson_bell').depth - 2;
    if (W('obj_hammer_of_justice_enemy', function (other) {
        this.visible = false;
    }, this) === EXIT) return;
  }
  step() {
    if (global.turntimer < 1) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_bell_attack_controller', GersonBellAttackController);

// obj_gerson_bell (default sprite spr_gerson_bell, depth 0)
class GersonBell extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_bell';
  }
  create() {
    this.image_xscale = 1;
    this.image_yscale = 1;
  }
  step() {
    if (global.turntimer < 1) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_bell', GersonBell);

// obj_gerson_bell_hit (default sprite spr_gerson_swing_side, depth 0)
class GersonBellHit extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_swing_side';
  }
  create() {
    this.image_speed = 0;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.timer = 0;
    this.con = 0;
  }
  user14() {
    let angle_offset;
    if (this.con == 0) {
        this.timer = this.timer + 1;
        if (this.timer == 14) {
            snd_play('motor_upper_quick_mid');
        }
        if (this.timer == 16) {
            this.con = 1;
            this.timer = 0;
            snd_play('snd_queen_punched_lower');
            snd_play('snd_bell');
            this.image_index = 1;
            scr_shakeobj(this);
            this.bell = instance_nearest(this.x, this.y, 'obj_gerson_bell');
            angle_offset = random(60) - 30;
            if (this.image_xscale > 0) {
                if (W(this.bell, function (other) {
                    this.shakeobj = instance_create(this.x, this.y, 'obj_shakedirectional');
                    this.shakeobj.target = this;
                    this.shakeobj.dir = 180;
                }, this) === EXIT) return;
                this.i = 0;
                while (this.i < 7) {
                    this.radialshot = instance_create(this.bell.x + 42, this.bell.y + 60, 'obj_gerson_bell_bullet_radial');
                    if (W(this.radialshot, function (other) {
                        scr_bullet_init(this);
                    }, this) === EXIT) return;
                    this.radialshot.active = 1;
                    this.radialshot.place = 270 - 30 * this.i + angle_offset;
                    this.radialshot.depth = this.depth - 1;
                    this.radialshot.target = 3;
                    this.radialshot.damage = 1;
                    this.radialshot.grazed = 0;
                    this.i = this.i + 1;
                }
            } else {
                if (W(this.bell, function (other) {
                    this.shakeobj = instance_create(this.x, this.y, 'obj_shakedirectional');
                    this.shakeobj.target = this;
                    this.shakeobj.dir = 0;
                }, this) === EXIT) return;
                this.i = 0;
                while (this.i < 7) {
                    this.radialshot = instance_create(this.bell.x + 42, this.bell.y + 60, 'obj_gerson_bell_bullet_radial');
                    if (W(this.radialshot, function (other) {
                        scr_bullet_init(this);
                    }, this) === EXIT) return;
                    this.radialshot.active = 1;
                    this.radialshot.place = 250 + 30 * this.i + angle_offset;
                    this.radialshot.depth = this.depth - 1;
                    this.radialshot.target = 3;
                    this.radialshot.damage = 1;
                    this.radialshot.grazed = 0;
                    this.i = this.i + 1;
                }
            }
        }
    }
    if (this.con == 1) {
        this.timer = this.timer + 1;
        if (this.timer == 6) {
            this.timer = 0;
            this.con = 2;
            this.image_index = 2;
        }
    }
    if (this.con == 2) {
        this.timer = this.timer + 1;
        if (this.timer == 6) {
            this.timer = - 47;
            this.con = 0;
            this.image_index = 0;
        }
    }
    if (global.turntimer < 1) {
        instance_destroy(this);
    }
  }
  user15() {
    let slowbullet1, radial, dir;
    if (this.con == 0) {
        this.timer = this.timer + 1;
        if (this.timer == 14) {
            snd_play('motor_upper_quick_mid');
        }
        if (this.timer == 16) {
            this.con = 1;
            this.timer = 0;
            snd_play('snd_queen_punched_lower');
            snd_play('snd_bell');
            this.image_index = 1;
            scr_shakeobj(this);
            slowbullet1 = irandom(4);
            this.bell = instance_nearest(this.x, this.y, 'obj_gerson_bell');
            if (this.image_xscale > 0) {
                if (W(this.bell, function (other) {
                    this.shakeobj = instance_create(this.x, this.y, 'obj_shakedirectional');
                    this.shakeobj.target = this;
                    this.shakeobj.dir = 180;
                }, this) === EXIT) return;
                this.i = 0;
                while (this.i < 5) {
                    if (this.i == slowbullet1) {
                    } else {
                        this.bulletshot = instance_create(this.bell.x + 42, this.bell.y + 60, 'obj_gerson_bell_bullet');
                        if (W(this.bulletshot, function (other) {
                            scr_bullet_init(this);
                        }, this) === EXIT) return;
                        this.bulletshot.image_xscale = 1.4;
                        this.bulletshot.image_yscale = 1.4;
                        this.bulletshot.active = 1;
                        this.bulletshot.direction = 180;
                        this.bulletshot.pos = this.i;
                        this.bulletshot.depth = this.depth - 1;
                        this.bulletshot.target = 3;
                        this.bulletshot.damage = 1;
                        this.bulletshot.grazed = 0;
                    }
                    this.i = this.i + 1;
                }
                radial = 5;
                dir = 0;
                if (this.bighearttype == 1 && this.y < O('obj_growtangle').y) {
                    dir = 25 + random(10);
                }
                if (this.bighearttype == 1 && this.y > O('obj_growtangle').y) {
                    dir = random(10) * - 1 - 25;
                }
                this.i = 0;
                while (this.i < radial) {
                    this.radialshot = instance_create(this.x, this.y, 'obj_collidebullet');
                    if (W(this.radialshot, function (other) {
                        scr_bullet_init(this);
                    }, this) === EXIT) return;
                    this.radialshot.sprite_index = 'spr_diamondbullet';
                    this.radialshot.direction = this.i / radial * 180 + 110 + dir;
                    this.radialshot.image_angle = this.radialshot.direction;
                    this.radialshot.active = 1;
                    this.radialshot.speed = 1;
                    this.radialshot.friction = - 0.3;
                    if (this.bighearttype == 1) {
                        this.radialshot.speed = 1;
                        this.radialshot.friction = - 0.23;
                    }
                    this.radialshot.depth = this.depth - 1;
                    this.radialshot.target = this.target;
                    this.radialshot.damage = this.damage;
                    this.radialshot.grazed = 0;
                    this.radialshot.element = 6;
                    if (O('obj_spamton_neo_enemy').difficulty == 0) {
                        this.radialshot.grazepoints = 3;
                    }
                    if (O('obj_spamton_neo_enemy').difficulty == 2) {
                        this.radialshot.grazepoints = 2;
                    }
                    this.i = this.i + 1;
                }
            } else {
                if (W(this.bell, function (other) {
                    this.shakeobj = instance_create(this.x, this.y, 'obj_shakedirectional');
                    this.shakeobj.target = this;
                    this.shakeobj.dir = 0;
                }, this) === EXIT) return;
            }
        }
    }
    if (this.con == 1) {
        this.timer = this.timer + 1;
        if (this.timer == 6) {
            this.timer = 0;
            this.con = 2;
            this.image_index = 2;
        }
    }
    if (this.con == 2) {
        this.timer = this.timer + 1;
        if (this.timer == 6) {
            this.timer = - 47;
            this.con = 0;
            this.image_index = 0;
        }
    }
    if (global.turntimer < 1) {
        instance_destroy(this);
    }
  }
  step() {
    let angle_offset;
    if (this.con == 0) {
        this.timer = this.timer + 1;
        if (this.timer == 14) {
            snd_play('motor_upper_quick_mid');
        }
        if (this.timer == 16) {
            this.con = 1;
            this.timer = 0;
            snd_play('snd_queen_punched_lower');
            this.image_index = 1;
            scr_shakeobj(this);
            this.bell = instance_nearest(this.x, this.y, 'obj_gerson_bell');
            angle_offset = random(40) - 20;
            if (this.image_xscale > 0) {
                if (W(this.bell, function (other) {
                    this.shakeobj = instance_create(this.x, this.y, 'obj_shakedirectional');
                    this.shakeobj.target = this;
                    this.shakeobj.dir = 180;
                }, this) === EXIT) return;
                if (choose(0, 1) == 0) {
                    snd_play_pitch('snd_bell', 0.8);
                    this.i = 0;
                    while (this.i < 7) {
                        this.radialshot = instance_create(this.bell.x + 42, this.bell.y + 60, 'obj_gerson_bell_bullet_radial');
                        if (W(this.radialshot, function (other) {
                            scr_bullet_init(this);
                        }, this) === EXIT) return;
                        this.radialshot.active = 1;
                        this.radialshot.place = 220 - 24 * this.i + angle_offset;
                        this.radialshot.depth = this.depth - 1;
                        this.radialshot.target = 3;
                        this.radialshot.damage = 1;
                        this.radialshot.grazed = 0;
                        this.i = this.i + 1;
                    }
                } else {
                    snd_play_pitch('snd_bell', 1.1);
                    this.i = 0;
                    while (this.i < 10) {
                        this.radialshot = instance_create(this.bell.x + 22, this.bell.y + 60, 'obj_gerson_bell_bullet_radial');
                        if (W(this.radialshot, function (other) {
                            scr_bullet_init(this);
                        }, this) === EXIT) return;
                        this.radialshot.active = 1;
                        this.radialshot.place = 220 - 16 * this.i + angle_offset;
                        this.radialshot.depth = this.depth - 1;
                        this.radialshot.target = 3;
                        this.radialshot.type = 1;
                        this.radialshot.damage = 1;
                        this.radialshot.grazed = 0;
                        this.i = this.i + 1;
                    }
                }
            } else {
                if (W(this.bell, function (other) {
                    this.shakeobj = instance_create(this.x, this.y, 'obj_shakedirectional');
                    this.shakeobj.target = this;
                    this.shakeobj.dir = 0;
                }, this) === EXIT) return;
                if (choose(0, 1) == 0) {
                    snd_play_pitch('snd_bell', 0.8);
                    this.i = 0;
                    while (this.i < 7) {
                        this.radialshot = instance_create(this.bell.x + 22, this.bell.y + 60, 'obj_gerson_bell_bullet_radial');
                        if (W(this.radialshot, function (other) {
                            scr_bullet_init(this);
                        }, this) === EXIT) return;
                        this.radialshot.active = 1;
                        this.radialshot.place = 220 + 24 * this.i + angle_offset;
                        this.radialshot.depth = this.depth - 1;
                        this.radialshot.target = 3;
                        this.radialshot.damage = 1;
                        this.radialshot.grazed = 0;
                        this.i = this.i + 1;
                    }
                } else {
                    snd_play_pitch('snd_bell', 1.1);
                    this.i = 0;
                    while (this.i < 11) {
                        this.radialshot = instance_create(this.bell.x + 22, this.bell.y + 60, 'obj_gerson_bell_bullet_radial');
                        if (W(this.radialshot, function (other) {
                            scr_bullet_init(this);
                        }, this) === EXIT) return;
                        this.radialshot.active = 1;
                        this.radialshot.place = 220 + 16 * this.i + angle_offset;
                        this.radialshot.depth = this.depth - 1;
                        this.radialshot.target = 3;
                        this.radialshot.type = 1;
                        this.radialshot.damage = 1;
                        this.radialshot.grazed = 0;
                        this.i = this.i + 1;
                    }
                }
            }
        }
    }
    if (this.con == 1) {
        this.timer = this.timer + 1;
        if (this.timer == 4) {
            this.timer = 0;
            this.con = 2;
            this.image_index = 2;
        }
    }
    if (this.con == 2) {
        this.timer = this.timer + 1;
        if (this.timer == 4) {
            this.timer = - 22;
            this.con = 0;
            this.image_index = 0;
        }
    }
    if (global.turntimer < 1) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_bell_hit', GersonBellHit);

// obj_gerson_bell_bullet (default sprite spr_gerson_musical_note2, depth 0, parent obj_regularbullet)
class GersonBellBullet extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_musical_note2';
  }
  create() {
    super.create?.();
    this.timer = 0;
    this.dir = 1;
    this.speed = 20;
    this.image_xscale = 1;
    this.image_yscale = 1;
    this.pos = 0;
    this.siner = irandom(200);
    this.ypos ??= []; this.ypos[0] = O('obj_growtangle').y - 60;
    this.ypos ??= []; this.ypos[1] = O('obj_growtangle').y - 30;
    this.ypos ??= []; this.ypos[2] = O('obj_growtangle').y;
    this.ypos ??= []; this.ypos[3] = O('obj_growtangle').y + 30;
    this.ypos ??= []; this.ypos[4] = O('obj_growtangle').y + 60;
  }
  step() {
    if (this.timer < 16) {
        this.timer = this.timer + 1;
        this.speed = lerp(this.speed, 4, this.timer / 15);
    }
    if (this.timer < 11) {
        this.y = lerp(this.ystart, this.ypos[this.pos], this.timer / 10);
    }
    if (this.timer > 15) {
        this.timer = this.timer + 1;
        this.speed = lerp(4, 20, (this.timer - 15) / 40);
    }
    if (this.direction == 180 && this.x < O('obj_growtangle').x - 75) {
        this.image_alpha = this.image_alpha - 0.1;
    }
    if (this.direction == 0 && this.x > O('obj_growtangle').x + 75) {
        this.image_alpha = this.image_alpha - 0.1;
    }
    if (this.image_alpha < 0) {
        instance_destroy(this);
    }
    if (global.turntimer < 1) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_bell_bullet', GersonBellBullet);

// obj_gerson_bell_bullet_radial (default sprite spr_gerson_musical_note2, depth 0, parent obj_regularbullet)
class GersonBellBulletRadial extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_musical_note2';
  }
  create() {
    super.create?.();
    this.timer = 0;
    this.place = 1;
    this.speed = 20;
    this.image_xscale = 1;
    this.image_yscale = 1;
    this.pos = 0;
    this.type = 0;
    this.length = 0;
    this.fakespeed = 8;
    this.dirspeed = 1;
  }
  step() {
    let statetimer;
    this.timer = this.timer + 1;
    if (this.type == 0) {
        statetimer = 12;
        if (this.timer <= statetimer) {
            this.fakespeed = lerp(16, 4, this.timer / statetimer);
            this.dirspeed = lerp(2.25, 1.5, this.timer / statetimer);
        }
        if (this.timer > statetimer) {
            this.fakespeed = lerp(4, 16, (this.timer - statetimer) / statetimer);
            this.dirspeed = lerp(1.5, 2.25, (this.timer - statetimer) / statetimer);
        }
        if (this.timer > 24) {
            this.image_alpha = this.image_alpha - 0.1;
        }
    }
    if (this.type == 1) {
        statetimer = 12;
        if (this.timer <= statetimer) {
            this.fakespeed = lerp(14, 3, this.timer / statetimer);
            this.dirspeed = lerp(3, 1.25, this.timer / statetimer);
        }
        if (this.timer > statetimer) {
            this.fakespeed = lerp(3, 9, (this.timer - statetimer) / statetimer);
            this.dirspeed = lerp(1.25, 1.75, (this.timer - statetimer) / statetimer);
        }
        if (this.timer > 40) {
            this.image_alpha = this.image_alpha - 0.1;
        }
    }
    this.x = this.xstart + lengthdir_x(this.length, this.place);
    this.y = this.ystart + lengthdir_y(this.length, this.place);
    this.length = this.length + this.fakespeed;
    this.place = this.place + this.dirspeed;
    if (global.turntimer < 1) {
        instance_destroy(this);
    }
    if (this.image_alpha < 0) {
        instance_destroy(this);
    }
    if (this.x < S.__view_get(0, 0) - 80) {
        instance_destroy(this);
    }
    if (this.x > S.__view_get(0, 0) + 760) {
        instance_destroy(this);
    }
    if (this.y < S.__view_get(1, 0) - 80) {
        instance_destroy(this);
    }
    if (this.y > S.__view_get(1, 0) + 580) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_bell_bullet_radial', GersonBellBulletRadial);

// obj_gerson_rudebuster (default sprite spr_rudebuster_beam, depth 0)
class GersonRudebuster extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_rudebuster_beam';
  }
  create() {
    this.inst = instance_create(this.x, this.y, 'obj_gerson_slowdown');
    if (O('obj_hammer_of_justice_enemy').rudebusterhitcountmax == 1) {
        if (O('obj_hammer_of_justice_enemy').susiehitbyrudebustercount == 0) {
            this.inst.type = 0;
        }
        if (O('obj_hammer_of_justice_enemy').susiehitbyrudebustercount == 1) {
            this.inst.type = 1;
        }
        if (O('obj_hammer_of_justice_enemy').susiehitbyrudebustercount == 2) {
            this.inst.type = 2;
        }
    }
    this.target = 43843743;
    this.damage = 1;
    this.star = 0;
    this.caster = 0;
    this.image_alpha = 0;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_speed = 1;
    this.image_angle = 180;
    this.i = 0;
    while (this.i < 10) {
        this.prevx ??= []; this.prevx[this.i] = this.x;
        this.prevy ??= []; this.prevy[this.i] = this.y;
        this.i = this.i + 1;
    }
    this.a = 0;
    this.targetx = 0;
    this.targety = 0;
    this.t = 0;
    this.tmax = 4;
    this.siner = 0;
    this.explode = 0;
    this.maxaft = 0;
    this.bolt_timer = 0;
    this.chosen_bolt = 0;
    this.final_bolt = 0;
    this.red = 0;
    this.battlemode = 0;
    this.textcolortimer = 0x000000;
    this.textcolor = merge_color(0xffffff, 0xff0000, this.textcolortimer);
    this.susieattackcon = 0;
    this.susieattacktimer = 0;
    this.buffer_z = 0;
    this.hurtflashalpha = 0;
    scr_bullet_init(this);
    this.target = 3;
    this.damage = 60;
    this.hitsusietimer = 0;
    this.hitback = false;
  }
  draw() {
    let scale, px, py, randdir, dist, randsizex, randsizey;
    if (this.susieattackcon == 2) {
        scale = 1;
        if (this.susieattacktimer == 7) {
            scale = 1.2;
        }
        if (this.susieattacktimer == 8) {
            scale = 0.8;
        }
        if (this.susieattacktimer == 9) {
            scale = 0.6;
        }
        if (this.susieattacktimer == 10) {
            scale = 0.5;
        }
        if (this.susieattacktimer > 3) {
            draw_sprite_ext('spr_gerson_rude_orb2', 0, O('obj_heroparent').x + 200 - 38, O('obj_heroparent').y + 37 - 10, 0.6 * scale, 0.9 * scale, this.image_angle - this.susieattacktimer * 80, this.image_blend, this.image_alpha);
        }
        if (this.susieattacktimer < 7) {
            px = O('obj_heroparent').x + 200 - 36;
            py = O('obj_heroparent').y + 37 - 10;
            for (let _r140 = 0, _n140 = (4); _r140 < _n140; _r140++) {
                randdir = irandom(360);
                dist = 40 + irandom(180);
                randsizex = 0.35 + random(0.85);
                randsizey = 0.45 + random(0.55);
                if (W(instance_create(px + lengthdir_x(dist, randdir), py + lengthdir_y(dist, randdir), 'obj_particle_generic'), function (other) {
                    this.image_xscale = randsizex;
                    this.image_yscale = randsizey;
                    this.direction = point_direction(this.x, this.y, px, py);
                    this.image_angle = this.direction;
                    scr_lerpvar(this,  "speed", 30, 60 + irandom(8), 6, 1, "in");
                    scr_lerpvar(this,  "image_xscale", this.image_xscale * 16, 0, 6, 1, "in");
                    scr_lerpvar(this,  "image_yscale", this.image_yscale, this.image_xscale * 0.5, 6, 1, "in");
                }, this) === EXIT) return;
            }
            if (W('obj_particle_generic', function (other) {
                if (point_distance(this.x, this.y, px, py) <= 60) {
                    instance_destroy(this);
                }
            }, this) === EXIT) return;
        }
        return;
    }
    draw_self(this);
    if (this.susieattackcon == 0 && this.x < camerax() + 330) {
        this.textcolortimer = this.textcolortimer + 0.1;
        this.textcolor = merge_color(0xffffff, 0xff0000, 0.5 + Math.sin(this.textcolortimer) / 2);
        draw_set_alpha(0.5);
        if (T(global.is_console) || T(O('obj_gamecontroller').gamepad_active)) {
            S.ossafe_fill_rectangle(O('obj_herosusie').x + 86, O('obj_herosusie').y + 33, O('obj_herosusie').x + 90 + 70, O('obj_herosusie').y + 30 + 30, false);
        } else if (global.lang != "ja") {
            S.ossafe_fill_rectangle(O('obj_herosusie').x + 86, O('obj_herosusie').y + 33, O('obj_herosusie').x + 90 + 70 + 36, O('obj_herosusie').y + 30 + 30, false);
        } else {
            S.ossafe_fill_rectangle(O('obj_herosusie').x + 86, O('obj_herosusie').y + 33, O('obj_herosusie').x + 90 + 70 + 41, O('obj_herosusie').y + 30 + 30, false);
        }
        draw_set_alpha(1);
        draw_text_color(O('obj_herosusie').x + 90, O('obj_herosusie').y + 30, S.stringsetloc("PRESS", "obj_gerson_rudebuster_slash_Draw_0_gml_57_0"), this.textcolor, this.textcolor, this.textcolor, this.textcolor, 1);
        if (T(global.is_console) || T(O('obj_gamecontroller').gamepad_active)) {
            draw_sprite_ext(S.scr_getbuttonsprite(global.input_g[4], false), 0, O('obj_herosusie').x + 168, O('obj_herosusie').y + 33, 2, 2, 0, 0xffffff, 1);
        } else {
            draw_text_color(O('obj_herosusie').x + 160, O('obj_herosusie').y + 30, S.stringsetsub("~1", S.scr_get_input_name(4)), this.textcolor, this.textcolor, this.textcolor, this.textcolor, 1);
        }
    }
    if (this.hurtflashalpha > 0) {
        d3d_set_fog(true, 0xffffff, 0, 1);
        draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, 0xffffff, this.hurtflashalpha);
        d3d_set_fog(false, 0x000000, 0, 0);
        this.hurtflashalpha = this.hurtflashalpha - 0.1;
    }
  }
  step() {
    let b;
    if (this.image_alpha < 1) {
        this.image_alpha = this.image_alpha + 0.25;
    } else {
        this.image_alpha = 1;
    }
    if ((button1_p() || button2_p() || button3_p()) && this.hurtflashalpha == 0 && this.explode == 0 && O('obj_herosusie').hurt == 0) {
        this.buffer_z = 2;
    }
    if (this.buffer_z > 0 && this.hurtflashalpha == 0 && this.explode == 0 && O('obj_herosusie').hurt == 0) {
        if (this.susieattackcon == 0) {
            snd_play('snd_ultraswing');
            snd_play('snd_ultraswing');
            this.susieattackcon = 1;
            if (W('obj_herosusie', function (other) {
                this.x = this.xstart;
                sprite_set_offset('spr_susie_hitback_miss', 18, 9);
                S.scr_battle_sprite_set("susie", 'spr_susie_hitback_miss', 0.5, 0);
            }, this) === EXIT) return;
        }
    }
    if (this.susieattackcon == 1) {
        this.susieattacktimer = this.susieattacktimer + 1;
        if (this.susieattacktimer == 4) {
            if (W('obj_gerson_slowdown', function (other) {
                this.con = 1;
                this.timer = 0;
            }, this) === EXIT) return;
            if (this.x < camerax() + 330) {
                this.hitback = true;
                S.scr_battle_sprite_set("susie", 'spr_susie_hitback', 0.5, 0);
                if (W('obj_herosusie', function (other) {
                    this.image_index = 2;
                }, this) === EXIT) return;
                scr_shakeobj(this);
                instance_create(this.x, this.y, 'obj_shake');
                snd_play('snd_criticalswing');
                if (W('obj_afterimage', function (other) {
                    instance_destroy(this);
                }, this) === EXIT) return;
                this.susieattackcon = 2;
                this.susieattacktimer = 0;
                this.hurtflashalpha = 1;
                this.direction = 0;
                this.x = this.x + 10;
                this.inst = instance_create_depth(O('obj_heroparent').x + 54 + 20 - 36, O('obj_heroparent').y - 64 - 18, O('obj_herosusie').depth - 9, 'obj_animation');
                this.inst.sprite_index = 'spr_gerson_hit_fx4';
                this.inst.image_speed = 0.5;
                this.inst.image_angle = 0;
                this.inst.image_xscale = 2;
                this.inst.image_yscale = 2;
                if (W(instance_create(camerax(), cameray(), 'obj_afterimage_screen'), function (other) {
                    this.faderate = 0.05;
                }, this) === EXIT) return;
            }
        }
        if (this.susieattacktimer == 9) {
            this.susieattackcon = 0;
            this.susieattacktimer = 0;
        }
    }
    if (this.susieattackcon == 2) {
        this.susieattacktimer = this.susieattacktimer + 1;
        O('obj_heroparent').x = O('obj_heroparent').x + 1;
        if (this.susieattacktimer == 2) {
            this.inst = instance_create_depth(O('obj_heroparent').x + 190 - 36, O('obj_heroparent').y + 40 - 10, O('obj_herosusie').depth - 10, 'obj_animation');
            this.inst.sprite_index = 'spr_susie_gerson_hitbback_fx_1';
            this.inst.image_speed = 1;
            this.inst.image_angle = 0;
            this.inst.image_xscale = 3;
            this.inst.image_yscale = 3;
        }
        if (this.susieattacktimer == 10) {
            this.susieattackcon = 0;
            this.susieattacktimer = 0;
            if (W('obj_herosusie', function (other) {
                this.image_index = 12;
            }, this) === EXIT) return;
            this.inst = instance_create_depth(O('obj_heroparent').x + 200 - 36, O('obj_heroparent').y + 40 - 10, O('obj_herosusie').depth - 10, 'obj_animation');
            this.inst.sprite_index = 'spr_susie_gerson_hitbback_fx_2';
            this.inst.image_speed = 1;
            this.inst.image_angle = 0;
            this.inst.image_xscale = 3;
            this.inst.image_yscale = 3;
            scr_shakeobj(this);
            instance_create(this.x, this.y, 'obj_shake');
            snd_play('snd_rudebuster_hit');
            snd_play('snd_rudebuster_swing');
            this.blast = instance_create(O('obj_heroparent').x + 180 - 36, O('obj_heroparent').y + 60 - 18, 'obj_rudebuster_bolt');
            this.blast.caster = 0;
            this.blast.target = instancesOf('obj_hammer_of_justice_enemy')[0];
            this.blast.damage = Math.ceil(global.battlemag[1] * 5 + global.battleat[1] * 11 - global.monsterdf[0] * 3);
            this.blast.star = 0;
            this.blast.speedmax = 10;
            this.blast.image_alpha = 1;
            this.blast.direction = 0;
            this.blast.gersonswingtimer = 4;
            this.blast.gersonoffset = - 20;
            if (W('obj_particle_generic', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            instance_destroy(this);
        }
        return;
    }
    this.buffer_z = this.buffer_z - 1;
    if (this.t == 0) {
        if (instance_exists(this.target)) {
            this.targetx = this.target.x + this.target.sprite_width / 2;
            this.targety = this.target.y + this.target.sprite_height / 2;
        }
        this.cx = this.targetx;
        this.cy = this.targety;
        this.direction = point_direction(this.x, this.y, this.cx, this.cy) - 20;
        this.speed = 9;
        this.friction = - 1.5;
        this.image_angle = this.direction;
    }
    if (this.t >= 1 && this.explode == 0) {
        this.dir = point_direction(this.x, this.y, this.cx, this.cy);
        this.direction = this.direction + angle_difference(this.dir, this.direction) / 4;
        this.image_angle = this.direction;
        if (point_distance(this.x, this.y, this.cx, this.cy) <= 40) {
            this.speed = this.speed == 0.96;
            this.hitsusietimer = this.hitsusietimer + 1;
            if (this.hitsusietimer == 2 && this.hitback == 0) {
                this.visible = 0;
                this.explode = 1;
                this.t = 1;
            }
        }
    }
    if (this.explode == 1) {
        if (W('obj_herosusie', function (other) {
            S.scr_battle_sprite_reset("susie");
            this.hurt = 1;
            this.hurttimer = 0;
        }, this) === EXIT) return;
        if (W('obj_gerson_slowdown', function (other) {
            this.con = 1;
            this.timer = 0;
        }, this) === EXIT) return;
        this.susieattackcon = 0;
        this.susieattacktimer = 0;
        this.buffer_z = 0;
        if (this.t == 1) {
            b = (global.hp[2] - 30) / 250;
            if (b < 0) {
                b = 0;
            }
            this.damage = lerp(12, 90, b);
            global.inv = - 1;
            O('obj_hammer_of_justice_enemy').rudebusterhitcount = 0;
            O('obj_hammer_of_justice_enemy').progress = O('obj_hammer_of_justice_enemy').progress + 6;
            O('obj_hammer_of_justice_enemy').mercylaughcon = 1;
            O('obj_hammer_of_justice_enemy').mercylaughcount = 6;
            S.scr_damage_all(this);
            this.bonus_anim = 0;
            if (W('obj_hammer_of_justice_enemy', function (other) {
                if (this.susiehitbyrudebustercount == 0 && this.rudebusterhitcountmax == 1) {
                    this.susiehitbyrudebustercon = 1;
                }
                this.susiehitbyrudebustercount = this.susiehitbyrudebustercount + 1;
                this.rudebusterdelay = 20;
            }, this) === EXIT) return;
            if (W(this.target, function (other) {
                this._oflash = instance_create(this.x, this.y, 'obj_oflash_gerson_buster');
                this._oflash.image_xscale = this.image_xscale;
                this._oflash.image_speed = 0;
                this._oflash.image_index = this.image_index;
                this._oflash.image_yscale = this.image_yscale;
                this._oflash.sprite_index = 'spr_susieb_hurt';
                this._oflash.depth = this.depth - 1;
                this._oflash.target = this;
            }, this) === EXIT) return;
            snd_play('snd_rudebuster_hit');
            this.i = 0;
            while (this.i < 4) {
                this.burst ??= []; this.burst[this.i] = scr_afterimage(this);
                this.burst[this.i].image_speed = 0.5;
                this.burst[this.i].x = this.cx;
                this.burst[this.i].y = this.cy;
                this.burst[this.i].image_angle = 45 + this.i * 90;
                this.burst[this.i].direction = this.burst[this.i].image_angle;
                this.burst[this.i].speed = 25;
                this.burst[this.i].depth = this.depth - 10;
                this.i = this.i + 1;
            }
            this.i = 4;
            while (this.i < 8) {
                this.burst ??= []; this.burst[this.i] = scr_afterimage(this);
                this.burst[this.i].image_speed = 0.5;
                this.burst[this.i].x = this.cx;
                this.burst[this.i].y = this.cy;
                this.burst[this.i].image_angle = 45 + this.i * 90;
                this.burst[this.i].direction = this.burst[this.i].image_angle;
                this.burst[this.i].speed = 25;
                this.burst[this.i].depth = this.depth - 10;
                this.i = this.i + 1;
            }
        }
        if (this.t >= 2) {
            this.i = 0;
            while (this.i < 4) {
                if (W(this.burst[this.i], function (other) {
                    this.speed = this.speed * 0.75;
                    this.image_xscale = this.image_xscale * 0.8;
                }, this) === EXIT) return;
                this.i = this.i + 1;
            }
            this.i = 4;
            while (this.i < 8) {
                if (W(this.burst[this.i], function (other) {
                    this.speed = this.speed * 0.8;
                    this.image_xscale = this.image_xscale * 0.8;
                }, this) === EXIT) return;
                this.i = this.i + 1;
            }
        }
        if (this.t >= 18) {
            instance_destroy(this);
        }
    }
    if (this.explode == 0 && this.speed != 0) {
        this.aft ??= []; this.aft[this.maxaft] = scr_afterimage(this);
        this.aft[this.maxaft].image_yscale = 1.8;
        this.aft[this.maxaft].image_angle = this.image_angle;
        this.aft[this.maxaft].image_index = 4;
        this.aft[this.maxaft].image_speed = 0.5;
        this.aft[this.maxaft].image_alpha = this.image_alpha - 0.2;
        this.maxaft = this.maxaft + 1;
    }
    this.i = 0;
    while (this.i < this.maxaft) {
        if (W(this.aft[this.i], function (other) {
            this.image_yscale = this.image_yscale - 0.1;
            if (this.image_yscale <= 0.1) {
                instance_destroy(this);
            }
        }, this) === EXIT) return;
        if (this.explode == 1) {
            if (W(this.aft[this.i], function (other) {
                this.image_alpha = this.image_alpha - 0.07;
                this.image_yscale = this.image_yscale * 0.9;
                if (this.image_yscale <= 0.1) {
                    instance_destroy(this);
                }
            }, this) === EXIT) return;
        }
        this.i = this.i + 1;
    }
    this.a = this.a + 1;
    this.t = this.t + 1;
  }
}
defineObject('obj_gerson_rudebuster', GersonRudebuster);

// obj_gerson_growtangle (default sprite None, depth 0)
class GersonGrowtangle extends Instance {
  cleanUp() {
    O('obj_growtangle').image_alpha = 1;
    O('obj_growtangle').sprite_index = 'spr_battlebg_0';
    O('obj_growtangle').image_xscale = 1.5;
    O('obj_growtangle').image_yscale = 1.5;
  }
  create() {
    this.x1 = Math.ceil(O('obj_growtangle').x - O('obj_growtangle').sprite_width / 2);
    this.x2 = Math.ceil(O('obj_growtangle').x + O('obj_growtangle').sprite_width / 2);
    this.y1 = Math.ceil(O('obj_growtangle').y - O('obj_growtangle').sprite_height / 2);
    this.y2 = Math.ceil(O('obj_growtangle').y + O('obj_growtangle').sprite_height / 2);
    this.col = merge_color(0x008000, 0x00ff00, 0.5);
    this.depth = O('obj_growtangle').depth - 1;
    O('obj_growtangle').x = - 99999;
    this.timer = 0;
    this.con = 0;
    this.xxprev = 0;
    this.maxx = 0;
  }
  draw() {
    let xx, colo;
    if (global.turntimer < 1) {
        instance_destroy(this);
        return;
    }
    if (this.con == 0) {
        this.timer = this.timer + 1;
        if (this.timer == 2) {
            this.anim = instance_create(O('obj_heart').x + 40, O('obj_heart').y - 10, 'obj_animation');
            this.anim.sprite_index = 'spr_gerson_swing';
            this.anim.image_speed = 0.5;
            this.anim.image_index = 0;
            this.anim.image_xscale = 2;
            this.anim.image_yscale = 2;
        }
        if (this.timer == 9) {
            if (W('obj_heart', function (other) {
                this.color = 0x000000;
                this.sprite_index = 'spr_heart';
                this.inst = instance_create(O('obj_heart').x, O('obj_heart').y, 'obj_gerson_fakeheart');
                this.inst.directionhit = 180;
                this.inst.speed = 15.6;
            }, this) === EXIT) return;
            instance_create(this.x, this.y, 'obj_shake');
            snd_play('snd_screenshake');
        }
        if (this.timer > 11) {
            if (i_ex('obj_gerson_fakeheart')) {
                xx = O('obj_gerson_fakeheart').x;
            } else {
                xx = O('obj_heart').x;
            }
            this.x1 = xx - 30;
            if (this.x1 < camerax() + 50) {
                this.x1 = camerax() + 50;
            }
        }
        if (this.timer == 35) {
            this.timer = 0;
            this.con = 1;
            this.xxprev = O('obj_gerson_fakeheart').x;
        }
    }
    if (this.con == 1) {
        this.timer = this.timer + 1;
        if (this.timer % 20 == 0 && O('obj_heart').x < this.x2 - 80) {
            this.gers = instance_create(O('obj_heart').x + 20, this.y1 + 20, 'obj_gerson_swing_down_new');
            if (this.gers.x > camerax() + 260) {
                this.gers.x = camerax() + 260;
            }
        }
        if (i_ex('obj_gerson_fakeheart')) {
            xx = O('obj_gerson_fakeheart').x;
        } else {
            xx = O('obj_heart').x;
        }
        if (this.xxprev < xx) {
            this.y1 = this.y1 + 2;
        }
        if (this.xxprev < xx) {
            this.xxprev = xx;
        }
        if (this.y1 > cameray() + 250) {
            this.y1 = cameray() + 250;
        }
        this.x1 = xx - 30;
        if (this.x1 < camerax() + 50) {
            this.x1 = camerax() + 50;
        }
        if (O('obj_heart').x > this.x2 - 50 && this.timer > 30) {
            this.timer = 0;
            this.con = 2;
        }
    }
    if (this.con == 2) {
        O('obj_growtangle').x = O('obj_growtangle').xstart;
        O('obj_growtangle').image_alpha = 0;
        this.x1 = lerp(this.x1, O('obj_growtangle').x - O('obj_growtangle').sprite_width / 2, 0.2);
        this.x2 = lerp(this.x2, O('obj_growtangle').x + O('obj_growtangle').sprite_width / 2, 0.2);
        this.y1 = lerp(this.y1, O('obj_growtangle').y - O('obj_growtangle').sprite_height / 2, 0.2);
        this.y2 = lerp(this.y2, O('obj_growtangle').y + O('obj_growtangle').sprite_height / 2, 0.2);
        this.timer = this.timer + 1;
        if (this.timer == 2) {
            snd_play('snd_smallswing');
            instance_create(this.x, this.y, 'obj_spearblocker');
        }
        if (this.timer == 20) {
            O('obj_growtangle').image_alpha = 1;
            instance_destroy(this);
        }
    }
    colo = draw_get_color();
    S.draw_set_colour(this.col);
    S.d_line_width(this.x1, this.y1 - 1, this.x1, this.y2 + 2, 4);
    S.d_line_width(this.x1, this.y1 + 1, this.x2, this.y1 + 1, 4);
    S.d_line_width(this.x2, this.y1 - 1, this.x2, this.y2 + 2, 4);
    S.d_line_width(this.x1, this.y2, this.x2, this.y2, 4);
    S.draw_set_colour(colo);
  }
  endStep() {
    if (global.turntimer < 1) {
        instance_destroy(this);
        return;
    }
    if (instance_exists('obj_heart')) {
        if (O('obj_heart').x < this.x1 + 3) {
            O('obj_heart').x = this.x1 + 3;
        }
        if (O('obj_heart').x > this.x2 - 3 - 15) {
            O('obj_heart').x = this.x2 - 3 - 15;
        }
        if (O('obj_heart').y < this.y1 + 3) {
            O('obj_heart').y = this.y1 + 3;
        }
        if (O('obj_heart').y > this.y2 - 3 - 15) {
            O('obj_heart').y = this.y2 - 3 - 15;
        }
    }
  }
}
defineObject('obj_gerson_growtangle', GersonGrowtangle);

// obj_gerson_growtangle_telegraph (default sprite spr_whitepixel, depth 0)
class GersonGrowtangleTelegraph extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_whitepixel';
  }
  create() {
    this.con = 0;
    this.special = 0;
    this.image_alpha = 0;
  }
  draw() {
    if (!T(i_ex('obj_growtangle'))) {
        return;
    }
    this.x1 = this.x;
    this.y1 = this.y;
    this.x2 = this.x + this.image_xscale;
    this.y2 = this.y + this.image_yscale;
    this.x3 = this.x;
    this.y3 = this.y;
    this.x4 = this.x;
    this.y4 = this.y;
    this.x5 = this.x;
    this.y5 = this.y;
    this.x6 = this.x;
    this.y6 = this.y;
    if (this.special == 0) {
        if (O('obj_growtangle').maxxscale == 2) {
            if (this.x1 < O('obj_growtangle').x - 210) {
                this.x1 = O('obj_growtangle').x - 210;
            }
            if (this.x2 > O('obj_growtangle').x + 215) {
                this.x2 = O('obj_growtangle').x + 215;
            }
            if (this.y1 < O('obj_growtangle').y - 35) {
                this.y1 = O('obj_growtangle').y - 35;
            }
            if (this.y2 > O('obj_growtangle').y + 35) {
                this.y2 = O('obj_growtangle').y + 35;
            }
        } else {
            if (this.x1 < O('obj_growtangle').x - 53) {
                this.x1 = O('obj_growtangle').x - 53;
            }
            if (this.y1 < O('obj_growtangle').y - 53) {
                this.y1 = O('obj_growtangle').y - 53;
            }
            if (this.x2 > O('obj_growtangle').x + 53) {
                this.x2 = O('obj_growtangle').x + 53;
            }
            if (this.y2 > O('obj_growtangle').y + 53) {
                this.y2 = O('obj_growtangle').y + 53;
            }
        }
        draw_set_alpha(this.image_alpha);
        S.ossafe_fill_rectangle_color(this.x1, this.y1, this.x2, this.y2, 16777215, 16777215, 16777215, 16777215, false);
        draw_set_alpha(1);
    }
    if (this.special > 0) {
        if (this.special == 1) {
            this.x1 = O('obj_growtangle').x + 53;
            this.y1 = O('obj_growtangle').y;
            this.x2 = O('obj_growtangle').x + 53;
            this.y2 = O('obj_growtangle').y - 53;
            this.x3 = O('obj_growtangle').x;
            this.y3 = O('obj_growtangle').y - 53;
            this.x4 = O('obj_growtangle').x - 53;
            this.y4 = O('obj_growtangle').y;
            this.x5 = O('obj_growtangle').x - 53;
            this.y5 = O('obj_growtangle').y + 53;
            this.x6 = O('obj_growtangle').x;
            this.y6 = O('obj_growtangle').y + 53;
            draw_set_alpha(this.image_alpha);
            draw_set_color(0xffffff);
            S.d_triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, false);
            S.d_triangle(this.x4, this.y4, this.x5, this.y5, this.x6, this.y6, false);
            S.d_triangle(this.x3, this.y3, this.x4, this.y4, this.x6, this.y6, false);
            S.d_triangle(this.x1, this.y1, this.x3, this.y3, this.x6, this.y6, false);
            draw_set_alpha(1);
        }
        if (this.special == 2) {
            this.x1 = O('obj_growtangle').x - 53;
            this.y1 = O('obj_growtangle').y;
            this.x2 = O('obj_growtangle').x - 53;
            this.y2 = O('obj_growtangle').y - 53;
            this.x3 = O('obj_growtangle').x;
            this.y3 = O('obj_growtangle').y - 53;
            this.x4 = O('obj_growtangle').x + 53;
            this.y4 = O('obj_growtangle').y;
            this.x5 = O('obj_growtangle').x + 53;
            this.y5 = O('obj_growtangle').y + 53;
            this.x6 = O('obj_growtangle').x;
            this.y6 = O('obj_growtangle').y + 53;
            draw_set_alpha(this.image_alpha);
            draw_set_color(0xffffff);
            S.d_triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, false);
            S.d_triangle(this.x4, this.y4, this.x5, this.y5, this.x6, this.y6, false);
            S.d_triangle(this.x3, this.y3, this.x4, this.y4, this.x6, this.y6, false);
            S.d_triangle(this.x1, this.y1, this.x3, this.y3, this.x6, this.y6, false);
            draw_set_alpha(1);
        }
        if (this.special == 3) {
            draw_set_alpha(this.image_alpha);
            S.ossafe_fill_rectangle_color(O('obj_growtangle').x - 30, O('obj_growtangle').y - 53, O('obj_growtangle').x + 32, O('obj_growtangle').y + 53, 16777215, 16777215, 16777215, 16777215, false);
            draw_set_alpha(1);
        }
        if (this.special == 4) {
            draw_set_alpha(this.image_alpha);
            S.ossafe_fill_rectangle_color(O('obj_growtangle').x - 53, O('obj_growtangle').y + 30, O('obj_growtangle').x + 53, O('obj_growtangle').y - 32, 16777215, 16777215, 16777215, 16777215, false);
            draw_set_alpha(1);
        }
    }
  }
  step() {
    if (this.con == 0) {
        this.image_alpha = this.image_alpha + 0.2;
        if (this.image_alpha == 1) {
            this.con = 1;
        }
    } else {
        this.image_alpha = this.image_alpha - 0.2;
        if (this.image_alpha < 0) {
            instance_destroy(this);
        }
    }
    if (global.turntimer < 1) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_growtangle_telegraph', GersonGrowtangleTelegraph);

// obj_gerson_growtangle_telegraph_new (default sprite spr_gerson_swing_down_telegraph, depth 0, parent obj_regularbullet)
class GersonGrowtangleTelegraphNew extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_swing_down_telegraph';
  }
  cleanUp() {
    return;
  }
  create() {
    super.create?.();
    let a;
    scr_bullet_init(this);
    this.con = 0;
    this.special = 0;
    this.destroyonhit = false;
    this.active = 0;
    this.activetimer = 0;
    this.longtelegraph = false;
    this.image_alpha = 0;
    a = (global.hp[2] - 30) / 250;
    if (a < 0) {
        a = 0;
    }
    this.damage = lerp(12, 90, a);
    if (i_ex('obj_sound_of_justice_enemy')) {
        this.target = 4;
        if (O('obj_sound_of_justice_enemy').phase == 1) {
            this.damage = 38;
        } else {
            this.damage = 58;
        }
    }
    if (i_ex('obj_hammer_of_justice_enemy') && O('obj_hammer_of_justice_enemy').attackpattern == 19) {
        this.image_xscale = 1;
        this.sprite_index = 'spr_gerson_swing_down_telegraph3';
    } else if (i_ex('obj_hammer_of_justice_enemy') && O('obj_hammer_of_justice_enemy').reachedendphase == 1) {
        this.longtelegraph = true;
        this.image_xscale = 1;
        this.sprite_index = 'spr_gerson_swing_down_telegraph2';
    }
  }
  draw() {
    if (!T(instance_exists('obj_growtangle'))) {
        return;
    }
    let box;
    if (i_ex('obj_gerson_growtangle')) {
        box = [O('obj_gerson_growtangle').x1 + 3, O('obj_gerson_growtangle').y1 + 3, O('obj_gerson_growtangle').x2 - 3, O('obj_gerson_growtangle').y2 - 3];
    } else if (O('obj_growtangle').image_xscale == 2) {
        box = [gt_minx() + 5, gt_miny() + 5, gt_maxx() - 4, gt_maxy() - 4];
    } else {
        box = [gt_minx() + 3, gt_miny() + 3, gt_maxx() - 3, gt_maxy() - 3];
    }
    const alpha = Math.min(1, this.image_alpha);
    if (alpha > 0) {
      const ctx = G.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.rect(box[0], box[1], box[2] - box[0] + 1, box[3] - box[1] + 1);
      ctx.clip();
      draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, alpha);
      ctx.restore();
    }
    draw_set_alpha(1);
  }
  user5() {
    let a;
    a = (global.hp[2] - 30) / 250;
    if (a < 0) {
        a = 0;
    }
    this.damage = lerp(12, 90, a);
    if (i_ex('obj_sound_of_justice_enemy')) {
        this.target = 4;
        this.damage = 67;
    }
    if (this.active == 1) {
        if (this.target != 3) {
            S.scr_damage(this);
        }
        if (this.target == 3) {
            S.scr_damage_all(this);
        }
        if (this.destroyonhit == 1) {
            instance_destroy(this);
        }
    }
  }
  step() {
    if (this.con == 0) {
        if (!T(this.longtelegraph)) {
            this.image_alpha = this.image_alpha + 0.2;
            if (this.image_alpha == 1) {
                this.con = 1;
            }
        } else {
            this.image_alpha = this.image_alpha + 0.08;
            if (this.image_alpha >= 1.1) {
                this.con = 1;
            }
        }
    } else {
        if (this.image_alpha <= - 1.3) {
            this.activetimer = this.activetimer + 1;
            if (this.activetimer == 3) {
                this.active = 1;
            } else {
                this.active = 0;
            }
        }
        if (!T(this.longtelegraph)) {
            this.image_alpha = this.image_alpha - 0.4;
            if (this.image_alpha <= - 3.4) {
                instance_destroy(this);
            }
        }
        if (T(this.longtelegraph)) {
            this.image_alpha = this.image_alpha - 0.3333333333333333;
            if (this.image_alpha <= - 2) {
                instance_destroy(this);
            }
        }
    }
  }
}
defineObject('obj_gerson_growtangle_telegraph_new', GersonGrowtangleTelegraphNew);

// obj_gerson_growtangle_hit_fx (default sprite None, depth 0)
class GersonGrowtangleHitFx extends Instance {
  create() {
    this.dir = 1;
    this.timer = 0;
  }
  animationEnd() {
    instance_destroy(this);
  }
  endStep() {
    if (this.dir == - 1) {
        this.x = O('obj_growtangle').x + 74;
    }
    if (this.dir == 1) {
        this.x = O('obj_growtangle').x - 74;
    }
    if (this.sprite_index == 'spr_gerson_box_hit_fx2') {
        this.timer = this.timer + 1;
        if (this.timer == 6) {
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_gerson_growtangle_hit_fx', GersonGrowtangleHitFx);

// obj_giant_hammer (default sprite spr_giant_hammer, depth 0)
class GiantHammer extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_giant_hammer';
  }
  create() {
    scr_bullet_init(this);
    this.damage = 40;
    this.timer = 0;
    this.con = 0;
    this.type = 2;
    this.dir = 0;
    this.image_xscale = 1;
    this.image_yscale = 1;
    this.image_angle = 180;
    this.image_alpha = 0;
    this.depth = - 99999;
    this.fakex = 0;
    this.fakehspeed = - 10;
    this.fakealpha = 0;
    this.fadecon = 0;
    this.breakcon = 0;
    this.fadealpha = 0;
  }
  draw() {
    draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
    d3d_set_fog(true, 0xffffff, 0, 1);
    draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, 0xffffff, this.fadealpha);
    d3d_set_fog(false, 0x000000, 0, 0);
    if (this.fadealpha > 0) {
        this.fadealpha = this.fadealpha - 0.1;
    }
  }
  drawGui() {
    draw_set_color(0xffffff);
  }
  user14() {
    let a, b, c;
    if (this.con == 0 && this.timer > 8 || this.con != 0) {
        this.fakex = this.fakex + this.fakehspeed;
        if (this.fakehspeed < 0) {
            this.fakehspeed = this.fakehspeed + 0.6;
        } else {
            this.fakehspeed = 0;
        }
    }
    if (this.con == 0) {
        this.timer = this.timer + 1;
        if (this.timer == 3) {
            snd_play('motor_upper_quick');
        }
        a = lerp(900, 490, this.timer / 20);
        b = lerp(120, 50, this.timer / 20);
        c = lerp(240, 100, this.timer / 20);
        this.image_angle = lerp(200, a, this.timer / 20);
        if (this.timer < 21) {
            this.image_alpha = this.image_alpha + 0.04;
            this.x = lerp(this.xstart, this.xstart - b, this.timer / 20);
            this.y = lerp(this.ystart, this.ystart - c, this.timer / 20);
        }
        if (this.timer == 20) {
            this.timer = 0;
            this.con = 1;
            this.fadecon = 1;
            snd_play('snd_punchheavythunder');
            snd_play('snd_break2');
        }
    }
    if (this.con == 1) {
        this.timer = this.timer + 1;
        if (this.timer == 3) {
            this.breakcon = 1;
        }
        a = lerp(0, 260, this.timer / 9);
        this.image_angle = lerp(500, a, this.timer / 9);
        if (this.timer < 6) {
            this.x = lerp(this.xstart - 50, this.xstart, this.timer / 6);
            this.y = lerp(this.ystart - 100, this.ystart + 100, this.timer / 6);
        }
        if (this.timer >= 9) {
            this.timer = 0;
            this.con = 2;
        }
    }
    if (this.con == 2) {
        this.timer = this.timer + 1;
        if (this.timer > 5) {
            this.image_alpha = this.image_alpha - 0.2;
        }
        if (this.image_alpha < 0) {
            instance_destroy(this);
        }
    }
    if (this.fadecon == 1) {
        this.fakealpha = this.fakealpha + 0.2;
        if (this.fakealpha > 1.2) {
            this.fadecon = 2;
        }
    }
    if (this.fadecon == 2) {
        this.fakealpha = this.fakealpha - 0.2;
        if (this.fakealpha < 0) {
            this.fadecon = 0;
        }
    }
    if (this.type == 2 && this.con == 2) {
    } else {
        a = scr_afterimage(this);
        a.fadeSpeed = 0.08;
        a.image_alpha = this.image_alpha;
    }
    if (this.breakcon == 1) {
        this.breakcon = 2;
        if (W('obj_spearblocker', function (other) {
            this.piece1 = instance_create(this.x + lengthdir_x(32, this.image_angle - 35), this.y + lengthdir_y(32, this.image_angle - 35), 'obj_spearblocker_piece');
            this.piece1.image_angle = this.image_angle;
            this.piece1.image_index = 1;
            this.piece2 = instance_create(this.x + lengthdir_x(32, this.image_angle + 35), this.y + lengthdir_y(32, this.image_angle + 35), 'obj_spearblocker_piece');
            this.piece2.image_angle = this.image_angle;
            this.piece2.image_index = 0;
            this.piece3 = instance_create(this.x + lengthdir_x(30, 45), this.y + lengthdir_y(30, 45), 'obj_spearblocker_piece');
            this.piece3.sprite_index = 'spr_green_circle_piece';
            this.piece3.image_angle = 0;
            this.piece4 = instance_create(this.x + lengthdir_x(30, 135), this.y + lengthdir_y(30, 135), 'obj_spearblocker_piece');
            this.piece4.sprite_index = 'spr_green_circle_piece';
            this.piece4.image_angle = 90;
            this.piece5 = instance_create(this.x + lengthdir_x(30, 225), this.y + lengthdir_y(30, 225), 'obj_spearblocker_piece');
            this.piece5.sprite_index = 'spr_green_circle_piece';
            this.piece5.image_angle = 180;
            this.piece6 = instance_create(this.x + lengthdir_x(30, 315), this.y + lengthdir_y(30, 315), 'obj_spearblocker_piece');
            this.piece6.sprite_index = 'spr_green_circle_piece';
            this.piece6.image_angle = 270;
            if (this.idealdir == 180) {
                this.piece1.vspeed = - 9 - random(6);
                this.piece1.hspeed = 1 + random(2);
                this.piece2.vspeed = 5 + random(6);
                this.piece2.hspeed = 1 + random(2);
                this.piece3.vspeed = - 9 - random(6);
                this.piece3.hspeed = 1 + random(2);
                this.piece4.vspeed = - 9 - random(6);
                this.piece4.hspeed = 1 + random(2);
                this.piece5.vspeed = 5 + random(6);
                this.piece5.hspeed = 1 + random(2);
                this.piece6.vspeed = 5 + random(6);
                this.piece6.hspeed = 1 + random(2);
            }
            if (this.idealdir == 0) {
                this.piece1.vspeed = - 9 - random(6);
                this.piece1.hspeed = - 1 - random(2);
                this.piece2.vspeed = 5 + random(6);
                this.piece2.hspeed = - 1 - random(2);
                this.piece3.vspeed = - 9 - random(6);
                this.piece3.hspeed = - 1 - random(2);
                this.piece4.vspeed = - 9 - random(6);
                this.piece4.hspeed = - 1 - random(2);
                this.piece5.vspeed = 5 + random(6);
                this.piece5.hspeed = - 1 - random(2);
                this.piece6.vspeed = 5 + random(6);
                this.piece6.hspeed = - 1 - random(2);
            }
            if (this.idealdir == 90) {
                this.piece1.vspeed = 1 - random(6);
                this.piece1.hspeed = 9 + random(5);
                this.piece2.vspeed = 1 - random(6);
                this.piece2.hspeed = - 9 + random(5);
                this.piece3.vspeed = 1 - random(6);
                this.piece3.hspeed = 9 + random(5);
                this.piece4.vspeed = 1 - random(6);
                this.piece4.hspeed = - 9 + random(5);
                this.piece5.vspeed = 1 - random(6);
                this.piece5.hspeed = - 9 + random(5);
                this.piece6.vspeed = 1 - random(6);
                this.piece6.hspeed = 9 + random(5);
            }
            if (this.idealdir == 270) {
                this.piece1.vspeed = 1 - random(6);
                this.piece1.hspeed = 9 + random(5);
                this.piece2.vspeed = 1 - random(6);
                this.piece2.hspeed = - 9 + random(5);
                this.piece3.vspeed = 1 - random(6);
                this.piece3.hspeed = 9 + random(5);
                this.piece4.vspeed = 1 - random(6);
                this.piece4.hspeed = - 9 + random(5);
                this.piece5.vspeed = 1 - random(6);
                this.piece5.hspeed = - 9 + random(5);
                this.piece6.vspeed = 1 - random(6);
                this.piece6.hspeed = 9 + random(5);
            }
            instance_destroy(this);
        }, this) === EXIT) return;
        if (W('obj_spearshot', function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        S.scr_heartcolor("red");
    }
  }
  user15() {
    let a, b, c;
    if (this.type == 0) {
        if (this.con == 2) {
            this.fakex = this.fakex + this.fakehspeed;
            if (this.fakehspeed < 0) {
                this.fakehspeed = this.fakehspeed + 0.6;
            } else {
                this.fakehspeed = 0;
            }
        }
        if (this.con == 0) {
            this.timer = this.timer + 1;
            if (this.timer == 3) {
                snd_play('motor_upper_quick');
            }
            a = lerp(600, 360, this.timer / 20);
            b = lerp(120, 50, this.timer / 20);
            c = lerp(240, 100, this.timer / 20);
            this.image_angle = lerp(200, a, this.timer / 20);
            if (this.timer < 21) {
                this.image_alpha = this.image_alpha + 0.04;
                this.x = lerp(this.xstart, this.xstart - b + this.fakex, this.timer / 20);
                this.y = lerp(this.ystart, this.ystart - c, this.timer / 20);
            }
            if (this.timer == 20) {
                this.timer = 0;
                this.con = 1;
            }
        }
        if (this.con == 1) {
            this.timer = this.timer + 1;
            if (this.timer >= 6) {
                this.timer = 0;
                this.con = 2;
                snd_play('motor_upper_quick_high');
            }
        }
        if (this.con == 2) {
            this.timer = this.timer + 1;
            this.x = lerp(this.xstart, this.xstart - 50 + this.fakex, 1);
            if (this.timer == 20) {
                this.timer = 0;
                this.con = 3;
            }
        }
        if (this.con == 3) {
            this.gravity_direction = 0;
            this.gravity = 5;
            this.timer = this.timer + 1;
            if (this.timer == 7) {
                snd_play('snd_punchheavythunder');
                snd_play('snd_break2');
                this.fadecon = 1;
                this.breakcon = 1;
            }
            if (this.timer == 90) {
                this.timer = 0;
                this.con = 4;
            }
        }
    }
    if (this.type == 1) {
        if (this.con == 0 && this.timer > 8 || this.con != 0) {
            this.fakex = this.fakex + this.fakehspeed;
            if (this.fakehspeed < 0) {
                this.fakehspeed = this.fakehspeed + 0.6;
            } else {
                this.fakehspeed = 0;
            }
        }
        if (this.con == 0) {
            this.timer = this.timer + 1;
            if (this.timer == 3) {
                snd_play('motor_upper_quick');
            }
            a = lerp(600, 360, this.timer / 20);
            b = lerp(120, 50, this.timer / 20);
            c = lerp(240, 100, this.timer / 20);
            this.image_angle = lerp(200, a, this.timer / 20);
            if (this.timer < 21) {
                this.image_alpha = this.image_alpha + 0.04;
                this.x = lerp(this.xstart, this.xstart - b + this.fakex, this.timer / 20);
                this.y = lerp(this.ystart, this.ystart - c, this.timer / 20);
            }
            if (this.timer == 20) {
                this.timer = 0;
                this.con = 1;
            }
        }
        if (this.con == 1) {
            this.timer = this.timer + 1;
            this.x = lerp(this.xstart, this.xstart - 50 + this.fakex, 1);
            if (this.timer >= 6) {
                this.timer = 0;
                this.con = 2;
            }
        }
        if (this.con == 2) {
            this.timer = this.timer + 1;
            this.x = lerp(this.xstart, this.xstart - 50 + this.fakex, 1);
            if (this.timer == 7) {
                this.timer = 0;
                this.con = 3;
            }
        }
        if (this.con == 3) {
            this.gravity_direction = 0;
            this.gravity = 5;
            this.timer = this.timer + 1;
            if (this.timer == 7) {
                snd_play('snd_punchheavythunder');
                snd_play('snd_break2');
                this.fadecon = 1;
                this.breakcon = 1;
            }
            if (this.timer == 50) {
                instance_destroy(this);
            }
        }
    }
    if (this.type == 2) {
        if (this.con == 0 && this.timer > 8 || this.con != 0) {
            this.fakex = this.fakex + this.fakehspeed;
            if (this.fakehspeed < 0) {
                this.fakehspeed = this.fakehspeed + 0.6;
            } else {
                this.fakehspeed = 0;
            }
        }
        if (this.con == 0) {
            this.timer = this.timer + 1;
            if (this.timer == 3) {
                snd_play('motor_upper_quick');
            }
            a = lerp(900, 490, this.timer / 20);
            b = lerp(120, 50, this.timer / 20);
            c = lerp(240, 100, this.timer / 20);
            this.image_angle = lerp(200, a, this.timer / 20);
            if (this.timer < 21) {
                this.image_alpha = this.image_alpha + 0.04;
                this.x = lerp(this.xstart, this.xstart - b, this.timer / 20);
                this.y = lerp(this.ystart, this.ystart - c, this.timer / 20);
            }
            if (this.timer == 20) {
                this.timer = 0;
                this.con = 1;
                this.fadecon = 1;
                snd_play('snd_punchheavythunder');
                snd_play('snd_break2');
            }
        }
        if (this.con == 1) {
            this.timer = this.timer + 1;
            if (this.timer == 3) {
                this.breakcon = 1;
            }
            a = lerp(0, 260, this.timer / 9);
            this.image_angle = lerp(500, a, this.timer / 9);
            if (this.timer < 6) {
                this.x = lerp(this.xstart - 50, this.xstart, this.timer / 6);
                this.y = lerp(this.ystart - 100, this.ystart + 100, this.timer / 6);
            }
            if (this.timer >= 9) {
                this.timer = 0;
                this.con = 2;
            }
        }
        if (this.con == 2) {
            this.timer = this.timer + 1;
            if (this.timer > 5) {
                this.image_alpha = this.image_alpha - 0.2;
            }
            if (this.image_alpha < 0) {
                instance_destroy(this);
            }
        }
    }
  }
  step() {
    let a, b, c, shielddir;
    if (this.con == 0 && this.timer > 8 || this.con != 0) {
        this.fakex = this.fakex + this.fakehspeed;
        if (this.fakehspeed < 0) {
            this.fakehspeed = this.fakehspeed + 0.6;
        } else {
            this.fakehspeed = 0;
        }
    }
    if (this.con == 0) {
        this.timer = this.timer + 1;
        if (this.timer == 3) {
            snd_play('motor_upper_quick');
        }
        if (this.dir == 270) {
            a = lerp(900, 490, this.timer / 14);
            b = lerp(100, 50, this.timer / 14);
            c = lerp(200, 100, this.timer / 14);
            this.image_angle = lerp(250, a, this.timer / 14);
            if (this.timer < 16) {
                this.image_alpha = this.image_alpha + 0.06;
                this.x = lerp(this.xstart - b, this.xstart - b, this.timer / 14);
                this.y = lerp(this.ystart - 20, this.ystart - 20 - c, this.timer / 14);
            }
        }
        if (this.dir == 0) {
            a = lerp(990, 580, this.timer / 14);
            this.image_angle = lerp(340, a, this.timer / 14);
            c = lerp(200, 100, this.timer / 14);
            b = lerp(100, 120, this.timer / 14);
            if (this.timer < 16) {
                this.image_alpha = this.image_alpha + 0.06;
                this.x = lerp(this.xstart - 20, this.xstart - 20 - c, this.timer / 14);
                this.y = lerp(this.ystart + b, this.ystart + b, this.timer / 14);
            }
        }
        if (this.dir == 90) {
            a = lerp(1080, 670, this.timer / 14);
            this.image_angle = lerp(430, a, this.timer / 14);
            b = lerp(100, 50, this.timer / 14);
            c = lerp(200, 100, this.timer / 14);
            if (this.timer < 16) {
                this.image_alpha = this.image_alpha + 0.06;
                this.x = lerp(this.xstart + b, this.xstart + b, this.timer / 14);
                this.y = lerp(this.ystart + 20, this.ystart + 20 + c, this.timer / 14);
            }
        }
        if (this.dir == 180) {
            a = lerp(1170, 760, this.timer / 14);
            this.image_angle = lerp(520, a, this.timer / 14);
            c = lerp(200, 100, this.timer / 14);
            b = lerp(100, 120, this.timer / 14);
            if (this.timer < 16) {
                this.image_alpha = this.image_alpha + 0.06;
                this.x = lerp(this.xstart + 20, this.xstart + 20 + c, this.timer / 14);
                this.y = lerp(this.ystart - b, this.ystart - b, this.timer / 14);
            }
        }
        if (this.timer == 15) {
            this.timer = 0;
            this.con = 1;
            this.fadecon = 1;
        }
    }
    if (this.con == 1) {
        this.timer = this.timer + 1;
        if (this.timer == 3) {
            this.breakcon = 1;
        }
        if (this.dir == 270) {
            a = lerp(0, 260, this.timer / 9);
            this.image_angle = lerp(500, a, this.timer / 9);
            if (this.timer < 6) {
                this.x = lerp(this.xstart - 50, this.xstart, this.timer / 6);
                this.y = lerp(this.ystart - 120, this.ystart + 100, this.timer / 6);
            }
        }
        if (this.dir == 0) {
            a = lerp(90, 350, this.timer / 9);
            this.image_angle = lerp(590, a, this.timer / 9);
            if (this.timer < 6) {
                this.x = lerp(this.xstart - 100, this.xstart + 100, this.timer / 6);
                this.y = lerp(this.ystart + 50, this.ystart, this.timer / 6);
            }
        }
        if (this.dir == 90) {
            a = lerp(180, 440, this.timer / 9);
            this.image_angle = lerp(680, a, this.timer / 9);
            if (this.timer < 6) {
                this.x = lerp(this.xstart + 50, this.xstart, this.timer / 6);
                this.y = lerp(this.ystart + 120, this.ystart - 100, this.timer / 6);
            }
        }
        if (this.dir == 180) {
            a = lerp(270, 530, this.timer / 9);
            this.image_angle = lerp(770, a, this.timer / 9);
            if (this.timer < 6) {
                this.x = lerp(this.xstart + 100, this.xstart - 100, this.timer / 6);
                this.y = lerp(this.ystart - 50, this.ystart, this.timer / 6);
            }
        }
        if (this.timer >= 9) {
            this.timer = 0;
            this.con = 2;
        }
    }
    if (this.con == 2) {
        this.timer = this.timer + 1;
        if (this.timer > 5) {
            this.image_alpha = this.image_alpha - 0.2;
        }
        if (this.image_alpha < 0) {
            instance_destroy(this);
        }
    }
    if (this.fadecon == 1) {
        this.fakealpha = this.fakealpha + 0.2;
        if (this.fakealpha > 1.2) {
            this.fadecon = 2;
        }
    }
    if (this.fadecon == 2) {
        this.fakealpha = this.fakealpha - 0.2;
        if (this.fakealpha < 0) {
            this.fadecon = 0;
        }
    }
    if (this.type == 2 && this.con == 2 || this.breakcon == 2) {
    } else {
        a = scr_afterimage(this);
        a.fadeSpeed = 0.08;
        a.image_alpha = this.image_alpha;
    }
    if (this.breakcon == 1) {
        this.breakcon = 3;
        shielddir = O('obj_spearblocker').image_angle + 180;
        if (shielddir >= 360) {
            shielddir = shielddir - 360;
        }
        if (Math.abs(angle_difference(this.dir, shielddir)) < 61) {
            this.breakcon = 2;
            this.timer = 0;
            this.con = 3;
        }
    }
    if (this.breakcon == 2) {
        this.timer = this.timer + 1;
        if (this.timer == 1) {
            if (this.dir == 270) {
                this.image_angle = 0;
                this.y = this.y - 39;
            }
            if (this.dir == 0) {
                this.image_angle = 90;
                this.x = this.x - 39;
            }
            if (this.dir == 90) {
                this.image_angle = 180;
                this.y = this.y + 39;
            }
            if (this.dir == 180) {
                this.image_angle = 270;
                this.x = this.x + 39;
            }
            this.fadealpha = 1;
            snd_play('snd_impact');
            scr_shakeobj(this);
            instance_create(this.x, this.y, 'obj_shake');
            if (W('obj_afterimage', function (other) {
                instance_destroy(this);
            }, this) === EXIT) return;
            if (W('obj_spearblocker', function (other) {
                this.shake = 10;
                this.fadealpha = 1;
            }, this) === EXIT) return;
        }
        if (this.timer >= 8) {
            this.image_alpha = this.image_alpha - 0.1;
            if (this.image_alpha < 0) {
                instance_destroy(this);
            }
        }
        if (this.timer == 7) {
            if (W('obj_heart', function (other) {
                this.anim = instance_create(this.x + 10, this.y + 10, 'obj_animation');
                this.anim.sprite_index = 'spr_finisher_explosion';
                this.anim.image_speed = 0.5;
                this.anim.image_index = 0;
                this.anim.image_xscale = 1;
                this.anim.image_yscale = 1;
            }, this) === EXIT) return;
        }
        if (this.timer == 8) {
            if (W('obj_spearblocker', function (other) {
                snd_play('snd_break2');
                this.piece1 = instance_create(this.x + lengthdir_x(32, this.image_angle - 35), this.y + lengthdir_y(32, this.image_angle - 35), 'obj_spearblocker_piece');
                this.piece1.image_angle = this.image_angle;
                this.piece1.image_index = 1;
                this.piece2 = instance_create(this.x + lengthdir_x(32, this.image_angle + 35), this.y + lengthdir_y(32, this.image_angle + 35), 'obj_spearblocker_piece');
                this.piece2.image_angle = this.image_angle;
                this.piece2.image_index = 0;
                this.piece3 = instance_create(this.x + lengthdir_x(30, 45), this.y + lengthdir_y(30, 45), 'obj_spearblocker_piece');
                this.piece3.sprite_index = 'spr_green_circle_piece';
                this.piece3.image_angle = 0;
                this.piece4 = instance_create(this.x + lengthdir_x(30, 135), this.y + lengthdir_y(30, 135), 'obj_spearblocker_piece');
                this.piece4.sprite_index = 'spr_green_circle_piece';
                this.piece4.image_angle = 90;
                this.piece5 = instance_create(this.x + lengthdir_x(30, 225), this.y + lengthdir_y(30, 225), 'obj_spearblocker_piece');
                this.piece5.sprite_index = 'spr_green_circle_piece';
                this.piece5.image_angle = 180;
                this.piece6 = instance_create(this.x + lengthdir_x(30, 315), this.y + lengthdir_y(30, 315), 'obj_spearblocker_piece');
                this.piece6.sprite_index = 'spr_green_circle_piece';
                this.piece6.image_angle = 270;
                if (this.idealdir == 180) {
                    this.piece1.vspeed = - 9 - random(6);
                    this.piece1.hspeed = 1 + random(2);
                    this.piece2.vspeed = 5 + random(6);
                    this.piece2.hspeed = 1 + random(2);
                    this.piece3.vspeed = - 9 - random(6);
                    this.piece3.hspeed = 1 + random(2);
                    this.piece4.vspeed = - 9 - random(6);
                    this.piece4.hspeed = 1 + random(2);
                    this.piece5.vspeed = 5 + random(6);
                    this.piece5.hspeed = 1 + random(2);
                    this.piece6.vspeed = 5 + random(6);
                    this.piece6.hspeed = 1 + random(2);
                }
                if (this.idealdir == 0) {
                    this.piece1.vspeed = - 9 - random(6);
                    this.piece1.hspeed = - 1 - random(2);
                    this.piece2.vspeed = 5 + random(6);
                    this.piece2.hspeed = - 1 - random(2);
                    this.piece3.vspeed = - 9 - random(6);
                    this.piece3.hspeed = - 1 - random(2);
                    this.piece4.vspeed = - 9 - random(6);
                    this.piece4.hspeed = - 1 - random(2);
                    this.piece5.vspeed = 5 + random(6);
                    this.piece5.hspeed = - 1 - random(2);
                    this.piece6.vspeed = 5 + random(6);
                    this.piece6.hspeed = - 1 - random(2);
                }
                if (this.idealdir == 90) {
                    this.piece1.vspeed = 1 - random(6);
                    this.piece1.hspeed = 9 + random(5);
                    this.piece2.vspeed = 1 - random(6);
                    this.piece2.hspeed = - 9 + random(5);
                    this.piece3.vspeed = 1 - random(6);
                    this.piece3.hspeed = 9 + random(5);
                    this.piece4.vspeed = 1 - random(6);
                    this.piece4.hspeed = - 9 + random(5);
                    this.piece5.vspeed = 1 - random(6);
                    this.piece5.hspeed = - 9 + random(5);
                    this.piece6.vspeed = 1 - random(6);
                    this.piece6.hspeed = 9 + random(5);
                }
                if (this.idealdir == 270) {
                    this.piece1.vspeed = 1 - random(6);
                    this.piece1.hspeed = 9 + random(5);
                    this.piece2.vspeed = 1 - random(6);
                    this.piece2.hspeed = - 9 + random(5);
                    this.piece3.vspeed = 1 - random(6);
                    this.piece3.hspeed = 9 + random(5);
                    this.piece4.vspeed = 1 - random(6);
                    this.piece4.hspeed = - 9 + random(5);
                    this.piece5.vspeed = 1 - random(6);
                    this.piece5.hspeed = - 9 + random(5);
                    this.piece6.vspeed = 1 - random(6);
                    this.piece6.hspeed = 9 + random(5);
                }
                if (W('obj_heart', function (other) {
                    this.color = 0x000000;
                    this.sprite_index = 'spr_heart';
                }, this) === EXIT) return EXIT;
                instance_destroy(this);
            }, this) === EXIT) return;
        }
    }
    if (this.breakcon == 3) {
        this.breakcon = 4;
        this.timer = 0;
        if (W('obj_spearblocker', function (other) {
            this.vanish = 1;
        }, this) === EXIT) return;
        if (W('obj_spearshot', function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        if (W('obj_heart', function (other) {
            this.color = 0x000000;
            this.sprite_index = 'spr_heart';
            this.anim = instance_create(this.x + 10, this.y + 10, 'obj_animation');
            this.anim.sprite_index = 'spr_finisher_explosion';
            this.anim.image_speed = 0.5;
            this.anim.image_index = 0;
            this.anim.image_xscale = 1;
            this.anim.image_yscale = 1;
            this.inst = instance_create(O('obj_heart').x, O('obj_heart').y, 'obj_gerson_fakeheart');
            if (O('obj_spearblocker').idealdir == 180) {
            }
            this.inst.directionhit = 280;
        }, this) === EXIT) return;
        instance_create(this.x, this.y, 'obj_shake');
        snd_play('snd_screenshake');
    }
    if (this.breakcon == 4) {
        this.timer = this.timer + 1;
        if (this.timer == 2) {
            global.inv = - 1;
            S.scr_damage(this);
        }
    }
  }
}
defineObject('obj_giant_hammer', GiantHammer);

// obj_gerson_darkness_overlay (default sprite None, depth 0)
class GersonDarknessOverlay extends Instance {
  create() {
    this._surface = - 1;
    this.timer = 0;
    this.con = 0;
    this.scale = 12;
    this.scalecon = 0;
    this.depth = 50;
    this.image_alpha = 1;
    this.redflash = 0;
  }
  draw() {
    let _shadowpower_scale, aa, i;
    if (this.scalecon == 1 && this.scale > 2.2) {
        this.scale = this.scale - 0.03;
    }
    if (this.scalecon == 2 && this.scale < 8) {
        this.scale = this.scale + 0.2;
    }
    if (this.scalecon == 3 && this.scale > 2.2) {
        this.scale = this.scale - 0.2;
    }
    _shadowpower_scale = 0;
    if (i_ex('obj_spearblocker')) {
        _shadowpower_scale = lerp(0, - 1, O('obj_spearblocker').shadowpower / 1);
    }
    if (!T(surface_exists(this._surface))) {
        this._surface = surface_create(room_width, room_height);
    }
    surface_set_target(this._surface);
    draw_clear_alpha(16777215, 0);
    aa = 0;
    draw_set_color(0x000000);
    S.ossafe_fill_rectangle(camerax() - 10, cameray() - 10, camerax() + camerawidth() + 10, cameray() + cameraheight() + 10, false);
    draw_set_color(0xffffff);
    draw_set_blend_mode(3);
    if (i_ex('obj_heart')) {
        draw_sprite_ext('spr_light_vfx', this.image_index, O('obj_heart').x + 10, O('obj_heart').y + 10, this.scale + _shadowpower_scale, this.scale + _shadowpower_scale, 0, this.image_blend, 1);
    } else {
        draw_sprite_ext('spr_light_vfx', this.image_index, camerax() + 310, cameray() + 230, this.scale + _shadowpower_scale, this.scale + _shadowpower_scale, 0, this.image_blend, 1);
    }
    i = 0;
    while (i < instance_number('obj_gerson_darkness_overlay_light')) {
        this.light ??= []; this.light[i] = instance_find('obj_gerson_darkness_overlay_light', i);
        draw_sprite_ext('spr_light_vfx', 0, this.light[i].x, this.light[i].y, this.light[i].image_xscale, this.light[i].image_yscale, 0, 0xffffff, this.light[i].image_alpha);
        i = i + 1;
    }
    draw_set_blend_mode(0);
    surface_reset_target();
    draw_surface_ext(this._surface, 0, 0, 1, 1, 0, 0xffffff, this.image_alpha);
  }
}
defineObject('obj_gerson_darkness_overlay', GersonDarknessOverlay);

// obj_gerson_darkness_overlay_light (default sprite None, depth 0)
class GersonDarknessOverlayLight extends Instance {
  create() {
    this.image_alpha = 0;
    this.image_xscale = 0;
    this.image_yscale = 0;
    this.con = 0;
  }
  step() {
    if (this.con == 0) {
        if (this.image_alpha < 1) {
            this.image_alpha = this.image_alpha + 0.01;
        }
    }
    if (this.con == 1) {
        if (this.image_alpha > 0) {
            this.image_alpha = this.image_alpha - 0.01;
        }
    }
  }
}
defineObject('obj_gerson_darkness_overlay_light', GersonDarknessOverlayLight);

// obj_gerson_slowdown (default sprite None, depth 0)
class GersonSlowdown extends Instance {
  create() {
    this.timer = 0;
    this.con = 0;
    this.darkalpha = 0;
    this.type = 0;
    this.depth = O('obj_herosusie').depth + 1;
  }
  draw() {
    draw_sprite_ext('spr_blank_tile_black', 0, camerax() - 10, cameray() - 10, 9999, 9999, this.image_angle, this.image_blend, this.darkalpha);
  }
  step() {
    if (this.con == 0) {
        this.timer = this.timer + 1;
        if (O('obj_hammer_of_justice_enemy').rudebusterhitcountmax == 1) {
            if (this.timer >= 5) {
                this.speed = 20;
            }
            if (this.timer >= 8 && this.timer <= 10) {
                O('obj_gerson_rudebuster').speed = lerp(20, 0.5, (this.timer - 8) / 2);
                O('obj_gerson_rudebuster').gravity = 0;
                O('obj_gerson_rudebuster').friction = 0;
            }
        }
        if (O('obj_hammer_of_justice_enemy').rudebusterhitcountmax == 2) {
            if (O('obj_hammer_of_justice_enemy').rudebusterhitcount == 1) {
                O('obj_gerson_rudebuster').speed = 20;
            }
            if (O('obj_hammer_of_justice_enemy').rudebusterhitcount == 2) {
                O('obj_gerson_rudebuster').speed = 35;
            }
        }
        if (O('obj_hammer_of_justice_enemy').rudebusterhitcountmax == 3) {
            if (O('obj_hammer_of_justice_enemy').rudebusterhitcount == 1) {
                O('obj_gerson_rudebuster').speed = 20;
            }
            if (O('obj_hammer_of_justice_enemy').rudebusterhitcount == 2) {
                O('obj_gerson_rudebuster').speed = 35;
            }
            if (O('obj_hammer_of_justice_enemy').rudebusterhitcount == 3) {
                O('obj_gerson_rudebuster').speed = 50;
            }
        }
        this.darkalpha = lerp(this.darkalpha, 1, this.timer / 60);
    }
    if (this.con == 1) {
        this.timer = this.timer + 1;
        this.darkalpha = lerp(this.darkalpha, 0.5, 0.2);
        if (this.timer == 10) {
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_gerson_slowdown', GersonSlowdown);

// obj_gerson_shadowoverlay (default sprite None, depth 0)
class GersonShadowoverlay extends Instance {
  create() {
    return;
  }
  draw() {
    let shadintensity;
    shadintensity = 0.4;
    if (i_ex('obj_darkener')) {
        shadintensity = shadintensity - O('obj_darkener').darkamt / 20;
    }
    if (W('obj_herosusie', function (other) {
    }, this) === EXIT) return;
    if (W('obj_hammer_of_justice_enemy', function (other) {
    }, this) === EXIT) return;
  }
  step() {
    this.depth = O('obj_herosusie').depth - 1;
    if (this.depth > O('obj_hammer_of_justice_enemy').depth - 1) {
        this.depth = O('obj_hammer_of_justice_enemy').depth - 1;
    }
  }
}
defineObject('obj_gerson_shadowoverlay', GersonShadowoverlay);

