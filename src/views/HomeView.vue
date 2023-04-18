<template>
  <header class="text-gray-600 body-font flex flex-col">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </a>
      <nav
        class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center"
      >
        <router-link to="/" class="mr-5 hover:text-gray-900">Home</router-link>
        <a class="mr-5 hover:text-gray-950">Products</a>
        <a class="mr-5 hover:text-gray-950">List</a>
        <a class="mr-5 hover:text-gray-950">Fourth Link</a>
      </nav>
      <div>
        <input v-model="searchProduct" type="search" placeholder="Search..." />
      </div>
    </div>
  </header>
  <div class="grid grid-cols-4 gap-4 m-16">
    <ListProducts
      v-for="product in productFilter"
      :key="product.id"
      :title="product.title"
      :price="product.price"
      :category="product.category"
      :urlProductImg="urlProductImg"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import services from '@/services'
import ListProducts from '../components/ListProducts.vue'

interface State {
  products: any
}

onMounted(() => {
  getAllProducts()
})

let urlProductImg = ref('https://i.dummyjson.com/data/products/1/thumbnail.jpg')
const products = ref<any>([])
let searchProduct = ref('')

// const state: State = reactive({
//   products: []
// })

const productFilter = computed(() => {
  console.log('products:', products.value)
  console.log('searchProduct:', searchProduct.value)
  if (products.value && searchProduct.value) {
    return products.value.filter((Products: any) =>
      Products.title.toLowerCase().includes(searchProduct.value.toLowerCase())
    )
  }
  return products.value
})

const getAllProducts = async () => {
  const { data } = await services.products.getAllProducts()
  products.value = data.products
  // state.products = data.products

  // console.log(state.products)
}
</script>

<style scoped></style>
