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
  <div class="pure-control-group">
    <select
      :value="modelValue"
      class="pure-input"
    >
      <option
        value=""
        disabled
      >¿Arribo o partida?</option>
      <option value="partida">Partida</option>
      <option value="arribo">Arribo</option>
    </select>
  </div>
</template>

<style scoped>
.pure-control-group {
  margin-bottom: 1rem;
}


.pure-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.pure-input:focus {
  border-color: #129FEA;
  outline: none;
}
</style>