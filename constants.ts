import { Product, Project, PressArticle } from './types';

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
  { name: 'Presse', href: '/referenzen-presse' },
  { name: 'Über Uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
];

// Fachpublikationen, in denen A+ Urban Design erwähnt wird.
// Teaser sind Platzhalter bis Roland Originaltexte nachreicht.
export const PRESS_ARTICLES: PressArticle[] = [
  {
    id: 'kommunaldirekt-skatepark-friedrichsdorf',
    title: 'Skatepark Friedrichsdorf',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/skatepark-friedrichsdorf/',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'kommunaldirekt-umkleidekabine-freibaeder',
    title: 'Umkleidekabine für Freibäder',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/umkleidekabine-fuer-freibaeder/',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'kommunaldirekt-skateanlage-serpent',
    title: 'Skateanlage mit Serpent',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/skateanlage-mit-serpent/',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'kommunalclick24-duschkabine-so-frei',
    title: 'Duschkabine – wir sind so frei',
    publisher: 'kommunalclick24.de',
    url: 'https://kommunalclick24.de/kommunen/duschkabine-wir-sind-so-frei/',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'kommunalclick24-offene-skatebowl-betonfertigteile',
    title: 'Skateelemente: Offene Skatebowl aus Betonfertigteilen',
    publisher: 'kommunalclick24.de',
    url: 'https://kommunalclick24.de/kommunen/skateelemente-offene-skatebowl-aus-betonfertigteilen/',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'kommunalclick24-schneckenhaus-duschkabine',
    title: 'Ein Schneckenhaus als Duschkabine',
    publisher: 'kommunalclick24.de',
    url: 'https://kommunalclick24.de/gebauede/instandhaltung-technik/ein-schneckenhaus-als-duschkabine/',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'treffpunkt-kommune-nachhaltig-oekologisch-sport',
    title: 'Auf nachhaltige und ökologische Weise Sport treiben',
    publisher: 'treffpunkt-kommune.de',
    url: 'https://www.treffpunkt-kommune.de/auf-nachhaltige-und-oekologische-weise-sport-treiben/',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'freiraum-gestalten-skatepark-friedrichsdorf',
    title: 'Skatepark Friedrichsdorf',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-7779922-208098/skatepark-friedrichsdorf-.html',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'freiraum-gestalten-nachhaltig-sport-treiben',
    title: 'Nachhaltig Sport treiben',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/aktuelles/news/article-7759678-208085/nachhaltig-sport-treiben-.html',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'freiraum-gestalten-skaten-denkmalschutz',
    title: 'Skaten und Denkmalschutz vereinen',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/aktuelles/news/article-7473521-208085/skaten-und-denkmalschutz-vereinen-.html',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'freiraum-gestalten-offene-skatebowl-betonfertigteile',
    title: 'Offene Skatebowl aus Betonfertigteilen',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-6531315-208098/offene-skatebowl-aus-betonfertigteilen-.html',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'freiraum-gestalten-skateanlage-a59',
    title: 'Skateanlage über A 59',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-6270321-208098/skateanlage-ueber-a-59-.html',
    teaser: 'Artikelbeschreibung folgt.',
  },
  {
    id: 'freiraum-gestalten-skate-park-planen',
    title: 'Wie man einen Skate-Park plant',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-5192982-208098/wie-man-einen-skate-park-plant-.html',
    teaser: 'Artikelbeschreibung folgt.',
  },
];

