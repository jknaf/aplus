import React from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useProducts } from '../localized';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';
import Bild from '../components/Bild';
import { ProduktHero, TechSpecCard, DATENBLATT, SCHILD, SCHILD_ICON } from '../components/ProduktBausteine';

const OtherProducts: React.FC = () => {
  const t = useT();
  const PRODUCTS = useProducts();
  const otherProducts = PRODUCTS.filter(p => p.id !== 'skate-bowls' && p.id !== 'skate-anlagen').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24 relative z-20">
      <div className="text-center mb-16">
          <span className="block font-mono text-xs mb-6 uppercase tracking-widest text-[#4F6E34]">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-[1.02]">{t(<>Weitere <span className="text-brand-orange">Lösungen</span></>, <>More <span className="text-brand-orange">solutions</span></>, <>D'autres <span className="text-brand-orange">solutions</span></>)}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 z-20 backdrop-blur-sm">
            <Bild hoch sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} width="600" height="800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 z-30">
               <span className="text-brand-orange font-mono text-xs mb-2 hidden group-hover:block">{t('PRODUKT', 'PRODUCT', 'PRODUIT')} 0{PRODUCTS.indexOf(product) + 1}</span>
              <h3 className="text-2xl font-extrabold font-heading text-white uppercase tracking-normal [word-spacing:0.12em] transform group-hover:-translate-y-1 transition-transform duration-300">{product.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const GalleryImage: React.FC<{ src: string; alt: string; label: string }> = ({ src, alt, label }) => (
    <div className="aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group relative shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <Bild src={src} alt={alt} sizes="(min-width: 1024px) 60vw, 100vw" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{label}</div>
    </div>
);

const ProductSkateBowlsPage: React.FC = () => {
  const t = useT();
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t("Modulare Skate-Bowls aus Beton", "Modular Concrete Skate Bowls", "Bowls de skate modulaires en béton"),
    "description": t("Skate-Bowls und Skate-Pools aus modularen Beton-Fertigteilen: Standard-Bowls im Erdreich, offene Bowls oberirdisch, Tiefen 98 und 150 cm. TÜV-zertifiziert nach DIN EN 14974, seit 2002 europaweit im Einsatz.", "Skate bowls and skate pools made of modular precast concrete units: standard bowls sunk into the ground, open bowls above ground, depths of 98 and 150 cm. TÜV-certified to EN 14974, in use across Europe since 2002.", "Bowls et pools de skate en éléments préfabriqués modulaires en béton : bowls standard enterrés, bowls ouverts hors sol, profondeurs de 98 et 150 cm. Certifiés TÜV selon la norme EN 14974, en service dans toute l'Europe depuis 2002."),
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": t("Sportanlagen", "Sports facilities", "Équipements sportifs"),
    "material": t("Beton", "Concrete", "Béton"),
    "image": "https://www.aplusurbandesign.com/images/skate-bowls/skate-bowl-01.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/skate-bowls-beton",
      "availability": "https://schema.org/InStock",
      "businessFunction": "https://schema.org/Sell",
      "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "valueAddedTaxIncluded": false }
    }
  };

  return (
    <PageShell
        title={t("Modulare Skate-Bowls aus Beton: geschlossen und offen", "Modular Concrete Skate Bowls: Closed and Open", "Bowls de skate modulaires en béton : fermés et ouverts")}
        description={t("Skate-Bowls aus modularen Beton-Fertigteilen: geschlossene Standard-Bowls im Erdreich, offene Bowls oberirdisch. Tiefen 98 und 150 cm. TÜV-zertifiziert nach DIN EN 14974. Planung, Fertigung und Lieferung aus einer Hand.", "Skate bowls made of modular precast concrete units: closed standard bowls sunk into the ground, open bowls above ground. Depths of 98 and 150 cm. TÜV-certified to EN 14974. Design, manufacture and delivery all from us.", "Bowls de skate en éléments préfabriqués modulaires en béton : bowls standard fermés et enterrés, bowls ouverts hors sol. Profondeurs de 98 et 150 cm. Certifiés TÜV selon la norme EN 14974. Conception, fabrication et livraison par un seul interlocuteur.")}
        schema={productSchema}
    >
       {/* 1. HERO mit Kennzahlen (Werte aus den technischen Daten) */}
       <ProduktHero
            bild={<Bild hoch src="/images/skate-bowls/skate-bowl-01.jpg" alt={t("Offener Skate-Bowl aus modularen Beton-Fertigteilen", "Open skate bowl made of modular precast concrete units", "Bowl de skate ouvert en éléments préfabriqués modulaires en béton")} className="absolute inset-0 w-full h-full object-cover animate-kenburns-1" loading="eager" fetchPriority="high" />}
            schilder={<>
                <span className={SCHILD}>{t("Bowls & Pools", "Bowls & Pools", "Bowls & Pools")}</span>
                         <span className={SCHILD_ICON}>
                            <span className="material-symbols-outlined text-base">verified_user</span> {t("DIN EN 14974", "EN 14974", "EN 14974")}
                         </span>
            </>}
            titel={t(<>Skate-<br/><span className="text-brand-orange">Bowls</span></>, <>Skate<br/><span className="text-brand-orange">Bowls</span></>, <>Bowls<br/><span className="text-brand-orange">de skate</span></>)}
            kennzahlen={[
                { wert: "TÜV / GS", label: t("Zertifizierung", "Certification", "Certification") },
                { wert: "98 / 150 cm", label: t("Bowl-Tiefen", "Bowl depths", "Profondeurs de bowl") },
                { wert: t("Geschlossen · Offen", "Closed · Open", "Fermé · Ouvert"), label: t("Bauweisen", "Types of construction", "Modes de construction") },
                { wert: t("Frostsicher · UV-beständig", "Frost-proof · UV-resistant", "Résiste au gel · résiste aux UV"), label: t("Witterung", "Weather", "Intempéries") },
            ]}
       />

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

            {/* 2. INTRO */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32 relative z-20">
                         <span className="block font-mono text-xs mb-6 uppercase tracking-widest text-[#4F6E34]">{t("Geschichte", "History", "Histoire")}</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl hyphens-auto font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-[1.02] mb-8">
                            {t(<>Vom Swimmingpool <span className="text-brand-orange">zum Bowl</span></>, <>From swimming pool <span className="text-brand-orange">to bowl</span></>, <>De la piscine <span className="text-brand-orange">au bowl</span></>)}
                        </h2>
                        <p className="text-xl text-brand-dark/75 leading-relaxed mb-6">
                            {t("In den 1950er-Jahren entdeckten Surfer leere Swimmingpools als Skateflächen. Die geschwungenen Transitions, das Flat und das Copingrohr an der Oberkante prägen bis heute jeden Skate-Bowl.", "In the 1950s, surfers discovered empty swimming pools as places to skate. The curved transitions, the flat and the coping tube along the top edge still define every skate bowl today.", "Dans les années 1950, des surfeurs ont découvert que les piscines vides pouvaient servir de terrain de skate. Les transitions courbes, le plat et le tube de coping sur le bord supérieur caractérisent encore aujourd'hui chaque bowl.")}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-6">
                            {t(<>Mit unseren modularen Skate-Elementen aus bewehrtem Beton bauen wir Bowls und Pools in vielen Größen und Formen, geschlossen im Erdreich oder offen auf der Fläche. Ein Bowl besteht aus einem ebenen Boden (Flat), den gekrümmte Wände (Transitions) umschließen. An der Oberkante, wo die Transition auf die Plattform trifft, sitzt das Copingrohr. Wir liefern Bowls in <strong className="text-brand-dark">98 und 150 cm</strong> Tiefe.</>, <>With our modular skate elements made of reinforced concrete, we build bowls and pools in many sizes and shapes, closed and sunk into the ground or open on the surface. A bowl consists of a level floor (the flat) surrounded by curved walls (the transitions). The coping tube sits along the top edge, where the transition meets the platform. We supply bowls in depths of <strong className="text-brand-dark">98 and 150 cm</strong>.</>, <>Avec nos éléments de skate modulaires en béton armé, nous construisons des bowls et des pools de nombreuses tailles et formes, fermés et enterrés, ou ouverts et posés hors sol. Un bowl se compose d'un sol horizontal (le plat) entouré de parois courbes (les transitions). Le tube de coping se trouve sur le bord supérieur, là où la transition rejoint la plateforme. Nous livrons des bowls de <strong className="text-brand-dark">98 et 150 cm</strong> de profondeur.</>)}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-8">
                            {t("2002 wurde der erste Bowl mit unseren modularen Skateelementen auf Gran Canaria gebaut. Unsere Skateelemente sind im Bereich von 0 m bis über 1.000 m über dem Meeresspiegel im Einsatz, von Norwegen bis zu den Kanaren, von England bis zur Türkei.", "The first bowl built with our modular skate elements went up on Gran Canaria in 2002. Our skate elements are in use from sea level to over 1,000 m above sea level, from Norway to the Canary Islands and from England to Turkey.", "Le premier bowl réalisé avec nos éléments de skate modulaires a été construit en 2002 à Gran Canaria. Nos éléments de skate sont en service du niveau de la mer à plus de 1 000 m d'altitude, de la Norvège aux Canaries et de l'Angleterre à la Turquie.")}
                        </p>

                        <div className="flex flex-col gap-4">
                            <Link to="/kontakt?projectType=Skatepark" className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl relative z-30 group">
                                {t("Bowl planen lassen", "Have your bowl designed", "Faire concevoir votre bowl")} <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <span className="text-xs text-brand-dark/75 font-mono text-center">{t("Mit kostenloser 3D-Voranalyse. Wir liefern und montieren schlüsselfertig.", "Includes a free initial 3D design. We deliver and install turnkey.", "Avec une analyse préalable 3D gratuite. Nous livrons et installons clé en main.")}</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-6">
                    <GalleryImage src="/images/skate-bowls/skate-bowl-02.jpg" alt={t("Skate-Bowl aus modularen Beton-Fertigteilen", "Skate bowl made of modular precast concrete units", "Bowl de skate en éléments préfabriqués modulaires en béton")} label={t("Abb. 1: Bowl mit Steilwand", "Fig. 1: Bowl with a steep wall", "Fig. 1 : bowl avec paroi raide")} />
                    <GalleryImage src="/images/skate-bowls/skate-pool-03.jpg" alt={t("Skate-Pool im Erdreich, geschlossene Bauweise", "Skate pool sunk into the ground, closed construction", "Pool de skate enterré, construction fermée")} label={t("Abb. 2: Pool im Erdreich", "Fig. 2: Pool sunk into the ground", "Fig. 2 : pool enterré")} />
                    <GalleryImage src="/images/skate-bowls/skate-bowl-pool-05.jpg" alt={t("S-Form Skate-Bowl aus Beton-Modulen", "S-shaped skate bowl made of concrete modules", "Bowl de skate en forme de S, en modules de béton")} label={t("Abb. 3: Bowl in S-Form (3D-Modell)", "Fig. 3: S-shaped bowl (3D model)", "Fig. 3 : bowl en forme de S (modèle 3D)")} />
                </div>
            </div>

            {/* 3. BOWL-TYPEN */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="block font-mono text-xs mb-4 uppercase tracking-widest text-[#4F6E34]">{t("Bauweisen", "Types of construction", "Modes de construction")}</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl hyphens-auto font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-[1.02]">
                            {t(<>Geschlossen <span className="text-brand-orange">oder offen</span></>, <>Closed <span className="text-brand-orange">or open</span></>, <>Fermé <span className="text-brand-orange">ou ouvert</span></>)}
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-12">
                    <div className="bg-white p-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <span className="text-brand-orange font-mono text-xs uppercase tracking-widest">{t("Standard-Bowl", "Standard bowl", "Bowl standard")}</span>
                        <h3 className="text-3xl font-bold font-heading text-brand-dark uppercase mt-2 mb-6">{t("Geschlossen · im Erdreich", "Closed · in the ground", "Fermé · enterré")}</h3>
                        <p className="text-brand-dark/75 leading-relaxed mb-4">
                            {t("Der klassische Bowl ist rundum geschlossen und eingegraben, man fährt über die obere Plattform ein. Die Elemente werden auf gesonderte Fundamente gestellt und anbetoniert. So wird die Anlage dauerhaft mit dem Untergrund verbunden.", "The classic bowl is closed all round and sunk into the ground; riders drop in from the upper platform. The elements are placed on separate foundations and concreted in. This joins the park permanently to the ground.", "Le bowl classique est fermé sur tout son pourtour et enterré ; on y entre par la plateforme supérieure. Les éléments sont posés sur des fondations séparées et scellés au béton. L'installation est ainsi reliée durablement au sol.")}
                        </p>
                        <p className="text-brand-dark/75 leading-relaxed mb-4">
                            {t("Im Flat ist mindestens ein Gully Pflicht. Wir empfehlen zur Sicherheit einen zweiten. Größen und Formen sind frei wählbar, zum Beispiel nierenförmige Kidney-Pools, kleeblattförmige Clover-Bowls oder Kombi-Pools mit mehreren Tiefen.", "At least one drain is mandatory in the flat. For safety we recommend a second. Sizes and shapes are freely selectable, for example kidney-shaped pools, cloverleaf bowls or combi pools with several depths.", "Dans le plat, au moins un avaloir est obligatoire. Par sécurité, nous en recommandons un second. Les tailles et les formes sont libres, par exemple des pools en forme de haricot (kidney), des bowls en trèfle (clover) ou des pools combinés à plusieurs profondeurs.")}
                        </p>
                        <ul className="text-sm text-brand-dark/75 font-mono space-y-2 mt-6">
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> {t("Tiefen 98 und 150 cm", "Depths 98 and 150 cm", "Profondeurs de 98 et 150 cm")}</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> {t("Ein Gully ist Pflicht, zwei sind empfohlen", "One drain is mandatory, two are recommended", "Un avaloir est obligatoire, deux sont recommandés")}</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> {t("Anbetoniert auf gesondertem Fundament", "Cast in on a separate foundation", "Scellé sur une fondation séparée")}</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> {t("Durchlaufendes, verzinktes Copingrohr", "Continuous galvanised coping tube", "Tube de coping galvanisé continu")}</li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <span className="text-brand-orange font-mono text-xs uppercase tracking-widest">{t("Offener Bowl", "Open bowl", "Bowl ouvert")}</span>
                        <h3 className="text-3xl font-bold font-heading text-brand-dark uppercase mt-2 mb-6">{t("Offen · oberirdisch", "Open · above ground", "Ouvert · hors sol")}</h3>
                        <p className="text-brand-dark/75 leading-relaxed mb-4">
                            {t("Der offene Bowl ist an mindestens einer Seite geöffnet: Man fährt direkt aufs Flat. Er lässt sich wie ein Bowl fahren und zugleich wie ein Street-Element. Man kann darin pumpen, grinden und wieder zurück ins Flat fahren.", "The open bowl is open on at least one side, so riders roll straight onto the flat. It can be skated like a bowl and like a street element at the same time. You can pump, grind and roll back into the flat.", "Le bowl ouvert est ouvert sur au moins un côté : on arrive directement sur le plat. Il se ride à la fois comme un bowl et comme un élément street. On peut y pumper, y grinder et revenir sur le plat.")}
                        </p>
                        <p className="text-brand-dark/75 leading-relaxed mb-4">
                            {t("Oberirdische Bowls werden direkt auf die vorhandene Rollfläche gestellt. Übergangsbleche aus Edelstahl gleichen den Übergang vom Boden zum Element aus. Aushub und Fundament sind nicht nötig. Die Fläche braucht nur ein leichtes Gefälle.", "Above-ground bowls are placed directly on the existing riding surface. Stainless steel transition plates smooth the step from the ground to the element. No excavation or foundation is needed. The surface only needs a slight fall.", "Les bowls hors sol sont posés directement sur la surface de roulement existante. Des plaques de transition en inox assurent le raccord entre le sol et l'élément. Ni terrassement ni fondation ne sont nécessaires. La surface doit seulement présenter une légère pente.")}
                        </p>
                        <ul className="text-sm text-brand-dark/75 font-mono space-y-2 mt-6">
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> {t("Direkt auf Bestandsfläche oder Asphalt", "Directly on an existing surface or asphalt", "Directement sur une surface existante ou de l'asphalte")}</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> {t("Ab 1,00 m Höhe mit Plattform (Table) und Absturzsicherung", "From 1.00 m high with a platform (deck) and fall protection", "À partir de 1,00 m de hauteur, avec plateforme (table) et protection antichute")}</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> {t("Ohne Fundament und Aushub", "No foundation or excavation", "Sans fondation ni terrassement")}</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> {t("Lässt sich versetzen, erweitern und abbauen", "Can be moved, extended and dismantled", "Peut être déplacé, agrandi et démonté")}</li>
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <GalleryImage src="/images/skate-bowls/skate-bowl-01.jpg" alt={t("Offener Skate-Bowl aus Beton", "Open concrete skate bowl", "Bowl de skate ouvert en béton")} label={t("Offener Bowl mit BMX-Fahrer", "Open bowl with a BMX rider", "Bowl ouvert avec un rider BMX")} />
                    <GalleryImage src="/images/skate-bowls/skate-pool-04.jpg" alt={t("Skate-Pool aus Beton-Fertigteil-Modulen", "Skate pool made of precast concrete modules", "Pool de skate en modules préfabriqués en béton")} label={t("Innenansicht eines Pools", "Inside a pool", "Vue intérieure d'un pool")} />
                    <GalleryImage src="/images/skate-bowls/skate-bowls-pools-06.jpg" alt={t("Bowl-Varianten aus modularen Beton-Elementen", "Bowl variants made of modular concrete elements", "Variantes de bowls en éléments modulaires de béton")} label={t("Bowl-Varianten (3D-Modell)", "Bowl variants (3D model)", "Variantes de bowls (modèle 3D)")} />
                </div>
            </div>

            {/* 4. PLANUNG */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="block font-mono text-xs mb-4 uppercase tracking-widest text-[#4F6E34]">{t("Bauweise", "Construction", "Mode de construction")}</span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl hyphens-auto font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-[1.02]">
                            {t(<>Fertigteil statt <span className="text-brand-orange">Ortbeton</span></>, <>Precast instead of <span className="text-brand-orange">in-situ concrete</span></>, <>Préfabriqué plutôt que <span className="text-brand-orange">béton coulé en place</span></>)}
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-6">
                            {t(<>Fertigteile lassen sich <strong className="text-brand-dark">besser prüfen</strong> als Ortbeton: Wandstärke, Bewehrung und Fugen entstehen im Werk unter gleichbleibenden Bedingungen. Der Bau geht schneller, ist kaum wetterabhängig und meist günstiger.</>, <>Precast units are <strong className="text-brand-dark">easier to inspect</strong> than in-situ concrete: wall thickness, reinforcement and joints are made in the factory under constant conditions. Construction is faster, hardly depends on the weather and is usually cheaper.</>, <>Les éléments préfabriqués se <strong className="text-brand-dark">contrôlent mieux</strong> que le béton coulé en place : épaisseur des parois, armatures et joints sont réalisés en usine dans des conditions constantes. Le chantier est plus rapide, peu dépendant de la météo et le plus souvent moins coûteux.</>)}
                        </p>
                        <p className="text-brand-dark/75 leading-relaxed">
                            {t(<>Wichtig ist aber eine gute Vorplanung der Anlage. <strong className="text-brand-dark">Bitte nehmen Sie vor Beginn der Planung mit uns Kontakt auf.</strong></>, <>Good preliminary planning is essential, though. <strong className="text-brand-dark">Please contact us before you start planning.</strong></>, <>Une bonne étude préalable de l'installation reste toutefois indispensable. <strong className="text-brand-dark">Merci de nous contacter avant de commencer la planification.</strong></>)}
                        </p>
                    </div>
                    <div className="bg-brand-dark text-white p-8 rounded-xl">
                        <h3 className="text-2xl font-bold font-heading uppercase mb-4">{t("Planung & Beratung", "Design & Advice", "Conception & conseil")}</h3>
                        <p className="text-sm text-white/80 leading-relaxed mb-6">
                            {t("Jede Bowl-Anlage ist eine individuelle Planungsaufgabe. Wir begleiten Sie von der ersten Skizze über die 3D-Visualisierung bis zur schlüsselfertigen Montage.", "Every bowl park is an individual design task. We guide you from the first sketch through 3D visualisation to turnkey installation.", "Chaque installation de bowl est un projet de conception à part entière. Nous vous accompagnons de la première esquisse à l'installation clé en main, en passant par la visualisation 3D.")}
                        </p>
                        <Link to="/planung" className="inline-flex items-center gap-2 text-brand-orange font-mono text-sm uppercase tracking-wider hover:underline">
                            {t("Planungsprozess ansehen", "See the planning process", "Voir le processus de planification")} <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 5. TECH SPECS */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl hyphens-auto font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-[1.02]">
                        {t(<>Technische <span className="text-brand-orange">Daten</span></>, <>Technical <span className="text-brand-orange">data</span></>, <>Données <span className="text-brand-orange">techniques</span></>)}
                    </h2>
                    <span className="font-mono text-brand-dark/75 text-xs hidden sm:block">{t("DATENBLATT: BOWLS", "DATA SHEET: BOWLS", "FICHE TECHNIQUE : BOWLS")}</span>
                </div>

                <dl className={DATENBLATT}>
                    <TechSpecCard
                        title={t("Zertifizierung", "Certification", "Certification")}
                        value={t("DIN EN 14974 / TÜV / GS", "EN 14974 / TÜV / GS", "EN 14974 / TÜV / GS")}
                        icon="verified"
                        href="https://www.tuvsud.com/de-de/dienstleistungen/produktpruefung-und-produktzertifizierung/zertifikatsdatenbank/?q=Z1A+056616+0012+Rev.+00"
                        linkLabel={t("Zertifikat TÜV SÜD", "TÜV SÜD certificate", "Certificat TÜV SÜD")}
                    />
                    <TechSpecCard title={t("Bowl-Tiefen", "Bowl depths", "Profondeurs de bowl")} value="98 / 150 cm" icon="straighten" />
                    <TechSpecCard title={t("Bauweisen", "Types of construction", "Modes de construction")} value={t("Geschlossen · Offen", "Closed · Open", "Fermé · Ouvert")} icon="view_in_ar" />
                    <TechSpecCard title={t("Material", "Material", "Matériau")} value={t("Bewehrter Beton C35/45", "Reinforced concrete C35/45", "Béton armé C35/45")} icon="architecture" />
                    <TechSpecCard title={t("Copingrohr", "Coping tube", "Tube de coping")} value={t("Verzinkt · fortlaufend", "Galvanised · continuous", "Galvanisé · continu")} icon="commit" />
                    <TechSpecCard title={t("Gully", "Drain", "Avaloir")} value={t("min. 1 (Pflicht)", "min. 1 (mandatory)", "min. 1 (obligatoire)")} icon="water_drop" />
                    <TechSpecCard title={t("Übergang (offener Bowl)", "Transition (open bowl)", "Raccord (bowl ouvert)")} value={t("Übergangsblech", "Transition plate", "Plaque de transition")} icon="shield" />
                    <TechSpecCard title={t("Absturzsicherung", "Fall protection", "Protection antichute")} value={t("ab 1,00 m Höhe", "from 1.00 m high", "à partir de 1,00 m de hauteur")} icon="safety_check" />
                    <TechSpecCard title={t("Freiformen", "Free forms", "Formes libres")} value={t("aus Modulen möglich", "possible with modules", "possibles avec des modules")} icon="extension" />
                    <TechSpecCard title={t("Witterung", "Weather", "Intempéries")} value={t("Frostsicher · UV-beständig", "Frost-proof · UV-resistant", "Résiste au gel · résiste aux UV")} icon="ac_unit" />
                    <TechSpecCard title={t("Versetzbar", "Relocatable", "Déplaçable")} value={t("Ja (offener Bowl)", "Yes (open bowl)", "Oui (bowl ouvert)")} icon="unfold_more" />
                    <TechSpecCard title={t("Montage", "Installation", "Montage")} value={t("Durch A+ Urban Design", "By A+ Urban Design", "Par A+ Urban Design")} icon="build" />
                </dl>
            </div>

            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/skate-bowls-beton" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductSkateBowlsPage;
