import { Product, Project, PressArticle } from './types';

type NavLink = { name: string; href: string; subLinks?: { name: string; href: string; gruppe?: string; bild?: string }[] };

export const NAV_LINKS: NavLink[] = [
  // Home führt über das Logo, Presse steht im Footer und auf Über uns.
  // gruppe und bild nutzt das aufklappende Menü im Header (Bilder in public/images/menue, 480 px breit).
  {
    name: 'Produkte',
    href: '/produkte',
    subLinks: [
      { name: 'Skate-Anlagen', href: '/produkte/skate-anlagen', gruppe: 'skate', bild: '/images/menue/skate-anlage-01.webp' },
      { name: 'Skate-Bowls', href: '/produkte/skate-bowls-beton', gruppe: 'skate', bild: '/images/menue/skate-bowl-01.webp' },
      { name: 'Skate-Pipes', href: '/produkte/skate-pipes-beton', gruppe: 'skate', bild: '/images/menue/skate-pipe-01.webp' },
      { name: 'Pumptrack Beton', href: '/produkte/pumptrack-beton', gruppe: 'skate', bild: '/images/menue/pumptrack-beton-elemente-01.webp' },
      { name: 'Grillstelle Beton', href: '/produkte/grillstelle-beton', gruppe: 'freizeit', bild: '/images/menue/grill-platz-01.webp' },
      { name: 'Umkleidekabine', href: '/produkte/umkleidekabine-beton', gruppe: 'freizeit', bild: '/images/menue/umkleide-kabine-01.webp' },
      { name: 'Überdachung / Pavillon', href: '/produkte/ueberdachung-beton', gruppe: 'freizeit', bild: '/images/menue/ueberdachung-unterstellplatz-02.webp' },
      { name: 'Hockey-Banden', href: '/produkte/hockey-banden', gruppe: 'freizeit', bild: '/images/menue/inline-hockey-bande-03.webp' },
    ]
  },
  { name: 'Katalog', href: '/katalog' },
  {
    name: 'Planung',
    href: '/planung',
    subLinks: [
      { name: 'Planung durch A+', href: '/planung', bild: '/images/menue/skate-anlage-planung-01.webp' },
      { name: 'Skatepark-Planer', href: '/konfigurator', bild: '/images/menue/planer-3d-ueberblick.webp' },
    ]
  },
  { name: 'Projekte', href: '/projekte' },
  { name: 'Über uns', href: '/ueber-uns' },
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
      'In Friedrichsdorf entstand eine 2.000 m² große Skateanlage auf zwei Ebenen mit TÜV-zertifizierten Skateelementen aus Beton: Fun-Boxen, Stairs, Pyramid-Hip, Ledges, Rail-Slides sowie eine knapp zwei Meter hohe Pipe. Böschungen binden die Anlage in das Sport- und Freizeitgebiet ein.',
  },
  {
    id: 'kommunaldirekt-umkleidekabine-freibaeder',
    title: 'Umkleidekabine für Freibäder',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/umkleidekabine-fuer-freibaeder/',
    teaser:
      'Die robuste, wartungsarme Umkleidekabine besteht aus einer fugenlosen Beton-Bodenplatte und einer schneckenförmigen Betonwand auf Edelstahlfüßen. Auf Wunsch lässt sie sich um Haken und Sitzflächen erweitern oder als Duschkabine ausführen. Sie hat keine beweglichen Teile, ist deshalb langlebig und für kommunale Bäder gedacht.',
  },
  {
    id: 'kommunaldirekt-skateanlage-serpent',
    title: 'Skateanlage mit Serpent',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/skateanlage-mit-serpent/',
    teaser:
      'Die Altdorfer Skateanlage wurde grunderneuert und um einen „Serpent“ erweitert: einen offenen Bowl, der zugleich als Startrampe dient. Der Serpent wurde in die Fläche eingebaut, angeböscht und begrünt; sanierte Bestandselemente wurden mit neuen TÜV-zertifizierten Betonfertigteilen kombiniert.',
  },
  {
    id: 'kommunaldirekt-skatepark-friedrichsdorf-2024',
    title: 'Skatepark Friedrichsdorf (2024)',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/skatepark-friedrichsdorf-2/',
    teaser:
      'Der aktualisierte Bericht stellt die 2.000 m² große Skateanlage in Friedrichsdorf vor. Sie hat zwei verbundene Ebenen mit Fun-Boxen, Jump-Ramps, Stairs, Pyramid-Hip, Ledges und Rail-Slides aus TÜV-zertifizierten Betonelementen von A+ Urban Design und ist in das Freizeit- und Sportgebiet eingebunden.',
    year: 2024,
  },
  {
    id: 'kommunaldirekt-skateanlage-duisburg-a59',
    title: 'Skateanlage in Duisburg',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/skateanlage-in-duisburg/',
    teaser:
      'Am Ende der Duisburger Fußgängerzone wurde eine kompakte Skateanlage aus 38 modularen Betonfertigteilen von A+ Urban Design installiert, direkt über der Autobahn A 59. Die Herausforderung: Die Module mussten trotz unebener Asphaltschicht über der Brückenabdichtung sicher stehen, ohne die Membran darunter zu beschädigen.',
    year: 2022,
  },
  {
    id: 'kommunaldirekt-pumptrack-berlin',
    title: 'Pump-Track in Berlin',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/pump-track-in-berlin/',
    teaser:
      'Im Bezirk Reinickendorf entstand neben dem Humboldt-Gymnasium der erste Pump-Track des Bezirks. Die Anlage erstreckt sich teilweise über dem Tegel Tunnel und musste zwischen bestehenden Bäumen geführt werden. Realisiert wurde sie mit modularen, TÜV-zertifizierten Betonelementen von A+ Urban Design.',
    year: 2022,
  },
  {
    id: 'kommunaldirekt-offener-skatebowl-bonnigheim',
    title: 'Offener Skatebowl aus Betonfertigteilen',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/offener-skatebowl-aus-betonfertigteilen/',
    teaser:
      'In Bönnigheim wurde westlich der Burgstraße ein Bewegungspark aus TÜV-zertifizierten Betonfertigteilen errichtet. Die Rampen gehen ohne Übergangsblech in die Asphaltfläche über. Das senkt den Lärm und bindet die Anlage in die Umgebung ein.',
    year: 2019,
  },
  {
    id: 'kommunaldirekt-grillplatz-oeffentlicher-raum',
    title: 'Grillplatz für öffentlichen Raum',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/grillplatz-fuer-oeffentlichen-raum/',
    teaser:
      'Der stationäre Grillplatz besteht aus Betonfertigteilen und hat einen Edelstahl-Rost, eine höhenverstellbare Grillfläche und einen Windschutzring. Er misst 420 cm im Durchmesser und steht ohne Fundament. Gedacht ist er für Freibäder, Sportanlagen und Kleingartenanlagen.',
    year: 2020,
  },
  {
    id: 'kommunaldirekt-modulare-skateelemente-2018',
    title: 'Modulare Skateelemente aus Beton',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/modulare-skateelemente-aus-beton/',
    teaser:
      'Der Fachbeitrag stellt die TÜV-zertifizierten Skateelemente von A+ Urban Design vor. Sie bestehen aus Beton mit eingebauten Stahlteilen und sind modular, wartungsarm und langlebig. Zu jedem Angebot gibt es eine 3D-Visualisierung. Die Module lassen sich später abbauen und wiederverwenden.',
    year: 2018,
  },
  {
    id: 'kommunaldirekt-modulare-skateelemente-2020',
    title: 'Modulare Skateelemente aus Beton (Update 2020)',
    publisher: 'kommunaldirekt.de',
    url: 'https://www.kommunaldirekt.de/modulare-skateelemente-aus-beton-2/',
    teaser:
      'Die aktualisierte Vorstellung zeigt die zertifizierten Skateelemente aus Beton mit verzinktem Stahl. Sie lassen sich ohne Fundament installieren, sind wartungsarm und auch bei Nässe griffig. Die modulare Bauweise ermöglicht mehrfache Verwendung und einfaches Recycling.',
    year: 2020,
  },
  {
    id: 'kommunalclick24-duschkabine-so-frei',
    title: 'Duschkabine: Wir sind so frei',
    publisher: 'kommunalclick24.de',
    url: 'https://kommunalclick24.de/kommunen/duschkabine-wir-sind-so-frei/',
    teaser:
      'A+ Urban Design hat eine Duschkabine für öffentliche Bäder aus zwei aufeinandergesetzten Betonfertigteilen entwickelt. Die Sichtschutzwand beginnt 30 cm über dem Boden. So sieht man von außen, ob die Kabine belegt ist, und Missbrauch wird erschwert. Die Kabine hat keine beweglichen Teile und hält lange.',
  },
  {
    id: 'kommunalclick24-offene-skatebowl-betonfertigteile',
    title: 'Skateelemente: Offene Skatebowl aus Betonfertigteilen',
    publisher: 'kommunalclick24.de',
    url: 'https://kommunalclick24.de/kommunen/skateelemente-offene-skatebowl-aus-betonfertigteilen/',
    teaser:
      'In Bönnigheim entstand westlich der Burgstraße ein Bewegungspark mit einer modularen Skateanlage aus TÜV-zertifizierten Betonfertigteilen. Die Betonrampen gehen ohne Übergangsbleche in die Asphaltfläche über. Das senkt den Lärm und verbindet Bowl, Startrampen, Funbox und Zugangsrampen mit dem modellierten Gelände ringsum.',
  },
  {
    id: 'kommunalclick24-schneckenhaus-duschkabine',
    title: 'Ein Schneckenhaus als Duschkabine',
    publisher: 'kommunalclick24.de',
    url: 'https://kommunalclick24.de/gebauede/instandhaltung-technik/ein-schneckenhaus-als-duschkabine/',
    teaser:
      'Die Umkleide- und Duschkabine von A+ Urban Design besteht aus zwei aufeinandergesetzten Betonfertigteilen mit charakteristisch schneckenförmiger Sichtschutzwand auf Edelstahlfüßen. Sie ist wahlweise mit eingebauter Dusche oder nur mit Aussparungen für Gully und Wasserleitungen erhältlich und braucht kein Fundament.',
  },
  {
    id: 'treffpunkt-kommune-nachhaltig-oekologisch-sport',
    title: 'Auf nachhaltige und ökologische Weise Sport treiben',
    publisher: 'treffpunkt-kommune.de',
    url: 'https://www.treffpunkt-kommune.de/auf-nachhaltige-und-oekologische-weise-sport-treiben/',
    teaser:
      'Modular aufgebaute Skateanlagen aus Betonfertigteilen, Pumptracks und fundamentfreie Umkleidekabinen schaffen wohnortnahe Sportmöglichkeiten und vermeiden lange Anfahrten. Die wartungsarmen, recycelbaren Betonmodule lassen sich frei kombinieren und verbessern die Ökobilanz kommunaler Sportanlagen.',
  },
  {
    id: 'freiraum-gestalten-skatepark-friedrichsdorf',
    title: 'Skatepark Friedrichsdorf',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-7779922-208098/skatepark-friedrichsdorf-.html',
    teaser:
      'Der Fachbeitrag stellt die 2.000 m² große Skateanlage in Friedrichsdorf vor. Sie hat zwei verbundene Ebenen mit Betonskateelementen von A+ Urban Design, die in die Fläche integriert sind. Die TÜV-zertifizierten Fertigteile umfassen Rampen, Treppen, Schienen und eine knapp zwei Meter hohe Pipe, teils angeböscht und so ins Gelände eingebunden.',
  },
  {
    id: 'freiraum-gestalten-nachhaltig-sport-treiben',
    title: 'Nachhaltig Sport treiben',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/aktuelles/news/article-7759678-208085/nachhaltig-sport-treiben-.html',
    teaser:
      'Pumptracks, mobile Umkleidekabinen und TÜV-zertifizierte Skateanlagen aus Betonfertigteilen ermöglichen Sport im Freien das ganze Jahr, ohne großen Pflegeaufwand. Die dezentralen, fundamentfreien Lösungen reduzieren den ökologischen Fußabdruck gegenüber Rasenpflege, Pistenpräparierung oder Hallenbadbetrieb erheblich.',
  },
  {
    id: 'freiraum-gestalten-skaten-denkmalschutz',
    title: 'Skaten und Denkmalschutz vereinen',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/aktuelles/news/article-7473521-208085/skaten-und-denkmalschutz-vereinen-.html',
    teaser:
      'Im ehemaligen Festungsgraben der sternförmigen Alba Carolina in Alba Iulia (Rumänien) entstand ein Skatepark, der aus mehr als 50 m Entfernung unsichtbar bleibt. Die historische Festungsmauer wurde restauriert; die Anlage verbindet über mehrere Ebenen Ober- und Unterstadt und zeigt, wie Freizeitnutzung und Denkmalschutz zusammengehen.',
  },
  {
    id: 'freiraum-gestalten-offene-skatebowl-betonfertigteile',
    title: 'Offene Skatebowl aus Betonfertigteilen',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-6531315-208098/offene-skatebowl-aus-betonfertigteilen-.html',
    teaser:
      'Das Architekturbüro frei raum concept realisierte in Bönnigheim eine Skateanlage mit offener Bowl als Teil eines Bewegungsparks. Die modulare Bauweise mit TÜV-zertifizierten Betonfertigteilen erlaubt Übergänge ohne Kante zur Asphaltfläche und eignet sich für Bowl und Obstacles.',
  },
  {
    id: 'freiraum-gestalten-skateanlage-a59',
    title: 'Skateanlage über A 59',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-6270321-208098/skateanlage-ueber-a-59-.html',
    teaser:
      'In Duisburg entstand eine Skateanlage aus 38 modularen Betonfertigteilen von A+ Urban Design, direkt auf einer Autobahnbrücke über der A 59. Die Herausforderung: Die Elemente mussten trotz ungleichmäßigen Gefälles auf dünnem Asphalt sicher stehen, ohne die Abdichtungsmembran darunter zu beschädigen.',
  },
  {
    id: 'freiraum-gestalten-skate-park-planen',
    title: 'Wie man einen Skate-Park plant',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-5192982-208098/wie-man-einen-skate-park-plant-.html',
    teaser:
      'Bei der Skateparkplanung müssen Rampen und Hindernisse die DIN EN 14974 erfüllen. Nutzerbeteiligung ist wünschenswert, braucht aber fachliche Moderation, denn persönliche Vorlieben stehen oft im Konflikt mit normgerechter, langfristig tragfähiger Gestaltung.',
  },
  {
    id: 'freiraum-gestalten-pumptrack-skater-biker-2024',
    title: 'Pumptrack für Skater und Biker',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/aktuelles/produkte/article-7991735-208480/pumptrack-fuer-skater-und-biker-.html',
    teaser:
      'A+ Urban Design erweitert das Produktportfolio um modulare Pumptrack-Elemente: schräge Kurventeile und gerade Strecken mit Hindernissen. Darauf nimmt man allein durch Gewichtsverlagerung Fahrt auf, ohne zu treten.',
    year: 2024,
  },
  {
    id: 'freiraum-gestalten-pumptracken-berlin-2022',
    title: 'Pumptracken in Berlin',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-7271021-208098/pumptracken-in-berlin-.html',
    teaser:
      'Der Fachbeitrag beschreibt den Pumptrack in Berlin-Reinickendorf neben dem Humboldt-Gymnasium. Die Trasse schlängelt sich durch den Baumbestand und führt teilweise über den Tegel Tunnel. A+ Urban Design lieferte speziell entwickelte, wartungsarme Betonelemente und unterstützte die Trassenplanung. (FREIRAUM GESTALTEN 05/2022)',
    year: 2022,
  },
  {
    id: 'freiraum-gestalten-mobil-geraeuscharm-2022',
    title: 'Mobil und geräuscharm',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-7133612-208098/mobil-und-geraeuscharm-.html',
    teaser:
      'Die modularen Betonelemente für Skateboard, Inline und BMX umfassen Pools, Rampen und Funboxen und kommen ohne Bodenbefestigung aus. Durch die hohe Masse des Betons sind sie besonders leise. Sie erfüllen DIN EN 14974 und sind TÜV-zertifiziert. (FREIRAUM GESTALTEN 02/2022)',
    year: 2022,
  },
  {
    id: 'freiraum-gestalten-pump-track-skater-biker-2015',
    title: 'Pump-Track für Skater und Biker',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-5191212-208098/pump-track-fuer-skater-und-biker-.html',
    teaser:
      'Hier wurden die modular aufgebauten Pumptracks von A+ Urban Design erstmals vorgestellt. Sie bilden unebene Pisten aus festen Betonelementen nach, die sich auf bestehenden Hartbelagsflächen oder speziellen Unterlagen installieren lassen. (FREIRAUM GESTALTEN 01/2015)',
    year: 2015,
  },
  {
    id: 'freiraum-gestalten-ohne-fundament-bandensystem-2015',
    title: 'Ohne Fundament und Bodenbefestigung',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-5190957-208098/ohne-fundament-und-bodenbefestigung-.html',
    teaser:
      'A+ Urban Design präsentiert ein Bandensystem für Sportfelder, das ohne Fundamente und ohne Bodenbefestigungen aufgestellt wird. Es besteht aus witterungsbeständigen Materialien mit Edelstahlkomponenten und lässt sich flexibel an verschiedene Feldgrößen anpassen. (FREIRAUM GESTALTEN 02/2015)',
    year: 2015,
  },
  {
    id: 'freiraum-gestalten-modulare-skateelemente-2014',
    title: 'Modulare Skateelemente aus Beton',
    publisher: 'freiraum-gestalten.info',
    url: 'https://www.freiraum-gestalten.info/magazin/archiv/article-5190799-208098/modulare-skateelemente-aus-beton-.html',
    teaser:
      'Dieser frühe Beitrag stellt die A+-Skateelemente vor. Sie haben keine Verschraubungen auf der Oberfläche und keine Verschleißplatten, die ausgetauscht werden müssen. Sie sind nach DIN EN 14974 geprüft, vom TÜV SÜD zertifiziert und tragen das GS-Zeichen für geprüfte Sicherheit. (FREIRAUM GESTALTEN 01/2014)',
    year: 2014,
  },
  {
    id: 'flaechenmanager-beruehrungsfreie-umkleidekabine',
    title: 'Berührungsfreie Umkleidekabine für Freibäder',
    publisher: 'flaechenmanager.com',
    url: 'https://www.flaechenmanager.com/aktuelles/produkte/article-6840410-203909/beruehrungsfreie-umkleidekabine-fuer-freibaeder-.html',
    teaser:
      'A+ Urban Design präsentiert eine wartungsarme Umkleidekabine für Freibäder. Sie besteht aus einer fugenlosen Betonbodenplatte und einem schneckenförmigen Oberteil auf Edelstahlfüßen. Beim Betreten und Verlassen muss man die Kabine nicht berühren. Das ist hygienisch und war der Grund für die Entwicklung während der Pandemie.',
    year: 2021,
  },
];

