import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const ProductGrillPage: React.FC = () => {
  return (
    <PageShell title="Öffentliche Grillstelle aus Beton">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <img src="https://images.unsplash.com/photo-1587133999960-3913054f19b2?auto=format&q=80&w=800&h=600&fit=crop" alt="Öffentliche Grillstelle aus Beton mit Edelstahlrost" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img src="https://images.unsplash.com/photo-1594997880552-323387693ab8?auto=format&q=80&w=300&h=200&fit=crop" alt="Detailaufnahme des diebstahlsicheren Grillrosts aus Edelstahl" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.unsplash.com/photo-1558034011-7386a3449e7b?auto=format&q=80&w=300&h=200&fit=crop" alt="Grillplatz im Einsatz bei einem Fest im Park neben einem Skatepark" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.unsplash.com/photo-1603986514725-b824b2a4a755?auto=format&q=80&w=300&h=200&fit=crop" alt="Aufbau der fundamentfreien Grillstelle auf einem Schotterbett" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading">Robuste Grillstelle für den öffentlichen Raum</h1>
          <p className="mt-4 text-lg text-gray-600">
            Unser Grillplatz aus Betonfertigteilen ist ideal für öffentliche Räume wie Freibäder, Campingplätze und Sportanlagen. Die Konstruktion ist für einfache Bedienung und Langlebigkeit konzipiert.
          </p>
          <div className="mt-8">
            <h2 className="text-2xl font-bold font-heading">Eigenschaften & Vorteile unserer Betongrillstelle</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-gray-700">
              <li><span className="font-bold">Materialien:</span> Beton, Edelstahl und verzinkter Stahl</li>
              <li>Extrem robust und witterungsbeständig</li>
              <li>Höhenverstellbarer Grillrost aus Edelstahl (diebstahlsicher)</li>
              <li>Keine Fundamente notwendig (Aufbau auf verdichtetem Schotterbett)</li>
              <li>Integrierte Bodenplatte (keine Pflasterarbeiten nötig)</li>
              <li>Recycelbare Materialien</li>
              <li><span className="font-bold">Technische Daten:</span> Durchmesser 4,20 m, Höhe 2,40 m</li>
            </ul>
          </div>
          <Link to="/kontakt" className="mt-10 inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
            Angebot für Grillstelle anfordern
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default ProductGrillPage;