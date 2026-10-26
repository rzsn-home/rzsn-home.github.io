import test from 'node:test';
import assert from 'node:assert/strict';
import { COPY, DAILY_GUIDES } from '../assets/content.js';
import { GUIDE_COPY } from '../assets/guide-text.js';
import { UI, LANGUAGES, translate, loadLanguage } from '../assets/i18n.js';
import { guideState, armsWindow, berlinParts } from '../assets/engine.js';
import { nextReset } from '../assets/overview.js';
import { HUD_COPY, hudText } from '../assets/hud-i18n.js';
await Promise.all(Object.keys(LANGUAGES).map(loadLanguage));

const clockKeys=['enemyBusterUpcomingTitle','enemyBusterWindow','shield','gatheringPrep','drone'];
const guideClockKeys=['guideVsSundayActions','guideVsMondayActions','guideVsTuesdayActions','guideVsWednesdayActions','guideVsThursdayActions','guideVsFridayActions','guideVsSaturdayActions'];
const stale=/(Berlin|Berlino|Berlim|Berlijn|Берлін|ベルリン|베를린|เบอร์ลิน|ប៊ែកឡាំង|برلين|CET|CEST)/i;

test('public clock guidance uses Server Time in all 15 languages',()=>{
  for (const lang of Object.keys(LANGUAGES)) {
    assert.match(translate(UI,'reset',lang),/00:00.*(?:ST|Server Time)/,lang);
    assert.match(translate(UI,'armsNote',lang),/(?:ST|Server Time)/,lang);
    assert.doesNotMatch(translate(UI,'reset',lang),stale,lang);
    assert.doesNotMatch(translate(UI,'armsNote',lang),stale,lang);
    for (const key of clockKeys) assert.doesNotMatch(translate(COPY,key,lang),stale,`${lang} ${key}`);
    for (const key of guideClockKeys) assert.doesNotMatch(translate(GUIDE_COPY,key,lang),stale,`${lang} ${key}`);
  }
});

test('Server Time uses 02:00 UTC reset, equivalent to 04:00 CEST and 03:00 CET',()=>{
  assert.equal(guideState(new Date('2026-09-14T04:00:00+02:00')).serverMinute,0);
  assert.equal(guideState(new Date('2026-09-14T12:00:00+02:00')).serverMinute,8*60);
  assert.equal(guideState(new Date('2026-09-14T20:00:00+02:00')).serverMinute,16*60);
  assert.equal(guideState(new Date('2026-09-15T00:00:00+02:00')).serverMinute,20*60);
  assert.equal(guideState(new Date('2026-10-25T02:59:00+01:00')).serverMinute,23*60+59);
  assert.equal(guideState(new Date('2026-10-25T03:00:00+01:00')).serverMinute,0);
  assert.equal(guideState(new Date('2026-10-25T03:01:00+01:00')).serverMinute,1);
  assert.equal(guideState(new Date('2027-03-28T03:59:00+02:00')).serverMinute,23*60+59);
  assert.equal(guideState(new Date('2027-03-28T04:00:00+02:00')).serverMinute,0);
});

test('server midnight HUD uses Berlin winter 03:00 and summer 04:00 for the next reset in all languages',()=>{
  const cases=[
    ['2026-10-26T12:00:00+01:00','03:00'],
    ['2026-09-22T12:00:00+02:00','04:00'],
    ['2026-10-24T12:00:00+02:00','03:00'],
    ['2027-03-27T12:00:00+01:00','04:00'],
  ];
  for(const [iso,expected] of cases){
    const parts=berlinParts(nextReset(guideState(new Date(iso))));
    const localTime=parts.hour+':'+parts.minute;
    assert.equal(localTime,expected,iso);
    for(const language of Object.keys(HUD_COPY)){
      const label=hudText(language,'timeAnchor',{localTime});
      assert.match(label,/00:00 ST/);
      assert.ok(label.includes(expected),language+' '+iso);
      assert.doesNotMatch(label,/\{localTime\}/);
    }
  }
  assert.equal(Object.keys(HUD_COPY).length,15);
});

test('Arms Race windows are stored and evaluated in Server Time',()=>{
  assert.deepEqual([DAILY_GUIDES.monday.arms.start,DAILY_GUIDES.monday.arms.end],[16,20]);
  assert.deepEqual([DAILY_GUIDES.tuesday.arms.start,DAILY_GUIDES.tuesday.arms.end],[8,12]);
  assert.deepEqual([DAILY_GUIDES.wednesday.arms.start,DAILY_GUIDES.wednesday.arms.end],[8,12]);
  assert.deepEqual([DAILY_GUIDES.thursday.arms.start,DAILY_GUIDES.thursday.arms.end],[8,12]);
  assert.equal(armsWindow(guideState(new Date('2026-09-14T19:59:00+02:00')),DAILY_GUIDES.monday),'later');
  assert.equal(armsWindow(guideState(new Date('2026-09-14T20:00:00+02:00')),DAILY_GUIDES.monday),'active');
  assert.equal(armsWindow(guideState(new Date('2026-09-15T00:00:00+02:00')),DAILY_GUIDES.monday),'ended');
});
