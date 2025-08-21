import { Product } from '@/types/types';
import React from 'react';
import { FlatList, ScrollView, Text, useColorScheme, View } from 'react-native';
import {
    ActivityIndicator
} from 'react-native-paper';
import Animated, { SlideInRight } from 'react-native-reanimated';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';

const ProductsSection = ({
    isSearching,
    products
} : { isSearching: boolean, products: Product[] }) => {

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
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
                <FlatList
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Animated.View
                            entering={SlideInRight.delay(index * 100).springify()}
                        >
                            <ProductCard product={item} />
                        </Animated.View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    )
}

export default ProductsSection