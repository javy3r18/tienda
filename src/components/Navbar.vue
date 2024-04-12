<template>
  <nav
    class="bg-white w-screen fixed h-16 flex justify-center items-center border-b-2 z-20"
  >
    <div class="w-full mx-4 flex items-center justify-between max-w-7xl">
      <div class="w-28">
        <img src="../assets/V-ART.png" />
      </div>
      <div>
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium text-base border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white"
        >
          <li>
            <router-link
              to="/"
              class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="/store"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >Tienda</router-link
            >
          </li>
          <li v-if="isAdmin">
            <router-link
              
              to="/admin"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >Admin</router-link
            >
          </li>
          <li v-if="!isLoggedIn">
            <router-link
              
              to="/login"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >Sign in</router-link
            >
          </li>
          <li v-if="!isLoggedIn">
            <router-link
              
              to="/register"
              class="text-blue-700 border border-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >Register</router-link
            >
          </li>
          <li v-if="isLoggedIn">
            <a
              class="cursor-pointer text-blue-700 border border-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              @click="handleSignOut"
            >
              Sign out
            </a>
          </li>
        </ul>
      
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);
let isAdmin = false;

let auth;
onMounted(() => {
  auth = getAuth();
  console.log(auth);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      if (user.email == "javy18ms@gmail.com") {
        isAdmin = true;
      }
    } else {
      isLoggedIn.value = false;
      isAdmin = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>
