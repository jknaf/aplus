import React from 'react';
import { Link, useT } from '../i18n';
import { useProducts } from '../localized';
import PageShell from '../components/PageShell';
import Bild from '../components/Bild';
import Plankopf from '../components/Plankopf';

const ProductOverviewPage: React.FC = () => {
  const t = useT();
  const PRODUCTS = useProducts();
  return (
    <PageShell
      title={t("Produkte", "Products", "Produits")}
      description={t("Alle Produkte von A+ Urban Design im Überblick: Skate-Anlagen, Pumptracks, Hockey-Banden, Umkleidekabinen, Grillplätze und Überdachungen aus Betonfertigteilen.", "All A+ Urban Design products at a glance: skateparks, pump tracks, hockey boards, changing cubicles, barbecue areas and shelters made of precast concrete.", "Tous les produits d'A+ Urban Design en un coup d'œil : skateparks, pumptracks, bandes de hockey, cabines de change, aires de barbecue et abris en éléments préfabriqués en béton.")}
    >
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <Plankopf label={t("Produktübersicht", "Product overview", "Aperçu des produits")} as="h1" text={<>{t("Unsere modularen Betonfertigteile für den öffentlichen Raum werden ohne Fundament aufgestellt und sind auf Jahrzehnte ausgelegt. Die Skate- und Pumptrack-Elemente sind TÜV-zertifiziert.", "Our modular precast concrete units for public spaces are installed without foundations and built to last for decades. The skate and pump track elements are TÜV-certified.", "Nos éléments préfabriqués modulaires en béton pour l'espace public se posent sans fondation et sont conçus pour durer des décennies. Les éléments de skate et de pumptrack sont certifiés TÜV.")}</>}>
              {t(<>Unsere <span className="text-brand-orange">Produkte</span></>, <>Our <span className="text-brand-orange">products</span></>, <>Nos <span className="text-brand-orange">produits</span></>)}
            </Plankopf>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {PRODUCTS.map((product) => (
              <Link
                key={product.id}
                to={product.path}
                className="group relative rounded-2xl overflow-hidden border border-brand-dark/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:border-brand-orange/40 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden">
                  <Bild hoch sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    src={product.imageUrl}
                    alt={product.altText}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-extrabold font-heading text-brand-dark uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                      {product.title}
                    </h2>
                    <span className="material-symbols-outlined text-brand-muted group-hover:text-brand-orange group-hover:translate-x-1 transition-all">
                      arrow_forward
                    </span>
                  </div>

                  <p className="text-sm text-brand-muted leading-relaxed line-clamp-2">
                    {product.usp}
                  </p>

                  {product.tuvCertified && (
                    <img src="/images/details/tuev-gs.png" alt={t("GS-Zeichen von TÜV SÜD", "GS mark from TÜV SÜD", "Marque GS du TÜV SÜD")} width="317" height="320" loading="lazy" className="mt-4 h-12 w-auto" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default ProductOverviewPage;
