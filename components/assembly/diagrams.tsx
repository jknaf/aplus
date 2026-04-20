import React from 'react';

const BrandDark = '#2C3530';
const Accent = '#6B8F4A';
const Muted = '#8A8A80';

export const FoundationDiagram: React.FC = () => (
  <svg viewBox="0 0 600 420" style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="Schnitt durch Kiesbett, Rieselschicht und Bodenplatte">
    <defs>
      <pattern id="am-kies" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.8" fill={BrandDark} opacity="0.35" />
        <circle cx="10" cy="8" r="2.4" fill={BrandDark} opacity="0.25" />
        <circle cx="6" cy="11" r="1.5" fill={BrandDark} opacity="0.3" />
        <circle cx="12" cy="2" r="1.2" fill={BrandDark} opacity="0.2" />
      </pattern>
      <pattern id="am-riesel" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="0.7" fill={BrandDark} opacity="0.5" />
        <circle cx="4.5" cy="4.5" r="0.8" fill={BrandDark} opacity="0.4" />
      </pattern>
      <pattern id="am-earth" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M0 10 L10 0" stroke={BrandDark} strokeOpacity="0.35" strokeWidth="0.6" />
        <path d="M-2 2 L2 -2" stroke={BrandDark} strokeOpacity="0.35" strokeWidth="0.6" />
      </pattern>
    </defs>

    <rect x="0" y="0" width="600" height="80" fill="#F2F0EB" />
    <path d="M0 80 L80 80 L80 360 L0 360 Z" fill="url(#am-earth)" />
    <path d="M520 80 L600 80 L600 360 L520 360 Z" fill="url(#am-earth)" />

    <rect x="80" y="160" width="440" height="140" fill="url(#am-kies)" stroke={BrandDark} strokeOpacity="0.3" strokeWidth="1" />
    <rect x="80" y="130" width="440" height="30" fill="url(#am-riesel)" stroke={BrandDark} strokeOpacity="0.4" strokeWidth="1" />
    <rect x="120" y="80" width="360" height="50" fill="#D9D6CD" stroke={BrandDark} strokeOpacity="0.7" strokeWidth="1.5" />
    <text x="300" y="110" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="14" fill={BrandDark} letterSpacing="1">BODENPLATTE · 16 cm</text>

    <line x1="0" y1="80" x2="600" y2="80" stroke={Accent} strokeWidth="1.5" strokeDasharray="4 4" />
    <text x="12" y="74" fontFamily="ui-monospace, monospace" fontSize="10" fill={Accent} letterSpacing="1.5">GEHFLÄCHE · ±0,00</text>

    <g stroke={BrandDark} strokeOpacity="0.5" strokeWidth="0.8" fontFamily="ui-monospace, monospace" fontSize="10" fill={BrandDark}>
      <line x1="535" y1="130" x2="555" y2="130" />
      <line x1="535" y1="160" x2="555" y2="160" />
      <line x1="548" y1="130" x2="548" y2="160" />
      <text x="560" y="149" letterSpacing="0.5">5 cm</text>

      <line x1="535" y1="160" x2="555" y2="160" />
      <line x1="535" y1="300" x2="555" y2="300" />
      <line x1="548" y1="160" x2="548" y2="300" />
      <text x="560" y="226" letterSpacing="0.5">40–60 cm</text>

      <line x1="100" y1="80" x2="115" y2="80" />
      <line x1="100" y1="130" x2="115" y2="130" />
      <line x1="108" y1="80" x2="108" y2="130" />
      <text x="38" y="109" letterSpacing="0.5">16 cm</text>
    </g>

    <g stroke={Accent} strokeWidth="1" fill={Accent} fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1">
      <line x1="80" y1="340" x2="520" y2="340" />
      <line x1="80" y1="332" x2="80" y2="348" />
      <line x1="520" y1="332" x2="520" y2="348" />
      <text x="300" y="362" textAnchor="middle" fontWeight="700">Ø 4,50 m</text>
    </g>

    <g fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="1" fill={BrandDark}>
      <line x1="300" y1="180" x2="300" y2="220" stroke={Accent} strokeWidth="1" />
      <circle cx="300" cy="180" r="3" fill={Accent} />
      <text x="300" y="240" textAnchor="middle" fontWeight="700" fill={Accent}>KIESBETT · KÖRNUNG 10–40 mm</text>
      <text x="300" y="256" textAnchor="middle" fill={Muted}>VERDICHTET · FROSTSICHER</text>

      <line x1="380" y1="145" x2="420" y2="108" stroke={Accent} strokeWidth="1" />
      <text x="430" y="106" fontWeight="700" fill={Accent}>RIESELSCHICHT · 5–10 mm</text>
    </g>
  </svg>
);

