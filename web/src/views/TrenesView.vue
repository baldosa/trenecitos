<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import tren from '../components/Tren.vue'

const routerQuery = useRoute()
const router = useRouter()

const trenes = ref(null)
fetch(`${import.meta.env.VITE_API_URL}/trenes?desde=${routerQuery.query.desde}&hasta=${routerQuery.query.hasta}`)
  .then((response) => response.json())
  .then((data) => (trenes.value = data['trenes']))

const desde = ref(null)
const hasta = ref(null)
fetch(`${import.meta.env.VITE_API_URL}/estaciones/${routerQuery.query.desde}`)
  .then((response) => response.json())
  .then((data) => (desde.value = data[0]))
fetch(`${import.meta.env.VITE_API_URL}/estaciones/${routerQuery.query.hasta}`)
  .then((response) => response.json())
  .then((data) => (hasta.value = data[0]))

async function invert() {
  await router.push(`/trenes/?desde=${routerQuery.query.hasta}&hasta=${routerQuery.query.desde}`)
  router.go(0)
}

</script>

<template>
  <main>
    <h2>
      Trenes de {{ desde.nombre }} a {{ hasta.nombre }}
      <a @click="invert"><img src="https://icongr.am/fontawesome/sort.svg?size=30&color=#000" /></a>
    </h2>
    <div v-for="i in trenes" :key="i.servicio.id_servicio">
      <tren :tren="i" />
    </div>
  </main>
</template>
