/**
 * Student management composable
 * ES5-compatible implementation where possible
 */

'use strict'

import { ref, computed } from 'vue'
import { getClasses } from '@/services/ClassService'
import { loadStudentsData, saveStudentsData, calculateAge } from './studentDataUtils'
import { filterStudentsByClass } from './studentFilterUtils'
import { generateClassOptions } from './classOptionsUtils'

export function useStudents() {
  var students = ref([])
  var filtered = ref([])
  var selectedClass = ref('')
  var classList = ref([])

  var classOptions = computed(function () {
    return generateClassOptions(classList.value)
  })

  var loadData = function () {
    students.value = loadStudentsData()
    classList.value = getClasses()
    filterStudents()
  }

  var filterStudents = function () {
    filtered.value = filterStudentsByClass(students.value, classList.value, selectedClass.value)
  }

  var deleteStudent = function (id) {
    if (!confirm('Bạn có chắc muốn xoá học sinh này không?')) {
      return
    }

    students.value = students.value.filter(function (student) {
      return student.id !== id
    })

    saveStudentsData(students.value)
    filterStudents()
  }

  return {
    students: students,
    filtered: filtered,
    selectedClass: selectedClass,
    classOptions: classOptions,
    loadData: loadData,
    filterStudents: filterStudents,
    deleteStudent: deleteStudent,
    calculateAge: calculateAge,
  }
}
