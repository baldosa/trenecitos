<script setup>
import IconAlert from './icons/IconAlert.vue'

defineProps({
  alert: {
    type: Object,
    required: true
  }
})

function formatDate(iso) {
  return new Date(iso).toLocaleString('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}
</script>

<template>
  <div
    class="alert-banner"
    :style="{
      backgroundColor: alert.criticidad_color_fondo,
      color: alert.criticidad_color_texto
    }"
  >
    <IconAlert class="alert-banner__icon" />
    <div class="alert-banner__body">
      <p class="alert-banner__text">{{ alert.contenido }}</p>
      <span v-if="alert.vigencia_desde" class="alert-banner__time">
        Desde: {{ formatDate(alert.vigencia_desde) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.alert-banner {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  margin-top: var(--space-2);
}

.alert-banner__icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.alert-banner__text {
  margin: 0;
  font-size: 0.9rem;
}

.alert-banner__time {
  font-size: 0.8rem;
  opacity: 0.85;
}
</style>
