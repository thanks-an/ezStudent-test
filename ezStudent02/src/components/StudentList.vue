<template>
  <div class="student-list">
    <h2 class="page-title">Học sinh</h2>


    <div class="filter-section">
      <div class="filter-controls">
        <select v-model="selectedClass" class="form-select">
          <option value="">Tất cả các lớp</option>
          <option v-for="cls in classOptions" :key="cls.value" :value="cls.value">
            {{ cls.label }}
          </option>
        </select>
        <button @click="filterStudents" class="btn btn-outline">Tìm kiếm</button>
      </div>

      <router-link to="/create-student">
        <button class="btn btn-primary">Thêm học sinh</button>
      </router-link>
    </div>


    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Họ và tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in paginatedStudents" :key="student.id">
            <td>{{ index + 1 + (currentPage - 1) * perPage }}</td>
            <td>{{ student.name }}</td>
            <td>{{ calculateAge(student.dob) }}</td>
            <td>{{ student.class }}</td>
            <td class="action-column">
              <a href="#" @click.prevent="editStudent(student)" class="action-link edit">Sửa</a>
              <a href="#" @click.prevent="deleteStudent(student.id)" class="action-link delete">Xóa</a>
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

<script>
import { getClasses } from '@/services/ClassService'

export default {
  data() {
    return {
      students: [],
      filtered: [],
      selectedClass: '',
      classList: [],
      currentPage: 1,
      perPage: 15,
    }
  },
  computed: {
    classOptions() {
      const options = []
      const rootClasses = this.classList.filter(cls => !cls.parentId)

      rootClasses.forEach(rootClass => {
        options.push({
          label: rootClass.name,
          value: rootClass.name
        })

        const childClasses = this.classList.filter(cls => cls.parentId === rootClass.id)
        childClasses.forEach(childClass => {
          options.push({
            label: `----${childClass.name}`,
            value: childClass.name
          })
        })
      })

      return options
    },
    paginatedStudents() {
      const start = (this.currentPage - 1) * this.perPage
      return this.filtered.slice(start, start + this.perPage)
    },
    totalPages() {
      return Math.ceil(this.filtered.length / this.perPage) || 1
    },
  },
  methods: {
    loadData() {

      const studentsRaw = localStorage.getItem('students')
      this.students = studentsRaw ? JSON.parse(studentsRaw) : []


      this.classList = getClasses()

      this.filterStudents()
    },
    filterStudents() {
      if (!this.selectedClass) {
        this.filtered = [...this.students]
      } else {

        const selectedClassObj = this.classList.find(cls => cls.name === this.selectedClass)

        if (selectedClassObj) {
          if (selectedClassObj.parentId) {
            this.filtered = this.students.filter(s => s.class === this.selectedClass)
          } else {
            const childClasses = this.classList.filter(cls => cls.parentId === selectedClassObj.id)
            const classNames = [selectedClassObj.name, ...childClasses.map(cls => cls.name)]
            this.filtered = this.students.filter(s => classNames.includes(s.class))
          }
        } else {
          this.filtered = [...this.students]
        }
      }
      this.currentPage = 1
    },
    calculateAge(dob) {
      if (!dob) return ''
      const birth = new Date(dob)
      const today = new Date()
      return today.getFullYear() - birth.getFullYear()
    },
    editStudent(student) {
      localStorage.setItem('editingStudent', JSON.stringify(student))
      this.$router.push(`/edit-student/${student.id}`)
    },
    deleteStudent(id) {
      if (!confirm('Bạn có chắc muốn xoá học sinh này không?')) return
      this.students = this.students.filter((s) => s.id !== id)
      localStorage.setItem('students', JSON.stringify(this.students))
      this.filterStudents()
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
  },
  mounted() {
    this.loadData()

    window.addEventListener('classListChanged', this.loadData)
  },
  beforeUnmount() {

    window.removeEventListener('classListChanged', this.loadData)
  },
}
</script>

<style scoped>
.student-list {
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

.filter-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.form-select {
  padding: 0.5rem;
  border: 2px solid #dee2e6;
  border-radius: 5px;
  font-size: 14px;
  background-color: white;
  min-width: 200px;
}

.form-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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

.btn-outline {
  background-color: white;
  color: #6c757d;
  border-color: #dee2e6;
}

.btn-outline:hover {
  background-color: #f8f9fa;
  border-color: #adb5bd;
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
