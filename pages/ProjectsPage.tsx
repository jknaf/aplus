import React, { useState } from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useKategorie, useProjects } from '../localized';
import { ProjectCategory } from '../types';
import Bild from '../components/Bild';

const CATEGORIES: ProjectCategory[] = ['Skatepark', 'Pumptrack', 'Hockey-Bande', 'Grillstelle', 'Umkleidekabine'];

const ProjectsPage: React.FC = () => {
  const t = useT();
  const PROJECTS = useProjects();
  const kategorie = useKategorie();
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <PageShell title={t("Referenzen & Projekte", "References & Projects", "Références et projets")} description={t("Realisierte Projekte von A+ Urban Design: Beton-Skateparks, Pumptracks, Hockey-Banden und urbane Freiraumlösungen in ganz Europa.", "Completed projects by A+ Urban Design: concrete skateparks, pump tracks, hockey boards and urban open-space solutions across Europe.", "Projets réalisés par A+ Urban Design : skateparks en béton, pumptracks, bandes de hockey et solutions d'aménagement d'espaces libres urbains dans toute l'Europe.")}>
      
      {/* 1. HEADER SECTION - Updated Typography */}
      <div className="relative pt-12 pb-24 text-center">
        <div className="inline-flex items-center gap-3 py-1 px-4 border border-brand-orange/30 bg-brand-orange/10 rounded-full mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
            <span className="text-brand-orange font-mono text-xs uppercase tracking-widest">
                Portfolio
            </span>
        </div>
        <h1 className="text-6xl md:text-9xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.85] mb-8">
            {t(<>Ausgewählte<br/><span className="text-brand-orange">Projekte</span></>, <>Selected<br/><span className="text-brand-orange">projects</span></>, <>Projets<br/><span className="text-brand-orange">sélectionnés</span></>)}
        </h1>
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
                </div>

                {/* Bottom Info */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl lg:text-3xl xl:text-5xl font-extrabold font-heading text-white uppercase tracking-tighter mb-2 leading-[0.9] drop-shadow-xl line-clamp-3">
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