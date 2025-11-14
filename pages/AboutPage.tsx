import React from 'react';
import PageShell from '../components/PageShell';

const AboutPage: React.FC = () => {
  return (
    <PageShell title="Über Uns">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter">Über A+ Urban Design: Experten für Beton-Skateparks</h1>
         <p className="mt-2 text-lg text-brand-muted">Beton und Stahl für Freizeit und Sport</p>
      </div>

      <div className="mt-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2">
            <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop" alt="Planung eines urbanen Skateparks über Bauplänen durch das A+ Urban Design Team." className="rounded-lg shadow-xl w-full"/>
        </div>
        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold font-heading">Unsere Philosophie</h2>
          <p className="mt-4 text-brand-muted text-lg leading-relaxed">
            Wir glauben, dass öffentliche Räume mehr sind als nur freie Flächen. Sie sind Treffpunkte, Sportstätten und Orte der Erholung. Deshalb entwickeln wir Produkte, die nicht nur funktional und extrem robust sind, sondern sich auch ästhetisch in das städtische oder landschaftliche Umfeld einfügen.
          </p>
          <p className="mt-4 text-brand-muted">
            Unser Fokus auf modulare, fundamentfreie Bauweisen ermöglicht eine schnelle, kosteneffiziente und flexible Realisierung von Projekten, die Generationen überdauern. Nachhaltigkeit ist ein Kern unserer Arbeit. Durch die Verwendung von recycelbaren Materialien und die Reduzierung von Bodenversiegelung tragen wir aktiv zum Umweltschutz bei.
          </p>
        </div>
      </div>

      <div className="mt-24">
         <h2 className="text-3xl font-bold font-heading text-center">Unsere Leistungen</h2>
         <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-brand-surface rounded-lg">
                <h3 className="font-bold text-xl font-heading">Planung & Beratung</h3>
                <p className="mt-2 text-brand-muted">Wir unterstützen Architekten, Stadtplaner und Kommunen von der ersten Idee an. Gemeinsam entwickeln wir maßgeschneiderte 3D-Konzepte für Ihren Standort.</p>
            </div>
             <div className="p-6 bg-brand-surface rounded-lg">
                <h3 className="font-bold text-xl font-heading">Herstellung</h3>
                <p className="mt-2 text-brand-muted">In unserer eigenen Produktion fertigen wir alle Betonelemente nach höchsten Qualitätsstandards. "Made in Germany" für maximale Langlebigkeit.</p>
            </div>
             <div className="p-6 bg-brand-surface rounded-lg">
                <h3 className="font-bold text-xl font-heading">Montage</h3>
                <p className="mt-2 text-brand-muted">Unsere erfahrenen Montageteams sorgen für einen schnellen und reibungslosen Aufbau vor Ort – meist in nur wenigen Tagen und ohne aufwendige Fundamentarbeiten.</p>
            </div>
         </div>
      </div>
    </PageShell>
  );
};

export default AboutPage;