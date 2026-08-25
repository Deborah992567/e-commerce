import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ClockIcon, FireIcon, TagIcon } from './Icons';

interface FlashDeal {
  id: string;
  title: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  image: string;
  timeLeft: number;
  stock: number;
}

const FLASH_DEALS_DATA: FlashDeal[] = [
  {
    id: 'flash-1',
    title: 'Wireless Earbuds Pro',
    originalPrice: 199,
    dealPrice: 59,
    discount: 70,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    timeLeft: 3600,
    stock: 12,
  },
  {
    id: 'flash-2',
    title: 'Smart Watch Ultra',
    originalPrice: 299,
    dealPrice: 89,
    discount: 70,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    timeLeft: 2400,
    stock: 5,
  },
  {
    id: 'flash-3',
    title: 'Phone Case Premium',
    originalPrice: 49,
    dealPrice: 14,
    discount: 71,
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=600&q=80',
    timeLeft: 5400,
    stock: 28,
  },
  {
    id: 'flash-4',
    title: 'USB-C Cable Set',
    originalPrice: 29,
    dealPrice: 8,
    discount: 72,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&q=80',
    timeLeft: 1800,
    stock: 42,
  },
];

const FlashDealCard: React.FC<{ deal: FlashDeal; timeLeft: number }> = ({ deal, timeLeft }) => {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const isLowStock = deal.stock <= 10;

  return (
    <View style={styles.flashCard}>
      <View style={styles.flashImageContainer}>
        <Image source={{ uri: deal.image }} style={styles.flashImage} resizeMode="cover" />
        <View style={styles.flashDiscountBadge}>
          <TagIcon size={10} color="#FFF" />
          <Text style={styles.flashDiscountText}>-{deal.discount}%</Text>
        </View>
        {isLowStock && (
          <View style={styles.flashStockAlert}>
            <FireIcon size={10} color="#FFF" />
            <Text style={styles.flashStockText}>{deal.stock} left</Text>
          </View>
        )}
      </View>
      <View style={styles.flashContent}>
        <Text style={styles.flashTitle} numberOfLines={2}>{deal.title}</Text>
        <View style={styles.flashPriceRow}>
          <Text style={styles.flashOriginalPrice}>₦{deal.originalPrice}</Text>
          <Text style={styles.flashDealPrice}>₦{deal.dealPrice}</Text>
        </View>
        <View style={styles.flashTimerContainer}>
          <ClockIcon size={12} color="#0D0D12" />
          <Text style={styles.flashTimerText}>{hours}h {minutes}m</Text>
        </View>
      </View>
    </View>
  );
};

interface FlashDealsPanelProps {
  onFlashDealPress?: (dealId: string) => void;
}

const FlashDealsPanel: React.FC<FlashDealsPanelProps> = ({ onFlashDealPress }) => {
  const [deals] = useState(FLASH_DEALS_DATA);
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const initialTimes: { [key: string]: number } = {};
    deals.forEach((deal) => { initialTimes[deal.id] = deal.timeLeft; });
    setCurrentTimes(initialTimes);
  }, [deals]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimes((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => { updated[key] = Math.max(0, updated[key] - 60); });
        return updated;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.flashDealsContainer}>
      <View style={styles.flashDealsHeader}>
        <View style={styles.flashDealsTitle}>
          <FireIcon size={20} color="#FF5722" />
          <Text style={styles.flashHeaderText}>Flash Deals</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.flashDealsViewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flashDealsScroll}
        style={styles.flashDealsScrollContainer}
      >
        {deals.map((deal) => (
          <TouchableOpacity key={deal.id} activeOpacity={0.9} onPress={() => onFlashDealPress?.(deal.id)}>
            <FlashDealCard deal={deal} timeLeft={currentTimes[deal.id] || deal.timeLeft} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flashDealsContainer: {
    marginVertical: 20,
    width: '100%',
  },
  flashDealsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 14,
  },
  flashDealsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flashHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  flashDealsViewAll: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: '600',
  },
  flashDealsScrollContainer: {
    width: '100%',
  },
  flashDealsScroll: {
    gap: 12,
  },
  flashCard: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    overflow: 'hidden',
    width: 160,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  flashImageContainer: {
    position: 'relative',
    width: '100%',
    height: 130,
    overflow: 'hidden',
  },
  flashImage: {
    width: '100%',
    height: '100%',
  },
  flashDiscountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flashDiscountText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  flashStockAlert: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FF2D55',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flashStockText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  flashContent: {
    padding: 12,
  },
  flashTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    height: 34,
  },
  flashPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  flashOriginalPrice: {
    color: '#808080',
    fontSize: 11,
    textDecorationLine: 'line-through',
  },
  flashDealPrice: {
    color: '#FF5722',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flashTimerContainer: {
    backgroundColor: '#4ECDC4',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flashTimerText: {
    color: '#0D0D12',
    fontWeight: 'bold',
    fontSize: 11,
  },
});

export default FlashDealsPanel;
