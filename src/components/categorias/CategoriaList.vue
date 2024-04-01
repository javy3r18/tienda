<template>
  <div>
    <h2 class="block text-center mb-4">Lista de categorias</h2>

    <div class="w-full flex justify-center items-center flex-col">
      <div class="mb-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          @click="modalOpen"
        >
          Crear Categoria
        </button>
      </div>
      <div class="w-full max-w-7xl mb-10">
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Clave categoria
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Categoria
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in categorias" :key="c.id">
              <td class="p-3 text-small text-gray-700">{{ c.id }}</td>
              <td class="p-3 text-small text-gray-700">{{ c.categoria }}</td>
              <td class="p-3 text-small text-gray-700">
                <router-link to="/"> Editar</router-link>
                <button type="">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <CrearCategoria :modal="modal" @clicked="modalClose" @updateTable="loadTable"></CrearCategoria>
  </div>
</template>

<script>
import axios from "axios";
import CrearCategoria from "./CrearCategoriaForm.vue"

export default {
  data() {
    return {
      modal: false,
      categorias: [],
    };
  },

  components: {
    CrearCategoria,
  },

  methods: {
    loadTable() {
      try {
        axios.get("http://localhost:8080/api/getCategorias/").then((res) => {
          this.categorias = res.data;
        });
      } catch (error) {
        console.error(error);
      }
    },

    modalOpen() {
      this.modal = true;
    },

    modalClose(value) {
      this.modal = value;
    },
  },

  mounted() {
    this.loadTable()
  },
};
</script>
