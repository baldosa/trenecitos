<script setup>
import client from '@/api'
import { getToken } from '@/helpers'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleRamalClick = (ramal) => {
  router.push({
    name: 'trenes',
    query: {
      desde: ramal.id_estacion_inicial,
      hasta: ramal.id_estacion_final
    }
  });
};
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

async function getRamales(lineId) {
  const authToken = getToken();
  const { data } = await client.GET("/v1/infraestructura/ramales", {
    headers: { authorization: authToken },
    params: { query: { idGerencia: lineId } }
  })
  return data
}

const service = ref([])
onMounted(() => {
  getRamales(props.line.id).then((data) => {
    service.value = data
  })
});


</script>

<template>
  <div
    class="expandable-content"
    :class="{ 'expanded': isExpanded }"
  >
    <div class="content-grid">
      <!-- Branch Information Section -->
      <div
        class="branch-section"
        v-if="service"
      >
        <h4 class="section-title">
          <i class="fas fa-code-branch"></i>
          Ramales
        </h4>
        <div
          v-for="ramal in service"
          :key="ramal.id"
          class="branch-card"
        >
          <div
            class="branch-header"
            @click="handleRamalClick(ramal)"
          >
            <h5>{{ ramal.nombre }}</h5>
            <span
              class="branch-tag"
              :class="{ 'active': ramal.operativo }"
            >
              {{ ramal.operativo == 1 ? 'Operativo' : 'No operativo' }}
            </span>
          </div>

          <div class="branch-details">
            <div class="route-info">
              <div class="station-point">
                <i class="fas fa-train"></i>
                <span>{{ ramal.cabecera_inicial.nombre }}</span>
              </div>
              <div class="route-line"></div>
              <div class="station-point">
                <i class="fas fa-flag-checkered"></i>
                <span>{{ ramal.cabecera_final.nombre }}</span>
              </div>
            </div>

            <div class="branch-meta">
              <span class="meta-item">
                <i class="fas fa-map-marker-alt"></i>
                {{ ramal.estaciones }} estaciones
              </span>
            </div>
          </div>

          <!-- Branch Specific Alerts -->
          <div
            v-if="ramal.alerta && ramal.alerta.length > 0"
            class="branch-alerts"
          >
            <div
              v-for="alert in ramal.alerta"
              :key="alert.id"
              class="alert-card"
              :style="{
                backgroundColor: alert.criticidad_color_fondo,
                color: alert.criticidad_color_texto
              }"
            >
              <div class="alert-header">
                <i
                  v-if="alert.icono_fontawesome"
                  :class="['fas', alert.icono_fontawesome]"
                ></i>
                <span>{{ alert.contenido }}</span>
              </div>
              <div class="alert-time">
                Desde: {{ new Date(alert.vigencia_desde).toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- General Line Alerts Section -->
      <div
        class="alerts-section"
        v-if="line.alerta && line.alerta.length > 0"
      >
        <h4 class="section-title">
          <i class="fas fa-exclamation-circle"></i>
          Alertas Generales
        </h4>
        <div
          v-for="alert in line.alerta"
          :key="alert.id"
          class="alert-card"
          :style="{
            backgroundColor: alert.criticidad_color_fondo,
            color: alert.criticidad_color_texto
          }"
        >
          <div class="alert-header">
            <i
              v-if="alert.icono_fontawesome"
              :class="['fas', alert.icono_fontawesome]"
            ></i>
            <span>{{ alert.contenido }}</span>
          </div>
          <div class="alert-time">
            Desde: {{ new Date(alert.vigencia_desde).toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expandable-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background-color: #f8f9fa;
  border-top: 1px solid #eee;
}

.expandable-content.expanded {
  max-height: 2000px;
}

.content-grid {
  padding: 1.5rem;
}

.section-title {
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.branch-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.branch-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.branch-header h5 {
  margin: 0;
  font-size: 1rem;
  color: #2c3e50;
}

.branch-tag {
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: #e74c3c;
  color: white;
}

.branch-tag.active {
  background: #2ecc71;
}

.branch-details {
  padding: 0.5rem 0;
}

.route-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.station-point {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #34495e;
}

.route-line {
  flex: 1;
  height: 2px;
  background: #ddd;
  margin: 0 1rem;
  position: relative;
}

.route-line::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #3498db;
  transform: translateY(-50%);
}

.branch-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #7f8c8d;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.alert-card {
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
}

.alert-header {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.alert-time {
  font-size: 0.85rem;
  opacity: 0.9;
}

@media (max-width: 600px) {
  .branch-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .route-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .route-line {
    width: 2px;
    height: 20px;
    margin: 0.5rem 0 0.5rem 0.7rem;
  }

  .branch-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>