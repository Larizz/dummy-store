<template>
  <div class="flex justify-center bg-slate-100 m-10 ml-0">
    <div class="text-gray-600 w-85">
      <a class="block relative h-48">
        <img alt="ecommerce" class="object-cover object-center h-full" :src="props.thumbnail" />
      </a>
      <div class="p-3">
        <h3 class="text-gray-500 text-sm tracking-widest pb-3">
          {{ props.category }}
        </h3>
        <div class="flex justify-between items-center w-full">
          <h2 class="text-gray-900 text-xl font-medium">
            {{ props.title }}
          </h2>
          <img src="../../public/icons8-copas-30.png" class="w-4 h-4 hover:w-5 hover:h-5" />
        </div>
        <p class="text-base">R${{ props.price }},00</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  thumbnail: string
  price: number
  category: string
}>()
</script>

<style scoped></style>
