import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import AnimatedCard from './AnimatedCard';
import { ClockIcon } from './Icons';

interface RecentlyViewedProduct {
  id: string | number;
  name: string;
  img: string;
  price: number;
}

interface RecentlyViewedProps {
  products: RecentlyViewedProduct[];
  onSelect?: (product: RecentlyViewedProduct) => void;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ products, onSelect }) => {
  if (products.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ClockIcon size={18} color="#FF5722" />
        <Text style={styles.title}>Recently Viewed</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {products.map((product, index) => (
          <AnimatedCard key={product.id} delay={index * 80}>
            <TouchableOpacity style={styles.card} onPress={() => onSelect?.(product)} activeOpacity={0.85}>
              <Image source={{ uri: product.img }} style={styles.image} />
              <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
              <Text style={styles.price}>₦{product.price.toLocaleString()}</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  scroll: { paddingHorizontal: 16, gap: 12 },
  card: { width: 140, backgroundColor: '#23232B', borderRadius: 12, borderWidth: 1, borderColor: '#2D2D3840', overflow: 'hidden' },
  image: { width: '100%', height: 100 },
  name: { fontSize: 12, color: '#FFF', fontWeight: '500', paddingHorizontal: 8, paddingTop: 8, lineHeight: 16 },
  price: { fontSize: 14, color: '#FF5722', fontWeight: 'bold', paddingHorizontal: 8, paddingBottom: 8, paddingTop: 4 },
});

export default RecentlyViewed;
