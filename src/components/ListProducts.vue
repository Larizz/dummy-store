<template>
  <div class="flex justify-center">
    <div class="text-gray-600 w-60 p-2">
      <a class="block relative h-48 rounded">
        <img
          alt="ecommerce"
          class="object-cover object-center w-full h-40"
          :src="props.thumbnail"
        />
      </a>
      <div class="space-y-1">
        <h3 class="text-gray-500 text-xs tracking-widest">
          {{ props.category }}
        </h3>
        <h2 class="text-gray-900 text-lg font-medium">{{ props.title }}</h2>
        <p>R${{ props.price }},00</p>
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
