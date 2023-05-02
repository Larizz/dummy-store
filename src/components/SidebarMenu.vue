<template>
  <div class="menu">
    <div>
      <ul>
        <li>
          <button @click="SidebarMenu()"><MenuIcon /></button>
        </li>
        <!-- <li class="pt-4">
          <RouterLink to="/" class="flex items-center gap-4 text-slate-600">
            <ShoppingBag />DUMMY STORE</RouterLink
          >
        </li> -->
        <li class="pt-2">
          <RouterLink to="/" class="flex items-center gap-4 text-slate-600"
            ><HomeIcon /><span>HOME</span></RouterLink
          >
        </li>
        <li><StoreIcon /></li>
      </ul>
    </div>
    <div>
      <ul>
        <li class="flex items-center gap-4 text-slate-600">
          <UserIcon /><span>SIGN IN/ SIGN UP</span>
        </li>
        <li>
          <RouterLink to="/customer" class="flex items-center gap-4 text-slate-600"
            ><ShoppingCart />
            <span> INTERACTIONS</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ShoppingBag from './Icons/ShoppingBag.vue'
import UserIcon from './Icons/UserIcon.vue'
import ShoppingCart from './Icons/ShoppingCart.vue'
import HomeIcon from './Icons/HomeIcon.vue'
import StoreIcon from './Icons/StoreIcon.vue'
import MenuIcon from './Icons/MenuIcon.vue'

const SidebarMenu = () => {
  const sidebarMenu = document.querySelector('.menu')
  sidebarMenu?.classList.toggle('reduced-version')
  console.log('oi')
}
</script>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  background-color: #f8fafc;
  width: 14rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  margin-right: 14rem;
}
.reduced-version {
  width: 4rem;
  background-color: #f8fafc;
}

.reduced-version span {
  display: none;
}
</style>
