import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'bmx-anlagen' && p.id !== 'skate-anlagen').slice(0, 3);
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

const ProductBmxPage: React.FC = () => {
  useEffect(() => {
    document.title = "BMX-Anlagen & BMX-Parks aus Beton | A+ Urban Design";
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', 'Robuste BMX-Anlagen und BMX-Parks aus modularen Betonelementen. TÜV-geprüfte Jump-Ramps, Dirt-Lines und mehr. Vandalismussicher und wartungsarm.');
    }

    const keywordsTag = document.querySelector('meta[name="keywords"]');
    if (keywordsTag) {
      keywordsTag.setAttribute('content', 'BMX-Anlagen, BMX-Park, Beton BMX-Park, Jump-Ramps, Dirt-Lines, Modulare BMX-Elemente, Pumptrack');
    }
  }, []);

  return (
    <PageShell title="Planung & Bau von BMX-Anlagen">
       <div className="text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">BMX-Anlagen aus Beton</h1>
           <p className="mt-2 text-lg text-brand-muted">Für Dirt, Park und Street</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/248559/pexels-photo-248559.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="BMX-Fahrer in einer professionellen BMX-Anlage aus Beton" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/165438/pexels-photo-165438.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Jump-Ramps für eine BMX-Anlage" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/34521/bmx-rider-dramatic-lighting-action.jpg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Beton-Bowl in einem BMX-Park" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Modulare Elemente für einen kombinierten BMX- und Pumptrack-Park" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <p className="mt-4 text-xl text-brand-muted leading-relaxed">
            Unsere BMX-Parks aus Beton bieten die perfekte Kombination aus Haltbarkeit und Flexibilität. Ob für große Sprünge, technische Lines oder flowige Runden – wir planen und bauen Ihre individuelle BMX-Anlage nach höchsten Sicherheitsstandards.
          </p>
          <div className="mt-10">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Features unserer BMX-Parks</h2>
            <ul className="mt-6 space-y-4 text-brand-muted">
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Individuelle Planung:</span> Maßgeschneiderte 3D-Layouts für jeden Bedarf.</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Beton-Elemente:</span> Jump-Ramps, Dirt-Lines, Spines, Bowls und mehr.</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Maximale Sicherheit:</span> TÜV-geprüft nach DIN EN 14974.</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Fundamentfrei:</span> Reduziert Baukosten und -zeit erheblich.</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Kombinierbar:</span> Ideal in Verbindung mit Pumptracks und Skate-Anlagen.</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> Vandalismusresistent und extrem wartungsarm.</li>
            </ul>
          </div>
          <Link to="/kontakt" className="mt-12 inline-block bg-brand-orange text-white font-bold py-4 px-10 rounded-md shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
            BMX-Park anfragen
          </Link>
        </div>
      </div>
      <OtherProducts />
    </PageShell>
  );
};

export default ProductBmxPage;