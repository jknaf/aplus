import { Product, Project } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { 
    name: 'Produkte', 
    href: '#',
    subLinks: [
      { name: 'Grillstelle Beton', href: '/produkte/grillstelle-beton' },
      { name: 'Umkleidekabine "Die Schnecke"', href: '/produkte/umkleidekabine-beton' },
      { name: 'Hockey-Banden', href: '/produkte/hockey-banden' },
      { name: 'Pumptrack Beton', href: '/produkte/pumptrack-beton' },
    ]
  },
  { name: 'Projekte', href: '/projekte' },
  { name: 'Über Uns', href: '/ueber-uns' },
  { name: 'Kontakt', href: '/kontakt' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'grillstelle',
    title: 'Öffentliche Grillstelle',
    imageUrl: 'https://images.unsplash.com/photo-1558034011-7386a3449e7b?auto=format&q=80&w=500&h=500&fit=crop',
    path: '/produkte/grillstelle-beton',
    altText: 'Robuste Beton-Grillstelle in einem Park, ideal für öffentliche Räume.'
  },
  {
    id: 'umkleide',
    title: 'Umkleidekabine "Die Schnecke"',
    imageUrl: 'https://images.unsplash.com/photo-1599432247738-9a4b3b190a28?auto=format&q=80&w=500&h=500&fit=crop',
    path: '/produkte/umkleidekabine-beton',
    altText: 'Architektonische Beton-Umkleidekabine, die sich in eine moderne Landschaft einfügt.'
  },
  {
    id: 'hockey',
    title: 'Hockey-Banden',
    imageUrl: 'https://images.unsplash.com/photo-1544299994-3d7bdbf5eb0d?auto=format&q=80&w=500&h=500&fit=crop',
    path: '/produkte/hockey-banden',
    altText: 'Ein modernes Skatehockey-Feld mit robusten weißen Banden.'
  },
  {
    id: 'pumptrack',
    title: 'Pumptrack aus Beton',
    imageUrl: 'https://images.unsplash.com/photo-1620242228960-911634989327?auto=format&q=80&w=500&h=500&fit=crop',
    path: '/produkte/pumptrack-beton',
    altText: 'Ein flowiger Beton-Pumptrack schlängelt sich durch eine grüne Landschaft.'
  },
  {
    id: 'skatepark',
    title: 'Beton Skateparks',
    imageUrl: 'https://images.unsplash.com/photo-1549296200-a6FE4a13f7c4?auto=format&q=80&w=500&h=500&fit=crop',
    path: '/projekte',
    altText: 'Nahaufnahme der Füße einer Person auf einem Skateboard in einem Skatepark.'
  },
  {
    id: 'Spezialbauten',
    title: 'Spezialbauten',
    imageUrl: 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&q=80&w=500&h=500&fit=crop',
    path: '/projekte',
    altText: 'Kreativer Spezialbau aus Beton in einem Skatepark, der als fahrbares Hindernis dient.'
  },
];

