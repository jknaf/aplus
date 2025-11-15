import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return <div ref={ref} className={`animated-section ${className}`}>{children}</div>;
};

const HERO_IMAGES = [
  {
    src: 'https://images.pexels.com/photos/1769553/pexels-photo-1769553.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&q=80',
    alt: 'Professioneller Skater in einem Beton-Skatepark bei Sonnenuntergang.'
  },
  {
    src: 'https://images.pexels.com/photos/2422256/pexels-photo-2422256.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&q=80',
    alt: 'Modulare Betonelemente bilden eine interessante Struktur für Skate-Anlagen.'
  }
];

const KENBURNS_CLASSES = ['animate-kenburns-1', 'animate-kenburns-2', 'animate-kenburns-3'];


const HomePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative h-screen flex items-end justify-start text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
         {HERO_IMAGES.map((image, index) => (
          <img 
            key={index}
            loading="lazy" 
            decoding="async" 
            src={image.src} 
            alt={image.alt} 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out 
              ${KENBURNS_CLASSES[index % KENBURNS_CLASSES.length]}
              ${index === currentImageIndex ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}
            `}
          />
        ))}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black font-heading uppercase tracking-tighter leading-none animate-fade-in-up">
              Architektur für <span className="text-brand-orange">Freiräume</span>
            </h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <AnimatedSection>
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-bold font-heading text-brand-heading">Unsere Produktwelten</h2>
              <p className="mt-4 text-lg text-brand-muted max-w-3xl mx-auto">Ein Auszug unserer modularen Lösungen aus Beton und Stahl: Vandalismusresistent, fundamentfrei und TÜV-geprüft für moderne Freiräume, die Bewegung und Begegnung fördern.</p>
            </div>
        </AnimatedSection>
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.slice(0, 7).map((product, index) => (
              <AnimatedSection key={product.id} className={`[animation-delay:${index * 150}ms]`}>
                  <Link to={product.path} className="group/card relative block overflow-hidden rounded-xl shadow-lg hover:shadow-brand-orange/20 transition-all duration-300 aspect-[4/5] bg-brand-surface hover:-translate-y-2">
                    <img loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300 opacity-80 group-hover/card:opacity-100"/>
                    
                    {product.tuvCertified && (
                        <div className="group/siegel absolute top-3 right-3 z-10">
                             <button type="button" aria-describedby={`tuv-info-${product.id}`} className="bg-white text-brand-bg font-bold text-xs px-2 py-1 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-orange">
                                TÜV-GEPRÜFT
                            </button>
                            <div id={`tuv-info-${product.id}`} role="tooltip" className="absolute top-full right-0 mt-1 w-max bg-brand-bg text-white text-xs px-2 py-1 rounded opacity-0 group-hover/siegel:opacity-100 group-focus/siegel:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                                Geprüfte Sicherheit nach DIN EN 14974
                            </div>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="relative h-full flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold font-heading text-brand-heading transform group-hover/card:-translate-y-2 transition-transform duration-300">{product.title}</h3>
                    </div>
                  </Link>
              </AnimatedSection>
            ))}
          </div>

        <section id="philosophy" className="mt-24 md:mt-40">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold font-heading text-brand-heading">Robust. Modular. Langlebig.</h2>
            <p className="mt-4 text-lg text-brand-muted max-w-3xl mx-auto">Unsere Design-Philosophie basiert auf Säulen, die Langlebigkeit, Flexibilität und Wirtschaftlichkeit garantieren.</p>
          </div>
          <div className="mt-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-surface rounded-xl p-8 grid grid-rows-[auto_1fr] h-full">
               <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-4xl text-brand-orange flex-shrink-0 mt-1" aria-hidden="true">foundation</span>
                  <h3 className="text-2xl font-bold font-heading text-brand-heading">Ohne Fundament möglich</h3>
               </div>
               <p className="mt-4 text-brand-muted">Unsere Elemente werden auf verdichteten Schotterbetten platziert. Das spart Zeit, Kosten und aufwendige Erdarbeiten und schont den Untergrund.</p>
            </div>
            <div className="bg-brand-surface rounded-xl p-8 grid grid-rows-[auto_1fr] h-full">
               <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-4xl text-brand-orange flex-shrink-0 mt-1" aria-hidden="true">shield</span>
                  <h3 className="text-2xl font-bold font-heading text-brand-heading">Witterungsbeständig</h3>
                </div>
               <p className="mt-4 text-brand-muted">Wir verwenden ausschließlich hochwertigen Beton, Edelstahl und verzinkten Stahl, um maximale Langlebigkeit bei jeder Witterung zu sichern.</p>
            </div>
            <div className="bg-brand-surface rounded-xl p-8 grid grid-rows-[auto_1fr] h-full">
               <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-4xl text-brand-orange flex-shrink-0 mt-1" aria-hidden="true">security</span>
                  <h3 className="text-2xl font-bold font-heading text-brand-heading">Vandalismussicher</h3>
                </div>
               <p className="mt-4 text-brand-muted">Die massive Bauweise und die robusten Materialien machen unsere Produkte extrem widerstandsfähig gegen Vandalismus, Feuer und Verrottung.</p>
            </div>
             <div className="bg-brand-surface rounded-xl p-8 grid grid-rows-[auto_1fr] h-full">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-4xl text-brand-orange flex-shrink-0 mt-1" aria-hidden="true">verified_user</span>
                  <h3 className="text-2xl font-bold font-heading text-brand-heading">TÜV-geprüft & Sicher</h3>
                </div>
               <p className="mt-4 text-brand-muted">Alle unsere Sportgeräte und Skate-Elemente sind nach DIN EN 14974 TÜV-geprüft und GS-zertifiziert für höchste Sicherheitsstandards.</p>
            </div>
             <div className="bg-brand-surface rounded-xl p-8 grid grid-rows-[auto_1fr] h-full">
               <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-4xl text-brand-orange flex-shrink-0 mt-1" aria-hidden="true">widgets</span>
                  <h3 className="text-2xl font-bold font-heading text-brand-heading">Modular kombinierbar</h3>
                </div>
               <p className="mt-4 text-brand-muted">Dank des modularen Aufbaus können Anlagen jederzeit erweitert, umgestaltet oder sogar an einen anderen Ort versetzt werden.</p>
            </div>
             <div className="bg-brand-surface rounded-xl p-8 grid grid-rows-[auto_1fr] h-full">
               <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-4xl text-brand-orange flex-shrink-0 mt-1" aria-hidden="true">recycling</span>
                  <h3 className="text-2xl font-bold font-heading text-brand-heading">Recycelbare Materialien</h3>
                </div>
               <p className="mt-4 text-brand-muted">Wir setzen auf Nachhaltigkeit. Unsere Hauptmaterialien Beton und Stahl sind vollständig recycelbar und umweltschonend.</p>
            </div>
          </div>
        </section>

         <section id="faq" className="mt-24 md:mt-40">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold font-heading text-brand-heading">Häufig gestellte Fragen (FAQ)</h2>
            <p className="mt-4 text-lg text-brand-muted max-w-3xl mx-auto">Kurze Antworten auf die wichtigsten Fragen zu unseren Produkten und Leistungen.</p>
          </div>
          <div className="mt-20 max-w-4xl mx-auto space-y-6">
            <details className="p-6 bg-brand-surface rounded-lg group">
              <summary className="flex items-center justify-between cursor-pointer">
                <h3 className="text-xl font-heading font-bold text-brand-heading">Was kostet eine Skate-Anlage?</h3>
                 <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180" aria-hidden="true">expand_more</span>
              </summary>
              <p className="mt-4 text-brand-muted">Die Kosten für eine Skate-Anlage sind sehr individuell und hängen von der Größe, den gewählten Elementen und den Gegebenheiten vor Ort ab. Gerne erstellen wir Ihnen ein unverbindliches Angebot, das genau auf Ihr Budget und Ihre Wünsche zugeschnitten ist. Kontaktieren Sie uns für eine kostenlose Erstberatung.</p>
            </details>
             <details className="p-6 bg-brand-surface rounded-lg group">
              <summary className="flex items-center justify-between cursor-pointer">
                <h3 className="text-xl font-heading font-bold text-brand-heading">Wie lange dauert der Aufbau?</h3>
                 <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180" aria-hidden="true">expand_more</span>
              </summary>
              <p className="mt-4 text-brand-muted">Dank unseres fundamentfreien, modularen Systems ist der Aufbau extrem schnell. Kleinere Anlagen können oft innerhalb weniger Tage montiert werden. Die genaue Dauer hängt von der Projektgröße ab, ist aber deutlich kürzer als bei herkömmlichen Ortbeton-Bauten.</p>
            </details>
             <details className="p-6 bg-brand-surface rounded-lg group">
              <summary className="flex items-center justify-between cursor-pointer">
                <h3 className="text-xl font-heading font-bold text-brand-heading">Sind die Elemente TÜV-geprüft?</h3>
                 <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180" aria-hidden="true">expand_more</span>
              </summary>
              <p className="mt-4 text-brand-muted">Ja, absolut. Sicherheit hat für uns höchste Priorität. Alle unsere Skate- und Sportelemente sind nach der aktuellen Norm DIN EN 14974 TÜV-geprüft und tragen das GS-Zeichen für "Geprüfte Sicherheit".</p>
            </details>
             <details className="p-6 bg-brand-surface rounded-lg group">
              <summary className="flex items-center justify-between cursor-pointer">
                <h3 className="text-xl font-heading font-bold text-brand-heading">Kann man die Module später versetzen oder erweitern?</h3>
                 <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180" aria-hidden="true">expand_more</span>
              </summary>
              <p className="mt-4 text-brand-muted">Ja, das ist einer der größten Vorteile unseres Systems. Die modularen Elemente sind nicht fest im Boden verankert und können bei Bedarf problemlos versetzt, neu angeordnet oder durch weitere Module ergänzt werden. Das bietet maximale Flexibilität für die Zukunft.</p>
            </details>
          </div>
        </section>
      </div>

      <BrochureRequestForm context="homepage" />
      
      <section id="cta" className="bg-brand-surface">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <AnimatedSection>
              <h2 className="text-5xl md:text-6xl font-bold font-heading text-brand-heading">Planen Sie Ihr nächstes Projekt mit uns.</h2>
              <p className="mt-4 text-lg text-brand-muted max-w-3xl mx-auto">Wir beraten Sie von der ersten 3D-Planung bis zur finalen Montage. Fordern Sie jetzt eine unverbindliche Beratung für Ihren Skatepark, Pumptrack oder Ihre Freizeitanlage an.</p>
              <Link to="/kontakt" className="mt-10 inline-block bg-brand-orange text-white font-bold py-4 px-12 rounded-md shadow-lg shadow-brand-orange/30 hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 text-lg">
                Jetzt Beratung anfordern
              </Link>
            </AnimatedSection>
          </div>
        </section>
    </>
  );
};

export default HomePage;