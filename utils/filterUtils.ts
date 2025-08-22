import { Recommendation } from '@/types/types'

export interface PriceRange {
  min: number
  max: number
}

export interface FilterOptions {
  priceRange: PriceRange
  categories: string[]
  brands: string[]
}

export type SortOption = 'price-low-high' | 'price-high-low' | 'date-newest' | 'date-oldest'

// Extract unique categories from products
export const extractCategories = (products: Recommendation[]): string[] => {
  if (!products || products.length === 0) return []
  
  const categories = products.map(product => product.category)
  return [...new Set(categories)].sort()
}

// Extract unique brands from products
export const extractBrands = (products: Recommendation[]): string[] => {
  if (!products || products.length === 0) return []
  
  const brands = products.map(product => product.brand)
  return [...new Set(brands)].sort()
}

// Extract price range from products
export const extractPriceRange = (products: Recommendation[]): PriceRange => {
  if (!products || products.length === 0) {
    return { min: 0, max: 1000 }
  }
  
  const prices = products.map(product => product.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
}

// Filter products based on filter options
export const filterProducts = (products: Recommendation[], filters: FilterOptions): Recommendation[] => {
  if (!products || products.length === 0) return []
  
  return products.filter(product => {
    // Price range filter
    const withinPriceRange = product.price >= filters.priceRange.min && 
                            product.price <= filters.priceRange.max
    
    // Category filter
    const matchesCategory = filters.categories.length === 0 || 
                           filters.categories.includes(product.category)
    
    // Brand filter
    const matchesBrand = filters.brands.length === 0 || 
                        filters.brands.includes(product.brand)
    
    return withinPriceRange && matchesCategory && matchesBrand
  })
}

// Sort products based on sort option
export const sortProducts = (products: Recommendation[], sortOption: SortOption): Recommendation[] => {
  if (!products || products.length === 0) return []
  
  const sortedProducts = [...products]
  
  switch (sortOption) {
    case 'price-low-high':
      return sortedProducts.sort((a, b) => a.price - b.price)
    case 'price-high-low':
      return sortedProducts.sort((a, b) => b.price - a.price)
    case 'date-newest':
      // For now, just return as is since we don't have date data
      // In future, you can add: return sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date))
      return sortedProducts
    case 'date-oldest':
      // For now, just return as is since we don't have date data
      // In future, you can add: return sortedProducts.sort((a, b) => new Date(a.date) - new Date(b.date))
      return sortedProducts
    default:
      return sortedProducts
  }
}

// Get default filter options based on products
export const getDefaultFilterOptions = (products: Recommendation[]): FilterOptions => {
  const priceRange = extractPriceRange(products)
  
  return {
    priceRange,
    categories: [],
    brands: []
  }
}
