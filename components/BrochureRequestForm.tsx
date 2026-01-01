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

    // Modern "Digital Slate / Tech Tablet" Mockup
    const CatalogMockup = () => (
        <div className="relative group w-64 h-80 md:w-72 md:h-96 mx-auto lg:mx-0 perspective-1000">
            {/* Main Floating Slab */}
            <div className="relative w-full h-full bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,1)] transition-transform duration-500 ease-out transform group-hover:rotate-y-6 group-hover:rotate-x-6 group-hover:scale-105">
                
                {/* Tech Grid Background */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                
                {/* Scanline Animation */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-orange/10 to-transparent h-[150%] w-full animate-scan pointer-events-none"></div>

                {/* Content Layout */}
                <div className="relative h-full flex flex-col justify-between p-6 z-10">
                    
                    {/* Header Tech Details */}
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono text-brand-orange tracking-widest border border-brand-orange/30 px-1 rounded-sm">CONFIDENTIAL</span>
                            <span className="text-[10px] font-mono text-gray-500">REF: A-PLUS-CAT-V4</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm">qr_code_2</span>
                        </div>
                    </div>

                    {/* Main Title Area */}
                    <div>
                        <div className="w-12 h-12 mb-4 bg-brand-orange flex items-center justify-center rounded-lg shadow-lg shadow-brand-orange/20">
                            <span className="material-symbols-outlined text-black font-bold text-2xl">folder_open</span>
                        </div>
                        <h3 className="text-3xl font-black font-heading text-white leading-none tracking-tighter uppercase mb-1">
                            Produkt
                        </h3>
                        <h3 className="text-3xl font-black font-heading text-transparent text-outline-bold leading-none tracking-tighter uppercase">
                            Katalog
                        </h3>
                    </div>

                    {/* Footer Stats */}
                    <div className="space-y-3">
                         <div className="h-px w-full bg-gradient-to-r from-brand-orange/50 to-transparent"></div>
                         <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400">
                             <div>
                                 <span className="block text-gray-600">FORMAT</span>
                                 <span className="text-white">PDF / DIGITAL</span>
                             </div>
                             <div>
                                 <span className="block text-gray-600">SIZE</span>
                                 <span className="text-white">24.5 MB</span>
                             </div>
                             <div>
                                 <span className="block text-gray-600">UPDATED</span>
                                 <span className="text-white">{new Date().getFullYear()}</span>
                             </div>
                             <div>
                                 <span className="block text-gray-600">ACCESS</span>
                                 <span className="text-brand-orange">UNRESTRICTED</span>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-orange opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-orange opacity-50"></div>
            </div>

            {/* Glowing Backlight Blob */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-orange/20 rounded-full blur-[60px] -z-10 animate-pulse-slow pointer-events-none"></div>
            
             <style>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
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
                        <div className="lg:col-span-7 text-left">
                            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                                Kostenloser Download
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter leading-[0.9] mb-6">
                                Unser <br/>
                                <span className="text-outline-orange">Katalog.</span>
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
                        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
                            <CatalogMockup />
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