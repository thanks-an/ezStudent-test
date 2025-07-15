<template>
  <div class="class-list">
    <h2 class="page-title">Lớp</h2>

    <div class="filter-section">
      <div></div> <!-- Empty div for spacing -->
      <router-link to="/add-class">
        <button class="btn btn-primary">Tạo lớp</button>
      </router-link>
    </div>


    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Lớp</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cls, index) in paginatedClasses" :key="cls.id">
            <td>{{ index + 1 + (currentPage - 1) * perPage }}</td>
            <td>{{ cls.displayName }}</td>
            <td class="action-column">
              <router-link :to="`/edit-class/${cls.id}`" class="action-link edit">Sửa</router-link>
              <a href="#" @click.prevent="deleteClassWrapper(cls.id)" class="action-link delete">Xóa</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-btn"
        :class="{ disabled: currentPage === 1 }"
      >
        «
      </button>
      <span class="pagination-info">Trang {{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
        :class="{ disabled: currentPage === totalPages }"
      >
        »
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { getClasses, deleteClass } from '../services/ClassService.js';

const classList = ref([]);
const currentPage = ref(1);
const perPage = ref(15); // 15 items per page

onMounted(() => {
  refreshClassList();
});

const organizedClasses = computed(() => {
  const result = []
  const rootClasses = classList.value.filter(cls => !cls.parentId)

  rootClasses.forEach(rootClass => {

    result.push({
      ...rootClass,
      displayName: rootClass.name
    })


    const childClasses = classList.value.filter(cls => cls.parentId === rootClass.id)
    childClasses.forEach(childClass => {
      result.push({
        ...childClass,
        displayName: `----${childClass.name}`
      })
    })
  })

  return result
})

const paginatedClasses = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return organizedClasses.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => {
  return Math.ceil(organizedClasses.value.length / perPage.value) || 1
})

function refreshClassList() {
  classList.value = getClasses();
}

function deleteClassWrapper(id) {
  if (confirm('Bạn có chắc chắn muốn xóa lớp này?')) {
    deleteClass(id);
    refreshClassList();
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<style scoped>
.class-list {
  padding: 0;
}

.page-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,123,255,0.3);
}

.table-container {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 2px solid #e9ecef;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table th,
.data-table td {
  padding: 1rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
}

.data-table tbody tr:hover {
  background-color: #f8f9fa;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.action-column {
  white-space: nowrap;
}

.action-link {
  color: #007bff;
  text-decoration: none;
  margin-right: 1rem;
  font-weight: 500;
}

.action-link:hover {
  text-decoration: underline;
}

.action-link.delete {
  color: #dc3545;
}

.action-link.delete:hover {
  color: #c82333;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #dee2e6;
  background-color: white;
  color: #495057;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(.disabled) {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.pagination-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 14px;
  color: #495057;
  font-weight: 500;
}
</style>
