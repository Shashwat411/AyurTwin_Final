// =====================================================
// AYURBOT - Rule-based chatbot logic
// In next phase: integrate with NLP/AI model
// =====================================================

const doshaInfo = {
  vata: {
    description: 'Vata dosha governs movement, breathing, and nervous system. People with dominant Vata tend to be creative, quick-thinking, and energetic but may experience anxiety and dryness.',
    balancing: 'Warm, cooked foods. Regular routine. Oil massage (Abhyanga). Avoid cold, dry, raw foods. Practice grounding exercises.',
    foods: 'Warm soups, ghee, cooked grains, sweet fruits, nuts, sesame oil',
    avoid: 'Cold drinks, raw salads, dry crackers, caffeine excess',
  },
  pitta: {
    description: 'Pitta dosha governs digestion, metabolism, and transformation. Pitta-dominant people are intelligent, determined, and strong but may experience anger and inflammation.',
    balancing: 'Cooling foods. Avoid excessive heat. Practice calming activities. Use coconut oil. Eat at regular times.',
    foods: 'Cucumber, coconut water, sweet fruits, leafy greens, mint, basmati rice',
    avoid: 'Spicy food, fried food, alcohol, excessive sun, fermented foods',
  },
  kapha: {
    description: 'Kapha dosha governs structure, lubrication, and stability. Kapha-dominant people are calm, loving, and strong but may experience sluggishness and weight gain.',
    balancing: 'Light, warm, spicy foods. Regular vigorous exercise. Avoid daytime sleeping. Stay active and stimulated.',
    foods: 'Ginger, turmeric, light grains, steamed vegetables, honey, legumes',
    avoid: 'Heavy dairy, sweets, cold food, excessive oil, wheat, red meat',
  },
};

const healthKeywords = {
  stress: 'For stress relief, try: 1) Deep breathing (Anulom Vilom) for 5 minutes 2) Warm Ashwagandha milk before bed 3) Gentle yoga or walking 4) Reducing screen time 5) Journaling your thoughts',
  sleep: 'For better sleep: 1) Follow consistent sleep schedule 2) Warm turmeric milk 30 min before bed 3) Avoid screens 1 hour before sleep 4) Practice Yoga Nidra 5) Keep room cool and dark',
  digestion: 'For better digestion: 1) Eat warm, cooked foods 2) Drink warm water with lemon 3) Include ginger and cumin in meals 4) Eat mindfully without distractions 5) Walk 100 steps after meals',
  weight: 'For healthy weight management: 1) Eat according to your dosha 2) Regular exercise (30 min daily) 3) Avoid processed foods 4) Practice portion control 5) Stay hydrated with warm water',
  anxiety: 'For anxiety management: 1) Practice Bhramari pranayama 2) Warm sesame oil foot massage before bed 3) Include Brahmi and Shankhapushpi 4) Regular meditation 5) Connect with nature',
  fatigue: 'For fatigue: 1) Check your sleep quality 2) Include iron-rich foods 3) Ashwagandha supplement (consult doctor) 4) Light exercise to boost energy 5) Ensure adequate hydration',
  immunity: 'To boost immunity: 1) Chyawanprash daily 2) Turmeric and black pepper in warm milk 3) Tulsi tea 4) Regular exercise 5) Adequate sleep (7-8 hours)',
  headache: 'For headaches: 1) Apply peppermint oil on temples 2) Stay hydrated 3) Practice Sheetali pranayama 4) Rest in a dark room 5) Gentle neck stretches',
  diabetes: 'For diabetes risk reduction: 1) Reduce sugar and refined carbs 2) Include bitter gourd, fenugreek 3) Regular exercise 4) Maintain healthy weight 5) Monitor blood sugar regularly',
  heart: 'For heart health: 1) Regular cardio exercise 2) Include Arjuna bark tea 3) Reduce salt and saturated fats 4) Manage stress 5) Eat more fruits and vegetables',
};

const greetings = [
  "Namaste! I'm AyurBot, your Ayurvedic health companion. How can I help you today?",
  "Welcome! I'm here to help you with health questions and Ayurvedic guidance. What would you like to know?",
  "Hello! I'm AyurBot. Ask me about your dosha, health tips, or any wellness concerns!",
];

