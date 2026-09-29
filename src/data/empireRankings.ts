export interface CategoryScores {
  commerce: number
  richesse: number
  architecture: number
  militaire: number
  diplomatie: number
  bonus: number
}

export interface EmpireRanking {
  kingdomSlug: string
  season: string
  scores: CategoryScores
}

export interface CategoryMeta {
  key: keyof Omit<CategoryScores, 'bonus'>
  label: string
  shortLabel: string
  superlative: string
  icon: string
}

// Barème officiel du classement des Empires : 5 catégories /20 + bonus /5 (sur 100 +5).
export const categories: CategoryMeta[] = [
  { key: 'commerce', label: 'Commerce & Économie', shortLabel: 'Commerce', superlative: 'La plus commerçante', icon: '💰' },
  { key: 'richesse', label: 'Richesse & Ressources', shortLabel: 'Richesse', superlative: 'La plus riche', icon: '🪙' },
  { key: 'architecture', label: 'Architecture & Build', shortLabel: 'Architecture', superlative: 'La plus belle', icon: '🏗️' },
  { key: 'militaire', label: 'Puissance Militaire', shortLabel: 'Militaire', superlative: 'La plus puissante', icon: '⚔️' },
  { key: 'diplomatie', label: 'Diplomatie & Influence', shortLabel: 'Diplomatie', superlative: 'La plus influente', icon: '🤝' },
]

export const seasons = ['Saison 0']

// Grille vierge en attendant les vrais votes du jury : un empire par royaume
// (src/data/kingdoms.ts), toutes les catégories à 0/20 (+0 bonus).
// ⚠️ kingdomSlug doit correspondre à un slug existant dans kingdoms.ts —
// pense à ajouter/retirer une entrée ici si tu modifies la liste des royaumes.
export const empireRankings: EmpireRanking[] = [
  {
    kingdomSlug: 'antoine',
    season: 'Saison 0',
    scores: { commerce: 0, richesse: 0, architecture: 0, militaire: 0, diplomatie: 0, bonus: 0 },
  },
  {
    kingdomSlug: 'kotai',
    season: 'Saison 0',
    scores: { commerce: 0, richesse: 0, architecture: 0, militaire: 0, diplomatie: 0, bonus: 0 },
  },
  {
    kingdomSlug: 'carthage',
    season: 'Saison 0',
    scores: { commerce: 0, richesse: 0, architecture: 0, militaire: 0, diplomatie: 0, bonus: 0 },
  },
  {
    kingdomSlug: 'belbitum',
    season: 'Saison 0',
    scores: { commerce: 0, richesse: 0, architecture: 0, militaire: 0, diplomatie: 0, bonus: 0 },
  },
  {
    kingdomSlug: 'grand-est',
    season: 'Saison 0',
    scores: { commerce: 0, richesse: 0, architecture: 0, militaire: 0, diplomatie: 0, bonus: 0 },
  },
  {
    kingdomSlug: 'ghost-empire',
    season: 'Saison 0',
    scores: { commerce: 0, richesse: 0, architecture: 0, militaire: 0, diplomatie: 0, bonus: 0 },
  },
  {
    kingdomSlug: 'chuttebourg',
    season: 'Saison 0',
    scores: { commerce: 0, richesse: 0, architecture: 0, militaire: 0, diplomatie: 0, bonus: 0 },
  },
  {
    kingdomSlug: 'japon',
    season: 'Saison 0' +
        '',
    scores: { commerce: 0, richesse: 0, architecture: 0, militaire: 0, diplomatie: 0, bonus: 0 },
  },
]

export function totalScore(scores: CategoryScores): number {
  return (
    scores.commerce +
    scores.richesse +
    scores.architecture +
    scores.militaire +
    scores.diplomatie +
    scores.bonus
  )
}