export const PRODUCTS: Product[] = [
   {
    id: 'skate-anlagen',
    title: 'Skate-Anlagen aus Beton',
    imageUrl: '/images/homepage/hero-anlage-01.jpg',
    path: '/produkte/skate-anlagen',
    altText: 'Beton-Skate-Anlage mit Bowls und Pipes: modulare Skate-Elemente vom Hersteller A+ Urban Design.',
    tuvCertified: true,
    usp: 'Das A+ Original: TÜV-zertifizierte Skate-Elemente aus Beton für Skate-Anlagen, Bowls und Pipes. Die Fertigteile lassen sich kombinieren und später erweitern. Sie sind wartungsarm und halten Vandalismus und Witterung stand. Beton dämpft das Rollgeräusch.',
    material: 'Bewehrter Beton',
    details: 'Nach DIN EN 14974 geprüft, mit Hubwagen umbaubar'
  },
  {
    id: 'skate-bowls',
    title: 'Modulare Skate-Bowls',
    imageUrl: '/images/skate-bowls/skate-bowl-01.jpg',
    path: '/produkte/skate-bowls-beton',
    altText: 'Modulare Skate-Bowls aus Beton-Fertigteilen, geschlossen und offen, TÜV-zertifiziert.',
    tuvCertified: true,
    usp: 'Das A+ Original: TÜV-zertifizierte Skate-Elemente aus Beton für geschlossene Bowls im Erdreich und offene Bowls auf vorhandener Fläche, 98 oder 150 cm tief. Die Elemente sind wartungsarm, vandalismussicher und erweiterbar.',
    material: 'Bewehrter Beton',
    details: 'Verzinkte Copingrohre, die nicht eindellen'
  },
  {
    id: 'skate-pipes',
    title: 'Skate-Pipes aus Beton',
    imageUrl: '/images/skate-pipes/skate-pipe-01.jpg',
    path: '/produkte/skate-pipes-beton',
    altText: 'Skate-Pipes aus Beton in drei Höhen: 165, 200 und 255 cm.',
    tuvCertified: true,
    usp: 'Das A+ Original: TÜV-zertifizierte Pipes aus Beton in drei Höhen: als Standard-Pipe, seitlich erweiterbar, oder als Kombi-Pipe mit Coping-Ramps, Banks und Spines. Die Pipes sind wartungsarm, vandalismussicher und leise.',
    material: 'Bewehrter Beton',
    details: '165, 200 oder 255 cm hoch, Stützen nachstellbar'
  },
  {
    id: 'pumptrack',
    title: 'Pumptracks aus Beton',
    imageUrl: '/images/pumptrack/pumptrack-beton-elemente-01.jpg',
    path: '/produkte/pumptrack-beton',
    altText: 'Beton-Pumptrack aus modularen Fertigteilen, realisiert vom Pumptrack-Hersteller A+ Urban Design.',
    tuvCertified: true,
    usp: 'Das A+ Original: TÜV-zertifizierte Steilkurven, Wellen und Rampen aus Beton für Pumptracks. Sie werden aufgestellt, einbetoniert oder einasphaltiert und eignen sich für Bikes, Scooter, Inliner und Skateboards.',
    material: 'Bewehrter Beton',
    details: 'Rund 5–8 dB(A) leiser als Holz, Metall oder Kunststoff'
  },
  {
    id: 'ueberdachung',
    title: 'Überdachung / Pavillon',
    imageUrl: '/images/ueberdachung/ueberdachung-unterstellplatz-02.jpg',
    path: '/produkte/ueberdachung-beton',
    altText: 'Überdachung aus Beton mit Sitzbank.',
    usp: 'Das A+ Original: Wetterschutz aus Sichtbeton mit Bodenplatte und Sitzfläche für Haltestellen, Sportanlagen und Grünflächen. Der Wetterschutz lässt sich einzeln oder in Gruppen auf Schotterbett, Beton oder Asphalt aufstellen. Er ist wartungsarm und vandalismussicher.',
    material: 'Bewehrter Beton',
    details: 'Fundamentfreie Aufstellung'
  },
  {
    id: 'grillstelle',
    title: 'Öffentliche Grillstelle',
    imageUrl: '/images/grill/grillstelle-background.jpg',
    path: '/produkte/grillstelle-beton',
    altText: 'Runder Beton-Grillplatz im Park mit Edelstahl-Rost, Platz für 12–16 Personen.',
    usp: 'Das A+ Original: Grillplatz mit höhenverstellbarem Edelstahlrost, Bodenplatte und Sitzfläche für 12–16 Personen. Er wird auf Schotterbett, Beton oder Asphalt aufgestellt. Der Grillplatz besteht aus Betonfertigteilen und ist wartungsarm und vandalismussicher.',
    material: 'Bewehrter Beton, Edelstahlrost',
    details: 'Fundamentfreie Aufstellung, höhenverstellbare Grillfläche'
  },
  {
    id: 'umkleide',
    title: 'Umkleidekabine Schnecke',
    imageUrl: '/images/umkleide/umkleide-panorama.jpg',
    path: '/produkte/umkleidekabine-beton',
    altText: 'Schnecken-Umkleidekabine aus Beton im Freibad.',
    usp: 'Das A+ Original: Umkleidekabine aus Sichtbeton und Edelstahl ohne bewegliche Teile. Sie hat eine Bodenplatte und auf Wunsch eine Sitzfläche und Kleiderhaken aus Edelstahl. Die Kabine wird auf Schotterbett, Beton oder Asphalt aufgestellt. Sie besteht aus zwei Betonfertigteilen und ist wartungsarm und vandalismussicher.',
    material: 'Bewehrter Beton, Edelstahl',
    details: 'Fundamentfreie Aufstellung'
  },
  {
    id: 'hockey',
    title: 'Hockey-Banden',
    imageUrl: '/images/hockey/roll-hockey-bande.jpg',
    path: '/produkte/hockey-banden',
    altText: 'Outdoor Hockey-Spielfeld mit robusten Beton-Banden für Inline- und Rollhockey.',
    usp: 'Das A+ Original: fundamentfreie Einfassungen und Banden für Inline-, Roll- und Eishockey, in 1,5-m-Schritten erweiterbar, ohne bewegliche Teile. Sie werden auf Beton- oder Asphaltflächen aufgestellt und sind wartungsarm und witterungsbeständig.',
    material: 'Bewehrter Beton, recycelbarer Gummi, Edelstahl, HPL-Platten',
    details: 'Fundamentfreie Aufstellung'
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
        description: "Die 2.000 m² große Skateanlage liegt auf zwei Ebenen und besteht aus TÜV-zertifizierten Skateelementen aus Beton: Fun-Boxen, Stairs, Pyramid-Hip, Ledges, Rail-Slides sowie eine knapp zwei Meter hohe Pipe. Die Anlage ist teilweise angeböscht und in das Gelände des Sport- und Freizeitgebiets eingebunden.",
        longDescription: [
            "In Friedrichsdorf entstand eine 2.000 m² große Skateanlage auf zwei verbundenen Ebenen mit TÜV-zertifizierten Betonelementen von A+ Urban Design. Die Anlage umfasst Fun-Boxen, Stairs, Pyramid-Hip, Ledges, Rail-Slides und eine knapp zwei Meter hohe Pipe.",
            "Die Skateelemente sind teilweise angeböscht und in das Gelände des bestehenden Sport- und Freizeitgebiets eingebunden.",
            "Quellen: kommunaldirekt.de (»Skatepark Friedrichsdorf«, 2022 und 2024), freiraum-gestalten.info (»Skatepark Friedrichsdorf«). Weitere Details finden Sie in den Fachbeiträgen auf unserer Presseseite."
        ],
        altText: "Skatepark Friedrichsdorf: 2.000 m² große Skateanlage auf zwei Ebenen aus TÜV-zertifizierten Betonelementen.",
        productsUsed: [
            { name: "Modulare Skate-Elemente", path: "/produkte/skate-anlagen" },
            { name: "Skate-Pipes", path: "/produkte/skate-pipes-beton" },
        ]
    },
    {
        id: "pumptrack-berlin-reinickendorf",
        title: "Pumptrack Berlin-Reinickendorf",
        category: "Pumptrack",
        year: 2022,
        imageUrl: "/images/pumptrack/pumptrack-beton-elemente-01.jpg",
        images: [
             "/images/pumptrack/pumptrack-beton-module-03.jpg",
             "/images/pumptrack/pumptrack-beton-module-04.jpg",
             "/images/pumptrack/pumptrack-beton-elemente-02.jpg",
        ],
        description: "Der erste Pumptrack im Bezirk Reinickendorf, neben dem Humboldt-Gymnasium, realisiert mit modularen, TÜV-zertifizierten Betonelementen von A+ Urban Design. Die Trasse erstreckt sich teilweise über dem Tegel-Tunnel und musste zwischen bestehenden Bäumen geführt werden.",
        longDescription: [
            "Im Berliner Bezirk Reinickendorf entstand neben dem Humboldt-Gymnasium der erste Pumptrack des Bezirks. Die Anlage erstreckt sich teilweise über dem Tegel-Tunnel und musste durch den Baumbestand geführt werden. Das erforderte eine sorgfältige Trassenplanung auf engem Raum.",
            "Gebaut wurde mit modularen Pumptrack-Elementen aus Beton: schrägen Kurventeilen und geraden Strecken mit Hindernissen, auf denen man allein durch Gewichtsverlagerung Fahrt aufnimmt, ohne zu treten. A+ Urban Design lieferte speziell entwickelte, wartungsarme Betonelemente und unterstützte die Trassenplanung.",
            "Quellen: kommunaldirekt.de (»Pump-Track in Berlin«, 2022), freiraum-gestalten.info (»Pumptracken in Berlin«, FREIRAUM GESTALTEN 05/2022)."
        ],
        altText: "Pumptrack Berlin-Reinickendorf am Humboldt-Gymnasium, über dem Tegel-Tunnel: modulare Beton-Elemente.",
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
        description: "Der stationäre Grillplatz besteht aus Betonfertigteilen und hat einen Edelstahl-Rost, eine höhenverstellbare Grillfläche und einen Windschutzring. Er misst 420 cm im Durchmesser und steht ohne Fundament. Der robuste, vandalismussichere Grillplatz ist für Freibäder, Sportanlagen und Kleingartenanlagen gedacht.",
        longDescription: [
            "Der Grillplatz besteht aus drei Betonfertigteilen und hat zusammengesetzt 420 cm Durchmesser. Der Grillrost ist aus Edelstahl, die Stütze aus verzinktem Stahl. Der Rost ist höhenverstellbar und über eine zentrale Öse gegen Schwenken und Diebstahl gesichert.",
            "Er ist für Freibäder, Campingplätze, Sportanlagen und Kleingartenanlagen gedacht. Der Grillplatz steht ohne Fundament auf einem verdichteten Kiesbett. Pflasterarbeiten entfallen. Die 16 cm starke Bodenplatte gehört zum Lieferumfang.",
            "Quelle: kommunaldirekt.de, »Grillplatz für öffentlichen Raum« (2020)."
        ],
        altText: "Grillplatz aus A+-Betonfertigteilen, Durchmesser 420 cm, Edelstahlrost, fundamentfrei.",
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
        description: "Ein Bandensystem für Sportfelder, das ohne Fundamente und ohne Bodenbefestigungen aufgestellt wird. Es besteht aus witterungsbeständigen Materialien mit Edelstahlkomponenten und lässt sich flexibel an verschiedene Feldgrößen anpassen.",
        longDescription: [
            "A+ Urban Design hat ein Bandensystem für Sportfelder entwickelt, das ohne Fundamente und ohne Bodenbefestigungen aufgestellt wird. Anders als bei verankerten Banden bleibt der Bodenbelag unbeschädigt.",
            "Das System besteht aus witterungsbeständigen Materialien: Beton, Edelstahl, HPL-Platten und Gummi. Die am stärksten beanspruchte Einfassungsfläche ist aus Beton. In 1,5-m-Schritten lässt sich die Bande an Kleinfeld, Halbfeld oder ganzes Spielfeld anpassen.",
            "Es gibt zwei Höhen: 40 cm als Einfassung mit Gummikappe für Inline-Hockey und 110 cm als Profilbande mit Edelstahl-Handlauf für Rollhockey, Inline-Hockey und, mit optionalem Abdichtungsprofil, auch für Eishockey im Winter.",
            "Quelle: freiraum-gestalten.info, »Ohne Fundament und Bodenbefestigung« (FREIRAUM GESTALTEN 02/2015)."
        ],
        altText: "Fundamentfreies Bandensystem aus Beton, Edelstahl und HPL für Inline-, Roll- und Eishockey.",
        productsUsed: [
            { name: "Hockey-Banden", path: "/produkte/hockey-banden" },
        ]
    },
    {
        id: "schnecke-umkleidekabine",
        title: "Schnecke: Umkleidekabine für Freibäder",
        category: "Umkleidekabine",
        year: 2021,
        imageUrl: "/images/umkleide/umkleide-kabine-01.jpg",
        images: [
            "/images/umkleide/umkleidekabine-freibad-03.jpg",
            "/images/umkleide/umkleide-kabine-02.jpg",
            "/images/umkleide/umkleide-panorama.jpg",
        ],
        description: "Die Umkleide- und Duschkabine von A+ Urban Design besteht aus zwei aufeinandergesetzten Betonfertigteilen mit charakteristisch schneckenförmiger Sichtschutzwand auf Edelstahlfüßen. Sie ist wahlweise mit eingebauter Dusche oder nur mit Aussparungen für Gully und Wasserleitungen erhältlich und braucht kein Fundament.",
        longDescription: [
            "Die Schnecke ist eine wartungsarme Umkleidekabine für Freibäder. Sie besteht aus einer fugenlosen Betonbodenplatte und einem schneckenförmigen Oberteil auf Edelstahlfüßen. Beim Betreten und Verlassen muss man die Kabine nicht berühren. Das war besonders während der Pandemie wichtig.",
            "Die Sichtschutzwand beginnt 30 cm über dem Boden. So sieht man von außen, ob die Kabine belegt ist, und Missbrauch wird erschwert. Die Kabine hat keine beweglichen Teile und braucht kaum Wartung. Sie besteht aus nur zwei Teilen ohne Verschraubungen und lässt sich einfach aufstellen und später versetzen.",
            "Quellen: kommunaldirekt.de (»Umkleidekabine für Freibäder«), kommunalclick24.de (»Ein Schneckenhaus als Duschkabine«, »Duschkabine: Wir sind so frei«), flaechenmanager.com (»Berührungsfreie Umkleidekabine für Freibäder«, 2021)."
        ],
        altText: "Schnecke: Umkleide- und Duschkabine aus zwei Betonfertigteilen mit schneckenförmigem Sichtschutz.",
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
        description: "Der Skatepark liegt im ehemaligen Festungsgraben der sternförmigen Alba Carolina in Alba Iulia (Rumänien). Die Anlage erstreckt sich über mehrere Ebenen und besteht aus modularen Beton-Skateelementen, die man ab etwa 50 m Entfernung nicht mehr sieht. Die historische Festungsmauer wurde im Zuge der Bauarbeiten restauriert.",
        longDescription: [
            "Im ehemaligen Festungsgraben der sternförmigen Alba Carolina in Alba Iulia, Rumänien, entstand ein Skatepark, der aus mehr als 50 m Entfernung unsichtbar bleibt. Das ist gewollt: Die Anlage soll das Bild der Sternfestung nicht stören.",
            "Die historische Festungsmauer wurde im Zuge der Bauarbeiten restauriert. Die Skateanlage verbindet über mehrere Ebenen Ober- und Unterstadt und zeigt, wie Freizeitnutzung und Denkmalschutz zusammengehen können. A+ Urban Design lieferte die modularen Betonelemente und begleitete das Projekt im Umfeld des Denkmalschutzes.",
            "Quelle: freiraum-gestalten.info, »Skaten und Denkmalschutz vereinen«."
        ],
        altText: "Bastion Skatepark in Alba Iulia, Rumänien: modulare Beton-Skate-Elemente im historischen Festungsgraben.",
        images: [],
        productsUsed: [
            { name: "Modulare Skate-Elemente", path: "/produkte/skate-anlagen" },
            { name: "Skate-Bowls", path: "/produkte/skate-bowls-beton" },
            { name: "Skate-Pipes", path: "/produkte/skate-pipes-beton" },
        ]
    },
];
