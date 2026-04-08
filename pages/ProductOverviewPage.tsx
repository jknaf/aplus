import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import PageShell from '../components/PageShell';

const ProductOverviewPage: React.FC = () => {
  return (
    <PageShell
      title="Produkte"
      description="Alle Produkte von A+ Urban Design im Überblick: Skateparks, Pumptracks, BMX-Anlagen, Hockey-Banden und mehr aus Betonfertigteilen."
    >
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
              Produktübersicht
            </span>
            <h1 className="text-4xl md:text-7xl font-black font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
              Unsere <span className="text-brand-orange">Produkte.</span>
            </h1>
            <p className="text-brand-muted mt-6 max-w-2xl mx-auto text-lg">
              Modulare Betonfertigteile für den öffentlichen Raum – TÜV-zertifiziert, fundamentfrei und gebaut für die Ewigkeit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {PRODUCTS.map((product) => (
              <Link
                key={product.id}
                to={product.path}
                className="group relative rounded-2xl overflow-hidden border border-brand-dark/10 bg-white/60 backdrop-blur-sm hover:border-brand-orange/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-orange/5 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.altText}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-black font-heading text-brand-dark uppercase tracking-tight group-hover:text-brand-orange transition-colors">
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
                    <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/5 border border-brand-orange/20 px-2 py-1 rounded">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      TÜV Zertifiziert
                    </div>
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
