import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'a-plus-urban-design-privacy-consent';

// --- SAFE STORAGE HELPER ---
// CRITICAL FIX: iOS Safari in Private Mode throws an error when accessing localStorage.
// This wrapper catches the error and prevents the white screen of death.
const safeStorage = {
    getItem: (key: string): string | null => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                return window.localStorage.getItem(key);
            }
        } catch (e) {
            // Storage is blocked/restricted. Return null to fail gracefully.
            return null;
        }
        return null;
    },
    setItem: (key: string, value: string) => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                window.localStorage.setItem(key, value);
            }
        } catch (e) {
            // Write failed (likely Private Mode). Ignore silently.
        }
    }
};

const PrivacyBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
        marketing: false
    });

    useEffect(() => {
        // Check consent after mount to ensure UI doesn't block LCP
        const timer = setTimeout(() => {
            const consent = safeStorage.getItem(CONSENT_KEY);
            if (!consent) {
                setIsVisible(true);
            }
        }, 1000);

        const showSettingsHandler = () => {
            setIsVisible(true);
            setIsModalOpen(true);
        };
        
        window.addEventListener('showPrivacySettings', showSettingsHandler);

        return () => {
            window.removeEventListener('showPrivacySettings', showSettingsHandler);
            clearTimeout(timer);
        };
    }, []);

    const saveConsent = (settings: typeof preferences) => {
        const consent = { ...settings, timestamp: new Date().toISOString() };
        safeStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
        
        setIsVisible(false);
        setIsModalOpen(false);
    };

    const handleAcceptAll = () => {
        saveConsent({ necessary: true, analytics: true, marketing: true });
    };

    const handleDeclineAll = () => {
        saveConsent({ necessary: true, analytics: false, marketing: false });
    };

    const handleSavePreferences = () => {
        saveConsent(preferences);
    };
    
    const togglePreference = (key: 'analytics' | 'marketing') => {
        setPreferences(prev => ({...prev, [key]: !prev[key]}));
    }

    if (!isVisible) {
        return null;
    }

    return (
        <>
            {/* Banner */}
            <div role="region" aria-label="Cookie Consent Banner" className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-xl border-t border-white/10 z-[100] animate-[fade-in-up_0.5s_ease-out] shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
                <div className="container mx-auto p-4 md:p-6 flex flex-col xl:flex-row items-center justify-between gap-4 md:gap-6">
                    <div className="text-center xl:text-left w-full xl:w-auto">
                        <h3 className="text-sm md:text-lg font-bold text-white uppercase tracking-wider mb-2">Datenschutzeinstellungen</h3>
                        <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-3xl">
                            Wir nutzen Cookies und ähnliche Technologien, um unsere Website für Sie zu optimieren und Ihnen ein bestmögliches Nutzungserlebnis zu bieten.
                            <br className="md:hidden" />
                            <Link to="/impressum" className="text-brand-orange hover:text-white underline mx-1">Impressum</Link> 
                            &bull;
                            <Link to="/datenschutz" className="text-brand-orange hover:text-white underline ml-1">Datenschutz</Link>
                        </p>
                    </div>
                    {/* Buttons: Grid on mobile, Flex on desktop for better spacing */}
                    <div className="w-full xl:w-auto grid grid-cols-1 sm:grid-cols-3 xl:flex gap-3">
                         <button onClick={() => setIsModalOpen(true)} className="px-4 py-3 text-xs font-bold border border-white/20 hover:bg-white/10 rounded bg-transparent transition-colors text-gray-300 uppercase tracking-widest whitespace-nowrap">
                            Dateneinstellungen
                        </button>
                        <button onClick={handleDeclineAll} className="px-4 py-3 text-xs font-bold border border-white/20 hover:bg-white/10 rounded bg-transparent transition-colors text-white uppercase tracking-widest whitespace-nowrap">
                            Alles ablehnen
                        </button>
                        <button onClick={handleAcceptAll} className="px-6 py-3 text-xs font-bold bg-brand-orange text-black rounded hover:bg-white transition-colors shadow-lg shadow-brand-orange/20 uppercase tracking-widest whitespace-nowrap">
                            Alles akzeptieren
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                 <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-end md:items-center justify-center z-[110] animate-[fade-in-up_0.2s_ease-out] md:animate-none">
                    <div className="bg-[#181818] w-full md:rounded-xl shadow-2xl md:max-w-lg md:m-4 border-t md:border border-white/10 max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white font-heading uppercase tracking-wide">Privatsphäre</h2>
                            <p className="text-sm text-gray-500 mt-1">Entscheiden Sie selbst, welche Daten wir nutzen dürfen.</p>
                        </div>
                        
                        <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-grow">
                            <div className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/5">
                                <div>
                                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">Technisch notwendig</h3>
                                    <p className="text-xs text-gray-500 mt-1">Essenziell für die Funktion der Website.</p>
                                </div>
                                <div className="relative inline-block w-10 ml-2 align-middle select-none opacity-50">
                                    <input type="checkbox" checked readOnly disabled className="appearance-none"/>
                                    <div className="block overflow-hidden h-5 rounded-full bg-brand-orange w-9 relative">
                                        <div className="absolute right-0 top-0 w-5 h-5 bg-white rounded-full border-2 border-brand-orange"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center p-4 rounded-lg bg-black/20 border border-white/5 hover:border-white/20 transition-colors">
                                 <div>
                                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">Statistik</h3>
                                    <p className="text-xs text-gray-500 mt-1">Anonyme Nutzungsdaten zur Verbesserung.</p>
                                </div>
                                 <button
                                    type="button"
                                    role="switch"
                                    aria-checked={preferences.analytics}
                                    onClick={() => togglePreference('analytics')}
                                    className="relative inline-block w-9 ml-2 align-middle select-none focus:outline-none"
                                >
                                    <span className={`block overflow-hidden h-5 rounded-full transition-colors duration-300 ${preferences.analytics ? 'bg-brand-orange/50' : 'bg-gray-700'}`}></span>
                                    <span className={`${preferences.analytics ? 'right-0 bg-brand-orange' : 'right-4 bg-gray-400'} pointer-events-none absolute block w-5 h-5 rounded-full border-2 border-gray-900 top-0 transform transition-all duration-200 ease-in`}></span>
                                </button>
                            </div>

                            <div className="flex justify-between items-center p-4 rounded-lg bg-black/20 border border-white/5 hover:border-white/20 transition-colors">
                                 <div>
                                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">Externe Medien</h3>
                                    <p className="text-xs text-gray-500 mt-1">Inhalte von Drittanbietern laden.</p>
                                </div>
                                 <button
                                    type="button"
                                    role="switch"
                                    aria-checked={preferences.marketing}
                                    onClick={() => togglePreference('marketing')}
                                    className="relative inline-block w-9 ml-2 align-middle select-none focus:outline-none"
                                >
                                    <span className={`block overflow-hidden h-5 rounded-full transition-colors duration-300 ${preferences.marketing ? 'bg-brand-orange/50' : 'bg-gray-700'}`}></span>
                                    <span className={`${preferences.marketing ? 'right-0 bg-brand-orange' : 'right-4 bg-gray-400'} pointer-events-none absolute block w-5 h-5 rounded-full border-2 border-gray-900 top-0 transform transition-all duration-200 ease-in`}></span>
                                </button>
                            </div>
                        </div>

                        <div className="p-4 bg-black/40 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-3 rounded-b-xl">
                            <button onClick={handleDeclineAll} className="px-4 py-3 sm:py-2 text-xs font-bold border border-white/10 hover:bg-white/10 rounded transition-colors text-gray-400 uppercase tracking-widest w-full sm:w-auto">
                                Ablehnen
                            </button>
                            <button onClick={handleSavePreferences} className="px-6 py-3 sm:py-2 text-xs font-bold bg-white text-black rounded hover:bg-brand-orange hover:text-white transition-colors uppercase tracking-widest w-full sm:w-auto shadow-lg">
                                Speichern
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PrivacyBanner;