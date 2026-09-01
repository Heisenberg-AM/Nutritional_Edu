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
    
    // Nutrition bars
    this.barCalories = null;
    this.barCarbs = null;
    this.barProtein = null;
    this.barVitamins = null;
    this.barSugar = null;

    // Shelf item toggle buttons (for keyboard/chromebook accessibility)
    this.shelfButtonsContainer = null;
  }

  init() {
    this.builderOverlay = document.getElementById('screen-builder');
    this.foodBadgesContainer = document.getElementById('builder-badges');
    this.scoreCardOverlay = document.getElementById('meal-score-overlay');

    // Bind progress bars
    this.barCalories = document.getElementById('meter-calories');
    this.barCarbs = document.getElementById('meter-carbs');
    this.barProtein = document.getElementById('meter-protein');
    this.barVitamins = document.getElementById('meter-vitamins');
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

    // Build sidebar list of shelf controls for double accessibility
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
      this.foodBadgesContainer.innerHTML = '<span class="empty-plate-text">Plate is empty. Add foods from shelves!</span>';
    } else {
      this.selectedIds.forEach(id => {
        const item = foodItems[id];
        const badge = document.createElement('div');
        badge.className = 'food-badge';
        badge.style.borderLeft = `4px solid ${item.color}`;
        badge.innerHTML = `
          <span>${item.name}</span>
          <button class="badge-remove-btn">&times;</button>
        `;
        badge.querySelector('.badge-remove-btn').onclick = () => {
          audio.playClick();
          this.toggleFood(id);
        };
        this.foodBadgesContainer.appendChild(badge);
      });
    }

    // 3. Compute real-time values for meters
    const analysis = evaluateMeal(this.selectedIds);
    this.updateMeters(analysis);
  }

  updateMeters(analysis) {
    const nut = analysis.nutrients;

    // Helper to set meter fill width and label
    const setMeter = (bar, fillEl, currentVal, maxVal, unit) => {
      const pct = Math.min(100, (currentVal / maxVal) * 100);
      fillEl.style.width = `${pct}%`;
      bar.querySelector('.meter-val').textContent = `${currentVal}${unit}`;

      // Color coding
      if (pct > 90 && pct <= 110) {
        fillEl.style.backgroundColor = '#34c759'; // green (perfect target)
      } else if (pct > 110) {
        fillEl.style.backgroundColor = '#ff3b30'; // red (over limit)
      } else {
        fillEl.style.backgroundColor = '#ff9500'; // orange (building up)
      }
    };

    // Limits based on a single ideal lunch meal (approx 1/3 of daily values)
    // Calories: Target ~700
    // Carbs: Target ~80g
    // Protein: Target ~20g
    // Vitamins: Calculated based on number of fruits/veg (target 2 items = 100%)
    // Sugar: Max limit ~18g
    
    // Count fruits and vegetables
    let vegCount = 0;
    this.selectedIds.forEach(id => {
      const item = foodItems[id];
      if (item && (item.group === 'fruit' || item.group === 'vegetable')) {
        vegCount++;
      }
    });

    const currentCalories = nut.calories || 0;
    const currentCarbs = parseFloat(nut.carbs) || 0;
    const currentProtein = parseFloat(nut.protein) || 0;
    const currentSugar = parseFloat(nut.sugar) || 0;

    // 1. Calories
    const pctCal = Math.min(100, (currentCalories / 700) * 100);
    this.barCalories.querySelector('.meter-fill').style.width = `${pctCal}%`;
    this.barCalories.querySelector('.meter-val').textContent = `${currentCalories} kcal`;

    // 2. Carbs
    const pctCar = Math.min(100, (currentCarbs / 70) * 100);
    this.barCarbs.querySelector('.meter-fill').style.width = `${pctCar}%`;
    this.barCarbs.querySelector('.meter-val').textContent = `${currentCarbs}g`;

    // 3. Protein
    const pctPro = Math.min(100, (currentProtein / 22) * 100);
    this.barProtein.querySelector('.meter-fill').style.width = `${pctPro}%`;
    this.barProtein.querySelector('.meter-val').textContent = `${currentProtein}g`;

    // 4. Fruits & Vegetables (Vitamins Meter)
    const pctVit = Math.min(100, (vegCount / 2) * 100);
    const fillVit = this.barVitamins.querySelector('.meter-fill');
    fillVit.style.width = `${pctVit}%`;
    this.barVitamins.querySelector('.meter-val').textContent = `${vegCount} / 2 Servings`;
    if (pctVit >= 100) fillVit.style.backgroundColor = '#34c759';
    else if (pctVit > 0) fillVit.style.backgroundColor = '#ff9500';
    else fillVit.style.backgroundColor = '#ff3b30';

    // 5. Sugar (Warning meter, lower is better)
    const pctSug = Math.min(100, (currentSugar / 20) * 100);
    const fillSug = this.barSugar.querySelector('.meter-fill');
    fillSug.style.width = `${pctSug}%`;
    this.barSugar.querySelector('.meter-val').textContent = `${currentSugar}g`;
    if (pctSug > 100) fillSug.style.backgroundColor = '#ff3b30'; // over limit
    else if (pctSug > 60) fillSug.style.backgroundColor = '#ff9500'; // caution
    else fillSug.style.backgroundColor = '#34c759'; // great low sugar
  }

  showScore() {
    const analysis = evaluateMeal(this.selectedIds);

    // Build popup content
    const scoreTitle = document.getElementById('score-grade');
    const scoreSummary = document.getElementById('score-summary');
    const scoreList = document.getElementById('score-tips');
    const scorePoints = document.getElementById('score-number');

    scoreTitle.textContent = analysis.grade;
    scoreTitle.style.color = analysis.color;
    scorePoints.textContent = `Score: ${analysis.score}/100`;
    scoreSummary.textContent = analysis.summary;

    // Build tips list
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
    // Clear plate in scene and arrays
    [...this.selectedIds].forEach(id => {
      scene.toggleFoodOnPlate(id);
    });
    this.selectedIds = [];
    this.updateUI();
  }
}

export const mealBuilder = new MealBuilderController();
