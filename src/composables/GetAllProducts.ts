import { ref } from 'vue'
import services from '../services'
import type { ProductsProps } from '@/types/index'

export default function useGetAllProducts() {
  const products = ref<ProductsProps[]>([])

  const getAllProducts = async () => {
    const { data } = await services.products.getAllProducts({
      limit: 10
    })
    products.value = data.products
    console.log(products.value)
  }

  return {
    products,
    getAllProducts
  }
}
