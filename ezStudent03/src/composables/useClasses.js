import { ref, computed } from 'vue'
import { getClasses, deleteClass } from '@/services/ClassService'

export function useClasses() {
  const classList = ref([])
  const currentPage = ref(1)
  const perPage = ref(15)

  const flatClasses = computed(() => {
    const result = []
    classList.value.filter(cls => !cls.parentId).forEach(rootClass => {
      result.push({ ...rootClass, displayName: rootClass.name })
      classList.value.filter(cls => cls.parentId === rootClass.id).forEach(childClass => {
        result.push({ ...childClass, displayName: `----${childClass.name}` })
      })
    })
    return result
  })

  const paginatedClasses = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    return flatClasses.value.slice(start, start + perPage.value)
  })

  const totalPages = computed(() => Math.ceil(flatClasses.value.length / perPage.value) || 1)

  const loadData = () => { classList.value = getClasses() }

  const deleteClassWrapper = (id) => {
    if (!confirm('Bạn có chắc muốn xoá lớp này không?')) return
    deleteClass(id)
    loadData()
    window.dispatchEvent(new Event('classListChanged'))
  }

  const nextPage = () => currentPage.value < totalPages.value && currentPage.value++
  const prevPage = () => currentPage.value > 1 && currentPage.value--

  const setupEventListeners = () => {
    loadData()
    window.addEventListener('classListChanged', loadData)
  }

  const cleanupEventListeners = () => {
    window.removeEventListener('classListChanged', loadData)
  }

  return {
    paginatedClasses, currentPage, totalPages, nextPage, prevPage,
    deleteClassWrapper, setupEventListeners, cleanupEventListeners
  }
}
