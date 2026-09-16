<script setup>
const props = defineProps({
  estaciones: {
    type: Array,
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

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const items = props.estaciones.filter(estacion => estacion.llegada.estimada || estacion.llegada.programada || estacion.salida.programada || estacion.salida.programada).map(estacion => ({
  id: estacion.idElemento,
  llegada: estacion.llegada.estimada ? formatTime(estacion.llegada.estimada) : formatTime(estacion.llegada.programada),
  salida: estacion.salida.estimada ? formatTime(estacion.salida.estimada) : formatTime(estacion.salida.programada),
  nombre: estacion.nombre
}))
</script>

<template>
  <div class="station-timeline">
    <div
      v-for="item in items"
      :key="item.id"
      class="station-timeline__item"
      :class="{
        'is-start': item.id === startId,
        'is-end': item.id === destinationId
      }"
    >
      <span class="station-timeline__dot"></span>
      <div class="station-timeline__row">
        <span class="station-timeline__name">{{ item.nombre }}</span>
        <span class="station-timeline__time">{{ item.llegada !== 'Invalid Date' ? item.llegada : item.salida }}</span>
      </div>
      <span v-if="item.id === startId" class="station-timeline__tag">Estación actual</span>
    </div>
  </div>
</template>

<style scoped>
.station-timeline {
  max-width: 600px;
  margin: var(--space-3) auto 0;
  padding-left: var(--space-2);
}

.station-timeline__item {
  position: relative;
  padding-left: var(--space-5);
  padding-bottom: var(--space-4);
  border-left: 2px solid var(--color-border);
  margin-left: 4px;
}

.station-timeline__item:last-child {
  border-left-color: transparent;
  padding-bottom: 0;
}

.station-timeline__dot {
  position: absolute;
  left: -7px;
  top: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid var(--color-surface);
}

.station-timeline__item.is-start .station-timeline__dot {
  background: var(--color-success);
}

.station-timeline__item.is-end .station-timeline__dot {
  background: var(--color-accent);
}

.station-timeline__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
}

.station-timeline__name {
  font-size: 0.9rem;
  font-weight: 500;
}

.station-timeline__time {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.station-timeline__tag {
  display: inline-block;
  margin-top: var(--space-1);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-success);
  background: #e3f6ee;
  padding: 2px var(--space-2);
  border-radius: var(--radius-pill);
}
</style>
