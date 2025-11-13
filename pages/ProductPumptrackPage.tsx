import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const ProductPumptrackPage: React.FC = () => {
  return (
    <PageShell title="Pumptrack aus Beton planen & bauen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <img src="https://images.unsplash.com/photo-1621379998858-a734d7425176?auto=format&q=80&w=800&h=600&fit=crop" alt="Jugendliche auf einem Beton-Pumptrack von A+ Urban Design" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img src="https://images.unsplash.com/photo-1562625243-5ca7393433a8?auto=format&q=80&w=300&h=200&fit=crop" alt="Ein Mountainbiker in einer Steilkurve des Pumptracks" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.unsplash.com/photo-1620242228960-911634989327?auto=format&q=80&w=300&h=200&fit=crop" alt="Modulare Betonelemente für einen langlebigen BMX Pumptrack" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.unsplash.com/photo-1504814120235-37a541a87795?auto=format&q=80&w=300&h=200&fit=crop" alt="Luftaufnahme eines fertigen und TÜV-zertifizierten Pumptrack-Parcours" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading">Modulare Pumptracks aus Beton</h1>
          <p className="mt-4 text-lg text-gray-600">
            Ein Pumptrack ist ein Rundkurs für Mountainbikes, BMX, Skateboards und Scooter. Unsere TÜV-zertifizierten und GS-geprüften Elemente aus Beton ermöglichen den Bau langlebiger und wartungsarmer Pumptrack-Parcours in jeder Form und Länge.
          </p>
          <div className="mt-8">
            <h2 className="text-2xl font-bold font-heading">Planung und Aufbau Ihres Pumptracks</h2>
            <p className="mt-4 text-gray-700">
              Unsere modularen Betonelemente können auf bestehenden Flächen montiert oder in eine neu angelegte Strecke aus Beton oder Asphalt integriert werden. Kontaktieren Sie uns für eine professionelle Planung.
            </p>
          </div>
          <Link to="/kontakt" className="mt-10 inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
            Pumptrack-Planung anfragen
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default ProductPumptrackPage;