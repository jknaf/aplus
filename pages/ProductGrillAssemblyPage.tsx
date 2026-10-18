import React from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useActiveSection, useReveal, useScrollProgress } from '../components/assembly/hooks';
import {
  FoundationDiagram,
  RiggingDiagram,
  SetzreihenfolgeDiagram,
} from '../components/assembly/diagrams';
import './ProductGrillAssemblyPage.css';

const SECTION_IDS = ['top', 'voraussetzungen', 'abladen', 'montage', 'werkzeuge', 'wartung'];

const NAV_ITEMS: { id: string; label: [string, string, string] }[] = [
  { id: 'top', label: ['00 · Intro', '00 · Intro', '00 · Intro'] },
  { id: 'voraussetzungen', label: ['01 · Vorbereitung', '01 · Preparation', '01 · Préparation'] },
  { id: 'abladen', label: ['02 · Abladen', '02 · Unloading', '02 · Déchargement'] },
  { id: 'montage', label: ['03 · Montage', '03 · Installation', '03 · Montage'] },
  { id: 'werkzeuge', label: ['04 · Werkzeuge', '04 · Tools', '04 · Outils'] },
  { id: 'wartung', label: ['05 · Wartung', '05 · Maintenance', '05 · Entretien'] },
];

const handlePrint = () => {
  if (typeof window !== 'undefined') window.print();
};

const AssemblyHeader: React.FC = () => {
  const t = useT();
  return (
  <header className="hdr">
    <div className="am-container hdr-inner">
      <Link to="/produkte/grillstelle-beton" className="hdr-logo" aria-label={t("Zurück zur Grillplatz-Seite", "Back to the barbecue area page", "Retour à la page de l'aire de barbecue")}>
        <img src="/aplus-logo.svg" alt="A+ Urban Design" />
      </Link>
      <div className="hdr-meta">
        <span className="hide-sm">{t("Montageanleitung · Grillplatz", "Installation instructions · Barbecue area", "Notice de montage · Aire de barbecue")}</span>
        <span className="sep hide-sm" aria-hidden="true"></span>
        <span className="hide-sm">Rev. 04 / 2026</span>
      </div>
      <button type="button" className="hdr-print-btn" onClick={handlePrint} aria-label={t("Seite als PDF drucken", "Print page as PDF", "Imprimer la page en PDF")}>
        <span className="material-symbols-outlined" aria-hidden="true">print</span>
        <span>{t("Als PDF speichern", "Save as PDF", "Enregistrer en PDF")}</span>
      </button>
      <div id="assembly-progress-bar" className="hdr-progress" aria-hidden="true"></div>
    </div>
  </header>
  );
};

const AssemblySideNav: React.FC = () => {
  const t = useT();
  const active = useActiveSection(SECTION_IDS);
  return (
    <nav className="sidenav" aria-label={t("Abschnitts-Navigation", "Section navigation", "Navigation par section")}>
      {NAV_ITEMS.map((it) => (
        <a key={it.id} href={`#${it.id}`} className={active === it.id ? 'active' : ''}>
          <span className="bar" aria-hidden="true"></span>
          <span>{t(...it.label)}</span>
        </a>
      ))}
    </nav>
  );
};

const Hero: React.FC = () => {
  const t = useT();
  return (
  <section id="top" className="am-section hero">
    <div className="am-container hero-grid">
      <div>
        <div className="hero-eyebrow-row">
          <span className="hero-status">
            <span className="dot" aria-hidden="true"></span>
            {t("Montageanleitung", "Installation instructions", "Notice de montage")}
          </span>
        </div>

        <h1>
          <span className="line"><span>{t("Grillplatz", "Barbecue area", "Aire de barbecue")}</span></span>
          <span className="line"><span>{t("Gebaut", "Built", "Conçue")}</span></span>
          <span className="line"><span>{t(<>für <span className="accent">Jahrzehnte</span></>, <>for <span className="accent">decades</span></>, <>pour des <span className="accent">décennies</span></>)}</span></span>
        </h1>

        <p className="hero-lead">
          {t("Der Grillplatz ist eine modulare Betonanlage aus drei Fertigteilen. Er braucht kein Fundament, ist vandalismussicher und in wenigen Stunden montiert. Diese Anleitung führt Sie Schritt für Schritt vom Unterbau bis zur Inbetriebnahme.", "The barbecue area is a modular concrete installation made of three precast units. It needs no foundation, is vandal-resistant and can be installed in a few hours. This guide takes you step by step from the base to commissioning.", "L'aire de barbecue est une installation modulaire en béton composée de trois éléments préfabriqués. Elle ne nécessite aucune fondation, résiste au vandalisme et se monte en quelques heures. Cette notice vous guide pas à pas, de la sous-couche à la mise en service.")}
        </p>

        <div className="hero-meta-grid">
          <div>
            <div className="lbl">{t("Gesamtgewicht", "Total weight", "Poids total")}</div>
            <div className="val">{t("7,6", "7.6", "7,6")}<span className="u">t</span></div>
          </div>
          <div>
            <div className="lbl">{t("Durchmesser", "Diameter", "Diamètre")}</div>
            <div className="val">{t("4,20", "4.20", "4,20")}<span className="u">m</span></div>
          </div>
          <div>
            <div className="lbl">{t("Fertigteile", "Precast units", "Éléments préfabriqués")}</div>
            <div className="val">3<span className="u">{t("Stk.", "pcs", "pièces")}</span></div>
          </div>
        </div>
      </div>

      <div className="hero-stage">
        <img
          src="/images/montage-grillplatz/hero-model.png"
          alt={t("Rendering des montierten Grillplatzes", "Rendering of the installed barbecue area", "Rendu de l'aire de barbecue montée")}
          loading="eager"
          fetchPriority="high"
        />
        <div className="corner c-tl" aria-hidden="true"></div>
        <div className="corner c-tr" aria-hidden="true"></div>
        <div className="corner c-bl" aria-hidden="true"></div>
        <div className="corner c-br" aria-hidden="true"></div>

        <div className="stamp" aria-hidden="true">
          <span>{t("seit", "since", "depuis")}</span>
          <span className="big">1999</span>
          <span>C35/45</span>
        </div>

        <div className="spec-overlay">
          <span className="tag">{t("● KURZFASSUNG", "● SUMMARY", "● RÉSUMÉ")}</span>
          <span>{t("MONTAGE IN 6 PHASEN · ca. 4 h", "INSTALLATION IN 6 PHASES · approx. 4 h", "MONTAGE EN 6 PHASES · env. 4 h")}</span>
        </div>
      </div>
    </div>
  </section>
  );
};

