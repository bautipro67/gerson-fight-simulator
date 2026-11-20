// Gerson's teleports and hammer swings (machine-translated from the Chapter 4 GML by tools/gen_attacks.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  Instance, S, choose, d3d_set_fog, defineObject, draw_self, draw_sprite_ext, global, instance_create, instance_destroy, irandom, lengthdir_x, lengthdir_y, lerp, merge_color, snd_play, snd_stop,
} from '../rt.js?v=20261120132809';
import {
  camerax, cameray, i_ex, scr_afterimage, scr_bullet_init, snd_play_pitch, snd_play_x,
} from '../common.js?v=20261120132809';
import {
  EXIT, O, P, W,
} from '../gml.js?v=20261120132809';

// obj_gerson_teleport (default sprite spr_gerson_teleport, depth 0)
class GersonTeleport extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_teleport';
  }
  alarm0() {
    if (global.turntimer < 1) {
        instance_destroy(this);
    }
    instance_destroy(this);
    if (this.type == 1) {
        if (this.image_xscale < 0) {
            this.gers = instance_create(this.x - 70, this.y - 23, 'obj_gerson_box_hit');
            if (this.first == 1) {
                this.gers.timer = 10;
            }
        } else {
            this.gers = instance_create(this.x + 70, this.y - 23, 'obj_gerson_box_hit');
            this.gers.image_xscale = - 2;
            if (this.first == 1) {
                this.gers.timer = 10;
            }
        }
    }
    if (this.type == 2) {
        if (this.swingdowntype == - 4) {
            this.gers = instance_create(this.x + lengthdir_x(110, this.image_angle + 40), this.y + lengthdir_y(110, this.image_angle + 40), 'obj_gerson_swing_down');
            this.gers.swingdowntype = - 1;
            this.gers.image_angle = this.image_angle - 90;
            this.gers.direction = this.image_angle + 180;
            if (this.special != 0) {
                this.gers.special = this.special;
            }
            if (W(this.gers, function (other) {
                this.user0?.();
            }, this) === EXIT) return;
        } else if (this.swingdowntype == - 3 || this.swingdowntype == - 5) {
            this.gers = instance_create(this.x + lengthdir_x(110, this.image_angle + 40), this.y + lengthdir_y(110, this.image_angle + 40), 'obj_gerson_swing_down');
            this.gers.swingdowntype = this.swingdowntype;
            this.gers.image_angle = this.image_angle - 90;
            this.gers.direction = this.image_angle + 180;
            if (W(this.gers, function (other) {
                this.user0?.();
            }, this) === EXIT) return;
        } else if (this.swingdowntype >= 10) {
            this.gers = instance_create(this.x + lengthdir_x(110, this.image_angle + 40), this.y + lengthdir_y(110, this.image_angle + 40), 'obj_gerson_swing_down');
            this.gers.swingdowntype = this.swingdowntype;
            this.gers.image_angle = this.image_angle - 90;
            this.gers.direction = this.image_angle + 180;
            if (W(this.gers, function (other) {
                this.user0?.();
            }, this) === EXIT) return;
        } else {
            this.gers = instance_create(this.x - 62, this.y - 112, 'obj_gerson_swing_down');
            if (this.x < O('obj_growtangle').x) {
                this.gers.image_xscale = - 2;
                this.gers.x = this.gers.x + 124;
            }
            this.gers.swingdowntype = this.swingdowntype;
            if (W(this.gers, function (other) {
                this.user0?.();
            }, this) === EXIT) return;
        }
    }
    if (this.type == 3) {
        if (this.image_xscale < 0) {
            this.gers = instance_create(this.x - 130, this.y - 60, 'obj_gerson_bell_hit');
            this.gers.timer = - 15;
        } else {
            this.gers = instance_create(this.x + 130 + 42, this.y - 60, 'obj_gerson_bell_hit');
            this.gers.image_xscale = - 2;
            this.gers.timer = 6;
        }
    }
    if (this.type == 4) {
        this.gers = instance_create(this.x + 60, this.y - 40, 'obj_gerson_hits_box');
    }
    if (this.type == 5) {
        this.gers = instance_create(this.x - 60, this.y - 40, 'obj_gerson_hits_box');
        this.gers.image_xscale = 2;
    }
    if (this.type == 6) {
        instance_create(this.x, this.y - 34, 'obj_gerson_speen');
    }
    if (this.type == 10) {
        if (W('obj_hammer_of_justice_enemy', function (other) {
            this.visible = true;
        }, this) === EXIT) return;
    }
  }
  create() {
    this.sprite_index = 'spr_gerson_teleport';
    this.alarm ??= []; this.alarm[0] = 4;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.depth = - 999999;
    snd_stop('motor_swing_down');
    snd_play_pitch('motor_swing_down', 1.4);
    this.type = 0;
    this.first = 0;
    this.dir = 1;
    this.swingdowntype = 0;
    this.special = 0;
  }
  step() {
    return;
  }
}
defineObject('obj_gerson_teleport', GersonTeleport);

// obj_gerson_teleport_generic (default sprite spr_gerson_teleport, depth 0, parent obj_bulletparent)
class GersonTeleportGeneric extends P('obj_bulletparent') {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_teleport';
  }
  create() {
    super.create?.();
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.depth = - 999999;
    snd_stop('motor_swing_down');
    snd_play_pitch('motor_swing_down', 1.4);
  }
}
defineObject('obj_gerson_teleport_generic', GersonTeleportGeneric);

