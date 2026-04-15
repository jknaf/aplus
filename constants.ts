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
// Teaser sind Kurzzusammenfassungen der jeweiligen Quelle (keine Volltextkopie).
export const PRESS_ARTICLES: PressArticle[] = [
  {
    id: 'kommunaldirekt-skatepark-friedrichsdorf',
    title: 'Skatepark Friedrichsdorf',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/skatepark-friedrichsdorf/',
    teaser:
      'In Friedrichsdorf entstand eine 2.000 m² große Skateanlage auf zwei Ebenen mit TÜV-zertifizierten Skateelementen aus Beton – Fun-Boxen, Stairs, Pyramid-Hip, Ledges, Rail-Slides sowie eine knapp zwei Meter hohe Pipe. Durch Böschungen und Geländeintegration fügt sich die Anlage harmonisch in das Sport- und Freizeitgebiet ein.',
  },
  {
    id: 'kommunaldirekt-umkleidekabine-freibaeder',
    title: 'Umkleidekabine für Freibäder',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/umkleidekabine-fuer-freibaeder/',
    teaser:
      'Robuste, wartungsarme Umkleidekabine aus einer fugenlosen Beton-Bodenplatte und einer schneckenförmigen Betonwand auf Edelstahlfüßen. Optional erweiterbar um Haken, Sitzflächen oder als Duschkabine – eine langlebige Lösung für kommunale Bäder ohne bewegliche Teile.',
  },
  {
    id: 'kommunaldirekt-skateanlage-serpent',
    title: 'Skateanlage mit Serpent',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/skateanlage-mit-serpent/',
    teaser:
      'Die Altdorfer Skateanlage wurde grunderneuert und um einen „Serpent" erweitert – eine offene Bowl, die zugleich als Startrampe dient. Der Serpent wurde in die Fläche eingebaut, angeböscht und begrünt; sanierte Bestandselemente wurden mit neuen TÜV-zertifizierten Betonfertigteilen kombiniert.',
  },
  {
    id: 'kommunalclick24-duschkabine-so-frei',
    title: 'Duschkabine – wir sind so frei',
    publisher: 'kommunalclick24.de',
    url: 'https://kommunalclick24.de/kommunen/duschkabine-wir-sind-so-frei/',
    teaser:
      'A+ Urban Design hat eine Duschkabine für öffentliche Bäder aus zwei aufeinandergesetzten Betonfertigteilen entwickelt. Die Sichtschutzwand ab 30 cm Höhe ermöglicht Sichtkontrolle gegen Missbrauch; wartungsarme Materialien ohne bewegliche Teile garantieren langjährige Haltbarkeit.',
  },
  {
    id: 'kommunalclick24-offene-skatebowl-betonfertigteile',
    title: 'Skateelemente: Offene Skatebowl aus Betonfertigteilen',
    publisher: 'kommunalclick24.de',
    url: 'https://kommunalclick24.de/kommunen/skateelemente-offene-skatebowl-aus-betonfertigteilen/',
    teaser:
      'In Bönnigheim entstand westlich der Burgstraße ein Bewegungspark mit einer modularen Skateanlage aus TÜV-zertifizierten Betonfertigteilen. Die Betonrampen gehen ohne Übergangsbleche in die Asphaltfläche über – das minimiert Lärmemissionen und verbindet Bowl, Startrampen, Fun-Box und Zugangsrampen mit der umgebenden Erdmodellierung.',
  },
  {
    id: 'kommunalclick24-schneckenhaus-duschkabine',
    title: 'Ein Schneckenhaus als Duschkabine',
    publisher: 'kommunalclick24.de',
    url: 'https://kommunalclick24.de/gebauede/instandhaltung-technik/ein-schneckenhaus-als-duschkabine/',
    teaser:
      'Die Umkleide- und Duschkabine von A+ Urban Design besteht aus zwei aufeinandergesetzten Betonfertigteilen mit charakteristisch schneckenförmiger Sichtschutzwand auf Edelstahlfüßen. Wahlweise mit integrierter Dusche oder nur mit Aussparungen für Gully und Wasserleitungen – komplett ohne aufwendige Fundamentarbeit.',
  },
  {
    id: 'treffpunkt-kommune-nachhaltig-oekologisch-sport',
    title: 'Auf nachhaltige und ökologische Weise Sport treiben',
    publisher: 'treffpunkt-kommune.de',
    url: 'https://www.treffpunkt-kommune.de/auf-nachhaltige-und-oekologische-weise-sport-treiben/',
    teaser:
      'Modular aufgebaute Skateanlagen aus Betonfertigteilen, Pumptracks und fundamentfreie Umkleidekabinen schaffen wohnortnahe Sportmöglichkeiten und vermeiden lange Anfahrten. Die wartungsarmen, recycelbaren Betonmodule lassen sich flexibel kombinieren und verbessern die ökologische Bilanz kommunaler Sportinfrastruktur.',
  },
  {
    id: 'freiraum-gestalten-skatepark-friedrichsdorf',
    title: 'Skatepark Friedrichsdorf',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-7779922-208098/skatepark-friedrichsdorf-.html',
    teaser:
      'Fachbeitrag zur 2.000 m² großen Skateanlage in Friedrichsdorf: zwei verbundene Ebenen mit in die Fläche integrierten Betonskateelementen von A+ Urban Design. Die TÜV-zertifizierten Fertigteile umfassen Rampen, Treppen, Schienen und eine knapp zwei Meter hohe Pipe – teils angeböscht für eine natürliche Integration ins Gelände.',
  },
  {
    id: 'freiraum-gestalten-nachhaltig-sport-treiben',
    title: 'Nachhaltig Sport treiben',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/aktuelles/news/article-7759678-208085/nachhaltig-sport-treiben-.html',
    teaser:
      'Pumptracks, mobile Umkleidekabinen und TÜV-zertifizierte Skateanlagen aus Betonfertigteilen ermöglichen ganzjährigen Outdoor-Sport ohne aufwendige Vorbereitung. Die dezentralen, fundamentfreien Lösungen reduzieren den ökologischen Fußabdruck gegenüber Rasenpflege, Pistenpräparierung oder Hallenbadbetrieb erheblich.',
  },
  {
    id: 'freiraum-gestalten-skaten-denkmalschutz',
    title: 'Skaten und Denkmalschutz vereinen',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/aktuelles/news/article-7473521-208085/skaten-und-denkmalschutz-vereinen-.html',
    teaser:
      'Im ehemaligen Festungsgraben der sternförmigen Alba Carolina in Alba Iulia (Rumänien) entstand ein Skatepark, der aus mehr als 50 m Entfernung unsichtbar bleibt. Die historische Festungsmauer wurde restauriert; die mehrstufige Anlage verbindet zugleich Ober- und Unterstadt und zeigt, wie Freizeitnutzung und Denkmalschutz zusammengehen.',
  },
  {
    id: 'freiraum-gestalten-offene-skatebowl-betonfertigteile',
    title: 'Offene Skatebowl aus Betonfertigteilen',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-6531315-208098/offene-skatebowl-aus-betonfertigteilen-.html',
    teaser:
      'Das Architekturbüro frei raum concept realisierte in Bönnigheim eine Skateanlage mit offener Bowl als Teil eines Bewegungsparks. Die modulare Bauweise mit TÜV-zertifizierten Betonfertigteilen erlaubt nahtlose Übergänge zur Asphaltrollfläche und eignet sich für Bowl wie Obstacles gleichermaßen.',
  },
  {
    id: 'freiraum-gestalten-skateanlage-a59',
    title: 'Skateanlage über A 59',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-6270321-208098/skateanlage-ueber-a-59-.html',
    teaser:
      'In Duisburg entstand eine Skateanlage aus 38 modularen Betonfertigteilen von A+ Urban Design – direkt auf einer Autobahnbrücke über der A 59. Die Herausforderung: die Elemente trotz ungleichmäßigem Gefälle auf dünnem Asphalt sicher zu installieren, ohne die darunterliegende Abdichtungsmembrane zu beschädigen.',
  },
  {
    id: 'freiraum-gestalten-skate-park-planen',
    title: 'Wie man einen Skate-Park plant',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-5192982-208098/wie-man-einen-skate-park-plant-.html',
    teaser:
      'Bei der Skateparkplanung müssen Rampen und Hindernisse die DIN EN 14974 erfüllen. Nutzerbeteiligung ist wünschenswert, braucht aber fachliche Moderation – persönliche Vorlieben stehen oft im Konflikt mit normgerechter, langfristig tragfähiger Gestaltung.',
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