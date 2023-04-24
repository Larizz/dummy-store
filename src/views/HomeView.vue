<template>
  <header>
    <div class="flex justify-between bg-slate-100 text-gray-600 h-18">
      <div class="flex w-full justify-between m-6">
        <ul class="flex gap-5 items-center text-lg tracking-widest">
          <li class="hover:text-black"><RouterLink to="/">HOME</RouterLink></li>
          <li class="hover:text-black"><a href="#Products">STORE</a></li>
        </ul>
        <div class="flex items-center gap-2">
          <img src="../../public/sacolas-de-compras (3).png" alt="" />
          <h5 class="text-lg text-black tracking-widest">DUMMY STORE</h5>
        </div>
        <div class="flex items-center">
          <ul class="flex gap-2">
            <li>
              <a href=""><img src="../../public/user (1).png" alt="" class="hover:h-8" /></a>
            </li>
            <li>
              <RouterLink to="/customer"
                ><img src="../../public/carrinho-de-compras.png" alt="" class="hover:h-8"
              /></RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <CustomHeader></CustomHeader>
  <div
    class="flex justify-between items-center ml-20 text-gray-600 tracking-widest mr-48"
    id="Products"
  >
    <div class="flex items-center mt-20">
      <h1 class="text-4xl m-10">STORE</h1>
      <div class="ml-10">
        <ul class="flex ml-10 gap-5">
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
        </ul>
      </div>
    </div>
    <input
      v-model="searchProduct"
      class="focus:outline-none focus:ring-slate-100 focus:border-slate-100 text-xl mt-20"
      type="search"
      placeholder="Search..."
    />
  </div>
  <div class="flex items-start">
    <div class="ml-24">
      <section class="grid grid-cols-5 ml-10">
        <ListProducts
          @show-modal="getSingleProduct(product.id)"
          v-for="product in productFilter"
          :key="product.id"
          :title="product.title"
          :price="product.price"
          :category="product.category"
          :thumbnail="product.thumbnail"
        />
        <v-dialog v-model="dialog" width="auto">
          <v-card>
            <v-dialog v-model="dialog" width="auto">
              <v-card class="text-gray-700 bg-gray-200 rounded-lg p-10 flex justify-center">
                <h1 class="m-5 mb-2 text-4xl">{{ product.title }}</h1>
                <h2 class="ml-5 text-lg">{{ product.category }}</h2>
                <h3 class="ml-5 text-base">{{ product.brand }}</h3>
                <h3 class="ml-5">R${{ product.price }},00</h3>
                <div class="w-40">
                  <img
                    :src="product.thumbnail"
                    alt=""
                    class="object-cover object-center h-full m-5 rounded-sm"
                  />
                </div>
                <v-card-text>Description: {{ product.description }} </v-card-text>
                <h3>Assessment: {{ product.rating }}</h3>
                <h3>stock: {{ product.stock }}</h3>
                <v-card-actions class="flex justify-center">
                  <v-btn color="secundary" @click="dialog = false" class="bg-black w-48"
                    >Close</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-dialog>
      </section>
    </div>

    <!-- <CustomerInteractionsVue /> -->
  </div>
  <div class="flex justify-center py-10 bg-slate-200 mt-10">
    <p class="font-medium text-center text-gray-800">dummyStore &copy; 2023</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed, watch } from 'vue'
import services from '@/services'
import ListProducts from '../components/ListProducts.vue'
import CustomHeader from '../components/CustomHeader.vue'
import axios from 'axios'
import CustomerInteractionsVue from '@/views/CustomerInteractions.vue'
import CardProductSelected from '.././/components/CardProductSelected.vue'

interface State {
  products: any
}

onMounted(() => {
  getAllProducts()
})

const products = ref<any>([])
const product = ref<any>([])
let searchProduct = ref('')
const dialog = ref(false)

// TODO: dever de casa = entender a diferença de let e const e quando utiliza-las
let cardProductSelected = ref<any>('')

const filterCategory = (category: string) => {}

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
}

const getSingleProduct = async (product_id: number) => {
  dialog.value = true
  const { data } = await services.products.getSingleProduct(product_id)
  product.value = data
  console.log(product.value)
}
</script>

<style scoped></style>
