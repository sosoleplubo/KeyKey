<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ value: number; max: number }>()

const percent = computed(() => Math.max(0, Math.min(100, (props.value / props.max) * 100)))
</script>

<template>
  <div class="meter">
    <div class="meter-track">
      <div class="meter-fill" :style="{ width: `${percent}%` }"></div>
    </div>
    <span class="meter-value">{{ value }}/{{ max }}</span>
  </div>
</template>

<style scoped>
.meter {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 68px;
}

.meter-track {
  height: 6px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.15);
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%);
}

.meter-value {
  font-size: 11.5px;
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}
</style>
