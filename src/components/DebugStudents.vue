<template>
  <div class="debug-students">
    <h2>Debug - Danh sách học sinh</h2>
    <p>Số lượng học sinh: {{ students.length }}</p>
    <div v-if="students.length === 0">
      <p>Không có học sinh nào!</p>
      <button @click="loadSampleData">Load dữ liệu mẫu</button>
    </div>
    <ul v-else>
      <li v-for="student in students" :key="student.id">
        {{ student.name }} - {{ student.class }} - {{ student.dob }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { seedData } from '@/utils/seedData.js'

const students = ref([])

const loadData = () => {
  const data = localStorage.getItem('students')
  students.value = data ? JSON.parse(data) : []
  console.log('Loaded students:', students.value.length)
}

const loadSampleData = () => {
  localStorage.clear()
  seedData()
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style>
.debug-students {
  padding: 20px;
}
.debug-students ul {
  list-style: decimal;
  margin-left: 20px;
}
.debug-students li {
  margin-bottom: 5px;
}
</style>
