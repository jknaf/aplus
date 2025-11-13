import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PROJECTS } from '../constants';
import { ProjectCategory } from '../types';

const CATEGORIES: ProjectCategory[] = ['Skatepark', 'Pumptrack', 'Hockey-Bande', 'Grillstelle', 'Umkleidekabine'];

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <PageShell title="Projekte">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-heading">Unsere Referenzprojekte</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Ein Einblick in unsere realisierten Projekte. Sehen Sie, wie unsere modularen Systeme aus Beton und Stahl öffentliche Räume verwandeln.
        </p>
      </div>

      <div className="mt-12 mb-12 border-b border-gray-200">
        <div className="-mb-px flex justify-center space-x-4 sm:space-x-8" aria-label="Tabs">
          <button
            onClick={() => setFilter('all')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm uppercase tracking-wider transition-colors ${
              filter === 'all'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-gray-500 hover:text-brand-anthracite hover:border-gray-300'
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
                  : 'border-transparent text-gray-500 hover:text-brand-anthracite hover:border-gray-300'
              }`}
            >
              {category.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <Link to={`/projekte/${project.id}`} key={project.id} className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
            <div className="relative">
              <img src={project.imageUrl} alt={project.altText} className="w-full h-56 object-cover" />
            </div>
            <div className="p-6">
              <p className="text-sm font-bold text-brand-orange uppercase">{project.category.replace('-', ' ')}</p>
              <h3 className="mt-1 text-xl font-bold font-heading text-brand-anthracite">{project.title}</h3>
              <p className="mt-2 text-gray-600 line-clamp-3">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
};

export default ProjectsPage;