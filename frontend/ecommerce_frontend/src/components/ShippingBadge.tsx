import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { TruckIcon } from './Icons';

interface ShippingBadgeProps {
  isFree: boolean;
  amount?: number;
}

const ShippingBadge: React.FC<ShippingBadgeProps> = ({ isFree, amount = 0 }) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isFree) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isFree, pulseAnim]);

  const label = isFree ? 'Free Shipping' : `Shipping: \u20A6${amount.toLocaleString()}`;
  const bgColor = isFree ? '#4ECDC420' : '#2D2D38';
  const borderColor = isFree ? '#4ECDC4' : '#3A3A4A';
  const textColor = isFree ? '#4ECDC4' : '#A0A0A0';
  const iconColor = isFree ? '#4ECDC4' : '#A0A0A0';

  const content = (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor }]}>
      <TruckIcon size={16} color={iconColor} />
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );

  if (isFree) {
    return (
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        {content}
      </Animated.View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ShippingBadge;
