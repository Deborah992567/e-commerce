import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
} from 'react-native';
import AnimatedCard from './AnimatedCard';
import CTAButton from './CTAButton';

interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

interface FeaturedBannerProps {
  product: FeaturedProduct;
  onPress?: () => void;
  style?: object;
}

const FeaturedBanner: React.FC<FeaturedBannerProps> = ({
  product,
  onPress,
  style,
}) => {
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [overlayOpacity]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text
          key={i}
          style={[styles.star, i < fullStars ? styles.starFilled : styles.starEmpty]}
        >
          ★
        </Text>
      );
    }
    return stars;
  };

  return (
    <AnimatedCard delay={100} style={style}>
      <ImageBackground
        source={{ uri: product.image }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <Animated.View
          style={[styles.overlay, { opacity: overlayOpacity }]}
        />
        <View style={styles.bottomGradient} />

        <View style={styles.content}>
          <Text style={styles.label}>FEATURED</Text>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>

          <View style={styles.ratingRow}>
            <View style={styles.starsContainer}>{renderStars(product.rating)}</View>
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          </View>

          <Text style={styles.price}>₦{product.price.toLocaleString()}</Text>

          <CTAButton
            title="Shop Now"
            onPress={onPress}
            variant="primary"
            size="lg"
            icon="→"
          />
        </View>
      </ImageBackground>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 280,
    justifyContent: 'flex-end',
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bottomGradient: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    height: '55%',
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    padding: 20,
    paddingBottom: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FF5722',
    letterSpacing: 2,
    marginBottom: 6,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 16,
    marginRight: 2,
  },
  starFilled: {
    color: '#FFC107',
  },
  starEmpty: {
    color: 'rgba(255,255,255,0.3)',
  },
  ratingText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  price: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FF5722',
    marginBottom: 16,
  },
});

export default FeaturedBanner;
