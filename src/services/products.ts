import type { AxiosInstance } from 'axios'

export default (httpClient: AxiosInstance) => ({
  getAllProducts: async () => {
    // TODO: Dever de casa: passar o limit via parâmetros (não confundir params)
    // Acesse o link: https://github.com/cn-2k/agility-on/blob/master/src/services/filters.ts
    // E veja a função getAllIndicators e como os parâmetros são passados
    const response = await httpClient.get('/products/?limit=10')
    return {
      data: response.data
    }
  },

  registerProduct: async ({ title }: { title: string }) => {
    const response = await httpClient.post('/products/add', {
      title
    })
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

  getSingleProduct: async (product_id: number) => {
    // TODO: Dever de casa: estudar o que é template string/literals
    const response = await httpClient.get(`/products/${product_id}`)
    return {
      data: response.data
    }
  }
})
