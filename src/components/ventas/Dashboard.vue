<template>
  <div>
    <VentasPorMes></VentasPorMes>
    <VentasPorCategoria></VentasPorCategoria>
    <VentasPorAutor></VentasPorAutor>
  </div>
</template>

<script>
import VentasPorMes from './VentasPorMes.vue'
import VentasPorCategoria from './VentasPorCategoria.vue'
import VentasPorAutor from './VentasPorAutor.vue'

export default {
  data() {
    return {
     
    };
  },

  components: {
    VentasPorMes,
    VentasPorCategoria,
    VentasPorAutor
  }

  
};
</script>
