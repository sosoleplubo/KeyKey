<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'

interface Era {
  period: string
  title: string
  text: string
}

const eras: Era[] = [
  {
    period: 'Ère I',
    title: 'La Fondation',
    text: "Les premiers arrivants posent le pied sur des terres vierges. Autour du point de spawn se dresse bientôt Valorhold, première citadelle et graine de ce qui deviendra le monde de KeyKey. Les ressources sont abondantes, les territoires encore à prendre.",
  },
  {
    period: 'Ère II',
    title: "L'Expansion des Royaumes",
    text: "À mesure que la communauté grandit, de nouveaux groupes de joueurs s'aventurent au-delà de Valorhold. Sylvenoire s'installe dans les forêts du Nord, Portuas prend racine sur la côte Est, et Cindralta s'enfonce dans les terres volcaniques du Sud. Des routes commerciales se tissent, des alliances se nouent.",
  },
  {
    period: 'Ère III',
    title: "Aujourd'hui",
    text: 'KeyKey vit désormais au rythme de ses royaumes. Chaque joueur peut rejoindre une communauté existante, en fonder une nouvelle, ou simplement bâtir en indépendant. Le monde continue de s\'écrire, une construction à la fois.',
  },
]
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Le monde de KeyKey"
      title="Lore & histoire du serveur"
      subtitle="Une trame légère pour donner du sens au monde commun, sans jamais contraindre le jeu."
    />

    <section class="lore">
      <div class="container">
        <p class="scroll-hint">Fais glisser pour parcourir la frise →</p>

        <div class="timeline">
          <article v-for="(era, i) in eras" :key="era.title" v-reveal="i" class="era">
            <div class="era-marker">
              <span class="era-line"></span>
              <span class="era-dot"></span>
            </div>
            <div class="era-content">
              <span class="era-period">{{ era.period }}</span>
              <h2>{{ era.title }}</h2>
              <p>{{ era.text }}</p>
            </div>
          </article>
        </div>

        <div class="lore-note">
          <p>
            Cette trame évolue avec la communauté : chaque royaume, chaque
            événement RP vient enrichir l'histoire commune de KeyKey.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lore {
  padding: 64px 0 100px;
}

.scroll-hint {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-tertiary);
  margin-bottom: 20px;
}

.timeline {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  padding: 4px 4px 24px;
  margin-bottom: 8px;
  scrollbar-color: var(--border-strong) transparent;
  scrollbar-width: thin;
}

.timeline::-webkit-scrollbar {
  height: 6px;
}

.timeline::-webkit-scrollbar-thumb {
  background: var(--border-strong);
  border-radius: 999px;
}

.era {
  flex: 0 0 300px;
  scroll-snap-align: start;
  padding-right: 36px;
}

.era-marker {
  position: relative;
  height: 14px;
  margin-bottom: 22px;
}

.era-line {
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--border-strong);
}

.era:last-child .era-line {
  display: none;
}

.era-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  z-index: 1;
}

.era-period {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent-strong);
}

.era-content h2 {
  font-size: 22px;
  color: var(--text-primary);
  margin: 6px 0 12px;
}

.era-content p {
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.75;
}

.lore-note {
  padding: 20px 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  max-width: 720px;
}

.lore-note p {
  color: var(--text-secondary);
  font-size: 14.5px;
  font-style: italic;
}

@media (max-width: 560px) {
  .era {
    flex-basis: 260px;
    padding-right: 24px;
  }
}
</style>
