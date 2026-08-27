import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRODUCT_CATALOG, searchProducts } from '../data/products';
import { Product } from '../types';
import { SearchIcon, ChevronLeftIcon, StarIcon, XIcon } from './Icons';

interface SearchScreenProps {
  onBack?: () => void;
  onProductPress?: (product: Product) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onProductPress }) => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const suggestions = ['headphones', 'perfume', 'watch', 'sneakers', 'earbuds', 'handbag'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query) ?? [];
  }, [query]);

  const handleSelectSuggestion = (s: string) => {
    setQuery(s);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => onProductPress?.(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.img }} style={styles.resultImg} resizeMode="cover" />
      <View style={styles.resultInfo}>
        <Text style={styles.resultName} numberOfLines={2}>{item.name}</Text>
        {item.store ? <Text style={styles.resultStore}>{item.store}</Text> : null}
        <View style={styles.resultMeta}>
          <Text style={styles.resultPrice}>₦{item.price}</Text>
          {item.oldPrice ? <Text style={styles.resultOld}>₦{item.oldPrice}</Text> : null}
          {item.discount ? <View style={styles.discountBadge}><Text style={styles.discountText}>-{item.discount}%</Text></View> : null}
        </View>
        {typeof item.rating === 'number' ? (
          <View style={styles.ratingRow}>
            <StarIcon size={12} color="#FFD700" filled />
            <Text style={styles.ratingText}>{item.rating}</Text>
            {typeof item.reviews === 'number' ? <Text style={styles.reviewsText}>({item.reviews})</Text> : null}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ChevronLeftIcon size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <SearchIcon size={18} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, brands, deals..."
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
            autoFocus
            returnKeyType="search"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          {query.length > 0 ? (
            <TouchableOpacity onPress={() => setQuery('')}>
              <XIcon size={18} color="#888" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {!query.trim() ? (
        <View style={styles.suggestionsWrap}>
          <Text style={styles.suggestionsTitle}>Trending Searches</Text>
          <View style={styles.suggestionsRow}>
            {suggestions.map((s) => (
              <TouchableOpacity key={s} style={styles.suggestionChip} onPress={() => handleSelectSuggestion(s)}>
                <Text style={styles.suggestionText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.allProducts}>
            <Text style={styles.allProductsTitle}>All Products</Text>
            <FlatList
              data={PRODUCT_CATALOG}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.resultsList}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.resultsCount}>{results.length} result{results.length > 1 ? 's' : ''}</Text>}
        />
      ) : (
        <View style={styles.emptyWrap}>
          <SearchIcon size={40} color="#3D3D48" />
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptySubtitle}>Try a different keyword or check your spelling.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, gap: 10, borderBottomWidth: 1, borderBottomColor: '#2D2D38' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#23232B', borderWidth: 1, borderColor: '#2D2D38', alignItems: 'center', justifyContent: 'center' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#23232B', borderRadius: 24, paddingHorizontal: 14, height: 40, borderWidth: 1, borderColor: '#2D2D38', gap: 8 },
  searchInput: { flex: 1, color: '#FFF', fontSize: 15, padding: 0 },
  suggestionsWrap: { paddingHorizontal: 16, paddingTop: 16, flex: 1 },
  suggestionsTitle: { color: '#FFF', fontSize: 16, fontWeight: '600', marginBottom: 12 },
  suggestionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  suggestionChip: { backgroundColor: '#1B1B1F', borderWidth: 1, borderColor: '#2D2D38', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8 },
  suggestionText: { color: '#A0A0A0', fontSize: 13 },
  allProducts: { flex: 1 },
  allProductsTitle: { color: '#FFF', fontSize: 16, fontWeight: '600', marginBottom: 12 },
  resultsList: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 40 },
  resultsCount: { color: '#A0A0A0', fontSize: 13, marginBottom: 12 },
  resultCard: { flexDirection: 'row', backgroundColor: '#18181F', borderRadius: 12, borderWidth: 1, borderColor: '#2D2D38', padding: 10, marginBottom: 10, gap: 12 },
  resultImg: { width: 72, height: 72, borderRadius: 8 },
  resultInfo: { flex: 1 },
  resultName: { color: '#FFF', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  resultStore: { color: '#A0A0A0', fontSize: 12, marginBottom: 4 },
  resultMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  resultPrice: { color: '#FF5722', fontSize: 15, fontWeight: 'bold' },
  resultOld: { color: '#A0A0A0', fontSize: 12, textDecorationLine: 'line-through' },
  discountBadge: { backgroundColor: '#FF572220', borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1 },
  discountText: { color: '#FF5722', fontSize: 11, fontWeight: '600' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { color: '#FFD700', fontSize: 12, fontWeight: '600' },
  reviewsText: { color: '#A0A0A0', fontSize: 12 },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyTitle: { color: '#FFF', fontSize: 18, fontWeight: '600', marginTop: 12 },
  emptySubtitle: { color: '#A0A0A0', fontSize: 14, textAlign: 'center', marginTop: 6 },
});

export default SearchScreen;
