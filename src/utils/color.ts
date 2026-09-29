// Extrait la première couleur hex d'un dégradé CSS (ex: 'linear-gradient(135deg, #38bdf8 0%, ...)').
export function firstGradientColor(gradient: string): string {
  const match = gradient.match(/#[0-9a-fA-F]{3,8}/)
  return match ? match[0] : '#38bdf8'
}

// Ajoute une transparence à une couleur hex (#rrggbb) sous forme #rrggbbaa.
export function hexWithAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, '0')
  return `${hex}${a}`
}

// Style prêt à l'emploi pour un tag transparent teinté par une couleur.
export function tagStyle(color: string) {
  return {
    color,
    background: hexWithAlpha(color, 0.18),
    borderColor: hexWithAlpha(color, 0.4),
  }
}
