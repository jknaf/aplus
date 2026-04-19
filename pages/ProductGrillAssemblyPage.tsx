import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { useActiveSection, useReveal, useScrollProgress } from '../components/assembly/hooks';
import {
  ChainCounterweightAnim,
  FoundationDiagram,
  PlanDiagram,
  RiggingDiagram,
  SetzreihenfolgeDiagram,
  TraegerDiagram,
} from '../components/assembly/diagrams';
import './ProductGrillAssemblyPage.css';

const SECTION_IDS = ['top', 'voraussetzungen', 'abladen', 'montage', 'werkzeuge', 'wartung'];

const NAV_ITEMS: { id: string; label: string }[] = [
  { id: 'top', label: '00 · Intro' },
  { id: 'voraussetzungen', label: '01 · Vorbereitung' },
  { id: 'abladen', label: '02 · Abladen' },
  { id: 'montage', label: '03 · Montage' },
  { id: 'werkzeuge', label: '04 · Werkzeuge' },
  { id: 'wartung', label: '05 · Wartung' },
];

const handlePrint = () => {
  if (typeof window !== 'undefined') window.print();
};

const AssemblyHeader: React.FC = () => (
  <header className="hdr">
    <div className="am-container hdr-inner">
      <Link to="/produkte/grillstelle-beton" className="hdr-logo" aria-label="Zurück zur Grillplatz-Seite">
        <img src="/aplus-logo.svg" alt="A+ Urban Design" />
      </Link>
      <div className="hdr-meta">
        <span className="hide-sm">Montageanleitung · Grillplatz</span>
        <span className="sep hide-sm" aria-hidden="true"></span>
        <span className="hide-sm">Rev. 04 / 2026</span>
      </div>
      <button type="button" className="hdr-print-btn" onClick={handlePrint} aria-label="Seite als PDF drucken">
        <span className="material-symbols-outlined" aria-hidden="true">print</span>
        <span>Als PDF speichern</span>
      </button>
      <div id="assembly-progress-bar" className="hdr-progress" aria-hidden="true"></div>
    </div>
  </header>
);

const AssemblySideNav: React.FC = () => {
  const active = useActiveSection(SECTION_IDS);
  return (
    <nav className="sidenav" aria-label="Abschnitts-Navigation">
      {NAV_ITEMS.map((it) => (
        <a key={it.id} href={`#${it.id}`} className={active === it.id ? 'active' : ''}>
          <span className="bar" aria-hidden="true"></span>
          <span>{it.label}</span>
        </a>
      ))}
    </nav>
  );
};

const Hero: React.FC = () => (
  <section id="top" className="am-section hero">
    <div className="am-container hero-grid">
      <div>
        <div className="hero-eyebrow-row">
          <span className="hero-status">
            <span className="dot" aria-hidden="true"></span>
            Montageanleitung · Freigegeben
          </span>
        </div>

        <h1>
          <span className="line"><span>Grillplatz.</span></span>
          <span className="line"><span>Gebaut</span></span>
          <span className="line"><span>für die <span className="accent">Ewigkeit.</span></span></span>
        </h1>

        <p className="hero-lead">
          Modulare Betonanlage aus drei Fertigteilen — fundamentfrei, vandalismussicher,
          in wenigen Stunden montiert. Diese Anleitung führt Sie Schritt für Schritt vom
          Kiesbett bis zur Inbetriebnahme.
        </p>

        <div className="hero-meta-grid">
          <div>
            <div className="lbl">Gesamtgewicht</div>
            <div className="val">7,6<span className="u">t</span></div>
          </div>
          <div>
            <div className="lbl">Durchmesser</div>
            <div className="val">4,20<span className="u">m</span></div>
          </div>
          <div>
            <div className="lbl">Fertigteile</div>
            <div className="val">3<span className="u">Stk.</span></div>
          </div>
        </div>
      </div>

      <div className="hero-stage">
        <img
          src="/images/montage-grillplatz/hero-model.png"
          alt="Rendering des montierten Grillplatzes"
          loading="eager"
          fetchPriority="high"
        />
        <div className="corner c-tl" aria-hidden="true"></div>
        <div className="corner c-tr" aria-hidden="true"></div>
        <div className="corner c-bl" aria-hidden="true"></div>
        <div className="corner c-br" aria-hidden="true"></div>

        <div className="stamp" aria-hidden="true">
          <span>seit</span>
          <span className="big">1999</span>
          <span>C35/45</span>
        </div>

        <div className="spec-overlay">
          <span className="tag">● KURZFASSUNG</span>
          <span>MONTAGE IN 6 PHASEN · ca. 4 h</span>
        </div>
      </div>
    </div>
  </section>
);

