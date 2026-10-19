import React from 'react';
import { Link, useT } from '../i18n';
import { useKategorie, useProjects } from '../localized';
import Bild from './Bild';
import Plankopf from './Plankopf';

interface ReferencedProjectsProps {
  productPath: string;
  limit?: number;
}

const ReferencedProjects: React.FC<ReferencedProjectsProps> = ({ productPath, limit = 3 }) => {
  const t = useT();
  const kategorie = useKategorie();
  const matches = useProjects().filter((project) =>
    project.productsUsed.some((used) => used.path === productPath)
  ).slice(0, limit);

  if (matches.length === 0) return null;

  return (
    <section className="mt-32 border-t border-brand-dark/10 pt-24">
      <div className="text-center mb-16">
        <Plankopf label={t('Referenzprojekte', 'Reference projects', 'Projets de référence')}>
          {t(<>Hier <span className="text-brand-orange">eingesetzt</span></>, <>Used <span className="text-brand-orange">here</span></>, <>Utilisé <span className="text-brand-orange">ici</span></>)}
        </Plankopf>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {matches.map((project) => (
          <Link
            key={project.id}
            to={`/projekte/${project.id}`}
            className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 backdrop-blur-sm"
          >
            <Bild hoch sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              loading="lazy"
              decoding="async"
              src={project.imageUrl}
              alt={project.altText}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <span className="text-brand-orange font-mono text-xs mb-2 uppercase tracking-widest">
                {kategorie(project.category)}
                {project.year ? ` · ${project.year}` : ''}
              </span>
              <h3 className="text-2xl font-extrabold font-heading text-white uppercase tracking-normal [word-spacing:0.12em] transform group-hover:-translate-y-1 transition-transform duration-300">
                {project.title}
              </h3>
              <span className="mt-3 text-white/70 text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {t('Zum Projekt →', 'View project →', 'Voir le projet →')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ReferencedProjects;
