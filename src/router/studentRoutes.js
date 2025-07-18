// ==========================================================================
// STUDENT ROUTES
// ==========================================================================

import StudentList from '@/components/StudentList.vue'
import StudentForm from '@/components/StudentForm.vue'

var studentRoutes = [
  {
    path: '/students',
    component: StudentList,
    meta: { section: 'students' },
  },
  {
    path: '/create-student',
    component: StudentForm,
    meta: { section: 'students' },
  },
  {
    path: '/edit-student/:id',
    component: StudentForm,
    props: true,
    meta: { section: 'students' },
  },
]

export { studentRoutes }
