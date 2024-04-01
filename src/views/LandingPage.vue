<template>
  <div class="overflow-hidden w-full flex justify-center">
    <div class="w-full max-w-7xl mx-20 flex justify-center">
      <div class="w-1/2 max-h-screen">
        <section class=" py-32 bg-white flex flex-col justify-center">
          <div class="grid grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div class="flex justify-end">
              <img
                class="w-2/3 h-2/3 object-cover rounded-lg overflow-hidden"
                src="https://images.unsplash.com/photo-1616486788371-62d930495c44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
              />
            </div>
            <div class="flex justify-start">
              <img
                class="rounded-lg object-cover overflow-hidden"
                src="https://images.unsplash.com/photo-1640020580603-e7beafd75d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
              />
            </div>
            <div class="-mt-64 flex justify-start">
              <img
                class="rounded-lg object-cover overflow-hidden"
                src="https://images.unsplash.com/photo-1533557950217-8768f2ee7491?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              />
            </div>
            <div class="flex justify-start -mr-28 ml-28">
              <img
                class="w-2/3 h-2/3 object-cover rounded-lg overflow-hidden"
                src="https://images.unsplash.com/photo-1620371350502-999e9a7d80a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=670&q=80"
              />
            </div>
            <div
              class="-translate-y-96 transform ml-28 -mr-28 p-16 shadow-xl rounded-xl overflow-hidden bg-white"
            >
              <div class="space-y-4">
                <p class="text-3xl font-bold text-black tracking-tight">
                  FIND AWESOME ART
                </p>
                <p class="text-xl text-black">sample text</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="w-1/2 max-h-screen">
        <div
          class="mt-32 flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8"
        >
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              class="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2
              class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
            >
              Sign in to your account
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent class="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Email address</label
                >
                <div class="mt-2">
                  <input
                    v-model="email"
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Password</label
                  >
                </div>
                <div class="mt-2">
                  <input
                    v-model="password"
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Confirm Password</label
                  >
                </div>
                <div class="mt-2">
                  <input
                    v-model="confirmPassword"
                    id="confirmpassword"
                    name="confirmPassword"
                    type="password"
                    autocomplete="current-password"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  @click="register"
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
                <button
                  @click="signInWithGoogle"
                  type="submit"
                  class="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in with google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref} from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {useRouter} from 'vue-router';
const email = ref("");
const password = ref("");
const confirmPassword = ref('');
const router = useRouter();

const register = () => {
  if(password.value == confirmPassword.value){
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data) =>{
    console.log("Successfully registered");
    router.push('/store')
  })
  .catch((error) =>{
    console.log(error.code);
    alert(error.message);
  })
  }else{
    alert("Password doesn't match");
  }
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
  .then((result) => {
    console.log(result.user);
    router.push("/store")
  })
  .catch((error) => {
    console.log("An unknown error as ocurred");
  })
}
</script>


<style scoped>
.overflow-hidden {
  overflow: hidden; 
}
</style>
