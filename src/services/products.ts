import type { AxiosInstance } from 'axios'

export default (httpClient: AxiosInstance) => ({
  getAllProducts: async ({ limit }: { limit: number }) => {
    // TODO: Dever de casa: passar o limit via parâmetros
    // Acesse o link: https://github.com/cn-2k/agility-on/blob/master/src/services/filters.ts
    // E veja a função getAllIndicators e como os parâmetros são passados
    const query = { limit }
    const response = await httpClient.get('/products', { params: query })
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

  getProductsCategory: async (category: string) => {
    const response = await httpClient.get(`/products/category/${category}`)
    return {
      data: response.data
    }
  },

  getProductsCategories: async () => {
    const response = await httpClient.get(`/products/categories`)
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
  },

  updateProduct: async ({ product_id, title }: { product_id: number; title: string }) => {
    const response = await httpClient.put(`/products/${product_id}`, {
      title
    })

    return {
      data: response.data
    }
  },

  deleteProduct: async (product_id: number) => {
    const response = await httpClient.delete(`/products/${product_id}`)
    return {
      data: response.data
    }
  },

  searchProduct: async ({ q }: { q: string }) => {
    const query = { q }
    const response = await httpClient.get('/products/search', { params: query })
    return {
      data: response.data
    }
  }
})
