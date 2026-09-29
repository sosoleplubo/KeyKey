<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'

interface RuleCategory {
  title: string
  icon: string
  rules: string[]
}

const categories: RuleCategory[] = [
  {
    title: 'Général',
    icon: '📜',
    rules: [
      'Respecte les autres joueurs, le staff et les décisions prises.',
      'Aucun propos raciste, sexiste, homophobe ou discriminatoire.',
      'Le grief, le vol et les pièges sont interdits sans accord RP préalable.',
      'Un seul compte par joueur : le multi-compte est interdit.',
    ],
  },
  {
    title: 'Construction',
    icon: '🏗️',
    rules: [
      'Pas de constructions offensantes ou hors thème du serveur.',
      'Respecte une distance raisonnable entre ton territoire et celui des autres.',
      "Le x-ray, la duplication et l'exploitation de bugs sont interdits.",
      'Les fermes AFK doivent rester raisonnables pour ne pas impacter les performances.',
    ],
  },
  {
    title: 'Semi-RP',
    icon: '🎭',
    rules: [
      'Le roleplay reste léger : aucune obligation, mais garde une cohérence avec le monde.',
      'Pas de PK (Player Kill) sans accord RP préalable entre les joueurs concernés.',
      'Les conflits RP se règlent avec respect, y compris hors roleplay.',
    ],
  },
  {
    title: 'Discord & communication',
    icon: '💬',
    rules: [
      'Reste courtois sur l\'ensemble des salons du Discord.',
      'Pas de spam, de publicité ou de flood.',
      'Utilise les salons appropriés selon le sujet abordé.',
    ],
  },
]
</script>

<template>
  <div>
    <PageHeader
      eyebrow="À lire avant de jouer"
      title="Règlement du serveur"
      subtitle="Quelques règles simples pour que tout le monde profite de KeyKey dans de bonnes conditions."
    />

    <section class="rules">
      <div class="container">
        <div class="rules-grid">
          <article v-for="(cat, i) in categories" :key="cat.title" v-reveal="i" class="rule-card">
            <div class="rule-card-head">
              <span class="rule-icon">{{ cat.icon }}</span>
              <h2>{{ cat.title }}</h2>
            </div>
            <ol class="rule-list">
              <li v-for="(rule, i) in cat.rules" :key="i">{{ rule }}</li>
            </ol>
          </article>
        </div>

        <div v-reveal class="sanction-note">
          <span class="rule-icon">⚠️</span>
          <p>
            Le non-respect de ces règles peut entraîner un avertissement, un mute,
            un kick ou un ban, selon la gravité et la récidive. Le staff se réserve
            le droit d'juger au cas par cas.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.rules {
  padding: 64px 0 100px;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.rule-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 28px;
}

.rule-card-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.rule-icon {
  font-size: 22px;
}

.rule-card-head h2 {
  font-size: 19px;
  color: var(--text-primary);
}

.rule-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 20px;
  color: var(--text-secondary);
  font-size: 14.5px;
  line-height: 1.6;
}

.rule-list li::marker {
  color: var(--accent-strong);
  font-weight: 700;
}

.sanction-note {
  margin-top: 24px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: rgba(56, 189, 248, 0.06);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: var(--radius-md);
  padding: 20px 24px;
}

.sanction-note p {
  color: var(--text-secondary);
  font-size: 14.5px;
  line-height: 1.65;
}

@media (max-width: 780px) {
  .rules-grid {
    grid-template-columns: 1fr;
  }
}
</style>
