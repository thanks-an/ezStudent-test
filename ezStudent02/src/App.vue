<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const currentSection = computed(() => {
  return route.meta?.section || 'students'
})
</script>

<template>
  <div class="app">
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title"><b>ezStudy</b></h1>
        <nav class="app-nav">
          <RouterLink
            to="/students"
            class="nav-link"
            :class="{ 'router-link-active': currentSection === 'students' }"
          >
            Học sinh
          </RouterLink>
          <RouterLink
            to="/classes"
            class="nav-link"
            :class="{ 'router-link-active': currentSection === 'classes' }"
          >
            Lớp
          </RouterLink>
        </nav>
      </header>
      <main class="app-main">
        <RouterView />
      </main>
    </div>
  </div>
</template>


<style scoped>
.app {
  font-family: Arial, sans-serif;
  font-size: 14px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: white;
  min-height: 100vh;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.app-header {
  background-color: #ffffff;
  border-bottom: 2px solid #e9ecef;
  padding: 1.5rem 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.app-title {
  margin: 0 0 0.8rem 0;
  font-size: 20px;
  color: #333;
}

.app-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #007bff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #e9ecef;
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background-color: #007bff;
  color: white;
  box-shadow: 0 2px 4px rgba(0,123,255,0.3);
}

.app-main {
  padding: 2rem 1rem;
  min-height: calc(100vh - 120px);
}
</style>
