// Imports every Hammer of Justice module so their objects and scripts get registered.
import './common.js?v=20261113220951';
import './bullets.js?v=20261113220951';
import './board.js?v=20261113220951';
import './soul.js?v=20261113220951';
import './dbullet.js?v=20261113220951';
import './gml.js?v=20261113220951';
import './ch4lib.js?v=20261113220951';
import './spears.js?v=20261113220951';
import './enemy.js?v=20261113220951';
import './arena.js?v=20261113220951';

// Attack modules: a missing or broken one only disables what it holds.
const ATTACK_MODULES = ['basics', 'teleport', 'boxes', 'extra'];
await Promise.all(ATTACK_MODULES.map(m => import('./attacks/' + m + '.js' + new URL(import.meta.url).search).catch(e => {
  console.warn('gerson attack module failed:', m, e);
})));
