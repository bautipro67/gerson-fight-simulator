// Small Hammer of Justice objects (machine-translated from the Chapter 4 GML by tools/gen_attacks.sh; edit tools/postfix.py, not this file)
/* eslint-disable */
import {
  Instance, S, d3d_set_fog, defineObject, draw_self, draw_sprite_ext, draw_surface, draw_surface_ext, global, instance_create, instance_create_depth, instance_destroy, instance_exists, irandom, lengthdir_x, lengthdir_y, lerp, merge_color, place_meeting, point_direction, random, snd_play, snd_stop, surface_create, surface_exists, surface_free, surface_reset_target, surface_set_target,
} from '../rt.js?v=20261119135935';
import {
  cameraheight, camerax, cameray, draw_sprite_ext_centerscale, i_ex, scr_afterimage, scr_approach, scr_get_box, snd_play_pitch,
} from '../common.js?v=20261119135935';
import {
  EXIT, O, P, T, W,
} from '../gml.js?v=20261119135935';

// obj_gerson_green_switch (default sprite spr_gerson_swing, depth 0)
class GersonGreenSwitch extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_swing';
  }
  cleanUp() {
    if (W('obj_hammer_of_justice_enemy', function (other) {
        this.image_alpha = 1;
    }, this) === EXIT) return;
    if (W('obj_sound_of_justice_enemy', function (other) {
        this.image_alpha = 1;
    }, this) === EXIT) return;
  }
  create() {
    this.timer = 0;
    this.timer2 = 0;
    this.type = 0;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_speed = 0.3333333333333333;
    if (i_ex('obj_sound_of_justice_enemy')) {
        this.image_blend = 0x000000;
    }
    if (W('obj_hammer_of_justice_enemy', function (other) {
        this.image_alpha = 0;
    }, this) === EXIT) return;
    if (W('obj_sound_of_justice_enemy', function (other) {
        this.image_alpha = 0;
    }, this) === EXIT) return;
    S.scr_oflash(this);
    snd_play('snd_boost');
  }
  draw() {
    draw_self(this);
  }
  step() {
    if (this.image_index > 4) {
        if (this.timer < 1) {
            this.chev = instance_create(this.x - 15, this.y, 'obj_gerson_green_chevron');
            this.chev.image_blend = merge_color(0x00ff00, 0x000000, 0.2 * this.timer);
        }
        this.timer = this.timer + 1;
    }
    if (this.image_index <= 3 && this.image_alpha == 1) {
        this.y = lerp(this.y, cameray() + cameraheight() / 2, 0.3);
        if (i_ex(this._oflash)) {
            this._oflash.y = this.y;
        }
    }
    if (this.image_index > 6.5) {
        if (W('obj_hammer_of_justice_enemy', function (other) {
            this.image_alpha = 1;
        }, this) === EXIT) return;
        if (W('obj_sound_of_justice_enemy', function (other) {
            this.image_alpha = 1;
        }, this) === EXIT) return;
        this.image_alpha = 0;
        this.image_speed = 0;
        this.timer2 = this.timer2 + 1;
        if (this.timer2 > 3) {
            this.y = lerp(this.y, this.ystart, 0.4);
        }
        if (i_ex('obj_hammer_of_justice_enemy')) {
            O('obj_hammer_of_justice_enemy').y = this.y;
        }
        if (i_ex('obj_sound_of_justice_enemy')) {
            O('obj_sound_of_justice_enemy').y = this.y;
        }
        if (this.timer2 == 10) {
            if (i_ex('obj_hammer_of_justice_enemy')) {
                O('obj_hammer_of_justice_enemy').y = O('obj_hammer_of_justice_enemy').ystart;
            }
            if (i_ex('obj_sound_of_justice_enemy')) {
                O('obj_sound_of_justice_enemy').y = O('obj_sound_of_justice_enemy').ystart;
            }
            instance_destroy(this);
        }
    }
    if (this.image_index > 3 && this.type == 1) {
        this.image_index = 3;
    }
  }
}
defineObject('obj_gerson_green_switch', GersonGreenSwitch);

