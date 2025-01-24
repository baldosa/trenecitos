<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Tren from '@/components/Tren.vue'
const routerQuery = useRoute()
const router = useRouter()
const formData = ref({})
const searchData = ref({})

const trainArrivals = ref([])

import client from '@/api'
import { getToken } from '@/helpers'


const searchStations = async () => {
  const authToken = getToken();
  const { data } = await client.GET("/v1/arribos/estacion/{id}", {
    headers: { authorization: authToken },
    params: {
      path: { id: parseInt(searchData.value.desde) },
      query: { hasta: parseInt(searchData.value.hasta) }
    }
  })
  return data
}

const reverseSearch = async () => {
  const desde = searchData.value.desde
  searchData.value.desde = searchData.value.hasta
  searchData.value.hasta = desde
  formData.value = {
    desde: formData.value.hasta,
    hasta: formData.value.desde
  }
  trainArrivals.value = await searchStations()
}

onMounted(async () => {
  if (routerQuery.query.desde && routerQuery.query.hasta) {
    searchData.value = {
      desde: routerQuery.query.desde,
      hasta: routerQuery.query.hasta
    }
    formData.value = { desde: {}, hasta: {} }
  } else {

    // Retrieve the serialized data
    const serializedData = sessionStorage.getItem('formData')

    if (serializedData) {
      try {
        formData.value = JSON.parse(serializedData)
        searchData.value = {
          desde: formData.value.desde.id_estacion,
          hasta: formData.value.hasta.id_estacion,
        }
      } catch (e) {
        console.error('Error parsing form data:', e)
      }
    }
  }
  trainArrivals.value = await searchStations()
  if (trainArrivals.value.total > 0 && !formData.value.desde?.nombre) {
    trainArrivals.value.results[0].servicio.estaciones.map((estacion) => {
      if (estacion.idElemento === parseInt(searchData.value.desde)) {
        formData.value.desde.nombre = estacion.nombre
      }
      if (estacion.idElemento === parseInt(searchData.value.hasta)) {
        formData.value.hasta.nombre = estacion.nombre
      }
    })
  }
})


</script>
<template>
  <main class="pure-g">
    <div class="pure-u-1 pure-u-md-1-6"></div>
    <div class="pure-u-1 pure-u-md-2-3">
      <h2 v-if="formData.desde?.nombre">
        Trenes de {{ formData.desde?.nombre }} a {{ formData.hasta?.nombre }} <span @click="reverseSearch">🔃</span>
      </h2>
      <div
        v-if="trainArrivals.results"
        class="pure-u-1"
      >
        <Tren
          v-for="tren in trainArrivals.results"
          :key="tren.servicio.id"
          :tren="tren"
          :startId="parseInt(searchData.desde)"
          :destinationId="parseInt(searchData.hasta)"
        />
      </div>
      <div
        v-else
        class="no-trains"
      >
        No hay trenes disponibles en este momento
      </div>
    </div>
    <div class="pure-u-1 pure-u-md-1-6"></div>
  </main>
</template>

<style scoped>
.trains-list {
  padding: 1rem;
  align-items: center;
}

.no-trains {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>