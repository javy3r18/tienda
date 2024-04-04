<template>
    <div>
      <h2 class="block text-center mb-4">Lista de autores</h2>
  
      <div class="w-full flex justify-center items-center flex-col">
        <div class="mb-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            @click="modalCreateOpen"
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
                  <button @click="modalUpdateOpen(a)">Editar</button>
                  <button @click="deleteAutor(a.id)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <CrearAutor :modal="modalCreate" @clicked="modalClose" @updateTable="loadTable"></CrearAutor>
      <EditarAutor :modal="modalUpdate" :data="beforeUpdateData" @clicked="modalClose" @updateTable="loadTable"></EditarAutor>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import CrearAutor from "./CrearAutorForm.vue"
  import EditarAutor from './EditarAutorForm.vue'
  
  export default {
    data() {
      return {
        modalCreate: false,
        modalUpdate: false,
        beforeUpdateData: {},
        autores: [],
      };
    },
  
    components: {
      CrearAutor,
      EditarAutor,
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

    deleteAutor(idautor){
      
      let confirmar = confirm("Seguro de eliminar este autor?")
      if (confirmar) {
        try {
        axios.delete(`http://localhost:8080/api/autor/${idautor}`).then((res) => {
          alert("Autor eliminado con exito")
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
  