export const PROJECTS: Project[] = [
    { 
        id: "skatepark-neustadt",
        title: "Skatepark Neustadt",
        category: "Skatepark",
        imageUrl: "https://images.unsplash.com/photo-1559493962-07c29a01e434?auto=format&q=80&w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1563821735492-7f5898d2813c?auto=format&q=80&w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1517153336986-c3bee99d5e1e?auto=format&q=80&w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1608226938222-c379a41151d3?auto=format&q=80&w=800&h=600&fit=crop",
        ],
        description: "Ein moderner Beton-Skatepark für die Gemeinde Neustadt, der sowohl Anfängern als auch Profis gerecht wird. Die Anlage umfasst eine vielfältige Street-Area mit Rails und Ledges sowie eine anspruchsvolle Bowl-Sektion. Alle Elemente sind aus unserem vandalismusresistenten Hochleistungsbeton gefertigt.",
        altText: "Luftaufnahme des Skateparks Neustadt mit Beton-Bowl.",
        productsUsed: [
            { name: "Quarter-Ramps & Half-Pipes", path: "/produkte/pumptrack-beton" },
            { name: "Skate-Bowls", path: "/produkte/pumptrack-beton" }
        ]
    },
    { 
        id: "pumptrack-am-see",
        title: "Pumptrack am See",
        category: "Pumptrack",
        imageUrl: "https://images.unsplash.com/photo-1562625243-5ca7393433a8?auto=format&q=80&w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1627988438203-23595603a89a?auto=format&q=80&w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1504814120235-37a541a87795?auto=format&q=80&w=800&h=600&fit=crop",
        ],
        description: "Dieser flowige Pumptrack liegt idyllisch am Seeufer und bietet Fahrspaß für Fahrräder, Scooter und Skateboards. Die modularen Betonelemente ermöglichen einen abwechslungsreichen Kurs, der sich perfekt in die Landschaft einfügt.",
        altText: "Pumptrack am See für Fahrräder und Scooter.",
        productsUsed: [
            { name: "Modulare Pumptrack-Elemente", path: "/produkte/pumptrack-beton" },
        ]
    },
    {
        id: "grillplatz-stadtpark",
        title: "Grillplatz im Stadtpark",
        category: "Grillstelle",
        imageUrl: "https://images.unsplash.com/photo-1603986514725-b824b2a4a755?auto=format&q=80&w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1594997880552-323387693ab8?auto=format&q=80&w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587133999960-3913054f19b2?auto=format&q=80&w=800&h=600&fit=crop",
        ],
        description: "Für den zentralen Stadtpark wurde eine neue, barrierefreie Grill- und Begegnungszone geschaffen. Im Zentrum steht unsere robuste Betongrillstelle, die zum gemeinsamen Verweilen einlädt, direkt neben der neuen Skate-Anlage.",
        altText: "Moderne Betongrillstelle im Stadtpark neben einem Skatepark.",
        productsUsed: [
            { name: "Öffentliche Grillstelle", path: "/produkte/grillstelle-beton" },
        ]
    },
    {
        id: "hockeyfeld-berlin",
        title: "Inlinehockey-Feld Berlin",
        category: "Hockey-Bande",
        imageUrl: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&q=80&w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1599587121037-a27902a7b8fb?auto=format&q=80&w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1517153336986-c3bee99d5e1e?auto=format&q=80&w=800&h=600&fit=crop",
        ],
        description: "Sanierung und Modernisierung des Inlinehockey-Feldes in Berlin-Kreuzberg mit unserem fundamentfreien Bandensystem. Das Feld ist nun für den ganzjährigen Spielbetrieb geeignet.",
        altText: "Professionelles Inlinehockey-Feld in Berlin.",
        productsUsed: [
            { name: "Hockey-Banden (110cm)", path: "/produkte/hockey-banden" },
        ]
    },
    {
        id: "umkleide-freibad",
        title: "Umkleidekabinen Freibad Süd",
        category: "Umkleidekabine",
        imageUrl: "https://images.unsplash.com/photo-1621008943566-b93915830207?auto=format&q=80&w=600&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1561021799-a413d3a435c2?auto=format&q=80&w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1617966224373-d53b1b659c2b?auto=format&q=80&w=800&h=600&fit=crop",
        ],
        description: "Im Rahmen der Modernisierung des Freibads Süd wurden sechs unserer 'Die Schnecke' Umkleidekabinen installiert. Sie bieten den Badegästen eine moderne, saubere und sichere Umkleidemöglichkeit.",
        altText: "Reihe von architektonischen Beton-Umkleidekabinen.",
        productsUsed: [
            { name: 'Umkleidekabine "Die Schnecke"', path: "/produkte/umkleidekabine-beton" },
        ]
    },
    { 
        id: "skateplaza-hamburg",
        title: "Skate-Plaza Hamburg",
        category: "Skatepark",
        imageUrl: "https://images.unsplash.com/photo-1546899493-431a4a493214?auto=format&q=80&w=600&h=400&fit=crop",
        description: "Ein urbaner Treffpunkt für die Skateszene in Hamburg. Der Plaza wurde mit verschiedenen Street-Elementen ausgestattet, die sich harmonisch in das Stadtbild einfügen.",
        altText: "Urbaner Skate-Plaza in Hamburg mit modernen Elementen.",
        images: [
            "https://images.unsplash.com/photo-1598571543314-783637175411?auto=format&q=80&w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1616656123653-a1a72b07e7ca?auto=format&q=80&w=800&h=600&fit=crop",
        ],
        productsUsed: [
            { name: "Modulare Skate-Elemente", path: "/produkte/pumptrack-beton" },
        ]
    },
];