export const getAyurBotResponse = (userMessage, userProfile) => {
  const message = userMessage.toLowerCase().trim();

  // Greetings
  if (['hi', 'hello', 'hey', 'namaste', 'hii', 'hola'].some(g => message.includes(g))) {
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // Dosha queries
  if (message.includes('dosha') || message.includes('prakriti')) {
    if (message.includes('vata')) return `${doshaInfo.vata.description}\n\nBalancing tips: ${doshaInfo.vata.balancing}\n\nRecommended foods: ${doshaInfo.vata.foods}`;
    if (message.includes('pitta')) return `${doshaInfo.pitta.description}\n\nBalancing tips: ${doshaInfo.pitta.balancing}\n\nRecommended foods: ${doshaInfo.pitta.foods}`;
    if (message.includes('kapha')) return `${doshaInfo.kapha.description}\n\nBalancing tips: ${doshaInfo.kapha.balancing}\n\nRecommended foods: ${doshaInfo.kapha.foods}`;

    const userDosha = userProfile?.prakriti?.toLowerCase() || 'vata';
    const primary = userDosha.split('-')[0] || 'vata';
    return `Your dominant dosha is ${userProfile?.prakriti || 'Unknown'}.\n\n${doshaInfo[primary]?.description}\n\nBalancing tips: ${doshaInfo[primary]?.balancing}`;
  }

  // My dosha / my prakriti
  if (message.includes('my dosha') || message.includes('my prakriti') || message.includes('what am i')) {
    return `Based on your Prakriti quiz, your constitution is: ${userProfile?.prakriti || 'Not yet determined'}.\n\nVata: ${userProfile?.vata_percent || '?'}%\nPitta: ${userProfile?.pitta_percent || '?'}%\nKapha: ${userProfile?.kapha_percent || '?'}%`;
  }

  // Health keywords
  for (const [keyword, response] of Object.entries(healthKeywords)) {
    if (message.includes(keyword)) return response;
  }

  // Diet query
  if (message.includes('diet') || message.includes('food') || message.includes('eat')) {
    const dosha = userProfile?.prakriti?.toLowerCase()?.split('-')[0] || 'vata';
    return `Based on your ${userProfile?.prakriti || 'Vata'} constitution:\n\nRecommended: ${doshaInfo[dosha]?.foods}\n\nAvoid: ${doshaInfo[dosha]?.avoid}`;
  }

  // Exercise
  if (message.includes('exercise') || message.includes('yoga') || message.includes('workout')) {
    return 'Exercise recommendations:\n\nVata: Gentle yoga, walking, swimming (moderate pace)\nPitta: Swimming, cycling, moonlight walks (cooling exercises)\nKapha: Running, HIIT, vigorous yoga (stimulating exercises)\n\nAim for 30-45 minutes daily. Listen to your body and adjust intensity.';
  }

  // Health score
  if (message.includes('health score') || message.includes('my health') || message.includes('how am i')) {
    return `Your current health score is ${userProfile?.healthScore || 'being calculated'}.\n\nThis score is based on your BMI, stress levels, sleep quality, activity, and lifestyle habits. Keep following your personalized recommendations to improve!`;
  }

  // Risk
  if (message.includes('risk') || message.includes('prediction') || message.includes('disease')) {
    return 'Your disease risk predictions are based on your health profile, lifestyle, and family history. Check the Dashboard for detailed risk percentages.\n\nRemember: These are risk indicators, not diagnoses. Consult a healthcare professional for medical advice.';
  }

  // Ayurveda basics
  if (message.includes('ayurveda') || message.includes('what is')) {
    return 'Ayurveda is a 5000-year-old Indian system of natural healing. It focuses on:\n\n1. Three Doshas (Vata, Pitta, Kapha) - body constitutions\n2. Dinacharya - daily routine\n3. Ritucharya - seasonal routine\n4. Ahara - proper diet\n5. Panchakarma - detoxification\n\nAyurTwin combines these ancient principles with modern AI for personalized health guidance.';
  }

  // Default
  return "I can help you with:\n\n- Your dosha/prakriti analysis\n- Diet recommendations\n- Stress & sleep tips\n- Exercise guidance\n- Disease risk information\n- Ayurvedic remedies\n\nTry asking: \"What is my dosha?\", \"How to reduce stress?\", or \"Diet tips for Pitta\"";
};
