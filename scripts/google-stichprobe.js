// Prüfung bei google.de: auf https://www.google.de im Browser ausführen (Konsole oder Browser-Werkzeug des Agenten).
// Ergebnis ist das JSON für POST /api/google-plaetze (ohne "code"). Ablauf: scripts/google-plaetze-agent.md
// Pausen zwischen den Suchen, damit Google nicht sperrt. Zeigt Google ein Captcha, bricht das Skript ab.
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
  const ausgabe = { stand: new Date().toISOString().slice(0, 10), ergebnisse };
  console.log(JSON.stringify(ausgabe));
  return ausgabe;
})();
