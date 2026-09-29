<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="page-header">
    <div class="glow"></div>
    <div class="noise-overlay"></div>
    <div v-reveal class="container page-header-inner">
      <span class="eyebrow">{{ eyebrow }}</span>
      <h1 class="page-title">{{ title }}</h1>
      <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
    </div>
  </header>
</template>

<style scoped>
.page-header {
  position: relative;
  overflow: hidden;
  padding: 72px 0 56px;
  border-bottom: 1px solid var(--border);
}

.glow {
  position: absolute;
  top: -180px;
  left: 50%;
  transform: translateX(-50%);
  width: 640px;
  height: 320px;
  background: radial-gradient(ellipse, var(--accent-glow), transparent 70%);
  pointer-events: none;
}

.noise-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Crect x='9' y='16' width='3' height='3' fill='white' opacity='0.5'/%3E%3Crect x='42' y='7' width='2' height='2' fill='white' opacity='0.3'/%3E%3Crect x='74' y='32' width='4' height='4' fill='white' opacity='0.55'/%3E%3Crect x='110' y='14' width='2' height='2' fill='white' opacity='0.25'/%3E%3Crect x='22' y='58' width='3' height='3' fill='white' opacity='0.4'/%3E%3Crect x='60' y='74' width='2' height='2' fill='white' opacity='0.3'/%3E%3Crect x='92' y='62' width='5' height='5' fill='white' opacity='0.45'/%3E%3Crect x='12' y='96' width='2' height='2' fill='white' opacity='0.3'/%3E%3Crect x='50' y='108' width='3' height='3' fill='white' opacity='0.4'/%3E%3Crect x='82' y='100' width='2' height='2' fill='white' opacity='0.25'/%3E%3Crect x='122' y='82' width='3' height='3' fill='white' opacity='0.35'/%3E%3Crect x='33' y='34' width='2' height='2' fill='white' opacity='0.2'/%3E%3Crect x='130' y='120' width='3' height='3' fill='white' opacity='0.3'/%3E%3Crect x='4' y='128' width='2' height='2' fill='white' opacity='0.25'/%3E%3C/svg%3E");
  background-size: 140px 140px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent);
}

.page-header-inner {
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: clamp(32px, 5vw, 48px);
  color: var(--text-primary);
  margin: 10px 0 12px;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 16.5px;
  max-width: 620px;
  line-height: 1.7;
}
</style>
