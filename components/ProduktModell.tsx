import React, { useState } from 'react';
import { useT } from '../i18n';
import ModellAnsicht from './katalog/ModellAnsicht';

// 3D-Block der Produktseiten (vor „Technische Daten“): Katalogmodell zum Drehen, bei mehreren Ausführungen mit Auswahl.
// Modelle und Vorschaubilder kommen aus 08_CAD_Blender/10_Katalog (katalog_bereiche.json), Kamera aus glTF extras.kamera.
export type Ausfuehrung = {
    slug: string;
    name: string;
    masse: string;
    zusatz?: string;
    kamera: { ziel: [number, number, number]; abstand: number };
};

const ProduktModell: React.FC<{ ausfuehrungen: Ausfuehrung[]; className?: string }> = ({ ausfuehrungen, className = '' }) => {
    const t = useT();
    const [wahl, setWahl] = useState(0);
    const a = ausfuehrungen[wahl];
    return (
        <div className={className}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-orange">{t('3D-Modell', '3D model', 'Modèle 3D')}</span>
                <p className="text-brand-dark/75 leading-relaxed max-w-md">
                    {t('Mit der Maus drehen, mit dem Mausrad näher heran. Auf dem Handy mit einem Finger drehen, mit zwei zoomen.',
                       'Drag with the mouse to rotate, scroll to zoom. On a phone, rotate with one finger and zoom with two.',
                       'Faites pivoter avec la souris, zoomez avec la molette. Sur téléphone, pivotez avec un doigt et zoomez avec deux.')}
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="relative flex-1 aspect-[4/3] lg:aspect-auto lg:h-[560px] bg-[#E5E3DC] rounded-xl overflow-hidden">
                    <ModellAnsicht key={a.slug} src={`/katalog/modelle/${a.slug}.gltf`} poster={`/katalog/bilder/${a.slug}.webp`} kamera={a.kamera} alt={`${t('3D-Modell', '3D model', 'Modèle 3D')} ${a.name}`} />
                    <div className="absolute left-4 bottom-4 px-3 py-2 rounded bg-brand-dark text-white font-mono text-xs md:text-sm pointer-events-none">{a.masse}</div>
                </div>
                {ausfuehrungen.length > 1 && (
                    <div className="lg:w-80 flex flex-col gap-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-brand-dark/60">{t('Ausführung', 'Version', 'Version')}</span>
                        {ausfuehrungen.map((v, i) => (
                            <button
                                key={v.slug}
                                type="button"
                                onClick={() => setWahl(i)}
                                aria-pressed={i === wahl}
                                className={`min-h-[64px] px-4 py-3 rounded-lg text-left flex flex-col gap-1 transition-colors ${i === wahl ? 'bg-white border-2 border-brand-orange' : 'border border-brand-dark/20 hover:border-brand-dark/50'}`}
                            >
                                <span className="font-heading font-bold text-lg">{v.name}</span>
                                {v.zusatz && <span className="text-sm text-brand-dark/60">{v.zusatz}</span>}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProduktModell;
