# Commander-Admin: Bedienung und Browser-Prüfung am 26.10.2026

## Tagesvergleich, Ergebnislisten und D1-Leseschutz: 2026-10-26.7

Die sechs Tageskacheln öffnen die Spielergebnisse des ausgewählten Tages in derselben Woche. Die Kategorien Ziel erreicht, Unter Ziel, Unbekannt und Vor Beitritt zeigen ihre zugehörigen Spieler und bestätigten Tagespunkte. Fehlende oder ungeprüfte Werte werden nicht als Null ausgegeben. Spielerakten und vorhandene Tagesbelege bleiben erreichbar; beim Zurückkehren bleiben Tag, Suche, Sortierung und aufgeklappte Bereiche erhalten.

Ergebnisgruppen zeigen zunächst zehn Spieler, weitere werden in Zehnerschritten eingeblendet. Sortierbar nach Tagen unter Ziel, Punkten auf-/absteigend, Namen und Allianzrang. Unvollständige Wochensummen bleiben beim Punktesortieren hinten. Die Suche berücksichtigt alle geladenen Spieler vor der Begrenzung. Tagesfilter, Sortierung, Suche und Nachladen benötigen keine zusätzlichen API- oder D1-Abfragen.

Nach der gemeldeten D1-Tagesgrenze werden wiederholte Übersichtsabfragen im Browser höchstens 60 Sekunden im Arbeitsspeicher wiederverwendet und gleichzeitige identische Abfragen zusammengefasst. Aktualisieren im Kontomenü lädt neu; Schreibaktionen, An-/Abmelden verwerfen den Zwischenspeicher. Das Mitgliederregister mit seinen bearbeitbaren Revisionen bleibt frisch. Eine ausdrücklich erkannte Lesesperre stoppt weitere API-Versuche dieser Seite bis 00:00 UTC und zeigt eine verständliche, übersetzte Meldung.

Der zugehörige bestehende Backend-Worker ergänzt maximal 30 Sekunden privaten Speicher für ausgewählte allgemeine Lesedaten. Die Anmeldung wird weiterhin vor jedem Zugriff geprüft; widerrufene Sitzungen erreichen auch warme Daten nicht. Schreibversuche verwerfen die gespeicherten Lesedaten. Ein erkannter D1-Read-Limit-Fehler sperrt weitere Datenbankzugriffe derselben Worker-Instanz bis zum UTC-Tageswechsel. Auch Wartungsaufrufe respektieren diese Sperre. Es gibt keine öffentliche HTTP-Zwischenspeicherung, Migration, Datenänderung oder Tarifumstellung.

Die Live- und Staging-Worker sind an dieselbe vorhandene D1-Datenbank gebunden. Die Maßnahmen reduzieren unnötige Zugriffe; sie garantieren keine kontoweite Verbrauchsgrenze gegen andere Clients, Importe oder weitere Datenbanken. Der Tagesverbrauch des gesamten Cloudflare-Kontos muss nach dem Reset beobachtet werden. Die bestehende Tagessperre wird durch eine Veröffentlichung nicht aufgehoben. Produktive Datenbankabfragen und erneute D1-Exporte wurden während dieser Fehlerbearbeitung ausgesetzt.

Prüfstand .7: 285 Frontend- und 280 Backend-Tests bestanden, ohne Fehler oder Skips; Syntax-/Sprachvalidierung bestanden, beide npm-Audits ohne Schwachstellen und Worker-Dry-Run bestanden. Gezielte Regressionen für Tageszuordnung, echte Nullwerte, unbekannte Werte, Beitritt, Sortierreihenfolge, Suche jenseits der ersten zehn Spieler, Nachladen, Fokus und Profilrückweg; D1-Regressionen für Ablauf, gleichzeitige Abfragen, getrennte Datenbanken, Invalidierung, Sitzungssperre und UTC-Reset. Lokaler Chrome mit synthetischer R4-/R5-Sitzung: zwei Bedienabläufe und 16 Kombinationen aus Bildschirmbreite und Darstellung bestanden. Reale R4-/R5-Konten und ein echtes iPhone/Safari bleiben wie unten dokumentiert offen.

## Umsetzung der nächsten fünf Prioritäten: 2026-10-26.6

Die folgende Umsetzung ergänzt den darunter dokumentierten Ausgangsstand von Version .5:

