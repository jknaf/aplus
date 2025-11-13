import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

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


const HomePage: React.FC = () => {
  return (
    <>
      <div className="relative h-screen flex items-end justify-start text-white">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img src="https://images.pexels.com/photos/9523600/pexels-photo-9523600.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&q=80" alt="Eine Person sitzt nachdenklich inmitten von alten, steinernen Tempelruinen." className="absolute inset-0 w-full h-full object-cover"/>
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading uppercase tracking-tighter leading-none animate-fade-in-up">
              Modulare <br />Architektur für <span className="text-brand-orange">Freiräume</span>
            </h1>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <AnimatedSection>
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-bold font-heading text-brand-heading">Produkte für den öffentlichen Raum</h2>
              <p className="mt-4 text-lg text-brand-muted max-w-3xl mx-auto">Vandalismusresistent, fundamentfrei und modular – entdecken Sie unsere Lösungen für moderne Freiräume, die Bewegung und Begegnung fördern.</p>
            </div>
        </AnimatedSection>
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, index) => (
              <AnimatedSection key={product.id} className={`[animation-delay:${index * 150}ms]`}>
                  <Link to={product.path} className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-brand-orange/20 transition-shadow duration-300 aspect-[4/5] bg-brand-surface">
                    <img src={product.imageUrl} alt={product.altText} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="relative h-full flex flex-col justify-end p-8">
                      <h3 className="text-3xl font-bold font-heading text-brand-heading transform group-hover:-translate-y-2 transition-transform duration-300">{product.title}</h3>
                    </div>
                  </Link>
              </AnimatedSection>
            ))}
          </div>

        <AnimatedSection className="mt-24 md:mt-40">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold font-heading text-brand-heading">Robust. Modular. Fundamentfrei.</h2>
            <p className="mt-4 text-lg text-brand-muted max-w-3xl mx-auto">Unsere Design-Philosophie basiert auf drei Säulen, die Langlebigkeit, Flexibilität und Ästhetik garantieren.</p>
          </div>
          <div className="mt-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 text-left">
            <div className="relative p-2">
               <span className="absolute -top-4 -left-4 text-8xl font-black text-brand-surface opacity-50 select-none">01</span>
               <h3 className="relative text-2xl font-bold font-heading text-brand-heading">Einfacher Aufbau ohne Fundamente</h3>
               <p className="mt-3 text-brand-muted">Unsere Elemente werden auf verdichteten Schotterbetten platziert. Das spart Zeit, Kosten und aufwendige Erdarbeiten.</p>
            </div>
            <div className="relative p-2">
                <span className="absolute -top-4 -left-4 text-8xl font-black text-brand-surface opacity-50 select-none">02</span>
               <h3 className="relative text-2xl font-bold font-heading text-brand-heading">Witterungsbeständige Materialien</h3>
               <p className="mt-3 text-brand-muted">Wir verwenden ausschließlich hochwertigen Beton, Edelstahl und verzinkten Stahl, um maximale Langlebigkeit bei jeder Witterung zu sichern.</p>
            </div>
            <div className="relative p-2">
                <span className="absolute -top-4 -left-4 text-8xl font-black text-brand-surface opacity-50 select-none">03</span>
               <h3 className="relative text-2xl font-bold font-heading text-brand-heading">Hohe Vandalismussicherheit</h3>
               <p className="mt-3 text-brand-muted">Die massive Bauweise und die robusten Materialien machen unsere Produkte extrem widerstandsfähig gegen Vandalismus, Feuer und Verrottung.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
      
      <section id="cta" className="bg-brand-surface">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <AnimatedSection>
              <h2 className="text-5xl md:text-6xl font-bold font-heading text-brand-heading">Planen Sie Ihr nächstes Projekt mit uns.</h2>
              <p className="mt-4 text-lg text-brand-muted max-w-3xl mx-auto">Wir beraten Sie von der ersten Idee bis zur finalen Montage. Fordern Sie jetzt eine unverbindliche Beratung an.</p>
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