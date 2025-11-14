import React, { useState } from 'react';

const BrochureRequestForm: React.FC<{ context: 'homepage' | 'productpage' }> = ({ context }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || status === 'loading') return;

        setStatus('loading');
        setMessage('');

        try {
            const response = await fetch('/api/brochure', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Ein Fehler ist aufgetreten.');
            }

            setStatus('success');
            setMessage('Vielen Dank! Die Broschüre ist auf dem Weg zu Ihnen.');
            setEmail('');

        } catch (error) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : 'Bitte versuchen Sie es später erneut.');
        }
    };

    const isHomepage = context === 'homepage';

    if (isHomepage) {
        return (
            <section id="brochure" className="bg-brand-bg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-5xl md:text-6xl font-bold font-heading text-brand-heading">Unsere Digitale Broschüre</h2>
                        <p className="mt-4 text-lg text-brand-muted">
                            Erhalten Sie einen umfassenden Überblick über all unsere Produkte, realisierten Projekte und unsere Philosophie. Fordern Sie jetzt unsere digitale Broschüre kostenlos an.
                        </p>
                        <div className="mt-10">
                            {status === 'success' ? (
                                <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-4 rounded-lg text-left" role="alert">
                                    <p className="font-bold">Anfrage erfolgreich!</p>
                                    <p>{message}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <label htmlFor="brochure-email-home" className="sr-only">E-Mail Adresse</label>
                                    <input
                                        type="email"
                                        id="brochure-email-home"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Ihre E-Mail-Adresse"
                                        required
                                        className="w-full sm:w-auto flex-grow px-6 py-4 bg-brand-surface border border-white/10 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange sm:text-sm"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="inline-flex justify-center items-center py-4 px-10 border border-transparent shadow-sm text-base font-bold rounded-md text-white bg-brand-orange hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all duration-300 disabled:bg-brand-muted"
                                    >
                                        {status === 'loading' ? 'Senden...' : 'Broschüre anfordern'}
                                    </button>
                                </form>
                            )}
                            {status === 'error' && <p className="mt-4 text-red-500">{message}</p>}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    
    // Product Page Version
    return (
        <div className="mt-24 p-8 bg-brand-surface rounded-lg">
            <h2 className="text-3xl font-bold font-heading text-center mb-4">Digitale Broschüre anfordern</h2>
            <p className="text-brand-muted text-center max-w-xl mx-auto mb-8">
                Erhalten Sie detaillierte Informationen zu all unseren Produkten direkt in Ihr Postfach.
            </p>
            {status === 'success' ? (
                <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-4 rounded-md text-left" role="alert">
                    <p className="font-bold">Anfrage erfolgreich!</p>
                    <p>{message}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                     <label htmlFor="brochure-email-product" className="sr-only">E-Mail Adresse</label>
                    <input
                        type="email"
                        id="brochure-email-product"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ihre E-Mail-Adresse"
                        required
                        className="w-full sm:w-auto flex-grow px-4 py-3 bg-brand-bg border border-white/10 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange sm:text-sm"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-base font-bold rounded-md text-white bg-brand-orange hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all duration-300 disabled:bg-brand-muted"
                    >
                        {status === 'loading' ? 'Senden...' : 'Anfordern'}
                    </button>
                </form>
            )}
            {status === 'error' && <p className="mt-4 text-red-500 text-center">{message}</p>}
        </div>
    );
};

export default BrochureRequestForm;
