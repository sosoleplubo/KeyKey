<script setup lang="ts">
import DiscordIcon from './DiscordIcon.vue'
import { burstFromEvent } from '@/composables/useConfetti'
import { playClickSound } from '@/composables/useClickSound'

const DISCORD_URL = 'https://discord.gg/YMePKDY8SV'

function onDiscordClick(event: MouseEvent) {
  burstFromEvent(event, 40)
  playClickSound()
}
</script>

<template>
  <section id="communaute" class="community">
    <div class="container">
      <div class="community-card">
        <div class="glow"></div>
        <div v-reveal class="community-content">
          <span class="eyebrow">Rejoins-nous</span>
          <h2 class="section-heading">Prêt à rejoindre l'aventure ?</h2>
          <p class="section-sub">
            Le Discord est le cœur de la communauté KeyKey : annonces,
            entraide, événements et discussions entre joueurs.
          </p>
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
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.community {
  padding: 40px 0 110px;
}

.community-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-strong);
  background: linear-gradient(160deg, var(--surface) 0%, var(--bg-soft) 100%);
  padding: 64px 48px;
  text-align: center;
  display: flex;
  justify-content: center;
}

.glow {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 560px;
  height: 320px;
  background: radial-gradient(ellipse, rgba(88, 101, 242, 0.28), transparent 70%);
  pointer-events: none;
}

.community-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 560px;
}

.community-content .eyebrow {
  margin-bottom: 8px;
}

.community-content .section-sub {
  margin: 0 auto 32px;
}

@media (max-width: 560px) {
  .community {
    padding: 20px 0 80px;
  }

  .community-card {
    padding: 48px 24px;
  }
}
</style>
