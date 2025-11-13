import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PROJECTS } from '../constants';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = PROJECTS.find(p => p.id === projectId);

  if (!project) {
    return (
      <PageShell title="Projekt nicht gefunden">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-heading">Projekt nicht gefunden</h1>
          <p className="mt-4 text-lg text-brand-muted">Das von Ihnen gesuchte Projekt konnte leider nicht gefunden werden.</p>
          <Link to="/projekte" className="mt-8 inline-block bg-brand-orange text-white font-bold py-4 px-10 rounded-md shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
            Zurück zur Projektübersicht
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={project.title}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <p className="text-sm font-bold text-brand-orange uppercase tracking-wider">{project.category.replace('-', ' ')}</p>
          <h1 className="text-4xl md:text-6xl font-black font-heading mt-2 uppercase tracking-tighter">{project.title}</h1>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Projektbeschreibung</h2>
            <p className="mt-6 text-brand-muted whitespace-pre-line leading-relaxed">{project.description}</p>
          </div>
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Produkte</h2>
            <ul className="mt-6 space-y-3">
              {project.productsUsed.map(product => (
                <li key={product.name}>
                  <Link to={product.path} className="group flex items-center text-brand-muted hover:text-brand-orange font-semibold transition-colors">
                     <span className="mr-2 text-brand-orange group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20">
            <h2 className="text-3xl font-bold font-heading text-center mb-10">Bildergalerie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                        <img src={image} alt={`${project.title} - Bild ${index + 1}`} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                ))}
            </div>
        </div>

      </div>
    </PageShell>
  );
};

export default ProjectDetailPage;