<script setup lang="ts">
import { reactive } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { kingdoms } from '@/data/kingdoms'
import { hexWithAlpha, tagStyle } from '@/utils/color'

const failedImages = reactive<Record<string, boolean>>({})

function onImgError(slug: string) {
  failedImages[slug] = true
}
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Communautés de joueurs"
      title="Les royaumes de KeyKey"
      subtitle="Chaque royaume est un territoire bâti et dirigé par des joueurs. Clique sur un royaume pour en découvrir l'histoire."
    />

    <section class="kingdoms">
      <div class="container">
        <div class="kingdoms-grid">
          <RouterLink
            v-for="(k, i) in kingdoms"
            :key="k.slug"
            :to="`/royaumes/${k.slug}`"
            v-reveal="i % 6"
            class="kingdom-card"
            :style="{ '--hover-border': hexWithAlpha(k.color, 0.35) }"
          >
            <div class="kingdom-media">
              <img
                v-if="!failedImages[k.slug]"
                :src="`/kingdoms/${k.slug}.jpg`"
                :alt="k.name"
                loading="lazy"
                @error="onImgError(k.slug)"
              />
              <div v-else class="placeholder" :style="{ background: k.gradient }">
                <span class="placeholder-icon">{{ k.icon }}</span>
              </div>
              <div class="kingdom-overlay">
                <span class="kingdom-territory" :style="tagStyle(k.color)">{{ k.territory }}</span>
              </div>
            </div>
            <div class="kingdom-body">
              <h2>{{ k.name }}</h2>
              <p class="kingdom-tagline">{{ k.tagline }}</p>
              <div class="kingdom-meta">
                <span>👑 {{ k.leader }}</span>
                <span>📍 X {{ k.coordinates.x }} · Z {{ k.coordinates.z }}</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.kingdoms {
  padding: 64px 0 100px;
}

.kingdoms-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.kingdom-card {
  display: block;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.kingdom-card:hover {
  border-color: var(--hover-border);
  transform: translateY(-4px);
}

.kingdom-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.kingdom-media img,
.kingdom-media .placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.kingdom-card:hover .kingdom-media img,
.kingdom-card:hover .kingdom-media .placeholder {
  transform: scale(1.05);
}

.placeholder {
  display: grid;
  place-items: center;
}

.placeholder-icon {
  font-size: 42px;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.35));
}

.kingdom-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 14px;
  background: linear-gradient(to top, rgba(5, 8, 6, 0.75) 0%, rgba(5, 8, 6, 0) 55%);
}

.kingdom-territory {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid transparent;
  backdrop-filter: blur(6px);
  padding: 4px 10px;
  border-radius: 999px;
}

.kingdom-body {
  padding: 22px 24px 24px;
}

.kingdom-body h2 {
  font-size: 21px;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.kingdom-tagline {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.kingdom-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--text-tertiary);
}

@media (max-width: 980px) {
  .kingdoms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 620px) {
  .kingdoms-grid {
    grid-template-columns: 1fr;
  }
}
</style>
