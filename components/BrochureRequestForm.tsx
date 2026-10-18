import React from 'react';
import { Link, useT } from '../i18n';

const CTA_TARGET = '/kontakt?projectType=Katalog';

const BrochureRequestForm: React.FC<{ context: 'homepage' | 'productpage' }> = ({ context }) => {
    const t = useT();
    const isHomepage = context === 'homepage';

    const TechCatalogVisual = () => (
        <div className="relative w-72 h-[400px] mx-auto lg:mx-0 mt-12 lg:mt-0 perspective-1000 group">
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

            <div className="relative z-10 w-full h-full bg-brand-dark border border-brand-dark/20 p-2 shadow-2xl transition-transform duration-500 transform group-hover:rotate-y-6 group-hover:rotate-x-6 overflow-hidden rounded-sm">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-orange z-20"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-orange z-20"></div>

                <div className="relative w-full h-full bg-brand-dark/90 overflow-hidden group-hover:bg-brand-dark/80 transition-colors">
                    <img
                        src="/images/branding/katalog-cover.jpg"
                        alt={t('Deckblatt Katalog 2026: Skate-Elemente aus Beton', 'Cover of the 2026 catalogue: concrete skate elements', 'Couverture du catalogue 2026 : éléments de skate en béton')}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-orange/20 to-transparent h-[20%] w-full animate-[scan_3s_linear_infinite] pointer-events-none mix-blend-screen border-b border-brand-orange/50"></div>
                </div>
            </div>

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
            <section id="katalog" className="relative py-24 bg-brand-surface overflow-hidden border-y border-brand-dark/5">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#6B8F4A 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-bg to-transparent opacity-80"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        <div className="lg:col-span-7 text-left order-2 lg:order-1">
                            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                                {t('Katalog anfordern', 'Request the catalogue', 'Demander le catalogue')}
                            </span>

                            <h2 className="text-5xl md:text-7xl font-extrabold font-heading uppercase tracking-tighter leading-[0.9] mb-6">
                                <span className="text-brand-dark">{t('Unser', 'Our', 'Notre')}</span> <br/>
                                <span className="text-brand-orange">{t('Katalog', 'Catalogue', 'Catalogue')}</span>
                            </h2>

                            <p className="text-lg text-brand-muted mb-8 max-w-xl leading-relaxed">
                                {t('Unser Katalog enthält alle Elemente mit Maßen, Beispielkombinationen und Normhinweisen sowie die Montage- und Wartungsanleitung.', 'Our catalogue lists every element with dimensions, example combinations and notes on standards, plus the installation and maintenance instructions.', "Notre catalogue présente tous les éléments avec leurs dimensions, des exemples de combinaisons et des indications sur les normes, ainsi que les instructions de montage et d'entretien.")}
                            </p>

                            <Link
                                to={CTA_TARGET}
                                className="inline-flex items-center gap-2 py-4 px-8 bg-brand-orange hover:bg-brand-dark text-white font-extrabold uppercase tracking-widest text-sm rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(107,143,74,0.4)] group"
                            >
                                {t('Katalog anfordern', 'Request the catalogue', 'Demander le catalogue')}
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>

                            <p className="mt-4 text-xs text-brand-muted max-w-md">
                                {t('Ein Klick öffnet Ihr E-Mail-Programm mit einer vorbereiteten Nachricht. Wir schicken den Katalog persönlich zu.', 'One click opens your email program with a prepared message. We send the catalogue to you personally.', 'Un clic ouvre votre messagerie avec un message prérempli. Nous vous envoyons le catalogue personnellement.')}
                            </p>
                        </div>

                        <div className="lg:col-span-5 flex justify-center lg:justify-end relative order-1 lg:order-2">
                            <TechCatalogVisual />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <div className="mt-12 p-1 bg-gradient-to-b from-brand-dark/10 to-transparent rounded-2xl">
            <div className="bg-white rounded-xl p-8 border border-brand-dark/10 relative overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                <h3 className="text-2xl font-extrabold font-heading text-brand-dark uppercase mb-2">{t('Produktkatalog', 'Product catalogue', 'Catalogue produit')}</h3>
                <p className="text-sm text-brand-muted mb-6 leading-relaxed">
                    {t('Alle technischen Daten, Maße und Zertifikate zu diesem Produkt. Ein Klick öffnet Ihr E-Mail-Programm mit einer vorbereiteten Anfrage. Wir schicken den Katalog persönlich zu.', 'All technical data, dimensions and certificates for this product. One click opens your email program with a prepared enquiry. We send the catalogue to you personally.', 'Toutes les données techniques, dimensions et certificats de ce produit. Un clic ouvre votre messagerie avec une demande préremplie. Nous vous envoyons le catalogue personnellement.')}
                </p>

                <Link
                    to={CTA_TARGET}
                    className="w-full py-3 bg-white hover:bg-brand-orange text-black hover:text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group border border-brand-dark/10"
                >
                    {t('Katalog anfordern', 'Request the catalogue', 'Demander le catalogue')}
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </Link>
            </div>
        </div>
    );
};

export default BrochureRequestForm;
