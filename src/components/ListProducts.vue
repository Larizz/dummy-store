<template>
  <div class="flex">
    <div class="text-gray-600 body-font lg:w-1/2 md:w-60 p-2 w-full">
      <a class="block relative h-48 rounded overflow-hidden">
        <img alt="ecommerce" class="object-cover object-center w-30 h-40" :src="urlProductImg" />
      </a>
      <div class="m-1">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
          {{ products.category }}
        </h3>
        <h2 class="text-gray-900 title-font text-lg font-medium">{{ products.title }}</h2>
        <p class="mt-1">R${{ products.price }},00</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const products = defineProps(['title', 'urlProductImg', 'price', 'category'])
</script>

<style scoped></style>
