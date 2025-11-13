import React from 'react';
import PageShell from '../components/PageShell';

const AboutPage: React.FC = () => {
  return (
    <PageShell title="Über Uns">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-heading">Beton und Stahl für Freizeit und Sport</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          A+ Urban Design ist Ihr Spezialist für die Gestaltung langlebiger und attraktiver öffentlicher Räume in der DACH-Region.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div >
            <img src="https://images.unsplash.com/photo-1616469692323-1718c2378a52?auto=format&q=80&w=600&h=450&fit=crop" alt="Architekten-Team bei der Planung eines urbanen Skateparks über Bauplänen." className="rounded-lg shadow-xl w-full"/>
        </div>
        <div>
          <h2 className="text-2xl font-bold font-heading">Unsere Philosophie</h2>
          <p className="mt-4 text-gray-700">
            Wir glauben, dass öffentliche Räume mehr sind als nur freie Flächen. Sie sind Treffpunkte, Sportstätten und Orte der Erholung. Deshalb entwickeln wir Produkte, die nicht nur funktional und extrem robust sind, sondern sich auch ästhetisch in das städtische oder landschaftliche Umfeld einfügen. Unser Fokus auf modulare, fundamentfreie Bauweisen ermöglicht eine schnelle, kosteneffiziente und flexible Realisierung von Projekten, die Generationen überdauern.
          </p>
          <p className="mt-4 text-gray-700">
            Nachhaltigkeit ist ein Kern unserer Arbeit. Durch die Verwendung von recycelbaren Materialien und die Reduzierung von Bodenversiegelung tragen wir aktiv zum Umweltschutz bei.
          </p>
        </div>
      </div>

      <div className="mt-20">
         <h2 className="text-2xl font-bold font-heading text-center">Unsere Leistungen</h2>
         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border border-brand-gray-light rounded-lg">
                <h3 className="font-bold text-xl font-heading">Planung & Beratung</h3>
                <p className="mt-2 text-gray-600">Wir unterstützen Architekten, Stadtplaner und Kommunen von der ersten Idee an. Gemeinsam entwickeln wir maßgeschneiderte Konzepte für Ihren Standort.</p>
            </div>
             <div className="p-6 border border-brand-gray-light rounded-lg">
                <h3 className="font-bold text-xl font-heading">Herstellung</h3>
                <p className="mt-2 text-gray-600">In unserer eigenen Produktion fertigen wir alle Betonelemente nach höchsten Qualitätsstandards. "Made in Germany" für maximale Langlebigkeit.</p>
            </div>
             <div className="p-6 border border-brand-gray-light rounded-lg">
                <h3 className="font-bold text-xl font-heading">Montage</h3>
                <p className="mt-2 text-gray-600">Unsere erfahrenen Montageteams sorgen für einen schnellen und reibungslosen Aufbau vor Ort – meist in nur wenigen Tagen und ohne aufwendige Fundamentarbeiten.</p>
            </div>
         </div>
      </div>
    </PageShell>
  );
};

export default AboutPage;