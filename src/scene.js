import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getFoodModel, createPlateModel } from './models.js';
import { foodItems } from './foodData.js';

class SceneController {
  constructor() {
    this.container = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    this.plate = null;
    this.foods = {};        // Map of foodId -> THREE.Group
    this.shelves = [];      // 3D shelf meshes
    this.groundPlatform = null; // Glowing grid pad
    this.foodGlowPads = {};    // Map of foodId -> THREE.Mesh (colored glow discs)

    // Interaction state
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredFoodId = null;

    // View state: 'landing', 'meal-builder', 'quiz'
    this.currentView = 'landing';

    // Cinematic Camera Lerping Targets
    this.targetCameraPos = new THREE.Vector3(0, 5, 8);
    this.targetCameraLookAt = new THREE.Vector3(0, 0, 0);

    // Animation variables
    this.lastTime = performance.now() * 0.001;
    this.startTime = this.lastTime;
    this.foodAnimations = {}; // ID -> { targetPos, targetRot, targetScale, currentPos, currentRot, currentScale, scaleVelocity }
    
    // Callbacks set by main UI
    this.onHoverCallback = null;
    this.onClickCallback = null;

    // Meal Builder State
    this.selectedFoodIds = []; // List of IDs currently on the plate
  }

  init(containerElement) {
    this.container = containerElement;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = null; // Transparent backdrop to show CSS gradient

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      100
    );
    this.camera.position.copy(this.targetCameraPos);

    // 3. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 15;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't orbit below ground
    this.controls.target.copy(this.targetCameraLookAt);

