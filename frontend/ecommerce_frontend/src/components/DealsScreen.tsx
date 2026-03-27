import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SpinToWin from './SpinToWin';
import GamificationPanel from './GamificationPanel';

const DealsScreen = () => (
  <ScrollView style={styles.root} contentContainerStyle={styles.content}>
    <View style={styles.header}>
      <Text style={styles.title}>⚡ DEALS & REWARDS</Text>
      <Text style={styles.subtitle}>Spin, streaks, badges & refer to earn all in one place</Text>
    </View>

    <View style={styles.section}>
      <SpinToWin onPrizeWon={(prize) => console.log('Deal spin won:', prize)} />
    </View>

    <View style={styles.section}>
      <GamificationPanel onClaimReward={(points) => console.log('Daily reward claimed:', points)} />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    color: '#E8C97A',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
  section: {
    marginBottom: 24,
  },
});

export default DealsScreen;