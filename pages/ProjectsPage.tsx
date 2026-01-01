import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PROJECTS } from '../constants';
import { ProjectCategory } from '../types';

const CATEGORIES: ProjectCategory[] = ['Skatepark', 'Pumptrack', 'Hockey-Bande', 'Grillstelle', 'Umkleidekabine', 'BMX-Anlage', 'Spezialbau'];

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <PageShell title="Referenzen & Projekte">
      
      {/* 1. HEADER SECTION */}
      <div className="relative pt-12 pb-24 text-center">
        <div className="inline-flex items-center gap-3 py-1 px-4 border border-brand-orange/30 bg-brand-orange/10 rounded-full mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
            <span className="text-brand-orange font-mono text-xs uppercase tracking-widest">
                Portfolio 2005 - 2024
            </span>
        </div>
        <h1 className="text-6xl md:text-9xl font-black font-heading text-white uppercase tracking-tighter leading-[0.85] mb-8 drop-shadow-2xl">
            Work<br/><span className="text-outline-bold text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>Selection.</span>
        </h1>
      </div>

      {/* 2. FILTER CONTROL PANEL - Transparent with Blur */}
      <div className="sticky top-20 z-40 mb-16 backdrop-blur-xl border-y border-white/10 bg-black/40">
        <div className="container mx-auto overflow-x-auto">
             <div className="flex justify-start md:justify-center min-w-max px-4">
                <button
                    onClick={() => setFilter('all')}
                    className={`relative py-6 px-6 text-xs font-bold uppercase tracking-widest transition-all duration-300 group ${
                    filter === 'all' ? 'text-brand-orange' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <span className="relative z-10">Alle Projekte</span>
                    {filter === 'all' && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange shadow-[0_0_15px_rgba(249,115,22,0.8)]"></span>
                    )}
                </button>
                {CATEGORIES.map(category => (
                    <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`relative py-6 px-6 text-xs font-bold uppercase tracking-widest transition-all duration-300 group ${
                        filter === category ? 'text-brand-orange' : 'text-gray-400 hover:text-white'
                    }`}
                    >
                    <span className="relative z-10">{category.replace('-', ' ')}</span>
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
            className="group relative block aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-white/5 border border-white/10 rounded-sm hover:border-brand-orange/50 transition-all duration-500 backdrop-blur-sm"
          >
            {/* Image Layer */}
            <div className="absolute inset-0 z-0">
                 <img 
                    loading="lazy" 
                    decoding="async" 
                    src={project.imageUrl} 
                    alt={project.altText} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>

            {/* HUD Overlay (Corners) */}
            <div className="absolute inset-4 z-10 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-orange"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-orange"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-orange"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-orange"></div>
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                
                {/* Top Label */}
                <div className="flex justify-between items-start opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block py-1 px-2 bg-black/60 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-brand-orange border border-brand-orange/20">
                        REF-{String(index + 1).padStart(3, '0')}
                    </span>
                    <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest bg-black/60 backdrop-blur-md px-2 py-1 rounded-sm border border-white/10">
                        {project.year || '2023'}
                    </span>
                </div>

                {/* Bottom Info */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl md:text-5xl font-black font-heading text-white uppercase tracking-tighter mb-2 leading-[0.9] drop-shadow-xl">
                        {project.title}
                    </h3>
                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-lg mt-4 border-l-2 border-brand-orange pl-4 bg-black/40 p-2 backdrop-blur-sm">
                            {project.description}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest">
                            Projekt ansehen <span className="material-symbols-outlined text-sm">arrow_forward</span>
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