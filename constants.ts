import { Product, Project, PressArticle } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  {
    name: 'Produkte',
    href: '/produkte',
    subLinks: [
      { name: 'Skate-Anlagen', href: '/produkte/skate-anlagen' },
      { name: 'Skate-Bowls', href: '/produkte/skate-bowls-beton' },
      { name: 'Skate-Pipes', href: '/produkte/skate-pipes-beton' },
      { name: 'Pumptrack Beton', href: '/produkte/pumptrack-beton' },
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
    id: 'kommunaldirekt-skatepark-friedrichsdorf-2024',
    title: 'Skatepark Friedrichsdorf (2024)',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/skatepark-friedrichsdorf-2/',
    teaser:
      'Aktualisierte Berichterstattung zur 2.000 m² großen Skateanlage in Friedrichsdorf: zwei verbundene Ebenen mit Fun-Boxen, Jump-Ramps, Stairs, Pyramid-Hip, Ledges und Rail-Slides aus TÜV-zertifizierten Betonelementen von A+ Urban Design – integriert in das Freizeit- und Sportgebiet.',
    year: 2024,
  },
  {
    id: 'kommunaldirekt-skateanlage-duisburg-a59',
    title: 'Skateanlage in Duisburg',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/skateanlage-in-duisburg/',
    teaser:
      'Am Ende der Duisburger Fußgängerzone wurde eine kompakte Skateanlage aus 38 modularen Betonfertigteilen von A+ Urban Design installiert – direkt über der Autobahn A 59. Die Herausforderung: die Module trotz unebener Asphaltschicht über der Brückenabdichtung sicher zu setzen, ohne die darunterliegende Membran zu beschädigen.',
    year: 2022,
  },
  {
    id: 'kommunaldirekt-pumptrack-berlin',
    title: 'Pump-Track in Berlin',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/pump-track-in-berlin/',
    teaser:
      'Im Bezirk Reinickendorf entstand neben dem Humboldt-Gymnasium der erste Pump-Track des Bezirks. Die Anlage erstreckt sich teilweise über dem Tegel Tunnel und musste zwischen bestehenden Bäumen geführt werden – realisiert mit modularen, TÜV-zertifizierten Betonelementen von A+ Urban Design.',
    year: 2022,
  },
  {
    id: 'kommunaldirekt-offener-skatebowl-bonnigheim',
    title: 'Offener Skatebowl aus Betonfertigteilen',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/offener-skatebowl-aus-betonfertigteilen/',
    teaser:
      'In Bönnigheim wurde westlich der Burgstraße ein Bewegungspark aus TÜV-zertifizierten Betonfertigteilen errichtet. Die Rampen gehen nahtlos in die umgebende Asphaltfläche über – ein Designprinzip von A+ Urban Design, das Lärmemissionen minimiert und die Anlage harmonisch in die Landschaft integriert.',
    year: 2019,
  },
  {
    id: 'kommunaldirekt-grillplatz-oeffentlicher-raum',
    title: 'Grillplatz für öffentlichen Raum',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/grillplatz-fuer-oeffentlichen-raum/',
    teaser:
      'Ein stationärer Grillplatz aus Betonfertigteilen mit Edelstahl-Rost, höhenverstellbarer Grillfläche und Windschutzring – Durchmesser 420 cm, fundamentfrei. Eine A+-Lösung für Freibäder, Sportanlagen und Schrebergärten: robust, vandalismussicher und ohne bewegliche Teile.',
    year: 2020,
  },
  {
    id: 'kommunaldirekt-modulare-skateelemente-2018',
    title: 'Modulare Skateelemente aus Beton',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/modulare-skateelemente-aus-beton/',
    teaser:
      'Fachvorstellung der TÜV-zertifizierten Skateelemente von A+ Urban Design: Beton mit eingebauten Stahlkomponenten, modulare Gestaltung, niedrige Wartung, lange Haltbarkeit. Jedes Angebot wird mit individuellen 3D-Visualisierungen begleitet, die Module können später zerlegt und wiederverwendet werden.',
    year: 2018,
  },
  {
    id: 'kommunaldirekt-modulare-skateelemente-2020',
    title: 'Modulare Skateelemente aus Beton (Update 2020)',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/modulare-skateelemente-aus-beton-2/',
    teaser:
      'Aktualisierte Vorstellung der zertifizierten Skateelemente: Beton mit verzinktem Stahl, fundamentfrei installierbar, wartungsarm und mit gutem Grip auch bei Feuchtigkeit. Die modulare Bauweise ermöglicht mehrfache Verwendung und einfaches Recycling.',
    year: 2020,
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
  {
    id: 'freiraum-gestalten-pumptrack-skater-biker-2024',
    title: 'Pumptrack für Skater und Biker',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/aktuelles/produkte/article-7991735-208480/pumptrack-fuer-skater-und-biker-.html',
    teaser:
      'A+ Urban Design erweitert das Produktportfolio um modulare Pumptrack-Elemente: schräge Kurventeile und gerade Strecken mit Hindernissen ermöglichen Fahrern, allein durch Gewichtsverlagerung Geschwindigkeit aufzubauen – ohne Antrieb, ohne Pedale.',
    year: 2024,
  },
  {
    id: 'freiraum-gestalten-pumptracken-berlin-2022',
    title: 'Pumptracken in Berlin',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-7271021-208098/pumptracken-in-berlin-.html',
    teaser:
      'Fachbeitrag zur Pump-Track-Anlage in Berlin-Reinickendorf neben dem Humboldt-Gymnasium: die Trasse schlängelt sich durch den Baumbestand und führt teilweise über den Tegel Tunnel. A+ Urban Design lieferte speziell entwickelte, wartungsarme Betonelemente und unterstützte die Trassenplanung. (FREIRAUM GESTALTEN 05/2022)',
    year: 2022,
  },
  {
    id: 'freiraum-gestalten-mobil-geraeuscharm-2022',
    title: 'Mobil und geräuscharm',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-7133612-208098/mobil-und-geraeuscharm-.html',
    teaser:
      'Modulare Skateboard-Elemente für Inline-, Skateboard- und BMX-Anlagen: Pools, Rampen und Fun-Boxen ohne Bodenbefestigung. Durch die hohe Masse des Betons besonders geräuscharm. Erfüllen DIN EN 14974, TÜV-zertifiziert. (FREIRAUM GESTALTEN 02/2022)',
    year: 2022,
  },
  {
    id: 'freiraum-gestalten-pump-track-skater-biker-2015',
    title: 'Pump-Track für Skater und Biker',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-5191212-208098/pump-track-fuer-skater-und-biker-.html',
    teaser:
      'Erstvorstellung der modular aufgebauten Pumptracks von A+ Urban Design: Nachbildungen unebener Pisten aus festen Betonelementen, die sich auf bestehenden Hartbelagsflächen oder speziellen Unterlagen installieren lassen. (FREIRAUM GESTALTEN 01/2015)',
    year: 2015,
  },
  {
    id: 'freiraum-gestalten-ohne-fundament-bandensystem-2015',
    title: 'Ohne Fundament und Bodenbefestigung',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-5190957-208098/ohne-fundament-und-bodenbefestigung-.html',
    teaser:
      'A+ Urban Design präsentiert ein Bandensystem für Sportfelder, das ohne Fundamente und ohne Bodenbefestigungen aufgestellt wird. Witterungsbeständige Materialien mit Edelstahlkomponenten, flexibel anpassbar an verschiedene Feldgrößen. (FREIRAUM GESTALTEN 02/2015)',
    year: 2015,
  },
  {
    id: 'freiraum-gestalten-modulare-skateelemente-2014',
    title: 'Modulare Skateelemente aus Beton',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-5190799-208098/modulare-skateelemente-aus-beton-.html',
    teaser:
      'Frühe Vorstellung der A+-Skateelemente: keine Verschraubungen auf der Oberfläche, keine Verschleißplatten zum Austauschen. Nach DIN EN 14974 geprüft, vom TÜV-Süd zertifiziert und mit GS-Zeichen für geprüfte Sicherheit. (FREIRAUM GESTALTEN 01/2014)',
    year: 2014,
  },
  {
    id: 'flaechenmanager-beruehrungsfreie-umkleidekabine',
    title: 'Berührungsfreie Umkleidekabine für Freibäder',
    publisher: 'flaechenmanager.com',
    url: 'https://www.flaechenmanager.com/aktuelles/produkte/article-6840410-203909/beruehrungsfreie-umkleidekabine-fuer-freibaeder-.html',
    teaser:
      'A+ Urban Design präsentiert eine wartungsarme Umkleidekabine für Freibäder: fugenlose Betonbodenplatte mit schneckenförmigem Oberteil auf Edelstahlfüßen. Beim Betreten und Verlassen ist kein Kabinenkontakt nötig – ein hygienischer Vorteil, besonders während der Pandemie entwickelt.',
    year: 2021,
  },
];

export const PRODUCTS: Product[] = [
   {
    id: 'skate-anlagen',
    title: 'Beton Skate-Anlagen',
    imageUrl: '/images/homepage/hero-anlage-01.jpg',
    path: '/produkte/skate-anlagen',
    altText: 'Beton-Skate-Anlage mit Bowls und Pipes — modulare Skate-Elemente vom Hersteller A+ Urban Design.',
    tuvCertified: true,
    usp: 'Das A+ Original: TÜV-zertifizierte Skate-Anlagen mit Bowls und Pipes — modular, erweiterbar und schalldämpfend.'
  },
  {
    id: 'skate-bowls',
    title: 'Modulare Skate-Bowls',
    imageUrl: '/images/skate-bowls/skate-bowl-01.jpg',
    path: '/produkte/skate-bowls-beton',
    altText: 'Modulare Skate-Bowls aus Beton-Fertigteilen — geschlossen und offen, TÜV-zertifiziert.',
    tuvCertified: true,
    usp: 'Bowl-Tiefen 98 und 150 cm — als geschlossener Standard-Bowl im Erdreich oder offener Bowl direkt auf der Fläche.'
  },
  {
    id: 'skate-pipes',
    title: 'Beton Skate-Pipes',
    imageUrl: '/images/skate-pipes/skate-pipe-01.jpg',
    path: '/produkte/skate-pipes-beton',
    altText: 'Beton Skate-Pipes — Mini-Pipe, Standard-Pipe und Super-Pipe vom Hersteller A+ Urban Design.',
    tuvCertified: true,
    usp: 'Halfpipe und Mini-Pipe in fünf Höhen (135–255 cm) — Standardaufstellung oder Combi-Pipe mit Banks, Spines und Coping-Ramps.'
  },
  {
    id: 'pumptrack',
    title: 'Pumptrack aus Beton',
    imageUrl: '/images/pumptrack/pumptrack-beton-elemente-01.jpg',
    path: '/produkte/pumptrack-beton',
    altText: 'Beton-Pumptrack aus modularen Fertigteilen — realisiert vom Pumptrack-Hersteller A+ Urban Design.',
    tuvCertified: true,
    usp: 'Der flowige Rundkurs für Bikes, Scooter, Inliner und Skateboards — mit Arretierungsstäben und Kantenschutzprofil montagefertig.'
  },
  {
    id: 'ueberdachung',
    title: 'Überdachung / Pavillon',
    imageUrl: '/images/ueberdachung/ueberdachung-unterstellplatz-02.jpg',
    path: '/produkte/ueberdachung-beton',
    altText: 'Minimalistische Betonüberdachung im urbanen Raum.',
    usp: 'Massiver Wetterschutz aus Sichtbeton — fundamentfrei, modular und zeitlos.'
  },
  {
    id: 'grillstelle',
    title: 'Öffentliche Grillstelle',
    imageUrl: '/images/grill/grillstelle-background.jpg',
    path: '/produkte/grillstelle-beton',
    altText: 'Runder Beton-Grillplatz im Park mit Edelstahl-Rost — Platz für 12–16 Personen.',
    usp: 'Fundamentfrei und höhenverstellbar — Platz für 12–16 Personen an vandalismussicherem Edelstahl-Rost.'
  },
  {
    id: 'umkleide',
    title: 'Umkleidekabine',
    imageUrl: '/images/umkleide/umkleide-panorama.jpg',
    path: '/produkte/umkleidekabine-beton',
    altText: 'Schnecken-Umkleidekabine aus Beton im Freibad.',
    usp: 'Die Schnecke: fundamentfrei mit fugenloser Bodenplatte — türlos, vandalismushemmend und hygienisch.'
  },
  {
    id: 'hockey',
    title: 'Hockey-Banden',
    imageUrl: '/images/hockey/roll-hockey-bande.jpg',
    path: '/produkte/hockey-banden',
    altText: 'Outdoor Hockey-Spielfeld mit robusten Beton-Banden für Inline- und Rollhockey.',
    usp: 'Modular erweiterbar in 1,5 m-Schritten — ohne Bandenaufbau, ohne Bodenbefestigung.'
  },
];

export const PROJECTS: Project[] = [
    {
        id: "skatepark-friedrichsdorf",
        title: "Skatepark Friedrichsdorf",
        category: "Skatepark",
        year: 2022,
        imageUrl: "/images/skateparks/skatepark-01.jpg",
        images: [
            "/images/skateparks/skatepark-02.jpg",
            "/images/skateparks/skatepark-03.jpg",
        ],
        description: "2.000 m² große Skateanlage auf zwei Ebenen mit TÜV-zertifizierten Skateelementen aus Beton — Fun-Boxen, Stairs, Pyramid-Hip, Ledges, Rail-Slides sowie eine knapp zwei Meter hohe Pipe. Durch Böschungen und Geländeintegration fügt sich die Anlage harmonisch in das Sport- und Freizeitgebiet ein.",
        longDescription: [
            "In Friedrichsdorf entstand eine 2.000 m² große Skateanlage auf zwei verbundenen Ebenen mit TÜV-zertifizierten Betonelementen von A+ Urban Design. Die Anlage umfasst Fun-Boxen, Stairs, Pyramid-Hip, Ledges, Rail-Slides und eine knapp zwei Meter hohe Pipe.",
            "Böschungen und Geländeintegration sorgen dafür, dass sich die Anlage harmonisch in das bestehende Sport- und Freizeitgebiet einfügt. Die Skateelemente wurden teils angeböscht und so in das Gelände modelliert.",
            "Quellen: kommunaldirekt.de (»Skatepark Friedrichsdorf«, 2022 und 2024), freiraum-gestalten.info (»Skatepark Friedrichsdorf«). Für einen Fachbeitrag mit weiteren Details siehe die verlinkten Artikel auf unserer Presse-Seite."
        ],
        altText: "Skatepark Friedrichsdorf — 2.000 m² zweistufige Skateanlage aus TÜV-zertifizierten Betonelementen.",
        productsUsed: [
            { name: "Modulare Skate-Elemente", path: "/produkte/skate-anlagen" },
            { name: "Skate-Pipes", path: "/produkte/skate-pipes-beton" },
        ]
    },
    {
        id: "pumptrack-berlin-reinickendorf",
        title: "Pump-Track Berlin-Reinickendorf",
        category: "Pumptrack",
        year: 2022,
        imageUrl: "/images/pumptrack/pumptrack-beton-elemente-01.jpg",
        images: [
             "/images/pumptrack/pumptrack-beton-module-03.jpg",
             "/images/pumptrack/pumptrack-beton-module-04.jpg",
             "/images/pumptrack/pumptrack-beton-elemente-02.jpg",
        ],
        description: "Der erste Pump-Track im Bezirk Reinickendorf, neben dem Humboldt-Gymnasium — realisiert mit modularen, TÜV-zertifizierten Betonelementen von A+ Urban Design. Die Trasse erstreckt sich teilweise über dem Tegel-Tunnel und musste zwischen bestehenden Bäumen geführt werden.",
        longDescription: [
            "Im Berliner Bezirk Reinickendorf entstand neben dem Humboldt-Gymnasium der erste Pump-Track des Bezirks. Die Anlage erstreckt sich teilweise über dem Tegel-Tunnel und musste zwischen bestehendem Baumbestand geführt werden — eine anspruchsvolle Trassenplanung mit beengten Bau- und Tragwerksbedingungen.",
            "Die Lösung waren modular aufgebaute Pump-Track-Elemente aus Beton: schräge Kurventeile und gerade Strecken mit Hindernissen, die Fahrern erlauben, allein durch Gewichtsverlagerung Geschwindigkeit aufzubauen — ohne Antrieb, ohne Pedale. A+ Urban Design lieferte speziell entwickelte, wartungsarme Betonelemente und unterstützte die Trassenplanung.",
            "Quellen: kommunaldirekt.de (»Pump-Track in Berlin«, 2022), freiraum-gestalten.info (»Pumptracken in Berlin«, FREIRAUM GESTALTEN 05/2022)."
        ],
        altText: "Pump-Track Berlin-Reinickendorf am Humboldt-Gymnasium, über dem Tegel-Tunnel — modulare Beton-Elemente.",
        productsUsed: [
            { name: "Modulare Pumptrack-Elemente", path: "/produkte/pumptrack-beton" },
        ]
    },
    {
        id: "grillplatz-oeffentlicher-raum",
        title: "Grillplatz für den öffentlichen Raum",
        category: "Grillstelle",
        year: 2020,
        imageUrl: "/images/grill/grill-platz-01.jpg",
        images: [
             "/images/grill/grill-stelle-02.jpg",
             "/images/grill/grillstelle-background.jpg",
        ],
        description: "Stationärer Grillplatz aus Betonfertigteilen mit Edelstahl-Rost, höhenverstellbarer Grillfläche und Windschutzring — Durchmesser 420 cm, fundamentfrei. Eine A+-Lösung für Freibäder, Sportanlagen und Schrebergärten: robust, vandalismussicher und ohne bewegliche Teile.",
        longDescription: [
            "Der Grillplatz aus A+-Betonfertigteilen besteht aus mehreren Betonteilen, die zusammengebaut eine Einheit mit 420 cm Durchmesser bilden. Der Grillrost ist aus Edelstahl, die Stütze aus verzinktem Stahl, höhenverstellbar und gegen Schwenken und Diebstahl durch eine zentrale Öse gesichert.",
            "Konzipiert für den öffentlichen Raum: Freibäder, Campingplätze, Sportanlagen und Schrebergärten. Die Installation erfolgt fundamentfrei auf einem verdichteten Schotterbett — keine Pflasterarbeiten, keine Erdarbeiten. Die Bodenplatte ist 16 cm stark und Teil der Grillstelle.",
            "Quelle: kommunaldirekt.de, »Grillplatz für öffentlichen Raum« (2020)."
        ],
        altText: "Grillplatz aus A+-Betonfertigteilen — Durchmesser 420 cm, Edelstahlrost, fundamentfrei.",
        productsUsed: [
            { name: "Öffentliche Grillstelle", path: "/produkte/grillstelle-beton" },
        ]
    },
    {
        id: "hockey-bandensystem-outdoor",
        title: "Fundamentfreies Bandensystem für Sportfelder",
        category: "Hockey-Bande",
        year: 2015,
        imageUrl: "/images/hockey/inline-hockey-bande-03.jpg",
        images: [
             "/images/hockey/hockey-einfassung-01.jpg",
             "/images/hockey/inline-hockey-bande-02.jpg",
             "/images/hockey/roll-hockey-bande.jpg",
        ],
        description: "Ein Bandensystem für Sportfelder, das ohne Fundamente und ohne Bodenbefestigungen aufgestellt wird. Witterungsbeständige Materialien mit Edelstahlkomponenten, flexibel anpassbar an verschiedene Feldgrößen.",
        longDescription: [
            "A+ Urban Design hat ein Bandensystem für Sportfelder entwickelt, das ohne Fundamente und ohne Bodenbefestigungen aufgestellt wird. Der Bodenbelag bleibt unbeschädigt — anders als bei klassischen Banden mit Verankerung im Untergrund.",
            "Das System arbeitet mit witterungsbeständigen Materialien: Beton, Edelstahl, Laminatplatten und Gummi. Die am stärksten beanspruchte Einfassungsfläche ist aus Beton. Modulare Erweiterung in 1,5-m-Schritten erlaubt die flexible Anpassung an Kleinfeld, Halbfeld oder reguläres Spielfeld.",
            "Drei Varianten sind verfügbar: 40 cm als Einfassung mit Gummikappe für Inline-Hockey, 80 cm und 110 cm als Profil-Banden mit Edelstahl-Handlauf für Rollhockey, Inline-Hockey oder — mit optionalem Abdichtungsprofil — auch für Eishockey im Winter.",
            "Quelle: freiraum-gestalten.info, »Ohne Fundament und Bodenbefestigung« (FREIRAUM GESTALTEN 02/2015)."
        ],
        altText: "Fundamentfreies Bandensystem für Inline-Hockey, Rollhockey und Eishockey — Beton, Edelstahl, Laminat.",
        productsUsed: [
            { name: "Hockey-Banden", path: "/produkte/hockey-banden" },
        ]
    },
    {
        id: "schnecke-umkleidekabine",
        title: "Schnecke — Umkleidekabine für Freibäder",
        category: "Umkleidekabine",
        year: 2021,
        imageUrl: "/images/umkleide/umkleide-kabine-01.jpg",
        images: [
            "/images/umkleide/umkleidekabine-freibad-03.jpg",
            "/images/umkleide/umkleide-kabine-02.jpg",
            "/images/umkleide/umkleide-panorama.jpg",
        ],
        description: "Die Umkleide- und Duschkabine von A+ Urban Design besteht aus zwei aufeinandergesetzten Betonfertigteilen mit charakteristisch schneckenförmiger Sichtschutzwand auf Edelstahlfüßen. Wahlweise mit integrierter Dusche oder nur mit Aussparungen für Gully und Wasserleitungen — komplett ohne aufwendige Fundamentarbeit.",
        longDescription: [
            "Die Schnecke ist eine wartungsarme Umkleidekabine für Freibäder: fugenlose Betonbodenplatte, schneckenförmiges Oberteil auf Edelstahlfüßen. Beim Betreten und Verlassen ist kein Kabinenkontakt nötig — ein hygienischer Vorteil, der besonders während der Pandemie von Bedeutung war.",
            "Die Sichtschutzwand ab 30 cm Höhe ermöglicht Sichtkontrolle gegen Missbrauch. Wartungsarme Materialien ohne bewegliche Teile garantieren langjährige Haltbarkeit. Die Kabine besteht aus nur zwei Teilen ohne Verschraubungen und lässt sich einfach aufstellen, umsetzen oder versetzen.",
            "Quellen: kommunaldirekt.de (»Umkleidekabine für Freibäder«), kommunalclick24.de (»Ein Schneckenhaus als Duschkabine«, »Duschkabine – wir sind so frei«), flaechenmanager.com (»Berührungsfreie Umkleidekabine für Freibäder«, 2021)."
        ],
        altText: "Schnecke — Umkleide- und Duschkabine aus zwei Betonfertigteilen mit schneckenförmigem Sichtschutz.",
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
        description: "Skatepark im ehemaligen Festungsgraben der sternförmigen Alba Carolina in Alba Iulia (Rumänien) — mehrstufige Anlage aus modularen Beton-Skateelementen, die aus mehr als 50 m Entfernung unsichtbar bleibt. Die historische Festungsmauer wurde im Zuge der Bauarbeiten restauriert.",
        longDescription: [
            "Im ehemaligen Festungsgraben der sternförmigen Alba Carolina in Alba Iulia, Rumänien, entstand ein Skatepark, der aus mehr als 50 m Entfernung unsichtbar bleibt — ein bewusster Entwurf, um die historische Gesamtwirkung der Sternfestung nicht zu stören.",
            "Die historische Festungsmauer wurde im Zuge der Bauarbeiten restauriert; die mehrstufige Skateanlage verbindet zugleich Ober- und Unterstadt und zeigt, wie Freizeitnutzung und Denkmalschutz zusammengehen können. A+ Urban Design lieferte die modularen Betonelemente und begleitete die Einbindung in den Denkmalschutz-Kontext.",
            "Quelle: freiraum-gestalten.info, »Skaten und Denkmalschutz vereinen«."
        ],
        altText: "Bastion Skatepark in Alba Iulia, Rumänien — modulare Beton-Skate-Elemente im historischen Festungsgraben.",
        images: [],
        productsUsed: [
            { name: "Modulare Skate-Elemente", path: "/produkte/skate-anlagen" },
            { name: "Skate-Bowls", path: "/produkte/skate-bowls-beton" },
            { name: "Skate-Pipes", path: "/produkte/skate-pipes-beton" },
        ]
    },
];