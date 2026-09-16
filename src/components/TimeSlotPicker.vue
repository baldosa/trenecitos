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
    <label class="timeslot-field__label">Tipo de búsqueda</label>
    <select
      :value="modelValue"
      class="pure-input timeslot-field__select"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled>¿Arribo o partida?</option>
      <option value="partida">Partida</option>
      <option value="arribo">Arribo</option>
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

.timeslot-field__select {
  width: 100%;
  box-sizing: border-box;
}
</style>