// obj_gerson_green_chevron (default sprite spr_gerson_chevron2, depth 0)
class GersonGreenChevron extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_chevron2';
  }
  create() {
    this.timer = 0;
    this.con = 0;
    this.image_speed = 0;
    this.image_index = 5;
    this.direction = 180;
    this.speed = 12;
    this.friction = - 2;
  }
  draw() {
    scr_afterimage(this);
    this.afterimage.fadeSpeed = 0.2;
    if (this.con == 0 && i_ex('obj_heart') && this.x < O('obj_heart').x) {
        if (global.turntimer < 990 && !T(i_ex('obj_spearblocker'))) {
            snd_play('snd_smallswing');
        }
        instance_create(this.x, this.y, 'obj_spearblocker');
        this.con = 1;
    }
    this.timer = this.timer + 1;
    if (this.timer == 100) {
        instance_destroy(this);
    }
    draw_self(this);
  }
}
defineObject('obj_gerson_green_chevron', GersonGreenChevron);

// obj_gerson_progress_star (default sprite spr_gerson_progress_star, depth 0)
class GersonProgressStar extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_progress_star';
  }
  create() {
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_speed = 0;
    this.timer = 0;
    this.delay = 0;
  }
  draw() {
    if (this.delay > 0) {
        this.delay = this.delay - 1;
        return;
    }
    this.timer = this.timer + 1;
    if (this.timer >= 20) {
        draw_sprite_ext('spr_gerson_progress_star2', 2, this.x, this.y + 3, 0.17, this.image_yscale - 0.4, this.image_angle, 0xffffff, this.image_alpha);
        this.image_yscale = this.image_yscale + 0.5;
    } else {
        draw_self(this);
    }
    if (this.timer < 3) {
        d3d_set_fog(true, 0xffffff, 0, 1);
        draw_self(this);
        d3d_set_fog(false, 0x000000, 0, 0);
        this.vspeed = 1;
        this.gravity_direction = 270;
        this.gravity = - 0.4;
    }
    if (this.timer > 10 && this.image_xscale > 0.5) {
        this.image_xscale = this.image_xscale - 0.2;
    }
    if (this.timer > 19) {
        this.image_alpha = this.image_alpha - 0.1;
    }
    if (this.timer == 29) {
        instance_destroy(this);
    }
    if (this.timer == 1) {
        this.x = this.xstart + 2;
    }
    if (this.timer == 2) {
        this.x = this.xstart - 1;
    }
    if (this.timer == 3) {
        this.x = this.xstart;
    }
  }
  user0() {
    if (this.delay > 0) {
        this.delay = this.delay - 1;
        return;
    }
    this.timer = this.timer + 1;
    if (this.timer >= 25) {
        draw_sprite_ext('spr_gerson_progress_star', 2, this.x, this.y, 0.17, this.image_yscale - 0.4, this.image_angle, 0xffffff, this.image_alpha);
        this.image_yscale = this.image_yscale + 0.2;
    } else {
        draw_self(this);
    }
    if (this.timer < 3) {
        d3d_set_fog(true, 0xffffff, 0, 1);
        draw_self(this);
        d3d_set_fog(false, 0x000000, 0, 0);
        this.vspeed = 1;
        this.gravity_direction = 270;
        this.gravity = - 0.2;
    }
    if (this.timer > 10 && this.image_xscale > 0.5) {
        this.image_xscale = this.image_xscale - 0.1;
    }
    if (this.timer > 29) {
        this.image_alpha = this.image_alpha - 0.1;
    }
    if (this.timer == 39) {
        instance_destroy(this);
    }
    if (this.timer == 1) {
        this.x = this.xstart + 2;
    }
    if (this.timer == 2) {
        this.x = this.xstart - 1;
    }
    if (this.timer == 3) {
        this.x = this.xstart;
    }
  }
}
defineObject('obj_gerson_progress_star', GersonProgressStar);

// obj_gerson_hair2 (default sprite spr_gerson_hair_strand, depth 0)
class GersonHair2 extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_hair_strand';
  }
  create() {
    this.image_alpha = 5.3;
    this.image_xscale = 3;
    this.image_yscale = 1;
  }
  draw() {
    draw_self(this);
  }
  step() {
    this.image_alpha = this.image_alpha - 0.05;
    if (this.hspeed < 0) {
        this.image_angle = this.image_angle - 0.5;
    } else {
        this.image_angle = this.image_angle + 0.5;
    }
  }
}
defineObject('obj_gerson_hair2', GersonHair2);

