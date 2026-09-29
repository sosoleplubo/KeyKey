<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import PlayerSkin from '@/components/PlayerSkin.vue'
import ScoreMeter from '@/components/ScoreMeter.vue'
import { findKingdom } from '@/data/kingdoms'
import { categories, empireRankings, seasons, totalScore } from '@/data/empireRankings'
import { rankMaterials } from '@/data/rankMaterials'
import { hexWithAlpha } from '@/utils/color'
import { burstPageWide } from '@/composables/useConfetti'

const selectedSeason = ref(seasons[seasons.length - 1])

const standings = computed(() => {
  return empireRankings
    .filter((r) => r.season === selectedSeason.value)
    .flatMap((r) => {
      const kingdom = findKingdom(r.kingdomSlug)
      return kingdom ? [{ kingdom, scores: r.scores, total: totalScore(r.scores) }] : []
    })
    .sort((a, b) => b.total - a.total)
    .map((entry, i) => ({ ...entry, rank: i + 1 }))
})

const podium = computed(() => {
  const [first, second, third] = standings.value
  return [second, first, third].filter(Boolean) as typeof standings.value
})

const categoryLeaders = computed(() => {
  if (!standings.value.length) return []
  return categories.map((cat) => ({
    cat,
    leader: [...standings.value].sort((a, b) => b.scores[cat.key] - a.scores[cat.key])[0]!,
  }))
})

onMounted(() => {
  if (!standings.value.length) return
  setTimeout(() => burstPageWide(), 500)
})
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Classement saisonnier · données simulées"
      title="Classement des Empires"
      subtitle="5 catégories notées sur 20 points, + un bonus subjectif du jury jusqu'à 5 points. Score total sur 100 (+5)."
    />

    <section class="board">
      <div class="container">
        <div class="season-picker">
          <button
            v-for="s in seasons"
            :key="s"
            class="season-btn"
            :class="{ active: s === selectedSeason }"
            @click="selectedSeason = s"
          >
            {{ s }}
          </button>
        </div>

        <div v-if="podium.length" class="podium">
          <RouterLink
            v-for="(entry, i) in podium"
            :key="entry.kingdom.slug"
            :to="`/royaumes/${entry.kingdom.slug}`"
            v-reveal="i"
            class="podium-slot"
            :class="`rank-${entry.rank}`"
          >
            <span v-if="entry.rank === 1" class="crown">👑</span>
            <div
              class="skin-frame"
              :style="{
                background: rankMaterials[entry.rank]
                  ? `radial-gradient(circle at 50% 15%, ${hexWithAlpha(rankMaterials[entry.rank]!.glow, 0.5)}, transparent 65%), ${entry.kingdom.gradient}`
                  : entry.kingdom.gradient,
              }"
            >
              <PlayerSkin :username="entry.kingdom.leader" />
            </div>
            <span class="podium-name">{{ entry.kingdom.name }}</span>
            <span class="podium-leader">👤 {{ entry.kingdom.leader }}</span>
            <div class="podium-score">
              <span class="score-total">{{ entry.total }}</span>
              <span class="score-sub">/100 · +{{ entry.scores.bonus }} bonus</span>
            </div>
            <div class="pedestal">
              <img
                v-if="rankMaterials[entry.rank]"
                :src="rankMaterials[entry.rank]!.icon"
                :alt="rankMaterials[entry.rank]!.label"
                class="pedestal-icon"
              />
              <span v-else class="pedestal-rank">#{{ entry.rank }}</span>
            </div>
          </RouterLink>
        </div>

        <div v-if="standings.length" class="category-leaders">
          <h2>Classements par catégorie</h2>
          <div class="category-grid">
            <div
              v-for="({ cat, leader }, i) in categoryLeaders"
              :key="cat.key"
              v-reveal="i"
              class="category-card"
            >
              <span class="category-icon">{{ cat.icon }}</span>
              <div>
                <p class="category-title">{{ cat.superlative }}</p>
                <RouterLink :to="`/royaumes/${leader.kingdom.slug}`" class="category-kingdom">
                  {{ leader.kingdom.name }}
                </RouterLink>
                <span class="category-score">{{ leader.scores[cat.key] }}/20</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="standings.length" v-reveal class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Rang</th>
                <th>Empire</th>
                <th v-for="cat in categories" :key="cat.key">{{ cat.shortLabel }}</th>
                <th>Bonus</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in standings" :key="entry.kingdom.slug" :class="{ top: entry.rank <= 3 }">
                <td class="rank-cell">#{{ entry.rank }}</td>
                <td class="empire-cell">
                  <RouterLink :to="`/royaumes/${entry.kingdom.slug}`">
                    <span>{{ entry.kingdom.icon }}</span>
                    {{ entry.kingdom.name }}
                  </RouterLink>
                </td>
                <td v-for="cat in categories" :key="cat.key">
                  <ScoreMeter :value="entry.scores[cat.key]" :max="20" />
                </td>
                <td class="bonus-cell">+{{ entry.scores.bonus }}</td>
                <td class="total-cell">{{ entry.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="empty-state">
          <p>Aucune donnée pour cette saison pour le moment.</p>
        </div>

        <p class="bonus-note">
          ✨ Le bonus subjectif (jusqu'à +5 pts) récompense les coups de cœur du jury
          et est déjà inclus dans le total affiché.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.board {
  padding: 56px 0 100px;
}

.season-picker {
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
}

.season-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
  padding: 9px 18px;
  border-radius: 999px;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.season-btn:hover {
  color: var(--text-primary);
}

.season-btn.active {
  background: rgba(56, 189, 248, 0.1);
  border-color: var(--accent);
  color: var(--accent-strong);
}

/* Podium */
.podium {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 20px;
  margin-bottom: 56px;
  flex-wrap: wrap;
}

.podium-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  position: relative;
  border-radius: var(--radius-md);
  padding: 8px;
  transition: transform 0.25s var(--ease), background 0.25s ease;
}

.podium-slot:hover {
  background: rgba(255, 255, 255, 0.03);
  transform: translateY(-3px);
}

.podium-slot.rank-1 {
  order: 2;
}

.podium-slot.rank-2 {
  order: 1;
}

.podium-slot.rank-3 {
  order: 3;
}

.crown {
  font-size: 26px;
  margin-bottom: 6px;
}

.skin-frame {
  width: 100%;
  height: 170px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--border-strong);
}

.rank-1 .skin-frame {
  height: 210px;
}

.rank-3 .skin-frame {
  height: 150px;
}

.podium-name {
  margin-top: 14px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 17px;
  color: var(--text-primary);
}

.podium-slot:hover .podium-name {
  color: var(--accent-strong);
}

.podium-leader {
  font-size: 12.5px;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.podium-score {
  margin-top: 10px;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.score-total {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--accent-strong);
}

.score-sub {
  font-size: 12px;
  color: var(--text-tertiary);
}

.pedestal {
  margin-top: 16px;
  width: 100%;
  height: 64px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-1 .pedestal {
  height: 92px;
  border-color: rgba(56, 189, 248, 0.35);
}

.rank-3 .pedestal {
  height: 48px;
}

.pedestal-rank {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--text-secondary);
}

.pedestal-icon {
  width: 30px;
  height: 30px;
  image-rendering: pixelated;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5));
}

