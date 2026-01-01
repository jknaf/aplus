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
  { name: 'Projekte', href: '/projekte' },
  { name: 'Über Uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
];

export const PRODUCTS: Product[] = [
   {
    id: 'skate-anlagen',
    title: 'Beton Skate-Anlagen',
    imageUrl: 'https://www.kommunaldirekt.de/wp-content/uploads/2020/03/kd120_aplusurbandesign2-1.jpg',
    path: '/produkte/skate-anlagen',
    altText: 'Hochwertige Beton-Skateanlage mit Bowl und Street-Bereich bei Sonnenuntergang.',
    tuvCertified: true,
  },
  {
    id: 'pumptrack',
    title: 'Pumptrack aus Beton',
    imageUrl: 'https://www.kommunaldirekt.de/wp-content/uploads/2024/09/kd424_aplus-urbandesign1.jpg.webp',
    path: '/produkte/pumptrack-beton',
    altText: 'Geschwungener Pumptrack aus Beton, ideal für Bikes und Boards.',
    tuvCertified: true,
  },
  {
    id: 'bmx-anlagen',
    title: 'BMX-Anlagen',
    imageUrl: 'https://images.unsplash.com/photo-1576435728678-35d016018997?q=80&w=1000&auto=format&fit=crop',
    path: '/produkte/bmx-anlagen',
    altText: 'BMX-Fahrer in der Luft über einer Rampe in einer Outdoor-Anlage.',
    tuvCertified: true,
  },
  {
    id: 'hockey',
    title: 'Hockey-Banden',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/HOCKEY/.Roll-Hockey-Bande_A%2B.jpg/picture-2600?_=1938211b1d0',
    path: '/produkte/hockey-banden',
    altText: 'Outdoor Hockey-Spielfeld mit robusten Banden.',
    tuvCertified: true,
  },
  {
    id: 'grillstelle',
    title: 'Öffentliche Grillstelle',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/GRILL/.2-Grill-Stelle-Beton_A%2B-756x430.jpg/picture-2600?_=193821b3750',
    path: '/produkte/grillstelle-beton',
    altText: 'Robuste Feuerstelle und Grillbereich aus Beton im öffentlichen Park.'
  },
  {
    id: 'umkleide',
    title: 'Umkleidekabine',
    imageUrl: 'https://www.freiraum-gestalten.info/vorlagen/webapp/cache/cms/1-20210618-092959auss2b_g43tkojwg4zq-1700x1131.webp',
    path: '/produkte/umkleidekabine-beton',
    altText: 'Moderne Architektur mit Sichtbetonwänden.'
  },
  {
    id: 'ueberdachung',
    title: 'Überdachung / Pavillon',
    imageUrl: 'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=1000&auto=format&fit=crop',
    path: '/produkte/ueberdachung-beton',
    altText: 'Minimalistische Betonüberdachung im urbanen Raum.'
  },
];

export const PROJECTS: Project[] = [
    { 
        id: "skatepark-neustadt",
        title: "Skatepark Neustadt",
        category: "Skatepark",
        year: 2023,
        imageUrl: "https://images.unsplash.com/photo-1453282716202-de94e528067c?q=80&w=1000&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1565259164223-10d659e93b33?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558350298-632050e93233?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1597858348877-69502b489955?q=80&w=1200&auto=format&fit=crop",
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
        imageUrl: "https://images.unsplash.com/photo-1627402633008-8fbff809a473?q=80&w=1000&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1596700760824-c8c32d434237?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1544652478-6653e09f1826?q=80&w=1200&auto=format&fit=crop",
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
        imageUrl: "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/GRILL/.2-Grill-Stelle-Beton_A%2B-756x430.jpg/picture-2600?_=193821b3750",
        images: [
             "https://images.unsplash.com/photo-1555685812-4b943f3e99a0?q=80&w=1200&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1523472721958-978152f4d69b?q=80&w=1200&auto=format&fit=crop",
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
        imageUrl: "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/HOCKEY/.Roll-Hockey-Bande_A%2B.jpg/picture-2600?_=1938211b1d0",
        images: [
            "https://images.unsplash.com/photo-1515233453752-9653a1a9e9a4?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558365849-6a8dd17297d3?q=80&w=1200&auto=format&fit=crop",
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
        imageUrl: "https://www.freiraum-gestalten.info/vorlagen/webapp/cache/cms/1-20210618-092959auss2b_g43tkojwg4zq-1700x1131.webp",
        images: [
            "https://images.unsplash.com/photo-1481026469463-66327c86e544?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
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
        imageUrl: "https://images.unsplash.com/photo-1541804797-152e06c33c2a?q=80&w=1000&auto=format&fit=crop",
        description: "Ein urbaner Treffpunkt für die Skateszene in Hamburg. Der Plaza wurde mit verschiedenen Street-Elementen ausgestattet, die sich harmonisch in das Stadtbild einfügen.",
        altText: "Urbaner Skate-Plaza in Hamburg mit modularen Beton-Elementen.",
        images: [
            "https://images.unsplash.com/photo-1549488340-349f53c30164?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1574404889270-43d92023db5e?q=80&w=1200&auto=format&fit=crop",
        ],
        productsUsed: [
            { name: "Modulare Skate-Elemente", path: "/produkte/skate-anlagen" },
        ]
    },
];