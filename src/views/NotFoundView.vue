<script setup lang="ts">
const ALLAY_URL = 'https://minecraft.wiki/images/thumb/Allay_JE2.png/300px-Allay_JE2.png'
</script>

<template>
  <section class="not-found">
    <div class="container">
      <div v-reveal class="content">
        <img :src="ALLAY_URL" alt="Un Allay perdu" class="allay" />
        <span class="code">404</span>
        <h1>Cet allay s'est perdu en chemin</h1>
        <p>La page que tu cherches n'existe pas, ou plus. Donne-lui un objet brillant et rentre à l'accueil.</p>
        <RouterLink to="/" class="btn btn-primary">← Retour à l'accueil</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
}

.allay {
  width: 140px;
  height: auto;
  margin-bottom: 8px;
  filter: drop-shadow(0 12px 24px rgba(56, 189, 248, 0.25));
  animation: float 3.5s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}

.code {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.08em;
  color: var(--accent-strong);
  margin-top: 12px;
}

.content h1 {
  font-size: clamp(24px, 4vw, 32px);
  color: var(--text-primary);
  margin: 10px 0 12px;
}

.content p {
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 28px;
}

@media (prefers-reduced-motion: reduce) {
  .allay {
    animation: none;
  }
}
</style>
