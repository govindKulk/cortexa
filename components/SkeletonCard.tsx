import React from 'react'
import { View } from 'react-native'
import { Card } from 'react-native-paper'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated'

const SkeletonCard: React.FC = () => {
  const opacity = useSharedValue(0.3)
  
  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      false
    )
  }, [])
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))
  
  return (
    <Card className="mx-4 mb-4 overflow-hidden" mode="elevated">
      <Card.Content className="p-4">
        <View className="flex-row">
          <Animated.View 
            style={animatedStyle}
            className="w-20 h-20 bg-gray-300 rounded-lg mr-4" 
          />
          <View className="flex-1">
            <Animated.View 
              style={animatedStyle}
              className="h-4 bg-gray-300 rounded mb-2 w-3/4" 
            />
            <Animated.View 
              style={animatedStyle}
              className="h-3 bg-gray-300 rounded mb-2 w-full" 
            />
            <Animated.View 
              style={animatedStyle}
              className="h-3 bg-gray-300 rounded mb-2 w-1/2" 
            />
            <Animated.View 
              style={animatedStyle}
              className="h-4 bg-gray-300 rounded w-1/3" 
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  )
}

export default SkeletonCard
