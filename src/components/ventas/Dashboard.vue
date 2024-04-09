<template>
  <div>
    <VentasPorMes></VentasPorMes>
    <VentasPorCategoria></VentasPorCategoria>
    <VentasPorAutor></VentasPorAutor>
    <Ventas></Ventas>
  </div>
</template>

<script>
import VentasPorMes from './VentasPorMes.vue'
import VentasPorCategoria from './VentasPorCategoria.vue'
import VentasPorAutor from './VentasPorAutor.vue'
import Ventas from './Ventas.vue'

export default {
  data() {
    return {
     
    };
  },

  components: {
    VentasPorMes,
    VentasPorCategoria,
    VentasPorAutor,
    Ventas
  }

  
};
</script>
