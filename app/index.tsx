import usePaperTheme from '@/hooks/usePaperTheme'
import { Recommendation } from '@/types/types'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  StatusBar,
  Text,
  View
} from 'react-native'

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import SearchInput from '../components/SearchInput'

import ProductsSection from '@/components/ProductsSection'
import { mockRecomendations } from '@/data/catalog'
import { Divider } from 'react-native-paper'
import { useColorScheme } from '../hooks/useColorScheme'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const HomeScreen = () => {
  const colorScheme = useColorScheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [products, setProducts] = useState<Recommendation[]>([])

  // Animation values
  const headerOpacity = useSharedValue(1)
  const headerHeight = useSharedValue(1)
  const searchInputPosition = useSharedValue(0) // 0 = center, 1 = top
  const welcomeOpacity = useSharedValue(0)
  const welcomeTranslateY = useSharedValue(50)

  useEffect(() => {
    // Welcome animation on mount
    welcomeOpacity.value = withDelay(300, withTiming(1, { duration: 800 }))
    welcomeTranslateY.value = withDelay(300, withSpring(0, { damping: 15 }))
  }, [])

  const isDark = colorScheme === 'dark'

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    // Animate header out and search input to top
    headerOpacity.value = withTiming(0, { duration: 300 })
    headerHeight.value = withTiming(0, { duration: 300 })
    searchInputPosition.value = withDelay(300, withTiming(1, {
      duration: 500
    }))
 
    
    // Start loading
    setIsSearching(true)
    setShowResults(true)

    // const categories = await getCategories(searchQuery);
    // console.log("Categories: ", categories)

    // const recommendations = await getRecommendations(searchQuery, categories);
    // console.log("Recommendations: ", recommendations)

    // setProducts(recommendations);
    // setShowResults(true);
    // setIsSearching(false);

    setTimeout(() => {
      setProducts(mockRecomendations);
      setShowResults(true);
      setIsSearching(false);
    }, 2000)


  }

  // search-input animation styles
  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            searchInputPosition.value,
            [0, 1],
            [0, -20]
          )
        },
        {
          scale: interpolate(
            searchInputPosition.value,
            [0, 1],
            [1, 0.95]
          )
        }
      ]
    }
  })

  // welcome animation styles
  const welcomeAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: welcomeOpacity.value,
      transform: [{ translateY: welcomeTranslateY.value }],
    }
  })

  // header animation styles
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{
        scaleY: headerHeight.value
      }],
    }
  })

  const paperTheme = usePaperTheme();

  return (
    <View className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} sm:px-2 md:px-4 lg:px-8 ${!showResults ? 'py-8' : 'py-0'}`}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#111827' : '#f9fafb'}
      />

      {/* Header - Only show when not searching */}
      {!showResults && (
        <Animated.View style={headerAnimatedStyle} className="w-full py-8">
          <Text className={`text-4xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ color: paperTheme.colors.primary }}
          >
            CortexA
          </Text>
          <Text
            style={{
              color: paperTheme.colors.secondary,
              fontWeight: 'normal',
              textAlign: 'center'
            }}
          >
            AI-Powered Product Recommendations
          </Text>
        </Animated.View>
      )}

      {/* Search Input - Always visible but position changes */}
      <Animated.View
        style={inputAnimatedStyle}
        className={`px-6 ${showResults ? 'pt-8' : 'py-4'}`}
      >
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={handleSearch}
          disabled={isSearching}
        />



      </Animated.View>

    {showResults &&   <Divider
      bold={true}
      className='w-full bg-zinc-700 h-8'
      />
    }
      {/* Results Section */}
      {showResults && (
        <ProductsSection
          isSearching={isSearching}
          products={products}
        />
      )}

      {/* Welcome Message when no search */}
      {!showResults && (
        <Animated.View
          style={welcomeAnimatedStyle}
          className="flex-1 justify-center items-center px-8 "
        >
          <View className="flex-1 justify-center items-center">
            <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-6">
              <Text className="text-4xl">🤖</Text>
            </View>
            <Text className={`text-xl font-semibold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Welcome to CortexA
            </Text>
            <Text className={`text-center leading-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Describe what you're looking for and let our AI find the perfect products for you.
              Try asking for "smart home devices" or "fitness trackers".
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  )
}

export default HomeScreen