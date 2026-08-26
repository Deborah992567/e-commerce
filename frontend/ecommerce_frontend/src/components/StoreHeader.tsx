import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StarIcon } from './Icons';
import AnimatedAvatar from './AnimatedAvatar';
import FadeInView from './FadeInView';

interface StoreHeaderProps {
  name: string;
  rating: number;
  productCount: number;
  avatarUri?: string;
  isFollowing: boolean;
  onFollow: () => void;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({
  name,
  rating,
  productCount,
  avatarUri,
  isFollowing,
  onFollow,
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          size={14}
          color="#FFD700"
          filled={i < fullStars}
        />
      );
    }
    return stars;
  };

  return (
    <FadeInView duration={600}>
      <View style={styles.container}>
        <AnimatedAvatar
          uri={avatarUri}
          size={56}
          borderColor="#FF5722"
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.ratingRow}>
            {renderStars()}
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.productCount}>
            {productCount} {productCount === 1 ? 'product' : 'products'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.followBtn, isFollowing && styles.followingBtn]}
          onPress={onFollow}
          activeOpacity={0.7}
        >
          <Text style={[styles.followText, isFollowing && styles.followingText]}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23232B',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 12,
    borderRadius: 16,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#FFD700',
    marginLeft: 4,
    fontWeight: '600',
  },
  productCount: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 2,
  },
  followBtn: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followingBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF5722',
  },
  followText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  followingText: {
    color: '#FF5722',
  },
});

export default StoreHeader;
