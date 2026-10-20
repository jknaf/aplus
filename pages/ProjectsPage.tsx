import React, { useState } from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useKategorie, useProjects } from '../localized';
import { ProjectCategory } from '../types';
import Bild from '../components/Bild';
import Plankopf from '../components/Plankopf';
import { FACHMEDIEN, PRESSE_BERICHTE } from './PressePage';

const CATEGORIES: ProjectCategory[] = ['Skatepark', 'Pumptrack', 'Hockey-Bande', 'Grillstelle', 'Umkleidekabine'];

// Zeitungsausschnitte im Presse-Banner: Titel wie in den Berichten (Berlin auf Wunsch „Pumptrack in Berlin“)
const AUSSCHNITTE = [
  { bild: '/images/homepage/hero-anlage-02.jpg', medium: 'Kommunaldirekt', titel: 'Skatepark Friedrichsdorf (2024)', lage: '-rotate-[5deg] mt-6' },
  { bild: '/images/umkleide/umkleidekabine-freibad-03.jpg', medium: 'Flächenmanager', titel: 'Berührungsfreie Umkleidekabine für Freibäder', lage: 'rotate-[3deg]' },
  { bild: '/images/pumptrack/pumptrack-beton-elemente-01.jpg', medium: 'Freiraum Gestalten', titel: 'Pumptrack in Berlin', lage: '-rotate-[2deg] mt-8 hidden sm:block lg:hidden xl:block' },
];

