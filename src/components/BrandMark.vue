<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{ size?: number }>(), { size: 46 })

const failed = ref(false)

function onError() {
  failed.value = true
}
</script>

<template>
  <span class="brand-mark" :style="{ width: `${size}px`, height: `${size}px` }">
    <img v-if="!failed" src="/logo.gif" alt="Logo KeyKey" @error="onError" />
    <span v-else class="fallback">KK</span>
  </span>
</template>

<style scoped>
.brand-mark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.brand-mark img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: scaleX(-1);
}

.fallback {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
}
</style>
