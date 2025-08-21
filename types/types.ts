export interface Product {
  brand: string
  product_name: string
  price: number
  category: string
  description: string
}

export interface Recommendation extends Product {
  why: string; // Explanation for the recommendation
}
