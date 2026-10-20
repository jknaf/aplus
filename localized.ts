import { useMemo } from 'react';
import { NAV_LINKS, PRODUCTS, PROJECTS } from './constants';
import { useLang, type Lang } from './i18n';
import type { Product, Project, ProjectCategory } from './types';

// Übersetzungen der Daten aus constants.ts. Schlüssel ist die id (bei der Navigation der Pfad).
// Deutsch bleibt in constants.ts. Normen heißen überall "EN 14974", weil das TÜV-Zertifikat
// auf DIN EN 14974 ausgestellt ist.

type Texte = Record<'en' | 'fr', string>;

const NAV: Record<string, Texte> = {
  '/': { en: 'Home', fr: 'Accueil' },
  '/produkte': { en: 'Products', fr: 'Produits' },
  '/produkte/skate-anlagen': { en: 'Concrete Skateparks', fr: 'Skateparks en béton' },
  '/produkte/skate-bowls-beton': { en: 'Skate Bowls', fr: 'Bowls de skate' },
  '/produkte/skate-pipes-beton': { en: 'Skate Pipes', fr: 'Mini-rampes de skate' },
  '/produkte/pumptrack-beton': { en: 'Concrete Pump Tracks', fr: 'Pumptracks en béton' },
  '/produkte/grillstelle-beton': { en: 'Barbecue Area', fr: 'Aire de barbecue' },
  '/produkte/umkleidekabine-beton': { en: 'Changing Cubicle', fr: 'Cabine de change' },
  '/produkte/ueberdachung-beton': { en: 'Shelter / Pavilion', fr: 'Abri / Pavillon' },
  '/produkte/hockey-banden': { en: 'Rink Boards', fr: 'Bandes de hockey' },
  '/katalog': { en: 'Catalogue', fr: 'Catalogue' },
  '/planung': { en: 'Design', fr: 'Conception' },
  '/konfigurator': { en: 'Skatepark Planner', fr: 'Configurateur de skatepark' },
  '/projekte': { en: 'Projects', fr: 'Projets' },
  '/referenzen-presse': { en: 'Press', fr: 'Presse' },
  '/ueber-uns': { en: 'About us', fr: 'À propos' },
  '/kontakt': { en: 'Contact', fr: 'Contact' },
};

// Die Unterpunkt-Bezeichnung "Planung durch A+" weicht von der Hauptnavigation ab
const NAV_SUB_PLANUNG: Texte = { en: 'Design by A+', fr: 'Conception par A+' };

