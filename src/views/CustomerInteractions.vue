<template>
  <header>
    <div class="flex justify-center bg-slate-100">
      <RouterLink to="/">
        <div class="flex items-center gap-2 m-6">
          <img src="../../public/sacolas-de-compras (3).png" alt="" />
          <h5 class="text-lg text-black tracking-widest">DUMMY STORE</h5>
        </div>
      </RouterLink>
    </div>
    <div class="flex justify-center">
      <div class="bg-slate-200 w-5/6 rounded-xl">
        <section class="flex">
          <div class="w-5/6 p-5">
            <div class="w-full bg-slate-200 m-10 rounded-md p-20">
              <div>
                <h1 class="text-4xl font-black text-black mb-5">Interact with us!</h1>
                <p class="text-lg font-medium text-black mb-15">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, impedit accusamus
                  sint corrupti, illum animi consectetur hic sequi voluptate odit itaque
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
                <div class="mt-10">
                  <label for="" class="text-slate-500 text-xl"
                    >If you want to update a product, enter the product in this field</label
                  >
                  <div class="mt-6 gap-2" id="form">
                    <input
                      v-model="newProduct"
                      type="text"
                      placeholder="Product's name"
                      class="focus:outline-none"
                    />

                    <v-dialog v-model="dialog" width="auto">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          color="secundary"
                          v-bind="props"
                          class="bg-black w-28 rounded-lg"
                          @click="updatingProduct"
                        >
                          To update</v-btn
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
          </div>
        </section>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import services from '@/services'

const newProduct = ref<string>('')
const dialog = ref(false)
const upProduct = ref<string>('')
const product = ref<any>([])

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

const updatingProduct = async (product_id: number, title: string) => {
  try {
    const response = await services.products.updateProduct(product_id, { title: upProduct.value })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
