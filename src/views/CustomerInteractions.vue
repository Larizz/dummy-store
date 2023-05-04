<template>
  <div class="flex justify-center bg-slate-100">
    <RouterLink to="/">
      <div class="flex items-center gap-2 m-6">
        <icons name="ShoppingBag" />
        <h5 class="text-lg text-black tracking-widest">DUMMY STORE</h5>
      </div>
    </RouterLink>
  </div>
  <div class="flex justify-center">
    <div class="bg-slate-200 w-5/6 rounded-xl">
      <section class="flex flex-col">
        <div class="w-5/6 p-5">
          <div class="w-full bg-slate-200 m-10 rounded-md p-10">
            <div>
              <h1 class="text-4xl font-black text-black mb-5">Interact with us!</h1>
              <p class="text-lg font-medium text-black mb-15">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, impedit accusamus sint
                corrupti, illum animi consectetur hic sequi voluptate odit itaque
              </p>
              <label for="" class="text-slate-500 text-xl">Here you can add a product.</label>
              <div class="mt-6 gap-2" id="form">
                <input
                  v-model="newProduct"
                  type="text"
                  placeholder="Add a product"
                  class="focus:outline-none"
                />

                <v-dialog v-model="dialog" width="auto">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      color="secundary"
                      v-bind="props"
                      class="bg-black rounded-lg w-28"
                      @click="addNewProduct"
                    >
                      Add</v-btn
                    >
                  </template>

                  <v-card>
                    <v-card-text>
                      The product has been successfully registered! We are very happy with your
                      cooperation! :)
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        color="secundary"
                        block
                        @click="dialog = false"
                        class="hover: text-black"
                        >Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </div>
          </div>
        </div>
        <div class="m-10 p-20">
          <h1 class="text-4xl font-black text-black mb-10">Update or delete products here</h1>
          <v-table fixed-header height="300px" class="bg-slate-200">
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">product</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" :title="product.title">
                <td class="text-black">{{ product.id }}</td>
                <td>{{ product.title }}</td>
                <div class="flex w-full">
                  <td class="flex justify-between gap-8 m-2">
                    <div>
                      <v-sheet class="d-flex flex-column w-10">
                        <v-snackbar :timeout="1000" color="black" elevation="24">
                          {{ responseMessage }}
                          <template v-slot:activator="{ props }">
                            <v-btn
                              class="bg-slate-200"
                              v-bind="props"
                              @click="updatingProduct(product)"
                            >
                              <icons name="UpdateIcon" />
                            </v-btn>
                          </template>
                        </v-snackbar>
                      </v-sheet>
                    </div>
                    <div>
                      <v-sheet>
                        <v-snackbar :timeout="1000" color="black" elevation="24">
                          {{ responseMessage }}
                          <template v-slot:activator="{ props }">
                            <v-btn
                              @click="deletingProduct(product.id)"
                              class="bg-slate-200"
                              v-bind="props"
                            >
                              <icons name="DeleteIcon" />
                            </v-btn>
                          </template>
                        </v-snackbar>
                      </v-sheet>
                    </div>
                  </td>
                </div>
              </tr>
            </tbody>
          </v-table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import services from '@/services'
import icons from '@/components/Icons/index.vue'
import useGetAllProducts from '@/composables/GetAllProducts'

const newProduct = ref<string>('')
const dialog = ref(false)
const { getAllProducts, products } = useGetAllProducts()

onMounted(() => {
  getAllProducts()
})

const addNewProduct = async () => {
  dialog.value = true
  try {
    const response = await services.products.registerProduct({
      title: newProduct.value
    })

    const { title } = response.data

    console.log('Title: ' + title)
    newProduct.value = ''

    // alert('New product successfully added!')
  } catch (error) {
    console.log(error)
  }
}

const responseMessage = ref('')

const updatingProduct = async (product: any) => {
  try {
    responseMessage.value = 'Product updated successfully!'
    const { data } = await services.products.updateProduct({
      product_id: product.id,
      title: product.title + ' atualizado'
    })

    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const deletingProduct = async (product_id: number) => {
  try {
    responseMessage.value = 'The product has been successfully deleted!'
    const { data } = await services.products.deleteProduct(product_id)
    console.log(data)
    // removendo product da tabela
    const index = products.value.findIndex((o: any) => o.id === product_id)
    products.value.splice(index, 1)
    // método findIndex é utilizado para encontrar o indice do elemento que possui o id correspondente ao product_id/ O splice é usado para remover um ou mais elementos de um array
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
