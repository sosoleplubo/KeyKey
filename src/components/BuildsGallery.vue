<script setup lang="ts">
import { reactive } from 'vue'
import { builds } from '@/data/builds'
import { firstGradientColor, hexWithAlpha, tagStyle } from '@/utils/color'

const DISCORD_URL = 'https://discord.gg/YMePKDY8SV'

const failedImages = reactive<Record<string, boolean>>({})

function onImgError(slug: string) {
  failedImages[slug] = true
}
</script>

<template>
  <section id="builds" class="gallery">
    <div class="container">
      <div v-reveal class="gallery-head">
        <div>
          <span class="eyebrow">Créations des joueurs</span>
          <h2 class="section-heading">Ce que notre communauté construit</h2>
          <p class="section-sub">
            De la ferme redstone au château RP, chaque quartier de KeyKey est
            façonné par ses joueurs. Voici un aperçu du monde.
          </p>
        </div>
        <RouterLink to="/galerie" class="btn btn-ghost">Voir toute la galerie</RouterLink>
      </div>

      <div class="gallery-grid">
        <article
          v-for="(b, i) in builds"
          :key="b.slug"
          v-reveal="i"
          class="gallery-card"
          :style="{ '--hover-border': hexWithAlpha(firstGradientColor(b.gradient), 0.35) }"
        >
          <img
            v-if="!failedImages[b.slug]"
            :src="`/builds/${b.slug}.jpg`"
            :alt="b.title"
            loading="lazy"
            @error="onImgError(b.slug)"
          />
          <div v-else class="placeholder" :style="{ background: b.gradient }">
            <span class="placeholder-icon">{{ b.icon }}</span>
          </div>

          <div class="overlay">
            <span class="tag" :style="tagStyle(firstGradientColor(b.gradient))">{{ b.category }}</span>
            <h3>{{ b.title }}</h3>
          </div>
        </article>
      </div>

      <div class="gallery-cta">
        <p>Une construction dont tu es fier ? Montre-la nous.</p>
        <a :href="DISCORD_URL" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
          Partager sur Discord
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  padding: 100px 0;
  border-top: 1px solid var(--border);
}

.gallery-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.gallery-grid {
  margin-top: 44px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.gallery-card {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--surface);
  transition: border-color 0.2s ease;
}

.gallery-card:hover {
  border-color: var(--hover-border);
}

.gallery-card img,
.gallery-card .placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.gallery-card:hover img,
.gallery-card:hover .placeholder {
  transform: scale(1.05);
}

.placeholder {
  display: grid;
  place-items: center;
}

.placeholder-icon {
  font-size: 44px;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.35));
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 18px;
  background: linear-gradient(to top, rgba(5, 8, 6, 0.88) 0%, rgba(5, 8, 6, 0) 55%);
}

.tag {
  align-self: flex-start;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid transparent;
  backdrop-filter: blur(6px);
  padding: 3px 9px;
  border-radius: 999px;
  margin-bottom: 8px;
}

.overlay h3 {
  font-size: 17px;
  color: #fff;
}

.gallery-cta {
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.gallery-cta p {
  color: var(--text-secondary);
  font-size: 15px;
}

@media (max-width: 980px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .gallery {
    padding: 72px 0;
  }

  .gallery-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .gallery-cta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
