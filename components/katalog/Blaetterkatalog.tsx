import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useT } from '../../i18n';
import * as pdfjs from 'pdfjs-dist';
import worker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { PageFlip } from 'page-flip';

pdfjs.GlobalWorkerOptions.workerSrc = worker;

// Katalog und Preisliste als Blätterbuch: PDF.js zeichnet jede Seite als Bild, page-flip blättert.
// Der Link kommt nur mit gültigem Code vom Server (R2, einige Stunden gültig), siehe api/_r2.ts.
const BREITE = 1100; // Pixel je Seite, scharf genug für Text auf großen Bildschirmen

// titel und fehlerText: für andere PDFs (Montageanleitungen); ohne sie gelten die Texte des Katalogs
const Blaetterkatalog: React.FC<{ links: { ansehen: string }; onClose: () => void; titel?: string; fehlerText?: string }> = ({ links, onClose, titel, fehlerText }) => {
  const t = useT();
  const buch = useRef<HTMLDivElement>(null);
  const [seite, setSeite] = useState(0);
  const [anzahl, setAnzahl] = useState(0);
  const [fertig, setFertig] = useState(0);
  const [fehler, setFehler] = useState(false);
  const flip = useRef<PageFlip | null>(null);

  useEffect(() => {
    let aus = false;
    const aufgabe = pdfjs.getDocument(links.ansehen);
    aufgabe.promise.then(async (pdf) => {
      if (aus || !buch.current) return;
      setAnzahl(pdf.numPages);
      const erste = await pdf.getPage(1);
      const v = erste.getViewport({ scale: 1 });
      const bilder = Array.from({ length: pdf.numPages }, () => {
        const div = document.createElement('div');
        div.className = 'bg-white';
        const img = document.createElement('img');
        img.className = 'w-full h-full object-contain';
        img.alt = '';
        div.appendChild(img);
        buch.current!.appendChild(div);
        return img;
      });
      const pf = new PageFlip(buch.current, {
        width: v.width, height: v.height, size: 'stretch', minWidth: 200, maxWidth: 1400, minHeight: 280, maxHeight: 2000,
        showCover: true, maxShadowOpacity: 0.4, mobileScrollSupport: false, usePortrait: true,
      });
      pf.loadFromHTML(buch.current.querySelectorAll(':scope > div'));
      pf.on('flip', (e) => setSeite(Number(e.data)));
      flip.current = pf;
      // Seiten nacheinander zeichnen, die vorderen zuerst
      const leinwand = document.createElement('canvas');
      for (let i = 1; i <= pdf.numPages && !aus; i++) {
        const p = await pdf.getPage(i);
        const vp = p.getViewport({ scale: BREITE / p.getViewport({ scale: 1 }).width });
        leinwand.width = vp.width; leinwand.height = vp.height;
        await p.render({ canvasContext: leinwand.getContext('2d')!, viewport: vp }).promise;
        bilder[i - 1].src = await new Promise<string>((ok) => leinwand.toBlob((b) => ok(URL.createObjectURL(b!)), 'image/jpeg', 0.85));
        setFertig(i);
      }
    }).catch(() => !aus && setFehler(true));
    return () => {
      aus = true;
      aufgabe.destroy();
      flip.current?.destroy();
      flip.current = null;
      buch.current?.querySelectorAll('img').forEach((img) => img.src && URL.revokeObjectURL(img.src));
    };
  }, [links.ansehen]);

  useEffect(() => {
    const taste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && (e.key === 'p' || e.key === 's')) e.preventDefault();
      if (e.key === 'ArrowRight') flip.current?.flipNext();
      if (e.key === 'ArrowLeft') flip.current?.flipPrev();
    };
    window.addEventListener('keydown', taste);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', taste); document.body.style.overflow = ''; };
  }, [onClose]);

  const knopf = 'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors';
  return createPortal(
    <div className="fixed inset-0 z-[80] flex flex-col bg-brand-dark select-none print:hidden" onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} role="dialog" aria-label={titel ?? t('Katalog und Preisliste 2026', 'Catalogue and price list 2026', 'Catalogue et liste de prix 2026')}>
      <div className="flex items-center gap-3 px-4 py-3 text-white">
        <span className="font-heading font-extrabold uppercase tracking-tight truncate">{titel ?? t('Katalog und Preisliste 2026', 'Catalogue and price list 2026', 'Catalogue et tarifs 2026')}</span>
        <span className="font-mono text-xs text-white/60 shrink-0">{anzahl ? `${seite + 1} / ${anzahl}` : ''}{anzahl && fertig < anzahl ? ` · ${t('lädt', 'loading', 'chargement')} ${fertig}/${anzahl}` : ''}</span>
        <button type="button" onClick={onClose} aria-label={t('Schließen', 'Close', 'Fermer')} className={`${knopf} ml-auto text-white hover:text-brand-orange`}>
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-14 pb-4">
        {fehler
          ? <p className="text-white/80 text-center max-w-md">{fehlerText ?? t('Der Katalog lässt sich gerade nicht öffnen. Der Link gilt einige Stunden; bitte die Seite neu laden und den Code erneut eingeben.', 'The catalogue cannot be opened right now. The link is valid for a few hours; please reload the page and enter the code again.', 'Le catalogue ne peut pas être ouvert pour le moment. Le lien est valable quelques heures ; veuillez recharger la page et saisir à nouveau le code.')}</p>
          : <div className="w-full" style={{ maxWidth: 'min(1400px, calc((100dvh - 90px) * 1.41))' }}><div ref={buch} /></div>}
        {!fehler && <>
          <button type="button" onClick={() => flip.current?.flipPrev()} aria-label={t('Zurückblättern', 'Previous page', 'Page précédente')} className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-brand-orange">
            <span className="material-symbols-outlined text-5xl">chevron_left</span>
          </button>
          <button type="button" onClick={() => flip.current?.flipNext()} aria-label={t('Weiterblättern', 'Next page', 'Page suivante')} className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-brand-orange">
            <span className="material-symbols-outlined text-5xl">chevron_right</span>
          </button>
        </>}
      </div>
    </div>,
    document.body,
  );
};

export default Blaetterkatalog;
