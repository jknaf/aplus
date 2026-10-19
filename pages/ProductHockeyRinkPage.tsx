import React from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useProducts } from '../localized';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';
import Bild from '../components/Bild';
import { ProduktHero, TechSpecCard, DATENBLATT, SCHILD, SCHILD_ICON } from '../components/ProduktBausteine';
import Plankopf from '../components/Plankopf';

const OtherProducts: React.FC = () => {
  const t = useT();
  const PRODUCTS = useProducts();
  const otherProducts = PRODUCTS.filter(p => p.id !== 'hockey' && p.id !== 'pumptrack').slice(0, 3);
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

const ProductHockeyRinkPage: React.FC = () => {
  const t = useT();
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t("Hockey-Banden aus Beton", "Concrete Rink Boards", "Bandes de hockey en béton"),
    "description": t("Modulare Hockey-Banden aus Beton, Edelstahl, HPL-Platten und Gummi. Fundamentfrei, in 40 cm oder 110 cm Höhe. Ganzjährig einsetzbar für Inline-, Roll- und Eishockey.", "Modular hockey boards made of concrete, stainless steel, HPL panels and rubber. Foundation-free, in 40 cm or 110 cm heights. Usable all year round for inline, roller and ice hockey.", "Bandes de hockey modulaires en béton, inox, panneaux HPL et caoutchouc. Sans fondation, en hauteur de 40 cm ou de 110 cm. Utilisables toute l'année pour le hockey in-line, le roller hockey et le hockey sur glace."),
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": t("Sportanlagen", "Sports facilities", "Équipements sportifs"),
    "material": t("Beton, Edelstahl, HPL-Platten, Gummi", "Concrete, stainless steel, HPL panels, rubber", "Béton, inox, panneaux HPL, caoutchouc"),
    "image": "https://www.aplusurbandesign.com/images/hockey/roll-hockey-bande.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/hockey-banden",
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
    <PageShell title={t("Hockey-Banden für Inline-, Roll- und Eishockey", "Rink Boards for Inline, Roller and Ice Hockey", "Bandes de hockey pour le hockey in-line, le roller hockey et le hockey sur glace")} description={t("Hockey-Banden und Hockeyfeld aus Beton und Stahl: fundamentfrei, in 40 cm oder 110 cm Höhe. Für Inline-Hockey, Streethockey und Rollhockey. Wartungsarm und schnell aufgebaut, für Kommunen und Vereine.", "Hockey boards and hockey courts in concrete and steel: foundation-free, in 40 cm or 110 cm heights. For inline hockey, street hockey and roller hockey. Low-maintenance and quick to install, for municipalities and clubs.", "Bandes de hockey et terrains de hockey en béton et en acier : sans fondation, en hauteur de 40 cm ou de 110 cm. Pour le hockey in-line, le street hockey et le roller hockey. Entretien réduit et montage rapide, pour les communes et les clubs.")} schema={productSchema}>

       {/* 1. HERO mit Kennzahlen (Werte aus den technischen Daten) */}
       <ProduktHero
            bild={<Bild hoch src="/images/hockey/roll-hockey-bande.jpg"
                        alt={t("Rollhockey-Feld mit Beton-Bande", "Roller hockey court with concrete boards", "Terrain de roller hockey avec bandes en béton")}
                        className="absolute inset-0 w-full h-full object-cover animate-kenburns-1"
                        loading="eager"
                        fetchPriority="high" />}
            schilder={<>
                <span className={SCHILD}>{t("Hockey-Banden", "Hockey boards", "Bandes de hockey")}</span>
                         <span className={SCHILD_ICON}>
                            <span className="material-symbols-outlined text-base">verified_user</span> {t("Inline- und Eishockey", "Inline and ice hockey", "Hockey in-line et sur glace")}
                         </span>
            </>}
            titel={t(<>Banden-<br/>
                        <span className="text-brand-orange">system</span></>, <>Board<br/> <span className="text-brand-orange">system</span></>, <>Système<br/> <span className="text-brand-orange">de bandes</span></>)}
            kennzahlen={[
                { wert: "40 / 110 cm", label: t("Höhen", "Heights", "Hauteurs") },
                { wert: t("Fundamentfrei", "Foundation-free", "Sans fondation"), label: t("Montage", "Installation", "Montage") },
                { wert: t("Ganzjährig", "All year round", "Toute l'année"), label: t("Einsatz", "Use", "Utilisation") },
                { wert: t("Inline-, Roll- und Eishockey", "Inline, roller and ice hockey", "Hockey in-line, roller hockey et hockey sur glace"), label: t("Einsatzzweck", "Purpose", "Usage") },
            ]}
       />

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            
            {/* 2. SPLIT LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32">
                        <Plankopf label={t("Ganzjährig", "All year round", "Toute l'année")} klein className="mb-8">
                            {t(<>Spielen, <span className="text-brand-orange">das ganze Jahr</span></>, <>Play <span className="text-brand-orange">all year round</span></>, <>Jouer <span className="text-brand-orange">toute l'année</span></>)}
                        </Plankopf>
                        <p className="text-xl text-brand-dark/75 leading-relaxed mb-8">
                            {t("Mit unserem Bandensystem wird ein Hartplatz zum Spielfeld für Inline- und Rollhockey. Mit einem Abdichtungsprofil unter der Einfassung lässt sich im Winter auch Eis anlegen.", "With our board system, a hard court becomes a playing field for inline and roller hockey. With a sealing profile under the perimeter, you can also make ice in winter.", "Avec notre système de bandes, un terrain en dur devient un terrain de hockey in-line et de roller hockey. Avec un profil d'étanchéité sous l'enceinte, on peut aussi y aménager une patinoire en hiver.")}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-4">
                            {t("Es gibt zwei Höhen: 40 cm hohe Einfassungselemente aus Beton mit Gummikappe und 110 cm hohe Profilbanden mit Edelstahl-Handlauf für Roll- und Eishockey. Beide Varianten können modular in 1,5-m-Schritten erweitert oder verkleinert werden.", "There are two heights: perimeter elements in concrete, 40 cm high with a rubber cap, and profiled boards, 110 cm high with a stainless steel handrail, for roller and ice hockey. Both versions can be extended or reduced in modular 1.5 m steps.", "Il existe deux hauteurs : des éléments d'enceinte en béton de 40 cm de haut avec capuchon en caoutchouc, et des bandes profilées de 110 cm de haut avec main courante en inox, pour le roller hockey et le hockey sur glace. Les deux variantes peuvent être agrandies ou réduites par modules de 1,5 m.")}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-12">
                            {t(<><strong className="text-brand-dark">Die Banden brauchen keine Bodenbefestigung.</strong> Sie werden ohne Fundament auf bestehende Hartplätze gestellt. Der Belag bleibt unbeschädigt. Die am stärksten beanspruchte Fläche besteht aus massivem Beton.</>, <><strong className="text-brand-dark">The boards need no ground fixings.</strong> They are placed on existing hard courts without a foundation. The surface stays undamaged. The area that takes the heaviest wear is solid concrete.</>, <><strong className="text-brand-dark">Les bandes n'ont besoin d'aucune fixation au sol.</strong> Elles se posent sans fondation sur des terrains en dur existants. Le revêtement reste intact. La zone la plus sollicitée est en béton plein.</>)}
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/kontakt?projectType=Sonstiges"
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                {t("Spielfeld anfragen", "Enquire about a court", "Demander un devis pour un terrain")} <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden group">
                         <img src="/images/hockey/inline-hockey-bande-02.jpg" alt={t("Inline-Hockey auf einem Feld mit niedriger Einfassung", "Inline hockey on a court with a low perimeter", "Hockey in-line sur un terrain à enceinte basse")} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 1: Inline-Hockey auf einem Feld mit niedriger Einfassung", "Fig. 1: Inline hockey on a court with a low perimeter", "Fig. 1 : hockey in-line sur un terrain à enceinte basse")}</div>
                    </div>
                    
                    <div className="bg-white p-8 my-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">{t("Materialien", "Materials", "Matériaux")}</h3>
                        <p className="text-brand-dark/75 mb-4 font-mono text-sm border-l-2 border-brand-orange pl-4">
                            {t("Alle Materialien sind witterungsbeständig: Beton, Edelstahl, HPL-Platten und Gummi.", "All materials are weather-resistant: concrete, stainless steel, HPL panels and rubber.", "Tous les matériaux résistent aux intempéries : béton, inox, panneaux HPL et caoutchouc.")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs uppercase tracking-widest text-brand-orange border border-brand-orange px-2 py-1">{t("Beton", "Concrete", "Béton")}</span>
                            <span className="text-xs uppercase tracking-widest text-brand-orange border border-brand-orange px-2 py-1">{t("Edelstahl", "Stainless steel", "Inox")}</span>
                            <span className="text-xs uppercase tracking-widest text-brand-orange border border-brand-orange px-2 py-1">{t("HPL", "HPL", "HPL")}</span>
                            <span className="text-xs uppercase tracking-widest text-brand-orange border border-brand-orange px-2 py-1">{t("Gummi", "Rubber", "Caoutchouc")}</span>
                        </div>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden group">
                         <Bild sizes="(min-width: 1024px) 60vw, 100vw" src="/images/hockey/inline-hockey-bande-03.jpg" alt={t("Spielfeld mit Bande und Edelstahl-Handlauf", "Court with board and stainless steel handrail", "Terrain avec bande et main courante en inox")} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 2: Spielfeld mit gelber Bande und Edelstahl-Handlauf", "Fig. 2: Court with yellow board and stainless steel handrail", "Fig. 2 : terrain avec bande jaune et main courante en inox")}</div>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden group">
                         <img src="/images/hockey/hockey-einfassung-01.jpg" alt={t("40 cm hohe Beton-Einfassung mit Gummikappe", "40 cm high concrete perimeter with rubber cap", "Enceinte en béton de 40 cm de haut avec capuchon en caoutchouc")} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 3: Niedrige Einfassung mit roter Gummikappe", "Fig. 3: Low perimeter with red rubber cap", "Fig. 3 : enceinte basse avec capuchon rouge en caoutchouc")}</div>
                    </div>
                </div>
            </div>

            {/* 2b. VARIANTEN */}
            <div className="mb-32">
                <div className="mb-8">
                    <Plankopf label={t("Varianten", "Versions", "Variantes")} klein>
                        {t(<>40 cm oder <span className="text-brand-orange">110 cm</span></>, <>40 cm or <span className="text-brand-orange">110 cm</span></>, <>40 cm ou <span className="text-brand-orange">110 cm</span></>)}
                    </Plankopf>
                    <p className="text-lg text-brand-dark/75 mt-4 max-w-3xl">
                        {t("Die 40-cm-Einfassung mit Gummikappen eignet sich als Spielfeldbegrenzung auf bestehenden Hartplätzen. Sie ist stapelbar und vandalismussicher. Die 110-cm-Bande mit Edelstahl-Handlauf umschließt das ganze Spielfeld und ist für regelmäßigen Spielbetrieb gebaut. Beide Varianten lassen sich kombinieren und auf Asphalt- oder Betonflächen fundamentfrei aufstellen.", "The 40 cm perimeter with rubber caps works as a court boundary on existing hard courts. It is stackable and vandal-resistant. The 110 cm board with a stainless steel handrail encloses the whole court and is built for regular play. Both versions can be combined and installed without foundations on asphalt or concrete surfaces.", "L'enceinte de 40 cm avec capuchons en caoutchouc convient pour délimiter le terrain sur des terrains en dur existants. Elle est empilable et résiste au vandalisme. La bande de 110 cm avec main courante en inox entoure tout le terrain et est conçue pour un usage régulier. Les deux variantes peuvent être combinées et posées sans fondation sur des surfaces en asphalte ou en béton.")}
                    </p>
                </div>
                {/* Roland §8.7: Klarstellung Profil-Bande vs. Einfassung als getrennte Systeme noch final abstimmen */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <div className="text-4xl font-extrabold font-mono text-brand-orange mb-3">40 cm</div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-3">{t("Einfassungselemente (niedrige Bande)", "Perimeter elements (low board)", "Éléments d'enceinte (bande basse)")}</h3>
                        <p className="text-sm text-brand-dark/75 mb-3">{t("Sie begrenzen das Spielfeld auf bestehenden Hartplätzen.", "They mark the edge of the court on existing hard courts.", "Ils délimitent le terrain sur des terrains en dur existants.")}</p>
                        <ul className="space-y-2 text-sm text-brand-dark/75">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>{t("Gummikappen als Aufprallschutz", "Rubber caps as impact protection", "Capuchons en caoutchouc comme protection contre les chocs")}</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>{t("Modular erweiterbar in 1,5-m-Schritten", "Modular, extendable in 1.5 m steps", "Modulaire, extensible par pas de 1,5 m")}</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>{t("Stapelbar für saisonale Nutzung", "Stackable for seasonal use", "Empilables pour un usage saisonnier")}</li>
                        </ul>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-orange/30 rounded-xl p-8">
                        <div className="text-4xl font-extrabold font-mono text-brand-orange mb-3">110 cm</div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-3">{t("Profil-Bande für Rollhockey oder Eishockey", "Profiled board for roller hockey or ice hockey", "Bande profilée pour le roller hockey ou le hockey sur glace")}</h3>
                        <ul className="space-y-2 text-sm text-brand-dark/75">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>{t("Mit integriertem Edelstahl-Handlauf", "With integrated stainless steel handrail", "Avec main courante en inox intégrée")}</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>{t("Optional mit Abdichtungsprofil für Eishockey", "Optional sealing profile for ice hockey", "Profil d'étanchéité en option pour le hockey sur glace")}</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>{t("Nachrüstbar auf bestehende 40-cm-Einfassung", "Can be retrofitted to an existing 40 cm perimeter", "Adaptable sur une enceinte de 40 cm existante")}</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>{t("Für intensive Beanspruchung", "For heavy use", "Pour un usage intensif")}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 3. TECH SPECS */}
            <div className="mb-32">
                {/* Datenblatt im weißen Kasten wie bei der Umkleidekabine */}
                <div className="bg-white rounded-2xl p-8 md:p-14 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl hyphens-auto font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-[1.02]">
                        {t(<>Technische <span className="text-brand-orange">Daten</span></>, <>Technical <span className="text-brand-orange">data</span></>, <>Données <span className="text-brand-orange">techniques</span></>)}
                    </h2>
                    <span className="font-mono text-brand-dark/75 text-xs hidden sm:block">{t("DATENBLATT: BANDENSYSTEME", "DATA SHEET: BOARD SYSTEMS", "FICHE TECHNIQUE : SYSTÈMES DE BANDES")}</span>
                </div>
                
                <dl className={DATENBLATT}>
                    <TechSpecCard title={t("Höhen", "Heights", "Hauteurs")} value="40 / 110 cm" icon="height" />
                    <TechSpecCard title={t("Raster", "Grid", "Trame")} value={t("1,50 Meter", "1.50 metres", "1,50 mètre")} icon="grid_view" />
                    <TechSpecCard title={t("Einsatz", "Use", "Utilisation")} value={t("Ganzjährig", "All year round", "Toute l'année")} icon="calendar_month" />
                    <TechSpecCard title={t("Montage", "Installation", "Montage")} value={t("Fundamentfrei", "Foundation-free", "Sans fondation")} icon="layers" />
                    <TechSpecCard title={t("Eignung", "Suitable for", "Convient pour")} value={t("Inline-, Roll- und Eishockey", "Inline, roller and ice hockey", "Hockey in-line, roller hockey et hockey sur glace")} icon="ice_skating" />
                    <TechSpecCard title={t("Material", "Material", "Matériau")} value={t("Beton, Edelstahl, HPL, Gummi", "Concrete, stainless steel, HPL, rubber", "Béton, inox, HPL, caoutchouc")} icon="science" />
                    <TechSpecCard title={t("Schutz", "Protection", "Protection")} value={t("Gummikappe an Einfassung", "Rubber cap on perimeter", "Capuchon en caoutchouc sur l'enceinte")} icon="shield" />
                    <TechSpecCard title={t("Prallfläche", "Impact area", "Zone d'impact")} value={t("Beton", "Concrete", "Béton")} icon="layers" />
                </dl>
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/hockey-banden" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductHockeyRinkPage;