<template>
  <div class="student-list">
    <h2 class="page-title">Học sinh</h2>
    <StudentFilter v-model="selectedClass" :class-options="classOptions" @filter="handleFilter" />
    <StudentTable :students="paginatedStudents" :offset="(currentPage - 1) * 15" :calculate-age="calculateAge" @delete="deleteStudent" />
    <PaginationControls :current-page="currentPage" :total-pages="totalPages" @prev="prevPage" @next="nextPage" />
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
import { useStudents } from '@/composables/useStudents'
import { usePagination } from '@/composables/usePagination'
import StudentFilter from './StudentFilter.vue'
import StudentTable from './StudentTable.vue'
import PaginationControls from './PaginationControls.vue'

export default {
  components: { StudentFilter, StudentTable, PaginationControls },
  setup() {
    const { filtered, selectedClass, classOptions, loadData, filterStudents, deleteStudent, calculateAge } = useStudents()
    const { currentPage, paginatedItems: paginatedStudents, totalPages, nextPage, prevPage, resetPage } = usePagination(filtered)

    const handleFilter = () => { filterStudents(); resetPage() }

    onMounted(() => { loadData(); window.addEventListener('classListChanged', loadData) })
    onBeforeUnmount(() => window.removeEventListener('classListChanged', loadData))

    return { selectedClass, classOptions, paginatedStudents, currentPage, totalPages, nextPage, prevPage, handleFilter, deleteStudent, calculateAge }
  }
}
</script>

<style src="@/assets/student-styles.css"></style>
