<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Ramal from '../components/Ramal.vue'

const router = useRoute()

const ramales = ref(null)
fetch(`${import.meta.env.VITE_API_URL}/lineas/${router.params.id}/ramales`)
  .then((response) => response.json())
  .then((data) => (ramales.value = data))
</script>

<template>
  <main>
    <div v-for="i in ramales" :key="i.id">
      <ramal :ramal="i" />
    </div>
  </main>
</template>
