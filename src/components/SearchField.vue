<script setup>
import { ref, onMounted } from 'vue'
import client from '@/api'
import IconClose from './icons/IconClose.vue'

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
  hasError: {
    type: Boolean,
    default: false
  },
  // The station currently selected in the "other" field (Desde/Hasta), if
  // any. When set, suggestions are narrowed to stations that share at
  // least one ramal with it — the same connectivity check handleSubmit
  // already does, applied ahead of time so you can't pick two stations
  // that aren't on the same line to begin with.
  relatedStation: {
    type: Object,
    default: null
  }
})

const searchStations = async (query) => {
  const { data } = await client.GET("/v1/infraestructura/estaciones", {
    params: {
      query: { nombre: query }
    }
  })
  const relatedRamales = props.relatedStation?.incluida_en_ramales
  if (!relatedRamales) {
    return data
  }
  return data.filter((station) =>
    station.incluida_en_ramales.some((ramalId) => relatedRamales.includes(ramalId))
  )
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
  <div class="search-field">
    <label class="search-field__label">{{ label }}</label>
    <div class="search-field__wrapper">
      <input
        type="string"
        class="field-input search-field__input"
        :class="{ 'is-error': hasError }"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleInput"
      />
      <button
        v-if="modelValue"
        type="button"
        class="icon-btn search-field__clear"
        @click="handleClear"
        aria-label="Clear input"
      >
        <IconClose />
      </button>

      <ul v-if="filteredStations.length" class="search-field__suggestions card">
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
.search-field {
  flex: 1;
  min-width: 0;
}

.search-field__label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-muted);
  margin-bottom: var(--space-1);
}

.search-field__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-field__input {
  padding-right: 2rem;
}

.search-field__input.is-error {
  border-color: #dc2626;
}

.search-field__clear {
  position: absolute;
  right: var(--space-2);
}

.search-field__suggestions {
  position: absolute;
  top: calc(100% + var(--space-1));
  left: 0;
  right: 0;
  z-index: 1000;
  list-style: none;
  margin: 0;
  padding: var(--space-1) 0;
  max-height: 240px;
  overflow-y: auto;
}

.search-field__suggestions li {
  padding: var(--space-2) var(--space-3);
  cursor: pointer;
  font-size: 0.9rem;
}

.search-field__suggestions li:hover {
  background: var(--color-bg);
}
</style>