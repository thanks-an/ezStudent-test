<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { currentConfig } from '@/config/appConfig.js'

const route = useRoute()
const currentSection = computed(() => route.meta?.section || 'students')
</script>

<template>
  <div class="app">
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title">
          <b>{{ currentConfig.title }}</b>
        </h1>
        <nav class="app-nav">
          <RouterLink
            to="/students"
            class="nav-link"
            :class="{ 'router-link-active': currentSection === 'students' }"
            >Học sinh</RouterLink
          >
          <RouterLink
            v-if="currentConfig.features.classes"
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

<style src="@/assets/app-styles.css"></style>
