"""Hand fixes applied to the machine-translated attack modules after tools/gml2js_obj.py (so the
translation can be regenerated): python -I tools/postfix.py <module.js>"""
import re, sys

p = sys.argv[1]
t = open(p, encoding='utf-8').read()

# Object indices used as instances (GML reads obj.x from the first instance): point at the instance.
t = t.replace('.target = 1436;', ".target = instancesOf('obj_hammer_of_justice_enemy')[0];")
t = t.replace('.target = 1281;', ".target = instancesOf('obj_herosusie')[0];")

# scr_damage_all works on the calling bullet.
t = t.replace('S.scr_damage_all()', 'S.scr_damage_all(this)')


def add_method(cls_obj, cls_name, code):
    global t
    m = re.search(r"defineObject\('%s', %s\);" % (cls_obj, cls_name), t)
    if not m:
        return
    end = t.rfind('}', 0, m.start())
    t = t[:end] + code + t[end:]


# obj_gerson_shell_pinball: check_bounds = method(...) in its Create.
if 'anon_gml_Object_obj_gerson_shell_pinball_Create_0_376' in t:
    t = re.sub(r"    this\.check_bounds = S\.method\([^;]*\);\n", "    // (check_bounds: a method in the GML; see checkBounds below)\n", t)
    t = t.replace('S.check_bounds(', 'this.checkBounds(')
    add_method('obj_gerson_shell_pinball', 'GersonShellPinball', """  // check_bounds(dir): does the line from here towards dir cross the box (within 200 px)?
  checkBounds(dir) {
    const gt = O('obj_growtangle');
    for (let a = 0; a < 100; a++) {
      const cx = this.x + lengthdir_x(a * 2, dir), cy = this.y + lengthdir_y(a * 2, dir);
      if (cx > gt.x - 72 && cx < gt.x + 72 && cy > gt.y - 75 && cy < gt.y + 75) return true;
    }
    return false;
  }
""")

# obj_gerson_box_rumble_controller: box_bonk = method(...) in its Create.
if 'anon_gml_Object_obj_gerson_box_rumble_controller_Create_0_680' in t:
    t = re.sub(r"    this\.box_bonk = S\.method\([^;]*\);\n", "    // (box_bonk: a method in the GML; see boxBonk below)\n", t)
    t = t.replace('S.box_bonk(', 'this.boxBonk(')
    add_method('obj_gerson_box_rumble_controller', 'GersonBoxRumbleController', """  // box_bonk(side[, time]): Gerson knocks the box sideways from `side`.
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
""")

open(p, 'w', encoding='utf-8', newline='').write(t)
