// =====================================================
// HEALTH CALCULATION UTILITIES
// Simulated data generators + Rule-based logic
// In next phase: integrate with ML prediction engine
// =====================================================

export const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm) return { value: 0, category: 'unknown' };
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let category = 'normal';
  if (bmi < 18.5) category = 'underweight';
  else if (bmi < 25) category = 'normal';
  else if (bmi < 30) category = 'overweight';
  else category = 'obese';
  return { value: parseFloat(bmi.toFixed(1)), category };
};

export const generateSimulatedVitals = (userProfile) => {
  const stressLevel = userProfile?.stress_level || 5;
  const activityLevel = userProfile?.physical_activity === 'high' ? 3 : userProfile?.physical_activity === 'moderate' ? 2 : 1;
  const bmi = userProfile?.bmi || 22;

  const baseHR = 72;
  const hrVariation = (stressLevel - 5) * 3 + (3 - activityLevel) * 2;
  const heartRate = Math.max(60, Math.min(100, baseHR + hrVariation + Math.floor(Math.random() * 6 - 3)));

  const baseTemp = 36.6;
  const tempVariation = (stressLevel > 7 ? 0.3 : 0) + (Math.random() * 0.4 - 0.2);
  const temperature = parseFloat((baseTemp + tempVariation).toFixed(1));

  const baseSpo2 = 98;
  const spo2Variation = stressLevel > 7 ? -2 : 0;
  const spo2 = Math.max(95, Math.min(100, baseSpo2 + spo2Variation + Math.floor(Math.random() * 2)));

  const stressIndex = Math.min(100, stressLevel * 10 + Math.floor(Math.random() * 10));

  return { heartRate, temperature, spo2, stressIndex };
};

export const generateDiseaseRisks = (userProfile) => {
  const bmi = userProfile?.bmi || 22;
  const stressLevel = userProfile?.stress_level || 5;
  const sleepHours = userProfile?.sleep_duration_hours || 7;
  const familyHistory = userProfile?.family_history || {};
  const smoking = userProfile?.smoking || false;
  const alcohol = userProfile?.alcohol || false;
  const activityLevel = userProfile?.physical_activity === 'high' ? 0.7 : userProfile?.physical_activity === 'moderate' ? 0.85 : 1.0;
  const fatigueLevel = userProfile?.fatigue_level || 5;

  const clamp = (v) => Math.max(5, Math.min(95, Math.round(v)));

  let diabetesRisk = 20 + (bmi > 25 ? (bmi - 25) * 4 : 0) + (familyHistory.diabetes ? 20 : 0) + (stressLevel > 7 ? 10 : 0);
  let hypertensionRisk = 15 + (bmi > 25 ? (bmi - 25) * 3 : 0) + (stressLevel * 3) + (familyHistory.hypertension ? 15 : 0) + (smoking ? 10 : 0);
  let heartDiseaseRisk = 10 + (bmi > 30 ? 20 : bmi > 25 ? 10 : 0) + (familyHistory.heart_disease ? 20 : 0) + (smoking ? 15 : 0) + (alcohol ? 5 : 0);
  let stressRisk = stressLevel * 10 + (sleepHours < 6 ? 15 : 0);
  let sleepDisorderRisk = (10 - sleepHours) * 8 + stressLevel * 3 + (fatigueLevel * 3);
  let asthmaRisk = 10 + (familyHistory.asthma ? 30 : 0) + (smoking ? 20 : 0);
  let arthritisRisk = 10 + (familyHistory.arthritis ? 25 : 0) + (bmi > 30 ? 15 : 0);
  let obesityRisk = bmi > 30 ? 80 : bmi > 25 ? 50 : bmi > 23 ? 30 : 10;
  let digestiveRisk = 20 + (stressLevel > 6 ? 15 : 0) + (userProfile?.digestive_issues ? 25 : 0);
  let feverRisk = 10 + (stressLevel > 8 ? 10 : 0) + (sleepHours < 5 ? 10 : 0);

  // Apply activity modifier
  diabetesRisk *= activityLevel;
  hypertensionRisk *= activityLevel;
  heartDiseaseRisk *= activityLevel;

  return {
    diabetes: clamp(diabetesRisk),
    hypertension: clamp(hypertensionRisk),
    heart_disease: clamp(heartDiseaseRisk),
    stress: clamp(stressRisk),
    sleep_disorder: clamp(sleepDisorderRisk),
    asthma: clamp(asthmaRisk),
    arthritis: clamp(arthritisRisk),
    obesity: clamp(obesityRisk),
    digestive_disorder: clamp(digestiveRisk),
    fever: clamp(feverRisk),
  };
};

