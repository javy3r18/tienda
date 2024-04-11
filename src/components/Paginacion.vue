<template>
  <div class="flex justify-center items-center mt-5">
    <button
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
      @click="irAPagina(1)"
      :disabled="currentPage === 1"
    >
      <b><<</b>
    </button>
    <button
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
      @click="irAPagina(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      Anterior
    </button>

    <span
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200"
      >Página <b>{{ currentPage }}</b> de {{ totalPages }}</span
    >

    <button
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
      @click="irAPagina(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      Siguiente
    </button>
    <button
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
      @click="irAPagina(totalPages)"
      :disabled="currentPage === totalPages"
    >
      <b>>></b>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    irAPagina(pagina) {
      if (
        pagina >= 1 &&
        pagina <= this.totalPages &&
        pagina !== this.currentPage
      ) {
        this.$emit("cambio-pagina", pagina);
      }
    },
  },
};
</script>
