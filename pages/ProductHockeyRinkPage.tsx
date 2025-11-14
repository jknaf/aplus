import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const ProductHockeyRinkPage: React.FC = () => {
  useEffect(() => {
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
           <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Hockey-Banden</h1>
           <p className="mt-2 text-lg text-brand-muted">Für Roll-, Inline- & Eishockey</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Rote Inlinehockey-Bande aus Beton und Edelstahl" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Eishockey-Feld, das die Vielseitigkeit der Banden zeigt" className="w-full h-auto object-cover rounded-lg shadow-md" />
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
    </PageShell>
  );
};

export default ProductHockeyRinkPage;