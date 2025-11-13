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
          <h1 className="text-3xl font-bold font-heading">Projekt nicht gefunden</h1>
          <p className="mt-4 text-lg text-gray-600">Das von Ihnen gesuchte Projekt konnte leider nicht gefunden werden.</p>
          <Link to="/projekte" className="mt-8 inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
            Zurück zur Projektübersicht
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={project.title}>
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-brand-orange font-bold uppercase tracking-wider">{project.category.replace('-', ' ')}</p>
        <h1 className="text-center text-3xl md:text-5xl font-bold font-heading mt-2">{project.title}</h1>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold font-heading">Projektbeschreibung</h2>
            <p className="mt-4 text-gray-700 whitespace-pre-line">{project.description}</p>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold font-heading">Verwendete Produkte</h2>
            <ul className="mt-4 space-y-2">
              {project.productsUsed.map(product => (
                <li key={product.name}>
                  <Link to={product.path} className="flex items-center text-gray-700 hover:text-brand-orange font-semibold transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
            <h2 className="text-2xl font-bold font-heading text-center mb-8">Bildergalerie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md">
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