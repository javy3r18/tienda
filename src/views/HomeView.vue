<template>
  <div class="mt-10 bg-gray-100">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl py-16 sm:py-20 lg:max-w-none lg:py-20">
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
              <a class="hover:cursor-pointer" @click="showProductosPorCategoria(categoria.id)">
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
          imageAlt:
            "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
          id: 1,
        },
        {
          name: "Pinturas",
          description: "Esto es pinturas",
          imageSrc:
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJ0lCngLRQMCK05X525qgFXNZ26oNmM0YM_bm9J5ef0Bl51oyr4iixHvYYiHGkGhzbGDA884YXiN5aA8tzRuNZGIE1mwhCxP9TBnQOeU1_QTVWYuudtYgLSUA2hWtVrWXoWA-v4LsvMohx/s1600/exponer-arte.jpg",
          imageAlt:
            "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
          id: 2,
        },
        {
          name: "Esculturas",
          description: "Esto es esculturas",
          imageSrc:
            "https://www.ull.es/portal/noticias/wp-content/uploads/sites/13/2023/01/Expo-Pintura-Escultura-22-05_1.jpg",
          imageAlt:
            "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
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