const PRODUKT: Record<string, { en: Partial<Product>; fr: Partial<Product> }> = {
  'skate-anlagen': {
    en: {
      title: 'Concrete Skateparks',
      altText: 'Concrete skatepark with bowls and pipes: modular skate elements from manufacturer A+ Urban Design.',
      usp: 'The A+ original: TÜV-certified concrete skate elements for skateparks, bowls and pipes. The precast units can be combined and extended later. They need little maintenance and stand up to vandalism and weather. Concrete dampens rolling noise.',
      material: 'Reinforced concrete',
      details: 'Tested to EN 14974, can be rearranged with a pallet truck',
    },
    fr: {
      title: 'Skateparks en béton',
      altText: 'Skatepark en béton avec bowls et mini-rampes : éléments de skate modulaires du fabricant A+ Urban Design.',
      usp: "L'original A+ : des éléments de skate en béton certifiés TÜV pour skateparks, bowls et mini-rampes. Les éléments préfabriqués se combinent et peuvent être agrandis par la suite. Ils demandent peu d'entretien et résistent au vandalisme comme aux intempéries. Le béton atténue le bruit de roulement.",
      material: 'Béton armé',
      details: 'Testé selon la norme EN 14974, réagençable au transpalette',
    },
  },
  'skate-bowls': {
    en: {
      title: 'Modular Skate Bowls',
      altText: 'Modular skate bowls made of precast concrete units, closed and open, TÜV-certified.',
      usp: 'The A+ original: TÜV-certified concrete skate elements for closed bowls sunk into the ground and open bowls on an existing surface, 98 or 150 cm deep. The elements need little maintenance, resist vandalism and can be extended.',
      material: 'Reinforced concrete',
      details: "Galvanised coping tubes that won't dent",
    },
    fr: {
      title: 'Bowls de skate modulaires',
      altText: 'Bowls de skate modulaires en éléments préfabriqués en béton, fermés ou ouverts, certifiés TÜV.',
      usp: "L'original A+ : des éléments de skate en béton certifiés TÜV, pour des bowls fermés enterrés ou des bowls ouverts posés sur une surface existante, de 98 ou 150 cm de profondeur. Les éléments demandent peu d'entretien, résistent au vandalisme et peuvent être agrandis.",
      material: 'Béton armé',
      details: 'Tubes de coping galvanisés qui ne se cabossent pas',
    },
  },
  'skate-pipes': {
    en: {
      title: 'Concrete Skate Pipes',
      altText: 'Concrete skate pipes in three heights: 165, 200 and 255 cm.',
      usp: 'The A+ original: TÜV-certified concrete skate pipes in three heights, either as a standard pipe that can be extended sideways or as a combi pipe with coping ramps, banks and spines. The pipes need little maintenance, resist vandalism and are quiet.',
      material: 'Reinforced concrete',
      details: '165, 200 or 255 cm high, adjustable supports',
    },
    fr: {
      title: 'Mini-rampes de skate en béton',
      altText: 'Mini-rampes de skate en béton en trois hauteurs : 165, 200 et 255 cm.',
      usp: "L'original A+ : des mini-rampes en béton certifiées TÜV en trois hauteurs, en version standard extensible sur les côtés ou en version combi avec rampes à coping, banks et spines. Elles demandent peu d'entretien, résistent au vandalisme et sont silencieuses.",
      material: 'Béton armé',
      details: '165, 200 ou 255 cm de haut, supports réglables',
    },
  },
  pumptrack: {
    en: {
      title: 'Concrete Pump Tracks',
      altText: 'Concrete pump track made of modular precast units, built by pump track manufacturer A+ Urban Design.',
      usp: 'The A+ original: TÜV-certified berms, rollers and ramps in concrete for pump tracks. They can be free-standing, set in concrete or set in asphalt, and suit bikes, scooters, inline skates and skateboards.',
      material: 'Reinforced concrete',
      details: 'Around 5–8 dB(A) quieter than timber, metal or plastic',
    },
    fr: {
      title: 'Pumptracks en béton',
      altText: 'Pumptrack en béton composé de modules préfabriqués, réalisé par le fabricant de pumptracks A+ Urban Design.',
      usp: "L'original A+ : des virages relevés, des bosses et des rampes en béton certifiés TÜV pour pumptracks. Les éléments sont posés, scellés ou noyés dans l'enrobé, et conviennent aux vélos, trottinettes, rollers et skateboards.",
      material: 'Béton armé',
      details: 'Environ 5 à 8 dB(A) de moins que le bois, le métal ou le plastique',
    },
  },
  ueberdachung: {
    en: {
      title: 'Shelter / Pavilion',
      altText: 'Concrete shelter with seating.',
      usp: 'The A+ original: a shelter in fair-faced concrete, with a base slab and seating, for bus stops, sports grounds and green spaces. It can be placed singly or in groups on a gravel bed, concrete or asphalt. It needs little maintenance and resists vandalism.',
      material: 'Reinforced concrete',
      details: 'Installed without foundations',
    },
    fr: {
      title: 'Abri / Pavillon',
      altText: 'Abri en béton avec banc.',
      usp: "L'original A+ : un abri en béton brut avec dalle de sol et assise, pour arrêts de bus, équipements sportifs et espaces verts. Il se pose seul ou en groupe sur un lit de gravier, du béton ou de l'asphalte. Il demande peu d'entretien et résiste au vandalisme.",
      material: 'Béton armé',
      details: 'Pose sans fondation',
    },
  },
  grillstelle: {
    en: {
      title: 'Public Barbecue Area',
      altText: 'Round concrete barbecue in a park with a stainless steel grate, space for 12–16 people.',
      usp: 'The A+ original: a barbecue with a height-adjustable stainless steel grate, base slab and seating for 12–16 people. It is set up on a gravel bed, concrete or asphalt. Made of precast concrete units, it needs little maintenance and resists vandalism.',
      material: 'Reinforced concrete, stainless steel grate',
      details: 'Installed without foundations, height-adjustable cooking surface',
    },
    fr: {
      title: 'Aire de barbecue publique',
      altText: 'Barbecue circulaire en béton dans un parc, avec grille en inox, pour 12 à 16 personnes.',
      usp: "L'original A+ : un barbecue avec grille en inox réglable en hauteur, dalle de sol et assise pour 12 à 16 personnes. Il se pose sur un lit de gravier, du béton ou de l'asphalte. Fait d'éléments préfabriqués en béton, il demande peu d'entretien et résiste au vandalisme.",
      material: 'Béton armé, grille en inox',
      details: 'Pose sans fondation, surface de cuisson réglable en hauteur',
    },
  },
  umkleide: {
    en: {
      title: 'Schnecke Changing Cubicle',
      altText: 'Snail-shaped concrete changing cubicle ("Schnecke") at an outdoor pool.',
      usp: 'The A+ original: a changing cubicle in exposed concrete and stainless steel with no moving parts. It has a base slab and, on request, a seat and stainless steel clothes hooks. The cubicle is set up on a gravel bed, concrete or asphalt. It consists of two precast concrete units, needs little maintenance and resists vandalism.',
      material: 'Reinforced concrete, stainless steel',
      details: 'Installed without foundations',
    },
    fr: {
      title: 'Cabine de change « Schnecke »',
      altText: "Cabine de change en béton en forme d'escargot (« Schnecke ») dans une piscine de plein air.",
      usp: "L'original A+ : une cabine de change en béton brut et inox, sans pièces mobiles. Elle comprend une dalle de sol et, sur demande, une assise et des patères en inox. Elle se pose sur un lit de gravier, du béton ou de l'asphalte. Composée de deux éléments préfabriqués en béton, elle demande peu d'entretien et résiste au vandalisme.",
      material: 'Béton armé, inox',
      details: 'Pose sans fondation',
    },
  },
  hockey: {
    en: {
      title: 'Rink Boards',
      altText: 'Outdoor hockey rink with robust concrete boards for inline and rink hockey.',
      usp: 'The A+ original: foundation-free perimeters and boards for inline, roller and ice hockey, extendable in 1.5 m steps, with no moving parts. They are set up on concrete or asphalt surfaces, need little maintenance and are weather-resistant.',
      material: 'Reinforced concrete, recyclable rubber, stainless steel, HPL panels',
      details: 'Installed without foundations',
    },
    fr: {
      title: 'Bandes de hockey',
      altText: 'Terrain de hockey extérieur avec bandes robustes en béton pour le rink hockey et le hockey in-line.',
      usp: "L'original A+ : des enceintes et bandes sans fondation pour le hockey in-line, le rink hockey et le hockey sur glace, extensibles par modules de 1,5 m, sans pièces mobiles. Elles se posent sur des surfaces en béton ou en asphalte, demandent peu d'entretien et résistent aux intempéries.",
      material: 'Béton armé, caoutchouc recyclable, inox, panneaux HPL',
      details: 'Pose sans fondation',
    },
  },
};

