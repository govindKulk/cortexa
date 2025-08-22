import { Product, Recommendation } from '@/types/types'
import skus from './skus.json'

export const catalogData: Product[] = skus

export const mockRecomendations: Recommendation[] = catalogData.map((product) => ({
    ...product,
    why: "Recommended " + product.product_name + " for you"
}))

export default catalogData