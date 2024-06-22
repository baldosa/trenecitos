<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'
const props = defineProps({ linea: Object })
const router = useRouter()
const backgroundColor = ref(props.linea.estado.color)

function ramales(id) {
  router.push(`/lineas/${id}`)
}
</script>
<template>
  <div class="card info" @click="ramales(linea.id)">
    <p class="title">{{ linea.nombre }}</p>
    <p>{{ linea.estado.mensaje }}</p>
  </div>
</template>

<style scoped>
.card {
  background-color: v-bind('backgroundColor');
}
.title {
  font-weight: bold;
  padding-bottom: 0.1em;
}
</style>
