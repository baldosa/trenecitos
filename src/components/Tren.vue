<script setup>
import Timeline from '../components/Timeline.vue'
import Map from '../components/Map.vue'

import { ref, computed, onMounted, onUnmounted } from 'vue'
defineProps({
  tren: {
    type: Object,
    required: true
  },
  startId: {
    type: Number,
    required: true
  },
  destinationId: {
    type: Number,
    required: true
  }
})
const showDetails = ref(false)
const showMap = ref(false)

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

const nextTrain = ref({
  destination: "Central Station",
  scheduledTime: "10:30",
  minutesAway: 12,
  platform: "2",
  status: "On Time"
})

const timeLeft = ref(nextTrain.value.minutesAway * 60)
let timer


const formatSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const destinationInfo = (stations, destStationId) => {
  let filteredStation = stations.find(station => station.idElemento === destStationId)
  return filteredStation.llegada.estimada ?
    formatTime(filteredStation.llegada.estimada) : formatTime(filteredStation.llegada.programada)
}

const startTimer = () => {
  timer = setInterval(() => {
    timeLeft.value--

    if (timeLeft.value <= 0) {
      // Simulate new train arrival
      const newMinutes = Math.floor(Math.random() * 15) + 5
      nextTrain.value.minutesAway = newMinutes
      timeLeft.value = newMinutes * 60
    }
  }, 1000)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
<template>
  <div
    class="pure-g"
    v-if="!tren.servicio.oculto"
  >
    <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
      <div class="train-card">
        <div class="header">
          <h2>
            <span class="icon">🚂</span>
            {{ tren.servicio.ramal.nombre }}
          </h2>
          <span class="status">
            Llega en {{
              formatSeconds(tren.arribo.segundos) }}
          </span>
        </div>

        <div class="info-grid">
          <div
            class="info-row"
            v-if="Object.keys(tren.arribo.llegada).length > 0"
          >
            <span class="label">⏰ Arribo a estación:</span>
            <span class="value">{{
              tren.arribo.llegada.estimada ?
                formatTime(tren.arribo.llegada.estimada) : formatTime(tren.arribo.llegada.programada) }} </span>
          </div>

          <div class="info-row">
            <span class="
            label">⏰ Salida desde estación:</span>
            <span class="value">{{ tren.arribo.salida.estimada ?
              formatTime(tren.arribo.salida.estimada) : formatTime(tren.arribo.salida.programada) }}</span>
          </div>
          <div class="info-row">
            <span class="label">⏰ Arribo a destino:</span>
            <span class="value">{{ destinationInfo(tren.servicio.estaciones, destinationId) }}</span>
          </div>

          <div class="info-row">
            <span class="label">🛤️ Anden:</span>
            <span class="value">{{ tren.arribo.anden ? tren.arribo.anden.nombre : "Sin dato" }}</span>
          </div>
        </div>

        <div class="pure-g">
          <div class="pure-u-1 pure-u-md-1-3"></div>
          <div
            class="pure-u-1 pure-u-md-1-3"
            style="text-align: center"
          >
            <button
              type="button"
              class="pure-button pure-button-primary"
              @click="showDetails = !showDetails"
            >
              🚉 Detalle estaciones
            </button>

            <div
              v-if="showDetails"
              style="margin-top: 1rem"
            >
              <Timeline
                :estaciones="tren.servicio.estaciones"
                :destinationId="destinationId"
                :startId="startId"
              />
            </div>
          </div>
          <div class="pure-u-1 pure-u-md-1-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.train-card {
  margin: 1rem;
  padding: 1.5rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header h2 {
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 0.5rem;
}

.status {
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #2ecc71;
  background: #eafaf1;
}


.info-grid {
  margin-bottom: 1.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.info-row:last-child {
  border-bottom: none;
}

.label {
  color: #666;
}

.value {
  font-weight: 500;
}

.detail {
  background: #f7f9fc;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  /* display: flex; */
  align-items: center;
  justify-content: center;
}

.clock-icon {
  font-size: 1.25rem;
}

.timer {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2980b9;
}

.pure-button-primary {
  background: rgb(91, 83, 122);
}

@media screen and (max-width: 48em) {
  .train-card {
    margin: 0.5rem;
  }

  .header h2 {
    font-size: 1.25rem;
  }

  .timer {
    font-size: 1.25rem;
  }
}
</style>