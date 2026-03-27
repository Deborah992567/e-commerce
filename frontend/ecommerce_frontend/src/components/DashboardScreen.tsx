import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity, Dimensions } from 'react-native';
import CTAButton from './CTAButton';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

interface DashboardStats {
  total_users: number;
  total_orders: number;
  total_products: number;
}

interface DashboardScreenProps {
  onBack?: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onBack }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setStats({
        total_users: 1250,
        total_orders: 456,
        total_products: 89
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => {
          logout();
          if (onBack) onBack();
        }}
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingCard}>
          <Text style={styles.loadingText}>Loading Dashboard...</Text>
          <View style={styles.loadingIndicator} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.welcomeText}>Welcome back, {user?.email}!</Text>
        <Text style={styles.subtitle}>Here's your business overview</Text>
        <Text style={styles.demoNote}>⚠️ Demo Mode - Using mock data</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Text style={styles.iconText}>👥</Text>
          </View>
          <Text style={styles.statNumber}>{stats?.total_users || 0}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
          <Text style={styles.statSubtext}>+12% from last month</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Text style={styles.iconText}>📦</Text>
          </View>
          <Text style={styles.statNumber}>{stats?.total_orders || 0}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
          <Text style={styles.statSubtext}>+8% from last month</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Text style={styles.iconText}>💎</Text>
          </View>
          <Text style={styles.statNumber}>{stats?.total_products || 0}</Text>
          <Text style={styles.statLabel}>Total Products</Text>
          <Text style={styles.statSubtext}>+5% from last month</Text>
        </View>
      </View>

      <View style={styles.revenueCard}>
        <Text style={styles.revenueTitle}>Revenue Overview</Text>
        <Text style={styles.revenueAmount}>₦45,678.90</Text>
        <Text style={styles.revenueSubtext}>+15% from last month</Text>
        <View style={styles.revenueBar}>
          <View style={styles.revenueProgress} />
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Products', 'Product management coming soon')}>
            <Text style={styles.actionIcon}>📝</Text>
            <Text style={styles.actionTitle}>Manage Products</Text>
            <Text style={styles.actionDesc}>Add, edit, or remove products</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Orders', 'Order management coming soon')}>
            <Text style={styles.actionIcon}>🚚</Text>
            <Text style={styles.actionTitle}>View Orders</Text>
            <Text style={styles.actionDesc}>Track and manage orders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Users', 'User management coming soon')}>
            <Text style={styles.actionIcon}>👤</Text>
            <Text style={styles.actionTitle}>User Management</Text>
            <Text style={styles.actionDesc}>Manage user accounts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Analytics', 'Analytics coming soon')}>
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionTitle}>Analytics</Text>
            <Text style={styles.actionDesc}>View detailed reports</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>← Back to Main</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181F',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#E8C97A',
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 8,
  },
  demoNote: {
    fontSize: 14,
    color: '#FFC107',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  loadingCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18181F',
  },
  loadingText: {
    fontSize: 18,
    color: '#7B1FA2',
    marginBottom: 16,
  },
  loadingIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#7B1FA2',
    borderRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    shadowColor: '#7B1FA2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7B1FA2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E8C97A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  statSubtext: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  revenueCard: {
    backgroundColor: '#7B1FA2',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#7B1FA2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  revenueTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  revenueAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E8C97A',
    marginBottom: 4,
  },
  revenueSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 16,
  },
  revenueBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  revenueProgress: {
    width: '75%',
    height: '100%',
    backgroundColor: '#E8C97A',
    borderRadius: 3,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 20,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionDesc: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 16,
  },
  backBtn: {
    alignSelf: 'center',
    marginBottom: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backText: {
    color: '#E8C97A',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#FF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
