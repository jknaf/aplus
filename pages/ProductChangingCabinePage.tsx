import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'umkleide' && p.id !== 'grillstelle').slice(0, 3);
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

const ProductChangingCabinePage: React.FC = () => {
  useEffect(() => {
    document.title = "Umkleidekabine aus Beton 'Die Schnecke' | A+ Urban Design";
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', "Die architektonische Umkleidekabine 'Die Schnecke' aus Beton: Vandalismussicher, fundamentfrei und wartungsarm. Perfekt für Freibäder, Sportanlagen und öffentliche Plätze.");
    }

    const keywordsTag = document.querySelector('meta[name="keywords"]');
    if (keywordsTag) {
      keywordsTag.setAttribute('content', 'Umkleidekabine Beton, Die Schnecke, vandalismussicher, fundamentfrei, Freibad Umkleide, wartungsarm, öffentlicher Raum, Stadtmobiliar');
    }
  }, []);

  return (
    <PageShell title="Vandalismussichere Umkleidekabine 'Die Schnecke'">
      <div className="text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Die Schnecke</h1>
           <p className="mt-2 text-lg text-brand-muted">Fundamentfreie Umkleidekabine für Freibäder & Sportanlagen</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/18449733/pexels-photo-18449733.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Architektonische Beton-Umkleidekabine 'Die Schnecke'." className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/2241144/pexels-photo-2241144.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Innenansicht der fugenlosen und leicht zu reinigenden Bodenplatte aus Beton" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/5413303/pexels-photo-5413303.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Die Umkleidekabine 'Schnecke' fügt sich harmonisch in die urbane Landschaft ein" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Detail der robusten und vandalismusresistenten Betonoberfläche" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <p className="mt-4 text-xl text-brand-muted leading-relaxed">
            Unsere Umkleidekabine in Schneckenform bietet berührungslosen Zugang und höchste Robustheit. Die fugenlose Bodenplatte wird direkt auf ein Schotterbett gesetzt, ist leicht zu reinigen und verhindert Unkrautwuchs.
          </p>
          <div className="mt-10">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Merkmale der Beton-Umkleidekabine</h2>
            <ul className="mt-6 space-y-4 text-brand-muted">
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Materialien:</span> Bewehrter Beton und Edelstahl</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Fundamentfrei:</span> Aufbau auf verdichtetem Schotterbett</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> Witterungsbeständig und ganzjährig einsetzbar</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Extrem robust:</span> Sicher gegen Vandalismus (Schnitt, Feuer)</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Wartungsarm:</span> Keine beweglichen Teile, kein Verrotten</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Missbrauchhemmend:</span> Offenes Design für soziale Kontrolle</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> Einfache Montage ohne Fundament- oder Pflasterarbeiten</li>
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

export default ProductChangingCabinePage;