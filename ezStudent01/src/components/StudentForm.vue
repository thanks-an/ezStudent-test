<template>
  <div class="p-4 text-sm">
    <h2><b>ezStudy</b> / <router-link to="/students">Học sinh</router-link></h2>
    <h3 class="mt-2 font-semibold">THÊM HỌC SINH</h3>

    <div class="mt-4 space-y-3 max-w-xs">
      <!-- Tên -->
      <div>
        <label class="block mb-1">Họ và tên*</label>
        <input v-model="student.name" type="text" class="border p-1 w-full" required />
      </div>

      <!-- Ngày sinh -->
      <div>
        <label class="block mb-1">Ngày sinh</label>
        <input v-model="student.dob" type="date" class="border p-1 w-full" />
      </div>

      <!-- Lớp -->
      <div>
        <label class="block mb-1">Lớp</label>
        <select v-model="student.class" class="border p-1 w-full">
          <option v-for="cls in classList" :key="cls.value" :value="cls.value">
            {{ cls.label }}
          </option>
        </select>
      </div>

      <!-- Lưu -->
      <button @click="saveStudent" class="bg-blue-500 text-white px-4 py-1">Lưu</button>
    </div>
  </div>
</template>

<script>
import { classList } from '@/utils/classList'
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      student: {
        id: '',
        name: '',
        dob: '',
        class: '',
      },
      classList,
    }
  },
  methods: {
    saveStudent() {
      if (!this.student.name || !this.student.class) {
        alert('Vui lòng nhập đầy đủ họ tên và lớp.')
        return
      }

      const students = JSON.parse(localStorage.getItem('students') || '[]')

      if (this.student.id) {
        // cập nhật
        const index = students.findIndex((s) => s.id === this.student.id)
        if (index !== -1) students[index] = this.student
      } else {
        // thêm mới
        this.student.id = uuidv4()
        students.push(this.student)
      }

      localStorage.setItem('students', JSON.stringify(students))
      localStorage.removeItem('editingStudent')
      this.$router.push('/students')
    },
  },
  mounted() {
    const editData = localStorage.getItem('editingStudent')
    if (editData) {
      this.student = JSON.parse(editData)
    }
  },
}
</script>
