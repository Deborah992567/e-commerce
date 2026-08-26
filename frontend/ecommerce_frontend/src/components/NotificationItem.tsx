import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BellIcon } from './Icons';
import { NotificationDot } from './NotificationDot';
import SwipeableCard from './SwipeableCard';
import AnimatedCard from './AnimatedCard';

interface NotificationItemProps {
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  onPress: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  body,
  timestamp,
  isRead,
  onPress,
}) => {
  return (
    <SwipeableCard
      onSwipe={() => {
        onPress();
      }}
    >
      <AnimatedCard>
        <TouchableOpacity
          style={[
            styles.container,
            !isRead && styles.unreadContainer,
          ]}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <View style={styles.iconWrapper}>
            <BellIcon
              color={!isRead ? '#FF5722' : '#8E8E93'}
              size={24}
            />
            {!isRead && <NotificationDot />}
          </View>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text
                style={[
                  styles.title,
                  !isRead && styles.unreadTitle,
                ]}
                numberOfLines={1}
              >
                {title}
              </Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
            <Text
              style={[
                styles.body,
                !isRead && styles.unreadBody,
              ]}
              numberOfLines={2}
            >
              {body}
            </Text>
          </View>
          {!isRead && (
            <View style={styles.accentDot} />
          )}
        </TouchableOpacity>
      </AnimatedCard>
    </SwipeableCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  unreadContainer: {
    borderLeftWidth: 3,
    borderLeftColor: '#FF5722',
  },
  iconWrapper: {
    marginRight: 12,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
  },
  body: {
    fontSize: 14,
    color: '#B0B0B0',
    lineHeight: 20,
  },
  unreadBody: {
    color: '#D0D0D0',
  },
  accentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
    marginLeft: 8,
  },
});

export default NotificationItem;
