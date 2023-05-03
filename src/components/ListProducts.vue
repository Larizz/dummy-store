<template>
  <div class="flex justify-center bg-slate-50 m-10 ml-0">
    <div class="text-gray-600 w-85 border border-slate-400 rounded-lg p-2">
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
        </div>
        <p class="text-base">R${{ props.price }},00</p>
        <button
          type="submit"
          class="bg-slate-200 rounded-lg w-24 h-10 md:mt-3 hover:text-black"
          @click="$emit('showModal')"
        >
          View more
        </button>
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

defineEmits<{
  (e: 'showModal'): void
}>()
</script>

<style scoped></style>
