<script setup>
import { onBeforeMount, ref } from 'vue'
import { RouterView } from 'vue-router'
import { genUser, genPasswd, isTokenExpired, getToken, storeToken } from '@/helpers'
import client from '@/api'
import AppHeader from '@/components/AppHeader.vue'

const isAuthenticated = ref(false)

async function login() {
  let authToken = getToken()
  if (authToken === null || isTokenExpired(authToken)) {
    const user = genUser()
    const passwd = genPasswd(user)
    const { data } = await client.POST('/v1/auth/authorize', {
      body: { username: user, password: passwd }
    })
    storeToken(data['token'])
    isAuthenticated.value = true
  } else {
    isAuthenticated.value = true
  }
}

onBeforeMount(() => login())
</script>

<template>
  <AppHeader />
  <main class="app-content">
    <RouterView v-if="isAuthenticated" />
  </main>
</template>

<style scoped>
.app-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: calc(60px + var(--space-5)) var(--space-4) var(--space-6);
}
</style>
