<script setup lang="ts">
import InfoLinea from '../components/InfoLinea.vue'
import SearchBox from '../components/SearchBox.vue'
</script>

<template>
  <div class="home-view">
    <section class="home-view__hero">
      <p class="home-view__eyebrow">Transporte ferroviario</p>
      <h1 class="home-view__title">¿Cuándo viene mi tren?</h1>
      <p class="home-view__subtitle">
        Buscá tu viaje y mirá los próximos trenes, horarios y estaciones.
      </p>
    </section>

    <search-box />
    <info-linea />
  </div>
</template>

<style scoped>
.home-view__hero {
  max-width: 850px;
  margin: 0 auto var(--space-5);
  text-align: center;
}

.home-view__eyebrow {
  margin: 0 0 var(--space-2);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.home-view__title {
  margin: 0 0 var(--space-3);
  font-size: 2rem;
  line-height: 1.15;
}

.home-view__subtitle {
  margin: 0;
  color: var(--color-muted);
  font-size: 1rem;
}

@media (min-width: 48em) {
  .home-view__hero {
    text-align: left;
  }

  .home-view__title {
    font-size: 2.5rem;
  }
}
</style>
