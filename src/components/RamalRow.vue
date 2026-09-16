<script setup>
import { useRouter } from 'vue-router'
import AlertBanner from './AlertBanner.vue'
import IconChevronRight from './icons/IconChevronRight.vue'
import IconMapPin from './icons/IconMapPin.vue'

const props = defineProps({
  ramal: {
    type: Object,
    required: true
  },
  lineaId: {
    type: [String, Number],
    required: true
  }
})

const router = useRouter()

function open() {
  router.push({ name: 'ramal', params: { id: props.lineaId, ramalId: props.ramal.id } })
}
</script>

<template>
  <div class="ramal-row card" @click="open">
    <div class="ramal-row__header">
      <h3 class="ramal-row__title">{{ ramal.nombre }}</h3>
      <span class="pill" :class="ramal.operativo ? 'badge-success' : 'badge-muted'">
        {{ ramal.operativo ? 'Operativo' : 'No operativo' }}
      </span>
    </div>

    <div class="ramal-row__route">
      <IconMapPin class="ramal-row__pin" />
      <span>{{ ramal.cabecera_inicial.nombre }}</span>
      <span class="ramal-row__line"></span>
      <span>{{ ramal.cabecera_final.nombre }}</span>
    </div>

    <div class="ramal-row__footer">
      <span class="ramal-row__stations">{{ ramal.estaciones }} estaciones</span>
      <IconChevronRight class="ramal-row__chevron" />
    </div>

    <div v-if="ramal.alerta && ramal.alerta.length > 0" class="ramal-row__alerts" @click.stop>
      <AlertBanner v-for="alert in ramal.alerta" :key="alert.id" :alert="alert" />
    </div>
  </div>
</template>

<style scoped>
.ramal-row {
  padding: var(--space-4);
  margin-bottom: var(--space-3);
  cursor: pointer;
}

.ramal-row:hover {
  border-color: var(--color-primary);
}

.ramal-row__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.ramal-row__title {
  margin: 0;
  font-size: 0.95rem;
}

.ramal-row__route {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.85rem;
  color: var(--color-muted);
  margin-bottom: var(--space-2);
}

.ramal-row__pin {
  flex-shrink: 0;
}

.ramal-row__line {
  flex: 1;
  height: 1px;
  background: var(--color-border);
  min-width: var(--space-4);
}

.ramal-row__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--color-muted);
}

.ramal-row__chevron {
  color: var(--color-muted);
}
</style>
