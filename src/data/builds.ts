export interface Build {
  slug: string
  title: string
  category: string
  gradient: string
  icon: string
}

// Dépose une image dans public/builds/<slug>.jpg pour remplacer
// automatiquement le dégradé généré ci-dessous par une vraie capture.
export const builds: Build[] = [
  {
    slug: 'spawn',
    title: 'Spawn & Hôtel de ville',
    category: 'Build',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
    icon: '🏛️',
  },
  {
    slug: 'prison',
    title: "Tony's Keep",
    category: 'Semi-RP',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
    icon: '⚓',
  },
  {
    slug: 'arene',
    title: 'Arène perdu',
    category: 'Build',
    gradient: 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)',
    icon: '🏟️️',
  },
  {
    slug: 'market',
    title: 'Marché Noir',
    category: 'Semi-RP',
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #6366f1 100%)',
    icon: '🏰',
  },
  {
    slug: 'tribunal',
    title: 'Le Tribunal',
    category: 'Build',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #0284c7 100%)',
    icon: '🌆',
  },
  {
    slug: 'oasis',
    title: 'Oasis',
    category: 'Build',
    gradient: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)',
    icon: '🏘️',
  },
]
