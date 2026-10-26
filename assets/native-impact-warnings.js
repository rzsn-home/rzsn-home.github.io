/** Read-only absence and scheduling warnings for existing officer operations. */
import {translateOfficerText} from './native-admin-i18n.js';
import {LOCALES} from './i18n.js';
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderImpactWarnings(warnings=[],language="de"){
 const rows=Array.isArray(warnings)?warnings:[];
 const de=language==='de';
 const title=de?'Auswirkungen prüfen':'Review impacts';
 const help=de?'Nur Hinweise. Aufgaben und Planungen werden nicht automatisch geändert.':'Advisory only. Tasks and plans are never changed automatically.';
 const empty=de?'Keine bekannten Terminkonflikte.':'No known scheduling conflicts.';
 const tr=value=>escapeHtml(translateOfficerText(value,language));
 const kinds={task:'Aufgabe',event:'Allianz-Events',train:'Zug',vs:'VS-Duell',absence:'Abwesenheit'};
 const roles={assignee:'Zuständig',task_substitute:'Vertretung',lead:'Leitung',event_substitute:'Vertretung',driver:'Zugfahrer',missing_value:'Fehlt',absence_substitute:'Vertretung'};
 const retrieved=new Intl.DateTimeFormat(LOCALES[language]||'de-DE',{timeZone:'Europe/Berlin',dateStyle:'short',timeStyle:'short'}).format(new Date());
 return '<section class="native-impact-warnings" aria-label="'+escapeHtml(title)+'"><h3>'+escapeHtml(title)+'</h3><p class="native-muted">'+escapeHtml(help)+'</p>'+(rows.length?'<ul>'+rows.map(item=>'<li><strong data-native-no-translate>'+escapeHtml(item.member_name||'Unbekannt')+'</strong> · '+escapeHtml(item.date||'')+' · '+
  (item.related_title?'<span data-native-no-translate>'+escapeHtml(item.related_title)+'</span>':tr(kinds[item.kind]||'Unbekannt'))+' · '+tr(roles[item.role]||'Unbekannt')+
  '<small class="native-report-context"><span>'+tr('Woche')+'</span> '+escapeHtml(warningWeek(item.date)||translateOfficerText('Unbekannt',language))+' · <span>'+tr('Abgerufen')+'</span>: '+escapeHtml(retrieved)+'</small></li>').join('')+'</ul>':'<p>'+escapeHtml(empty)+'</p>')+'</section>';
}
function warningWeek(value){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return null;
 const date=new Date(value+'T12:00:00Z');if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==value)return null;
 date.setUTCDate(date.getUTCDate()+4-(date.getUTCDay()||7));
 const year=date.getUTCFullYear(),start=new Date(Date.UTC(year,0,1));
 return year+'-W'+String(Math.ceil(((date-start)/86400000+1)/7)).padStart(2,'0');
}
