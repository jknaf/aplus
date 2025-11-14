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
      { name: 'Umkleidekabine "Die Schnecke"', href: '/produkte/umkleidekabine-beton' },
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
    imageUrl: 'https://images.pexels.com/photos/4167333/pexels-photo-4167333.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    path: '/produkte/skate-anlagen',
    altText: 'Ein Skater in Aktion in einem modernen Beton-Skatepark von A+ Urban Design.'
  },
  {
    id: 'pumptrack',
    title: 'Pumptrack aus Beton',
    imageUrl: 'https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    path: '/produkte/pumptrack-beton',
    altText: 'Ein Fahrer auf einer geschwungenen Betonbahn, einem Pumptrack von A+ Urban Design.'
  },
  {
    id: 'bmx-anlagen',
    title: 'BMX-Anlagen',
    imageUrl: 'https://images.pexels.com/photos/248559/pexels-photo-248559.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    path: '/produkte/bmx-anlagen',
    altText: 'Ein BMX-Fahrer springt in einer professionellen BMX-Anlage aus Beton.'
  },
  {
    id: 'hockey',
    title: 'Hockey-Banden',
    imageUrl: 'https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    path: '/produkte/hockey-banden',
    altText: 'Robuste Inline-Hockey-Banden für ein professionelles Spielfeld.'
  },
  {
    id: 'grillstelle',
    title: 'Öffentliche Grillstelle',
    imageUrl: 'https://images.pexels.com/photos/5413303/pexels-photo-5413303.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    path: '/produkte/grillstelle-beton',
    altText: 'Eine massive, öffentliche Grillstelle aus Beton in einem Park.'
  },
  {
    id: 'umkleide',
    title: 'Umkleidekabine "Die Schnecke"',
    imageUrl: 'https://images.pexels.com/photos/18449733/pexels-photo-18449733.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    path: '/produkte/umkleidekabine-beton',
    altText: 'Eine moderne Beton-Umkleidekabine in Schneckenform von A+ Urban Design.'
  },
  {
    id: 'ueberdachung',
    title: 'Überdachung / Pavillon',
    imageUrl: 'https://images.pexels.com/photos/1743165/pexels-photo-1743165.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    path: '/produkte/ueberdachung-beton',
    altText: 'Eine architektonische Überdachung aus Beton als Wetterschutz.'
  },
];

export const PROJECTS: Project[] = [
    { 
        id: "skatepark-neustadt",
        title: "Skatepark Neustadt",
        category: "Skatepark",
        year: 2023,
        imageUrl: "https://images.pexels.com/photos/18449733/pexels-photo-18449733.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
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
        imageUrl: "https://images.pexels.com/photos/4167333/pexels-photo-4167333.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
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
        description: "Im Rahmen der Modernisierung des Freibads Süd wurden sechs unserer 'Die Schnecke' Umkleidekabinen installiert. Sie bieten den Badegästen eine moderne, saubere und sichere Umkleidemöglichkeit.",
        altText: "Reihe von architektonischen Beton-Umkleidekabinen 'Die Schnecke'.",
        productsUsed: [
            { name: 'Umkleidekabine "Die Schnecke"', path: "/produkte/umkleidekabine-beton" },
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