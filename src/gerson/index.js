// Imports every Hammer of Justice module so their objects and scripts get registered.
import './common.js?v=20261114041602';
import './bullets.js?v=20261114041602';
import './board.js?v=20261114041602';
import './soul.js?v=20261114041602';
import './dbullet.js?v=20261114041602';
import './gml.js?v=20261114041602';
import './ch4lib.js?v=20261114041602';
import './spears.js?v=20261114041602';
import './enemy.js?v=20261114041602';
import './arena.js?v=20261114041602';

// Attack modules: a missing or broken one only disables what it holds.
const ATTACK_MODULES = ['basics', 'teleport', 'boxes', 'extra'];
await Promise.all(ATTACK_MODULES.map(m => import('./attacks/' + m + '.js' + new URL(import.meta.url).search).catch(e => {
  console.warn('gerson attack module failed:', m, e);
})));
// The scenes before and after the fight (obj_dw_church_arena); they use objects from the attack modules.
await import('./scenes.js?v=20261114041602').catch(e => console.warn('gerson scenes failed:', e));
