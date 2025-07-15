<template>
  <div class="form-container">
    <h3 class="form-title">{{ student.id ? 'SỬA HỌC SINH' : 'THÊM HỌC SINH' }}</h3>

    <div class="form-content">
      <!-- Tên -->
      <div class="form-group">
        <label class="form-label">Họ và tên*</label>
        <input
          v-model="student.name"
          type="text"
          class="form-input"
          required
          placeholder="Nhập họ và tên"
        />
      </div>

      <!-- Ngày sinh -->
      <div class="form-group">
        <label class="form-label">Ngày sinh</label>
        <input v-model="student.dob" type="date" class="form-input" />
      </div>

      <!-- Lớp -->
      <div class="form-group">
        <label class="form-label">Lớp</label>
        <select v-model="student.class" class="form-select">
          <option value="">Chọn lớp</option>
          <option v-for="cls in flatClassList" :key="cls.id" :value="cls.name">
            {{ cls.displayName }}
          </option>
        </select>
      </div>

      <!-- Lưu -->
      <button @click="saveStudent" class="btn btn-primary">Lưu</button>
    </div>
  </div>
</template>

<script>
import { getClasses } from '../services/ClassService.js';
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
      classList: [],
    }
  },
  computed: {
    flatClassList() {
      const result = []
      const rootClasses = this.classList.filter(cls => !cls.parentId)

      rootClasses.forEach(rootClass => {

        result.push({
          id: rootClass.id,
          name: rootClass.name,
          displayName: rootClass.name
        })


        const childClasses = this.classList.filter(cls => cls.parentId === rootClass.id)
        childClasses.forEach(childClass => {
          result.push({
            id: childClass.id,
            name: childClass.name,
            displayName: `----${childClass.name}`
          })
        })
      })

      return result
    }
  },
  methods: {
    loadClassList() {
      this.classList = getClasses();
    },
    saveStudent() {
      if (!this.student.name || !this.student.class) {
        alert('Vui lòng nhập đầy đủ họ tên và lớp.')
        return
      }

      const students = JSON.parse(localStorage.getItem('students') || '[]')

      if (this.student.id) {

        const index = students.findIndex((s) => s.id === this.student.id)
        if (index !== -1) students[index] = this.student
      } else {

        this.student.id = uuidv4()
        students.push(this.student)
      }

      localStorage.setItem('students', JSON.stringify(students))
      localStorage.removeItem('editingStudent')
      this.$router.push('/students')
    },
  },
  mounted() {
    this.loadClassList();


    window.addEventListener('classListChanged', this.loadClassList);

    const editData = localStorage.getItem('editingStudent')
    if (editData) {
      this.student = JSON.parse(editData)
    }
  },
  beforeUnmount() {

    window.removeEventListener('classListChanged', this.loadClassList);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadClassList();
    })
  },
}
</script>

<style scoped>
.form-container {
  padding: 0;
}

.form-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #495057;
}

.form-content {
  max-width: 400px;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 2px solid #e9ecef;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
  font-size: 14px;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #dee2e6;
  border-radius: 5px;
  font-size: 14px;
  background-color: white;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-input::placeholder {
  color: #adb5bd;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  margin-top: 1rem;
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
</style>
