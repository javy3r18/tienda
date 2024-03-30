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
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                      <div class="mt-2 w-full justify-center">
                        <form class="flex flex-col">
                          <label
                            for="nombre"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Nombre: </label
                          >
                          <input
                            v-model="form.nombre"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text"
                            name="nombre"
                            id="nombre"
                          />
                          <label
                            for="correo"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Correo electronico: </label
                          >
                          <input
                            v-model="form.correo"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text"
                            name="correo"
                            id="correo"
                          />
                          <label
                            for="calle"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Calle:</label
                          >
                          <input
                            v-model="form.calle"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text"
                            step="0.01"
                            name="calle"
                            id="calle"
                          />
                          <label
                            for="ciudad"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Ciudad:</label
                          >
                          <input
                            v-model="form.ciudad"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text"
                            step="0.01"
                            name="ciudad"
                            id="ciudad"
                          />
                          <label
                            for="codigoPostal"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >Codigo Postal:</label
                          >
                          <input
                            v-model="form.codigoPostal"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text"
                            step="0.01"
                            name="codigoPostal"
                            id="codigoPostal"
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
        loaded: false,
        paidFor: false,
      form: {
        nombre: null,
        correo: null,
        calle: null,
        ciudad: null, 
        codigoPostal: null,
      },
      }
    },
  
    methods: {
      setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            console.log("Datos del formulario:", this.form);
            return actions.order.create({
              purchase_units: [{
            description: this.data.descripcion,
            amount: {
                currency_code: "USD",
                value: this.data.precio
            },
        }]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal)
    },

    clicked() {
      this.$emit("clicked", false);
    },
  },

    mounted(){
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYJbbHLDLdmskXq-G6ihx1IR0lYolHr1jp8YFfaFNlwdIUdX1DHIZdPZirPG0uEmLPEUK6xDk5dVDVlp";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
    }
  };
  </script>
  