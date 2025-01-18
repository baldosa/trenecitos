<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'
import Alerta from '../components/Alerta.vue'
const props = defineProps({ ramal: Object })
const router = useRouter()

const fontColor = ref(props.ramal.alerta ? props.ramal.alerta[0].criticidad_color_texto : '#000')
const backgroundColor = ref(props.ramal.alerta ? props.ramal.alerta[0].criticidad_color_fondo : '#FFF')



function trenes(desde, hasta) {
  router.push(`/trenes/?desde=${desde}&hasta=${hasta}`)
}
</script>
<template>
  <div class="card info" @click="trenes(ramal.cabecera_inicial.id, ramal.cabecera_final.id)">
    <p class="title">{{ ramal.nombre }}</p>
    <p v-if="ramal.alerta !== null">
    <ul v-for="a in ramal.alerta" :key="a">
      <alerta :alerta="a" />
    </ul>
    </p>
  </div>
</template>

<style scoped>
.card {
  background-color: v-bind('backgroundColor');
}

ul {
  color: v-bind('fontColor');

}

.title {
  font-weight: bold;
  padding-bottom: 0.1em;
}
</style>
