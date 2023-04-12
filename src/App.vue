<script setup>
import { ref, computed } from 'vue'
import Login from './components/Pages/Login/Login.vue'
import Registration from './components/Pages/Registration/Registration.vue'
import MainPage from './components/Pages/Main/Main.vue'


const routes = {
  '/': Login,
  'registration': Registration,
  'main': MainPage,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']
})
</script>

<template>
  <component :is="currentView" />
</template>
