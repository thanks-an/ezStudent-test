<template>
  <div class="student-list">
    <h2 class="page-title">Học sinh</h2>
    <StudentFilter v-model="selectedClass" :class-options="classOptions" @filter="handleFilter" />
    <StudentTable
      :students="paginatedStudents"
      :offset="(currentPage - 1) * 15"
      :calculate-age="calculateAge"
      @delete="deleteStudent"
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
import { useStudentListLogic } from '@/composables/useStudentListLogic'
import StudentFilter from './StudentFilter.vue'
import StudentTable from './StudentTable.vue'
import PaginationControls from './PaginationControls.vue'

export default {
  name: 'StudentList',
  components: {
    StudentFilter,
    StudentTable,
    PaginationControls,
  },
  setup: function () {
    return useStudentListLogic()
  },
}
</script>

<style src="@/assets/student-styles.css"></style>