// obj_susie_heal_projectile (default sprite spr_heal_beam_small, depth 0)
class SusieHealProjectile extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_heal_beam_small';
  }
  cleanUp() {
    if (W(this.light, function (other) {
        instance_destroy(this);
    }, this) === EXIT) return;
  }
  create() {
    this.image_speed = 0.5;
    this.light = instance_create(this.x + 50, this.y + 9, 'obj_gerson_darkness_overlay_light');
    this.light.image_xscale = 4;
    this.light.image_yscale = 4;
  }
  step() {
    this.light.x = this.x + 50;
    this.light.y = this.y + 9;
  }
}
defineObject('obj_susie_heal_projectile', SusieHealProjectile);

// obj_gerson_animation (default sprite None, depth 0)
class GersonAnimation extends Instance {
  create() {
    this.timer = 0;
    this.spinindex = 0;
    this.image_speed = 0;
  }
  draw() {
    this.timer = this.timer + 1;
    if (this.timer == 2) {
        instance_destroy(this);
        return;
    }
    draw_sprite_ext('spr_bounce_shell_idle', this.spinindex, this.x, this.y, this.image_xscale, this.image_xscale, this.image_angle, this.image_blend, this.image_alpha);
    draw_sprite_ext('spr_bounce_shell_idle_color', this.spinindex, this.x, this.y, this.image_xscale, this.image_xscale, this.image_angle, 0xffff00, this.image_alpha);
  }
}
defineObject('obj_gerson_animation', GersonAnimation);

