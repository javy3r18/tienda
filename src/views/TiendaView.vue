<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2 class="sr-only">Products</h2>

      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <div v-for="producto in productos" :key="producto.id">
          <a  @click="showProducto(producto.id)" class="hover:cursor-pointer group">
            <div
              class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
            >
              <img
                :src="`http://localhost:8080/` + producto.image"
                class="h-[350px] object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 class="mt-4 text-sm text-gray-700">{{ producto.nombre }}</h3>
            <p class="mt-1 text-lg font-medium text-gray-900">
              $ {{ producto.precio }}
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      idcategoria: null,
      productos: [],
    };
  },

  methods: {
    getProductos() {
      try {
        axios.get("http://localhost:8080/api/getProductos/?limit=12").then((res) => {
          this.productos = res.data.productos;
          console.log(res);
        });
      } catch (error) {
        console.error(error);
      }
    },

    getProductosPorCategoria(idcategoria) {
      try {
        axios.get(`http://localhost:8080/api/getProductos/categoria/${idcategoria}`).then((res) => {
          this.productos = res.data;
          console.log(res);
        });
      } catch (error) {
        console.error(error);
      }
    },

    showProducto(idproducto){
      this.$router.push({ name: 'producto-vista', params: { id: idproducto } });
    }
  },

  mounted() {
    const idcategoria = this.$route.params.id
    console.log(idcategoria);
    if(idcategoria){
      this.getProductosPorCategoria(idcategoria)
    }else{
      this.getProductos();
    }
    
  },
};
</script>