    // 5. Lighting (Juicy, professional three-point setup)
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.55);
    this.scene.add(ambientLight);

    // Key Light (Bright white, cast shadows)
    const keyLight = new THREE.DirectionalLight('#ffffff', 1.25);
    keyLight.position.set(6, 12, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    // Fill Light (Soft cool blue-lavender balance)
    const fillLight = new THREE.DirectionalLight('#e0e7ff', 0.65);
    fillLight.position.set(-6, 8, -3);
    this.scene.add(fillLight);

    // Accent Light (Warm orange-peach front accent pointing up)
    const accentLight = new THREE.DirectionalLight('#fed7aa', 0.45);
    accentLight.position.set(0, -8, 6); 
    this.scene.add(accentLight);

    // 6. Glowing Ground Grid Platform
    this.createGroundPlatform();

    // 7. Plate Setup
    this.plate = createPlateModel();
    this.plate.position.set(0, -0.4, 0);
    this.scene.add(this.plate);

    // 8. Spawn Food Items
    const foodIds = Object.keys(foodItems);
    foodIds.forEach(id => {
      const model = getFoodModel(id);
      
      // Set shadows recursively
      model.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.scene.add(model);
      this.foods[id] = model;

      // Initialize animation states with spring velocity trackers
      this.foodAnimations[id] = {
        currentPos: new THREE.Vector3(),
        currentTargetPos: new THREE.Vector3(),
        currentRot: new THREE.Vector3(),
        currentTargetRot: new THREE.Vector3(),
        currentScale: new THREE.Vector3(1, 1, 1),
        currentTargetScale: new THREE.Vector3(1, 1, 1),
        scaleVelocity: new THREE.Vector3(0, 0, 0), // velocity for spring physics
        bobSpeed: 1.2 + Math.random() * 0.4,
        bobOffset: Math.random() * Math.PI * 2,
        rotSpeed: 0.2 + Math.random() * 0.2
      };

      // 9. Spawn Interactive Under-Food Glow Pads (pools colored light)
      this.createFoodGlowPad(id);
    });

    // 10. Setup Shelves
    this.createShelves();

    // 11. Event Listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    this.container.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.container.addEventListener('click', this.onMouseClick.bind(this));

    // Initial View setup
    this.setView('landing');

    // Start loop
    this.tick();
  }

  createGroundPlatform() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Draw glowing neon center
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
    grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');
    grad.addColorStop(0.8, 'rgba(6, 182, 212, 0.03)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // Draw concentric dashed neon rings
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 8]);
    ctx.beginPath();
    ctx.arc(128, 128, 90, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.arc(128, 128, 60, 0, Math.PI * 2);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    const platformGeom = new THREE.PlaneGeometry(6.5, 6.5);
    const platformMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    this.groundPlatform = new THREE.Mesh(platformGeom, platformMat);
    this.groundPlatform.rotation.x = -Math.PI / 2;
    this.groundPlatform.position.y = -0.46; 
    this.scene.add(this.groundPlatform);
  }

  createFoodGlowPad(id) {
    const color = foodItems[id].color;
    
    // Draw a soft radial glow matching category color
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, color + 'aa'); // 66% opacity center
    grad.addColorStop(0.4, color + '33'); // 20% opacity mid
    grad.addColorStop(1, color + '00'); // 0% opacity edge
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    const geom = new THREE.PlaneGeometry(0.85, 0.85);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending // soft glow overlay blend
    });

    const glowMesh = new THREE.Mesh(geom, mat);
    glowMesh.rotation.x = -Math.PI / 2;
    glowMesh.position.y = -0.38;
    this.scene.add(glowMesh);
    
    this.foodGlowPads[id] = glowMesh;
  }

  createShelves() {
    const shelfMat = new THREE.MeshStandardMaterial({ color: '#85583f', roughness: 0.9, metalness: 0.1 });
    const shelfGeom = new THREE.BoxGeometry(3.6, 0.1, 0.9);

    // Left Shelf
    const shelfL = new THREE.Mesh(shelfGeom, shelfMat);
    shelfL.position.set(-3.5, -0.45, -1.0);
    shelfL.receiveShadow = true;
    this.scene.add(shelfL);
    this.shelves.push(shelfL);

    // Right Shelf
    const shelfR = new THREE.Mesh(shelfGeom, shelfMat);
    shelfR.position.set(3.5, -0.45, -1.0);
    shelfR.receiveShadow = true;
    this.scene.add(shelfR);
    this.shelves.push(shelfR);

    // Hide shelves initially in landing
    this.shelves.forEach(s => s.visible = false);
  }

  setView(view) {
    this.currentView = view;
    const ids = Object.keys(this.foods);

    if (view === 'landing') {
      // Show plate, hide shelves, show glow pads
      this.plate.visible = true;
      this.groundPlatform.visible = true;
      this.plate.position.set(0, -0.4, 0);
      this.shelves.forEach(s => s.visible = false);
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.65;

      ids.forEach((id, idx) => {
        this.foods[id].visible = true;
        this.foodGlowPads[id].visible = true;

        const angle = (idx / ids.length) * Math.PI * 2;
        const radius = 3.6;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const y = 0.4;

        const anim = this.foodAnimations[id];
        anim.currentTargetPos.set(x, y, z);
        anim.currentTargetRot.set(0, angle, 0);
        anim.currentTargetScale.set(1.0, 1.0, 1.0);

        if (anim.currentPos.length() === 0) {
          anim.currentPos.copy(anim.currentTargetPos);
          anim.currentRot.copy(anim.currentTargetRot);
          anim.currentScale.copy(anim.currentTargetScale);
          this.foods[id].position.copy(anim.currentPos);
          this.foods[id].rotation.setFromVector3(anim.currentRot);
          this.foods[id].scale.copy(anim.currentScale);
        }
      });

      this.targetCameraPos.set(0, 3.8, 6.8);
      this.targetCameraLookAt.set(0, -0.2, 0);

    } else if (view === 'meal-builder') {
      // Show plate, shelves, show glow pads
      this.plate.visible = true;
      this.groundPlatform.visible = true;
      this.plate.position.set(0, -0.45, 0);
      this.shelves.forEach(s => s.visible = true);
      this.controls.autoRotate = false;

      this.selectedFoodIds = [];

      ids.forEach((id, idx) => {
        this.foods[id].visible = true;
        this.foodGlowPads[id].visible = true;
        const anim = this.foodAnimations[id];
        anim.currentTargetScale.set(0.7, 0.7, 0.7);

        if (idx < 5) {
          const zOffset = -2.2 + idx * 0.65;
          anim.currentTargetPos.set(-3.2, -0.1, zOffset);
          anim.currentTargetRot.set(0, Math.PI / 2, 0);
        } else {
          const zOffset = -2.2 + (idx - 5) * 0.75;
          anim.currentTargetPos.set(3.2, -0.1, zOffset);
          anim.currentTargetRot.set(0, -Math.PI / 2, 0);
        }
      });

      this.targetCameraPos.set(0, 4.4, 6.0);
      this.targetCameraLookAt.set(0, -0.3, 0);

    } else if (view === 'quiz') {
      // Hide elements
      this.plate.visible = false;
      this.groundPlatform.visible = false;
      this.shelves.forEach(s => s.visible = false);
      this.controls.autoRotate = false;
      
      ids.forEach(id => {
        this.foods[id].visible = false;
        this.foodGlowPads[id].visible = false;
      });

      this.targetCameraPos.set(0, 7.0, 10.0);
      this.targetCameraLookAt.set(0, 0, -2.0);
    }
  }

  toggleFoodOnPlate(id) {
    if (this.currentView !== 'meal-builder') return;

    const anim = this.foodAnimations[id];
    const index = this.selectedFoodIds.indexOf(id);

    if (index === -1) {
      this.selectedFoodIds.push(id);
      this.rearrangePlateFoods();
      anim.currentTargetScale.set(0.85, 0.85, 0.85);
    } else {
      this.selectedFoodIds.splice(index, 1);
      
      const ids = Object.keys(this.foods);
      const idx = ids.indexOf(id);
      anim.currentTargetScale.set(0.7, 0.7, 0.7);
      
      if (idx < 5) {
        const zOffset = -2.2 + idx * 0.65;
        anim.currentTargetPos.set(-3.2, -0.1, zOffset);
        anim.currentTargetRot.set(0, Math.PI / 2, 0);
      } else {
        const zOffset = -2.2 + (idx - 5) * 0.75;
        anim.currentTargetPos.set(3.2, -0.1, zOffset);
        anim.currentTargetRot.set(0, -Math.PI / 2, 0);
      }

      this.rearrangePlateFoods();
    }
    
    this.triggerClickPop(id);
  }

  rearrangePlateFoods() {
    const count = this.selectedFoodIds.length;
    if (count === 0) return;

    const r = 0.65;

    this.selectedFoodIds.forEach((id, idx) => {
      const anim = this.foodAnimations[id];
      const angle = (idx / count) * Math.PI * 2;
      const x = Math.sin(angle) * r;
      const z = Math.cos(angle) * r;
      
      anim.currentTargetPos.set(x, -0.2, z);
      anim.currentTargetRot.set(0, angle, 0);
    });
  }

  triggerClickPop(id) {
    const anim = this.foodAnimations[id];
    if (anim) {
      const baseVal = this.currentView === 'meal-builder' 
        ? (this.selectedFoodIds.includes(id) ? 0.85 : 0.7) 
        : 1.0;
      anim.currentScale.set(baseVal * 0.35, baseVal * 0.35, baseVal * 0.35);
      anim.scaleVelocity.set(0, 0, 0);
    }
  }

  onMouseMove(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersectableObjects = [];
    Object.keys(this.foods).forEach(id => {
      const model = this.foods[id];
      if (model.visible) {
        intersectableObjects.push(model);
      }
    });

    const intersects = this.raycaster.intersectObjects(intersectableObjects, true);

    if (intersects.length > 0) {
      let obj = intersects[0].object;
      while (obj.parent && !obj.name) {
        obj = obj.parent;
      }
      
      const foodId = obj.name;

      if (this.hoveredFoodId !== foodId) {
        this.hoveredFoodId = foodId;
        this.container.style.cursor = 'pointer';
        
        if (this.hoveredFoodId) {
          const baseScale = this.currentView === 'meal-builder' 
            ? (this.selectedFoodIds.includes(this.hoveredFoodId) ? 0.85 : 0.7) 
            : 1.0;
          
          this.foodAnimations[this.hoveredFoodId].currentTargetScale.set(
            baseScale * 1.25,
            baseScale * 1.25,
            baseScale * 1.25
          );
        }

        if (this.onHoverCallback) this.onHoverCallback(this.hoveredFoodId);
      }
    } else {
      if (this.hoveredFoodId) {
        const baseScale = this.currentView === 'meal-builder'
          ? (this.selectedFoodIds.includes(this.hoveredFoodId) ? 0.85 : 0.7)
          : 1.0;
        
        this.foodAnimations[this.hoveredFoodId].currentTargetScale.set(baseScale, baseScale, baseScale);
        
        this.hoveredFoodId = null;
        this.container.style.cursor = 'default';
        if (this.onHoverCallback) this.onHoverCallback(null);
      }
    }
  }

  onMouseClick() {
    if (this.hoveredFoodId) {
      this.triggerClickPop(this.hoveredFoodId);
      if (this.onClickCallback) {
        this.onClickCallback(this.hoveredFoodId);
      }
    }
  }

  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  tick() {
    requestAnimationFrame(this.tick.bind(this));

    const currentTime = performance.now() * 0.001;
    const delta = Math.min(0.08, currentTime - this.lastTime); 
    this.lastTime = currentTime;
    const time = currentTime - this.startTime;

    // Smooth Camera sweeps
    this.camera.position.lerp(this.targetCameraPos, 4 * delta);
    this.controls.target.lerp(this.targetCameraLookAt, 4 * delta);
    this.controls.update();

    if (this.currentView === 'landing' && this.plate) {
      this.plate.rotation.y += 0.08 * delta;
    }

    // Animate and bob foods + sync colored glow pads + breathe shader rim-glow
    Object.keys(this.foods).forEach(id => {
      const model = this.foods[id];
      if (!model.visible) return;

      const anim = this.foodAnimations[id];
      const isHovered = this.hoveredFoodId === id;

      // Spring physics
      const stiffness = 160;
      const damping = 11;
      
      const dispX = anim.currentScale.x - anim.currentTargetScale.x;
      const forceX = -stiffness * dispX - damping * anim.scaleVelocity.x;
      anim.scaleVelocity.x += forceX * delta;
      anim.currentScale.x += anim.scaleVelocity.x * delta;

      const dispY = anim.currentScale.y - anim.currentTargetScale.y;
      const forceY = -stiffness * dispY - damping * anim.scaleVelocity.y;
      anim.scaleVelocity.y += forceY * delta;
      anim.currentScale.y += anim.scaleVelocity.y * delta;

      const dispZ = anim.currentScale.z - anim.currentTargetScale.z;
      const forceZ = -stiffness * dispZ - damping * anim.scaleVelocity.z;
      anim.scaleVelocity.z += forceZ * delta;
      anim.currentScale.z += anim.scaleVelocity.z * delta;

      anim.currentPos.lerp(anim.currentTargetPos, 8 * delta);
      model.position.copy(anim.currentPos);
      model.scale.copy(anim.currentScale);

      anim.currentRot.x += (anim.currentTargetRot.x - anim.currentRot.x) * 6 * delta;
      anim.currentRot.y += (anim.currentTargetRot.y - anim.currentRot.y) * 6 * delta;
      anim.currentRot.z += (anim.currentTargetRot.z - anim.currentRot.z) * 6 * delta;
      model.rotation.set(anim.currentRot.x, anim.currentRot.y, anim.currentRot.z);

      // Bobbing math
      const isPlateTransit = this.currentView === 'meal-builder' && this.selectedFoodIds.includes(id);
      if (this.currentView === 'landing') {
        model.position.y = anim.currentPos.y + Math.sin(time * anim.bobSpeed + anim.bobOffset) * 0.09;
        model.rotation.y += anim.rotSpeed * delta;
      } else if (this.currentView === 'meal-builder' && !isPlateTransit) {
        model.position.y = anim.currentPos.y + Math.sin(time * 0.9 + anim.bobOffset) * 0.025;
      } else if (isPlateTransit) {
        model.position.y = anim.currentPos.y + Math.sin(time * 1.3 + anim.bobOffset) * 0.018;
      }

      // Update color glow pad (follows X/Z of model)
      const glowPad = this.foodGlowPads[id];
      if (glowPad) {
        glowPad.position.x = model.position.x;
        glowPad.position.z = model.position.z;
        
        // Sit flat at surface height (plate vs shelf)
        const isOnPlate = this.selectedFoodIds.includes(id);
        const isLanding = this.currentView === 'landing';
        glowPad.position.y = (isOnPlate || isLanding) ? -0.382 : -0.44;

        // Pulse scale on hover
        const targetPadScale = isHovered ? 1.35 : 1.0;
        const pulse = isHovered ? (1.0 + Math.sin(time * 6.0) * 0.12) : 1.0;
        const finalScale = targetPadScale * pulse;
        glowPad.scale.set(finalScale, finalScale, 1.0);
      }

      // 3. Animate fragment shader Fresnel Rim-glow uniform (breathes on hover)
      model.traverse(child => {
        if (child.isMesh && child.material && child.material.userData) {
          const uInt = child.material.userData.rimIntensity;
          if (uInt) {
            if (isHovered) {
              // Breathe between 0.65 and 1.15
              uInt.value = 0.9 + Math.sin(time * 6.0) * 0.25;
            } else {
              uInt.value = 0.4; // back to resting glow
            }
          }
        }
      });
    });

    this.renderer.render(this.scene, this.camera);
  }
}

export const scene = new SceneController();
