<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <figure>
      <img src="/logo.png" />
    </figure>
  </header>
  <main class="container">
    <RouterView />
  </main>
  <footer>
    <nav>
      <ul>
        <li class="float-right">
          <a href="https://github.com/baldosa/trenecitos" target="_blank">Github</a>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style>
body {
  padding-top: 0;
}
figure {
  margin: 0;
}
</style>
