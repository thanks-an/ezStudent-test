import { createRouter, createWebHistory } from 'vue-router'
import StudentList from '@/components/StudentList.vue'
import StudentForm from '@/components/StudentForm.vue'
import NotFoundBT1 from '@/components/NotFoundBT1.vue'

const routes = [
  { path: '/', redirect: '/students' },
  {
    path: '/students',
    component: StudentList,
    meta: { section: 'students' }
  },
  {
    path: '/create-student',
    component: StudentForm,
    meta: { section: 'students' }
  },
  {
    path: '/edit-student/:id',
    component: StudentForm,
    props: true,
    meta: { section: 'students' }
  },
  // Chặn truy cập các route liên quan đến lớp trong bài tập 1
  {
    path: '/classes',
    component: NotFoundBT1,
    meta: { section: 'students' }
  },
  {
    path: '/add-class',
    component: NotFoundBT1,
    meta: { section: 'students' }
  },
  {
    path: '/edit-class/:id',
    component: NotFoundBT1,
    meta: { section: 'students' }
  },
  // Catch all - redirect to students
  {
    path: '/:pathMatch(.*)*',
    redirect: '/students'
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