export const PRODUCTS: Product[] = [
   {
    id: 'skate-anlagen',
    title: 'Beton Skate-Anlagen',
    imageUrl: '/images/homepage/hero-anlage-01.jpg',
    path: '/produkte/skate-anlagen',
    altText: 'Beton-Skatepark mit Bowl und Street-Bereich — modulare Skateanlage vom Hersteller A+ Urban Design.',
    tuvCertified: true,
    usp: 'Das A+ Original: TÜV-zertifizierte Skaterampen, Bowls und Halfpipes — modular, schalldämpfend und fundamentfrei.'
  },
  {
    id: 'pumptrack',
    title: 'Pumptrack aus Beton',
    imageUrl: '/images/pumptrack/pumptrack-beton-elemente-01.jpg',
    path: '/produkte/pumptrack-beton',
    altText: 'Beton-Pumptrack aus modularen Fertigteilen — realisiert vom Pumptrack-Hersteller A+ Urban Design.',
    tuvCertified: true,
    usp: 'Endloser Flow für alle Rollsportarten — wartungsfrei, vandalismussicher und modular erweiterbar.'
  },
  {
    id: 'bmx-anlagen',
    title: 'BMX-Anlagen',
    imageUrl: '/images/skate-pipes/skate-pipe-01.jpg',
    path: '/produkte/bmx-anlagen',
    altText: 'Beton-Halfpipe für BMX-Park und Skateanlage — TÜV-zertifiziert.',
    tuvCertified: true,
    usp: 'BMX-Anlagen und Halfpipes aus Hochleistungsbeton — robust genug für Pegs, Scooter und harte Landungen.'
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
    imageUrl: '/images/grill/grillstelle-background.jpg',
    path: '/produkte/grillstelle-beton',
    altText: 'Runder Beton-Grillplatz im Park mit Edelstahl-Rost.',
    usp: 'Der vandalismussichere Begegnungsort mit diebstahlgeschütztem Edelstahlrost.'
  },
  {
    id: 'umkleide',
    title: 'Umkleidekabine',
    imageUrl: '/images/umkleide/umkleide-panorama.jpg',
    path: '/produkte/umkleidekabine-beton',
    altText: 'Schnecken-Umkleidekabine aus Beton im Freibad.',
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
        id: "modularer-beton-skatepark",
        title: "Modularer Beton-Skatepark",
        category: "Skatepark",
        year: 2023,
        imageUrl: "/images/skateparks/skatepark-01.jpg",
        images: [
            "/images/skateparks/skatepark-02.jpg",
            "/images/skateparks/skatepark-03.jpg",
            "/images/skateparks/skatepark-04.jpg",
        ],
        description: "Ein moderner Beton-Skatepark, der sowohl Anfängern als auch Profis gerecht wird. Die Anlage umfasst eine vielfältige Street-Area mit Rails und Ledges sowie eine anspruchsvolle Bowl-Sektion. Alle Elemente sind aus unserem vandalismusresistenten Hochleistungsbeton gefertigt.",
        altText: "Luftaufnahme eines modularen Beton-Skateparks mit Bowl und Street-Bereich.",
        productsUsed: [
            { name: "Quarter-Ramps & Half-Pipes", path: "/produkte/skate-anlagen" },
            { name: "Skate-Bowls", path: "/produkte/skate-anlagen" }
        ]
    },
    {
        id: "beton-pumptrack",
        title: "Beton-Pumptrack",
        category: "Pumptrack",
        year: 2022,
        imageUrl: "/images/pumptrack/pumptrack-beton-elemente-01.jpg",
        images: [
             "/images/pumptrack/pumptrack-beton-module-03.jpg",
             "/images/pumptrack/pumptrack-beton-module-04.jpg",
        ],
        description: "Ein flowiger Pumptrack, der Fahrspaß für Fahrräder, Scooter und Skateboards bietet. Die modularen Betonelemente ermöglichen einen abwechslungsreichen Kurs, der sich perfekt in die Umgebung einfügt.",
        altText: "Flowiger Pumptrack aus modularen Betonelementen für Fahrräder und Scooter.",
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
        id: "inlinehockey-feld",
        title: "Inlinehockey-Feld",
        category: "Hockey-Bande",
        year: 2021,
        imageUrl: "/images/hockey/inline-hockey-bande-03.jpg",
        images: [
             "/images/hockey/hockey-einfassung-01.jpg",
             "/images/hockey/inline-hockey-bande-02.jpg",
        ],
        description: "Sanierung und Modernisierung eines Inlinehockey-Feldes mit unserem fundamentfreien Bandensystem. Das Feld ist nun für den ganzjährigen Spielbetrieb geeignet.",
        altText: "Professionelles Inlinehockey-Feld mit robusten Beton-Banden.",
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
        id: "bastion-skatepark-alba-iulia",
        title: "Bastion Skatepark Alba Iulia",
        category: "Skatepark",
        year: 2024,
        imageUrl: "/images/skate-anlagen/skate-anlage-01.jpg",
        description: "Der Bastion Skatepark in Alba Iulia, Rumänien — ein urbaner Treffpunkt für die Skateszene. Der Park wurde mit verschiedenen Street-Elementen ausgestattet, die sich harmonisch in das historische Stadtbild einfügen.",
        altText: "Bastion Skatepark in Alba Iulia mit modularen Beton-Elementen.",
        images: [
            "/images/skate-anlagen/skateanlage-03.jpg",
            "/images/skate-anlagen/skateanlagen-04.jpg",
        ],
        productsUsed: [
            { name: "Modulare Skate-Elemente", path: "/produkte/skate-anlagen" },
        ]
    },
];