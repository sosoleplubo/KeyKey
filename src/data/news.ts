export interface NewsItem {
  slug: string
  title: string
  excerpt: string
  content: string[]
  images?: { url: string; caption: string }[]
  date: string
  tag: string
  icon: string
  gradient: string
}

// Actualités simulées en attendant les vraies annonces du staff.
// Dépose une image dans public/news/<slug>.jpg pour remplacer le
// dégradé généré automatiquement par une vraie photo/capture.
export const news: NewsItem[] = [
  {
    slug: 'maj-26-3',
    title: 'La mise à jour 26.3 « Wilderness Bound » arrive sur le serveur aujourd\'hui',
    excerpt:
        "Dappled forest, poplars, camps abandonnés et coussins font leur entrée sur KeyKey avec l'update Wilderness Bound.",
    content: [
      "La mise à jour Minecraft 26.3, baptisée « Wilderness Bound », est désormais active sur le serveur KeyKey. Sortie officiellement le 15 septembre 2026, elle met à l'honneur la vie en pleine nature : camping, feux de bois et constructions en harmonie avec le paysage.",
      "Le cœur de l'update est un nouveau biome de l'Overworld, la dappled forest, peuplée de poplars (dont le bois devient gris une fois écorcé), de buissons rouges et de champignons en étagère. On y trouve aussi des camps abandonnés, une nouvelle structure regorgeant de cartes d'explorateur à récupérer.",
      "Côté construction, Mojang ajoute enfin la possibilité de s'asseoir grâce aux coussins, ainsi que des marches et dalles pour toutes les couleurs de laine et de béton. Les lits de paille permettent de passer la nuit sans redéfinir son point d'apparition — pratique pour les campements de fortune entre deux royaumes.",
      "Le serveur tourne déjà sur cette version : les nouveaux blocs, biomes et structures sont disponibles dès maintenant en exploration. Bon camping !",
    ],
    images: [
      {
        url: 'https://minecraft.wiki/images/thumb/Dappled_Forest_2.jpg/800px-Dappled_Forest_2.jpg',
        caption: 'Le nouveau biome dappled forest, avec ses poplars et ses buissons rouges.',
      },
      {
        url: 'https://minecraft.wiki/images/thumb/Abandoned_Camp.jpg/800px-Abandoned_Camp.jpg',
        caption: "Un camp abandonné, avec son lot de cartes d'explorateur et de butin.",
      },
      {
        url: 'https://minecraft.wiki/images/thumb/Dappled_Forest_Campaign_Sitting.jpg/800px-Dappled_Forest_Campaign_Sitting.jpg',
        caption: "Les coussins permettent enfin de s'asseoir autour du feu.",
      },
    ],
    date: '28 septembre 2026',
    tag: 'Mise à jour',
    icon: '🏕️',
    gradient: 'linear-gradient(135deg, #a3e635 0%, #4d7c0f 100%)',
  },
  {
    slug: 'maj-26-2',
    title: 'La mise à jour 26.2 « Chaos Cubed » débarque aussi sur le serveur',
    excerpt:
      "Sulfur caves, cubes de soufre et cinabre font leur entrée sur KeyKey avec l'update Chaos Cubed, installée juste avant la 26.3.",
    content: [
      "Avant de passer à la 26.3, le serveur KeyKey a d'abord rattrapé son retard avec la mise à jour 26.2, baptisée « Chaos Cubed ». Sortie officiellement le 16 juin 2026, elle introduit les sulfur caves, un nouveau biome souterrain aussi spectaculaire que dangereux.",
      "Ces grottes sont parsemées de sources chaudes qui dégagent un gaz toxique et de geysers qui explosent périodiquement, obligeant les explorateurs à rester sur leurs gardes. On y croise aussi les cubes de soufre, une nouvelle menace gélatineuse qui prend l'apparence des blocs environnants pour mieux surprendre ses victimes.",
      "Côté construction, l'update ajoute le cinabre, une nouvelle pierre rouge déclinée en briques, dalles, marches, murs et versions polies ou ciselées — de quoi varier les palettes de couleurs pour les prochains projets du Tournoi de Build.",
      "Les deux mises à jour tournent maintenant en même temps sur KeyKey : libre à vous d'aller chercher du cinabre dans les sulfur caves avant de découvrir les nouveautés de la 26.3. Prudence tout de même près des geysers.",
    ],
    images: [
      {
        url: 'https://minecraft.wiki/images/thumb/Camp_By_The_Geyser.jpg/800px-Camp_By_The_Geyser.jpg',
        caption: 'Un campement près d\'un geyser, au cœur des sulfur caves.',
      },
      {
        url: 'https://minecraft.wiki/images/thumb/Sulfur_Cube_1.jpg/800px-Sulfur_Cube_1.jpg',
        caption: 'Un cube de soufre, la nouvelle menace des grottes.',
      },
      {
        url: 'https://minecraft.wiki/images/thumb/Sulfur_Cube_2.jpg/800px-Sulfur_Cube_2.jpg',
        caption: 'Le soufre et le cinabre colorent désormais les sous-sols de KeyKey.',
      },
    ],
    date: '21 septembre 2026',
    tag: 'Mise à jour',
    icon: '🌋',
    gradient: 'linear-gradient(135deg, #fde047 0%, #b91c1c 100%)',
  },
  {
    slug: 'inauguration-tribunal',
    title: 'Inauguration du Tribunal : la justice s\'installe à KeyKey',
    excerpt:
      "nhya_san prend ses fonctions à la tête du nouveau Tribunal, chargé de juger les personnes ayant commis des crimes au sein de la Communauté des Nations Unies.",
    content: [
      "Après plusieurs semaines de construction, le Tribunal de KeyKey ouvre officiellement ses portes. L'édifice, visible dans la galerie des builds de la communauté, accueillera désormais les audiences rendues nécessaires par les différends entre royaumes et les infractions commises au sein de la Communauté des Nations Unies.",
      "C'est nhya_san qui présidera les audiences. Chargée de juger les personnes ayant commis des crimes au sein de la communauté, elle aura pour mission de trancher les affaires dans le respect de l'esprit Semi-RP du serveur : aucune sanction ne sera appliquée sans procès, et chaque partie pourra s'exprimer avant le verdict.",
      "Les plaintes pourront être déposées sur le Discord, dans un salon dédié qui sera annoncé prochainement. Le Tribunal s'inscrit dans la continuité des efforts de diplomatie inter-royaumes, avec l'ambition de donner un cadre plus formel à la justice commune.",
    ],
    date: '28 septembre 2026',
    tag: 'Justice',
    icon: '⚖️',
    gradient: 'linear-gradient(135deg, #94a3b8 0%, #334155 100%)',
  },
]

export function findNews(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug)
}
