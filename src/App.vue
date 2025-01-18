<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <figure>
      <a href="/">
        <img src="/logo.png" />
      </a>
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
