import { quizQuestions } from './foodData.js';
import { audio } from './audio.js';

// Lightweight Canvas Confetti Generator for correct feedback
class ConfettiEffect {
  constructor() {
    this.canvas = document.getElementById('confetti-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.active = false;
    
    if (this.canvas) {
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst() {
    if (!this.canvas || !this.ctx) return;
    this.particles = [];
    this.active = true;

    const colors = ['#ff1a48', '#22c55e', '#f97316', '#6366f1', '#06b6d4', '#eab308'];
    const pCount = 80;

    // Burst from center-top (near the question card)
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height * 0.45;

    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      
      this.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3, // slightly upward bias
        size: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.1 + Math.random() * 0.2,
        opacity: 1.0,
        gravity: 0.25
      });
    }

    this.tick();
  }

  tick() {
    if (!this.active || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let hasAlive = false;
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.016; // fade out in ~60 frames

      if (p.opacity > 0) {
        hasAlive = true;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.ctx.restore();
      }
    });

    if (hasAlive) {
      requestAnimationFrame(() => this.tick());
    } else {
      this.active = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

class QuizController {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.selectedOption = null;
    this.confetti = null;

    // DOM Elements
    this.quizOverlay = null;
    this.questionEl = null;
    this.optionsContainerEl = null;
    this.progressTextEl = null;
    this.progressFillEl = null;
    this.feedbackEl = null;
    this.feedbackTextEl = null;
    this.nextBtn = null;

    // Results screen
    this.resultsOverlay = null;
    this.scoreTextEl = null;
    this.resultsMsgEl = null;
    this.restartBtn = null;
  }

  init() {
    if (this.quizOverlay) return; // already initialized

    this.quizOverlay = document.getElementById('quiz-overlay');
    this.questionEl = document.getElementById('quiz-question');
    this.optionsContainerEl = document.getElementById('quiz-options');
    this.progressTextEl = document.getElementById('quiz-progress-text');
    this.progressFillEl = document.getElementById('quiz-progress-fill');
    this.feedbackEl = document.getElementById('quiz-feedback');
    this.feedbackTextEl = document.getElementById('quiz-feedback-text');
    this.nextBtn = document.getElementById('quiz-next-btn');

    this.resultsOverlay = document.getElementById('results-overlay');
    this.scoreTextEl = document.getElementById('results-score');
    this.resultsMsgEl = document.getElementById('results-message');
    this.restartBtn = document.getElementById('quiz-restart-btn');

    this.confetti = new ConfettiEffect();

    // Button event listeners
    this.nextBtn.addEventListener('click', () => {
      audio.playClick();
      this.nextQuestion();
    });

    this.restartBtn.addEventListener('click', () => {
      audio.playClick();
      this.start();
    });
  }

  start() {
    this.init(); // ensure elements are bound

    // Shuffle and pick exactly 10 questions
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    this.questions = shuffled.slice(0, 10);

    this.currentIndex = 0;
    this.score = 0;

    // Show quiz layout, hide results
    this.quizOverlay.classList.remove('hidden');
    this.resultsOverlay.classList.add('hidden');

    this.renderQuestion();
  }

  renderQuestion() {
    const q = this.questions[this.currentIndex];
    this.selectedOption = null;

    // Hide feedback panel
    this.feedbackEl.classList.add('hidden');
    this.nextBtn.disabled = true;

    // Set text
    this.questionEl.textContent = q.question;
    
    // Update progress bar
    const progressNum = this.currentIndex + 1;
    this.progressTextEl.textContent = `Question ${progressNum} of 10`;
    this.progressFillEl.style.width = `${(progressNum / 10) * 100}%`;

    // Clear and build options
    this.optionsContainerEl.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + idx)}</span> <span class="option-text">${opt}</span>`;
      btn.addEventListener('click', () => this.selectOption(idx, btn));
      this.optionsContainerEl.appendChild(btn);
    });
  }

  selectOption(idx, optionBtn) {
    if (this.selectedOption !== null) return; // Answer already locked in
    this.selectedOption = idx;

    const q = this.questions[this.currentIndex];
    const optionBtns = this.optionsContainerEl.querySelectorAll('.quiz-option-btn');

    if (idx === q.answer) {
      // Correct!
      this.score++;
      optionBtn.classList.add('correct');
      audio.playCorrect();
      this.feedbackTextEl.innerHTML = `<span class="correct-text">🎉 Correct!</span><br>${q.explanation}`;
      
      // Fire confetti burst!
      if (this.confetti) {
        this.confetti.burst();
      }
    } else {
      // Incorrect
      optionBtn.classList.add('incorrect');
      optionBtns[q.answer].classList.add('correct-highlight'); // highlight correct answer
      audio.playIncorrect();
      this.feedbackTextEl.innerHTML = `<span class="incorrect-text">❌ Incorrect</span><br>${q.explanation}`;
    }

    // Fade in feedback card and enable Next button
    this.feedbackEl.classList.remove('hidden');
    this.nextBtn.disabled = false;

    // Disable all options
    optionBtns.forEach(btn => btn.style.pointerEvents = 'none');
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < 10) {
      this.renderQuestion();
    } else {
      this.finish();
    }
  }

  finish() {
    this.quizOverlay.classList.add('hidden');
    this.resultsOverlay.classList.remove('hidden');

    this.scoreTextEl.textContent = `${this.score} / 10`;

    let msg = '';
    let emoji = '💪';
    if (this.score === 10) {
      msg = "Nutritional Masterclass! Perfect Score! You know exactly how to fuel your body.";
      emoji = '🥇';
    } else if (this.score >= 8) {
      msg = "Excellent job! You have a solid understanding of healthy eating habits and the 50–25–25 Healthy Plate model.";
      emoji = '🌟';
    } else if (this.score >= 6) {
      msg = "Good effort! You know a lot, but could review some areas to improve your daily food choices.";
      emoji = '🥗';
    } else {
      msg = "Keep practicing! Review the fun facts of the 3D foods on the landing screen and try again to level up.";
      emoji = '🍎';
    }

    this.resultsMsgEl.innerHTML = `<div class="results-emoji">${emoji}</div><div>${msg}</div>`;
    
    // Play fanfare
    audio.playVictory();
  }
}

export const quiz = new QuizController();
