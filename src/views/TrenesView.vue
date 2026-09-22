<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TrainCard from '@/components/TrainCard.vue'
import BackButton from '@/components/BackButton.vue'
import IconSwap from '@/components/icons/IconSwap.vue'
import { fetchTrainArrivals } from '@/composables/useTrainArrivals'
const routerQuery = useRoute()
const router = useRouter()
const formData = ref({})
const searchData = ref({})

const trainArrivals = ref([])

const searchStations = async () => {
  return fetchTrainArrivals({
    desde: searchData.value.desde,
    hasta: searchData.value.hasta,
    tipoBusqueda: formData.value.searchType,
    fecha: formData.value.selectedDate,
    hora: formData.value.selectedTime
  })
}

const reverseSearch = async () => {
  const desde = searchData.value.desde
  searchData.value.desde = searchData.value.hasta
  searchData.value.hasta = desde
  formData.value = {
    ...formData.value,
    desde: formData.value.hasta,
    hasta: formData.value.desde
  }
  router.replace({
    name: 'trenes',
    query: {
      ...routerQuery.query,
      desde: searchData.value.desde,
      hasta: searchData.value.hasta
    }
  })
  trainArrivals.value = await searchStations()
}

onMounted(async () => {
  // The URL is now the single source of truth for what search this page
  // shows (desde/hasta plus the optional date/time/tipoBusqueda), so a
  // copied or bookmarked link reproduces the same results. formData only
  // carries the search *parameters* here (station objects get their
  // .nombre backfilled below once the first result loads); searchData
  // only ever needs the two station ids.
  searchData.value = {
    desde: routerQuery.query.desde,
    hasta: routerQuery.query.hasta
  }
  formData.value = {
    desde: {},
    hasta: {},
    searchType: routerQuery.query.tipoBusqueda,
    selectedDate: routerQuery.query.fecha,
    selectedTime: routerQuery.query.hora
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
  <div class="trenes-view">
    <BackButton to="home" label="Volver" />

    <div class="trenes-view__header">
      <h1 v-if="formData.desde?.nombre" class="trenes-view__title">
        {{ formData.desde?.nombre }} <span class="trenes-view__arrow">→</span> {{ formData.hasta?.nombre }}
      </h1>
      <button type="button" class="icon-btn" @click="reverseSearch" aria-label="Invertir búsqueda">
        <IconSwap />
      </button>
    </div>

    <div class="trenes-view__meta">
      <span class="pill badge-muted">Hoy</span>
      <span class="pill badge-muted">Ahora</span>
    </div>

    <p v-if="trainArrivals.results" class="trenes-view__count">
      {{ trainArrivals.total }} servicios encontrados
    </p>

    <div v-if="trainArrivals.results" class="trenes-view__list">
      <TrainCard
        v-for="(tren, index) in trainArrivals.results"
        :key="tren.servicio.id"
        :tren="tren"
        :startId="parseInt(searchData.desde)"
        :destinationId="parseInt(searchData.hasta)"
        :isNext="index === 0"
      />
    </div>
    <div v-else class="trenes-view__empty">
      No hay trenes disponibles en este momento
    </div>
  </div>
</template>

<style scoped>
.trenes-view {
  max-width: 700px;
  margin: 0 auto;
}

.trenes-view__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.trenes-view__title {
  margin: 0;
  font-size: 1.3rem;
}

.trenes-view__arrow {
  color: var(--color-muted);
}

.trenes-view__meta {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.trenes-view__count {
  color: var(--color-muted);
  font-size: 0.9rem;
  margin: 0 0 var(--space-3);
}

.trenes-view__empty {
  text-align: center;
  padding: var(--space-6) var(--space-4);
  color: var(--color-muted);
}
</style>
