// Nutrition data and quiz questions for the 3D Nutritional Awareness app

export const foodItems = {
  apple: {
    id: 'apple',
    name: 'Apple',
    group: 'fruit',
    color: '#ff2d55',
    tagline: 'An apple a day keeps the doctor away!',
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
      'Apples are made of 25% air, which is why they float in water!',
      'There are over 7,500 varieties of apples grown worldwide.',
      'Apples are rich in fiber and Vitamin C, which help your digestion and immune system.'
    ]
  },
  banana: {
    id: 'banana',
    name: 'Banana',
    group: 'fruit',
    color: '#ffd60a',
    tagline: 'Nature\'s pre-packaged energy bar!',
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
      'Bananas are technically berries, while strawberry plants are not!',
      'They are rich in Potassium, which helps your muscles contract and keeps your heart beating healthy.',
      'Bananas are naturally radioactive because they contain high levels of Potassium (but totally safe to eat!).'
    ]
  },
  broccoli: {
    id: 'broccoli',
    name: 'Broccoli',
    group: 'vegetable',
    color: '#34c759',
    tagline: 'Tiny trees packed with big power!',
    nutrients: {
      calories: 31,
      carbs: '6g',
      fiber: '2.4g',
      vitamins: 'Vitamin C, Vitamin K, Folate',
      protein: '2.5g',
      fat: '0.4g',
      sugar: '1.5g',
      sodium: '30mg'
    },
    funFacts: [
      'One cup of broccoli contains as much Vitamin C as an entire orange!',
      'Broccoli belongs to the cabbage family, along with kale, Brussels sprouts, and cauliflower.',
      'Vitamin K in broccoli is essential for blood clotting and building strong bones.'
    ]
  },
  carrot: {
    id: 'carrot',
    name: 'Carrot',
    group: 'vegetable',
    color: '#ff9500',
    tagline: 'Supercharge your eyesight!',
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
      'Carrots were originally purple or yellow, not orange!',
      'They are rich in Beta-carotene, which your body turns into Vitamin A, crucial for night vision.',
      'Cooking carrots actually releases more of their nutrients for your body to absorb!'
    ]
  },
  bread: {
    id: 'bread',
    name: 'Whole Wheat Bread',
    group: 'grain',
    color: '#a27b5c',
    tagline: 'Fuel your muscles with complex carbs!',
    nutrients: {
      calories: 70,
      carbs: '12g',
      fiber: '2g',
      vitamins: 'B Vitamins, Iron, Magnesium',
      protein: '3.6g',
      fat: '0.9g',
      sugar: '1.4g',
      sodium: '130mg'
    },
    funFacts: [
      'Whole grains use the entire grain seed, keeping all the fiber, vitamins, and minerals intact.',
      'Carbohydrates in whole wheat are "complex," giving you long-lasting energy instead of a quick sugar spike.',
      'Bread is one of the oldest human-made foods, dating back over 12,000 years!'
    ]
  },
  steak: {
    id: 'steak',
    name: 'Beef Steak',
    group: 'protein',
    color: '#c93b2b',
    tagline: 'Iron and protein for muscle building!',
    nutrients: {
      calories: 250,
      carbs: '0g',
      fiber: '0g',
      vitamins: 'Vitamin B12, Iron, Zinc',
      protein: '26g',
      fat: '15g',
      sugar: '0g',
      sodium: '60mg'
    },
    funFacts: [
      'Beef provides heme iron, which is the type of iron most easily absorbed by your body.',
      'Protein contains amino acids, which are the building blocks your body uses to repair muscles after exercise.',
      'A single serving provides almost 100% of your daily recommended Vitamin B12, which keeps your brain and nerves healthy.'
    ]
  },
  fish: {
    id: 'fish',
    name: 'Salmon Fish',
    group: 'protein',
    color: '#ff7b7b',
    tagline: 'Brain food rich in healthy fats!',
    nutrients: {
      calories: 206,
      carbs: '0g',
      fiber: '0g',
      vitamins: 'Omega-3, Vitamin D, Vitamin B6',
      protein: '22g',
      fat: '12g',
      sugar: '0g',
      sodium: '50mg'
    },
    funFacts: [
      'Salmon are famous for swimming upstream against strong currents to lay their eggs.',
      'Salmon are rich in Omega-3 fatty acids, which boost brain power, memory, and heart health.',
      'It is one of the few natural food sources of Vitamin D, which helps your bones absorb calcium.'
    ]
  },
  cheese: {
    id: 'cheese',
    name: 'Cheese',
    group: 'dairy',
    color: '#ffcc00',
    tagline: 'Calcium punch for strong teeth!',
    nutrients: {
      calories: 110,
      carbs: '1g',
      fiber: '0g',
      vitamins: 'Calcium, Vitamin A, Vitamin B12',
      protein: '7g',
      fat: '9g',
      sugar: '0g',
      sodium: '180mg'
    },
    funFacts: [
      'It takes about 10 pounds of milk to make just 1 pound of hard cheese!',
      'Cheese is packed with calcium and phosphorus, which physically rebuild and protect your tooth enamel.',
      'There are over 2,000 varieties of cheese, and some are aged for several years before eating.'
    ]
  },
  milk: {
    id: 'milk',
    name: 'Milk',
    group: 'dairy',
    color: '#e5e9f0',
    tagline: 'The ultimate bone-building drink!',
    nutrients: {
      calories: 120,
      carbs: '12g',
      fiber: '0g',
      vitamins: 'Calcium, Vitamin D, Riboflavin',
      protein: '8g',
      fat: '5g',
      sugar: '12g',
      sodium: '120mg'
    },
    funFacts: [
      'Milk is fortified with Vitamin D because your body needs it to successfully absorb Calcium!',
      'Dairy farming has been a part of human agriculture for over 9,000 years.',
      'Drinking milk after a hard workout is one of the best ways to rehydrate and repair muscles!'
    ]
  }
};

