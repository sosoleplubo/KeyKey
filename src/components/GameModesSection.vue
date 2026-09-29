<script setup lang="ts">
interface Mode {
  title: string
  tag: string
  description: string
  icon: string
}

const modes: Mode[] = [
  {
    title: 'SMP Survie',
    tag: 'Monde persistant',
    description:
      'Un seul monde partagé et durable où tous les joueurs coopèrent, échangent et progressent ensemble.',
    icon: '⛏️',
  },
  {
    title: 'Orienté Build',
    tag: 'Construction avant tout',
    description:
      'Le serveur est pensé pour la construction : place aux projets ambitieux, aux quartiers travaillés et aux beaux builds.',
    icon: '🏗️',
  },
  {
    title: 'Semi-RP',
    tag: 'Roleplay léger',
    description:
      "Une pointe de roleplay pour donner vie au monde, sans contrainte ni pression : incarne un personnage si tu le souhaites.",
    icon: '🎭',
  },
]
</script>

<template>
  <section id="modes" class="modes">
    <div class="container">
      <div v-reveal>
        <span class="eyebrow">Ce que tu peux vivre ici</span>
        <h2 class="section-heading">Un serveur, un seul monde, un esprit build</h2>
        <p class="section-sub">
          KeyKey est un serveur SMP Survie centré sur la construction, avec une
          touche de roleplay léger pour donner vie au monde commun.
        </p>
      </div>

      <div class="modes-grid">
        <article v-for="(mode, i) in modes" :key="mode.title" v-reveal="i" class="mode-card">
          <span class="mode-icon">{{ mode.icon }}</span>
          <h3 class="mode-title">{{ mode.title }}</h3>
          <span class="mode-tag">{{ mode.tag }}</span>
          <p class="mode-desc">{{ mode.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.modes {
  padding: 100px 0;
  border-top: 1px solid var(--border);
}

.modes-grid {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.mode-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 28px 24px;
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
}

.mode-card:hover {
  border-color: rgba(56, 189, 248, 0.35);
  background: var(--surface-hover);
  transform: translateY(-4px);
}

.mode-icon {
  font-size: 28px;
  display: inline-block;
  margin-bottom: 18px;
}

.mode-title {
  font-size: 20px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.mode-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent-strong);
  margin-bottom: 14px;
}

.mode-desc {
  color: var(--text-secondary);
  font-size: 14.5px;
  line-height: 1.65;
}

@media (max-width: 860px) {
  .modes-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .modes {
    padding: 72px 0;
  }

  .modes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
