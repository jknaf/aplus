import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const ProductChangingCabinePage: React.FC = () => {
  return (
    <PageShell title="Vandalismussichere Umkleidekabine 'Die Schnecke'">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <img src="https://images.pexels.com/photos/18449733/pexels-photo-18449733.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Architektonische Beton-Umkleidekabine in Schneckenform." className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img src="https://images.pexels.com/photos/2241144/pexels-photo-2241144.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Innenansicht der fugenlosen und leicht zu reinigenden Bodenplatte aus Beton" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.pexels.com/photos/5413303/pexels-photo-5413303.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Die Umkleidekabine 'Schnecke' fügt sich harmonisch in die urbane Landschaft ein" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Detail der robusten und vandalismusresistenten Betonoberfläche" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading">Die Schnecke: Fundamentfreie Umkleidekabine für Freibäder</h1>
          <p className="mt-4 text-lg text-gray-600">
            Unsere Umkleidekabine in Schneckenform bietet berührungslosen Zugang und höchste Robustheit. Die fugenlose Bodenplatte wird direkt auf ein Schotterbett gesetzt, ist leicht zu reinigen und verhindert Unkrautwuchs.
          </p>
          <div className="mt-8">
            <h2 className="text-2xl font-bold font-heading">Merkmale der Beton-Umkleidekabine</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside text-gray-700">
              <li><span className="font-bold">Materialien:</span> Bewehrter Beton und Edelstahl</li>
              <li><span className="font-bold">Fundamentfrei:</span> Aufbau auf verdichtetem Schotterbett</li>
              <li>Witterungsbeständig und ganzjährig einsetzbar</li>
              <li><span className="font-bold">Extrem robust:</span> Sicher gegen Vandalismus (Schnitt, Feuer)</li>
              <li><span className="font-bold">Wartungsarm:</span> Keine beweglichen Teile, kein Verrotten</li>
              <li><span className="font-bold">Missbrauchhemmend:</span> Offenes Design für soziale Kontrolle</li>
              <li>Einfache Montage ohne Fundament- oder Pflasterarbeiten</li>
            </ul>
          </div>
          <Link to="/kontakt" className="mt-10 inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
            Angebot für Umkleidekabine anfordern
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default ProductChangingCabinePage;