import { createRouter, createWebHistory } from 'vue-router'
import StudentList from '@/components/StudentList.vue'
import StudentForm from '@/components/StudentForm.vue'
import ClassList from '@/components/ClassList.vue'
import ClassForm from '@/components/ClassForm.vue'


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
  {
    path: '/classes',
    component: ClassList,
    meta: { section: 'classes' }
  },
  {
    path: '/add-class',
    component: ClassForm,
    meta: { section: 'classes' }
  },
  {
    path: '/edit-class/:id',
    component: ClassForm,
    props: true,
    meta: { section: 'classes' }
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
