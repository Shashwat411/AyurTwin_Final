import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableOpacity, TextInput,
  ScrollView, KeyboardAvoidingView, Platform, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS } from '../config/theme';
import { getAyurBotResponse } from '../utils/chatbotLogic';
import { useApp } from '../context/AppContext';

const ChatBot = () => {
  const { state, dispatch } = useApp();
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 0, text: "Namaste! I'm AyurBot, your Ayurvedic health companion. How can I help you today?", sender: 'bot' },
  ]);
  const scrollRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: messages.length, text: input.trim(), sender: 'user' };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');

    // Get bot response
    setTimeout(() => {
      const userProfile = {
        ...state.user,
        ...state.registrationData,
        prakriti: state.prakritiResult?.prakriti,
        vata_percent: state.prakritiResult?.vata_percent,
        pitta_percent: state.prakritiResult?.pitta_percent,
        kapha_percent: state.prakritiResult?.kapha_percent,
        healthScore: state.healthScore,
      };
      const response = getAyurBotResponse(input.trim(), userProfile);
      const botMsg = { id: newMessages.length, text: response, sender: 'bot' };
      setMessages([...newMessages, botMsg]);
    }, 500);
  };

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.9, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
    setVisible(true);
  };

  return (
    <>
      {/* Floating Button */}
      <Animated.View style={[styles.fab, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
          <LinearGradient colors={COLORS.gradient.saffron} style={styles.fabGradient}>
            <Text style={styles.fabIcon}>🤖</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Chat Modal */}
      <Modal visible={visible} animationType="slide" transparent>
        <KeyboardAvoidingView style={styles.modalContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.chatContainer}>
            {/* Header */}
            <LinearGradient colors={COLORS.gradient.saffron} style={styles.chatHeader}>
              <View style={styles.chatHeaderContent}>
                <View style={styles.botAvatar}>
                  <Text style={styles.botAvatarText}>🤖</Text>
                </View>
                <View>
                  <Text style={styles.chatTitle}>AyurBot</Text>
                  <Text style={styles.chatSubtitle}>Your health assistant</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </LinearGradient>

            {/* Messages */}
            <ScrollView
              style={styles.messageList}
              ref={scrollRef}
              onContentSizeChange={() => scrollRef.current?.scrollToEnd()}
            >
              {messages.map((msg) => (
                <View key={msg.id} style={[styles.msgRow, msg.sender === 'user' && styles.msgRowUser]}>
                  <View style={[styles.msgBubble, msg.sender === 'user' ? styles.msgUser : styles.msgBot]}>
                    <Text style={[styles.msgText, msg.sender === 'user' && styles.msgTextUser]}>
                      {msg.text}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Quick Actions */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
              {['My dosha', 'Stress tips', 'Diet advice', 'Sleep help', 'What is Ayurveda?'].map((q) => (
                <TouchableOpacity key={q} style={styles.quickBtn} onPress={() => { setInput(q); }}>
                  <Text style={styles.quickBtnText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Input */}
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Ask AyurBot..."
                placeholderTextColor={COLORS.textLight}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
                <LinearGradient colors={COLORS.gradient.saffron} style={styles.sendGradient}>
                  <Text style={styles.sendIcon}>➤</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute', bottom: 80, right: 20, zIndex: 100,
    ...SHADOWS.large,
  },
  fabGradient: {
    width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center',
  },
  fabIcon: { fontSize: 28 },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  chatContainer: {
    flex: 1, marginTop: 60, backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden',
  },
  chatHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  chatHeaderContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  botAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF40', alignItems: 'center', justifyContent: 'center' },
  botAvatarText: { fontSize: 22 },
  chatTitle: { fontSize: 18, fontWeight: '700', color: '#FFF' },
  chatSubtitle: { fontSize: 12, color: '#FFFFFFCC' },
  closeBtn: { padding: 8 },
  closeBtnText: { fontSize: 20, color: '#FFF', fontWeight: '700' },
  messageList: { flex: 1, paddingHorizontal: 16, paddingVertical: 12 },
  msgRow: { marginBottom: 12, alignItems: 'flex-start' },
  msgRowUser: { alignItems: 'flex-end' },
  msgBubble: { maxWidth: '80%', padding: 12, borderRadius: 16 },
  msgBot: { backgroundColor: COLORS.background, borderBottomLeftRadius: 4 },
  msgUser: { backgroundColor: COLORS.primary, borderBottomRightRadius: 4 },
  msgText: { fontSize: 14, color: COLORS.text, lineHeight: 20 },
  msgTextUser: { color: '#FFF' },
  quickActions: { paddingHorizontal: 12, paddingVertical: 8, borderTopWidth: 0.5, borderTopColor: COLORS.border },
  quickBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, backgroundColor: COLORS.background, marginRight: 8 },
  quickBtnText: { fontSize: 12, fontWeight: '600', color: COLORS.primary },
  inputRow: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 10, gap: 8, borderTopWidth: 1, borderTopColor: COLORS.border },
  input: { flex: 1, backgroundColor: COLORS.background, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14 },
  sendBtn: { ...SHADOWS.small },
  sendGradient: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  sendIcon: { fontSize: 18, color: '#FFF' },
});

export default ChatBot;
