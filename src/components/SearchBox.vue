<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import SearchField from './SearchField.vue'
import DatePicker from './DatePicker.vue'
import TimePicker from './TimePicker.vue'
import TimeSlotPicker from './TimeSlotPicker.vue'

const formData = ref({
  desde: null,
  hasta: null,
  selectedDate: null,
  selectedTime: null,
  searchType: null
})

const error = ref(false)
const errorMessage = ref('')

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
    sessionStorage.setItem('formData', JSON.stringify(formData.value))
    router.push({
      name: 'trenes',
    })
  }
}
</script>

<template>
  <form
    class="pure-form pure-form-stacked"
    @submit.prevent="handleSubmit"
  >
    <fieldset>
      <div class="pure-g">
        <!-- Search Term 1 -->
        <div class="pure-u-1 form-group">
          <search-field
            v-model="formData.desde"
            label="Desde"
            placeholder="Estación de salida"
            :valid="error"
            required
          />
        </div>

        <!-- Search Term 2 -->
        <div class="pure-u-1 form-group">
          <search-field
            v-model="formData.hasta"
            label="Hasta"
            placeholder="Estación de llegada"
            :valid="error"
            required
          />
        </div>

        <!-- Date and Time Container -->
        <div class="pure-u-1 datetime-container">
          <div class="datetime-field">
            <time-slot-picker v-model="formData.searchType" />
          </div>
          <!-- Date Picker -->
          <div class="datetime-field">
            <date-picker v-model="formData.selectedDate" />
          </div>

          <!-- Time Picker -->
          <div class="datetime-field">
            <time-picker v-model="formData.selectedTime" />
          </div>
        </div>
      </div>
      <div class="pure-u-1 form-group">
        <span
          class="error"
          v-if="error"
        >{{ errorMessage }}</span>
      </div>
      <div class="button-group">
        <button
          type="submit"
          class="pure-button pure-button-primary"
        >
          Buscar
        </button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
.pure-form {
  max-width: 850px;
  margin: 0 auto;
}

.form-group {
  padding: 0 1rem;
  margin-bottom: 1rem;

}

.datetime-container {
  display: flex;
  gap: 2rem;
  padding: 0 1rem;
  margin-bottom: 1rem;
}

.datetime-field {
  flex: 1;
}

.button-group {
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
}

.error {
  color: rgb(156, 27, 27);
  gap: 1rem;
  padding: 0 1rem;
  margin-top: 10px;
}

/* Mobile Responsiveness */
@media (max-width: 48em) {

  .form-group,
  .button-group {
    padding: 0;
  }

  .datetime-container {
    flex-direction: column;
    gap: 1rem;
    padding: 0;
  }

  .datetime-field {
    width: 100%;
  }

  .button-group {
    flex-direction: column;
  }

  .pure-button {
    width: 100%;
  }
}
</style>