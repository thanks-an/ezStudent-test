// ==========================================================================
// CLASS ROUTES
// ==========================================================================

import ClassList from '@/components/ClassList.vue'
import ClassForm from '@/components/ClassForm.vue'
import { currentConfig } from '@/config/appConfig.js'

/**
 * Check if classes feature is enabled
 */
function checkClassesFeature(to, from, next) {
  if (currentConfig.features.classes) {
    next()
  } else {
    next('/students')
  }
}

var classRoutes = [
  {
    path: '/classes',
    component: ClassList,
    meta: { section: 'classes' },
    beforeEnter: checkClassesFeature,
  },
  {
    path: '/add-class',
    component: ClassForm,
    meta: { section: 'classes' },
    beforeEnter: checkClassesFeature,
  },
  {
    path: '/edit-class/:id',
    component: ClassForm,
    props: true,
    meta: { section: 'classes' },
    beforeEnter: checkClassesFeature,
  },
]

export { classRoutes }
