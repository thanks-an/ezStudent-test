<template>
  <div class="class__list">
    <h2 class="page__title">Lớp</h2>
    <div class="filter__section">
      <div></div>
      <router-link to="/add-class">
        <button class="btn btn--primary">Tạo lớp</button>
      </router-link>
    </div>
    <ClassTable
      :classes="paginatedClasses"
      :offset="(currentPage - 1) * 15"
      @delete="deleteClassWrapper"
    />
    <PaginationControls
      :current-page="currentPage"
      :total-pages="totalPages"
      @prev="prevPage"
      @next="nextPage"
    />
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
import { useClasses } from '@/composables/useClasses'
import ClassTable from './ClassTable.vue'
import PaginationControls from './PaginationControls.vue'

export default {
  components: { ClassTable, PaginationControls },
  setup() {
    const {
      paginatedClasses,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      deleteClassWrapper,
      setupEventListeners,
      cleanupEventListeners,
    } = useClasses()

    onMounted(setupEventListeners)
    onBeforeUnmount(cleanupEventListeners)

    return { paginatedClasses, currentPage, totalPages, nextPage, prevPage, deleteClassWrapper }
  },
}
</script>

<style lang="scss">
@import '@/sass/main.scss';
</style>
