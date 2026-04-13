// =====================================================
// PRAKRITI QUIZ - 22 Questions
// Category A: Physical Structure (Q1-8, Q19-22)
// Category B: Digestive Function (Q9-13)
// Category C: Mental Traits (Q14-18)
// =====================================================

export const PRAKRITI_QUESTIONS = [
  // Category A: Physical Structure & Appearance
  {
    id: 1,
    category: 'Physical Structure',
    question: 'What best describes your natural body build or frame?',
    options: [
      { key: 'a', text: 'Lean and thin', dosha: 'vata' },
      { key: 'b', text: 'Medium and proportionate', dosha: 'pitta' },
      { key: 'c', text: 'Well-built, broad, and strong', dosha: 'kapha' },
    ],
  },
  {
    id: 2,
    category: 'Physical Structure',
    question: 'How would you describe the symmetry and proportion of your body parts?',
    options: [
      { key: 'a', text: 'Uneven or asymmetrical', dosha: 'vata' },
      { key: 'b', text: 'Well-formed and balanced', dosha: 'pitta' },
      { key: 'c', text: 'Well-proportioned and symmetrical', dosha: 'kapha' },
    ],
  },
  {
    id: 3,
    category: 'Physical Structure',
    question: 'What is the predominant texture of your skin and hair?',
    options: [
      { key: 'a', text: 'Rough and dry', dosha: 'vata' },
      { key: 'b', text: 'Soft and smooth', dosha: 'pitta' },
      { key: 'c', text: 'Smooth and oily', dosha: 'kapha' },
    ],
  },
  {
    id: 4,
    category: 'Physical Structure',
    question: 'Which shape best describes your face?',
    options: [
      { key: 'a', text: 'Small and narrow', dosha: 'vata' },
      { key: 'b', text: 'Long or medium, with sharp features', dosha: 'pitta' },
      { key: 'c', text: 'Broad, full, and attractive', dosha: 'kapha' },
    ],
  },
  {
    id: 5,
    category: 'Physical Structure',
    question: 'What is the general nature of your skin?',
    options: [
      { key: 'a', text: 'Dry and rough', dosha: 'vata' },
      { key: 'b', text: 'Soft, warm, and sensitive', dosha: 'pitta' },
      { key: 'c', text: 'Smooth, cool, and thick', dosha: 'kapha' },
    ],
  },
  {
    id: 6,
    category: 'Physical Structure',
    question: 'How does your skin feel to the touch of others?',
    options: [
      { key: 'a', text: 'Generally cold', dosha: 'vata' },
      { key: 'b', text: 'Warm or hot', dosha: 'pitta' },
      { key: 'c', text: 'Cool and slightly oily', dosha: 'kapha' },
    ],
  },
  {
    id: 7,
    category: 'Physical Structure',
    question: 'What is your natural skin complexion?',
    options: [
      { key: 'a', text: 'Dark or dull', dosha: 'vata' },
      { key: 'b', text: 'Fair, reddish, or coppery', dosha: 'pitta' },
      { key: 'c', text: 'Fair, pale, or glowing', dosha: 'kapha' },
    ],
  },
  {
    id: 8,
    category: 'Physical Structure',
    question: 'What is the nature of your hair?',
    options: [
      { key: 'a', text: 'Thin, dry, brittle, or frizzy', dosha: 'vata' },
      { key: 'b', text: 'Soft, fine, with tendencies for premature greying or thinning', dosha: 'pitta' },
      { key: 'c', text: 'Thick, black, shiny, and oily', dosha: 'kapha' },
    ],
  },
  // Category B: Digestive & Metabolic Function
  {
    id: 9,
    category: 'Digestive Function',
    question: 'What is the condition of your joints?',
    options: [
      { key: 'a', text: 'They produce cracking sounds and feel loose or unstable', dosha: 'vata' },
      { key: 'b', text: 'They are moderately stable without significant issues', dosha: 'pitta' },
      { key: 'c', text: 'They are strong, well-lubricated, and flexible', dosha: 'kapha' },
    ],
  },
  {
    id: 10,
    category: 'Digestive Function',
    question: 'How is your digestive fire or appetite strength?',
    options: [
      { key: 'a', text: 'Variable - sometimes strong, sometimes weak', dosha: 'vata' },
      { key: 'b', text: 'Consistently strong', dosha: 'pitta' },
      { key: 'c', text: 'Generally slow or weak', dosha: 'kapha' },
    ],
  },
  {
    id: 11,
    category: 'Digestive Function',
    question: 'How would you describe your digestive capacity?',
    options: [
      { key: 'a', text: 'Irregular - digests some foods well, others poorly', dosha: 'vata' },
      { key: 'b', text: 'Fast - digests food quickly', dosha: 'pitta' },
      { key: 'c', text: 'Slow - feels heavy after eating, digestion takes time', dosha: 'kapha' },
    ],
  },
  {
    id: 12,
    category: 'Digestive Function',
    question: 'How intense is your feeling of hunger?',
    options: [
      { key: 'a', text: 'Low or inconsistent', dosha: 'vata' },
      { key: 'b', text: 'Strong and frequent', dosha: 'pitta' },
      { key: 'c', text: 'Mild and manageable', dosha: 'kapha' },
    ],
  },
  {
    id: 13,
    category: 'Digestive Function',
    question: 'Which tastes do you naturally prefer or crave?',
    options: [
      { key: 'a', text: 'Sweet, sour, and salty', dosha: 'vata' },
      { key: 'b', text: 'Sweet, bitter, and astringent', dosha: 'pitta' },
      { key: 'c', text: 'Pungent, bitter, and astringent', dosha: 'kapha' },
    ],
  },
  // Category C: Mental & Behavioral Traits
  {
    id: 14,
    category: 'Mental Traits',
    question: 'Which best describes your voice?',
    options: [
      { key: 'a', text: 'Weak, thin, or cracked', dosha: 'vata' },
      { key: 'b', text: 'Sharp, clear, and commanding', dosha: 'pitta' },
      { key: 'c', text: 'Deep, pleasant, and melodious', dosha: 'kapha' },
    ],
  },
  {
    id: 15,
    category: 'Mental Traits',
    question: 'How would you rate your level of courage or bravery in new situations?',
    options: [
      { key: 'a', text: 'Low - tendency towards anxiety or fear', dosha: 'vata' },
      { key: 'b', text: 'High - bold and confident', dosha: 'pitta' },
      { key: 'c', text: 'Moderate - calm and steady', dosha: 'kapha' },
    ],
  },
  {
    id: 16,
    category: 'Mental Traits',
    question: 'What is your typical reaction speed to events or information?',
    options: [
      { key: 'a', text: 'Unpredictable - sometimes fast, sometimes slow', dosha: 'vata' },
      { key: 'b', text: 'Quick and immediate', dosha: 'pitta' },
      { key: 'c', text: 'Slow, thoughtful, and deliberate', dosha: 'kapha' },
    ],
  },
  {
    id: 17,
    category: 'Mental Traits',
    question: 'How would you describe your general pace of activity and movement?',
    options: [
      { key: 'a', text: 'Fast, light, and quick', dosha: 'vata' },
      { key: 'b', text: 'Medium, focused, and purposeful', dosha: 'pitta' },
      { key: 'c', text: 'Slow, steady, and deliberate', dosha: 'kapha' },
    ],
  },
  {
    id: 18,
    category: 'Mental Traits',
    question: 'What is your level of physical endurance and strength?',
    options: [
      { key: 'a', text: 'Low - tires easily', dosha: 'vata' },
      { key: 'b', text: 'Moderate - good for bursts of activity', dosha: 'pitta' },
      { key: 'c', text: 'High - naturally strong with good stamina', dosha: 'kapha' },
    ],
  },
  // Category A continued: Physical Structure
  {
    id: 19,
    category: 'Physical Structure',
    question: 'What best describes your teeth?',
    options: [
      { key: 'a', text: 'Small, uneven, irregular, or with gaps', dosha: 'vata' },
      { key: 'b', text: 'Medium-sized, sharp, and slightly yellowish', dosha: 'pitta' },
      { key: 'c', text: 'Large, even, strong, and white', dosha: 'kapha' },
    ],
  },
  {
    id: 20,
    category: 'Physical Structure',
    question: 'What is the shape of your nose?',
    options: [
      { key: 'a', text: 'Thin, small, or irregularly shaped', dosha: 'vata' },
      { key: 'b', text: 'Sharp, well-defined, and of medium size', dosha: 'pitta' },
      { key: 'c', text: 'Broad, rounded, and well-shaped', dosha: 'kapha' },
    ],
  },
  {
    id: 21,
    category: 'Physical Structure',
    question: 'Which description best fits your eyes?',
    options: [
      { key: 'a', text: 'Small, dry, unsteady, or dull', dosha: 'vata' },
      { key: 'b', text: 'Sharp, bright, intense, with slight redness', dosha: 'pitta' },
      { key: 'c', text: 'Large, attractive, calm, and moist', dosha: 'kapha' },
    ],
  },
  {
    id: 22,
    category: 'Physical Structure',
    question: 'What is the condition of your nails?',
    options: [
      { key: 'a', text: 'Dry, rough, brittle, or cracked', dosha: 'vata' },
      { key: 'b', text: 'Soft, pinkish/reddish, and warm', dosha: 'pitta' },
      { key: 'c', text: 'Thick, strong, smooth, and pale', dosha: 'kapha' },
    ],
  },
];

