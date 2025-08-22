import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { Surface, TextInput } from 'react-native-paper'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import { useColorScheme } from '../hooks/useColorScheme'

interface SearchInputProps {
  value: string
  onChangeText: (text: string) => void
  onSearch: () => void
  placeholder?: string
  disabled?: boolean
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onSearch,
  placeholder = "Ask AI for product recommendations...",
  disabled = false
}) => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      disabled ? 0 : 1,
      [0, 1],
      ['#9ca3af', '#3b82f6']
    )
    
    return {
      backgroundColor,
      transform: [
        { scale: withTiming(disabled ? 0.95 : 1, { duration: 200 }) }
      ]
    }
  })
  
  return (
    <Surface 
      className="rounded-2xl overflow-hidden"
      elevation={4}
      style={{ 
        backgroundColor: isDark ? '#374151' : '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderRadius: 16
      }}
    >
      <View className="flex-row items-center px-3 py-2">
        <View className="flex-1 mr-3">
          <TextInput
            mode="flat"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            underlineStyle={{ height: 0 }}
            contentStyle={{
              backgroundColor: 'transparent',
              color: isDark ? '#ffffff' : '#000000',
              fontSize: 13,
              paddingLeft: 4,
              paddingRight: 0
            }}
            style={{
              backgroundColor: 'transparent',
              height: 48,
            }}
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            onSubmitEditing={onSearch}
            editable={!disabled}
            multiline={false}
            maxLength={200}
          />
        </View>
        
        <Animated.View style={buttonAnimatedStyle} className="rounded-xl overflow-hidden">
          <Pressable
            onPress={onSearch}
            disabled={disabled || !value.trim()}
            android_ripple={{ color: '#1d4ed8' }}
            className="w-12 h-12 items-center justify-center"
          >
            <Text className="text-white text-xl">✨</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Surface>
  )
}

export default SearchInput
