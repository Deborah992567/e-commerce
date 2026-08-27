import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { TagIcon, FireIcon, GiftIcon } from './Icons';

interface FlashBannerProps {
  text?: string;
  discount?: string;
  timer?: string;
  color?: string;
  onPress?: () => void;
}

const FlashBanner: React.FC<FlashBannerProps> = ({
  text = 'FLASH SALE',
  discount = '70% OFF',
  timer = '02:45:33',
  color = '#FF5722',
  onPress,
}) => {
  const slideAnim = useRef(new Animated.Value(-400)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, { toValue: 0, friction: 7, tension: 40, useNativeDriver: true }).start();
    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.05, duration: 500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ])).start();
    Animated.loop(
      Animated.timing(glowAnim, { toValue: 1, duration: 1000, easing: Easing.inOut(Easing.ease), useNativeDriver: true })
    ).start();
  }, [slideAnim, pulseAnim, glowAnim]);

  const shadowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.6] });

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }, { scale: pulseAnim }], shadowColor: color, shadowOpacity, shadowRadius: 12 }]}>
        <View style={styles.leftSection}>
          <FireIcon size={24} color="#FFD700" />
          <View>
            <Text style={styles.label}>{text}</Text>
            <Text style={[styles.discount, { color }]}>{discount}</Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.timerLabel}>Ends in</Text>
          <Text style={styles.timer}>{timer}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#23232B', borderRadius: 16, padding: 16, marginHorizontal: 16, marginVertical: 8, borderWidth: 1, borderColor: '#FF572240', elevation: 6 },
  leftSection: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  label: { fontSize: 11, color: '#A0A0A0', fontWeight: '600', letterSpacing: 1 },
  discount: { fontSize: 22, fontWeight: 'bold' },
  rightSection: { alignItems: 'flex-end' },
  timerLabel: { fontSize: 10, color: '#A0A0A0', marginBottom: 2 },
  timer: { fontSize: 16, fontWeight: 'bold', color: '#FFD700', fontVariant: ['tabular-nums'] },
});

export default FlashBanner;
