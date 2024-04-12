<template>
  <div class="mt-10 bg-white">
    <div
      class="w-full bg-slate-100 py-24 px-6 text-center dark:bg-neutral-900"
    >
      <h1
        class="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl"
      >
        El mejor lugar para encontrar <br /><span class="text-blue-600"
          >arte independiente</span
        >
      </h1>
      <router-link
      to="/store"
        class="mb-2 inline-block rounded bg-blue-700 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
        >Ir a Tienda</router-link
      >
    </div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl sm:py-10 lg:max-w-none lg:py-18">
        <h2 class="text-2xl font-bold text-gray-900">CATEGORIAS</h2>

        <div
          class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0"
        >
          <div
            v-for="categoria in this.categorias"
            :key="categoria.name"
            class="group relative mb-8"
          >
            <div
              class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64"
            >
              <img
                :src="categoria.imageSrc"
                :alt="categoria.imageAlt"
                class="h-full w-full object-cover object-center"
              />
            </div>
            <h3 class="mt-6 text-sm text-gray-500">
              <a
                class="hover:cursor-pointer"
                @click="showProductosPorCategoria(categoria.id)"
              >
                <span class="absolute inset-0" />
                {{ categoria.name }}
              </a>
            </h3>
            <p class="text-base font-semibold text-gray-900">
              {{ categoria.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorias: [
        {
          name: "Arte Digital",
          description: "Esto es arte digital",
          imageSrc:
            "https://www.artel.cl/wp-content/uploads/2023/06/portada-el-arte-digital-una-ventana.jpg",

          id: 1,
        },
        {
          name: "Pinturas",
          description: "Esto es pinturas",
          imageSrc:
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJ0lCngLRQMCK05X525qgFXNZ26oNmM0YM_bm9J5ef0Bl51oyr4iixHvYYiHGkGhzbGDA884YXiN5aA8tzRuNZGIE1mwhCxP9TBnQOeU1_QTVWYuudtYgLSUA2hWtVrWXoWA-v4LsvMohx/s1600/exponer-arte.jpg",

          id: 2,
        },
        {
          name: "Esculturas",
          description: "Esto es esculturas",
          imageSrc:
            "https://s1.elespanol.com/2017/05/17/cultura/arte/arte_216739233_34517742_1706x960.jpg",

          id: 3,
        },
      ],
    };
  },

  methods: {
    showProductosPorCategoria(idcategoria) {
      this.$router.push({
        name: "store",
        params: { id: idcategoria },
      });
    },
  },
};
</script>
