import { Product, Project } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  {
    name: 'Produkte',
    href: '/produkte',
    subLinks: [
      { name: 'Skate-Anlagen', href: '/produkte/skate-anlagen' },
      { name: 'Pumptrack Beton', href: '/produkte/pumptrack-beton' },
      { name: 'BMX-Anlagen', href: '/produkte/bmx-anlagen' },
      { name: 'Grillstelle Beton', href: '/produkte/grillstelle-beton' },
      { name: 'Umkleidekabine', href: '/produkte/umkleidekabine-beton' },
      { name: 'Überdachung / Pavillon', href: '/produkte/ueberdachung-beton' },
      { name: 'Hockey-Banden', href: '/produkte/hockey-banden' },
    ]
  },
  { name: 'Planung', href: '/planung' },
  { name: 'Projekte', href: '/projekte' },
  { name: 'Über Uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
];

export const PRODUCTS: Product[] = [
   {
    id: 'skate-anlagen',
    title: 'Beton Skate-Anlagen',
    imageUrl: '/images/skate-bowls/skate-bowl-01.jpg',
    path: '/produkte/skate-anlagen',
    altText: 'Hochwertige Beton-Skateanlage mit Bowl und Street-Bereich bei Sonnenuntergang.',
    tuvCertified: true,
    usp: 'Das Original: TÜV-zertifiziert, flüsterleise und modular gebaut für die Ewigkeit.'
  },
  {
    id: 'pumptrack',
    title: 'Pumptrack aus Beton',
    imageUrl: '/images/pumptrack/pumptrack-01.jpg',
    path: '/produkte/pumptrack-beton',
    altText: 'Geschwungener Pumptrack aus Beton, ideal für Bikes und Boards.',
    tuvCertified: true,
    usp: 'Endloser Flow für alle Rollsportarten – wartungsarm, griffig und modular erweiterbar.'
  },
  {
    id: 'bmx-anlagen',
    title: 'BMX-Anlagen',
    imageUrl: '/images/skate-pipes/skate-pipe-01.jpg',
    path: '/produkte/bmx-anlagen',
    altText: 'Massive Beton-Pipe, perfekt geeignet für BMX und Skate.',
    tuvCertified: true,
    usp: 'Professionelle Dirt- & Park-Setups aus unverwüstlichem Hochleistungsbeton.'
  },
  {
    id: 'ueberdachung',
    title: 'Überdachung / Pavillon',
    imageUrl: '/images/ueberdachung/ueberdachung-unterstellplatz-02.jpg',
    path: '/produkte/ueberdachung-beton',
    altText: 'Minimalistische Betonüberdachung im urbanen Raum.',
    usp: 'Massiver, architektonischer Wetterschutz in zeitloser Sichtbeton-Ästhetik.'
  },
  {
    id: 'grillstelle',
    title: 'Öffentliche Grillstelle',
    imageUrl: '/images/grill/grill-stelle-02.jpg',
    path: '/produkte/grillstelle-beton',
    altText: 'Robuste Feuerstelle und Grillbereich aus Beton im öffentlichen Park.',
    usp: 'Der vandalismussichere Begegnungsort mit diebstahlgeschütztem Edelstahlrost.'
  },
  {
    id: 'umkleide',
    title: 'Umkleidekabine',
    imageUrl: '/images/umkleide/umkleidekabine-schnecke-04.jpg',
    path: '/produkte/umkleidekabine-beton',
    altText: 'Moderne Architektur mit Sichtbetonwänden.',
    usp: 'Die „Schnecke”: Hygienisch, türlos und vandalismushemmend konstruiert.'
  },
  {
    id: 'hockey',
    title: 'Hockey-Banden',
    imageUrl: '/images/hockey/roll-hockey-bande.jpg',
    path: '/produkte/hockey-banden',
    altText: 'Outdoor Hockey-Spielfeld mit robusten Banden.',
    tuvCertified: true,
    usp: 'Fundamentfreies Bandensystem für den ganzjährigen Profi-Einsatz.'
  },
];

