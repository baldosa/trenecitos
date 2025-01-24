<script setup>
import { ref, onMounted } from 'vue'
import client from '@/api'
import { getToken } from '@/helpers'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: Object,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  valid: {
    type: Boolean,
    default: false
  }
})

const searchStations = async (query) => {
  const authToken = getToken();
  const { data } = await client.GET("/v1/infraestructura/estaciones", {
    headers: { authorization: authToken },
    params: {
      query: { nombre: query }
    }
  })
  return data
}

const inputValue = ref('');

const filteredStations = ref([]);

const handleInput = async (event) => {
  const value = event.target.value;
  inputValue.value = value;
  filteredStations.value = await searchStations(value)
};

const handleSelect = (station) => {
  emit('update:modelValue', station);
  inputValue.value = station.nombre;
  filteredStations.value = [];
};

const emit = defineEmits(['update:modelValue', 'clear']);

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>

<template>
  <div class="pure-control-group">
    <label>{{ label }}</label>
    <div class="input-wrapper">
      <input
        type="string"
        class="pure-input has-clear-button"
        :class="valid ? '' : 'error'"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleInput"
      >
      <button
        v-if="modelValue"
        type="button"
        class="clear-button"
        @click="handleClear"
        aria-label="Clear input"
      >
        <i class="fas fa-times"></i>
      </button>
      <ul
        v-if="filteredStations.length"
        class="suggestions"
      >
        <li
          v-for="station in filteredStations"
          :key="station.nombre"
          @click="handleSelect(station)"
        >
          {{ station.nombre }}
        </li>
      </ul>

    </div>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.pure-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  transition: border-color 0.2s ease;
}

.pure-input.has-clear-button {
  padding-right: 2rem;
}

.pure-input:focus {
  border-color: #129FEA;
  outline: none;
}

.error {
  border-color: red;
  outline: none;
}

.clear-button {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background-color: #f0f0f0;
  color: #333;
}

.clear-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(18, 159, 234, 0.2);
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  z-index: 1000;
  list-style: none;
  margin: 0;
  padding: 0;
}

.suggestions li {
  padding: 0.5rem;
  cursor: pointer;
}

.suggestions li:hover {
  background: #f0f0f0;

}
</style>