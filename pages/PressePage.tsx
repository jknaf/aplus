import React, { useMemo } from 'react';
import { Link, prefixFor, useLang, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { PRESS_ARTICLES } from '../constants';
import { PressArticle, PressPublisher } from '../types';
import Plankopf, { Kopfleiste } from '../components/Plankopf';
import Bild from '../components/Bild';
import { BOX_B_TITEL } from '../components/ProduktBausteine';

const PUBLISHER_LABEL: Record<PressPublisher, string> = {
  'kommunaldirekt.de': 'Kommunaldirekt',
  'kommunalclick24.de': 'Kommunalclick24',
  'treffpunkt-kommune.de': 'Treffpunkt Kommune',
  'freiraum-gestalten.info': 'Freiraum Gestalten',
  'flaechenmanager.com': 'Flächenmanager',
};

interface PressProject {
  title: [string, string, string];
  summary: [string, string, string];
  articleIds: string[];
  projectPath?: string;
  // Foto derselben Anlage wie in den Artikeln (mit den Artikelfotos verglichen); ohne Foto: Kachel „Weitere Projektberichte“
  bild?: string;
}

// Beiträge, die über dasselbe Projekt berichten, stehen zusammen. Alles, was hier nicht
// zugeordnet ist, erscheint unten in der Liste „Fachbeiträge“.
const PRESS_PROJECTS: PressProject[] = [
  {
    title: ["Skatepark Friedrichsdorf", "Friedrichsdorf Skatepark", "Skatepark de Friedrichsdorf"],
    summary: ["2.000 m² große Skateanlage auf zwei Ebenen mit Funboxen, Stairs, Ledges und einer Pipe aus Betonfertigteilen.", "2,000 m² skatepark on two levels with fun boxes, stairs, ledges and a pipe made of precast concrete units.", "Skatepark de 2 000 m² sur deux niveaux, avec funboxes, escaliers, ledges et une pipe en éléments préfabriqués en béton."],
    articleIds: [
      'kommunaldirekt-skatepark-friedrichsdorf-2024',
      'kommunaldirekt-skatepark-friedrichsdorf',
      'freiraum-gestalten-skatepark-friedrichsdorf',
    ],
    projectPath: '/projekte/skatepark-friedrichsdorf',
    bild: '/images/homepage/hero-anlage-02.jpg',
  },
  {
    title: ["Umkleide- und Duschkabine „Schnecke“", "“Schnecke” changing and shower cubicle", "Cabine de change et de douche « Schnecke »"],
    summary: ["Kabine aus zwei Betonfertigteilen auf Edelstahlfüßen, als Umkleide oder Dusche.", "Cubicle made of two precast concrete units on stainless steel feet, as a changing room or shower.", "Cabine en deux éléments préfabriqués en béton sur pieds en inox, utilisable comme cabine de change ou de douche."],
    articleIds: [
      'flaechenmanager-beruehrungsfreie-umkleidekabine',
      'kommunaldirekt-umkleidekabine-freibaeder',
      'kommunalclick24-duschkabine-so-frei',
      'kommunalclick24-schneckenhaus-duschkabine',
    ],
    projectPath: '/projekte/schnecke-umkleidekabine',
    bild: '/images/umkleide/umkleidekabine-freibad-03.jpg',
  },
  {
    title: ["Pumptrack Berlin-Reinickendorf", "Berlin-Reinickendorf pump track", "Pumptrack de Berlin-Reinickendorf"],
    summary: ["Erster Pumptrack im Bezirk, teilweise über dem Tegel-Tunnel.", "The district's first pump track, partly over the Tegel Tunnel.", "Premier pumptrack de l'arrondissement, en partie au-dessus du tunnel de Tegel."],
    articleIds: ['kommunaldirekt-pumptrack-berlin', 'freiraum-gestalten-pumptracken-berlin-2022'],
    projectPath: '/projekte/pumptrack-berlin-reinickendorf',
    bild: '/images/pumptrack/pumptrack-beton-elemente-01.jpg',
  },
  {
    title: ["Skatepark Alba Iulia", "Alba Iulia Skatepark", "Skatepark d'Alba Iulia"],
    summary: ["Skatepark im Graben der Festung Alba Carolina in Rumänien.", "Skatepark in the moat of the Alba Carolina fortress in Romania.", "Skatepark dans le fossé de la forteresse d'Alba Carolina, en Roumanie."],
    articleIds: ['freiraum-gestalten-skaten-denkmalschutz'],
    projectPath: '/projekte/bastion-skatepark-alba-iulia',
    bild: '/images/planung/skateanlage-planen-04.jpg',
  },
  {
    title: ["Skatebowl Bönnigheim", "Bönnigheim skate bowl", "Bowl de skate de Bönnigheim"],
    summary: ["Offener Bowl aus Betonfertigteilen. Die Rampen gehen ohne Übergangsblech in den Asphalt über.", "Open bowl made of precast concrete units. The ramps run into the asphalt without a transition plate.", "Bowl ouvert en éléments préfabriqués en béton. Les rampes rejoignent l'asphalte sans plaque de transition."],
    articleIds: [
      'kommunaldirekt-offener-skatebowl-bonnigheim',
      'kommunalclick24-offene-skatebowl-betonfertigteile',
      'freiraum-gestalten-offene-skatebowl-betonfertigteile',
    ],
    bild: '/images/skateparks/skatepark-04.jpg',
  },
  {
    title: ["Skateanlage Duisburg", "Duisburg skatepark", "Skatepark de Duisbourg"],
    summary: ["38 Betonmodule auf einer Brücke über der Autobahn A 59.", "38 concrete modules on a bridge over the A 59 motorway.", "38 modules en béton sur un pont au-dessus de l'autoroute A 59."],
    articleIds: ['kommunaldirekt-skateanlage-duisburg-a59', 'freiraum-gestalten-skateanlage-a59'],
  },
  {
    title: ["Skateanlage Altdorf", "Altdorf skatepark", "Skatepark d'Altdorf"],
    summary: ["Bestehende Anlage saniert und um einen Serpent erweitert.", "Existing park refurbished and extended with a serpent run.", "Installation existante rénovée et agrandie d'un Serpent."],
    articleIds: ['kommunaldirekt-skateanlage-serpent'],
  },
  {
    title: ["Grillplatz aus Beton", "Concrete barbecue area", "Aire de barbecue en béton"],
    summary: ["Fundamentfreier Grillplatz, 420 cm Durchmesser, mit Edelstahl-Rost.", "Foundation-free barbecue area, 420 cm in diameter, with a stainless steel grate.", "Aire de barbecue sans fondation, de 420 cm de diamètre, avec grille en inox."],
    articleIds: ['kommunaldirekt-grillplatz-oeffentlicher-raum'],
    projectPath: '/projekte/grillplatz-oeffentlicher-raum',
    bild: '/images/grill/grill-platz-01.jpg',
  },
];

const ARTICLE_BY_ID = new Map(PRESS_ARTICLES.map((a) => [a.id, a]));
const articlesOf = (project: PressProject) =>
  project.articleIds.map((id) => ARTICLE_BY_ID.get(id)).filter((a): a is PressArticle => Boolean(a));

const PFEIL = <span className="material-symbols-outlined text-lg text-[#4F6E34] shrink-0" aria-hidden="true">arrow_outward</span>;

// Ein Artikel als Zeile: Fachmedium (und Jahr), auf Wunsch der Titel darunter
const ArtikelZeile: React.FC<{ article: PressArticle; mitTitel?: boolean }> = ({ article, mitTitel }) => (
  <li className="border-b border-brand-dark/10">
    <a href={article.url} target="_blank" rel="noopener" title={article.title} className="group flex items-center justify-between gap-4 min-h-12 py-3">
      {mitTitel ? (
        <span className="min-w-0">
          <span className="block font-mono text-[11px] uppercase tracking-[0.12em] text-brand-dark/60">{PUBLISHER_LABEL[article.publisher]}{article.year ? ` · ${article.year}` : ''}</span>
          <span className="block mt-1 font-semibold text-[17px] text-brand-dark group-hover:text-[#4F6E34] transition-colors">{article.title}</span>
        </span>
      ) : (
        <span className="font-semibold text-base text-brand-dark group-hover:text-[#4F6E34] transition-colors">
          {PUBLISHER_LABEL[article.publisher]}{article.year && <span className="ml-2 font-mono text-[11px] font-medium text-brand-dark/60">{article.year}</span>}
        </span>
      )}
      {PFEIL}
    </a>
  </li>
);

const ProjectLink: React.FC<{ path?: string }> = ({ path }) => {
  const t = useT();
  return path ? (
    <Link to={path} className="inline-flex items-center gap-2 min-h-11 text-[13px] font-extrabold uppercase tracking-widest text-brand-dark hover:text-[#4F6E34] transition-colors">
      {t('Zum Projekt', 'View project', 'Voir le projet')}
      <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
    </Link>
  ) : null;
};

const Anzahl: React.FC<{ n: number }> = ({ n }) => {
  const t = useT();
  return <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#4F6E34]">{n} {n === 1 ? t('Bericht', 'report', 'article') : t('Berichte', 'reports', 'articles')}</div>;
};

const KARTE = 'bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden';
const FACHMEDIEN = ['Kommunaldirekt', 'Freiraum Gestalten', 'Kommunalclick24', 'Flächenmanager', 'Treffpunkt Kommune'];

const PressePage: React.FC = () => {
  const t = useT();
  const lang = useLang();
  const { jahre } = useMemo(() => {
    const assigned = new Set(PRESS_PROJECTS.flatMap((p) => p.articleIds));
    const productArticles = PRESS_ARTICLES.filter((a) => !assigned.has(a.id)).sort(
      (a, b) => (b.year ?? 0) - (a.year ?? 0),
    );
    const gruppen = new Map<number | undefined, PressArticle[]>();
    productArticles.forEach((a) => gruppen.set(a.year, [...(gruppen.get(a.year) ?? []), a]));
    return { jahre: [...gruppen.entries()] };
  }, []);
  const [aufmacher, ...rest] = PRESS_PROJECTS;
  const mitFoto = rest.filter((p) => p.bild);
  const ohneFoto = rest.filter((p) => !p.bild);

  const collectionSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t('Referenzen & Presse | A+ Urban Design', 'References & Press | A+ Urban Design', 'Références et presse | A+ Urban Design'),
      description: t(
        'Fachpublikationen über Skateparks, Pumptracks, Umkleidekabinen und Beton-Fertigteile von A+ Urban Design in kommunalen Fachmedien.',
        'Trade publications about skateparks, pump tracks, changing cubicles and precast concrete units from A+ Urban Design in municipal trade media (in German).',
        'Publications spécialisées sur les skateparks, les pumptracks, les cabines de change et les éléments préfabriqués en béton d\'A+ Urban Design dans la presse communale spécialisée (en allemand).',
      ),
      url: `https://www.aplusurbandesign.com${prefixFor(lang)}/referenzen-presse`,
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
    [lang],
  );

  return (
    <PageShell
      title={t("Referenzen & Presse", "References & Press", "Références et presse")}
      description={t("Fachpublikationen über A+ Urban Design: Skateparks, Pumptracks, Umkleidekabinen und Beton-Fertigteile in kommunaldirekt.de, kommunalclick24.de, treffpunkt-kommune.de und freiraum-gestalten.info.", "Trade publications about A+ Urban Design: skateparks, pump tracks, changing cubicles and precast concrete units in kommunaldirekt.de, kommunalclick24.de, treffpunkt-kommune.de and freiraum-gestalten.info (in German).", "Publications spécialisées sur A+ Urban Design : skateparks, pumptracks, cabines de change et éléments préfabriqués en béton dans kommunaldirekt.de, kommunalclick24.de, treffpunkt-kommune.de et freiraum-gestalten.info (en allemand).")}
      schema={collectionSchema}
    >
      {/* Kopf mit Foto wie auf den Produktseiten */}
      <div className="relative w-full min-h-[520px] md:min-h-[600px] -mt-16 flex flex-col justify-end overflow-hidden bg-brand-dark">
        <Bild hoch src="/images/skate-bowls/skate-bowl-01.jpg" alt={t("Skate-Bowl aus Betonfertigteilen", "Skate bowl made of precast concrete units", "Bowl de skate en éléments préfabriqués en béton")} className="absolute inset-0 w-full h-full object-cover animate-kenburns-1" loading="eager" />
        <div className="absolute inset-0 hero-scrim-unten"></div>
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-12 md:pb-16 hero-text">
          <Kopfleiste label={t("Referenzen & Presse", "References & Press", "Références et presse")} dunkel className="mb-8 animate-fade-in-up" />
          <h1 className="text-[42px] sm:text-6xl md:text-8xl font-extrabold font-heading uppercase tracking-normal [word-spacing:0.12em] text-white leading-none mb-6 animate-fade-in-up [animation-delay:100ms]">
            {t(<>A+ in der <span className="text-brand-orange">Fachpresse</span></>, <>A+ in the <span className="text-brand-orange">trade press</span></>, <>A+ dans la <span className="text-brand-orange">presse spécialisée</span></>)}
          </h1>
          <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-white/90">{t("Kommunale Fachmedien berichten seit über zehn Jahren über Anlagen und Produkte von A+ Urban Design. Hier finden Sie die Projektberichte und Fachbeiträge.", "Municipal trade media have been reporting on A+ Urban Design parks and products for more than ten years. Here you will find the project reports and trade articles. The articles are in German.", "La presse spécialisée destinée aux collectivités rend compte depuis plus de dix ans des installations et des produits d'A+ Urban Design. Vous trouverez ici les reportages sur les projets et les articles spécialisés. Les articles sont en allemand.")}</p>
        </div>
      </div>

      {/* Die Fachmedien als Leiste */}
      <div className="bg-white border-b border-brand-dark/10">
        <div className="container mx-auto px-4 py-6 md:py-7 flex flex-wrap items-center gap-x-10 gap-y-3">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#4F6E34]">{t("Erschienen in", "Published in", "Publié dans")}</div>
          <div className="flex flex-wrap gap-x-9 gap-y-2 font-heading font-extrabold text-base md:text-xl text-brand-dark/70">
            {FACHMEDIEN.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
      </div>

      <section className="pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="container mx-auto px-4 space-y-20 md:space-y-28">

          <div>
            <Plankopf label={t("Projektberichte", "Project reports", "Reportages sur les projets")} klein className="mb-8">{t("Projektberichte", "Project reports", "Reportages sur les projets")}</Plankopf>

            {/* Aufmacher: das Projekt mit den meisten Berichten groß, mit Artikeltiteln */}
            {aufmacher && (
              <article className={`${KARTE} grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] mb-6`}>
                {aufmacher.bild && <Bild src={aufmacher.bild} sizes="(min-width: 1024px) 60vw, 100vw" alt={t(...aufmacher.title)} loading="lazy" className="w-full h-64 sm:h-80 lg:h-full lg:min-h-[460px] object-cover" />}
                <div className="p-6 md:p-10 flex flex-col gap-4">
                  <Anzahl n={articlesOf(aufmacher).length} />
                  <h3 className="font-heading font-extrabold uppercase text-2xl md:text-[32px] leading-tight [word-spacing:0.12em] text-brand-dark">{t(...aufmacher.title)}</h3>
                  <p className="text-lg leading-relaxed text-brand-dark/75">{t(...aufmacher.summary)}</p>
                  <ul className="mt-auto border-t border-brand-dark/10">{articlesOf(aufmacher).map((a) => <ArtikelZeile key={a.id} article={a} mitTitel />)}</ul>
                  <ProjectLink path={aufmacher.projectPath} />
                </div>
              </article>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mitFoto.map((project) => (
                <article key={project.title[0]} className={`${KARTE} flex flex-col`}>
                  <Bild src={project.bild!} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" alt={t(...project.title)} loading="lazy" className="w-full h-56 object-cover" />
                  <div className="p-6 md:p-8 flex flex-col gap-3 flex-1">
                    <Anzahl n={articlesOf(project).length} />
                    <h3 className={`${BOX_B_TITEL} !text-xl !mb-0`}>{t(...project.title)}</h3>
                    <p className="text-lg leading-relaxed text-brand-dark/75 mb-2">{t(...project.summary)}</p>
                    <ul className="mt-auto border-t border-brand-dark/10">{articlesOf(project).map((a) => <ArtikelZeile key={a.id} article={a} />)}</ul>
                    <ProjectLink path={project.projectPath} />
                  </div>
                </article>
              ))}
              {ohneFoto.length > 0 && (
                <div className={`${KARTE} p-6 md:p-7 flex flex-col`}>
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#4F6E34] mb-2">{t("Weitere Projektberichte", "More project reports", "Autres reportages")}</div>
                  {ohneFoto.map((project) => (
                    <article key={project.title[0]} className="py-5 border-t border-brand-dark/10 first:border-t-0">
                      <h3 className={`${BOX_B_TITEL}`}>{t(...project.title)}</h3>
                      <p className="text-base leading-relaxed text-brand-dark/75 mb-2">{t(...project.summary)}</p>
                      <ul className="border-t border-brand-dark/10">{articlesOf(project).map((a) => <ArtikelZeile key={a.id} article={a} />)}</ul>
                      <ProjectLink path={project.projectPath} />
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Plankopf label={t("Fachbeiträge", "Trade articles", "Articles spécialisés")} klein className="mb-8">{t("Fachbeiträge", "Trade articles", "Articles spécialisés")}</Plankopf>
            {/* Nach Jahr gruppiert, Beiträge ohne Jahr am Ende */}
            <div className={`${KARTE} px-5 md:px-10 py-2`}>
              {jahre.map(([jahr, liste], i) => (
                <div key={jahr ?? 'ohne'} className={`grid md:grid-cols-[140px_minmax(0,1fr)] ${i < jahre.length - 1 ? 'border-b border-brand-dark/10' : ''}`}>
                  <div className="pt-5 md:py-6 font-heading font-extrabold text-xl md:text-[28px] text-[#4F6E34]">{jahr ?? ''}</div>
                  <ul>
                    {liste.map((article, j) => (
                      <li key={article.id} className={j < liste.length - 1 ? 'border-b border-brand-dark/[0.07]' : ''}>
                        <a href={article.url} target="_blank" rel="noopener" className="group flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-6 py-4 md:py-6">
                          <span className="font-heading font-bold text-lg md:text-xl text-brand-dark group-hover:text-[#4F6E34] transition-colors leading-snug">{article.title}</span>
                          <span className="inline-flex items-center gap-2 text-[15px] text-brand-dark/70 whitespace-nowrap">{PUBLISHER_LABEL[article.publisher]}{PFEIL}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 p-7 md:p-12 rounded-xl bg-brand-dark text-white">
            <h2 className="font-heading font-extrabold uppercase text-2xl md:text-3xl leading-tight [word-spacing:0.12em]">{t("Presseanfrage oder Bildmaterial?", "Press enquiries or images?", "Demande presse ou visuels ?")}</h2>
            <a href="mailto:post@aplusurbandesign.com" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[52px] px-5 sm:px-7 rounded-lg bg-brand-orange text-white font-bold text-[15px] sm:text-base hover:bg-white hover:text-brand-dark transition-colors">
              <span className="material-symbols-outlined text-xl" aria-hidden="true">mail</span>
              post@aplusurbandesign.com
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default PressePage;
