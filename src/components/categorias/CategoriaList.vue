<template>
  <div>
    <h2>Lista de categorias</h2>

    <div>
      <div>
        <router-link to="/"> Crear categoria </router-link>
      </div>
      <div>
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Clave categoria
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                categoria
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Accion
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in categorias" :key="c.idCategoria">
              <td class="p-3 text-small text-gray-700">{{ c.idcategoria }}</td>
              <td class="p-3 text-small text-gray-700">{{ c.categoria }}</td>
              <td class="p-3 text-small text-gray-700">
                <button type="button" @click="modalOpen(c.idcategoria)">
                  Mostrar
                </button>
                <router-link to="/"> Editar</router-link>
                <button type="">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <CategoriaModal :modal="modal" :id="idCategoriaSel"></CategoriaModal>

  </div>
</template>

<script>
import axios from "axios";
import CategoriaModal from "./CategoriaModal.vue";

export default {
  name: "CategoriaList",

  data() {
    return {
      modal: false,
      categorias: [],
      idCategoriaSel: null,
    };
  },

  components: {
    CategoriaModal
  },

  methods: {
    modalOpen(id){
      this.modal = true;
      this.idCategoriaSel = id
    }
  },

  mounted() {
    try {
      axios.get("http://localhost:8080/api/getCategorias/").then((res) => {
      this.categorias = res.data;
    });
    } catch (error) {
      console.error(error)
    }
  },
};
</script>
