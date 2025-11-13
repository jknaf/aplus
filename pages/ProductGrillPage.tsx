import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const ProductGrillPage: React.FC = () => {
  return (
    <PageShell title="Öffentliche Grillstelle aus Beton">
       <div className="text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Robuste Grillstelle</h1>
           <p className="mt-2 text-lg text-brand-muted">Für den öffentlichen Raum</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <img src="https://images.pexels.com/photos/5413303/pexels-photo-5413303.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Öffentliche Grillstelle aus Beton mit Edelstahlrost" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Detailaufnahme des diebstahlsicheren Grillrosts aus Edelstahl" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.pexels.com/photos/4167333/pexels-photo-4167333.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Grillplatz im Einsatz bei einem Fest im Park neben einem Skatepark" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.pexels.com/photos/18449733/pexels-photo-18449733.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Aufbau der fundamentfreien Grillstelle auf einem Schotterbett" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <p className="mt-4 text-xl text-brand-muted leading-relaxed">
            Unser Grillplatz aus Betonfertigteilen ist ideal für öffentliche Räume wie Freibäder, Campingplätze und Sportanlagen. Die Konstruktion ist für einfache Bedienung und Langlebigkeit konzipiert.
          </p>
          <div className="mt-10">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Eigenschaften & Vorteile</h2>
            <ul className="mt-6 space-y-4 text-brand-muted">
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Materialien:</span> Beton, Edelstahl und verzinkter Stahl</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> Extrem robust und witterungsbeständig</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> Höhenverstellbarer Grillrost aus Edelstahl (diebstahlsicher)</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> Keine Fundamente notwendig (Aufbau auf verdichtetem Schotterbett)</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> Integrierte Bodenplatte (keine Pflasterarbeiten nötig)</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> Recycelbare Materialien</li>
              <li className="flex items-start"><span className="text-brand-orange mr-3 mt-1">&#10003;</span> <span className="font-bold mr-2">Technische Daten:</span> Durchmesser 4,20 m, Höhe 2,40 m</li>
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

export default ProductGrillPage;