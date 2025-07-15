<template>
  <div class="form-container">
    <h3 class="form-title">{{ student.id ? 'SỬA HỌC SINH' : 'THÊM HỌC SINH' }}</h3>
    <div class="form-content">
      <div class="form-group">
        <label class="form-label">Họ và tên*</label>
        <input v-model="student.name" type="text" class="form-input" required placeholder="Nhập họ và tên" />
      </div>
      <div class="form-group">
        <label class="form-label">Ngày sinh</label>
        <input v-model="student.dob" type="date" class="form-input" />
      </div>
      <div class="form-group">
        <label class="form-label">Lớp</label>
        <select v-model="student.class" class="form-select">
          <option value="">Chọn lớp</option>
          <option v-for="cls in flatClassList" :key="cls.id" :value="cls.name">{{ cls.displayName }}</option>
        </select>
      </div>
      <button @click="saveStudent" class="btn btn-primary">Lưu</button>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStudentForm } from '@/composables/useStudentForm'

export default {
  setup() {
    const { student, flatClassList, loadData, loadEditingStudent, saveStudent } = useStudentForm()

    onMounted(() => { loadData(); loadEditingStudent(); window.addEventListener('classListChanged', loadData) })

    return { student, flatClassList, saveStudent }
  }
}
</script>

<style src="@/assets/form-styles.css"></style>
