import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const app=await readFile(new URL('../assets/app.js',import.meta.url),'utf8');
const hub=await readFile(new URL('../assets/hub.css',import.meta.url),'utf8');
const overview=await readFile(new URL('../assets/overview.css',import.meta.url),'utf8');
const css=hub+'\n'+overview;

test('every route exposes one view state for scoped behavior and QA',()=>{
 assert.match(app,/document\.documentElement\.dataset\.view=currentView/);
});

test('site-wide CSS contains no decorative gradients or thick top/left card stripes',()=>{
 assert.doesNotMatch(css,/(?:linear|radial|conic|repeating-linear)-gradient/i);
 assert.doesNotMatch(css,/border-(?:left|inline-start|top)(?:-width)?\s*:\s*[3-9]px/i);
 assert.match(overview,/html body,\s*html body \*,[\s\S]*background-image:none!important/);
 assert.match(overview,/\.focus-panel__main\{border-inline-start:0!important\}/);
});

test('lower Dice history is a direct guide link, not a generic accordion',()=>{
 const start=app.indexOf('function diceHome()');
 const end=app.indexOf('function today()',start);
 const block=app.slice(start,end);
 assert.ok(start>=0&&end>start);
 assert.doesNotMatch(block,/<details|<summary/);
 assert.match(block,/dice-home-link/);
 assert.match(block,/guideHash\('dice'\)/);
});
