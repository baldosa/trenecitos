<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import client from '@/api'
import { fetchTrainArrivals } from '@/composables/useTrainArrivals'
import BackButton from '@/components/BackButton.vue'
import AlertBanner from '@/components/AlertBanner.vue'
import TrainCard from '@/components/TrainCard.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'

const route = useRoute()
const ramal = ref(null)
const trainArrivals = ref([])

async function getRamales(idGerencia) {
  const { data } = await client.GET('/v1/infraestructura/ramales', {
    params: { query: { idGerencia } }
  })
  return data
}

onMounted(async () => {
  const lineaId = parseInt(route.params.id)
  const ramalId = parseInt(route.params.ramalId)
  const ramales = await getRamales(lineaId)
  ramal.value = ramales.find((entry) => entry.id === ramalId) || null

  if (ramal.value) {
    trainArrivals.value = await fetchTrainArrivals({
      desde: ramal.value.id_estacion_inicial,
      hasta: ramal.value.id_estacion_final
    })
  }
})
</script>

<template>
  <div class="ramal-view">
    <BackButton :to="{ name: 'linea', params: { id: route.params.id } }" label="Volver" />

    <div v-if="ramal" class="ramal-view__content">
      <div class="ramal-view__header">
        <h1>{{ ramal.nombre }}</h1>
        <span class="pill" :class="ramal.operativo ? 'badge-success' : 'badge-muted'">
          {{ ramal.operativo ? 'Operativo' : 'No operativo' }}
        </span>
      </div>

      <div class="ramal-view__route card">
        <div class="ramal-view__stop">
          <IconMapPin />
          <span>{{ ramal.cabecera_inicial.nombre }}</span>
        </div>
        <span class="ramal-view__connector"></span>
        <div class="ramal-view__stop">
          <IconMapPin />
          <span>{{ ramal.cabecera_final.nombre }}</span>
        </div>
      </div>

      <p class="ramal-view__meta">{{ ramal.estaciones }} estaciones</p>

      <div v-if="ramal.alerta && ramal.alerta.length > 0" class="ramal-view__alerts">
        <AlertBanner v-for="alert in ramal.alerta" :key="alert.id" :alert="alert" />
      </div>

      <div class="ramal-view__trains">
        <h2 class="ramal-view__trains-title">Próximos trenes</h2>
        <p v-if="trainArrivals.results" class="ramal-view__trains-count">
          {{ trainArrivals.total }} servicios encontrados
        </p>
        <div v-if="trainArrivals.results" class="ramal-view__trains-list">
          <TrainCard
            v-for="(tren, index) in trainArrivals.results"
            :key="tren.servicio.id"
            :tren="tren"
            :startId="ramal.id_estacion_inicial"
            :destinationId="ramal.id_estacion_final"
            :isNext="index === 0"
          />
        </div>
        <p v-else class="ramal-view__trains-empty">
          No hay trenes disponibles en este momento
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ramal-view {
  max-width: 700px;
  margin: 0 auto;
}

.ramal-view__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.ramal-view__header h1 {
  margin: 0;
  font-size: 1.4rem;
}

.ramal-view__route {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  margin-bottom: var(--space-3);
}

.ramal-view__stop {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.95rem;
}

.ramal-view__connector {
  flex: 1;
  height: 1px;
  background: var(--color-border);
  min-width: var(--space-5);
}

.ramal-view__meta {
  color: var(--color-muted);
  font-size: 0.9rem;
  margin: 0 0 var(--space-4);
}

.ramal-view__alerts {
  margin-top: var(--space-4);
}

.ramal-view__trains {
  margin-top: var(--space-5);
}

.ramal-view__trains-title {
  margin: 0 0 var(--space-2);
  font-size: 1.1rem;
}

.ramal-view__trains-count {
  color: var(--color-muted);
  font-size: 0.9rem;
  margin: 0 0 var(--space-3);
}

.ramal-view__trains-empty {
  text-align: center;
  padding: var(--space-5) var(--space-4);
  color: var(--color-muted);
}
</style>
