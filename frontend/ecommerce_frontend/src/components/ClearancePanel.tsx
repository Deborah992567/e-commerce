import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

interface ClearanceItem {
  id: string;
  title: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  image: string;
}

const CLEARANCE_DATA: ClearanceItem[] = [
  {
    id: 'clear-1',
    title: 'Vintage Leather Jacket',
    originalPrice: 299,
    dealPrice: 99,
    discount: 67,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
  },
  {
    id: 'clear-2',
    title: 'Designer Sunglasses',
    originalPrice: 149,
    dealPrice: 49,
    discount: 67,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
  },
  {
    id: 'clear-3',
    title: 'Luxury Handbag',
    originalPrice: 399,
    dealPrice: 149,
    discount: 63,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
  },
  {
    id: 'clear-4',
    title: 'Premium Watch',
    originalPrice: 499,
    dealPrice: 199,
    discount: 60,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
  },
];

interface ClearancePanelProps {
  onClearancePress?: (id: string) => void;
}

const ClearancePanel: React.FC<ClearancePanelProps> = ({ onClearancePress }) => {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 60) / 2; // 2 items per row with padding

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏷️ Clearance Sale</Text>
        <Text style={styles.subtitle}>Up to 70% off overstock items</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CLEARANCE_DATA.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.itemCard, { width: itemWidth }]}
            onPress={() => onClearancePress?.(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                <Text style={styles.dealPrice}>${item.dealPrice}</Text>
              </View>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{item.discount}%</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  scrollContent: {
    paddingRight: 20,
  },
  itemCard: {
    backgroundColor: '#1A1A1F',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  itemImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  itemInfo: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#A0A0A0',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  dealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E8C97A',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default ClearancePanel;