import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';

interface RecommendedProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  reason: 'trending' | 'similar' | 'popular' | 'viewed';
}

interface RecommendationsProps {
  browsingHistory?: number[];
  currentCategory?: string;
  onSelectProduct?: (product: RecommendedProduct) => void;
}

const MOCK_PRODUCTS = {
  1: { name: 'Premium Running Shoes', price: 149.99, category: 'Shoes', rating: 4.8, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  2: { name: 'Luxury Designer Jacket', price: 299.99, category: 'Clothing', rating: 4.6, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' },
  3: { name: 'Wireless Headphones', price: 199.99, category: 'Electronics', rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  4: { name: 'Smartwatch Pro', price: 299.99, category: 'Electronics', rating: 4.7, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  5: { name: 'Athletic Shorts', price: 79.99, category: 'Clothing', rating: 4.4, image: 'https://images.unsplash.com/photo-1506629082632-59d7ee8ccd2f?w=500&q=80' },
  6: { name: 'Sports Backpack', price: 89.99, category: 'Accessories', rating: 4.3, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80' },
  7: { name: 'Canvas Sneakers', price: 99.99, category: 'Shoes', rating: 4.2, image: 'https://images.unsplash.com/photo-1519338377fab-40146682bed5?w=500&q=80' },
  8: { name: 'Cotton T-Shirt', price: 49.99, category: 'Clothing', rating: 4.1, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' },
};

const RecommendationsPanel: React.FC<RecommendationsProps> = ({
  browsingHistory = [1, 3, 4],
  currentCategory = 'Electronics',
  onSelectProduct,
}) => {
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const [activeTab, setActiveTab] = useState<'trending' | 'similar' | 'popular'>('trending');

  useEffect(() => {
    generateRecommendations();
  }, [browsingHistory, currentCategory]);

  const generateRecommendations = () => {
    const recs: RecommendedProduct[] = [];

    // Similar products (same category)
    const similarRecs = Object.entries(MOCK_PRODUCTS)
      .filter(
        ([_, p]: any) => p.category === currentCategory && !browsingHistory.includes(parseInt(_))
      )
      .slice(0, 3)
      .map(([id, p]: any) => ({
        id: parseInt(id),
        ...p,
        reason: 'similar' as const,
      }));

    // Trending (high-rated)
    const trendingRecs = Object.entries(MOCK_PRODUCTS)
      .filter(([_, p]: any) => (p as any).rating >= 4.6 && !browsingHistory.includes(parseInt(_)))
      .slice(0, 4)
      .map(([id, p]: any) => ({
        id: parseInt(id),
        ...p,
        reason: 'trending' as const,
      }));

    // Popular (mid-to-high rated)
    const popularRecs = Object.entries(MOCK_PRODUCTS)
      .slice(0, 5)
      .map(([id, p]: any) => ({
        id: parseInt(id),
        ...p,
        reason: 'popular' as const,
      }));

    setRecommendations([...similarRecs, ...trendingRecs, ...popularRecs]);
  };

  const getFilteredRecs = () => {
    switch (activeTab) {
      case 'trending':
        return recommendations.filter((r) => r.reason === 'trending').slice(0, 6);
      case 'similar':
        return recommendations.filter((r) => r.reason === 'similar').slice(0, 6);
      case 'popular':
        return recommendations.filter((r) => r.reason === 'popular').slice(0, 6);
      default:
        return recommendations.slice(0, 6);
    }
  };

  const getReasonEmoji = (reason: string) => {
    switch (reason) {
      case 'trending':
        return '🔥';
      case 'similar':
        return '🎯';
      case 'popular':
        return '⭐';
      case 'viewed':
        return '👁️';
      default:
        return '✨';
    }
  };

  const filteredRecs = getFilteredRecs();

  const renderRecCard = ({ item }: { item: RecommendedProduct }) => (
    <TouchableOpacity
      onPress={() => onSelectProduct?.(item)}
      style={styles.recCard}
    >
      <View style={styles.recImageContainer}>
        <Image source={{ uri: item.image }} style={styles.recImage} />
        <View style={styles.reasonBadge}>
          <Text style={styles.reasonEmoji}>{getReasonEmoji(item.reason)}</Text>
        </View>
      </View>
      <Text style={styles.recName} numberOfLines={2}>
        {item.name}
      </Text>
      <View style={styles.recRating}>
        <Text style={styles.stars}>⭐ {item.rating}</Text>
      </View>
      <Text style={styles.recPrice}>₦{item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['trending', 'similar', 'popular'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recommendations Grid */}
      {filteredRecs.length > 0 ? (
        <FlatList
          data={filteredRecs}
          keyExtractor={(item) => `${item.id}-${item.reason}`}
          renderItem={renderRecCard}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          scrollEnabled={false}
          contentContainerStyle={styles.gridContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No recommendations available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#18181F',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#E8C97A',
  },
  tabText: {
    color: '#A0A0A0',
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#000',
  },
  gridContent: {
    paddingBottom: 16,
  },
  gridRow: {
    gap: 10,
    marginBottom: 10,
  },
  recCard: {
    flex: 1,
    backgroundColor: '#18181F',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
  },
  recImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#23232B',
  },
  reasonBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reasonEmoji: {
    fontSize: 16,
  },
  recName: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingTop: 8,
    minHeight: 32,
  },
  recRating: {
    paddingHorizontal: 8,
    marginTop: 4,
  },
  stars: {
    color: '#E8C97A',
    fontSize: 11,
    fontWeight: '600',
  },
  recPrice: {
    color: '#E8C97A',
    fontSize: 13,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingBottom: 8,
    marginTop: 4,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#A0A0A0',
    fontSize: 14,
  },
});

export default RecommendationsPanel;
