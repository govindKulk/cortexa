import usePaperTheme from '@/hooks/usePaperTheme'
import { Recommendation } from '@/types/types'
import AntDesign from '@expo/vector-icons/AntDesign'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Card, Chip } from 'react-native-paper'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import { useColorScheme } from '../hooks/useColorScheme'

interface ProductCardProps {
  product: Recommendation,
  setWhyModal: (rec : Recommendation) => void
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

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, setWhyModal }) => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const scale = useSharedValue(1)
  const buttonScale = useSharedValue(1)

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

  const handleButtonPressIn = () => {
    buttonScale.value = withSpring(0.9)
  }

  const handleButtonPressOut = () => {
    buttonScale.value = withSpring(1)
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const paperTheme = usePaperTheme();


  return (
    <Animated.View style={[animatedStyle, { flex: 1 }]}>
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
          <View className="flex-row " style={{ minHeight: 120 }}>
            {/* Product Image Placeholder */}
            <View
              style={{ 
                backgroundColor: getCategoryColor(product.category) + '20',
                alignSelf: 'flex-start',
              }}
             
              className="w-20 h-20  rounded-lg mr-4 items-center justify-center"
            >
              <Text className="text-2xl ">
                {product.category === 'Healthtech and Wellness' && '🏥'}
                {product.category === 'Personal Care' && '💄'}
                {product.category === 'Entertainment' && '🎮'}
                {product.category === 'Kitchen Appliances' && '🍳'}
                {product.category === 'Home Improvement' && '🏠'}
                {product.category === 'Travel & Lifestyle' && '✈️'}
                {product.category === 'Smart Mobility' && '🛴'}
                {product.category === 'Security & Surveillance' && '🔒'}
              </Text>
            </View>

            {/* Product Details */}
            <View className="flex-1" style={{ justifyContent: 'space-between'}} >
              {/* Header with brand, product name and chip */}
              <View>
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1 mr-2">
                    <Text
                      className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} capitalize`}
                      style={{
                        color: getCategoryColor(product.category)
                      }}
                      numberOfLines={1}
                    >
                      {product.brand}
                    </Text>

                    <Text
                      className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
                      numberOfLines={2}
                      style={{ lineHeight: 20 }}
                    >
                      {product.product_name.split(' ').slice(0, 4).join(' ') + '...'}
                    </Text>
                  </View>

                  <Chip
                    mode="flat"
                    compact
                    textStyle={{ fontSize: 10 }}
                    style={{
                      backgroundColor: getCategoryColor(product.category) + '20',
                      alignSelf: 'flex-start'
                    }}
                  >
                    <Text style={{ color: getCategoryColor(product.category), fontSize: 10 }}>
                      {product.category.split(' ')[0]}
                    </Text>
                  </Chip>
                </View>

                <Text
                  className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  style={{ color: paperTheme.colors.secondary, lineHeight: 18 }}
                  numberOfLines={2}
                >
                  {product.description}
                </Text>
              </View>

              {/* Footer with price and button */}
              <View className="flex-row items-center justify-between mt-4">
                <Text className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {formatPrice(product.price)}
                </Text>

                <Animated.View style={buttonAnimatedStyle}>
                  <Pressable
                    onPress={() => setWhyModal(product)}
                    onPressIn={handleButtonPressIn}
                    onPressOut={handleButtonPressOut}
                    className=" px-4 py-2 rounded-lg overflow-hidden"
                    android_ripple={{ color:  getCategoryColor(product.category) + '40' }}
                    style={{
                      backgroundColor: getCategoryColor(product.category) + '20'
                    }}
                  >
                    <AntDesign name="questioncircle" size={24} color={getCategoryColor(product.category)} />
                  </Pressable>
                </Animated.View>
              </View>
            </View>
          </View>
        </Pressable>
      </Card>
    </Animated.View>
  )
})

export default ProductCard