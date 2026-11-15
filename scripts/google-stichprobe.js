// Stichprobe für googleStichprobe.ts: auf https://www.google.de in der Browser-Konsole einfügen und ausführen.
// Gibt je Begriff den Platz von A+ und die Treffer davor aus. Pausen zwischen den Suchen, damit Google nicht sperrt.
(async () => {
  const begriffe = ['skatepark hersteller', 'skatepark beton', 'skatepark bauen', 'skatepark elemente', 'skatepark planung', 'skatepark kosten',
    'skate bowl', 'pumptrack hersteller', 'pumptrack bauen', 'umkleidekabine outdoor', 'umkleideschnecke', 'grillplatz kaufen', 'eishockey bande'];
  const zeilen = [];
  for (const begriff of begriffe) {
    const html = await (await fetch('/search?hl=de&gl=de&num=10&pws=0&q=' + encodeURIComponent(begriff))).text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const treffer = [...doc.querySelectorAll('#search a h3')]
      .map((h) => (h.closest('a').querySelector('cite') || h.closest('a').parentElement.querySelector('cite'))?.innerText.split(' ')[0] ?? '')
      .filter((c) => c.startsWith('http'))
      .map((c) => c.replace(/^https?:\/\/(www\.|de\.)?/, ''));
    const i = treffer.findIndex((t) => t.includes('aplusurbandesign'));
    const davor = [...new Set(i < 0 ? treffer.slice(0, 5) : treffer.slice(0, i))];
    zeilen.push(`  { begriff: '${begriff}', platz: ${i < 0 ? 'null' : i + 1}, davor: ${JSON.stringify(davor).replace(/"/g, "'").replace(/,/g, ', ')} },`);
    await new Promise((r) => setTimeout(r, 1500));
  }
  console.log(zeilen.join('\n'));
})();
