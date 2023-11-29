import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/account',
    name: 'account',
    // lazy-loaded when the route is visited.
    component: () => import('../views/AccountView.vue'),

  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})


router.beforeEach((to, from, next) => {
    const user = store.getters.getUser

    if (to.name == 'account' && !user.email) {
        next('/')
    } else {
        next()
    }
})

export default router
