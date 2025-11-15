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
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/A%2B/.1-img_2091-756x430.jpg/picture-200',
    path: '/produkte/skate-anlagen',
    altText: 'BETON-SKATEANLAGE A+ Urban Design',
    tuvCertified: true,
  },
  {
    id: 'pumptrack',
    title: 'Pumptrack aus Beton',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/A%2B/.p1070529-track1-756x430.jpg/picture-200',
    path: '/produkte/pumptrack-beton',
    altText: 'Pump-Track A+ Urban Design',
    tuvCertified: true,
  },
  {
    id: 'bmx-anlagen',
    title: 'BMX-Anlagen',
    imageUrl: 'https://images.pexels.com/photos/248559/pexels-photo-248559.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    path: '/produkte/bmx-anlagen',
    altText: 'Ein BMX-Fahrer springt in einer professionellen BMX-Anlage aus Beton.',
    tuvCertified: true,
  },
  {
    id: 'hockey',
    title: 'Hockey-Banden',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/A%2B/.2-cimg9951ca%2Bhocke-breitn-756x430.jpg/picture-200',
    path: '/produkte/hockey-banden',
    altText: 'INLINE-HOCKEY-BANDEN A+ Urban Design',
    tuvCertified: true,
  },
  {
    id: 'grillstelle',
    title: 'Öffentliche Grillstelle',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/A%2B/.3-p1260721-756x430.jpg/picture-200',
    path: '/produkte/grillstelle-beton',
    altText: 'GRILL-STELLE MIT SITZFLÄCHEN A+ Urban Design'
  },
  {
    id: 'umkleide',
    title: 'Umkleidekabine',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/A%2B/.4-092738a-756x430.jpg/picture-200',
    path: '/produkte/umkleidekabine-beton',
    altText: 'BETON UMKLEIDE-KABINE A+ Urban Design'
  },
  {
    id: 'ueberdachung',
    title: 'Überdachung / Pavillon',
    imageUrl: 'https://www.aplusurbandesign.com/.cm4all/uproc.php/0/A%2B/.4-a%2Bimg_0318b-756x430.jpg/picture-200',
    path: '/produkte/ueberdachung-beton',
    altText: 'ÜBERDACHUNG / PAVILLON AUS BETON A+ Urban Design'
  },
];

export const PROJECTS: Project[] = [
    { 
        id: "skatepark-neustadt",
        title: "Skatepark Neustadt",
        category: "Skatepark",
        year: 2023,
        imageUrl: "https://images.pexels.com/photos/4167333/pexels-photo-4167333.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        images: [
            "https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
            "https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
            "https://images.pexels.com/photos/4167333/pexels-photo-4167333.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
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
        imageUrl: "https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        images: [
            "https://images.pexels.com/photos/5413303/pexels-photo-5413303.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
            "https://images.pexels.com/photos/2241144/pexels-photo-2241144.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
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
        imageUrl: "https://images.pexels.com/photos/5413303/pexels-photo-5413303.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        images: [
            "https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
            "https://images.pexels.com/photos/18449733/pexels-photo-18449733.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
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
        imageUrl: "https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        images: [
            "https://images.pexels.com/photos/4167333/pexels-photo-4167333.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
            "https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
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
        imageUrl: "https://images.pexels.com/photos/2241144/pexels-photo-2241144.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        images: [
            "https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
            "https://images.pexels.com/photos/5413303/pexels-photo-5413303.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
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
        imageUrl: "https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        description: "Ein urbaner Treffpunkt für die Skateszene in Hamburg. Der Plaza wurde mit verschiedenen Street-Elementen ausgestattet, die sich harmonisch in das Stadtbild einfügen.",
        altText: "Urbaner Skate-Plaza in Hamburg mit modularen Beton-Elementen.",
        images: [
            "https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
            "https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        ],
        productsUsed: [
            { name: "Modulare Skate-Elemente", path: "/produkte/skate-anlagen" },
        ]
    },
];