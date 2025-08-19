import usePaperTheme from '@/hooks/usePaperTheme'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Card, Chip, Surface } from 'react-native-paper'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import { Product } from '../data/catalog'
import { useColorScheme } from '../hooks/useColorScheme'

interface ProductCardProps {
  product: Product
}

const colors = {
  'Healthtech and Wellness': '#10b981',
  'Personal Care': '#f59e0b',
  'Entertainment': '#8b5cf6',
  'Kitchen Appliances': '#ef4444',
  'Home Improvement': '#3b82f6',
  'Travel & Lifestyle': '#06b6d4',
  'Smart Mobility': '#84cc16',
  'Security & Surveillance': '#f97316'
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const scale = useSharedValue(1)

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`
  }

  const getCategoryColor = (category: string) => {

    return colors[category as keyof typeof colors] || '#6b7280'
  }

  const handlePressIn = () => {
    scale.value = withSpring(0.98)
  }

  const handlePressOut = () => {
    scale.value = withSpring(1)
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const paperTheme = usePaperTheme();

  return (
    <Animated.View style={animatedStyle}>
      <Card
        className="mx-4 mb-4 overflow-hidden"
        mode="elevated"
        style={{
          backgroundColor: isDark ? '#374151' : '#ffffff',
          elevation: 3
        }}
      >
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          android_ripple={{ color: isDark ? '#4b5563' : '#f3f4f6' }}
          className="p-4"
        >
          <View className="flex-row">
            {/* Product Image Placeholder */}
            <Surface
              className="w-20 h-20 rounded-lg mr-4 items-center justify-center"
              style={{ backgroundColor: getCategoryColor(product.category) + '20' }}
            >
              <Text className="text-2xl">
                {product.category === 'Healthtech and Wellness' && '🏥'}
                {product.category === 'Personal Care' && '💄'}
                {product.category === 'Entertainment' && '🎮'}
                {product.category === 'Kitchen Appliances' && '🍳'}
                {product.category === 'Home Improvement' && '🏠'}
                {product.category === 'Travel & Lifestyle' && '✈️'}
                {product.category === 'Smart Mobility' && '🛴'}
                {product.category === 'Security & Surveillance' && '🔒'}
              </Text>
            </Surface>

            {/* Product Details */}
            <View className="flex-1">
              <View
                className='flex-1 flex-row items-start justify-between'
              >
                <View className=" mb-2 flex-1">
                  <Text
                    className={`text-sm  font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} capitalize`}
                    style={{
                      color: getCategoryColor(product.category)
                    }}
                  >
                    {product.brand}
                  </Text>

                  <Text
                    className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    numberOfLines={2}
                  >
                    {product.product_name}
                  </Text>
                </View>
                <Chip
                  mode="flat"
                  compact
                  textStyle={{ fontSize: 10 }}
                  style={{
                    backgroundColor: getCategoryColor(product.category) + '20',
                  }}
                >
                  <Text style={{ color: getCategoryColor(product.category), fontSize: 10 }}>
                    {product.category.split(' ')[0]}
                  </Text>
                </Chip>

              </View>



              <Text
                className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                numberOfLines={2}
                style={{
                  color: paperTheme.colors.secondary
                }}
              >
                {product.description}
              </Text>

              <View className="flex-row items-center justify-between">
                <Text className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {formatPrice(product.price)}
                </Text>


              </View>
            </View>
          </View>
        </Pressable>
      </Card>
    </Animated.View>
  )
}

export default ProductCard