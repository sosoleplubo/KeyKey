<script setup lang="ts">
import { onBeforeUnmount, reactive, ref, watch } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { builds, type Build } from '@/data/builds'
import { firstGradientColor, hexWithAlpha, tagStyle } from '@/utils/color'

const failedImages = reactive<Record<string, boolean>>({})

function onImgError(slug: string) {
  failedImages[slug] = true
}

// Détermine, de façon stable (basée sur le slug), quelles tuiles sont
// agrandies dans la mosaïque — un item sur trois environ.
function isLarge(slug: string): boolean {
  let hash = 0
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 1000
  return hash % 3 === 0
}

const active = ref<Build | null>(null)

function open(b: Build) {
  active.value = b
}

function close() {
  active.value = null
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(active, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
  if (value) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Toutes les constructions"
      title="Galerie des builds"
      subtitle="L'ensemble des constructions partagées par la communauté KeyKey, en un coup d'œil."
    />

    <section class="gallery-page">
      <div class="container">
        <div class="mosaic">
          <button
            v-for="(b, i) in builds"
            :key="b.slug"
            v-reveal="i % 6"
            type="button"
            class="mosaic-item"
            :class="{ large: isLarge(b.slug) }"
            :style="{ '--hover-border': hexWithAlpha(firstGradientColor(b.gradient), 0.35) }"
            @click="open(b)"
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
          </button>
        </div>

        <Teleport to="body">
          <Transition name="lightbox">
            <div v-if="active" class="lightbox" @click.self="close">
              <button class="lightbox-close" type="button" aria-label="Fermer" @click="close">✕</button>

              <div class="lightbox-frame">
                <img
                  v-if="!failedImages[active.slug]"
                  :src="`/builds/${active.slug}.jpg`"
                  :alt="active.title"
                  class="lightbox-img"
                />
                <div v-else class="lightbox-placeholder" :style="{ background: active.gradient }">
                  <span class="placeholder-icon">{{ active.icon }}</span>
                </div>
              </div>

              <div class="lightbox-caption">
                <span class="tag" :style="tagStyle(firstGradientColor(active.gradient))">{{ active.category }}</span>
                <h3>{{ active.title }}</h3>
              </div>
            </div>
          </Transition>
        </Teleport>

        <div class="gallery-cta">
          <p>Une construction dont tu es fier ? Montre-la nous.</p>
          <a
            href="https://discord.gg/YMePKDY8SV"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-ghost"
          >
            Partager sur Discord
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.gallery-page {
  padding: 56px 0 100px;
}

.mosaic {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 160px;
  gap: 10px;
}

.mosaic-item.large {
  grid-column: span 2;
  grid-row: span 2;
}

.mosaic-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  transition: border-color 0.2s ease;
  padding: 0;
  font: inherit;
  text-align: inherit;
  cursor: pointer;
  appearance: none;
}

.mosaic-item:hover {
  border-color: var(--hover-border);
}

.mosaic-item img,
.mosaic-item .placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.mosaic-item:hover img,
.mosaic-item:hover .placeholder {
  transform: scale(1.05);
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  font-size: 32px;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.35));
}

.mosaic-item.large .placeholder-icon {
  font-size: 48px;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px;
  background: linear-gradient(to top, rgba(5, 8, 6, 0.88) 0%, rgba(5, 8, 6, 0) 55%);
  pointer-events: none;
}

.tag {
  align-self: flex-start;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid transparent;
  backdrop-filter: blur(6px);
  padding: 3px 8px;
  border-radius: 999px;
  margin-bottom: 6px;
}

.overlay h3 {
  font-size: 13px;
  color: #fff;
  line-height: 1.3;
}

.mosaic-item.large .tag {
  font-size: 11px;
  padding: 4px 10px;
}

.mosaic-item.large .overlay h3 {
  font-size: 16px;
}

.gallery-cta {
  margin-top: 32px;
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

@media (max-width: 720px) {
  .mosaic {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 120px;
  }
}

@media (max-width: 460px) {
  .mosaic {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 130px;
  }

  .mosaic-item.large {
    grid-column: span 2;
    grid-row: span 1;
  }

  .gallery-page {
    padding: 40px 0 72px;
  }

  .gallery-cta {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  background: rgba(5, 8, 6, 0.9);
  backdrop-filter: blur(6px);
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  font-size: 16px;
  display: grid;
  place-items: center;
  transition: background 0.2s ease, transform 0.2s var(--ease);
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.08);
}

.lightbox-frame {
  position: relative;
  max-width: min(1400px, 94vw);
  max-height: 86vh;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-elevated);
}

.lightbox-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: var(--surface);
}

.lightbox-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.lightbox-placeholder .placeholder-icon {
  font-size: 64px;
}

.lightbox-caption {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.lightbox-caption .tag {
  margin-bottom: 8px;
}

.lightbox-caption h3 {
  font-size: 18px;
  color: var(--text-primary);
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s var(--ease);
}

.lightbox-enter-active .lightbox-frame,
.lightbox-leave-active .lightbox-frame {
  transition: transform 0.3s var(--ease), opacity 0.3s var(--ease);
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-from .lightbox-frame,
.lightbox-leave-to .lightbox-frame {
  transform: scale(0.94);
  opacity: 0;
}
</style>
