import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getClasses, saveClass, updateClass, getClassById } from '@/services/ClassService'
import { v4 as uuidv4 } from 'uuid'

export function useClassForm(classId = null) {
  const router = useRouter()
  const classList = ref([])
  const isEdit = ref(!!classId)
  const classData = ref({ id: '', name: '', parentId: null })

  const parentOptions = computed(() => classList.value.filter(cls => !cls.parentId))

  const loadData = async () => {
    classList.value = getClasses()
    if (classId) {
      const existingClass = getClassById(classId)
      if (existingClass) classData.value = { ...existingClass }
    }
  }

  const handleSubmit = async () => {
    if (!classData.value.name?.trim()) { alert('Vui lòng nhập tên lớp'); return }

    if (isEdit.value) {
      updateClass(classData.value)
    } else {
      classData.value.id = uuidv4()
      saveClass(classData.value)
    }

    window.dispatchEvent(new Event('classListChanged'))
    router.push('/classes')
  }

  return { classList, isEdit, classData, parentOptions, loadData, handleSubmit }
}
