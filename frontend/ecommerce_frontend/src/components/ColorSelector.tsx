import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string | null;
  onSelect: (color: string) => void;
}

interface ColorOptionProps {
  color: string;
  isSelected: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ACTIVE_BORDER = '#FF5722';

const ColorOption: React.FC<ColorOptionProps> = ({ color, isSelected, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.88, { damping: 10, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  return (
    <AnimatedPressable
      style={[
        styles.option,
        { backgroundColor: color },
        isSelected && styles.optionActive,
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    />
  );
};

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onSelect }) => {
  return (
    <View style={styles.container}>
      {colors.map((color) => (
        <ColorOption
          key={color}
          color={color}
          isSelected={selectedColor === color}
          onPress={() => onSelect(color)}
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
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#2D2D38',
  },
  optionActive: {
    borderColor: ACTIVE_BORDER,
    borderWidth: 3,
  },
});

export default ColorSelector;
