import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import HomeView from "../views/HomeView.vue";
import TiendaView from "../views/TiendaView.vue";
import Register from "../views/RegisterView.vue";
import Login from "../views/LoginView.vue";
import ProductoVista from "../components/productos/ProductoVista.vue";
import AdminView from "@/views/AdminView.vue";
import LandingPage from "@/views/LandingPage.vue";
import DashboardVR from "@/views/DashboardVR.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/store/:id?",
    name: "store",
    component: TiendaView,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/landing-page",
    name: "landing-page",
    component: LandingPage,
    meta: {
      showFooter: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      showNavbar: true,
      showFooter: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      showNavbar: true,
      showFooter: false,
    },
  },
  {
    path: "/dashboardVR",
    name: "dashboardVR",
    component: DashboardVR,
    
  },
  {
    path: "/producto-vista/:producto",
    name: "producto-vista",
    component: ProductoVista,
    meta: {
      showNavbar: true,
      showFooter: true,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: {
      showNavbar: true,
      showFooter: false,
      requiresAuth: true
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user) {
      // Si hay un usuario logeado, permitir el acceso
      next();
    } else {
      // Si no hay usuario logeado, redirigir al inicio de sesión
      alert("You are not logged in");
      next("/login");
    }
  } else {
    // Si la ruta no requiere autenticación, simplemente dejar pasar
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();

  if (to.meta.requiresAuth && user) {
    const db = getFirestore();
    const colRef = collection(db, "usuarios");

    try {
      const snapshot = await getDocs(colRef);
      const adminData = snapshot.docs[0].data();

      if (to.name === "admin" && user.email === adminData.email && adminData.isAdmin) {
        // Si el usuario es un administrador, permitir acceso
        next();
      } else if (to.name === "admin") {
        // Si el usuario no es un administrador, redirigir a la página de inicio
        alert("User not allowed to");
        next({ name: 'home' });
      } else {
        // Permitir el acceso a otras rutas que requieren autenticación
        next();
      }
    } catch (error) {
      console.error("Error getting admin data:", error);
      next("/");
    }
  } else {
    // Permitir el acceso a otras rutas que no requieren autenticación
    next();
  }
});






export default router;
