import type { AxiosInstance } from 'axios'

export default (httpClient: AxiosInstance) => ({
  getAllProducts: async () => {
    const response = await httpClient.get('/products')
    return {
      data: response.data
    }
  }
})
