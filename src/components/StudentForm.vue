<template>
  <div class="form__container">
    <h3 class="form__title">{{ student.id ? 'SỬA HỌC SINH' : 'THÊM HỌC SINH' }}</h3>
    <div class="form__content">
      <div class="form__group">
        <label class="form__label form__label--required">Họ và tên</label>
        <input
          v-model="student.name"
          type="text"
          class="form__input"
          required
          placeholder="Nhập họ và tên"
        />
      </div>
      <div class="form__group">
        <label class="form__label form__label--required">Ngày sinh</label>
        <input v-model="student.dob" type="date" class="form__input" required />
      </div>
      <div class="form__group">
        <label class="form__label form__label--required">Lớp</label>
        <select v-model="student.class" class="form__select" required>
          <option value="">Chọn lớp</option>
          <option v-for="cls in flatClassList" :key="cls.id" :value="cls.name">
            {{ cls.displayName }}
          </option>
        </select>
      </div>
      <div class="form__actions">
        <button @click="saveStudent" class="btn btn--primary">Lưu</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStudentForm } from '@/composables/useStudentForm'

export default {
  setup() {
    const { student, flatClassList, loadData, loadEditingStudent, saveStudent } = useStudentForm()

    onMounted(() => {
      loadData()
      loadEditingStudent()
      window.addEventListener('classListChanged', loadData)
    })

    return { student, flatClassList, saveStudent }
  },
}
</script>

<style lang="scss">
@import '@/sass/main.scss';
</style>
