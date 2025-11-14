import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'hockey' && p.id !== 'pumptrack').slice(0, 3);
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

const ProductHockeyRinkPage: React.FC = () => {
  useEffect(() => {
    document.title = "Inline-Hockey-Banden (fundamentfrei) | A+ Urban Design";
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', 'Modulare Hockey-Banden für Roll-, Inline- und Eishockey. Unser fundamentfreies System ist witterungsbeständig, langlebig und schnell montiert. Planen Sie Ihr Hockeyfeld mit uns.');
    }

    const keywordsTag = document.querySelector('meta[name="keywords"]');
    if (keywordsTag) {
      keywordsTag.setAttribute('content', 'Hockey-Banden, Inlinehockey Bande, Rollhockey, Eishockey, fundamentfrei, modulares System, Sportanlagen, Hockeyfeld bauen');
    }
  }, []);

  return (
    <PageShell title="Modulare Hockey-Banden (fundamentfrei)">
       <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 flex-wrap">
                <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Hockey-Banden</h1>
                <div className="group relative">
                    <div className="bg-white text-brand-bg font-bold px-3 py-1.5 rounded-md shadow-lg text-sm cursor-help">
                        TÜV-GEPRÜFT
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-brand-bg text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        Geprüfte Sicherheit nach DIN EN 14974
                    </div>
                </div>
            </div>
           <p className="mt-2 text-lg text-brand-muted">Für Roll-, Inline- & Eishockey</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Rote Inline-Hockey-Bande aus Beton und Edelstahl" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Eishockey-Feld, das die Vielseitigkeit der Hockey-Banden zeigt" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/4167333/pexels-photo-4167333.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Kinder spielen Rollhockey auf einem Feld mit den witterungsbeständigen Banden" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Modulare Elemente der Hockey-Bande, integriert in einen Skatepark" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <p className="mt-4 text-xl text-brand-muted leading-relaxed">
            Unsere modularen Bandensysteme benötigen keine Fundamente oder Bodenbefestigungen. Sie sind flexibel einsetzbar für diverse Sportarten und können durch ein Dichtungsprofil auch für Eisflächen genutzt werden.
          </p>
          <div className="mt-10">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Vorteile unserer Hockey-Einfassungen</h2>
            <ul className="mt-6 space-y-4 text-brand-muted">
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> Einfache Montage ohne Fundamente</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> Vielseitig einsetzbar für Rollhockey, Inlinehockey und Eishockey</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Witterungsbeständige Materialien:</span> Beton, Edelstahl, Laminat, Gummi</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> Geringer Wartungsaufwand</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Modular erweiterbar</span> in 1,5-m-Schritten</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Verschiedene Höhen verfügbar</span> (40 cm und 110 cm)</li>
            </ul>
          </div>
          <Link to="/kontakt" className="mt-12 inline-block bg-brand-orange text-white font-bold py-4 px-10 rounded-md shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
            Angebot anfordern
          </Link>
        </div>
      </div>
      <OtherProducts />
    </PageShell>
  );
};

export default ProductHockeyRinkPage;