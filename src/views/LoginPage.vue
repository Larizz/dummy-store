<template>
  <section class="bg-gradient-to-r from-black to-gray-600">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 border-none"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex flex-col items-center">
          <h1 class="text-4xl text-black m-10 font-bold">Login</h1>
          <div class="w-10/12">
            <span class="text-slate-600 mt-6">Username</span>
            <div class="flex items-center border-b border-slate-500 h-12 mt-4 mb-8 outline-none">
              <icons name="userIcon" />
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
                <icons name="SecurityIcon " />
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
              class="w-96 bg-black flex justify-center h-12 hover:h-11 mt-10 items-center rounded-xl bg-gradient-to-r from-black to-gray-600 text-white"
              @click="authenticatorLogin()"
            >
              LOGIN
            </button>
          </div>
          <div class="mb-7">
            <span class="flex justify-center mt-12 text-slate-400">Or Sign Up Using</span>
            <div class="flex justify-center">
              <a href=""><icons name="FacebookIcon" /></a>
              <a href=""><icons name="InstagramIcon" /></a>
              <a href=""><icons name="TwitterIcon" /></a>
            </div>
          </div>
          <v-dialog v-model="dialog" width="auto" height="">
            <v-card>
              <v-dialog v-model="dialog" class="w-2/6">
                <v-card class="text-gray-600 bg-slate-200 rounded-lg p-4">
                  <div class="flex text-red-700">Login or password are incorrect.</div>
                </v-card>
              </v-dialog>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Cookies from 'js-cookie'
import services from '@/services'
import { useRouter } from 'vue-router'
import icons from '@/components/Icons/index.vue'

const username = ref('')
const password = ref('')
const router = useRouter()
const dialog = ref(false)

const authenticatorLogin = async () => {
  try {
    const data = await services.products.authenticator({
      username: username.value,
      password: password.value
    })
    // é chamada a função authenticator e os dois parâmetros passados nela recebem o valor das constantes username e password
    // o valor retornado da função é armazenado na variavel data

    const { token } = data.data
    const inOneMinute = new Date(new Date().getTime() + 60 * 1000)
    // a propriedade token é extraída do objeto data.data
    // a const inOneMinute contem a data de expiração do token

    Cookies.set('token', token, {
      expires: inOneMinute
    })
    // o Cookies.set tem como parametro o nome do cookie, o valor do token e a data de expiração, é chamado da biblioteca cookie js

    if (Cookies.get('token') && token) {
      router.push({ path: '/customer' })
    }
    // se o token existir e se o token(o valor que vêm da api) existir, o usuario consegue logar
  } catch (error) {
    dialog.value = true
    console.log(error)
  }
}
</script>

<style scoped></style>
