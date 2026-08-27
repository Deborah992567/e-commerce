import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import AnimatedReanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onComplete: () => void;
}

const PARTICLE_COLORS = [
  '#FF5722',
  '#FFC107',
  '#E91E63',
  '#9C27B0',
  '#00BCD4',
  '#4CAF50',
  '#FF6B6B',
  '#6C5CE7',
  '#00D2D3',
  '#FECA57',
];

const PARTICLE_COUNT = 18;

interface Particle {
  color: string;
  angle: number;
  distance: number;
  size: number;
  delay: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    angle: (360 / PARTICLE_COUNT) * i + Math.random() * 20 - 10,
    distance: 60 + Math.random() * 80,
    size: 6 + Math.random() * 8,
    delay: Math.random() * 200,
  }));
}

const particles = generateParticles();

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [tagline, setTagline] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const bagY = useSharedValue(-200);
  const bagRotation = useSharedValue(0);
  const titleScale = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  const particlesAnim = useRef(
    particles.map(() => new Animated.Value(0)),
  ).current;

  const particleOpacities = useRef(
    particles.map(() => new Animated.Value(0)),
  ).current;

  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    bagY.value = withSpring(0, {
      damping: 8,
      stiffness: 80,
      mass: 1.2,
    });

    bagRotation.value = withDelay(
      200,
      withSpring(0, { damping: 10, stiffness: 100 }),
    );

    const titleDelay = 500;
    titleScale.value = withDelay(
      titleDelay,
      withSpring(1, { damping: 8, stiffness: 60 }),
    );
    titleOpacity.value = withDelay(
      titleDelay,
      withTiming(1, { duration: 400 }),
    );

    const fullText = 'Shop Smart. Save Big.';
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setTagline(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    particlesAnim.forEach((anim, i) => {
      Animated.sequence([
        Animated.delay(particles[i].delay + 600),
        Animated.parallel([
          Animated.timing(anim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(particleOpacities[i], {
            toValue: 0,
            duration: 800,
            delay: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });

    const showBtnTimeout = setTimeout(() => {
      setShowButton(true);
      Animated.sequence([
        Animated.spring(buttonScale, {
          toValue: 1,
          damping: 8,
          stiffness: 80,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.06,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ),
      ]).start();

      buttonOpacity.setValue(1);
    }, 2500);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(showBtnTimeout);
    };
  }, []);

  const handleGetStarted = () => {
    if (dismissed) return;
    setDismissed(true);
    containerOpacity.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(onComplete)();
    });
  };

  const bagAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bagY.value },
      { rotate: `${bagRotation.value}deg` },
    ],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
    opacity: titleOpacity.value,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  return (
    <AnimatedReanimated.View style={[styles.container, containerAnimatedStyle]}>
      <View style={styles.backgroundDots}>
        {Array.from({ length: 12 }).map((_, i) => (
          <View
            key={`bgDot-${i}`}
            style={[
              styles.bgDot,
              {
                left: `${8 + (i % 4) * 28}%`,
                top: `${10 + Math.floor(i / 4) * 30}%`,
                width: 4 + (i % 3) * 2,
                height: 4 + (i % 3) * 2,
                opacity: 0.08,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.content}>
        <AnimatedReanimated.View style={[styles.bagContainer, bagAnimatedStyle]}>
          <View style={styles.bag}>
            <View style={styles.bagBody} />
            <View style={styles.bagHandle} />
            <View style={styles.bagFace}>
              <View style={styles.eyeLeft} />
              <View style={styles.eyeRight} />
              <View style={styles.mouth} />
            </View>
          </View>
        </AnimatedReanimated.View>

        <View style={styles.particlesContainer}>
          {particles.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const targetX = Math.cos(rad) * p.distance;
            const targetY = Math.sin(rad) * p.distance;

            return (
              <Animated.View
                key={`particle-${i}`}
                style={[
                  styles.particle,
                  {
                    width: p.size,
                    height: p.size,
                    borderRadius: p.size / 2,
                    backgroundColor: p.color,
                    opacity: particleOpacities[i],
                    transform: [
                      {
                        translateX: particlesAnim[i].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, targetX],
                        }),
                      },
                      {
                        translateY: particlesAnim[i].interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, targetY],
                        }),
                      },
                      {
                        scale: particlesAnim[i].interpolate({
                          inputRange: [0, 0.3, 1],
                          outputRange: [0.3, 1.2, 0.5],
                        }),
                      },
                    ],
                  },
                ]}
              />
            );
          })}
        </View>

        <AnimatedReanimated.Text style={[styles.title, titleAnimatedStyle]}>
          Dez Collection
        </AnimatedReanimated.Text>

        <Text style={styles.tagline}>
          {tagline}
          {tagline.length < 'Shop Smart. Save Big.'.length && (
            <Text style={styles.cursor}>|</Text>
          )}
        </Text>

        {showButton && (
          <Animated.View
            style={[
              styles.buttonWrapper,
              {
                opacity: buttonOpacity,
                transform: [{ scale: Animated.multiply(buttonScale, pulseAnim) }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </AnimatedReanimated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D12',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundDots: {
    ...StyleSheet.absoluteFillObject,
  },
  bgDot: {
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: '#FF5722',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  bagContainer: {
    marginBottom: 20,
  },
  bag: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagBody: {
    width: 60,
    height: 55,
    backgroundColor: '#FF5722',
    borderRadius: 12,
    position: 'absolute',
    bottom: 0,
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  bagHandle: {
    width: 32,
    height: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopColor: '#FF5722',
    borderLeftColor: '#FF5722',
    borderRightColor: '#FF5722',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'absolute',
    top: 2,
  },
  bagFace: {
    position: 'absolute',
    bottom: 14,
    width: 40,
    height: 24,
    alignItems: 'center',
  },
  eyeLeft: {
    width: 6,
    height: 6,
    backgroundColor: '#FFF',
    borderRadius: 3,
    position: 'absolute',
    top: 0,
    left: 8,
  },
  eyeRight: {
    width: 6,
    height: 6,
    backgroundColor: '#FFF',
    borderRadius: 3,
    position: 'absolute',
    top: 0,
    right: 8,
  },
  mouth: {
    width: 14,
    height: 7,
    borderBottomWidth: 2.5,
    borderBottomColor: '#FFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    bottom: 0,
  },
  particlesContainer: {
    position: 'absolute',
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#A0A0B0',
    letterSpacing: 2,
    marginBottom: 60,
    textAlign: 'center',
    height: 24,
  },
  cursor: {
    color: '#FF5722',
    fontWeight: '300',
  },
  buttonWrapper: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default SplashScreen;
