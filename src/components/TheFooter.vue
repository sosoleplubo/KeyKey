<script setup lang="ts">
import BrandMark from './BrandMark.vue'

const DISCORD_URL = 'https://discord.gg/YMePKDY8SV'
const SERVER_IP = 'play.keykey.fr:26001'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <RouterLink to="/" class="brand">
          <BrandMark :size="42" />
          <span class="brand-name">KeyKey</span>
        </RouterLink>
        <p class="footer-desc">SMP Survie · Orienté Build · Semi-RP</p>
      </div>

      <nav class="footer-links">
        <RouterLink to="/regles">Règles</RouterLink>
        <RouterLink to="/lore">Lore</RouterLink>
        <RouterLink to="/royaumes">Royaumes</RouterLink>
        <RouterLink to="/classement">Classement</RouterLink>
        <RouterLink to="/actualites">Actualités</RouterLink>
        <RouterLink to="/galerie">Galerie</RouterLink>
        <a :href="DISCORD_URL" target="_blank" rel="noopener noreferrer">Discord</a>
      </nav>

      <div class="footer-ip">
        <span class="footer-ip-label">IP du serveur</span>
        <span class="footer-ip-value">{{ SERVER_IP }}</span>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© {{ year }} KeyKey. Non affilié à Mojang ou Microsoft.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 48px 0 0;
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 32px;
  padding-bottom: 40px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 17px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.footer-desc {
  color: var(--text-tertiary);
  font-size: 14px;
}

.footer-links {
  display: flex;
  gap: 28px;
  align-items: flex-start;
}

.footer-links a {
  color: var(--text-secondary);
  font-size: 14.5px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--text-primary);
}

.footer-ip {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-ip-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
}

.footer-ip-value {
  font-family: 'Sora', monospace;
  font-weight: 600;
  color: var(--accent-strong);
  font-size: 15px;
}

.footer-bottom {
  border-top: 1px solid var(--border);
  padding: 20px 0;
  color: var(--text-tertiary);
  font-size: 13px;
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
