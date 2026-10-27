import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const app=await readFile(new URL('../assets/app.js',import.meta.url),'utf8');
const css=await readFile(new URL('../assets/overview.css',import.meta.url),'utf8');

test('Today view exposes a scoped design state without changing other routes',()=>{
 assert.match(app,/document\.documentElement\.dataset\.view=currentView/);
 assert.match(css,/html\[data-view='today'\]/);
 assert.doesNotMatch(css,/html\[data-view='(?:vs|season|guides|admin)'\][^{]*body \*/);
});

test('landing removes decorative gradients and thick colored card stripes',()=>{
 assert.match(css,/html\[data-view='today'\] body \*[\s\S]*background-image:none!important/);
 assert.match(css,/html\[data-view='today'\] \.command-hud\{[\s\S]*border-inline-start-width:1px!important/);
 assert.match(css,/html\[data-view='today'\] \.focus-panel__main\{border-inline-start:0!important\}/);
 assert.match(css,/html\[data-view='today'\] \.enemy-buster\{border-top-width:2px!important\}/);
});

test('landing no longer uses the lower Dice accordion as filler',()=>{
 const start=app.indexOf('function diceHome()');
 const end=app.indexOf('function today()',start);
 const block=app.slice(start,end);
 assert.ok(start>=0&&end>start);
 assert.doesNotMatch(block,/<details|<summary/);
 assert.match(block,/dice-home-link/);
 assert.match(block,/guideHash\('dice'\)/);
});
