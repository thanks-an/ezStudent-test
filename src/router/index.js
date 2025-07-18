import { createRouter, createWebHistory } from 'vue-router'
import { studentRoutes } from './studentRoutes'
import { classRoutes } from './classRoutes'

var routes = [{ path: '/', redirect: '/students' }].concat(studentRoutes).concat(classRoutes)

export default createRouter({
  history: createWebHistory(),
  routes: routes,
})
