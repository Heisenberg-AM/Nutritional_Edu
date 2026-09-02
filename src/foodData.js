// Nutrition data, 50-25-25 Healthy Plate evaluation, and localized quiz questions

export const foodItems = {
  apple: {
    id: 'apple',
    name: 'Red Apple',
    group: 'fruit',
    plateSection: '50% Fruits & Vegetables',
    color: '#e11d48', // Vibrant ruby red
    tagline: 'Rich in pectin fiber and Vitamin C for immunity!',
    nutrients: {
      calories: 95,
      carbs: '25g',
      fiber: '4.4g',
      vitamins: 'Vitamin C, Potassium',
      protein: '0.5g',
      fat: '0.3g',
      sugar: '19g',
      sodium: '2mg'
    },
    funFacts: [
      'Apples are 25% air, which is why they float in water!',
      'Eating whole apples with the peel provides soluble pectin fiber, keeping your digestion smooth.',
      'Apples have a low glycemic index, giving steady energy without blood sugar spikes.'
    ]
  },
  banana: {
    id: 'banana',
    name: 'Kerala Banana (Nendran)',
    group: 'fruit',
    plateSection: '50% Fruits & Vegetables',
    color: '#ffd60a',
    tagline: 'Powerhouse of potassium and instant natural energy!',
    nutrients: {
      calories: 105,
      carbs: '27g',
      fiber: '3g',
      vitamins: 'Vitamin B6, Vitamin C, Potassium',
      protein: '1.3g',
      fat: '0.3g',
      sugar: '14g',
      sodium: '1mg'
    },
    funFacts: [
      'Kerala Nendran bananas are prized for high prebiotic fiber and essential minerals!',
      'Potassium in bananas helps regulate blood pressure, prevents muscle cramps, and supports heart rhythm.',
      'Bananas contain Vitamin B6, which helps your body produce serotonin for better focus and mood.'
    ]
  },
  carrot: {
    id: 'carrot',
    name: 'Orange Carrot',
    group: 'vegetable',
    plateSection: '50% Fruits & Vegetables',
    color: '#ff6b00', // Pure bright vivid orange
    tagline: 'Supercharged with Beta-Carotene & Vitamin A for sharp eyesight!',
    nutrients: {
      calories: 41,
      carbs: '10g',
      fiber: '2.8g',
      vitamins: 'Vitamin A (Beta-carotene), Vitamin K1',
      protein: '0.9g',
      fat: '0.2g',
      sugar: '4.7g',
      sodium: '69mg'
    },
    funFacts: [
      'The vivid orange color comes from Beta-carotene, which your liver converts into Vitamin A.',
      'Vitamin A is critical for protecting the cornea and enabling vision in low light/night conditions.',
      'Eating carrots with a little healthy fat (like in dal or curry) boosts Vitamin A absorption by 300%!'
    ]
  },
  greens: {
    id: 'greens',
    name: 'Palak / Leafy Greens',
    group: 'vegetable',
    plateSection: '50% Fruits & Vegetables',
    color: '#16a34a',
    tagline: 'Iron and folate champion for healthy blood and stamina!',
    nutrients: {
      calories: 23,
      carbs: '3.6g',
      fiber: '2.2g',
      vitamins: 'Iron, Folate, Vitamin K, Vitamin C',
      protein: '2.9g',
      fat: '0.4g',
      sugar: '0.4g',
      sodium: '79mg'
    },
    funFacts: [
      'Dark green leafy vegetables like Palak, Cheera, and Moringa are rich in non-heme iron and folate.',
      'Vitamin K in greens plays a major role in bone density and natural blood clotting.',
      'Combining greens with Vitamin C (like a squeeze of lemon or tomato) helps your body absorb the iron much faster.'
    ]
  },
  roti: {
    id: 'roti',
    name: 'Whole Wheat Roti / Chapati',
    group: 'grain',
    plateSection: '25% Carbohydrates',
    color: '#d97706',
    tagline: 'Complex carbohydrates for sustained energy and focus!',
    nutrients: {
      calories: 120,
      carbs: '22g',
      fiber: '3.5g',
      vitamins: 'B Vitamins, Iron, Magnesium',
      protein: '3.8g',
      fat: '1.5g',
      sugar: '0.5g',
      sodium: '110mg'
    },
    funFacts: [
      'Whole wheat retains the bran, germ, and endosperm, packing 3x more fiber than refined white flour.',
      'Complex carbohydrates break down slowly into glucose, providing steady fuel for school and sports.',
      'Whole grain rotis are rich in magnesium, which helps convert the food you eat into cellular energy.'
    ]
  },
  egg: {
    id: 'egg',
    name: 'Boiled Egg',
    group: 'protein',
    plateSection: '25% Protein',
    color: '#f59e0b',
    tagline: 'Gold standard complete protein for muscle building & memory!',
    nutrients: {
      calories: 78,
      carbs: '0.6g',
      fiber: '0g',
      vitamins: 'Choline, Vitamin B12, Vitamin D, Zinc',
      protein: '6.3g',
      fat: '5.3g',
      sugar: '0.6g',
      sodium: '62mg'
    },
    funFacts: [
      'Eggs contain all 9 essential amino acids in the exact proportions needed by growing teenagers!',
      'The yolk is rich in Choline, a vital nutrient that powers neurotransmitters in the brain for memory and learning.',
      'Egg protein has a biological value of 100, meaning almost all of it is usable by your body to repair tissue.'
    ]
  },
  paneer: {
    id: 'paneer',
    name: 'Fresh Paneer / Dal',
    group: 'protein',
    plateSection: '25% Protein',
    color: '#fbbf24',
    tagline: 'Vegetarian protein and calcium powerhouse for strong bones!',
    nutrients: {
      calories: 130,
      carbs: '2.5g',
      fiber: '0g',
      vitamins: 'Calcium, Phosphorus, Vitamin B12',
      protein: '9.0g',
      fat: '9.5g',
      sugar: '1.2g',
      sodium: '85mg'
    },
    funFacts: [
      'Paneer and lentils (Dal) are staple vegetarian protein sources across Indian cuisine.',
      'Paneer is rich in Calcium and Phosphorus, which work together to harden bone matrix and enamel.',
      'Combining lentils (Dal) with grains (Rice or Roti) creates a complete protein profile with all essential amino acids!'
    ]
  },
  fish: {
    id: 'fish',
    name: 'Kerala Fish (Karimeen)',
    group: 'protein',
    plateSection: '25% Protein',
    color: '#0284c7',
    tagline: 'Lean coastal protein packed with brain-boosting Omega-3s!',
    nutrients: {
      calories: 140,
      carbs: '0g',
      fiber: '0g',
      vitamins: 'Omega-3 Fatty Acids, Vitamin D, Selenium',
      protein: '20g',
      fat: '6.0g',
      sugar: '0g',
      sodium: '70mg'
    },
    funFacts: [
      'Coastal fish like Karimeen, Sardines (Mathi), and Mackerel (Ayala) are loaded with natural Omega-3 fatty acids.',
      'Omega-3s form the structural lipids of brain cell membranes, enhancing concentration and cognitive speed.',
      'Fish is naturally low in saturated fats and provides bioavailable Vitamin D for bone and immune health.'
    ]
  },
  curd: {
    id: 'curd',
    name: 'Curd / Sambharam (Buttermilk)',
    group: 'dairy',
    plateSection: 'Accompaniment',
    color: '#06b6d4',
    tagline: 'Cooling probiotic for gut health, digestion, and calcium!',
    nutrients: {
      calories: 60,
      carbs: '4.5g',
      fiber: '0g',
      vitamins: 'Probiotics (Lactobacillus), Calcium, Vitamin B2',
      protein: '4.0g',
      fat: '2.5g',
      sugar: '4.0g',
      sodium: '55mg'
    },
    funFacts: [
      'Traditional spiced buttermilk (Sambharam with ginger, curry leaves, and green chili) is Kerala’s natural hydrator.',
      'Curd is packed with live probiotic bacteria (Lactobacillus) that strengthen gut microbiome and digestion.',
      'Fermentation in curd breaks down lactose, making it easier to digest while delivering rich calcium.'
    ]
  }
};

