<template>
  <div class="pagination">
    <button @click="$emit('prev')" :disabled="currentPage === 1" class="pagination-btn" :class="{ disabled: currentPage === 1 }">«</button>
    <span class="pagination-info">Trang {{ currentPage }} / {{ totalPages }}</span>
    <button @click="$emit('next')" :disabled="currentPage === totalPages" class="pagination-btn" :class="{ disabled: currentPage === totalPages }">»</button>
  </div>
</template>

<script>
export default {
  props: ['currentPage', 'totalPages'],
  emits: ['prev', 'next']
}
</script>
