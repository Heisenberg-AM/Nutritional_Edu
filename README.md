# PlatePower 3D - Interactive 3D Nutritional Awareness Website

An interactive, responsive 3D educational web application designed for 8th-grade students (ages 13–14) to learn nutritional awareness, food groups, and USDA MyPlate guidelines.

Built from scratch using **Vite** and **Three.js** (vanilla JavaScript) without any heavy frameworks, external asset dependencies, or audio files (sound is synthesized dynamically).

## Features
1. **Interactive 3D Food Library**: Explore 9 low-poly, cel-shaded food items arranged around a central plate. Hovering/clicking a food item triggers a detailed overlay showing its key nutrients (Carbs, Fiber, Protein, Vitamins, Sugar, Sodium, etc.) and randomized educational fun facts.
2. **Nutrition Quiz**: An interactive 10-question multiple-choice quiz covering healthy habits, calorie awareness, sodium, and nutrients. Questions are randomized, and each answer provides instant audio-visual correctness feedback alongside a clear scientific explanation.
3. **Balanced Meal Builder**: A 3D playground where students select and place foods on their plate in real-time. Displays visual feedback gauges tracking Calories, Carbohydrates, Proteins, Vitamin servings, and Sugar limits relative to ideal USDA guidelines for a single meal.
4. **Virtual Nutritionist Review**: Students can submit their 3D meal for grading. Evaluates calorie balance, sugar limits, sodium, and portion size, providing an A+ to D grade with constructive suggestions for improvement.
5. **Synthesized Web Audio**: Dynamic sound controls providing soft background music chord pads and arpeggiated/buzzy synth cues for correct/incorrect clicks—all synthesized programmatically via the Web Audio API.
6. **Classroom Responsive Design**: Tailored visual scales and glassmorphic panels optimized to fit laptop and Chromebook screens.

---

## File Structure

```text
SSR/
├── index.html          # Semantic HTML structure containing CSS glassmorphism overlay cards
├── package.json        # Node project metadata, dependencies (three), and script definitions
├── README.md           # Documentation and running guidelines (this file)
└── src/
    ├── main.js         # Core entry script; orchestrates views, events, and HUD panels
    ├── scene.js        # Three.js engine; controls scenes, cameras, lighting, raycasting, and bobbing
    ├── models.js       # Procedural 3D model creators (Lathe/Extrude shapes with custom Canvas textures)
    ├── foodData.js     # Structured dataset for food nutrition, MyPlate grading, and 12-question quiz pool
    ├── quiz.js         # Handles quiz rendering, options button grid, and feedback animations
    ├── mealBuilder.js  # Handles sidebars, real-time meter updates, and the nutritionist scorecard
    ├── audio.js        # Web Audio API sound generator (ambient chord progression and sound effects)
    └── style.css       # Design system; layout grids, color tokens, and responsive mobile overrides
```

---

## Getting Started

To install dependencies and run the project locally, follow these steps:

### Prerequisites
*   Node.js (v16.0.0 or higher recommended)
*   npm (installed automatically with Node.js)

### Installation
1. Navigate to the project directory:
   ```bash
   cd SSR
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
Launch the local Vite server:
```bash
npm run dev
```
Once the command finishes, open the local URL (usually `http://localhost:5173`) in your browser to view the application.

### Building for Production
To bundle and compile the application for deployment (e.g. static hosting on GitHub Pages):
```bash
npm run build
```
The production assets will be output to the `/dist` directory.
