<template>
  <div class="p-4 text-sm">
    <h2><b>ezStudy</b> / Học sinh</h2>

    <!-- Bộ lọc lớp -->
    <div class="mt-4 flex items-center gap-2">
      <select v-model="selectedClass" class="border p-1">
        <option v-for="cls in classList" :key="cls.value" :value="cls.value">
          {{ cls.label }}
        </option>
      </select>
      <button @click="filterStudents" class="border px-3 py-1">Tìm kiếm</button>

      <router-link to="/create-student" class="ml-auto">
        <button class="bg-blue-500 text-white px-3 py-1">Thêm học sinh</button>
      </router-link>
    </div>

    <!-- Bảng danh sách -->
    <table class="mt-4 border w-full text-left">
      <thead>
        <tr class="bg-gray-100">
          <th class="border px-2 py-1">#</th>
          <th class="border px-2 py-1">Họ và tên</th>
          <th class="border px-2 py-1">Tuổi</th>
          <th class="border px-2 py-1">Lớp</th>
          <th class="border px-2 py-1">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in paginatedStudents" :key="student.id">
          <td class="border px-2 py-1">{{ index + 1 + (currentPage - 1) * perPage }}</td>
          <td class="border px-2 py-1">{{ student.name }}</td>
          <td class="border px-2 py-1">{{ calculateAge(student.dob) }}</td>
          <td class="border px-2 py-1">{{ student.class }}</td>
          <td class="border px-2 py-1">
            <a href="#" @click.prevent="editStudent(student)" class="text-blue-600 mr-2">Sửa</a>
            <a href="#" @click.prevent="deleteStudent(student.id)" class="text-red-600">Xóa</a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Phân trang -->
    <div class="mt-4 text-center">
      <button @click="prevPage" :disabled="currentPage === 1" class="border px-3 py-1 mr-2">
        «
      </button>
      Trang {{ currentPage }} / {{ totalPages }}
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="border px-3 py-1 ml-2"
      >
        »
      </button>
    </div>
  </div>
</template>

<script>
import { classList } from '@/utils/classList'

export default {
  data() {
    return {
      students: [],
      filtered: [],
      selectedClass: '',
      classList,
      currentPage: 1,
      perPage: 5,
    }
  },
  computed: {
    paginatedStudents() {
      const start = (this.currentPage - 1) * this.perPage
      return this.filtered.slice(start, start + this.perPage)
    },
    totalPages() {
      return Math.ceil(this.filtered.length / this.perPage) || 1
    },
  },
  methods: {
    loadStudents() {
      const raw = localStorage.getItem('students')
      this.students = raw ? JSON.parse(raw) : []
      this.filterStudents()
    },
    filterStudents() {
      if (!this.selectedClass) {
        this.filtered = [...this.students]
      } else {
        // lọc theo lớp hoặc theo khối (bắt đầu bằng selectedClass)
        this.filtered = this.students.filter((s) => s.class.startsWith(this.selectedClass))
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
      this.$router.push('/create-student')
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
    this.loadStudents()
  },
}
</script>
