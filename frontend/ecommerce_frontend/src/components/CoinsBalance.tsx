import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CoinsBalanceProps {
  coins: number;
}

const CoinsBalance: React.FC<CoinsBalanceProps> = ({ coins }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🪙</Text>
      <Text style={styles.label}>Coins Balance</Text>
      <Text style={styles.amount}>{coins.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8C97A40',
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 4,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E8C97A',
  },
});

export default CoinsBalance;