export const PROJECTS: Project[] = [
    {
        id: "skatepark-neustadt",
        title: "Skatepark Neustadt",
        category: "Skatepark",
        year: 2023,
        imageUrl: "/images/skateparks/skatepark-01.jpg",
        images: [
            "/images/skateparks/skatepark-02.jpg",
            "/images/skateparks/skatepark-03.jpg",
            "/images/skateparks/skatepark-04.jpg",
        ],
        description: "Ein moderner Beton-Skatepark für die Gemeinde Neustadt, der sowohl Anfängern als auch Profis gerecht wird. Die Anlage umfasst eine vielfältige Street-Area mit Rails und Ledges sowie eine anspruchsvolle Bowl-Sektion. Alle Elemente sind aus unserem vandalismusresistenten Hochleistungsbeton gefertigt.",
        altText: "Luftaufnahme des Beton-Skateparks Neustadt mit Bowl und Street-Bereich.",
        productsUsed: [
            { name: "Quarter-Ramps & Half-Pipes", path: "/produkte/skate-anlagen" },
            { name: "Skate-Bowls", path: "/produkte/skate-anlagen" }
        ]
    },
    {
        id: "pumptrack-am-see",
        title: "Pumptrack am See",
        category: "Pumptrack",
        year: 2022,
        imageUrl: "/images/pumptrack/pumptrack-beton-elemente-01.jpg",
        images: [
             "/images/pumptrack/pumptrack-beton-module-03.jpg",
             "/images/pumptrack/pumptrack-beton-module-04.jpg",
        ],
        description: "Dieser flowige Pumptrack liegt idyllisch am Seeufer und bietet Fahrspaß für Fahrräder, Scooter und Skateboards. Die modularen Betonelemente ermöglichen einen abwechslungsreichen Kurs, der sich perfekt in die Landschaft einfügt.",
        altText: "Flowiger Pumptrack aus Beton am Seeufer für Fahrräder und Scooter.",
        productsUsed: [
            { name: "Modulare Pumptrack-Elemente", path: "/produkte/pumptrack-beton" },
        ]
    },
    {
        id: "grillplatz-stadtpark",
        title: "Grillplatz im Stadtpark",
        category: "Grillstelle",
        year: 2023,
        imageUrl: "/images/grill/grill-platz-01.jpg",
        images: [
             "/images/grill/grill-stelle-02.jpg",
             "/images/grill/grillstelle-background.jpg",
        ],
        description: "Für den zentralen Stadtpark wurde eine neue, barrierefreie Grill- und Begegnungszone geschaffen. Im Zentrum steht unsere robuste Betongrillstelle, die zum gemeinsamen Verweilen einlädt, direkt neben der neuen Skate-Anlage.",
        altText: "Vandalismusresistente Betongrillstelle im Stadtpark neben einem Skatepark.",
        productsUsed: [
            { name: "Öffentliche Grillstelle", path: "/produkte/grillstelle-beton" },
        ]
    },
    {
        id: "hockeyfeld-berlin",
        title: "Inlinehockey-Feld Berlin",
        category: "Hockey-Bande",
        year: 2021,
        imageUrl: "/images/hockey/inline-hockey-bande-03.jpg",
        images: [
             "/images/hockey/hockey-einfassung-01.jpg",
             "/images/hockey/inline-hockey-bande-02.jpg",
        ],
        description: "Sanierung und Modernisierung des Inlinehockey-Feldes in Berlin-Kreuzberg mit unserem fundamentfreien Bandensystem. Das Feld ist nun für den ganzjährigen Spielbetrieb geeignet.",
        altText: "Professionelles Inlinehockey-Feld mit robusten Banden in Berlin.",
        productsUsed: [
            { name: "Hockey-Banden (110cm)", path: "/produkte/hockey-banden" },
        ]
    },
    {
        id: "umkleide-freibad",
        title: "Umkleidekabinen Freibad Süd",
        category: "Umkleidekabine",
        year: 2022,
        imageUrl: "/images/umkleide/umkleide-kabine-01.jpg",
        images: [
            "/images/umkleide/umkleidekabine-freibad-03.jpg",
            "/images/umkleide/umkleide-kabine-02.jpg",
        ],
        description: "Im Rahmen der Modernisierung des Freibads Süd wurden sechs unserer Umkleidekabinen installiert. Sie bieten den Badegästen eine moderne, saubere und sichere Umkleidemöglichkeit.",
        altText: "Reihe von architektonischen Beton-Umkleidekabinen.",
        productsUsed: [
            { name: 'Umkleidekabine', path: "/produkte/umkleidekabine-beton" },
        ]
    },
    {
        id: "skateplaza-hamburg",
        title: "Skate-Plaza Hamburg",
        category: "Skatepark",
        year: 2024,
        imageUrl: "/images/skate-anlagen/skate-anlage-01.jpg",
        description: "Ein urbaner Treffpunkt für die Skateszene in Hamburg. Der Plaza wurde mit verschiedenen Street-Elementen ausgestattet, die sich harmonisch in das Stadtbild einfügen.",
        altText: "Urbaner Skate-Plaza in Hamburg mit modularen Beton-Elementen.",
        images: [
            "/images/skate-anlagen/skateanlage-03.jpg",
            "/images/skate-anlagen/skateanlagen-04.jpg",
        ],
        productsUsed: [
            { name: "Modulare Skate-Elemente", path: "/produkte/skate-anlagen" },
        ]
    },
];