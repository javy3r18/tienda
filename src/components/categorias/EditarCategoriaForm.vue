<template>
    <div>
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="modal"
          class="relative z-30"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          ></div>
  
          <div class="fixed inset-0 z-30 w-screen overflow-y-auto">
            <div
              class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
              <transition
                enter-active-class="ease-out duration-300"
                enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                leave-active-class="ease-in duration-200"
                leave-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div
                  class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          class="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Editar categoria:
                        </h3>
                        <div class="mt-2 w-full justify-center">
                          <form id="EditarCategoriaForm" @submit.prevent="submitForm" class="flex flex-col">
                            <label
                              for="nombre"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >Nombre de la categoria:</label
                            >
                            <input
                            required
                              v-model="form.categoria"
                              class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              type="text"
                              name="nombre"
                              id="nombre"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                  >
                    <button
                      form="EditarCategoriaForm"
                      type="submit"
                      class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                      Editar categoria
                    </button>
                    <button
                      type="button"
                      @click="clicked"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
      modal: Boolean,
      data: Object,
    },
  
    data() {
      return {
        form: {
          categoria: null
        },
      };
    },
  
    watch: {
      // Observa cambios en la propiedad 'data'
      data: {
        handler(newData) {
          if (newData && newData.categoria) {
            this.form.categoria = newData.categoria;
          }
        },
        immediate: true, // Ejecuta el watcher inmediatamente después de la creación del componente
      },
    },
  
    methods: {
      clicked() {
        this.$emit("clicked", false);
      },
  
      updateTable() {
        this.$emit("updateTable");
      },
  
      submitForm() {
        const categoriaData = {
            categoria: this.form.categoria
        }
        axios
          .put(`http://localhost:8080/api/categoria/${this.data.id}`, categoriaData)
          .then((response) => {
            console.log("Producto guardado:", response.data);
            this.clicked();
            this.updateTable();
          })
          .catch((error) => {
            console.error("Error al guardar el producto:", error);
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
          });
      },
    },
  };
  </script>
  