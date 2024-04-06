<template>
  <div>
    <h2 class="block text-center mb-4">Lista de productos</h2>

    <div class="w-full flex justify-center items-center flex-col">
      <div class="mb-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          @click="modalCreateOpen"
        >
          Crear producto
        </button>
      </div>
      <div class="max-w-7xl mb-10">
        <table class="table-auto w-full">
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
              <td class="border-b border-slate-200  p-4 text-slate-500 ">{{ p.id }}</td>
              <td class="border-b border-slate-200  p-4 text-slate-500 ">{{ p.nombre }}</td>
              <td class="border-b border-slate-200  p-4 text-slate-500 ">{{ p.descripcion }}</td>
              <td class="border-b border-slate-200  p-4 text-slate-500 ">$ {{ p.precio }}</td>
              <td class="border-b border-slate-200  p-4 text-slate-500 ">{{ p.stock }}</td>
              <td class="border-b border-slate-200  p-4 text-slate-500 ">{{ p.idautor }}</td>
              <td class="border-b border-slate-200  p-4 text-slate-500 ">{{ p.idcategoria }}</td>
              <td class="border-b border-slate-200  p-4 text-slate-500 ">{{ p.image }}</td>
              <td class="border-b border-slate-200  p-4 text-slate-500 ">
                <img
                  class="w-32"
                  :src="`http://localhost:8080/` + p.image"
                  alt=""
                />
              </td>
              <td class="border-b border-slate-200  p-4 text-slate-500">
                <button class="mx-2 my-1 bg-transparent hover:bg-yellow-400 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded" @click="modalUpdateOpen(p)">Editar</button>
                <button class="mx-2 my-1 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" @click="deleteProducto(p.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <CrearProductos :modal="modalCreate" @clicked="modalClose" @updateTable="loadTable"></CrearProductos>
    <EditarProductos :modal="modalUpdate" :data="beforeUpdateData" @clicked="modalClose" @updateTable="loadTable"></EditarProductos>
  </div>
</template>

<script>
import axios from "axios";
import CrearProductos from "./CrearProductosForm.vue";
import EditarProductos from './EditarProductosForm.vue'

export default {
  data() {
    return {
      modalCreate: false,
      modalUpdate: false,
      beforeUpdateData: {},
      productos: [],
    };
  },

  components: {
    CrearProductos,
    EditarProductos,
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

    deleteProducto(idproducto){
      
      let confirmar = confirm("Seguro de eliminar este producto?")
      if (confirmar) {
        try {
        axios.delete(`http://localhost:8080/api/producto/${idproducto}`).then((res) => {
          alert("Producto eliminado con exito")
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
