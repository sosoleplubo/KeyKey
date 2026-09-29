<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import NewsCard from '@/components/NewsCard.vue'
import { news } from '@/data/news'
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Le journal de KeyKey · données simulées"
      title="Actualités"
      subtitle="Annonces, événements et nouveautés du serveur. Clique sur une actualité pour en lire le détail."
    />

    <section class="news-section">
      <div class="container">
        <div class="news-grid">
          <NewsCard v-for="(item, i) in news" :key="item.slug" :item="item" :index="i % 3" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.news-section {
  padding: 64px 0 100px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 980px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .news-section {
    padding: 44px 0 72px;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
