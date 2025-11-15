import React, { useState } from 'react';
import PageShell from '../components/PageShell';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
    };

    return (
        <PageShell title="Kontakt">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Kontaktieren Sie uns</h1>
                <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
                    Haben Sie Fragen zu unseren Produkten oder möchten Sie ein Projekt besprechen? Wir freuen uns auf Ihre Nachricht.
                </p>
            </div>
            <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-brand-surface p-8 rounded-lg">
                    <h2 className="text-2xl font-bold font-heading">A+ Urban Design</h2>
                    <ul className="mt-6 space-y-4 text-brand-muted">
                        <li className="flex items-start">
                            <span className="mt-1 mr-4 h-5 w-5 text-brand-orange flex-shrink-0" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                            </span>
                            <span>
                                Cüneyit Akcakoca<br />
                                Talstrasse 41, 70188 Stuttgart
                            </span>
                        </li>
                        <li className="flex items-center">
                            <span className="mr-4 h-5 w-5 text-brand-orange flex-shrink-0" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                            </span>
                             <a href="tel:+4915560090966" className="hover:text-brand-orange">+49 155 600 909 66</a>
                        </li>
                         <li className="flex items-center">
                            <span className="mr-4 h-5 w-5 text-brand-orange flex-shrink-0" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                            </span>
                             <a href="mailto:post@aplusurbandesign.com" className="hover:text-brand-orange">post@aplusurbandesign.com</a>
                        </li>
                    </ul>
                </div>
                <div>
                    {isSubmitted ? (
                        <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-6 rounded-lg" role="alert">
                            <p className="font-bold text-lg">Vielen Dank!</p>
                            <p>Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei Ihnen melden.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-brand-muted">Ihr Name</label>
                                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-4 py-3 bg-brand-surface border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-brand-muted">E-Mail-Adresse</label>
                                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-4 py-3 bg-brand-surface border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-brand-muted">Ihre Nachricht</label>
                                <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-4 py-3 bg-brand-surface border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-bold rounded-md text-white bg-brand-orange hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all duration-300">
                                    Nachricht senden
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </PageShell>
    );
};

export default ContactPage;