import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CTAButton from './CTAButton';

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

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Replace with actual API call
      // const response = await fetch('http://localhost:8000/admin/dashboard', {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // const data = await response.json();
      
      // Mock data for now
      setStats({
        total_users: 1250,
        total_orders: 456,
        total_products: 89
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats?.total_users || 0}</Text>
          <Text style={styles.statLabel}>Total Users</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats?.total_orders || 0}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats?.total_products || 0}</Text>
          <Text style={styles.statLabel}>Total Products</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <CTAButton title="Manage Products" onPress={() => Alert.alert('Products', 'Product management coming soon')} color="#7B1FA2" size="md" />
        <CTAButton title="View Orders" onPress={() => Alert.alert('Orders', 'Order management coming soon')} color="#E8C97A" size="md" />
        <CTAButton title="User Management" onPress={() => Alert.alert('Users', 'User management coming soon')} color="#A0A0A0" size="md" />
      </View>

      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181F',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 24,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E8C97A',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  backBtn: {
    alignSelf: 'center',
    marginTop: 24,
  },
  backText: {
    color: '#E8C97A',
    fontSize: 16,
  },
});

export default DashboardScreen;