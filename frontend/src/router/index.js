import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

// Pages
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
// import Dashboard from '../pages/Dashboard.vue'
// import AdminPanel from '../pages/AdminPanel.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },

//   // Public
  { path: '/login', component: Login },
  { path: '/register', component: Register },

//   // Protected
  {
    path: '/dashboard',
    component: NotFound,
    meta: { requiresAuth: true }
  },
//   {
//     path: '/admin',
//     component: AdminPanel,
//     meta: { requiresAuth: true, adminOnly: true }
//   },

//   // 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 Navigation Guards
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (auth.token && !auth.user) {
    try {
      await auth.fetchProfile()
    } catch (e) {
      auth.logout()
    }
  }

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next('/login')
  }

  if (to.meta.adminOnly && !auth.isAdmin) {
    return next('/dashboard')
  }

  next()
})

export default router
