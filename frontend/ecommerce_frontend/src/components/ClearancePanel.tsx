import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TagIcon, FireIcon } from './Icons';

interface ClearanceItem {
  id: string;
  title: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  image: string;
}

const CLEARANCE_DATA: ClearanceItem[] = [
  { id: 'clear-1', title: 'Vintage Leather Jacket', originalPrice: 299, dealPrice: 99, discount: 67, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80' },
  { id: 'clear-2', title: 'Designer Sunglasses', originalPrice: 149, dealPrice: 49, discount: 67, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80' },
  { id: 'clear-3', title: 'Luxury Handbag', originalPrice: 399, dealPrice: 149, discount: 63, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80' },
  { id: 'clear-4', title: 'Premium Watch', originalPrice: 499, dealPrice: 199, discount: 60, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80' },
];

interface ClearancePanelProps {
  onClearancePress?: (id: string) => void;
}

const ClearancePanel: React.FC<ClearancePanelProps> = ({ onClearancePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <TagIcon size={20} color="#FF5722" />
          <Text style={styles.title}>Clearance Sale</Text>
        </View>
        <Text style={styles.subtitle}>Up to 70% off overstock items</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {CLEARANCE_DATA.map((item) => (
          <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => onClearancePress?.(item.id)}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.discountBadge}>
              <FireIcon size={10} color="#FFF" />
              <Text style={styles.discountText}>-{item.discount}%</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                <Text style={styles.dealPrice}>${item.dealPrice}</Text>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
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
    width: 160,
  },
  itemImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  discountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
  },
  itemInfo: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#A0A0A0',
    textDecorationLine: 'line-through',
  },
  dealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
});

export default ClearancePanel;
