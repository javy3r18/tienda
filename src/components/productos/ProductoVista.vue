<template>
  <div class="h-screen flex justify-center items-center">
    <section class="py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="slider-box w-full h-full max-lg:mx-auto mx-0 flex justify-center bg-gray-200 ">
            <div class="main-img mb-3 min-w-[550px] max-w-[550px] min-h-[600px] max-h-[600px]">
              <img
                :src="`http://localhost:8080/` + this.producto.image"
                class="w-full h-full object-contain"
              />
            </div>
          </div>
          <div class="flex justify-center items-center">
            <div
              class="pro-detail w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8"
            >
              <div class="flex items-center justify-between gap-6 mb-6">
                <div class="text">
                  <h2
                    class="font-manrope font-bold text-5xl leading-10 text-gray-900 mb-2"
                  >
                    {{ this.producto.nombre }}
                  </h2>
                  <hr>
                  <p class="my-5 font-normal text-base text-gray-500">
                    {{ this.producto.descripcion }}
                  </p>
                  <hr>
                  <div class="my-5">
                    <p class="font-normal text-lg">
                    <b>Autor: </b>{{ this.autor.autor }}
                  </p>

                  <p class="font-normal text-lg">
                    <b>En stock: </b>{{ this.producto.stock }}
                  </p>
                  </div>
                  <hr>
                </div>
              </div>

              <div
                class="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3"
              >
                <div class="flex items-center">
                  <h5
                    class="font-manrope font-semibold text-2xl leading-9 text-gray-900"
                  >
                    $ {{ this.producto.precio }} MXN
                  </h5>
                </div>
              </div>
              <div v-if="!paidFor && !paidError">
                <button
                  :disabled="disabled"
                  @click="toggleCollapse"
                  :class="
                    this.disabled
                      ? ' opacity-50 cursor-not-allowed text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm shadow-transparent'
                      : 'text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-300'
                  "
                >
                  {{ collapsed ? "Comprar" : "Cancelar" }}
                </button>

                <div>
                  <transition
                    enter-active-class="ease-out duration-300"
                    enter-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="ease-in duration-200"
                    leave-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <div v-show="!collapsed" class="mt-5" ref="paypal"></div>
                  </transition>
                </div>
              </div>

              <div v-if="paidFor">
                <h2
                  class="font-manrope font-semibold text-2xl leading-9 text-green-600"
                >
                  ¡Pago realizado con exito!
                </h2>
              </div>
              <div v-if="paidError">
                <h2
                  class="font-manrope font-semibold text-2xl leading-9 text-red-600"
                >
                  ¡Ha ocurrido un error!
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      idproducto: null,
      producto: {},
      autor: {},
      collapsed: true,
      paidFor: false,
      paidError: false,
      disabled: false,
    };
  },

  methods: {
    setLoaded: function () {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            console.log("Datos del formulario:", this.form);
            return actions.order.create({
              purchase_units: [
                {
                  description: 'Producto comprado en V-ART eshop: '+ this.producto.nombre,
                  amount: {
                    value: this.producto.precio,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            this.producto.stock = this.producto.stock - 1;
            this.updateStock(this.producto.stock);
            this.crearRecibo(order);
            this.addVenta();
            console.log(order);
          },
          onError: (err) => {
            this.paidError = true;
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },

    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },

    updateStock(newStock) {
      axios
        .put(`http://localhost:8080/api/producto/${this.producto.id}`, {
          stock: newStock,
        })
        .then((response) => {
          console.log("Producto actualizado:", response.data);
        })
        .catch((error) => {
          console.error("Error al guardar el producto:", error);
        });
    },

    getProducto() {
      try {
        axios
          .get(`http://localhost:8080/api/getProductosId/${this.idproducto}`)
          .then((res) => {
            this.producto = res.data
            console.log(this.producto);
            if (this.producto.stock == 0) {
              this.disabled = true;
            }
            this.getAutor();
          });
      } catch (error) {
        console.error(error);
      }
    },

    getAutor() {
      try {
        axios
          .get(`http://localhost:8080/api/getAutores/${this.producto.idautor}`)
          .then((res) => {
            this.autor = res.data;
          });
      } catch (error) {
        console.error(error);
      }
    },

    crearRecibo(order) {
      const address = order.purchase_units[0].shipping.address;
      const direccionString = Object.values(address).join(", ");

      const reciboData = {
        fecha: order.create_time,
        descripcion: order.purchase_units[0].description,
        precio: order.purchase_units[0].amount.value,
        nombre: order.purchase_units[0].shipping.name.full_name,
        direccion: direccionString,
      };

      axios
        .post("http://localhost:8080/api/recibo/", reciboData)
        .then((response) => {
          console.log("Recibo creado:", response.data);
        })
        .catch((error) => {
          console.error("Error al guardar el Recibo:", error);
        });
    },

    addVenta() {
      const ventaData = {
        nombreproducto: this.producto.nombre,
        precio: this.producto.precio,
        idautor: this.producto.idautor,
        idcategoria: this.producto.idcategoria,
      };
      axios
        .post("http://localhost:8080/api/venta/", ventaData)
        .then((response) => {
          console.log("Venta creada:", response.data);
        })
        .catch((error) => {
          console.error("Error al guardar la venta:", error);
        });
    },
    
  },

  created() {
    this.idproducto = this.$route.params.id;
    this.getProducto();
  },

  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYJbbHLDLdmskXq-G6ihx1IR0lYolHr1jp8YFfaFNlwdIUdX1DHIZdPZirPG0uEmLPEUK6xDk5dVDVlp&currency=MXN";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
};
</script>
