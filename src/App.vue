<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue'

import { RouterView } from 'vue-router'
import { genUser, genPasswd, isTokenExpired, getToken, storeToken } from '@/helpers'
import client from '@/api'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

async function login() {

  let authToken = getToken()
  if ((authToken === null) || isTokenExpired(authToken)) {
    const user = genUser()
    const passwd = genPasswd(user)
    const { data } = await client.POST("/v1/auth/authorize", {
      body: { username: user, password: passwd }
    })
    storeToken(data['token'])
  }
}
onMounted(() => login());
</script>

<template>
  <div class="pure-menu pure-menu-horizontal pure-menu-fixed custom-navbar">
    <div class="navbar-container">
      <!-- Left side - Brand -->
      <a
        href="/"
        class="pure-menu-heading"
      >
        <img
          src="/logo.png"
          alt="Logo"
          width="60"
        />
      </a>

      <!-- Mobile menu button -->
      <button
        class="pure-button custom-toggle"
        @click="toggleMenu"
        :class="{ 'active': isMenuOpen }"
      >
        <i class="fas fa-bars"></i>
      </button>

      <!-- Right side - Navigation -->
      <ul
        class="pure-menu-list"
        :class="{ 'show-menu': isMenuOpen }"
      >
        <li class="pure-menu-item">
          <a
            href="#/docs"
            class="pure-menu-link"
          >API</a>
        </li>
        <li class="pure-menu-item">
          <a
            href="https://github.com/baldosa/trenecitos"
            class="pure-menu-link"
          >
            <i class="fab fa-github"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>

  <!-- Main content -->
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
.custom-navbar {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.pure-menu-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: #333;
  text-decoration: none;
  padding: 0;
  margin: 0;
}

.pure-menu-list {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.pure-menu-link {
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.pure-menu-link:hover {
  background-color: #f5f5f5;
  color: #333;
}

.custom-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #666;
}

.custom-toggle:hover {
  color: #333;
}

.content {
  max-width: 1200px;
  margin: 80px auto 0;
  padding: 0 1rem;
}

/* Mobile styles */
@media (max-width: 48em) {
  .custom-toggle {
    display: block;
  }

  .pure-menu-list {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .pure-menu-list.show-menu {
    display: flex;
  }

  .pure-menu-item {
    width: 100%;
  }

  .pure-menu-link {
    width: 100%;
    display: block;
    text-align: center;
  }
}
</style>