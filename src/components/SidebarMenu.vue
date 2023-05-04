<template>
  <div :class="['menu', isReducedVersion ? 'reduced-version' : '']">
    <div>
      <ul>
        <li>
          <button @click="isReducedVersion = !isReducedVersion"><icons name="MenuIcon" /></button>
        </li>
        <!-- <li class="pt-4">
          <RouterLink to="/" class="flex items-center gap-4 text-slate-600">
            <ShoppingBag />DUMMY STORE</RouterLink
          >
        </li> -->
        <li class="pt-2">
          <RouterLink to="/" class="flex items-center gap-4 text-slate-600"
            ><icons name="HomeIcon" /><span class="hover:text-black">HOME</span></RouterLink
          >
        </li>
        <li><icons name="StoreIcon" /></li>
      </ul>
    </div>
    <div>
      <ul>
        <li>
          <RouterLink to="" class="flex items-center gap-4 text-slate-600"
            ><icons name="UserIcon" /><span class="hover:text-black"
              >SIGN IN/ SIGN UP</span
            ></RouterLink
          >
        </li>
        <li>
          <RouterLink to="/login" class="flex items-center gap-4 text-slate-600"
            ><icons name="ShoppingCart" />
            <span class="hover:text-black"> INTERACTIONS</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import icons from '@/components/Icons/index.vue'

const isReducedVersion = ref(true)
</script>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  background-color: #f8fafc;
  width: 14rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  overflow-y: auto;
  border-right: 1px solid #ccc;
}
.reduced-version {
  width: 4rem;
  background-color: #f8fafc;
}
.reduced-version span {
  display: none;
}
</style>
