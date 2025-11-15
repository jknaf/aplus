import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'pumptrack' && p.id !== 'skate-anlagen').slice(0, 3);
  return (
    <div className="mt-24">
      <h2 className="text-3xl font-bold font-heading text-center mb-10">Entdecken Sie weitere Produkte</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-brand-orange/20 transition-shadow duration-300 aspect-[4/5] bg-brand-surface">
            <img loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8">
              <h3 className="text-3xl font-bold font-heading text-brand-heading transform group-hover:-translate-y-2 transition-transform duration-300">{product.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const CheckmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-5 h-5 text-brand-orange mr-3 mt-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const ProductPumptrackPage: React.FC = () => {
  useEffect(() => {
    document.title = "Pumptrack aus Beton planen & bauen | A+ Urban Design";
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', 'A+ Urban Design plant und baut TÜV-zertifizierte Pumptracks aus modularen Betonelementen. Langlebig, wartungsarm und perfekt für Bikes, Skateboards und Scooter.');
    }

    const keywordsTag = document.querySelector('meta[name="keywords"]');
    if (keywordsTag) {
      keywordsTag.setAttribute('content', 'Pumptrack Beton, Pumptrack bauen, modulare Pumptrack, BMX Pumptrack, Skatepark Hersteller, TÜV-zertifiziert, Sportanlage Beton');
    }
  }, []);

  return (
    <PageShell title="Pumptrack aus Beton planen & bauen">
      <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 flex-wrap">
                <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Pumptracks aus Beton</h1>
                <div className="group/siegel relative">
                    <button type="button" aria-describedby="tuv-info-pumptrack" className="bg-white text-brand-bg font-bold px-3 py-1.5 rounded-md shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-brand-orange">
                        TÜV-GEPRÜFT
                    </button>
                    <div id="tuv-info-pumptrack" role="tooltip" className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-brand-bg text-white text-xs px-2 py-1 rounded opacity-0 group-hover/siegel:opacity-100 group-focus-within/siegel:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        Geprüfte Sicherheit nach DIN EN 14974
                    </div>
                </div>
            </div>
           <p className="mt-2 text-lg text-brand-muted">Modulare Parcours für Bikes, Boards & Scooter</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Jugendliche auf einem Beton-Pumptrack von A+ Urban Design" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Ein Mountainbiker in einer Steilkurve des Pumptracks aus Beton" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/2241144/pexels-photo-2241144.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Modulare Betonelemente für einen langlebigen BMX Pumptrack" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/5413303/pexels-photo-5413303.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Luftaufnahme eines fertigen und TÜV-zertifizierten Pumptrack-Parcours" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <p className="mt-4 text-xl text-brand-muted leading-relaxed">
            Ein Pumptrack ist ein Rundkurs für Mountainbikes, BMX, Skateboards und Scooter. Unsere TÜV-zertifizierten und GS-geprüften Elemente aus Beton ermöglichen den Bau langlebiger und wartungsarmer Pumptrack-Parcours in jeder Form und Länge.
          </p>
          <div className="mt-10">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Planung und Aufbau</h2>
            <p className="mt-4 text-brand-muted">
              Unsere modularen Betonelemente können auf bestehenden Flächen montiert oder in eine neu angelegte Strecke aus Beton oder Asphalt integriert werden. Kontaktieren Sie uns für eine professionelle 3D-Planung und Beratung.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Vorteile unserer Pumptracks</h2>
            <ul className="mt-6 space-y-4 text-brand-muted">
              <li className="flex items-start"><CheckmarkIcon /> <div>TÜV-zertifiziert nach DIN EN 14974 & GS-geprüft</div></li>
              <li className="flex items-start"><CheckmarkIcon /> <div>Langlebiger Hochleistungsbeton</div></li>
              <li className="flex items-start"><CheckmarkIcon /> <div>Wartungsarm und Vandalismussicher</div></li>
              <li className="flex items-start"><CheckmarkIcon /> <div>Modular und flexibel erweiterbar</div></li>
              <li className="flex items-start"><CheckmarkIcon /> <div>Schneller Aufbau ohne Fundamente</div></li>
            </ul>
          </div>
          <Link to="/kontakt" className="mt-12 inline-block bg-brand-orange text-white font-bold py-4 px-10 rounded-md shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
            Planung anfragen
          </Link>
        </div>
      </div>
      <BrochureRequestForm context="productpage" />
      <OtherProducts />
    </PageShell>
  );
};

export default ProductPumptrackPage;