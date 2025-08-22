import { Recommendation } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import { Portal } from 'react-native-paper';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';

interface WhyModalProps {
    product: Recommendation | null;
    isVisible: boolean;
    onClose: () => void;
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
};

const WhyModal: React.FC<WhyModalProps> = ({ product, isVisible, onClose }) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    
    const modalScale = useSharedValue(0);
    const modalOpacity = useSharedValue(0);
    const contentOpacity = useSharedValue(0);
    const closeButtonScale = useSharedValue(1);
    
    const getCategoryColor = (category: string) => {
        return colors[category as keyof typeof colors] || '#6b7280';
    };
    
    // Animated modal styles
    const modalAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: modalScale.value }],
        opacity: modalOpacity.value,
    }));
    
    const backdropAnimatedStyle = useAnimatedStyle(() => ({
        opacity: modalOpacity.value * 0.5,
    }));

    const contentAnimatedStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value,
        transform: [{ translateY: (1 - contentOpacity.value) * 20 }],
    }));

    const closeButtonAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: closeButtonScale.value }],
    }));

    // Show modal with animation
    React.useEffect(() => {
        if (isVisible && product) {
            // Reset animation values
            modalScale.value = 0;
            modalOpacity.value = 0;
            contentOpacity.value = 0;
            
            // Haptic feedback
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            
            modalOpacity.value = withTiming(1, { duration: 300 });
            modalScale.value = withSpring(1, { damping: 15, stiffness: 150 });
            contentOpacity.value = withTiming(1, { duration: 400 });
        }
    }, [isVisible, product]);

    // Hide modal with animation
    const hideModal = () => {
        // Haptic feedback
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        
        contentOpacity.value = withTiming(0, { duration: 150 });
        modalOpacity.value = withTiming(0, { duration: 200 });
        modalScale.value = withTiming(0.8, { duration: 200 }, (finished) => {
            if (finished) {
                runOnJS(onClose)();
            }
        });
    };

    const handleCloseButtonPressIn = () => {
        closeButtonScale.value = withSpring(0.9);
    };

    const handleCloseButtonPressOut = () => {
        closeButtonScale.value = withSpring(1);
    };

    if (!isVisible || !product) {
        return null;
    }

    return (
        <Portal>
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'black',
                        zIndex: 1000,
                    },
                    backdropAnimatedStyle
                ]}
            >
                <Pressable
                    style={{ flex: 1 }}
                    onPress={hideModal}
                />
            </Animated.View>
            
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: '20%',
                        left: 20,
                        right: 20,
                        backgroundColor: isDark ? '#374151' : '#ffffff',
                        borderRadius: 16,
                        padding: 24,
                        elevation: 10,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        zIndex: 1001,
                    },
                    modalAnimatedStyle
                ]}
            >
                <Animated.View style={contentAnimatedStyle}>
                    {/* Modal Header */}
                    <View className="flex-row items-center justify-between mb-6">
                        <View className="flex-row items-center flex-1 mr-3">
                            <View
                                style={{
                                    backgroundColor: getCategoryColor(product.category) + '20',
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 12
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>
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
                            <View className="flex-1">
                                <Text
                                    className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                                    numberOfLines={1}
                                >
                                    Why This Product?
                                </Text>
                            </View>
                        </View>
                        
                        <Animated.View style={closeButtonAnimatedStyle}>
                            <Pressable
                                onPress={hideModal}
                                onPressIn={handleCloseButtonPressIn}
                                onPressOut={handleCloseButtonPressOut}
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 18,
                                    backgroundColor: isDark ? '#4B5563' : '#F3F4F6',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Ionicons 
                                    name="close" 
                                    size={20} 
                                    color={isDark ? '#D1D5DB' : '#6B7280'} 
                                />
                            </Pressable>
                        </Animated.View>
                    </View>

                    {/* Product Info */}
                    <View className="mb-6">
                        <Text
                            className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                            style={{ color: getCategoryColor(product.category) }}
                        >
                            {product.brand}
                        </Text>
                        <Text
                            className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                            numberOfLines={2}
                        >
                            {product.product_name}
                        </Text>
                        <View
                            className="px-3 py-1 rounded-full self-start"
                            style={{
                                backgroundColor: getCategoryColor(product.category) + '20'
                            }}
                        >
                            <Text
                                className="text-xs font-medium"
                                style={{ color: getCategoryColor(product.category) }}
                            >
                                {product.category}
                            </Text>
                        </View>
                    </View>

                    {/* Why Section */}
                    <View className="mb-4">
                        <Text
                            className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Recommendation Reason:
                        </Text>
                        <View
                            className="p-4 rounded-lg"
                            style={{
                                backgroundColor: isDark ? '#4B5563' : '#F9FAFB',
                                borderLeftWidth: 4,
                                borderLeftColor: getCategoryColor(product.category)
                            }}
                        >
                            <Text
                                className={`text-sm leading-6 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
                            >
                                {product.why}
                            </Text>
                        </View>
                    </View>

                    {/* Price */}
                    <View className="pt-4 border-t" style={{ borderTopColor: isDark ? '#4B5563' : '#E5E7EB' }}>
                        <Text className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            ₹{product.price.toLocaleString('en-IN')}
                        </Text>
                    </View>
                </Animated.View>
            </Animated.View>
        </Portal>
    );
};

export default WhyModal;
