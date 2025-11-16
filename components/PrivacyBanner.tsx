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
            <div role="region" aria-label="Cookie Consent Banner" className="fixed bottom-0 left-0 right-0 bg-brand-surface/95 backdrop-blur-sm p-6 border-t border-white/10 z-50 animate-[fade-in-up_0.5s_ease-out]">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold text-brand-heading">Ihre Privatsphäre ist uns wichtig</h3>
                        <p className="text-sm text-brand-muted mt-1 max-w-2xl">
                            Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Einige Cookies sind für den Betrieb der Website unerlässlich. Mit Ihrer Zustimmung verwenden wir auch Cookies für Analyse- und Marketingzwecke. Weitere Informationen finden Sie in unserer <Link to="/datenschutz" className="underline hover:text-brand-orange">Datenschutzerklärung</Link>.
                        </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm font-bold bg-brand-bg hover:bg-white/10 rounded-md transition-colors">
                            Anpassen
                        </button>
                        <button onClick={handleDeclineAll} className="px-4 py-2 text-sm font-bold bg-brand-bg hover:bg-white/10 rounded-md transition-colors">
                            Nur notwendige
                        </button>
                        <button onClick={handleAcceptAll} className="px-6 py-2 text-sm font-bold bg-brand-orange text-white rounded-md hover:bg-opacity-90 transition-colors">
                            Alle akzeptieren
                        </button>
                    </div>
                </div>
            </div>

            {/* Preferences Modal */}
            {isModalOpen && (
                 <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] animate-[fade-in-up_0.3s_ease-out]">
                    <div role="dialog" aria-modal="true" aria-labelledby="privacy-modal-title" className="bg-brand-surface rounded-lg shadow-2xl w-full max-w-lg m-4">
                        <div className="p-6 border-b border-white/10">
                            <h2 id="privacy-modal-title" className="text-xl font-bold text-brand-heading">Datenschutz-Einstellungen</h2>
                            <p className="text-sm text-brand-muted mt-1">Passen Sie hier Ihre Cookie-Einstellungen an. Sie können Ihre Auswahl jederzeit im Footer ändern.</p>
                        </div>
                        <div className="p-6 space-y-4">
                            {/* Necessary Cookies */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-brand-text">Notwendige Cookies</h3>
                                    <p className="text-xs text-brand-muted">Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.</p>
                                </div>
                                <div className="relative inline-block w-10 ml-2 align-middle select-none">
                                    <input type="checkbox" checked readOnly disabled className="checked:bg-brand-orange outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-gray-600 border-4 appearance-none cursor-not-allowed"/>
                                    <label className="block overflow-hidden h-6 rounded-full bg-gray-800 cursor-not-allowed"></label>
                                </div>
                            </div>
                            
                            {/* Analytics Cookies */}
                            <div className="flex justify-between items-center">
                                 <div>
                                    <h3 className="font-bold text-brand-text">Analyse-Cookies</h3>
                                    <p className="text-xs text-brand-muted">Helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem sie anonym Informationen sammeln.</p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={preferences.analytics}
                                    onClick={() => togglePreference('analytics')}
                                    className="relative inline-block w-10 ml-2 align-middle select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-orange rounded-full"
                                >
                                    <span className="block overflow-hidden h-6 rounded-full bg-gray-800"></span>
                                    <span className={`${preferences.analytics ? 'right-0 bg-brand-orange' : 'right-4 bg-gray-600'} pointer-events-none absolute block w-6 h-6 rounded-full border-4 border-brand-surface top-0 transform transition-all duration-200 ease-in`}></span>
                                    <span className="sr-only">Analyse-Cookies an/aus schalten</span>
                                </button>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="flex justify-between items-center">
                                 <div>
                                    <h3 className="font-bold text-brand-text">Marketing-Cookies</h3>
                                    <p className="text-xs text-brand-muted">Werden verwendet, um Besuchern relevante Anzeigen und Marketingkampagnen zu präsentieren.</p>
                                </div>
                                 <button
                                    type="button"
                                    role="switch"
                                    aria-checked={preferences.marketing}
                                    onClick={() => togglePreference('marketing')}
                                    className="relative inline-block w-10 ml-2 align-middle select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-orange rounded-full"
                                >
                                    <span className="block overflow-hidden h-6 rounded-full bg-gray-800"></span>
                                    <span className={`${preferences.marketing ? 'right-0 bg-brand-orange' : 'right-4 bg-gray-600'} pointer-events-none absolute block w-6 h-6 rounded-full border-4 border-brand-surface top-0 transform transition-all duration-200 ease-in`}></span>
                                    <span className="sr-only">Marketing-Cookies an/aus schalten</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-4 bg-brand-bg/50 border-t border-white/10 flex justify-end gap-3">
                            <button onClick={handleDeclineAll} className="px-4 py-2 text-sm font-bold bg-brand-bg hover:bg-white/10 rounded-md transition-colors">
                                Alle ablehnen
                            </button>
                            <button onClick={handleSavePreferences} className="px-6 py-2 text-sm font-bold bg-brand-orange text-white rounded-md hover:bg-opacity-90 transition-colors">
                                Einstellungen speichern
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PrivacyBanner;