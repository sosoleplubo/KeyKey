<script setup lang="ts">
import { ref } from 'vue'
import type { NewsItem } from '@/data/news'
import { firstGradientColor, hexWithAlpha, tagStyle } from '@/utils/color'

withDefaults(defineProps<{ item: NewsItem; index?: number }>(), { index: 0 })

const failed = ref(false)
function onError() {
  failed.value = true
}
</script>

<template>
  <RouterLink
    :to="`/actualites/${item.slug}`"
    v-reveal="index"
    class="news-card"
    :style="{
      '--card-color': firstGradientColor(item.gradient),
      '--hover-border': hexWithAlpha(firstGradientColor(item.gradient), 0.35),
    }"
  >
    <div class="news-media">
      <img
        v-if="!failed"
        :src="`/news/${item.slug}.jpg`"
        :alt="item.title"
        loading="lazy"
        @error="onError"
      />
      <div v-else class="placeholder" :style="{ background: item.gradient }">
        <span class="placeholder-icon">{{ item.icon }}</span>
      </div>
      <div class="news-overlay">
        <span class="news-tag" :style="tagStyle(firstGradientColor(item.gradient))">{{ item.tag }}</span>
      </div>
    </div>
    <div class="news-body">
      <span class="news-date">{{ item.date }}</span>
      <h3>{{ item.title }}</h3>
      <p>{{ item.excerpt }}</p>
      <span class="news-link">Lire l'actualité →</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.news-card {
  display: block;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.news-card:hover {
  border-color: var(--hover-border);
  transform: translateY(-4px);
}

.news-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.news-media img,
.news-media .placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.news-card:hover .news-media img,
.news-card:hover .news-media .placeholder {
  transform: scale(1.05);
}

.placeholder {
  display: grid;
  place-items: center;
}

.placeholder-icon {
  font-size: 38px;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.35));
}

.news-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-start;
  padding: 14px;
}

.news-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid transparent;
  backdrop-filter: blur(6px);
  padding: 4px 10px;
  border-radius: 999px;
}

.news-body {
  padding: 20px 22px 22px;
}

.news-date {
  font-size: 12px;
  color: var(--text-tertiary);
}

.news-body h3 {
  font-size: 17px;
  color: var(--text-primary);
  margin: 6px 0 8px;
  line-height: 1.35;
}

.news-body p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 14px;
}

.news-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--card-color);
}

.news-card:hover .news-link {
  text-decoration: underline;
}
</style>
