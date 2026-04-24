import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

interface ReferencedProjectsProps {
  productPath: string;
  limit?: number;
}

const ReferencedProjects: React.FC<ReferencedProjectsProps> = ({ productPath, limit = 3 }) => {
  const matches = PROJECTS.filter((project) =>
    project.productsUsed.some((used) => used.path === productPath)
  ).slice(0, limit);

  if (matches.length === 0) return null;

  return (
    <section className="mt-32 border-t border-brand-dark/10 pt-24">
      <div className="text-center mb-16">
        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
          Referenzprojekte
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
          Hier wurde <span className="text-brand-orange">verbaut.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {matches.map((project) => (
          <Link
            key={project.id}
            to={`/projekte/${project.id}`}
            className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 backdrop-blur-sm"
          >
            <img
              loading="lazy"
              decoding="async"
              src={project.imageUrl}
              alt={project.altText}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <span className="text-brand-orange font-mono text-xs mb-2 uppercase tracking-widest">
                {project.category}
                {project.year ? ` · ${project.year}` : ''}
              </span>
              <h3 className="text-2xl font-extrabold font-heading text-white uppercase tracking-tighter transform group-hover:-translate-y-1 transition-transform duration-300">
                {project.title}
              </h3>
              <span className="mt-3 text-white/70 text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Zum Projekt →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ReferencedProjects;