export const quizQuestions = [
  {
    id: 1,
    question: 'According to the 50–25–25 Healthy Plate model, what portion of your plate should consist of colorful vegetables and fruits?',
    options: [
      'One quarter (25%)',
      'One half (50%)',
      'Three quarters (75%)',
      'Only 10%'
    ],
    answer: 1,
    explanation: 'The 50–25–25 model recommends filling exactly half (50%) of your plate with vegetables and fruits to ensure adequate intake of dietary fiber, vitamins, and minerals.'
  },
  {
    id: 2,
    question: 'In the 50–25–25 plate framework, what should make up the two remaining 25% quarters of your meal?',
    options: [
      '25% Sweets and 25% Fried snacks',
      '25% Complex Carbohydrates (like Roti/Matta Rice) and 25% Healthy Proteins (like Dal/Egg/Fish)',
      '50% Extra Rice and no protein',
      '25% Soda and 25% Fast food'
    ],
    answer: 1,
    explanation: 'The remaining plate is divided evenly: 25% for complex carbohydrates (whole grains for steady energy) and 25% for protein (for muscle repair and growth).'
  },
  {
    id: 3,
    question: 'Why is traditional Kerala red Matta rice or whole wheat Roti healthier than polished white rice?',
    options: [
      'They contain more sugar',
      'They retain the outer bran layer rich in fiber, minerals, and B-vitamins, giving slow, steady energy',
      'They digest in under 5 minutes',
      'They have zero carbohydrates'
    ],
    answer: 1,
    explanation: 'Whole grains retain their bran and germ layers, providing high dietary fiber and B-vitamins that prevent sudden blood sugar spikes and keep energy steady.'
  },
  {
    id: 4,
    question: 'Which nutrient, abundant in orange carrots and mangoes, is essential for maintaining sharp vision in low light?',
    options: [
      'Vitamin C',
      'Beta-carotene (provitamin A)',
      'Vitamin D',
      'Sodium'
    ],
    answer: 1,
    explanation: 'Beta-carotene in orange vegetables is converted by your body into Vitamin A, which protects the cornea and supports night vision.'
  },
  {
    id: 5,
    question: 'Why is pairing Dal (lentils) with Rice or Roti considered a smart nutritional strategy in Indian meals?',
    options: [
      'It makes the food sweeter',
      'Grains and lentils have complementary amino acids that together form a complete protein',
      'It removes all fats from the plate',
      'It replaces the need to drink water'
    ],
    answer: 1,
    explanation: 'Cereals lack lysine while pulses lack methionine; combining them (like Dal-Roti or Dal-Chawal) provides all 9 essential amino acids for complete protein absorption.'
  },
  {
    id: 6,
    question: 'Which healthy fat found in Kerala coastal fish like Karimeen and Sardines is critical for brain function and memory?',
    options: [
      'Trans fat',
      'Saturated animal fat',
      'Omega-3 fatty acids',
      'Palm oil'
    ],
    answer: 2,
    explanation: 'Omega-3 fatty acids are essential unsaturated fats that build brain and nerve cell membranes, boosting concentration and memory.'
  },
  {
    id: 7,
    question: 'What makes traditional Curd and spiced Buttermilk (Sambharam) beneficial for teenage digestion?',
    options: [
      'They contain high refined sugar',
      'They provide live probiotic bacteria (Lactobacillus) and bioavailable calcium for gut and bone health',
      'They replace vegetables on the plate',
      'They are artificial soft drinks'
    ],
    answer: 1,
    explanation: 'Fermented dairy provides probiotics that support a healthy gut microbiome, smooth digestion, and strong bones through bioavailable calcium.'
  },
  {
    id: 8,
    question: 'Dark leafy greens like Palak, Cheera, and Moringa (drumstick leaves) are rich in which vital mineral that transports oxygen in your blood?',
    options: [
      'Iron',
      'Sodium',
      'Potassium',
      'Chlorine'
    ],
    answer: 0,
    explanation: 'Green leafy vegetables are packed with iron, which is the core component of hemoglobin needed to carry oxygen to your muscles and brain.'
  },
  {
    id: 9,
    question: 'What is the healthiest choice for daily hydration during school and sports activities?',
    options: [
      'Packaged energy drinks',
      'Carbonated sugary sodas',
      'Plain water, tender coconut water, or fresh buttermilk',
      'Commercial fruit syrup drinks'
    ],
    answer: 2,
    explanation: 'Plain water, tender coconut, and buttermilk hydrate naturally without added sugars, chemical preservatives, or caffeine crashes.'
  },
  {
    id: 10,
    question: 'If a snack has 20 grams of added sugar per serving, approximately how many teaspoons of sugar is that?',
    options: [
      '1 teaspoon',
      '2.5 teaspoons',
      '5 teaspoons',
      '10 teaspoons'
    ],
    answer: 2,
    explanation: 'Every 4 grams of sugar equals approximately 1 teaspoon. 20 grams of added sugar is equal to 5 full teaspoons of sugar in a single serving!'
  },
  {
    id: 11,
    question: 'Which nutrient is the primary building block for growing muscles, repairing tissues, and making hormones during teenage growth?',
    options: [
      'Protein',
      'Saturated fat',
      'Added sugar',
      'Cholesterol'
    ],
    answer: 0,
    explanation: 'Proteins (found in eggs, paneer, fish, dal, and nuts) break down into amino acids that physically build and repair muscles, organs, and skin.'
  },
  {
    id: 12,
    question: 'Why should we be mindful of consuming too many packaged fried snacks and deep-fried fast foods?',
    options: [
      'They contain too much natural fiber',
      'They are high in unhealthy saturated/trans fats and sodium, which can strain heart health and cause fatigue',
      'They have too much Vitamin C',
      'They cause too much bone growth'
    ],
    answer: 1,
    explanation: 'Deep-fried foods and ultra-processed snacks are high in oxidized fats and sodium, causing energy crashes and increasing cardiovascular risk.'
  }
];

