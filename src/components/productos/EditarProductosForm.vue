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
                        Editar producto:
                      </h3>
                      <div class="mt-2 w-full justify-center">
                        <form id="EditarProductoForm" @submit.prevent="submitForm" class="flex flex-col">
                          <label
                            for="nombre"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Nombre del producto:</label
                          >
                          <input
                            required
                            v-model="form.nombre"
                            class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text"
                            name="nombre"
                            id="nombre"
                          />
                          <label
                            for="descripcion"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Descripcion del producto:</label
                          >
                          <input
                            required
                            v-model="form.descripcion"
                            class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text"
                            name="descripcion"
                            id="descripcion"
                          />
                          <label
                            for="precio"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Precio:</label
                          >
                          <input
                            required
                            v-model="form.precio"
                            class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="number"
                            step="0.01"
                            name="precio"
                            id="precio"
                          />
                          <label
                            for="stock"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Stock:</label
                          >
                          <input
                            required
                            v-model="form.stock"
                            class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="number"
                            name="stock"
                            id="stock"
                          />
                          <label
                            for="idautor"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Autor:
                          </label>
                          <select
                          required
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            v-model="form.idautor"
                            name="idautor"
                          >
                            <option
                              v-for="a in autores"
                              :key="a.id"
                              :value="a.id"
                            >
                              {{ a.autor }}
                            </option>
                          </select>
                          <label
                            for="idcategoria"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Categoria:</label
                          >
                          <select
                          required
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            v-model="form.idcategoria"
                            name="idcategoria"
                          >
                            <option
                              v-for="c in categorias"
                              :key="c.id"
                              :value="c.id"
                            >
                              {{ c.categoria }}
                            </option>
                          </select>
                          <label
                            for="image"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Imagen:</label
                          >
                          <input
                            @change="onFileChange"
                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                            type="file"
                            name="image"
                            id="image"
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
                    form="EditarProductoForm"
                    type="submit"
                    class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    Editar producto
                  </button>
                  <button
                    type="button"
                    @click="clicked"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
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
        nombre: null,
        descripcion: null,
        precio: null,
        stock: null,
        idautor: null,
        idcategoria: null,
        image: null,
      },
    };
  },

  created() {
    this.getAutoresAndCategorias();
  },

  watch: {
    // Observa cambios en la propiedad 'data'
    data: {
      handler(newData) {
        if (newData && newData.nombre) {
          this.form.nombre = newData.nombre;
          this.form.descripcion = newData.descripcion;
          this.form.precio = newData.precio;
          this.form.stock = newData.stock;
          this.form.idautor = newData.idautor;
          this.form.idcategoria = newData.idcategoria;
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

    onFileChange(event) {
        this.form.image = event.target.files[0];
    },

    submitForm() {
      const formData = new FormData();
      formData.append("nombre", this.form.nombre);
      formData.append("descripcion", this.form.descripcion);
      formData.append("precio", this.form.precio);
      formData.append("stock", this.form.stock);
      formData.append("idautor", this.form.idautor);
      formData.append("idcategoria", this.form.idcategoria);
      if (this.form.image) {
        formData.append("image", this.form.image);
      }
      axios
        .put(`http://localhost:8080/api/producto/${this.data.id}`, formData)
        .then((response) => {
          console.log("Producto guardado:", response.data);
          this.form.image = null
          this.clicked();
          this.updateTable();
        })
        .catch((error) => {
          console.error("Error al guardar el producto:", error);
          // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        });
    },

    getAutoresAndCategorias() {
      axios
        .get("http://localhost:8080/api/getCategorias")
        .then((response) => {
          this.categorias = response.data;
        })
        .catch((error) => {
          console.error("Ocurrio un error");
        });

      axios
        .get("http://localhost:8080/api/getAutores")
        .then((response) => {
          this.autores = response.data;
        })
        .catch((error) => {
          console.error("Ocurrio un error");
        });
    },
  },
};
</script>
