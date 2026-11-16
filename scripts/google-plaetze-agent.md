# Auftrag für den Agenten auf dem A+-Rechner: Google-Plätze jede Woche prüfen

## Ziel

Jeden Montag um 7 Uhr bei google.de nachsehen, auf welchem Platz A+ Urban Design bei 13 Suchbegriffen steht und wer davor steht. Das Ergebnis geht an die Webseite. Im Admin unter „Analyse“ steht dann „Bei google.de geprüft“ mit Datum.

Kosten: keine. Es ist eine normale Google-Suche im Browser, wie von Hand.

## Einmal einrichten

1. **Admin-Code ablegen.** Datei `~/Applications/APlusOS/.geheim/aplus-admin-code` anlegen, Inhalt nur der Betreiber-Code fürs Admin (eine Zeile). Rechte: `chmod 600`. Den Code legt Joachim selbst in die Datei; der Agent fragt nie danach und gibt ihn nie aus.
2. **Skill anlegen:** `~/Applications/APlusOS/.claude/skills/google-plaetze/SKILL.md` mit dem Ablauf unten. Das Skript daneben als `google-plaetze.js` speichern.
3. **Wochenaufgabe anlegen:** in der Claude-App eine geplante Aufgabe, jeden Montag 7:00, Auftrag: „Skill google-plaetze ausführen“. Der Rechner muss dann an sein und die Claude-App offen.

## Ablauf (Inhalt des Skills)

1. Im eingebauten Browser der Claude-App `https://www.google.de` öffnen.
   - Fragt Google nach Cookies: „Alle ablehnen“.
   - Zeigt Google ein Captcha („Ich bin kein Roboter“): sofort abbrechen und melden. Nie selbst lösen.
2. Auf diesem google.de-Tab das Skript `google-plaetze.js` ausführen (Browser-Werkzeug „JavaScript ausführen“). Es braucht etwa 30 Sekunden und gibt JSON zurück: `{ "stand": "JJJJ-MM-TT", "ergebnisse": [ { "begriff", "platz", "davor" }, … ] }`.
3. Prüfen, bevor es rausgeht:
   - Es sind 13 Begriffe.
   - Nicht alle haben `platz: null` und leeres `davor`. Sonst hat Google nichts geliefert: abbrechen und melden.
4. An die Webseite schicken. Das JSON aus Schritt 2 als `/tmp/google-plaetze.json` speichern, dann:

   ```bash
   CODE=$(cat ~/Applications/APlusOS/.geheim/aplus-admin-code)
   python3 -c "import json,sys; d=json.load(open('/tmp/google-plaetze.json')); d['code']=sys.argv[1]; print(json.dumps(d))" "$CODE" \
     | curl -s -X POST https://www.aplusurbandesign.com/api/google-plaetze -H 'Content-Type: application/json' -d @-
   ```

   Erwartete Antwort: `{"ok":true,"stand":"…","begriffe":13}`. Danach `/tmp/google-plaetze.json` löschen.
5. Eine Zeile melden: Datum, und je Begriff der Platz (oder „nicht auf Seite 1“). Bei Fehler die Antwort der Webseite mit melden, den Code nie.

## Das Skript (`google-plaetze.js`)

```js
(async () => {
  const begriffe = ['skatepark hersteller', 'skatepark beton', 'skatepark bauen', 'skatepark elemente', 'skatepark planung', 'skatepark kosten',
    'skate bowl', 'pumptrack hersteller', 'pumptrack bauen', 'umkleidekabine outdoor', 'umkleideschnecke', 'grillplatz kaufen', 'eishockey bande'];
  const ergebnisse = [];
  for (const begriff of begriffe) {
    const r = await fetch('/search?hl=de&gl=de&num=10&pws=0&q=' + encodeURIComponent(begriff));
    const html = await r.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    if (r.url.includes('/sorry/') || !doc.querySelector('#search')) throw new Error('Google zeigt ein Captcha oder keine Treffer bei: ' + begriff);
    const treffer = [...doc.querySelectorAll('#search a h3')]
      .map((h) => (h.closest('a').querySelector('cite') || h.closest('a').parentElement.querySelector('cite'))?.innerText.split(' ')[0] ?? '')
      .filter((c) => c.startsWith('http'))
      .map((c) => c.replace(/^https?:\/\/(www\.|de\.)?/, ''));
    const i = treffer.findIndex((t) => t.includes('aplusurbandesign'));
    const davor = [...new Set(i < 0 ? treffer.slice(0, 5) : treffer.slice(0, i))].slice(0, 10);
    ergebnisse.push({ begriff, platz: i < 0 ? null : i + 1, davor });
    await new Promise((res) => setTimeout(res, 1500));
  }
  return { stand: new Date().toISOString().slice(0, 10), ergebnisse };
})();
```

## Was der Agent nicht tut

- Kein Captcha lösen, keine Google-Anmeldung.
- Nichts an der Webseite oder ihrem Code ändern. Er schickt nur das Ergebnis.
- Den Admin-Code nie in Chat, Log oder Meldung schreiben.
- Neue Suchbegriffe nur nach Rücksprache mit Joachim. Die Liste im Skript und die Liste der Webseite (`googleStichprobe.ts`) müssen gleich sein.
