<template>
<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                          <form class="space-y-6" action="#" method="POST">
                            <div>
                              <label
                                for="nombre"
                                class="block text-sm font-medium leading-6 text-gray-900"
                                >Nombre del producto</label
                              >
                              <div class="mt-2">
                                <input
                                  type="text"
                                  name="nombre"
                                  required=""
                                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div>
                              <div class="flex items-center justify-between">
                                <label
                                  for="precio"
                                  class="block text-sm font-medium leading-6 text-gray-900"
                                  >Precio</label
                                >
                              </div>
                              <div class="mt-2">
                                <input
                                  name="precio"
                                  type="text"
                                  required=""
                                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div>
                              <button
                                type="submit"
                                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                await
                              </button>
                            </div>
                          </form>
                        </div>
</template>

<script>
export default {
    
}
</script>
<style lang="">
    
</style>