// Scoring function
export const calculatePrakriti = (answers) => {
  let vata = 0;
  let pitta = 0;
  let kapha = 0;

  answers.forEach((answer) => {
    if (answer === 'a') vata += 1;
    else if (answer === 'b') pitta += 1;
    else if (answer === 'c') kapha += 1;
  });

  const total = vata + pitta + kapha;
  const vataPercent = parseFloat(((vata / total) * 100).toFixed(1));
  const pittaPercent = parseFloat(((pitta / total) * 100).toFixed(1));
  const kaphaPercent = parseFloat(((kapha / total) * 100).toFixed(1));

  // Determine prakriti type
  const scores = { Vata: vataPercent, Pitta: pittaPercent, Kapha: kaphaPercent };
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  let prakriti;
  const diff1_2 = sorted[0][1] - sorted[1][1];
  const diff2_3 = sorted[1][1] - sorted[2][1];

  if (diff1_2 < 5 && diff2_3 < 5) {
    prakriti = 'Tridosha';
  } else if (diff1_2 < 10) {
    prakriti = `${sorted[0][0]}-${sorted[1][0]}`;
  } else {
    prakriti = sorted[0][0];
  }

  return {
    vata_score: vata,
    pitta_score: pitta,
    kapha_score: kapha,
    vata_percent: vataPercent,
    pitta_percent: pittaPercent,
    kapha_percent: kaphaPercent,
    prakriti,
  };
};
