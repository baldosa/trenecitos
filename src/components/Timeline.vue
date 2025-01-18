<script setup>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const props = defineProps({ estaciones: Array })

</script>
<template>

  <blockquote v-for="e in estaciones"
    :class="`${(e.mark) ? 'hint' : (dayjs(e.llegada).diff(dayjs().local().format()) > 0) ? 'ok' : 'warn'}`">
    {{ e.estacion }} | {{ dayjs(e.llegada).utc().local().format('YYYY-MM-DD HH:mm') }}
  </blockquote>


</template>

<style scoped>
.warn {
  text-decoration: line-through;
}

.ok {
  background-color: rgba(186, 201, 209, 0.582);
  border-left: 0.4rem solid rgba(71, 163, 216, 0.651);
}
</style>
