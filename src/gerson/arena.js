// The arena behind the fight: obj_dw_church_arena_bg (room_dw_church_arena, camera at x 520).
// A gradient sky, the church window (stained glass, rain, and what the story is about: card castle
// colours, the city, Tenna's stars, the hammer of the prophecy, falling leaves, the bell), and the
// arena floor recoloured through spr_dw_gerson_arena_palette (pal_swap) as Gerson tells each chapter.
// The hammer is drawn through a noise shader in the game; here it is drawn as it is, at the same alpha.
import {
  G, global, Instance, defineObject, getSprite, fx, fy, draw_sprite_ext, draw_set_color, draw_set_alpha, draw_rectangle,
  merge_color, bgr, random_range, choose, lerp, surface_create, surface_exists, surface_set_target, surface_reset_target,
  draw_clear_alpha, draw_surface, draw_surface_ext, draw_surface_part, draw_set_blend_mode, instancesOf,
} from './rt.js?v=20261113214419';
import { scr_lerpvar, scr_approach, camerax, cameray, camerawidth } from './common.js?v=20261113214419';

const colorset = (r, g, b, l) => ({ r: bgr(r), g: bgr(g), b: bgr(b), l: bgr(l) });
const gradientset = (t, b) => ({ t: bgr(t), b: bgr(b) });
const SETS = {
  default: colorset(3165210, 5163080, 201738, 2584886),
  cardcastle: colorset(4139303, 8667457, 2692114, 7819857),
  mansion: colorset(5959081, 13873450, 3483914, 11184674),
  teevie: colorset(4591889, 6697522, 3483683, 8931914),
  garden: colorset(4261519, 2992324, 2102325, 6663647),
  dark: colorset(3278918, 5910896, 2952729, 4850001),
  greenish: colorset(3165210, 5163080, 201738, 2584886),
};
const GRADIENTS = {
  default: gradientset(3297554, 2381604), cardcastle: gradientset(7623249, 4790561), cybercity: gradientset(6478178, 14065681),
  teevie: gradientset(4591889, 7811634), garden: gradientset(52667135, 7410175), dark: gradientset(6422882, 2752785),
  greenish: gradientset(3297554, 2381604),
};

// pal_swap_set(spr_dw_gerson_arena_palette, index): column 0 of the palette lists the floor's colours,
// column `index` what each one becomes. The recoloured floors are built once per column.
const floors = new Map();
function recolouredFloor(col) {
  if (floors.has(col)) return floors.get(col);
  const pal = getSprite('spr_dw_gerson_arena_palette'), bg = getSprite('bg_dw_gerson_arena_battle');
  if (!pal || !bg) return null;
  const read = (spr, w, h) => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const x = c.getContext('2d');
    x.drawImage(spr.img, fx(spr, 0), fy(spr, 0), w, h, 0, 0, w, h);
    return [c, x, x.getImageData(0, 0, w, h)];
  };
  const [, , pd] = read(pal, pal.w, pal.h);
  const map = new Map();
  const at = (cx, cy) => {
    const i = (cy * pal.w + cx) * 4;
    return [pd.data[i], pd.data[i + 1], pd.data[i + 2], pd.data[i + 3]];
  };
  for (let y = 0; y < pal.h; y++) {
    const [r, g, b, a] = at(0, y);
    if (a === 0) continue;
    map.set((r << 16) | (g << 8) | b, at(Math.min(col, pal.w - 1), y));
  }
  const [c, x, d] = read(bg, bg.w, bg.h);
  for (let i = 0; i < d.data.length; i += 4) {
    if (d.data[i + 3] === 0) continue;
    const to = map.get((d.data[i] << 16) | (d.data[i + 1] << 8) | d.data[i + 2]);
    if (to) [d.data[i], d.data[i + 1], d.data[i + 2]] = to;
  }
  x.putImageData(d, 0, 0);
  floors.set(col, c);
  return c;
}

