import React, { useEffect, useRef, useState } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>;
    }
  }
}

// 3D-Ansicht eines Katalog-Elements. Zuerst steht das gerenderte Vorschaubild still; das 3D-Modell übernimmt erst,
// wenn man selbst zieht, klickt oder scrollt. So springt beim Öffnen nichts.
// Kamera wie beim Vorschaubild (Blender: Richtung 1/-1,25/0,62, 50 mm), damit der Wechsel vom Bild zum Modell deckungsgleich ist.
const ModellAnsicht: React.FC<{ src: string; poster: string; alt: string }> = ({ src, poster, alt }) => {
  const [aktiv, setAktiv] = useState(false);
  const [bereit, setBereit] = useState(false);
  const ansicht = useRef<HTMLElement & Record<string, any>>(null);
  useEffect(() => {
    if (aktiv) import('@google/model-viewer').then(() => setBereit(true));
  }, [aktiv]);
  // Abstand wie in Blender: Radius der Bounding-Box / sin(halber Bildwinkel) * 1,3
  useEffect(() => {
    const mv = ansicht.current;
    if (!bereit || !mv) return;
    const geladen = () => {
      const d = mv.getDimensions();
      const radius = Math.hypot(d.x, d.y, d.z) / 2;
      const abstand = (radius / Math.sin((39.6 / 2) * (Math.PI / 180))) * 1.3;
      mv.cameraOrbit = `38.7deg 68.8deg ${abstand.toFixed(2)}m`;
      mv.jumpCameraToGoal();
    };
    mv.addEventListener('load', geladen);
    return () => mv.removeEventListener('load', geladen);
  }, [bereit]);

  if (!bereit) {
    return (
      <button
        type="button"
        aria-label={`${alt} drehen`}
        onPointerDown={() => setAktiv(true)}
        onWheel={() => setAktiv(true)}
        onClick={() => setAktiv(true)}
        className="w-full h-full cursor-grab"
      >
        <img src={poster} alt={alt} className="w-full h-full object-contain" draggable={false} />
      </button>
    );
  }
  return (
    <model-viewer
      ref={ansicht}
      src={src}
      poster={poster}
      alt={alt}
      camera-controls=""
      interaction-prompt="none"
      shadow-intensity="1"
      shadow-softness="0.5"
      exposure="1"
      tone-mapping="agx"
      environment-image="/katalog/tageslicht.hdr"
      camera-orbit="38.7deg 68.8deg auto"
      field-of-view="39.6deg"
      max-field-of-view="45deg"
      max-camera-orbit="auto auto 100m"
      style={{ width: '100%', height: '100%', background: 'transparent', '--poster-color': 'transparent' } as React.CSSProperties}
    />
  );
};

export default ModellAnsicht;
