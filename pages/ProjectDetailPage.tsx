import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, localizePath, prefixFor, useLang, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useKategorie, useProjects } from '../localized';
import Bild from '../components/Bild';
import { Kopfleiste } from '../components/Plankopf';

const ProjectDetailPage: React.FC = () => {
  const t = useT();
  const lang = useLang();
  const PROJECTS = useProjects();
  const kategorie = useKategorie();
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
      <PageShell title={t("Projekt nicht gefunden", "Project not found", "Projet introuvable")}>
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-extrabold font-heading text-white uppercase">404</h1>
          <p className="mt-4 text-brand-muted">{t("Dieses Projekt gibt es nicht.", "This project does not exist.", "Ce projet n'existe pas.")}</p>
          <Link to="/projekte" className="mt-8 text-brand-orange hover:text-white uppercase font-bold tracking-widest text-xs border-b border-brand-orange pb-1">
            {t("Zurück zur Übersicht", "Back to overview", "Retour à l'aperçu")}
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

  const BASE_URL = 'https://www.aplusurbandesign.com';
  const absoluteImg = (src: string) => `${BASE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
  const allImages = [project.imageUrl, ...project.images].map(absoluteImg);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "headline": project.title,
    "description": project.description,
    "image": allImages,
    "keywords": kategorie(project.category),
    "inLanguage": t("de-DE", "en-GB", "fr-FR"),
    "isAccessibleForFree": true,
    ...(project.year ? { "datePublished": String(project.year) } : {}),
    "creator": {
      "@type": "Organization",
      "name": "A+ Urban Design",
      "url": BASE_URL,
    },
    "about": project.productsUsed.map((prod) => ({
      "@type": "Product",
      "name": prod.name,
      "url": `${BASE_URL}${localizePath(lang, prod.path)}`,
    })),
    "mainEntityOfPage": `${BASE_URL}${prefixFor(lang)}/projekte/${project.id}`,
  };

  return (
    <PageShell
      title={project.title}
      description={project.description}
      ogImage={project.imageUrl}
      schema={projectSchema}
    >
      
      {/* 1. CINEMATIC HERO (Fixed/Parallax feel) */}
      <div className="fixed inset-0 z-0 h-[80vh] w-full pointer-events-none">
         <Bild hoch
            src={project.imageUrl}
            alt={project.altText}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.8]"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent"></div>
         {/* Fade out at bottom to blend into global background */}
         <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
      </div>

      {/* Spacer to push content below Hero.
          Kein explizites z-index: `relative` allein reicht, um im Paint-Order
          nach dem fixed Hero gerendert zu werden (beide positioned, DOM-Reihenfolge
          entscheidet). `z-10` würde hier einen eigenen Stacking-Kontext aufspannen
          und die Header-Nav (z-50) geometrisch vom Klick aussperren. */}
      <div className="relative pt-[50vh] pb-32">
        
        {/* Title Overlay */}
        <div className="container mx-auto px-4 mb-24">
             <div className="border-l-4 border-brand-orange pl-6 md:pl-12 backdrop-blur-sm">
                 <Kopfleiste label={kategorie(project.category)} dunkel className="mb-8" />
                 <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading text-white uppercase tracking-normal [word-spacing:0.12em] leading-none shadow-black drop-shadow-2xl">
                    {project.title}
                 </h1>
             </div>
        </div>

        {/* Content Container (Transparent/Glass Background to show Grid) */}
        <div className="bg-brand-bg/95 backdrop-blur-xl border-t border-brand-dark/10 min-h-screen relative shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto px-4 py-24">
                
                {/* 2. SPLIT LAYOUT */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                    
                    {/* LEFT: STICKY TECH SPECS */}
                    <div className="lg:w-4/12">
                        <div className="lg:sticky lg:top-32 space-y-12">
                            
                            {/* Project Description */}
                            <div>
                                <h3 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-8 h-px bg-brand-orange"></span> {t("Projekt", "Project", "Projet")}
                                </h3>
                                <p className="text-xl text-brand-muted leading-relaxed font-light mb-6">
                                    {project.description}
                                </p>
                                {project.longDescription && (
                                    <div className="space-y-4 text-base text-brand-muted leading-relaxed">
                                        {project.longDescription.map((paragraph, i) => (
                                            <p key={i}>{paragraph}</p>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Tech Specs Table */}
                            <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-lg p-6">
                                <h3 className="text-xs font-bold text-brand-dark uppercase tracking-widest mb-6 border-b border-brand-dark/10 pb-4">
                                    {t("Projektdaten", "Project data", "Données du projet")}
                                </h3>
                                <dl className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-brand-muted font-mono uppercase">{t("Typ", "Type", "Type")}</dt>
                                        <dd className="text-brand-dark font-bold">{kategorie(project.category)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-brand-muted font-mono uppercase">{t("Material", "Material", "Matériau")}</dt>
                                        <dd className="text-brand-dark font-bold">{t("Beton C35/45", "Concrete C35/45", "Béton C35/45")}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Products Used */}
                            <div>
                                <h3 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-4">
                                    {t("Verbaute Systeme", "Systems used", "Systèmes utilisés")}
                                </h3>
                                <ul className="space-y-2">
                                    {project.productsUsed.map((prod, idx) => (
                                        <li key={idx}>
                                            <Link
                                                to={prod.path}
                                                className="group flex items-center justify-between p-3 bg-brand-surface/60 hover:bg-brand-orange hover:text-white border border-brand-dark/5 rounded transition-all duration-300"
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
                                className="flex items-center gap-3 text-xs font-bold text-brand-muted hover:text-brand-dark uppercase tracking-widest transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">{isCopied ? 'check' : 'share'}</span>
                                {isCopied ? t("Link kopiert", "Link copied", "Lien copié") : t("Projekt teilen", "Share project", "Partager le projet")}
                            </button>

                        </div>
                    </div>

                    {/* RIGHT: MASONRY GALLERY */}
                    <div className="lg:w-8/12">
                         <h3 className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-8 flex items-center gap-2">
                            <span className="w-8 h-px bg-brand-orange"></span> {t("Bilder", "Images", "Images")}
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[300px]">
                            {/* Main Large Image */}
                             <div className="md:col-span-2 row-span-2 relative group overflow-hidden rounded-sm border border-brand-dark/10 bg-brand-surface/60">
                                <Bild sizes="(min-width: 1024px) 60vw, 100vw"
                                    src={project.imageUrl}
                                    alt={`${project.title}, ${t('Projektübersicht', 'project overview', 'vue d\'ensemble du projet')}`}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-4 bg-black/80 px-2 py-1 text-[10px] font-mono text-white">{t("Abb. 1: Übersicht", "Fig. 1: Overview", "Fig. 1 : vue d'ensemble")}</div>
                             </div>

                             {/* Gallery Images */}
                             {project.images.map((img, idx) => (
                                 <div
                                    key={idx}
                                    className={`relative group overflow-hidden rounded-sm border border-brand-dark/10 bg-brand-surface/60 ${idx % 3 === 0 ? 'md:col-span-2' : ''}`}
                                 >
                                    <img
                                        src={img}
                                        alt={`${project.title}, ${t('Bild', 'image', 'image')} ${idx + 2}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-4 left-4 bg-black/80 px-2 py-1 text-[10px] font-mono text-white">{t('Abb.', 'Fig.', 'Fig.')} {idx + 2}</div>
                                 </div>
                             ))}
                        </div>

                         {/* CTA at bottom of gallery */}
                        <div className="mt-24 pt-12 border-t border-brand-dark/10">
                             <div className="bg-brand-surface/60 p-8 md:p-12 rounded-xl border border-brand-dark/5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                                <h3 className="text-3xl font-extrabold font-heading text-brand-dark uppercase mb-4">{t("Ein ähnliches Projekt?", "A similar project?", "Un projet similaire ?")}</h3>
                                <p className="text-brand-muted mb-8 max-w-lg mx-auto">{t("Planen Sie ein ähnliches Projekt? Wir unterstützen Sie von der ersten Skizze bis zur Fertigstellung.", "Planning a similar project? We support you from the first sketch to completion.", "Vous prévoyez un projet similaire ? Nous vous accompagnons de la première esquisse à la livraison.")}</p>
                                <Link to="/kontakt" className="inline-block bg-brand-orange text-white font-bold uppercase tracking-widest py-4 px-8 rounded hover:bg-brand-dark transition-colors">
                                    {t("Projekt anfragen", "Enquire about your project", "Parlez-nous de votre projet")}
                                </Link>
                             </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* 3. NEXT PROJECT NAV - Transparent BG */}
            <div className="grid grid-cols-2 border-t border-brand-dark/10 bg-brand-surface/60">
                <Link to={`/projekte/${prevProject.id}`} className="group block p-12 border-r border-brand-dark/10 hover:bg-brand-surface transition-colors text-right relative overflow-hidden">
                     <span className="block text-xs font-mono text-brand-muted uppercase tracking-widest mb-2 group-hover:text-brand-orange transition-colors">{t("Vorheriges", "Previous", "Précédent")}</span>
                     <span className="block text-2xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter group-hover:translate-x-[-10px] transition-transform">{prevProject.title}</span>
                </Link>
                <Link to={`/projekte/${nextProject.id}`} className="group block p-12 hover:bg-brand-surface transition-colors relative overflow-hidden">
                     <span className="block text-xs font-mono text-brand-muted uppercase tracking-widest mb-2 group-hover:text-brand-orange transition-colors">{t("Nächstes", "Next", "Suivant")}</span>
                     <span className="block text-2xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter group-hover:translate-x-[10px] transition-transform">{nextProject.title}</span>
                </Link>
            </div>

        </div>
      </div>
    </PageShell>
  );
};

export default ProjectDetailPage;