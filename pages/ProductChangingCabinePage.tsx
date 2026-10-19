import React from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useProducts } from '../localized';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';
import Bild from '../components/Bild';
import Plankopf from '../components/Plankopf';
import { BOX_B, BOX_B_TITEL, BOX_B_TEXT } from '../components/ProduktBausteine';

const OtherProducts: React.FC = () => {
  const t = useT();
  const PRODUCTS = useProducts();
  const otherProducts = PRODUCTS.filter(p => p.id !== 'umkleide' && p.id !== 'grillstelle').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24">
      <div className="text-center mb-16">
          <Plankopf label="Portfolio">
              {t(<>Weitere <span className="text-brand-orange">Lösungen</span></>, <>More <span className="text-brand-orange">solutions</span></>, <>D'autres <span className="text-brand-orange">solutions</span></>)}
          </Plankopf>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 backdrop-blur-sm">
            <Bild hoch sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
               <span className="text-brand-orange font-mono text-xs mb-2 hidden group-hover:block">{t('PRODUKT', 'PRODUCT', 'PRODUIT')} 0{PRODUCTS.indexOf(product) + 1}</span>
              <h3 className="text-2xl font-extrabold font-heading text-white uppercase tracking-normal [word-spacing:0.12em] transform group-hover:-translate-y-1 transition-transform duration-300">{product.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const ABB = 'absolute bottom-4 left-4 right-4 sm:right-auto bg-black/80 px-3 py-1 text-xs font-mono text-white';

const Kennzahl: React.FC<{ wert: string; label: string }> = ({ wert, label }) => (
    <div className="flex-1 basis-[45%] md:basis-0 pt-6 pr-6">
        <div className="font-heading font-extrabold text-2xl md:text-3xl leading-tight text-white">{wert}</div>
        <div className="mt-2 font-mono text-xs uppercase tracking-widest text-white/75">{label}</div>
    </div>
);

const Datenzeile: React.FC<{ title: string; value: string }> = ({ title, value }) => (
    <div className="flex justify-between gap-4 py-4 border-b border-brand-dark/10">
        <dt className="font-mono text-xs uppercase tracking-widest text-brand-dark/60 pt-0.5">{title}</dt>
        <dd className="font-semibold text-right">{value}</dd>
    </div>
);

const ProductChangingCabinePage: React.FC = () => {
  const t = useT();
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t("Umkleidekabine „Schnecke“", "Changing cubicle \"Schnecke\"", "Cabine de change « Schnecke »"),
    "description": t("Vandalismussichere Umkleidekabine aus Beton und Edelstahl. Zweiteilig, ohne Tür, fundamentfrei. Für Freibäder und Sportanlagen.", "Vandal-resistant changing cubicle in concrete and stainless steel. Two parts, no door, no foundation needed. For outdoor pools and sports grounds.", "Cabine de change résistante au vandalisme, en béton et inox. En deux éléments, sans porte, sans fondation. Pour les piscines de plein air et les équipements sportifs."),
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": t("Stadtmöblierung", "Street furniture", "Mobilier urbain"),
    "material": t("Beton, Edelstahl", "Concrete, stainless steel", "Béton, inox"),
    "image": "https://www.aplusurbandesign.com/images/umkleide/umkleidekabine-schnecke-04.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/umkleidekabine-beton",
      "availability": "https://schema.org/InStock",
      "businessFunction": "https://schema.org/Sell",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "EUR",
        "valueAddedTaxIncluded": false
      }
    }
  };

  return (
    <PageShell title={t("Umkleidekabine aus Beton für Freibad und Sportplatz", "Concrete Changing Cubicle for Outdoor Pools and Sports Grounds", "Cabine de change en béton pour piscine de plein air et terrain de sport")} description={t("Vandalismussichere Outdoor-Umkleidekabine aus Beton: türlos, zweiteilig und fundamentfrei. Für Freibäder, Badeseen, Sportplätze und Parks. Ohne Tür, leicht zu reinigen und wartungsarm.", "Vandal-resistant outdoor changing cubicle in concrete: doorless, two-part and foundation-free. For outdoor pools, swimming lakes, sports grounds and parks. No door, easy to clean and low-maintenance.", "Cabine de change d'extérieur en béton, résistante au vandalisme : sans porte, en deux éléments et sans fondation. Pour les piscines de plein air, les lacs de baignade, les terrains de sport et les parcs. Sans porte, facile à nettoyer et à entretien réduit.")} schema={productSchema}>

      {/* 1. HERO mit Kennzahlen (Werte aus den technischen Daten) */}
      <div className="relative w-full min-h-[620px] -mt-16 mb-28 flex flex-col justify-end overflow-hidden bg-brand-dark">
        <Bild hoch src="/images/umkleide/umkleidekabine-schnecke-04.jpg"
            alt={t("Umkleidekabine Schnecke aus Beton im Freien", "Schnecke concrete changing cubicle outdoors", "Cabine de change « Schnecke » en béton, en extérieur")}
            className="absolute inset-0 w-full h-full object-cover animate-kenburns-3"
            loading="eager"
            fetchPriority="high" />
        <div className="absolute inset-0 hero-scrim-unten"></div>
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-10 hero-text">
            <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in-up">
                <span className="px-3 py-1 border border-[#B9D39A]/60 text-[#B9D39A] text-xs font-bold uppercase tracking-[0.2em] rounded-md">{t("Freibad und Sport", "Outdoor pool and sport", "Piscine de plein air et sport")}</span>
                <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider border border-white/35 px-3 py-1 rounded-md">
                    <span className="material-symbols-outlined text-base">privacy_tip</span> {t("Sichtschutz", "Privacy screen", "Protection visuelle")}
                </span>
            </div>
            <h1 className="text-[52px] sm:text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-normal [word-spacing:0.12em] text-white leading-none mb-12 animate-fade-in-up [animation-delay:100ms]">
                {t(<>Die<br/>
                <span className="text-brand-orange">Schnecke</span></>, <>The<br/> <span className="text-brand-orange">Schnecke</span></>, <>La<br/> <span className="text-brand-orange">Schnecke</span></>)}
            </h1>
            <div className="flex flex-wrap border-t border-white/25">
                <Kennzahl wert={t("Ohne bewegliche Teile", "No moving parts", "Sans pièce mobile")} label={t("Prinzip", "Principle", "Le principe")} />
                <Kennzahl wert={t("Fundamentfrei", "Foundation-free", "Sans fondation")} label={t("Montage", "Installation", "Montage")} />
                <Kennzahl wert={t("Oben + unten offen", "Open at top + bottom", "Ouverte en haut et en bas")} label={t("Missbrauchsschutz", "Misuse protection", "Protection contre les dégradations")} />
                <Kennzahl wert={t("Kein Abbau nötig", "No dismantling needed", "Aucun démontage nécessaire")} label={t("Winterbetrieb", "Winter", "Hiver")} />
            </div>
        </div>
      </div>

      {/* 2. PRINZIP: zwei Fotos links, bündig mit dem Text */}
      <div className="container mx-auto px-4 mb-28">
          <div className="flex flex-col lg:flex-row gap-14 items-stretch">
              <div className="lg:w-5/12 flex flex-col gap-4">
                  <div className="relative flex-1 min-h-[260px] rounded-xl overflow-hidden group">
                      <Bild sizes="(min-width: 1024px) 40vw, 100vw" src="/images/umkleide/umkleide-kabine-01.jpg" alt={t("Umkleidekabine auf Edelstahlfüßen, Eingang ohne Tür", "Changing cubicle on stainless steel feet, doorless entrance", "Cabine de change sur pieds en inox, entrée sans porte")} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className={ABB}>{t("Abb. 1: Kabine auf Edelstahlfüßen, Eingang ohne Tür", "Fig. 1: Cubicle on stainless steel feet, doorless entrance", "Fig. 1 : cabine sur pieds en inox, entrée sans porte")}</div>
                  </div>
                  <div className="relative flex-1 min-h-[260px] rounded-xl overflow-hidden group">
                      <img src="/images/umkleide/umkleide-kabine-02.jpg" alt={t("Schnecke neben einem Spielplatz", "Schnecke next to a playground", "Schnecke à côté d'une aire de jeux")} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className={ABB}>{t("Abb. 2: Aufstellung neben einem Spielplatz", "Fig. 2: Installed next to a playground", "Fig. 2 : installation à côté d'une aire de jeux")}</div>
                  </div>
              </div>
              <div className="lg:w-7/12">
                  <Plankopf label={t("Prinzip", "Principle", "Le principe")} className="mb-8">
                      {t(<>Privatsphäre <span className="text-brand-orange">ohne Türen</span></>, <>Privacy <span className="text-brand-orange">without doors</span></>, <>Intimité <span className="text-brand-orange">sans porte</span></>)}
                  </Plankopf>
                  <p className="text-xl text-brand-dark/75 leading-relaxed mb-5">
                      {t("In Freibädern und an Badeseen sind Türen oft das erste Opfer von Vandalismus. Unsere Lösung ist die Schnecke. Beim Betreten und Verlassen berührt man nichts. Oben und unten bleibt die Kabine offen und sie ist nicht abschließbar. Beides erschwert Missbrauch. Die fugenlose Oberfläche ist leicht zu reinigen.", "At outdoor pools and swimming lakes, doors are often the first victims of vandalism. Our answer is the Schnecke (German for “snail”). You touch nothing when you enter or leave. The cubicle stays open at the top and bottom and cannot be locked. Both make misuse harder. The seamless surface is easy to clean.", "Dans les piscines de plein air et sur les lacs de baignade, les portes sont souvent les premières victimes du vandalisme. Notre solution est la Schnecke (« escargot » en allemand). On ne touche rien pour entrer ou sortir. La cabine reste ouverte en haut et en bas et ne peut pas être verrouillée. Les deux rendent les dégradations plus difficiles. La surface sans joint est facile à nettoyer.")}
                  </p>
                  <p className="text-lg text-brand-dark/75 leading-relaxed mb-8">
                      {t("Die Kabine ist schnell aufgestellt und lässt sich später versetzen. Die Bodenplatte ist fugenlos und liegt direkt auf einem verdichteten Schotterbett. Die Kabine besteht aus bewehrtem Beton und steht auf drei Edelstahlfüßen. Sie ist witterungsbeständig und vandalismussicher.", "The cubicle is quick to set up and can be moved later. The base slab is seamless and lies directly on a compacted gravel bed. The cubicle is made of reinforced concrete and stands on three stainless steel feet. It is weather-resistant and vandal-resistant.", "La cabine se met en place rapidement et peut être déplacée par la suite. La dalle de sol est sans joint et repose directement sur un lit de gravier compacté. La cabine est en béton armé et repose sur trois pieds en inox. Elle résiste aux intempéries et au vandalisme.")}
                  </p>
                  <div className={`${BOX_B} mb-8`}>
                      <h3 className={BOX_B_TITEL}>{t("Wartungsarm", "Low-maintenance", "Entretien réduit")}</h3>
                      <p className={BOX_B_TEXT}>{t("Es gibt keine Scharniere, keine Schlösser und kein Holz. Die Kabine bleibt im Winter stehen und verrottet nicht.", "There are no hinges, no locks and no timber. The cubicle can stay in place over winter and does not rot.", "Il n'y a ni charnières, ni serrures, ni bois. La cabine reste en place l'hiver et ne pourrit pas.")}</p>
                  </div>
                  <Link
                      to="/kontakt?projectType=Möblierung"
                      className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                  >
                      {t("Angebot anfordern", "Request a quote", "Demander un devis")} <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
              </div>
          </div>
      </div>

      {/* 3. FORM STATT MECHANIK: dunkle Box wie Qualitätsnachweis auf Über uns */}
      <div className="container mx-auto px-4 mb-28">
          <div className="flex flex-wrap bg-brand-dark text-white rounded-2xl overflow-hidden">
              <div className="basis-full lg:basis-2/3 p-8 md:p-14">
                  <Plankopf label={t("Schnecken-Prinzip", "The Schnecke principle", "Le principe de la Schnecke")} klein dunkel className="mb-6">
                      {t(<>Form statt <span className="text-brand-orange">Mechanik</span></>, <>Form instead of <span className="text-brand-orange">mechanics</span></>, <>La forme plutôt que la <span className="text-brand-orange">mécanique</span></>)}
                  </Plankopf>
                  <div className="space-y-5 text-lg leading-relaxed text-white/90">
                      <p className="text-xl">
                          {t("Herkömmliche Umkleidekabinen halten im öffentlichen Raum oft nicht lange: Verriegelungen brechen, Scharniere korrodieren, Holz verrottet. Die Schnecke hat nichts davon. Sie schützt durch ihre Form statt durch Mechanik und besteht aus Beton und Edelstahl. Die spiralförmige Wand führt in einen geschützten Innenraum, ganz ohne bewegliche Teile. Unten bleibt ein Abstand von 30 cm zur Bodenplatte, oben ist die Kabine offen. Das sorgt für Luft.", "Conventional changing cubicles often do not last long in public spaces: latches break, hinges corrode, timber rots. The Schnecke has none of that. It gives privacy through its shape rather than through mechanisms and is made of concrete and stainless steel. The spiral wall leads into a sheltered interior with no moving parts at all. There is a 30 cm gap between the wall and the base slab at the bottom, and the cubicle is open at the top. That keeps the air moving.", "Les cabines de change classiques tiennent souvent peu de temps dans l'espace public : les verrous cassent, les charnières se corrodent, le bois pourrit. La Schnecke n'a rien de tout cela. Elle protège par sa forme plutôt que par la mécanique et se compose de béton et d'inox. La paroi en spirale mène à un intérieur protégé, sans aucune pièce mobile. En bas, un espace de 30 cm sépare la paroi de la dalle de sol, et en haut la cabine est ouverte. L'air circule ainsi.")}
                      </p>
                      <p>
                          {t("Eine Kabine bietet Platz für eine Person mit Kleidung und Tasche. Die Spiralform schützt vor Blicken. Von außen sieht man aber, ob die Kabine belegt ist. Die beiden Teile wiegen rund 1,0 t und 2,3 t und sind nicht miteinander verschraubt. Bei Bedarf wird sie mit Autokran, Radlader oder Gabelstapler an einen anderen Ort versetzt.", "One cubicle has room for one person with their clothes and bag. The spiral shape blocks views in, yet from outside you can see whether the cubicle is occupied. The two parts weigh about 1.0 t and 2.3 t and are not bolted together. If needed, it is moved to another site with a mobile crane, wheel loader or forklift.", "Une cabine offre de la place pour une personne avec ses vêtements et son sac. La forme en spirale protège des regards, mais on voit de l'extérieur si la cabine est occupée. Les deux éléments pèsent environ 1,0 t et 2,3 t et ne sont pas vissés l'un à l'autre. Au besoin, la cabine est déplacée ailleurs avec une grue mobile, une chargeuse sur pneus ou un chariot élévateur.")}
                      </p>
                  </div>
              </div>
              <div className="basis-full lg:basis-1/3 p-8 md:p-10 bg-[#35413A] flex flex-col justify-center gap-8">
                  <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-white/70">{t("Aufbau", "Construction", "Construction")}</div>
                      <div className="mt-2 font-heading font-extrabold text-2xl md:text-3xl leading-tight">{t("2 Teile, ohne Schrauben", "2 parts, no bolts", "2 éléments, sans vis")}</div>
                  </div>
                  <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-white/70">{t("Material", "Material", "Matériau")}</div>
                      <div className="mt-2 font-heading font-extrabold text-2xl md:text-3xl leading-tight">{t("Beton + Edelstahl", "Concrete + stainless steel", "Béton + inox")}</div>
                  </div>
              </div>
          </div>
      </div>

      {/* 4. EINSATZ: Text neben Abb. 3 */}
      <div className="container mx-auto px-4 mb-28">
          <div className="flex flex-col lg:flex-row gap-14 items-center">
              <div className="lg:w-7/12">
                  <Plankopf label={t("Einsatz", "Use", "Utilisation")} className="mb-6">
                      {t(<>Umkleide <span className="text-brand-orange">oder Dusche</span></>, <>Changing room <span className="text-brand-orange">or shower</span></>, <>Cabine de change <span className="text-brand-orange">ou douche</span></>)}
                  </Plankopf>
                  <p className="text-xl text-brand-dark/75 leading-relaxed">
                      {t("Die Schnecke ist für Freibäder, Badeseen, Strandbäder, Campingplätze und Sportanlagen gedacht. Sie steht frei als Außenkabine und ist wahlweise auch als Duschkabine erhältlich. Die Duschkabine gibt es fertig mit Bodenablauf und Dusche: Die Bodenplatte wird über die Abwasserleitung gesetzt, dann wird nur noch die Wasserzuleitung angeschlossen. Alternativ gibt es die Kabine nur mit Aussparungen für Gully und Wasserleitung. Wind, Frost und UV-Strahlung schaden ihr nicht. Die Schnecke muss nicht ständig beaufsichtigt werden: Sie ist vandalismussicher und brennt nicht.", "The Schnecke is intended for outdoor pools, swimming lakes, lakeside lidos, campsites and sports grounds. It stands free as an outdoor cubicle and is also available as a shower cubicle if wanted. The shower cubicle comes ready-made with a floor drain and shower: the base slab is set over the waste-water pipe, and only the water supply then needs connecting. Alternatively, the cubicle is available with just recesses for a drain and water pipe. Wind, frost and UV radiation do not harm it. The Schnecke does not need constant supervision: it is vandal-resistant and does not burn.", "La Schnecke est destinée aux piscines de plein air, aux lacs de baignade, aux plages aménagées, aux campings et aux équipements sportifs. Elle se pose librement comme cabine d'extérieur et existe aussi, au choix, en cabine de douche. La cabine de douche est livrée prête à l'emploi, avec siphon de sol et douche : la dalle de sol est posée au-dessus de la conduite d'évacuation, il ne reste alors qu'à raccorder l'arrivée d'eau. La cabine existe aussi avec de simples réservations pour le siphon de sol et la conduite d'eau. Le vent, le gel et les UV ne l'abîment pas. La Schnecke n'a pas besoin d'être surveillée en permanence : elle résiste au vandalisme et ne brûle pas.")}
                  </p>
              </div>
              <div className="lg:w-5/12 w-full">
                  <div className="relative h-80 lg:h-[440px] rounded-xl overflow-hidden group">
                      <img src="/images/umkleide/umkleidekabine-freibad-03.jpg" alt={t("Schnecken-Kabine im Freibad", "Schnecke cubicle at an outdoor pool", "Cabine « Schnecke » dans une piscine de plein air")} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className={ABB}>{t("Abb. 3: Aufstellung im Freibad", "Fig. 3: Installed at an outdoor pool", "Fig. 3 : installation dans une piscine de plein air")}</div>
                  </div>
              </div>
          </div>
      </div>

      {/* 5. EINSATZBEREICH: Panorama */}
      <div className="container mx-auto px-4 mb-28">
          <Plankopf label={t("Einsatzbereich", "Where it is used", "Domaine d'utilisation")} className="mb-4">
              {t(<>Freibad und <span className="text-brand-orange">Badesee</span></>, <>Outdoor pool and <span className="text-brand-orange">swimming lake</span></>, <>Piscine de plein air et <span className="text-brand-orange">lac de baignade</span></>)}
          </Plankopf>
          <p className="text-xl text-brand-dark/75 leading-relaxed max-w-3xl mb-8">
              {t("Die Umkleidekabine steht frei im Freibad oder am Badesee. Vor Ort genügt ein verdichtetes, frostsicheres Kiesbett mit 5–20 mm Körnung. Die Bodenplatte kann bündig mit dem Boden oder etwas höher liegen.", "The changing cubicle stands free at an outdoor pool or swimming lake. On site, a compacted, frost-proof gravel bed with 5–20 mm grading is enough. The base slab can sit flush with the ground or slightly above it.", "La cabine de change se pose librement dans une piscine de plein air ou au bord d'un lac de baignade. Sur place, un lit de gravier compacté et résistant au gel, de granulométrie 5–20 mm, suffit. La dalle de sol peut être à fleur du sol ou légèrement au-dessus.")}
          </p>
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-xl overflow-hidden group">
              <Bild sizes="(min-width: 1280px) 1200px, 100vw" src="/images/umkleide/umkleide-panorama.jpg" alt={t("Mehrere Schnecken-Kabinen auf einer gepflasterten Fläche", "Several Schnecke cubicles on a paved area", "Plusieurs cabines « Schnecke » sur une surface pavée")} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={ABB}>{t("Abb. 4: Freistehend auf gepflasterter Fläche", "Fig. 4: Free-standing on a paved area", "Fig. 4 : autoportantes sur une surface pavée")}</div>
          </div>
      </div>

      {/* 6. TECHNISCHE DATEN als Datenblatt */}
      <div className="container mx-auto px-4 mb-28">
          <div className="bg-white rounded-2xl p-8 md:p-14 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <Plankopf rechts={t("DATENBLATT: UMKLEIDE", "DATA SHEET: CHANGING CUBICLE", "FICHE TECHNIQUE : CABINE DE CHANGE")} klein className="mb-8">
                      {t(<>Technische <span className="text-brand-orange">Daten</span></>, <>Technical <span className="text-brand-orange">data</span></>, <>Données <span className="text-brand-orange">techniques</span></>)}
                  </Plankopf>
              <dl className="grid grid-cols-1 md:grid-cols-2 md:gap-x-14 border-t-2 border-brand-dark">
                  <Datenzeile title={t("Aufbau", "Construction", "Construction")} value={t("2 Teile, ohne Schrauben", "2 parts, no bolts", "2 éléments, sans vis")} />
                  <Datenzeile title={t("Tür", "Door", "Porte")} value={t("Keine (Spirale)", "None (spiral)", "Aucune (spirale)")} />
                  <Datenzeile title={t("Boden", "Floor", "Sol")} value={t("Fugenlos integriert", "Seamless, integrated", "Intégré, sans joint")} />
                  <Datenzeile title={t("Material", "Material", "Matériau")} value={t("Beton + Edelstahl", "Concrete + stainless steel", "Béton + inox")} />
                  <Datenzeile title={t("Montage", "Installation", "Montage")} value={t("Fundamentfrei", "Foundation-free", "Sans fondation")} />
                  <Datenzeile title={t("Einsatz", "Use", "Utilisation")} value={t("Freibad, Badesee", "Outdoor pool, swimming lake", "Piscine de plein air, lac de baignade")} />
                  <Datenzeile title={t("Missbrauchsschutz", "Misuse protection", "Protection contre les dégradations")} value={t("Oben + unten offen", "Open at top + bottom", "Ouverte en haut et en bas")} />
                  <Datenzeile title={t("Winterbetrieb", "Winter", "Hiver")} value={t("Kein Abbau nötig", "No dismantling needed", "Aucun démontage nécessaire")} />
              </dl>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/umkleidekabine-beton" />
            <OtherProducts />
      </div>
    </PageShell>
  );
};

export default ProductChangingCabinePage;
