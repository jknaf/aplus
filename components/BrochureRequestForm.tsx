import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BrochureRequestForm: React.FC<{ context: 'homepage' | 'productpage' }> = ({ context }) => {
    const [email, setEmail] = useState('');
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!privacyAccepted) {
            setStatus('error');
            setMessage('Bitte akzeptieren Sie die Datenschutzbestimmungen, um fortzufahren.');
            return;
        }

        if (!email || status === 'loading') return;

        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch('https://trkmuc.app.n8n.cloud/webhook/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.trim(), privacyAccepted: true }),
            });

            if (!response.ok) {
                throw new Error('Fehler beim Senden der Anfrage. Bitte versuchen Sie es später erneut.');
            }

            setStatus('success');
            setMessage('Vielen Dank! Der Katalog ist auf dem Weg in Ihr Postfach.');
            setEmail('');
            setPrivacyAccepted(false);

        } catch (error) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten.');
        }
    };

    const isHomepage = context === 'homepage';

    const feedbackContainer = (
        <div 
          role="alert" 
          aria-live="assertive"
          className={`
            ${status === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg text-left text-sm' : ''}
            ${status === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg text-left text-sm mt-4' : ''}
          `}
        >
          <p className="font-bold flex items-center gap-2">
            {status === 'success' && <span className="material-symbols-outlined">check_circle</span>}
            {status === 'error' && <span className="material-symbols-outlined">error</span>}
            {message}
          </p>
        </div>
    );

    // NEW: "Digital Tech / Blueprint" Visualization
    // Focuses on "Data", "Planning" and "Technical Precision" instead of a physical book.
    const TechCatalogVisual = () => (
        <div className="relative w-72 h-96 mx-auto lg:mx-0 mt-12 lg:mt-0 perspective-1000 group">
            
            {/* 1. Abstract 3D Wireframe Background (Rotating Cube) */}
            {/* This represents the "3D Planning" aspect behind the catalog */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none z-0">
                <div className="relative w-full h-full animate-[spin_10s_linear_infinite] transform-style-3d opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                     <div className="absolute inset-0 border-2 border-brand-orange/50 transform translate-z-[32px]"></div>
                     <div className="absolute inset-0 border-2 border-brand-orange/50 transform translate-z-[-32px]"></div>
                     <div className="absolute inset-0 border-2 border-brand-orange/50 transform rotate-x-90 translate-z-[32px]"></div>
                     <div className="absolute inset-0 border-2 border-brand-orange/50 transform rotate-x-90 translate-z-[-32px]"></div>
                     <div className="absolute inset-0 border-2 border-brand-orange/50 transform rotate-y-90 translate-z-[32px]"></div>
                     <div className="absolute inset-0 border-2 border-brand-orange/50 transform rotate-y-90 translate-z-[-32px]"></div>
                </div>
            </div>

            {/* 2. The Main "Digital File" Card */}
            <div className="relative z-10 w-full h-full bg-[#0a0a0a] border border-white/20 p-2 shadow-2xl transition-transform duration-500 transform group-hover:rotate-y-6 group-hover:rotate-x-6 overflow-hidden rounded-sm">
                
                {/* HUD Elements (Corners) */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-orange z-20"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-orange z-20"></div>

                {/* Inner Content Container */}
                <div className="relative w-full h-full bg-[#151515] overflow-hidden group-hover:bg-[#1a1a1a] transition-colors">
                    
                    {/* The Catalog Cover Image */}
                    <img 
                        src="https://img.yumpu.com/1909210/1/500x640/skatepark-a-urban-design.jpg" 
                        alt="A+ Urban Design Catalog Cover" 
                        className="w-full h-full object-cover opacity-80 mix-blend-normal filter contrast-125 grayscale group-hover:grayscale-0 transition-all duration-700"
                    />

                    {/* Scanning Line Animation */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-orange/20 to-transparent h-[20%] w-full animate-[scan_3s_linear_infinite] pointer-events-none mix-blend-screen border-b border-brand-orange/50"></div>
                    
                    {/* Data Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4 border-t border-white/10 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-brand-orange tracking-widest uppercase">Datei</span>
                            <span className="text-white font-bold text-xs">PDF DOCUMENT</span>
                        </div>
                         <div className="flex flex-col text-right">
                            <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">Größe</span>
                            <span className="text-white font-bold text-xs">~12 MB</span>
                        </div>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-30 bg-black/60 px-2 py-1 rounded backdrop-blur-md border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-mono text-white uppercase tracking-wider">Available</span>
                </div>
            </div>

            {/* Reflection/Glow */}
            <div className="absolute -bottom-8 left-0 right-0 h-4 bg-brand-orange/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[100%]"></div>

            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                @keyframes scan {
                    0% { top: -20%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 120%; opacity: 0; }
                }
            `}</style>
        </div>
    );

    if (isHomepage) {
        return (
            <section id="katalog" className="relative py-24 bg-brand-surface overflow-hidden border-y border-white/5">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#F97316 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-bg to-transparent opacity-80"></div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        
                        {/* Text & Form Column */}
                        <div className="lg:col-span-7 text-left order-2 lg:order-1">
                            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                                Kostenloser Download
                            </span>
                            
                            {/* TYPOGRAPHY SWAP: Outline 'Unser' (Industrial), Solid 'Katalog' (Readable) */}
                            <h2 className="text-5xl md:text-7xl font-black font-heading uppercase tracking-tighter leading-[0.9] mb-6">
                                <span className="text-transparent text-outline-bold">Unser</span> <br/>
                                <span className="text-white">Katalog.</span>
                            </h2>
                            
                            <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
                                Planen Sie Ihr nächstes Projekt mit allen Details zur Hand. Unser Katalog enthält technische Zeichnungen, Ausschreibungstexte und inspirierende Case Studies unserer Beton-Skateparks und Stadtmöbel.
                            </p>
                            
                            {status === 'success' ? feedbackContainer : (
                                <form onSubmit={handleSubmit} className="max-w-md">
                                    <div className="space-y-4">
                                        <div className="relative group">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-orange to-brand-orange/50 rounded-lg blur opacity-20 group-focus-within:opacity-75 transition duration-500"></div>
                                            <input
                                                type="email"
                                                id="brochure-email-home"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Ihre geschäftliche E-Mail-Adresse"
                                                required
                                                className="relative w-full px-6 py-4 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-orange transition-all shadow-xl"
                                            />
                                        </div>

                                        {/* GDPR Checkbox */}
                                        <div className="flex items-start gap-3 mt-4 group cursor-pointer" onClick={() => setPrivacyAccepted(!privacyAccepted)}>
                                            <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${privacyAccepted ? 'bg-brand-orange border-brand-orange' : 'bg-transparent border-gray-600 group-hover:border-gray-500'}`}>
                                                {privacyAccepted && <span className="material-symbols-outlined text-black text-sm font-bold">check</span>}
                                            </div>
                                            <p className="text-xs text-gray-500 leading-snug">
                                                Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden. Sie können unsere <Link to="/datenschutz" className="underline hover:text-brand-orange" onClick={(e) => e.stopPropagation()}>Datenschutzerklärung</Link> hier einsehen.
                                            </p>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full py-4 px-8 bg-brand-orange hover:bg-white text-black font-black uppercase tracking-widest text-sm rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(249,115,22,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2 group"
                                        >
                                            {status === 'loading' ? 'Wird verarbeitet...' : 'Katalog jetzt anfordern'} <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">download</span>
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Visual Column */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end relative order-1 lg:order-2">
                            <TechCatalogVisual />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    
    // Product Page Version (Sidebar)
    return (
        <div className="mt-12 p-1 bg-gradient-to-b from-white/10 to-transparent rounded-2xl">
            <div className="bg-[#121212] rounded-xl p-8 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                
                <h3 className="text-2xl font-black font-heading text-white uppercase mb-2">Produktkatalog</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    Alle technischen Daten, Maße und Zertifikate zu diesem Produkt in einer Datei.
                </p>

                {status === 'success' ? feedbackContainer : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                             <input
                                type="email"
                                id="brochure-email-product"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-Mail-Adresse"
                                required
                                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange transition-colors text-sm"
                            />
                        </div>
                        
                         {/* GDPR Checkbox Small */}
                        <div className="flex items-start gap-2 cursor-pointer" onClick={() => setPrivacyAccepted(!privacyAccepted)}>
                             <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${privacyAccepted ? 'bg-brand-orange border-brand-orange' : 'bg-transparent border-gray-700'}`}>
                                {privacyAccepted && <span className="material-symbols-outlined text-black text-[10px] font-bold">check</span>}
                            </div>
                            <p className="text-[10px] text-gray-500 leading-tight">
                                Datenschutz akzeptieren. <Link to="/datenschutz" className="underline" onClick={(e) => e.stopPropagation()}>Infos</Link>.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-3 bg-white hover:bg-brand-orange text-black hover:text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            {status === 'loading' ? '...' : 'Jetzt herunterladen'} <span className="material-symbols-outlined text-sm group-hover:translate-y-0.5 transition-transform">download</span>
                        </button>
                    </form>
                )}
                 <div className="mt-4 text-center">
                    {status === 'error' && feedbackContainer}
                </div>
            </div>
        </div>
    );
};

export default BrochureRequestForm;