import React, { useState } from 'react';
import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FlipCard: React.FC<FlipCardProps> = ({ front, back, style }) => {
  const [showBack, setShowBack] = useState(false);
  const rotation = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [0, 180], Extrapolation.CLAMP);
    const opacity = interpolate(rotation.value, [0, 90, 180], [1, 0, 0], Extrapolation.CLAMP);

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      opacity,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [180, 360], Extrapolation.CLAMP);
    const opacity = interpolate(rotation.value, [0, 90, 180], [0, 1, 1], Extrapolation.CLAMP);

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      opacity,
    };
  });

  const handlePress = () => {
    const newRotation = showBack ? 0 : 180;
    rotation.value = withSpring(newRotation, {
      damping: 15,
      stiffness: 150,
      mass: 1,
    });
    setShowBack(!showBack);
  };

  return (
    <AnimatedPressable onPress={handlePress} style={[styles.container, style]}>
      <Animated.View style={[styles.card, frontAnimatedStyle]}>
        {front}
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        {back}
      </Animated.View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 250,
  },
  card: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#23232B',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardBack: {
    backfaceVisibility: 'hidden',
  },
});

export default FlipCard;
