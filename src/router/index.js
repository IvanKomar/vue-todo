import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

  const routes = [
  {
    path: '/',
    name: 'TicketsList',
    component: () => import('../views/TicketsList.vue'),
    exact: true
  },
  {
    path: '/create',
    name: 'CreateTicket',
    component: () => import('../views/ViewTicket.vue')
  },
  {
    path: '/edit/:id',
    name: 'EditTicket',
    component: () => import('../views/ViewTicket.vue')
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
