# PlatePower 3D - 50–25–25 Interactive Nutritional Awareness Experience

An interactive, responsive 3D educational web application designed for 8th-grade students (ages 13–14) to learn nutritional awareness, food groups, and the **50–25–25 Healthy Plate Model** (50% Vegetables & Fruits, 25% Complex Carbohydrates, 25% Healthy Proteins), localized with Indian and Kerala foods.

Built from scratch using **Vite** and **Three.js** (vanilla JavaScript) without any heavy frameworks, external asset dependencies, or audio files (sound is synthesized dynamically via Web Audio API).

## Key Features
1. **Interactive 3D Food Library**: Explore 9 low-poly, glossy procedural food models (Red Apple, Banana, Orange Carrot, Palak/Leafy Greens, Whole Wheat Roti, Boiled Egg, Fresh Paneer, Fish, Curd/Buttermilk) arranged around a central 50–25–25 plate. Hovering/clicking a food item triggers a detailed nutrition card with educational fun facts.
2. **Nutrition Quiz**: An interactive 10-question multiple-choice quiz covering the 50–25–25 plate framework, macronutrients, Indian nutritional science, hydration, and sugar limits with real-time feedback and confetti animations.
3. **50–25–25 Meal Builder**: A 3D playground where students select and place foods on their plate in real-time. Displays visual feedback gauges tracking the 50% Fruits/Vegetables target, 25% Carbohydrates target, 25% Protein target, and energy balance.
4. **Virtual Nutritionist Review**: Students can submit their 3D meal for grading against the 50–25–25 model, receiving an A+ to D grade with constructive feedback.
5. **Synthesized Web Audio**: Dynamic sound controls providing background music and retro synth cues synthesized programmatically via the Web Audio API.
6. **Classroom Responsive Design**: Tailored visual scales and glassmorphic panels optimized to fit laptop and Chromebook screens.

---

## File Structure

```text
SSR/
├── index.html          # Semantic HTML structure containing CSS glassmorphism overlay cards
├── package.json        # Node project metadata, dependencies (three), and script definitions
├── README.md           # Documentation and running guidelines
├── vite.config.js      # Vite build configuration with relative base path
└── src/
    ├── main.js         # Core entry script; orchestrates views, events, and HUD panels
    ├── scene.js        # Three.js engine; controls scenes, cameras, lighting, raycasting, and bobbing
    ├── models.js       # Procedural 3D model creators (Lathe/Extrude shapes with custom Canvas textures)
    ├── foodData.js     # Structured dataset for food nutrition, 50-25-25 grading, and 12-question quiz pool
    ├── quiz.js         # Handles quiz rendering, options button grid, and confetti bursts
    ├── mealBuilder.js  # Handles sidebars, real-time 50-25-25 meter updates, and the nutritionist scorecard
    ├── audio.js        # Web Audio API sound generator (ambient chord progression and sound effects)
    └── style.css       # Design system; layout grids, color tokens, and responsive mobile overrides
```

---

## Getting Started

### Prerequisites
*   Node.js (v18.0.0 or higher recommended)
*   npm (installed automatically with Node.js)

### Installation
1. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
Launch the local Vite server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production
To bundle and compile the application for deployment (e.g. static hosting on GitHub Pages):
```bash
npm run build
```
The production assets will be output to the `/dist` directory.
