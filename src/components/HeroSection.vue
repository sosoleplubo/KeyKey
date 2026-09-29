<script setup lang="ts">
import { computed, ref } from 'vue'
import { useServerStatus } from '@/composables/useServerStatus'
import { burstFromEvent } from '@/composables/useConfetti'
import { playClickSound } from '@/composables/useClickSound'
import DiscordIcon from './DiscordIcon.vue'

const SERVER_IP = 'play.keykey.fr:26001'
const DISCORD_URL = 'https://discord.gg/YMePKDY8SV'

const { status, loading } = useServerStatus()

const statusVariant = computed(() => {
  if (loading.value) return 'loading'
  if (!status.value?.online) return 'off'
  return status.value.playersOnline > 0 ? 'online' : 'empty'
})

const copied = ref(false)
const bannerFailed = ref(false)

function onBannerError() {
  bannerFailed.value = true
}

async function copyIp(event: MouseEvent) {
  try {
    await navigator.clipboard.writeText(SERVER_IP)
    copied.value = true
    burstFromEvent(event, 18)
    playClickSound()
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    copied.value = false
  }
}

function onDiscordClick(event: MouseEvent) {
  burstFromEvent(event)
  playClickSound()
}
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-bg">
      <img
        v-if="!bannerFailed"
        src="/hero-banner.jpg"
        alt=""
        class="hero-bg-img"
        @error="onBannerError"
      />
      <div class="glow glow-a"></div>
      <div class="glow glow-b"></div>
      <div class="noise-overlay"></div>
      <div class="hero-fade"></div>
    </div>

    <div class="container hero-inner">
      <div v-reveal="0" class="eyebrow status-badge" :class="`status-${statusVariant}`">
        <span class="dot" :class="`dot-${statusVariant}`"></span>
        <template v-if="loading">Vérification du serveur…</template>
        <template v-else-if="status?.online">
          Serveur en ligne · {{ status.playersOnline }} joueur{{ status.playersOnline > 1 ? 's' : '' }} connecté{{ status.playersOnline > 1 ? 's' : '' }}
        </template>
        <template v-else>Serveur hors ligne pour le moment</template>
      </div>

      <h1 v-reveal="1" class="hero-title">
        Bienvenue sur <span class="accent-text">KeyKey</span>
      </h1>

      <p v-reveal="2" class="hero-tagline">SMP Survie · Orienté Build · Semi-RP</p>

      <p v-reveal="3" class="hero-desc">
        Un serveur Minecraft SMP Survie centré sur la construction, avec une
        touche de roleplay léger. Rejoins une communauté active et façonne un
        monde vivant, quartier après quartier.
      </p>

      <div v-reveal="4" class="ip-box">
        <span class="ip-label">IP du serveur</span>
        <span class="ip-value">{{ SERVER_IP }}</span>
        <button class="copy-btn" @click="copyIp">
          {{ copied ? 'Copié !' : 'Copier' }}
        </button>
      </div>

      <div v-reveal="5" class="hero-actions">
        <a
          :href="DISCORD_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-discord"
          @click="onDiscordClick"
        >
          <DiscordIcon />
          Rejoindre le Discord
        </a>
        <a href="#carte" class="btn btn-ghost">Explorer la carte</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 82vh;
  padding: 72px 0 96px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: var(--bg);
}

.hero-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-inner {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 720px;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 1;
}

.glow-a {
  width: 480px;
  height: 480px;
  top: -160px;
  right: -120px;
  background: radial-gradient(circle, var(--accent-glow), transparent 70%);
}

.glow-b {
  width: 360px;
  height: 360px;
  bottom: -140px;
  left: -100px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.2), transparent 70%);
}

.noise-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Crect x='9' y='16' width='3' height='3' fill='white' opacity='0.5'/%3E%3Crect x='42' y='7' width='2' height='2' fill='white' opacity='0.3'/%3E%3Crect x='74' y='32' width='4' height='4' fill='white' opacity='0.55'/%3E%3Crect x='110' y='14' width='2' height='2' fill='white' opacity='0.25'/%3E%3Crect x='22' y='58' width='3' height='3' fill='white' opacity='0.4'/%3E%3Crect x='60' y='74' width='2' height='2' fill='white' opacity='0.3'/%3E%3Crect x='92' y='62' width='5' height='5' fill='white' opacity='0.45'/%3E%3Crect x='12' y='96' width='2' height='2' fill='white' opacity='0.3'/%3E%3Crect x='50' y='108' width='3' height='3' fill='white' opacity='0.4'/%3E%3Crect x='82' y='100' width='2' height='2' fill='white' opacity='0.25'/%3E%3Crect x='122' y='82' width='3' height='3' fill='white' opacity='0.35'/%3E%3Crect x='33' y='34' width='2' height='2' fill='white' opacity='0.2'/%3E%3Crect x='130' y='120' width='3' height='3' fill='white' opacity='0.3'/%3E%3Crect x='4' y='128' width='2' height='2' fill='white' opacity='0.25'/%3E%3C/svg%3E");
  background-size: 140px 140px;
  mask-image: radial-gradient(ellipse 70% 60% at 30% 20%, black, transparent);
  z-index: 1;
}

.hero-fade {
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    linear-gradient(90deg, var(--bg) 0%, rgba(9, 12, 10, 0.92) 32%, rgba(9, 12, 10, 0.35) 68%, rgba(9, 12, 10, 0.7) 100%),
    linear-gradient(180deg, rgba(9, 12, 10, 0.2) 0%, rgba(9, 12, 10, 0.35) 55%, var(--bg) 100%);
}

.status-badge {
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.25);
  padding: 7px 14px 7px 12px;
  border-radius: 999px;
  margin-bottom: 28px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
}

.status-online {
  background: rgba(74, 222, 128, 0.08);
  border-color: rgba(74, 222, 128, 0.25);
}

.dot-online {
  background: #4ade80;
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
}

.status-empty {
  background: rgba(248, 113, 113, 0.08);
  border-color: rgba(248, 113, 113, 0.25);
}

.dot-empty {
  background: #f87171;
  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.2);
}

.status-off {
  background: rgba(255, 255, 255, 0.03);
  border-color: var(--border-strong);
}

.dot-off {
  background: var(--text-tertiary);
  box-shadow: none;
}

.hero-title {
  font-size: clamp(40px, 6.5vw, 68px);
  color: var(--text-primary);
  margin-bottom: 6px;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
}

.accent-text {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-tagline {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--text-secondary);
  margin-bottom: 22px;
}

.hero-desc {
  color: var(--text-secondary);
  font-size: 17px;
  line-height: 1.75;
  max-width: 560px;
  margin-bottom: 36px;
}

.ip-box {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(18, 23, 19, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 12px 12px 12px 20px;
  margin-bottom: 28px;
}

.ip-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-tertiary);
  white-space: nowrap;
}

.ip-value {
  font-family: 'Sora', monospace;
  font-weight: 600;
  font-size: 16px;
  color: var(--text-primary);
  flex: 1;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
  font-size: 13.5px;
  font-weight: 600;
  padding: 9px 16px;
  border-radius: var(--radius-sm);
  transition: background 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
}

.copy-btn:hover {
  background: rgba(56, 189, 248, 0.12);
  border-color: var(--accent);
  color: var(--accent-strong);
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

@media (max-width: 560px) {
  .hero {
    min-height: auto;
    padding: 56px 0 64px;
  }

  .ip-box {
    flex-wrap: wrap;
  }

  .ip-value {
    order: 3;
    width: 100%;
  }
}
</style>
