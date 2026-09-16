<script setup>
import { ref } from 'vue'
import StationTimeline from './StationTimeline.vue'
import IconClock from './icons/IconClock.vue'
import IconHash from './icons/IconHash.vue'
import IconChevronDown from './icons/IconChevronDown.vue'
import { lineColor } from '@/helpers/lineColors'

const props = defineProps({
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
  },
  isNext: {
    type: Boolean,
    default: false
  }
})

const showDetails = ref(false)

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function minutesAway(seconds) {
  return Math.max(0, Math.round(seconds / 60))
}

function destinationInfo(stations, destStationId) {
  const station = stations.find((entry) => entry.idElemento === destStationId)
  return station.llegada.estimada ? formatTime(station.llegada.estimada) : formatTime(station.llegada.programada)
}

function stationName(stations, stationId) {
  return stations.find((entry) => entry.idElemento === stationId)?.nombre
}
</script>

<template>
  <div class="train-card card" v-if="!tren.servicio.oculto">
    <div class="train-card__header">
      <span class="dot" :style="{ backgroundColor: lineColor(tren.servicio.ramal.nombre) }"></span>
      <h3 class="train-card__line">{{ tren.servicio.ramal.nombre }}</h3>
      <span class="pill" :class="isNext ? 'badge-accent' : 'badge-muted'">
        {{ minutesAway(tren.arribo.segundos) }} min
        <span v-if="isNext" class="train-card__next-label">próximo</span>
      </span>
    </div>

    <div class="train-card__route">
      <div class="train-card__stop">
        <span class="train-card__time">
          {{ tren.arribo.salida.estimada ? formatTime(tren.arribo.salida.estimada) : formatTime(tren.arribo.salida.programada) }}
        </span>
        <span class="train-card__station">{{ stationName(tren.servicio.estaciones, startId) }}</span>
      </div>
      <span class="train-card__arrow">→</span>
      <div class="train-card__stop">
        <span class="train-card__time">{{ destinationInfo(tren.servicio.estaciones, destinationId) }}</span>
        <span class="train-card__station">{{ stationName(tren.servicio.estaciones, destinationId) }}</span>
      </div>
    </div>

    <div class="train-card__meta">
      <span v-if="Object.keys(tren.arribo.llegada).length > 0" class="train-card__meta-item">
        <IconClock />
        Arribo a estación
        {{ tren.arribo.llegada.estimada ? formatTime(tren.arribo.llegada.estimada) : formatTime(tren.arribo.llegada.programada) }}
      </span>
      <span class="train-card__meta-item">
        <IconClock />
        Salida
        {{ tren.arribo.salida.estimada ? formatTime(tren.arribo.salida.estimada) : formatTime(tren.arribo.salida.programada) }}
      </span>
      <span class="train-card__meta-item">
        <IconClock />
        Llegada {{ destinationInfo(tren.servicio.estaciones, destinationId) }}
      </span>
      <span class="train-card__meta-item">
        <IconHash />
        Andén {{ tren.arribo.anden ? tren.arribo.anden.nombre : 'Sin dato' }}
      </span>
    </div>

    <button type="button" class="train-card__toggle" @click="showDetails = !showDetails">
      Ver estaciones
      <IconChevronDown :class="{ 'is-open': showDetails }" />
    </button>

    <StationTimeline
      v-if="showDetails"
      :estaciones="tren.servicio.estaciones"
      :startId="startId"
      :destinationId="destinationId"
    />
  </div>
</template>

<style scoped>
.train-card {
  padding: var(--space-4);
  margin-bottom: var(--space-3);
}

.train-card__header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.train-card__line {
  flex: 1;
  margin: 0;
  font-size: 1rem;
}

.train-card__next-label {
  display: block;
  font-size: 0.65rem;
  font-weight: 500;
  text-align: right;
}

.train-card__route {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.train-card__stop {
  display: flex;
  flex-direction: column;
}

.train-card__time {
  font-size: 1.3rem;
  font-weight: 600;
}

.train-card__station {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.train-card__arrow {
  color: var(--color-muted);
}

.train-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
  margin-bottom: var(--space-2);
}

.train-card__meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 0.8rem;
  color: var(--color-muted);
}

.train-card__toggle {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.train-card__toggle :deep(svg) {
  transition: transform 0.2s ease;
}

.train-card__toggle :deep(svg.is-open) {
  transform: rotate(180deg);
}
</style>
