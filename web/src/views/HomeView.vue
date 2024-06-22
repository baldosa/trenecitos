<script setup>
import { ref } from 'vue'
import Linea from '../components/Linea.vue'
import SearchBox from '../components/SearchBox.vue'

const service = ref(null)
fetch(`${import.meta.env.VITE_API_URL}/lineas`)
  .then((response) => response.json())
  .then((data) => (service.value = data))
console.log(import.meta.env.VITE_API_URL)
</script>

<template>
  <div>
    <search-box />
    <div v-for="i in service" :key="i.id">
      <linea :linea="i" />
    </div>
  </div>
</template>
