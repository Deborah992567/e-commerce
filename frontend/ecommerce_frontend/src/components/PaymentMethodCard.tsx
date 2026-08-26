import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AnimatedCard from './AnimatedCard';
import { CreditCardIcon, CheckIcon } from './Icons';

interface PaymentMethodCardProps {
  type: string;
  last4: string;
  isSelected: boolean;
  onSelect: () => void;
}

const brandColors: Record<string, string> = {
  Visa: '#1A1F71',
  Mastercard: '#EB001B',
  Amex: '#006FCF',
  Discover: '#FF6000',
};

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ type, last4, isSelected, onSelect }) => {
  return (
    <AnimatedCard>
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={onSelect}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrap}>
          <CreditCardIcon size={24} color={isSelected ? '#4ECDC4' : '#FF5722'} />
        </View>

        <View style={styles.info}>
          <Text style={styles.brand}>{type}</Text>
          <Text style={styles.last4}>**** **** **** {last4}</Text>
        </View>

        <View style={[styles.dot, isSelected && styles.dotSelected]} />
        {isSelected && <CheckIcon size={20} color="#4ECDC4" />}
      </TouchableOpacity>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23232B',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#4ECDC4',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1A1A22',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  last4: {
    color: '#B3B3C2',
    fontSize: 14,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4A4A58',
    marginRight: 8,
  },
  dotSelected: {
    borderColor: '#4ECDC4',
    backgroundColor: '#4ECDC422',
  },
});

export default PaymentMethodCard;
