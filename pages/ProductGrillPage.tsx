import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'grillstelle' && p.id !== 'ueberdachung').slice(0, 3);
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


const ProductGrillPage: React.FC = () => {
  useEffect(() => {
    document.title = "Öffentliche Grillstelle aus Beton | A+ Urban Design";
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', 'Planen Sie einen öffentlichen Grillplatz? Entdecken Sie unsere robuste, fundamentfreie und vandalismussichere Grillstelle aus Beton mit diebstahlsicherem Edelstahlrost. Ideal für Parks und Freizeitanlagen.');
    }

    const keywordsTag = document.querySelector('meta[name="keywords"]');
    if (keywordsTag) {
      keywordsTag.setAttribute('content', 'Öffentliche Grillstelle, Betongrill, Grillplatz, vandalismussicher, fundamentfrei, Edelstahl Grillrost, Stadtmobiliar, Parkausstattung');
    }
  }, []);

  return (
    <PageShell title="Öffentliche Grillstelle aus Beton">
       <div className="text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Robuste Grillstelle</h1>
           <p className="mt-2 text-lg text-brand-muted">Für den öffentlichen Raum</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <img loading="lazy" decoding="async" src="https://www.aplusurbandesign.com/.cm4all/uproc.php/0/A%2B/.3-p1260721-756x430.jpg/picture-200?format=auto&width=1200" alt="GRILL-STELLE MIT SITZFLÄCHEN A+ Urban Design" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Detailaufnahme des diebstahlsicheren Grillrosts aus Edelstahl der Betongrillstelle" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/4167333/pexels-photo-4167333.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Grillplatz im Einsatz bei einem Fest im Park neben einem Skatepark" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/18449733/pexels-photo-18449733.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Aufbau der fundamentfreien Grillstelle auf einem Schotterbett" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <p className="mt-4 text-xl text-brand-muted leading-relaxed">
            Unser Grillplatz aus Betonfertigteilen ist ideal für öffentliche Räume wie Freibäder, Campingplätze und Sportanlagen. Die Konstruktion ist für einfache Bedienung und Langlebigkeit konzipiert.
          </p>
          <div className="mt-10">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Eigenschaften & Vorteile</h2>
            <ul className="mt-6 space-y-4 text-brand-muted">
              <li className="flex items-start"><CheckmarkIcon /> <div><span className="font-bold mr-2">Materialien:</span> Beton, Edelstahl und verzinkter Stahl</div></li>
              <li className="flex items-start"><CheckmarkIcon /> <div>Extrem robust und witterungsbeständig</div></li>
              <li className="flex items-start"><CheckmarkIcon /> <div>Höhenverstellbarer Grillrost aus Edelstahl (diebstahlsicher)</div></li>
              <li className="flex items-start"><CheckmarkIcon /> <div>Keine Fundamente notwendig (Aufbau auf verdichtetem Schotterbett)</div></li>
              <li className="flex items-start"><CheckmarkIcon /> <div>Integrierte Bodenplatte (keine Pflasterarbeiten nötig)</div></li>
              <li className="flex items-start"><CheckmarkIcon /> <div>Recycelbare Materialien</div></li>
              <li className="flex items-start"><CheckmarkIcon /> <div><span className="font-bold mr-2">Technische Daten:</span> Durchmesser 4,20 m, Höhe 2,40 m</div></li>
            </ul>
          </div>
          <Link to="/kontakt" className="mt-12 inline-block bg-brand-orange text-white font-bold py-4 px-10 rounded-md shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
            Angebot anfordern
          </Link>
        </div>
      </div>
      <BrochureRequestForm context="productpage" />
      <OtherProducts />
    </PageShell>
  );
};

export default ProductGrillPage;