export function evaluateMeal(selectedIds) {
  if (selectedIds.length === 0) {
    return {
      score: 0,
      grade: 'Empty Plate',
      summary: 'Your plate is currently empty! Add foods from the shelves to build a balanced 50–25–25 meal.',
      color: '#94a3b8',
      tips: ['Click items on the shelves to add vegetables, grains, and proteins to your plate.'],
      breakdown: { vegFruit: 0, carbs: 0, protein: 0, dairy: 0 },
      nutrients: {
        calories: 0,
        carbs: '0g',
        fiber: '0g',
        protein: '0g',
        fat: '0g',
        sugar: '0g',
        sodium: '0mg'
      }
    };
  }

  // Count items across the 50-25-25 categories
  let vegFruitCount = 0;
  let carbsCount = 0;
  let proteinCount = 0;
  let dairyCount = 0;

  let totalCalories = 0;
  let totalSugar = 0;
  let totalSodium = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalFiber = 0;

  selectedIds.forEach(id => {
    const item = foodItems[id];
    if (!item) return;

    if (item.group === 'fruit' || item.group === 'vegetable') {
      vegFruitCount++;
    } else if (item.group === 'grain') {
      carbsCount++;
    } else if (item.group === 'protein') {
      proteinCount++;
    } else if (item.group === 'dairy') {
      dairyCount++;
    }

    totalCalories += item.nutrients.calories;
    totalSugar += parseFloat(item.nutrients.sugar);
    totalSodium += parseFloat(item.nutrients.sodium);
    totalProtein += parseFloat(item.nutrients.protein);
    totalCarbs += parseFloat(item.nutrients.carbs);
    totalFat += parseFloat(item.nutrients.fat);
    totalFiber += parseFloat(item.nutrients.fiber || '0');
  });

  const totalItems = selectedIds.length;
  let score = 50; // base starting score
  const tips = [];

  // Evaluate 50% Fruits & Veg (Target: at least 2 items, representing ~50% of meal)
  if (vegFruitCount >= 2) {
    score += 25;
  } else if (vegFruitCount === 1) {
    score += 12;
    tips.push('🌱 Add another vegetable or fruit! The 50–25–25 model recommends filling half your plate with colorful produce.');
  } else {
    score -= 20;
    tips.push('⚠️ Missing 50% Produce: Your plate needs vegetables and fruits for fiber, vitamins, and cellular protection.');
  }

  // Evaluate 25% Carbohydrates (Target: exactly 1 grain item like Roti)
  if (carbsCount === 1) {
    score += 15;
  } else if (carbsCount === 0) {
    tips.push('🫓 Add a whole grain (like Whole Wheat Roti) to fulfill the 25% complex carbohydrate portion for stamina.');
  } else if (carbsCount > 1) {
    score -= 10;
    tips.push('Grain Portion Alert: Too many carbohydrates on the plate. Stick to 1 grain serving (25% of plate) to keep blood sugar stable.');
  }

  // Evaluate 25% Protein (Target: 1 or 2 protein items like Dal/Paneer/Egg/Fish)
  if (proteinCount >= 1 && proteinCount <= 2) {
    score += 15;
  } else if (proteinCount === 0) {
    score -= 15;
    tips.push('🍳 Missing 25% Protein: Add Paneer, Egg, Dal, or Fish to provide amino acids for muscle growth and repair.');
  } else if (proteinCount > 2) {
    score -= 5;
    tips.push('Excess Protein: One to two quality protein sources are plenty for a single meal.');
  }

  // Probiotic / Dairy bonus
  if (dairyCount >= 1) {
    score += 5;
  }

  // Portion volume check (ideal 3-4 items)
  if (totalItems > 5) {
    score -= (totalItems - 5) * 5;
    tips.push('Large Portion: Try building a focused meal with 3–4 items to maintain optimal energy without sluggishness.');
  }

  // Clamp score between 10 and 100
  score = Math.max(10, Math.min(100, score));

  // Determine Grade
  let grade = 'Needs Adjustment';
  let summary = '';
  let color = '#ef4444';

  if (score >= 90) {
    grade = 'Ideal 50–25–25 Balance! 🌟';
    summary = 'Outstanding! Your plate aligns with the 50–25–25 Healthy Plate model (50% Vegetables & Fruits, 25% Whole Grains, 25% Protein).';
    color = '#22c55e';
  } else if (score >= 75) {
    grade = 'Very Good Meal! 👍';
    summary = 'Great job! This is a nutritious meal with good variety. A few small tweaks will make it a textbook 50–25–25 plate.';
    color = '#10b981';
  } else if (score >= 60) {
    grade = 'Fair Start 🥗';
    summary = 'You have good components, but the plate proportions need adjustment to match the 50% produce and 25% protein targets.';
    color = '#f59e0b';
  } else {
    grade = 'Unbalanced Plate ⚠️';
    summary = 'This meal is missing key food groups or has unbalanced proportions. Follow the 50–25–25 guidelines below!';
    color = '#ef4444';
  }

  if (tips.length === 0) {
    tips.push('Your meal has a 50–25–25 balance! Try switching up different vegetables and proteins across days.');
  }

  return {
    score,
    grade,
    summary,
    color,
    tips,
    breakdown: {
      vegFruit: vegFruitCount,
      carbs: carbsCount,
      protein: proteinCount,
      dairy: dairyCount
    },
    nutrients: {
      calories: Math.round(totalCalories),
      carbs: Math.round(totalCarbs) + 'g',
      fiber: totalFiber.toFixed(1) + 'g',
      protein: Math.round(totalProtein) + 'g',
      fat: Math.round(totalFat) + 'g',
      sugar: Math.round(totalSugar) + 'g',
      sodium: Math.round(totalSodium) + 'mg'
    }
  };
}
