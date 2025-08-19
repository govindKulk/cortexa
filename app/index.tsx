import React, { useState } from 'react'
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View
} from 'react-native'
import {
    ActivityIndicator,
    Button
} from 'react-native-paper'
import Animated, {
    interpolate,
    runOnJS,
    SlideInRight,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated'
import ProductCard from '../components/ProductCard'
import SearchInput from '../components/SearchInput'
import SkeletonCard from '../components/SkeletonCard'
import { catalogData, Product } from '../data/catalog'
import { useColorScheme } from '../hooks/useColorScheme'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const HomeScreen = () => {
  const colorScheme = useColorScheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  
  // Animation values
  const translateY = useSharedValue(0)
  const opacity = useSharedValue(1)
  const scale = useSharedValue(1)
  const welcomeOpacity = useSharedValue(0)
  const welcomeTranslateY = useSharedValue(50)
  
  React.useEffect(() => {
    // Welcome animation on mount
    welcomeOpacity.value = withDelay(300, withTiming(1, { duration: 800 }))
    welcomeTranslateY.value = withDelay(300, withSpring(0, { damping: 15 }))
  }, [])
  
  const isDark = colorScheme === 'dark'
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return
    
    // Animate input to top
    translateY.value = withSpring(-SCREEN_HEIGHT * 0.3, {
      damping: 15,
      stiffness: 100,
    })
    
    scale.value = withTiming(0.9, { duration: 300 })
    
    // Start loading
    runOnJS(setIsSearching)(true)
    runOnJS(setShowResults)(true)
    
    // Simulate API call delay
    setTimeout(() => {
      runOnJS(setProducts)(catalogData.slice(0, 10)) // Show first 10 products
      runOnJS(setIsSearching)(false)
    }, 2000)
  }
  
  const handleReset = () => {
    translateY.value = withSpring(0)
    scale.value = withTiming(1)
    setShowResults(false)
    setIsSearching(false)
    setProducts([])
    setSearchQuery('')
  }
  
  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    }
  })
  
  const welcomeAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: welcomeOpacity.value,
      transform: [{ translateY: welcomeTranslateY.value }],
    }
  })
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [-SCREEN_HEIGHT * 0.3, 0],
      [0, 1]
    )
    return {
      opacity,
    }
  })
  
  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#111827' : '#f9fafb'}
      />
      
      {/* Header */}
      <Animated.View style={headerAnimatedStyle} className="px-6 pt-8 pb-4">
        <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          CortexA
        </Text>
        <Text className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          AI-Powered Product Recommendations
        </Text>
      </Animated.View>
      
      {/* Search Input */}
      <Animated.View 
        style={inputAnimatedStyle}
        className="px-6 mb-6"
      >
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={handleSearch}
          disabled={isSearching}
        />
        
        {showResults && (
          <Button
            mode="text"
            onPress={handleReset}
            className="mt-2"
            textColor={isDark ? '#60a5fa' : '#3b82f6'}
          >
            New Search
          </Button>
        )}
      </Animated.View>
      
      {/* Results Section */}
      {showResults && (
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
      )}
      
      {/* Welcome Message when no search */}
      {!showResults && (
        <Animated.View 
          style={welcomeAnimatedStyle}
          className="flex-1 justify-center items-center px-8"
        >
          <View className="items-center">
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
    </SafeAreaView>
  )
}

export default HomeScreen