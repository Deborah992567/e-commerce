import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AnimatedCard from './AnimatedCard';
import { CheckIcon, TrashIcon } from './Icons';

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface AddressCardProps {
  address: Address;
  isSelected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  delay?: number;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  delay = 0,
}) => {
  return (
    <AnimatedCard delay={delay}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onSelect}
        style={[styles.card, isSelected && styles.cardSelected]}
      >
        <View style={styles.header}>
          <Text style={[styles.name, isSelected && styles.nameSelected]}>
            {address.name}
          </Text>
          {isSelected && <CheckIcon size={18} color="#4ECDC4" />}
        </View>

        <Text style={styles.street}>{address.street}</Text>
        <Text style={styles.detail}>
          {address.city}, {address.state} {address.zip}
        </Text>
        <Text style={styles.detail}>{address.country}</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit} style={styles.actionBtn}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.actionBtn}>
            <TrashIcon size={16} color="#FF6B6B" />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#4ECDC4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  nameSelected: {
    color: '#4ECDC4',
  },
  street: {
    color: '#C0C0C8',
    fontSize: 14,
    marginBottom: 4,
  },
  detail: {
    color: '#A0A0A0',
    fontSize: 13,
    marginBottom: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 12,
    gap: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  editText: {
    color: '#FF5722',
    fontSize: 13,
    fontWeight: '600',
  },
  deleteText: {
    color: '#FF6B6B',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default AddressCard;