export const KATEGORIE: Record<ProjectCategory, Texte> = {
  Skatepark: { en: 'Skatepark', fr: 'Skatepark' },
  Pumptrack: { en: 'Pump track', fr: 'Pumptrack' },
  'Hockey-Bande': { en: 'Hockey boards', fr: 'Bandes de hockey' },
  Grillstelle: { en: 'Barbecue area', fr: 'Aire de barbecue' },
  Umkleidekabine: { en: 'Changing cubicle', fr: 'Cabine de change' },
};

type ProjektText = {
  title: string;
  description: string;
  longDescription: string[];
  altText: string;
  produkte: string[];
};

const PROJEKT: Record<string, { en: ProjektText; fr: ProjektText }> = {
  'skatepark-friedrichsdorf': {
    en: {
      title: 'Friedrichsdorf Skatepark',
      description:
        'The 2,000 m² skatepark sits on two levels and is built from TÜV-certified concrete skate elements: fun boxes, stairs, a pyramid hip, ledges, rail slides and a pipe almost two metres high. Parts of the park are banked up with soil and blended into the grounds of the sports and leisure area.',
      longDescription: [
        'Friedrichsdorf now has a 2,000 m² skatepark on two linked levels, built with TÜV-certified concrete elements from A+ Urban Design. It includes fun boxes, stairs, a pyramid hip, ledges, rail slides and a pipe almost two metres high.',
        'Some of the skate elements are banked up with soil and blended into the grounds of the existing sports and leisure area.',
        'Sources (in German): kommunaldirekt.de ("Skatepark Friedrichsdorf", 2022 and 2024), freiraum-gestalten.info ("Skatepark Friedrichsdorf"). More details are in the trade articles on our press page.',
      ],
      altText: 'Friedrichsdorf Skatepark: a 2,000 m² skatepark on two levels made of TÜV-certified concrete elements.',
      produkte: ['Modular skate elements', 'Skate pipes'],
    },
    fr: {
      title: 'Skatepark de Friedrichsdorf',
      description:
        "Ce skatepark de 2 000 m² s'étend sur deux niveaux et se compose d'éléments de skate en béton certifiés TÜV : funboxes, escaliers, pyramide à arêtes, ledges, rails ainsi qu'une mini-rampe de près de deux mètres de haut. Une partie de l'ensemble est talutée et intégrée au terrain de la zone de sports et de loisirs.",
      longDescription: [
        "À Friedrichsdorf, un skatepark de 2 000 m² a vu le jour sur deux niveaux reliés, avec des éléments en béton certifiés TÜV d'A+ Urban Design. Il comprend des funboxes, des escaliers, une pyramide à arêtes, des ledges, des rails et une mini-rampe de près de deux mètres de haut.",
        "Une partie des éléments est talutée et intégrée au terrain de la zone de sports et de loisirs existante.",
        "Sources (en allemand) : kommunaldirekt.de (« Skatepark Friedrichsdorf », 2022 et 2024), freiraum-gestalten.info (« Skatepark Friedrichsdorf »). Vous trouverez plus de détails dans les articles spécialisés sur notre page presse.",
      ],
      altText: 'Skatepark de Friedrichsdorf : skatepark de 2 000 m² sur deux niveaux, en éléments de béton certifiés TÜV.',
      produkte: ['Éléments de skate modulaires', 'Mini-rampes de skate'],
    },
  },
  'pumptrack-berlin-reinickendorf': {
    en: {
      title: 'Berlin-Reinickendorf Pump Track',
      description:
        "The first pump track in the Reinickendorf district, next to the Humboldt-Gymnasium, built with modular TÜV-certified concrete elements from A+ Urban Design. The track runs partly over the Tegel Tunnel and had to be routed between existing trees.",
      longDescription: [
        "The first pump track in Berlin's Reinickendorf district was built next to the Humboldt-Gymnasium. It runs partly over the Tegel Tunnel and had to be routed through existing trees, which called for careful route planning in a tight space.",
        'It was built from modular concrete pump track elements: banked turns and straight sections with obstacles, where riders pick up speed by shifting their weight alone, without pedalling. A+ Urban Design supplied specially developed, low-maintenance concrete elements and supported the route planning.',
        'Sources (in German): kommunaldirekt.de ("Pump-Track in Berlin", 2022), freiraum-gestalten.info ("Pumptracken in Berlin", FREIRAUM GESTALTEN 05/2022).',
      ],
      altText: 'Berlin-Reinickendorf pump track at the Humboldt-Gymnasium, above the Tegel Tunnel: modular concrete elements.',
      produkte: ['Modular pump track elements'],
    },
    fr: {
      title: 'Pumptrack de Berlin-Reinickendorf',
      description:
        "Le premier pumptrack de l'arrondissement de Reinickendorf, à côté du lycée Humboldt, réalisé avec des éléments modulaires en béton certifiés TÜV d'A+ Urban Design. Le tracé passe en partie au-dessus du tunnel de Tegel et a dû se faufiler entre des arbres existants.",
      longDescription: [
        "Dans l'arrondissement berlinois de Reinickendorf, le premier pumptrack du quartier a été construit à côté du lycée Humboldt. Il passe en partie au-dessus du tunnel de Tegel et a dû être tracé à travers les arbres existants, ce qui a demandé une planification minutieuse du tracé sur un espace restreint.",
        "Il est réalisé avec des éléments de pumptrack modulaires en béton : des virages relevés et des lignes droites avec obstacles, sur lesquels on prend de la vitesse par simple transfert de poids, sans pédaler. A+ Urban Design a fourni des éléments en béton spécialement développés, à entretien réduit, et a accompagné la planification du tracé.",
        "Sources (en allemand) : kommunaldirekt.de (« Pump-Track in Berlin », 2022), freiraum-gestalten.info (« Pumptracken in Berlin », FREIRAUM GESTALTEN 05/2022).",
      ],
      altText: 'Pumptrack de Berlin-Reinickendorf au lycée Humboldt, au-dessus du tunnel de Tegel : éléments modulaires en béton.',
      produkte: ['Éléments de pumptrack modulaires'],
    },
  },
  'grillplatz-oeffentlicher-raum': {
    en: {
      title: 'Barbecue Area for Public Spaces',
      description:
        'The fixed barbecue area is made of precast concrete units and has a stainless steel grate, a height-adjustable cooking surface and a windbreak ring. It measures 420 cm across and stands without a foundation. The robust, vandal-resistant barbecue area is intended for outdoor pools, sports grounds and allotment sites.',
      longDescription: [
        'The barbecue area consists of three precast concrete units and measures 420 cm across once assembled. The grate is stainless steel, the support galvanised steel. The grate is height-adjustable and secured against swivelling and theft by a central locking eye.',
        'It is intended for outdoor pools, campsites, sports grounds and allotment sites. The barbecue area stands without a foundation on a compacted gravel bed, so no paving is needed. The 16 cm base slab is part of the delivery.',
        'Source (in German): kommunaldirekt.de, "Grillplatz für öffentlichen Raum" (2020).',
      ],
      altText: 'Barbecue area made of A+ precast concrete units, 420 cm in diameter, stainless steel grate, no foundation.',
      produkte: ['Public barbecue area'],
    },
    fr: {
      title: "Aire de barbecue pour l'espace public",
      description:
        "Cette aire de barbecue fixe est composée d'éléments préfabriqués en béton, avec une grille en inox, une surface de cuisson réglable en hauteur et un anneau pare-vent. Elle mesure 420 cm de diamètre et se pose sans fondation. Robuste et résistante au vandalisme, elle est destinée aux piscines de plein air, aux équipements sportifs et aux jardins familiaux.",
      longDescription: [
        "L'aire de barbecue se compose de trois éléments préfabriqués en béton et mesure 420 cm de diamètre une fois assemblée. La grille est en inox, le pied en acier galvanisé. La grille est réglable en hauteur et sécurisée contre la rotation et le vol par un œillet central.",
        "Elle est destinée aux piscines de plein air, aux campings, aux équipements sportifs et aux jardins familiaux. L'aire se pose sans fondation sur un lit de gravier compacté, sans travaux de pavage. La dalle de sol de 16 cm d'épaisseur est comprise dans la livraison.",
        "Source (en allemand) : kommunaldirekt.de, « Grillplatz für öffentlichen Raum » (2020).",
      ],
      altText: "Aire de barbecue en éléments préfabriqués en béton A+, 420 cm de diamètre, grille en inox, sans fondation.",
      produkte: ['Aire de barbecue publique'],
    },
  },
  'hockey-bandensystem-outdoor': {
    en: {
      title: 'Foundation-Free Board System for Sports Courts',
      description:
        'A board system for sports courts that is installed without foundations or ground fixings. It is made of weather-resistant materials with stainless steel components and adapts flexibly to different court sizes.',
      longDescription: [
        'A+ Urban Design has developed a board system for sports courts that is installed without foundations or ground fixings. Unlike anchored boards, it leaves the surface undamaged.',
        'The system is made of weather-resistant materials: concrete, stainless steel, HPL panels and rubber. The perimeter, which takes the heaviest wear, is concrete. In 1.5 m steps, the boards can be fitted to a small court, a half court or a full-size court.',
        'There are two heights: 40 cm as a perimeter with a rubber cap for inline hockey, and 110 cm as a profiled board with a stainless steel handrail for roller hockey, inline hockey and, with an optional sealing profile, ice hockey in winter.',
        'Source (in German): freiraum-gestalten.info, "Ohne Fundament und Bodenbefestigung" (FREIRAUM GESTALTEN 02/2015).',
      ],
      altText: 'Foundation-free board system made of concrete, stainless steel and HPL for inline, roller and ice hockey.',
      produkte: ['Hockey boards'],
    },
    fr: {
      title: 'Système de bandes sans fondation pour terrains de sport',
      description:
        "Un système de bandes pour terrains de sport qui se pose sans fondation ni fixation au sol. Il est réalisé en matériaux résistants aux intempéries, avec des composants en inox, et s'adapte avec souplesse à différentes tailles de terrain.",
      longDescription: [
        "A+ Urban Design a développé un système de bandes pour terrains de sport qui se pose sans fondation ni fixation au sol. Contrairement aux bandes ancrées, il ne détériore pas le revêtement.",
        "Le système est réalisé en matériaux résistants aux intempéries : béton, inox, panneaux HPL et caoutchouc. L'enceinte, la partie la plus sollicitée, est en béton. Par modules de 1,5 m, les bandes s'adaptent à un petit terrain, à un demi-terrain ou à un terrain entier.",
        "Il existe deux hauteurs : 40 cm pour une enceinte avec capuchon en caoutchouc destinée au hockey in-line, et 110 cm pour une bande profilée avec main courante en inox, destinée au rink hockey, au hockey in-line et, avec un profil d'étanchéité en option, au hockey sur glace en hiver.",
        "Source (en allemand) : freiraum-gestalten.info, « Ohne Fundament und Bodenbefestigung » (FREIRAUM GESTALTEN 02/2015).",
      ],
      altText: 'Système de bandes sans fondation en béton, inox et HPL pour le hockey in-line, le rink hockey et le hockey sur glace.',
      produkte: ['Bandes de hockey'],
    },
  },
  'schnecke-umkleidekabine': {
    en: {
      title: 'Schnecke: Changing Cubicle for Outdoor Pools',
      description:
        'The changing and shower cubicle from A+ Urban Design is made of two stacked precast concrete units with a characteristic snail-shaped privacy wall on stainless steel feet. It comes either with a built-in shower or just with recesses for a floor drain and water pipes, and needs no foundation.',
      longDescription: [
        'The Schnecke (German for "snail") is a low-maintenance changing cubicle for outdoor pools. It consists of a seamless concrete base slab and a snail-shaped upper part on stainless steel feet. Bathers do not have to touch the cubicle when entering or leaving, which mattered especially during the pandemic.',
        'The privacy wall starts 30 cm above the floor. From outside you can see whether the cubicle is occupied, and misuse is harder. The cubicle has no moving parts and needs hardly any maintenance. It consists of just two parts without screw fixings, is easy to set up and can be moved later.',
        'Sources (in German): kommunaldirekt.de ("Umkleidekabine für Freibäder"), kommunalclick24.de ("Ein Schneckenhaus als Duschkabine", "Duschkabine: Wir sind so frei"), flaechenmanager.com ("Berührungsfreie Umkleidekabine für Freibäder", 2021).',
      ],
      altText: 'Schnecke: changing and shower cubicle made of two precast concrete units with a snail-shaped privacy wall.',
      produkte: ['Changing cubicle'],
    },
    fr: {
      title: 'Schnecke : cabine de change pour piscines de plein air',
      description:
        "La cabine de change et de douche d'A+ Urban Design se compose de deux éléments préfabriqués en béton superposés, avec une paroi d'intimité en forme d'escargot posée sur des pieds en inox. Elle est proposée avec douche intégrée ou simplement avec des réservations pour le siphon et les conduites d'eau, et ne nécessite pas de fondation.",
      longDescription: [
        "La Schnecke (« escargot » en allemand) est une cabine de change à entretien réduit pour les piscines de plein air. Elle se compose d'une dalle de sol en béton sans joint et d'une partie supérieure en forme d'escargot sur des pieds en inox. On n'a pas besoin de toucher la cabine pour y entrer ou en sortir, ce qui a compté tout particulièrement pendant la pandémie.",
        "La paroi d'intimité commence à 30 cm du sol. De l'extérieur, on voit si la cabine est occupée, et les dégradations sont plus difficiles. La cabine n'a aucune pièce mobile et demande très peu d'entretien. Elle se compose de seulement deux éléments sans vissage, se met en place facilement et peut être déplacée par la suite.",
        "Sources (en allemand) : kommunaldirekt.de (« Umkleidekabine für Freibäder »), kommunalclick24.de (« Ein Schneckenhaus als Duschkabine », « Duschkabine: Wir sind so frei »), flaechenmanager.com (« Berührungsfreie Umkleidekabine für Freibäder », 2021).",
      ],
      altText: "Schnecke : cabine de change et de douche en deux éléments préfabriqués en béton, avec paroi d'intimité en forme d'escargot.",
      produkte: ['Cabine de change'],
    },
  },
  'bastion-skatepark-alba-iulia': {
    en: {
      title: 'Bastion Skatepark Alba Iulia',
      description:
        'The skatepark lies in the former moat of the star-shaped Alba Carolina fortress in Alba Iulia (Romania). It spreads over several levels and is built from modular concrete skate elements that disappear from view beyond about 50 m. The historic fortress wall was restored during construction.',
      longDescription: [
        'A skatepark that stays invisible from more than 50 m away was built in the former moat of the star-shaped Alba Carolina fortress in Alba Iulia, Romania. That is deliberate: the park should not disturb the look of the star fortress.',
        'The historic fortress wall was restored during construction. The skatepark links the upper and lower town across several levels and shows how leisure use and heritage protection can go together. A+ Urban Design supplied the modular concrete elements and supported the project within the heritage-protection setting.',
        'Source (in German): freiraum-gestalten.info, "Skaten und Denkmalschutz vereinen".',
      ],
      altText: 'Bastion Skatepark in Alba Iulia, Romania: modular concrete skate elements in the historic fortress moat.',
      produkte: ['Modular skate elements', 'Skate bowls', 'Skate pipes'],
    },
    fr: {
      title: 'Bastion Skatepark Alba Iulia',
      description:
        "Le skatepark se trouve dans l'ancien fossé de la forteresse en étoile d'Alba Carolina, à Alba Iulia (Roumanie). Il s'étend sur plusieurs niveaux et se compose d'éléments de skate modulaires en béton qui disparaissent de la vue à partir d'environ 50 m. Le mur historique de la forteresse a été restauré pendant les travaux.",
      longDescription: [
        "Dans l'ancien fossé de la forteresse en étoile d'Alba Carolina, à Alba Iulia, en Roumanie, a été aménagé un skatepark qui reste invisible au-delà de 50 m. C'est voulu : l'ensemble ne doit pas troubler l'image de la forteresse en étoile.",
        "Le mur historique de la forteresse a été restauré pendant les travaux. Le skatepark relie la ville haute et la ville basse sur plusieurs niveaux et montre que loisirs et protection du patrimoine peuvent aller de pair. A+ Urban Design a fourni les éléments modulaires en béton et a accompagné le projet dans le contexte de la protection du patrimoine.",
        "Source (en allemand) : freiraum-gestalten.info, « Skaten und Denkmalschutz vereinen ».",
      ],
      altText: 'Bastion Skatepark à Alba Iulia, en Roumanie : éléments de skate modulaires en béton dans le fossé historique de la forteresse.',
      produkte: ['Éléments de skate modulaires', 'Bowls de skate', 'Mini-rampes de skate'],
    },
  },
};