class ArenaBg extends Instance {
  create() {
    Object.assign(this, {
      con: 0, delay: 0, hammeralpha: 0, cityalpha: 0, window_opacity: 1, timer: 0, bellalpha: 0, staralpha: 0, petalalpha: 0,
      colors_current: SETS.default, colors_last: SETS.default, colors_lerp: 0, gradient_current: GRADIENTS.default,
      gradient_last: GRADIENTS.default, gradient_lerp: 0, image_alpha: 0, colcon: 0, introflashalpha: 4,
    });
    this.depth = 500;
    this.bgsurface = surface_create(640, 480);
    this.windowsurface = surface_create(302, 122);
    // What the window shows (obj_marker_fancy instances drawn only into the window surface).
    const obj = (x, y, spr, extra) => Object.assign({ x, y, sprite_index: spr, image_index: 0, image_speed: 0, image_xscale: 2,
      image_yscale: 2, image_angle: 0, image_blend: 0xffffff, image_alpha: 1, timer: 0, hspeed: 0, vspeed: 0, alive: true }, extra);
    this.to_draw = [];
    this.cityobj = obj(0, 0, 'bg_cityscape', { image_alpha: 0, image_blend: 0 });
    this.hammerobj = obj(100, 10, 'bg_dw_gerson_ch4', { image_alpha: 0 });
    this.to_draw.push(this.cityobj, this.hammerobj);
    for (let i = 0; i < 10; i++) {
      this.to_draw.push(obj(i * 30 + random_range(0, 15), random_range(20, 120), 'spr_sparestar_anim', {
        image_alpha: 0, image_speed: random_range(0.125, 0.25), image_blend: bgr(10039858), direction: random_range(-15, 15), star: true,
      }));
    }
  }
  change_color_set(s) {
    this.colors_last = this.colors_current;
    this.colors_current = s;
    this.colors_lerp = 0;
  }
  change_gradient_set(s) {
    this.gradient_last = this.gradient_current;
    this.gradient_current = s;
    this.gradient_lerp = 0;
  }
  step() {
    if (this.image_alpha < 1 && this.con >= 0) this.image_alpha += 0.15;
    if (this.con == 4 || this.con == 5) {
      this.timer += 1;
      if (this.timer % 12 == 0) {
        this.to_draw.push({ x: random_range(0, 500), y: -20, sprite_index: choose('spr_leaf_fall', 'spr_leaf_fall2', 'spr_leaf_fall3'),
          image_index: 0, image_speed: 0.125, image_xscale: 2, image_yscale: 2, image_angle: 0, image_blend: 0, image_alpha: 0,
          timer: 0, hspeed: 0, vspeed: 0, alive: true, leaf: true });
      }
    }
    // The story moves on with Gerson's turns.
    const hammer = instancesOf('obj_hammer_of_justice_enemy')[0];
    if (hammer && global.myfight == 0) {
      const tt = hammer.trueturn;
      if (this.con == 0 && tt >= 3) this.next(1, 'cardcastle', 'cardcastle');
      if (this.con == 1 && tt >= 4) this.next(2, 'mansion', 'cybercity');
      if (this.con == 2 && tt >= 5) {
        this.next(3, 'teevie', 'teevie');
        scr_lerpvar(this, 'staralpha', 0, 1, 30);
      }
      if (this.con == 3 && tt >= 6) {
        this.next(4, 'teevie', 'teevie');
        scr_lerpvar(this, 'staralpha', 1, 0, 30);
        scr_lerpvar(this, 'hammeralpha', 0, 1, 30);
      }
      if (this.con == 4 && tt >= 7) {
        this.next(5, 'garden', 'garden');
        scr_lerpvar(this, 'hammeralpha', 1, 0, 30);
        scr_lerpvar(this, 'petalalpha', 0, 1, 30);
      }
      if (this.con == 5 && tt >= 8) {
        this.next(6, 'dark', 'dark');
        scr_lerpvar(this, 'petalalpha', 1, 0, 30);
      }
      if (this.con == 6 && tt >= 12) {
        this.next(7, 'greenish', 'greenish');
        scr_lerpvar(this, 'bellalpha', 0, 1, 30);
      }
    }
    // The window's objects (their step_func).
    for (const o of this.to_draw) {
      o.timer += 1;
      if (o.star) o.image_alpha = this.staralpha * 0.8;
      if (o.leaf) {
        o.image_alpha = this.petalalpha;
        o.hspeed = -1.5 + Math.sin(o.timer / 100);
        o.vspeed = 1;
        o.x += o.hspeed;
        o.y += o.vspeed;
        if (o.y > 300) o.alive = false;
      }
      if (o.image_speed) o.image_index += o.image_speed * (getSprite(o.sprite_index)?.sp ?? 1);
    }
    this.to_draw = this.to_draw.filter(o => o.alive);
  }
  next(con, colors, gradient) {
    this.change_color_set(SETS[colors]);
    this.change_gradient_set(GRADIENTS[gradient]);
    this.con = con;
  }
  draw() {
    const cx = camerax(), cy = cameray();
    if (this.delay > 0) {
      this.delay -= 1;
      this.introflashalpha = 0;
      return;
    }
    if (!surface_exists(this.bgsurface)) this.bgsurface = surface_create(640, 480);
    if (!surface_exists(this.windowsurface)) this.windowsurface = surface_create(302, 122);
    this.colors_lerp = Math.min(this.colors_lerp + 0.01, 1);
    this.gradient_lerp = Math.min(this.gradient_lerp + 0.01, 1);
    const top = merge_color(this.gradient_last.t, this.gradient_current.t, this.gradient_lerp);
    const bottom = merge_color(this.gradient_last.b, this.gradient_current.b, this.gradient_lerp);
    const t = 0.002 * G.current_time();
    const rain = 0.012 * G.current_time();
    surface_set_target(this.windowsurface);
    draw_clear_alpha(0, 0);
    this.window_opacity = scr_approach(this.window_opacity, this.con == 3 || this.con == 5 ? 0 : 1, 0.01);
    draw_sprite_ext('spr_dw_church_bell_Large_topcenter', 0, 151, 10, 1.5, 1.5, Math.sin(t * 0.5) * 24, 0x008000, this.bellalpha * 0.75);
    this.hammerobj.image_alpha = this.hammeralpha;
    this.cityobj.image_alpha = this.cityalpha * 0.5;
    for (let i = this.to_draw.length - 1; i >= 0; i--) {
      const o = this.to_draw[i];
      if (o.image_alpha <= 0) continue;
      const alpha = o === this.hammerobj ? o.image_alpha * 0.6 + 0.1 * Math.sin(G.current_time() * 0.001) : o.image_alpha;
      draw_sprite_ext(o.sprite_index, o.image_index, o.x, o.y, o.image_xscale, o.image_yscale, o.image_angle, o.image_blend, alpha);
    }
    for (const wx of [232, -38, 92]) draw_sprite_ext('spr_gersonwindow_water', rain, wx, 0, 2, 2, 0, 0xffffff, 0.4 * this.window_opacity);
    draw_sprite_ext('bg_dw_gerson_arena_stained_glass', 0, 44, 0, 2, 2, 0, 0xffffff, 0.5 * this.window_opacity);
    surface_reset_target();
    surface_set_target(this.bgsurface);
    draw_clear_alpha(0, 0);
    draw_sprite_ext('spr_pxwhite', 0, 0, 0, 640, 480, 0, bottom, 1);
    draw_sprite_ext('spr_20px_white_gradient', 0, 640, 160, 640, 8, 180, top, 1);
    draw_set_blend_mode(1);
    draw_surface(this.windowsurface, 168, 0);
    draw_set_blend_mode(0);
    surface_reset_target();
    // (the game also draws the window's reflection at room (168, 416), outside the arena's view)
    draw_surface_ext(this.windowsurface, 168, 416, 1, -2, 0, 0xffffff, 0.5);
    const a = this.image_alpha;
    draw_surface_part(this.bgsurface, 320 - 320 * a, 0, 640 * a, 480, this.x + 320 - 320 * a, this.y);
    draw_set_color(0);
    draw_rectangle(cx + 257, cy, cx + 266, cy + 200, false);
    draw_rectangle(cx + 372, cy, cx + 381, cy + 200, false);
    draw_set_color(0xffffff);
    this.colcon = scr_approach(this.colcon, this.con + 1, this.colcon < 1 ? 0.1 : 0.01);
    const floor = recolouredFloor(Math.floor(this.colcon));
    if (floor) {
      const ctx = G.ctx;
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(floor, cx, cy, floor.width * 2, floor.height * 2);
      ctx.restore();
    }
    draw_sprite_ext('spr_dw_gerson_arena_shadow', 0, cx + 0.5 * camerawidth() - 2, cy + 200, 2, 2, 0, bottom, 0.4);
    if (this.introflashalpha > 0) {
      this.introflashalpha -= 0.3;
      draw_sprite_ext('spr_dw_gerson_arena_shadow', 0, cx + 0.5 * camerawidth(), cy + 200, 2.1, 2.1, 0, 0xffffff, 0.5 * Math.sin(this.introflashalpha * Math.PI / 2));
    }
    draw_set_alpha(1);
  }
}
defineObject('obj_dw_church_arena_bg', ArenaBg);

void [lerp];
