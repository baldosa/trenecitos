<script setup>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
import Timeline from '../components/Timeline.vue'
import Map from '../components/Map.vue'

import { ref } from 'vue'
defineProps({ tren: Object })
const showDetails = ref(false)
const showMap = ref(false)


</script>
<template>
  <div :class="`card ${(tren.servicio.cancelacion) ? 'warn' : 'info'}`">
    <p class="title">
      Salida: {{ dayjs(tren.arribo.salida_estacion).utc().local().format('YYYY-MM-DD HH:mm') }}
    </p>
    <div>
      <div>Ramal: {{ tren.servicio.ramal }} </div>
      <div>
        Llegada a estación:
        {{ dayjs(tren.arribo.llegada_estacion).utc().local().format('YYYY-MM-DD HH:mm') }}
      </div>
      <div>Andén: {{ tren.arribo.nro_anden }}</div>
      <div v-if="tren.servicio.cancelacion">Estado: Cancelado </div>
    </div>
    <footer>
      <button type="button" @click="showDetails = !showDetails">Detalle</button>
      <!-- <button type="button" @click="showMap = !showMap">Ubicación</button> -->
      <div>
        <timeline v-if="showDetails" :estaciones="tren['estaciones']" />
      </div>
      <!-- <div>
        <Map v-if="showMap" :location="tren['servicio']['location']" />
      </div> -->
    </footer>
  </div>
</template>

<style scoped>
.title {
  font-weight: bold;
  padding-bottom: 0.1em;
}
</style>
