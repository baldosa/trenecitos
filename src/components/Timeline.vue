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
  <div class="timeline pure-g">
    <div class="pure-u-1">
      <div
        class="timeline-item"
        v-for="item in items"
        :key="item.nombre"
      >
        <div
          class="timeline-content"
          :class="item.id == startId ? 'timeline-content-start' : item.id == destinationId ? 'timeline-content-end' : ''"
        >
          <div class="pure-g">
            <div class="pure-u-3-4">
              <h3 class="pure-u-1">{{ item.nombre }}</h3>
            </div>
            <div class="pure-u-1-4 pure-right">
              <span>{{ item.llegada !== 'Invalid Date' ? item.llegada : item.salida }}</span>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>
.timeline {
  max-width: 600px;
  margin: 0 auto;
}

.timeline-item {
  position: relative;
  padding-left: 30px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background: #e0e0e0;
}

.timeline-item::after {
  content: '';
  position: absolute;
  left: -4px;
  top: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3b82f6;
  transition: transform 0.3s ease;
}

.timeline-item:hover::after {
  transform: scale(1.5);
}

.timeline-content {
  margin: 1em 0;
  background: #f3f4f6;
  padding: 0.75em 1em;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.timeline-content:hover {
  transform: translateX(5px);
}

.timeline-description {
  margin-top: 0.5em;
}

.timeline-content-end {
  background: #a2cfae;
}

.timeline-content-start {
  background: #a5b5cc;
}
</style>