<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findNews } from '@/data/news'
import { firstGradientColor, tagStyle } from '@/utils/color'
import ShareButton from '@/components/ShareButton.vue'

const route = useRoute()
const item = computed(() => findNews(route.params.slug as string))

const bannerFailed = ref(false)
function onBannerError() {
  bannerFailed.value = true
}
</script>

<template>
  <div v-if="item" class="detail">
    <div class="banner">
      <img
        v-if="!bannerFailed"
        :src="`/news/${item.slug}.jpg`"
        :alt="item.title"
        @error="onBannerError"
      />
      <div v-else class="placeholder" :style="{ background: item.gradient }">
        <span class="placeholder-icon">{{ item.icon }}</span>
      </div>
      <div class="banner-fade"></div>

      <div v-reveal class="container banner-content">
        <div class="banner-top">
          <RouterLink to="/actualites" class="back-link">← Toutes les actualités</RouterLink>
          <ShareButton />
        </div>
        <span class="news-tag" :style="tagStyle(firstGradientColor(item.gradient))">{{ item.tag }}</span>
        <h1>{{ item.title }}</h1>
        <span class="news-date">{{ item.date }}</span>
      </div>
    </div>

    <section class="content">
      <div class="container">
        <div v-reveal class="article">
          <template v-for="(p, i) in item.content" :key="i">
            <p>{{ p }}</p>
            <figure v-if="item.images?.[i]" class="article-figure">
              <img :src="item.images[i].url" :alt="item.images[i].caption" loading="lazy" />
              <figcaption>{{ item.images[i].caption }}</figcaption>
            </figure>
          </template>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="not-found">
    <div class="container">
      <h1>Actualité introuvable</h1>
      <p>Cette actualité n'existe pas ou plus.</p>
      <RouterLink to="/actualites" class="btn btn-ghost">← Retour aux actualités</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.banner {
  position: relative;
  min-height: 40vh;
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
  font-size: 60px;
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

.news-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid transparent;
  backdrop-filter: blur(6px);
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 14px;
}

.banner-content h1 {
  font-size: clamp(28px, 4.5vw, 44px);
  color: var(--text-primary);
  margin-bottom: 10px;
  max-width: 760px;
}

.news-date {
  color: var(--text-secondary);
  font-size: 14px;
}

.content {
  padding: 56px 0 100px;
}

.article {
  max-width: 700px;
}

.article p {
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.85;
  margin-bottom: 18px;
}

.article-figure {
  margin: 28px 0;
}

.article-figure img {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}

.article-figure figcaption {
  margin-top: 10px;
  font-size: 13px;
  color: var(--text-tertiary);
  text-align: center;
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
</style>