const pick = (lang: Lang, t: Texte, de: string) => (lang === 'de' ? de : t[lang]);

export const useNavLinks = () => {
  const lang = useLang();
  return useMemo(
    () =>
      NAV_LINKS.map((link) => ({
        ...link,
        name: pick(lang, NAV[link.href], link.name),
        subLinks: link.subLinks?.map((sub) => ({
          ...sub,
          name:
            sub.name === 'Planung durch A+'
              ? pick(lang, NAV_SUB_PLANUNG, sub.name)
              : pick(lang, NAV[sub.href], sub.name),
        })),
      })),
    [lang],
  );
};

export const useProducts = (): Product[] => {
  const lang = useLang();
  return useMemo(
    () => (lang === 'de' ? PRODUCTS : PRODUCTS.map((p) => ({ ...p, ...PRODUKT[p.id][lang] }))),
    [lang],
  );
};

export const useProjects = (): Project[] => {
  const lang = useLang();
  return useMemo(() => {
    if (lang === 'de') return PROJECTS;
    return PROJECTS.map((p) => {
      const t = PROJEKT[p.id][lang];
      return {
        ...p,
        title: t.title,
        description: t.description,
        longDescription: t.longDescription,
        altText: t.altText,
        productsUsed: p.productsUsed.map((u, i) => ({ ...u, name: t.produkte[i] ?? u.name })),
      };
    });
  }, [lang]);
};

