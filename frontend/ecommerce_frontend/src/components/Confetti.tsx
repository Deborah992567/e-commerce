import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, View } from 'react-native';

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

const COLORS = ['#FF5722', '#FFD700', '#4ECDC4', '#FF6B9D', '#7C4DFF', '#00E676', '#FF4081', '#00BCD4'];
const PIECE_COUNT = 35;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const ConfettiPiece: React.FC<{
  screenWidth: number;
  screenHeight: number;
  index: number;
  opacity: Animated.Value;
  active: boolean;
}> = ({ screenWidth, screenHeight, index, opacity, active }) => {
  const fallAnim = useRef(new Animated.Value(-20)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const driftAnim = useRef(new Animated.Value(0)).current;

  const color = COLORS[index % COLORS.length];
  const pieceWidth = randomBetween(8, 16);
  const pieceHeight = randomBetween(4, 8);
  const startX = randomBetween(0, screenWidth - pieceWidth);
  const fallDuration = randomBetween(1500, 3000);
  const driftAmount = randomBetween(-60, 60);
  const delay = randomBetween(0, 800);

  useEffect(() => {
    if (!active) return;

    const fall = Animated.loop(
      Animated.sequence([
        Animated.timing(fallAnim, {
          toValue: screenHeight + 20,
          duration: fallDuration,
          useNativeDriver: false,
        }),
        Animated.timing(fallAnim, {
          toValue: -20,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    );

    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: fallDuration * 0.7,
        useNativeDriver: false,
      })
    );

    const drift = Animated.loop(
      Animated.sequence([
        Animated.timing(driftAnim, {
          toValue: driftAmount,
          duration: fallDuration * 0.5,
          useNativeDriver: false,
        }),
        Animated.timing(driftAnim, {
          toValue: 0,
          duration: fallDuration * 0.5,
          useNativeDriver: false,
        }),
      ])
    );

    Animated.delay(delay).start(() => {
      fall.start();
      rotate.start();
      drift.start();
    });

    return () => {
      fallAnim.setValue(-20);
      rotateAnim.setValue(0);
      driftAnim.setValue(0);
    };
  }, [active, fallAnim, rotateAnim, driftAnim, fallDuration, driftAmount, delay, screenHeight]);

  const rotateValue = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.piece,
        {
          width: pieceWidth,
          height: pieceHeight,
          backgroundColor: color,
          left: startX,
          top: fallAnim,
          opacity,
          transform: [
            { translateX: driftAnim },
            { rotate: rotateValue },
          ],
        },
      ]}
    />
  );
};

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000 }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (active) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [active, duration, opacity]);

  if (!active && opacity.__getValue() === 0) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: PIECE_COUNT }).map((_, i) => (
        <ConfettiPiece
          key={i}
          screenWidth={400}
          screenHeight={800}
          index={i}
          opacity={opacity}
          active={active}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  piece: {
    position: 'absolute',
    borderRadius: 1,
  },
});

export default Confetti;
