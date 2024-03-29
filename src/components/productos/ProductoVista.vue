<template>
  <div>
    <section class="py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="slider-box w-full h-full max-lg:mx-auto mx-0">
            <div class="main-img mb-3 min-[400px]:mb-8">
              <img
                :src="`http://localhost:8080/` + this.data.image"
                alt="Summer Travel Bag image"
                class="max-lg:mx-auto"
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
                    class="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2"
                  >
                    {{this.data.nombre}}
                  </h2>
                  <p class="font-normal text-base text-gray-500">ABS LUGGAGE</p>
                </div>
              </div>

              <div
                class="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3"
              >
                <div class="flex items-center">
                  <h5
                    class="font-manrope font-semibold text-2xl leading-9 text-gray-900"
                  >
                    $ {{this.data.precio}}
                  </h5>
                  
                </div>
              </div>
              <button
                class="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      data: {},
    }
  },

  methods: {
   
  },

  created(){
    this.data = JSON.parse(this.$route.params.producto);
  },
}

</script>
