export interface Kingdom {
  slug: string
  name: string
  tagline: string
  leader: string
  founded: string
  population: number
  territory: string
  coordinates: { x: number; z: number }
  gradient: string
  color: string
  icon: string
  description: string[]
  highlights: string[]
}

// Royaumes générés à partir des marqueurs "Villes" de la carte interactive
// (play.keykey.fr:26005). Coordonnées réelles ; description et lieux
// notables sont imaginés en attendant les vraies infos.
//
// `color` est la teinte principale du royaume : elle colore le tag territoire
// (sur la carte et la page détail) et quelques accents de la fiche détaillée.
// Modifie-la librement pour chaque royaume.
//
// Dépose une image dans public/kingdoms/<slug>.jpg pour remplacer le
// dégradé généré automatiquement par une vraie capture.
export const kingdoms: Kingdom[] = [
  {
    slug: 'antoine',
    name: 'Antoine',
    tagline: 'Cité médiévale',
    leader: 'AntGun',
    founded: 'Saison 0',
    population: 1,
    territory: 'Montagnes',
    coordinates: { x: -15494, z: 3859 },
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
    color: '#fbbf24',
    icon: '🏰',
    description: [
      "Perchée dans les Montagnes, Antoine est la cité médiévale fondée par AntGun. Ses ruelles pavées serpentent entre remparts de pierre et toits de bois typiques des bourgs d'un autre temps.",
      "Malgré une population encore restreinte, la cité impressionne par le soin apporté à son architecture : chaque bâtiment semble sorti d'un livre d'histoire, entre tours de guet et halles marchandes.",
    ],
    highlights: ["Rempart d'enceinte", 'Tour de guet', 'Halle marchande', 'Forge du bourg'],
  },
  {
    slug: 'kotai',
    name: 'Kotai',
    tagline: 'Royaume situé au point central de la carte',
    leader: 'Antares5472',
    founded: 'Saison 0',
    population: 3,
    territory: 'Plaines',
    coordinates: { x: -586, z: 2202 },
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
    color: '#38bdf8',
    icon: '👑',
    description: [
      "Le royaume de Kotai se situe au point central de la carte interactive du serveur — littéralement l'endroit où elle s'ouvre par défaut — ce qui en fait un passage incontournable pour les voyageurs.",
      "Fondé par Antares, Kotai a profité de ses plaines dégagées pour développer un royaume ordonné, pensé pour accueillir du monde et faciliter les échanges avec les royaumes voisins.",
    ],
    highlights: ['Place centrale', 'Poste d\'accueil des voyageurs', 'Carrefour des routes commerciales'],
  },
  {
    slug: 'carthage',
    name: 'Carthage',
    tagline: 'Cité du désert',
    leader: 'sosofaitsonshow',
    founded: 'Saison 0',
    population: 1,
    territory: 'Désert',
    coordinates: { x: -6339, z: -1968 },
    gradient: 'linear-gradient(135deg, #fb923c 0%, #c2410c 100%)',
    color: '#fb923c',
    icon: '🏛️',
    description: [
      "Carthage s'élève au milieu du désert, portée par la vision de sosofaitsonshow. Le choix du décor n'est pas anodin : la cité rend hommage à la Carthage antique, puissance commerçante née elle aussi sur des terres arides.",
      'Les constructions en grès et en terracotta se fondent dans le paysage environnant, entre dunes et palmiers plantés à la main pour rompre la monotonie du sable.',
    ],
    highlights: ['Temple de sable', 'Oasis artificielle', 'Marché couvert'],
  },
  {
    slug: 'belbitum',
    name: 'Belbitum',
    tagline: 'Village construit par la communauté',
    leader: 'Nerdays',
    founded: 'Saison 0',
    population: 4,
    territory: 'Plaines',
    coordinates: { x: -1507, z: -1302 },
    gradient: 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)',
    color: '#4ade80',
    icon: '🌾',
    description: [
      'Belbitum est le village le plus peuplé des royaumes recensés, fondé par Nerdays. Son ambiance chaleureuse et villageoise en fait un lieu de passage apprécié des joueurs en quête de convivialité.',
      'Les maisons aux toits de chaume s\'organisent autour d\'une place centrale où se croisent régulièrement les habitants des royaumes voisins.',
    ],
    highlights: ['Place du village', 'Puits communal', 'Étals de fermiers'],
  },
  {
    slug: 'grand-est',
    name: 'Grand Est',
    tagline: 'Territoire à l\'est de la carte',
    leader: 'ESSQUIP',
    founded: 'Saison 0',
    population: 2,
    territory: 'Océan',
    coordinates: { x: 6601, z: -1544 },
    gradient: 'linear-gradient(135deg, #34d399 0%, #047857 100%)',
    color: '#34a9d3',
    icon: '🌳',
    description: [
      "Grand Est s'étend sur une large portion de forêt à l'est de la carte. ESSQUIP y mène un projet encore en pleine expansion, où la nature environnante est intégrée directement dans les constructions.",
      'Les habitations se fondent entre les arbres, reliées par des chemins de terre battue qui laissent deviner un royaume encore en chantier, mais déjà bien vivant.',
    ],
    highlights: ['Cabanes forestières', 'Sentiers balisés', 'Zone d\'expansion Est'],
  },
  {
    slug: 'ghost-empire',
    name: 'Ghost',
    tagline: "L'Empire Ghost",
    leader: 'PharamX',
    founded: 'Saison 0',
    population: 2,
    territory: 'Forêt sombre',
    coordinates: { x: 2760, z: 1452 },
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)',
    color: '#a78bfa',
    icon: '👻',
    description: [
      "L'Empire Ghost cultive une ambiance mystérieuse, fidèle à son nom. Niché dans une forêt sombre, PharamX y a construit un royaume discret, presque hors du temps.",
      'Peu de voyageurs s\'y aventurent volontairement : les constructions basses et les teintes sombres donnent au lieu une atmosphère à part, entre curiosité et appréhension.',
    ],
    highlights: ['Bosquet sombre', 'Sentier discret', 'Repaire de PharamX'],
  },
  {
    slug: 'chuttebourg',
    name: 'ChutteBourg',
    tagline: 'Ville médiévale',
    leader: 'sosofaitsonshow',
    founded: 'Saison 0',
    population: 1,
    territory: 'Montagnes',
    coordinates: { x: -12450, z: 2102 },
    gradient: 'linear-gradient(135deg, #94a3b8 0%, #475569 100%)',
    color: '#94a3b8',
    icon: '🏘️',
    description: [
      "ChutteBourg est la seconde ville portée par sosofaitsonshow, cette fois perchée en Montagnes. Le bourg fortifié adopte une architecture de pierre et de colombages typique des cités médiévales de hauteur.",
      'Sa position en altitude lui offre une vue dégagée sur les environs, un atout défensif autant qu\'esthétique pour cette ville encore en construction.',
    ],
    highlights: ['Fortifications de montagne', 'Point de vue panoramique', 'Quartier à colombages'],
  },
  {
    slug: 'japon',
    name: 'Japon',
    tagline: 'Ville à thème japonais',
    leader: 'sosofaitsonshow',
    founded: 'Saison 0',
    population: 1,
    territory: 'Forêt de cerisiers',
    coordinates: { x: -15842, z: 4695 },
    gradient: 'linear-gradient(135deg, #f9a8d4 0%, #db2777 100%)',
    color: '#f9a8d4',
    icon: '⛩️',
    description: [
      "Troisième projet de sosofaitsonshow, Japon transpose l'esthétique japonaise au cœur d'une forêt de cerisiers. Pagodes, torii et jardins secs composent un décor résolument différent du reste de la carte.",
      'Le contraste entre les pétales de cerisier et les toits recourbés en fait l\'une des villes les plus photographiées par les visiteurs de la carte interactive.',
    ],
    highlights: ['Torii d\'entrée', 'Jardin zen', 'Pagode principale'],
  }
]

export function findKingdom(slug: string): Kingdom | undefined {
  return kingdoms.find((k) => k.slug === slug)
}
