<script setup lang="ts">
const MAP_URL =
  'http://play.keykey.fr:26005/#world:-586:0:4171:17949:0.02:0:0:0:perspective'
</script>

<template>
  <section id="carte" class="map-section">
    <div class="container">
      <div v-reveal>
        <span class="eyebrow">Le monde en direct</span>
        <h2 class="section-heading">Explore la carte interactive</h2>
        <p class="section-sub">
          Repère les spawns, les villes et les constructions des joueurs en temps
          réel, directement depuis ton navigateur.
        </p>
      </div>

      <div v-reveal class="map-frame">
        <iframe
          :src="MAP_URL"
          title="Carte interactive du serveur KeyKey"
          loading="lazy"
          allowfullscreen
        ></iframe>
      </div>

      <a :href="MAP_URL" target="_blank" rel="noopener noreferrer" class="map-link">
        Ouvrir la carte dans un nouvel onglet ↗
      </a>
    </div>
  </section>
</template>

<style scoped>
.map-section {
  padding: 100px 0;
  border-top: 1px solid var(--border);
}

.map-frame {
  margin-top: 44px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-elevated);
  aspect-ratio: 16 / 9;
  background: var(--surface);
}

.map-frame iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.map-link {
  display: inline-block;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-strong);
}

.map-link:hover {
  text-decoration: underline;
}

@media (max-width: 560px) {
  .map-section {
    padding: 72px 0;
  }

  .map-frame {
    aspect-ratio: 4 / 5;
  }
}
</style>
