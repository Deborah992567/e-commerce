import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Share, Clipboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  UsersIcon,
  TrendingUpIcon,
  TagIcon,
  ChevronLeftIcon,
  CheckIcon,
  ClockIcon,
  GiftIcon,
  TrophyIcon,
  ShieldIcon,
  PhoneIcon,
  MailIcon,
  HeartIcon,
  StarIcon,
} from './Icons';

interface ReferralScreenProps {
  onBack?: () => void;
}

interface Referral {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'completed';
  reward: number;
  date: string;
}

const ReferralScreen: React.FC<ReferralScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [referrals] = useState<Referral[]>([
    { id: '1', name: 'Sarah M.', email: 'sarah@example.com', status: 'completed', reward: 500, date: '2026-03-15' },
    { id: '2', name: 'John D.', email: 'john@example.com', status: 'completed', reward: 500, date: '2026-03-10' },
    { id: '3', name: 'Emma W.', email: 'emma@example.com', status: 'pending', reward: 500, date: '2026-03-25' },
  ]);

  const [referralCode] = useState('DEZ2026PROMO');
  const [totalEarned] = useState(1500);
  const [pendingEarnings] = useState(500);

  const handleCopyCode = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join Dez Collection and get \u20A6500 bonus! Use my referral code: ${referralCode}. Download now and shop luxury deals!`,
        title: 'Refer & Earn with Dez Collection',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handleShareWhatsApp = () => {
    const message = `Join Dez Collection and get \u20A6500 bonus! Use my referral code: ${referralCode}. Shop luxury deals!`;
    Alert.alert('Share on WhatsApp', message, [
      { text: 'Copy Message', onPress: () => {
        Clipboard.setString(message);
        Alert.alert('Copied!', 'Message copied to clipboard');
      }},
      { text: 'Close', style: 'cancel' }
    ]);
  };

  const handleShareInstagram = () => {
    Alert.alert('Share on Instagram', 'Open Instagram and share your referral code in your story or DM!\n\nCode: ' + referralCode, [
      { text: 'Copy Code', onPress: () => {
        Clipboard.setString(referralCode);
        Alert.alert('Copied!', 'Referral code copied');
      }},
      { text: 'Close', style: 'cancel' }
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeftIcon size={22} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <UsersIcon size={20} color="#FF5722" />
          <Text style={styles.title}>Refer & Earn</Text>
        </View>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Referral Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <TrendingUpIcon size={18} color="#FF5722" />
            <Text style={styles.statLabel}>Total Earned</Text>
            <Text style={styles.statValue}>{'\u20A6'}{totalEarned}</Text>
          </View>
          <View style={styles.statCard}>
            <ClockIcon size={18} color="#FFA500" />
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>{'\u20A6'}{pendingEarnings}</Text>
          </View>
          <View style={styles.statCard}>
            <UsersIcon size={18} color="#4ECDC4" />
            <Text style={styles.statLabel}>Friends</Text>
            <Text style={styles.statValue}>{referrals.length}</Text>
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <TrendingUpIcon size={18} color="#FF5722" />
            <Text style={styles.sectionTitle}>How It Works</Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Share your referral code with friends</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>They sign up using your code</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>They make first purchase</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>You earn {'\u20A6'}500 bonus!</Text>
            </View>
          </View>
        </View>

        {/* Your Referral Code */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <TagIcon size={18} color="#FF5722" />
            <Text style={styles.sectionTitle}>Your Referral Code</Text>
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopyCode}>
              <MailIcon size={14} color="#FFF" />
              <Text style={styles.copyBtnText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Share Options */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <StarIcon size={18} color="#FF5722" />
            <Text style={styles.sectionTitle}>Share With Friends</Text>
          </View>
          <View style={styles.shareButtonsContainer}>
            <TouchableOpacity style={[styles.shareBtn, styles.shareBtnGeneral]} onPress={handleShare}>
              <PhoneIcon size={22} color="#FF5722" />
              <Text style={styles.shareBtnText}>General</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shareBtn, styles.shareBtnWhatsApp]} onPress={handleShareWhatsApp}>
              <MailIcon size={22} color="#34A853" />
              <Text style={styles.shareBtnText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shareBtn, styles.shareBtnInstagram]} onPress={handleShareInstagram}>
              <HeartIcon size={22} color="#E1306C" />
              <Text style={styles.shareBtnText}>Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Referral History */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <MailIcon size={18} color="#FF5722" />
            <Text style={styles.sectionTitle}>Referral History</Text>
          </View>
          {referrals.map((referral) => (
            <View key={referral.id} style={styles.referralItem}>
              <View style={styles.referralInfo}>
                <Text style={styles.referralName}>{referral.name}</Text>
                <Text style={styles.referralEmail}>{referral.email}</Text>
                <Text style={styles.referralDate}>{new Date(referral.date).toLocaleDateString()}</Text>
              </View>
              <View style={styles.referralStatus}>
                <View style={[
                  styles.statusBadge,
                  referral.status === 'completed' ? styles.statusCompleted : styles.statusPending
                ]}>
                  {referral.status === 'completed' ? (
                    <CheckIcon size={12} color="#FFF" />
                  ) : (
                    <ClockIcon size={12} color="#FFF" />
                  )}
                  <Text style={styles.statusText}>
                    {referral.status === 'completed' ? 'Completed' : 'Pending'}
                  </Text>
                </View>
                <Text style={styles.referralReward}>+{'\u20A6'}{referral.reward}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bonus Tiers */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <GiftIcon size={18} color="#FF5722" />
            <Text style={styles.sectionTitle}>Bonus Tiers</Text>
          </View>
          <View style={styles.tierContainer}>
            <View style={styles.tier}>
              <TrophyIcon size={24} color="#CD7F32" />
              <Text style={styles.tierLevel}>Bronze</Text>
              <Text style={styles.tierDesc}>5 referrals</Text>
              <Text style={styles.tierBonus}>+{'\u20A6'}1,000 bonus</Text>
            </View>
            <View style={styles.tier}>
              <TrophyIcon size={24} color="#C0C0C0" />
              <Text style={styles.tierLevel}>Silver</Text>
              <Text style={styles.tierDesc}>10 referrals</Text>
              <Text style={styles.tierBonus}>+{'\u20A6'}3,000 bonus</Text>
            </View>
            <View style={styles.tier}>
              <TrophyIcon size={24} color="#FFD700" />
              <Text style={styles.tierLevel}>Gold</Text>
              <Text style={styles.tierDesc}>20 referrals</Text>
              <Text style={styles.tierBonus}>+{'\u20A6'}7,000 bonus</Text>
            </View>
          </View>
        </View>

        {/* Terms */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <ShieldIcon size={18} color="#FF5722" />
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          </View>
          <Text style={styles.termsText}>
            {'\u2022'} Referral rewards are credited after referred friend completes first purchase{'\n'}
            {'\u2022'} Maximum {'\u20A6'}10,000 earning per month{'\n'}
            {'\u2022'} Cannot refer yourself{'\n'}
            {'\u2022'} Rewards valid for 90 days from issue date{'\n'}
            {'\u2022'} Bonus tiers reset monthly
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#23232B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  scrollContainer: { flex: 1, paddingHorizontal: 14 },

  // Stats
  statsContainer: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D2D38',
    gap: 6,
  },
  statLabel: { color: '#A0A0A0', fontSize: 11, marginTop: 2 },
  statValue: { color: '#FF5722', fontSize: 20, fontWeight: 'bold' },

  // Sections
  section: { marginBottom: 24 },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: '600' },

  // Steps
  stepContainer: { gap: 10 },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23232B',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF5722',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  stepText: { color: '#A0A0A0', fontSize: 13, flex: 1 },

  // Code
  codeContainer: {
    flexDirection: 'row',
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2D2D38',
    justifyContent: 'space-between',
  },
  codeText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', letterSpacing: 2 },
  copyBtn: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  copyBtnText: { color: '#FFF', fontWeight: '600', fontSize: 12 },

  // Share Buttons
  shareButtonsContainer: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  shareBtn: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 2,
    gap: 8,
  },
  shareBtnGeneral: { backgroundColor: '#23232B', borderColor: '#FF5722' },
  shareBtnWhatsApp: { backgroundColor: '#23232B', borderColor: '#34A853' },
  shareBtnInstagram: { backgroundColor: '#23232B', borderColor: '#E1306C' },
  shareBtnText: { color: '#FFF', fontSize: 11, fontWeight: '600' },

  // Referral Items
  referralItem: {
    flexDirection: 'row',
    backgroundColor: '#23232B',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  referralInfo: { flex: 1 },
  referralName: { color: '#FFF', fontSize: 14, fontWeight: '600', marginBottom: 2 },
  referralEmail: { color: '#A0A0A0', fontSize: 12, marginBottom: 4 },
  referralDate: { color: '#808080', fontSize: 11 },
  referralStatus: { alignItems: 'flex-end' },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusCompleted: { backgroundColor: '#34A853' },
  statusPending: { backgroundColor: '#FFA500' },
  statusText: { color: '#FFF', fontSize: 11, fontWeight: '600' },
  referralReward: { color: '#FF5722', fontWeight: 'bold', fontSize: 14 },

  // Tiers
  tierContainer: { flexDirection: 'row', gap: 10 },
  tier: {
    flex: 1,
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D2D38',
    gap: 4,
  },
  tierLevel: { fontSize: 14, fontWeight: 'bold', marginTop: 4, textAlign: 'center', color: '#FFF' },
  tierDesc: { color: '#A0A0A0', fontSize: 12, marginBottom: 4, textAlign: 'center' },
  tierBonus: { color: '#FF5722', fontWeight: '600', fontSize: 12, textAlign: 'center' },

  // Terms
  termsText: {
    color: '#A0A0A0',
    fontSize: 13,
    lineHeight: 20,
    backgroundColor: '#23232B',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
});

export default ReferralScreen;
