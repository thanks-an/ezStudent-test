import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getClasses } from '@/services/ClassService'
import { v4 as uuidv4 } from 'uuid'

export function useStudentForm() {
  const router = useRouter()
  const student = ref({ id: '', name: '', dob: '', class: '' })
  const classList = ref([])

  const flatClassList = computed(() => {
    const result = []
    classList.value
      .filter((cls) => !cls.parentId)
      .forEach((rootClass) => {
        result.push({ ...rootClass, displayName: rootClass.name })
        classList.value
          .filter((cls) => cls.parentId === rootClass.id)
          .forEach((childClass) => {
            result.push({ ...childClass, displayName: `----${childClass.name}` })
          })
      })
    return result
  })

  const loadData = () => {
    classList.value = getClasses()
  }

  const loadEditingStudent = () => {
    const editingStudent = localStorage.getItem('editingStudent')
    if (editingStudent) {
      student.value = JSON.parse(editingStudent)
      localStorage.removeItem('editingStudent')
    }
  }

  const saveStudent = () => {
    if (!student.value.name?.trim()) {
      alert('Vui lòng nhập họ và tên học sinh')
      return
    }
    if (!student.value.dob?.trim()) {
      alert('Vui lòng nhập ngày sinh học sinh')
      return
    }
    if (!student.value.class?.trim()) {
      alert('Vui lòng chọn lớp cho học sinh')
      return
    }

    const students = JSON.parse(localStorage.getItem('students') || '[]')

    if (student.value.id) {
      const index = students.findIndex((s) => s.id === student.value.id)
      if (index !== -1) students[index] = student.value
    } else {
      student.value.id = uuidv4()
      students.push(student.value)
    }

    localStorage.setItem('students', JSON.stringify(students))
    router.push('/')
  }

  return { student, flatClassList, loadData, loadEditingStudent, saveStudent }
}
