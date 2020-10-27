import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import GameBoardAndEvents from '../views/GameBoardAndEvents.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Game Board and Events',
    component: GameBoardAndEvents
  },
  {
    path: '/statistics-and-action-logs',
    name: 'Statistics and Actions Log',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/StatisticsAndActionsLog.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