const Voraussetzungen: React.FC = () => {
  const layers = [
    { num: '01', ttl: 'Erdplanum', spec: 'frostsicher', desc: 'Tragfähig verdichtet, frostsicher ausgebildet.' },
    { num: '02', ttl: 'Kiesbett', spec: '40 – 60 cm · Körnung 10 – 40 mm', desc: 'Verdichtet eingebaut, Durchmesser ≥ 4,50 m.' },
    { num: '03', ttl: 'Rieselschicht', spec: '5 cm · Körnung 5 – 10 mm', desc: 'Glatt abgezogen, 15 cm unter der endgültigen Gehfläche.' },
    { num: '04', ttl: 'Bodenplatte', spec: '16 cm · bündig oder aufgesetzt', desc: 'Wird auf die vorbereitete Rieselschicht gesetzt.' },
  ];
  return (
    <section id="voraussetzungen" className="am-section prereq">
      <div className="am-container">
        <div className="section-head reveal">
          <div className="section-eyebrow">
            <span className="num">01</span>
            <span>Voraussetzungen</span>
          </div>
          <h2>Der Aufbau <span className="accent">unter</span> dem Grillplatz.</h2>
          <p>
            Der Grillplatz benötigt keine Fundamente. Die Tragfähigkeit kommt aus einem
            schichtweise aufgebauten Unterbau — bauseits auszuführen, Durchmesser 4,50 m.
            Für eine mangelhafte Ausführung des Kiesbetts übernehmen wir keine Haftung.
          </p>
        </div>

        <div className="prereq-grid">
          <div className="prereq-svg-wrap reveal">
            <FoundationDiagram />
            <div className="blueprint">
              <div className="bp-head">
                <span className="bp-title">Originalzeichnung · Schnitt</span>
                <span className="bp-no">DWG-01 / A+</span>
              </div>
              <img src="/images/montage-grillplatz/zeichnung-schnitt.png" alt="Originalzeichnung Querschnitt Grillplatz" loading="lazy" />
              <div className="bp-foot">
                <span>A+ Urban Design · Grillplatz</span>
                <span className="scale">M 1:50</span>
              </div>
            </div>
          </div>

          <div className="prereq-layers fade-stagger">
            {layers.map((l) => (
              <div key={l.num} className="layer-card">
                <div className="layer-num">{l.num}</div>
                <div className="layer-body">
                  <div className="ttl">{l.ttl}</div>
                  <div className="desc">{l.desc}</div>
                </div>
                <div className="layer-spec">{l.spec}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '3rem' }} className="reveal">
          <div className="callout warning">
            <span className="ico material-symbols-outlined" aria-hidden="true">error</span>
            <div>
              <div className="lbl">Haftungsausschluss</div>
              <div className="txt">
                Für eine mangelhafte Ausführung des Kiesbettes übernehmen wir keine Haftung.
                Kiesbett und Rieselschicht sind bauseits auszuführen und müssen einen Durchmesser
                von mindestens 4,50 m haben.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Abladen: React.FC = () => (
  <section id="abladen" className="am-section steps" style={{ paddingBottom: 0 }}>
    <div className="am-container">
      <div className="section-head reveal">
        <div className="section-eyebrow">
          <span className="num">02</span>
          <span>Abladen &amp; Anschlagen</span>
        </div>
        <h2>Drei Seilösen. <span className="accent">Null Kompromisse.</span></h2>
        <p>
          Die Fertigteile werden mit Autokran, Radlader oder Gabelstapler (Hublast ≥ 3,5 t) abgeladen.
          Jedes halbrunde Betonteil wiegt rund 3,3 t — das runde Mittelteil rund 1,0 t.
        </p>
      </div>

      <div className="step-row reveal" style={{ borderTop: 'none' }}>
        <div>
          <div className="step-meta">
            <span className="step-number">01</span>
            <span className="step-tag"><span className="phase">Phase 02</span> · Anschlagen</span>
          </div>
          <h3 className="step-title">Halbrunde <span className="accent">Betonteile.</span></h3>
          <div className="step-body">
            <p>
              Die halbrunden Betonteile werden ausschließlich an den <strong>3 stirnseitigen
              M 24-Ankerhülsen</strong> angehängt. Pro Teil drei Seilösen M 24, symmetrisch
              verteilt, damit die Last in der Schwebe gleichmäßig liegt.
            </p>
            <div className="callout warning">
              <span className="ico material-symbols-outlined" aria-hidden="true">warning</span>
              <div>
                <div className="lbl">Achtung</div>
                <div className="txt">
                  Niemals an den Ankerhülsen der Bänke anhängen — diese sind nicht für
                  Hublasten ausgelegt.
                </div>
              </div>
            </div>
            <div className="callout tip">
              <span className="ico material-symbols-outlined" aria-hidden="true">engineering</span>
              <div>
                <div className="lbl">Sicherheit</div>
                <div className="txt">
                  Während des Abladens und Versetzens grundsätzlich Abstand zu angehobenen
                  Teilen halten.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="step-visual">
          <RiggingDiagram />
        </div>
      </div>
    </div>
  </section>
);

const Montage: React.FC = () => (
  <section id="montage" className="am-section steps" style={{ paddingTop: '3rem' }}>
    <div className="am-container">
      <div className="section-head reveal">
        <div className="section-eyebrow">
          <span className="num">03</span>
          <span>Montage</span>
        </div>
        <h2>Drei Teile. <span className="accent">Eine Reihenfolge.</span></h2>
        <p>
          Die Bodenplatte kann bündig oder über dem Erdreich montiert werden — bei bündiger
          Ausführung muss die Plattenstärke von 16 cm im Kiesbett berücksichtigt werden.
          Danach wird in klarer Reihenfolge gesetzt.
        </p>
      </div>

      <div className="step-row reverse reveal">
        <div>
          <div className="step-meta">
            <span className="step-number">02</span>
            <span className="step-tag"><span className="phase">Phase 03</span> · Setzen</span>
          </div>
          <h3 className="step-title">Halbrunde zuerst — <span className="accent">dann die Mitte.</span></h3>
          <div className="step-body">
            <p>
              Zuerst werden die beiden halbrunden Betonteile gesetzt, sodass sie einen Kreis
              mit einem Loch in der Mitte bilden. Die Spalten zwischen den Teilen werden so
              gering wie möglich gehalten.
            </p>
            <p>
              Anschließend wird das runde Mittelteil in das entstandene zentrale Loch gesetzt.
              Die Öffnung des Betonringes muss dabei <strong>gegenüber der Aussparung</strong>
              {' '}für den Träger liegen.
            </p>
            <div className="callout warning">
              <span className="ico material-symbols-outlined" aria-hidden="true">priority_high</span>
              <div>
                <div className="lbl">Kritisch</div>
                <div className="txt">
                  Die Aussparung für den Träger ist nur an <strong>einer</strong> Platte
                  vorhanden. Position vor dem Absetzen prüfen — nachträgliches Drehen ist
                  mit 3,3 t pro Teil nicht sinnvoll.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="step-visual">
          <SetzreihenfolgeDiagram />
          <div style={{ marginTop: '1.5rem' }}>
            <PlanDiagram />
          </div>
          <div className="blueprint">
            <div className="bp-head">
              <span className="bp-title">Originalzeichnung · Grundriss</span>
              <span className="bp-no">DWG-02 / A+</span>
            </div>
            <img src="/images/montage-grillplatz/zeichnung-grundriss.png" alt="Originalzeichnung Grundriss Grillplatz" loading="lazy" />
            <div className="bp-foot">
              <span>Ø 4,20 m · Mitte Ø 1,40 / 0,95 m</span>
              <span className="scale">M 1:50</span>
            </div>
          </div>
        </div>
      </div>

      <div className="step-row reveal">
        <div>
          <div className="step-meta">
            <span className="step-number">03</span>
            <span className="step-tag"><span className="phase">Phase 04</span> · Träger</span>
          </div>
          <h3 className="step-title">Träger setzen &amp; <span className="accent">loten.</span></h3>
          <div className="step-body">
            <p>
              Der Träger wird in die vorhandene Aussparung in der Bodenplatte gesteckt.
              Arretieren Sie ihn mithilfe eines <strong>Schnurlotes</strong>, das über die
              Rolle des Trägers geführt wird — so, dass das Lot genau in der Mitte des
              Grills hängt.
            </p>
            <p>
              Zur Feinjustage schieben Sie die mitgelieferten <strong>Edelstahlplatten</strong>
              {' '}unterhalb des Trägers in die Aussparung, um das Lot Richtung Träger zu bewegen —
              oder ziehen Sie den Träger 1 – 2 cm heraus, um es in die andere Richtung zu bewegen.
            </p>
          </div>
        </div>
        <div className="step-visual">
          <TraegerDiagram />
          <div className="blueprint">
            <div className="bp-head">
              <span className="bp-title">Originalzeichnung · Trägerdetail</span>
              <span className="bp-no">DWG-03 / A+</span>
            </div>
            <img src="/images/montage-grillplatz/zeichnung-traeger-v3.png" alt="Originalzeichnung Träger mit Rolle und Kette" loading="lazy" />
            <div className="bp-foot">
              <span>Träger · Rolle · Kette · Gegengewicht</span>
              <span className="scale">DETAIL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="step-row reverse reveal">
        <div>
          <div className="step-meta">
            <span className="step-number">04</span>
            <span className="step-tag"><span className="phase">Phase 05</span> · Kette</span>
          </div>
          <h3 className="step-title">Kette, Haken, <span className="accent">Gegengewicht.</span></h3>
          <div className="step-body">
            <p>
              Die Kette wird von außen nach innen über die Rolle des Trägers gezogen, sodass
              das längere Ende entlang des Trägers liegt und am <strong>Arretierungshaken</strong>
              {' '}angehängt werden kann. Das kürzere Kettenteil hängt nach unten.
            </p>
            <p>
              An diesem kürzeren Ende wird mithilfe des <strong>Kettenverbinders</strong>
              {' '}das Gegengewicht befestigt. Das Gewinde des Kettenverbindungsteils mit dem
              mitgelieferten Kleber verkleben — derselbe Kleber dient auch zum Ausfüllen
              der Trägeraussparung.
            </p>
            <div className="callout tip">
              <span className="ico material-symbols-outlined" aria-hidden="true">lightbulb</span>
              <div>
                <div className="lbl">Hinweis</div>
                <div className="txt">
                  Das Verfüllen der Trägeraussparung mit Kleber schützt gegen Schmutz,
                  Wasser und Diebstahl. Wer möchte, kann die Aussparung alternativ offen lassen.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="step-visual">
          <ChainCounterweightAnim />
        </div>
      </div>

      <div className="step-row reveal">
        <div>
          <div className="step-meta">
            <span className="step-number">05</span>
            <span className="step-tag"><span className="phase">Phase 06</span> · Übergabe</span>
          </div>
          <h3 className="step-title">In Betrieb. <span className="accent">Bereit.</span></h3>
          <div className="step-body">
            <p>
              Bevor der Grillplatz in Betrieb genommen wird, ist — falls bündig zur Umgebung
              gesetzt — der offene Spalt rund um die Bodenplatte zu schließen. In der Nähe
              des Grillplatzes ist ein <strong>Nutzungsschild</strong> anzubringen.
            </p>
            <div className="callout warning">
              <span className="ico material-symbols-outlined" aria-hidden="true">local_fire_department</span>
              <div>
                <div className="lbl">Nutzungsbedingungen</div>
                <div className="txt">
                  Das Nutzungsschild sollte die Nutzungsbedingungen enthalten, die der
                  Betreiber zusammen mit der örtlichen Feuerwehr abgestimmt und entwickelt hat.
                </div>
              </div>
            </div>
            <p className="closing-line">Wir wünschen Ihnen viel Erfolg bei der Montage.</p>
          </div>
        </div>
        <div className="step-visual">
          <HandoverCard />
        </div>
      </div>
    </div>
  </section>
);

const HandoverCard: React.FC = () => {
  const items = [
    'Bodenplatte gesetzt & nivelliert',
    'Mittelteil mit Öffnung zur Aussparung ausgerichtet',
    'Träger gelotet & arretiert',
    'Kette & Gegengewicht montiert',
    'Aussparung verfüllt oder offen gelassen',
    'Randspalt verschlossen',
    'Nutzungsschild angebracht',
  ];
  return (
    <div style={{ padding: '1rem 0' }}>
      <div className="handover-card">
        <div className="ring-1" aria-hidden="true"></div>
        <div className="ring-2" aria-hidden="true"></div>
        <div className="status">STATUS</div>
        <div className="title">Funktions—<br />fähig.</div>
        <div className="desc">
          Bodenplatte verschlossen, Nutzungsschild montiert — die Anlage ist bereit zur Übergabe.
        </div>
      </div>
      <div className="checklist">
        {items.map((txt) => (
          <div key={txt}>
            <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
            <span>{txt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Werkzeuge: React.FC = () => {
  const items = [
    { num: '01', ico: 'precision_manufacturing', ttl: 'Hubgerät', spec: '≥ 3,5 t Hublast', desc: 'Autokran, Radlader oder Gabelstapler. Für die 3,3 t schweren halbrunden Betonteile dimensionieren.' },
    { num: '02', ico: 'construction', ttl: '3× Seilöse M 24', spec: 'stirnseitig · halbrund', desc: 'Zum Anhängen der halbrunden Betonteile an den 3 stirnseitigen M 24-Ankerhülsen.' },
    { num: '03', ico: 'link', ttl: '3× Seilöse M 16', spec: 'Mittelteil · 1,0 t', desc: 'Zum Anhängen des mittleren, runden Betonteils. Dreipunkt-Anschlag wie oben.' },
    { num: '04', ico: 'stairs', ttl: 'Leiter', spec: 'Kette aufhängen', desc: 'Nötig zum Auflegen der Kette über die Rolle und zum Einhängen am Arretierungshaken.' },
    { num: '05', ico: 'straighten', ttl: 'Schnurlot', spec: 'Träger mittig loten', desc: 'Über die Rolle des Trägers führen, bis das Lot exakt in der Mitte des Grills hängt.' },
    { num: '06', ico: 'palette', ttl: 'Spachtel', spec: 'Klebemasse anrühren', desc: 'Zum Anrühren und Verspachteln der mitgelieferten Klebemasse — für Kettenverbinder und Aussparung.' },
  ];
  return (
    <section id="werkzeuge" className="am-section tools">
      <div className="am-container">
        <div className="section-head reveal">
          <div className="section-eyebrow">
            <span className="num">04</span>
            <span>Geräte &amp; Werkzeuge</span>
          </div>
          <h2>Alles, was <span className="accent">mitkommt.</span></h2>
          <p>
            Die komplette Liste der Geräte und Werkzeuge, die Sie vor Ort benötigen.
            Vor Montagebeginn prüfen — spart Zeit und verhindert Leerfahrten.
          </p>
        </div>
        <div className="tools-grid fade-stagger">
          {items.map((it) => (
            <div key={it.num} className="tool-card" data-num={it.num}>
              <div className="ico-wrap">
                <span className="material-symbols-outlined" aria-hidden="true">{it.ico}</span>
              </div>
              <h4>{it.ttl}</h4>
              <div className="spec">{it.spec}</div>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Wartung: React.FC = () => {
  const items = [
    { freq: '2×', per: 'pro Jahr', ttl: 'Sichtprüfung', desc: 'Die gesamte Anlage auf Schäden prüfen — auch auf mutwillig verursachte. Betonabplatzungen mit Reparaturmörtel beseitigen.' },
    { freq: '2×', per: 'pro Jahr', ttl: 'Rolle ölen', desc: 'Die Rolle am Trägerkopf mindestens zweimal jährlich ölen, damit die Kette leichtgängig bleibt.' },
    { freq: 'alle 2', per: 'Wochen', ttl: 'Reinigung', desc: 'Anlage reinigen. Aschetonne und Müllbehälter in der Nähe regelmäßig leeren.' },
    { freq: 'nur', per: 'Grillkohle', ttl: 'Brennstoff', desc: 'Als Brennstoff darf ausschließlich Grillkohle verwendet werden.' },
  ];
  return (
    <section id="wartung" className="am-section maint">
      <div className="am-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-head reveal">
          <div className="section-eyebrow">
            <span className="num">05</span>
            <span>Wartung &amp; Instandhaltung</span>
          </div>
          <h2>Wartungsarm. <span className="accent">Nicht wartungsfrei.</span></h2>
          <p>
            Der Grillplatz benötigt keine besondere Wartung und Pflege — regelmäßige
            Kontrollen verlängern jedoch die Lebensdauer erheblich. Die Zeitintervalle
            können je nach örtlichen Gegebenheiten angepasst werden.
          </p>
        </div>

        <div className="timeline-grid fade-stagger">
          {items.map((it) => (
            <div key={it.ttl} className="freq-card">
              <div className="freq-head">
                <span className="freq">{it.freq}</span>
                <span className="per">{it.per}</span>
              </div>
              <h4>{it.ttl}</h4>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal qualif-box">
          <span className="material-symbols-outlined" aria-hidden="true">verified_user</span>
          <div>
            <div className="lbl">Qualifikation</div>
            <div className="txt">
              Die Überprüfung muss durch eine <strong>geschulte Person</strong> ausgeführt werden.
            </div>
          </div>
        </div>
      </div>
      <div className="wordmark-bleed" aria-hidden="true">URBAN DESIGN</div>
    </section>
  );
};

const AssemblyFooter: React.FC = () => (
  <footer className="ftr">
    <div className="am-container ftr-inner">
      <div>
        <div className="ftr-logo" style={{ marginBottom: '1.5rem' }}>
          <img src="/aplus-logo.svg" alt="A+ Urban Design" />
        </div>
        <div className="ftr-meta">
          A+ Urban Design · Talstrasse 41 · 70188 Stuttgart<br />
          <a href="https://www.aplusurbandesign.com">www.aplusurbandesign.com</a>
        </div>
        <Link to="/produkte/grillstelle-beton" className="ftr-back">
          <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
          <span>Zurück zur Grillplatz-Seite</span>
        </Link>
      </div>
      <div className="ftr-meta" style={{ textAlign: 'right' }}>
        Montageanleitung Grillplatz<br />
        Ausgabe 04 / 2026<br />
        A+ Urban Design
      </div>
    </div>
  </footer>
);

const ProductGrillAssemblyPage: React.FC = () => {
  useReveal();
  useScrollProgress();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Montageanleitung Grillplatz — A+ Urban Design',
    description:
      'Schritt-für-Schritt-Anleitung zur Montage des runden A+ Beton-Grillplatzes: Kiesbett, Abladen, Setzreihenfolge, Träger mit Schnurlot, Kette und Gegengewicht, Wartung.',
    inLanguage: 'de-DE',
    image: 'https://www.aplusurbandesign.com/images/montage-grillplatz/hero-grillplatz.png',
    author: { '@type': 'Organization', name: 'A+ Urban Design', url: 'https://www.aplusurbandesign.com' },
    publisher: {
      '@type': 'Organization',
      name: 'A+ Urban Design',
      logo: { '@type': 'ImageObject', url: 'https://www.aplusurbandesign.com/aplus-logo.svg' },
    },
    about: {
      '@type': 'Product',
      name: 'Grillplatz aus Beton',
      url: 'https://www.aplusurbandesign.com/produkte/grillstelle-beton',
    },
    proficiencyLevel: 'Expert',
    dependencies: 'Autokran oder Radlader mit Hublast ≥ 3,5 t',
  };

  return (
    <PageShell
      title="Montageanleitung Grillplatz"
      description="Modulare Betonanlage aus drei Fertigteilen — fundamentfrei, vandalismussicher, in wenigen Stunden montiert. Komplette Montageanleitung mit Diagrammen, Werkzeugliste und Wartungsplan."
      schema={schema}
      fullWidth
    >
      <div className="assembly-page">
        <AssemblyHeader />
        <AssemblySideNav />
        <main>
          <Hero />
          <Voraussetzungen />
          <Abladen />
          <Montage />
          <Werkzeuge />
          <Wartung />
        </main>
        <AssemblyFooter />
      </div>
    </PageShell>
  );
};

export default ProductGrillAssemblyPage;
