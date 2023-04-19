<template>
  <header>
    <div class="flex justify-between bg-slate-950 text-slate-200 h-14">
      <a class="flex items-center m-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-9 h-9 text-white p-2 bg-green-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </a>
      <!-- <nav
      class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center"
    > -->
      <div class="w-full flex items-center justify-end">
        <ul class="flex justify-end mt-12">
          <li>
            <router-link to="/" class="mr-5 hover:text-white hover: shadow-lg">Home</router-link>
          </li>
          <li><a href="#Products" class="hover:text-white hover: shadow-lg mr-5">Products</a></li>
          <li><a class="mr-5 hover:text-white hover: shadow-lg">List</a></li>
        </ul>
      </div>
      <!-- </nav> -->
    </div>
  </header>
  <CustomHeader></CustomHeader>
  <div class="flex justify-between items-center" id="Products">
    <div class="flex mt-20">
      <h1 class="text-4xl ml-10">Build your cart!</h1>
      <img src="../../public/shopping_cart_checkout_FILL0_wght400_GRAD0_opsz48.svg" alt="" />
      <hr />
    </div>
    <div class="flex items-center justify-between mt-12 mr-32 gap-2">
      <input
        v-model="searchProduct"
        class="focus:outline-none focus:ring-slate-100 focus:border-slate-100 text-xl"
        type="search"
        placeholder="Search..."
      />
    </div>
  </div>
  <div class="flex items-start">
    <div class="m-10">
      <ul>
        <li>
          <button
            class="block mt-1 w-full rounded-xl py-2 hover:text-black"
            @click="filterCategory('Smartphones')"
          >
            Smartphones
          </button>
        </li>
        <li>
          <button
            class="block mt-1 w-full rounded-xl py-2 hover:text-black"
            @click="filterCategory('Laptops')"
          >
            Laptops
          </button>
        </li>
        <li>
          <button
            class="block mt-1 w-full rounded-xl py-2 hover:text-black"
            @click="filterCategory('Fragrancies')"
          >
            Fragrancies
          </button>
        </li>
        <li>
          <button
            class="block mt-1 w-full rounded-xl py-2 hover:text-black"
            @click="filterCategory('Skincare')"
          >
            Skincare
          </button>
        </li>
        <li>
          <button
            class="block mt-1 w-full rounded-xl py-2 hover:text-black"
            @click="filterCategory('Groceries')"
          >
            Groceries
          </button>
        </li>
        <li>
          <button
            class="block mt-1 w-full rounded-xl py-2 hover:text-black"
            @click="filterCategory('Home-decoration')"
          >
            Home-decoration
          </button>
        </li>
      </ul>
    </div>
    <div class="ml-24">
      <section class="grid grid-cols-4 mt-10 ml-32">
        <ListProducts
          v-for="product in productFilter"
          :key="product.id"
          :title="product.title"
          :price="product.price"
          :category="product.category"
          :thumbnail="product.thumbnail"
        />
      </section>
    </div>
  </div>
  <section>
    <div class="w-5/6">
      <div class="w-full bg-pink-300 m-20 rounded-md p-20">
        <div>
          <h1 class="text-4xl font-black text-black mb-5">Interact with us!</h1>
          <p class="text-lg font-medium text-black mb-15">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, impedit accusamus sint
            corrupti, illum animi consectetur hic sequi voluptate odit itaque
          </p>
          <label for="" class="text-slate-500">Here you can add a product.</label>
          <div class="mt-4 gap-2" id="form">
            <input
              v-model="newProduct"
              type="text"
              placeholder="Add a product"
              class="focus:outline-none"
            />
            <button type="submit" class="bg-black rounded-sm w-24" @click="postProducts">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed, watch } from 'vue'
import services from '@/services'
import ListProducts from '../components/ListProducts.vue'
import CustomHeader from '../components/CustomHeader.vue'
import CategoriesProducts from '../components/Categories/CategoriesProducts.vue'
import axios from 'axios'

interface State {
  products: any
}

onMounted(() => {
  getAllProducts()
})

const products = ref<any>([])
let searchProduct = ref('')
const newProduct = ref('')
const state = ref<any>({
  category: null,
  products
})

const filterCategory = (category: string) => {
  state.value.category = category
}

// const getFilterCategory = () => {
//   if (!state.value.category) {
//     return state.value.products
//   }
//   return state.value.products.filter((product: any) => product.category === state.value.category)
// }

const productFilter = computed(() => {
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
const postProducts = async () => {
  const data = {
    title: 'car'
  }
  axios
    .post('https://dummyjson.com/products/add', { params: data })
    .then((response) => console.log(response))

  newProduct.value = ''
  alert('New product successfully added!')
}
</script>

<style scoped></style>
