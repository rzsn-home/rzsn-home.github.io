import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const app=await readFile(new URL('../assets/app.js',import.meta.url),'utf8');
const hub=await readFile(new URL('../assets/hub.css',import.meta.url),'utf8');
const overview=await readFile(new URL('../assets/overview.css',import.meta.url),'utf8');

test('original header controls and rich steel-blue/gold theme restored',()=>{
 assert.match(hub,/\.site-header\s*\{\s*background:linear-gradient/);
 assert.match(hub,/\.site-header \.language select,\.site-header \.theme-toggle\s*\{\s*background:linear-gradient/);
 assert.match(hub,/\.primary-link,\.setup-continue\s*\{[\s\S]*?background:linear-gradient/);
 assert.doesNotMatch(overview,/Site-wide clean surfaces|Legible solid controls/);
});

test('original admin navigation, gold selection and dashboard tiles restored',()=>{
 assert.match(hub,/\.native-admin \.native-admin-nav \.native-primary-tab,\.native-admin \.native-admin-more>summary\s*\{[\s\S]*?background:linear-gradient/);
 assert.match(hub,/\.native-admin \.native-admin-nav \.native-primary-tab\[aria-current='page'\]\s*\{[\s\S]*?background:linear-gradient/);
 assert.match(hub,/\.native-admin \.native-hub-tile\s*\{[\s\S]*?background:linear-gradient/);
 assert.match(hub,/\.native-admin \.native-dashboard-mini-tile/);
});

test('pre-cleanup Dice view restored without losing donation navigation',async()=>{
 assert.match(app,/guide-disclosure--dice-home/);
 assert.doesNotMatch(app,/dice-home-link/);
 const admin=await readFile(new URL('../assets/native-admin.js',import.meta.url),'utf8');
 assert.match(admin,/data-native-donation-category/);
 assert.match(admin,/data-native-donation-more-group/);
});
