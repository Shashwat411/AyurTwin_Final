import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../../config/theme';
import Card from '../../components/common/Card';
import { useApp } from '../../context/AppContext';
import { calculateHealthScore } from '../../utils/healthCalculations';

const LeaderboardScreen = () => {
  const { state } = useApp();
  const user = state.user || {};
  const myScore = calculateHealthScore({ ...user, ...(state.registrationData || {}) });

  // Simulated leaderboard
  const leaderboard = [
    { rank: 1, name: 'Arjun S.', score: 92, improvement: 15, consistency: 95, badge: '🥇' },
    { rank: 2, name: 'Priya M.', score: 88, improvement: 12, consistency: 90, badge: '🥈' },
    { rank: 3, name: 'Rahul K.', score: 85, improvement: 18, consistency: 85, badge: '🥉' },
    { rank: 4, name: user.first_name || 'You', score: myScore, improvement: 8, consistency: 70, badge: '👤', isUser: true },
    { rank: 5, name: 'Sneha R.', score: 72, improvement: 10, consistency: 80, badge: '' },
    { rank: 6, name: 'Vikram T.', score: 70, improvement: 5, consistency: 75, badge: '' },
    { rank: 7, name: 'Anjali P.', score: 68, improvement: 7, consistency: 72, badge: '' },
    { rank: 8, name: 'Karan D.', score: 65, improvement: 3, consistency: 65, badge: '' },
  ].sort((a, b) => b.score - a.score).map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={COLORS.gradient.saffron} style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <Text style={styles.headerSubtitle}>Health Score Rankings</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Top 3 Podium */}
        <View style={styles.podium}>
          {leaderboard.slice(0, 3).map((item, idx) => (
            <View key={item.rank} style={[styles.podiumItem, idx === 0 && styles.podiumFirst]}>
              <Text style={styles.podiumBadge}>{item.badge}</Text>
              <LinearGradient
                colors={idx === 0 ? COLORS.gradient.saffron : idx === 1 ? ['#C0C0C0', '#D0D0D0'] : ['#CD7F32', '#DDA15E']}
                style={[styles.podiumAvatar, idx === 0 && styles.podiumAvatarFirst]}
              >
                <Text style={styles.podiumAvatarText}>{item.name[0]}</Text>
              </LinearGradient>
              <Text style={styles.podiumName}>{item.name}</Text>
              <Text style={styles.podiumScore}>{item.score}</Text>
            </View>
          ))}
        </View>

        {/* Ranking List */}
        <Text style={styles.sectionTitle}>Full Rankings</Text>
        {leaderboard.map((item) => (
          <View key={item.rank} style={[styles.rankRow, item.isUser && styles.rankRowUser]}>
            <Text style={[styles.rankNum, item.rank <= 3 && styles.rankNumTop]}>{item.rank}</Text>
            <View style={[styles.rankAvatar, item.isUser && styles.rankAvatarUser]}>
              <Text style={styles.rankAvatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.rankInfo}>
              <Text style={[styles.rankName, item.isUser && styles.rankNameUser]}>{item.name}</Text>
              <View style={styles.rankMeta}>
                <Text style={styles.rankMetaText}>+{item.improvement}% improvement</Text>
                <Text style={styles.rankMetaText}>{item.consistency}% consistency</Text>
              </View>
            </View>
            <View style={styles.rankScoreBox}>
              <Text style={[styles.rankScore, { color: item.score >= 80 ? COLORS.success : item.score >= 60 ? COLORS.warning : COLORS.error }]}>
                {item.score}
              </Text>
            </View>
          </View>
        ))}

        {/* Score Breakdown */}
        <Text style={styles.sectionTitle}>Your Score Breakdown</Text>
        <Card variant="elevated">
          <ScoreRow label="Health Score" value={myScore} max={100} color={COLORS.success} />
          <ScoreRow label="Improvement" value={8} max={20} color={COLORS.primary} />
          <ScoreRow label="Consistency" value={70} max={100} color={COLORS.info} />
        </Card>
      </View>
    </ScrollView>
  );
};

const ScoreRow = ({ label, value, max, color }) => (
  <View style={styles.scoreRow}>
    <Text style={styles.scoreLabel}>{label}</Text>
    <View style={styles.scoreTrack}>
      <View style={[styles.scoreFill, { width: `${(value / max) * 100}%`, backgroundColor: color }]} />
    </View>
    <Text style={[styles.scoreValue, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingTop: 50, paddingBottom: 24, paddingHorizontal: SIZES.screenPadding, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#FFF' },
  headerSubtitle: { fontSize: 13, color: '#FFFFFFCC' },
  content: { paddingHorizontal: SIZES.screenPadding, paddingBottom: 30 },
  // Podium
  podium: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: 20, gap: 16 },
  podiumItem: { alignItems: 'center' },
  podiumFirst: { marginBottom: 16 },
  podiumBadge: { fontSize: 24, marginBottom: 4 },
  podiumAvatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  podiumAvatarFirst: { width: 60, height: 60, borderRadius: 30 },
  podiumAvatarText: { fontSize: 22, fontWeight: '700', color: '#FFF' },
  podiumName: { fontSize: 12, fontWeight: '600', color: COLORS.text, marginTop: 6 },
  podiumScore: { fontSize: 18, fontWeight: '800', color: COLORS.primary },
  // Rankings
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginTop: 24, marginBottom: 12 },
  rankRow: {
    flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius, marginBottom: 8, ...SHADOWS.small,
  },
  rankRowUser: { borderWidth: 1.5, borderColor: COLORS.primary, backgroundColor: '#FFF5F0' },
  rankNum: { width: 30, fontSize: 16, fontWeight: '700', color: COLORS.textSecondary, textAlign: 'center' },
  rankNumTop: { color: COLORS.primary },
  rankAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.border, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 },
  rankAvatarUser: { backgroundColor: COLORS.primary },
  rankAvatarText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  rankInfo: { flex: 1 },
  rankName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  rankNameUser: { color: COLORS.primary },
  rankMeta: { flexDirection: 'row', gap: 10, marginTop: 2 },
  rankMetaText: { fontSize: 10, color: COLORS.textLight },
  rankScoreBox: { paddingHorizontal: 10 },
  rankScore: { fontSize: 20, fontWeight: '800' },
  // Score breakdown
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  scoreLabel: { width: 90, fontSize: 13, color: COLORS.textSecondary },
  scoreTrack: { flex: 1, height: 8, backgroundColor: COLORS.border, borderRadius: 4, overflow: 'hidden', marginHorizontal: 10 },
  scoreFill: { height: '100%', borderRadius: 4 },
  scoreValue: { width: 30, fontSize: 14, fontWeight: '700', textAlign: 'right' },
});

export default LeaderboardScreen;
