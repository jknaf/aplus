import React from 'react';
import { useT } from '../i18n';
import PageShell from '../components/PageShell';
import { Ablauf, Achtung, Bild, Chip, H2, Hinweis, Kicker, Kopf, Leiste, Liste, Rahmen, Schritte, SchrittDaten, Tabelle, Text } from '../components/montage/Montage';

// Inhalt 1:1 nach der Originalanleitung „Grillplatz, Montage- und Wartungsanleitung“ (01.04.2011) samt der dort
// aufgeklebten Korrekturen (Aussparung mit Mörtel, Splitt oder Sand; Gabelstapler; Edelstahlreiniger).
// Schrittbilder und 3D-Modell nach den Maßen der Originalzeichnung (Bodenplatte 16 cm, Bänke 35 cm, Mittelring Ø 1,40/0,95 m).
const B = '/montage/grillplatz';

const ProductGrillAssemblyPage: React.FC = () => {
  const t = useT();

  const schritte: SchrittDaten[] = [
    {
      id: 's1', bild: `${B}/02-bodenplatte-1.webp`,
      alt: t('Erste Hälfte der Bodenplatte wird auf die Rieselschicht gesetzt', 'First half of the base slab is placed on the grit layer', 'La première moitié de la dalle est posée sur la couche de gravillons'),
      kurz: t('Bodenplatte, erste Hälfte', 'Base slab, first half', 'Dalle, première moitié'),
      titel: t('Bodenplatte: erste Hälfte setzen', 'Base slab: place the first half', 'Dalle de base : poser la première moitié'),
      inhalt: <>
        <Text>{t('Die Hälfte nur an den 3 stirnseitigen Ankerhülsen M 24 anhängen und auf die Rieselschicht setzen.', 'Attach the half only to the 3 anchor sleeves M 24 on the end face and place it on the grit layer.', "Accrocher la moitié uniquement aux 3 douilles d'ancrage M 24 en face frontale et la poser sur la couche de gravillons.")}</Text>
        <Achtung>{t('Nicht an den Ankern der Bänke anhängen.', 'Do not attach to the bench anchors.', 'Ne pas accrocher aux ancrages des bancs.')}</Achtung>
        <Hinweis label={t('Lage', 'Position', 'Position')}>{t('Nur eine der beiden Hälften hat die Aussparung für den Träger. Beim Setzen darauf achten, dass die Aussparung an der richtigen Stelle liegt.', 'Only one of the two halves has the recess for the support. When placing the halves, make sure the recess is in the right place.', "Une seule des deux moitiés comporte l'évidement pour le support. Lors de la pose, veiller à ce que l'évidement se trouve au bon endroit.")}</Hinweis>
      </>,
    },
    {
      id: 's2', bild: `${B}/03-bodenplatte-2.webp`,
      alt: t('Zweite Hälfte mit der Aussparung für den Träger wird gesetzt', 'Second half with the recess for the support is placed', "La seconde moitié avec l'évidement du support est posée"),
      kurz: t('Bodenplatte, zweite Hälfte', 'Base slab, second half', 'Dalle, seconde moitié'),
      titel: t('Bodenplatte: zweite Hälfte setzen', 'Base slab: place the second half', 'Dalle de base : poser la seconde moitié'),
      inhalt: <Text>{t('Die zweite Hälfte daneben setzen. Beide Hälften bilden einen Kreis mit einem Loch in der Mitte. Der Spalt zwischen den Hälften soll so gering wie möglich sein.', 'Place the second half next to it. Both halves form a circle with a hole in the middle. Keep the gap between the halves as small as possible.', "Poser la seconde moitié à côté. Les deux moitiés forment un cercle avec un trou au centre. L'écart entre les moitiés doit être aussi faible que possible.")}</Text>,
    },
    {
      id: 's3', bild: `${B}/04-mittelteil.webp`,
      alt: t('Rundes Mittelteil wird in das Loch der Bodenplatte gesetzt, Öffnung gegenüber der Trägeraussparung', 'Round centre piece is placed in the hole of the base slab, opening opposite the support recess', "L'élément central rond est posé dans le trou de la dalle, ouverture à l'opposé de l'évidement du support"),
      kurz: t('Mittelteil', 'Centre piece', 'Élément central'),
      titel: t('Mittelteil setzen', 'Place the centre piece', "Poser l'élément central"),
      inhalt: <>
        <Text>{t('Das runde Mittelteil in das Loch in der Mitte der Bodenplatte setzen.', 'Place the round centre piece in the hole in the middle of the base slab.', "Poser l'élément central rond dans le trou au centre de la dalle.")}</Text>
        <Hinweis label={t('Ausrichten', 'Alignment', 'Orientation')}>{t('Die Öffnung des Betonrings liegt gegenüber der Aussparung für den Träger.', 'The opening of the concrete ring lies opposite the recess for the support.', "L'ouverture de l'anneau en béton se trouve à l'opposé de l'évidement du support.")}</Hinweis>
      </>,
    },
    {
      id: 's4', bild: `${B}/05-traeger-loten.webp`,
      alt: t('Träger steht in der Aussparung, ein Schnurlot hängt über der Mitte', 'Support stands in the recess, a plumb line hangs above the centre', 'Le support est dans son évidement, un fil à plomb pend au-dessus du centre'),
      kurz: t('Träger setzen und loten', 'Set and plumb the support', 'Poser et aplomber le support'),
      titel: t('Träger setzen und loten', 'Set and plumb the support', 'Poser et aplomber le support'),
      inhalt: <>
        <Text>{t('Den Träger in die Aussparung der Bodenplatte stecken. Ein Schnurlot über die Rolle hängen. Das Lot muss genau in der Mitte des Grills hängen.', 'Insert the support into the recess in the base slab. Hang a plumb line over the pulley. The plumb bob must hang exactly in the centre of the grill.', "Insérer le support dans l'évidement de la dalle. Suspendre un fil à plomb sur la poulie. Le plomb doit pendre exactement au centre du gril.")}</Text>
        <Tabelle ersteBreite="46%" zeilen={[
          [<b>{t('Lot zu weit vom Träger weg', 'Plumb bob too far from the support', 'Plomb trop éloigné du support')}</b>, t('Edelstahlplatten unter den Träger in die Aussparung schieben.', 'Push the stainless steel plates into the recess under the support.', "Glisser les plaques inox sous le support dans l'évidement.")],
          [<b>{t('Lot zu nah am Träger', 'Plumb bob too close to the support', 'Plomb trop près du support')}</b>, t('Träger 1–2 cm herausziehen.', 'Pull the support out by 1–2 cm.', 'Sortir le support de 1 à 2 cm.')],
        ]} />
      </>,
    },
    {
      id: 's5', bild: `${B}/06-kette.webp`,
      alt: t('Kette über der Rolle, Gegengewicht am kurzen Kettenende, Grillrost darunter', 'Chain over the pulley, counterweight on the short chain end, grill grate below', "Chaîne sur la poulie, contrepoids à l'extrémité courte, grille en dessous"),
      kurz: t('Kette und Gegengewicht', 'Chain and counterweight', 'Chaîne et contrepoids'),
      titel: t('Kette und Gegengewicht', 'Chain and counterweight', 'Chaîne et contrepoids'),
      inhalt: <>
        <Liste punkte={[
          t('Kette von außen nach innen über die Rolle ziehen.', 'Pull the chain over the pulley from the outside inwards.', "Passer la chaîne sur la poulie de l'extérieur vers l'intérieur."),
          t('Das längere Ende liegt am Träger entlang und wird am Arretierungshaken eingehängt.', 'The longer end runs along the support and is hooked onto the locking hook.', "L'extrémité la plus longue longe le support et s'accroche au crochet d'arrêt."),
          t('Am kürzeren, herabhängenden Ende das Gegengewicht mit dem Kettenverbinder befestigen.', 'Fix the counterweight to the shorter, hanging end with the chain connector.', "Fixer le contrepoids à l'extrémité courte pendante avec le raccord de chaîne."),
          t('Das Gewinde des Kettenverbinders mit dem mitgelieferten Kleber sichern.', 'Secure the thread of the chain connector with the adhesive supplied.', 'Bloquer le filetage du raccord de chaîne avec la colle fournie.'),
        ]} />
        <Hinweis label={t('Leiter', 'Ladder', 'Échelle')}>{t('Zum Aufhängen der Kette wird eine Leiter gebraucht.', 'A ladder is needed to hang the chain.', 'Une échelle est nécessaire pour accrocher la chaîne.')}</Hinweis>
      </>,
    },
    {
      id: 's6', bild: `${B}/07-fertig.webp`,
      alt: t('Fertig montierter Grillplatz', 'Fully installed barbecue area', 'Aire de barbecue entièrement montée'),
      kurz: t('Abschließen', 'Finishing', 'Finitions'),
      titel: t('Abschließen', 'Finishing', 'Finitions'),
      inhalt: <>
        <Text>{t('Vor der Inbetriebnahme:', 'Before first use:', 'Avant la mise en service :')}</Text>
        <Liste punkte={[
          t('Trägeraussparung mit Mörtel, Splitt oder Sand füllen. So dringen kein Schmutz und kein Wasser ein, und der Träger ist gegen Diebstahl gesichert. Die Aussparung darf auch offen bleiben.', 'Fill the support recess with mortar, chippings or sand. This keeps out dirt and water and secures the support against theft. The recess may also be left open.', "Remplir l'évidement du support de mortier, de gravillons ou de sable. Ainsi, ni saleté ni eau ne pénètrent et le support est protégé contre le vol. L'évidement peut aussi rester ouvert."),
          t('Liegt der Grillplatz bündig, den Spalt rund um die Bodenplatte schließen.', 'If the barbecue area is flush with the ground, close the gap around the base slab.', "Si l'aire est posée à fleur du sol, refermer le joint autour de la dalle."),
          t('Ein Nutzungsschild in der Nähe anbringen.', 'Put up a sign with the terms of use nearby.', "Installer à proximité un panneau avec les conditions d'utilisation."),
        ]} />
        <Achtung>{t('Die Nutzungsbedingungen auf dem Schild legt der Betreiber zusammen mit der örtlichen Feuerwehr fest.', 'The operator draws up the terms of use on the sign together with the local fire brigade.', "L'exploitant définit les conditions d'utilisation du panneau avec les pompiers locaux.")}</Achtung>
      </>,
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: t('Montageanleitung Grillplatz | A+ Urban Design', 'Installation Instructions: Barbecue Area | A+ Urban Design', 'Notice de montage : aire de barbecue | A+ Urban Design'),
    description: t('Montage des A+ Grillplatzes aus Beton: Kiesbett, Bodenplatte, Mittelteil, Träger mit Schnurlot, Kette und Gegengewicht, Wartung.', 'Installing the A+ concrete barbecue area: gravel bed, base slab, centre piece, support with plumb line, chain and counterweight, maintenance.', "Montage de l'aire de barbecue en béton A+ : lit de gravier, dalle de base, élément central, support au fil à plomb, chaîne et contrepoids, entretien."),
    inLanguage: t('de-DE', 'en-GB', 'fr-FR'),
    image: 'https://www.aplusurbandesign.com/montage/grillplatz/07-fertig.webp',
    author: { '@type': 'Organization', name: 'A+ Urban Design', url: 'https://www.aplusurbandesign.com' },
    publisher: { '@type': 'Organization', name: 'A+ Urban Design', logo: { '@type': 'ImageObject', url: 'https://www.aplusurbandesign.com/aplus-logo.svg' } },
    about: { '@type': 'Product', name: t('Grillplatz aus Beton', 'Concrete barbecue area', 'Aire de barbecue en béton'), url: 'https://www.aplusurbandesign.com/produkte/grillstelle-beton' },
  };

  return (
    <PageShell
      title={t('Montageanleitung Grillplatz', 'Installation instructions: barbecue area', 'Notice de montage : aire de barbecue')}
      description={t('Montageanleitung für den A+ Grillplatz aus Beton: Unterbau, Teile und Gewichte, sechs Montageschritte mit Bildern, Wartung. Auch als PDF zum Blättern.', 'Installation instructions for the A+ concrete barbecue area: sub-base, parts and weights, six installation steps with images, maintenance. Also as a PDF to flip through.', "Notice de montage de l'aire de barbecue en béton A+ : support, éléments et poids, six étapes de montage illustrées, entretien. Également en PDF à feuilleter.")}
      schema={schema}
      ogImage="/montage/grillplatz/07-fertig.webp"
      fullWidth
    >
      <Rahmen kopfzeile={t('MONTAGEANLEITUNG GRILLPLATZ', 'INSTALLATION INSTRUCTIONS BARBECUE AREA', 'NOTICE DE MONTAGE AIRE DE BARBECUE')}>
        <Leiste zurueck="/produkte/grillstelle-beton" zurueckText={t('Grillplatz', 'Barbecue area', 'Aire de barbecue')} pdf="grillplatz" />

        <Kopf
          kicker={t('Montageanleitung · Grillplatz', 'Installation instructions · Barbecue area', 'Notice de montage · Aire de barbecue')}
          titel={t('Grillplatz montieren', 'Installing the barbecue area', "Monter l'aire de barbecue")}
          texte={[
            t('Der Grillplatz besteht aus der Bodenplatte (zwei halbrunde Hälften mit Bänken), dem runden Mittelteil und dem Träger mit Rolle, Kette, Gegengewicht und Grillrost. Er braucht kein Fundament und steht auf einem Kiesbett.', 'The barbecue area consists of the base slab (two semicircular halves with benches), the round centre piece and the support with pulley, chain, counterweight and grill grate. It needs no foundation and stands on a gravel bed.', "L'aire de barbecue se compose de la dalle de base (deux moitiés demi-circulaires avec bancs), de l'élément central rond et du support avec poulie, chaîne, contrepoids et grille. Elle ne nécessite pas de fondation et repose sur un lit de gravier."),
            t('Die Schrittbilder sind nach den Maßen der Originalzeichnung gebaut. Grün ist das Teil, das im jeweiligen Schritt gesetzt wird.', 'The step images are built to the dimensions of the original drawing. Green marks the part placed in each step.', "Les images des étapes reprennent les cotes du plan d'origine. En vert : l'élément posé à chaque étape."),
          ]}
          modell={{ src: `${B}/grillplatz-montage.gltf`, poster: `${B}/grillplatz-montage.webp`, alt: t('3D-Modell des Grillplatzes', '3D model of the barbecue area', "Modèle 3D de l'aire de barbecue"), kamera: { ziel: [0, 0.95, 0], abstand: 8.6 } }}
          titelbild={`${B}/07-fertig.webp`}
          masse={t('Ø 4,20 m · Träger 2,70 m über Platte', 'Ø 4.20 m · support 2.70 m above slab', 'Ø 4,20 m · support à 2,70 m au-dessus de la dalle')}
        />

        <Ablauf schritte={schritte} />

        <section className="max-w-[1160px] mx-auto px-4 md:px-8 pt-20 md:pt-[88px]">
          <div className="m-zwei grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="flex flex-col gap-5">
              <Kicker>{t('Voraussetzungen', 'Requirements', 'Conditions préalables')}</Kicker>
              <H2>{t('Unterbau herstellen', 'Preparing the sub-base', 'Réaliser le support')}</H2>
              <Text>{t('Kiesbett und Rieselschicht sind bauseits auszuführen, Durchmesser 4,5 m. Die Bodenplatte wird direkt darauf gesetzt.', 'The gravel bed and the grit layer are to be provided by the client, diameter 4.5 m. The base slab is placed directly on top.', "Le lit de gravier et la couche de gravillons sont à la charge du maître d'ouvrage, diamètre 4,5 m. La dalle de base est posée directement dessus.")}</Text>
              <Tabelle
                kopf={[t('Schicht', 'Layer', 'Couche'), t('Stärke', 'Thickness', 'Épaisseur'), t('Körnung', 'Grain size', 'Granulométrie')]}
                zeilen={[
                  [<><b>{t('Kiesbett', 'Gravel bed', 'Lit de gravier')}</b><br />{t('verdichtet, frostsicher', 'compacted, frost-proof', 'compacté, hors gel')}</>, '40–60 cm', '10–40 mm'],
                  [<><b>{t('Rieselschicht', 'Grit layer', 'Couche de gravillons')}</b><br />{t('glatt abgezogen', 'screeded smooth', 'réglée lisse')}</>, '5 cm', '5–10 mm'],
                ]}
              />
              <Hinweis label={t('Höhe', 'Height', 'Hauteur')}>{t('Die Oberkante der Rieselschicht liegt 15 cm unter der endgültigen Gehfläche des Grillplatzes. Die Bodenplatte kann bündig oder über dem Erdreich montiert werden. Für den bündigen Einbau die Plattenstärke von 16 cm berücksichtigen und das Kiesbett entsprechend anlegen.', 'The top of the grit layer lies 15 cm below the final walking surface of the barbecue area. The base slab can be installed flush with or above the ground. For flush installation, allow for the slab thickness of 16 cm and lay the gravel bed accordingly.', "Le dessus de la couche de gravillons se situe 15 cm sous la surface de circulation définitive de l'aire. La dalle peut être posée à fleur du sol ou au-dessus. Pour une pose à fleur, tenir compte de l'épaisseur de dalle de 16 cm et réaliser le lit de gravier en conséquence.")}</Hinweis>
              <p className="m-0 text-sm leading-relaxed text-brand-dark/70">{t('Für eine mangelhafte Ausführung des Kiesbetts übernimmt A+ Urban Design keine Haftung.', 'A+ Urban Design accepts no liability for a defective gravel bed.', 'A+ Urban Design décline toute responsabilité en cas de lit de gravier mal exécuté.')}</p>
            </div>
            <Bild src={`${B}/01-unterbau.webp`} alt={t('Kiesbett mit Rieselschicht im Ausschnitt, Durchmesser 4,5 m', 'Cut-away of the gravel bed with grit layer, diameter 4.5 m', 'Coupe du lit de gravier avec couche de gravillons, diamètre 4,5 m')} />
          </div>
        </section>

        <section className="max-w-[1160px] mx-auto px-4 md:px-8 pt-20 md:pt-[88px]">
          <div className="m-zwei grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-start">
            <Bild src={`${B}/07-fertig.webp`} alt={t('Grillplatz mit Bodenplatte, Mittelteil, Träger, Kette, Gegengewicht und Grillrost', 'Barbecue area with base slab, centre piece, support, chain, counterweight and grill grate', 'Aire de barbecue avec dalle, élément central, support, chaîne, contrepoids et grille')} className="order-2 md:order-1" />
            <div className="flex flex-col gap-5 order-1 md:order-2">
              <Kicker>{t('Lieferung', 'Delivery', 'Livraison')}</Kicker>
              <H2>{t('Teile und Gewichte', 'Parts and weights', 'Éléments et poids')}</H2>
              <Tabelle
                kopf={[t('Teil', 'Part', 'Élément'), t('Gewicht', 'Weight', 'Poids'), t('Anschlagen', 'Lifting', 'Élingage')]}
                zeilen={[
                  [<><b>{t('Bodenplatte', 'Base slab', 'Dalle de base')}</b><br />{t('2 halbrunde Hälften mit Bänken, 16 cm stark', '2 semicircular halves with benches, 16 cm thick', "2 moitiés demi-circulaires avec bancs, 16 cm d'épaisseur")}</>, t('je ca. 3,3 t', 'approx. 3.3 t each', 'env. 3,3 t chacune'), t('3 Seilösen M 24', '3 lifting eyes M 24', '3 anneaux de levage M 24')],
                  // M 16 oder M 24: das Original nennt beides (Abladen: M 24, Werkzeugliste: M 16), Klärung mit A+ offen
                  [<><b>{t('Rundes Mittelteil', 'Round centre piece', 'Élément central rond')}</b><br />{t('Betonring mit Öffnung', 'concrete ring with opening', 'anneau en béton avec ouverture')}</>, t('ca. 1,0 t', 'approx. 1.0 t', 'env. 1,0 t'), t('3 Seilösen M 16 / M 24', '3 lifting eyes M 16 / M 24', '3 anneaux de levage M 16 / M 24')],
                  [<><b>{t('Träger', 'Support', 'Support')}</b> {t('mit Rolle, Kette, Arretierungshaken, Kettenverbinder, Gegengewicht, Edelstahlplatten, Kleber', 'with pulley, chain, locking hooks, chain connector, counterweight, stainless steel plates, adhesive', "avec poulie, chaîne, crochets d'arrêt, raccord de chaîne, contrepoids, plaques inox, colle")}</>, '', ''],
                  [<><b>{t('Grillrost', 'Grill grate', 'Grille')}</b> {t('aus Edelstahl, höhenverstellbar', 'stainless steel, height-adjustable', 'en inox, réglable en hauteur')}</>, '', ''],
                ]}
              />
              <span className="mt-2"><Kicker leise>{t('Auf der Baustelle bereithalten', 'Have ready on site', 'À prévoir sur le chantier')}</Kicker></span>
              <Liste punkte={[
                t('Autokran, Radlader oder Gabelstapler, Hublast mindestens 3,5 t. Beim Gabelstapler Gabellänge und Gabelabstand mindestens 130 cm.', 'Mobile crane, wheel loader or forklift, lifting capacity at least 3.5 t. For a forklift, fork length and fork spacing at least 130 cm.', "Grue mobile, chargeuse sur pneus ou chariot élévateur, capacité de levage d'au moins 3,5 t. Pour un chariot élévateur, longueur et écartement des fourches d'au moins 130 cm."),
                t('3 Seilösen M 24 für die Hälften der Bodenplatte, 3 Seilösen für das Mittelteil', '3 lifting eyes M 24 for the base slab halves, 3 lifting eyes for the centre piece', "3 anneaux de levage M 24 pour les moitiés de dalle, 3 anneaux de levage pour l'élément central"),
                t('Schnurlot', 'Plumb line', 'Fil à plomb'),
                t('Leiter, zum Aufhängen der Ketten', 'Ladder, for hanging the chains', 'Échelle, pour accrocher les chaînes'),
                t('Spachtel, zum Anrühren und Verspachteln des Klebers', 'Spatula, for mixing and applying the adhesive', 'Spatule, pour mélanger et appliquer la colle'),
              ]} />
              <Achtung>{t('Beim Abladen und Versetzen Abstand zu angehobenen Teilen halten.', 'When unloading and positioning, keep clear of lifted parts.', 'Pendant le déchargement et la mise en place, se tenir à distance des éléments soulevés.')}</Achtung>
            </div>
          </div>
        </section>

        <Schritte schritte={schritte} />

        <section className="max-w-[1160px] mx-auto px-4 md:px-8 pt-16 md:pt-[72px]">
          <div className="bg-white rounded-xl p-6 md:p-10 flex flex-col gap-5">
            <Kicker>{t('Betrieb', 'Operation', 'Exploitation')}</Kicker>
            <H2>{t('Wartung', 'Maintenance', 'Entretien')}</H2>
            <Text>{t('Der Grillplatz braucht keine besondere Wartung und Pflege. Die Intervalle können je nach örtlichen Gegebenheiten kürzer oder länger sein.', 'The barbecue area needs no special maintenance or care. The intervals may be shorter or longer depending on local conditions.', "L'aire de barbecue ne demande pas d'entretien particulier. Les intervalles peuvent être raccourcis ou allongés selon les conditions locales.")}</Text>
            <Tabelle
              ersteBreite="24%"
              kopf={[t('Wie oft', 'How often', 'Fréquence'), t('Was', 'What', 'Quoi')]}
              zeilen={[
                [<Chip>{t('alle 2 Wochen', 'every 2 weeks', 'toutes les 2 semaines')}</Chip>, t('Anlage reinigen. In der Nähe einen Müllbehälter und eine Aschetonne aufstellen und regelmäßig leeren.', 'Clean the installation. Place a litter bin and an ash bin nearby and empty them regularly.', "Nettoyer l'installation. Prévoir à proximité une poubelle et un bac à cendres et les vider régulièrement.")],
                [<Chip>{t('2 × im Jahr', 'twice a year', '2 fois par an')}</Chip>, t('Anlage prüfen, auch auf mutwillige Schäden. Betonabplatzungen mit Reparaturmörtel ausbessern. Die Prüfung muss eine geschulte Person machen.', 'Inspect the installation, including for vandalism. Repair concrete spalling with repair mortar. The inspection must be carried out by a trained person.', "Contrôler l'installation, y compris les dégradations volontaires. Réparer les éclats de béton au mortier de réparation. Le contrôle doit être effectué par une personne formée.")],
                [<Chip>{t('mind. 2 × im Jahr', 'at least twice a year', 'au moins 2 fois par an')}</Chip>, t('Rolle ölen.', 'Oil the pulley.', 'Huiler la poulie.')],
                [<Chip>{t('immer', 'always', 'toujours')}</Chip>, t('Als Brennstoff nur Grillkohle.', 'Use charcoal only as fuel.', 'Utiliser uniquement du charbon de bois comme combustible.')],
                [<Chip>{t('beim Reinigen', 'when cleaning', 'au nettoyage')}</Chip>, t('Edelstahlflächen nur mit Edelstahlreiniger und Wurzelbürste reinigen.', 'Clean stainless steel surfaces only with stainless steel cleaner and a scrubbing brush.', 'Nettoyer les surfaces inox uniquement avec un nettoyant inox et une brosse en chiendent.')],
              ]}
            />
          </div>
        </section>
      </Rahmen>
    </PageShell>
  );
};

export default ProductGrillAssemblyPage;
