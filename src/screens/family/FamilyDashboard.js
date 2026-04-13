import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../../config/theme';
import Card from '../../components/common/Card';
import GradientButton from '../../components/common/GradientButton';
import { useApp } from '../../context/AppContext';

const FamilyDashboard = ({ navigation }) => {
  const { state } = useApp();
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInvite, setShowInvite] = useState(false);

  // Simulated family members
  const familyMembers = [
    { id: 1, name: 'Parent A', relation: 'Father', healthScore: 72, prakriti: 'Pitta-Kapha', status: 'healthy', alerts: 1 },
    { id: 2, name: 'Parent B', relation: 'Mother', healthScore: 65, prakriti: 'Vata-Pitta', status: 'attention', alerts: 3 },
  ];

  const handleInvite = () => {
    if (!inviteEmail.trim()) {
      Alert.alert('Error', 'Please enter an email address.');
      return;
    }
    Alert.alert('Invite Sent', `Family invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setShowInvite(false);
  };

  const getStatusColor = (status) => {
    if (status === 'healthy') return COLORS.success;
    if (status === 'attention') return COLORS.warning;
    return COLORS.error;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={COLORS.gradient.green} style={styles.header}>
        <Text style={styles.headerTitle}>Family Health</Text>
        <Text style={styles.headerSubtitle}>Monitor your loved ones</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Add Family Member */}
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowInvite(!showInvite)}>
          <Text style={styles.addBtnText}>+ Add Family Member</Text>
        </TouchableOpacity>

        {showInvite && (
          <Card variant="elevated" style={styles.inviteCard}>
            <Text style={styles.inviteTitle}>Send Invitation</Text>
            <TextInput
              style={styles.inviteInput}
              value={inviteEmail}
              onChangeText={setInviteEmail}
              placeholder="Enter family member's email"
              keyboardType="email-address"
            />
            <GradientButton title="Send Invite" onPress={handleInvite} gradient={COLORS.gradient.green} />
          </Card>
        )}

        {/* Family Members */}
        <Text style={styles.sectionTitle}>Family Members</Text>
        {familyMembers.map((member) => (
          <Card key={member.id} variant="elevated" style={styles.memberCard}>
            <View style={styles.memberHeader}>
              <LinearGradient colors={COLORS.gradient.green} style={styles.memberAvatar}>
                <Text style={styles.memberAvatarText}>{member.name[0]}</Text>
              </LinearGradient>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRelation}>{member.relation}</Text>
              </View>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(member.status) }]} />
            </View>

            <View style={styles.memberMetrics}>
              <View style={styles.memberMetric}>
                <Text style={styles.metricValue}>{member.healthScore}</Text>
                <Text style={styles.metricLabel}>Health Score</Text>
              </View>
              <View style={styles.memberMetric}>
                <Text style={styles.metricValue}>{member.prakriti}</Text>
                <Text style={styles.metricLabel}>Prakriti</Text>
              </View>
              <View style={styles.memberMetric}>
                <Text style={[styles.metricValue, { color: member.alerts > 2 ? COLORS.error : COLORS.warning }]}>
                  {member.alerts}
                </Text>
                <Text style={styles.metricLabel}>Alerts</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewDashBtn}>
              <Text style={styles.viewDashText}>View Dashboard →</Text>
            </TouchableOpacity>
          </Card>
        ))}

        {/* Pending Invites */}
        <Text style={styles.sectionTitle}>Pending Invites</Text>
        <Card variant="outlined" style={styles.pendingCard}>
          <Text style={styles.pendingIcon}>📩</Text>
          <Text style={styles.pendingText}>No pending invitations</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 50, paddingBottom: 24, paddingHorizontal: SIZES.screenPadding, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#FFF' },
  headerSubtitle: { fontSize: 13, color: '#FFFFFFCC' },
  content: { paddingHorizontal: SIZES.screenPadding, paddingBottom: 30 },
  addBtn: { alignSelf: 'center', marginTop: 16, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, borderWidth: 1.5, borderColor: COLORS.secondary, borderStyle: 'dashed' },
  addBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.secondary },
  inviteCard: { marginTop: 12 },
  inviteTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  inviteInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginTop: 24, marginBottom: 12 },
  // Member Card
  memberCard: { marginBottom: 12 },
  memberHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  memberAvatar: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  memberAvatarText: { fontSize: 20, fontWeight: '700', color: '#FFF' },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  memberRelation: { fontSize: 12, color: COLORS.textSecondary },
  statusDot: { width: 12, height: 12, borderRadius: 6 },
  memberMetrics: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 0.5, borderTopColor: COLORS.border },
  memberMetric: { alignItems: 'center' },
  metricValue: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  metricLabel: { fontSize: 10, color: COLORS.textSecondary, marginTop: 2 },
  viewDashBtn: { alignItems: 'center', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: COLORS.border, marginTop: 8 },
  viewDashText: { fontSize: 13, fontWeight: '700', color: COLORS.secondary },
  pendingCard: { alignItems: 'center', padding: 24 },
  pendingIcon: { fontSize: 32, marginBottom: 8 },
  pendingText: { fontSize: 14, color: COLORS.textSecondary },
});

export default FamilyDashboard;