| Priorität | Umsetzung | Nachweis |
| --- | --- | --- |
| 1. Navigationskontext | Spielerakten kehren zum ursprünglichen VS-/Spendenbericht oder zur Mitgliederliste zurück. Ausgewählte Woche, Suche, Filter, aufgeklappte Bereiche, Scrollposition und auslösendes Bedienelement bleiben erhalten. Unterwerkzeuge behalten Allianz beziehungsweise Einsätze als Ausgangsbereich und bieten einen Rückweg. | Regressionen prüfen die ursprüngliche Berichtsanzeige, Filter, Fokus und ausbleibendes erneutes Laden; lokale Chrome-Bedienwege bestanden. |
| 2. Berichtswochen | VS- und Spendenhinweise zeigen ihre eigene Woche, den Datenstatus und die vorhandene Aufnahmezeit. Fehlende Aufnahmezeiten bleiben ausdrücklich unbekannt. Datierte Konflikthinweise zeigen ihre Kalenderwoche und den Abrufzeitpunkt; die allgemeine OCR-Warteschlange ist als wochenübergreifend gekennzeichnet. | Getrennte Berichtswochen und unbekannte Aufnahmezeit im Cockpit sowie Datumswarnungen am Jahresanfang geprüft. |
| 3. Mobile Bedienung | Kompakte Kontoauswahl ersetzt ständig sichtbare Zugangsschaltflächen. Mitglieder können nach aktiv/Archiv gefiltert werden; VS erhält eine Spielersuche. Mobile Eingabefelder verwenden mindestens 16 Pixel, Belegdialoge berücksichtigen die Bildschirmhöhe und den unteren sicheren Rand. | Lokaler Chrome bei 320/375/390/1365 Pixeln in hell/dunkel, jeweils mit synthetischer R4- und R5-Sitzung. |
| 4. Statusanzeigen | Bekannte Zustände wie REVIEW, NULL, NO_CHECKPOINT, completed und former erhalten verständliche Anzeigenamen in 15 Sprachen. Originale API-Werte, Daten und Spielernamen bleiben erhalten. Auch Rollen in Konflikthinweisen und Statusänderungen im Protokoll werden verständlich angezeigt. | Sprachtests und synthetische Spielernamen mit REVIEW beziehungsweise NULL im Namen. |
| 5. Belegdialoge | VS-, Profil- und Duellbelege verwenden dieselbe Fokussteuerung: Tab/Shift+Tab bleiben im Dialog, Escape schließt, Fokus kehrt zur Quelle zurück. Hintergrundscrollen wird währenddessen gesperrt und beim Schließen freigegeben. Ein verspätetes Duellbild öffnet einen geschlossenen Dialog nicht erneut. | Regressionen für Tastatur, Fokus, Scrollsperre und verspätete Bildantwort; echter lokaler Chrome-Bedienweg mit synthetischem Originalbild. |

Rückwege und Berichtsdaten bleiben ausschließlich im Arbeitsspeicher der aktuellen Seite. Abmelden verwirft die Rückwege. Authentifizierung, Backend-Rechte und Datenbankschema wurden in diesem Paket nicht verändert.

Prüfstand .6: 281 Frontend-Tests bestanden, keine Fehler oder Skips; Sprach-/Inhalts-/Syntaxvalidierung bestanden; npm audit 0 Schwachstellen. Zwei lokale Chrome-Bedienabläufe und 16 Kombinationen aus synthetischer Rolle, Bildschirmbreite und Darstellung bestanden. Die Release-Importmap und der Service-Worker sind gemeinsam auf 2026-10-26.6 gestempelt.

### Grenzen der Rollen- und Geräteabnahme

| Prüfung | Stand |
| --- | --- |
| Normale R4-UI mit synthetischer Sitzung | Lokal automatisiert geprüft; kein Nachweis für ein echtes R4-Konto. |
| Separate R5-UI mit synthetischer Sitzung | Lokal automatisiert geprüft; kein Nachweis für ein echtes R5-Konto. |
| Reales gewöhnliches R4-Konto ohne Eigentümerrechte | Weiterhin offen. |
| Reales separates R5-Konto | Weiterhin offen. |
| Echtes iPhone/Safari einschließlich Bildschirmtastatur und Dateiauswahl | Weiterhin offen. |
| Frühere produktive Eigentümeranmeldung | Bezieht sich auf den darunter dokumentierten Stand .5 und ersetzt keine der offenen Rollenprüfungen. |