export const RiggingDiagram: React.FC = () => (
  <svg viewBox="0 0 500 400" style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="Dreifach-Anschlag mit Seilösen M 24">
    <defs>
      <pattern id="am-concrete2" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="4" height="4" fill="#E5E3DC" />
        <circle cx="1" cy="1" r="0.4" fill={BrandDark} opacity="0.2" />
        <circle cx="3" cy="3" r="0.4" fill={BrandDark} opacity="0.18" />
      </pattern>
    </defs>

    <g stroke={BrandDark} strokeWidth="2" fill="none">
      <line x1="250" y1="0" x2="250" y2="40" />
      <circle cx="250" cy="48" r="10" fill="#E5E3DC" />
      <path d="M 245 55 C 240 65, 245 72, 250 68 C 255 72, 260 65, 255 55" fill={BrandDark} />
    </g>
    <text x="265" y="50" fontFamily="ui-monospace, monospace" fontSize="10" fill={Muted} letterSpacing="1">HAKEN</text>

    <g stroke={Accent} strokeWidth="2" fill="none">
      <line x1="250" y1="60" x2="130" y2="220" />
      <line x1="250" y1="60" x2="250" y2="220" />
      <line x1="250" y1="60" x2="370" y2="220" />
    </g>

    <g>
      <path d="M 80 240 L 80 280 L 420 280 L 420 240 A 170 120 0 0 0 80 240 Z" fill="url(#am-concrete2)" stroke={BrandDark} strokeWidth="1.5" />
    </g>

    <g fill={Accent} stroke={BrandDark} strokeWidth="1">
      <circle cx="130" cy="220" r="7" />
      <circle cx="250" cy="220" r="7" />
      <circle cx="370" cy="220" r="7" />
    </g>

    <g>
      <rect x="200" y="298" width="100" height="22" rx="2" fill="white" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="250" y="313" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill="#DC2626" letterSpacing="1">NICHT AN BÄNKEN!</text>
    </g>

    <g>
      <rect x="192" y="245" width="116" height="28" rx="14" fill={BrandDark} />
      <text x="250" y="263" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="13" fill="white" letterSpacing="1">ca. 3,3 t</text>
    </g>

    <g fontFamily="ui-monospace, monospace" fontSize="10" fill={BrandDark} letterSpacing="1">
      <text x="40" y="228" fontWeight="700" fill={Accent}>3× SEILÖSE M 24</text>
      <text x="40" y="242" fontSize="9" fill={Muted}>stirnseitig · M 24 Ankerhülse</text>

      <text x="125" y="380" textAnchor="middle" fontWeight="700">1</text>
      <text x="250" y="380" textAnchor="middle" fontWeight="700">2</text>
      <text x="375" y="380" textAnchor="middle" fontWeight="700">3</text>
    </g>

    <line x1="0" y1="355" x2="500" y2="355" stroke={BrandDark} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 4" />
  </svg>
);

export const SetzreihenfolgeDiagram: React.FC = () => (
  <svg viewBox="0 0 600 220" style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="Setzreihenfolge: Halbrund A, Halbrund B, Mittelteil">
    <defs>
      <pattern id="am-concrete3" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="4" height="4" fill="#E5E3DC" />
        <circle cx="1" cy="1" r="0.4" fill={BrandDark} opacity="0.2" />
      </pattern>
    </defs>

    <g transform="translate(30,30)">
      <circle cx="70" cy="70" r="70" fill="none" stroke={BrandDark} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M 10 70 A 60 60 0 0 1 130 70 L 100 70 A 30 30 0 0 0 40 70 Z" fill="url(#am-concrete3)" stroke={BrandDark} strokeWidth="1" />
      <path d="M 10 70 A 60 60 0 0 0 130 70 L 100 70 A 30 30 0 0 1 40 70 Z" fill="url(#am-concrete3)" stroke={BrandDark} strokeWidth="1" opacity="0.35" />
      <text x="70" y="170" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={BrandDark} letterSpacing="1">01 · HALBRUND A</text>
    </g>

    <g transform="translate(210,30)">
      <circle cx="70" cy="70" r="70" fill="none" stroke={BrandDark} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M 10 70 A 60 60 0 0 1 130 70 L 100 70 A 30 30 0 0 0 40 70 Z" fill="url(#am-concrete3)" stroke={BrandDark} strokeWidth="1" />
      <path d="M 10 70 A 60 60 0 0 0 130 70 L 100 70 A 30 30 0 0 1 40 70 Z" fill="url(#am-concrete3)" stroke={BrandDark} strokeWidth="1" />
      <text x="70" y="170" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={BrandDark} letterSpacing="1">02 · HALBRUND B</text>
    </g>

    <g transform="translate(390,30)">
      <circle cx="70" cy="70" r="70" fill="none" stroke={BrandDark} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M 10 70 A 60 60 0 0 1 130 70 L 100 70 A 30 30 0 0 0 40 70 Z" fill="url(#am-concrete3)" stroke={BrandDark} strokeWidth="1" />
      <path d="M 10 70 A 60 60 0 0 0 130 70 L 100 70 A 30 30 0 0 1 40 70 Z" fill="url(#am-concrete3)" stroke={BrandDark} strokeWidth="1" />
      <circle cx="70" cy="70" r="30" fill={Accent} opacity="0.85" stroke={BrandDark} strokeWidth="1" />
      <circle cx="70" cy="70" r="14" fill="#F2F0EB" stroke={BrandDark} strokeWidth="1" />
      <text x="70" y="170" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" fill={Accent} letterSpacing="1">03 · MITTELTEIL</text>
    </g>

    <g stroke={Muted} strokeWidth="1.5" fill="none">
      <path d="M 170 100 L 200 100" />
      <polygon points="200,100 194,96 194,104" fill={Muted} stroke="none" />
      <path d="M 350 100 L 380 100" />
      <polygon points="380,100 374,96 374,104" fill={Muted} stroke="none" />
    </g>
  </svg>
);

