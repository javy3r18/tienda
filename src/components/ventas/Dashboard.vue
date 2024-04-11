<template>
  <div>
    <VentasPorMes></VentasPorMes>
    <hr>
    <VentasPorCategoria></VentasPorCategoria>
    <hr>
    <VentasPorAutor></VentasPorAutor>
    <hr>
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
