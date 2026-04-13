const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client — replace with your credentials
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'YOUR_ANON_KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// =====================================================
// HEALTH CHECK
// =====================================================
app.get('/', (req, res) => {
  res.json({ message: 'AyurTwin API Server is running', version: '1.0.0' });
});

// =====================================================
// AUTH ROUTES
// =====================================================

// POST /register
app.post('/register', async (req, res) => {
  try {
    const {
      user_type, username, email, password,
      first_name, middle_name, last_name, phone,
      date_of_birth, age, gender, blood_group,
      height_cm, weight_kg, bmi, bmi_category,
    } = req.body;

    const { data, error } = await supabase
      .from('users')
      .insert([{
        user_type, username, email, password_hash: password,
        first_name, middle_name, last_name, phone,
        date_of_birth, age, gender, blood_group,
        height_cm, weight_kg, bmi, bmi_category,
      }])
      .select()
      .single();

    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`email.eq.${email},username.eq.${email}`)
      .eq('password_hash', password)
      .single();

    if (error || !data) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =====================================================
// HEALTH DATA ROUTES
// =====================================================

// POST /health/lifestyle
app.post('/health/lifestyle', async (req, res) => {
  try {
    const { user_id, ...data } = req.body;
    const { error } = await supabase
      .from('lifestyle_data')
      .upsert([{ user_id, ...data }]);
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /health/sleep-mental
app.post('/health/sleep-mental', async (req, res) => {
  try {
    const { user_id, ...data } = req.body;
    const { error } = await supabase
      .from('sleep_mental_data')
      .upsert([{ user_id, ...data }]);
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /health/family-history
app.post('/health/family-history', async (req, res) => {
  try {
    const { user_id, ...data } = req.body;
    const { error } = await supabase
      .from('family_history')
      .upsert([{ user_id, ...data }]);
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /health/symptoms
app.post('/health/symptoms', async (req, res) => {
  try {
    const { user_id, ...data } = req.body;
    const { error } = await supabase
      .from('symptoms')
      .upsert([{ user_id, ...data }]);
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /health/ayurvedic
app.post('/health/ayurvedic', async (req, res) => {
  try {
    const { user_id, ...data } = req.body;
    const { error } = await supabase
      .from('ayurvedic_inputs')
      .upsert([{ user_id, ...data }]);
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =====================================================
// PRAKRITI QUIZ
// =====================================================

// POST /prakriti/submit
app.post('/prakriti/submit', async (req, res) => {
  try {
    const { user_id, answers } = req.body;

    // Calculate scores
    let vata = 0, pitta = 0, kapha = 0;
    answers.forEach((answer) => {
      if (answer === 'a') vata++;
      else if (answer === 'b') pitta++;
      else if (answer === 'c') kapha++;
    });

    const total = vata + pitta + kapha;
    const vata_percent = parseFloat(((vata / total) * 100).toFixed(1));
    const pitta_percent = parseFloat(((pitta / total) * 100).toFixed(1));
    const kapha_percent = parseFloat(((kapha / total) * 100).toFixed(1));

    // Determine prakriti
    const scores = { Vata: vata_percent, Pitta: pitta_percent, Kapha: kapha_percent };
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const diff1_2 = sorted[0][1] - sorted[1][1];
    const diff2_3 = sorted[1][1] - sorted[2][1];

    let prakriti;
    if (diff1_2 < 5 && diff2_3 < 5) prakriti = 'Tridosha';
    else if (diff1_2 < 10) prakriti = `${sorted[0][0]}-${sorted[1][0]}`;
    else prakriti = sorted[0][0];

    const quizResult = {
      user_id, answers: JSON.stringify(answers),
      vata_score: vata, pitta_score: pitta, kapha_score: kapha,
      vata_percent, pitta_percent, kapha_percent, prakriti,
    };

    const { error } = await supabase.from('prakriti_quiz').insert([quizResult]);
    if (error) return res.status(400).json({ success: false, error: error.message });

    res.json({
      success: true,
      data: { vata: vata_percent, pitta: pitta_percent, kapha: kapha_percent, prakriti },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =====================================================
// DASHBOARD DATA (Simulated)
// =====================================================

// GET /dashboard/:userId
app.get('/dashboard/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user data
    const { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
    const { data: lifestyle } = await supabase.from('lifestyle_data').select('*').eq('user_id', userId).single();
    const { data: sleep } = await supabase.from('sleep_mental_data').select('*').eq('user_id', userId).single();
    const { data: familyHistory } = await supabase.from('family_history').select('*').eq('user_id', userId).single();
    const { data: prakriti } = await supabase.from('prakriti_quiz').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(1).single();

    // Generate simulated vitals
    const stressLevel = sleep?.stress_level || 5;
    const bmi = user?.bmi || 22;

    const vitals = {
      heartRate: Math.max(60, Math.min(100, 72 + (stressLevel - 5) * 3 + Math.floor(Math.random() * 6 - 3))),
      temperature: parseFloat((36.6 + (stressLevel > 7 ? 0.3 : 0) + (Math.random() * 0.4 - 0.2)).toFixed(1)),
      spo2: Math.max(95, Math.min(100, 98 + Math.floor(Math.random() * 2))),
      stressIndex: Math.min(100, stressLevel * 10 + Math.floor(Math.random() * 10)),
    };

    // Generate disease risks (simplified)
    const risks = {
      diabetes: Math.min(95, 20 + (bmi > 25 ? (bmi - 25) * 4 : 0) + (familyHistory?.diabetes ? 20 : 0)),
      hypertension: Math.min(95, 15 + (bmi > 25 ? (bmi - 25) * 3 : 0) + (stressLevel * 3)),
      heart_disease: Math.min(95, 10 + (bmi > 30 ? 20 : 0) + (familyHistory?.heart_disease ? 20 : 0)),
      stress: Math.min(95, stressLevel * 10),
      sleep_disorder: Math.min(95, ((sleep?.sleep_duration_hours || 7) < 6 ? 40 : 10) + stressLevel * 3),
    };

    // Health score
    let healthScore = 100;
    if (bmi < 18.5 || bmi > 25) healthScore -= 15;
    healthScore -= stressLevel * 2;
    if ((sleep?.sleep_duration_hours || 7) < 6) healthScore -= 15;
    healthScore = Math.max(10, Math.min(100, Math.round(healthScore)));

    res.json({
      success: true,
      data: { user, lifestyle, sleep, familyHistory, prakriti, vitals, risks, healthScore },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =====================================================
// FAMILY CONNECTIONS
// =====================================================

// POST /family/invite
app.post('/family/invite', async (req, res) => {
  try {
    const { patient_id, email } = req.body;
    const { data: familyUser } = await supabase.from('users').select('id').eq('email', email).single();
    if (!familyUser) return res.status(404).json({ success: false, error: 'User not found' });

    const { error } = await supabase.from('family_connections')
      .insert([{ patient_id, family_member_id: familyUser.id, status: 'pending' }]);
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /family/accept
app.post('/family/accept', async (req, res) => {
  try {
    const { connection_id } = req.body;
    const { error } = await supabase.from('family_connections')
      .update({ status: 'accepted' }).eq('id', connection_id);
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /family/:userId
app.get('/family/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { data, error } = await supabase.from('family_connections')
      .select('*, patient:patient_id(id, first_name, last_name), family_member:family_member_id(id, first_name, last_name)')
      .or(`patient_id.eq.${userId},family_member_id.eq.${userId}`)
      .eq('status', 'accepted');
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =====================================================
// SOCIAL
// =====================================================

// GET /social/feed
app.get('/social/feed', async (req, res) => {
  try {
    const { data, error } = await supabase.from('social_posts')
      .select('*, user:user_id(first_name, last_name, username)')
      .order('created_at', { ascending: false }).limit(50);
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /social/post
app.post('/social/post', async (req, res) => {
  try {
    const { user_id, content, post_type } = req.body;
    const { data, error } = await supabase.from('social_posts')
      .insert([{ user_id, content, post_type }]).select().single();
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /social/like
app.post('/social/like', async (req, res) => {
  try {
    const { post_id, user_id } = req.body;
    const { error } = await supabase.from('social_likes').insert([{ post_id, user_id }]);
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =====================================================
// LEADERBOARD
// =====================================================

// GET /leaderboard
app.get('/leaderboard', async (req, res) => {
  try {
    const { data, error } = await supabase.from('leaderboard')
      .select('*, user:user_id(first_name, last_name, username)')
      .order('total_score', { ascending: false }).limit(50);
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =====================================================
// DINACHARYA & MEALS
// =====================================================

// POST /dinacharya
app.post('/dinacharya', async (req, res) => {
  try {
    const { user_id, date, ...data } = req.body;
    const { error } = await supabase.from('dinacharya_tracking')
      .upsert([{ user_id, date, ...data }]);
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /meals
app.post('/meals', async (req, res) => {
  try {
    const { user_id, ...data } = req.body;
    const { data: meal, error } = await supabase.from('meal_tracking')
      .insert([{ user_id, ...data }]).select().single();
    if (error) return res.status(400).json({ success: false, error: error.message });
    res.json({ success: true, data: meal });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =====================================================
// CHATBOT
// =====================================================

// POST /chat
app.post('/chat', async (req, res) => {
  try {
    const { user_id, message } = req.body;
    // Save user message
    await supabase.from('chatbot_conversations').insert([{ user_id, message, sender: 'user' }]);

    // Basic bot response (rule-based)
    const msg = message.toLowerCase();
    let response = "I can help you with dosha analysis, diet tips, stress management, and health questions. Try asking about your dosha, stress, sleep, or diet!";

    if (msg.includes('stress')) response = "For stress relief: 1) Deep breathing (Anulom Vilom) 2) Warm Ashwagandha milk 3) Gentle yoga 4) Reduce screen time 5) Journal your thoughts";
    else if (msg.includes('sleep')) response = "For better sleep: 1) Consistent schedule 2) Warm turmeric milk 3) No screens 1hr before bed 4) Practice Yoga Nidra 5) Keep room cool and dark";
    else if (msg.includes('diet') || msg.includes('food')) response = "Eat according to your dosha. Vata: warm foods. Pitta: cooling foods. Kapha: light, spicy foods. Always eat fresh, seasonal, and mindfully.";
    else if (msg.includes('dosha') || msg.includes('prakriti')) response = "Your dosha (Vata, Pitta, Kapha) determines your body constitution. Take the Prakriti Quiz to determine yours!";
    else if (msg.includes('hello') || msg.includes('hi')) response = "Namaste! I'm AyurBot. How can I help you with your health today?";

    // Save bot response
    await supabase.from('chatbot_conversations').insert([{ user_id, message: response, sender: 'bot' }]);

    res.json({ success: true, response });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// =====================================================
// START SERVER
// =====================================================
app.listen(PORT, () => {
  console.log(`AyurTwin API Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}`);
  console.log('\nNote: Replace SUPABASE_URL and SUPABASE_KEY with your credentials.');
  console.log('In the next phase, this system will be integrated with ML prediction and recommendation engine.');
  console.log('Currently, realistic simulated data and rule-based logic is used.');
});
