<template>
  <div class="form-container">
    <h3 class="form-title">{{ isEdit ? 'SỬA LỚP' : 'THÊM LỚP' }}</h3>

    <div class="form-content">
      <!-- Tên lớp -->
      <div class="form-group">
        <label class="form-label">Tên lớp*</label>
        <input
          v-model="classData.name"
          type="text"
          class="form-input"
          required
          placeholder="Nhập tên lớp"
        />
      </div>


      <div class="form-group">
        <label class="form-label">Thuộc</label>
        <select v-model="classData.parentId" class="form-select">
          <option :value="null">Tạo khối mới</option>
          <option v-for="cls in parentOptions" :key="cls.id" :value="cls.id">
            {{ cls.name }}
          </option>
        </select>
      </div>


      <button @click="handleSubmit" class="btn btn-primary">Lưu</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  getClasses,
  saveClass,
  updateClass,
  getClassById
} from '../services/ClassService.js';
import { v4 as uuidv4 } from 'uuid';

const route = useRoute();
const router = useRouter();
const classList = ref([]);
const isEdit = ref(false);

const classData = ref({
  id: '',
  name: '',
  parentId: null
});


const parentOptions = computed(() => {
  return classList.value.filter(cls => !cls.parentId)
})

onMounted(() => {
  classList.value = getClasses();
  const id = route.params.id;
  if (id) {
    isEdit.value = true;
    const data = getClassById(id);
    if (data) {
      classData.value = { ...data };
    }
  }
});

function handleSubmit() {
  if (!classData.value.name.trim()) {
    alert('Vui lòng nhập tên lớp.')
    return
  }

  if (isEdit.value) {
    updateClass(classData.value);
  } else {
    classData.value.id = uuidv4();
    saveClass(classData.value);
  }
  router.push('/classes');
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
