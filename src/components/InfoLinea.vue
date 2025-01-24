<script setup>

import { ref } from 'vue'
import { onMounted } from 'vue';
import client from '@/api'
import { getToken } from '@/helpers'

import Linea from './Linea.vue'


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


const expandedLines = ref(new Set())


const toggleExpand = (lineId) => {
  if (expandedLines.value.has(lineId)) {
    expandedLines.value.delete(lineId)
  } else {
    expandedLines.value.add(lineId)
  }
}

const isExpanded = (lineId) => expandedLines.value.has(lineId)
</script>

<template>
  <div class="status-list">
    <linea
      v-for="line in lineas"
      :key="line.id"
      :line="line"
      :isExpanded="isExpanded(line.id)"
      @toggle="toggleExpand"
    />
  </div>
</template>

<style scoped>
.status-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
</style>