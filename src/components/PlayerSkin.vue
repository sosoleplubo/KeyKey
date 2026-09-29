<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ username: string }>()

const failed = ref(false)

watch(
  () => props.username,
  () => {
    failed.value = false
  },
)

function onError() {
  failed.value = true
}
</script>

<template>
  <div class="player-skin">
    <img
      v-if="!failed"
      :src="`https://mc-heads.net/body/${encodeURIComponent(username)}/300`"
      :alt="`Skin de ${username}`"
      loading="lazy"
      @error="onError"
    />
    <span v-else class="fallback">🧍</span>
  </div>
</template>

<style scoped>
.player-skin {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
}

.player-skin img {
  max-height: 100%;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.5));
}

.fallback {
  font-size: 48px;
  opacity: 0.5;
}
</style>
