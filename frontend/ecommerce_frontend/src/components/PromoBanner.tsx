import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { TagIcon, FireIcon, TruckIcon } from './Icons';

let LinearGradient: React.ComponentType<{ colors: string[]; start?: {x:number;y:number}; end?: {x:number;y:number}; style?: any; children?: React.ReactNode }> | null = null;
try {
  LinearGradient = require('react-native-linear-gradient').default;
} catch {
  LinearGradient = null;
}

const COLORS = ['#FF5722', '#FF9800'];

interface PromoBannerProps {
  title?: string;
  description?: string;
  onPressCTA?: () => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title = 'Mega Sale',
  description = 'Up to 50% off on all items. Limited time only!',
  onPressCTA,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  const Content: React.FC = () => (
    <>
      <View style={styles.iconRow}>
        <TagIcon size={20} color="#222" />
        <FireIcon size={20} color="#222" />
        <TruckIcon size={20} color="#222" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.ctaButton} onPress={onPressCTA} activeOpacity={0.8}>
        <Text style={styles.ctaText}>Shop Now</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      {LinearGradient ? (
        <LinearGradient
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Content />
          <Animated.View
            style={[styles.shimmer, { transform: [{ translateX }] }]}
            pointerEvents="none"
          />
        </LinearGradient>
      ) : (
        <View style={[styles.gradient, { backgroundColor: COLORS[0] }]}>
          <Content />
          <Animated.View
            style={[styles.shimmer, { transform: [{ translateX }] }]}
            pointerEvents="none"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 20,
    borderRadius: 16,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#222',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    lineHeight: 20,
  },
  ctaButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: 'rgba(255,255,255,0.25)',
    transform: [{ skewX: '-20deg' }],
  },
});

export default PromoBanner;
