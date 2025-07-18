import { ref, computed } from 'vue'
import { getClasses } from '@/services/ClassService'

export function useStudents() {
  const students = ref([])
  const filtered = ref([])
  const selectedClass = ref('')
  const classList = ref([])

  const classOptions = computed(() => {
    const options = []
    classList.value
      .filter((cls) => !cls.parentId)
      .forEach((rootClass) => {
        options.push({ label: rootClass.name, value: rootClass.name })
        classList.value
          .filter((cls) => cls.parentId === rootClass.id)
          .forEach((childClass) => {
            options.push({ label: `----${childClass.name}`, value: childClass.name })
          })
      })
    return options
  })

  const loadData = () => {
    const studentsRaw = localStorage.getItem('students')
    students.value = studentsRaw ? JSON.parse(studentsRaw) : []
    classList.value = getClasses()
    filterStudents()
  }

  const filterStudents = () => {
    if (!selectedClass.value) {
      // Array spread ES5 style
      filtered.value = students.value.slice()
    } else {
      var selectedClassObj = null
      var classes = classList.value

      for (var i = 0; i < classes.length; i++) {
        if (classes[i].name === selectedClass.value) {
          selectedClassObj = classes[i]
          break
        }
      }

      if (selectedClassObj && selectedClassObj.parentId) {
        // Filter students ES5 style
        var result = []
        for (var j = 0; j < students.value.length; j++) {
          if (students.value[j].class === selectedClass.value) {
            result.push(students.value[j])
          }
        }
        filtered.value = result
      } else {
        // Find child classes ES5 style
        var childClasses = []
        for (var k = 0; k < classes.length; k++) {
          if (classes[k].parentId === (selectedClassObj ? selectedClassObj.id : null)) {
            childClasses.push(classes[k])
          }
        }

        var classNames = selectedClassObj ? [selectedClassObj.name] : []
        for (var l = 0; l < childClasses.length; l++) {
          classNames.push(childClasses[l].name)
        }

        var filteredResult = []
        for (var m = 0; m < students.value.length; m++) {
          var student = students.value[m]
          for (var n = 0; n < classNames.length; n++) {
            if (student.class === classNames[n]) {
              filteredResult.push(student)
              break
            }
          }
        }
        filtered.value = filteredResult
      }
    }
  }

  const deleteStudent = (id) => {
    if (!confirm('Bạn có chắc muốn xoá học sinh này không?')) return
    students.value = students.value.filter((s) => s.id !== id)
    localStorage.setItem('students', JSON.stringify(students.value))
    filterStudents()
  }

  const calculateAge = (dob) => (dob ? new Date().getFullYear() - new Date(dob).getFullYear() : '')

  return {
    students,
    filtered,
    selectedClass,
    classOptions,
    loadData,
    filterStudents,
    deleteStudent,
    calculateAge,
  }
}