Für die reale Rollenprüfung müssen insbesondere eigene Codeänderung, Erstellung beziehungsweise Zurücksetzung anderer Zugänge und serverseitige Ablehnung unberechtigter Schreibzugriffe getrennt geprüft werden. Die lokale Browserprüfung hat keine produktiven Konten, Messwerte oder Testdatensätze angelegt. Eine vollständige produktive Rollen- und iPhone-Abnahme ist damit ausdrücklich nicht erteilt.

---

Geprüft wurde die bestehende produktive Website in Chromium mit einer echten angemeldeten Website-Eigentümerin. Die Bewertung trennt vorhandene Bedienprobleme von den in Release 2026-10-26.5 korrigierten Fehlern. Private Originalbilder, Zugangsdaten und Browserprotokolle gehören nicht zu diesem Dokument.

## Ergebnis

Die fünf Hauptbereiche und die eingeklappten Spielerakten geben dem Commander eine brauchbare Grundstruktur. Die größten Hindernisse sind wechselnde Navigationskontexte, lange Listen und technische Statusbegriffe. Ein neues Framework oder ein Neubau ist dafür nicht erforderlich.

## In diesem Release korrigiert

- Duell-Reviews übernehmen weder Werte noch versteckte Beleg- und Vorschlagszuordnungen aus dem vorherigen Prüffall. Bestehende Wochen erhalten ihre aktuelle Revision. Explizite Spieltagnummern bleiben bei teilweise oder anders sortiert gelieferten Vorschlägen erhalten.
- Eine teilweise Liga-Aufnahme verkleinert den erwarteten Gesamtumfang nicht mehr automatisch auf die höchste erkannte Rangnummer.
- Ehemalige Mitglieder aus dem vorhandenen geschützten Mitgliederregister sind in der Mitgliedersuche und im Archiv erreichbar. Ihre vorhandenen Spielerakten und historischen Messungen werden weiterhin über dieselbe API geladen.
- Der Bildbetrachter unterscheidet automatische OCR-Prüfung von einer tatsächlichen Officer-Abnahme. Bestätigter Spielername und OCR-Rohname erscheinen getrennt; Originalwerte, Bildzeile und Prüfsummen bleiben unverändert.
- Die Erklärung zum Mitglieder-Abgleich entspricht der bestehenden Regel für zwei vollständige Profilbestände aufeinanderfolgender Wochen. Veraltete feste Wochenangaben und falsche Aussagen über VS-Fehlzeiten und Rang-Ausnahmen wurden entfernt. Die Lifecycle-Logik selbst wurde nicht geändert.
- Mitglieder- und Registersuche haben einen zugänglichen Namen. Hinweise im Belegdialog verwenden im dunklen Design wieder zusammenpassende Text- und Hintergrundfarben.
- Die transitive Testabhängigkeit undici wurde innerhalb der vorhandenen Hauptversion aktualisiert. Sie wird nicht als Website-Bundle ausgeliefert.

## Sinnvolle nächste Verbesserungen

| Priorität | Beobachtung | Empfohlene Änderung |
| --- | --- | --- |
| Hoch | Unterwerkzeuge aus Allianz oder Einsätzen springen optisch zu Mehr. Der ursprüngliche Zusammenhang geht verloren. | Den Ausgangsbereich aktiv halten und einen eindeutigen Rückweg anzeigen. Mehr bleibt ein zusätzlicher Einstieg. |
| Hoch | Das Cockpit zeigt Wochenwarnungen neben heutigen Aktionen ohne durchgehend sichtbare Berichtsperiode. | Woche, Datenstand und Aktion direkt an jede Warnung setzen. Vergangene Auswertungen von heutigen Verpflichtungen unterscheiden. |
| Hoch | Belegdialoge lassen sich im geprüften Stand nicht per Escape schließen; die Tastaturführung ist nicht vollständig abgenommen. | Gemeinsame Dialogsteuerung mit Escape, eingeschlossenem Fokus und Rückkehr zum auslösenden Wert implementieren und prüfen. |
| Mittel | Auf kleinen Displays stehen mehrere Leisten vor dem eigentlichen Tagesinhalt. | Offiziersidentität und Zugang in eine kompakte Kontoleiste zusammenziehen; den Erkennungshinweis nach Bestätigung ausblenden. Hauptnavigation beibehalten. |
| Mittel | Status und Admin-Protokoll enthalten Begriffe wie completed, former sowie technische Aktions- und Objektkennungen. | Verständliche übersetzte Anzeigenamen verwenden. Technische Kennungen nur in aufklappbaren Details zeigen. API-Werte unverändert lassen. |
| Mittel | VS öffnet große Ergebnisgruppen; das Protokoll lädt bis zu 500 Einträge. | Suchen, gezielte Filter und schrittweises Nachladen näher an die Liste setzen. Eine kompakte Ausgangsansicht erhalten. |
| Mittel | Unauffällige Hinweise wie fehlende Terminkonflikte beanspruchen viel Raum. | Normale Zustände als kurze Statuszeile darstellen; Warnkarten für tatsächlich notwendige Entscheidungen verwenden. |
| Mittel | Die Registerzahlen erklären ungeklärte Identitäten und historische Zugbelege nicht vollständig. | Aktive Mitglieder, echte Archiv-Identitäten und reine historische Zugbelege verständlich unterscheiden; ungeklärte Identitäten gesondert zählen. |
| Niedrig | Leere Duell-, Diplomatie- und Aufgabenansichten sind sachlich korrekt, aber wenig handlungsorientiert. | Jeweils einen klaren nächsten Bedienweg und die dafür nötige Quelle erläutern. |

