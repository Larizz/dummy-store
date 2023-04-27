<template>
  <header>
    <div class="flex justify-between bg-slate-100 text-gray-600 h-18">
      <div class="flex w-full justify-between m-6">
        <ul class="flex gap-5 items-center text-lg tracking-widest">
          <li class="hover:text-black"><RouterLink to="/">HOME</RouterLink></li>
          <li class="hover:text-black"><a href="#Products">STORE</a></li>
        </ul>
        <div class="flex items-center gap-2">
          <ShoppingBag />
          <h5 class="text-lg text-black tracking-widest">DUMMY STORE</h5>
        </div>
        <div class="flex items-center">
          <ul class="flex gap-2">
            <li class="hover: h-8">
              <UserIcon />
            </li>
            <li>
              <RouterLink to="/customer"> <ShoppingCart /></RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <CustomHeader></CustomHeader>
  <div
    class="flex justify-between items-center ml-12 bg-slate-100 text-gray-600 tracking-widest mb-20 mt-40"
  >
    <div class="flex flex-col items-end">
      <h1 class="text-5xl m-10 flex gap-2">STORE</h1>
    </div>
    <div class="flex flex-col">
      <label for="Search here">Search here:</label>
      <input
        v-model="searchProduct"
        class="focus:outline-none focus:ring-slate-100 border border-solid border-gray-100 rounded-lg text-xl h-12 p-2 mr-36"
        type="search"
        placeholder="Search..."
      />
    </div>
  </div>
  <div class="flex items-start">
    <div class="ml-20 gap-5 flex">
      <div class="w-1/5">
        <h1 class="text-2xl text-gray-600 tracking-widest">Categories</h1>
        <ul>
          <li>
            <button @click="getAllProducts" class="m-2 text-gray-600 hover:text-gray-950">
              All
            </button>
          </li>
          <li v-for="(category, index) in categoriesList" :key="index">
            <button @click="filterCategory(category)" class="m-1 text-gray-600 hover:text-gray-950">
              {{ category }}
            </button>
          </li>
        </ul>
      </div>
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
            <v-dialog v-model="dialog" class="w-3/5">
              <v-card class="text-gray-600 bg-slate-200 rounded-lg p-4">
                <div class="flex gap-10 m-10">
                  <div class="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                      alt="ecommerce"
                      class="lg:w-1/2 w-full lg:h-auto h-72 object-cover object-center rounded"
                      :src="product.thumbnail"
                    />
                    <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                      <h2 class="text-sm title-font text-gray-500 tracking-widest">
                        {{ product.category }}
                      </h2>
                      <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                        {{ product.title }}
                      </h1>
                      <h2 class="text-sm title-font text-gray-500 tracking-widest">
                        {{ product.brand }}
                      </h2>
                      <span class="text-gray-600 mt-2">{{ product.rating }} Reviews</span>
                      <p class="mt-4">
                        {{ product.description }}
                      </p>
                      <div class="flex justify-between items-center mt-4">
                        <span class="title-font font-medium text-2xl text-gray-900"
                          >R${{ product.price }},00</span
                        >
                        <v-card-actions class="flex justify-center">
                          <v-btn color="secundary" @click="dialog = false" class="bg-black w-20"
                            >Close</v-btn
                          >
                        </v-card-actions>
                      </div>
                      <span class="text-gray-600 mt-2">{{ product.stock }} stock</span>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-dialog>
          </v-card>
        </v-dialog>
      </section>
    </div>
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
import CustomerInteractionsVue from '@/views/CustomerInteractions.vue'
import ShoppingBag from '@/components/Icons/ShoppingBag.vue'
import ShoppingCart from '@/components/Icons/ShoppingCart.vue'
import UserIcon from '@/components/Icons/UserIcon.vue'

interface State {
  products: any
}

onMounted(() => {
  getAllProducts()
  getAllCategories()
})

const products = ref<any>([])
const product = ref<any>([])
let searchProduct = ref('')
const dialog = ref(false)
const listMenu = ref(false)
const categoriesList = ref<any>([])

// TODO: entender a diferença de let e const e quando utiliza-las
const cardProductSelected = ref<any>('')
const filterCategoryProduct = ref<any>([])
const categoryFilter = ref('')

const filterCategory = async (category: string) => {
  const { data } = await services.products.getProductsCategory(category)
  // filterCategoryProduct.value = data.products
  products.value = data.products
  console.log(products.value)
}

const productFilter = computed(() => {
  if (products.value && searchProduct.value) {
    return products.value.filter((product: any) =>
      product.title.toLowerCase().includes(searchProduct.value.toLowerCase())
    )
  }
  if (categoryFilter.value) {
    return products.value.filter((product: any) => product.category === categoryFilter.value)
  }
  return products.value
})

const getAllProducts = async () => {
  const { data } = await services.products.getAllProducts()
  products.value = data.products
  // console.log(products.value)
}

const getProductsCategory = async (category: string) => {
  const { data } = await services.products.getProductsCategory(category)
  products.value = data.products
  console.log(products.value)
}

const getAllCategories = async () => {
  const { data } = await services.products.getProductsCategories()
  categoriesList.value = data
  console.log(categoriesList.value)
}

const getSingleProduct = async (product_id: number) => {
  dialog.value = true
  const { data } = await services.products.getSingleProduct(product_id)
  product.value = data
  console.log(product.value)
}
</script>

<style scoped></style>
