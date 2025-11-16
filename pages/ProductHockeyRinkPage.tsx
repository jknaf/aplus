import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

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

const CheckmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-5 h-5 text-brand-orange mr-3 mt-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const features = [
    { bold: "Fundamentfreie Montage:", text: "Keine Bodenbefestigungen nötig, ermöglicht einfachen Umbau ohne Beschädigung des Belags." },
    { bold: "Ganzjährig einsetzbar:", text: "Geeignet für Roll-, Inline- und sogar Eishockey durch ein spezielles Dichtungsprofil." },
    { bold: "Robuste Materialien:", text: "Gefertigt aus witterungsbeständigem Beton, Edelstahl, Laminatplatten und Gummi." },
    { bold: "Minimale Wartung:", text: "Die langlebige Konstruktion reduziert den Instandhaltungsaufwand erheblich." },
    { bold: "Flexibel & Modular:", text: "In 1,5-Meter-Schritten erweiterbar und in Höhen von 40 cm und 110 cm verfügbar." },
];

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
                <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Inline-Hockey-Banden & Tore</h1>
                <div className="group/siegel relative">
                    <button type="button" aria-describedby="tuv-info-hockey" className="bg-white text-brand-bg font-bold px-3 py-1.5 rounded-md shadow-lg text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-brand-orange">
                        TÜV-ZERTIFIZIERT
                    </button>
                    <div id="tuv-info-hockey" role="tooltip" className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-brand-bg text-white text-xs px-2 py-1 rounded opacity-0 group-hover/siegel:opacity-100 group-focus-within/siegel:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        Geprüfte Sicherheit nach DIN EN 14974
                    </div>
                </div>
            </div>
           <p className="mt-2 text-lg text-brand-muted">Für Roll-, Inline- & Eishockey</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <img loading="lazy" decoding="async" src="https://www.aplusurbandesign.com/.cm4all/uproc.php/0/A%2B/.2-cimg9951ca%2Bhocke-breitn-756x430.jpg/picture-200?format=auto&width=1200" alt="INLINE-HOCKEY-BANDEN A+ Urban Design" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Eishockey-Feld, das die Vielseitigkeit der Hockey-Banden zeigt" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/4167333/pexels-photo-4167333.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Kinder spielen Rollhockey auf einem Feld mit den witterungsbeständigen Banden" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Modulare Elemente der Hockey-Bande, integriert in einen Skatepark" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <p className="mt-4 text-xl text-brand-muted leading-relaxed">
            Als Original A+ URBAN DESIGN Produkt sind unsere Banden und Tore für eine einfache und flexible Spielfeldbegrenzung konzipiert. Die witterungsbeständigen Materialien garantieren eine lange Lebensdauer bei minimalem Wartungsaufwand.
          </p>
          <div className="mt-10">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Vorteile unserer Hockey-Einfassungen</h2>
            <ul className="mt-6 space-y-4 text-brand-muted">
              {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                      <CheckmarkIcon />
                      <div>
                          {feature.bold && <span className="font-bold mr-2">{feature.bold}</span>}
                          {feature.text}
                      </div>
                  </li>
              ))}
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

export default ProductHockeyRinkPage;