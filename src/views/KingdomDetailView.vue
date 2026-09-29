<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findKingdom } from '@/data/kingdoms'
import { hexWithAlpha, tagStyle } from '@/utils/color'
import ShareButton from '@/components/ShareButton.vue'

const route = useRoute()
const kingdom = computed(() => findKingdom(route.params.slug as string))

const bannerFailed = ref(false)
function onBannerError() {
  bannerFailed.value = true
}
</script>

<template>
  <div v-if="kingdom" class="detail">
    <div class="banner">
      <img
        v-if="!bannerFailed"
        :src="`/kingdoms/${kingdom.slug}.jpg`"
        :alt="kingdom.name"
        @error="onBannerError"
      />
      <div v-else class="placeholder" :style="{ background: kingdom.gradient }">
        <span class="placeholder-icon">{{ kingdom.icon }}</span>
      </div>
      <div class="banner-fade"></div>

      <div v-reveal class="container banner-content">
        <div class="banner-top">
          <RouterLink to="/royaumes" class="back-link">← Tous les royaumes</RouterLink>
          <ShareButton />
        </div>
        <span class="eyebrow" :style="{ color: kingdom.color }">{{ kingdom.territory }}</span>
        <h1>{{ kingdom.name }}</h1>
        <p>{{ kingdom.tagline }}</p>
      </div>
    </div>

    <section class="content">
      <div class="container content-grid">
        <div v-reveal class="description">
          <h2>Histoire</h2>
          <p v-for="(p, i) in kingdom.description" :key="i">{{ p }}</p>

          <template v-if="kingdom.highlights.length">
            <h2>Lieux notables</h2>
            <ul class="highlights">
              <li v-for="h in kingdom.highlights" :key="h">{{ h }}</li>
            </ul>
          </template>
        </div>

        <aside v-reveal="1" class="stats-card" :style="{ borderColor: hexWithAlpha(kingdom.color, 0.35) }">
          <h3>Fiche du royaume</h3>
          <dl>
            <div class="stat-row">
              <dt>Dirigeant</dt>
              <dd>👑 {{ kingdom.leader }}</dd>
            </div>
            <div class="stat-row">
              <dt>Fondation</dt>
              <dd>{{ kingdom.founded }}</dd>
            </div>
            <div class="stat-row">
              <dt>Population</dt>
              <dd>{{ kingdom.population }} membres</dd>
            </div>
            <div class="stat-row">
              <dt>Territoire</dt>
              <dd>{{ kingdom.territory }}</dd>
            </div>
            <div class="stat-row">
              <dt>Coordonnées</dt>
              <dd>X {{ kingdom.coordinates.x }} · Z {{ kingdom.coordinates.z }}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  </div>

  <div v-else class="not-found">
    <div class="container">
      <h1>Royaume introuvable</h1>
      <p>Ce royaume n'existe pas ou plus.</p>
      <RouterLink to="/royaumes" class="btn btn-ghost">← Retour aux royaumes</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.banner {
  position: relative;
  min-height: 46vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
}

.banner img,
.banner .placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  display: grid;
  place-items: center;
}

.placeholder-icon {
  font-size: 64px;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4));
}

.banner-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(9, 12, 10, 0.35) 0%, rgba(9, 12, 10, 0.55) 50%, var(--bg) 100%);
}

.banner-content {
  position: relative;
  z-index: 1;
  padding-bottom: 40px;
}

.banner-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.back-link {
  display: inline-block;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-secondary);
}

.back-link:hover {
  color: var(--text-primary);
}

.banner-content h1 {
  font-size: clamp(32px, 5vw, 52px);
  color: var(--text-primary);
  margin: 8px 0 10px;
}

.banner-content p {
  color: var(--text-secondary);
  font-size: 16px;
  max-width: 560px;
}

.content {
  padding: 56px 0 100px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  align-items: start;
}

.description h2 {
  font-size: 20px;
  color: var(--text-primary);
  margin: 32px 0 14px;
}

.description h2:first-child {
  margin-top: 0;
}

.description p {
  color: var(--text-secondary);
  font-size: 15.5px;
  line-height: 1.8;
  margin-bottom: 14px;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 0;
  list-style: none;
}

.highlights li {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  font-size: 14px;
  color: var(--text-secondary);
}

.stats-card {
  position: sticky;
  top: 96px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 24px;
}

.stats-card h3 {
  font-size: 15px;
  color: var(--text-primary);
  margin-bottom: 18px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid var(--border);
  font-size: 14px;
}

.stat-row:first-child {
  border-top: none;
}

.stat-row dt {
  color: var(--text-tertiary);
}

.stat-row dd {
  color: var(--text-primary);
  font-weight: 600;
  text-align: right;
}

.not-found {
  padding: 120px 0;
  text-align: center;
}

.not-found h1 {
  font-size: 32px;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

@media (max-width: 860px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .stats-card {
    position: static;
  }

  .highlights {
    grid-template-columns: 1fr;
  }
}
</style>
