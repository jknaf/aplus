import React, { useEffect, useState } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>;
    }
  }
}

// 3D-Ansicht eines Katalog-Elements. model-viewer wird erst geladen, wenn die Ansicht gebraucht wird.
const ModellAnsicht: React.FC<{ src: string; poster: string; alt: string }> = ({ src, poster, alt }) => {
  const [bereit, setBereit] = useState(false);
  useEffect(() => {
    import('@google/model-viewer').then(() => setBereit(true));
  }, []);

  if (!bereit) {
    return <img src={poster} alt={alt} className="w-full h-full object-contain" />;
  }
  return (
    <model-viewer
      src={src}
      poster={poster}
      alt={alt}
      camera-controls=""
      auto-rotate=""
      auto-rotate-delay="1500"
      rotation-per-second="18deg"
      interaction-prompt="none"
      shadow-intensity="1"
      shadow-softness="0.5"
      exposure="1"
      tone-mapping="agx"
      environment-image="/katalog/tageslicht.hdr"
      camera-orbit="35deg 65deg auto"
      style={{ width: '100%', height: '100%', background: 'transparent', '--poster-color': 'transparent' } as React.CSSProperties}
    />
  );
};

export default ModellAnsicht;
