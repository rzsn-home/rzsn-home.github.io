import test from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {JSDOM} from 'jsdom';
import {createStatEvidenceViewer} from '../assets/native-stat-evidence.js';
if(!globalThis.crypto)globalThis.crypto=webcrypto;
for(const kind of ['ocr_original_row','archive_profile_auto_qa_row','archive_capture_publication_row'])
test('Exact player row keeps canonical name and verification authority: '+kind,async t=>{
 const dom=new JSDOM('<div id="target"></div>',{url:'https://lunas-empire.github.io/#admin'});
 const oldWindow=globalThis.window,oldFetch=globalThis.fetch;
 const oldCreate=URL.createObjectURL,oldRevoke=URL.revokeObjectURL;
 globalThis.window=dom.window;URL.createObjectURL=()=> 'blob:original-row';URL.revokeObjectURL=()=>{};
 const data=Uint8Array.from([137,80,78,71,13,10,26,10,...Array(60).fill(2)]);
 const digest=await webcrypto.subtle.digest('SHA-256',data);
 const hash=[...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,'0')).join('');
 const requests=[],root=dom.window.document.querySelector('#target');
 globalThis.fetch=async(url,opts)=>{requests.push(new URL(url).pathname);
  assert.equal(opts.headers.Authorization,'Bearer synthetic');
  return new Response(data,{headers:{'Content-Type':'image/png'}})};
 const viewer=createStatEvidenceViewer({apiBase:'https://private.test',getToken:()=> 'synthetic',
  request:async path=>{
   requests.push(path);
   return {captured_at:'2026-10-11T10:00:00Z',value:19100,metric:'donations_weekly',
    verified_source:{kind,id:'donations_weekly-2026-10-11-020',
     sha256:hash,row_y:277,source_name:'KerrandaBerdarah OCR',source_value:19100,
     visually_checked:false,automated_qa:kind!=='ocr_original_row'},candidates:[]};
  }});
 t.after(()=>{viewer.close(root);globalThis.window=oldWindow;globalThis.fetch=oldFetch;
  URL.createObjectURL=oldCreate;URL.revokeObjectURL=oldRevoke;dom.window.close()});
 await viewer.open(root,'snapshot|player|donations_weekly','KerandaBerdarah');
 assert.equal(requests.length,2);
 assert.equal(requests[1],'/api/stat-evidence/snapshot/player/donations_weekly/image');
 assert.equal(root.querySelectorAll('[data-native-stat-browse]').length,0);
 assert.match(root.querySelector('.native-stat-row-identity').textContent,/KerandaBerdarah/);
 assert.match(root.querySelector('.native-stat-row-source').textContent,/OCR: KerrandaBerdarah OCR/);
 assert.doesNotMatch(root.querySelector('.native-stat-row-identity').textContent,/KerrandaBerdarah OCR/);
 assert.match(root.querySelector('.native-stat-row-identity').textContent,/19.100/);
 if(kind!=='ocr_original_row')assert.match(root.querySelector('.native-stat-body').textContent,/keine gesonderte Officer-Abnahme/);
 assert.doesNotMatch(root.querySelector('.native-stat-body').textContent,/Von einem Officer geprüft/);
 const wrap=root.querySelector('.native-stat-row-window'),img=wrap.querySelector('img');
 Object.defineProperty(img,'naturalWidth',{value:714});
 Object.defineProperty(img,'naturalHeight',{value:660});
 Object.defineProperty(wrap,'clientWidth',{value:300});
 img.dispatchEvent(new dom.window.Event('load'));
 assert.ok(wrap.classList.contains('ready'));
 assert.ok(parseInt(img.style.top,10)<0,'The crop scrolls down to the actual player row');
 assert.ok(root.querySelector('.native-stat-full-image img'),'Whole original remains separately available');
});
