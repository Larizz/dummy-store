<template>
  <component :is="icons[name]" v-bind="$props"></component>
</template>

<script setup lang="ts">
import ArrowIcon from './ArrowIcon.vue'
import DeleteIcon from './DeleteIcon.vue'
import HomeIconVue from './HomeIcon.vue'
import InstagramIcon from './InstagramIcon.vue'
import MenuIcon from './MenuIcon.vue'
import SearchIcon from './SearchIcon.vue'
import SecurityIcon from './SecurityIcon.vue'
import ShoppingBag from './ShoppingBag.vue'
import ShoppingCart from './ShoppingCart.vue'
import StoreIcon from './StoreIcon.vue'
import TwitterIcon from './TwitterIcon.vue'
import UpdateIcon from './UpdateIcon.vue'
import UserIcon from './UserIcon.vue'
import UserLoginVue from './UserLogin.vue'
import closedIcon from './closedIcon.vue'
import FacebookIcon from './FacebookIcon.vue'
import HomeIcon from './HomeIcon.vue'

const icons = {
  ArrowIcon,
  DeleteIcon,
  FacebookIcon,
  HomeIconVue,
  InstagramIcon,
  MenuIcon,
  SearchIcon,
  SecurityIcon,
  ShoppingBag,
  ShoppingCart,
  StoreIcon,
  TwitterIcon,
  UpdateIcon,
  UserIcon,
  UserLoginVue,
  closedIcon,
  HomeIcon
} as any

defineProps<{
  name: string
}>()
</script>

<style scoped></style>
