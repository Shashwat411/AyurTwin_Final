import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../config/theme';
import { useApp } from '../../context/AppContext';

const MoreScreen = ({ navigation }) => {
  const { logout } = useApp();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: logout, style: 'destructive' },
    ]);
  };

  const menuItems = [
    { icon: '👤', label: 'Profile', screen: 'Profile' },
    { icon: '📊', label: 'Reports', screen: 'Reports' },
    { icon: '📱', label: 'Device', screen: 'Device' },
    { icon: '📘', label: 'Education', screen: 'Education' },
    { icon: 'ℹ️', label: 'About', screen: 'About' },
    { icon: '⚙️', label: 'Settings', screen: 'Settings' },
    { icon: '❓', label: 'Help', screen: 'Help' },
    { icon: '🚪', label: 'Logout', screen: null },
  ];

  const handlePress = (item) => {
    if (item.screen === null) {
      handleLogout();
    } else {
      navigation.navigate(item.screen);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>More</Text>
      </View>

      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={() => handlePress(item)}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconBox, item.screen === null && styles.logoutBox]}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
            </View>
            <Text style={[styles.menuLabel, item.screen === null && styles.logoutLabel]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick access to other features */}
      <View style={styles.extraSection}>
        <Text style={styles.extraTitle}>Quick Access</Text>
        <View style={styles.extraGrid}>
          <TouchableOpacity style={styles.extraItem} onPress={() => navigation.navigate('HealthJourney')}>
            <Text style={styles.extraIcon}>📈</Text>
            <Text style={styles.extraLabel}>Health Journey</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraItem} onPress={() => navigation.navigate('SmartInsights')}>
            <Text style={styles.extraIcon}>💡</Text>
            <Text style={styles.extraLabel}>Smart Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraItem} onPress={() => navigation.navigate('DoshaDetail')}>
            <Text style={styles.extraIcon}>🔺</Text>
            <Text style={styles.extraLabel}>Dosha Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraItem} onPress={() => navigation.navigate('Family')}>
            <Text style={styles.extraIcon}>👨‍👩‍👧</Text>
            <Text style={styles.extraLabel}>Family</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraItem} onPress={() => navigation.navigate('Leaderboard')}>
            <Text style={styles.extraIcon}>🏆</Text>
            <Text style={styles.extraLabel}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraItem} onPress={() => navigation.navigate('Social')}>
            <Text style={styles.extraIcon}>🌐</Text>
            <Text style={styles.extraLabel}>Social Feed</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.disclaimer}>
        This app provides preventive health insights and does not replace professional medical advice.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 50, paddingHorizontal: SIZES.screenPadding, paddingBottom: 16 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.text },
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SIZES.screenPadding, gap: 12 },
  menuItem: { width: '22%', alignItems: 'center', marginBottom: 16 },
  menuIconBox: {
    width: 56, height: 56, borderRadius: 16, backgroundColor: COLORS.surface,
    alignItems: 'center', justifyContent: 'center', ...SHADOWS.small,
  },
  logoutBox: { backgroundColor: '#FFF0F0' },
  menuIcon: { fontSize: 24 },
  menuLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary, marginTop: 6 },
  logoutLabel: { color: COLORS.error },
  // Extra section
  extraSection: { paddingHorizontal: SIZES.screenPadding, marginTop: 8 },
  extraTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  extraGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  extraItem: {
    width: '30%', alignItems: 'center', paddingVertical: 14, backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius, ...SHADOWS.small,
  },
  extraIcon: { fontSize: 22, marginBottom: 4 },
  extraLabel: { fontSize: 10, fontWeight: '600', color: COLORS.textSecondary, textAlign: 'center' },
  disclaimer: { fontSize: 10, color: COLORS.textLight, textAlign: 'center', marginTop: 24, lineHeight: 14, paddingHorizontal: SIZES.screenPadding },
});

export default MoreScreen;
