# Commander-Admin: Bedienung und Browser-Prüfung am 26.10.2026

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
