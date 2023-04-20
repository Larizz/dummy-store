import type { AxiosInstance } from 'axios'

export default (httpClient: AxiosInstance) => ({
  getAllProducts: async () => {
    const response = await httpClient.get('/products/?limit=10')
    return {
      data: response.data
    }
  },

  postProducts: async () => {
    const response = await httpClient.post('/products/add')
    return {
      data: response.data
    }
  },

  getProductsCategory: async () => {
    const response = await httpClient.get('/products/category')
    return {
      data: response.data
    }
  },

  selectProduct: async () => {
    const response = await httpClient.get('/products/')
    return {
      data: response.data
    }
  }
})
