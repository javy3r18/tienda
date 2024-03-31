<template>
  <div>
    <h2 class="block text-center mb-4">Lista de productos</h2>

    <div class="w-full flex justify-center items-center flex-col">
      <div class="mb-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          @click="modalOpen"
        >
          Crear producto
        </button>
      </div>
      <div class="max-w-7xl mb-10">
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Clave producto
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Nombre
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Descripcion
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Precio
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Stock
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Id Autor
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Id Categoria
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Image name
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Image
              </th>
              <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Accion
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in productos" :key="p.id">
              <td class="p-3 text-small text-gray-700">{{ p.id }}</td>
              <td class="p-3 text-small text-gray-700">{{ p.nombre }}</td>
              <td class="p-3 text-small text-gray-700">{{ p.descripcion }}</td>
              <td class="p-3 text-small text-gray-700">$ {{ p.precio }}</td>
              <td class="p-3 text-small text-gray-700">{{ p.stock }}</td>
              <td class="p-3 text-small text-gray-700">{{ p.idautor }}</td>
              <td class="p-3 text-small text-gray-700">{{ p.idcategoria }}</td>
              <td class="p-3 text-small text-gray-700">{{ p.image }}</td>
              <td class="p-3 text-small text-gray-700">
                <img
                  class="w-32"
                  :src="`http://localhost:8080/` + p.image"
                  alt=""
                />
              </td>
              <td class="p-3 text-small text-gray-700">
                <router-link to="/"> Editar</router-link>
                <button type="">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <CrearProductos :modal="modal" @clicked="modalClose" @updateTable="loadTable"></CrearProductos>
  </div>
</template>

<script>
import axios from "axios";
import CrearProductos from "./CrearProductosForm.vue";

export default {
  data() {
    return {
      modal: false,
      productos: [],
    };
  },

  components: {
    CrearProductos,
  },

  methods: {
    loadTable() {
      try {
        axios.get("http://localhost:8080/api/getProductos/").then((res) => {
          this.productos = res.data;
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
