import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { TagIcon } from './Icons';

interface PromoStripProps {
  text: string;
  color?: string;
  bgColor?: string;
}

const PromoStrip: React.FC<PromoStripProps> = ({ text, color = '#FF5722', bgColor = '#FF572210' }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(slideAnim, { toValue: 0, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [slideAnim]);

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor, transform: [{ translateX: slideAnim }] }]}>
      <TagIcon size={14} color={color} />
      <Text style={[styles.text, { color }]}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 10, marginHorizontal: 16, borderRadius: 10, marginBottom: 8 },
  text: { fontSize: 13, fontWeight: 'bold' },
});

export default PromoStrip;