export const useKategorie = () => {
  const lang = useLang();
  return (c: ProjectCategory): string => pick(lang, KATEGORIE[c], c);
};

// Gruppennamen: die Daten sind deutsch/englisch gemischt, hier nur die deutschen
const GRUPPEN: Record<string, [string, string]> = {
  'Quarterramps und Walls': ['Quarter ramps and walls', 'Quarters et murs'],
  'Kegel und Cross-Ramps': ['Cones and cross ramps', 'Cônes et cross ramps'],
  'Jump-Ramps, Anlaufkeile, Wave': ['Jump ramps, run-up wedges, wave', "Jump ramps, cales d'élan, wave"],
  'Geländer': ['Railings', 'Garde-corps'],
  'Sonstiges': ['Other', 'Divers'],
  'Rails und Slides': ['Rails and slides', 'Rails et slides'],
};
export const gruppenName = (g: string, lang: string) => (lang === 'de' || !GRUPPEN[g] ? g : GRUPPEN[g][lang === 'en' ? 0 : 1]);


// Teilenamen: englische Fachbegriffe (Bank, Wall …) und Kürzel bleiben, nur die deutschen Wörter werden übersetzt.
// Reihenfolge zählt: längere Wendungen vor ihren Teilen.
const TEILE: [string, string, string][] = [
  ['CORNER-PODESTPLATTE', 'CORNER PLATFORM PLATE', 'PLAQUE DE PODIUM CORNER'],
  ['PODESTPLATTE', 'PLATFORM PLATE', 'PLAQUE DE PODIUM'],
  ['KEGEL', 'CONE', 'CÔNE'],
  ['WAVE-WELLE', 'WAVE', 'WAVE'],
  ['ANLAUFKEIL', 'RUN-UP WEDGE', "CALE D'ÉLAN"],
  ['LEDGE KURZ', 'LEDGE SHORT', 'LEDGE COURT'],
  ['LEDGE LANG', 'LEDGE LONG', 'LEDGE LONG'],
  ['GELÄNDER-ENDE LINKS', 'RAILING END LEFT', 'EXTRÉMITÉ DE GARDE-CORPS GAUCHE'],
  ['GELÄNDER-ENDE RECHTS', 'RAILING END RIGHT', 'EXTRÉMITÉ DE GARDE-CORPS DROITE'],
  ['GELÄNDER-VERBINDUNG GERADE', 'RAILING CONNECTOR STRAIGHT', 'RACCORD DE GARDE-CORPS RECTILIGNE'],
  ['GELÄNDER-VERBINDUNG', 'RAILING CONNECTOR', 'RACCORD DE GARDE-CORPS'],
  ['GELÄNDER-', 'RAILING ', 'GARDE-CORPS '],
  ['GELÄNDER', 'RAILING', 'GARDE-CORPS'],
  ['HINWEISSCHILD', 'INFORMATION SIGN', "PANNEAU D'INFORMATION"],
];
export const teilName = (name: string, lang: string) => {
  if (lang === 'de') return name;
  const i = lang === 'en' ? 1 : 2;
  const z = TEILE.find((r) => name.startsWith(r[0]));
  return z ? z[i] + name.slice(z[0].length) : name;
};
