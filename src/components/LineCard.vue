<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import client from '@/api'
import { getToken } from '@/helpers'
import { lineColor } from '@/helpers/lineColors'
import IconChevronRight from './icons/IconChevronRight.vue'

const props = defineProps({
  linea: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const ramales = ref([])

async function getRamales(idGerencia) {
  const authToken = getToken()
  const { data } = await client.GET('/v1/infraestructura/ramales', {
    headers: { authorization: authToken },
    params: { query: { idGerencia } }
  })
  return data
}

onMounted(() => {
  getRamales(props.linea.id).then((data) => {
    ramales.value = data
  })
})

const subtitle = computed(() => {
  const names = new Set()
  ramales.value.forEach((ramal) => {
    if (ramal.cabecera_inicial?.nombre) names.add(ramal.cabecera_inicial.nombre)
    if (ramal.cabecera_final?.nombre) names.add(ramal.cabecera_final.nombre)
  })
  return Array.from(names).slice(0, 3).join(' · ')
})

function open() {
  router.push({ name: 'linea', params: { id: props.linea.id } })
}
</script>

<template>
  <div class="line-card card" @click="open">
    <span class="dot" :style="{ backgroundColor: lineColor(linea.nombre) }"></span>
    <div class="line-card__body">
      <h3 class="line-card__name">{{ linea.nombre }}</h3>
      <p v-if="subtitle" class="line-card__subtitle">{{ subtitle }}</p>
    </div>
    <IconChevronRight class="line-card__chevron" />
  </div>
</template>

<style scoped>
.line-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  margin-bottom: var(--space-3);
  cursor: pointer;
}

.line-card:hover {
  border-color: var(--color-primary);
}

.line-card__body {
  flex: 1;
  min-width: 0;
}

.line-card__name {
  margin: 0;
  font-size: 1rem;
}

.line-card__subtitle {
  margin: var(--space-1) 0 0;
  font-size: 0.85rem;
  color: var(--color-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-card__chevron {
  color: var(--color-muted);
  flex-shrink: 0;
}
</style>
