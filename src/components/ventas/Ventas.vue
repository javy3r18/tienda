<template>
  <div>
    <div class="mb-5">
      <h2 class="block text-center mt-10"><b>Ventas totales</b></h2>
    <Paginacion :totalPages="totalPages" :currentPage="currentPage" @cambio-pagina="cambiarPagina"></Paginacion>
    </div>
    <div class="w-full flex justify-center items-center flex-col">
      <div class="w-full max-w-6xl mb-5">
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Venta ID
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Fecha de la compra
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Precio
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Nombre comprador
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Direccion de envio
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in recibos" :key="r.id">
              <td class="border-b border-slate-200 p-4 text-slate-500">
                {{ r.id }}
              </td>
              <td class="border-b border-slate-200 p-4 text-slate-500">
                {{ r.fecha }}
              </td>
              <td class="border-b border-slate-200 p-4 text-slate-500">
                $ {{ r.precio }}
              </td>
              <td class="border-b border-slate-200 p-4 text-slate-500">
                {{ r.nombre }}
              </td>
              <td class="border-b border-slate-200 p-4 text-slate-500">
                {{ r.direccion }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mb-5">
        <Paginacion :totalPages="totalPages" :currentPage="currentPage" @cambio-pagina="cambiarPagina"></Paginacion>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Paginacion from '../Paginacion.vue'

export default {
  data() {
    return {
      recibos: {},
      currentPage: null,
      totalPages: null,
    };
  },

  components: {
    Paginacion,
  },

  methods: {
    loadTable() {
      try {
        axios.get(`http://localhost:8080/api/getRecibos/${this.currentPage}`).then((res) => {
          this.recibos = res.data.recibos;
          console.log(this.recibos);
          this.currentPage = res.data.currentPage
          this.totalPages = res.data.totalPages
        });
      } catch (error) {
        console.error(error);
      }
    },

    cambiarPagina(nuevaPagina) {
      // Actualizar la página actual con la nueva página
      this.currentPage = nuevaPagina;
      // Llamar a una función para cargar datos de la nueva página
      this.loadTable();
    },
  },

  mounted() {
    this.loadTable();
  },
};
</script>
