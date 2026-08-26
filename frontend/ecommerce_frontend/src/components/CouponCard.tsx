import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TagIcon, ClockIcon, CheckIcon } from './Icons';
import AnimatedCard from './AnimatedCard';

interface CouponCardProps {
  code: string;
  discount: string;
  description: string;
  expiryDate: string;
  onCopy: (code: string) => void;
}

const CouponCard: React.FC<CouponCardProps> = ({ code, discount, description, expiryDate, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatedCard delay={100}>
      <View style={styles.card}>
        <View style={styles.dashedLeft} />
        <View style={styles.content}>
          <View style={styles.header}>
            <TagIcon size={20} color="#FF5722" />
            <Text style={styles.discount}>{discount}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.footer}>
            <View style={styles.expiry}>
              <ClockIcon size={14} color="#A0A0A0" />
              <Text style={styles.expiryText}>{expiryDate}</Text>
            </View>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
              {copied ? (
                <CheckIcon size={16} color="#4CAF50" />
              ) : (
                <Text style={styles.copyText}>COPY</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.codeRow}>
            <Text style={styles.code}>{code}</Text>
          </View>
        </View>
        <View style={styles.dashedRight} />
      </View>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    marginVertical: 6,
  },
  dashedLeft: {
    width: 2,
    marginVertical: 12,
    marginLeft: 0,
    borderLeftWidth: 2,
    borderLeftColor: '#FF5722',
    borderStyle: 'dashed',
  },
  dashedRight: {
    width: 2,
    marginVertical: 12,
    marginRight: 0,
    borderRightWidth: 2,
    borderRightColor: '#FF5722',
    borderStyle: 'dashed',
  },
  content: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderStyle: 'dashed',
    borderRadius: 12,
    margin: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  discount: {
    color: '#FF5722',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  description: {
    color: '#CCCCCC',
    fontSize: 13,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  expiry: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiryText: {
    color: '#A0A0A0',
    fontSize: 12,
    marginLeft: 4,
  },
  copyBtn: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  copyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  codeRow: {
    alignItems: 'center',
  },
  code: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 2,
    backgroundColor: '#2E2E38',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    overflow: 'hidden',
  },
});

export default CouponCard;
