import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../../config/theme';
import Card from '../../components/common/Card';
import GradientButton from '../../components/common/GradientButton';
import { useApp } from '../../context/AppContext';

const SocialFeedScreen = () => {
  const { state } = useApp();
  const user = state.user || {};
  const [newPost, setNewPost] = useState('');
  const [showCompose, setShowCompose] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 1, user: 'Arjun S.', type: 'achievement', avatar: 'A',
      content: 'Just completed 30 days of consistent meditation! My stress score dropped from 78 to 42. AyurTwin tracking really helped me stay motivated!',
      likes: 24, comments: 5, time: '2h ago', liked: false,
    },
    {
      id: 2, user: 'Priya M.', type: 'milestone', avatar: 'P',
      content: 'My health score reached 88 today! Following Pitta-balancing diet and cooling exercises made a huge difference.',
      likes: 18, comments: 3, time: '4h ago', liked: false,
    },
    {
      id: 3, user: 'Rahul K.', type: 'tip', avatar: 'R',
      content: 'Tip: Warm turmeric milk before bed has improved my sleep quality by 30%. Try it if you have Vata imbalance!',
      likes: 32, comments: 8, time: '6h ago', liked: false,
    },
    {
      id: 4, user: 'Sneha R.', type: 'general', avatar: 'S',
      content: 'Started Dinacharya routine today. Woke up at 5:30 AM, did yoga, and had a healthy breakfast. Feeling amazing already!',
      likes: 15, comments: 2, time: '8h ago', liked: false,
    },
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(p => p.id === postId ? {
      ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1,
    } : p));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: posts.length + 1,
      user: user.first_name || user.username || 'You',
      avatar: (user.first_name || 'U')[0],
      type: 'general',
      content: newPost.trim(),
      likes: 0, comments: 0, time: 'Just now', liked: false,
    };
    setPosts([post, ...posts]);
    setNewPost('');
    setShowCompose(false);
  };

  const getTypeColor = (type) => {
    const colors = { achievement: COLORS.success, milestone: COLORS.primary, tip: COLORS.info, general: COLORS.textSecondary };
    return colors[type] || COLORS.textSecondary;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={COLORS.gradient.saffron} style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <Text style={styles.headerSubtitle}>Share & inspire healthy habits</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Compose */}
        <TouchableOpacity style={styles.composeBtn} onPress={() => setShowCompose(!showCompose)}>
          <Text style={styles.composeText}>Share your health journey...</Text>
          <Text style={styles.composeIcon}>✍️</Text>
        </TouchableOpacity>

        {showCompose && (
          <Card variant="elevated" style={styles.composeCard}>
            <TextInput
              style={styles.composeInput}
              value={newPost}
              onChangeText={setNewPost}
              placeholder="What's your health achievement today?"
              multiline
              numberOfLines={3}
            />
            <GradientButton title="Post" onPress={handlePost} />
          </Card>
        )}

        {/* Feed */}
        {posts.map((post) => (
          <Card key={post.id} variant="elevated" style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAvatar}>
                <Text style={styles.postAvatarText}>{post.avatar}</Text>
              </View>
              <View style={styles.postUserInfo}>
                <Text style={styles.postUser}>{post.user}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <View style={[styles.postTypeBadge, { backgroundColor: getTypeColor(post.type) + '20' }]}>
                <Text style={[styles.postTypeText, { color: getTypeColor(post.type) }]}>{post.type}</Text>
              </View>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => handleLike(post.id)}>
                <Text style={[styles.actionIcon, post.liked && styles.actionIconActive]}>
                  {post.liked ? '❤️' : '🤍'}
                </Text>
                <Text style={[styles.actionText, post.liked && styles.actionTextActive]}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionIcon}>🔗</Text>
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
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
  // Compose
  composeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 14, backgroundColor: COLORS.surface, borderRadius: SIZES.borderRadiusLg,
    marginTop: 16, ...SHADOWS.small,
  },
  composeText: { fontSize: 14, color: COLORS.textLight },
  composeIcon: { fontSize: 18 },
  composeCard: { marginTop: 10 },
  composeInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 14, minHeight: 80, textAlignVertical: 'top' },
  // Post
  postCard: { marginTop: 12 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  postAvatar: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  postAvatarText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  postUserInfo: { flex: 1 },
  postUser: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  postTime: { fontSize: 11, color: COLORS.textLight },
  postTypeBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  postTypeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  postContent: { fontSize: 14, color: COLORS.text, lineHeight: 21, marginBottom: 12 },
  postActions: { flexDirection: 'row', gap: 20, borderTopWidth: 0.5, borderTopColor: COLORS.border, paddingTop: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionIcon: { fontSize: 16 },
  actionIconActive: {},
  actionText: { fontSize: 13, color: COLORS.textSecondary },
  actionTextActive: { color: COLORS.error },
});

export default SocialFeedScreen;
