import React, { useEffect, useRef, useState } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>;
    }
  }
}

type Kamera = { ziel: [number, number, number]; abstand: number };

// 3D-Ansicht eines Katalog-Elements. Das 3D-Modell lädt schon beim Öffnen unsichtbar unter dem Vorschaubild.
// Das Bild bleibt stehen, bis man selbst zieht, klickt oder scrollt; dann übernimmt das Modell ohne Sprung:
// Licht und Schatten sind aus dem Vorschaubild eingebacken (unbeleuchtete Materialien, Schattenplatte),
// Blickpunkt und Abstand kommen aus Blender (kamera), Bildwinkel wie dort (50 mm = 39,6°).
const ModellAnsicht: React.FC<{ src: string; poster: string; alt: string; kamera?: Kamera }> = ({ src, poster, alt, kamera }) => {
  const [bereit, setBereit] = useState(false);
  const [geladen, setGeladen] = useState(false);
  const [aktiv, setAktiv] = useState(false);
  const ansicht = useRef<HTMLElement & Record<string, any>>(null);
  useEffect(() => {
    import('@google/model-viewer').then(() => setBereit(true));
  }, []);
  useEffect(() => {
    const mv = ansicht.current;
    if (!bereit || !mv) return;
    // Das Vorschaubild füllt die schmalere Seite der Fläche (object-contain); dort muss auch das Modell 39,6° zeigen.
    // model-viewer rechnet field-of-view intern um, darum einmal nachmessen und angleichen.
    // ponytail: nur beim Laden, bei späterer Größenänderung der Fläche nicht neu
    const fertig = () => {
      const rad = Math.PI / 180;
      const { width, height } = mv.getBoundingClientRect();
      const soll = 2 * Math.atan(Math.tan(19.8 * rad) / Math.min(1, width / height));
      const k = Math.tan((mv.getFieldOfView() * rad) / 2) / Math.tan(19.8 * rad);
      mv.fieldOfView = `${2 * Math.atan(Math.tan(soll / 2) / k)}rad`;
      mv.jumpCameraToGoal();
      setGeladen(true);
    };
    const bewegt = (ev: Event) => (ev as CustomEvent).detail?.source === 'user-interaction' && setAktiv(true);
    mv.addEventListener('load', fertig);
    mv.addEventListener('camera-change', bewegt);
    return () => { mv.removeEventListener('load', fertig); mv.removeEventListener('camera-change', bewegt); };
  }, [bereit]);

  const k = kamera ?? { ziel: [0, 0, 0], abstand: 5 };
  const zeigeModell = geladen && aktiv;
  return (
    <div className="relative w-full h-full cursor-grab" onPointerDown={() => setAktiv(true)} onWheel={() => setAktiv(true)}>
      {bereit && (
        <model-viewer
          ref={ansicht}
          src={src}
          alt={alt}
          loading="eager"
          camera-controls=""
          interaction-prompt="none"
          shadow-intensity="0"
          tone-mapping="none"
          camera-target={kamera ? k.ziel.map((v) => `${v}m`).join(' ') : 'auto auto auto'}
          camera-orbit={`38.7deg 68.8deg ${kamera ? `${k.abstand}m` : 'auto'}`}
          field-of-view="39.6deg"
          max-field-of-view="70deg"
          max-camera-orbit="auto auto 100m"
          // sonst rechnet model-viewer den Mindestabstand aus der Schattenplatte und startet bei Geländern zu weit weg
          min-camera-orbit="auto auto 0.3m"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'transparent', opacity: zeigeModell ? 1 : 0 } as React.CSSProperties}
        />
      )}
      <img
        src={poster}
        alt={alt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ opacity: zeigeModell ? 0 : 1 }}
      />
    </div>
  );
};

export default ModellAnsicht;
