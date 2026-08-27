import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: object;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width = '100%', height = 20, borderRadius = 8, style }) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmer]);

  const opacity = shimmer.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.15, 0.3, 0.15],
  });

  return <Animated.View style={[styles.skeleton, { width, height, borderRadius, opacity }, style]} />;
};

const SkeletonProductCard: React.FC = () => (
  <View style={styles.card}>
    <SkeletonLoader height={140} borderRadius={12} />
    <View style={styles.cardBody}>
      <SkeletonLoader width="60%" height={12} />
      <SkeletonLoader width="80%" height={14} style={{ marginTop: 8 }} />
      <SkeletonLoader width="40%" height={16} style={{ marginTop: 8 }} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#2D2D38',
  },
  card: {
    width: '48%',
    backgroundColor: '#18181F',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2D2D3830',
    padding: 10,
    marginBottom: 12,
  },
  cardBody: {
    marginTop: 10,
  },
});

export { SkeletonLoader as default, SkeletonProductCard };
