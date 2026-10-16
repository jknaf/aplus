import React from 'react';
import { createPortal } from 'react-dom';
import { gruppen, umriss, type Ctx, type Park, type V, type Zeile, type Zusatz } from './logik';

// Druckansicht für „Drucken / PDF“: Kopf mit Logo und Datum, 3D-Ansicht, Plan als Vektorgrafik (wahlweise bemaßt), Stückliste.
// Gedruckt wird über den Browser (Ziel „Als PDF sichern“); im Bildschirm ist der Bereich unsichtbar.

export interface DruckOptionen { titel: string; bemassung: boolean; bezeichnungen: boolean; ansicht3d: boolean; liste: boolean }

interface Props { park: Park; ctx: Ctx; zusatz: Zusatz[]; zeilen: Zeile[]; hinweise: string[]; optionen: DruckOptionen; bild3d: string; link: string }

const m = (x: number) => x.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const box = (p: V[]) => ({
  x0: Math.min(...p.map((q) => q.x)), x1: Math.max(...p.map((q) => q.x)),
  z0: Math.min(...p.map((q) => q.z)), z1: Math.max(...p.map((q) => q.z)),
});

// Maßlinie mit Endstrichen und Text in der Mitte (Koordinaten in Metern)
const Mass: React.FC<{ a: V; b: V; text: string; s: number; quer?: boolean }> = ({ a, b, text, s, quer }) => {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const len = Math.hypot(dx, dz) || 1;
  const n = { x: -dz / len, z: dx / len };
  const strich = 0.18 * s;
  const mx = (a.x + b.x) / 2;
  const mz = (a.z + b.z) / 2;
  const winkel = (Math.atan2(dz, dx) * 180) / Math.PI;
  return (
    <g stroke="#2C3530" strokeWidth={0.02 * s} fill="none">
      <line x1={a.x} y1={a.z} x2={b.x} y2={b.z} />
      {[a, b].map((p, i) => (
        <line key={i} x1={p.x - n.x * strich} y1={p.z - n.z * strich} x2={p.x + n.x * strich} y2={p.z + n.z * strich} />
      ))}
      <text
        x={mx} y={mz} dy={-0.12 * s} fontSize={0.32 * s} fill="#2C3530" stroke="none" textAnchor="middle"
        transform={quer ? `rotate(${winkel} ${mx} ${mz})` : undefined}
      >{text}</text>
    </g>
  );
};

