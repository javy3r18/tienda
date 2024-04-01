<template>
    <div>
      <h2 class="block text-center mb-4">Lista de autores</h2>
  
      <div class="w-full flex justify-center items-center flex-col">
        <div class="mb-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            @click="modalOpen"
          >
            Crear Autor
          </button>
        </div>
        <div class="w-full max-w-7xl mb-10">
          <table class="w-full">
            <thead class="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Clave Autor
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Autor
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Nacionalidad
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                Correo 
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in autores" :key="a.id">
                <td class="p-3 text-small text-gray-700">{{ a.id }}</td>
                <td class="p-3 text-small text-gray-700">{{ a.autor }}</td>
                <td class="p-3 text-small text-gray-700">{{ a.nacionalidad }}</td>
                <td class="p-3 text-small text-gray-700">{{ a.correo }}</td>
                <td class="p-3 text-small text-gray-700">
                  <router-link to="/"> Editar</router-link>
                  <button type="">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <CrearAutor :modal="modal" @clicked="modalClose" @updateTable="loadTable"></CrearAutor>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import CrearAutor from "./CrearAutorForm.vue"
  
  export default {
    data() {
      return {
        modal: false,
        autores: [],
      };
    },
  
    components: {
      CrearAutor,
    },
  
    methods: {
      loadTable() {
        try {
          axios.get("http://localhost:8080/api/getAutores/").then((res) => {
            this.autores = res.data;
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
  