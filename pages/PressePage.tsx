import React, { useMemo } from 'react';
import PageShell from '../components/PageShell';
import { PRESS_ARTICLES } from '../constants';
import { PressArticle, PressPublisher } from '../types';

const PUBLISHER_ORDER: PressPublisher[] = [
  'kommunaldirekt.de',
  'kommunalclick24.de',
  'treffpunkt-kommune.de',
  'freiraum-gestalten.info',
  'flaechenmanager.com',
];

const PUBLISHER_LABEL: Record<PressPublisher, string> = {
  'kommunaldirekt.de': 'Kommunaldirekt',
  'kommunalclick24.de': 'Kommunalclick24',
  'treffpunkt-kommune.de': 'Treffpunkt Kommune',
  'freiraum-gestalten.info': 'Freiraum Gestalten',
  'flaechenmanager.com': 'Flächenmanager',
};

const PressePage: React.FC = () => {
  const grouped = useMemo(() => {
    const map = new Map<PressPublisher, PressArticle[]>();
    PUBLISHER_ORDER.forEach((p) => map.set(p, []));
    PRESS_ARTICLES.forEach((article) => {
      const list = map.get(article.publisher);
      if (list) list.push(article);
    });
    return map;
  }, []);

  const collectionSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Referenzen & Presse – A+ Urban Design',
      description:
        'Fachpublikationen über Skateparks, Pumptracks, Umkleidekabinen und Beton-Fertigteile von A+ Urban Design in kommunalen Fachmedien.',
      url: 'https://www.aplusurbandesign.com/referenzen-presse',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: PRESS_ARTICLES.map((article, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: article.url,
          name: article.title,
        })),
      },
    }),
    [],
  );

  return (
    <PageShell
      title="Referenzen & Presse"
      description="Fachpublikationen über A+ Urban Design: Skateparks, Pumptracks, Umkleidekabinen und Beton-Fertigteile in kommunaldirekt.de, kommunalclick24.de, treffpunkt-kommune.de und freiraum-gestalten.info."
      schema={collectionSchema}
    >
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
              Referenzen & Presse
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
              A+ in der <span className="text-brand-orange">Fachpresse.</span>
            </h1>
            <p className="text-brand-muted mt-6 max-w-2xl mx-auto text-lg">
              Projekte und Produkte von A+ Urban Design erscheinen regelmäßig in Fachmedien für Kommunalplanung, Freiraumgestaltung und nachhaltigen Sport. Eine Auswahl der Beiträge.
            </p>
          </div>

          <div className="space-y-16">
            {PUBLISHER_ORDER.map((publisher) => {
              const articles = grouped.get(publisher) ?? [];
              if (articles.length === 0) return null;
              return (
                <div key={publisher}>
                  <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-brand-dark/10">
                    <h2 className="text-xl md:text-2xl font-extrabold font-heading text-brand-dark uppercase tracking-tight">
                      {PUBLISHER_LABEL[publisher]}
                    </h2>
                    <span className="text-xs font-mono text-brand-muted uppercase tracking-widest">
                      {publisher}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {articles.map((article) => (
                      <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener"
                        className="group relative rounded-2xl border border-brand-dark/10 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-brand-orange/40 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 p-6 flex flex-col"
                      >
                        <span className="inline-block text-[10px] font-mono text-brand-orange uppercase tracking-widest mb-3">
                          {publisher}
                        </span>

                        <h3 className="text-lg md:text-xl font-extrabold font-heading text-brand-dark leading-snug group-hover:text-brand-orange transition-colors mb-3">
                          {article.title}
                        </h3>

                        <p className="text-sm text-brand-muted leading-relaxed flex-grow">
                          {article.teaser}
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-dark group-hover:text-brand-orange transition-colors">
                          Zum Artikel
                          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                            arrow_outward
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-24 text-center border-t border-brand-dark/10 pt-12">
            <p className="text-sm text-brand-muted">
              Weitere Fachveröffentlichungen in Vorbereitung. Für Presseanfragen: {' '}
              <a href="mailto:post@aplusurbandesign.com" className="text-brand-orange font-bold hover:underline">
                post@aplusurbandesign.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default PressePage;
