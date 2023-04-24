<template>
  <header>
    <div class="flex justify-center bg-slate-100">
      <div class="flex items-center gap-2 m-6">
        <img src="../../public/sacolas-de-compras (3).png" alt="" />
        <h5 class="text-lg text-black tracking-widest">DUMMY STORE</h5>
      </div>
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
                  <button
                    type="submit"
                    class="bg-black rounded-lg w-24 h-10 md:mt-3"
                    @click="addNewProduct"
                  >
                    Add
                  </button>
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

const addNewProduct = async () => {
  try {
    const response = await services.products.registerProduct({
      title: newProduct.value
    })

    const { title } = response.data

    console.log('Title: ' + title)
    newProduct.value = ''

    alert('New product successfully added!')
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