export const quizQuestions = [
  {
    id: 1,
    question: 'According to USDA MyPlate guidelines, how much of your plate should consist of fruits and vegetables?',
    options: [
      'One quarter (25%)',
      'One half (50%)',
      'Three quarters (75%)',
      'The entire plate (100%)'
    ],
    answer: 1,
    explanation: 'MyPlate guidelines recommend filling half of your plate with a colorful variety of fruits and vegetables to get plenty of fiber, vitamins, and minerals.'
  },
  {
    id: 2,
    question: 'Which vitamin, found abundantly in carrots, is essential for maintaining healthy eyesight?',
    options: [
      'Vitamin C',
      'Vitamin D',
      'Vitamin A',
      'Vitamin B12'
    ],
    answer: 2,
    explanation: 'Carrots are rich in Beta-carotene, which your body converts into Vitamin A. Vitamin A is crucial for good night vision and overall eye health.'
  },
  {
    id: 3,
    question: 'Which nutrient is considered the body\'s primary and most efficient source of energy?',
    options: [
      'Protein',
      'Carbohydrates',
      'Saturated Fat',
      'Calcium'
    ],
    answer: 1,
    explanation: 'Carbohydrates (especially complex carbs like those in whole grains) are broken down into glucose, which is the preferred fuel for your brain and muscles.'
  },
  {
    id: 4,
    question: 'What mineral is essential for building strong bones and teeth, and is found in high amounts in dairy?',
    options: [
      'Iron',
      'Sodium',
      'Calcium',
      'Zinc'
    ],
    answer: 2,
    explanation: 'Calcium is the key structural mineral in your bones and teeth. Getting enough calcium during your teenage years helps build bone density for life.'
  },
  {
    id: 5,
    question: 'Why are whole grains (like whole wheat bread) healthier than refined grains (like white bread)?',
    options: [
      'They contain more sugar',
      'They look darker and taste sweeter',
      'They keep the fiber, vitamins, and minerals that refining strips away',
      'They digest much faster'
    ],
    answer: 2,
    explanation: 'Whole grains retain all parts of the seed—the bran, germ, and endosperm. This preserves natural fiber and B vitamins, leading to steadier energy levels.'
  },
  {
    id: 6,
    question: 'Which of these is a healthy fat that helps improve brain function and heart health?',
    options: [
      'Trans fat',
      'Saturated fat from red meat',
      'Omega-3 fatty acids, found in salmon',
      'High-fructose corn syrup'
    ],
    answer: 2,
    explanation: 'Omega-3 fatty acids are unsaturated fats essential for brain cell structure and reducing inflammation. Salmon and flaxseeds are excellent sources.'
  },
  {
    id: 7,
    question: 'What is the main danger of consuming too many beverages with "added sugars" like soda or energy drinks?',
    options: [
      'They cause your bones to break easily',
      'They cause energy crashes, tooth decay, and increase long-term health risks',
      'They contain too much water, which dilutes nutrients',
      'They make you sleep too much'
    ],
    answer: 1,
    explanation: 'Added sugars cause a rapid spike and subsequent crash in blood sugar, leaving you tired. Over time, they lead to cavities and metabolic health issues.'
  },
  {
    id: 8,
    question: 'Which nutrient is vital for building, maintaining, and repairing muscles, skin, and organs?',
    options: [
      'Sodium',
      'Protein',
      'Fiber',
      'Cholesterol'
    ],
    answer: 1,
    explanation: 'Proteins are made of amino acids, which serve as the physical building blocks for growing muscles, repairing tissues, and making hormones.'
  },
  {
    id: 9,
    question: 'If a food label says it has 16 grams of sugar per serving, about how many teaspoons of sugar is that?',
    options: [
      '1 teaspoon',
      '2 teaspoons',
      '4 teaspoons',
      '8 teaspoons'
    ],
    answer: 2,
    explanation: 'Every 4 grams of sugar is equal to approximately 1 teaspoon. So, 16 grams of sugar is equivalent to 4 teaspoons of sugar in a single serving!'
  },
  {
    id: 10,
    question: 'What is sodium, and why should we monitor how much of it we eat?',
    options: [
      'It is a vitamin that helps us grow taller',
      'It is salt; too much can lead to high blood pressure and strain your heart',
      'It is a sugar alternative that makes food sour',
      'It is a metal that gives you energy'
    ],
    answer: 1,
    explanation: 'Sodium is salt. While our bodies need a tiny amount, eating too much sodium (often hidden in processed foods) raises blood pressure and strains blood vessels.'
  },
  {
    id: 11,
    question: 'What is the role of dietary fiber in the body?',
    options: [
      'It builds muscle mass',
      'It helps with digestion, keeps your gut healthy, and keeps you feeling full',
      'It transports oxygen in the blood',
      'It provides instant energy'
    ],
    answer: 1,
    explanation: 'Fiber is a carbohydrate that your body cannot digest. It helps sweep food through your digestive tract, maintains gut health, and slows glucose absorption.'
  },
  {
    id: 12,
    question: 'Which of these is the healthiest choice for hydration during a typical school day?',
    options: [
      'Sports drinks with electrolytes',
      'Fruit juice boxes (100% juice)',
      'Water',
      'Diet soda'
    ],
    answer: 2,
    explanation: 'Plain water is the absolute best hydrator. It contains zero sugars, chemical additives, or calories, and keeps every organ functioning at its peak.'
  }
];