.rank-1 .pedestal-icon {
  width: 38px;
  height: 38px;
}

/* Category leaders */
.category-leaders h2 {
  font-size: 20px;
  color: var(--text-primary);
  margin-bottom: 18px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  margin-bottom: 48px;
}

.category-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 16px;
}

.category-icon {
  font-size: 22px;
}

.category-title {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: 3px;
}

.category-kingdom {
  display: block;
  font-weight: 600;
  font-size: 14.5px;
  color: var(--text-primary);
}

.category-kingdom:hover {
  color: var(--accent-strong);
}

.category-score {
  font-size: 12px;
  color: var(--accent-strong);
}

/* Table */
.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 820px;
}

thead {
  background: var(--surface);
}

th {
  text-align: left;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-tertiary);
  font-weight: 600;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: var(--surface-hover);
}

tr.top {
  background: rgba(56, 189, 248, 0.03);
}

.rank-cell {
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-display);
}

.empire-cell a {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.empire-cell a:hover {
  color: var(--accent-strong);
}

.bonus-cell {
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}

.total-cell {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  color: var(--accent-strong);
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: var(--text-secondary);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-md);
}

.bonus-note {
  margin-top: 24px;
  color: var(--text-tertiary);
  font-size: 13px;
}

@media (max-width: 980px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .board {
    padding: 40px 0 72px;
  }

  .category-grid {
    grid-template-columns: 1fr;
  }
}
</style>
