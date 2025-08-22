import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Checkbox, Divider, Menu, Modal, Portal, Text } from 'react-native-paper'
import { useColorScheme } from '../hooks/useColorScheme'
import { FilterOptions, PriceRange, SortOption } from '../utils/filterUtils'
import PriceRangeSelector from './PriceRangeSelector'

interface FilterSortBarProps {
    onFilterChange: (filters: FilterOptions) => void
    onSortChange: (sort: SortOption) => void
    availableCategories: string[]
    availableBrands: string[]
    priceRange: PriceRange
    currentFilters: FilterOptions
    currentSort: SortOption
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({
    onFilterChange,
    onSortChange,
    availableCategories,
    availableBrands,
    priceRange,
    currentFilters,
    currentSort
}) => {
    const colorScheme = useColorScheme()
    const isDark = colorScheme === 'dark'

    const [filterMenuVisible, setFilterMenuVisible] = useState(false)
    const [sortMenuVisible, setSortMenuVisible] = useState(false)
    const [categoryMenuVisible, setCategoryMenuVisible] = useState(false)
    const [brandMenuVisible, setBrandMenuVisible] = useState(false)
    const [priceMenuVisible, setPriceMenuVisible] = useState(false)

    console.log("availableCategories: ", availableCategories);

    const sortOptions: { key: SortOption; label: string }[] = [
        { key: 'price-low-high', label: 'Price: Low to High' },
        { key: 'price-high-low', label: 'Price: High to Low' },
        { key: 'date-newest', label: 'Date: Newest First' },
        { key: 'date-oldest', label: 'Date: Oldest First' },
    ]

    const handleCategoryToggle = (category: string) => {
        const updatedCategories = currentFilters.categories.includes(category)
            ? currentFilters.categories.filter(c => c !== category)
            : [...currentFilters.categories, category]

        onFilterChange({
            ...currentFilters,
            categories: updatedCategories
        })
    }

    const handleBrandToggle = (brand: string) => {
        const updatedBrands = currentFilters.brands.includes(brand)
            ? currentFilters.brands.filter(b => b !== brand)
            : [...currentFilters.brands, brand]

        onFilterChange({
            ...currentFilters,
            brands: updatedBrands
        })
    }

    const applyPriceRange = (range: PriceRange) => {
        onFilterChange({
            ...currentFilters,
            priceRange: range
        })
        setPriceMenuVisible(false)
    }

    const clearFilters = () => {
        onFilterChange({
            priceRange: priceRange,
            categories: [],
            brands: []
        })
        setFilterMenuVisible(false)
    }

    const getActiveFilterCount = () => {
        let count = 0
        if (currentFilters.categories.length > 0) count++
        if (currentFilters.brands.length > 0) count++
        if (currentFilters.priceRange.min !== priceRange.min || currentFilters.priceRange.max !== priceRange.max) count++
        return count
    }

    return (
        <View className="flex-row relative justify-between md:justify-start md:gap-2 items-center px-6 py-3 bg-transparent">


            {/* Filter Button */}
            <Button
                onPressIn={() => setFilterMenuVisible(true)}
                mode="outlined"
                onPress={() => setFilterMenuVisible(true)}
                icon="filter-variant"
                style={{
                    borderColor: isDark ? '#60a5fa' : '#3b82f6',
                    backgroundColor: 'transparent'
                }}
                labelStyle={{
                    color: isDark ? '#60a5fa' : '#3b82f6',
                    fontSize: 14
                }}
                className="flex-1 mr-2"

            >
                Filter {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </Button>


            {/* Sort Button */}
            <Button
                mode="outlined"
                onPress={() => setSortMenuVisible(true)}
                icon="sort"
                className="flex-1 ml-2"
                style={{
                    borderColor: isDark ? '#60a5fa' : '#3b82f6',
                    backgroundColor: 'transparent'
                }}
                labelStyle={{
                    color: isDark ? '#60a5fa' : '#3b82f6',
                    fontSize: 14
                }}
            >
                Sort By
            </Button>

            {/* Filter Menu */}
            <Menu

                visible={filterMenuVisible}
                onDismiss={() => setFilterMenuVisible(false)}
                anchor={{ x: 40, y: 200 }}
                contentStyle={{
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    minWidth: 250,
                }}

            >
                {/* Price Range Filter */}
                <Menu.Item
                    onPress={() => {
                        setFilterMenuVisible(false)
                        setPriceMenuVisible(true)
                    }}
                    title="Price Range"
                    leadingIcon="currency-usd"
                />

                {/* Category Filter */}
                <Menu.Item
                    onPress={() => {
                        setFilterMenuVisible(false)
                        setCategoryMenuVisible(true)
                    }}
                    title="Categories"
                    leadingIcon="tag-multiple"
                />

                {/* Brand Filter */}
                <Menu.Item
                    onPress={() => {
                        setFilterMenuVisible(false)
                        setBrandMenuVisible(true)
                    }}
                    title="Brands"
                    leadingIcon="domain"
                />

                <Divider />
                <Menu.Item
                    onPress={clearFilters}
                    title="Clear All Filters"
                    leadingIcon="close"
                />
            </Menu>

            {/* Sort Menu */}
            <Menu
                visible={sortMenuVisible}
                onDismiss={() => setSortMenuVisible(false)}
                anchor={{ x: 150, y: 200 }}
                contentStyle={{
                    backgroundColor: isDark ? '#374151' : '#ffffff',
                    minWidth: 200,
                }}
            >
                {sortOptions.map((option) => (
                    <Menu.Item
                        key={option.key}
                        onPress={() => {
                            onSortChange(option.key)
                            setSortMenuVisible(false)
                        }}
                        title={option.label}
                        leadingIcon={currentSort === option.key ? "check" : undefined}
                    />
                ))}
            </Menu>

            {/* Price Range Modal */}
            <Portal>
                <Modal
                    visible={priceMenuVisible}
                    onDismiss={() => setPriceMenuVisible(false)}
                    contentContainerStyle={{
                        backgroundColor: isDark ? '#374151' : '#ffffff',
                        margin: 20,
                        borderRadius: 8,
                    }}
                >
                    <PriceRangeSelector
                        initialRange={currentFilters.priceRange}
                        maxRange={priceRange}
                        onApply={applyPriceRange}
                        onCancel={() => setPriceMenuVisible(false)}
                    />
                </Modal>
            </Portal>

            {/* Category Menu */}
            <Portal>
                <Modal
                    visible={categoryMenuVisible}
                    onDismiss={() => setCategoryMenuVisible(false)}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}



                    contentContainerStyle={{
                        backgroundColor: isDark ? '#374151' : '#ffffff',
                        margin: 20,
                        padding: 10,
                        borderRadius: 16,
                        elevation: 4,
                        minWidth: 250,
                    }}
                >
                    <Text className="text-lg font-semibold mb-4 px-4">Categories</Text>
                    {availableCategories.map((category) => (
                        <View key={category} className="flex-row items-center px-4 py-2">
                            <Checkbox
                                status={currentFilters.categories.includes(category) ? 'checked' : 'unchecked'}
                                onPress={() => handleCategoryToggle(category)}
                            />
                            <Text className="ml-2 flex-1">{category}</Text>
                        </View>
                    ))}
                    <Button onPress={() => setCategoryMenuVisible(false)} className="mt-4">
                        Done
                    </Button>
                </Modal>
            </Portal>

            {/* Brand Menu */}
            <Portal>
                <Modal
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}
                    visible={brandMenuVisible}
                    onDismiss={() => setBrandMenuVisible(false)}
                    contentContainerStyle={{
                        backgroundColor: isDark ? '#374151' : '#ffffff',
                        margin: 20,
                        padding: 10,
                        minWidth: 250,
                        marginVertical: 30,
                        maxHeight: 500,
                        overflow: 'scroll',
                        borderRadius: 16,

                    }}
                >
                    <Text className="text-lg font-semibold mb-4 px-4">Brands</Text>
                    <ScrollView>
                        {availableBrands.map((brand) => (
                            <View key={brand} className="flex-row items-center px-4 py-2">
                                <Checkbox
                                    status={currentFilters.brands.includes(brand) ? 'checked' : 'unchecked'}
                                    onPress={() => handleBrandToggle(brand)}
                                />
                                <Text className="ml-2 flex-1">{brand}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <Button onPress={() => setBrandMenuVisible(false)} className="mt-4">
                        Done
                    </Button>
                </Modal>
            </Portal>
        </View>
    )
}

export default FilterSortBar
