import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, View, Easing } from 'react-native';
import { UserIcon } from './Icons';

interface AnimatedAvatarProps {
  uri?: string;
  size?: number;
  borderColor?: string;
  showOnline?: boolean;
  onlineColor?: string;
}

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({ uri, size = 48, borderColor = '#FF5722', showOnline = false, onlineColor = '#4ECDC4' }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }).start();

    if (showOnline) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(ringAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(ringAnim, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    }
  }, [scaleAnim, ringAnim, showOnline]);

  const ringScale = ringAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] });
  const ringOpacity = ringAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] });

  return (
    <Animated.View style={[styles.container, { width: size + 8, height: size + 8, transform: [{ scale: scaleAnim }] }]}>
      {showOnline && (
        <Animated.View style={[styles.ring, { width: size + 8, height: size + 8, borderRadius: (size + 8) / 2, borderColor: onlineColor, transform: [{ scale: ringScale }], opacity: ringOpacity }]} />
      )}
      <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, borderColor }]}>
        {uri ? (
          <Animated.Image source={{ uri }} style={[styles.img, { width: size, height: size, borderRadius: size / 2 }]} />
        ) : (
          <UserIcon size={size * 0.45} color="#A0A0A0" />
        )}
      </View>
      {showOnline && <View style={[styles.onlineDot, { backgroundColor: onlineColor, right: 2, bottom: 2 }]} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 2,
  },
  avatar: {
    backgroundColor: '#23232B',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {},
  onlineDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#18181F',
  },
});

export default AnimatedAvatar;
