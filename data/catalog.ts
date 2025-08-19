import skus from './skus.json'

export interface Product {
  brand: string
  product_name: string
  price: number
  category: string
  description: string
}

export const catalogData: Product[] = skus

export default catalogData