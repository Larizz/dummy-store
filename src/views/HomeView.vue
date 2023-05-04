<template>
  <!-- sidebar  -->
  <SidebarMenu />
  <!-- main content page -->
  <div class="w-full">
    <CustomHeader></CustomHeader>
    <div class="flex justify-between items-center bg-slate-100 text-gray-600 tracking-widest ml-20">
      <h1 class="md:text-5xl m-10 ml-5 flex gap-2 text-xl" id="Products">STORE</h1>
      <!-- <label for="Search here">Search here:</label> -->
      <div class="mr-16 flex gap-2">
        <input
          v-model="searchProduct"
          class="focus:outline-none focus:ring-slate-100 border border-solid border-gray-100 rounded-lg text-xl h-12 p-2"
          type="search"
          placeholder="Search..."
          @keyup.enter="searchFilter"
        />
        <button
          class="border border-slate-500 h-12 w-12 p-1 rounded-md"
          @click="searchFilter"
          :disabled="!searchProduct"
        >
          <icons name="SearchIcon" class="w-8 h-8" />
        </button>
      </div>
    </div>

    <!-- DIV GERAL  -->
    <div class="w-full flex ml-16">
      <!-- INICIO DIV DAS CATEGORIAS  -->
      <div class="w-52 mx-10 ml-18">
        <h1 class="text-2xl text-gray-600">Categories</h1>
        <ul>
          <li>
            <button @click="getAllProducts" class="m-2 text-gray-600 hover:text-gray-950">
              All
            </button>
          </li>
          <li v-for="(category, index) in categoriesList" :key="index">
            <button
              @click="filterCategory(category as string)"
              class="m-1 text-gray-600 hover:text-gray-950"
            >
              {{ category }}
            </button>
          </li>
        </ul>
      </div>
      <!-- FIM DIV DAS CATEGORIAS  -->

      <!-- DIV DA LISTA DE PRODUTOS -->
      <div class="w-full">
        <div
          v-if="notFound"
          class="w-full h-full flex flex-col justify-center bg-slate-50 border border-slate-500"
        >
          <p class="text-lg text-slate-600 text-center">No products were found for your search!</p>
        </div>
        <section
          v-if="!notFound"
          class="grid md:grid-cols-5 pl-16 mr-12 grid-cols-1 border border-slate-500 p-5 bg-slate-50 rounded-lg"
        >
          <ListProducts
            @show-modal="getSingleProduct(product.id)"
            v-for="product in products"
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
                  <v-card-actions class="flex justify-end">
                    <v-btn color="secundary" @click="dialog = false" class="w-12"
                      ><icons name="closedIcon"
                    /></v-btn>
                  </v-card-actions>
                  <div v-if="product" class="flex gap-10 m-10">
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
    <!-- FIM DIV DA LISTA DE PRODUTOS -->

    <div class="flex justify-center py-10 bg-slate-200 mt-10">
      <p class="font-medium text-center text-gray-800">dummyStore &copy; 2023</p>
    </div>
    <!-- FOOTER -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed, watch } from 'vue'
import services from '@/services'
import ListProducts from '../components/ListProducts.vue'
import CustomHeader from '../components/CustomHeader.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'
import icons from '@/components/Icons/index.vue'
import useGetAllProducts from '@/composables/GetAllProducts'
import type { ProductsProps } from '@/types/index'

const product = ref<ProductsProps>()
const searchProduct = ref('')
const dialog = ref(false)
const categoriesList = ref<any>([])
const notFound = ref(false)
const { getAllProducts, products } = useGetAllProducts()

onMounted(() => {
  getAllProducts()
  getAllCategories()
})

const filterCategory = async (category: string) => {
  const { data } = await services.products.getProductsCategory(category)
  // filterCategoryProduct.value = data.products
  products.value = data.products
  notFound.value = false
  console.log(products.value)
}

const searchFilter = async (q: any) => {
  try {
    notFound.value = false
    const { data } = await services.products.searchProduct({
      q: searchProduct.value
    })
    products.value = data.products
    // products.value é toda a listagem de produtos. Após ser feita a pesquisa, o products.value deve receber o valor de data.products, para retornar ao usuário apenas o que foi pesquisado

    if (products.value.length === 0) {
      notFound.value = true
    }
  } catch (error) {
    console.log(error)
  }
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
// Para pegar produto por unidade foi necessário passar o parâmetro product_id que recebe o valor da constante product
// A sintaxe { data } é chamada de desestruturação de objeto. Ela permite extrair uma propriedade específica do objeto retornado pela 'services.products.getSingleProduct'
</script>

<style scoped></style>
