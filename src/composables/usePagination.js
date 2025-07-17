import { ref, computed } from 'vue'

export function usePagination(items, perPage = 15) {
  const currentPage = ref(1)
  const itemsPerPage = ref(perPage)

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return items.value.slice(start, start + itemsPerPage.value)
  })

  const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value) || 1)

  const nextPage = () => currentPage.value < totalPages.value && currentPage.value++
  const prevPage = () => currentPage.value > 1 && currentPage.value--
  const resetPage = () => currentPage.value = 1

  return { currentPage, paginatedItems, totalPages, nextPage, prevPage, resetPage }
}
