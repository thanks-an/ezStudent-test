<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const currentSection = computed(() => route.meta?.section || 'students')
</script>

<template>
  <div class="app">
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title"><b>ezStudy</b> - Bài tập 1</h1>
        <nav class="app-nav">
          <RouterLink to="/students" class="nav-link" :class="{ 'router-link-active': currentSection === 'students' }">Học sinh</RouterLink>
          <!-- Ẩn tab Lớp trong bài tập 1 -->
        </nav>
      </header>
      <main class="app-main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style src="@/assets/app-styles.css"></style>
