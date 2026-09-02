import { evaluateMeal, foodItems } from './foodData.js';
import { scene } from './scene.js';
import { audio } from './audio.js';

class MealBuilderController {
  constructor() {
    this.selectedIds = [];

    // DOM Elements
    this.builderOverlay = null;
    this.foodBadgesContainer = null;
    this.scoreCardOverlay = null;
    
    // Nutrition & 50-25-25 Proportion bars
    this.barVitamins = null; // 50% Fruits & Vegetables
    this.barCarbs = null;    // 25% Carbohydrates (Whole Grains)
    this.barProtein = null;  // 25% Protein
    this.barCalories = null; // Total energy
    this.barSugar = null;    // Sugar limit

    // Shelf item toggle buttons
    this.shelfButtonsContainer = null;
  }

  init() {
    this.builderOverlay = document.getElementById('screen-builder');
    this.foodBadgesContainer = document.getElementById('builder-badges');
    this.scoreCardOverlay = document.getElementById('meal-score-overlay');

    // Bind progress bars
    this.barVitamins = document.getElementById('meter-vitamins');
    this.barCarbs = document.getElementById('meter-carbs');
    this.barProtein = document.getElementById('meter-protein');
    this.barCalories = document.getElementById('meter-calories');
    this.barSugar = document.getElementById('meter-sugar');

    this.shelfButtonsContainer = document.getElementById('builder-shelves-list');

    // Bind buttons
    document.getElementById('builder-score-btn').onclick = () => {
      audio.playClick();
      this.showScore();
    };

    document.getElementById('score-close-btn').onclick = () => {
      audio.playClick();
      this.scoreCardOverlay.classList.add('hidden');
    };

    document.getElementById('builder-reset-btn').onclick = () => {
      audio.playClick();
      this.reset();
    };
  }

  start() {
    this.init();
    this.selectedIds = [];
    this.builderOverlay.classList.remove('hidden');
    this.scoreCardOverlay.classList.add('hidden');
    scene.setView('meal-builder');

    // Build sidebar list of shelf controls
    this.renderShelfControls();
    this.updateUI();
  }

  renderShelfControls() {
    this.shelfButtonsContainer.innerHTML = '';
    
    Object.keys(foodItems).forEach(id => {
      const item = foodItems[id];
      const div = document.createElement('div');
      div.className = 'shelf-item-row';
      div.id = `row-${id}`;
      
      div.innerHTML = `
        <span class="shelf-indicator" style="background-color: ${item.color}"></span>
        <span class="shelf-item-name">${item.name}</span>
        <button class="shelf-toggle-btn" id="btn-toggle-${id}">Add</button>
      `;

      div.querySelector('.shelf-toggle-btn').onclick = () => {
        audio.playClick();
        this.toggleFood(id);
      };

      this.shelfButtonsContainer.appendChild(div);
    });
  }

  toggleFood(id) {
    scene.toggleFoodOnPlate(id);
    
    const index = this.selectedIds.indexOf(id);
    if (index === -1) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds.splice(index, 1);
    }

