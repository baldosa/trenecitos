<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import SearchField from './SearchField.vue'
import TimeSlotPicker from './TimeSlotPicker.vue'
import IconSwap from './icons/IconSwap.vue'
import IconChevronDown from './icons/IconChevronDown.vue'
import IconSearch from './icons/IconSearch.vue'
import { recordSearch } from '@/composables/useRecentStations'

const router = useRouter()

const formData = ref({
  desde: null,
  hasta: null,
  selectedDate: null,
  selectedTime: null,
  searchType: null
})

const showAdvanced = ref(false)
const error = ref(false)
const errorMessage = ref('')

function toggleAdvanced() {
  showAdvanced.value = !showAdvanced.value
}

function swapStations() {
  const desde = formData.value.desde
  formData.value.desde = formData.value.hasta
  formData.value.hasta = desde
}

const handleSubmit = () => {
  error.value = true;
  if (formData.value.desde && formData.value.hasta) {
    let result = formData.value.desde.incluida_en_ramales.filter(o1 => formData.value.hasta.incluida_en_ramales.some(o2 => o1 === o2));
    if (result.length > 0) {
      error.value = false;
    } else {
      errorMessage.value = 'Las estaciones seleccionadas no están conectadas por ninguna línea de trenes';
    }
  } else {
    errorMessage.value = 'Elegí desde y hasta pls';

  }

  if (formData.value.selectedDate && !formData.value.selectedTime) {
    const today = new Date();
    formData.value.selectedTime = `${today.getHours()}:${today.getMinutes()}`;
  }

  if (formData.value.selectedTime && !formData.value.selectedDate) {
    const today = new Date();
    formData.value.selectedDate = today.toISOString().slice(0, 10);
  }

  if (formData.value.selectedTime || formData.value.selectedDate) {
    formData.value.searchType = 'partida';
  }

  if (!error.value) {
    recordSearch({ desde: formData.value.desde, hasta: formData.value.hasta })
    router.push({
      name: 'trenes',
      query: {
        desde: formData.value.desde.id_estacion,
        hasta: formData.value.hasta.id_estacion,
        tipoBusqueda: formData.value.searchType,
        fecha: formData.value.selectedDate,
        hora: formData.value.selectedTime
      }
    })
  }
}
</script>

<template>
  <form class="search-box card" @submit.prevent="handleSubmit">
    <div class="search-box__stations">
      <search-field
        v-model="formData.desde"
        label="Desde"
        placeholder="Estación de salida"
        :has-error="error"
        :related-station="formData.hasta"
        required
      />
      <button
        type="button"
        class="icon-btn search-box__swap"
        @click="swapStations"
        aria-label="Invertir estaciones"
      >
        <IconSwap />
      </button>
      <search-field
        v-model="formData.hasta"
        label="Hasta"
        placeholder="Estación de llegada"
        :has-error="error"
        :related-station="formData.desde"
        required
      />
    </div>

    <span class="search-box__error" v-if="error">{{ errorMessage }}</span>

    <button type="submit" class="pure-button pure-button-primary search-box__submit">
      <IconSearch />
      Buscar trenes
    </button>

    <button type="button" class="search-box__advanced-toggle" @click="toggleAdvanced">
      Opciones avanzadas
      <IconChevronDown :class="{ 'is-open': showAdvanced }" />
    </button>

    <div v-if="showAdvanced" class="search-box__advanced">
      <div class="search-box__advanced-fields">
        <div class="search-box__advanced-field">
          <label for="search-date">Fecha</label>
          <input
            id="search-date"
            type="date"
            class="field-input"
            v-model="formData.selectedDate"
            :min="new Date().toISOString().slice(0, 10)"
          />
        </div>
        <div class="search-box__advanced-field">
          <label for="search-time">Hora</label>
          <input
            id="search-time"
            type="time"
            class="field-input"
            v-model="formData.selectedTime"
          />
        </div>
      </div>
      <time-slot-picker v-model="formData.searchType" />
    </div>
  </form>
</template>

<style scoped>
.search-box {
  max-width: 850px;
  margin: 0 auto;
  padding: var(--space-5);
}

.search-box__stations {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.search-box__swap {
  align-self: center;
  font-size: 1.1rem;
}

.search-box__error {
  display: block;
  color: #dc2626;
  font-size: 0.9rem;
  margin-bottom: var(--space-3);
}

.search-box__submit {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3);
  font-size: 1rem;
}

.search-box__advanced-toggle {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  width: 100%;
  justify-content: center;
  background: none;
  border: none;
  color: var(--color-muted);
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: var(--space-3);
}

.search-box__advanced-toggle :deep(svg) {
  transition: transform 0.2s ease;
}

.search-box__advanced-toggle :deep(svg.is-open) {
  transform: rotate(180deg);
}

.search-box__advanced {
  margin-top: var(--space-3);
}

.search-box__advanced-fields {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.search-box__advanced-field {
  flex: 1;
}

.search-box__advanced-field label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-muted);
  margin-bottom: var(--space-1);
}

@media (min-width: 48em) {
  .search-box__stations {
    flex-direction: row;
    align-items: flex-end;
  }
}
</style>
