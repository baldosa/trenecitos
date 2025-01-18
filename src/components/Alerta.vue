<script setup>
defineProps({ alerta: Object })
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
</script>
<template>
  <blockquote>
    {{ alerta.contenido }}
    <div>
      <span v-if="alerta.vigencia_desde">
        Desde: {{ dayjs(alerta.vigencia_desde).utc().local().format('YYYY-MM-DD HH:mm') }}
      </span>
      <span v-if="alerta.vigencia_hasta">
        - Hasta: {{ dayjs(alerta.vigencia_hasta).utc().local().format('YYYY-MM-DD HH:mm') }}
      </span>
    </div>
  </blockquote>
</template>
