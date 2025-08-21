// Quick test of filter functionality
import catalogData from '../data/catalog';
import { FilterOptions, filterProducts, sortProducts } from '../utils/filterUtils';

const testFilters = () => {
  console.log('Total products:', catalogData.length);
  
  // Test price filter
  const priceFilter: FilterOptions = {
    priceRange: { min: 1000, max: 5000 },
    categories: [],
    brands: []
  };
  
  const filteredByPrice = filterProducts(catalogData, priceFilter);
  console.log('Products between ₹1000-5000:', filteredByPrice.length);
  
  // Test category filter
  const categoryFilter: FilterOptions = {
    priceRange: { min: 0, max: 1000000 },
    categories: ['Entertainment'],
    brands: []
  };
  
  const filteredByCategory = filterProducts(catalogData, categoryFilter);
  console.log('Entertainment products:', filteredByCategory.length);
  
  // Test sorting
  const sortedLowHigh = sortProducts(catalogData, 'price-low-high');
  const sortedHighLow = sortProducts(catalogData, 'price-high-low');
  
  console.log('Lowest price:', sortedLowHigh[0]?.price);
  console.log('Highest price:', sortedHighLow[0]?.price);
};

export default testFilters;
