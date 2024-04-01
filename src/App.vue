<template>
  <div class="overflow-x-hidden">
    <Navbar v-if="showNavbar" />
    <router-view />
    <Footer v-if="showFooter" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  computed: {
    showNavbar() {
      // Verifica si la ruta actual tiene una propiedad meta.showNavbar y la devuelve
      return this.$route.meta.showNavbar !== false;
    },
    showFooter() {
      // Verifica si la ruta actual tiene una propiedad meta.showFooter y la devuelve
      return this.$route.meta.showFooter !== false;
    }
  }
};
</script>
