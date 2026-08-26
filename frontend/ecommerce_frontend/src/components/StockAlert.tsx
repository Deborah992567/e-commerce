import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { FireIcon } from './Icons';

interface StockAlertProps {
  stock: number;
}

const StockAlert: React.FC<StockAlertProps> = ({ stock }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (stock <= 10) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.3, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    }
  }, [stock, pulseAnim]);

  if (stock > 10) return null;

  const urgencyColor = stock <= 3 ? '#FF2D55' : stock <= 5 ? '#FF5722' : '#FF9800';

  return (
    <View style={[styles.container, { borderColor: urgencyColor + '40' }]}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <FireIcon size={16} color={urgencyColor} />
      </Animated.View>
      <Text style={[styles.text, { color: urgencyColor }]}>
        Only {stock} left in stock — selling fast!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#23232B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default StockAlert;
