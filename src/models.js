import * as THREE from 'three';

// Inject custom Fresnel Rim-Glow shader into material on compilation
export function applyRimGlow(material, rimColorHex, defaultIntensity = 0.4) {
  const color = new THREE.Color(rimColorHex);
  
  material.userData = material.userData || {};
  material.userData.rimColor = color;
  material.userData.rimIntensity = { value: defaultIntensity };

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uRimColor = { value: material.userData.rimColor };
    shader.uniforms.uRimIntensity = material.userData.rimIntensity;
    material.userData.shaderUniforms = shader.uniforms;

    shader.fragmentShader = `
      uniform vec3 uRimColor;
      uniform float uRimIntensity;
    ` + shader.fragmentShader;

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
      #include <dithering_fragment>
      #ifdef USE_NORMAL
        vec3 normalVec = normalize(vNormal);
        vec3 viewVec = normalize(vViewPosition);
        float dotProduct = max(dot(normalVec, viewVec), 0.0);
        float fresnel = pow(1.0 - dotProduct, 3.5);
        gl_FragColor.rgb += uRimColor * fresnel * uRimIntensity;
      #endif
      `
    );
  };
}

// Procedural Canvas Texture Generators
function createAppleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Deep vibrant ruby-red gradient blush
  const grad = ctx.createRadialGradient(85, 45, 8, 64, 64, 75);
  grad.addColorStop(0, '#ff4d6d');   // bright highlight red
  grad.addColorStop(0.3, '#e11d48'); // rich crimson red
  grad.addColorStop(0.7, '#be123c'); // deep ruby red
  grad.addColorStop(1, '#881337');   // shadow base
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  // Tiny golden freckles
  ctx.fillStyle = 'rgba(255, 235, 180, 0.4)';
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    ctx.fillRect(x, y, 1.5, 1.5);
  }
  return new THREE.CanvasTexture(canvas);
}

function createCarrotTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Pure vibrant saturated orange gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, '#ff7a00');
  grad.addColorStop(0.5, '#ff6b00');
  grad.addColorStop(1, '#ea580c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 128);

  // Horizontal texture ridges
  ctx.strokeStyle = '#c2410c';
  ctx.lineWidth = 2.2;
  for (let y = 14; y < 120; y += 16) {
    ctx.beginPath();
    ctx.moveTo(6 + Math.random() * 4, y);
    ctx.lineTo(54 - Math.random() * 4, y);
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

function createGreensTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Emerald leafy green
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(0, 0, 128, 128);

  // Leaf veins and speckles
  for (let i = 0; i < 300; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const radius = 2 + Math.random() * 3.5;
    const isDark = Math.random() > 0.5;

    ctx.fillStyle = isDark ? '#14532d' : '#22c55e';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function createRotiTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Warm golden-wheat base
  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(0, 0, 128, 128);

  // Toasted chapati brown spots
  ctx.fillStyle = '#b45309';
  for (let i = 0; i < 35; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const r = Math.random() * 4 + 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Darker toasted edge marks
  ctx.fillStyle = '#78350f';
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const r = Math.random() * 2 + 1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

function createPaneerTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Creamy white base
  ctx.fillStyle = '#fefce8';
  ctx.fillRect(0, 0, 64, 64);

  // Golden grilled marks
  ctx.fillStyle = 'rgba(217, 119, 6, 0.4)';
  ctx.fillRect(0, 10, 64, 10);
  ctx.fillRect(0, 36, 64, 10);

  // Herb specks (coriander/kasuri methi)
  ctx.fillStyle = '#15803d';
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 64;
    const y = Math.random() * 64;
    ctx.fillRect(x, y, 2, 2);
  }

  return new THREE.CanvasTexture(canvas);
}

function createFishTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Blue-silver iridescent gradient
  const grad = ctx.createLinearGradient(0, 0, 128, 0);
  grad.addColorStop(0, '#0284c7');
  grad.addColorStop(0.4, '#7dd3fc');
  grad.addColorStop(1, '#f0f9ff');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  // Scale arches
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  for (let x = 10; x < 120; x += 12) {
    for (let y = 10; y < 120; y += 8) {
      ctx.beginPath();
      ctx.arc(x + (y % 16 === 0 ? 6 : 0), y, 3, 0, Math.PI);
      ctx.fill();
    }
  }

  // Karimeen pearl spots
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 30; i++) {
    const x = 30 + Math.random() * 70;
    const y = 20 + Math.random() * 88;
    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

// 3D Procedural Model Builders

export function createAppleModel() {
  const group = new THREE.Group();

  // 1. Apple Body (Vivid pure ruby red with high clearcoat sheen)
  const geom = new THREE.IcosahedronGeometry(0.5, 1);
  const pos = geom.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    if (v.y > 0.35) v.y -= 0.08 * (v.y - 0.35);
    if (v.y < -0.35) v.y += 0.08 * (-0.35 - v.y);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geom.computeVertexNormals();

  const mat = new THREE.MeshPhysicalMaterial({
    map: createAppleTexture(),
    roughness: 0.14,
    metalness: 0.04,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04
  });
  applyRimGlow(mat, '#e11d48', 0.5);
  
  const body = new THREE.Mesh(geom, mat);
  body.scale.set(1.0, 0.88, 1.0);
  group.add(body);

  // 2. Stem
  const stemGeom = new THREE.CylinderGeometry(0.02, 0.03, 0.25, 5);
  stemGeom.translate(0, 0.125, 0);
  const stemMat = new THREE.MeshStandardMaterial({ color: '#5c4033', roughness: 0.8 });
  applyRimGlow(stemMat, '#5c4033', 0.25);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  stem.position.set(0, 0.3, 0);
  stem.rotation.z = -0.2;
  stem.rotation.x = 0.1;
  group.add(stem);

  // 3. Leaf
  const leafGeom = new THREE.ConeGeometry(0.12, 0.25, 5);
  const leafMat = new THREE.MeshStandardMaterial({ color: '#16a34a', roughness: 0.6 });
  applyRimGlow(leafMat, '#16a34a', 0.3);
  const leaf = new THREE.Mesh(leafGeom, leafMat);
  leaf.scale.set(1.0, 0.2, 2.0);
  leaf.position.set(0.08, 0.38, 0.02);
  leaf.rotation.z = -0.6;
  leaf.rotation.y = 0.5;
  group.add(leaf);

  group.name = 'apple';
  return group;
}

export function createCarrotModel() {
  const group = new THREE.Group();

  // 1. Carrot Body (Vivid pure orange)
  const points = [
    new THREE.Vector2(0, 0.7),
    new THREE.Vector2(0.18, 0.6),
    new THREE.Vector2(0.19, 0.4),
    new THREE.Vector2(0.15, 0.0),
    new THREE.Vector2(0.09, -0.4),
    new THREE.Vector2(0.02, -0.75),
    new THREE.Vector2(0, -0.8)
  ];

  const geom = new THREE.LatheGeometry(points, 8);
  const mat = new THREE.MeshStandardMaterial({
    map: createCarrotTexture(),
    roughness: 0.5,
    metalness: 0.05
  });
  applyRimGlow(mat, '#ff6b00', 0.5);
  const body = new THREE.Mesh(geom, mat);
  group.add(body);

  // 2. Green tops
  const leafGroup = new THREE.Group();
  const leafStalkGeom = new THREE.CylinderGeometry(0.015, 0.02, 0.35, 5);
  leafStalkGeom.translate(0, 0.175, 0);
  const leafMat = new THREE.MeshStandardMaterial({ color: '#16a34a', roughness: 0.7 });
  applyRimGlow(leafMat, '#16a34a', 0.35);

  for (let i = 0; i < 3; i++) {
    const stalk = new THREE.Mesh(leafStalkGeom, leafMat);
    stalk.rotation.z = 0.3 * Math.sin(i * (Math.PI * 2 / 3));
    stalk.rotation.x = 0.3 * Math.cos(i * (Math.PI * 2 / 3));
    
    const featherGeom = new THREE.ConeGeometry(0.07, 0.18, 4);
    const feather = new THREE.Mesh(featherGeom, leafMat);
    feather.position.y = 0.35;
    feather.scale.set(1.5, 0.3, 2.5);
    stalk.add(feather);

    leafGroup.add(stalk);
  }
  leafGroup.position.y = 0.65;
  group.add(leafGroup);

  group.name = 'carrot';
  return group;
}

export function createBananaModel() {
  const group = new THREE.Group();

  // Kerala Nendran Banana Curve
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.4, 0.35, 0),
    new THREE.Vector3(-0.25, 0.05, 0.05),
    new THREE.Vector3(0.0, -0.15, 0.08),
    new THREE.Vector3(0.28, -0.05, 0.05),
    new THREE.Vector3(0.45, 0.28, 0)
  ]);

  const geom = new THREE.TubeGeometry(curve, 10, 0.11, 5, false);
  
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffd60a'; 
  ctx.fillRect(0, 0, 128, 32);

  ctx.fillStyle = '#4a2f0f';
  ctx.fillRect(0, 0, 8, 32); 
  ctx.fillRect(122, 0, 6, 32); 

  ctx.fillStyle = '#65a30d';
  ctx.fillRect(8, 0, 8, 32);
  ctx.fillRect(116, 0, 6, 32);

  const texture = new THREE.CanvasTexture(canvas);
  
  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.35,
    metalness: 0.05
  });
  applyRimGlow(mat, '#ffd60a', 0.45);

  const body = new THREE.Mesh(geom, mat);
  group.add(body);

  group.name = 'banana';
  return group;
}

export function createGreensModel() {
  const group = new THREE.Group();

  // Leafy stem base
  const stalkPoints = [
    new THREE.Vector2(0, 0.3),
    new THREE.Vector2(0.1, 0.3),
    new THREE.Vector2(0.08, -0.1),
    new THREE.Vector2(0.14, -0.4),
    new THREE.Vector2(0, -0.4)
  ];
  const stalkGeom = new THREE.LatheGeometry(stalkPoints, 6);
  const stalkMat = new THREE.MeshStandardMaterial({ color: '#22c55e', roughness: 0.65 });
  applyRimGlow(stalkMat, '#22c55e', 0.3);
  const stalk = new THREE.Mesh(stalkGeom, stalkMat);
  group.add(stalk);

  // Lush leafy foliage cluster
  const foliageGroup = new THREE.Group();
  const leafGeom = new THREE.IcosahedronGeometry(0.3, 1);
  const leafMat = new THREE.MeshStandardMaterial({
    map: createGreensTexture(),
    roughness: 0.85,
    metalness: 0.0
  });
  applyRimGlow(leafMat, '#16a34a', 0.5);

  const offsets = [
    { x: 0, y: 0.4, z: 0, s: 1.15 },
    { x: 0.16, y: 0.32, z: 0.12, s: 0.85 },
    { x: -0.16, y: 0.35, z: -0.10, s: 0.9 },
    { x: 0.08, y: 0.28, z: -0.18, s: 0.8 },
    { x: -0.08, y: 0.30, z: 0.18, s: 0.85 }
  ];

  offsets.forEach(off => {
    const floret = new THREE.Mesh(leafGeom, leafMat);
    floret.position.set(off.x, off.y, off.z);
    floret.scale.set(off.s, off.s * 0.8, off.s);
    floret.rotation.set(Math.random() * 5, Math.random() * 5, 0);
    foliageGroup.add(floret);
  });

  group.add(foliageGroup);
  group.name = 'greens';
  return group;
}

export function createRotiModel() {
  const group = new THREE.Group();

  // Stack of 2 warm Whole Wheat Chapatis / Rotis
  const rotiGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.04, 16);
  const rotiMat = new THREE.MeshStandardMaterial({
    map: createRotiTexture(),
    roughness: 0.75,
    metalness: 0.05
  });
  applyRimGlow(rotiMat, '#d97706', 0.45);

  // Bottom Roti
  const roti1 = new THREE.Mesh(rotiGeom, rotiMat);
  roti1.position.set(0, -0.05, 0);
  roti1.rotation.y = 0.2;
  group.add(roti1);

  // Top Roti (slightly angled and puffed)
  const roti2 = new THREE.Mesh(rotiGeom, rotiMat);
  roti2.position.set(0.04, 0.01, 0.02);
  roti2.rotation.y = -0.5;
  roti2.rotation.x = 0.05;
  group.add(roti2);

  group.name = 'roti';
  return group;
}

export function createEggModel() {
  const group = new THREE.Group();

  // 1. Egg White (Hard-boiled oval half)
  const eggWhiteGeom = new THREE.SphereGeometry(0.38, 14, 14, 0, Math.PI * 2, 0, Math.PI * 0.5);
  eggWhiteGeom.scale(0.85, 1.25, 0.85);
  const eggWhiteMat = new THREE.MeshPhysicalMaterial({
    color: '#f8fafc',
    roughness: 0.15,
    metalness: 0.05,
    clearcoat: 0.9,
    clearcoatRoughness: 0.05
  });
  applyRimGlow(eggWhiteMat, '#f59e0b', 0.4);

  const eggWhite = new THREE.Mesh(eggWhiteGeom, eggWhiteMat);
  eggWhite.rotation.x = Math.PI;
  group.add(eggWhite);

  // Flat cross-section base
  const baseGeom = new THREE.CircleGeometry(0.38, 14);
  baseGeom.scale(0.85, 0.85, 1);
  const baseMat = new THREE.MeshStandardMaterial({ color: '#f1f5f9', roughness: 0.2 });
  const basePlane = new THREE.Mesh(baseGeom, baseMat);
  basePlane.rotation.x = -Math.PI / 2;
  group.add(basePlane);

  // 2. Golden Yolk Dome
  const yolkGeom = new THREE.SphereGeometry(0.18, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const yolkMat = new THREE.MeshStandardMaterial({
    color: '#fbbf24',
    roughness: 0.35,
    metalness: 0.05
  });
  applyRimGlow(yolkMat, '#f59e0b', 0.45);
  const yolk = new THREE.Mesh(yolkGeom, yolkMat);
  yolk.position.set(0, 0.01, -0.05);
  group.add(yolk);

  group.rotation.x = 0.3;
  group.name = 'egg';
  return group;
}

export function createPaneerModel() {
  const group = new THREE.Group();

  // Cubes of fresh spiced Paneer
  const paneerMat = new THREE.MeshStandardMaterial({
    map: createPaneerTexture(),
    roughness: 0.5,
    metalness: 0.05
  });
  applyRimGlow(paneerMat, '#fbbf24', 0.45);

  const cubeGeom = new THREE.BoxGeometry(0.28, 0.28, 0.28);

  const positions = [
    { x: -0.15, y: -0.05, z: 0.1, ry: 0.1 },
    { x: 0.16, y: -0.05, z: -0.1, ry: 0.4 },
    { x: -0.08, y: -0.05, z: -0.18, ry: -0.2 },
    { x: 0.02, y: 0.2, z: 0.0, ry: 0.6 } // top stacked cube
  ];

  positions.forEach(p => {
    const cube = new THREE.Mesh(cubeGeom, paneerMat);
    cube.position.set(p.x, p.y, p.z);
    cube.rotation.y = p.ry;
    group.add(cube);
  });

  group.name = 'paneer';
  return group;
}

export function createFishModel() {
  const group = new THREE.Group();

  // 1. Fish Body (Kerala Pearlspot / Karimeen shape)
  const bodyPoints = [
    new THREE.Vector2(0, 0.65),
    new THREE.Vector2(0.12, 0.55),
    new THREE.Vector2(0.22, 0.35),
    new THREE.Vector2(0.25, 0.0),
    new THREE.Vector2(0.18, -0.3),
    new THREE.Vector2(0.06, -0.55),
    new THREE.Vector2(0.02, -0.65),
    new THREE.Vector2(0, -0.68)
  ];

  const bodyGeom = new THREE.LatheGeometry(bodyPoints, 8);
  const bodyMat = new THREE.MeshPhysicalMaterial({
    map: createFishTexture(),
    roughness: 0.16,
    metalness: 0.6,
    clearcoat: 0.8,
    clearcoatRoughness: 0.08
  });
  applyRimGlow(bodyMat, '#0284c7', 0.45);
  
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.scale.set(0.48, 1.1, 1.25);
  body.rotation.x = Math.PI / 2; 
  group.add(body);

  // 2. Tail Fin
  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0);
  finShape.lineTo(0.2, 0.25);
  finShape.quadraticCurveTo(0.25, 0.1, 0.15, 0); 
  finShape.quadraticCurveTo(0.25, -0.1, 0.2, -0.25);
  finShape.lineTo(0, 0);

  const finGeom = new THREE.ExtrudeGeometry(finShape, { depth: 0.03, bevelEnabled: false });
  const finMat = new THREE.MeshStandardMaterial({ color: '#0284c7', roughness: 0.5 });
  applyRimGlow(finMat, '#0284c7', 0.35);
  const tailFin = new THREE.Mesh(finGeom, finMat);
  tailFin.position.set(0, 0, -0.85); 
  tailFin.rotation.y = Math.PI / 2; 
  group.add(tailFin);

  // 3. Eyes
  const eyeGeom = new THREE.SphereGeometry(0.045, 5, 5);
  const eyeMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.1 });
  const pupilMat = new THREE.MeshStandardMaterial({ color: '#000000', roughness: 0.1 });
  
  const eyeL = new THREE.Mesh(eyeGeom, eyeMat);
  const pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.02, 5, 5), pupilMat);
  pupilL.position.set(0, 0, 0.035);
  eyeL.add(pupilL);
  eyeL.position.set(0.12, 0.08, 0.42);
  group.add(eyeL);

  const eyeR = new THREE.Mesh(eyeGeom, eyeMat);
  const pupilR = new THREE.Mesh(new THREE.SphereGeometry(0.02, 5, 5), pupilMat);
  pupilR.position.set(0, 0, 0.035);
  eyeR.add(pupilR);
  eyeR.position.set(-0.12, 0.08, 0.42);
  group.add(eyeR);

  group.name = 'fish';
  return group;
}

export function createCurdModel() {
  const group = new THREE.Group();

  // Traditional Clay/Ceramic Bowl of Curd / Spiced Buttermilk
  const bowlPoints = [
    new THREE.Vector2(0, -0.3),
    new THREE.Vector2(0.25, -0.3),
    new THREE.Vector2(0.42, -0.05),
    new THREE.Vector2(0.46, 0.15),
    new THREE.Vector2(0.42, 0.18),
    new THREE.Vector2(0.38, 0.15),
    new THREE.Vector2(0, 0.12)
  ];

  const bowlGeom = new THREE.LatheGeometry(bowlPoints, 12);
  const bowlMat = new THREE.MeshStandardMaterial({ color: '#9a3412', roughness: 0.75 }); // Terracotta earthenware bowl
  applyRimGlow(bowlMat, '#ea580c', 0.35);
  const bowl = new THREE.Mesh(bowlGeom, bowlMat);
  group.add(bowl);

  // Smooth Creamy Curd surface inside bowl
  const curdGeom = new THREE.CylinderGeometry(0.38, 0.34, 0.05, 16);
  const curdMat = new THREE.MeshPhysicalMaterial({
    color: '#f8fafc',
    roughness: 0.18,
    metalness: 0.02,
    clearcoat: 0.6,
    clearcoatRoughness: 0.08
  });
  applyRimGlow(curdMat, '#06b6d4', 0.4);
  const curd = new THREE.Mesh(curdGeom, curdMat);
  curd.position.y = 0.11;
  group.add(curd);

  // Mint / Curry leaf garnish on top
  const leafGeom = new THREE.ConeGeometry(0.06, 0.14, 4);
  const leafMat = new THREE.MeshStandardMaterial({ color: '#16a34a', roughness: 0.6 });
  const garnish = new THREE.Mesh(leafGeom, leafMat);
  garnish.position.set(0, 0.14, 0);
  garnish.rotation.z = 0.6;
  garnish.scale.set(1.2, 0.3, 2.0);
  group.add(garnish);

  group.name = 'curd';
  return group;
}

// 50–25–25 Plate Model (50% Fruits & Vegetables, 25% Carbohydrates, 25% Protein, + Dairy side cup)
export function createPlateModel() {
  const group = new THREE.Group();

  // 1. Plate Ceramic Base
  const baseGeom = new THREE.CylinderGeometry(1.6, 1.4, 0.1, 24);
  const baseMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.3, metalness: 0.05 });
  const base = new THREE.Mesh(baseGeom, baseMat);
  base.receiveShadow = true;
  group.add(base);

  // 2. Raised Ceramic Rim
  const rimGeom = new THREE.TorusGeometry(1.6, 0.08, 6, 32);
  const rimMat = new THREE.MeshStandardMaterial({ color: '#f1f5f9', roughness: 0.35 });
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.05;
  group.add(rim);

  // 3. Exact 50–25–25 Geometric Colored Sections:
  const addPlateSection = (color, startAngle, endAngle, radius) => {
    const geom = new THREE.RingGeometry(0, radius, 24, 1, startAngle, endAngle - startAngle);
    const mat = new THREE.MeshStandardMaterial({ color: color, side: THREE.DoubleSide, roughness: 0.45 });
    const section = new THREE.Mesh(geom, mat);
    section.rotation.x = Math.PI / 2;
    section.position.y = 0.06;
    group.add(section);
  };

  const rPlate = 1.48;
  // 50% OF THE PLATE (180° = 0 to PI): Split between Green Vegetables and Red Fruits
  addPlateSection('#22c55e', 0, Math.PI * 0.65, rPlate);        // ~33% Vegetables (Emerald Green)
  addPlateSection('#e11d48', Math.PI * 0.65, Math.PI, rPlate);   // ~17% Fruits (Ruby Red)
  
  // 25% OF THE PLATE (90° = PI to 1.5*PI): Complex Carbohydrates / Whole Grains
  addPlateSection('#f97316', Math.PI, Math.PI * 1.5, rPlate);   // 25% Carbohydrates (Warm Golden Orange)
  
  // 25% OF THE PLATE (90° = 1.5*PI to 2*PI): Healthy Proteins
  addPlateSection('#6366f1', Math.PI * 1.5, Math.PI * 2, rPlate); // 25% Protein (Rich Indigo/Purple)

  // 4. Accompaniment Side Cup (Cyan for Curd / Sambharam / Water)
  const sideCupGeom = new THREE.CylinderGeometry(0.38, 0.34, 0.08, 16);
  const sideCupMat = new THREE.MeshStandardMaterial({ color: '#06b6d4', roughness: 0.35 });
  const sideCup = new THREE.Mesh(sideCupGeom, sideCupMat);
  sideCup.position.set(1.4, 0.08, -1.0);
  group.add(sideCup);

  const sideRimGeom = new THREE.TorusGeometry(0.38, 0.02, 4, 20);
  const sideRimMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.3 });
  const sideRim = new THREE.Mesh(sideRimGeom, sideRimMat);
  sideRim.rotation.x = Math.PI / 2;
  sideRim.position.set(1.4, 0.12, -1.0);
  group.add(sideRim);

  group.name = 'plate';
  return group;
}

// Factory to spawn models by ID
export function getFoodModel(id) {
  switch (id) {
    case 'apple': return createAppleModel();
    case 'carrot': return createCarrotModel();
    case 'banana': return createBananaModel();
    case 'greens': return createGreensModel();
    case 'roti': return createRotiModel();
    case 'egg': return createEggModel();
    case 'paneer': return createPaneerModel();
    case 'fish': return createFishModel();
    case 'curd': return createCurdModel();
    default:
      console.warn(`Unknown model ID: ${id}`);
      return new THREE.Group();
  }
}
