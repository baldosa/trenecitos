<script setup>
import IconCalendar from './icons/IconCalendar.vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="pill-field">
    <IconCalendar class="pill-field__icon" />
    <span class="pill-field__label">{{ modelValue || 'Hoy' }}</span>
    <input
      type="date"
      class="pill-field__input"
      :value="modelValue"
      :min="new Date().toISOString().slice(0, 10)"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<style scoped>
.pill-field {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  flex: 1;
}

.pill-field__icon {
  color: var(--color-muted);
  flex-shrink: 0;
}

.pill-field__label {
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pill-field__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
}
</style>
