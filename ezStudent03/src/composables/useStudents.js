import { ref, computed } from 'vue'
import { getClasses } from '@/services/ClassService'

export function useStudents() {
  const students = ref([])
  const filtered = ref([])
  const selectedClass = ref('')
  const classList = ref([])

  const classOptions = computed(() => {
    const options = []
    classList.value.filter(cls => !cls.parentId).forEach(rootClass => {
      options.push({ label: rootClass.name, value: rootClass.name })
      classList.value.filter(cls => cls.parentId === rootClass.id).forEach(childClass => {
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
      filtered.value = [...students.value]
    } else {
      const selectedClassObj = classList.value.find(cls => cls.name === selectedClass.value)
      if (selectedClassObj?.parentId) {
        filtered.value = students.value.filter(s => s.class === selectedClass.value)
      } else {
        const childClasses = classList.value.filter(cls => cls.parentId === selectedClassObj?.id)
        const classNames = [selectedClassObj?.name, ...childClasses.map(cls => cls.name)]
        filtered.value = students.value.filter(s => classNames.includes(s.class))
      }
    }
  }

  const deleteStudent = (id) => {
    if (!confirm('Bạn có chắc muốn xoá học sinh này không?')) return
    students.value = students.value.filter(s => s.id !== id)
    localStorage.setItem('students', JSON.stringify(students.value))
    filterStudents()
  }

  const calculateAge = (dob) => dob ? new Date().getFullYear() - new Date(dob).getFullYear() : ''

  return { students, filtered, selectedClass, classOptions, loadData, filterStudents, deleteStudent, calculateAge }
}
