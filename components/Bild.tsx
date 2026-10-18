import React from 'react';
import { HOCH, SRCSET } from '../bildvarianten';

// <img> mit den kleineren Varianten aus scripts/bildvarianten.py.
// hoch: Handys (bis 767 px) laden den Hochformat-Zuschnitt. Für Header und
// hochkante Kacheln mit object-cover, wo vom Querformat nur die Mitte zu sehen ist.
// Fotos ohne Varianten bleiben ein normales <img>.
type Props = React.ImgHTMLAttributes<HTMLImageElement> & { src: string; hoch?: boolean };

const Bild: React.FC<Props> = ({ src, hoch, sizes = '100vw', ...rest }) => (
  <picture className="contents">
    {hoch && HOCH[src] && <source media="(max-width: 767px)" srcSet={HOCH[src]} />}
    <img src={src} srcSet={SRCSET[src]} sizes={SRCSET[src] && sizes} {...rest} />
  </picture>
);

export default Bild;
