<script setup>
import { ref, onMounted } from 'vue'
import client from '@/api'
import { getToken } from '@/helpers'
import LineCard from './LineCard.vue'

const lineas = ref([])

async function getLineas() {
  const authToken = getToken();
  const { data } = await client.GET("/v1/infraestructura/gerencias", {
    headers: { authorization: authToken }
  })
  return data
}

onMounted(() => {
  getLineas().then((data) => {
    lineas.value = data
  })
});
</script>

<template>
  <div class="lineas-list">
    <h2 class="lineas-list__title">Líneas</h2>
    <LineCard v-for="linea in lineas" :key="linea.id" :linea="linea" />
  </div>
</template>

<style scoped>
.lineas-list {
  max-width: 800px;
  margin: var(--space-6) auto 0;
}

.lineas-list__title {
  margin: 0 0 var(--space-3);
  font-size: 1.2rem;
}
</style>
