<script setup>
import { useRouter } from 'vue-router'
import IconChevronRight from './icons/IconChevronRight.vue'

const props = defineProps({
  // Route name (string) or a full route location object. When omitted,
  // falls back to router.back().
  to: {
    type: [String, Object],
    default: null
  },
  label: {
    type: String,
    default: 'Volver'
  }
})

const router = useRouter()

function go() {
  if (props.to) {
    router.push(typeof props.to === 'string' ? { name: props.to } : props.to)
  } else {
    router.back()
  }
}
</script>

<template>
  <button type="button" class="back-button" @click="go">
    <IconChevronRight class="back-button__icon" />
    <span>{{ label }}</span>
  </button>
</template>

<style scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  background: none;
  border: none;
  color: var(--color-muted);
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  padding: var(--space-2) 0;
  margin-bottom: var(--space-3);
}

.back-button:hover {
  color: var(--color-primary);
}

.back-button__icon {
  transform: rotate(180deg);
}
</style>
