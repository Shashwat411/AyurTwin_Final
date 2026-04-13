import { supabase } from '../config/supabase';
import {
  generateSimulatedVitals,
  generateDiseaseRisks,
  calculateHealthScore,
  detectDoshaImbalance,
  generateRecommendations,
  generateAlerts,
} from '../utils/healthCalculations';

// =====================================================
// AUTH SERVICE
// =====================================================
export const registerUser = async (userData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        username: userData.username,
        email: userData.email,
        password_hash: userData.password, // In production: hash this server-side
        user_type: userData.user_type,
        first_name: userData.first_name,
        middle_name: userData.middle_name,
        last_name: userData.last_name,
        phone: userData.phone,
        date_of_birth: userData.date_of_birth,
        age: userData.age,
        gender: userData.gender,
        blood_group: userData.blood_group,
        height_cm: userData.height_cm,
        weight_kg: userData.weight_kg,
        bmi: userData.bmi,
        bmi_category: userData.bmi_category,
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loginUser = async (emailOrUsername, password) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`email.eq.${emailOrUsername},username.eq.${emailOrUsername}`)
      .eq('password_hash', password)
      .single();

    if (error || !data) throw new Error('Invalid credentials');
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// =====================================================
// HEALTH DATA SERVICE
// =====================================================
export const saveLifestyleData = async (userId, data) => {
  try {
    const { error } = await supabase
      .from('lifestyle_data')
      .upsert([{ user_id: userId, ...data }], { onConflict: 'user_id' });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const saveSleepMentalData = async (userId, data) => {
  try {
    const { error } = await supabase
      .from('sleep_mental_data')
      .upsert([{ user_id: userId, ...data }], { onConflict: 'user_id' });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const saveFamilyHistory = async (userId, data) => {
  try {
    const { error } = await supabase
      .from('family_history')
      .upsert([{ user_id: userId, ...data }], { onConflict: 'user_id' });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const saveSymptoms = async (userId, data) => {
  try {
    const { error } = await supabase
      .from('symptoms')
      .upsert([{ user_id: userId, ...data }], { onConflict: 'user_id' });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const saveAyurvedicInputs = async (userId, data) => {
  try {
    const { error } = await supabase
      .from('ayurvedic_inputs')
      .upsert([{ user_id: userId, ...data }], { onConflict: 'user_id' });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const savePrakritiQuiz = async (userId, quizResult) => {
  try {
    const { error } = await supabase
      .from('prakriti_quiz')
      .insert([{ user_id: userId, ...quizResult }]);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// =====================================================
// DASHBOARD DATA SERVICE (Simulated)
// =====================================================
export const getDashboardData = async (userId, userProfile) => {
  try {
    const vitals = generateSimulatedVitals(userProfile);
    const risks = generateDiseaseRisks(userProfile);
    const healthScore = calculateHealthScore(userProfile);
    const doshaBalance = detectDoshaImbalance(userProfile?.prakriti_data, userProfile);
    const recommendations = generateRecommendations(userProfile?.prakriti_data, risks, healthScore);
    const alerts = generateAlerts(vitals, risks, doshaBalance);

    return {
      success: true,
      data: { vitals, risks, healthScore, doshaBalance, recommendations, alerts },
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// =====================================================
// FAMILY SERVICE
// =====================================================
export const sendFamilyInvite = async (patientId, email) => {
  try {
    const { data: familyUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (!familyUser) throw new Error('User not found');

    const { error } = await supabase
      .from('family_connections')
      .insert([{ patient_id: patientId, family_member_id: familyUser.id, status: 'pending' }]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const acceptFamilyInvite = async (connectionId) => {
  try {
    const { error } = await supabase
      .from('family_connections')
      .update({ status: 'accepted' })
      .eq('id', connectionId);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getFamilyMembers = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('family_connections')
      .select('*, patient:patient_id(id, first_name, last_name, email), family_member:family_member_id(id, first_name, last_name, email)')
      .or(`patient_id.eq.${userId},family_member_id.eq.${userId}`)
      .eq('status', 'accepted');

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// =====================================================
// SOCIAL SERVICE
// =====================================================
export const createPost = async (userId, content, postType) => {
  try {
    const { data, error } = await supabase
      .from('social_posts')
      .insert([{ user_id: userId, content, post_type: postType }])
      .select()
      .single();
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getSocialFeed = async () => {
  try {
    const { data, error } = await supabase
      .from('social_posts')
      .select('*, user:user_id(first_name, last_name, username)')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const likePost = async (postId, userId) => {
  try {
    const { error } = await supabase
      .from('social_likes')
      .insert([{ post_id: postId, user_id: userId }]);
    if (error) throw error;

    await supabase.rpc('increment_likes', { post_id: postId });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// =====================================================
// LEADERBOARD SERVICE
// =====================================================
export const getLeaderboard = async () => {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*, user:user_id(first_name, last_name, username)')
      .order('total_score', { ascending: false })
      .limit(50);
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// =====================================================
// DINACHARYA SERVICE
// =====================================================
export const saveDinacharya = async (userId, date, data) => {
  try {
    const { error } = await supabase
      .from('dinacharya_tracking')
      .upsert([{ user_id: userId, date, ...data }], { onConflict: 'user_id,date' });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// =====================================================
// MEAL TRACKING SERVICE
// =====================================================
export const saveMeal = async (userId, mealData) => {
  try {
    const { data, error } = await supabase
      .from('meal_tracking')
      .insert([{ user_id: userId, ...mealData }])
      .select()
      .single();
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// =====================================================
// CHATBOT SERVICE
// =====================================================
export const saveChatMessage = async (userId, message, sender) => {
  try {
    const { error } = await supabase
      .from('chatbot_conversations')
      .insert([{ user_id: userId, message, sender }]);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
