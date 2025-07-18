// ==========================================================================
// STUDENT LIST LOGIC
// ==========================================================================

import { onMounted, onBeforeUnmount } from 'vue'
import { useStudents } from '@/composables/useStudents'
import { usePagination } from '@/composables/usePagination'

/**
 * Student list component logic
 * @returns {Object} Component data and methods
 */
export function useStudentListLogic() {
  var studentComposable = useStudents()
  var filtered = studentComposable.filtered
  var selectedClass = studentComposable.selectedClass
  var classOptions = studentComposable.classOptions
  var loadData = studentComposable.loadData
  var filterStudents = studentComposable.filterStudents
  var deleteStudent = studentComposable.deleteStudent
  var calculateAge = studentComposable.calculateAge

  var paginationComposable = usePagination(filtered)
  var currentPage = paginationComposable.currentPage
  var paginatedStudents = paginationComposable.paginatedItems
  var totalPages = paginationComposable.totalPages
  var nextPage = paginationComposable.nextPage
  var prevPage = paginationComposable.prevPage
  var resetPage = paginationComposable.resetPage

  var handleFilter = function () {
    filterStudents()
    resetPage()
  }

  onMounted(function () {
    loadData()
    window.addEventListener('classListChanged', loadData)
  })

  onBeforeUnmount(function () {
    window.removeEventListener('classListChanged', loadData)
  })

  return {
    selectedClass: selectedClass,
    classOptions: classOptions,
    paginatedStudents: paginatedStudents,
    currentPage: currentPage,
    totalPages: totalPages,
    nextPage: nextPage,
    prevPage: prevPage,
    handleFilter: handleFilter,
    deleteStudent: deleteStudent,
    calculateAge: calculateAge,
  }
}
