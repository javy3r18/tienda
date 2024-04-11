<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <h2 class="block my-8 text-center text-2xl">Todos los productos</h2>

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

      <Paginacion :totalPages="totalPages" :currentPage="currentPage" @cambio-pagina="cambiarPagina"></Paginacion>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Paginacion from "@/components/Paginacion.vue";

export default {
  data() {
    return {
      idcategoria: null,
      productos: [],
      currentPage: 1,
      totalPages: 1,
    };
  },

  components: {
    Paginacion
  },

  methods: {
    getProductos() {
      try {
        axios.get(`http://localhost:8080/api/getProductos/${this.currentPage}/?limit=12`).then((res) => {
          this.productos = res.data.productos;
          this.currentPage = res.data.currentPage
          this.totalPages = res.data.totalPages
          console.log(res);
        });
      } catch (error) {
        console.error(error);
      }
    },

    getProductosPorCategoria() {
      try {
        axios.get(`http://localhost:8080/api/getProductos/categoria/${this.idcategoria}/${this.currentPage}/12`).then((res) => {
          this.productos = res.data.productos;
          this.currentPage = res.data.currentPage
          this.totalPages = res.data.totalPages
          console.log(res);
        });
      } catch (error) {
        console.error(error);
      }
    },

    showProducto(idproducto){
      this.$router.push({ name: 'producto-vista', params: { id: idproducto } });
    },

    cambiarPagina(nuevaPagina) {
      this.currentPage = nuevaPagina;
      if(this.idcategoria){
      this.getProductosPorCategoria()
      }else{
        this.getProductos()
      }
    },

  },

  mounted() {
    this.idcategoria = this.$route.params.id
    if(this.idcategoria){
      this.getProductosPorCategoria()
    }else{
      this.getProductos();
    }
    
  },
};
</script>
