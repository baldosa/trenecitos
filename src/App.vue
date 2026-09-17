<script setup>
import { onBeforeMount, ref } from 'vue'
import { RouterView } from 'vue-router'
import { ensureToken } from '@/auth'
import AppHeader from '@/components/AppHeader.vue'

const status = ref('loading') // 'loading' | 'ready' | 'error'

async function bootstrap() {
  status.value = 'loading'
  try {
    await ensureToken()
    status.value = 'ready'
  } catch (err) {
    console.error('No se pudo iniciar sesión:', err)
    status.value = 'error'
  }
}

onBeforeMount(bootstrap)
</script>

<template>
  <AppHeader />
  <main class="app-content">
    <div v-if="status === 'loading'" class="app-status">
      Cargando…
    </div>
    <div v-else-if="status === 'error'" class="app-status">
      <p>No pudimos conectar con el servicio.</p>
      <button type="button" class="pure-button pure-button-primary" @click="bootstrap">
        Reintentar
      </button>
    </div>
    <RouterView v-else />
  </main>
</template>

<style scoped>
.app-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: calc(60px + var(--space-5)) var(--space-4) var(--space-6);
}

.app-status {
  text-align: center;
  padding: var(--space-6) var(--space-4);
  color: var(--color-muted);
}
</style>
