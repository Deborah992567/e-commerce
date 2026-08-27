import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

interface BounceInListProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
}

const BounceInItem: React.FC<{
  children: ReactNode;
  index: number;
  stagger: number;
  baseDelay: number;
}> = ({ children, index, stagger, baseDelay }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(5);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scaleX: scale.value },
      { scaleY: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const springConfig = { damping: 12, stiffness: 100, mass: 0.8 };
  const itemDelay = baseDelay + index * stagger;

  scale.value = withDelay(itemDelay, withSpring(1, springConfig));
  opacity.value = withDelay(itemDelay, withSpring(1, springConfig));
  rotate.value = withDelay(itemDelay, withSpring(0, springConfig));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

const BounceInList: React.FC<BounceInListProps> = ({
  children,
  stagger = 120,
  delay = 0,
}) => {
  const items = React.Children.toArray(children);

  return (
    <View style={styles.container}>
      {items.map((child, index) => (
        <BounceInItem
          key={index}
          index={index}
          stagger={stagger}
          baseDelay={delay}
        >
          {child}
        </BounceInItem>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});

export default BounceInList;
