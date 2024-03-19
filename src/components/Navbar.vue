<template>
    <nav class="w-screen h-16 flex justify-center items-center border-b-2">
    <div class="w-full mx-4 flex items-center justify-between max-w-7xl">
      <div class="w-28">
        <img src="../assets/V-ART.png">
      </div>
      <div>
        <router-link class="hover:underline" to="/">Home</router-link> |
        <router-link class="hover:underline" to="/store">Store</router-link> |
        <router-link class="hover:underline" to="/listCategoria">categoria list</router-link> |
        <router-link class="hover:underline" to="/listProducto">Ver Productos</router-link> |
        <router-link class="hover:underline" to="/login">Login</router-link> |
        <router-link class="hover:underline" to="/register">Register</router-link> |
        <button v-if="isLoggedIn" class="hover:underline" @click="handleSignOut">Sign out</button>
      </div>
    </div>
  
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from "vue-router"

const router = useRouter();
const isLoggedIn = ref(false)

let auth;
onMounted(() =>{
  auth = getAuth();
  onAuthStateChanged(auth, (user) =>{
    if (user) {
      isLoggedIn.value = true
    }else{
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() =>{
    router.push("/")
  })
}
</script>