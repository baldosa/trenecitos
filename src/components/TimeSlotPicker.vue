<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="timeslot-field">
    <label for="search-time-type" class="timeslot-field__label">La fecha y hora son de</label>
    <select
      id="search-time-type"
      :value="modelValue"
      class="field-input"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled>¿Salida o llegada?</option>
      <option value="partida">Salida (tomo el tren a esa hora)</option>
      <option value="arribo">Llegada (quiero llegar a esa hora)</option>
    </select>
  </div>
</template>

<style scoped>
.timeslot-field__label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-muted);
  margin-bottom: var(--space-1);
}
</style>