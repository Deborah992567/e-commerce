import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SpinToWin from './SpinToWin';
import GamificationPanel from './GamificationPanel';
import FlashDealsPanel from './FlashDealsPanel';
import ClearancePanel from './ClearancePanel';
import { FireIcon, TrophyIcon, ClockIcon, TagIcon } from './Icons';

const DealsScreen = () => (
  <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <FireIcon size={28} color="#FF5722" />
        <Text style={styles.title}>DEALS & REWARDS</Text>
        <FireIcon size={28} color="#FF5722" />
      </View>
      <Text style={styles.subtitle}>Spin, streaks, badges & refer to earn all in one place</Text>
    </View>

    <View style={styles.section}>
      <FlashDealsPanel onFlashDealPress={(id) => console.log('Flash deal:', id)} />
    </View>

    <View style={styles.section}>
      <ClearancePanel onClearancePress={(id) => console.log('Clearance:', id)} />
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
    marginBottom: 20,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  title: {
    color: '#FF5722',
    fontSize: 24,
    fontWeight: 'bold',
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