// obj_gerson_fakeheart (default sprite spr_dodgeheart, depth 0)
class GersonFakeheart extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_dodgeheart';
  }
  cleanUp() {
    if (global.turntimer <= 0) {
        global.inv = - 1;
    }
    if (instance_exists('obj_heart')) {
        O('obj_heart').image_alpha = 1;
        O('obj_heart').x = this.x;
        O('obj_heart').y = this.y;
    }
  }
  create() {
    global.inv = 300;
    this.con = 0;
    this.directionhit = 260;
    this.flashtimer = 0;
    this.boxhittimer = 0;
    this.dusttimer = 0;
    this.depth = O('obj_heart').depth;
    O('obj_heart').image_alpha = 0;
    this.speed = 20;
    this.friction = 0.5;
  }
  draw() {
    let _alpha;
    if (global.turntimer < 0 || !T(i_ex('obj_heart'))) {
        instance_destroy(this);
        return;
    }
    this.xx = S.scr_orbitx(this.x + 9, this.y + 9, this.x, this.y, this.image_angle);
    this.yy = S.scr_orbity(this.x + 9, this.y + 9, this.x, this.y, this.image_angle);
    if (this.image_xscale != 1 || this.image_yscale != 1) {
        draw_sprite_ext_centerscale(this,  this.sprite_index, O('obj_heart').image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, 16777215, this.image_alpha);
    } else {
        draw_sprite_ext(this.sprite_index, O('obj_heart').image_index, this.xx, this.yy, this.image_xscale, this.image_yscale, this.image_angle, 0xffffff, this.image_alpha);
    }
    if (this.flashtimer > 0) {
        this.flashtimer = this.flashtimer - 1;
        _alpha = S.scr_wrap(this.flashtimer / 10, 0, 1);
        d3d_set_fog(true, 0xffffff, 0, 1);
        if (this.image_xscale != 1 || this.image_yscale != 1) {
            draw_sprite_ext_centerscale(this,  this.sprite_index, O('obj_heart').image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.image_angle, 16777215, _alpha);
        } else {
            draw_sprite_ext(this.sprite_index, O('obj_heart').image_index, this.xx, this.yy, this.image_xscale, this.image_yscale, this.image_angle, 0xffffff, _alpha);
        }
        d3d_set_fog(false, 0x000000, 0, 0);
    }
  }
  endStep() {
    let _box_left, _box_right, _box_top, _box_bottom, _shakeobj;
    if (global.turntimer < 0 || !T(i_ex('obj_heart'))) {
        instance_destroy(this);
        return;
    }
    if (this.con == 0) {
        this.direction = this.directionhit;
        this.flashtimer = 61;
        this.con = 1;
    }
    if (this.con == 1) {
        if (this.speed < 4) {
            this.image_angle = lerp(this.image_angle, 0, 0.3);
        } else {
            this.image_angle = this.image_angle + this.speed * 2;
            if (this.image_angle > 360) {
                this.image_angle = this.image_angle - 360;
            }
            this.dusttimer = this.dusttimer + 1;
            if (this.dusttimer % 6 == 0) {
                this.inst = instance_create_depth(this.x, this.y, this.depth + 1, 'obj_animation');
                this.inst.sprite_index = 'spr_dust2';
                this.inst.image_index = 2;
                this.inst.image_speed = 0.25;
                this.inst.image_xscale = 1.1 + random(0.4);
                this.inst.image_yscale = 1.1 + random(0.4);
            }
        }
        _box_left = scr_get_box(2);
        _box_right = scr_get_box(0);
        _box_top = scr_get_box(1);
        _box_bottom = scr_get_box(3);
        if (i_ex('obj_gerson_growtangle')) {
            _box_left = O('obj_gerson_growtangle').x1;
            _box_right = O('obj_gerson_growtangle').x2;
            _box_top = O('obj_gerson_growtangle').y1;
            _box_bottom = O('obj_gerson_growtangle').y2;
        }
        this.boxhittimer = this.boxhittimer - 1;
        if (this.boxhittimer <= 0 && !T(i_ex('obj_gerson_growtangle')) && (this.x < _box_left || this.x > _box_right - 20 || this.y < _box_top || this.y > _box_bottom - 20)) {
            this.boxhittimer = 3;
            snd_play('snd_impact');
            snd_play('snd_damage');
            if (this.x < _box_left) {
                if (this.direction > 180) {
                    this.direction = 315;
                } else {
                    this.direction = 45;
                }
                this.x = _box_left + 20;
                if (W('obj_growtangle', function (other) {
                    _shakeobj = instance_create(this.x, this.y, 'obj_shakeobj');
                    _shakeobj.target = this;
                    if (W(_shakeobj, function (other) {
                        this.user0?.();
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W('obj_gerson_growtangle', function (other) {
                    _shakeobj = instance_create(this.x, this.y, 'obj_shakeobj');
                    _shakeobj.target = this;
                    if (W(_shakeobj, function (other) {
                        this.user0?.();
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
            }
            if (this.x > _box_right - 20) {
                if (this.direction > 0 && this.direction < 90) {
                    this.direction = 135;
                } else {
                    this.direction = 225;
                }
                this.x = _box_right - 60;
                if (W('obj_growtangle', function (other) {
                    _shakeobj = instance_create(this.x, this.y, 'obj_shakeobj');
                    _shakeobj.target = this;
                    if (W(_shakeobj, function (other) {
                        this.user0?.();
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W('obj_gerson_growtangle', function (other) {
                    _shakeobj = instance_create(this.x, this.y, 'obj_shakeobj');
                    _shakeobj.target = this;
                    if (W(_shakeobj, function (other) {
                        this.user0?.();
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
            }
            if (this.y < _box_top) {
                if (this.direction > 90) {
                    this.direction = 225;
                } else {
                    this.direction = 315;
                }
                this.y = _box_top + 20;
                if (W('obj_growtangle', function (other) {
                    _shakeobj = instance_create(this.x, this.y, 'obj_shakeobj_y');
                    _shakeobj.target = this;
                    if (W(_shakeobj, function (other) {
                        this.user0?.();
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W('obj_gerson_growtangle', function (other) {
                    _shakeobj = instance_create(this.x, this.y, 'obj_shakeobj_y');
                    _shakeobj.target = this;
                    if (W(_shakeobj, function (other) {
                        this.user0?.();
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
            }
            if (this.y > _box_bottom - 20) {
                if (this.direction > 270) {
                    this.direction = 45;
                } else {
                    this.direction = 135;
                }
                this.y = _box_bottom - 40;
                if (W('obj_growtangle', function (other) {
                    _shakeobj = instance_create(this.x, this.y, 'obj_shakeobj_y');
                    _shakeobj.target = this;
                    if (W(_shakeobj, function (other) {
                        this.user0?.();
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
                if (W('obj_gerson_growtangle', function (other) {
                    _shakeobj = instance_create(this.x, this.y, 'obj_shakeobj_y');
                    _shakeobj.target = this;
                    if (W(_shakeobj, function (other) {
                        this.user0?.();
                    }, this) === EXIT) return EXIT;
                }, this) === EXIT) return;
            }
        }
        if (this.speed <= 0) {
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_gerson_fakeheart', GersonFakeheart);

// obj_gerson_landing_dust (default sprite spr_gerson_landing_dust, depth 0)
class GersonLandingDust extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_landing_dust';
  }
  animationEnd() {
    instance_destroy(this);
  }
}
defineObject('obj_gerson_landing_dust', GersonLandingDust);

// obj_gerson_item_throw (default sprite spr_sparestar_anim, depth 0)
class GersonItemThrow extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_sparestar_anim';
  }
  create() {
    this.timer = 0;
    this.speed = 4;
    this.direction = 30;
    this.image_speed = 0.25;
    this.image_index = 0;
    this.image_xscale = 2.5;
    this.image_yscale = 2.5;
  }
  step() {
    this.inst = instance_create_depth(this.x + 1, this.y + 1, this.depth + 1, 'obj_gerson_item_throw_particle');
    if (this.image_index == 5) {
        if (this.image_angle == 0) {
            this.image_angle = 45;
        } else {
            this.image_angle = 0;
        }
        this.image_index = 0;
    }
    if (this.speed > 0.8) {
        this.speed = this.speed - 0.2;
        this.direction = this.direction - 2;
    }
    this.timer = this.timer + 1;
    if (this.timer == 8) {
        instance_create_depth(this.x, this.y, this.depth - 1, 'obj_gerson_item_steal_anim');
    }
  }
}
defineObject('obj_gerson_item_throw', GersonItemThrow);

// obj_gerson_item_throw_particle (default sprite spr_whitepx, depth 0)
class GersonItemThrowParticle extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_whitepx';
  }
  create() {
    this.timer = 0;
    this.sprite_index = 'spr_sneo_bigcircle';
    this.image_xscale = 0.15;
    this.image_yscale = 0.15;
  }
  step() {
    this.image_xscale = this.image_xscale - 0.015;
    this.image_yscale = this.image_yscale - 0.015;
    if (this.image_xscale < 0.04) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_item_throw_particle', GersonItemThrowParticle);

// obj_gerson_item_steal_anim (default sprite spr_gerson_item_steal1, depth 0)
class GersonItemStealAnim extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_item_steal1';
  }
  cleanUp() {
    if (W('obj_hammer_of_justice_enemy', function (other) {
        this.visible = true;
    }, this) === EXIT) return;
  }
  create() {
    this.timer = 0;
    this.con = 0;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.x = O('obj_hammer_of_justice_enemy').x;
    this.y = O('obj_hammer_of_justice_enemy').y;
    if (W('obj_hammer_of_justice_enemy', function (other) {
        this.visible = false;
    }, this) === EXIT) return;
    if (W('obj_battlecontroller', function (other) {
        this.disableitembutton = 1;
    }, this) === EXIT) return;
    snd_stop('motor_swing_down');
    snd_play_pitch('motor_swing_down', 1.4);
  }
  step() {
    this.timer = this.timer + 1;
    if (this.timer == 3) {
        this.sprite_index = 'spr_nothing';
    }
    if (this.timer == 13) {
        this.sprite_index = 'spr_gerson_item_steal2';
        this.image_index = 0;
        this.direction = 270;
        this.speed = 4;
        this.friction = 0.4;
        this.x = O('obj_gerson_item_throw').x - 96 + 6;
        this.y = O('obj_gerson_item_throw').y - 89;
        snd_stop('motor_swing_down');
        snd_play_pitch('motor_swing_down', 1.4);
    }
    if (this.timer == 15) {
        this.image_speed = 0;
    }
    if (this.timer == 22) {
        if (W('obj_gerson_item_throw', function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        if (W('obj_gerson_item_throw_particle', function (other) {
            instance_destroy(this);
        }, this) === EXIT) return;
        snd_play('snd_item');
    }
    if (this.timer == 24) {
        this.sprite_index = 'spr_gerson_item_steal2';
        this.image_index = 1;
        this.image_speed = 1;
        snd_stop('motor_swing_down');
        snd_play_pitch('motor_swing_down', 1.4);
    }
    if (this.timer == 25) {
        this.sprite_index = 'spr_nothing';
    }
    if (this.timer == 31) {
        this.x = O('obj_hammer_of_justice_enemy').x + 20 + 24;
        this.y = O('obj_hammer_of_justice_enemy').y - 30;
        this.sprite_index = 'spr_gerson_smear';
        this.image_index = 1;
        this.image_speed = 0;
    }
    if (this.timer == 32) {
        this.x = O('obj_hammer_of_justice_enemy').x - 10 + 24;
        this.y = O('obj_hammer_of_justice_enemy').y;
        snd_stop('motor_swing_down');
        snd_play_pitch('motor_swing_down', 1.4);
        this.sprite_index = 'spr_gerson_laugh';
        this.image_index = 0;
        this.image_speed = 0.25;
        this.direction = 180;
        this.speed = 2;
        this.friction = 0.2;
    }
    if (this.timer > 50 && !T(i_ex('obj_writer'))) {
        if (this.con == 0) {
            if (W('obj_hammer_of_justice_enemy', function (other) {
                global.typer = 50;
                S.msgsetloc(0, "Woah there!&I ain't usin' items,&so fair's fair,&ain't it!?/%", "obj_gerson_item_steal_anim_slash_Step_0_gml_71_0");
                S.scr_enemyblcon(this,  this.x - 10, global.monstery[this.myself], 10);
            }, this) === EXIT) return;
            this.con = 1;
        } else if (this.con == 1) {
            instance_destroy(this);
        }
    }
    if (W('obj_spellphase', function (other) {
        this.spelltimer = 290;
    }, this) === EXIT) return;
  }
}
defineObject('obj_gerson_item_steal_anim', GersonItemStealAnim);

// obj_afterimage_gerson (default sprite None, depth 0)
class AfterimageGerson extends Instance {
  create() {
    this.fadeSpeed = 0.04;
    this.parentid = - 1;
  }
  step() {
    if (this.parentid == - 1 || !T(i_ex(this.parentid))) {
        instance_destroy(this);
    }
    this.image_alpha = this.image_alpha - this.fadeSpeed;
    if (this.image_alpha < 0) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_afterimage_gerson', AfterimageGerson);

// obj_gerson_darken (default sprite None, depth 0)
class GersonDarken extends Instance {
  create() {
    this.depth = 800;
    this.image_alpha = - 0.1;
    this.con = 0;
    this.savesusiedepth = O('obj_heroparent').depth;
    this.savetensiondepth = O('obj_tensionbar').depth;
    this.savegersondepth = O('obj_hammer_of_justice_enemy').depth;
    O('obj_tensionbar').depth = 1000;
    O('obj_heroparent').depth = 1001;
    O('obj_hammer_of_justice_enemy').depth = 1001;
    O('obj_darkener').depth = 1002;
  }
  draw() {
    this.depth = 800;
    if (i_ex('obj_growtangle') && this.con == 0) {
        if (this.image_alpha < 1) {
            this.image_alpha = this.image_alpha + 0.05;
        }
    } else {
        if (this.image_alpha > 0) {
            this.image_alpha = this.image_alpha - 0.05;
        }
        if (this.image_alpha <= 0) {
            instance_destroy(this);
            O('obj_tensionbar').depth = this.savetensiondepth;
            O('obj_heroparent').depth = this.savesusiedepth;
            O('obj_hammer_of_justice_enemy').depth = this.savegersondepth;
        }
    }
    draw_sprite_ext('spr_whitepixel', 0, camerax(), cameray(), 999, 999, 0, 0x000000, this.image_alpha);
  }
}
defineObject('obj_gerson_darken', GersonDarken);

// obj_gerson_growtangle_transform (default sprite None, depth 0)
class GersonGrowtangleTransform extends Instance {
  create() {
    this.timer = 0;
    this.shrink = false;
    this.grow = false;
  }
  step() {
    if (this.shrink == 1) {
        if (W('obj_growtangle', function (other) {
            this.maxxscale = lerp(this.maxxscale, 1.5, 0.2);
            this.maxyscale = lerp(this.maxyscale, 1.5, 0.2);
            this.image_xscale = lerp(this.image_xscale, 1.5, 0.2);
            this.image_yscale = lerp(this.image_yscale, 1.5, 0.2);
            for (let _r61 = 0, _n61 = (6); _r61 < _n61; _r61++) {
                if (place_meeting(this,  this.x, this.y, 'obj_heart')) {
                    O('obj_heart').x = O('obj_heart').x + lengthdir_x(1, point_direction(O('obj_heart').x, O('obj_heart').y, O('obj_growtangle').x, O('obj_growtangle').y));
                    O('obj_heart').y = O('obj_heart').y + lengthdir_y(1, point_direction(O('obj_heart').x, O('obj_heart').y, O('obj_growtangle').x, O('obj_growtangle').y));
                }
            }
        }, this) === EXIT) return;
    }
    if (this.grow == 1) {
        if (W('obj_growtangle', function (other) {
            this.maxxscale = lerp(this.maxxscale, 2, 0.2);
            this.maxyscale = lerp(this.maxyscale, 2, 0.2);
            this.image_xscale = lerp(this.image_xscale, 2, 0.2);
            this.image_yscale = lerp(this.image_yscale, 2, 0.2);
        }, this) === EXIT) return;
    }
    this.timer = this.timer + 1;
    if (this.timer > 30) {
        instance_destroy(this);
    }
    if (global.turntimer < 1) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_gerson_growtangle_transform', GersonGrowtangleTransform);

// obj_oflash_gerson_buster (default sprite None, depth 0)
class OflashGersonBuster extends Instance {
  create() {
    this.flashspeed = 1;
    this.siner = 0;
    this.target = 43843843;
    this.image_speed = 0;
    this.flashcolor = 0xffffff;
    this.angle = 0;
  }
  draw() {
    if (i_ex(this.target)) {
        this.x = this.target.x - 20 + this.target.hurtindex * 10;
    }
    this.siner = this.siner + this.flashspeed;
    d3d_set_fog(true, this.flashcolor, 0, 1);
    draw_sprite_ext(this.sprite_index, this.image_index, this.x, this.y, this.image_xscale, this.image_yscale, this.angle, this.image_blend, Math.sin(this.siner / 3));
    d3d_set_fog(false, 0x000000, 0, 0);
    if (this.siner > 4 && Math.sin(this.siner / 3) < 0) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_oflash_gerson_buster', OflashGersonBuster);

// obj_rudebuster_anim_gerson (default sprite spr_gerson_rudebuster, depth 0)
class RudebusterAnimGerson extends Instance {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_rudebuster';
  }
  create() {
    this.t = 0;
    this.target = 9897887;
    this.damage = 1;
    this.caster = 0;
    this.star = 0;
    if (i_ex('obj_titan_enemy') && instance_exists(O('obj_titan_enemy').gerson)) {
        O('obj_titan_enemy').gerson.visible = 0;
        this.depth = O('obj_titan_enemy').gerson.depth;
        this.x = O('obj_titan_enemy').gerson.x;
        this.y = O('obj_titan_enemy').gerson.y;
    }
    this.image_xscale = - 2;
    this.image_yscale = 2;
    this.image_speed = 0.5;
  }
  step() {
    if (i_ex(this.target)) {
        if (this.t == 14) {
            snd_stop('snd_rudebuster_swing');
            snd_play('snd_rudebuster_swing');
            this.blast = instance_create(this.x - 132, this.y + 14, 'obj_rudebuster_bolt');
            this.blast.caster = this.caster;
            this.blast.target = this.target;
            this.blast.damage = 1950 + irandom(100);
            this.blast.star = this.star;
            this.blast.sprite_index = 'spr_rudebuster_beam_green';
            this.blast.speedmax = 44;
            global.faceaction ??= []; global.faceaction[1] = 0;
        }
    }
    if (this.t >= 32) {
        O('obj_titan_enemy').gerson.visible = 1;
        O('obj_titan_enemy').gerson.sprite_index = 'spr_diner_table_messy';
        O('obj_titan_enemy').gerson.sprite_index = 'spr_gerson_idle';
        O('obj_titan_enemy').gerson.image_speed = 0.25;
        O('obj_titan_enemy').gerson.x = O('obj_titan_enemy').gerson.xstart;
        O('obj_titan_enemy').gerson.y = O('obj_titan_enemy').gerson.ystart;
        instance_destroy(this);
    }
    this.t = this.t + 1;
  }
}
defineObject('obj_rudebuster_anim_gerson', RudebusterAnimGerson);

// obj_gerson_speen (default sprite spr_gerson_speen, depth 0, parent obj_regularbullet)
class GersonSpeen extends P('obj_regularbullet') {
  constructor() {
    super();
    this.sprite_index = 'spr_gerson_speen';
  }
  create() {
    super.create?.();
    this.timer = 0;
    this.con = 0;
    this.destroyonhit = false;
    this.active = 0;
    this.image_speed = 0.4;
    this.image_xscale = 2;
    this.image_yscale = 2;
    this.image_alpha = 1;
    this.depth = - 999999;
    if (this.x < O('obj_growtangle').x) {
        this.image_xscale = - 2;
        this.direction = 0;
        this.inst = instance_create(O('obj_growtangle').x - 75 + 5, O('obj_growtangle').y, 'obj_gerson_growtangle_telegraph');
        this.inst.image_xscale = 142;
        this.inst.image_yscale = 72;
        if (i_ex('obj_heart')) {
            this.inst.depth = O('obj_heart').depth + 1;
        }
        snd_play_pitch('snd_eye_telegraph', 0.95);
    } else {
        this.image_xscale = 2;
        this.direction = 180;
        this.inst = instance_create(O('obj_growtangle').x - 75 + 5, O('obj_growtangle').y - 75 + 5, 'obj_gerson_growtangle_telegraph');
        this.inst.image_xscale = 142;
        this.inst.image_yscale = 70;
        if (i_ex('obj_heart')) {
            this.inst.depth = O('obj_heart').depth + 1;
        }
        snd_play_pitch('snd_eye_telegraph', 1);
    }
  }
  draw() {
    draw_self(this);
  }
  step() {
    this.image_speed = lerp(this.image_speed, 1, 0.04);
    this.speed = lerp(this.speed, 30, 0.2);
    if (this.x < scr_get_box(2) - 600 && this.direction == 180 || this.x > scr_get_box(0) + 600 && this.direction == 0) {
        instance_destroy(this);
    }
    this.timer = this.timer + 1;
    if (this.timer % 4 == 0 && this.x > O('obj_growtangle').x - 200 && this.x < O('obj_growtangle').x + 200) {
        snd_stop('motor_swing_down');
        snd_play_pitch('motor_swing_down', 1.5);
    }
  }
}
defineObject('obj_gerson_speen', GersonSpeen);

// obj_animation (default sprite None, depth 0)
class Animation extends Instance {
  animationEnd() {
    instance_destroy(this);
  }
}
defineObject('obj_animation', Animation);

// obj_shakeobj_y (default sprite None, depth 0)
class ShakeobjY extends Instance {
  constructor() {
    super();
    this.visible = false;
  }
  create() {
    this.active = 0;
    this.target = 0;
    this.shakeamt = 5;
    this.shakereduct = 2;
    if (global.darkzone == 0) {
        this.shakeamt = 5;
        this.shakereduct = 1;
    }
    this.shakespeed = 1;
    this.nowx = 0;
    this.nowy = 0;
    this.on = 1;
    this.timer = 0;
  }
  user0() {
    if (i_ex(this.target)) {
        this.active = 1;
        this.nowx = this.target.x;
        this.nowy = this.target.y;
    } else {
        instance_destroy(this);
    }
  }
  step() {
    if (this.active == 0) {
        instance_destroy(this);
    }
    if (this.active == 1) {
        if (i_ex(this.target)) {
            this.shakeamt = this.shakeamt - this.shakereduct;
            this.on = this.on * - 1;
            this.target.y = this.nowy + this.shakeamt * this.on;
            if (this.shakeamt <= 0) {
                instance_destroy(this);
            }
        } else {
            instance_destroy(this);
        }
    }
  }
}
defineObject('obj_shakeobj_y', ShakeobjY);

// application_surface: the game's canvas, with what has been drawn of this frame so far.
const applicationSurface = () => {
  const canvas = document.getElementById('game');
  return { canvas, w: canvas.width, h: canvas.height, alive: true, isSurface: true };
};

// obj_afterimage_screen (default sprite None, depth 0)
class AfterimageScreen extends Instance {
  cleanUp() {
    if (surface_exists(this.my_surface)) {
        surface_free(this.my_surface);
    }
  }
  create() {
    this.my_surface = - 4;
    this.xscale = 1;
    this.yscale = 1;
    this.alpha = 0.5;
    this.anchor_x = this.x - S.__view_get(0, 0);
    this.anchor_y = this.y - S.__view_get(1, 0);
    this.xrate = 0.01;
    this.yrate = 0.01;
    this.faderate = 0.00625;
    this.draw_end = false;
  }
  draw() {
    if (T(this.draw_end)) {
        return;
    }
    if (!T(surface_exists(this.my_surface))) {
        this.my_surface = surface_create(applicationSurface().w, applicationSurface().h);
    }
    surface_set_target(this.my_surface);
    draw_surface(applicationSurface(), 0, 0);
    surface_reset_target();
    draw_surface_ext(this.my_surface, this.x - this.anchor_x * this.xscale, this.y - this.anchor_y * this.yscale, this.xscale, this.yscale, 0, 0xffffff, this.alpha);
  }
  step() {
    this.xscale = this.xscale + this.xrate;
    this.yscale = this.yscale + this.yrate;
    this.alpha = scr_approach(this.alpha, 0, this.faderate);
    if (this.alpha == 0) {
        instance_destroy(this);
    }
  }
}
defineObject('obj_afterimage_screen', AfterimageScreen);

