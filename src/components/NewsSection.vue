<script setup lang="ts">
import NewsCard from './NewsCard.vue'
import { news } from '@/data/news'

const latest = news.slice(0, 3)
</script>

<template>
  <section id="actualites" class="news">
    <div class="container">
      <div v-reveal class="news-head">
        <div>
          <span class="eyebrow">Quoi de neuf</span>
          <h2 class="section-heading">Dernières actualités</h2>
          <p class="section-sub">Annonces, événements et nouveautés du serveur.</p>
        </div>
        <RouterLink to="/actualites" class="btn btn-ghost">Toutes les actualités</RouterLink>
      </div>

      <div class="news-grid">
        <NewsCard v-for="(item, i) in latest" :key="item.slug" :item="item" :index="i" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.news {
  padding: 100px 0;
  border-top: 1px solid var(--border);
}

.news-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 44px;
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

  .news-head {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 560px) {
  .news {
    padding: 72px 0;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
