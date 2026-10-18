import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRESS_ARTICLES } from '../constants';
import { PressArticle, PressPublisher } from '../types';

const PUBLISHER_LABEL: Record<PressPublisher, string> = {
  'kommunaldirekt.de': 'Kommunaldirekt',
  'kommunalclick24.de': 'Kommunalclick24',
  'treffpunkt-kommune.de': 'Treffpunkt Kommune',
  'freiraum-gestalten.info': 'Freiraum Gestalten',
  'flaechenmanager.com': 'Flächenmanager',
};

interface PressProject {
  title: string;
  summary: string;
  articleIds: string[];
  projectPath?: string;
}

// Beiträge, die über dasselbe Projekt berichten, stehen zusammen. Alles, was hier nicht
// zugeordnet ist, erscheint unten in der Liste „Fachbeiträge“.
const PRESS_PROJECTS: PressProject[] = [
  {
    title: 'Skatepark Friedrichsdorf',
    summary: '2.000 m² große Skateanlage auf zwei Ebenen mit Funboxen, Stairs, Ledges und einer Pipe aus Betonfertigteilen.',
    articleIds: [
      'kommunaldirekt-skatepark-friedrichsdorf-2024',
      'kommunaldirekt-skatepark-friedrichsdorf',
      'freiraum-gestalten-skatepark-friedrichsdorf',
    ],
    projectPath: '/projekte/skatepark-friedrichsdorf',
  },
  {
    title: 'Umkleide- und Duschkabine „Schnecke“',
    summary: 'Kabine aus zwei Betonfertigteilen auf Edelstahlfüßen, als Umkleide oder Dusche.',
    articleIds: [
      'flaechenmanager-beruehrungsfreie-umkleidekabine',
      'kommunaldirekt-umkleidekabine-freibaeder',
      'kommunalclick24-duschkabine-so-frei',
      'kommunalclick24-schneckenhaus-duschkabine',
    ],
    projectPath: '/projekte/schnecke-umkleidekabine',
  },
  {
    title: 'Pumptrack Berlin-Reinickendorf',
    summary: 'Erster Pumptrack im Bezirk, teilweise über dem Tegel-Tunnel.',
    articleIds: ['kommunaldirekt-pumptrack-berlin', 'freiraum-gestalten-pumptracken-berlin-2022'],
    projectPath: '/projekte/pumptrack-berlin-reinickendorf',
  },
  {
    title: 'Skatepark Alba Iulia',
    summary: 'Skatepark im Graben der Festung Alba Carolina in Rumänien.',
    articleIds: ['freiraum-gestalten-skaten-denkmalschutz'],
    projectPath: '/projekte/bastion-skatepark-alba-iulia',
  },
  {
    title: 'Skatebowl Bönnigheim',
    summary: 'Offener Bowl aus Betonfertigteilen. Die Rampen gehen ohne Übergangsblech in den Asphalt über.',
    articleIds: [
      'kommunaldirekt-offener-skatebowl-bonnigheim',
      'kommunalclick24-offene-skatebowl-betonfertigteile',
      'freiraum-gestalten-offene-skatebowl-betonfertigteile',
    ],
  },
  {
    title: 'Skateanlage Duisburg',
    summary: '38 Betonmodule auf einer Brücke über der Autobahn A 59.',
    articleIds: ['kommunaldirekt-skateanlage-duisburg-a59', 'freiraum-gestalten-skateanlage-a59'],
  },
  {
    title: 'Skateanlage Altdorf',
    summary: 'Bestehende Anlage saniert und um einen Serpent erweitert.',
    articleIds: ['kommunaldirekt-skateanlage-serpent'],
  },
  {
    title: 'Grillplatz aus Beton',
    summary: 'Fundamentfreier Grillplatz, 420 cm Durchmesser, mit Edelstahl-Rost.',
    articleIds: ['kommunaldirekt-grillplatz-oeffentlicher-raum'],
    projectPath: '/projekte/grillplatz-oeffentlicher-raum',
  },
];

