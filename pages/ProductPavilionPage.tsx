import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'ueberdachung' && p.id !== 'grillstelle').slice(0, 3);
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
    { bold: "Multifunktional:", text: "Einsetzbar als einzelne Sitznische, Haltestellenüberdachung oder in Gruppen als Pavillon." },
    { bold: "Fundamentfreier Aufbau:", text: "Wird auf einem verdichteten Kies- oder Schotterbett aufgestellt." },
    { bold: "Extrem Vandalismussicher:", text: "Massive Bauweise aus bewehrtem Hochleistungsbeton (C 35/45)." },
    { bold: "Wartungsfrei & Witterungsbeständig:", text: "Kein Streichen, kein Verrotten, für den ganzjährigen Einsatz konzipiert." },
    { bold: "Technische Daten:", text: "Maße pro Element: Länge 240cm, Tiefe 200cm, Höhe 246cm (+16cm)." },
];

const ProductPavilionPage: React.FC = () => {
  useEffect(() => {
    document.title = "Überdachung & Pavillon aus Beton | A+ Urban Design";
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', 'Moderne Überdachungen und Pavillons aus Beton. Vandalismussicher, fundamentfrei und witterungsbeständig. Idealer Wetterschutz für öffentliche Plätze und Parks.');
    }

    const keywordsTag = document.querySelector('meta[name="keywords"]');
    if (keywordsTag) {
      keywordsTag.setAttribute('content', 'Überdachung Beton, Pavillon Beton, Wetterschutz, Stadtmobiliar, Parkausstattung, Vandalismussicher, Fundamentfrei');
    }
  }, []);

  return (
    <PageShell title="Überdachung & Pavillon aus Beton">
       <div className="text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Pavillon & Überdachung aus Beton</h1>
           <p className="mt-2 text-lg text-brand-muted">Robuster Wetterschutz für den öffentlichen Raum</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <img loading="lazy" decoding="async" src="https://www.aplusurbandesign.com/.cm4all/uproc.php/0/A%2B/.4-a%2Bimg_0318b-756x430.jpg/picture-200?format=auto&width=1200" alt="ÜBERDACHUNG / PAVILLON AUS BETON A+ Urban Design" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/208801/pexels-photo-208801.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Moderner Beton-Pavillon als Treffpunkt" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/210393/pexels-photo-210393.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Detail der massiven Betonkonstruktion eines Pavillons" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/2241144/pexels-photo-2241144.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Fundamentfreier Aufbau eines Wetterschutzes auf Schotter" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <p className="mt-4 text-xl text-brand-muted leading-relaxed">
            Unser Überdachungselement aus bewehrtem Beton ist ein multifunktionales Modul, das langlebigen und ästhetischen Schutz vor Sonne und Regen bietet. Ideal für Haltestellen, Parkanlagen, Schulhöfe oder als zentraler Treffpunkt.
          </p>
          <div className="mt-10">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Vorteile unserer Beton-Überdachungen</h2>
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
            Beratung anfordern
          </Link>
        </div>
      </div>
      <BrochureRequestForm context="productpage" />
      <OtherProducts />
    </PageShell>
  );
};

export default ProductPavilionPage;