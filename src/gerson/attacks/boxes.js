// Box and shell attacks (machine-translated from the Chapter 4 GML by tools/gen_attacks.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  Instance, S, choose, clamp, d3d_set_fog, defineObject, draw_self, draw_sprite_ext, global, instance_create, instance_destroy, instancesOf, irandom, irandom_range, lengthdir_x, lengthdir_y, lerp, place_meeting, point_direction, point_distance, random, random_range, sign, snd_play, snd_stop, variable_instance_exists,
} from '../rt.js?v=20261116214353';
import {
  cameray, gt, i_ex, scr_afterimagefast, scr_approach, scr_at_player, scr_bullet_init, scr_custom_afterimage_ext, scr_darksize, scr_fire_bullet, scr_get_box, scr_lerpvar, scr_script_delayed, scr_shakeobj, scr_shakescreen, scr_var, snd_play_pitch,
} from '../common.js?v=20261116214353';
import {
  EXIT, O, P, T, W,
} from '../gml.js?v=20261116214353';

// obj_box_throw_controller (default sprite spr_gerson_laugh, depth 0)
class BoxThrowController extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_laugh';
  }
  create() {
    this.timer = 0;
    this.full_timer = 0;
    this.hammer_timer = 0;
    this.hammer_timer_goal = 10;
    this.hammer_counter = 0;
    this.hammer_phase = 0;
    this.ending_counter = 0;
    this.z = 0;
    this.my_flash = - 1;
    this.anchor_x = this.x;
    this.anchor_y = this.y;
    scr_darksize(this);
    this.image_speed = 0.5;
    snd_play('snd_gerlaugh_clear', 1, 1.1);
    if (W('obj_hammer_of_justice_enemy', function (other) {
        this.visible = false;
    }, this) === EXIT) return;
    global.turntimer = 9999;
  }
  draw() {
    draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y - this.z, this.image_xscale, this.image_yscale, this.image_angle, this.image_blend, this.image_alpha);
  }
  step() {
    let new_x, hammer_amount, hammer_type, small_offset, a;
    this.timer = this.timer + 1;
    this.full_timer = this.full_timer + 1;
    switch (this.timer) {
      case 15:
        this.visible = false;
        instance_create(this.x + 64, this.y + 36, 'obj_gerson_teleport_generic');
        this.x = O('obj_growtangle').x + 80;
        this.y = O('obj_growtangle').y - 20;
        this.anchor_x = this.x;
        this.anchor_y = this.y;
        break;
      case 19:
        if (W('obj_gerson_teleport_generic', function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        this.sprite_index = 'spr_gerson_swing';
        instance_create(this.x + 58, this.y + 36, 'obj_gerson_teleport_generic');
        break;
      case 23:
        if (W('obj_gerson_teleport_generic', function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        this.visible = true;
        this.image_index = 0;
        this.image_speed = 0;
        scr_lerpvar(this,  "image_index", 0, 6, 12);
        snd_play('motor_upper_quick_mid');
        break;
      case 31:
        snd_play('snd_queen_punched_lower');
        scr_shakeobj(this);
        if (W('obj_growtangle', function (other) {
            scr_lerpvar(this,  "x", this.x, this.x - 80, 10, 2, "out");
            scr_lerpvar(this,  "image_angle", this.image_angle, this.image_angle + 135, 12, 2, "out");
        }, this) === EXIT) return;
        break;
    }
    if (this.timer > 30 && this.timer < 41) {
        if (W('obj_growtangle', function (other) {
            if (W(scr_afterimagefast(this), function (other) {
                this.fadeSpeed = this.fadeSpeed * 3;
            }, this) === EXIT) return EXIT;
        }, this) === EXIT) return;
    }
    if (this.hammer_phase == 0) {
        if (this.timer > 84) {
            this.timer = this.timer - (30 + irandom(12));
            snd_play_pitch('snd_jump', 2);
            new_x = 0;
            if (this.x < this.anchor_x) {
                new_x = 30 + irandom(30);
            } else if (this.x > this.anchor_x) {
                new_x = - 30 - irandom(30);
            } else {
                new_x = choose(- 60, 60);
            }
            S.scr_jump_arc(this, this.x, this.y, this.anchor_x + new_x, this.anchor_y + irandom_range(- 20, 20), 70 + irandom(30), 24);
        }
    }
    if (this.timer > 36) {
        this.hammer_timer = this.hammer_timer + 1;
    }
    if (this.hammer_phase == 0) {
        if (this.hammer_timer == this.hammer_timer_goal) {
            snd_stop('snd_smallswing');
            snd_play_pitch('snd_smallswing', 1 + random(0.3));
            hammer_amount = 3 + irandom(1);
            if (!T(irandom(3))) {
                this.hammer_cmount = 2;
            }
            hammer_type = 1;
            small_offset = irandom_range(- 30, 30);
            a = 0;
            while (a < hammer_amount) {
                if (W(instance_create(this.x + 100 - 42, this.y + 90 - 86, 'obj_gerson_hammer_bro_hammer'), function (other) {
                    scr_bullet_init(this);
                    this.active = 1;
                    scr_darksize(this);
                    if (T(hammer_type)) {
                        this.fakehspeed = - Math.abs(this.x - (O('obj_growtangle').x + small_offset)) / 45 + (- 2 + 4 / (hammer_amount - 1) * a) + random_range(- 0.5, 0.5);
                    } else {
                        this.fakehspeed = - Math.abs(this.x - (O('obj_growtangle').x + small_offset)) / 45;
                    }
                    if (T(hammer_type)) {
                        this.fakevspeed = - 14 + (- 1 + 2 / (hammer_amount - 1) * a) + random_range(- 1, 1);
                    } else {
                        this.fakevspeed = - 14;
                    }
                    this.gravity_direction = 270;
                    this.fakegravity = 0.6;
                    this.depth = this.depth - 1;
                    this.target = 3;
                    this.damage = 1;
                    this.grazed = 0;
                    this.grazepoints = 2.5;
                }, this) === EXIT) return;
                a = a + 1;
            }
            this.sprite_index = 'spr_gerson_hammer_throw';
            this.image_index = 0.1;
            this.hammer_timer = 0;
            this.hammer_counter = this.hammer_counter + 1;
            if (this.hammer_counter == 16) {
                this.hammer_counter = 0;
                this.hammer_phase = 1;
                this.hammer_timer = - 12;
                this.hammer_timer_goal = 3;
            }
        }
    }
    if (this.hammer_phase == 1) {
        if (this.hammer_timer == this.hammer_timer_goal) {
            snd_stop('snd_smallswing');
            snd_play_pitch('snd_smallswing', 0.75 + random(0.3));
            hammer_amount = 1;
            a = 0;
            while (a < hammer_amount) {
                if (W(instance_create(this.x + 100 - 42, this.y + 90 - 86, 'obj_gerson_hammer_bro_hammer'), function (other) {
                    scr_bullet_init(this);
                    this.active = 1;
                    scr_darksize(this);
                    this.image_xscale = this.image_xscale + 1;
                    this.image_yscale = this.image_yscale + 1;
                    if (hammer_amount == 1) {
                        this.fakehspeed = - Math.abs((this.x - (O('obj_growtangle').x + Math.sin(other.full_timer * 0.325) * 80)) / 45) + random_range(- 0.25, 0.25);
                        this.fakevspeed = - 14 + random_range(- 0.5, 0.5);
                    } else {
                        this.fakehspeed = - Math.abs(this.x - (O('obj_growtangle').x + Math.sin(other.full_timer * 0.325) * 80)) / 45 + (- hammer_amount * 0.75 + hammer_amount * 2 * 0.75 / (hammer_amount - 1) * a) + random_range(- 0.25, 0.25);
                        this.fakevspeed = - 14 + (- 1 + 2 / (hammer_amount - 1) * a) + random_range(- 0.5, 0.5);
                    }
                    this.gravity_direction = 270;
                    this.fakegravity = 0.6;
                    this.depth = this.depth - 1;
                    this.target = 3;
                    this.damage = 1;
                    this.grazed = 0;
                    this.grazepoints = 2.5;
                }, this) === EXIT) return;
                a = a + 1;
            }
            this.sprite_index = 'spr_gerson_hammer_throw';
            this.image_index = 0.1;
            this.hammer_timer = 0;
            this.hammer_counter = this.hammer_counter + 1;
            if (this.hammer_counter % 5 == 0) {
                this.hammer_timer = - 4;
            }
            if (this.hammer_counter == 25) {
                this.hammer_counter = 0;
                this.hammer_phase = 2;
                this.hammer_timer = 0;
            }
        }
    }
    if (this.hammer_phase == 2) {
        if (this.hammer_timer == 1) {
            snd_play_pitch('snd_jump', 2);
            S.scr_jump_arc(this, this.x, this.y, this.xstart - 30, this.ystart, 80, 32);
            this.image_index = 0;
            snd_play('snd_boost');
            this.my_flash = scr_custom_afterimage_ext(this,  'obj_oflash', this.sprite_index, this.image_index, this.x, this.y - this.z, this.image_xscale, this.image_yscale);
            if (W(this.my_flash, function (other) {
                this.target = other.id;
                this.image_index = other.image_index;
                this.image_speed = 0;
                this.depth = other.depth - 1;
            }, this) === EXIT) return;
        }
        if (this.hammer_timer >= 2 && this.hammer_timer < 24 && this.hammer_timer % 3 == 0) {
            if (W(S.scr_oflash(this), function (other) {
                this.depth = this.depth + 1;
                this.y = this.y - other.z;
                this.flashcolor = 0x00ff00;
            }, this) === EXIT) return;
        }
        if (this.hammer_timer == 9) {
            snd_stop('snd_smallswing');
            snd_play_pitch('snd_smallswing', 0.5);
            if (W(instance_create(this.x + 100 - 42, this.y + 90 - 86, 'obj_gerson_hammer_bro_hammer'), function (other) {
                scr_bullet_init(this);
                scr_darksize(this);
                this.image_xscale = this.image_xscale + 6;
                this.image_yscale = this.image_yscale + 6;
                this.mask_index = 'spr_gerson_gigahammer_mask';
                this.fakehspeed = - Math.abs((this.x - O('obj_growtangle').x) / 25.5);
                this.fakevspeed = - 16;
                this.destroyonhit = false;
                this.gigahammer = true;
                this.gravity_direction = 270;
                this.fakegravity = 0.6;
                this.depth = other.depth + 1;
                this.target = 3;
                this.damage = 1;
                this.grazed = 0;
                this.grazepoints = 2.5;
            }, this) === EXIT) return;
            this.sprite_index = 'spr_gerson_hammer_throw';
            this.image_index = 0.1;
        }
        if (this.hammer_timer == 36) {
            this.sprite_index = 'spr_gerson_spin';
            this.image_speed = 0.125;
            this.x = this.x + 60;
            this.y = this.y + 60;
        }
    }
    if (403 - this.full_timer < 8 && this.ending_counter == 0) {
        this.ending_counter = 1;
        this.visible = false;
        instance_create(this.x, this.y - 40, 'obj_gerson_teleport_generic');
    }
    if (403 - this.full_timer < 4 && this.ending_counter == 1) {
        this.ending_counter = 2;
        if (W('obj_gerson_teleport_generic', function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        instance_create(O('obj_hammer_of_justice_enemy').x + 68, O('obj_hammer_of_justice_enemy').y + 36, 'obj_gerson_teleport_generic');
    }
    if (403 - this.full_timer < 2 && this.ending_counter == 2) {
        this.ending_counter = 3;
        global.turntimer = 1;
    }
    if (global.turntimer < 1) {
        if (W('obj_gerson_teleport_generic', function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        if (W('obj_hammer_of_justice_enemy', function (other) {
            this.visible = true;
        }, this) === EXIT) return;
        instance_destroy(this);
    }
    if (this.sprite_index == 'spr_gerson_spin') {
        this.image_index = this.image_index % 4;
    }
    if (this.sprite_index == 'spr_gerson_hammer_throw' && this.image_index > 0) {
        this.image_index = scr_approach(this.image_index, 3, 0.5);
        if (this.image_index == 3) {
            if (this.hammer_phase == 2) {
                this.image_index = 2;
            } else {
                this.image_index = 0;
            }
        }
    }
    if (W('obj_heart', function (other) {
        if (place_meeting(this,  this.x, this.y, 'obj_battlesolid')) {
            this.x = this.x + lengthdir_x(1, point_direction(this.x + 10, this.y + 10, O('obj_growtangle').x, O('obj_growtangle').y));
            this.y = this.y + lengthdir_y(1, point_direction(this.x + 10, this.y + 10, O('obj_growtangle').x, O('obj_growtangle').y));
        }
    }, this) === EXIT) return;
  }
  beginStep() {
    return;
  }
  endStep() {
    let pointdir;
    if (this.timer >= 30 && this.timer <= 42) {
        if (W('obj_growtangle', function (other) {
            if (W('obj_heart', function (other) {
                this.x = this.x + (O('obj_growtangle').x - O('obj_growtangle').xprevious);
            }, this) === EXIT) return EXIT;
            if (W(instance_create(this.x, this.y, 'obj_marker'), function (other) {
                this.mask_index = 'spr_battlebg_collision_checker';
                this.image_angle = other.image_angle;
                this.image_xscale = other.image_xscale;
                this.image_yscale = other.image_yscale;
                if (i_ex('obj_heart')) {
                    pointdir = point_direction(O('obj_heart').x + 10, O('obj_heart').y + 10, this.x, this.y);
                    while (!T(S.position_meeting(this,  O('obj_heart').x + 10, O('obj_heart').y + 10, this))) {
                        if (W('obj_heart', function (other) {
                            this.x = this.x + lengthdir_x(1, pointdir);
                            this.y = this.y + lengthdir_y(1, pointdir);
                        }, this) === EXIT) return EXIT;
                    }
                }
                instance_destroy(this);
            }, this) === EXIT) return EXIT;
        }, this) === EXIT) return;
    }
    if (i_ex(this.my_flash)) {
        if (W(this.my_flash, function (other) {
            this.target = other.id;
            this.x = other.x;
            this.y = other.y - other.z;
        }, this) === EXIT) return;
    }
  }
}
defineObject('obj_box_throw_controller', BoxThrowController);

// obj_gerson_shell_kick_controller (default sprite spr_gerson_idle, depth 0)
class GersonShellKickController extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_idle';
  }
  create() {
    this.timer = 0;
    this.full_timer = 999;
    this.shell_counter = 1;
    this.my_flash = - 1;
    this.ending_counter = 0;
    scr_darksize(this);
    this.image_speed = 0;
    this.visible = false;
    global.turntimer = 9999;
  }
  step() {
    if (global.turntimer < 1 || global.fighting == 0) {
        this.image_alpha = this.image_alpha - 0.2;
        if (this.image_alpha < 0.1) {
            instance_destroy(this);
            return;
        }
    }
    this.timer = this.timer + 1;
    if (this.full_timer < 999) {
        this.full_timer = this.full_timer - 1;
    }
    if (this.timer == 12) {
        this.x = O('obj_hammer_of_justice_enemy').x;
        this.y = O('obj_hammer_of_justice_enemy').y;
        this.visible = true;
        this.sprite_index = 'spr_gerson_swing';
        this.image_index = 0;
        O('obj_hammer_of_justice_enemy').visible = false;
        snd_play('snd_boost');
        this.my_flash = S.scr_oflash(this);
        scr_lerpvar(this,  "x", this.x, this.x + 48, 12, 2, "out");
    }
    if (this.timer >= 12 && this.timer < 24 && this.timer % 3 == 0) {
        if (W(S.scr_oflash(this), function (other) {
            this.depth = this.depth + 1;
            this.flashcolor = 0x00ff00;
        }, this) === EXIT) return;
    }
    if (this.timer == 24) {
        scr_lerpvar(this,  "image_index", 0, 6, 12);
        snd_play('motor_upper_quick_mid');
    }
    if (this.timer == 32) {
        snd_play('snd_rudebuster_swing');
        scr_shakeobj(this);
        if (W(instance_create(this.x + 100 - 42, this.y + 90 - 86, 'obj_gerson_shell_pinball'), function (other) {
            scr_bullet_init(this);
            this.direction = scr_at_player(this,  this.x, this.y);
            this.speed = 12;
            this.depth = this.depth - 1;
            this.image_xscale = this.image_xscale + 0.25;
            this.image_yscale = this.image_yscale + 0.25;
            this.active = 1;
            this.target = 3;
            this.damage = 1;
            this.grazed = 0;
            this.grazepoints = 2.5;
            this.destroyonhit = false;
        }, this) === EXIT) return;
    }
    if (this.timer == 40) {
        if (this.shell_counter == 1) {
            this.visible = false;
            if (W(instance_create(this.x + 58, this.y + 36, 'obj_gerson_teleport_generic'), function (other) {
                scr_script_delayed(this,  instance_destroy, 7);
            }, this) === EXIT) return;
        } else {
            this.timer = 23;
            this.shell_counter = this.shell_counter + 1;
        }
    }
    if (this.full_timer < 4 && this.ending_counter == 0) {
        this.ending_counter = 1;
        instance_create(O('obj_hammer_of_justice_enemy').x + 68, O('obj_hammer_of_justice_enemy').y + 36, 'obj_gerson_teleport_generic');
    }
    if (this.full_timer < 2 && this.ending_counter == 1) {
        this.ending_counter = 2;
        global.turntimer = 1;
    }
    if (global.turntimer < 1) {
        if (W('obj_gerson_teleport_generic', function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        if (W('obj_hammer_of_justice_enemy', function (other) {
            this.visible = true;
        }, this) === EXIT) return;
        instance_destroy(this);
    }
  }
  beginStep() {
    return;
  }
  endStep() {
    let ydiff;
    if (global.turntimer < 1 || global.fighting == 0) {
        this.image_alpha = this.image_alpha - 0.2;
        if (this.image_alpha < 0.1) {
            instance_destroy(this);
            return;
        }
    }
    if (W('obj_growtangle', function (other) {
        ydiff = this.y - this.yprevious;
        if (W('obj_heart', function (other) {
            this.y = clamp(this.y + ydiff, scr_get_box(1) + 3, O('obj_growtangle').y + 53);
        }, this) === EXIT) return EXIT;
        if (W('obj_gerson_shell_pinball', function (other) {
            this.y = this.y + ydiff;
        }, this) === EXIT) return EXIT;
    }, this) === EXIT) return;
    if (i_ex(this.my_flash)) {
        this.my_flash.x = this.x;
    }
  }
}
defineObject('obj_gerson_shell_kick_controller', GersonShellKickController);

// obj_gerson_shell_pinball (default sprite spr_bounce_shell_idle_old2, depth 0, parent obj_regularbullet)
class GersonShellPinball extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_bounce_shell_idle_old2';
  }
  cleanUp() {
    if (W('obj_battle_marker', function (other) {
        if (variable_instance_exists(this, "shell_controlled")) {
            instance_destroy(this);
        }
    }, this) === EXIT) return;
  }
  create() {
    let aa;
    super.create?.();
    aa = (global.hp[2] - 30) / 250;
    if (aa < 0) {
        aa = 0;
    }
    this.damage = lerp(12, 90, aa);
    this.left_timer = - 1;
    this.right_timer = - 1;
    this.top_timer = - 1;
    this.image_speed = 8;
    this.timer = 0;
    this.im_done = false;
    this.xpprevious = this.x;
    this.ypprevious = this.y;
    this.gerson_x = this.x;
    this.gerson_y = this.y;
    this.counter = choose(0, - 1);
    this.grazetimer = 0;
    this.grazepoints = 4;
    // (check_bounds: a method in the GML; see checkBounds below)
  }
  draw() {
    if (T(this.im_done)) {
        return;
    }
    d3d_set_fog(true, 0x00ff00, 0, 1);
    draw_sprite_ext(this.sprite_index, this.image_index, this.xpprevious, this.ypprevious, this.image_xscale * 0.85, this.image_yscale * 0.85, this.image_angle, this.image_blend, 0.5);
    d3d_set_fog(false, 0x000000, 0, 0);
    d3d_set_fog(true, 0x00ff00, 0, 1);
    draw_sprite_ext(this.sprite_index, this.image_index, this.xprevious, this.yprevious, this.image_xscale * 0.85, this.image_yscale * 0.85, this.image_angle, this.image_blend, this.image_alpha);
    d3d_set_fog(false, 0x000000, 0, 0);
    draw_self(this);
    this.xpprevious = this.xprevious;
    this.ypprevious = this.yprevious;
  }
  user5() {
    let a;
    if (T(this.im_done)) {
        return;
    }
    a = (global.hp[2] - 30) / 250;
    if (a < 0) {
        a = 0;
    }
    this.damage = lerp(12, 90, a);
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
    let aa, a, dir;
    if (T(this.im_done)) {
        return;
    }
    this.grazetimer = this.grazetimer + 1;
    if (this.grazetimer > 7) {
        this.grazetimer = 0;
        this.grazed = 0;
    }
    this.timer = this.timer + 1;
    this.image_speed = scr_approach(this.image_speed, 0.5, 0.4);
    if (this.timer % 4 == 0 && !T(this.top_timer)) {
        if (W(scr_fire_bullet(this,  this.x, this.y, 'obj_regularbullet', 0, 0, 'spr_thrash_star'), function (other) {
            scr_darksize(this);
            this.image_xscale = 1.5;
            this.image_yscale = 1.5;
            scr_script_delayed(this,  scr_lerpvar, 22, "image_xscale", this.image_xscale, 0, 4);
            scr_script_delayed(this,  scr_lerpvar, 22, "image_yscale", this.image_yscale, 0, 4);
            scr_script_delayed(this,  instance_destroy, 26);
            this.grazepoints = 2;
            this.spinspeed = 15;
            this.spin = 1;
            aa = (global.hp[2] - 30) / 250;
            if (aa < 0) {
                aa = 0;
            }
            this.damage = lerp(12, 90, aa);
            if (global.chararmor1[2] == 23 || global.chararmor2[2] == 23) {
                this.damage = Math.round(this.damage * 0.15);
            }
        }, this) === EXIT) return;
    }
    if (this.x > O('obj_growtangle').x - 72 && this.x < O('obj_growtangle').x + 72) {
        if (this.y > scr_get_box(3) - 16 && this.counter < 7 && this.vspeed > 0) {
            this.y = scr_get_box(3) - 16;
            scr_lerpvar(this,  "image_xscale", this.image_xscale, this.image_xscale * 1.5, 3, 2, "out");
            scr_script_delayed(this,  scr_lerpvar, 3, "image_xscale", this.image_xscale * 1.5, this.image_xscale, 3, 2, "in");
            scr_lerpvar(this,  "image_yscale", this.image_yscale, this.image_yscale * 0.5, 3, 2, "out");
            scr_script_delayed(this,  scr_lerpvar, 3, "image_yscale", this.image_yscale * 0.5, this.image_yscale, 3, 2, "in");
            scr_script_delayed(this,  scr_var, 6, "vspeed", - this.vspeed);
            scr_script_delayed(this,  scr_var, 6, "hspeed", this.hspeed);
            this.vspeed = 0;
            this.hspeed = 0;
            snd_play('snd_parry_fast_nodelay');
            if (W('obj_growtangle', function (other) {
                if (this.y < 250) {
                    scr_lerpvar(this,  "y", this.y, this.y + 10, 6, 2, "out");
                }
            }, this) === EXIT) return;
        }
        if (this.y < scr_get_box(1) + 16 && this.counter < 7 && this.vspeed < 0) {
            this.y = scr_get_box(1) + 16;
            scr_lerpvar(this,  "image_xscale", this.image_xscale, this.image_xscale * 1.5, 3, 2, "out");
            scr_script_delayed(this,  scr_lerpvar, 3, "image_xscale", this.image_xscale * 1.5, this.image_xscale, 3, 2, "in");
            scr_lerpvar(this,  "image_yscale", this.image_yscale, this.image_yscale * 0.5, 3, 2, "out");
            scr_script_delayed(this,  scr_lerpvar, 3, "image_yscale", this.image_yscale * 0.5, this.image_yscale, 3, 2, "in");
            scr_script_delayed(this,  scr_var, 6, "vspeed", - this.vspeed);
            scr_script_delayed(this,  scr_var, 6, "hspeed", this.hspeed);
            this.vspeed = 0;
            this.hspeed = 0;
            snd_play('snd_parry_fast_nodelay');
            if (W('obj_growtangle', function (other) {
                if (this.y > 220) {
                    scr_lerpvar(this,  "y", this.y, this.y - 10, 6, 2, "out");
                }
            }, this) === EXIT) return;
        }
        if (this.y > scr_get_box(3) - 16 && this.top_timer >= 20) {
            this.y = scr_get_box(3) - 16;
            snd_play('snd_explosion_firework');
            snd_play('snd_stardrop', 0.5, 0.75);
            scr_shakescreen(this);
            if (W('obj_gerson_shell_kick_controller', function (other) {
                this.full_timer = 80;
            }, this) === EXIT) return;
            if (W(instance_create(this.x, this.y, 'obj_battle_marker'), function (other) {
                this.shell_controlled = true;
                this.destroyoncomplete = true;
                this.sprite_index = 'spr_finisher_explosion';
                this.image_speed = 0;
                scr_lerpvar(this,  "image_index", this.image_index, 6, 6);
                scr_script_delayed(this,  instance_destroy, 6);
            }, this) === EXIT) return;
            a = - 6;
            while (a < 6) {
                if (a != 0) {
                    if (W(instance_create(this.x, this.y + 8, 'obj_battle_marker'), function (other) {
                        this.shell_controlled = true;
                        this.destroyoncomplete = false;
                        this.kill = false;
                        this.sprite_index = 'spr_launchsmoke';
                        this.image_angle = irandom(360);
                        this.image_xscale = 1 + Math.abs(a) * 0.5;
                        this.image_yscale = 1 + Math.abs(a) * 0.5;
                        this.gravity_direction = 90;
                        this.gravity = Math.abs(a) * 0.05 + random(0.1);
                        this.hspeed = a * 3;
                        scr_lerpvar(this,  "hspeed", this.hspeed, this.hspeed * 0.25, 2 + Math.abs(a) * 6);
                        scr_lerpvar(this,  "image_xscale", this.image_xscale, this.image_xscale * 0.75, 2 + Math.abs(a) * 6);
                        scr_lerpvar(this,  "image_yscale", this.image_yscale, this.image_xscale * 0.75, 2 + Math.abs(a) * 6);
                        scr_lerpvar(this,  "image_alpha", 1, 0, 2 + Math.abs(a) * 6);
                        scr_lerpvar(this,  "image_angle", this.image_angle, this.image_angle + 180 * sign(a), 2 + Math.abs(a) * 6);
                        scr_script_delayed(this,  instance_destroy, 2 + Math.abs(a) * 6);
                    }, this) === EXIT) return;
                }
                a = a + 1;
            }
            a = - 2;
            while (a < 2) {
                if (W(scr_fire_bullet(this,  this.x, this.y, 'obj_regularbullet', 0, 0, 'spr_gerson_star7'), function (other) {
                    this.active = false;
                    this.image_blend = 0x808080;
                    this.spinspeed = 15;
                    this.spin = 1;
                    this.grazepoints = 2;
                    aa = (global.hp[2] - 30) / 250;
                    if (aa < 0) {
                        aa = 0;
                    }
                    this.damage = lerp(12, 90, aa);
                    if (global.chararmor1[2] == 23 || global.chararmor2[2] == 23) {
                        this.damage = Math.round(this.damage * 0.15);
                    }
                    scr_script_delayed(this,  scr_var, 8, "image_blend", 10855845);
                    scr_script_delayed(this,  scr_var, 9, "image_blend", 13421772);
                    scr_script_delayed(this,  scr_var, 10, "image_blend", 15921906);
                    scr_script_delayed(this,  scr_var, 11, "image_blend", 16777215);
                    scr_script_delayed(this,  scr_var, 11, "active", true);
                    scr_darksize(this);
                    this.image_xscale = 1.5;
                    this.image_yscale = 1.5;
                    if (T(irandom(1))) {
                        this.image_xscale = this.image_xscale - 0.5;
                        this.image_yscale = this.image_yscale - 0.5;
                    }
                    this.direction = 90 + 4 * a;
                    this.speed = 12;
                    this.direction = this.direction + random_range(- 1, 1);
                    this.speed = this.speed + random_range(- 1, 1);
                    this.hspeed = this.hspeed * 0.5;
                    this.gravity_direction = 270;
                    this.gravity = 0.535;
                }, this) === EXIT) return;
                a = a + 1;
            }
            a = - 5;
            while (a < 5) {
                if (W(scr_fire_bullet(this,  this.x + 24, this.y, 'obj_regularbullet', 0, 0, 'spr_gerson_star7'), function (other) {
                    this.active = false;
                    this.image_blend = 0x808080;
                    this.spinspeed = 15;
                    this.spin = 1;
                    this.grazepoints = 2;
                    aa = (global.hp[2] - 30) / 250;
                    if (aa < 0) {
                        aa = 0;
                    }
                    this.damage = lerp(12, 90, aa);
                    if (global.chararmor1[2] == 23 || global.chararmor2[2] == 23) {
                        this.damage = Math.round(this.damage * 0.15);
                    }
                    scr_script_delayed(this,  scr_var, 8, "image_blend", 10855845);
                    scr_script_delayed(this,  scr_var, 9, "image_blend", 13421772);
                    scr_script_delayed(this,  scr_var, 10, "image_blend", 15921906);
                    scr_script_delayed(this,  scr_var, 11, "image_blend", 16777215);
                    scr_script_delayed(this,  scr_var, 11, "active", true);
                    scr_darksize(this);
                    this.image_xscale = 1.5;
                    this.image_yscale = 1.5;
                    if (T(irandom(1))) {
                        this.image_xscale = this.image_xscale - 0.5;
                        this.image_yscale = this.image_yscale - 0.5;
                    }
                    this.direction = 90 + 7 * a;
                    this.speed = 13.25;
                    this.direction = this.direction + random_range(- 1, 1);
                    this.speed = this.speed + random_range(- 1, 1);
                    this.hspeed = this.hspeed * 0.5;
                    this.gravity_direction = 270;
                    this.gravity = 0.5;
                }, this) === EXIT) return;
                a = a + 1;
            }
            a = - 4;
            while (a < 4) {
                if (W(scr_fire_bullet(this,  this.x, this.y, 'obj_regularbullet', 0, 0, 'spr_gerson_star7'), function (other) {
                    this.active = false;
                    this.image_blend = 0x808080;
                    this.spinspeed = 15;
                    this.spin = 1;
                    this.grazepoints = 2;
                    aa = (global.hp[2] - 30) / 250;
                    if (aa < 0) {
                        aa = 0;
                    }
                    this.damage = lerp(12, 90, aa);
                    if (global.chararmor1[2] == 23 || global.chararmor2[2] == 23) {
                        this.damage = Math.round(this.damage * 0.15);
                    }
                    scr_script_delayed(this,  scr_var, 8, "image_blend", 10855845);
                    scr_script_delayed(this,  scr_var, 9, "image_blend", 13421772);
                    scr_script_delayed(this,  scr_var, 10, "image_blend", 15921906);
                    scr_script_delayed(this,  scr_var, 11, "image_blend", 16777215);
                    scr_script_delayed(this,  scr_var, 11, "active", true);
                    scr_darksize(this);
                    this.image_xscale = 1.5;
                    this.image_yscale = 1.5;
                    if (T(irandom(1))) {
                        this.image_xscale = this.image_xscale - 0.5;
                        this.image_yscale = this.image_yscale - 0.5;
                    }
                    this.direction = 90 + 6 * a;
                    this.speed = 14.5;
                    this.direction = this.direction + random_range(- 1, 1);
                    this.speed = this.speed + random_range(- 1, 1);
                    this.hspeed = this.hspeed * 0.5;
                    this.gravity_direction = 270;
                    this.gravity = 0.465;
                }, this) === EXIT) return;
                a = a + 1;
            }
            a = - 3;
            while (a < 3) {
                if (W(scr_fire_bullet(this,  this.x - 24, this.y, 'obj_regularbullet', 0, 0, 'spr_gerson_star7'), function (other) {
                    this.active = false;
                    this.image_blend = 0x808080;
                    this.spinspeed = 15;
                    this.spin = 1;
                    this.grazepoints = 2;
                    aa = (global.hp[2] - 30) / 250;
                    if (aa < 0) {
                        aa = 0;
                    }
                    this.damage = lerp(12, 90, aa);
                    if (global.chararmor1[2] == 23 || global.chararmor2[2] == 23) {
                        this.damage = Math.round(this.damage * 0.15);
                    }
                    scr_script_delayed(this,  scr_var, 8, "image_blend", 10855845);
                    scr_script_delayed(this,  scr_var, 9, "image_blend", 13421772);
                    scr_script_delayed(this,  scr_var, 10, "image_blend", 15921906);
                    scr_script_delayed(this,  scr_var, 11, "image_blend", 16777215);
                    scr_script_delayed(this,  scr_var, 11, "active", true);
                    scr_darksize(this);
                    this.image_xscale = 1.5;
                    this.image_yscale = 1.5;
                    if (T(irandom(1))) {
                        this.image_xscale = this.image_xscale - 0.5;
                        this.image_yscale = this.image_yscale - 0.5;
                    }
                    this.direction = 90 + 5 * a;
                    this.speed = 15.75;
                    this.direction = this.direction + random_range(- 1, 1);
                    this.speed = this.speed + random_range(- 1, 1);
                    this.hspeed = this.hspeed * 0.5;
                    this.gravity_direction = 270;
                    this.gravity = 0.43;
                }, this) === EXIT) return;
                a = a + 1;
            }
            this.im_done = true;
        }
    }
    if (this.x < O('obj_growtangle').x - 73 && this.hspeed < 0 && this.left_timer == - 1) {
        this.left_timer = 0;
    }
    if (this.x > O('obj_growtangle').x + 92 && this.hspeed > 0 && this.right_timer == - 1) {
        this.right_timer = 0;
    }
    if (this.left_timer > - 1) {
        this.left_timer = this.left_timer + 1;
    }
    if (this.right_timer > - 1) {
        this.right_timer = this.right_timer + 1;
    }
    if (this.top_timer > - 1) {
        this.top_timer = this.top_timer + 1;
    }
    switch (this.left_timer) {
      case 1:
        this.gerson_x = this.x + this.hspeed * 6;
        this.gerson_y = this.y + this.vspeed * 6;
        if (W(instance_create(this.gerson_x - 108, this.gerson_y + 24, 'obj_gerson_teleport_generic'), function (other) {
            scr_script_delayed(this,  instance_destroy, 4);
        }, this) === EXIT) return;
        break;
      case 5:
        if (W(instance_create(this.gerson_x - 40, this.gerson_y, 'obj_battle_marker'), function (other) {
            this.shell_controlled = true;
            this.destroyoncomplete = true;
            this.sprite_index = 'spr_gerson_swing';
            this.image_index = 3;
            scr_darksize(this);
            this.image_xscale = this.image_xscale * - 1;
            scr_lerpvar(this,  "image_index", 3, 6, 6);
            scr_script_delayed(this,  instance_destroy, 10);
        }, this) === EXIT) return;
        break;
      case 7:
        snd_play('snd_queen_punched_lower');
        this.counter = this.counter + 1;
        if (this.counter < 7) {
            dir = scr_at_player(this,  this.x, this.y);
            if (T(irandom(1))) {
                if (this.checkBounds(point_direction(this.x, this.y, O('obj_heart').x + 10, scr_get_box(3) - (O('obj_heart').y + 10) + scr_get_box(3)))) {
                    dir = point_direction(this.x, this.y, O('obj_heart').x + 10, scr_get_box(3) - (O('obj_heart').y + 10) + scr_get_box(3));
                }
                if (this.checkBounds(point_direction(this.x, this.y, O('obj_heart').x + 10, scr_get_box(1) - (O('obj_heart').y + 10 - scr_get_box(1))))) {
                    dir = point_direction(this.x, this.y, O('obj_heart').x + 10, scr_get_box(1) - (O('obj_heart').y + 10 - scr_get_box(1)));
                }
            }
            this.direction = dir;
            this.speed = scr_approach(this.speed, 15, 1.5);
        } else {
            this.direction = point_direction(this.x, this.y, scr_get_box(4), scr_get_box(1) - 80);
            this.speed = Math.abs(point_distance(scr_get_box(4), scr_get_box(1) - 80, this.x, this.y)) / 30;
            this.top_timer = 0;
        }
        this.image_speed = 8;
        break;
      case 15:
        if (W(instance_create(this.gerson_x - 108, this.gerson_y + 24, 'obj_gerson_teleport_generic'), function (other) {
            scr_script_delayed(this,  instance_destroy, 4);
        }, this) === EXIT) return;
        this.left_timer = - 1;
        break;
    }
    switch (this.right_timer) {
      case 1:
        this.gerson_x = this.x + this.hspeed * 6;
        this.gerson_y = this.y + this.vspeed * 6;
        if (W(instance_create(this.gerson_x + 40, this.gerson_y + 16, 'obj_gerson_teleport_generic'), function (other) {
            scr_script_delayed(this,  instance_destroy, 4);
        }, this) === EXIT) return;
        break;
      case 5:
        if (W(instance_create(this.gerson_x - 8, this.gerson_y, 'obj_battle_marker'), function (other) {
            this.shell_controlled = true;
            this.destroyoncomplete = true;
            this.sprite_index = 'spr_gerson_swing';
            this.image_index = 3;
            scr_darksize(this);
            scr_lerpvar(this,  "image_index", 3, 6, 6);
            scr_script_delayed(this,  instance_destroy, 10);
        }, this) === EXIT) return;
        break;
      case 7:
        snd_play('snd_queen_punched_lower');
        this.counter = this.counter + 1;
        if (this.counter < 7) {
            dir = scr_at_player(this,  this.x, this.y);
            if (T(irandom(1))) {
                if (this.checkBounds(point_direction(this.x, this.y, O('obj_heart').x + 10, scr_get_box(3) - (O('obj_heart').y + 10) + scr_get_box(3)))) {
                    dir = point_direction(this.x, this.y, O('obj_heart').x + 10, scr_get_box(3) - (O('obj_heart').y + 10) + scr_get_box(3));
                }
                if (this.checkBounds(point_direction(this.x, this.y, O('obj_heart').x + 10, scr_get_box(1) - (O('obj_heart').y + 10 - scr_get_box(1))))) {
                    dir = point_direction(this.x, this.y, O('obj_heart').x + 10, scr_get_box(1) - (O('obj_heart').y + 10 - scr_get_box(1)));
                }
            }
            this.direction = dir;
            this.speed = scr_approach(this.speed, 15, 1.5);
        } else {
            this.direction = point_direction(this.x, this.y, scr_get_box(4), scr_get_box(1) - 80);
            this.speed = Math.abs(point_distance(scr_get_box(4), scr_get_box(1) - 80, this.x, this.y)) / 30;
            this.top_timer = 0;
        }
        this.image_speed = 8;
        break;
      case 15:
        if (W(instance_create(this.gerson_x + 40, this.gerson_y + 16, 'obj_gerson_teleport_generic'), function (other) {
            scr_script_delayed(this,  instance_destroy, 4);
        }, this) === EXIT) return;
        this.right_timer = - 1;
        break;
    }
    switch (this.top_timer) {
      case 0:
        scr_lerpvar(this,  "image_angle", this.image_angle, this.image_angle + 270, 30, 2, "out");
        if (W(instance_create(scr_get_box(4), scr_get_box(1) + 80, 'obj_battle_marker'), function (other) {
            this.shell_controlled = true;
            this.destroyoncomplete = true;
            this.sprite_index = 'spr_gerson_swing_down_new';
            this.depth = O('obj_growtangle').depth + 1;
            this.image_index = 0;
            this.image_speed = 0;
            this.image_alpha = 0;
            scr_darksize(this);
            scr_lerpvar(this,  "image_alpha", 0, 1, 4);
            scr_lerpvar(this,  "image_index", 0, 1, 6);
            scr_lerpvar(this,  "y", this.y, this.y - 240, 29, 2, "out");
            snd_play('snd_jump');
        }, this) === EXIT) return;
        break;
      case 29:
        if (W('obj_battle_marker', function (other) {
            if (this.sprite_index == 'spr_gerson_swing_down_new') {
                this.depth = O('obj_growtangle').depth - 1;
                scr_lerpvar(this,  "image_index", 2, 4, 2);
                scr_lerpvar(this,  "y", this.y, this.y + 80, 8, 2, "out");
            }
        }, this) === EXIT) return;
        break;
      case 30:
        scr_shakescreen(this);
        snd_play('snd_queen_punched_lower_heavy');
        snd_play('snd_rudebuster_swing');
        if (W(S.scr_sonic_boom(this,  270, 2), function (other) {
            this.y = this.y + 20;
        }, this) === EXIT) return;
        if (W(S.scr_sonic_boom(this,  270, 3), function (other) {
            this.y = this.y + 40;
        }, this) === EXIT) return;
        this.direction = 270;
        this.image_angle = 90;
        this.speed = 30;
        this.image_speed = 8;
        break;
      case 36:
        if (W('obj_battle_marker', function (other) {
            if (this.sprite_index == 'spr_gerson_swing_down_new') {
                scr_script_delayed(this,  instance_destroy, 4);
            }
        }, this) === EXIT) return;
        break;
    }
  }
  // check_bounds(dir): does the line from here towards dir cross the box (within 200 px)?
  checkBounds(dir) {
    const gt = O('obj_growtangle');
    for (let a = 0; a < 100; a++) {
      const cx = this.x + lengthdir_x(a * 2, dir), cy = this.y + lengthdir_y(a * 2, dir);
      if (cx > gt.x - 72 && cx < gt.x + 72 && cy > gt.y - 75 && cy < gt.y + 75) return true;
    }
    return false;
  }
}
defineObject('obj_gerson_shell_pinball', GersonShellPinball);

// obj_gerson_box_hit_controller (default sprite None, depth 0)
class GersonBoxHitController extends Instance {
  create() {
    this.timer = 15;
    this.con = choose(0, 1);
    this.count = 7;
    this.countmax = this.count;
    this.first = 0;
  }
  step() {
    this.timer = this.timer + 1;
    if (this.timer == 16 && this.countmax == this.count) {
        if (W('obj_hammer_of_justice_enemy', function (other) {
            this.visible = false;
        }, this) === EXIT) return;
        instance_create(O('obj_hammer_of_justice_enemy').x + 45, O('obj_hammer_of_justice_enemy').y + 45, 'obj_gerson_teleport');
    }
    if (this.timer == 25) {
        this.count = this.count - 1;
        if (this.count == - 1) {
            global.turntimer = 12;
            return;
        }
        if (this.con == 0) {
            this.leftgerson = instance_create(O('obj_growtangle').x - 180, O('obj_growtangle').y + 20, 'obj_gerson_teleport');
            this.leftgerson.type = 1;
        } else {
            this.rightgerson = instance_create(O('obj_growtangle').x + 180, O('obj_growtangle').y + 20, 'obj_gerson_teleport');
            this.rightgerson.type = 1;
            this.rightgerson.image_xscale = - 2;
        }
        if (this.con == 0) {
            this.con = 1;
        } else {
            this.con = 0;
        }
        if (irandom(100) < 50) {
            this.con = choose(0, 1);
        }
        this.timer = 0;
    }
    if (this.timer == 36) {
        this.gers = instance_create(O('obj_hammer_of_justice_enemy').x + 45, O('obj_hammer_of_justice_enemy').y + 45, 'obj_gerson_teleport');
        this.gers.type = 10;
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_box_hit_controller', GersonBoxHitController);

// obj_gerson_box_hit (default sprite spr_gerson_swing, depth 0)
class GersonBoxHit extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_swing';
  }
  create() {
    this.sprite_index = 'spr_gerson_swing';
    this.image_speed = 0;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.timer = 0;
    this.con = 0;
    this.type = 0;
  }
  step() {
    let slowbullet1, slowbullet2, slowbullet3, slowbullet4, side_x, dir, rand, aa;
    if (this.con == 0) {
        this.timer = this.timer + 1;
        if (this.timer > 16 && this.image_index < 5) {
            this.image_index = this.image_index + 0.5;
        }
        if (this.timer == 18) {
            snd_play('motor_upper_quick_mid');
        }
        if (this.timer == 20) {
            this.con = 1;
            this.timer = 0;
            snd_play('snd_queen_punched_lower');
            scr_shakeobj(this);
            slowbullet1 = irandom(8);
            slowbullet2 = slowbullet1 + 1;
            slowbullet3 = slowbullet1 + 5;
            if (slowbullet3 > 8) {
                slowbullet3 = slowbullet3 - 10;
            }
            slowbullet4 = slowbullet3 + 1;
            side_x = 80;
            dir = 0;
            if (this.image_xscale > 0) {
                dir = 180;
                if (W('obj_growtangle', function (other) {
                    this.shakeobj = instance_create(this.x, this.y, 'obj_shakedirectional');
                    this.shakeobj.target = this;
                    this.shakeobj.dir = 180;
                }, this) === EXIT) return;
            } else {
                side_x = - 80;
                if (W('obj_growtangle', function (other) {
                    this.shakeobj = instance_create(this.x, this.y, 'obj_shakedirectional');
                    this.shakeobj.target = this;
                    this.shakeobj.dir = 0;
                }, this) === EXIT) return;
            }
            rand = choose(1, 2, 3, 4, 5, 6);
            if (rand == 0) {
                this.i = 0;
                while (this.i < 10) {
                    this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * this.i, 'obj_box_hit_bullet');
                    if (W(this.bulletshot, function (other) {
                        scr_bullet_init(this);
                    }, this) === EXIT) return;
                    this.bulletshot.direction = dir;
                    this.bulletshot.speed = 5.6 + random(2);
                    this.bulletshot.friction = 0.14;
                    this.bulletshot.depth = this.depth - 1;
                    if (this.i == slowbullet1 || this.i == slowbullet2 || this.i == slowbullet3 || this.i == slowbullet4) {
                        this.bulletshot.speed = 2 + random(1.5);
                        this.bulletshot.friction = 0.08;
                    }
                    this.i = this.i + 1;
                }
            }
            if (rand == 1) {
                aa = 0;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7.2;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 6.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 6.4;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 6;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.4;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.4;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 6;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 6.4;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 6.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7.2;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
            }
            if (rand == 2) {
                aa = 0;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
            }
            if (rand == 3) {
                aa = 0;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7.6;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
            }
            if (rand == 4) {
                aa = 0;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
            }
            if (rand == 5) {
                aa = 0;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 6.2;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 6.2;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
            }
            if (rand == 6) {
                aa = 0;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4.6;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 4;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 3.4;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 5.4;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 5.5;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 5.6;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 6;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 6.4;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 6.8;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
                this.bulletshot = instance_create(O('obj_growtangle').x + side_x, O('obj_growtangle').y - 70 + 15 * aa, 'obj_box_hit_bullet');
                if (W(this.bulletshot, function (other) {
                    scr_bullet_init(this);
                }, this) === EXIT) return;
                this.bulletshot.direction = dir;
                this.bulletshot.speed = 7.2;
                this.bulletshot.friction = 0.14;
                this.bulletshot.depth = this.depth - 1;
                aa = aa + 1;
            }
        }
    }
    if (this.con == 1) {
        this.timer = this.timer + 1;
        if (this.timer == 6) {
            this.timer = 0;
            this.con = 2;
        }
    }
    if (this.con == 2) {
        this.timer = this.timer + 1;
        if (this.timer == 1) {
            if (this.image_xscale == - 2) {
                instance_create(this.x - 60, this.y + 20, 'obj_gerson_teleport');
            } else {
                instance_create(this.x + 60, this.y + 20, 'obj_gerson_teleport');
            }
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_gerson_box_hit', GersonBoxHit);

// obj_box_hit_bullet (default sprite spr_diamondbullet, depth 0, parent obj_regularbullet)
class BoxHitBullet extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_diamondbullet';
  }
  create() {
    let aa;
    super.create?.();
    this.timer = 0;
    this.active = 1;
    this.damage = 1;
    this.timermax = 37;
    this.anglespeed = 0;
    this.image_speed = 1;
    this.sprite_index = 'spr_gerson_star7';
    this.image_angle = irandom(360);
    this.image_xscale = 0;
    this.image_yscale = 0;
    aa = choose(5, 6, 7, 8, 9, 10);
    scr_script_delayed(this,  scr_lerpvar, 1, "image_xscale", 0, 1.5, aa);
    scr_script_delayed(this,  scr_lerpvar, 1, "image_yscale", 0, 1.5, aa);
  }
  draw() {
    if (this.sprite_index == 'spr_gerson_chevron') {
        this.image_angle = this.direction + 180;
    }
    draw_self(this);
    if (this.sprite_index == 'spr_gerson_chevron') {
        if (this.direction == 0) {
            draw_sprite_ext(this.sprite_index, this.image_index, this.x - 5 - this.timer / 4, this.y, this.image_xscale, this.image_yscale, this.direction + 180, this.image_blend, this.image_alpha);
            draw_sprite_ext(this.sprite_index, this.image_index, this.x - 10 - this.timer / 2, this.y, this.image_xscale, this.image_yscale, this.direction + 180, this.image_blend, this.image_alpha);
        }
        if (this.direction == 180) {
            draw_sprite_ext(this.sprite_index, this.image_index, this.x + 5 + this.timer / 4, this.y, this.image_xscale, this.image_yscale, this.direction + 180, this.image_blend, this.image_alpha);
            draw_sprite_ext(this.sprite_index, this.image_index, this.x + 10 + this.timer / 2, this.y, this.image_xscale, this.image_yscale, this.direction + 180, this.image_blend, this.image_alpha);
        }
    }
  }
  step() {
    this.timer = this.timer + 1;
    if (this.timer >= this.timermax) {
        this.image_alpha = this.image_alpha * 0.7;
    }
    if (this.image_alpha < 0.2) {
        this.active = 0;
    }
    this.image_angle = this.image_angle + 10;
    if (this.speed < 1) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_box_hit_bullet', BoxHitBullet);

// obj_gerson_box_rumble_controller (default sprite spr_gerson_idle, depth 0)
class GersonBoxRumbleController extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_idle';
  }
  create() {
    this.timer = 0;
    this.full_timer = 999;
    this.phase = 0;
    this.ending_counter = 0;
    this.bonk_side = - 1;
    this.anchor_x = O('obj_growtangle').x;
    this.anchor_y = O('obj_growtangle').y - 40;
    scr_darksize(this);
    this.sprite_index = 'spr_gerson_swing';
    this.image_index = 0;
    this.image_speed = 0;
    if (W('obj_hammer_of_justice_enemy', function (other) {
        this.visible = false;
    }, this) === EXIT) return;
    this.visible = false;
    this.my_flash = S.scr_oflash(this);
    this.my_flash.flashcolor = 0x000000;
    this.my_flash.flashspeed = this.my_flash.flashspeed * 0.5;
    scr_lerpvar(this,  "y", this.y, this.y + 80, 16, 2, "out");
    scr_lerpvar(this,  "image_index", this.image_index, 6, 12);
    snd_play('snd_boost');
    global.turntimer = 9999;
    // (box_bonk: a method in the GML; see boxBonk below)
  }
  draw() {
    draw_self(this);
  }
  step() {
    this.timer = this.timer + 1;
    if (this.phase == 0) {
        if (i_ex(this.my_flash) && this.timer % 3 == 0) {
            if (W(S.scr_oflash(this), function (other) {
                this.depth = other.depth + 1;
                this.flashcolor = 0x00ff00;
                this.target = - 4;
            }, this) === EXIT) return;
        }
        if (this.timer == 24) {
            this.phase = 1;
            this.timer = 30;
        }
    }
    if (this.phase == 1) {
        if (this.timer == 32) {
            this.boxBonk(this.bonk_side, 40);
            this.bonk_side = this.bonk_side * - 1;
            this.timer = 0;
        }
    }
    if (global.turntimer < 1) {
        if (W('obj_hammer_of_justice_enemy', function (other) {
            this.visible = true;
        }, this) === EXIT) return;
        instance_destroy(this);
    }
  }
  beginStep() {
    return;
  }
  endStep() {
    if (i_ex(this.my_flash)) {
        if (W(this.my_flash, function (other) {
            this.x = other.x;
            this.y = other.y;
        }, this) === EXIT) return;
    }
    if (W('obj_growtangle', function (other) {
        O('obj_heart').x = clamp(O('obj_heart').x, this.x - 71, this.x + 53);
        O('obj_heart').y = clamp(O('obj_heart').y, this.y - 71, this.y + 53);
    }, this) === EXIT) return;
  }
  // box_bonk(side[, time]): Gerson knocks the box sideways from `side`.
  boxBonk(side, time = 24) {
    for (const l of instancesOf('obj_lerpvar')) if (l.target === this) instance_destroy(l);
    const gt = O('obj_growtangle');
    this.x = gt.x - 120 * side;
    this.y = this.anchor_y - 30;
    scr_lerpvar(this, 'image_index', 0, 6, 4);
    scr_lerpvar(this, 'y', this.y, this.y + choose(40, -40), 8, 2, 'out');
    if (side == -1) {
      this.image_xscale = Math.abs(this.image_xscale);
      this.x -= 60;
    } else {
      this.image_xscale = -Math.abs(this.image_xscale);
      this.x += 60;
    }
    this.my_flash = S.scr_oflash(this);
    this.my_flash.flashcolor = 0x00ff00;
    this.new_x = this.anchor_x + (100 + irandom(20)) * side;
    this.new_y = this.anchor_y + irandom_range(-40, 40);
    snd_play('snd_queen_punched_lower');
    const self = this;
    for (const b of instancesOf('obj_growtangle')) {
      scr_lerpvar(b, 'x', b.x, self.new_x, time + 8, 2, 'out');
      scr_lerpvar(b, 'y', b.y, self.new_y, time + 8, 2, 'out');
    }
  }
}
defineObject('obj_gerson_box_rumble_controller', GersonBoxRumbleController);

// obj_gerson_hammer_bro_attack_controller (default sprite spr_gerson_hammer_throw, depth 0)
class GersonHammerBroAttackController extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_hammer_throw';
  }
  alarm0() {
    this.count = 0;
    if (this.pattern == 0) {
        this.pattern = choose(1, 2);
    } else if (this.pattern == 1) {
        this.pattern = choose(0, 2);
    } else if (this.pattern == 2) {
        this.pattern = choose(0, 1);
    }
    if (this.pattern == 1 || this.pattern == 2) {
        this.forcepattern = this.forcepattern + 1;
    } else {
        this.forcepattern = 0;
    }
    if (this.forcepattern == 3) {
        this.forcepattern = 0;
        this.pattern = 0;
    }
    if (this.pattern > 0) {
        this.timer = - 20;
        this.throwsframes = 1;
        if (this.forcepattern > 1) {
            this.timer = (5 + irandom(5)) * - 1;
            this.throwsframes = 1;
        }
    } else {
        this.timer = 0;
        this.throwsframes = 6;
    }
  }
  cleanUp() {
    if (W('obj_hammer_of_justice_enemy', function (other) {
        this.visible = true;
    }, this) === EXIT) return;
  }
  create() {
    this.timer = 0;
    this.con = 0;
    this.count = 0;
    this.pausecount = 10;
    this.throwsframes = 5;
    this.delay = 0;
    this.forcepattern = 0;
    this.startx = this.x;
    this.starty = this.y;
    this.targetx = this.x;
    this.targety = this.y;
    this.con2 = 0;
    this.fakey = - 15;
    this.jumpcon = 0;
    this.jumptimer = 0;
    this.jumptimermax = 30;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_speed = 0;
    this.lerpdowntimer = 0;
    this.attackduration = 240;
    if (W('obj_hammer_of_justice_enemy', function (other) {
        this.visible = false;
    }, this) === EXIT) return;
    this.pattern = choose(0, 1, 2);
    this.timerb = 0;
    this.endtimer = 0;
  }
  draw() {
    draw_self(this);
  }
  user0() {
    let rep, a;
    this.timer = this.timer + 1;
    if (this.timer == this.throwsframes) {
        snd_stop('snd_smallswing');
        snd_play_pitch('snd_smallswing', 1 + random(0.3));
        rep = 1;
        a = 0;
        for (let _r44 = 0, _n44 = (rep); _r44 < _n44; _r44++) {
            this.bulletshot = instance_create(this.x + 100, this.y + 90, 'obj_gerson_hammer_bro_hammer');
            if (W(this.bulletshot, function (other) {
                scr_bullet_init(this);
            }, this) === EXIT) return;
            this.bulletshot.active = 1;
            this.bulletshot.image_xscale = 2;
            this.bulletshot.image_yscale = 2;
            this.bulletshot.fakehspeed = - 2.8 - random(4);
            if (this.y < this.ystart + 50) {
                this.bulletshot.fakehspeed = - 2 - random(4);
            }
            this.bulletshot.fakevspeed = - 14;
            this.bulletshot.gravity_direction = 270;
            this.bulletshot.fakegravity = 0.6;
            this.bulletshot.depth = this.depth - 1;
            this.bulletshot.target = 3;
            this.bulletshot.damage = 1;
            this.bulletshot.grazed = 0;
            if (this.pattern == 1) {
                this.bulletshot.fakehspeed = - 2.8 - this.count / 3.5;
            }
            if (this.pattern == 2) {
                this.bulletshot.fakehspeed = - 6.8 + this.count / 3;
            }
            if (this.pattern == 0 && (this.count == 2 || this.count == 4 || this.count == 6) || this.count == 2 || this.count == 4) {
                if (O('obj_heart').x < O('obj_growtangle').x - 37.5) {
                    this.bulletshot.fakehspeed = - 4.8 - random(2);
                    continue;
                }
                if (O('obj_heart').x > O('obj_growtangle').x + 37.5) {
                    this.bulletshot.fakehspeed = - 2 - random(1.5);
                    continue;
                }
                if (O('obj_heart').x < O('obj_growtangle').x) {
                    this.bulletshot.fakehspeed = - 3.7 - random(1.5);
                    continue;
                }
                if (O('obj_heart').x > O('obj_growtangle').x) {
                    this.bulletshot.fakehspeed = - 2.7 - random(2.2);
                }
            }
        }
        this.image_index = 1;
    }
    if (this.timer == this.throwsframes * 2) {
        this.image_index = 0;
        this.count = this.count + 1;
        if (this.pausecount >= this.count) {
            this.timer = - 10;
            this.count = 0;
            this.throwsframes = 1;
            this.alarm ??= []; this.alarm[0] = 20;
        } else {
            this.timer = 0;
        }
    }
    if (this.vspeed == 0) {
        this.jumptimer = this.jumptimer + 1;
        if (this.jumptimer == this.jumptimermax) {
        }
    }
    if (this.vspeed > 0 && this.y >= this.ystart + 92) {
        this.vspeed = 0;
        this.gravity = 0;
        this.y = this.ystart + 100;
    }
    this.lerpdowntimer = this.lerpdowntimer + 1;
    if (this.lerpdowntimer < 20) {
        this.y = lerp(this.y, this.ystart + 100, this.lerpdowntimer / 20);
    }
    if (this.lerpdowntimer >= this.attackduration - 20) {
        this.y = lerp(this.y, this.ystart, (this.lerpdowntimer - (this.attackduration - 20)) / 20);
    }
    if (global.turntimer < 1 || this.lerpdowntimer == this.attackduration) {
        instance_destroy(this);
    }
  }
  step() {
    let rep, a;
    this.timer = this.timer + 1;
    if (this.timer == this.throwsframes && global.turntimer > 30 && this.lerpdowntimer < this.attackduration - 20) {
        snd_stop('snd_smallswing');
        snd_play_pitch('snd_smallswing', 1 + random(0.3));
        rep = 1;
        a = 0;
        for (let _r56 = 0, _n56 = (rep); _r56 < _n56; _r56++) {
            this.bulletshot = instance_create(this.x + 100 - 42, this.y + 90 - 86, 'obj_gerson_hammer_bro_hammer');
            if (W(this.bulletshot, function (other) {
                scr_bullet_init(this);
            }, this) === EXIT) return;
            this.bulletshot.active = 1;
            this.bulletshot.image_xscale = 2;
            this.bulletshot.image_yscale = 2;
            this.bulletshot.fakehspeed = - 2 - random(4.8);
            this.bulletshot.fakevspeed = - 14;
            this.bulletshot.gravity_direction = 270;
            this.bulletshot.fakegravity = 0.6;
            this.bulletshot.depth = this.depth - 1;
            this.bulletshot.target = 3;
            this.bulletshot.damage = 1;
            this.bulletshot.grazed = 0;
            this.bulletshot.grazepoints = 2.5;
            if (this.y < this.ystart + 50) {
                this.bulletshot.fakevspeed = - 10;
            }
            if (this.pattern == 1) {
                this.bulletshot.fakehspeed = - 2.8 - this.count / 4;
            }
            if (this.pattern == 2) {
                this.bulletshot.fakehspeed = - 6.8 + this.count / 3;
            }
            if (this.count == 2 || this.count == 4) {
                if (O('obj_heart').x < O('obj_growtangle').x - 37.5) {
                    this.bulletshot.fakehspeed = - 4.8 - random(2);
                    continue;
                }
                if (O('obj_heart').x > O('obj_growtangle').x + 37.5) {
                    this.bulletshot.fakehspeed = - 2 - random(1.5);
                    continue;
                }
                if (O('obj_heart').x < O('obj_growtangle').x) {
                    this.bulletshot.fakehspeed = - 3.7 - random(1.5);
                    continue;
                }
                if (O('obj_heart').x > O('obj_growtangle').x) {
                    this.bulletshot.fakehspeed = - 2.7 - random(2.2);
                }
            }
        }
        if (this.throwsframes != 1) {
            this.bulletshot = instance_create(this.x + 100 - 42, this.y + 90 - 86, 'obj_gerson_hammer_bro_hammer');
            if (W(this.bulletshot, function (other) {
                scr_bullet_init(this);
            }, this) === EXIT) return;
            this.bulletshot.active = 1;
            this.bulletshot.image_xscale = 2;
            this.bulletshot.image_yscale = 2;
            this.bulletshot.fakehspeed = - 2 - random(4.8);
            this.bulletshot.fakevspeed = - 12 - random(4);
            this.bulletshot.gravity_direction = 270;
            this.bulletshot.fakegravity = 0.6;
            this.bulletshot.depth = this.depth - 1;
            this.bulletshot.target = 3;
            this.bulletshot.damage = 1;
            this.bulletshot.grazed = 0;
            this.bulletshot.grazepoints = 2.5;
            if (this.y < this.ystart + 50) {
                this.bulletshot.fakevspeed = - 10;
            }
            if (this.count == 2 || this.count == 4) {
                if (O('obj_heart').x < O('obj_growtangle').x - 37.5) {
                    this.bulletshot.fakehspeed = - 4.8 - random(2);
                } else if (O('obj_heart').x > O('obj_growtangle').x + 37.5) {
                    this.bulletshot.fakehspeed = - 2 - random(1.5);
                } else if (O('obj_heart').x < O('obj_growtangle').x) {
                    this.bulletshot.fakehspeed = - 3.7 - random(1.5);
                } else if (O('obj_heart').x > O('obj_growtangle').x) {
                    this.bulletshot.fakehspeed = - 2.7 - random(2.2);
                }
            }
            this.bulletshot = instance_create(this.x + 100 - 42, this.y + 90 - 86, 'obj_gerson_hammer_bro_hammer');
            if (W(this.bulletshot, function (other) {
                scr_bullet_init(this);
            }, this) === EXIT) return;
            this.bulletshot.active = 1;
            this.bulletshot.image_xscale = 2;
            this.bulletshot.image_yscale = 2;
            this.bulletshot.fakehspeed = - 2 - random(4.8);
            this.bulletshot.fakevspeed = - 12 - random(4);
            this.bulletshot.gravity_direction = 270;
            this.bulletshot.fakegravity = 0.6;
            this.bulletshot.depth = this.depth - 1;
            this.bulletshot.target = 3;
            this.bulletshot.damage = 1;
            this.bulletshot.grazed = 0;
            this.bulletshot.grazepoints = 2.5;
            if (this.y < this.ystart + 50) {
                this.bulletshot.fakevspeed = - 10;
            }
            if (this.count == 2 || this.count == 4) {
                if (O('obj_heart').x < O('obj_growtangle').x - 37.5) {
                    this.bulletshot.fakehspeed = - 4.8 - random(2);
                } else if (O('obj_heart').x > O('obj_growtangle').x + 37.5) {
                    this.bulletshot.fakehspeed = - 2 - random(1.5);
                } else if (O('obj_heart').x < O('obj_growtangle').x) {
                    this.bulletshot.fakehspeed = - 3.7 - random(1.5);
                } else if (O('obj_heart').x > O('obj_growtangle').x) {
                    this.bulletshot.fakehspeed = - 2.7 - random(2.2);
                }
            }
        }
        this.image_index = 1;
        this.timerb = 3;
    }
    if (this.timerb > 0) {
        this.timerb = this.timerb - 1;
    }
    if (this.timerb == 1 && this.image_index == 1) {
        this.image_index = 2;
    }
    if (this.timer == this.throwsframes * 2) {
        this.image_index = 0;
        this.count = this.count + 1;
        if (this.pausecount <= this.count) {
            this.count = 0;
            if (this.pattern > 0) {
                this.alarm ??= []; this.alarm[0] = 5;
                this.timer = - 23;
            } else {
                this.timer = - 11;
                this.alarm ??= []; this.alarm[0] = 30;
            }
        } else {
            this.timer = 0;
        }
    }
    if (this.con == 0 && this.pattern == 0) {
        this.jumptimer = this.jumptimer + 1;
        if (this.jumptimer == this.jumptimermax) {
            if (this.con2 == 0) {
                this.startx = this.x;
                this.starty = this.y;
                this.targetx = this.x - 50;
                this.targety = this.y;
                this.con2 = 1;
            } else {
                this.startx = this.x;
                this.starty = this.y;
                this.targetx = this.x + 50;
                this.targety = this.y;
                this.con2 = 0;
            }
            this.jumptimer = 0;
            this.jumptimermax = 30 + irandom(12);
            this.con = 1;
            snd_play_pitch('snd_jump', 2);
        }
    }
    if (this.con == 1) {
        this.jumptimer = this.jumptimer + 1;
        this.fakey = - 15 + Math.sin(this.jumptimer / 7.4) * 100 * - 1;
        this.x = lerp(this.startx, this.targetx, this.jumptimer / 24);
        this.y = lerp(this.starty, this.targety, this.jumptimer / 24);
        this.y = this.y + this.fakey;
        if (this.jumptimer == 24) {
            this.y = this.starty;
            this.con = 0;
            this.jumptimer = 0;
        }
    }
    if (this.vspeed > 0 && this.y >= this.ystart + 84 && this.endtimer == 0) {
        this.vspeed = 0;
        this.gravity = 0;
        this.y = this.ystart + 92;
    }
    if (this.vspeed > 0 && this.y >= this.ystart - 10 && this.endtimer != 0) {
        this.vspeed = 0;
        this.gravity = 0;
        this.y = this.ystart;
        instance_destroy(this);
    }
    this.lerpdowntimer = this.lerpdowntimer + 1;
    if (this.lerpdowntimer < 20) {
        if (this.lerpdowntimer == 1) {
            snd_play_pitch('snd_jump', 2);
            this.vspeed = - 14;
            this.gravity = 2;
        }
    }
    if (this.lerpdowntimer >= this.attackduration - 20 && this.con == 0) {
        this.image_index = 0;
        if (global.turntimer > 20) {
            global.turntimer = 20;
        }
        this.endtimer = this.endtimer + 1;
        if (this.endtimer == 1) {
            snd_play_pitch('snd_jump', 2);
            this.vspeed = - 20.6;
            this.gravity = 2;
        }
    }
    if (global.turntimer < 1) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_hammer_bro_attack_controller', GersonHammerBroAttackController);

// obj_gerson_hammer_bro_hammer (default sprite spr_gerson_hammer_trowable4, depth 0, parent obj_regularbullet)
class GersonHammerBroHammer extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_hammer_trowable4';
  }
  alarm0() {
    this.gravity_direction = 270;
    this.gravity = 2;
    snd_play_pitch('snd_fall', 2);
  }
  create() {
    super.create?.();
    this.con = 0;
    this.timer = 0;
    this.anim_index = 0;
    this.fakehspeed = 0;
    this.fakevspeed = 0;
    this.fakegravity = 0;
    this.gigahammer = false;
    this.drop = false;
    this.true_drop = false;
  }
  user5() {
    let a;
    a = (global.hp[2] - 30) / 250;
    if (a < 0) {
        a = 0;
    }
    this.damage = lerp(12, 90, a);
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
    if (!T(this.gigahammer)) {
        if (this.y > O('obj_growtangle').y + 120) {
            this.image_alpha = this.image_alpha - 0.3;
        }
        if (this.image_alpha < 0.8) {
            this.active = 0;
        }
    }
    if (this.image_alpha < 0) {
        instance_destroy(this);
    }
    this.anim_index = this.anim_index + 1;
    if (T(this.gigahammer)) {
        if (this.fakevspeed < 0) {
            this.image_angle = this.image_angle + 60;
        } else {
            this.image_angle = 202.5;
        }
    } else if (this.anim_index == 3) {
        this.image_angle = this.image_angle + 40;
        this.anim_index = 0;
    }
    if (! (this.gigahammer && this.fakevspeed >= 0)) {
        this.x = this.x + this.fakehspeed;
        this.y = this.y + this.fakevspeed;
        this.fakevspeed = this.fakevspeed + this.fakegravity;
    }
    if (T(this.gigahammer) && this.fakevspeed >= 0 && !T(this.drop)) {
        this.hspeed = 0;
        this.vspeed = 0;
        this.drop = true;
        this.fakevspeed = 0;
        this.fakehspeed = 0;
        this.fakegravity = 0;
        this.gravity = 0;
        this.alarm ??= []; this.alarm[0] = 12;
    }
    if (this.fakevspeed > 11) {
        this.fakevspeed = 11;
    }
    if (!T(this.drop)) {
        if (this.y < cameray() + 20) {
            this.x = this.x + 1;
            this.y = this.y + 2;
        }
    }
  }
  endStep() {
    if (T(this.gigahammer)) {
        if (this.y > O('obj_growtangle').y + 20 && !T(this.true_drop)) {
            if (W('obj_growtangle', function (other) {
                this.y = this.y + (other.y - other.yprevious);
                this.y = Math.min(this.y, S.__view_get(1, 0) + 220);
                if (W('obj_heart', function (other) {
                    this.y = this.y + (O('obj_growtangle').y - O('obj_growtangle').yprevious);
                }, this) === EXIT) return EXIT;
            }, this) === EXIT) return;
        }
        if (!T(this.true_drop) && this.y > S.__view_get(1, 0) + 220) {
            this.true_drop = true;
            this.vspeed = - 16;
            snd_play('snd_impact');
            snd_play_pitch('snd_metal_hit_reverb', 1);
            scr_shakescreen(this);
        }
        if (T(this.true_drop) && this.y > S.__view_get(1, 0) + 720) {
            scr_shakescreen(this);
            snd_play_pitch('snd_glassbreak', 0.5);
            snd_play_pitch('snd_explosion_firework', 0.75);
            instance_destroy(this);
        }
        if (this.image_alpha < 0.8) {
            this.active = 0;
        }
    }
  }
}
defineObject('obj_gerson_hammer_bro_hammer', GersonHammerBroHammer);

