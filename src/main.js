import { scene } from './scene.js';
import { quiz } from './quiz.js';
import { mealBuilder } from './mealBuilder.js';
import { foodItems } from './foodData.js';
import { audio } from './audio.js';

// Application State
let currentTab = 'landing'; // 'landing', 'quiz', 'builder'

// DOM Elements
const tabLandingBtn = document.getElementById('tab-landing-btn');
const tabQuizBtn = document.getElementById('tab-quiz-btn');
const tabBuilderBtn = document.getElementById('tab-builder-btn');

const landingScreen = document.getElementById('screen-landing');
const quizScreen = document.getElementById('screen-quiz');
const builderScreen = document.getElementById('screen-builder');

const audioToggleBtn = document.getElementById('audio-toggle-btn');
const foodCardModal = document.getElementById('food-card-modal');
const hoverLabel = document.getElementById('hover-label');

// Initialize Application
function initApp() {
  // Initialize 3D Scene
  const canvasContainer = document.getElementById('canvas-container');
  scene.init(canvasContainer);

  // Set up interaction callbacks from ThreeJS Scene Raycaster
  scene.onHoverCallback = handleFoodHover;
  scene.onClickCallback = handleFoodClick;

  // Bind View/Tab switches
  tabLandingBtn.addEventListener('click', () => switchTab('landing'));
  tabQuizBtn.addEventListener('click', () => switchTab('quiz'));
  tabBuilderBtn.addEventListener('click', () => switchTab('builder'));

  // Also bind big action buttons on landing
  document.getElementById('start-quiz-hero').addEventListener('click', () => switchTab('quiz'));
  document.getElementById('start-builder-hero').addEventListener('click', () => switchTab('builder'));

  // Audio mute toggle
  audioToggleBtn.addEventListener('click', toggleAudio);

  // Close food card modal
  document.getElementById('card-close-btn').addEventListener('click', () => {
    audio.playClick();
    foodCardModal.classList.add('hidden');
  });

  // Setup initial view
  switchTab('landing');
}

// Tab/View Switching Router
function switchTab(tabId) {
  audio.playClick();
  currentTab = tabId;

  // Update navbar button states
  [tabLandingBtn, tabQuizBtn, tabBuilderBtn].forEach(btn => btn.classList.remove('active'));
  [landingScreen, quizScreen, builderScreen].forEach(screen => screen.classList.add('hidden'));

  // Hide floating modal card if open
  foodCardModal.classList.add('hidden');

  if (tabId === 'landing') {
    tabLandingBtn.classList.add('active');
    landingScreen.classList.remove('hidden');
    scene.setView('landing');

  } else if (tabId === 'quiz') {
    tabQuizBtn.classList.add('active');
    quizScreen.classList.remove('hidden');
    scene.setView('quiz');
    quiz.start();

  } else if (tabId === 'builder') {
    tabBuilderBtn.classList.add('active');
    builderScreen.classList.remove('hidden');
    mealBuilder.start();
  }
}

// Raycaster Hover handler
function handleFoodHover(foodId) {
  if (currentTab !== 'landing') {
    hoverLabel.classList.add('hidden');
    return;
  }

  if (foodId) {
    const item = foodItems[foodId];
    hoverLabel.textContent = `🔬 Click to inspect: ${item.name} (${item.group.toUpperCase()})`;
    hoverLabel.classList.remove('hidden');
  } else {
    hoverLabel.textContent = '🔍 Hover over a 3D food item to inspect it';
  }
}

// Raycaster Click handler
function handleFoodClick(foodId) {
  if (currentTab === 'landing') {
    showFoodCard(foodId);
  } else if (currentTab === 'builder') {
    mealBuilder.toggleFood(foodId);
  }
}

// Render and show Food Card overlay on landing screen
function showFoodCard(foodId) {
  const item = foodItems[foodId];
  if (!item) return;

  audio.playClick();

  // Apply category tint class to the container card
  foodCardModal.className = 'interactive-panel food-detail-card';
  foodCardModal.classList.add(`card-${item.group}`);

  // Populate card metadata
  document.getElementById('card-title').textContent = item.name;
  
  const tag = document.getElementById('card-group-tag');
  tag.textContent = item.group;
  tag.className = `group-tag tag-${item.group}`;

  document.getElementById('card-tagline').textContent = `"${item.tagline}"`;

  // Set nutrients lists
  const nuts = item.nutrients;
  document.getElementById('nut-calories').textContent = `${nuts.calories} kcal`;
  document.getElementById('nut-carbs').textContent = nuts.carbs;
  document.getElementById('nut-fiber').textContent = nuts.fiber;
  document.getElementById('nut-protein').textContent = nuts.protein;
  document.getElementById('nut-fat').textContent = nuts.fat;
  document.getElementById('nut-sugar').textContent = nuts.sugar;
  document.getElementById('nut-sodium').textContent = nuts.sodium;
  document.getElementById('nut-vitamins').textContent = nuts.vitamins;

  // Pick a random fun fact to display
  const randFact = item.funFacts[Math.floor(Math.random() * item.funFacts.length)];
  document.getElementById('card-fact-text').textContent = randFact;

  // Unhide card
  foodCardModal.classList.remove('hidden');
}

// Audio mute handler
function toggleAudio() {
  const isMuted = audio.toggleMute();
  
  if (isMuted) {
    audioToggleBtn.innerHTML = '🔈 Sound Off';
    audioToggleBtn.classList.remove('sound-active');
  } else {
    audioToggleBtn.innerHTML = '🔊 Sound On';
    audioToggleBtn.classList.add('sound-active');
    // Play a click as immediate feedback of initialization
    audio.playClick();
  }
}

// Wait for DOM to load
window.addEventListener('DOMContentLoaded', initApp);
