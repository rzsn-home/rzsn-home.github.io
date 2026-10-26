/** Shared private proof rendering for weekly donations and VS day measurements. */
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/** Shared keyboard lifecycle for the existing private evidence dialogs. */
export function bindEvidenceDialog(host,onClose,returnTo=host.ownerDocument.activeElement){
 const doc=host.ownerDocument,body=doc.body,overflow=body.style.overflow;
 body.style.overflow='hidden';host.tabIndex=-1;
 const controls=()=>[...host.querySelectorAll('button,a[href],input,select,textarea,summary,[tabindex]')]
  .filter(node=>!node.disabled&&node.tabIndex>=0&&!node.closest('[hidden]')&&
   doc.defaultView.getComputedStyle(node).display!=='none'&&
   ![...closedParents(node)].some(details=>!details.querySelector('summary')?.contains(node)));
 function* closedParents(node){for(let parent=node.parentElement;parent&&parent!==host;parent=parent.parentElement)if(parent.matches('details:not([open])'))yield parent;}
 const focusFirst=()=>{(controls()[0]||host).focus({preventScroll:true})};
 const keydown=event=>{
  if(event.key==='Escape'){event.preventDefault();event.stopPropagation();onClose();return;}
  if(event.key!=='Tab')return;
  const items=controls(),first=items[0],last=items.at(-1),current=doc.activeElement;
  if(!first){event.preventDefault();host.focus();return;}
  if(event.shiftKey&&(current===first||!items.includes(current))){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&(current===last||!items.includes(current))){event.preventDefault();first.focus();}
 };
 const focusin=event=>{if(host.isConnected&&!host.contains(event.target))focusFirst()};
 host.addEventListener('keydown',keydown);doc.addEventListener('focusin',focusin);focusFirst();
 let disposed=false;
 return ()=>{if(disposed)return;disposed=true;host.removeEventListener('keydown',keydown);doc.removeEventListener('focusin',focusin);body.style.overflow=overflow;
  if(returnTo?.isConnected)returnTo.focus({preventScroll:true});};
}
export function renderEvidenceRow(frame,blobUrl,source,alt,alive=()=>true){
 if(!source||!Number.isInteger(source.row_y)||source.row_y<0||source.row_y>659){
  frame.innerHTML='<img alt="'+esc(alt)+'" draggable="false" loading="eager">';
  frame.querySelector('img').src=blobUrl;return;
 }
 frame.innerHTML='<p class="native-stat-row-identity"><strong data-native-no-translate>'+esc(source.member_name||source.source_name)+'</strong> · '+
  new Intl.NumberFormat('de-DE').format(source.source_value)+' Punkte</p>'+
  (source.member_name&&source.source_name&&source.member_name!==source.source_name?
   '<p class="native-muted native-stat-row-source" data-native-no-translate>OCR: '+esc(source.source_name)+'</p>':'')+
  '<div class="native-stat-row-window"><img alt="'+esc(alt)+'" draggable="false" loading="eager"></div>'+
  '<details class="native-stat-full-image"><summary>Vollständigen Screenshot ansehen</summary>'+
  '<img alt="Vollständiger privater Original-Screenshot" loading="lazy"></details>';
 const box=frame.querySelector('.native-stat-row-window'),picture=box.querySelector('img');
 picture.addEventListener('load',()=>{
  if(!alive()||!picture.naturalWidth||!picture.naturalHeight)return;
  const width=Math.min(picture.naturalWidth,Math.max(140,box.clientWidth));
  const scale=width/picture.naturalWidth;
  const region=Math.min(160,picture.naturalHeight);
  const start=Math.max(0,Math.min(picture.naturalHeight-region,source.row_y-region/2));
  box.style.height=Math.ceil(region*scale)+'px';
  picture.style.width=width+'px';
  picture.style.top=(-Math.round(start*scale))+'px';
  box.classList.add('ready');
 },{once:true});
 picture.src=blobUrl;
 frame.querySelector('.native-stat-full-image img').src=blobUrl;
}
