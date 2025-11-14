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
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Unsere Projekte</h1>
        <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
          Ein Einblick in unsere realisierten Projekte. Sehen Sie, wie unsere modularen Systeme aus Beton und Stahl öffentliche Räume in ganz Europa verwandeln.
        </p>
      </div>

      <div className="mt-16 mb-12 border-b border-white/10">
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
          <Link to={`/projekte/${project.id}`} key={project.id} className="group block bg-brand-surface rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 shadow-lg hover:shadow-brand-orange/20">
            <div className="relative">
              <img loading="lazy" decoding="async" src={project.imageUrl} alt={project.altText} className="w-full h-56 object-cover" />
            </div>
            <div className="p-6">
              <p className="text-sm font-bold text-brand-orange uppercase tracking-wider">{project.category.replace('-', ' ')} {project.year && `(${project.year})`}</p>
              <h3 className="mt-1 text-xl font-bold font-heading text-brand-heading">{project.title}</h3>
              <p className="mt-2 text-brand-muted line-clamp-3 text-sm">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
};

export default ProjectsPage;