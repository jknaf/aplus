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
    usp: 'Das A+ Original: TÜV-zertifizierte Skate-Anlagen mit Bowls und Pipes — modular, skalierbar und schalldämpfend.'
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
        description: "Ein moderner Beton-Skatepark, der Anfängern wie Profis gerecht wird — mit einer vielfältigen Street-Area und einer anspruchsvollen Bowl-Sektion. Alle Elemente sind aus vandalismusresistentem Hochleistungsbeton gefertigt.",
        longDescription: [
            "Die Anlage kombiniert Street-Obstacles und Bowl-Bereich zu einem fließenden Parcours: Quarter-Ramps in verschiedenen Höhen, Funboxen, Pyramid-Hip, Ledges und Rail-Slides sind um eine zentrale Skate-Bowl mit 98 cm Tiefe arrangiert. Die Module sind TÜV-zertifiziert nach DIN EN 14974 und mit GS-Zeichen geprüft — Stahlbeton C35/45, bewehrt, mit verzinkten Copingrohren und Hartgummi-Kantenschutz an allen Rollflächen.",
            "Die gesamte Anlage ist fundamentfrei montiert: die Module wurden auf der vorhandenen Asphaltfläche aufgestellt und mit Edelstahl-Übergangsblechen an die Rollfläche angeschlossen. Dadurch entfallen teure Erdarbeiten, Fundamentplatten und lange Aushärtungszeiten — der Park war in wenigen Tagen montiert und direkt nutzbar. Das modulare System erlaubt spätere Erweiterungen, Umbauten und Versetzen an einen anderen Standort.",
            "Zielgruppe sind Skateboarder, BMX-Fahrer, Inline-Skater und Scooter-Fahrer aller Niveaus. Der Park ist ganzjährig nutzbar — die Beton-Oberflächen bieten auch bei Feuchtigkeit zuverlässigen Grip, und die massive Materialdichte reduziert Geräuschemissionen deutlich gegenüber Holz- oder Stahlrampen. Damit ist die Anlage auch für wohnungsnahe Standorte genehmigungsfähig.",
            "Für die Planung wurden individuelle 3D-Visualisierungen mit Draufsicht und Kostenübersicht erstellt. Die Auftraggeberschaft erhielt vor Baubeginn einen komplett kalkulierten Systemvorschlag — inklusive Lieferlogistik, Montagedauer und Wartungshinweisen. Die Produkt-Module stammen aus unserem Standard-Baukasten und sind vollständig dokumentiert (DIN-Statik, TÜV-Zertifikat Z1A 056616 0012 Rev. 00)."
        ],
        altText: "Luftaufnahme eines modularen Beton-Skateparks mit Bowl und Street-Bereich.",
        productsUsed: [
            { name: "Quarter-Ramps & Half-Pipes", path: "/produkte/skate-anlagen" },
            { name: "Skate-Bowls", path: "/produkte/skate-bowls-beton" }
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
        description: "Ein flowiger Rundkurs aus modularen Beton-Fertigteilen für Fahrräder, Scooter, Inline-Skates und Skateboards. Die Strecke wird ausschließlich durch Gewichtsverlagerung befahren — ohne Treten, ohne Antrieb.",
        longDescription: [
            "Die Trasse besteht aus vorgefertigten Betonelementen mit ca. 1,25 m Fahrbahnbreite — Steilkurven, Rollern (Wellen) und geraden Passagen mit Hindernissen wie Doubles und Tabletops. Jedes Element ist werksseitig mit definierter Geometrie gefertigt; die Module werden vor Ort mit Arretierungsstäben verbunden und mit Kantenschutzprofilen gesichert. TÜV-zertifiziert mit GS-Zeichen nach DIN EN 14974.",
            "Der Aufbau erfolgte in drei Tagen: die Module wurden direkt auf der vorhandenen befestigten Fläche montiert, ohne Fundament und ohne Betonierarbeiten vor Ort. Alternativ hätten die Elemente auch auf einer separaten Beton-/Asphaltpiste oder auf Fundamentplatten anbetoniert werden können — drei Aufbauvarianten standen zur Wahl. Die modulare Bauweise erlaubt es, später einzelne Streckenabschnitte zu ergänzen, zu versetzen oder komplett umzubauen.",
            "Im Gegensatz zu Asphalt- oder Erde-Pumptracks bieten die Beton-Fertigteile eine dauerhaft perfekte Geometrie: keine Verformungen durch Nutzung, keine saisonale Instandhaltung, kein Nachverdichten. Die Oberfläche ist frostsicher, UV-beständig und auch bei Feuchtigkeit griffig. Das macht die Anlage ganzjährig nutzbar — vom Frühjahr bis zum ersten Schnee.",
            "Zielgruppe sind Kinder, Jugendliche und Erwachsene, die mit Rollgeräten aller Art Fahrtechnik und Kondition trainieren wollen. Pumptracks haben sich in den letzten Jahren als hochfrequent genutzte Freizeitanlagen etabliert — geringe Einstiegshürde, hoher Wiederholungsfaktor, kein Vandalismusrisiko. Kommunen und Vereine können die Module auch selbst aufbauen und so Kosten sparen; Fördermittel aus der Sportstättenförderung sind nutzbar."
        ],
        altText: "Flowiger Beton-Pumptrack aus modularen Fertigteilen für Bikes, Scooter, Inliner und Skateboards.",
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
        description: "Eine barrierefreie Grill- und Begegnungszone im zentralen Stadtpark — mit unserer runden Beton-Grillstelle als sozialem Mittelpunkt. Platz für 12–16 Personen, direkt neben der neuen Skate-Anlage.",
        longDescription: [
            "Die stationäre Grillstelle besteht aus Beton-Fertigteilen mit 4,20 m Durchmesser und 2,70 m Höhe. Der massive Rost aus Edelstahl ist höhenverstellbar und durch eine zentrale Öse gegen Schwenken und Diebstahl gesichert. Die 16 cm starke Bodenplatte ist integriert — keine Pflaster- oder Erdarbeiten nötig. Die Windschutz-Ringwand sorgt für kontrolliertes Feuer auch bei Zugluft.",
            "Der Aufbau erfolgte in einem Tag: die Grillstelle wurde per Autokran abgeladen und direkt auf ein verdichtetes Schotterbett gesetzt. Damit ist die Installation fundamentfrei, vandalismussicher und vollständig wartungsarm. Alle Oberflächen sind leicht zu reinigen — eine regelmäßige Spülung mit Wasser reicht. Der Edelstahlrost ist in einem Aufwaschvorgang vom Grillrückstand befreit.",
            "Die Zielgruppe ist der öffentliche Raum: Familien, Jugendgruppen, Vereine, Nachbarschafts-Events. Die Grillstelle bietet auch im geselligen Rahmen Sicherheit — massive Betonwand statt freier Feuerstelle, kein Funkenflug in die Umgebung, keine offenen Elektro- oder Gasanschlüsse. Für Freibäder, Campingplätze, Sportanlagen und Schrebergärten ist dies die langlebige Alternative zu improvisierten Grillplätzen.",
            "Die Grillstelle lässt sich modular um Sitzbänke aus Beton, Überdachungen und Tische ergänzen. Im Stadtpark wurde zusätzlich ein Pavillon-Modul als Wetterschutz aufgestellt. Die gesamte Zone ist rollstuhlgerecht erreichbar; die Grillhöhe kann nach Bedarf eingestellt werden. Kommunen erhalten von A+ Urban Design auf Wunsch Wartungshinweise und ein Ersatzteil-Datenblatt für den Edelstahlrost."
        ],
        altText: "Vandalismusresistente Betongrillstelle im Stadtpark mit Platz für 12-16 Personen.",
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
        description: "Modernisierung eines Inlinehockey-Feldes mit unserem fundamentfreien Bandensystem — modular erweiterbar in 1,5-m-Schritten, ohne Bandenaufbau, ohne Bodenbefestigung. Ganzjährig für Inline-/Rollhockey und im Winter sogar für Eishockey nutzbar.",
        longDescription: [
            "Das bestehende Hartplatz-Feld wurde mit unseren 110-cm-Profil-Banden mit Edelstahl-Handlauf eingefasst. Die Konstruktion aus Stahlrahmen, Beton-Gewichten und hochschlagfesten HPL-Platten ist auf intensiven Spielbetrieb ausgelegt — Schussbelastung, Check-Beanspruchung und unvermeidliche Vandalismus-Versuche werden ohne Schaden aufgenommen. Die Banden sitzen fundamentfrei auf dem vorhandenen Untergrund und können jederzeit versetzt oder erweitert werden.",
            "Das modulare 1,5-m-Raster erlaubt die Anpassung an verschiedene Feldgrößen: Kleinfeld, Halbfeld oder DIN-gerechtes Spielfeld nach IIHF-Standard. Zwei Varianten stehen zur Verfügung — die 40-cm-Einfassung mit Gummikappen als leichte Spielfeldbegrenzung für Inline-Hockey, oder die 110-cm-Profil-Bande für Rollhockey und Eishockey. Beide Systeme sind miteinander kombinierbar.",
            "Für den Wintereinsatz wird unter der 110-cm-Bande ein Abdichtungsprofil eingesetzt. Damit verwandelt sich das Feld in eine Eislauffläche, sobald Temperaturen und Eisaufbereitung es erlauben — die selbe Anlage bedient Sommer- und Wintersport. Die Bodenfläche selbst bleibt bei allen Varianten unberührt, die Konstruktionsweise benötigt keine Bodenbefestigung.",
            "Zielgruppe sind Vereine, Schulen und kommunale Sportanlagen, die mit begrenztem Budget eine professionelle Outdoor-Hockey-Lösung benötigen. Tore, Netze und Zubehör (Schiedsrichterpodest, Spielerbänke) sind optional erhältlich. Die Anlage in diesem Projekt wurde in einer einzigen Arbeitswoche aufgebaut — die einzelnen Module passen auf einen Standard-LKW, die Montage erfolgt mit Autokran."
        ],
        altText: "Professionelles Inlinehockey-Feld mit robusten Beton-Banden in 110 cm Höhe für Inline-, Roll- und Eishockey.",
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
        description: "Sechs Schnecken-Umkleidekabinen aus bewehrtem Beton für das Freibad Süd — türlos, fundamentfrei und vandalismussicher. Leicht zu reinigen, ganzjährig einsatzbereit, ohne Abbau im Winter.",
        longDescription: [
            "In Freibädern und an Badeseen sind Türen oft das erste Opfer von Vandalismus. Unsere Lösung ist die Schnecke — ein schneckenförmiger Sichtschutz statt Tür: Beim Betreten und Verlassen gibt es keinen Kabinenkontakt, oben und unten ist die Kabine offen — das erlaubt Sichtkontrolle gegen Missbrauch und sorgt für Luftzirkulation. Die Kabine kann nicht verschlossen werden, Vandalismus an Scharnieren oder Schlössern ist konstruktiv ausgeschlossen.",
            "Jede Kabine besteht aus nur zwei Teilen ohne Verschraubungen: die Bodenplatte und das schneckenförmige Oberteil auf Edelstahlfüßen. Die fugenlose Bodenplatte dient zugleich als Fundamentschutz auf verdichtetem Schotterbett — kein klassisches Fundament erforderlich. Die Oberfläche ist wartungsfrei und lässt sich mit einem Hochdruckreiniger in wenigen Minuten säubern.",
            "Material: bewehrter Beton C35/45 in Verbindung mit Edelstahl-Elementen. Die Kabine ist witterungsbeständig, wartungsarm und muss im Winter nicht abgebaut werden — sie verrottet nicht, quillt nicht auf und verliert keine Befestigungen. Optional integrierte Haken, Sitzbänke oder Duschkabinen-Ausstattung mit Gully und Wasseranschluss sind erhältlich.",
            "Die sechs Kabinen des Freibad Süd stehen in zwei Reihen nebeneinander und bedienen an Spitzentagen mehrere hundert Badegäste. Die Installation erfolgte in zwei Tagen — inklusive Anlieferung, Aufstellung mit Autokran und Verfugung. Das Schotterbett wurde im Vorfeld von der örtlichen Tiefbaufirma vorbereitet. Insgesamt spart die Schnecken-Lösung gegenüber klassischen Umkleiden mit Türen rund zwei Drittel der Wartungskosten über 10 Jahre."
        ],
        altText: "Reihe von architektonischen Beton-Umkleidekabinen — Schnecken-Prinzip ohne Türen, fundamentfrei im Freibad.",
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
        description: "Der Bastion Skatepark im ehemaligen Festungsgraben der sternförmigen Alba Carolina in Alba Iulia, Rumänien — ein urbaner Treffpunkt, der Denkmalschutz und moderne Skatekultur verbindet. Aus mehr als 50 m Entfernung unsichtbar.",
        longDescription: [
            "Die Festung Alba Carolina im transsilvanischen Alba Iulia ist eine der best erhaltenen Sternfestungen Mittel- und Südosteuropas — UNESCO-Kandidat, Denkmalschutz höchster Stufe. Der ehemalige Festungsgraben zwischen Ober- und Unterstadt war jahrzehntelang ungenutzt. Die Stadtverwaltung stellte A+ Urban Design vor die Aufgabe, hier einen modernen Skatepark zu integrieren — ohne die historische Substanz zu beeinträchtigen und ohne das Festungsbild aus der Stadt heraus zu stören.",
            "Die Lösung ist eine mehrstufige Beton-Skateanlage, die sich komplett in den Graben einfügt: von den Promenaden der Oberstadt aus ist der Park aus mehr als 50 m Entfernung unsichtbar. Die historische Festungsmauer wurde im Zuge der Bauarbeiten restauriert und gesichert. Die Skate-Elemente sind so platziert, dass sie zugleich als Verbindung zwischen Ober- und Unterstadt funktionieren — ein Weg, der gleichzeitig Skate-Fläche ist.",
            "Technisch wurden modulare Skate-Elemente in Hohlkörperbauweise eingesetzt: Höhen 45 bis 149 cm, Wandstärke 8–16 cm, mit verzinkten Copingrohren und Hartgummi-Kantenschutz. Alle Module sind nach DIN EN 14974 TÜV-zertifiziert mit GS-Zeichen. Da der Graben nicht perfekt eben war, wurden Arretierungsfüße zur Höheneinstellung genutzt — keine Fundamentplatte, kein Eingriff in die historische Bausubstanz.",
            "Der Park ist öffentlich zugänglich und hat sich schnell zum Treffpunkt der lokalen Skate-Szene entwickelt. Regelmäßige Contests (Skateboard, BMX, Inliner, Scooter) werden mit Sponsoring-Partnern durchgeführt. A+ Urban Design hat das Projekt vom ersten Entwurf über die Denkmalschutz-Abstimmung bis zur schlüsselfertigen Lieferung betreut. Die Anlage gilt als Vorzeigebeispiel, wie Freizeitnutzung und Denkmalschutz nicht im Widerspruch stehen müssen."
        ],
        altText: "Bastion Skatepark in Alba Iulia, Rumänien — modulare Beton-Skate-Elemente im historischen Festungsgraben.",
        images: [
            "/images/skate-anlagen/skateanlage-03.jpg",
            "/images/skate-anlagen/skateanlagen-04.jpg",
        ],
        productsUsed: [
            { name: "Modulare Skate-Elemente", path: "/produkte/skate-anlagen" },
            { name: "Skate-Bowls", path: "/produkte/skate-bowls-beton" },
            { name: "Skate-Pipes", path: "/produkte/skate-pipes-beton" },
        ]
    },
];