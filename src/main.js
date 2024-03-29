import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import 'axios'
import 'sweetalert2'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCukJZ7EXHZpCcYpmMXSRoKOlDjozXji0s",
  authDomain: "tienda-ffb89.firebaseapp.com",
  projectId: "tienda-ffb89",
  storageBucket: "tienda-ffb89.appspot.com",
  messagingSenderId: "173941192339",
  appId: "1:173941192339:web:2df26919e7412cd4cc3f66"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
