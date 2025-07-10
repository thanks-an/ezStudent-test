import { createRouter, createWebHistory } from 'vue-router'
import StudentList from '@/components/StudentList.vue'
import StudentForm from '@/components/StudentForm.vue'

const routes = [
  { path: '/', redirect: '/students' },
  { path: '/students', component: StudentList },
  { path: '/create-student', component: StudentForm },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
