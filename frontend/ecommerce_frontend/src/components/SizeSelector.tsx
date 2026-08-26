import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
  disabledSizes?: string[];
}

interface SizeOptionProps {
  size: string;
  isSelected: boolean;
  isDisabled: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SizeOption: React.FC<SizeOptionProps> = ({ size, isSelected, isDisabled, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!isDisabled) {
      scale.value = withSpring(0.88, { damping: 10, stiffness: 400 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  return (
    <AnimatedPressable
      style={[
        styles.option,
        isSelected && styles.optionActive,
        isDisabled && styles.optionDisabled,
        animatedStyle,
      ]}
      onPress={isDisabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text
        style={[
          styles.label,
          isSelected && styles.labelActive,
          isDisabled && styles.labelDisabled,
        ]}
      >
        {size}
      </Text>
    </AnimatedPressable>
  );
};

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelect,
  disabledSizes = [],
}) => {
  return (
    <View style={styles.container}>
      {sizes.map((size) => (
        <SizeOption
          key={size}
          size={size}
          isSelected={selectedSize === size}
          isDisabled={disabledSizes.includes(size)}
          onPress={() => onSelect(size)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#23232B',
    borderWidth: 1,
    borderColor: '#2D2D38',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionActive: {
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
  },
  optionDisabled: {
    opacity: 0.35,
  },
  label: {
    color: '#9E9E9E',
    fontSize: 14,
    fontWeight: '600',
  },
  labelActive: {
    color: '#FFFFFF',
  },
  labelDisabled: {
    textDecorationLine: 'line-through',
  },
});

export default SizeSelector;