## Durchgeführte Browser-Prüfung

- Produktiver Lesezugriff auf Kommando, VS, Duell/Liga, Spenden, Mitglieder, Register/Archiv, Mitglieder-Abgleich, Züge, Events, Aufgaben, Abwesenheiten, Diplomatie, OCR-Prüfung, Admin-Protokoll, Einstellungen und Zugangsverwaltung.
- Spielerakten mit ungewöhnlichen Namen und einem bestätigten Nullwert geöffnet. Private Originalbelege für Stärke, Kills, Spenden und einen VS-Tageswert erfolgreich geladen.
- Hauptansichten bei 320, 375, 390 und 1365 CSS-Pixeln ohne horizontales Überlaufen geprüft. Zusätzliche Prüfungen von Verwaltungsansichten bei 320, 390 und 1365 Pixeln in hell und dunkel durchgeführt. Das ersetzt keine vollständige WCAG-Zertifizierung.
- Duell-Fallwechsel und teilweise Liga-Aufnahme zusätzlich im echten lokalen Browser mit ausdrücklich synthetischen Daten geprüft. Produktive Daten wurden dafür nicht angelegt.
- Keine produktiven Schreiboperationen, Zugangsänderungen oder erneute historische Datenimporte als Test ausgeführt.

## Lokale Release-Prüfungen

- Frontend: 277 Tests bestanden, keine Fehler und keine übersprungenen Tests.
- Frontend-Validierung: Syntax, Inhaltsreferenzen und 344 öffentliche Übersetzungsschlüssel in 15 Sprachen bestanden. Die neuen Officer-Hinweise werden zusätzlich in allen 15 Sprachen geprüft.
- Backend-Ausgangsstand: 276 Tests und Syntaxprüfung bestanden; dieser Release ändert keinen Worker und kein Datenbankschema.
- npm audit: 0 Schwachstellen nach der gezielten Aktualisierung auf undici 8.12.3. Die betroffene Versionsreihe und korrigierten Versionen sind im [Upstream-Sicherheitshinweis](https://github.com/advisories/GHSA-xjj6-f33q-929c) dokumentiert.
- Release-Importmap und Service-Worker sind gemeinsam auf 2026-10-26.5 gestempelt. Rückkehr zum vorherigen Frontend-Commit erfordert keine Datenbank-Rückmigration.

## Grenzen der Abnahme

Eine vollständige Freigabe aller Bedien- und Berechtigungsvarianten ist damit noch nicht erteilt. Physisches iPhone/Safari, eine gewöhnliche R4-Sitzung ohne Eigentümerrechte, eine getrennte R5-Sitzung, vollständige Tastaturnavigation und echte Schreibabläufe mit fachlich erforderlichen Eingaben bleiben separat zu prüfen. Der zeitgemessene Aufnahmeablauf auf dem Spiel-PC gehört ebenfalls nicht zur Desktop-Browser-Abnahme.

Die noch offenen UX-Punkte sind keine Behauptung neuer Backend-Funktionen. Der Release korrigiert die oben genannten, lokal geprüften Fehler innerhalb der vorhandenen Komponenten.
