import React from 'react';
import { useT } from '../i18n';
import PageShell from '../components/PageShell';
import { Ablauf, Achtung, Bild, H2, Hinweis, Kicker, Kopf, Leiste, Liste, Rahmen, Schritte, SchrittDaten, Tabelle, Text } from '../components/montage/Montage';

// Inhalt 1:1 nach der Originalanleitung „Montageanleitung Umkleidekabine“ (2020/2023) samt der dort aufgeklebten Ergänzungen.
// Schrittbilder und 3D-Modell nach der Originalzeichnung (Grundriss aus den Vektorlinien, Wand 1,79 × 2,16 m, Platte 1,99 × 2,36 m,
// Höhen 16 + 30 + 130 cm, Kiesbett 24 cm). Plattenstärke: Text 15 cm, Zeichnung 16 cm; hier 16 cm, Klärung mit A+ offen.
const B = '/montage/umkleidekabine';

const ProductChangingCabineAssemblyPage: React.FC = () => {
  const t = useT();

  const schritte: SchrittDaten[] = [
    {
      id: 's1', bild: `${B}/02-bodenplatte.webp`,
      alt: t('Bodenplatte mit drei Gewindehülsen wird auf das Kiesbett gesetzt', 'Base slab with three threaded sleeves is placed on the gravel bed', 'La dalle avec trois douilles filetées est posée sur le lit de gravier'),
      kurz: t('Bodenplatte', 'Base slab', 'Dalle'),
      titel: t('Bodenplatte setzen', 'Place the base slab', 'Poser la dalle'),
      inhalt: <>
        <Text>{t('Die Bodenplatte auf das Kiesbett setzen und positionieren.', 'Place the base slab on the gravel bed and position it.', 'Poser la dalle sur le lit de gravier et la positionner.')}</Text>
        <Achtung>{t('Beim Abladen und Versetzen Abstand zu angehobenen Teilen halten.', 'When unloading and positioning, keep clear of lifted parts.', 'Pendant le déchargement et la mise en place, se tenir à distance des éléments soulevés.')}</Achtung>
      </>,
    },
    {
      id: 's2', bild: `${B}/03-fuesse.webp`,
      alt: t('Drei Edelstahlfüße stehen auf der Bodenplatte', 'Three stainless steel feet stand on the base slab', 'Trois pieds en inox sont fixés sur la dalle'),
      kurz: t('Füße', 'Feet', 'Pieds'),
      titel: t('Gewindestifte und Füße einschrauben', 'Screw in the threaded studs and feet', 'Visser les tiges filetées et les pieds'),
      inhalt: <>
        <Liste punkte={[
          t('Die mitgelieferten Gewindestifte in die Gewindehülsen der Bodenplatte fest einschrauben.', 'Screw the threaded studs supplied tightly into the threaded sleeves of the base slab.', 'Visser fermement les tiges filetées fournies dans les douilles filetées de la dalle.'),
          t('Die Füße auf die Gewindestifte schrauben.', 'Screw the feet onto the threaded studs.', 'Visser les pieds sur les tiges filetées.'),
        ]} />
        <Hinweis label={t('Spiel', 'Play', 'Jeu')}>{t('Die Füße sollen sich am oberen Ende noch ca. 1 cm bewegen lassen.', 'The feet should still move by about 1 cm at the top end.', "Les pieds doivent encore pouvoir bouger d'environ 1 cm à leur extrémité supérieure.")}</Hinweis>
      </>,
    },
    {
      id: 's3', bild: `${B}/04-schnecke.webp`,
      alt: t('Schnecke mit Transportaussteifung wird über die drei Füße herabgelassen, Holzbohlen liegen auf der Bodenplatte', 'Schnecke with transport bracing is lowered over the three feet, timber planks lie on the base slab', "La Schnecke avec son raidisseur de transport est descendue sur les trois pieds, des madriers sont posés sur la dalle"),
      kurz: t('Schnecke herablassen', 'Lower the Schnecke', 'Descendre la Schnecke'),
      titel: t('Schnecke über die Füße herablassen', 'Lower the Schnecke over the feet', 'Descendre la Schnecke sur les pieds'),
      inhalt: <>
        <Text>{t('Vor der Montage der Schnecke Holzbohlen zwischen Schnecke und Bodenplatte legen. Dann die Schnecke über die drei Füße heben, sodass die Füße in die drei Löcher der Schneckenwand gleiten.', 'Before installing the Schnecke, place timber planks between the Schnecke and the base slab. Then lift the Schnecke over the three feet so that the feet slide into the three holes in the wall of the Schnecke.', "Avant le montage de la Schnecke, poser des madriers entre la Schnecke et la dalle. Soulever ensuite la Schnecke au-dessus des trois pieds afin que les pieds glissent dans les trois trous de la paroi.")}</Text>
        <Hinweis label={t('Ausrichten', 'Alignment', 'Alignement')}>{t('Die Schnecke muss waagerecht hängen und senkrecht herabgelassen werden, damit die Füße in die Schnecke gleiten.', 'The Schnecke must hang level and be lowered vertically so that the feet slide into it.', "La Schnecke doit être suspendue à l'horizontale et descendue à la verticale pour que les pieds glissent dans la paroi.")}</Hinweis>
        <Achtung>{t('Die Seile oder Ketten zu den Ankerhülsen müssen immer einen Winkel von mehr als 45° zur Horizontalen haben.', 'The ropes or chains to the anchor sleeves must always be at an angle of more than 45° to the horizontal.', "Les câbles ou chaînes reliés aux douilles d'ancrage doivent toujours former un angle de plus de 45° avec l'horizontale.")}</Achtung>
      </>,
    },
    {
      id: 's4', bild: `${B}/05-fuesse-festziehen.webp`,
      alt: t('Die Füße stecken wenige Zentimeter in den Löchern der Schnecke', 'The feet are a few centimetres into the holes of the Schnecke', 'Les pieds sont engagés de quelques centimètres dans les trous de la Schnecke'),
      kurz: t('Füße festziehen', 'Tighten the feet', 'Serrer les pieds'),
      titel: t('Füße an der Platte festziehen', 'Tighten the feet on the slab', 'Serrer les pieds sur la dalle'),
      inhalt: <>
        <Text>{t('Wenn die Füße ca. 2 cm in die Löcher der Wand eingedrungen sind, die Füße an der Platte festziehen. Danach die Schnecke ganz herablassen.', 'Once the feet have entered the holes in the wall by about 2 cm, tighten the feet on the slab. Then lower the Schnecke completely.', "Lorsque les pieds sont engagés d'environ 2 cm dans les trous de la paroi, les serrer sur la dalle. Descendre ensuite complètement la Schnecke.")}</Text>
        <Hinweis label={t('Höhe', 'Height', 'Hauteur')}>{t('Die Füße ragen nur ca. 30 cm aus der Schnecke heraus.', 'The feet protrude only about 30 cm from the Schnecke.', "Les pieds ne dépassent que d'environ 30 cm de la Schnecke.")}</Hinweis>
      </>,
    },
    {
      id: 's5', bild: `${B}/06-aussteifung.webp`,
      alt: t('Die Transportaussteifung wird oben von der Schnecke abgenommen', 'The transport bracing is removed from the top of the Schnecke', 'Le raidisseur de transport est retiré du haut de la Schnecke'),
      kurz: t('Abschließen', 'Finishing', 'Finitions'),
      titel: t('Aussteifung abnehmen, Ankerhülsen schließen', 'Remove the bracing, seal the anchor sleeves', "Retirer le raidisseur, obturer les douilles d'ancrage"),
      inhalt: <>
        <Liste punkte={[
          t('Die Aussteifung der Schnecke erst jetzt abmontieren. Sie aufbewahren: Bei einem späteren Versetzen wird sie wieder gebraucht.', 'Only now remove the bracing of the Schnecke. Keep it: it will be needed again if the cubicle is moved later.', 'Démonter seulement maintenant le raidisseur de la Schnecke. Le conserver : il servira à nouveau en cas de déplacement ultérieur.'),
          t('Die Löcher der Ankerhülsen bis 5–10 mm unter den Rand mit Papier füllen und die restlichen 5–10 mm mit Silikon abdichten. So lassen sich die Anker bei Bedarf wieder verwenden.', 'Fill the holes of the anchor sleeves with paper up to 5–10 mm below the edge and seal the remaining 5–10 mm with silicone. This way the anchors can be reused if needed.', "Remplir les trous des douilles d'ancrage de papier jusqu'à 5–10 mm sous le bord, puis obturer les 5–10 mm restants au silicone. Les ancrages restent ainsi réutilisables."),
        ]} />
      </>,
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: t('Montageanleitung Umkleidekabine | A+ Urban Design', 'Installation Instructions: Changing Cubicle | A+ Urban Design', 'Notice de montage : cabine de change | A+ Urban Design'),
    description: t('Montage der A+ Umkleidekabine „Schnecke“ aus Beton: Kiesbett, Bodenplatte, Füße, Schnecke herablassen, Aussteifung abnehmen.', 'Installing the A+ concrete changing cubicle “Schnecke”: gravel bed, base slab, feet, lowering the Schnecke, removing the bracing.', "Montage de la cabine de change en béton A+ « Schnecke » : lit de gravier, dalle, pieds, descente de la Schnecke, retrait du raidisseur."),
    inLanguage: t('de-DE', 'en-GB', 'fr-FR'),
    image: 'https://www.aplusurbandesign.com/montage/umkleidekabine/07-fertig.webp',
    author: { '@type': 'Organization', name: 'A+ Urban Design', url: 'https://www.aplusurbandesign.com' },
    publisher: { '@type': 'Organization', name: 'A+ Urban Design', logo: { '@type': 'ImageObject', url: 'https://www.aplusurbandesign.com/aplus-logo.svg' } },
    about: { '@type': 'Product', name: t('Umkleidekabine „Schnecke“', 'Changing cubicle “Schnecke”', 'Cabine de change « Schnecke »'), url: 'https://www.aplusurbandesign.com/produkte/umkleidekabine-beton' },
  };

  return (
    <PageShell
      title={t('Montageanleitung Umkleidekabine', 'Installation instructions: changing cubicle', 'Notice de montage : cabine de change')}
      description={t('Montageanleitung für die A+ Umkleidekabine „Schnecke“ aus Beton: Kiesbett, Teile und Gewichte, fünf Montageschritte mit Bildern. Auch als PDF zum Blättern.', 'Installation instructions for the A+ concrete changing cubicle “Schnecke”: gravel bed, parts and weights, five installation steps with images. Also as a PDF to flip through.', "Notice de montage de la cabine de change en béton A+ « Schnecke » : lit de gravier, éléments et poids, cinq étapes de montage illustrées. Également en PDF à feuilleter.")}
      schema={schema}
      ogImage="/montage/umkleidekabine/07-fertig.webp"
      fullWidth
    >
      <Rahmen kopfzeile={t('MONTAGEANLEITUNG UMKLEIDEKABINE', 'INSTALLATION INSTRUCTIONS CHANGING CUBICLE', 'NOTICE DE MONTAGE CABINE DE CHANGE')}>
        <Leiste zurueck="/produkte/umkleidekabine-beton" zurueckText={t('Umkleidekabine', 'Changing cubicle', 'Cabine de change')} pdf="umkleidekabine" />

        <Kopf
          kicker={t('Montageanleitung · Umkleidekabine', 'Installation instructions · Changing cubicle', 'Notice de montage · Cabine de change')}
          titel={t('Umkleidekabine montieren', 'Installing the changing cubicle', 'Monter la cabine de change')}
          texte={[
            t('Die Umkleidekabine besteht aus zwei Teilen: der Bodenplatte und der Schnecke, einer gebogenen Betonwand auf drei Edelstahlfüßen. Sie braucht kein Fundament und liegt auf einem Kiesbett.', 'The changing cubicle consists of two parts: the base slab and the Schnecke, a curved concrete wall on three stainless steel feet. It needs no foundation and rests on a gravel bed.', "La cabine de change se compose de deux éléments : la dalle et la Schnecke, une paroi courbe en béton sur trois pieds en inox. Elle ne nécessite pas de fondation et repose sur un lit de gravier."),
            t('Die Schrittbilder sind nach den Maßen der Originalzeichnung gebaut. Grün ist das Teil, das im jeweiligen Schritt gesetzt wird.', 'The step images are built to the dimensions of the original drawing. Green marks the part placed in each step.', "Les images des étapes reprennent les cotes du plan d'origine. En vert : l'élément posé à chaque étape."),
          ]}
          modell={{ src: `${B}/umkleide-montage.gltf`, poster: `${B}/umkleide-montage.webp`, alt: t('3D-Modell der Umkleidekabine', '3D model of the changing cubicle', 'Modèle 3D de la cabine de change'), kamera: { ziel: [0, 0.85, 0], abstand: 6.0 } }}
          titelbild={`${B}/07-fertig.webp`}
          masse={t('1,99 × 2,36 m · Höhe 1,60 m über Platte', '1.99 × 2.36 m · height 1.60 m above slab', '1,99 × 2,36 m · hauteur 1,60 m au-dessus de la dalle')}
        />

        <Ablauf schritte={schritte} />

        <section className="max-w-[1160px] mx-auto px-4 md:px-8 pt-20 md:pt-[88px]">
          <div className="m-zwei grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="flex flex-col gap-5">
              <Kicker>{t('Voraussetzungen', 'Requirements', 'Conditions préalables')}</Kicker>
              <H2>{t('Kiesbett herstellen', 'Preparing the gravel bed', 'Réaliser le lit de gravier')}</H2>
              <Text>{t('Die Umkleidekabine braucht kein Fundament. Die Bodenplatte wird auf ein Kiesbett gelegt. Das Kiesbett ist bauseits auszuführen.', 'The changing cubicle needs no foundation. The base slab is laid on a gravel bed. The gravel bed is to be provided by the client.', "La cabine de change ne nécessite pas de fondation. La dalle est posée sur un lit de gravier. Le lit de gravier est à la charge du maître d'ouvrage.")}</Text>
              <Tabelle
                kopf={[t('Schicht', 'Layer', 'Couche'), t('Stärke', 'Thickness', 'Épaisseur'), t('Körnung', 'Grain size', 'Granulométrie')]}
                zeilen={[
                  [<><b>{t('Kiesbett', 'Gravel bed', 'Lit de gravier')}</b><br />{t('verdichtet, frostsicher, glatt abgezogen', 'compacted, frost-proof, screeded smooth', 'compacté, hors gel, réglé lisse')}</>, '24 cm', '5–20 mm'],
                ]}
              />
              <Hinweis label={t('Höhe', 'Height', 'Hauteur')}>{t('Die Bodenplatte kann bündig oder über dem Erdreich montiert werden. Für den bündigen Einbau die Plattenstärke von 16 cm berücksichtigen und das Kiesbett entsprechend anlegen.', 'The base slab can be installed flush with or above the ground. For flush installation, allow for the slab thickness of 16 cm and lay the gravel bed accordingly.', "La dalle peut être posée à fleur du sol ou au-dessus. Pour une pose à fleur, tenir compte de l'épaisseur de dalle de 16 cm et réaliser le lit de gravier en conséquence.")}</Hinweis>
              <p className="m-0 text-sm leading-relaxed text-brand-dark/70">{t('Für eine mangelhafte Ausführung des Kiesbetts übernimmt A+ Urban Design keine Haftung.', 'A+ Urban Design accepts no liability for a defective gravel bed.', 'A+ Urban Design décline toute responsabilité en cas de lit de gravier mal exécuté.')}</p>
            </div>
            <Bild src={`${B}/01-kiesbett.webp`} alt={t('Kiesbett, 24 cm stark', 'Gravel bed, 24 cm thick', 'Lit de gravier, 24 cm')} />
          </div>
        </section>

        <section className="max-w-[1160px] mx-auto px-4 md:px-8 pt-20 md:pt-[88px]">
          <div className="m-zwei grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-start">
            <Bild src={`${B}/07-fertig.webp`} alt={t('Umkleidekabine mit Bodenplatte, drei Füßen und Schnecke', 'Changing cubicle with base slab, three feet and Schnecke', 'Cabine de change avec dalle, trois pieds et Schnecke')} className="order-2 md:order-1" />
            <div className="flex flex-col gap-5 order-1 md:order-2">
              <Kicker>{t('Lieferung', 'Delivery', 'Livraison')}</Kicker>
              <H2>{t('Teile und Gewichte', 'Parts and weights', 'Éléments et poids')}</H2>
              <Liste punkte={[
                <><b>{t('Bodenplatte', 'Base slab', 'Dalle')}</b> {t('mit Gewindehülsen für die Füße', 'with threaded sleeves for the feet', 'avec douilles filetées pour les pieds')}</>,
                <><b>{t('Schnecke', 'Schnecke', 'Schnecke')}</b> {t('mit Ankerhülsen, drei Löchern für die Füße und Aussteifung für den Transport', 'with anchor sleeves, three holes for the feet and bracing for transport', "avec douilles d'ancrage, trois trous pour les pieds et raidisseur de transport")}</>,
                <><b>{t('3 Gewindestifte und 3 Edelstahlfüße', '3 threaded studs and 3 stainless steel feet', '3 tiges filetées et 3 pieds en inox')}</b></>,
              ]} />
              <Text>{t('Die beiden Teile wiegen ca. 1,0 t und 2,3 t.', 'The two parts weigh approx. 1.0 t and 2.3 t.', 'Les deux éléments pèsent env. 1,0 t et 2,3 t.')}</Text>
              <span className="mt-2"><Kicker leise>{t('Auf der Baustelle bereithalten', 'Have ready on site', 'À prévoir sur le chantier')}</Kicker></span>
              <Liste punkte={[
                t('Autokran, Radlader oder Gabelstapler zum Abladen', 'Mobile crane, wheel loader or forklift for unloading', 'Grue mobile, chargeuse sur pneus ou chariot élévateur pour le déchargement'),
                t('Seilösen M 24', 'Lifting eyes M 24', 'Anneaux de levage M 24'),
                t('Holzbohlen', 'Timber planks', 'Madriers'),
                t('Papier und Silikon, zum Schließen der Ankerhülsen', 'Paper and silicone, for sealing the anchor sleeves', "Papier et silicone, pour obturer les douilles d'ancrage"),
              ]} />
              <Achtung>{t('Holzbohlen zwischen Schnecke und Bodenplatte legen, bevor die Schnecke montiert wird. Sie verhindern Unfälle.', 'Place timber planks between the Schnecke and the base slab before the Schnecke is installed. They prevent accidents.', 'Poser des madriers entre la Schnecke et la dalle avant de monter la Schnecke. Ils évitent les accidents.')}</Achtung>
            </div>
          </div>
        </section>

        <Schritte schritte={schritte} />
      </Rahmen>
    </PageShell>
  );
};

export default ProductChangingCabineAssemblyPage;