const ARTICLE_BY_ID = new Map(PRESS_ARTICLES.map((a) => [a.id, a]));
const articlesOf = (project: PressProject) =>
  project.articleIds.map((id) => ARTICLE_BY_ID.get(id)).filter((a): a is PressArticle => Boolean(a));

const ArticleLinks: React.FC<{ articles: PressArticle[] }> = ({ articles }) => (
  <ul className="border-t border-brand-dark/10">
    {articles.map((article) => (
      <li key={article.id} className="border-b border-brand-dark/10">
        <a
          href={article.url}
          target="_blank"
          rel="noopener"
          title={article.title}
          className="group flex items-center justify-between gap-4 py-3 text-sm font-semibold text-brand-dark hover:text-brand-orange transition-colors"
        >
          <span>{PUBLISHER_LABEL[article.publisher]}</span>
          <span className="inline-flex items-center gap-1 text-brand-muted group-hover:text-brand-orange font-mono text-xs">
            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_outward</span>
          </span>
        </a>
      </li>
    ))}
  </ul>
);

const ProjectLink: React.FC<{ path?: string }> = ({ path }) =>
  path ? (
    <Link
      to={path}
      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-orange transition-colors"
    >
      Zum Projekt
      <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
    </Link>
  ) : null;

const PressePage: React.FC = () => {
  const { productArticles } = useMemo(() => {
    const assigned = new Set(PRESS_PROJECTS.flatMap((p) => p.articleIds));
    return {
      productArticles: PRESS_ARTICLES.filter((a) => !assigned.has(a.id)).sort(
        (a, b) => (b.year ?? 0) - (a.year ?? 0),
      ),
    };
  }, []);

  const collectionSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Referenzen & Presse | A+ Urban Design',
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-20 md:space-y-28">
          <header>
            <div>
              <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                Referenzen & Presse
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
                A+ in der <span className="text-brand-orange">Fachpresse</span>
              </h1>
              <p className="text-brand-muted mt-6 max-w-xl text-lg leading-relaxed">
                Kommunale Fachmedien berichten seit über zehn Jahren über Anlagen und Produkte von A+ Urban Design. Hier finden Sie die Projektberichte und Fachbeiträge.
              </p>
            </div>
          </header>

          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-brand-dark uppercase tracking-tight">
              Projektberichte
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PRESS_PROJECTS.map((project) => {
                const articles = articlesOf(project);
                return (
                  <article key={project.title} className="bg-white rounded-2xl border border-brand-dark/10 p-6 md:p-8 flex flex-col gap-3">
                    <h3 className="text-xl md:text-2xl font-extrabold font-heading text-brand-dark leading-snug">{project.title}</h3>
                    <p className="text-sm text-brand-muted leading-relaxed">{project.summary}</p>
                    <div className="mt-auto pt-3 space-y-4">
                      <ArticleLinks articles={articles} />
                      <ProjectLink path={project.projectPath} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-brand-dark uppercase tracking-tight">
              Fachbeiträge
            </h2>
            <ul className="border-t-2 border-brand-dark">
              {productArticles.map((article) => (
                <li key={article.id} className="border-b border-brand-dark/15">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener"
                    className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[4.5rem_1fr_auto] gap-x-6 gap-y-1 py-5 items-baseline"
                  >
                    <span className="font-mono text-sm text-brand-muted">{article.year ?? ''}</span>
                    <span className="font-heading font-bold text-lg text-brand-dark group-hover:text-brand-orange transition-colors leading-snug">
                      {article.title}
                    </span>
                    <span className="col-start-2 md:col-start-auto inline-flex items-center gap-1 text-sm text-brand-muted group-hover:text-brand-orange">
                      {PUBLISHER_LABEL[article.publisher]}
                      <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_outward</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 p-8 md:p-10 rounded-2xl bg-brand-dark text-brand-bg">
            <p className="font-heading font-extrabold text-xl md:text-2xl">Presseanfrage oder Bildmaterial?</p>
            <a
              href="mailto:post@aplusurbandesign.com"
              className="px-6 py-3 rounded-full border border-brand-bg/40 font-semibold hover:bg-brand-bg hover:text-brand-dark transition-colors"
            >
              post@aplusurbandesign.com
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default PressePage;
