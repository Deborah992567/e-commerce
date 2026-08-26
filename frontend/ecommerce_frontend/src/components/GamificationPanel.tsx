import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { FireIcon, CoinsIcon, TrophyIcon, GiftIcon, UsersIcon, CheckIcon } from './Icons';
import AnimatedBadge from './AnimatedBadge';
import CounterAnimation from './CounterAnimation';

interface UserGamification {
  streakDays: number;
  totalCoins: number;
  unlockedBadges: string[];
}

interface DailyReward {
  day: number;
  coins: number;
  claimed: boolean;
}

const DAILY_REWARDS: DailyReward[] = [
  { day: 1, coins: 10, claimed: true },
  { day: 2, coins: 15, claimed: true },
  { day: 3, coins: 20, claimed: true },
  { day: 4, coins: 25, claimed: true },
  { day: 5, coins: 30, claimed: true },
  { day: 6, coins: 40, claimed: false },
  { day: 7, coins: 100, claimed: false },
];

interface GamificationPanelProps {
  onClaimReward?: (coins: number) => void;
}

const GamificationPanel: React.FC<GamificationPanelProps> = ({ onClaimReward }) => {
  const [gamification, setGamification] = useState<UserGamification>({
    streakDays: 5,
    totalCoins: 1850,
    unlockedBadges: ['first-purchase', 'spender-25k', 'reviewer-5'],
  });
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const streakPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(streakPulse, { toValue: 1.05, duration: 1000, useNativeDriver: true }),
        Animated.timing(streakPulse, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, [streakPulse]);

  const handleDayPress = (day: number) => {
    const reward = DAILY_REWARDS.find((r) => r.day === day);
    if (reward && !reward.claimed) {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();

      Alert.alert(
        'Reward Claimed!',
        `You earned ${reward.coins} coins!`,
        [{
          text: 'Great!',
          onPress: () => {
            setGamification({ ...gamification, totalCoins: gamification.totalCoins + reward.coins });
            onClaimReward?.(reward.coins);
          },
        }]
      );
    }
  };

  const BADGES = [
    { id: 'first-purchase', label: 'First Buy', color: '#FF5722', icon: <GiftIcon size={28} color="#FF5722" /> },
    { id: 'spender-25k', label: '25K Club', color: '#FFD700', icon: <CoinsIcon size={28} color="#FFD700" /> },
    { id: 'reviewer-5', label: '5-Star Rev', color: '#4ECDC4', icon: <TrophyIcon size={28} color="#4ECDC4" /> },
  ];

  return (
    <View style={styles.gamificationContainer}>
      <Animated.View style={[styles.streakCard, { transform: [{ scale: streakPulse }] }]}>
        <View style={styles.streakIconWrap}>
          <FireIcon size={36} color="#FFF" />
        </View>
        <View style={styles.streakContent}>
          <Text style={styles.streakLabel}>Daily Streak</Text>
            <Text style={styles.streakValue}><CounterAnimation to={gamification.streakDays} duration={800} suffix=" Days" /></Text>
          <Text style={styles.streakSubtext}>Login tomorrow to continue!</Text>
        </View>
      </Animated.View>

      <View style={styles.pointsCard}>
        <CoinsIcon size={32} color="#FFD700" />
        <Text style={styles.pointsLabel}>Reward Coins</Text>
        <Text style={styles.pointsValue}><CounterAnimation to={gamification.totalCoins} duration={1200} /></Text>
        <Text style={styles.pointsSubtext}>Use coins to unlock deals</Text>
      </View>

      <View style={styles.dailyRewardsSection}>
        <View style={styles.sectionTitleRow}>
          <GiftIcon size={18} color="#4ECDC4" />
          <Text style={styles.sectionTitle}>Daily Login Rewards</Text>
        </View>
        <View style={styles.rewardsGrid}>
          {DAILY_REWARDS.map((reward) => (
            <TouchableOpacity
              key={reward.day}
              style={[
                styles.rewardBox,
                reward.claimed && styles.rewardBoxClaimed,
                !reward.claimed && styles.rewardBoxActive,
              ]}
              onPress={() => handleDayPress(reward.day)}
              disabled={reward.claimed}
            >
              <Text style={styles.rewardDay}>Day {reward.day}</Text>
              <Text style={styles.rewardPoints}>{reward.coins}</Text>
              <CoinsIcon size={14} color={reward.claimed ? '#4ECDC4' : '#FF5722'} />
              {reward.claimed && (
                <View style={styles.claimedCheckmark}>
                  <CheckIcon size={12} color="#FFF" />
                </View>
              )}
              {!reward.claimed && (
                <Text style={styles.claimText}>Tap</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.badgesSection}>
        <View style={styles.sectionTitleRow}>
          <TrophyIcon size={18} color="#FFD700" />
          <Text style={styles.sectionTitle}>Unlocked Badges</Text>
        </View>
        <View style={styles.badgesContainer}>
          {BADGES.map((badge) => (
            <View
              key={badge.id}
              style={[
                styles.badge,
                gamification.unlockedBadges.includes(badge.id)
                  ? [styles.badgeUnlocked, { borderColor: badge.color }]
                  : styles.badgeLocked,
              ]}
            >
              {badge.icon}
              <Text style={styles.badgeLabel}>{badge.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.referralCard}>
        <UsersIcon size={32} color="#FFF" />
        <View style={styles.referralContent}>
          <Text style={styles.referralLabel}>Refer & Earn</Text>
          <Text style={styles.referralSubtext}>Get ₦500 per friend</Text>
        </View>
        <TouchableOpacity style={styles.referralButton}>
          <Text style={styles.referralButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gamificationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  streakCard: {
    backgroundColor: '#FF5722',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  streakIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakContent: {
    flex: 1,
  },
  streakLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
  },
  streakValue: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  streakSubtext: {
    color: '#FFF',
    fontSize: 12,
    opacity: 0.8,
  },
  pointsCard: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD70030',
    gap: 6,
  },
  pointsLabel: {
    color: '#A0A0A0',
    fontSize: 14,
    fontWeight: '500',
  },
  pointsValue: {
    color: '#FFD700',
    fontSize: 36,
    fontWeight: 'bold',
  },
  pointsSubtext: {
    color: '#808080',
    fontSize: 12,
  },
  dailyRewardsSection: {
    width: '100%',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  rewardBox: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#2D2D38',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D3D48',
    gap: 4,
  },
  rewardBoxClaimed: {
    backgroundColor: '#1A1A1F',
    borderColor: '#4ECDC4',
    opacity: 0.6,
  },
  rewardBoxActive: {
    backgroundColor: '#23232B',
    borderColor: '#FF5722',
    borderWidth: 2,
  },
  rewardDay: {
    color: '#A0A0A0',
    fontSize: 11,
    fontWeight: '500',
  },
  rewardPoints: {
    color: '#FF5722',
    fontSize: 18,
    fontWeight: 'bold',
  },
  claimedCheckmark: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  claimText: {
    position: 'absolute',
    bottom: 4,
    fontSize: 10,
    color: '#FF5722',
    fontWeight: '600',
  },
  badgesSection: {
    width: '100%',
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  badge: {
    flex: 1,
    backgroundColor: '#2D2D38',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3D3D48',
    gap: 8,
  },
  badgeUnlocked: {
    backgroundColor: '#23232B',
    borderWidth: 2,
  },
  badgeLocked: {
    opacity: 0.5,
  },
  badgeLabel: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  referralCard: {
    backgroundColor: '#4ECDC4',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  referralContent: {
    flex: 1,
  },
  referralLabel: {
    color: '#0D0D12',
    fontSize: 16,
    fontWeight: 'bold',
  },
  referralSubtext: {
    color: '#0D0D12',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
  },
  referralButton: {
    backgroundColor: '#0D0D12',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  referralButtonText: {
    color: '#4ECDC4',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default GamificationPanel;