const Voraussetzungen: React.FC = () => {
  const t = useT();
  const layers = [
    { num: '01', ttl: t("Erdplanum", "Subgrade", "Fond de forme"), spec: t("frostsicher", "frost-proof", "résistant au gel"), desc: t("Tragfähig verdichtet, frostsicher ausgebildet.", "Compacted to bear loads, built frost-proof.", "Compacté pour être porteur, mis hors gel.") },
    { num: '02', ttl: t("Kiesbett", "Gravel bed", "Lit de gravier"), spec: t("40–60 cm · Körnung 10–40 mm", "40–60 cm · grading 10–40 mm", "40–60 cm · granulométrie 10–40 mm"), desc: t("Verdichtet eingebaut, Durchmesser ≥ 4,50 m.", "Placed and compacted, diameter ≥ 4.50 m.", "Mis en place et compacté, diamètre ≥ 4,50 m.") },
    { num: '03', ttl: t("Rieselschicht", "Bedding layer", "Lit de pose"), spec: t("5 cm · Körnung 5–10 mm", "5 cm · grading 5–10 mm", "5 cm · granulométrie 5–10 mm"), desc: t("Glatt abgezogen, 15 cm unter der endgültigen Gehfläche.", "Screeded smooth, 15 cm below the final ground level.", "Arasé et lissé, à 15 cm sous le niveau fini du sol.") },
    { num: '04', ttl: t("Bodenplatte", "Base slab", "Dalle de sol"), spec: t("16 cm · bündig oder aufgesetzt", "16 cm · flush or raised", "16 cm · à fleur ou en surélévation"), desc: t("Wird auf die vorbereitete Rieselschicht gesetzt.", "Set on the prepared bedding layer.", "Posée sur le lit de pose préparé.") },
  ];
  return (
    <section id="voraussetzungen" className="am-section prereq">
      <div className="am-container">
        <div className="section-head reveal">
          <div className="section-eyebrow">
            <span className="num">01</span>
            <span>{t("Voraussetzungen", "Prerequisites", "Conditions préalables")}</span>
          </div>
          <h2>{t(<>Der Aufbau <span className="accent">unter</span> dem Grillplatz</>, <>The structure <span className="accent">beneath</span> the barbecue area</>, <>La structure <span className="accent">sous</span> l'aire de barbecue</>)}</h2>
          <p>
            {t("Der Grillplatz benötigt keine Fundamente. Die Tragfähigkeit kommt aus einem schichtweise aufgebauten Unterbau mit 4,50 m Durchmesser. Diesen Unterbau stellt der Auftraggeber selbst her.", "The barbecue area needs no foundations. Its load-bearing capacity comes from a layered base 4.50 m in diameter. The client builds this base.", "L'aire de barbecue ne nécessite aucune fondation. La capacité portante provient d'une sous-couche réalisée par couches, de 4,50 m de diamètre. Cette sous-couche est réalisée par le maître d'ouvrage.")}
          </p>
        </div>

        <div className="prereq-grid">
          <div className="prereq-svg-wrap reveal">
            <FoundationDiagram />
            <div className="blueprint">
              <div className="bp-head">
                <span className="bp-title">{t("Schnitt", "Section", "Coupe")}</span>
                <span className="bp-no">DWG-01 / A+</span>
              </div>
              <img src="/images/montage-grillplatz/zeichnung-schnitt.png" alt={t("Querschnitt Grillplatz", "Cross-section of the barbecue area", "Coupe transversale de l'aire de barbecue")} loading="lazy" />
              <div className="bp-foot">
                <span>{t("A+ Urban Design · Grillplatz", "A+ Urban Design · Barbecue area", "A+ Urban Design · Aire de barbecue")}</span>
                <span className="scale">{t("M 1:50", "Scale 1:50", "Éch. 1:50")}</span>
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
              <div className="lbl">{t("Haftungsausschluss", "Disclaimer", "Exclusion de responsabilité")}</div>
              <div className="txt">
                {t("Für eine mangelhafte Ausführung des Kiesbettes übernehmen wir keine Haftung. Kiesbett und Rieselschicht sind bauseits auszuführen und müssen einen Durchmesser von mindestens 4,50 m haben.", "We accept no liability for a defective gravel bed. The gravel bed and bedding layer are to be provided by the client and must have a diameter of at least 4.50 m.", "Nous déclinons toute responsabilité en cas d'exécution défectueuse du lit de gravier. Le lit de gravier et le lit de pose sont à réaliser par le client et doivent avoir un diamètre d'au moins 4,50 m.")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Abladen: React.FC = () => {
  const t = useT();
  return (
  <section id="abladen" className="am-section steps" style={{ paddingBottom: 0 }}>
    <div className="am-container">
      <div className="section-head reveal">
        <div className="section-eyebrow">
          <span className="num">02</span>
          <span>{t("Abladen &amp; Anschlagen", "Unloading &amp; rigging", "Déchargement &amp; élingage")}</span>
        </div>
        <h2>{t(<>Abladen und <span className="accent">Anschlagen</span></>, <>Unloading and <span className="accent">rigging</span></>, <>Déchargement et <span className="accent">élingage</span></>)}</h2>
        <p>
          {t("Die Fertigteile werden mit Autokran, Radlader oder Gabelstapler (Hublast ≥ 3,5 t) abgeladen. Jedes halbrunde Betonteil wiegt rund 3,3 t, das runde Mittelteil rund 1,0 t.", "The precast units are unloaded with a mobile crane, wheel loader or forklift (lifting capacity ≥ 3.5 t). Each half-round concrete part weighs about 3.3 t, the round centre part about 1.0 t.", "Les éléments préfabriqués sont déchargés à la grue mobile, à la chargeuse sur pneus ou au chariot élévateur (capacité de levage ≥ 3,5 t). Chaque élément demi-circulaire en béton pèse environ 3,3 t, l'élément central circulaire environ 1,0 t.")}
        </p>
      </div>

      <div className="step-row reveal" style={{ borderTop: 'none' }}>
        <div>
          <div className="step-meta">
            <span className="step-number">01</span>
            <span className="step-tag"><span className="phase">Phase 02</span> {t("· Anschlagen", "· Rigging", "· Élingage")}</span>
          </div>
          <h3 className="step-title">{t(<>Halbrunde <span className="accent">Betonteile</span></>, <>Half-round <span className="accent">concrete parts</span></>, <>Éléments <span className="accent">demi-circulaires en béton</span></>)}</h3>
          <div className="step-body">
            <p>
              {t(<>Die halbrunden Betonteile werden ausschließlich an den <strong>3 stirnseitigen
              M24-Ankerhülsen</strong> angehängt. Pro Teil drei Seilösen M 24, symmetrisch
              verteilt, damit sich die Last gleichmäßig verteilt.</>, <>The half-round concrete parts are attached only at the <strong>3 end-face M24 anchor sockets</strong>. Three M 24 lifting eyes per part, spread symmetrically so that the load is shared evenly.</>, <>Les éléments demi-circulaires en béton sont accrochés exclusivement aux <strong>3 douilles d'ancrage M24 de la face frontale</strong>. Trois anneaux de levage M 24 par élément, répartis symétriquement afin que la charge se répartisse uniformément.</>)}
            </p>
            <div className="callout warning">
              <span className="ico material-symbols-outlined" aria-hidden="true">warning</span>
              <div>
                <div className="lbl">{t("Achtung", "Warning", "Attention")}</div>
                <div className="txt">
                  {t("Niemals an den Ankerhülsen der Bänke anhängen. Diese sind nicht für Hublasten ausgelegt.", "Never lift from the bench anchors. They are not designed for lifting loads.", "Ne jamais accrocher aux douilles d'ancrage des bancs. Elles ne sont pas conçues pour supporter des charges de levage.")}
                </div>
              </div>
            </div>
            <div className="callout tip">
              <span className="ico material-symbols-outlined" aria-hidden="true">engineering</span>
              <div>
                <div className="lbl">{t("Sicherheit", "Safety", "Sécurité")}</div>
                <div className="txt">
                  {t("Während des Abladens und Versetzens grundsätzlich Abstand zu angehobenen Teilen halten.", "While unloading and moving, always keep your distance from raised parts.", "Pendant le déchargement et le déplacement, toujours se tenir à distance des charges suspendues.")}
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
};

const Montage: React.FC = () => {
  const t = useT();
  return (
  <section id="montage" className="am-section steps" style={{ paddingTop: '3rem' }}>
    <div className="am-container">
      <div className="section-head reveal">
        <div className="section-eyebrow">
          <span className="num">03</span>
          <span>{t("Montage", "Installation", "Montage")}</span>
        </div>
        <h2>{t(<>Die <span className="accent">Setzreihenfolge</span></>, <>The <span className="accent">order of setting</span></>, <>L'<span className="accent">ordre de pose</span></>)}</h2>
        <p>
          {t("Die Bodenplatte kann bündig oder über dem Erdreich montiert werden. Bei bündiger Ausführung muss die Plattenstärke von 16 cm im Kiesbett berücksichtigt werden. Danach werden die Teile in dieser Reihenfolge gesetzt:", "The base slab can be installed flush with the ground or above it. For a flush finish, the slab thickness of 16 cm must be allowed for in the gravel bed. The parts are then set in this order:", "La dalle de sol peut être posée à fleur du sol ou au-dessus. Pour une pose à fleur, l'épaisseur de dalle de 16 cm doit être prise en compte dans le lit de gravier. Les éléments sont ensuite posés dans cet ordre :")}
        </p>
      </div>

      <div className="step-row reverse reveal">
        <div>
          <div className="step-meta">
            <span className="step-number">02</span>
            <span className="step-tag"><span className="phase">Phase 03</span> {t("· Setzen", "· Setting", "· Pose")}</span>
          </div>
          <h3 className="step-title">{t(<>Halbrunde zuerst, <span className="accent">dann die Mitte</span></>, <>Half-rounds first, <span className="accent">then the centre</span></>, <>D'abord les demi-cercles, <span className="accent">puis le centre</span></>)}</h3>
          <div className="step-body">
            <p>
              {t("Zuerst werden die beiden halbrunden Betonteile gesetzt, sodass sie einen Kreis mit einem Loch in der Mitte bilden. Die Fugen zwischen den Teilen werden so schmal wie möglich gehalten.", "First, the two half-round concrete parts are set so that they form a circle with a hole in the middle. The joints between the parts are kept as narrow as possible.", "On pose d'abord les deux éléments demi-circulaires en béton, de manière à former un cercle avec un trou au milieu. Les joints entre les éléments sont gardés aussi étroits que possible.")}
            </p>
            <p>
              {t(<>Anschließend wird das runde Mittelteil in das entstandene zentrale Loch gesetzt.
              Die Öffnung des Betonringes muss dabei <strong>gegenüber der Aussparung</strong>
              {' '}für den Träger liegen.</>, <>The round centre part is then set into the central hole. The opening in the concrete ring must be <strong>opposite the recess</strong> for the support.</>, <>L'élément central circulaire est ensuite posé dans le trou central. L'ouverture de l'anneau en béton doit se trouver <strong>à l'opposé de la réservation</strong> prévue pour le support.</>)}
            </p>
            <div className="callout warning">
              <span className="ico material-symbols-outlined" aria-hidden="true">priority_high</span>
              <div>
                <div className="lbl">{t("Kritisch", "Critical", "Critique")}</div>
                <div className="txt">
                  {t(<>Die Aussparung für den Träger ist nur an <strong>einer</strong> Platte
                  vorhanden. Position vor dem Absetzen prüfen. Nachträgliches Drehen ist
                  mit 3,3 t pro Teil nicht sinnvoll.</>, <>The recess for the support is on <strong>one</strong> slab only. Check the position before setting it down. Turning it afterwards is not practical at 3.3 t per part.</>, <>La réservation pour le support n'existe que sur <strong>une</strong> dalle. Vérifier la position avant la dépose. Il n'est pas judicieux de la faire pivoter ensuite, à 3,3 t par élément.</>)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="step-visual">
          <SetzreihenfolgeDiagram />
          <div className="blueprint">
            <div className="bp-head">
              <span className="bp-title">{t("Grundriss", "Plan view", "Plan")}</span>
              <span className="bp-no">DWG-02 / A+</span>
            </div>
            <img src="/images/montage-grillplatz/zeichnung-grundriss.png" alt={t("Grundriss Grillplatz", "Plan view of the barbecue area", "Plan de l'aire de barbecue")} loading="lazy" />
            <div className="bp-foot">
              <span>{t("Ø 4,20 m · Mitte Ø 1,40 / 0,95 m", "Ø 4.20 m · centre Ø 1.40 / 0.95 m", "Ø 4,20 m · centre Ø 1,40 / 0,95 m")}</span>
              <span className="scale">{t("M 1:50", "Scale 1:50", "Éch. 1:50")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="step-row reveal">
        <div>
          <div className="step-meta">
            <span className="step-number">03</span>
            <span className="step-tag"><span className="phase">Phase 04</span> {t("· Träger", "· Support", "· Support")}</span>
          </div>
          <h3 className="step-title">{t(<>Träger setzen &amp; <span className="accent">loten</span></>, <>Setting the support &amp; <span className="accent">plumbing it</span></>, <>Poser le support et le <span className="accent">mettre d'aplomb</span></>)}</h3>
          <div className="step-body">
            <p>
              {t(<>Der Träger wird in die vorhandene Aussparung in der Bodenplatte gesteckt.
              Richten Sie ihn mit einem <strong>Schnurlot</strong> aus, das über die
              Rolle des Trägers geführt wird, und zwar so, dass das Lot genau in der Mitte des
              Grills hängt.</>, <>The support is pushed into the recess in the base slab. Align it with a <strong>plumb line</strong> run over the pulley of the support, so that the plumb bob hangs exactly in the middle of the barbecue.</>, <>Le support est enfoncé dans la réservation de la dalle de sol. Alignez-le avec un <strong>fil à plomb</strong> passé sur la poulie du support, de sorte que le plomb pende exactement au milieu du barbecue.</>)}
            </p>
            <p>
              {t(<>Zur Feinjustage schieben Sie die mitgelieferten <strong>Edelstahlplatten</strong>
              {' '}unterhalb des Trägers in die Aussparung, um das Lot Richtung Träger zu bewegen,
              oder ziehen Sie den Träger 1–2 cm heraus, um es in die andere Richtung zu bewegen.</>, <>For fine adjustment, slide the supplied <strong>stainless steel plates</strong> into the recess below the support to move the plumb bob towards the support, or pull the support out 1–2 cm to move it the other way.</>, <>Pour l'ajustement fin, glissez les <strong>plaques en inox</strong> fournies dans la réservation sous le support afin de déplacer le plomb vers le support, ou sortez le support de 1 à 2 cm pour le déplacer dans l'autre sens.</>)}
            </p>
          </div>
        </div>
        <div className="step-visual">
          <div className="blueprint">
            <div className="bp-head">
              <span className="bp-title">{t("Trägerdetail", "Support detail", "Détail du support")}</span>
              <span className="bp-no">DWG-03 / A+</span>
            </div>
            <img src="/images/montage-grillplatz/zeichnung-traeger-v3.png" alt={t("Träger mit Rolle und Kette", "Support with pulley and chain", "Support avec poulie et chaîne")} loading="lazy" />
            <div className="bp-foot">
              <span>{t("Träger · Rolle · Kette · Gegengewicht", "Support · pulley · chain · counterweight", "Support · poulie · chaîne · contrepoids")}</span>
              <span className="scale">{t("DETAIL", "DETAIL", "DÉTAIL")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="step-row reveal" style={{ gridTemplateColumns: '1fr' }}>
        <div>
          <div className="step-meta">
            <span className="step-number">04</span>
            <span className="step-tag"><span className="phase">Phase 05</span> {t("· Kette", "· Chain", "· Chaîne")}</span>
          </div>
          <h3 className="step-title">{t(<>Kette, Haken, <span className="accent">Gegengewicht</span></>, <>Chain, hook, <span className="accent">counterweight</span></>, <>Chaîne, crochet, <span className="accent">contrepoids</span></>)}</h3>
          <div className="step-body">
            <p>
              {t(<>Die Kette wird von außen nach innen über die Rolle des Trägers gezogen, sodass
              das längere Ende entlang des Trägers liegt und am <strong>Arretierungshaken</strong>
              {' '}angehängt werden kann. Das kürzere Kettenteil hängt nach unten.</>, <>The chain is pulled over the pulley of the support from the outside in, so that the longer end lies along the support and can be hung on the <strong>locking hook</strong>. The shorter part of the chain hangs down.</>, <>La chaîne est passée sur la poulie du support, de l'extérieur vers l'intérieur, de sorte que l'extrémité la plus longue longe le support et puisse être accrochée au <strong>crochet d'arrêt</strong>. La partie la plus courte de la chaîne pend vers le bas.</>)}
            </p>
            <p>
              {t(<>An diesem kürzeren Ende wird mithilfe des <strong>Kettenverbinders</strong>
              {' '}das Gegengewicht befestigt. Verkleben Sie das Gewinde des Kettenverbinders mit dem
              mitgelieferten Kleber. Derselbe Kleber dient auch zum Ausfüllen
              der Trägeraussparung.</>, <>The counterweight is fixed to this shorter end using the <strong>chain connector</strong>. Glue the thread of the chain connector with the supplied adhesive. The same adhesive is also used to fill the recess for the support.</>, <>Le contrepoids est fixé à cette extrémité plus courte à l'aide du <strong>raccord de chaîne</strong>. Collez le filetage du raccord de chaîne avec la colle fournie. La même colle sert aussi à combler la réservation du support.</>)}
            </p>
            <div className="callout tip">
              <span className="ico material-symbols-outlined" aria-hidden="true">lightbulb</span>
              <div>
                <div className="lbl">{t("Hinweis", "Note", "Remarque")}</div>
                <div className="txt">
                  {t("Das Verfüllen der Trägeraussparung mit Kleber schützt gegen Schmutz, Wasser und Diebstahl. Die Aussparung kann auch offen bleiben.", "Filling the recess for the support with adhesive protects against dirt, water and theft. The recess can also be left open.", "Combler la réservation du support avec de la colle protège contre la saleté, l'eau et le vol. La réservation peut aussi rester ouverte.")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="step-row reveal">
        <div>
          <div className="step-meta">
            <span className="step-number">05</span>
            <span className="step-tag"><span className="phase">Phase 06</span> {t("· Übergabe", "· Handover", "· Remise")}</span>
          </div>
          <h3 className="step-title">{t(<>Fertig zur <span className="accent">Übergabe</span></>, <>Ready for <span className="accent">handover</span></>, <>Prête pour la <span className="accent">remise</span></>)}</h3>
          <div className="step-body">
            <p>
              {t(<>Wenn die Bodenplatte bündig sitzt, schließen Sie vor der Inbetriebnahme
              den Spalt rund um die Platte. In der Nähe
              des Grillplatzes ist ein <strong>Nutzungsschild</strong> anzubringen.</>, <>If the base slab sits flush, close the gap around the slab before commissioning. A <strong>sign showing the rules of use</strong> is to be fitted near the barbecue area.</>, <>Si la dalle de sol est posée à fleur, fermez le joint périphérique avant la mise en service. Un <strong>panneau d'utilisation</strong> doit être installé à proximité de l'aire de barbecue.</>)}
            </p>
            <div className="callout warning">
              <span className="ico material-symbols-outlined" aria-hidden="true">local_fire_department</span>
              <div>
                <div className="lbl">{t("Nutzungsbedingungen", "Terms of use", "Conditions d'utilisation")}</div>
                <div className="txt">
                  {t("Das Nutzungsschild sollte die Nutzungsbedingungen enthalten, die der Betreiber mit der örtlichen Feuerwehr erarbeitet und abgestimmt hat.", "The sign should show the rules of use that the operator has drawn up and agreed with the local fire brigade.", "Le panneau doit indiquer les conditions d'utilisation que l'exploitant a élaborées et convenues avec les pompiers locaux.")}
                </div>
              </div>
            </div>
            <p className="closing-line">{t("Wir wünschen Ihnen viel Erfolg bei der Montage.", "We wish you every success with the installation.", "Nous vous souhaitons un bon montage.")}</p>
          </div>
        </div>
        <div className="step-visual">
          <HandoverCard />
        </div>
      </div>
    </div>
  </section>
  );
};

const HandoverCard: React.FC = () => {
  const t = useT();
  const items = [
    t("Bodenplatte gesetzt & nivelliert", "Base slab set and levelled", "Dalle de sol posée et nivelée"),
    t("Mittelteil gesetzt, Öffnung gegenüber der Trägeraussparung", "Centre part set, opening opposite the support recess", "Élément central posé, ouverture à l'opposé de la réservation du support"),
    t("Träger gelotet & arretiert", "Support plumbed and locked", "Support mis d'aplomb et verrouillé"),
    t("Kette & Gegengewicht montiert", "Chain and counterweight fitted", "Chaîne et contrepoids montés"),
    t("Aussparung verfüllt oder offen gelassen", "Recess filled or left open", "Réservation comblée ou laissée ouverte"),
    t("Randspalt verschlossen", "Edge gap closed", "Joint périphérique fermé"),
    t("Nutzungsschild angebracht", "Notice board fitted", "Panneau d'utilisation installé"),
  ];
  return (
    <div style={{ padding: '1rem 0' }}>
      <div className="handover-card">
        <div className="ring-1" aria-hidden="true"></div>
        <div className="ring-2" aria-hidden="true"></div>
        <div className="status">{t("STATUS", "STATUS", "STATUT")}</div>
        <div className="title">{t(<>Funktions-<br />fähig.</>, <>Ready<br />to use.</>, <>Prête à<br />l'emploi.</>)}</div>
        <div className="desc">
          {t("Randspalt geschlossen, Nutzungsschild angebracht: Die Anlage ist bereit zur Übergabe.", "Edge gap closed, sign put up: the installation is ready for handover.", "Joint périphérique fermé, panneau d'utilisation installé : l'installation est prête à être remise.")}
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
  const t = useT();
  const items = [
    { num: '01', ico: 'precision_manufacturing', ttl: t("Hubgerät", "Lifting equipment", "Engin de levage"), spec: t("≥ 3,5 t Hublast", "≥ 3.5 t lifting capacity", "Capacité de levage ≥ 3,5 t"), desc: t("Geeignet sind Autokran, Radlader oder Gabelstapler. Das Gerät muss für die 3,3 t schweren halbrunden Betonteile ausgelegt sein.", "A mobile crane, wheel loader or forklift will do. The machine must be rated for the half-round concrete parts, which weigh 3.3 t.", "Une grue mobile, une chargeuse sur pneus ou un chariot élévateur conviennent. L'engin doit être dimensionné pour les éléments demi-circulaires en béton de 3,3 t.") },
    { num: '02', ico: 'construction', ttl: t("3× Seilöse M 24", "3× M 24 lifting eye", "3× anneau de levage M 24"), spec: t("stirnseitig · halbrund", "end face · half-round", "face frontale · demi-circulaire"), desc: t("Zum Anhängen der halbrunden Betonteile an den 3 stirnseitigen M24-Ankerhülsen.", "For attaching the half-round concrete parts to the 3 end-face M24 anchor sockets.", "Pour accrocher les éléments demi-circulaires en béton aux 3 douilles d'ancrage M24 de la face frontale.") },
    { num: '03', ico: 'link', ttl: t("3× Seilöse M 16", "3× M 16 lifting eye", "3× anneau de levage M 16"), spec: t("Mittelteil · 1,0 t", "centre part · 1.0 t", "élément central · 1,0 t"), desc: t("Zum Anhängen des mittleren, runden Betonteils. Dreipunkt-Anschlag wie oben.", "For attaching the round centre concrete part. Three-point sling as above.", "Pour accrocher l'élément central circulaire en béton. Élingage en trois points comme ci-dessus.") },
    { num: '04', ico: 'stairs', ttl: t("Leiter", "Ladder", "Échelle"), spec: t("Kette aufhängen", "hanging the chain", "accrocher la chaîne"), desc: t("Nötig zum Auflegen der Kette über die Rolle und zum Einhängen am Arretierungshaken.", "Needed to lay the chain over the pulley and hang it on the locking hook.", "Nécessaire pour passer la chaîne sur la poulie et l'accrocher au crochet d'arrêt.") },
    { num: '05', ico: 'straighten', ttl: t("Schnurlot", "Plumb line", "Fil à plomb"), spec: t("Träger mittig loten", "plumbing the support in the centre", "mettre le support d'aplomb au centre"), desc: t("Über die Rolle des Trägers führen, bis das Lot exakt in der Mitte des Grills hängt.", "Run it over the pulley of the support until the plumb bob hangs exactly in the middle of the barbecue.", "À passer sur la poulie du support jusqu'à ce que le plomb pende exactement au milieu du barbecue.") },
    { num: '06', ico: 'palette', ttl: t("Spachtel", "Filling knife", "Spatule"), spec: t("Klebemasse anrühren", "mixing the adhesive", "mélanger la colle"), desc: t("Zum Anrühren und Verspachteln der mitgelieferten Klebemasse, für Kettenverbinder und Aussparung.", "For mixing and applying the supplied adhesive compound, for the chain connector and the recess.", "Pour mélanger et appliquer la colle fournie, pour le raccord de chaîne et la réservation.") },
  ];
  return (
    <section id="werkzeuge" className="am-section tools">
      <div className="am-container">
        <div className="section-head reveal">
          <div className="section-eyebrow">
            <span className="num">04</span>
            <span>{t("Geräte &amp; Werkzeuge", "Equipment &amp; tools", "Appareils &amp; outils")}</span>
          </div>
          <h2>{t(<>Was Sie <span className="accent">brauchen</span></>, <>What you <span className="accent">need</span></>, <>Ce dont vous <span className="accent">avez besoin</span></>)}</h2>
          <p>
            {t("Die komplette Liste der Geräte und Werkzeuge, die Sie vor Ort benötigen. Prüfen Sie die Liste vor Montagebeginn. Das spart Zeit und Leerfahrten.", "The complete list of equipment and tools you need on site. Check the list before installation starts. That saves time and wasted trips.", "La liste complète des appareils et outils dont vous avez besoin sur place. Vérifiez-la avant de commencer le montage. Cela fait gagner du temps et évite les déplacements inutiles.")}
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
  const t = useT();
  const items = [
    { freq: '2×', per: t("pro Jahr", "per year", "par an"), ttl: t("Sichtprüfung", "Visual inspection", "Contrôle visuel"), desc: t("Die gesamte Anlage auf Schäden prüfen, auch auf mutwillig verursachte. Betonabplatzungen mit Reparaturmörtel beseitigen.", "Check the whole installation for damage, including deliberate damage. Repair concrete spalling with repair mortar.", "Contrôler toute l'installation pour détecter les dommages, y compris volontaires. Réparer les éclats de béton avec du mortier de réparation.") },
    { freq: '2×', per: t("pro Jahr", "per year", "par an"), ttl: t("Rolle ölen", "Oil the pulley", "Huiler la poulie"), desc: t("Die Rolle am Trägerkopf mindestens zweimal jährlich ölen, damit die Kette leichtgängig bleibt.", "Oil the pulley at the top of the support at least twice a year so that the chain keeps running smoothly.", "Huiler la poulie en tête de support au moins deux fois par an pour que la chaîne coulisse facilement.") },
    { freq: t("alle 2", "every 2", "toutes les 2"), per: t("Wochen", "weeks", "semaines"), ttl: t("Reinigung", "Cleaning", "Nettoyage"), desc: t("Anlage reinigen. Aschetonne und Müllbehälter in der Nähe regelmäßig leeren.", "Clean the installation. Empty the ash bin and nearby waste bins regularly.", "Nettoyer l'installation. Vider régulièrement le bac à cendres et les poubelles à proximité.") },
    { freq: t("nur", "only", "uniquement"), per: t("Grillkohle", "charcoal", "charbon de bois"), ttl: t("Brennstoff", "Fuel", "Combustible"), desc: t("Als Brennstoff darf ausschließlich Grillkohle verwendet werden.", "Only charcoal may be used as fuel.", "Seul du charbon de bois peut être utilisé comme combustible.") },
  ];
  return (
    <section id="wartung" className="am-section maint">
      <div className="am-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-head reveal">
          <div className="section-eyebrow">
            <span className="num">05</span>
            <span>{t("Wartung &amp; Instandhaltung", "Maintenance &amp; upkeep", "Entretien &amp; maintenance")}</span>
          </div>
          <h2>{t(<>Wartungsarm, <span className="accent">nicht wartungsfrei</span></>, <>Low-maintenance, <span className="accent">not maintenance-free</span></>, <>Entretien réduit, <span className="accent">mais pas nul</span></>)}</h2>
          <p>
            {t("Der Grillplatz benötigt keine besondere Wartung und Pflege. Regelmäßige Kontrollen verlängern jedoch die Lebensdauer erheblich. Die Zeitintervalle können je nach örtlichen Gegebenheiten angepasst werden.", "The barbecue area needs no special maintenance or care. Regular checks do extend its service life considerably, though. The intervals can be adjusted to local conditions.", "L'aire de barbecue ne nécessite ni entretien ni soins particuliers. Des contrôles réguliers prolongent toutefois sensiblement sa durée de vie. Les intervalles peuvent être adaptés aux conditions locales.")}
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
            <div className="lbl">{t("Qualifikation", "Qualification", "Qualification")}</div>
            <div className="txt">
              {t(<>Die Überprüfung muss durch eine <strong>geschulte Person</strong> ausgeführt werden.</>, <>The inspection must be carried out by a <strong>trained person</strong>.</>, <>Le contrôle doit être effectué par une <strong>personne formée</strong>.</>)}
            </div>
          </div>
        </div>
      </div>
      <div className="wordmark-bleed" aria-hidden="true">URBAN DESIGN</div>
    </section>
  );
};

const AssemblyFooter: React.FC = () => {
  const t = useT();
  return (
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
          <span>{t("Zurück zur Grillplatz-Seite", "Back to the barbecue area page", "Retour à la page de l'aire de barbecue")}</span>
        </Link>
      </div>
      <div className="ftr-meta" style={{ textAlign: 'right' }}>
        {t("Montageanleitung Grillplatz", "Installation instructions: barbecue area", "Notice de montage : aire de barbecue")}<br />
        {t("Ausgabe 04 / 2026", "Edition 04 / 2026", "Édition 04 / 2026")}<br />
        A+ Urban Design
      </div>
    </div>
  </footer>
  );
};

const ProductGrillAssemblyPage: React.FC = () => {
  const t = useT();
  useReveal();
  useScrollProgress();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: t("Montageanleitung Grillplatz | A+ Urban Design", "Installation Instructions: Barbecue Area | A+ Urban Design", "Notice de montage : aire de barbecue | A+ Urban Design"),
    description:
      t("Schritt-für-Schritt-Anleitung zur Montage des runden A+ Beton-Grillplatzes: Kiesbett, Abladen, Setzreihenfolge, Träger mit Schnurlot, Kette und Gegengewicht, Wartung.", "Step-by-step guide to installing the round A+ concrete barbecue area: gravel bed, unloading, order of setting, support with plumb line, chain and counterweight, maintenance.", "Guide pas à pas pour le montage de l'aire de barbecue circulaire en béton A+ : lit de gravier, déchargement, ordre de pose, support au fil à plomb, chaîne et contrepoids, entretien."),
    inLanguage: t("de-DE", "en-GB", "fr-FR"),
    image: 'https://www.aplusurbandesign.com/images/montage-grillplatz/hero-grillplatz.png',
    author: { '@type': 'Organization', name: 'A+ Urban Design', url: 'https://www.aplusurbandesign.com' },
    publisher: {
      '@type': 'Organization',
      name: 'A+ Urban Design',
      logo: { '@type': 'ImageObject', url: 'https://www.aplusurbandesign.com/aplus-logo.svg' },
    },
    about: {
      '@type': 'Product',
      name: t("Grillplatz aus Beton", "Concrete barbecue area", "Aire de barbecue en béton"),
      url: 'https://www.aplusurbandesign.com/produkte/grillstelle-beton',
    },
    proficiencyLevel: 'Expert',
    dependencies: t("Autokran oder Radlader mit Hublast ≥ 3,5 t", "Mobile crane or wheel loader with lifting capacity ≥ 3.5 t", "Grue mobile ou chargeuse sur pneus d'une capacité de levage ≥ 3,5 t"),
  };

  return (
    <PageShell
      title={t("Montageanleitung Grillplatz", "Installation instructions: barbecue area", "Notice de montage : aire de barbecue")}
      description={t("Modulare Betonanlage aus drei Fertigteilen: fundamentfrei, vandalismussicher, in wenigen Stunden montiert. Komplette Montageanleitung mit Diagrammen, Werkzeugliste und Wartungsplan.", "Modular concrete installation made of three precast units: foundation-free, vandal-resistant, installed in a few hours. Complete installation guide with diagrams, tool list and maintenance schedule.", "Installation modulaire en béton composée de trois éléments préfabriqués : sans fondation, résistante au vandalisme, montée en quelques heures. Notice de montage complète avec schémas, liste d'outils et plan d'entretien.")}
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
