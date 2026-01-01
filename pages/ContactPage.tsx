import React, { useState } from 'react';
import PageShell from '../components/PageShell';

type ProjectType = 'Skatepark' | 'Pumptrack' | 'Möblierung' | 'Sonstiges';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '',
        message: '' 
    });
    const [projectType, setProjectType] = useState<ProjectType>('Skatepark');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
             console.log('Form submitted:', { ...formData, projectType });
             setStatus('success');
        }, 1500);
    };

    const inputClasses = "w-full bg-black/30 border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange focus:placeholder-gray-500 transition-all duration-300 font-sans backdrop-blur-sm rounded-t px-2";
    const labelClasses = "block text-xs font-mono text-brand-orange uppercase tracking-widest mb-1";

    return (
        <PageShell title="Kontakt & Anfrage">
            <div className="relative w-full min-h-[80vh] flex flex-col justify-center">
                
                {/* Header Text */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-6xl md:text-8xl font-black font-heading uppercase tracking-tighter text-white">
                        Gemeinsam<br/><span className="text-brand-orange">Planen.</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        Bereit für das nächste Projekt? Erzählen Sie uns von Ihrer Vision. <br/>
                        Wir liefern die passende Beton-Lösung.
                    </p>
                </div>

                {/* Main Split Interface */}
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
                    
                    {/* LEFT COLUMN: CONTACT INFO & MAP PLACEHOLDER */}
                    <div className="lg:col-span-5 order-2 lg:order-1 animate-fade-in-up [animation-delay:200ms]">
                        {/* CHANGED: bg-brand-surface -> bg-black/40 with blur */}
                        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 h-full flex flex-col justify-between relative overflow-hidden group rounded-lg shadow-2xl">
                             {/* Decorative Glow */}
                             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-orange/10 rounded-full blur-[80px] pointer-events-none"></div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Planungsbüro</h3>
                                <div className="space-y-8 font-light text-gray-300">
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-brand-orange mt-1">location_on</span>
                                        <div>
                                            <p className="font-bold text-white">A+ Urban Design</p>
                                            <p>Dipl.-Ing. Cüneyit Akcakoca</p>
                                            <p className="text-sm">Freier Architekt</p>
                                            <p className="mt-2">Talstrasse 41</p>
                                            <p>70188 Stuttgart</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group/link">
                                        <span className="material-symbols-outlined text-brand-orange group-hover/link:scale-110 transition-transform">call</span>
                                        <a href="tel:+4915560090966" className="hover:text-white transition-colors">+49 155 600 909 66</a>
                                    </div>
                                    <div className="flex items-center gap-4 group/link">
                                        <span className="material-symbols-outlined text-brand-orange group-hover/link:scale-110 transition-transform">mail</span>
                                        <a href="mailto:post@aplusurbandesign.com" className="hover:text-white transition-colors">post@aplusurbandesign.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: INTERACTIVE FORM */}
                    <div className="lg:col-span-7 order-1 lg:order-2 animate-fade-in-up [animation-delay:400ms]">
                        {status === 'success' ? (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 p-12 text-center animate-pop-in rounded-lg">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-4xl text-green-500">check</span>
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4">Nachricht gesendet!</h3>
                                <p className="text-gray-400 max-w-md">
                                    Vielen Dank für Ihre Anfrage. Unser Team wird Ihre Projektdaten analysieren und sich innerhalb von 48 Stunden bei Ihnen melden.
                                </p>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="mt-8 text-sm font-bold text-brand-orange hover:text-white uppercase tracking-widest underline decoration-dotted"
                                >
                                    Neue Anfrage senden
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 bg-black/40 backdrop-blur-md p-8 md:p-12 border border-white/5 rounded-lg shadow-2xl">
                                
                                {/* Project Type Selector */}
                                <div>
                                    <label className={labelClasses}>Worum geht es?</label>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        {(['Skatepark', 'Pumptrack', 'Möblierung', 'Sonstiges'] as ProjectType[]).map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setProjectType(type)}
                                                className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${
                                                    projectType === type 
                                                    ? 'bg-brand-orange border-brand-orange text-black shadow-[0_0_20px_rgba(249,115,22,0.4)]' 
                                                    : 'bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white hover:bg-white/5'
                                                }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label htmlFor="name" className={labelClasses}>Name / Institution</label>
                                        <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={inputClasses} placeholder="Max Mustermann" />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="phone" className={labelClasses}>Telefon (Optional)</label>
                                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="+49 ..." />
                                    </div>
                                </div>

                                <div className="group">
                                    <label htmlFor="email" className={labelClasses}>E-Mail Adresse</label>
                                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="name@firma.de" />
                                </div>

                                <div className="group">
                                    <label htmlFor="message" className={labelClasses}>Projektdetails</label>
                                    <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Standort, ungefähre Fläche, Budgetrahmen oder spezielle Wünsche..."></textarea>
                                </div>

                                <div className="pt-4">
                                    <button 
                                        type="submit" 
                                        disabled={status === 'loading'}
                                        className="w-full md:w-auto px-12 py-4 bg-white hover:bg-brand-orange text-black font-black uppercase tracking-widest text-sm rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-xl disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2 group"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                                                Sende...
                                            </>
                                        ) : (
                                            <>
                                                Anfrage Absenden <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                            </>
                                        )}
                                    </button>
                                    <p className="mt-4 text-[10px] text-gray-500">
                                        Mit dem Absenden akzeptieren Sie unsere <a href="/datenschutz" className="underline hover:text-brand-orange">Datenschutzerklärung</a>.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </PageShell>
    );
};

export default ContactPage;