// obj_gerson_swing_down (default sprite spr_gerson_swing_down, depth 0, parent obj_regularbullet)
class GersonSwingDown extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_swing_down';
    this.mask_index = 'spr_gerson_swing_down_mask';
  }
  create() {
    super.create?.();
    this.timer = 0;
    this.con = 0;
    this.destroyonhit = false;
    this.active = 0;
    this.fakeout = 0;
    this.swingdowntype = 0;
    this.timetoswing = 8;
    this.special = 0;
    this.eye_index = 0;
    this.eye_con = 0;
    this.alpha = 0;
    this.alphacon = 0;
    this.image_speed = 0;
    this.speed = - 6;
    this.direction = 270;
    this.friction = 0.4;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_alpha = 1.4;
    this.depth = O('obj_growtangle').depth + 1;
    this.grazepoints = 4;
  }
  draw() {
    let ylocation, xlocation;
    draw_self(this);
    if (this.eye_con == 1) {
        if (this.eye_index == 0) {
            this.afterimage = instance_create(this.x, this.y, 'obj_afterimage_gerson');
            this.afterimage.sprite_index = this.sprite_index;
            this.afterimage.image_index = this.image_index;
            this.afterimage.image_blend = this.image_blend;
            this.afterimage.image_speed = 0;
            this.afterimage.depth = this.depth;
            this.afterimage.image_xscale = this.image_xscale;
            this.afterimage.image_yscale = this.image_yscale;
            this.afterimage.image_angle = this.image_angle;
            this.afterimage.parentid = this;
            this.afterimage.vspeed = 2.5;
            this.afterimage.image_alpha = 0.6;
            this.afterimage = instance_create(this.x, this.y, 'obj_afterimage_gerson');
            this.afterimage.sprite_index = this.sprite_index;
            this.afterimage.image_index = this.image_index;
            this.afterimage.image_blend = this.image_blend;
            this.afterimage.image_speed = 0;
            this.afterimage.depth = this.depth;
            this.afterimage.image_xscale = this.image_xscale;
            this.afterimage.image_yscale = this.image_yscale;
            this.afterimage.image_angle = this.image_angle;
            this.afterimage.parentid = this;
            this.afterimage.vspeed = - 2.5;
            this.afterimage.image_alpha = 0.6;
            this.afterimage = instance_create(this.x, this.y, 'obj_afterimage_gerson');
            this.afterimage.sprite_index = this.sprite_index;
            this.afterimage.image_index = this.image_index;
            this.afterimage.image_blend = this.image_blend;
            this.afterimage.image_speed = 0;
            this.afterimage.depth = this.depth;
            this.afterimage.image_xscale = this.image_xscale;
            this.afterimage.image_yscale = this.image_yscale;
            this.afterimage.image_angle = this.image_angle;
            this.afterimage.parentid = this;
            this.afterimage.hspeed = 2.5;
            this.afterimage.image_alpha = 0.6;
            this.afterimage = instance_create(this.x, this.y, 'obj_afterimage_gerson');
            this.afterimage.sprite_index = this.sprite_index;
            this.afterimage.image_index = this.image_index;
            this.afterimage.image_blend = this.image_blend;
            this.afterimage.image_speed = 0;
            this.afterimage.depth = this.depth;
            this.afterimage.image_xscale = this.image_xscale;
            this.afterimage.image_yscale = this.image_yscale;
            this.afterimage.image_angle = this.image_angle;
            this.afterimage.parentid = this;
            this.afterimage.hspeed = - 2.5;
            this.afterimage.image_alpha = 0.6;
            snd_stop('snd_eye_telegraph');
            snd_play_pitch('snd_eye_telegraph', 1);
            if (O('obj_hammer_of_justice_enemy').swingdown_multitelegraph != 0) {
                if (O('obj_hammer_of_justice_enemy').swingdown_multitelegraph == 1) {
                    this.inst = instance_create(O('obj_growtangle').x - 75 + 5, O('obj_growtangle').y - 13, 'obj_gerson_growtangle_telegraph');
                    this.inst.image_xscale = 51;
                    this.inst.image_yscale = 72;
                    if (i_ex('obj_heart')) {
                        this.inst.depth = O('obj_heart').depth + 1;
                    }
                    this.inst = instance_create(O('obj_growtangle').x - 18, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                    this.inst.image_xscale = 72;
                    this.inst.image_yscale = 142;
                    if (i_ex('obj_heart')) {
                        this.inst.depth = O('obj_heart').depth + 1;
                    }
                }
                if (O('obj_hammer_of_justice_enemy').swingdown_multitelegraph == 2) {
                    this.inst = instance_create(O('obj_growtangle').x - 75 + 5, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                    this.inst.image_xscale = 142;
                    this.inst.image_yscale = 72;
                    if (i_ex('obj_heart')) {
                        this.inst.depth = O('obj_heart').depth + 1;
                    }
                    this.inst = instance_create(O('obj_growtangle').x - 75 + 5, O('obj_growtangle').y + 3, 'obj_gerson_growtangle_telegraph');
                    this.inst.image_xscale = 90;
                    this.inst.image_yscale = 69;
                    if (i_ex('obj_heart')) {
                        this.inst.depth = O('obj_heart').depth + 1;
                    }
                }
                if (O('obj_hammer_of_justice_enemy').swingdown_multitelegraph == 3) {
                    this.inst = instance_create(O('obj_growtangle').x - 75 + 5, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                    this.inst.image_xscale = 142;
                    this.inst.image_yscale = 142;
                    if (i_ex('obj_heart')) {
                        this.inst.depth = O('obj_heart').depth + 1;
                    }
                }
                O('obj_hammer_of_justice_enemy').swingdown_multitelegraph = - 1;
            } else if (this.swingdowntype == 10) {
                ylocation = this.y + 16;
                if (ylocation < O('obj_growtangle').y - 70) {
                    ylocation = O('obj_growtangle').y - 70;
                }
                if (ylocation > O('obj_growtangle').y) {
                    ylocation = O('obj_growtangle').y;
                }
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, ylocation, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 142;
                this.inst.image_yscale = 72;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.swingdowntype == 11) {
                ylocation = O('obj_growtangle').y;
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, ylocation, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 142;
                this.inst.image_yscale = 72;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.swingdowntype == 12) {
                ylocation = O('obj_growtangle').y - 70;
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, ylocation, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 142;
                this.inst.image_yscale = 72;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.swingdowntype == 13) {
                ylocation = O('obj_growtangle').y - 13;
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, ylocation, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 142;
                this.inst.image_yscale = 72;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.swingdowntype == 14) {
                ylocation = O('obj_growtangle').y - 70 + 13;
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, ylocation, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 142;
                this.inst.image_yscale = 72;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.swingdowntype == 15) {
                ylocation = O('obj_growtangle').y - 13;
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, ylocation, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 142;
                this.inst.image_yscale = 72;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.swingdowntype == 16) {
                ylocation = O('obj_growtangle').y - 70 + 13;
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, ylocation, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 142;
                this.inst.image_yscale = 72;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.swingdowntype == 17) {
                this.inst = instance_create(O('obj_growtangle').x - 53, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 70;
                this.inst.image_yscale = 142;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.swingdowntype == 18) {
                this.inst = instance_create(O('obj_growtangle').x - 18, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 72;
                this.inst.image_yscale = 142;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.swingdowntype == 19) {
                if (this.image_xscale < 0) {
                    xlocation = this.x + 52 + 60;
                } else {
                    xlocation = this.x + 18;
                }
                if (xlocation < O('obj_growtangle').x - 70) {
                    xlocation = O('obj_growtangle').x - 70;
                }
                if (xlocation > O('obj_growtangle').x) {
                    xlocation = O('obj_growtangle').x;
                }
                this.inst = instance_create(xlocation, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 72;
                this.inst.image_yscale = 142;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.swingdowntype == - 3) {
            } else if (this.x == camerax() + 344) {
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 88;
                this.inst.image_yscale = 142;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.x == camerax() + 268 + 62) {
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 70;
                this.inst.image_yscale = 142;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.x == camerax() + 302) {
                this.inst = instance_create(O('obj_growtangle').x - 18, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 90;
                this.inst.image_yscale = 142;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.x == camerax() + 378 - 62) {
                this.inst = instance_create(O('obj_growtangle').x, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 72;
                this.inst.image_yscale = 142;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else {
                if (O('obj_growtangle').maxxscale == 2) {
                    if (this.image_xscale < 0) {
                        xlocation = this.x - 90 + 20;
                    } else {
                        xlocation = this.x + 18 - 16;
                    }
                } else if (this.image_xscale < 0) {
                    xlocation = this.x + 52;
                } else {
                    xlocation = this.x + 18;
                }
                this.inst = instance_create(xlocation, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 72;
                this.inst.image_yscale = 142;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            }
            if (this.special != 0) {
                this.inst.special = this.special;
            }
        }
        if (this.alphacon == 0) {
            this.alpha = this.alpha + 0.2;
            if (this.alpha == 1.2) {
                this.alphacon = 1;
            }
        } else {
            this.alpha = this.alpha - 0.2;
        }
        d3d_set_fog(true, 0xffffff, 0, 1);
        draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.alpha);
        d3d_set_fog(false, 0x000000, 0, 0);
        this.eye_index = this.eye_index + 0.4;
        if (this.swingdowntype == 1) {
            this.eye_index = this.eye_index + 0.6;
        }
        if (this.eye_index >= 5) {
            this.eye_con = 0;
        }
    }
  }
  user0() {
    if (this.swingdowntype == 0) {
        this.speed = - 6;
        this.friction = 0.4;
    }
    if (this.swingdowntype == - 1) {
        this.timetoswing = 22;
        this.speed = - 7;
        this.friction = 0.4;
    }
    if (this.swingdowntype == - 2) {
        this.timetoswing = 32;
        this.speed = - 4.7;
        this.friction = 0.17;
    }
    if (this.swingdowntype == - 3) {
        this.timetoswing = 999;
        this.speed = - 4.7;
        this.friction = 0.17;
    }
    if (this.swingdowntype == - 4) {
        this.timetoswing = 999;
        this.speed = - 4.7;
        this.friction = 0.2;
    }
    if (this.swingdowntype == - 5) {
        this.timetoswing = 999;
        this.speed = - 4.7;
        this.friction = 0.2;
    }
    if (this.swingdowntype == 10) {
        this.timetoswing = 16;
        this.speed = - 6;
        this.friction = 0.4;
    }
    if (this.swingdowntype >= 11) {
        this.timetoswing = 22;
        this.speed = - 7;
        this.friction = 0.4;
    }
    if (this.swingdowntype == 1) {
        this.timetoswing = 3;
        this.speed = - 6;
        this.friction = 0.4;
    }
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
    this.timer = this.timer + 1;
    if (this.timer > 10) {
        this.depth = - 999999;
    }
    if (this.timer == this.timetoswing - 12 || this.swingdowntype == 0 && this.timer == this.timetoswing - 2 || this.swingdowntype == 1 && this.timer == this.timetoswing - 2) {
        this.eye_con = 1;
    }
    if (this.timer > this.timetoswing && this.sprite_index == 'spr_gerson_swing_down') {
        this.image_index = this.image_index + 0.5;
    }
    if (this.swingdowntype == - 3) {
        this.mask_index = 'spr_nothing';
    }
    if (this.swingdowntype == - 3 && this.eye_con == 0) {
        if (this.timer == 34) {
            if (W('obj_gerson_swing_down', function (other) {
                this.eye_con = 1;
                this.timer = this.timetoswing - 2;
            }, this) === EXIT) return;
        }
    }
    if (this.swingdowntype == - 4) {
        if (this.timer == 12) {
            if (W('obj_gerson_swing_down', function (other) {
            }, this) === EXIT) return;
        }
        if (this.timer == 50) {
            if (this.image_xscale > 0) {
                instance_create(this.x + 52, this.y + 120, 'obj_gerson_teleport');
            } else {
                instance_create(this.x - 52, this.y + 120, 'obj_gerson_teleport');
            }
            instance_destroy(this);
        }
    }
    if (this.timer == this.timetoswing + 2) {
        snd_stop('motor_upper_quick_mid');
        snd_play('motor_upper_quick_mid');
    }
    if (this.timer == this.timetoswing + 5) {
        snd_stop('motor_swing_down');
        snd_play('motor_swing_down');
    }
    if (this.sprite_index == 'spr_gerson_swing_down' && this.image_index > 3.5) {
        this.sprite_index = 'spr_gerson_swing_down_loop';
        this.image_index = 0;
        this.image_speed = 0;
    }
    if (this.sprite_index == 'spr_gerson_swing_down' && this.con == 0 && this.image_index > 1) {
        this.active = 1;
        this.con = 1;
        this.x = this.x + lengthdir_x(30, this.direction);
        this.y = this.y + lengthdir_y(30, this.direction);
        this.speed = 45;
        if (this.image_angle != 0) {
            this.speed = 30;
        }
        this.friction = 10;
    }
    if (this.con == 1 && this.vspeed < 12) {
        this.friction = 4;
        if (this.speed < 5) {
            this.speed = 5;
        }
        this.image_alpha = this.image_alpha - 0.2;
        if (this.image_alpha == 1.2) {
            snd_stop('snd_impact');
            snd_play('snd_impact');
        }
        if (this.image_alpha <= 0.8) {
            this.mask_index = 'spr_nothing';
            this.active = 0;
        }
        if (this.image_alpha < 0) {
            instance_destroy(this);
        }
    }
    if (this.swingdowntype == - 3 && this.sprite_index == 'spr_gerson_swing_down' && this.image_index >= 2) {
        this.gers = instance_create(this.x + lengthdir_x(110, this.image_angle + 290), this.y + lengthdir_y(110, this.image_angle + 290), 'obj_gerson_teleport');
        this.gers.image_angle = this.image_angle;
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_swing_down', GersonSwingDown);

// obj_gerson_swing_down_new (default sprite spr_gerson_swing_down_new, depth 0)
class GersonSwingDownNew extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_swing_down_new';
    this.mask_index = 'spr_gerson_swing_down_mask';
  }
  create() {
    let a;
    super.create?.();
    this.timer = 0;
    this.con = 0;
    this.active = 0;
    this.fakeout = 0;
    this.swingdowntype = 0;
    this.timetoswing = 22;
    this.telegraphtime = 12;
    this.special = 0;
    this.eye_index = 0;
    this.eye_con = 0;
    this.alpha = 0;
    this.alphacon = 0;
    this.image_speed = 0;
    this.speed = - 7;
    this.direction = 270;
    this.friction = 0.4;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_alpha = 1.4;
    if (i_ex('obj_growtangle')) {
        this.depth = O('obj_growtangle').depth + 1;
    }
    this.grazepoints = 4;
    this.version = 0;
    if (i_ex('obj_hammer_of_justice_enemy') && (O('obj_hammer_of_justice_enemy').trueturn == 10 || 1) || i_ex('obj_sound_of_justice_enemy')) {
        this.timetoswing = 10;
        this.telegraphtime = 8;
    }
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
  }
  draw() {
    let _x, _image_angle;
    if (this.image_angle < 1) {
        if (i_ex('obj_sound_of_justice_enemy')) {
            d3d_set_fog(true, 0x000000, 0, 1);
            draw_sprite_ext(this.sprite_index, this.image_index, this.x + 14, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
            d3d_set_fog(false, 0x000000, 0, 0);
        } else {
            draw_sprite_ext(this.sprite_index, this.image_index, this.x + 14, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        }
        if (this.eye_con == 1) {
            if (this.eye_index == 0) {
                snd_play_pitch('snd_eye_telegraph', 1);
                _x = 0;
                if (this.version == 1) {
                    _x = - 6;
                }
                _image_angle = this.image_angle;
                if (this.image_angle < 0) {
                    _image_angle = 0;
                }
                this.inst = instance_create(this.x + _x + lengthdir_x(15, 270 + _image_angle), this.y + lengthdir_y(15, 270 + _image_angle), 'obj_gerson_growtangle_telegraph_new');
                this.inst.image_angle = _image_angle;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            }
            if (this.alphacon == 0) {
                this.alpha = this.alpha + 0.2;
                if (this.alpha == 1.2) {
                    this.alphacon = 1;
                }
            } else {
                this.alpha = this.alpha - 0.2;
            }
            d3d_set_fog(true, 0xffffff, 0, 1);
            draw_sprite_ext(this.sprite_index, this.image_index, this.x + 14, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.alpha);
            d3d_set_fog(false, 0x000000, 0, 0);
            this.eye_index = this.eye_index + 0.4;
            if (this.swingdowntype == 1) {
                this.eye_index = this.eye_index + 0.6;
            }
            if (this.eye_index >= 5) {
                this.eye_con = 0;
            }
        }
    } else {
        if (i_ex('obj_sound_of_justice_enemy')) {
            d3d_set_fog(true, 0x000000, 0, 1);
            draw_sprite_ext(this.sprite_index, this.image_index, this.x + lengthdir_x(14, this.image_angle + 90), this.y + lengthdir_y(14, this.image_angle + 90), this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
            d3d_set_fog(false, 0x000000, 0, 0);
        } else {
            draw_sprite_ext(this.sprite_index, this.image_index, this.x + lengthdir_x(14, this.image_angle + 90), this.y + lengthdir_y(14, this.image_angle + 90), this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
        }
        if (this.eye_con == 1) {
            if (this.eye_index == 0) {
                snd_play_pitch('snd_eye_telegraph', 1);
                _x = 0;
                if (this.version == 1) {
                    _x = - 6;
                }
                _image_angle = this.image_angle;
                if (this.image_angle < 0) {
                    _image_angle = 0;
                }
                this.inst = instance_create(this.x + _x + lengthdir_x(15, 270 + _image_angle), this.y + lengthdir_y(15, 270 + _image_angle), 'obj_gerson_growtangle_telegraph_new');
                this.inst.image_angle = _image_angle;
                if (this.image_angle == 270) {
                    if (W(this.inst, function (other) {
                        this.image_xscale = 1;
                        this.sprite_index = 'spr_gerson_swing_down_telegraph4';
                    }, this) === EXIT) return;
                }
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            }
            if (this.alphacon == 0) {
                this.alpha = this.alpha + 0.2;
                if (this.alpha == 1.2) {
                    this.alphacon = 1;
                }
            } else {
                this.alpha = this.alpha - 0.2;
            }
            d3d_set_fog(true, 0xffffff, 0, 1);
            draw_sprite_ext(this.sprite_index, this.image_index, this.x + lengthdir_x(14, this.image_angle + 90), this.y + lengthdir_y(14, this.image_angle + 90), this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.alpha);
            d3d_set_fog(false, 0x000000, 0, 0);
            this.eye_index = this.eye_index + 0.4;
            if (this.swingdowntype == 1) {
                this.eye_index = this.eye_index + 0.6;
            }
            if (this.eye_index >= 5) {
                this.eye_con = 0;
            }
        }
    }
  }
  step() {
    this.timer = this.timer + 1;
    if (this.timer == 2) {
        this.image_index = 1;
    }
    if (this.timer > 10) {
        this.depth = - 999999;
    }
    if (this.timer == this.timetoswing - this.telegraphtime) {
        this.eye_con = 1;
    }
    if (this.timer > this.timetoswing && this.sprite_index == 'spr_gerson_swing_down_new') {
        this.image_index = this.image_index + 0.5;
    }
    if (i_ex('obj_sound_of_justice_enemy')) {
        if (this.timer == 5 || this.timer == 7 || this.timer == 9) {
            this._ripple = instance_create(this.x + 0, this.y + 40, 'obj_church_old_man_ripple_effect');
            this._ripple.type = 2;
            this._ripple.color = merge_color(0xff0000, 0x000000, 0);
            this._ripple.colorstart = 0xff0000;
            this._ripple.version = 1;
            this._ripple.depth = this.depth + 1;
        }
    }
    if (this.timer == this.timetoswing + 2) {
        snd_stop('motor_upper_quick_mid');
        snd_play('motor_upper_quick_mid');
    }
    if (this.timer == this.timetoswing + 5) {
        snd_stop('motor_swing_down');
        snd_play('motor_swing_down');
    }
    if (this.sprite_index == 'spr_gerson_swing_down_new' && this.image_index > 4.5) {
        this.sprite_index = 'spr_gerson_swing_down_loop_new';
        this.image_index = 0;
        this.image_speed = 0;
    }
    if (this.sprite_index == 'spr_gerson_swing_down_new' && this.image_index > 2.5 && this.con == 0) {
        this.active = 1;
        this.con = 1;
        this.speed = 50;
        this.friction = 10;
        if (this.image_angle == 45 || this.image_angle == 135 || this.image_angle == 225 || this.image_angle == 315) {
            this.friction = 6.5;
        }
    }
    if (this.con == 1 && this.speed < 12) {
        this.friction = 4;
        if (this.speed < 5) {
            this.speed = 5;
        }
        this.image_alpha = this.image_alpha - 0.2;
        if (this.image_alpha == 1.2) {
            snd_stop('snd_impact');
            snd_play('snd_impact');
        }
        if (this.image_alpha <= 0.8) {
            this.mask_index = 'spr_nothing';
            this.active = 0;
        }
        if (this.image_alpha < 0) {
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_gerson_swing_down_new', GersonSwingDownNew);

// obj_gerson_squishes_box (default sprite spr_gerson_idle, depth 0)
class GersonSquishesBox extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_idle';
  }
  cleanUp() {
    return;
  }
  create() {
    this.timer = 0;
    this.con = 0;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_speed = 0;
    if (W('obj_hammer_of_justice_enemy', function (other) {
        this.visible = false;
    }, this) === EXIT) return;
  }
  step() {
    let timermax, maxscalex, maxscaley;
    if (this.con == 0) {
        this.timer = this.timer + 1;
        if (this.timer == 1) {
            this.vspeed = - 48;
            snd_play('snd_jump');
            snd_play('snd_rocket');
            snd_play('snd_screenshake');
            this.d = instance_create(0, 0, 'obj_shake');
            this.d.shakex = Math.ceil(2);
            this.d.shakey = Math.ceil(2);
        }
        this.flash = instance_create(this.x, this.y, 'obj_afterimage');
        this.flash.sprite_index = this.sprite_index;
        this.flash.image_index = this.image_index;
        this.flash.image_xscale = this.image_xscale;
        this.flash.image_yscale = this.image_yscale;
        this.flash.image_blend = this.image_blend;
        this.flash.image_speed = 0;
        this.flash.image_alpha = 1.5;
        this.flash.fadeSpeed = 0.2;
        if (this.vspeed < 0) {
            this.vspeed = this.vspeed + 0.8;
        }
        if (this.timer == 14) {
            this.timer = 0;
            this.con = 1;
            this.vspeed = 0;
            this.x = O('obj_growtangle').x;
            this.y = cameray();
            this.sprite_index = 'spr_gerson_dodge_origin_top_bottom';
            this.image_index = 0;
        }
    }
    if (this.con == 1) {
        if (this.timer < 5) {
            this.timer = this.timer + 1;
        }
        this.y = lerp(cameray(), O('obj_growtangle').y - 70, this.timer / 5);
        if (this.timer == 5) {
            this.y = O('obj_growtangle').y - 70;
            this.con = 2;
            this.timer = 0;
            snd_play('snd_screenshake');
            this.d = instance_create(0, 0, 'obj_shake');
            this.d.shakex = Math.ceil(2);
            this.d.shakey = Math.ceil(2);
        }
    }
    if (this.con == 2) {
        if (W('obj_hammer_of_justice_enemy', function (other) {
            this.squishbox = true;
        }, this) === EXIT) return;
        this.timer = this.timer + 1;
        timermax = 10;
        if (this.timer <= timermax) {
            maxscalex = lerp(9, 6, this.timer / timermax);
            maxscaley = lerp(0.2, 1, this.timer / timermax);
            O('obj_growtangle').image_xscale = lerp(O('obj_growtangle').image_xscale, maxscalex, this.timer / timermax);
            O('obj_growtangle').image_yscale = lerp(O('obj_growtangle').image_yscale, maxscaley, this.timer / timermax);
        }
        if (this.timer > timermax) {
            maxscalex = lerp(5, 6, this.timer / 15);
            maxscaley = lerp(1.2, 1, this.timer / 15);
            O('obj_growtangle').image_xscale = lerp(O('obj_growtangle').image_xscale, maxscalex, this.timer / 15);
            O('obj_growtangle').image_yscale = lerp(O('obj_growtangle').image_yscale, maxscaley, this.timer / 15);
        }
        this.y = O('obj_growtangle').y - 35 * O('obj_growtangle').image_yscale;
        if (this.timer >= 15) {
            instance_create(this.x, this.y - 67, 'obj_gerson_teleport');
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_gerson_squishes_box', GersonSquishesBox);

// obj_gerson_hits_box (default sprite spr_gerson_swing, depth 0)
class GersonHitsBox extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_swing';
  }
  create() {
    this.image_speed = 0;
    this.image_xscale = - 2;
    this.image_yscale = 2;
  }
  step() {
    let a, b, yoffset, slowbullet1, slowbullet2, slowbullet3, slowbullet4, side_x, dir;
    this.image_index = this.image_index + 0.5;
    if (this.image_index == 4) {
        snd_play_x('snd_stardrop', 1, 1 + irandom(4) / 10);
        a = 1;
        b = 1;
        yoffset = 20;
        for (let _r46 = 0, _n46 = (2); _r46 < _n46; _r46++) {
            if (this.image_xscale == - 2) {
                this.anim = instance_create(O('obj_growtangle').x + 75, O('obj_growtangle').y + yoffset, 'obj_gerson_growtangle_hit_fx');
                this.anim.dir = 1;
                this.anim.image_xscale = a * - 1;
                this.anim.image_yscale = b;
            } else {
                this.anim = instance_create(O('obj_growtangle').x - 75, O('obj_growtangle').y + yoffset, 'obj_gerson_growtangle_hit_fx');
                this.anim.dir = - 1;
                this.anim.image_xscale = a;
                this.anim.image_yscale = b;
            }
            this.anim.sprite_index = 'spr_gerson_box_hit_fx1';
            this.anim.image_speed = 1.5;
            yoffset = - 20;
            b = - 1;
        }
        if (this.image_xscale == - 2) {
            O('obj_hammer_of_justice_enemy').hitbox_con = 1;
            slowbullet1 = irandom(8);
            slowbullet2 = slowbullet1 + 1;
            slowbullet3 = slowbullet1 + 5;
            if (slowbullet3 > 8) {
                slowbullet3 = slowbullet3 - 10;
            }
            slowbullet4 = slowbullet3 + 1;
            side_x = - 80;
            dir = 0;
            if (global.turntimer > 1 && i_ex('obj_growtangle')) {
                this.i = 0;
                while (this.i < 7) {
                    this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 23 * this.i, 'obj_box_hit_bullet');
                    if (W(this.bulletshot, function (other) {
                        scr_bullet_init(this);
                    }, this) === EXIT) return;
                    this.bulletshot.direction = dir;
                    this.bulletshot.speed = 11.5;
                    this.bulletshot.friction = 0.14;
                    this.bulletshot.depth = this.depth - 1;
                    this.bulletshot.timermax = 43;
                    if (this.i == slowbullet1 || this.i == slowbullet2 || this.i == slowbullet3 || this.i == slowbullet4) {
                        this.bulletshot.speed = 7.3 + choose(1, 2);
                        this.bulletshot.friction = 0.08;
                    }
                    this.i = this.i + 1;
                }
            }
        } else {
            O('obj_hammer_of_justice_enemy').hitbox_con = 2;
            slowbullet1 = irandom(8);
            slowbullet2 = slowbullet1 + 1;
            slowbullet3 = slowbullet1 + 5;
            if (slowbullet3 > 8) {
                slowbullet3 = slowbullet3 - 10;
            }
            slowbullet4 = slowbullet3 + 1;
            side_x = 80;
            dir = 180;
            if (global.turntimer > 1 && i_ex('obj_growtangle')) {
                this.i = 0;
                while (this.i < 7) {
                    this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 23 * this.i, 'obj_box_hit_bullet');
                    if (W(this.bulletshot, function (other) {
                        scr_bullet_init(this);
                    }, this) === EXIT) return;
                    this.bulletshot.direction = dir;
                    this.bulletshot.speed = 11.5;
                    this.bulletshot.friction = 0.14;
                    this.bulletshot.depth = this.depth - 1;
                    this.bulletshot.timermax = 43;
                    if (this.i == slowbullet1 || this.i == slowbullet2 || this.i == slowbullet3 || this.i == slowbullet4) {
                        this.bulletshot.speed = 7.3 + choose(1, 2);
                        this.bulletshot.friction = 0.08;
                    }
                    this.i = this.i + 1;
                }
            }
        }
        snd_play('snd_impact');
    }
    if (this.image_index > 6.5) {
        instance_destroy(this);
        if (this.image_xscale == - 2) {
            instance_create(this.x - 60, this.y + 40, 'obj_gerson_teleport');
        } else {
            instance_create(this.x + 60, this.y + 40, 'obj_gerson_teleport');
        }
    }
  }
}
defineObject('obj_gerson_hits_box', GersonHitsBox);

// obj_gerson_swing_down_mask (default sprite spr_gerson_swing_down, depth 0, parent obj_regularbullet)
class GersonSwingDownMask extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_swing_down';
  }
  cleanUp() {
    return;
  }
  create() {
    super.create?.();
    this.timer = 0;
    this.con = 0;
    this.destroyonhit = false;
    this.active = 0;
    this.fakeout = 0;
    this.swingdowntype = 0;
    this.timetoswing = 8;
    this.eye_index = 0;
    this.eye_con = 0;
    this.alpha = 0;
    this.alphacon = 0;
    this.image_speed = 0;
    this.speed = - 6;
    this.direction = 270;
    this.friction = 0.4;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_alpha = 1.4;
    this.depth = O('obj_growtangle').depth + 1;
  }
  draw() {
    let ylocation, xlocation;
    draw_self(this);
    if (this.eye_con == 1) {
        if (this.eye_index == 0) {
            this.afterimage = scr_afterimage(this);
            this.afterimage.vspeed = 2.5;
            this.afterimage.image_alpha = 0.6;
            this.afterimage = scr_afterimage(this);
            this.afterimage.vspeed = - 2.5;
            this.afterimage.image_alpha = 0.6;
            this.afterimage = scr_afterimage(this);
            this.afterimage.hspeed = 2.5;
            this.afterimage.image_alpha = 0.6;
            this.afterimage = scr_afterimage(this);
            this.afterimage.hspeed = - 2.5;
            this.afterimage.image_alpha = 0.6;
            snd_play_pitch('snd_eye_telegraph', 1);
            if (this.swingdowntype == 10) {
                ylocation = this.y + 26;
                if (ylocation < O('obj_growtangle').y - 70) {
                    ylocation = O('obj_growtangle').y - 70;
                }
                if (ylocation > O('obj_growtangle').y) {
                    ylocation = O('obj_growtangle').y;
                }
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, ylocation, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 142;
                this.inst.image_yscale = 72;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
                snd_play_pitch('snd_eye_telegraph', 0.95);
            } else if (this.swingdowntype == 11) {
                ylocation = O('obj_growtangle').y;
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, ylocation, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 142;
                this.inst.image_yscale = 72;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
                snd_play_pitch('snd_eye_telegraph', 0.95);
            } else if (this.swingdowntype == 12) {
                ylocation = O('obj_growtangle').y - 70;
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, ylocation, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 142;
                this.inst.image_yscale = 72;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
                snd_play_pitch('snd_eye_telegraph', 0.95);
            } else if (this.x == camerax() + 268 + 62) {
                this.inst = instance_create(O('obj_growtangle').x - 75 + 5, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 70;
                this.inst.image_yscale = 142;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else if (this.x == camerax() + 378 - 62) {
                this.inst = instance_create(O('obj_growtangle').x, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 72;
                this.inst.image_yscale = 142;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            } else {
                xlocation = this.x + 52 - 36;
                if (xlocation < O('obj_growtangle').x - 70) {
                    xlocation = O('obj_growtangle').x - 70;
                }
                if (xlocation > O('obj_growtangle').x) {
                    xlocation = O('obj_growtangle').x;
                }
                this.inst = instance_create(xlocation, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
                this.inst.image_xscale = 72;
                this.inst.image_yscale = 142;
                if (i_ex('obj_heart')) {
                    this.inst.depth = O('obj_heart').depth + 1;
                }
            }
        }
        if (this.alphacon == 0) {
            this.alpha = this.alpha + 0.2;
            if (this.alpha == 1.2) {
                this.alphacon = 1;
            }
        } else {
            this.alpha = this.alpha - 0.2;
        }
        d3d_set_fog(true, 0xffffff, 0, 1);
        draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.alpha);
        d3d_set_fog(false, 0x000000, 0, 0);
        this.eye_index = this.eye_index + 0.4;
        if (this.swingdowntype == 1) {
            this.eye_index = this.eye_index + 0.6;
        }
        if (this.eye_index >= 5) {
            this.eye_con = 0;
        }
    }
  }
  user0() {
    if (this.swingdowntype == 0) {
        this.speed = - 6;
        this.friction = 0.4;
    }
    if (this.swingdowntype == - 1) {
        this.timetoswing = 22;
        this.speed = - 7;
        this.friction = 0.4;
    }
    if (this.swingdowntype == - 2) {
        this.timetoswing = 32;
        this.speed = - 4.7;
        this.friction = 0.17;
    }
    if (this.swingdowntype == - 3) {
        this.timetoswing = 999;
        this.speed = - 4.7;
        this.friction = 0.17;
    }
    if (this.swingdowntype == - 4) {
        this.timetoswing = 999;
        this.speed = - 4.7;
        this.friction = 0.2;
    }
    if (this.swingdowntype == 10) {
        this.timetoswing = 16;
        this.speed = - 6;
        this.friction = 0.4;
    }
    if (this.swingdowntype == 11) {
        this.timetoswing = 22;
        this.speed = - 7;
        this.friction = 0.4;
    }
    if (this.swingdowntype == 12) {
        this.timetoswing = 22;
        this.speed = - 7;
        this.friction = 0.4;
    }
    if (this.swingdowntype == 1) {
        this.timetoswing = 3;
        this.speed = - 6;
        this.friction = 0.4;
    }
  }
  step() {
    this.timer = this.timer + 1;
    if (this.timer > 6) {
        this.depth = - 999999;
    }
    if (this.timer == this.timetoswing - 12 || this.swingdowntype == 0 && this.timer == this.timetoswing - 2 || this.swingdowntype == 1 && this.timer == this.timetoswing - 2) {
        this.eye_con = 1;
    }
    if (this.timer > this.timetoswing && this.sprite_index == 'spr_gerson_swing_down') {
        this.image_index = this.image_index + 0.5;
    }
    if (this.swingdowntype == - 3 && this.eye_con == 0) {
        if (this.timer == 34) {
            if (W('obj_gerson_swing_down', function (other) {
                this.eye_con = 1;
                this.timer = this.timetoswing - 2;
            }, this) === EXIT) return;
        }
    }
    if (this.swingdowntype == - 4) {
        if (this.timer == 12) {
            if (W('obj_gerson_swing_down', function (other) {
                if (this.swingdowntype == - 4) {
                    this.eye_con = 1;
                }
            }, this) === EXIT) return;
        }
        if (this.timer == 50) {
            if (this.image_xscale > 0) {
                instance_create(this.x + 52, this.y + 120, 'obj_gerson_teleport');
            } else {
                instance_create(this.x - 52, this.y + 120, 'obj_gerson_teleport');
            }
            instance_destroy(this);
        }
    }
    if (this.timer == this.timetoswing + 2) {
        snd_stop('motor_upper_quick_mid');
        snd_play('motor_upper_quick_mid');
    }
    if (this.timer == this.timetoswing + 5) {
        snd_stop('motor_swing_down');
        snd_play('motor_swing_down');
    }
    if (this.sprite_index == 'spr_gerson_swing_down' && this.image_index > 3.5) {
        this.sprite_index = 'spr_gerson_swing_down_loop';
        this.image_index = 0;
        this.image_speed = 0;
    }
    if (this.sprite_index == 'spr_gerson_swing_down' && this.con == 0 && this.image_index > 1) {
        this.active = 1;
        this.con = 1;
        this.x = this.x + lengthdir_x(30, this.direction);
        this.y = this.y + lengthdir_y(30, this.direction);
        this.speed = 45;
        this.friction = 10;
    }
    if (this.con == 1 && this.vspeed < 12) {
        this.friction = 4;
        if (this.speed < 5) {
            this.speed = 5;
        }
        this.image_alpha = this.image_alpha - 0.2;
        if (this.image_alpha == 1.2) {
            snd_play('snd_impact');
        }
        if (this.image_alpha < 0.6) {
            this.mask_index = 'spr_nothing';
        }
        if (this.image_alpha < 0) {
            instance_destroy(this);
        }
    }
    if (this.swingdowntype == - 3 && this.sprite_index == 'spr_gerson_swing_down' && this.image_index >= 2) {
        this.gers = instance_create(this.x + lengthdir_x(110, this.image_angle + 290), this.y + lengthdir_y(110, this.image_angle + 290), 'obj_gerson_teleport');
        this.gers.image_angle = this.image_angle;
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_swing_down_mask', GersonSwingDownMask);

