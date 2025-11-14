import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PROJECTS } from '../constants';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = PROJECTS.find(p => p.id === projectId);
  const [isCopied, setIsCopied] = useState(false);

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
  
  const currentUrl = window.location.href;
  const shareText = `Schaut euch dieses coole Projekt an: ${project.title} | A+ Urban Design`;

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedShareText = encodeURIComponent(shareText);
  
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedShareText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };


  return (
    <PageShell title={project.title}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <p className="text-sm font-bold text-brand-orange uppercase tracking-wider">{project.category.replace('-', ' ')} {project.year && `(${project.year})`}</p>
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
          <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Projekt teilen</h2>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Auf LinkedIn teilen" className="text-brand-muted hover:text-brand-orange transition-colors" title="Auf LinkedIn teilen">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
            </a>
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Auf X (Twitter) teilen" className="text-brand-muted hover:text-brand-orange transition-colors" title="Auf X (Twitter) teilen">
               <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Auf Facebook teilen" className="text-brand-muted hover:text-brand-orange transition-colors" title="Auf Facebook teilen">
               <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>
            </a>
            <button onClick={handleCopyLink} className="flex items-center gap-2 px-4 py-2 bg-brand-surface text-brand-text rounded-md hover:bg-white/10 transition-colors text-sm font-bold">
              <span className="material-symbols-outlined text-base">{isCopied ? 'check' : 'link'}</span>
              {isCopied ? 'Link kopiert!' : 'Link kopieren'}
            </button>
          </div>
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-10">Bildergalerie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                        <img loading="lazy" decoding="async" src={image} alt={`${project.title} - ${project.category} Bild ${index + 1}`} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                ))}
            </div>
        </div>

      </div>
    </PageShell>
  );
};

export default ProjectDetailPage;