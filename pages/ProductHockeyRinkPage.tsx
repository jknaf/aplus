import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const ProductHockeyRinkPage: React.FC = () => {
  return (
    <PageShell title="Modulare Hockey-Banden (fundamentfrei)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <img src="https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Rote Inlinehockey-Bande aus Beton und Edelstahl" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Eishockey-Feld, das die Vielseitigkeit der Banden zeigt" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.pexels.com/photos/4167333/pexels-photo-4167333.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Kinder spielen Rollhockey auf einem Feld mit den witterungsbeständigen Banden" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Modulare Elemente der Hockey-Bande, integriert in einen Skatepark" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading">Fundamentfreie Banden für Roll-, Inline- & Eishockey</h1>
          <p className="mt-4 text-lg text-gray-600">
            Unsere modularen Bandensysteme benötigen keine Fundamente oder Bodenbefestigungen. Sie sind flexibel einsetzbar für diverse Sportarten und können durch ein Dichtungsprofil auch für Eisflächen genutzt werden.
          </p>
          <div className="mt-8">
            <h2 className="text-2xl font-bold font-heading">Vorteile unserer Hockey-Einfassungen</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-gray-700">
              <li>Einfache Montage ohne Fundamente</li>
              <li>Vielseitig einsetzbar für Rollhockey, Inlinehockey und Eishockey</li>
              <li><span className="font-bold">Witterungsbeständige Materialien:</span> Beton, Edelstahl, Laminat, Gummi</li>
              <li>Geringer Wartungsaufwand</li>
              <li><span className="font-bold">Modular erweiterbar</span> in 1,5-m-Schritten</li>
              <li><span className="font-bold">Verschiedene Höhen verfügbar</span> (40 cm und 110 cm)</li>
            </ul>
          </div>
          <Link to="/kontakt" className="mt-10 inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
            Angebot für Hockey-Banden anfordern
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default ProductHockeyRinkPage;