<script setup lang="ts">
import { ref } from 'vue'
import BrandMark from './BrandMark.vue'
import DiscordIcon from './DiscordIcon.vue'
import { burstFromEvent } from '@/composables/useConfetti'
import { playClickSound } from '@/composables/useClickSound'

const DISCORD_URL = 'https://discord.gg/YMePKDY8SV'

const open = ref(false)

function closeMenu() {
  open.value = false
}

function onDiscordClick(event: MouseEvent) {
  burstFromEvent(event)
  playClickSound()
}
</script>

<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <RouterLink to="/" class="brand" @click="closeMenu">
        <BrandMark :size="50" />
        <span class="brand-name">KeyKey</span>
      </RouterLink>

      <nav class="links" :class="{ open }">
        <RouterLink to="/regles" @click="closeMenu">Règles</RouterLink>
        <RouterLink to="/lore" @click="closeMenu">Lore</RouterLink>
        <RouterLink to="/royaumes" @click="closeMenu">Royaumes</RouterLink>
        <RouterLink to="/classement" @click="closeMenu">Classement</RouterLink>
        <RouterLink to="/actualites" @click="closeMenu">Actualités</RouterLink>
        <RouterLink to="/galerie" @click="closeMenu">Galerie</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#carte' }" @click="closeMenu">Carte</RouterLink>
        <a
          :href="DISCORD_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-discord nav-discord"
          @click="onDiscordClick"
        >
          <DiscordIcon />
          Discord
        </a>
      </nav>

      <button class="burger" :class="{ open }" aria-label="Menu" @click="open = !open">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(14px);
  background: rgba(9, 12, 10, 0.75);
  border-bottom: 1px solid var(--border);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--text-primary);
}


.links {
  display: flex;
  align-items: center;
  gap: 22px;
}

.links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s ease;
  white-space: nowrap;
}

.links a:hover {
  color: var(--text-primary);
}

.links a.router-link-active:not(.btn) {
  color: var(--accent-strong);
}

.nav-discord {
  padding: 9px 18px;
  font-size: 14px;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px;
}

.burger span {
  width: 22px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.burger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.burger.open span:nth-child(2) {
  opacity: 0;
}

.burger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 920px) {
  .burger {
    display: flex;
  }

  .links {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: var(--bg-soft);
    border-bottom: 1px solid var(--border);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
  }

  .links.open {
    max-height: 260px;
  }

  .links a {
    padding: 16px 24px;
    border-top: 1px solid var(--border);
  }

  .nav-discord {
    margin: 12px 24px;
    justify-content: center;
  }
}
</style>
