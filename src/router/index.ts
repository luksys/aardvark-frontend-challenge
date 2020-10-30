import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Game Board and Events',
    component: () => import('../views/GameBoardAndEvents.vue')
  },
  {
    path: '/statistics-and-action-logs',
    name: 'Statistics and Actions Log',
    component: () => import('../views/StatisticsAndActionsLog.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
