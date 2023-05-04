import { ref } from 'vue'
import services from '../services'

export default function useGetAllProducts() {
  const products = ref<any>([])

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
