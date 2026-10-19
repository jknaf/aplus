import React from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useProducts } from '../localized';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';
import Bild from '../components/Bild';
import { ProduktHero, TechSpecCard, DATENBLATT } from '../components/ProduktBausteine';
import Plankopf from '../components/Plankopf';

const OtherProducts: React.FC = () => {
  const t = useT();
  const PRODUCTS = useProducts();
  const otherProducts = PRODUCTS.filter(p => p.id !== 'skate-pipes' && p.id !== 'skate-anlagen').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24 relative z-20">
      <div className="text-center mb-16">
          <Plankopf label="Portfolio">
{t(<>Weitere <span className="text-brand-orange">Lösungen</span></>, <>More <span className="text-brand-orange">solutions</span></>, <>D'autres <span className="text-brand-orange">solutions</span></>)}
          </Plankopf>
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

const ProductSkatePipesPage: React.FC = () => {
  const t = useT();
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t("Skate-Pipes aus Beton: Pipe 165, 200 und 255", "Concrete Skate Pipes: Pipe 165, 200 and 255", "Pipes de skate en béton : pipe 165, 200 et 255"),
    "description": t("Skate-Pipes aus bewehrtem Beton in drei Gesamthöhen (inklusive Flat): 165, 200 und 255 cm. Standardaufstellung oder Kombi mit Banks, Coping-Ramps, Spines. TÜV-zertifiziert nach DIN EN 14974.", "Skate pipes made of reinforced concrete in three overall heights (including the flat): 165, 200 and 255 cm. Standard layout or combi with banks, coping ramps and spines. TÜV-certified to EN 14974.", "Pipes de skate en béton armé en trois hauteurs totales (plat compris) : 165, 200 et 255 cm. Disposition standard ou combi avec banks, rampes à coping et spines. Certifiées TÜV selon la norme EN 14974."),
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": t("Sportanlagen", "Sports facilities", "Équipements sportifs"),
    "material": t("Beton", "Concrete", "Béton"),
    "image": "https://www.aplusurbandesign.com/images/skate-pipes/skate-pipe-01.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/skate-pipes-beton",
      "availability": "https://schema.org/InStock",
      "businessFunction": "https://schema.org/Sell",
      "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "valueAddedTaxIncluded": false }
    }
  };

  return (
    <PageShell
        title={t("Skate-Pipes aus Beton: Mini-Pipes in 165, 200 und 255 cm", "Concrete Skate Pipes: Mini Ramps in 165, 200 and 255 cm", "Pipes de skate en béton : mini-rampes de 165, 200 et 255 cm")}
        description={t("Skate-Pipes aus bewehrtem Beton in drei Gesamthöhen (inklusive Flat): 165, 200 und 255 cm. Standardaufstellung oder Kombi-Pipe mit Banks, Coping-Ramps und Spines. TÜV-zertifiziert nach DIN EN 14974. Fundamentfrei montierbar.", "Skate pipes made of reinforced concrete in three overall heights (including the flat): 165, 200 and 255 cm. Standard layout or combi pipe with banks, coping ramps and spines. TÜV-certified to EN 14974. Installed without foundations.", "Pipes de skate en béton armé en trois hauteurs totales (plat compris) : 165, 200 et 255 cm. Disposition standard ou pipe combi avec banks, rampes à coping et spines. Certifiées TÜV selon la norme EN 14974. Montage sans fondation.")}
        schema={productSchema}
    >
       {/* 1. HERO mit Kennzahlen (Werte aus den technischen Daten) */}
       <ProduktHero
            bild={<Bild hoch src="/images/skate-pipes/skate-pipe-01.jpg" alt={t("Skate-Pipe aus Betonfertigteilen", "Skate pipe made of precast concrete units", "Pipe de skate en éléments préfabriqués en béton")} className="absolute inset-0 w-full h-full object-cover animate-kenburns-1" loading="eager" fetchPriority="high" />}
            label="165 · 200 · 255"
            rechts={t("DIN EN 14974", "EN 14974", "EN 14974")}
            titel={t(<>Skate-<br/><span className="text-brand-orange">Pipes</span></>, <>Skate<br/><span className="text-brand-orange">Pipes</span></>, <>Pipes<br/><span className="text-brand-orange">de skate</span></>)}
            kennzahlen={[
                { wert: "TÜV / GS", label: t("Zertifizierung", "Certification", "Certification") },
                { wert: "165 / 200 / 255 cm", label: t("Pipe-Höhen", "Pipe heights", "Hauteurs de pipe") },
                { wert: t("Fundamentfrei", "Foundation-free", "Sans fondation"), label: t("Aufstellung", "Installation", "Installation") },
                { wert: t("Verzinkt · fortlaufend", "Galvanised · continuous", "Galvanisé · continu"), label: t("Copingrohr", "Coping tube", "Tube de coping") },
            ]}
       />

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

            {/* 2. INTRO */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32 relative z-20">
                         <Plankopf label={t("Aufbau", "Structure", "Structure")} className="mb-8">
                            {t(<>Pipes <br/><span className="text-brand-orange">aus Beton</span></>, <>Concrete <br/><span className="text-brand-orange">pipes</span></>, <>Pipes <br/><span className="text-brand-orange">en béton</span></>)}
                         </Plankopf>
                        <p className="text-xl text-brand-dark/75 leading-relaxed mb-6">
                            {t("Die Halfpipe entstand in den 1970er-Jahren aus leeren Schwimmbecken. Heute gehört eine Pipe in fast jeden Skatepark. Aus Beton gebaut hält sie besonders lange.", "The halfpipe grew out of empty swimming pools in the 1970s. Today almost every skatepark has a pipe. Built in concrete, it lasts especially long.", "La halfpipe est née dans les années 1970 à partir de piscines vides. Aujourd'hui, presque tous les skateparks ont une pipe. Construite en béton, elle dure particulièrement longtemps.")}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-6">
                            {t(<>Unsere Skate-Pipes sind aus bewehrtem Beton gefertigt. Unter jeder Plattform sitzt eine arretierbare Stütze, an der Oberkante läuft ein verzinktes Copingrohr durch. Wir liefern sie in <strong className="text-brand-dark">165, 200 und 255 cm</strong> Gesamthöhe, jeweils inklusive 15 cm Flat. Es gibt sie als Standard-Pipe oder als Kombi-Pipe mit Banks, Coping-Ramps und Spines.</>, <>Our skate pipes are made of reinforced concrete. Under each platform sits a lockable support, and a galvanised coping tube runs along the top edge. We supply them in overall heights of <strong className="text-brand-dark">165, 200 and 255 cm</strong>, each including a 15 cm flat. They come as a standard pipe or as a combi pipe with banks, coping ramps and spines.</>, <>Nos pipes de skate sont fabriquées en béton armé. Sous chaque plateforme se trouve un support verrouillable, et un tube de coping galvanisé court le long du bord supérieur. Nous les livrons en hauteurs totales de <strong className="text-brand-dark">165, 200 et 255 cm</strong>, plat de 15 cm compris. Elles existent en version standard ou en pipe combi avec banks, rampes à coping et spines.</>)}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-8">
                            {t("Die kleine Pipe ist mindestens 375 cm breit und lässt sich in Schritten von 187,5 cm erweitern. Mittlere und große Pipes sind mindestens 500 cm breit und folgen einem Modulraster von 250 cm. Montiert wird ohne Fundament auf Asphalt, Beton oder verdichtetem Schotterbett.", "The small pipe is at least 375 cm wide and can be extended in steps of 187.5 cm. Medium and large pipes are at least 500 cm wide and follow a module grid of 250 cm. They are installed without a foundation on asphalt, concrete or a compacted gravel bed.", "La petite pipe mesure au moins 375 cm de large et peut être agrandie par pas de 187,5 cm. Les pipes moyennes et grandes mesurent au moins 500 cm de large et suivent une trame de modules de 250 cm. Le montage se fait sans fondation sur de l'asphalte, du béton ou un lit de gravier compacté.")}
                        </p>

                        <div className="flex flex-col gap-4">
                            <Link to="/kontakt?projectType=Skatepark" className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl relative z-30 group">
                                {t("Pipe anfragen", "Enquire about a pipe", "Demander un devis pour une pipe")} <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <span className="text-xs text-brand-dark/75 font-mono text-center">{t("Mit 3D-Voranalyse. Wir liefern und montieren schlüsselfertig.", "Includes an initial 3D design. We deliver and install turnkey.", "Avec analyse préalable 3D. Nous livrons et installons clé en main.")}</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-6">
                    <GalleryImage src="/images/skate-pipes/skate-pipe-02.jpg" alt={t("Skate-Pipe aus Beton in Standardaufstellung", "Concrete skate pipe in standard layout", "Pipe de skate en béton en disposition standard")} label={t("Abb. 1: Standard-Pipe mit Geländer", "Fig. 1: Standard pipe with railing", "Fig. 1 : pipe standard avec garde-corps")} />
                    <GalleryImage src="/images/skate-pipes/skate-pipe-bank-03.jpg" alt={t("Skate-Pipe mit Bank-Anfahrt", "Skate pipe with bank approach", "Pipe de skate avec bank d'accès")} label={t("Abb. 2: Pipe mit angesetzter Bank", "Fig. 2: Pipe with attached bank", "Fig. 2 : pipe avec bank accolé")} />
                    <GalleryImage src="/images/skate-pipes/skate-pipe-kombi-04.jpg" alt={t("Kombi-Pipe mit mehreren Höhen und Banks", "Combi pipe with several heights and banks", "Pipe combi à plusieurs hauteurs et avec banks")} label={t("Abb. 3: Pipe-Kombination mit Box", "Fig. 3: Pipe combination with box", "Fig. 3 : combinaison de pipes avec box")} />
                </div>
            </div>

            {/* 3. PIPE-HÖHEN */}
            <div className="mb-32 relative z-20">
                <div className="mb-12">
                    <div>
                        <Plankopf label={t("Höhen", "Heights", "Hauteurs")}>
                            {t(<>165, 200 und <span className="text-brand-orange">255 cm</span></>, <>165, 200 and <span className="text-brand-orange">255 cm</span></>, <>165, 200 et <span className="text-brand-orange">255 cm</span></>)}
                        </Plankopf>
                    </div>
                </div>

                <p className="text-lg text-brand-dark/75 leading-relaxed mb-8 max-w-4xl">
                    {t("Die Pipes 165, 200 und 255 sind gleich aufgebaut. Alle Höhen können untereinander kombiniert werden, beispielsweise als Pipe-zu-Pipe-Transfer mit Zwischen-Spine. Die Nutzfläche zwischen den Pipes ist aus massivem Beton, weil dort die stärkste Belastung auftritt.", "Pipes 165, 200 and 255 are built the same way. All heights can be combined with each other, for example as a pipe-to-pipe transfer with a spine in between. The riding area between the pipes is solid concrete, because that is where the heaviest load occurs.", "Les pipes 165, 200 et 255 sont construites de la même façon. Toutes les hauteurs peuvent être combinées entre elles, par exemple en transfert de pipe à pipe avec une spine intermédiaire. La surface de roulement entre les pipes est en béton plein, car c'est là que la sollicitation est la plus forte.")}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="bg-brand-surface/60 border border-brand-orange/40 rounded-xl p-5 text-center">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">165 cm</div>
                        <div className="text-xs font-mono text-brand-dark/75 uppercase tracking-widest mt-1">{t("Pipe 165", "Pipe 165", "Pipe 165")}</div>
                    </div>
                    <div className="bg-white rounded-xl p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">200 cm</div>
                        <div className="text-xs font-mono text-brand-dark/75 uppercase tracking-widest mt-1">{t("Pipe 200", "Pipe 200", "Pipe 200")}</div>
                    </div>
                    <div className="bg-white rounded-xl p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">255 cm</div>
                        <div className="text-xs font-mono text-brand-dark/75 uppercase tracking-widest mt-1">{t("Pipe 255", "Pipe 255", "Pipe 255")}</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">{t("Standard-Aufstellung", "Standard layout", "Disposition standard")}</h3>
                        <p className="text-brand-dark/75 leading-relaxed">
                            {t(<>Die Pipe steht frei, mit Flat auf beiden Seiten, Plattform und Copingrohr. Komplett aufgebaut ist eine Pipe je nach Höhe 862 bis 1.143 cm lang. Freistehende Skate-Pipes müssen eine <strong className="text-brand-dark">Absturzsicherung (Geländer)</strong> und auf beiden Seiten einen Sicherheitsbereich von mindestens 2 m haben.</>, <>The pipe is free-standing, with a flat on both sides, a platform and a coping tube. Fully assembled, a pipe is 862 to 1,143 cm long, depending on its height. Free-standing skate pipes must have <strong className="text-brand-dark">fall protection (a railing)</strong> and a safety zone of at least 2 m on both sides.</>, <>La pipe est posée librement, avec un plat de chaque côté, une plateforme et un tube de coping. Entièrement montée, une pipe mesure de 862 à 1 143 cm de long selon sa hauteur. Les pipes de skate autoportantes doivent être équipées d'une <strong className="text-brand-dark">protection antichute (garde-corps)</strong> et d'une zone de sécurité d'au moins 2 m de chaque côté.</>)}
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">{t("Kombi-Pipe", "Combi pipe", "Pipe combi")}</h3>
                        <p className="text-brand-dark/75 leading-relaxed">
                            {t("Kombi-Pipes werden mit weiteren Elementen ergänzt. Sie können unterschiedliche Höhen haben, mit zusätzlichen An- und Abfahrtsteilen (Banks oder Quarter-Ramps) ausgestattet sein oder andere Elemente auf dem Flat haben (Spine, Wave oder Bank to Bank). Je nach Höhe gilt für die Zusatzteile eine Mindestbreite.", "Combi pipes are extended with further elements. They can have different heights, be fitted with additional approach and exit sections (banks or quarter ramps), or have other elements on the flat (spine, wave or bank to bank). Depending on the height, the additional parts have a minimum width.", "Les pipes combi sont complétées par d'autres éléments. Elles peuvent avoir des hauteurs différentes, être équipées de parties d'accès et de sortie supplémentaires (banks ou quarters) ou comporter d'autres éléments sur le plat (spine, wave ou bank to bank). Selon la hauteur, les éléments supplémentaires doivent respecter une largeur minimale.")}
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. CONSTRUCTION */}
            <div className="mb-32 relative z-20">
                <div className="mb-12">
                    <div>
                        <Plankopf label={t("Halfpipe und Mini-Pipe", "Halfpipe and mini ramp", "Halfpipe et mini-rampe")}>
                            {t(<>So ist eine Pipe <span className="text-brand-orange">gebaut</span></>, <>How a pipe is <span className="text-brand-orange">built</span></>, <>Comment une pipe est <span className="text-brand-orange">construite</span></>)}
                        </Plankopf>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-4">{t("Halfpipe vs. Mini-Pipe", "Halfpipe vs. mini ramp", "Halfpipe ou mini-rampe")}</h3>
                        <p className="text-brand-dark/75 leading-relaxed mb-4">
                            {t("Die Halfpipe besteht aus einer halben Röhre mit Radius über 3 m, unten in zwei Transitions geteilt und durch ein Flat verbunden. Die Transition wird oben um einen 30–70 cm hohen senkrechten Teil (Vert) verlängert; an der Oberkante sitzt das Copingrohr. Komplette Halfpipes haben Höhen von 3,5 bis 5 m.", "A halfpipe is a half tube with a radius of more than 3 m, split at the bottom into two transitions joined by a flat. At the top, each transition continues into a vertical section (vert) 30–70 cm high, with the coping tube along the top edge. Full-size halfpipes are 3.5 to 5 m high.", "Une halfpipe est un demi-tube d'un rayon supérieur à 3 m, divisé en bas en deux transitions reliées par un plat. En haut, chaque transition se prolonge par une partie verticale (vert) de 30 à 70 cm de haut, avec le tube de coping sur le bord supérieur. Les halfpipes complètes font de 3,5 à 5 m de haut.")}
                        </p>
                        <p className="text-brand-dark/75 leading-relaxed">
                            {t("Unsere Mini-Pipes sind vereinfachte Halfpipes mit kleineren Radien, niedrigerer Plattform und ohne Vert. Sie sind dadurch leichter zu fahren, für Einsteiger wie für Fortgeschrittene, und lassen sich als Fertigteil liefern.", "Our pipes are mini ramps: simplified halfpipes with smaller radii, a lower platform and no vert. That makes them easier to ride, for beginners and advanced riders alike, and they can be supplied as precast units.", "Nos pipes sont des mini-rampes : des halfpipes simplifiées, avec des rayons plus petits, une plateforme plus basse et sans vert. Elles sont donc plus faciles à rouler, aussi bien pour les débutants que pour les riders confirmés, et peuvent être livrées en éléments préfabriqués.")}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-4">{t("Montage", "Installation", "Montage")}</h3>
                        <p className="text-brand-dark/75 leading-relaxed mb-4">
                            {t("Die Pipes werden als vorgefertigte Betonmodule geliefert. Jede Pipe gibt es in zwei Ausführungen: mit Geländer zum freien Aufstellen oder in eine Böschung gebaut. Der Radius beträgt 240 cm bei der Pipe 165 und 280 cm bei den Pipes 200 und 255.", "The pipes are supplied as prefabricated concrete modules. Each pipe comes in two versions: with a railing for free-standing installation, or built into an embankment. The radius is 240 cm for pipe 165 and 280 cm for pipes 200 and 255.", "Les pipes sont livrées en modules préfabriqués en béton. Chaque pipe existe en deux versions : avec garde-corps pour une installation autoportante, ou intégrée dans un talus. Le rayon est de 240 cm pour la pipe 165 et de 280 cm pour les pipes 200 et 255.")}
                        </p>
                        <p className="text-brand-dark/75 leading-relaxed">
                            {t("Alle Module sind nach DIN EN 14974 geprüft, vom TÜV zertifiziert und tragen das GS-Zeichen. Das Copingrohr ist verzinkt, alle Fahrkanten haben einen Kantenschutz aus Hartgummi.", "All modules are tested to EN 14974, certified by TÜV and carry the GS mark. The coping tube is galvanised, and every riding edge has an edge protection profile made of hard rubber.", "Tous les modules sont testés selon la norme EN 14974, certifiés TÜV et portent la marque GS. Le tube de coping est galvanisé, et toutes les arêtes de roulement sont équipées d'une protection en caoutchouc dur.")}
                        </p>
                    </div>
                </div>
            </div>

            {/* 5. TECH SPECS */}
            <div className="mb-32 relative z-20">
                {/* Datenblatt im weißen Kasten wie bei der Umkleidekabine */}
                <div className="bg-white rounded-2xl p-8 md:p-14 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <Plankopf rechts={t("DATENBLATT: PIPES", "DATA SHEET: PIPES", "FICHE TECHNIQUE : PIPES")} className="mb-8">
                    {t(<>Technische <span className="text-brand-orange">Daten</span></>, <>Technical <span className="text-brand-orange">data</span></>, <>Données <span className="text-brand-orange">techniques</span></>)}
                </Plankopf>

                <dl className={DATENBLATT}>
                    <TechSpecCard
                        title={t("Zertifizierung", "Certification", "Certification")}
                        value={t("DIN EN 14974 / TÜV / GS", "EN 14974 / TÜV / GS", "EN 14974 / TÜV / GS")}
                        icon="verified"
                        href="https://www.tuvsud.com/de-de/dienstleistungen/produktpruefung-und-produktzertifizierung/zertifikatsdatenbank/?q=Z1A+056616+0012+Rev.+00"
                        linkLabel={t("Zertifikat TÜV SÜD", "TÜV SÜD certificate", "Certificat TÜV SÜD")}
                    />
                    <TechSpecCard title={t("Pipe-Höhen", "Pipe heights", "Hauteurs de pipe")} value="165 / 200 / 255 cm" icon="straighten" />
                    <TechSpecCard title={t("Flat-Höhe", "Flat height", "Hauteur du plat")} value="15 cm" icon="square_foot" />
                    <TechSpecCard title={t("Mindestbreite Pipe 165", "Minimum width, pipe 165", "Largeur minimale, pipe 165")} value={t("375 cm (+187,5 cm)", "375 cm (+187.5 cm)", "375 cm (+187,5 cm)")} icon="width" />
                    <TechSpecCard title={t("Mindestbreite Pipe 200/255", "Minimum width, pipe 200/255", "Largeur minimale, pipe 200/255")} value="500 cm (+250 cm)" icon="width" />
                    <TechSpecCard title={t("Material", "Material", "Matériau")} value={t("Bewehrter Beton C35/45", "Reinforced concrete C35/45", "Béton armé C35/45")} icon="architecture" />
                    <TechSpecCard title={t("Copingrohr", "Coping tube", "Tube de coping")} value={t("Verzinkt · fortlaufend", "Galvanised · continuous", "Galvanisé · continu")} icon="commit" />
                    <TechSpecCard title={t("Aufstellung", "Installation", "Installation")} value={t("Fundamentfrei", "Foundation-free", "Sans fondation")} icon="layers" />
                    <TechSpecCard title={t("Sicherheitszone", "Safety zone", "Zone de sécurité")} value={t("2 m beidseitig", "2 m on both sides", "2 m de chaque côté")} icon="safety_check" />
                    <TechSpecCard title={t("Absturzsicherung", "Fall protection", "Protection antichute")} value={t("freistehend: Geländer", "free-standing: railing", "posée librement : garde-corps")} icon="shield" />
                    <TechSpecCard title={t("Kombi-Elemente", "Combi elements", "Éléments combi")} value="Banks · Spines · Waves" icon="extension" />
                    <TechSpecCard title={t("Montage", "Installation", "Montage")} value={t("Durch A+ Urban Design", "By A+ Urban Design", "Par A+ Urban Design")} icon="build" />
                </dl>
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/skate-pipes-beton" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductSkatePipesPage;
