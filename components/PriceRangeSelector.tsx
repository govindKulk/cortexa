import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { PriceRange } from '../utils/filterUtils'

interface PriceRangeSelectorProps {
  initialRange: PriceRange
  maxRange: PriceRange
  onApply: (range: PriceRange) => void
  onCancel: () => void
}

const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({
  initialRange,
  maxRange,
  onApply,
  onCancel
}) => {
  const [minValue, setMinValue] = useState(initialRange.min.toString())
  const [maxValue, setMaxValue] = useState(initialRange.max.toString())

  const handleApply = () => {
    const min = Math.max(parseInt(minValue) || maxRange.min, maxRange.min)
    const max = Math.min(parseInt(maxValue) || maxRange.max, maxRange.max)
    
    onApply({ min, max })
  }

  return (
    <View className="p-4">
      <Text className="text-lg font-semibold mb-4">Price Range</Text>
      
      <View className="mb-4">
        <Text className="text-sm text-gray-600 mb-2">
          Available range: ₹{maxRange.min.toLocaleString()} - ₹{maxRange.max.toLocaleString()}
        </Text>
      </View>
      
      <View className="flex-row space-x-3 mb-4">
        <View className="flex-1">
          <Text className="text-sm mb-1">Min Price</Text>
          <TextInput
            mode="outlined"
            value={minValue}
            onChangeText={setMinValue}
            keyboardType="numeric"
            placeholder="Min"
            dense
          />
        </View>
        
        <View className="flex-1">
          <Text className="text-sm mb-1">Max Price</Text>
          <TextInput
            mode="outlined"
            value={maxValue}
            onChangeText={setMaxValue}
            keyboardType="numeric"
            placeholder="Max"
            dense
          />
        </View>
      </View>
      
      <View className="flex-row justify-end space-x-2">
        <Button onPress={onCancel}>Cancel</Button>
        <Button mode="contained" onPress={handleApply}>
          Apply
        </Button>
      </View>
    </View>
  )
}

export default PriceRangeSelector
