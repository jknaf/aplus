import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const ProductPumptrackPage: React.FC = () => {
  return (
    <PageShell title="Pumptrack aus Beton planen & bauen">
      <div className="text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Pumptracks aus Beton</h1>
           <p className="mt-2 text-lg text-brand-muted">Modulare Parcours für Bikes, Boards & Scooter</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <img src="https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" alt="Jugendliche auf einem Beton-Pumptrack von A+ Urban Design" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <img src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Ein Mountainbiker in einer Steilkurve des Pumptracks" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.pexels.com/photos/2241144/pexels-photo-2241144.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Modulare Betonelemente für einen langlebigen BMX Pumptrack" className="w-full h-auto object-cover rounded-lg shadow-md" />
            <img src="https://images.pexels.com/photos/5413303/pexels-photo-5413303.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Luftaufnahme eines fertigen und TÜV-zertifizierten Pumptrack-Parcours" className="w-full h-auto object-cover rounded-lg shadow-md" />
          </div>
        </div>
        <div>
          <p className="mt-4 text-xl text-brand-muted leading-relaxed">
            Ein Pumptrack ist ein Rundkurs für Mountainbikes, BMX, Skateboards und Scooter. Unsere TÜV-zertifizierten und GS-geprüften Elemente aus Beton ermöglichen den Bau langlebiger und wartungsarmer Pumptrack-Parcours in jeder Form und Länge.
          </p>
          <div className="mt-10">
            <h2 className="text-2xl font-bold font-heading border-b-2 border-brand-orange pb-2">Planung und Aufbau</h2>
            <p className="mt-4 text-brand-muted">
              Unsere modularen Betonelemente können auf bestehenden Flächen montiert oder in eine neu angelegte Strecke aus Beton oder Asphalt integriert werden. Kontaktieren Sie uns für eine professionelle Planung.
            </p>
          </div>
          <Link to="/kontakt" className="mt-12 inline-block bg-brand-orange text-white font-bold py-4 px-10 rounded-md shadow-lg hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300">
            Planung anfragen
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default ProductPumptrackPage;