import { Product } from '@/types/types';
import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, Text, useColorScheme, View } from 'react-native';
import {
    ActivityIndicator
} from 'react-native-paper';
import Animated, { SlideInRight } from 'react-native-reanimated';
import FilterSortBar from '../components/FilterSortBar';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import {
    extractBrands,
    extractCategories,
    extractPriceRange,
    FilterOptions,
    filterProducts,
    SortOption,
    sortProducts
} from '../utils/filterUtils';

const ProductsSection = ({
    isSearching,
    products
} : { isSearching: boolean, products: Product[] }) => {

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    
    // Filter and sort states
    const [filters, setFilters] = useState<FilterOptions>(() => ({
        priceRange: { min: 0, max: 100000 },
        categories: [],
        brands: []
    }));
    const [sortOption, setSortOption] = useState<SortOption>('price-low-high');
    
    // Extract available options from products - only when products change
    const availableCategories = useMemo(() => extractCategories(products), [products]);
    const availableBrands = useMemo(() => extractBrands(products), [products]);
    const priceRange = useMemo(() => extractPriceRange(products), [products]);
    
    // Update filters when products change
    React.useEffect(() => {
        if (products.length > 0) {
            const newPriceRange = extractPriceRange(products);
            setFilters(prev => ({
                ...prev,
                priceRange: newPriceRange
            }));
        }
    }, [products]);
    
    // Apply filters and sorting - stable reference
    const processedProducts = useMemo(() => {
        if (products.length === 0) return [];
        const filtered = filterProducts(products, filters);
        return sortProducts(filtered, sortOption);
    }, [products, filters, sortOption]);
    
    const handleFilterChange = React.useCallback((newFilters: FilterOptions) => {
        setFilters(newFilters);
    }, []);
    
    const handleSortChange = React.useCallback((newSort: SortOption) => {
        setSortOption(newSort);
    }, []);

    return (
        <View className="flex-1">
            {isSearching ? (
                <ScrollView className="flex-1 px-2">
                    <View className="items-center py-8">
                        <ActivityIndicator size="large" color="#3b82f6" />
                        <Text className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            AI is analyzing your request...
                        </Text>
                    </View>

                    {/* Skeleton Loading Cards */}
                    {[1, 2, 3, 4].map((index) => (
                        <SkeletonCard key={index} />
                    ))}
                </ScrollView>
            ) : (
                <>
                    {/* Filter and Sort Bar - Only show when we have products */}
                    {products.length > 0 && (
                        <FilterSortBar
                            onFilterChange={handleFilterChange}
                            onSortChange={handleSortChange}
                            availableCategories={availableCategories}
                            availableBrands={availableBrands}
                            priceRange={priceRange}
                            currentFilters={filters}
                            currentSort={sortOption}
                        />
                    )}
                    
                    {/* Results Count */}
                    {products.length > 0 && (
                        <View className="px-6 py-2">
                            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Showing {processedProducts.length} of {products.length} products
                            </Text>
                        </View>
                    )}
                    
                    {/* Products List */}
                    <FlatList
                        data={processedProducts}
                        keyExtractor={(item, index) => `${item.brand}-${item.product_name}-${index}`}
                        renderItem={({ item, index }) => (
                         <Animated.View
                            entering={SlideInRight.delay(index * 100).springify()}
                        >
                            <ProductCard product={item} />
                        </Animated.View>   
                            
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        removeClippedSubviews={false}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                        initialNumToRender={8}
                        ListEmptyComponent={
                            products.length > 0 ? (
                                <View className="items-center py-8">
                                    <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        No products match your filters
                                    </Text>
                                    <Text className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Try adjusting your filter criteria
                                    </Text>
                                </View>
                            ) : null
                        }
                    />
                </>
            )}
        </View>
    )
}

export default ProductsSection