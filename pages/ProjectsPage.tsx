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
    <PageShell title="Projekte">
      <div className="text-center pt-12 pb-16">
        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
            Referenzen
        </span>
        <h1 className="text-5xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter leading-[0.9]">
            Unsere <span className="text-outline-orange">Projekte.</span>
        </h1>
        <p className="mt-8 text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
          Ein Einblick in unsere realisierten Projekte. Sehen Sie, wie unsere modularen Systeme aus Beton und Stahl öffentliche Räume in ganz Europa verwandeln.
        </p>
      </div>

      <div className="mb-12 border-b border-white/10">
        <div className="-mb-px flex justify-center flex-wrap gap-x-4 sm:gap-x-8" aria-label="Tabs">
          <button
            onClick={() => setFilter('all')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm uppercase tracking-wider transition-colors ${
              filter === 'all'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-brand-muted hover:text-brand-heading hover:border-gray-300'
            }`}
          >
            Alle
          </button>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm uppercase tracking-wider capitalize transition-colors ${
                filter === category
                  ? 'border-brand-orange text-brand-orange'
                  : 'border-transparent text-brand-muted hover:text-brand-heading hover:border-gray-300'
              }`}
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <Link to={`/projekte/${project.id}`} key={project.id} className="group block bg-brand-surface rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 shadow-lg hover:shadow-brand-orange/20 border border-white/5">
            <div className="relative overflow-hidden">
              <img loading="lazy" decoding="async" src={project.imageUrl} alt={project.altText} className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              <div className="absolute top-4 left-4">
                  <span className="inline-block py-1 px-2 bg-black/80 text-white text-[10px] font-mono uppercase tracking-widest border border-white/10">
                      {project.year || '2023'}
                  </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">{project.category.replace('-', ' ')}</p>
              <h3 className="text-2xl font-black font-heading text-white uppercase tracking-tighter mb-3">{project.title}</h3>
              <p className="text-brand-muted line-clamp-3 text-sm leading-relaxed">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
};

export default ProjectsPage;