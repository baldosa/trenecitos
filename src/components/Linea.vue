<script setup>
import { defineProps } from 'vue'
import RamalesInfo from './RamalesInfo.vue'

const props = defineProps({
  line: {
    type: Object,
    required: true
  },
  isExpanded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const handleToggle = () => {
  emit('toggle', props.line.id)
}
</script>

<template>
  <div
    class="status-item"
    :class="{ 'expanded': isExpanded }"
    :style="{ borderLeftColor: line.estado.color }"
  >

    <div
      class="status-header"
      @click="handleToggle"
    >
      <div class="status-main">
        <div class="line-info">
          <h3 class="line-name">Línea {{ line.nombre }}</h3>
          <span
            class="status-label"
            :style="{ color: line.estado.color }"
          >
            {{ line.estado.mensaje }}
          </span>
        </div>

        <div
          class="status-details"
          v-if="line.alerta.length > 0"
        >
          <p class="description">{{ line.alerta[0].contenido }}</p>
        </div>
      </div>

      <div
        class="action-indicator"
        :class="{ 'expanded': isExpanded }"
      >
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
    <ramales-info
      v-if="isExpanded"
      :line="line"
      :isExpanded="isExpanded"
    />
  </div>
</template>

<style scoped>
.status-item {
  background: white;
  border-radius: 8px;
  border-left: 4px solid;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.status-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
}

.status-main {
  flex: 1;
}

.line-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.line-name {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.status-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
}

.status-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.description {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.action-indicator {
  padding-left: 0.5rem;
  color: #999;
  transition: transform 0.3s ease;
}

.action-indicator.expanded {
  transform: rotate(180deg);
}

@media (max-width: 600px) {
  .line-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .status-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>