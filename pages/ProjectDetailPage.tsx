import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PROJECTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = PROJECTS.find(p => p.id === projectId);
  const [isCopied, setIsCopied] = useState(false);
  
  // Find next/prev projects for navigation
  const currentIndex = PROJECTS.findIndex(p => p.id === projectId);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <PageShell title="Projekt nicht gefunden">
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-black font-heading text-white uppercase">404</h1>
          <p className="mt-4 text-brand-muted">Projektakte nicht gefunden.</p>
          <Link to="/projekte" className="mt-8 text-brand-orange hover:text-white uppercase font-bold tracking-widest text-xs border-b border-brand-orange pb-1">
            Zurück zur Übersicht
          </Link>
        </div>
      </PageShell>
    );
  }
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  return (
    <PageShell title={project.title}>
      
      {/* 1. CINEMATIC HERO (Fixed/Parallax feel) */}
      <div className="fixed inset-0 z-0 h-[80vh] w-full">
         <img 
            src={project.imageUrl} 
            alt={project.altText} 
            className="w-full h-full object-cover filter brightness-[0.6]"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]"></div>
      </div>

      {/* Spacer to push content below Hero */}
      <div className="relative z-10 pt-[50vh] pb-32">
        
        {/* Title Overlay */}
        <div className="container mx-auto px-4 mb-24">
             <div className="border-l-4 border-brand-orange pl-6 md:pl-12 backdrop-blur-sm">
                 <div className="flex items-center gap-4 mb-4">
                    <span className="bg-brand-orange text-black text-xs font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm">
                        {project.category}
                    </span>
                    <span className="text-gray-300 font-mono text-xs tracking-widest">
                        EST. {project.year || '2023'}
                    </span>
                 </div>
                 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading text-white uppercase tracking-tighter leading-[0.85] shadow-black drop-shadow-2xl">
                    {project.title}
                 </h1>
             </div>
        </div>

        {/* Content Container (Opaque Background) */}
        <div className="bg-[#050505] border-t border-white/10 min-h-screen relative">
            <div className="container mx-auto px-4 py-24">
                
                {/* 2. SPLIT LAYOUT */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                    
                    {/* LEFT: STICKY TECH SPECS */}
                    <div className="lg:w-4/12">
                        <div className="lg:sticky lg:top-32 space-y-12">
                            
                            {/* Project Description */}
                            <div>
                                <h3 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-8 h-px bg-brand-orange"></span> Briefing
                                </h3>
                                <p className="text-xl text-gray-300 leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>

                            {/* Tech Specs Table */}
                            <div className="bg-[#121212] border border-white/10 rounded-lg p-6">
                                <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                                    Projektdaten
                                </h3>
                                <dl className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-gray-500 font-mono uppercase">Baujahr</dt>
                                        <dd className="text-white font-bold">{project.year || '2023'}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-500 font-mono uppercase">Typ</dt>
                                        <dd className="text-white font-bold">{project.category}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-500 font-mono uppercase">Material</dt>
                                        <dd className="text-white font-bold">Beton C35/45</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Products Used */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                                    Verbaute Systeme
                                </h3>
                                <ul className="space-y-2">
                                    {project.productsUsed.map((prod, idx) => (
                                        <li key={idx}>
                                            <Link 
                                                to={prod.path}
                                                className="group flex items-center justify-between p-3 bg-white/5 hover:bg-brand-orange hover:text-black border border-white/5 rounded transition-all duration-300"
                                            >
                                                <span className="font-bold text-sm uppercase tracking-wide">{prod.name}</span>
                                                <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">arrow_outward</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Share Button */}
                            <button 
                                onClick={handleCopyLink}
                                className="flex items-center gap-3 text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">{isCopied ? 'check' : 'share'}</span>
                                {isCopied ? 'Link kopiert' : 'Projekt teilen'}
                            </button>

                        </div>
                    </div>

                    {/* RIGHT: MASONRY GALLERY */}
                    <div className="lg:w-8/12">
                         <h3 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-8 flex items-center gap-2">
                            <span className="w-8 h-px bg-brand-orange"></span> Visual Documentation
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[300px]">
                            {/* Main Large Image */}
                             <div className="md:col-span-2 row-span-2 relative group overflow-hidden rounded-sm border border-white/10">
                                <img 
                                    src={project.imageUrl} 
                                    alt="Main View" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-4 bg-black/80 px-2 py-1 text-[10px] font-mono text-white">FIG 01. OVERVIEW</div>
                             </div>

                             {/* Gallery Images */}
                             {project.images.map((img, idx) => (
                                 <div 
                                    key={idx} 
                                    className={`relative group overflow-hidden rounded-sm border border-white/10 ${idx % 3 === 0 ? 'md:col-span-2' : ''}`}
                                 >
                                    <img 
                                        src={img} 
                                        alt={`Detail ${idx + 1}`} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-4 left-4 bg-black/80 px-2 py-1 text-[10px] font-mono text-white">FIG {String(idx + 2).padStart(2, '0')}. DETAIL</div>
                                 </div>
                             ))}
                        </div>

                         {/* CTA at bottom of gallery */}
                        <div className="mt-24 pt-12 border-t border-white/10">
                             <div className="bg-[#121212] p-8 md:p-12 rounded-xl border border-white/5 text-center">
                                <h3 className="text-3xl font-black font-heading text-white uppercase mb-4">Interesse geweckt?</h3>
                                <p className="text-gray-400 mb-8 max-w-lg mx-auto">Planen Sie ein ähnliches Projekt? Wir unterstützen Sie von der ersten Skizze bis zur Fertigstellung.</p>
                                <Link to="/kontakt" className="inline-block bg-brand-orange text-black font-bold uppercase tracking-widest py-4 px-8 rounded hover:bg-white transition-colors">
                                    Projekt anfragen
                                </Link>
                             </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* 3. NEXT PROJECT NAV */}
            <div className="grid grid-cols-2 border-t border-white/10">
                <Link to={`/projekte/${prevProject.id}`} className="group block p-12 border-r border-white/10 hover:bg-[#121212] transition-colors text-right relative overflow-hidden">
                     <span className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-hover:text-brand-orange transition-colors">Vorheriges</span>
                     <span className="block text-2xl md:text-4xl font-black font-heading text-white uppercase tracking-tighter group-hover:translate-x-[-10px] transition-transform">{prevProject.title}</span>
                </Link>
                <Link to={`/projekte/${nextProject.id}`} className="group block p-12 hover:bg-[#121212] transition-colors relative overflow-hidden">
                     <span className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2 group-hover:text-brand-orange transition-colors">Nächstes</span>
                     <span className="block text-2xl md:text-4xl font-black font-heading text-white uppercase tracking-tighter group-hover:translate-x-[10px] transition-transform">{nextProject.title}</span>
                </Link>
            </div>

        </div>
      </div>
    </PageShell>
  );
};

export default ProjectDetailPage;