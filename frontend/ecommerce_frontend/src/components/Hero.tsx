import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// ── Orbiting ring decoration ───────────────────────────────────────────────
const OrbitRing: React.FC<{ size: number; color: string; duration: number; delay: number }> = ({
  size, color, duration, delay,
}) => {
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 800, delay, useNativeDriver: true }).start();
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1,
        borderColor: color,
        borderStyle: 'dashed',
        opacity,
        transform: [{ rotate: spin }],
      }}
    />
  );
};

// ── Scanning line ──────────────────────────────────────────────────────────
const ScanLine: React.FC = () => {
  const translateY = useRef(new Animated.Value(-60)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.6, duration: 300, useNativeDriver: true }),
        Animated.timing(translateY, {
          toValue: 60,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.delay(1200),
        Animated.timing(translateY, { toValue: -60, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.scanLine, { opacity, transform: [{ translateY }] }]}
    />
  );
};

// ── Typewriter subtitle ────────────────────────────────────────────────────
const SUBTITLE = 'Shop the latest trends and deals.';

const TypewriterText: React.FC<{ delay: number }> = ({ delay }) => {
  const [displayed, setDisplayed] = React.useState('');
  const [started, setStarted] = React.useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= SUBTITLE.length) return;
    const t = setTimeout(() => {
      setDisplayed(SUBTITLE.slice(0, displayed.length + 1));
    }, 38);
    return () => clearTimeout(t);
  }, [started, displayed]);

  return (
    <Text style={styles.subtitle}>
      {displayed}
      {displayed.length < SUBTITLE.length && (
        <Text style={styles.cursor}>|</Text>
      )}
    </Text>
  );
};

// ── Main Hero ──────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const containerOpacity = useRef(new Animated.Value(0)).current;
  const eyebrowY = useRef(new Animated.Value(-16)).current;
  const eyebrowOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(30)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const underlineScale = useRef(new Animated.Value(0)).current;
  const tagOpacity = useRef(new Animated.Value(0)).current;
  const orbitScale = useRef(new Animated.Value(0.4)).current;
  const orbitOpacity = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Background + orbits
      Animated.parallel([
        Animated.timing(containerOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(orbitScale, { toValue: 1, useNativeDriver: true, speed: 3, bounciness: 8 }),
        Animated.timing(orbitOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
      // Eyebrow
      Animated.parallel([
        Animated.timing(eyebrowY, { toValue: 0, duration: 400, easing: Easing.out(Easing.back(2)), useNativeDriver: true }),
        Animated.timing(eyebrowOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      // Title
      Animated.parallel([
        Animated.timing(titleY, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1.4)), useNativeDriver: true }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      // Underline sweep
      Animated.timing(underlineScale, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Tag
      Animated.timing(tagOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    // Shimmer on name
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 2200, delay: 2000, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const shimmerX = shimmer.interpolate({ inputRange: [0, 1], outputRange: [-180, 240] });

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>

      {/* Background mesh circles */}
      <View style={styles.meshCenter} pointerEvents="none">
        <Animated.View style={{ transform: [{ scale: orbitScale }], opacity: orbitOpacity }}>
          <OrbitRing size={220} color="#E8C97A18" duration={18000} delay={0} />
          <OrbitRing size={160} color="#C4A4F030" duration={12000} delay={600} />
          <OrbitRing size={100} color="#7AC8E828" duration={8000} delay={1200} />
        </Animated.View>
        {/* Central glow */}
        <View style={styles.centralGlow} />
        <ScanLine />
      </View>

      {/* Content */}
      <View style={styles.content}>

        {/* Eyebrow */}
        <Animated.View style={[styles.eyebrowRow, { opacity: eyebrowOpacity, transform: [{ translateY: eyebrowY }] }]}>
          <View style={styles.eyebrowDot} />
          <Text style={styles.eyebrow}>DEBBIE'S E-COMMERCE</Text>
          <View style={styles.eyebrowDot} />
        </Animated.View>

        {/* Title block */}
        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleY }], overflow: 'hidden' }}>
          <Text style={styles.titleSmall}>Welcome to</Text>
          <View style={styles.titleNameWrapper}>
            {/* Shimmer overlay */}
            <Animated.View
              pointerEvents="none"
              style={[styles.nameShimmer, { transform: [{ translateX: shimmerX }, { rotate: '15deg' }] }]}
            />
            <Text style={styles.titleName}>Debbie's</Text>
          </View>
        </Animated.View>

        {/* Underline */}
        <Animated.View style={[styles.underline, { transform: [{ scaleX: underlineScale }] }]} />

        {/* Typewriter subtitle */}
        <Animated.View style={{ opacity: tagOpacity, marginTop: 14 }}>
          <TypewriterText delay={1600} />
        </Animated.View>

        {/* Tag pills */}
        <Animated.View style={[styles.tagRow, { opacity: tagOpacity }]}>
          {['Luxury', 'Curated', 'Exclusive'].map((tag, i) => (
            <View key={i} style={[styles.tag, { borderColor: TAG_COLORS[i] + '50' }]}>
              <View style={[styles.tagDot, { backgroundColor: TAG_COLORS[i] }]} />
              <Text style={[styles.tagText, { color: TAG_COLORS[i] }]}>{tag}</Text>
            </View>
          ))}
        </Animated.View>

      </View>
    </Animated.View>
  );
};

const TAG_COLORS = ['#E8C97A', '#C4A4F0', '#7AC8E8'];

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D12',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff08',
    paddingBottom: 32,
    overflow: 'hidden',
    position: 'relative',
  },

  // Mesh / orbit
  meshCenter: {
    position: 'absolute',
    top: -30,
    alignSelf: 'center',
    left: width / 2 - 110,
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8C97A12',
    shadowColor: '#E8C97A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  scanLine: {
    position: 'absolute',
    width: 220,
    height: 1.5,
    backgroundColor: '#E8C97A',
    shadowColor: '#E8C97A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },

  // Content
  content: {
    paddingHorizontal: 24,
    paddingTop: 110,
    alignItems: 'center',
  },

  // Eyebrow
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 4,
    color: '#E8C97A',
    fontWeight: '700',
    fontFamily: 'Courier',
  },
  eyebrowDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#E8C97A60',
  },

  // Title
  titleSmall: {
    fontSize: 15,
    color: '#6B6B7B',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 2,
    fontFamily: 'Courier',
  },
  titleNameWrapper: {
    overflow: 'hidden',
    position: 'relative',
  },
  titleName: {
    fontSize: 54,
    fontWeight: '900',
    color: '#F0EDE6',
    letterSpacing: -2,
    textAlign: 'center',
  },
  nameShimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 50,
    backgroundColor: 'rgba(232,201,122,0.15)',
    zIndex: 10,
  },

  // Underline
  underline: {
    width: 48,
    height: 2,
    backgroundColor: '#E8C97A',
    borderRadius: 1,
    marginTop: 4,
    transformOrigin: 'left',
    alignSelf: 'center',
  },

  // Subtitle typewriter
  subtitle: {
    fontSize: 14,
    color: '#6B6B7B',
    letterSpacing: 0.3,
    textAlign: 'center',
    minHeight: 20,
  },
  cursor: {
    color: '#E8C97A',
    fontWeight: '300',
  },

  // Tags
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#ffffff04',
  },
  tagDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    fontFamily: 'Courier',
  },
});

export default Hero;