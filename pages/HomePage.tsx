import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import PageShell from '../components/PageShell';

const HomePage: React.FC = () => {
  return (
    <>
      <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white text-center">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <img src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" alt="Ein Skater springt bei Sonnenuntergang in einem weitläufigen Beton-Skatepark." className="absolute inset-0 w-full h-full object-cover"/>
        <div className="relative z-20 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-heading uppercase tracking-tighter leading-tight">
            Modulare Architektur für <br />
            <span className="text-brand-orange">Freizeit und Sport</span> aus Beton & Stahl
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            ARCHITEKTUR UND URBANES DESIGN – BETON UND STAHL FÜR FREIZEIT UND SPORT.
          </p>
        </div>
      </div>
      
      <PageShell title="Architektur für Freizeit & Sport">
        <section id="products" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">Unsere Produkte für den öffentlichen Raum</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Vandalismusresistent, fundamentfrei und modular – entdecken Sie unsere Lösungen für moderne Freiräume.</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map(product => (
              <Link to={product.path} key={product.id} className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative">
                  <img src={product.imageUrl} alt={product.altText} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"/>
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold font-heading text-white">{product.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="philosophy" className="mt-20 md:mt-32 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">Robust. Modular. Fundamentfrei.</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Unsere Design-Philosophie basiert auf drei Säulen, die Langlebigkeit und Flexibilität garantieren.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="p-6">
               <h3 className="text-xl font-bold font-heading">Einfacher Aufbau ohne Fundamente</h3>
               <p className="mt-2 text-gray-600">Unsere Elemente werden auf verdichteten Schotterbetten platziert. Das spart Zeit, Kosten und aufwendige Erdarbeiten.</p>
            </div>
            <div className="p-6">
               <h3 className="text-xl font-bold font-heading">Witterungsbeständige Materialien</h3>
               <p className="mt-2 text-gray-600">Wir verwenden ausschließlich hochwertigen Beton, Edelstahl und verzinkten Stahl, um maximale Langlebigkeit bei jeder Witterung zu sichern.</p>
            </div>
            <div className="p-6">
               <h3 className="text-xl font-bold font-heading">Hohe Vandalismussicherheit</h3>
               <p className="mt-2 text-gray-600">Die massive Bauweise und die robusten Materialien machen unsere Produkte extrem widerstandsfähig gegen Vandalismus, Feuer und Verrottung.</p>
            </div>
          </div>
        </section>
      </PageShell>
      
      <section id="cta" className="bg-brand-gray-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Planen Sie Ihr nächstes Projekt mit uns.</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Wir beraten Sie von der ersten Idee bis zur finalen Montage. Fordern Sie jetzt eine unverbindliche Beratung an.</p>
            <Link to="/kontakt" className="mt-8 inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
              Jetzt Beratung anfordern
            </Link>
          </div>
        </section>
    </>
  );
};

export default HomePage;