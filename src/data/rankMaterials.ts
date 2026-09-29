// Icônes officielles Minecraft (minecraft.wiki) + couleur de lueur associées
// à chaque place du podium : diamant (1er), or (2e), fer (3e).
export interface RankMaterial {
  label: string
  icon: string
  glow: string
}

export const rankMaterials: Record<number, RankMaterial> = {
  1: {
    label: 'Diamant',
    icon: 'https://minecraft.wiki/images/thumb/Diamond_JE3_BE3.png/64px-Diamond_JE3_BE3.png',
    glow: '#5eead4',
  },
  2: {
    label: 'Or',
    icon: 'https://minecraft.wiki/images/thumb/Gold_Ingot_JE4_BE2.png/64px-Gold_Ingot_JE4_BE2.png',
    glow: '#facc15',
  },
  3: {
    label: 'Fer',
    icon: 'https://minecraft.wiki/images/thumb/Iron_Ingot_JE3_BE2.png/64px-Iron_Ingot_JE3_BE2.png',
    glow: '#cbd5e1',
  },
}
