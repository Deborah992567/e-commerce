import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeftIcon, PhoneIcon, HelpIcon, ScaleIcon, MailIcon, ShieldIcon } from './Icons';

export type InfoType = 'contact' | 'faq' | 'terms';

interface InfoScreenProps {
  type: InfoType;
  onBack?: () => void;
}

const FAQ_ITEMS = [
  { q: 'How do I place an order?', a: 'Browse the shop, add items to your cart, then tap Checkout. Select a payment method, confirm your details, and tap Place Order. Your order will be processed and shipped shortly.' },
  { q: 'Which payment methods are accepted?', a: 'We accept Visa, Mastercard, PayPal and Apple Pay. All payments are processed over a secure simulated gateway for this demo.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3-7 business days. You can track your order status in the Order History section of your profile.' },
  { q: 'Can I return an item?', a: 'Yes. Items can be returned within 30 days of delivery as long as they are unused and in their original packaging.' },
  { q: 'How do I track my order?', a: 'Go to Account > Order History and tap any order to see its live status as it moves from packed to shipped to delivered.' },
  { q: 'How do I earn coins?', a: 'Coins are earned through the Spin to Win game and gamification rewards in the Deals tab. Coins can be applied as discounts at checkout.' },
];

const CONTACT_CHANNELS = [
  { icon: <PhoneIcon size={20} color="#FF5722" />, label: 'Customer Service', value: '+234 800 000 0000', action: 'Call us' },
  { icon: <MailIcon size={20} color="#4ECDC4" />, label: 'Email Support', value: 'support@dezcollection.com', action: 'Email us' },
  { icon: <ShieldIcon size={20} color="#A78BFA" />, label: 'Head Office', value: 'Lagos, Nigeria', action: 'Visit us' },
];

const TERMS_SECTIONS = [
  { title: '1. Acceptance of Terms', body: 'By accessing and using the Dez Collection application, you accept and agree to be bound by the terms and provisions of this agreement.' },
  { title: '2. Use of the Service', body: 'You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else\'s use of the service.' },
  { title: '3. Orders and Pricing', body: 'All prices are listed in Nigerian Naira (₦). We reserve the right to accept or decline orders, and to correct any pricing errors that occur.' },
  { title: '4. Payment', body: 'Payments are processed through secure simulated gateways. By placing an order you agree to pay the specified amount for the selected items.' },
  { title: '5. Shipping and Delivery', body: 'We aim to dispatch all orders within 24 hours. Delivery times vary based on location and are estimates only.' },
  { title: '6. Returns and Refunds', body: 'You may return eligible items within 30 days. Refunds are issued to the original payment method once the returned item is received.' },
  { title: '7. Privacy', body: 'Your personal information is used solely to process orders, provide support, and improve the service. We do not sell your data to third parties.' },
  { title: '8. Limitation of Liability', body: 'Dez Collection shall not be liable for any indirect, incidental, or consequential damages arising from the use of this app.' },
];

const InfoScreen: React.FC<InfoScreenProps> = ({ type, onBack }) => {
  const insets = useSafeAreaInsets();

  const config = {
    contact: {
      title: 'Contact Us',
      icon: <PhoneIcon size={22} color="#FF5722" />,
      subtitle: 'We\'re here to help. Reach out anytime.',
    },
    faq: {
      title: 'FAQ',
      icon: <HelpIcon size={22} color="#A78BFA" />,
      subtitle: 'Answers to common questions.',
    },
    terms: {
      title: 'Terms & Conditions',
      icon: <ScaleIcon size={22} color="#A0A0A0" />,
      subtitle: 'Please read these terms carefully.',
    },
  }[type];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ChevronLeftIcon size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{config.title}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          {config.icon}
          <Text style={styles.introTitle}>{config.title}</Text>
          <Text style={styles.introSubtitle}>{config.subtitle}</Text>
        </View>

        {type === 'contact' && CONTACT_CHANNELS.map((c) => (
          <TouchableOpacity key={c.label} style={styles.channelCard}>
            <View style={styles.channelIconWrap}>{c.icon}</View>
            <View style={styles.channelInfo}>
              <Text style={styles.channelLabel}>{c.label}</Text>
              <Text style={styles.channelValue}>{c.value}</Text>
            </View>
            <Text style={styles.channelAction}>{c.action}</Text>
          </TouchableOpacity>
        ))}

        {type === 'faq' && FAQ_ITEMS.map((item, i) => (
          <View key={i} style={styles.faqItem}>
            <Text style={styles.faqQ}>{item.q}</Text>
            <Text style={styles.faqA}>{item.a}</Text>
          </View>
        ))}

        {type === 'terms' && TERMS_SECTIONS.map((s, i) => (
          <View key={i} style={styles.termsSection}>
            <Text style={styles.termsTitle}>{s.title}</Text>
            <Text style={styles.termsBody}>{s.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#2D2D38' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#23232B', borderWidth: 1, borderColor: '#2D2D38', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  content: { padding: 16, paddingBottom: 60 },
  intro: { alignItems: 'center', marginBottom: 24 },
  introTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginTop: 8 },
  introSubtitle: { color: '#A0A0A0', fontSize: 14, marginTop: 4, textAlign: 'center' },
  channelCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181F', borderRadius: 12, borderWidth: 1, borderColor: '#2D2D38', padding: 14, marginBottom: 10, gap: 12 },
  channelIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#23232B', alignItems: 'center', justifyContent: 'center' },
  channelInfo: { flex: 1 },
  channelLabel: { color: '#A0A0A0', fontSize: 12 },
  channelValue: { color: '#FFF', fontSize: 15, fontWeight: '600', marginTop: 2 },
  channelAction: { color: '#FF5722', fontSize: 13, fontWeight: '600' },
  faqItem: { backgroundColor: '#18181F', borderRadius: 12, borderWidth: 1, borderColor: '#2D2D38', padding: 14, marginBottom: 10 },
  faqQ: { color: '#FFF', fontSize: 15, fontWeight: '600', marginBottom: 6 },
  faqA: { color: '#A0A0A0', fontSize: 14, lineHeight: 20 },
  termsSection: { marginBottom: 18 },
  termsTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 6 },
  termsBody: { color: '#A0A0A0', fontSize: 14, lineHeight: 21 },
});

export default InfoScreen;