export const calculateHealthScore = (userProfile) => {
  let score = 100;
  const bmi = userProfile?.bmi || 22;
  const stressLevel = userProfile?.stress_level || 5;
  const sleepHours = userProfile?.sleep_duration_hours || 7;
  const activityLevel = userProfile?.physical_activity || 'moderate';
  const smoking = userProfile?.smoking || false;
  const alcohol = userProfile?.alcohol || false;

  // BMI penalty
  if (bmi < 18.5) score -= 10;
  else if (bmi > 25 && bmi <= 30) score -= 15;
  else if (bmi > 30) score -= 25;

  // Stress penalty
  score -= stressLevel * 2;

  // Sleep penalty
  if (sleepHours < 6) score -= 15;
  else if (sleepHours < 7) score -= 5;

  // Activity bonus
  if (activityLevel === 'high') score += 5;
  else if (activityLevel === 'low') score -= 10;

  // Habits penalty
  if (smoking) score -= 15;
  if (alcohol) score -= 5;

  return Math.max(10, Math.min(100, Math.round(score)));
};

export const detectDoshaImbalance = (prakritiData, currentState) => {
  const stressLevel = currentState?.stress_level || 5;
  const sleepHours = currentState?.sleep_duration_hours || 7;
  const digestion = currentState?.digestion_strength || 5;
  const activity = currentState?.physical_activity || 'moderate';

  let vataImbalance = 0;
  let pittaImbalance = 0;
  let kaphaImbalance = 0;

  // Vata imbalance: stress, poor sleep, anxiety
  if (stressLevel > 6) vataImbalance += 20;
  if (sleepHours < 6) vataImbalance += 15;
  if (currentState?.anxiety_level > 6) vataImbalance += 15;

  // Pitta imbalance: heat, anger, digestion issues
  if (currentState?.body_temperature === 'hot') pittaImbalance += 15;
  if (currentState?.stress_response === 'irritable') pittaImbalance += 20;
  if (digestion > 7) pittaImbalance += 10;

  // Kapha imbalance: sluggishness, weight, low activity
  if (activity === 'low') kaphaImbalance += 20;
  if (currentState?.bmi > 25) kaphaImbalance += 15;
  if (currentState?.daytime_sleepiness > 6) kaphaImbalance += 15;

  return {
    vata: Math.min(100, (prakritiData?.vata_percent || 33) + vataImbalance),
    pitta: Math.min(100, (prakritiData?.pitta_percent || 33) + pittaImbalance),
    kapha: Math.min(100, (prakritiData?.kapha_percent || 33) + kaphaImbalance),
    imbalanceDetected: vataImbalance > 20 || pittaImbalance > 20 || kaphaImbalance > 20,
    dominantImbalance: vataImbalance >= pittaImbalance && vataImbalance >= kaphaImbalance ? 'vata' :
                       pittaImbalance >= kaphaImbalance ? 'pitta' : 'kapha',
  };
};

export const generateRecommendations = (prakriti, risks, healthScore) => {
  const recommendations = [];
  const dominantDosha = prakriti?.prakriti?.toLowerCase() || 'vata';

  // Dosha-based recommendations
  if (dominantDosha.includes('vata')) {
    recommendations.push({ type: 'ayurvedic', title: 'Warm & Grounding Diet', description: 'Include warm soups, cooked vegetables, and ghee. Avoid cold, raw foods.', priority: 1 });
    recommendations.push({ type: 'lifestyle', title: 'Regular Routine', description: 'Maintain consistent sleep/wake times. Practice grounding yoga poses.', priority: 2 });
  }
  if (dominantDosha.includes('pitta')) {
    recommendations.push({ type: 'ayurvedic', title: 'Cooling Diet', description: 'Include cucumbers, coconut water, mint. Avoid spicy, fried foods.', priority: 1 });
    recommendations.push({ type: 'lifestyle', title: 'Stress Management', description: 'Practice moon salutations and cooling pranayama (Sheetali).', priority: 2 });
  }
  if (dominantDosha.includes('kapha')) {
    recommendations.push({ type: 'ayurvedic', title: 'Light & Stimulating Diet', description: 'Include spices like ginger, turmeric. Avoid heavy, oily foods.', priority: 1 });
    recommendations.push({ type: 'exercise', title: 'Active Exercise', description: 'Engage in vigorous exercise daily — brisk walking, jogging, or dancing.', priority: 1 });
  }

  // Risk-based recommendations
  if (risks?.diabetes > 60) {
    recommendations.push({ type: 'diet', title: 'Low Glycemic Diet', description: 'Reduce sugar, refined carbs. Include whole grains, leafy vegetables.', priority: 1 });
  }
  if (risks?.heart_disease > 50) {
    recommendations.push({ type: 'exercise', title: 'Cardio Exercise', description: '30 min moderate cardio 5 days/week. Walking, cycling, or swimming.', priority: 1 });
  }
  if (risks?.stress > 60) {
    recommendations.push({ type: 'lifestyle', title: 'Meditation & Breathing', description: 'Practice 10-min daily meditation. Try Anulom Vilom pranayama.', priority: 1 });
  }
  if (risks?.sleep_disorder > 50) {
    recommendations.push({ type: 'lifestyle', title: 'Sleep Hygiene', description: 'No screens 1hr before bed. Warm milk with turmeric before sleep.', priority: 1 });
  }

  // Health score based
  if (healthScore < 50) {
    recommendations.push({ type: 'medical', title: 'Health Checkup Recommended', description: 'Your health score is low. Consider a comprehensive health checkup.', priority: 1 });
  }

  return recommendations;
};

