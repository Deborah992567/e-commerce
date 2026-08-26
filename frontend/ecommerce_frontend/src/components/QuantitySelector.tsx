import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MinusIcon, PlusIcon } from './Icons';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  min = 1,
  max = 99,
}) => {
  const minusScale = useRef(new Animated.Value(1)).current;
  const plusScale = useRef(new Animated.Value(1)).current;

  const animatePress = (scale: Animated.Value) => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.8, useNativeDriver: true, friction: 4 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 4 }),
    ]).start();
  };

  const handleDecrement = () => {
    if (quantity > min) {
      animatePress(minusScale);
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      animatePress(plusScale);
      onChange(quantity + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: minusScale }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            quantity <= min && styles.buttonDisabled,
          ]}
          onPress={handleDecrement}
          disabled={quantity <= min}
          activeOpacity={0.7}
        >
          <MinusIcon size={18} color={quantity <= min ? '#555' : '#FFF'} />
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.quantity}>{quantity}</Text>

      <Animated.View style={{ transform: [{ scale: plusScale }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            quantity >= max && styles.buttonDisabled,
          ]}
          onPress={handleIncrement}
          disabled={quantity >= max}
          activeOpacity={0.7}
        >
          <PlusIcon size={18} color={quantity >= max ? '#555' : '#FFF'} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23232B',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 6,
    gap: 8,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FF5722',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#2A2A34',
  },
  quantity: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    minWidth: 32,
    textAlign: 'center',
  },
});

export default QuantitySelector;
