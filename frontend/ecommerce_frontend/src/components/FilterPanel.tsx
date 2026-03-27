import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  ratings: number[];
  sortBy: 'relevant' | 'price-low' | 'price-high' | 'rating' | 'newest';
  inStock: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface FilterPanelProps {
  onFiltersChange?: (filters: FilterOptions) => void;
  onApply?: (filters: FilterOptions) => void;
  onClose?: () => void;
  productCount?: number;
  products?: Product[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  onFiltersChange,
  onApply,
  onClose,
  productCount = 0,
  products,
}) => {
  const insets = useSafeAreaInsets();
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 1000],
    ratings: [],
    sortBy: 'relevant',
    inStock: false,
  });

  const categories = ['Shoes', 'Clothing', 'Accessories', 'Electronics', 'Sports'];
  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $500', min: 200, max: 500 },
    { label: '$500+', min: 500, max: 10000 },
  ];
  const ratings = [5, 4, 3, 2, 1];

  const handleCategoryToggle = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    const newFilters = { ...filters, categories: updated };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handlePriceSelect = (min: number, max: number) => {
    const newFilters = { ...filters, priceRange: [min, max] as [number, number] };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleRatingToggle = (rating: number) => {
    const updated = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating];
    const newFilters = { ...filters, ratings: updated };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleSortChange = (sort: FilterOptions['sortBy']) => {
    const newFilters = { ...filters, sortBy: sort };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleStockToggle = () => {
    const newFilters = { ...filters, inStock: !filters.inStock };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const productsCount = useMemo(() => {
    if (!products) {
      return productCount;
    }
    return products.filter((product) => {
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      if (filters.ratings.length > 0 && !filters.ratings.includes(product.rating)) {
        return false;
      }
      if (filters.inStock && !product.inStock) {
        return false;
      }
      return true;
    }).length;
  }, [filters, products, productCount]);

  const handleApply = () => {
    onApply?.(filters);
    onClose?.();
  };

  const handleReset = () => {
    const defaultFilters: FilterOptions = {
      categories: [],
      priceRange: [0, 1000],
      ratings: [],
      sortBy: 'relevant',
      inStock: false,
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const activeFilterCount = 
    filters.categories.length + 
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000 ? 1 : 0) +
    filters.ratings.length +
    (filters.inStock ? 1 : 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        {activeFilterCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeFilterCount}</Text>
          </View>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Sort By */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort By</Text>
          {[
            { label: 'Most Relevant', value: 'relevant' as const },
            { label: 'Price: Low to High', value: 'price-low' as const },
            { label: 'Price: High to Low', value: 'price-high' as const },
            { label: 'Highest Rated', value: 'rating' as const },
            { label: 'Newest', value: 'newest' as const },
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleSortChange(option.value)}
              style={styles.option}
            >
              <View
                style={[
                  styles.radio,
                  filters.sortBy === option.value && styles.radioSelected,
                ]}
              />
              <Text
                style={[
                  styles.optionText,
                  filters.sortBy === option.value && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => handleCategoryToggle(category)}
              style={styles.option}
            >
              <View
                style={[
                  styles.checkbox,
                  filters.categories.includes(category) && styles.checkboxSelected,
                ]}
              >
                {filters.categories.includes(category) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text
                style={[
                  styles.optionText,
                  filters.categories.includes(category) &&
                    styles.optionTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Price Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          {priceRanges.map((range) => (
            <TouchableOpacity
              key={range.label}
              onPress={() => handlePriceSelect(range.min, range.max)}
              style={styles.option}
            >
              <View
                style={[
                  styles.radio,
                  filters.priceRange[0] === range.min &&
                    filters.priceRange[1] === range.max &&
                    styles.radioSelected,
                ]}
              />
              <Text
                style={[
                  styles.optionText,
                  filters.priceRange[0] === range.min &&
                    filters.priceRange[1] === range.max &&
                    styles.optionTextSelected,
                ]}
              >
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Ratings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ratings</Text>
          {ratings.map((rating) => (
            <TouchableOpacity
              key={rating}
              onPress={() => handleRatingToggle(rating)}
              style={styles.option}
            >
              <View
                style={[
                  styles.checkbox,
                  filters.ratings.includes(rating) && styles.checkboxSelected,
                ]}
              >
                {filters.ratings.includes(rating) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <View style={styles.ratingLabel}>
                <Text style={styles.stars}>{'★'.repeat(rating)}</Text>
                <Text style={styles.ratingText}> & Up ({5 - rating + 1}★)</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stock Status */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={handleStockToggle}
            style={styles.option}
          >
            <View
              style={[
                styles.checkbox,
                filters.inStock && styles.checkboxSelected,
              ]}
            >
              {filters.inStock && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text
              style={[
                styles.optionText,
                filters.inStock && styles.optionTextSelected,
              ]}
            >
              In Stock Only
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
          <Text style={styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.applyBtn}>
          <Text style={styles.applyBtnText}>
            Apply ({productsCount} products)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  backBtn: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: '#E8C97A',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  badge: {
    backgroundColor: '#E8C97A',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#A0A0A0',
  },
  radioSelected: {
    borderColor: '#E8C97A',
    backgroundColor: '#E8C97A',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#A0A0A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: '#E8C97A',
    backgroundColor: '#E8C97A',
  },
  checkmark: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
  optionText: {
    color: '#A0A0A0',
    fontSize: 14,
    flex: 1,
  },
  optionTextSelected: {
    color: '#E8C97A',
    fontWeight: '600',
  },
  ratingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stars: {
    color: '#E8C97A',
    fontSize: 12,
  },
  ratingText: {
    color: '#A0A0A0',
    fontSize: 14,
    marginLeft: 2,
  },
  spacer: {
    height: 20,
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1F1F2A',
  },
  resetBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8C97A',
    alignItems: 'center',
  },
  resetBtnText: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '600',
  },
  applyBtn: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E8C97A',
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default FilterPanel;
