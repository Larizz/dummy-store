<template>
  <section class="bg-gradient-to-r from-black to-gray-600">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 border-none"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex flex-col items-center">
          <h1 class="text-4xl text-black m-10 font-bold">Login</h1>
          <div class="w-10/12">
            <span class="text-slate-600 mt-6">Username</span>
            <div class="flex items-center border-b border-slate-500 h-12 mt-4 mb-8 outline-none">
              <UserLogin />
              <input
                v-model="username"
                type="text"
                placeholder="Type your username "
                class="w-5/6 h-12 outline-none"
              />
            </div>
            <div>
              <span class="text-slate-600">Password</span>
              <div class="flex items-center border-b border-slate-500 h-12 mt-4 outline-none">
                <SecurityIcon />
                <input
                  v-model="password"
                  type="password"
                  placeholder="Type your password "
                  class="w-5/6 h-12 m-3 outline-none"
                />
              </div>
              <span class="flex justify-end mt-1 text-slate-400 hover:text-black"
                ><a href="#">Forgot password?</a></span
              >
            </div>
          </div>
          <div class="flex justify-center mt-12">
            <button
              class="w-96 bg-black flex justify-center h-12 mt-10 items-center rounded-xl bg-gradient-to-r from-black to-gray-600 hover: shadow-lg"
              @click="authenticatorLogin()"
            >
              LOGIN
            </button>
          </div>
          <div class="mb-7">
            <span class="flex justify-center mt-12 text-slate-400">Or Sign Up Using</span>
            <div class="flex justify-center">
              <a href=""><FacebookIcon /></a>
              <a href=""><InstagramIcon /></a>
              <a href=""><TwitterIcon /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import UserLogin from '@/components/Icons/UserLogin.vue'
import SecurityIcon from '@/components/Icons/SecurityIcon.vue'
import services from '@/services'
import { useRouter } from 'vue-router'
import FacebookIcon from '@/components/Icons/FacebookIcon.vue'
import InstagramIcon from '@/components/Icons/InstagramIcon.vue'
import TwitterIcon from '@/components/Icons/TwitterIcon.vue'
import ShoppingBag from '@/components/Icons/ShoppingBag.vue'

const username = ref('')
const password = ref('')
const router = useRouter()

const authenticatorLogin = async () => {
  try {
    const data = await services.products.authenticator({
      username: username.value,
      password: password.value
    })

    const { token } = data.data
    console.log(token)

    if (token) {
      router.push({ path: '/home' })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
