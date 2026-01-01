import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'a-plus-urban-design-privacy-consent';

const PrivacyBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Default preferences
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
        marketing: false
    });

    useEffect(() => {
        const consent = localStorage.getItem(CONSENT_KEY);
        if (!consent) {
            setIsVisible(true);
        }

        const showSettingsHandler = () => {
            setIsVisible(true);
        };
        
        window.addEventListener('showPrivacySettings', showSettingsHandler);

        return () => {
            window.removeEventListener('showPrivacySettings', showSettingsHandler);
        };
    }, []);

    const handleAcceptAll = () => {
        const consent = { necessary: true, analytics: true, marketing: true, timestamp: new Date().toISOString() };
        localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
        setIsVisible(false);
        setIsModalOpen(false);
    };

    const handleDeclineAll = () => {
        const consent = { necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() };
        localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
        setIsVisible(false);
        setIsModalOpen(false);
    };

    const handleSavePreferences = () => {
        const consent = { ...preferences, timestamp: new Date().toISOString() };
        localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
        setIsVisible(false);
        setIsModalOpen(false);
    };
    
    const togglePreference = (key: 'analytics' | 'marketing') => {
        setPreferences(prev => ({...prev, [key]: !prev[key]}));
    }

    if (!isVisible) {
        return null;
    }

    return (
        <>
            {/* Main Banner */}
            <div role="region" aria-label="Cookie Consent Banner" className="fixed bottom-0 left-0 right-0 bg-brand-surface/95 backdrop-blur-md p-6 border-t border-white/10 z-50 animate-[fade-in-up_0.5s_ease-out]">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold text-brand-heading">Datenschutzeinstellungen</h3>
                        <p className="text-sm text-brand-muted mt-1 max-w-2xl">
                            Wir nutzen Cookies und externe Dienste. Einige sind essenziell, andere helfen uns, die Website zu verbessern. 
                            <Link to="/datenschutz" className="underline hover:text-brand-orange ml-1">Datenschutzerklärung</Link>.
                        </p>
                    </div>
                    {/* Unified Button Styles: rounded-lg */}
                    <div className="flex-shrink-0 flex flex-wrap items-center gap-3 justify-center">
                        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm font-bold border border-white/20 hover:bg-white/10 rounded-lg transition-colors text-gray-300 uppercase tracking-wide">
                            Einstellungen
                        </button>
                        <button onClick={handleDeclineAll} className="px-4 py-2 text-sm font-bold border border-white/20 hover:bg-white/10 rounded-lg transition-colors text-white uppercase tracking-wide">
                            Nur Essenzielle
                        </button>
                        <button onClick={handleAcceptAll} className="px-6 py-2 text-sm font-bold bg-brand-orange text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-lg shadow-brand-orange/20 uppercase tracking-wide">
                            Alle akzeptieren
                        </button>
                    </div>
                </div>
            </div>

            {/* Preferences Modal */}
            {isModalOpen && (
                 <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-[fade-in-up_0.3s_ease-out]">
                    <div role="dialog" aria-modal="true" aria-labelledby="privacy-modal-title" className="bg-brand-surface rounded-xl shadow-2xl w-full max-w-lg m-4 border border-white/10">
                        <div className="p-6 border-b border-white/10">
                            <h2 id="privacy-modal-title" className="text-xl font-bold text-brand-heading">Datenschutz-Einstellungen anpassen</h2>
                            <p className="text-sm text-brand-muted mt-1">Entscheiden Sie selbst, welche Daten wir nutzen dürfen.</p>
                        </div>
                        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {/* Necessary Cookies */}
                            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                <div>
                                    <h3 className="font-bold text-brand-text">Technisch notwendig</h3>
                                    <p className="text-xs text-brand-muted mt-1">Essenziell für die Grundfunktionen (z.B. diese Einwilligung).</p>
                                </div>
                                <div className="relative inline-block w-10 ml-2 align-middle select-none">
                                    <input type="checkbox" checked readOnly disabled className="appearance-none"/>
                                    <div className="block overflow-hidden h-6 rounded-full bg-brand-orange/50 cursor-not-allowed w-10 relative">
                                        <div className="absolute right-0 top-0 w-6 h-6 bg-brand-orange rounded-full border-2 border-brand-surface"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Analytics Cookies */}
                            <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                                 <div>
                                    <h3 className="font-bold text-brand-text">Statistik & Analyse</h3>
                                    <p className="text-xs text-brand-muted mt-1">Helfen uns zu verstehen, wie die Seite genutzt wird (anonym).</p>
                                </div>
                                 <button
                                    type="button"
                                    role="switch"
                                    aria-checked={preferences.analytics}
                                    onClick={() => togglePreference('analytics')}
                                    className="relative inline-block w-10 ml-2 align-middle select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-orange rounded-full"
                                >
                                    <span className="block overflow-hidden h-6 rounded-full bg-gray-700"></span>
                                    <span className={`${preferences.analytics ? 'right-0 bg-brand-orange' : 'right-4 bg-gray-400'} pointer-events-none absolute block w-6 h-6 rounded-full border-4 border-brand-surface top-0 transform transition-all duration-200 ease-in`}></span>
                                </button>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                                 <div>
                                    <h3 className="font-bold text-brand-text">Marketing & Externe Medien</h3>
                                    <p className="text-xs text-brand-muted mt-1">Ermöglicht das Laden externer Inhalte (z.B. Videos) und Anzeigen.</p>
                                </div>
                                 <button
                                    type="button"
                                    role="switch"
                                    aria-checked={preferences.marketing}
                                    onClick={() => togglePreference('marketing')}
                                    className="relative inline-block w-10 ml-2 align-middle select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-orange rounded-full"
                                >
                                    <span className="block overflow-hidden h-6 rounded-full bg-gray-700"></span>
                                    <span className={`${preferences.marketing ? 'right-0 bg-brand-orange' : 'right-4 bg-gray-400'} pointer-events-none absolute block w-6 h-6 rounded-full border-4 border-brand-surface top-0 transform transition-all duration-200 ease-in`}></span>
                                </button>
                            </div>
                        </div>
                        <div className="p-4 bg-brand-bg/50 border-t border-white/10 flex justify-end gap-3 rounded-b-xl">
                            <button onClick={handleDeclineAll} className="px-4 py-2 text-sm font-bold border border-white/10 hover:bg-white/10 rounded-lg transition-colors text-gray-300 uppercase tracking-wide">
                                Alle ablehnen
                            </button>
                            <button onClick={handleSavePreferences} className="px-6 py-2 text-sm font-bold bg-brand-orange text-white rounded-lg hover:bg-opacity-90 transition-colors uppercase tracking-wide">
                                Auswahl speichern
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PrivacyBanner;