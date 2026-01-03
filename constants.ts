import { Product, Project } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { 
    name: 'Produkte', 
    href: '#',
    subLinks: [
      { name: 'Skate-Anlagen', href: '/produkte/skate-anlagen' },
      { name: 'Pumptrack Beton', href: '/produkte/pumptrack-beton' },
      { name: 'BMX-Anlagen', href: '/produkte/bmx-anlagen' },
      { name: 'Hockey-Banden', href: '/produkte/hockey-banden' },
      { name: 'Grillstelle Beton', href: '/produkte/grillstelle-beton' },
      { name: 'Umkleidekabine', href: '/produkte/umkleidekabine-beton' },
      { name: 'Überdachung / Pavillon', href: '/produkte/ueberdachung-beton' },
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
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/BOWLS/.1-Skate-Bowl_A%2B-756x430.jpg/picture-2600?_=193735e8e88',
    path: '/produkte/skate-anlagen',
    altText: 'Hochwertige Beton-Skateanlage mit Bowl und Street-Bereich bei Sonnenuntergang.',
    tuvCertified: true,
    usp: 'Das Original: TÜV-zertifiziert, flüsterleise und modular gebaut für die Ewigkeit.'
  },
  {
    id: 'pumptrack',
    title: 'Pumptrack aus Beton',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/A%2B/.2-Pump-Track_A%2B-756x430.jpg/picture-2600?_=19386fba8e0',
    path: '/produkte/pumptrack-beton',
    altText: 'Geschwungener Pumptrack aus Beton, ideal für Bikes und Boards.',
    tuvCertified: true,
    usp: 'Endloser Flow für alle Rollsportarten – wartungsarm, griffig und modular erweiterbar.'
  },
  {
    id: 'bmx-anlagen',
    title: 'BMX-Anlagen',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/PIPES/.1-Skate-Pipe_A%2B-756x430.jpg/picture-2600?_=193734a9158',
    path: '/produkte/bmx-anlagen',
    altText: 'Massive Beton-Pipe, perfekt geeignet für BMX und Skate.',
    tuvCertified: true,
    usp: 'Professionelle Dirt- & Park-Setups aus unverwüstlichem Hochleistungsbeton.'
  },
  {
    id: 'hockey',
    title: 'Hockey-Banden',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/HOCKEY/.Roll-Hockey-Bande_A%2B.jpg/picture-2600?_=1938211b1d0',
    path: '/produkte/hockey-banden',
    altText: 'Outdoor Hockey-Spielfeld mit robusten Banden.',
    tuvCertified: true,
    usp: 'Fundamentfreies, patentiertes Bandensystem für den ganzjährigen Profi-Einsatz.'
  },
  {
    id: 'grillstelle',
    title: 'Öffentliche Grillstelle',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/GRILL/.2-Grill-Stelle-Beton_A%2B-756x430.jpg/picture-2600?_=193821b3750',
    path: '/produkte/grillstelle-beton',
    altText: 'Robuste Feuerstelle und Grillbereich aus Beton im öffentlichen Park.',
    usp: 'Der vandalismussichere Begegnungsort mit diebstahlgeschütztem Edelstahlrost.'
  },
  {
    id: 'umkleide',
    title: 'Umkleidekabine',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/UMKLEIDE/.4-Umkleidekabine-Schnecke_Freibad_A%2B-756x430.jpg/picture-2600?_=19382187c18',
    path: '/produkte/umkleidekabine-beton',
    altText: 'Moderne Architektur mit Sichtbetonwänden.',
    usp: 'Die „Schnecke“: Hygienisch, türlos und absolut missbrauchssicher konstruiert.'
  },
  {
    id: 'ueberdachung',
    title: 'Überdachung / Pavillon',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/%C3%9CBERDACHUNG/.2-Ueberdachung_Unterstellplatz-Beton_A%2B-712x363.jpg/picture-2600?_=1938232bad8',
    path: '/produkte/ueberdachung-beton',
    altText: 'Minimalistische Betonüberdachung im urbanen Raum.',
    usp: 'Massiver, architektonischer Wetterschutz in zeitloser Sichtbeton-Ästhetik.'
  },
];

export const PROJECTS: Project[] = [
    { 
        id: "skatepark-neustadt",
        title: "Skatepark Neustadt",
        category: "Skatepark",
        year: 2023,
        imageUrl: "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/SKATEPARK/.1-Skate-Park_A%2B-756x430.jpg/picture-2600?_=19373432300",
        images: [
            "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/SKATEPARK/.2-Skate-Park_A%2B-756x430.jpg/picture-1200?_=19373431f18",
            "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/SKATEPARK/.3-Skatepark_A%2B-756x430.jpg/picture-1200?_=19373431b30",
            "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/SKATEPARK/.4-Skatepark_A%2B-756x430.jpg/picture-1200?_=19373431b30",
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
        imageUrl: "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/PUMPTRACK/.1-Pumptrack-Beton-Elemente_A%2B-756x430.jpg/picture-2600?_=193820c8d68",
        images: [
             "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/PUMPTRACK/.3-Pump-Track-Beton-Module_A%2B-756x430.jpg/picture-1200?_=193820c4b00",
             "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/PUMPTRACK/.4-Pump-Track-Beton-Module_A%2B-756x430.jpg/picture-1200?_=193820c3b60",
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
        imageUrl: "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/GRILL/.1-Grill-Platz-Beton_A%2B-756x430.jpg/picture-2600?_=193821b3f20",
        images: [
             "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/GRILL/.2-Grill-Stelle-Beton_A%2B-756x430.jpg/picture-1600?_=193821b3750",
             "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/GRILL/.5-Grill-Stelle_A%2B-756x430.jpg/picture-1200?_=193723cb750",
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
        imageUrl: "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/HOCKEY/.3-Inline-Hockey-Bande_A%2B-756x430.jpg/picture-2600?_=1938211e498",
        images: [
             "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/HOCKEY/.1-Hockey-Einfassung_A%2B-756x430.jpg/picture-1200?_=1938211ec68",
             "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/HOCKEY/.2-Inline-Hockey-Bande_A%2B.jpg/picture-1200?_=1938211e880",
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
        imageUrl: "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/UMKLEIDE/.1-Umkleide-Kabine_Beton_Freibad_A%2B-756x430.jpg/picture-2600?_=19382189f40",
        images: [
            "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/UMKLEIDE/.3-Umkleidekabine-Freibad-Beton%2B-756x430.jpg/picture-1200?_=19382188bb8",
            "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/UMKLEIDE/.2-Umkleide-Kabine-Beton_Freibad_A%2B-756x430.jpg/picture-1200?_=19382189388",
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
        imageUrl: "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/SKATEANLAGEN/.1-Skate-Anlage_A%2B-756x430.jpg/picture-2600?_=193733bdbb8",
        description: "Ein urbaner Treffpunkt für die Skateszene in Hamburg. Der Plaza wurde mit verschiedenen Street-Elementen ausgestattet, die sich harmonisch in das Stadtbild einfügen.",
        altText: "Urbaner Skate-Plaza in Hamburg mit modularen Beton-Elementen.",
        images: [
            "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/SKATEANLAGEN/.3-Skateanlage_A%2B-756x430.jpg/picture-1200?_=193733bd7d0",
            "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/SKATEANLAGEN/.4-Skateanlagen_A%2B-756x430.jpg/picture-1200?_=193733bd3e8",
        ],
        productsUsed: [
            { name: "Modulare Skate-Elemente", path: "/produkte/skate-anlagen" },
        ]
    },
];