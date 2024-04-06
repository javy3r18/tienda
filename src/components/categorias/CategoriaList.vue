<template>
  <div>
    <h2 class="block text-center mb-4">Lista de categorias</h2>

    <div class="w-full flex justify-center items-center flex-col">
      <div class="mb-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          @click="modalCreateOpen"
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
              <td class="border-b border-slate-200  p-4 text-slate-500">{{ c.id }}</td>
              <td class="border-b border-slate-200  p-4 text-slate-500">{{ c.categoria }}</td>
              <td class="border-b border-slate-200  p-4 text-slate-500">
                <button class="mx-2 bg-transparent hover:bg-yellow-400 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded" @click="modalUpdateOpen(c)">Editar</button>
                <button class="mx-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" @click="deleteCategoria(c.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <CrearCategoria :modal="modalCreate" @clicked="modalClose" @updateTable="loadTable"></CrearCategoria>
    <EditarCategoria :modal="modalUpdate" :data="beforeUpdateData" @clicked="modalClose" @updateTable="loadTable"></EditarCategoria>
  </div>
</template>

<script>
import axios from "axios";
import CrearCategoria from "./CrearCategoriaForm.vue"
import EditarCategoria from './EditarCategoriaForm.vue'

export default {
  data() {
    return {
      modalCreate: false,
      modalUpdate: false,
      beforeUpdateData: {},
      categorias: [],
    };
  },

  components: {
    CrearCategoria,
    EditarCategoria,

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

    modalCreateOpen() {
      this.modalCreate = true;
    },

    modalUpdateOpen(data){
      this.beforeUpdateData = data
      this.modalUpdate = true;
    },

    modalClose(value) {
      this.modalCreate = value;
      this.modalUpdate = value;
    },

    deleteCategoria(idcategoria){
      
      let confirmar = confirm("Seguro de eliminar esta categoria?")
      if (confirmar) {
        try {
        axios.delete(`http://localhost:8080/api/categoria/${idcategoria}`).then((res) => {
          alert("Categoria eliminado con exito")
          this.loadTable()
        });
      } catch (error) {
        console.error(error);
      }
      }
    }
  },

  mounted() {
    this.loadTable()
  },
};
</script>
