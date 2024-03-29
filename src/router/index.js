import { createRouter, createWebHistory } from 'vue-router'
import {getAuth, onAuthStateChanged } from "firebase/auth"
import HomeView from '../views/HomeView.vue'
import TiendaView from '../views/TiendaView.vue'
import list from '../components/categorias/CategoriaList.vue'
import ListaProducto from '../components/productos/ProductoList.vue'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import ProductoVista from '../components/productos/ProductoVista.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/store',
    name: 'store',
    component: TiendaView,
    meta : {
      requiresAuth: true
    }
  },
  {
    path: '/listCategoria',
    name: 'listCategoria',
    component: list,
  },
  {
    path: '/listProducto',
    name: 'listProducto',
    component: ListaProducto
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/producto-vista/:producto',
    name: 'producto-vista',
    component: ProductoVista
  }
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
