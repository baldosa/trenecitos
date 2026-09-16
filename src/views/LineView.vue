<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import client from '@/api'
import { getToken } from '@/helpers'
import { lineColor } from '@/helpers/lineColors'
import BackButton from '@/components/BackButton.vue'
import RamalRow from '@/components/RamalRow.vue'
import AlertBanner from '@/components/AlertBanner.vue'

const route = useRoute()
const linea = ref(null)
const ramales = ref([])

async function getLineas() {
  const authToken = getToken()
  const { data } = await client.GET('/v1/infraestructura/gerencias', {
    headers: { authorization: authToken }
  })
  return data
}

async function getRamales(idGerencia) {
  const authToken = getToken()
  const { data } = await client.GET('/v1/infraestructura/ramales', {
    headers: { authorization: authToken },
    params: { query: { idGerencia } }
  })
  return data
}

onMounted(async () => {
  const id = parseInt(route.params.id)
  const lineas = await getLineas()
  linea.value = lineas.find((entry) => entry.id === id) || null
  ramales.value = await getRamales(id)
})
</script>

<template>
  <div class="linea-view">
    <BackButton to="home" label="Volver" />

    <div v-if="linea" class="linea-view__header">
      <div class="linea-view__title-row">
        <span class="dot" :style="{ backgroundColor: lineColor(linea.nombre) }"></span>
        <h1>{{ linea.nombre }}</h1>
      </div>
      <span v-if="linea.estado?.mensaje" class="linea-view__status" :style="{ color: linea.estado.color }">
        {{ linea.estado.mensaje }}
      </span>
    </div>

    <div v-if="linea?.alerta?.length" class="linea-view__alerts">
      <AlertBanner v-for="alert in linea.alerta" :key="alert.id" :alert="alert" />
    </div>

    <div class="linea-view__ramales">
      <RamalRow
        v-for="ramal in ramales"
        :key="ramal.id"
        :ramal="ramal"
        :lineaId="route.params.id"
      />
    </div>
  </div>
</template>

<style scoped>
.linea-view {
  max-width: 800px;
  margin: 0 auto;
}

.linea-view__header {
  margin-bottom: var(--space-4);
}

.linea-view__title-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.linea-view__title-row h1 {
  margin: 0;
  font-size: 1.5rem;
}

.linea-view__status {
  display: inline-block;
  margin-top: var(--space-1);
  font-size: 0.9rem;
  font-weight: 500;
}

.linea-view__alerts {
  margin-bottom: var(--space-4);
}
</style>
