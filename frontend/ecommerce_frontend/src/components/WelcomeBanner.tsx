import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface WelcomeBannerProps {
  userName?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ userName = 'Shopper' }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-30)).current;
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.timing(shimmer, { toValue: 1, duration: 2000, easing: Easing.linear, useNativeDriver: true })
    ).start();
  }, [fadeAnim, slideAnim, shimmer]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const bgTranslateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.bgShimmer}>
        <Animated.View style={[styles.shimmerBar, { transform: [{ translateX: bgTranslateX }] }]} />
      </View>
      <View style={styles.content}>
        <Text style={styles.greeting}>{getGreeting()},</Text>
        <Text style={styles.name}>{userName}!</Text>
        <Text style={styles.subtitle}>Ready to find some amazing deals?</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#FF572215', borderRadius: 20, marginHorizontal: 16, marginVertical: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#FF572220' },
  bgShimmer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  shimmerBar: { width: 100, height: '100%', backgroundColor: '#FF572208', transform: [{ skewX: '-20deg' }] },
  content: { padding: 20 },
  greeting: { fontSize: 16, color: '#A0A0A0', marginBottom: 2 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#FF5722', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#A0A0A0' },
});

export default WelcomeBanner;
