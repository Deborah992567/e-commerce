import React, { ReactNode } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  icon?: ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CategoryChip: React.FC<CategoryChipProps> = ({ label, isActive, onPress, icon }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 10, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 400 });
  };

  return (
    <AnimatedPressable
      style={[
        styles.chip,
        isActive ? styles.chipActive : styles.chipInactive,
        animatedStyle,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {icon ? <Animated.View style={styles.iconWrap}>{icon}</Animated.View> : null}
      <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  chipInactive: {
    backgroundColor: '#23232B',
    borderColor: '#2D2D38',
  },
  chipActive: {
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9E9E9E',
  },
  labelActive: {
    color: '#FFFFFF',
  },
  iconWrap: {
    marginRight: 6,
  },
});

export default CategoryChip;
