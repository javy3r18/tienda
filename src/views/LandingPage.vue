<template>
  
  <div class="overflow-hidden w-full max-h-vh flex justify-center">
    <NavbarLanding></NavbarLanding>
    <div class="w-full max-w-7xl mx-20 flex justify-center">
      <div class="w-1/2 max-h-screen z-20">
        <section class=" py-20 flex flex-col justify-center">
          <div class="grid grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div class="flex justify-end">
              <img
                class="w-2/3 h-2/3 object-cover rounded-lg overflow-hidden"
                src="https://paradibujantes.com/wp-content/uploads/2023/06/escultura-en-piedra-683x1024.jpg.webp"
              />
            </div>
            <div class="flex justify-start">
              <img
                class="rounded-lg object-cover overflow-hidden"
                src="https://images.joseartgallery.com/64002/conversions/marine-art-painting-sea-painting-oil-on-canvas-thumb900.jpg"
              />
            </div>
            <div class="-mt-64 flex justify-start">
              <img
                class="rounded-lg object-cover overflow-hidden"
                src="https://e1.pxfuel.com/desktop-wallpaper/391/165/desktop-wallpaper-kimetsu-no-yaiba-anime-girls-2d-fan-art-digital-art-vertical-dark-girl-fanart-anime.jpg"
              />
            </div>
            <div class="flex justify-start -mr-28 ml-28">
              <img
                class="w-2/3 h-2/3 object-cover rounded-lg overflow-hidden"
                src="https://inba.gob.mx/multimedia/prensa/galerias/19014/19014-IMG_BG_POST-munal_1.jpg"
              />
            </div>
            <div
              class="-translate-y-96 transform ml-28 -mr-28 p-16 shadow-xl rounded-xl overflow-hidden bg-white"
            >
              <div class="space-y-4">
                <p class="text-3xl font-bold text-black tracking-tight">
                  ARTE UNICO PARA TI!
                </p>
                <p class="text-xl text-black">Registrate y explora nuestra tienda online y encuentra tu pieza de arte perfecta. Obras de todo tipo de artistas independientes.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="w-1/2 max-h-screen z-20">
        <Register></Register>
      </div>
      <div class="z-0 w-full h-screen fixed bg-[url('../assets/bg.jpg')] bg-cover ">
    </div>
    <div class="z-10 w-full h-screen bg-sky-950 fixed opacity-80">
    </div>
    </div>
  </div>
</template>


<script>
import Register from "@/components/RegisterLanding.vue";
import NavbarLanding from '@/components/NavbarLanding.vue'

export default{
  components: {
    Register,
    NavbarLanding
  }
}
</script>


<style scoped>
.overflow-hidden {
  overflow: hidden; 
}
</style>
