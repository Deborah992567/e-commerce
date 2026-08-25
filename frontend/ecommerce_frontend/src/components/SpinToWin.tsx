import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import { ClockIcon, CoinsIcon } from './Icons';

interface SpinPrize {
  id: string;
  label: string;
  discount: number | string;
  color: string;
}

const SPIN_PRIZES: SpinPrize[] = [
  { id: 'spin-1', label: '10% OFF', discount: '10%', color: '#FF5722' },
  { id: 'spin-2', label: 'Free Ship', discount: 'FREE', color: '#FFD700' },
  { id: 'spin-3', label: '20% OFF', discount: '20%', color: '#FF2D55' },
  { id: 'spin-4', label: '₦500', discount: '₦500', color: '#4ECDC4' },
  { id: 'spin-5', label: '50% OFF', discount: '50%', color: '#A78BFA' },
  { id: 'spin-6', label: '₦1000', discount: '₦1000', color: '#34D399' },
];

interface SpinToWinProps {
  onPrizeWon?: (prize: SpinPrize) => void;
}

const SpinToWin: React.FC<SpinToWinProps> = ({ onPrizeWon }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(2);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [selectedPrizeIndex, setSelectedPrizeIndex] = useState(0);
  const glowAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (!isSpinning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 0.5, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    }
  }, [isSpinning, glowAnim]);

  const handleSpin = () => {
    if (spinCount <= 0) {
      Alert.alert('No Spins Left', 'Come back tomorrow for free spins!');
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    const randomPrizeIndex = Math.floor(Math.random() * SPIN_PRIZES.length);
    const rotations = 5 + randomPrizeIndex / SPIN_PRIZES.length;

    Animated.timing(rotateAnim, {
      toValue: rotations * 360,
      duration: 3000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setSelectedPrizeIndex(randomPrizeIndex);
      const wonPrize = SPIN_PRIZES[randomPrizeIndex];
      Alert.alert(
        'You Won!',
        `${wonPrize.label}\nCongratulations! You've unlocked ${wonPrize.discount}`,
        [{
          text: 'Awesome!',
          onPress: () => {
            setSpinCount(spinCount - 1);
            setIsSpinning(false);
            onPrizeWon?.(wonPrize);
          },
        }]
      );
    });
  };

  const spinRotation = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.spinContainer}>
      <View style={styles.spinHeader}>
        <View style={styles.spinTitleRow}>
          <CoinsIcon size={22} color="#FFD700" />
          <Text style={styles.spinTitle}>Spin to Win</Text>
        </View>
        <View style={styles.spinCountBadge}>
          <Text style={styles.spinCountText}>{spinCount} Spins</Text>
        </View>
      </View>

      <Text style={styles.spinSubtitle}>
        {spinCount > 0 ? 'Spin the wheel for amazing prizes!' : 'No spins available. Come back tomorrow!'}
      </Text>

      <View style={styles.wheelContainer}>
        <View style={styles.wheelBackground}>
          <View style={styles.spinnerPointer} />
          <Animated.View style={[styles.wheel, { transform: [{ rotateZ: spinRotation }] }]}>
            {SPIN_PRIZES.map((prize, index) => {
              const angle = (index / SPIN_PRIZES.length) * 360;
              return (
                <View key={prize.id} style={[styles.wheelSegment, { backgroundColor: prize.color, transform: [{ rotateZ: `${angle}deg` }] }]}>
                  <Text style={styles.wheelLabel}>{prize.label}</Text>
                  <Text style={styles.wheelDiscount}>{prize.discount}</Text>
                </View>
              );
            })}
          </Animated.View>
          <View style={styles.wheelCenter}>
            <Text style={styles.wheelCenterText}>SPIN</Text>
          </View>
        </View>
      </View>

      <Animated.View style={{ opacity: glowAnim }}>
        <TouchableOpacity
          style={[styles.spinButton, (isSpinning || spinCount <= 0) && styles.spinButtonDisabled]}
          onPress={handleSpin}
          disabled={isSpinning || spinCount <= 0}
        >
          <Text style={styles.spinButtonText}>
            {isSpinning ? 'Spinning...' : 'Tap to Spin'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.spinFooter}>
        <ClockIcon size={12} color="#808080" />
        <Text style={styles.spinFooterText}>Free spin resets daily at midnight</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spinContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#0D0D12',
  },
  spinHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spinTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  spinTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  spinCountBadge: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  spinCountText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  spinSubtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 20,
  },
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  wheelBackground: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#23232B',
    borderWidth: 3,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  spinnerPointer: {
    position: 'absolute',
    top: -15,
    zIndex: 10,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF5722',
  },
  wheel: {
    width: 260,
    height: 260,
    borderRadius: 130,
    overflow: 'hidden',
  },
  wheelSegment: {
    position: 'absolute',
    width: 260,
    height: 130,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
    transformOrigin: '130px 130px',
  },
  wheelLabel: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  wheelDiscount: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 2,
  },
  wheelCenter: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  wheelCenterText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  spinButton: {
    backgroundColor: '#FF5722',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  spinButtonDisabled: {
    backgroundColor: '#808080',
    opacity: 0.6,
  },
  spinButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  spinFooter: {
    marginTop: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  spinFooterText: {
    color: '#808080',
    fontSize: 12,
  },
});

export default SpinToWin;