const ProjectsPage: React.FC = () => {
  const t = useT();
  const PROJECTS = useProjects();
  const kategorie = useKategorie();
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <PageShell title={t("Referenzen & Projekte", "Our Projects", "Références et projets")} description={t("Realisierte Projekte von A+ Urban Design: Beton-Skateparks, Pumptracks, Hockey-Banden und urbane Freiraumlösungen in ganz Europa.", "Completed projects by A+ Urban Design: concrete skateparks, pump tracks, hockey boards and urban open-space solutions across Europe.", "Projets réalisés par A+ Urban Design : skateparks en béton, pumptracks, bandes de hockey et solutions d'aménagement d'espaces publics urbains dans toute l'Europe.")}>
      
      {/* 1. HEADER SECTION - Updated Typography */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <Plankopf label="Portfolio" as="h1">
            {t(<>Ausgewählte <span className="text-brand-orange">Projekte</span></>, <>Selected <span className="text-brand-orange">projects</span></>, <>Projets <span className="text-brand-orange">sélectionnés</span></>)}
        </Plankopf>

        {/* Presse-Banner: was andere über unsere Projekte schreiben */}
        <div className="mt-10 rounded-2xl bg-brand-dark text-white overflow-hidden grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="p-6 sm:p-10 lg:py-11 lg:pl-12 lg:pr-0 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[#A9C68C]">
              <span className="material-symbols-outlined text-lg" aria-hidden="true">newspaper</span>
              {t("Presse", "Press", "Presse")}
            </div>
            <h2 className="font-heading font-extrabold uppercase text-[30px] sm:text-[40px] xl:text-[46px] leading-[1.03] [word-spacing:0.12em]">
              {t(<>Was die <span className="text-[#8DB368]">Presse</span> über uns schreibt</>, <>What the <span className="text-[#8DB368]">press</span> writes about us</>, <>Ce que la <span className="text-[#8DB368]">presse</span> écrit sur nous</>)}
            </h2>
            <p className="max-w-md text-base md:text-lg leading-relaxed text-white/80">{t("Fachmedien für Kommunen berichten über unsere Anlagen. Lesen Sie selbst.", "Trade media for local authorities report on our parks. Read for yourself. The articles are in German.", "Les médias spécialisés destinés aux collectivités parlent de nos installations. Lisez vous-même. Les articles sont en allemand.")}</p>
            <Link to="/referenzen-presse" className="hidden lg:inline-flex self-start mt-auto items-center gap-2 min-h-[52px] px-7 rounded-lg bg-brand-orange hover:bg-white hover:text-brand-dark text-white font-extrabold uppercase tracking-wider text-sm transition-colors">
              {t("Alle Presseberichte", "All press reports", "Tous les articles de presse")}
              <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
          <div className="px-6 pb-6 sm:px-10 lg:pl-4 lg:pt-10 lg:pb-5 flex flex-col">
            <div className="flex justify-center lg:justify-end">
              {AUSSCHNITTE.map((a) => (
                <Link key={a.titel} to="/referenzen-presse" className={`${a.lage} w-[48%] sm:w-[210px] shrink-0 -ml-3 first:ml-0 sm:-ml-4 bg-[#FBFAF6] text-brand-dark rounded-md overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:rotate-0 hover:-translate-y-1.5`}>
                  <Bild src={a.bild} sizes="240px" alt="" loading="lazy" className="block w-full h-24 sm:h-[124px] object-cover" />
                  <span className="block p-3 sm:px-4 sm:pt-3.5 sm:pb-4">
                    <span className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#4F6E34]">{a.medium}</span>
                    <span lang="de" className="block mt-1.5 font-heading font-extrabold text-[13px] sm:text-lg leading-tight [hyphens:auto]">{a.titel}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8 lg:mt-auto lg:pt-6 lg:pr-10 flex flex-wrap lg:justify-end gap-x-5 gap-y-1 font-heading font-extrabold text-[13px] lg:text-sm text-white/60">
              {FACHMEDIEN.map((m) => <span key={m}>{m}</span>)}
            </div>
            <Link to="/referenzen-presse" className="lg:hidden mt-6 flex items-center justify-center gap-2 min-h-[52px] rounded-lg bg-brand-orange text-white font-extrabold uppercase tracking-wider text-sm">
              {t("Alle Presseberichte", "All press reports", "Tous les articles de presse")}
              <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. FILTER CONTROL PANEL - Transparent with Blur */}
      <div className="sticky top-20 z-40 mb-16 backdrop-blur-xl border-y border-brand-dark/10 bg-white/80">
        <div className="container mx-auto overflow-x-auto">
             <div className="flex justify-start md:justify-center min-w-max px-4">
                <button
                    onClick={() => setFilter('all')}
                    className={`relative py-6 px-6 text-xs font-bold uppercase tracking-widest transition-all duration-300 group ${
                    filter === 'all' ? 'text-brand-orange' : 'text-brand-muted hover:text-brand-dark'
                    }`}
                >
                    <span className="relative z-10">{t("Alle Projekte", "All projects", "Tous les projets")}</span>
                    {filter === 'all' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange shadow-[0_0_15px_rgba(249,115,22,0.8)]"></span>
                    )}
                </button>
                {CATEGORIES.map(category => (
                    <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`relative py-6 px-6 text-xs font-bold uppercase tracking-widest transition-all duration-300 group ${
                        filter === category ? 'text-brand-orange' : 'text-brand-muted hover:text-brand-dark'
                    }`}
                    >
                    <span className="relative z-10">{kategorie(category)}</span>
                    {filter === category && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange shadow-[0_0_15px_rgba(249,115,22,0.8)]"></span>
                    )}
                    </button>
                ))}
             </div>
        </div>
      </div>

      {/* 3. PROJECT GRID - Removed Opaque Backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 px-2">
        {filteredProjects.map((project, index) => (
          <Link 
            to={`/projekte/${project.id}`} 
            key={project.id} 
            className="group relative block aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-brand-surface/60 border border-brand-dark/10 rounded-sm hover:border-brand-orange/50 transition-all duration-500 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          >
            {/* Image Layer */}
            <div className="absolute inset-0 z-0">
                 <Bild sizes="(min-width: 1024px) 60vw, 100vw" 
                    loading="lazy" 
                    decoding="async" 
                    src={project.imageUrl} 
                    alt={project.altText} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-70 group-hover:opacity-35 transition-opacity duration-500"></div>
            </div>

            {/* HUD Overlay (Corners) */}
            <div className="absolute inset-4 z-10 border border-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-orange"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-orange"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-orange"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-orange"></div>
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end">
                
                {/* Top Label */}
                <div className="mb-auto flex justify-between items-start opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block py-1 px-2 bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-brand-orange border border-brand-orange/20">
                        REF-{String(index + 1).padStart(3, '0')}
                    </span>
                    {PRESSE_BERICHTE.get(project.id) ? (
                        <span className="inline-flex items-center gap-1.5 py-1.5 pl-2 pr-3 rounded-full bg-[#FBFAF6] text-brand-dark text-xs md:text-[13px] font-bold shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
                            <span className="material-symbols-outlined text-base text-[#4F6E34]" aria-hidden="true">newspaper</span>
                            {t("In der Presse", "In the press", "Dans la presse")} · {PRESSE_BERICHTE.get(project.id)} {PRESSE_BERICHTE.get(project.id) === 1 ? t("Bericht", "report", "article") : t("Berichte", "reports", "articles")}
                        </span>
                    ) : null}
                </div>

                {/* Bottom Info */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl lg:text-3xl xl:text-5xl font-extrabold font-heading text-white uppercase tracking-normal [word-spacing:0.12em] mb-2 leading-none drop-shadow-xl line-clamp-3">
                        {project.title}
                    </h3>
                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-lg mt-4 border-l-2 border-brand-orange pl-4 bg-black/40 p-2 backdrop-blur-sm hidden lg:block">
                            <span className="line-clamp-2">{project.description}</span>
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest">
                            {t("Projekt ansehen", "View project", "Voir le projet")} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
};

export default ProjectsPage;