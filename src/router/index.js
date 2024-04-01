import { createRouter, createWebHistory } from 'vue-router'
import {getAuth, onAuthStateChanged } from "firebase/auth"
import HomeView from '../views/HomeView.vue'
import TiendaView from '../views/TiendaView.vue'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import ProductoVista from '../components/productos/ProductoVista.vue'
import AdminView from '@/views/AdminView.vue'
import LandingPage from '@/views/LandingPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/store',
    name: 'store',
    component: TiendaView,
    meta : {
      requiresAuth: true,
    }
  },

  {
    path: '/landing-page',
    name: 'landing-page',
    component: LandingPage,
    meta: {
      showFooter: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      showNavbar: true,
      showFooter: false
    }

  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      showNavbar: true,
      showFooter: false
    }
  },
  {
    path: '/producto-vista/:producto',
    name: 'producto-vista',
    component: ProductoVista,
    meta: {
      showNavbar: true,
      showFooter: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      showNavbar: true,
      showFooter: false // No mostrar el footer en esta vista
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(), 
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) =>{
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if(await getCurrentUser()) {
      next();
    }else{
      alert("You are not logged in")
      next("/");
    }
  }else{
    next();
  }
})

export default router