export const generateAlerts = (vitals, risks, doshaBalance) => {
  const alerts = [];

  if (vitals?.stressIndex > 70) {
    alerts.push({ type: 'critical', category: 'stress', title: 'High Stress Detected', message: `Your stress index is ${vitals.stressIndex}. Take a break and practice deep breathing.` });
  }
  if (vitals?.heartRate > 90) {
    alerts.push({ type: 'warning', category: 'vitals', title: 'Elevated Heart Rate', message: `Heart rate: ${vitals.heartRate} bpm. Rest and hydrate.` });
  }
  if (vitals?.spo2 < 96) {
    alerts.push({ type: 'critical', category: 'vitals', title: 'Low SpO2 Level', message: `SpO2: ${vitals.spo2}%. Practice deep breathing exercises.` });
  }
  if (risks?.diabetes > 70) {
    alerts.push({ type: 'warning', category: 'risk', title: 'High Diabetes Risk', message: `Your diabetes risk is ${risks.diabetes}%. Monitor sugar intake closely.` });
  }
  if (risks?.stress > 70) {
    alerts.push({ type: 'warning', category: 'stress', title: 'Chronic Stress Risk', message: `Stress risk at ${risks.stress}%. Consider lifestyle changes.` });
  }
  if (doshaBalance?.imbalanceDetected) {
    const dosha = doshaBalance.dominantImbalance;
    alerts.push({ type: 'info', category: 'dosha', title: `${dosha.charAt(0).toUpperCase() + dosha.slice(1)} Imbalance`, message: `Your ${dosha} dosha shows imbalance. Follow ${dosha}-balancing routines.` });
  }

  return alerts;
};

export const calculateCalories = (age, heightCm, weightKg, gender, activityLevel) => {
  // Harris-Benedict Equation
  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
  }

  const multipliers = { low: 1.375, moderate: 1.55, high: 1.725 };
  const tdee = bmr * (multipliers[activityLevel] || 1.55);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    forWeightLoss: Math.round(tdee - 500),
    forWeightGain: Math.round(tdee + 500),
  };
};

export const getSeasonalAdvice = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) {
    return { season: 'Vasanta (Spring)', advice: 'Kapha accumulates in spring. Eat light, warm foods. Increase exercise. Use honey and ginger.', dosha: 'kapha' };
  } else if (month >= 5 && month <= 6) {
    return { season: 'Grishma (Summer)', advice: 'Pitta increases in summer. Eat cooling foods — cucumber, coconut water, mint. Avoid excessive heat.', dosha: 'pitta' };
  } else if (month >= 7 && month <= 8) {
    return { season: 'Varsha (Monsoon)', advice: 'Vata aggravates in monsoon. Eat warm, cooked foods. Avoid raw salads. Use sesame oil.', dosha: 'vata' };
  } else if (month >= 9 && month <= 10) {
    return { season: 'Sharad (Autumn)', advice: 'Pitta releases in autumn. Eat sweet, bitter foods. Practice cooling pranayama.', dosha: 'pitta' };
  } else {
    return { season: 'Hemanta (Winter)', advice: 'Strengthen digestion in winter. Eat nourishing, warm, oily foods. Exercise regularly.', dosha: 'kapha' };
  }
};

export const generateTimelineData = (hours = 24) => {
  const data = [];
  for (let i = 0; i < hours; i++) {
    data.push({
      hour: i,
      label: `${i}:00`,
      heartRate: 65 + Math.floor(Math.random() * 25),
      stress: 30 + Math.floor(Math.random() * 40),
      spo2: 95 + Math.floor(Math.random() * 5),
      temp: 36.3 + Math.random() * 0.8,
    });
  }
  return data;
};
