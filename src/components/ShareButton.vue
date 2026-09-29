<script setup lang="ts">
import { ref } from 'vue'
import { playClickSound } from '@/composables/useClickSound'

const copied = ref(false)

async function share() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    playClickSound()
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <button class="share-btn" @click="share">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.6" y1="10.5" x2="15.4" y2="6.5" />
      <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
    </svg>
    {{ copied ? 'Lien copié !' : 'Partager' }}
  </button>
</template>

<style scoped>
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-strong);
  color: var(--text-secondary);
  font-size: 13.5px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.share-btn:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: var(--accent);
  color: var(--text-primary);
}

.share-btn svg {
  width: 15px;
  height: 15px;
}
</style>