export const Plan: React.FC<{ park: Park; ctx: Ctx; zusatz: Zusatz[]; bemassung: boolean; bezeichnungen?: boolean }> = ({ park, ctx, zusatz, bemassung, bezeichnungen = true }) => {
  const { l, b } = park.flaeche;
  const rand = bemassung ? 2.2 : 0.6;
  const s = Math.max(l, b) / 30; // Strichstärken und Schrift mit der Größe skalieren
  const raster: React.ReactNode[] = [];
  for (let x = -l / 2; x <= l / 2 + 1e-6; x += 1.25) raster.push(<line key={`x${x}`} x1={x} y1={-b / 2} x2={x} y2={b / 2} />);
  for (let z = -b / 2; z <= b / 2 + 1e-6; z += 1.25) raster.push(<line key={`z${z}`} x1={-l / 2} y1={z} x2={l / 2} y2={z} />);
  const gs = gruppen(park, ctx);
  return (
    <svg viewBox={`${-l / 2 - rand} ${-b / 2 - rand} ${l + 2 * rand} ${b + 2 * rand}`} className="w-full h-auto" style={{ maxHeight: '150mm' }}>
      <rect x={-l / 2} y={-b / 2} width={l} height={b} fill="#F2F0EB" stroke="#8A8A80" strokeWidth={0.03 * s} />
      <g stroke="#D0CEC7" strokeWidth={0.01 * s}>{raster}</g>
      {park.teile.map((t) => {
        const p = umriss(t, ctx);
        const c = p.reduce((a, q) => ({ x: a.x + q.x / p.length, z: a.z + q.z / p.length }), { x: 0, z: 0 });
        const bb = box(p);
        const breite = Math.max(bb.x1 - bb.x0, bb.z1 - bb.z0);
        const hoehe = Math.min(bb.x1 - bb.x0, bb.z1 - bb.z0);
        const quer = bb.z1 - bb.z0 > bb.x1 - bb.x0; // Schrift entlang der langen Seite
        const name = ctx.info[t.slug]?.name ?? t.slug;
        const code = ctx.info[t.slug]?.code ?? '';
        // Name und Kürzel, Schrift so klein, dass beides in das Element passt
        const fs = Math.min(0.24 * s, (breite * 0.9) / (Math.max(name.length, code.length) * 0.58), hoehe * 0.32);
        return (
          <g key={t.id}>
            <polygon points={p.map((q) => `${q.x},${q.z}`).join(' ')} fill="#E5E3DC" stroke="#2C3530" strokeWidth={0.025 * s} />
            {bezeichnungen && fs > 0.04 && (
              <g transform={quer ? `rotate(-90 ${c.x} ${c.z})` : undefined}>
                <text x={c.x} y={c.z} dy={-0.1 * fs} fontSize={fs} textAnchor="middle" fill="#2C3530" fontWeight="bold">{name}</text>
                <text x={c.x} y={c.z} dy={1.05 * fs} fontSize={fs * 0.85} textAnchor="middle" fill="#5A5A54">{code}</text>
              </g>
            )}
          </g>
        );
      })}
      {zusatz.filter((z) => z.slug.startsWith('gelaender')).map((z, i) => {
        const p = umriss({ id: `g${i}`, slug: z.slug, x: z.x, z: z.z, rot: z.rot }, ctx);
        return <polygon key={i} points={p.map((q) => `${q.x},${q.z}`).join(' ')} fill="#6B8F4A" stroke="none" />;
      })}
      {bemassung && (
        <g>
          <Mass a={{ x: -l / 2, z: -b / 2 - 1.3 }} b={{ x: l / 2, z: -b / 2 - 1.3 }} text={`${m(l)} m`} s={s} />
          <Mass a={{ x: -l / 2 - 1.3, z: b / 2 }} b={{ x: -l / 2 - 1.3, z: -b / 2 }} text={`${m(b)} m`} s={s} quer />
          {gs.map((g, i, alle) => {
            const bb = box(g.flatMap((t) => umriss(t, ctx)));
            const andere = alle.filter((x) => x !== g).map((x) => box(x.flatMap((t) => umriss(t, ctx))));
            // Lagemaß nur zeichnen, wenn die Linie keine andere Gruppe kreuzt
            const frei = (a: V, c: V) => !andere.some((o) => Math.max(a.x, c.x) > o.x0 && Math.min(a.x, c.x) < o.x1 && Math.max(a.z, c.z) > o.z0 && Math.min(a.z, c.z) < o.z1);
            const zm = (bb.z0 + bb.z1) / 2;
            const xm = (bb.x0 + bb.x1) / 2;
            const waagrecht = [
              { a: { x: -l / 2, z: zm }, c: { x: bb.x0, z: zm }, d: bb.x0 + l / 2 },
              { a: { x: bb.x1, z: zm }, c: { x: l / 2, z: zm }, d: l / 2 - bb.x1 },
            ].filter((x) => frei(x.a, x.c)).sort((x, y) => x.d - y.d)[0];
            const senkrecht = [
              { a: { x: xm, z: -b / 2 }, c: { x: xm, z: bb.z0 }, d: bb.z0 + b / 2 },
              { a: { x: xm, z: bb.z1 }, c: { x: xm, z: b / 2 }, d: b / 2 - bb.z1 },
            ].filter((x) => frei(x.a, x.c)).sort((x, y) => x.d - y.d)[0];
            const o = 0.45;
            return (
              <g key={i}>
                {/* Größe der Gruppe */}
                <Mass a={{ x: bb.x0, z: bb.z0 - o }} b={{ x: bb.x1, z: bb.z0 - o }} text={m(bb.x1 - bb.x0)} s={s * 0.8} />
                <Mass a={{ x: bb.x1 + o, z: bb.z0 }} b={{ x: bb.x1 + o, z: bb.z1 }} text={m(bb.z1 - bb.z0)} s={s * 0.8} quer />
                {/* Lage: Abstand zum näheren freien Flächenrand */}
                <g opacity={0.6}>
                  {waagrecht && waagrecht.d > 0.05 && <Mass a={waagrecht.a} b={waagrecht.c} text={m(waagrecht.d)} s={s * 0.7} />}
                  {senkrecht && senkrecht.d > 0.05 && <Mass a={senkrecht.a} b={senkrecht.c} text={m(senkrecht.d)} s={s * 0.7} quer />}
                </g>
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
};

const Druck: React.FC<Props> = ({ park, ctx, zusatz, zeilen, hinweise, optionen, bild3d, link }) => {
  const datum = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const anzahl = park.teile.length;
  const kopf = (
    <header className="flex items-end justify-between border-b-2 border-[#2C3530] pb-3 mb-5">
      <img src="/aplus-logo.svg" alt="A+ Urban Design" style={{ height: '14mm' }} />
      <div className="text-right text-[10pt] leading-snug">
        <div className="font-bold uppercase tracking-wider">Skatepark-Planung</div>
        <div>{datum}</div>
      </div>
    </header>
  );
  return createPortal(
    <div className="druck-bereich hidden text-[#2C3530] bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        @page { size: A4 landscape; margin: 12mm; }
        @media print {
          body > *:not(.druck-bereich) { display: none !important; }
          .druck-bereich { display: block !important; }
          .druck-seite { break-after: page; }
          .druck-seite:last-child { break-after: auto; }
        }
      `}</style>
      <section className="druck-seite">
        {kopf}
        <div className="flex justify-between items-baseline mb-4">
          <h1 className="text-[20pt] font-extrabold uppercase">{optionen.titel || 'Skatepark'}</h1>
          <p className="text-[10pt]">Fläche {m(park.flaeche.l)} × {m(park.flaeche.b)} m · {anzahl} Elemente · {park.flaeche.angeboescht ? 'angeböscht' : 'freistehend'}</p>
        </div>
        {optionen.ansicht3d && bild3d ? (
          <div className="grid grid-cols-2 gap-5 items-start">
            <figure><img src={bild3d} alt="3D-Ansicht" className="w-full border border-[#D0CEC7]" /><figcaption className="text-[8pt] mt-1">3D-Ansicht</figcaption></figure>
            <figure><Plan park={park} ctx={ctx} zusatz={zusatz} bemassung={optionen.bemassung} bezeichnungen={optionen.bezeichnungen} /><figcaption className="text-[8pt] mt-1">Draufsicht{optionen.bemassung ? ', Maße in Metern' : ''}, Raster 1,25 m</figcaption></figure>
          </div>
        ) : (
          <figure><Plan park={park} ctx={ctx} zusatz={zusatz} bemassung={optionen.bemassung} bezeichnungen={optionen.bezeichnungen} /><figcaption className="text-[8pt] mt-1">Draufsicht{optionen.bemassung ? ', Maße in Metern' : ''}, Raster 1,25 m</figcaption></figure>
        )}
      </section>
      {optionen.liste && (
        <section className="druck-seite">
          {kopf}
          <h2 className="text-[14pt] font-extrabold uppercase mb-3">Stückliste</h2>
          <table className="w-full text-[9pt] border-collapse">
            <thead><tr className="border-b border-[#2C3530] text-left"><th className="py-1 pr-3">Code</th><th className="py-1 pr-3">Bezeichnung</th><th className="py-1 text-right">Menge</th><th className="py-1 pl-3 text-right">Gewicht ca.</th></tr></thead>
            <tbody>
              {zeilen.map((z) => (
                <tr key={z.code + z.name} className="border-b border-[#E5E3DC]">
                  <td className="py-1 pr-3 font-mono">{z.code}</td>
                  <td className="py-1 pr-3">{z.name}{z.auto ? ' (automatisch ergänzt)' : ''}</td>
                  <td className="py-1 text-right font-bold">{z.menge}</td>
                  <td className="py-1 pl-3 text-right">{z.kg ? `${z.kg.toLocaleString('de-DE')} kg` : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {hinweise.length > 0 && (
            <div className="mt-4 text-[9pt]"><strong>Offene Hinweise:</strong><ul className="list-disc ml-5">{hinweise.map((h) => <li key={h}>{h}</li>)}</ul></div>
          )}
          <p className="mt-5 text-[8pt] text-[#5A5A54]">
            Planung schematisch, erstellt mit dem Konfigurator von A+ Urban Design. Preise, Fracht und Montage erhalten Sie mit dem Angebot;
            bauseitige Leistungen sind nicht enthalten. Maßgeblich ist das Angebot.
          </p>
          <p className="mt-2 text-[8pt] break-all">Park online öffnen: {link}</p>
          <p className="mt-2 text-[8pt]">A+ Urban Design · post@aplusurbandesign.com · www.aplusurbandesign.com</p>
        </section>
      )}
    </div>,
    document.body,
  );
};

export default Druck;
