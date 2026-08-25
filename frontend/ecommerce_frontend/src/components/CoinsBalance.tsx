import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CoinsIcon } from './Icons';

interface CoinsBalanceProps {
  coins: number;
}

const CoinsBalance: React.FC<CoinsBalanceProps> = ({ coins }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const rotation = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <CoinsIcon size={32} color="#FFD700" />
        </Animated.View>
      </View>
      <Text style={styles.label}>Coins Balance</Text>
      <Text style={styles.amount}>{coins.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD70030',
  },
  iconWrap: {
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: '#A0A0A0',
    marginBottom: 6,
    fontWeight: '500',
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 1,
  },
});

export default CoinsBalance;
