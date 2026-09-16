<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IconMenu from './icons/IconMenu.vue'
import IconGithub from './icons/IconGithub.vue'
import IconTrain from './icons/IconTrain.vue'

const isMenuOpen = ref(false)
const router = useRouter()

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function goHome() {
  isMenuOpen.value = false
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <a href="/" class="app-header__brand" @click.prevent="goHome">
        <IconTrain class="app-header__logo" />
        <span>trenecitos</span>
      </a>

      <button
        type="button"
        class="app-header__toggle"
        :class="{ 'is-active': isMenuOpen }"
        @click="toggleMenu"
        aria-label="Abrir menú"
      >
        <IconMenu />
      </button>

      <nav class="app-header__nav" :class="{ 'is-open': isMenuOpen }">
        <a href="/#/docs" class="app-header__link">API</a>
        <a
          href="https://github.com/baldosa/trenecitos"
          class="app-header__link app-header__link--icon"
          aria-label="GitHub"
        >
          <IconGithub />
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  z-index: 100;
}

.app-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
}

.app-header__logo {
  color: var(--color-primary);
  font-size: 1.4rem;
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.app-header__link {
  color: var(--color-muted);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.app-header__link:hover {
  color: var(--color-primary);
}

.app-header__link--icon {
  font-size: 1.2rem;
}

.app-header__toggle {
  display: none;
  background: none;
  border: none;
  color: var(--color-muted);
  font-size: 1.4rem;
  cursor: pointer;
}

@media (max-width: 48em) {
  .app-header__toggle {
    display: block;
  }

  .app-header__nav {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-4);
    gap: var(--space-4);
  }

  .app-header__nav.is-open {
    display: flex;
  }
}
</style>