export function evaluateMeal(selectedIds) {
  if (selectedIds.length === 0) {
    return {
      score: 0,
      grade: 'Empty Plate',
      summary: 'You haven\'t added any food to your plate yet!',
      color: '#e5e9f0',
      tips: ['Click on some of the 3D food items on the shelves to add them to your plate.'],
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

  // Count food groups
  const groupsCount = {
    fruit: 0,
    vegetable: 0,
    grain: 0,
    protein: 0,
    dark_protein: 0, // Steak
    dairy: 0
  };

  let totalCalories = 0;
  let totalSugar = 0;
  let totalSodium = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  selectedIds.forEach(id => {
    const item = foodItems[id];
    if (!item) return;

    groupsCount[item.group] = (groupsCount[item.group] || 0) + 1;
    if (id === 'steak') groupsCount.dark_protein++;

    totalCalories += item.nutrients.calories;
    totalSugar += parseFloat(item.nutrients.sugar);
    totalSodium += parseFloat(item.nutrients.sodium);
    totalProtein += parseFloat(item.nutrients.protein);
    totalCarbs += parseFloat(item.nutrients.carbs);
    totalFat += parseFloat(item.nutrients.fat);
  });

  // Calculate unique food groups (maximum is 5: fruit, vegetable, grain, protein, dairy)
  const representedGroups = Object.keys(groupsCount).filter(g => g !== 'dark_protein' && groupsCount[g] > 0);
  const uniqueGroupsCount = representedGroups.length;

  let score = 0;
  let grade = 'Needs Work';
  let summary = '';
  let tips = [];

  // Base score on variety
  score += uniqueGroupsCount * 20; // Up to 100 for 5 groups

  // Deductions & Adjustments
  if (selectedIds.length > 5) {
    // Too much food
    score -= (selectedIds.length - 5) * 5;
    tips.push('Portion size is a bit large. Try building a meal with 3-5 items to keep calories in check.');
  }

  // Sugar alert
  if (totalSugar > 25) {
    score -= 15;
    tips.push('This meal contains a lot of sugar! High sugar intake can lead to energy crashes.');
  }

  // Sodium alert
  if (totalSodium > 400) {
    score -= 10;
    tips.push('Your meal is relatively high in sodium (salt). Try to limit high-sodium processed foods.');
  }

  // Protein checks
  if (groupsCount.protein > 2) {
    score -= 10;
    tips.push('You have multiple protein sources. Just one serving is usually enough for a balanced meal.');
  }

  // Steak warning (high saturated fat)
  if (groupsCount.dark_protein > 0 && totalFat > 15) {
    tips.push('Beef steak is a great source of iron, but it is high in saturated fat. Balance it with fresh veggies or swap for fish next time!');
  }

  // Vegetables and Fruits check (MyPlate says 50% plate should be fruit/veg)
  const fruitAndVegCount = (groupsCount.fruit || 0) + (groupsCount.vegetable || 0);
  if (fruitAndVegCount === 0) {
    score -= 20;
    tips.push('CRITICAL: No fruits or vegetables! Remember, half of your plate should be colorful fruits and veggies.');
  } else if (fruitAndVegCount === 1) {
    score -= 5;
    tips.push('Add another fruit or vegetable. Try to make half of your plate green, orange, or red!');
  }

  // Grain check
  if (groupsCount.grain === 0) {
    tips.push('Add a grain source (like whole wheat bread) to provide sustained carbohydrate energy.');
  }

  // Dairy check
  if (groupsCount.dairy === 0) {
    tips.push('Consider adding dairy (milk or cheese) for bone-strengthening Calcium and Vitamin D.');
  }

  // Clamp score
  score = Math.max(10, Math.min(100, score));

  // Determine Grade
  let color = '#ff2d55';
  if (score >= 90) {
    grade = 'Perfect Balance! A+';
    summary = 'Outstanding! You built a perfectly balanced meal that meets all USDA MyPlate guidelines.';
    color = '#34c759';
  } else if (score >= 80) {
    grade = 'Healthy Choices! B+';
    summary = 'Great job! This is a very nutritious meal with excellent variety and balance.';
    color = '#34c759';
  } else if (score >= 65) {
    grade = 'Getting Close! C';
    summary = 'Not bad, but we can make it more balanced. Look at the tips to improve your score.';
    color = '#ff9500';
  } else {
    grade = 'Unbalanced Meal! D';
    summary = 'This meal is lacking variety or contains too much sugar, sodium, or saturated fat. Let\'s adjust it!';
    color = '#ff3b30';
  }

  if (tips.length === 0) {
    tips.push('Your meal is super balanced! Try swapping different items to see how it affects your nutrients.');
  }

  return {
    score,
    grade,
    summary,
    color,
    tips,
    nutrients: {
      calories: Math.round(totalCalories),
      carbs: Math.round(totalCarbs) + 'g',
      fiber: totalFiberCount(selectedIds),
      protein: Math.round(totalProtein) + 'g',
      fat: Math.round(totalFat) + 'g',
      sugar: Math.round(totalSugar) + 'g',
      sodium: Math.round(totalSodium) + 'mg'
    }
  };
}

function totalFiberCount(ids) {
  let count = 0;
  ids.forEach(id => {
    const item = foodItems[id];
    if (item && item.nutrients.fiber) {
      count += parseFloat(item.nutrients.fiber);
    }
  });
  return count.toFixed(1) + 'g';
}
