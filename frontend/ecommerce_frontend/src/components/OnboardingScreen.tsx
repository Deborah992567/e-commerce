import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated as RNAnimated } from 'react-native';

const { width, height } = Dimensions.get('window');

interface OnboardingStep {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
}

const STEPS: OnboardingStep[] = [
  { id: 1, emoji: '🛍️', title: 'Welcome to Dez Collection', subtitle: 'Discover amazing deals on thousands of products at unbeatable prices', color: '#FF5722' },
  { id: 2, emoji: '🔥', title: 'Flash Deals Every Day', subtitle: 'Grab limited-time offers before they disappear. New deals drop every hour!', color: '#FF6B9D' },
  { id: 3, emoji: '🎮', title: 'Play & Earn Rewards', subtitle: 'Spin the wheel, complete challenges, and earn coins to unlock exclusive discounts', color: '#7C4DFF' },
  { id: 4, emoji: '🚚', title: 'Fast Free Shipping', subtitle: 'Free delivery on qualifying orders. Track your package every step of the way', color: '#4ECDC4' },
  { id: 5, emoji: '💳', title: 'Secure Checkout', subtitle: 'Pay with confidence using our encrypted payment system. Shop worry-free!', color: '#FFD700' },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingStepCard: React.FC<{ step: OnboardingStep; index: number; scrollX: RNAnimated.Value }> = ({ step, index, scrollX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const scale = scrollX.interpolate({ inputRange, outputRange: [0.7, 1, 0.7], extrapolate: 'clamp' });
  const opacity = scrollX.interpolate({ inputRange, outputRange: [0, 1, 0], extrapolate: 'clamp' });
  const emojiScale = scrollX.interpolate({ inputRange, outputRange: [0.3, 1, 0.3], extrapolate: 'clamp' });
  const emojiRotate = scrollX.interpolate({ inputRange, outputRange: ['-15deg', '0deg', '15deg'], extrapolate: 'clamp' });
  const titleTranslateY = scrollX.interpolate({ inputRange, outputRange: [40, 0, 40], extrapolate: 'clamp' });
  const subtitleOpacity = scrollX.interpolate({ inputRange, outputRange: [0, 1, 0], extrapolate: 'clamp' });

  return (
    <View style={[styles.stepContainer, { width }]}>
      <RNAnimated.View style={[styles.emojiContainer, { transform: [{ scale: emojiScale }, { rotate: emojiRotate }] }]}>
        <Text style={styles.emoji}>{step.emoji}</Text>
        <View style={[styles.emojiGlow, { backgroundColor: step.color + '20', shadowColor: step.color }]} />
      </RNAnimated.View>
      <RNAnimated.View style={[styles.textContainer, { opacity, transform: [{ scale }, { translateY: titleTranslateY }] }]}>
        <Text style={[styles.title, { color: step.color }]}>{step.title}</Text>
      </RNAnimated.View>
      <RNAnimated.View style={[styles.textContainer, { opacity: subtitleOpacity }]}>
        <Text style={styles.subtitle}>{step.subtitle}</Text>
      </RNAnimated.View>
      <View style={styles.bulletRow}>
        {STEPS.map((_, i) => {
          const bulletScale = scrollX.interpolate({ inputRange: [(i - 1) * width, i * width, (i + 1) * width], outputRange: [1, 1.4, 1], extrapolate: 'clamp' });
          const bulletOpacity = scrollX.interpolate({ inputRange: [(i - 1) * width, i * width, (i + 1) * width], outputRange: [0.3, 1, 0.3], extrapolate: 'clamp' });
          return (
            <RNAnimated.View
              key={i}
              style={[
                styles.bullet,
                { backgroundColor: step.color, opacity: bulletOpacity, transform: [{ scale: bulletScale }] },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const scrollX = useRef(new RNAnimated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new RNAnimated.Value(1)).current;
  const flatListRef = useRef<any>(null);

  const handleNext = () => {
    if (currentIndex < STEPS.length - 1) {
      flatListRef.current?.scrollToOffset({ offset: (currentIndex + 1) * width, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else {
      RNAnimated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => onComplete());
    }
  };

  const handleSkip = () => {
    RNAnimated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => onComplete());
  };

  const currentStep = STEPS[currentIndex];

  return (
    <RNAnimated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <RNAnimated.FlatList
        ref={flatListRef}
        data={STEPS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={RNAnimated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => <OnboardingStepCard step={item} index={index} scrollX={scrollX} />}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: currentStep.color }]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === STEPS.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </RNAnimated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12' },
  skipContainer: { position: 'absolute', top: 60, right: 24, zIndex: 10 },
  skipText: { color: '#A0A0A0', fontSize: 16, fontWeight: '600' },
  stepContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emojiContainer: { width: 180, height: 180, borderRadius: 90, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  emoji: { fontSize: 80 },
  emojiGlow: { position: 'absolute', width: 180, height: 180, borderRadius: 90, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 40, elevation: 20 },
  textContainer: { marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', lineHeight: 36 },
  subtitle: { fontSize: 16, color: '#A0A0A0', textAlign: 'center', lineHeight: 24 },
  bulletRow: { flexDirection: 'row', gap: 8, marginTop: 30 },
  bullet: { width: 8, height: 8, borderRadius: 4 },
  bottomContainer: { paddingHorizontal: 40, paddingBottom: 60 },
  nextButton: { borderRadius: 16, paddingVertical: 18, alignItems: 'center' },
  nextButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default OnboardingScreen;