    this.updateUI();
  }

  updateUI() {
    // 1. Update shelf sidebar buttons state
    Object.keys(foodItems).forEach(id => {
      const btn = document.getElementById(`btn-toggle-${id}`);
      const row = document.getElementById(`row-${id}`);
      if (btn && row) {
        if (this.selectedIds.includes(id)) {
          btn.textContent = 'Remove';
          btn.classList.add('selected');
          row.classList.add('selected');
        } else {
          btn.textContent = 'Add';
          btn.classList.remove('selected');
          row.classList.remove('selected');
        }
      }
    });

    // 2. Render plate item badges
    this.foodBadgesContainer.innerHTML = '';
    if (this.selectedIds.length === 0) {
      this.foodBadgesContainer.innerHTML = '<span class="empty-plate-text">Plate is empty. Click items from shelves to build your 50–25–25 plate!</span>';
    } else {
      this.selectedIds.forEach(id => {
        const item = foodItems[id];
        const badge = document.createElement('div');
        badge.className = 'food-badge';
        badge.style.borderLeft = `4px solid ${item.color}`;
        badge.innerHTML = `
          <span>${item.name}</span>
          <button class="badge-remove-btn" title="Remove from plate">&times;</button>
        `;
        badge.querySelector('.badge-remove-btn').onclick = () => {
          audio.playClick();
          this.toggleFood(id);
        };
        this.foodBadgesContainer.appendChild(badge);
      });
    }

    // 3. Compute real-time values for meters based on 50-25-25 model
    const analysis = evaluateMeal(this.selectedIds);
    this.updateMeters(analysis);
  }

  updateMeters(analysis) {
    const nut = analysis.nutrients;
    const b = analysis.breakdown;

    // 1. 50% Fruits & Vegetables Meter (Target: 2 items = 100%)
    const pctProduce = Math.min(100, (b.vegFruit / 2) * 100);
    const fillProduce = this.barVitamins.querySelector('.meter-fill');
    fillProduce.style.width = `${pctProduce}%`;
    this.barVitamins.querySelector('.meter-val').textContent = `${b.vegFruit} / 2 Servings`;
    if (pctProduce >= 100) fillProduce.style.backgroundColor = '#22c55e';
    else if (pctProduce > 0) fillProduce.style.backgroundColor = '#f59e0b';
    else fillProduce.style.backgroundColor = '#ef4444';

    // 2. 25% Carbohydrates Meter (Target: 1 whole grain serving = 100%)
    const pctCarbs = Math.min(100, (b.carbs / 1) * 100);
    const fillCarbs = this.barCarbs.querySelector('.meter-fill');
    fillCarbs.style.width = `${pctCarbs}%`;
    this.barCarbs.querySelector('.meter-val').textContent = `${b.carbs} / 1 Serving`;
    if (b.carbs === 1) fillCarbs.style.backgroundColor = '#22c55e';
    else if (b.carbs > 1) fillCarbs.style.backgroundColor = '#f59e0b';
    else fillCarbs.style.backgroundColor = '#ef4444';

    // 3. 25% Protein Meter (Target: 1-2 protein servings = 100%)
    const pctProtein = Math.min(100, (b.protein / 1) * 100);
    const fillProtein = this.barProtein.querySelector('.meter-fill');
    fillProtein.style.width = `${pctProtein}%`;
    this.barProtein.querySelector('.meter-val').textContent = `${b.protein} / 1-2 Servings`;
    if (b.protein >= 1 && b.protein <= 2) fillProtein.style.backgroundColor = '#22c55e';
    else if (b.protein > 2) fillProtein.style.backgroundColor = '#f59e0b';
    else fillProtein.style.backgroundColor = '#ef4444';

    // 4. Calories Meter (Target ~400-600 kcal for a balanced student meal)
    const currentCalories = nut.calories || 0;
    const pctCal = Math.min(100, (currentCalories / 550) * 100);
    const fillCal = this.barCalories.querySelector('.meter-fill');
    fillCal.style.width = `${pctCal}%`;
    this.barCalories.querySelector('.meter-val').textContent = `${currentCalories} kcal`;
    if (currentCalories >= 350 && currentCalories <= 650) fillCal.style.backgroundColor = '#22c55e';
    else fillCal.style.backgroundColor = '#f59e0b';

    // 5. Added Sugar (Warning meter, lower is better)
    const currentSugar = parseFloat(nut.sugar) || 0;
    const pctSug = Math.min(100, (currentSugar / 25) * 100);
    const fillSug = this.barSugar.querySelector('.meter-fill');
    fillSug.style.width = `${pctSug}%`;
    this.barSugar.querySelector('.meter-val').textContent = `${currentSugar}g`;
    if (pctSug > 80) fillSug.style.backgroundColor = '#ef4444';
    else if (pctSug > 50) fillSug.style.backgroundColor = '#f59e0b';
    else fillSug.style.backgroundColor = '#22c55e';
  }

  showScore() {
    const analysis = evaluateMeal(this.selectedIds);

    const scoreTitle = document.getElementById('score-grade');
    const scoreSummary = document.getElementById('score-summary');
    const scoreList = document.getElementById('score-tips');
    const scorePoints = document.getElementById('score-number');

    scoreTitle.textContent = analysis.grade;
    scoreTitle.style.color = analysis.color;
    scorePoints.textContent = `Score: ${analysis.score}/100`;
    scoreSummary.textContent = analysis.summary;

    scoreList.innerHTML = '';
    analysis.tips.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      scoreList.appendChild(li);
    });

    this.scoreCardOverlay.classList.remove('hidden');

    if (analysis.score >= 80) {
      audio.playVictory();
    } else {
      audio.playIncorrect();
    }
  }

  reset() {
    [...this.selectedIds].forEach(id => {
      scene.toggleFoodOnPlate(id);
    });
    this.selectedIds = [];
    this.updateUI();
  }
}

export const mealBuilder = new MealBuilderController();
