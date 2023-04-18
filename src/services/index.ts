import axios from 'axios'
import ProductServices from './products'

const httpClient = axios.create({
  baseURL: 'https://dummyjson.com'
})

export default {
  products: ProductServices(httpClient)
}
