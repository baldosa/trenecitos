<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import client from '@/api'
import { getToken } from '@/helpers'
import BackButton from '@/components/BackButton.vue'
import AlertBanner from '@/components/AlertBanner.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'

const route = useRoute()
const router = useRouter()
const ramal = ref(null)

async function getRamales(idGerencia) {
  const authToken = getToken()
  const { data } = await client.GET('/v1/infraestructura/ramales', {
    headers: { authorization: authToken },
    params: { query: { idGerencia } }
  })
  return data
}

function goToTrenes() {
  router.push({
    name: 'trenes',
    query: {
      desde: ramal.value.id_estacion_inicial,
      hasta: ramal.value.id_estacion_final
    }
  })
}

onMounted(async () => {
  const lineaId = parseInt(route.params.id)
  const ramalId = parseInt(route.params.ramalId)
  const ramales = await getRamales(lineaId)
  ramal.value = ramales.find((entry) => entry.id === ramalId) || null
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

      <button type="button" class="pure-button pure-button-primary" @click="goToTrenes">
        Ver próximos trenes
      </button>

      <div v-if="ramal.alerta && ramal.alerta.length > 0" class="ramal-view__alerts">
        <AlertBanner v-for="alert in ramal.alerta" :key="alert.id" :alert="alert" />
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
</style>
