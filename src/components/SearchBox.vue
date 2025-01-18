<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const desde = ref(null)
const hasta = ref(null)
let estaciones = reactive([])

fetch(`${import.meta.env.VITE_API_URL}/estaciones`)
  .then((response) => response.json())
  .then((data) => (estaciones = data))

function search() {
  const desdeId = estaciones.find((u) => u.nombre === desde.value).id
  const hastaId = estaciones.find((u) => u.nombre === hasta.value).id
  router.push(`/trenes/?desde=${desdeId}&hasta=${hastaId}`)
}
</script>

<template>
  <fieldset>
    <div class="row">
      <div class="col-6">
        <label for="estacion-desde">¿Desde dónde?</label>
        <input
          type="text"
          id="desde"
          name="desde"
          list="desde-list"
          v-model="desde"
          placeholder="comenzá a tipear..."
        />
        <datalist id="desde-list">
          <option v-for="i in estaciones">{{ i.nombre }}</option>
        </datalist>
      </div>
      <div class="col-6">
        <label for="estacion-hasta">¿Hasta dónde?</label>
        <input type="text" id="hasta" name="hasta" list="hasta-list" v-model="hasta" />
        <datalist id="hasta-list">
          <option v-for="i in estaciones">{{ i.nombre }}</option>
        </datalist>
      </div>
    </div>
    <div class="row">
      <div class="col-4"><button type="submit" @click="search">Buscar</button></div>
    </div>
  </fieldset>
</template>
