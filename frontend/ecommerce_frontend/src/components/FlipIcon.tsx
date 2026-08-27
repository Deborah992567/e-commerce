import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface FlipIconProps {
  icon: string;
  size?: number;
  color?: string;
  flipDuration?: number;
}

const FlipIcon: React.FC<FlipIconProps> = ({ icon, size = 32, color = '#FF5722', flipDuration = 2000 }) => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: flipDuration, easing: Easing.inOut(Easing.ease) }),
      -1,
    );
  }, [rotation, flipDuration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={{ fontSize: size, color }}>{icon}</Text>
    </Animated.View>
  );
};

export default FlipIcon;
