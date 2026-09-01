import * as THREE from 'three';

// Inject custom Fresnel Rim-Glow shader into material on compilation
export function applyRimGlow(material, rimColorHex, defaultIntensity = 0.4) {
  const color = new THREE.Color(rimColorHex);
  
  material.userData = material.userData || {};
  material.userData.rimColor = color;
  // Use a sub-object for intensity so both CPU and GPU refer to the same value box
  material.userData.rimIntensity = { value: defaultIntensity };

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uRimColor = { value: material.userData.rimColor };
    shader.uniforms.uRimIntensity = material.userData.rimIntensity;
    
    // Store reference to uniforms map for animation
    material.userData.shaderUniforms = shader.uniforms;

    // Inject Uniform uniforms into fragment shader
    shader.fragmentShader = `
      uniform vec3 uRimColor;
      uniform float uRimIntensity;
    ` + shader.fragmentShader;

    // Inject Fresnel rim glow addition before color output
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
      #include <dithering_fragment>
      #ifdef USE_NORMAL
        vec3 normalVec = normalize(vNormal);
        vec3 viewVec = normalize(vViewPosition);
        float dotProduct = max(dot(normalVec, viewVec), 0.0);
        // Elevate (1.0 - dot) to power of 3.5 for a sharp, clean silhouette glow edge
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

  // Red to yellow-green radial gradient blush
  const grad = ctx.createRadialGradient(85, 45, 5, 64, 64, 75);
  grad.addColorStop(0, '#ffe066'); // yellow blush spot
  grad.addColorStop(0.3, '#ff453a'); // bright red
  grad.addColorStop(0.8, '#ff2d55'); // main red
  grad.addColorStop(1, '#8e0000'); // dark base
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  // Tiny spots
  ctx.fillStyle = 'rgba(255, 235, 180, 0.35)';
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    ctx.fillRect(x, y, 1.5, 1.5);
  }
  return new THREE.CanvasTexture(canvas);
}

function createBroccoliTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Base green
  ctx.fillStyle = '#248a3d';
  ctx.fillRect(0, 0, 128, 128);

  // Create stylized floret noise pattern
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const radius = 2 + Math.random() * 4;
    const isDark = Math.random() > 0.55;

    ctx.fillStyle = isDark ? '#1a652c' : '#32b353';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function createCarrotTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Orange gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, '#ff9f0a');
  grad.addColorStop(0.9, '#ff9500');
  grad.addColorStop(1, '#d86400');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 128);

  // Horizontal ridge lines
  ctx.strokeStyle = '#e67300';
  ctx.lineWidth = 2;
  for (let y = 15; y < 120; y += 18) {
    ctx.beginPath();
    ctx.moveTo(5 + Math.random() * 5, y);
    ctx.lineTo(55 - Math.random() * 5, y);
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

function createBreadTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Inner crumb area (cream)
  ctx.fillStyle = '#f7eed3';
  ctx.fillRect(0, 0, 128, 128);

  // Soft brown crumb spots
  ctx.fillStyle = '#eedfae';
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const r = Math.random() * 3 + 1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw dark border representing crust shading
  ctx.strokeStyle = '#85583f';
  ctx.lineWidth = 14;
  ctx.strokeRect(0, 0, 128, 128);

  // Blur the inner edge slightly
  ctx.strokeStyle = '#b07e5b';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 120, 120);

  return new THREE.CanvasTexture(canvas);
}

function createSteakTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Deep steak red
  ctx.fillStyle = '#a82c20';
  ctx.fillRect(0, 0, 128, 128);

  // Grill marks
  ctx.strokeStyle = '#3d0e09';
  ctx.lineWidth = 3.5;
  for (let i = -50; i < 150; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 80, 128);
    ctx.stroke();
  }

  // White fat marbling lines
  ctx.strokeStyle = 'rgba(255, 235, 235, 0.7)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 128, 0);
    ctx.bezierCurveTo(Math.random() * 128, 40, Math.random() * 128, 80, Math.random() * 128, 128);
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

function createMilkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // White background
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(0, 0, 128, 128);

  // Blue label band
  ctx.fillStyle = '#007aff';
  ctx.fillRect(0, 45, 128, 38);

  // Draw drop icon
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(64, 52);
  ctx.bezierCurveTo(55, 62, 55, 74, 64, 74);
  ctx.bezierCurveTo(73, 74, 73, 62, 64, 52);
  ctx.fill();

  // Draw "MILK" text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MILK', 64, 40);

  // Draw vitamins indicator
  ctx.fillStyle = '#007aff';
  ctx.font = '7px sans-serif';
  ctx.fillText('VITAMIN D & CALCIUM', 64, 95);

  return new THREE.CanvasTexture(canvas);
}

function createFishTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Blue-silver gradient
  const grad = ctx.createLinearGradient(0, 0, 128, 0);
  grad.addColorStop(0, '#5ac8fa'); // top back
  grad.addColorStop(0.5, '#afcddc'); // middle scale
  grad.addColorStop(1, '#e5e9f0'); // belly
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  // Scales texture pattern
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  for (let x = 10; x < 120; x += 12) {
    for (let y = 10; y < 120; y += 8) {
      ctx.beginPath();
      ctx.arc(x + (y % 16 === 0 ? 6 : 0), y, 3, 0, Math.PI);
      ctx.fill();
    }
  }

  // Mackerel stripes on back (top of texture)
  ctx.fillStyle = '#1c3d5a';
  for (let y = 10; y < 120; y += 15) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(20, y + 5, 40, y);
    ctx.lineTo(40, y + 4);
    ctx.quadraticCurveTo(20, y + 9, 0, y + 4);
    ctx.closePath();
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

// 3D Procedural Model Builders
export function createAppleModel() {
  const group = new THREE.Group();

  // 1. Apple Body (Physical material for high gloss and clearcoat)
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
    roughness: 0.16,
    metalness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05
  });
  applyRimGlow(mat, '#ff1a48', 0.45);
  
  const body = new THREE.Mesh(geom, mat);
  body.scale.set(1.0, 0.88, 1.0);
  group.add(body);

  // 2. Stem (Standard matte brown)
  const stemGeom = new THREE.CylinderGeometry(0.02, 0.03, 0.25, 5);
  stemGeom.translate(0, 0.125, 0);
  const stemMat = new THREE.MeshStandardMaterial({ color: '#5c4033', roughness: 0.8 });
  applyRimGlow(stemMat, '#5c4033', 0.25);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  stem.position.set(0, 0.3, 0);
  stem.rotation.z = -0.2;
  stem.rotation.x = 0.1;
  group.add(stem);

  // 3. Leaf (Standard matte green)
  const leafGeom = new THREE.ConeGeometry(0.12, 0.25, 5);
  const leafMat = new THREE.MeshStandardMaterial({ color: '#22c55e', roughness: 0.7 });
  applyRimGlow(leafMat, '#22c55e', 0.3);
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

  // 1. Carrot Body (Standard organic matte)
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
    roughness: 0.85,
    metalness: 0.05
  });
  applyRimGlow(mat, '#f97316', 0.4);
  const body = new THREE.Mesh(geom, mat);
  group.add(body);

  // 2. Green leafy tops
  const leafGroup = new THREE.Group();
  const leafStalkGeom = new THREE.CylinderGeometry(0.015, 0.02, 0.35, 5);
  leafStalkGeom.translate(0, 0.175, 0);
  const leafMat = new THREE.MeshStandardMaterial({ color: '#22c55e', roughness: 0.85 });
  applyRimGlow(leafMat, '#22c55e', 0.3);

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

  // Banana shape spline path
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.4, 0.35, 0),
    new THREE.Vector3(-0.25, 0.05, 0.05),
    new THREE.Vector3(0.0, -0.15, 0.08),
    new THREE.Vector3(0.28, -0.05, 0.05),
    new THREE.Vector3(0.45, 0.28, 0)
  ]);

  const geom = new THREE.TubeGeometry(curve, 10, 0.1, 5, false);
  
  // Custom texture for banana facets and brown ends
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffd60a'; 
  ctx.fillRect(0, 0, 128, 32);

  ctx.fillStyle = '#4a2f0f';
  ctx.fillRect(0, 0, 8, 32); 
  ctx.fillRect(122, 0, 6, 32); 

  ctx.fillStyle = '#afdb25';
  ctx.fillRect(8, 0, 8, 32);
  ctx.fillRect(116, 0, 6, 32);

  const texture = new THREE.CanvasTexture(canvas);
  
  // Standard semi-gloss material
  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.45,
    metalness: 0.05
  });
  applyRimGlow(mat, '#ffd60a', 0.4);

  const body = new THREE.Mesh(geom, mat);
  group.add(body);

  group.name = 'banana';
  return group;
}

export function createBroccoliModel() {
  const group = new THREE.Group();

  // 1. Broccoli Stalk (Standard matte)
  const stalkPoints = [
    new THREE.Vector2(0, 0.35),
    new THREE.Vector2(0.12, 0.35),
    new THREE.Vector2(0.1, -0.1),
    new THREE.Vector2(0.17, -0.45),
    new THREE.Vector2(0, -0.45)
  ];
  const stalkGeom = new THREE.LatheGeometry(stalkPoints, 6);
  const stalkMat = new THREE.MeshStandardMaterial({ color: '#55cc6b', roughness: 0.75 });
  applyRimGlow(stalkMat, '#22c55e', 0.3);
  const stalk = new THREE.Mesh(stalkGeom, stalkMat);
  group.add(stalk);

  // 2. Crown (Multiple Standard rough spheres)
  const crownGroup = new THREE.Group();
  const floretGeom = new THREE.IcosahedronGeometry(0.32, 1);
  const floretMat = new THREE.MeshStandardMaterial({
    map: createBroccoliTexture(),
    roughness: 0.92,
    metalness: 0.0
  });
  applyRimGlow(floretMat, '#22c55e', 0.5);

  const offsets = [
    { x: 0, y: 0.45, z: 0, s: 1.1 },
    { x: 0.16, y: 0.35, z: 0.12, s: 0.8 },
    { x: -0.16, y: 0.38, z: -0.10, s: 0.85 },
    { x: 0.08, y: 0.32, z: -0.18, s: 0.75 },
    { x: -0.08, y: 0.34, z: 0.18, s: 0.8 }
  ];

  offsets.forEach(off => {
    const floret = new THREE.Mesh(floretGeom, floretMat);
    floret.position.set(off.x, off.y, off.z);
    floret.scale.set(off.s, off.s * 0.9, off.s);
    floret.rotation.set(Math.random() * 5, Math.random() * 5, 0);
    crownGroup.add(floret);
  });

  group.add(crownGroup);
  group.name = 'broccoli';
  return group;
}

export function createBreadModel() {
  const group = new THREE.Group();

  // 1. Bread Slice (Standard rough matte)
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.45);
  shape.lineTo(0.35, -0.45);
  shape.quadraticCurveTo(0.42, -0.45, 0.42, -0.3);
  shape.lineTo(0.42, 0.15);
  shape.quadraticCurveTo(0.42, 0.45, 0.2, 0.45);
  shape.quadraticCurveTo(0, 0.35, -0.2, 0.45);
  shape.quadraticCurveTo(-0.42, 0.45, -0.42, 0.15);
  shape.lineTo(-0.42, -0.3);
  shape.quadraticCurveTo(-0.42, -0.45, -0.35, -0.45);
  shape.lineTo(0, -0.45);

  const extrudeSettings = {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();

  const mat = new THREE.MeshStandardMaterial({
    map: createBreadTexture(),
    roughness: 0.9,
    metalness: 0.05
  });
  applyRimGlow(mat, '#f97316', 0.4);

  const slice = new THREE.Mesh(geom, mat);
  slice.rotation.y = Math.PI / 2;
  group.add(slice);

  group.name = 'bread';
  return group;
}

export function createCheeseModel() {
  const group = new THREE.Group();

  // 1. Triangle Shape with Holes
  const shape = new THREE.Shape();
  shape.moveTo(-0.4, -0.3);
  shape.lineTo(0.4, -0.3);
  shape.lineTo(-0.4, 0.5);
  shape.lineTo(-0.4, -0.3);

  const hole1 = new THREE.Path();
  hole1.absarc(-0.2, -0.1, 0.045, 0, Math.PI * 2);
  shape.holes.push(hole1);

  const hole2 = new THREE.Path();
  hole2.absarc(0.1, -0.18, 0.03, 0, Math.PI * 2);
  shape.holes.push(hole2);

  const hole3 = new THREE.Path();
  hole3.absarc(-0.15, 0.22, 0.055, 0, Math.PI * 2);
  shape.holes.push(hole3);

  const extrudeSettings = {
    depth: 0.22,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();

  // Yellow texture
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffcc00';
  ctx.fillRect(0, 0, 64, 64);
  
  ctx.fillStyle = '#ffa700';
  for(let i=0; i<15; i++) {
    const x = Math.random() * 64;
    const y = Math.random() * 64;
    const r = Math.random() * 4 + 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  
  // Standard semi-matte material
  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.55,
    metalness: 0.05
  });
  applyRimGlow(mat, '#ffcc00', 0.45);

  const wedge = new THREE.Mesh(geom, mat);
  wedge.rotation.y = Math.PI / 4;
  group.add(wedge);

  group.name = 'cheese';
  return group;
}

export function createSteakModel() {
  const group = new THREE.Group();

  // 1. Steak Body (Standard semi-glossy)
  const shape = new THREE.Shape();
  shape.moveTo(-0.4, -0.1);
  shape.quadraticCurveTo(-0.45, 0.2, -0.3, 0.35);
  shape.quadraticCurveTo(-0.1, 0.45, 0.1, 0.35);
  shape.quadraticCurveTo(0.45, 0.35, 0.45, 0.05);
  shape.quadraticCurveTo(0.4, -0.3, 0.1, -0.35);
  shape.quadraticCurveTo(-0.15, -0.35, -0.25, -0.2);
  shape.quadraticCurveTo(-0.35, -0.25, -0.4, -0.1);

  const extrudeSettings = {
    depth: 0.14,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();

  const mat = new THREE.MeshStandardMaterial({
    map: createSteakTexture(),
    roughness: 0.38,
    metalness: 0.1
  });
  applyRimGlow(mat, '#6366f1', 0.45); // indigo/purple rim glow

  const meat = new THREE.Mesh(geom, mat);
  group.add(meat);

  // 2. Bone Detail (Standard matte)
  const boneGeom = new THREE.TorusGeometry(0.18, 0.035, 5, 8, Math.PI);
  const boneMat = new THREE.MeshStandardMaterial({ color: '#f5f0e1', roughness: 0.65 });
  applyRimGlow(boneMat, '#f5f0e1', 0.25);
  const bone = new THREE.Mesh(boneGeom, boneMat);
  bone.position.set(0.08, 0.05, 0.08); 
  group.add(bone);

  group.name = 'steak';
  return group;
}

export function createFishModel() {
  const group = new THREE.Group();

  // 1. Fish Body (Physical material for high metalness sheen and glossy clearcoat)
  const bodyPoints = [
    new THREE.Vector2(0, 0.65),
    new THREE.Vector2(0.08, 0.55),
    new THREE.Vector2(0.18, 0.35),
    new THREE.Vector2(0.2, 0.0),
    new THREE.Vector2(0.15, -0.3),
    new THREE.Vector2(0.05, -0.55),
    new THREE.Vector2(0.02, -0.65),
    new THREE.Vector2(0, -0.68)
  ];

  const bodyGeom = new THREE.LatheGeometry(bodyPoints, 8);
  const bodyMat = new THREE.MeshPhysicalMaterial({
    map: createFishTexture(),
    roughness: 0.18,
    metalness: 0.65,
    clearcoat: 0.8,
    clearcoatRoughness: 0.08
  });
  applyRimGlow(bodyMat, '#6366f1', 0.45);
  
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.scale.set(0.48, 1.1, 1.25);
  body.rotation.x = Math.PI / 2; 
  group.add(body);

  // 2. Tail Fin (Standard matte-satin)
  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0);
  finShape.lineTo(0.2, 0.25);
  finShape.quadraticCurveTo(0.25, 0.1, 0.15, 0); 
  finShape.quadraticCurveTo(0.25, -0.1, 0.2, -0.25);
  finShape.lineTo(0, 0);

  const finGeom = new THREE.ExtrudeGeometry(finShape, { depth: 0.03, bevelEnabled: false });
  const finMat = new THREE.MeshStandardMaterial({ color: '#5ac8fa', roughness: 0.5 });
  applyRimGlow(finMat, '#6366f1', 0.35);
  const tailFin = new THREE.Mesh(finGeom, finMat);
  tailFin.position.set(0, 0, -0.85); 
  tailFin.rotation.y = Math.PI / 2; 
  group.add(tailFin);

  // 3. Eyes
  const eyeGeom = new THREE.SphereGeometry(0.045, 5, 5);
  const eyeMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.1 });
  const pupilMat = new THREE.MeshStandardMaterial({ color: '#000000', roughness: 0.1 });
  
  // Left eye
  const eyeL = new THREE.Mesh(eyeGeom, eyeMat);
  const pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.02, 5, 5), pupilMat);
  pupilL.position.set(0, 0, 0.035);
  eyeL.add(pupilL);
  eyeL.position.set(0.12, 0.08, 0.42);
  group.add(eyeL);

  // Right eye
  const eyeR = new THREE.Mesh(eyeGeom, eyeMat);
  const pupilR = new THREE.Mesh(new THREE.SphereGeometry(0.02, 5, 5), pupilMat);
  pupilR.position.set(0, 0, 0.035);
  eyeR.add(pupilR);
  eyeR.position.set(-0.12, 0.08, 0.42);
  group.add(eyeR);

  group.name = 'fish';
  return group;
}

export function createMilkModel() {
  const group = new THREE.Group();

  // 1. Milk Bottle Body (Physical material for glossy clearcoat finish)
  const points = [
    new THREE.Vector2(0, 0.65),
    new THREE.Vector2(0.08, 0.65),
    new THREE.Vector2(0.08, 0.6),
    new THREE.Vector2(0.07, 0.5),
    new THREE.Vector2(0.18, 0.3),
    new THREE.Vector2(0.18, -0.55),
    new THREE.Vector2(0.16, -0.62),
    new THREE.Vector2(0, -0.65)
  ];

  const geom = new THREE.LatheGeometry(points, 8);
  const mat = new THREE.MeshPhysicalMaterial({
    map: createMilkTexture(),
    roughness: 0.18,
    metalness: 0.05,
    clearcoat: 0.8,
    clearcoatRoughness: 0.05
  });
  applyRimGlow(mat, '#06b6d4', 0.4);

  const body = new THREE.Mesh(geom, mat);
  group.add(body);

  // 2. Cap detail (Standard glossy blue)
  const capGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.06, 8);
  const capMat = new THREE.MeshStandardMaterial({ color: '#007aff', roughness: 0.25 });
  applyRimGlow(capMat, '#06b6d4', 0.3);
  const cap = new THREE.Mesh(capGeom, capMat);
  cap.position.y = 0.62;
  group.add(cap);

  group.name = 'milk';
  return group;
}

// Food Plate Creator (High quality standard material)
export function createPlateModel() {
  const group = new THREE.Group();

  // Plate Base
  const baseGeom = new THREE.CylinderGeometry(1.6, 1.4, 0.1, 16);
  const baseMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.35, metalness: 0.05 });
  const base = new THREE.Mesh(baseGeom, baseMat);
  base.receiveShadow = true;
  group.add(base);

  // Rim (Raised torus ring)
  const rimGeom = new THREE.TorusGeometry(1.6, 0.08, 6, 24);
  const rimMat = new THREE.MeshStandardMaterial({ color: '#e5e9f0', roughness: 0.4 });
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.05;
  group.add(rim);

  // Colorful MyPlate sections
  const addPlateSection = (color, startAngle, endAngle, radius) => {
    const geom = new THREE.RingGeometry(0, radius, 16, 1, startAngle, endAngle - startAngle);
    const mat = new THREE.MeshStandardMaterial({ color: color, side: THREE.DoubleSide, roughness: 0.5 });
    const section = new THREE.Mesh(geom, mat);
    section.rotation.x = Math.PI / 2;
    section.position.y = 0.06;
    group.add(section);
  };

  const rPlate = 1.48;
  addPlateSection('#ff1a48', 0, Math.PI * 0.75, rPlate);        // Red - Fruit
  addPlateSection('#22c55e', Math.PI * 0.75, Math.PI * 1.15, rPlate); // Green - Veg
  addPlateSection('#f97316', Math.PI * 1.15, Math.PI * 1.6, rPlate);  // Orange - Grain
  addPlateSection('#6366f1', Math.PI * 1.6, Math.PI * 2, rPlate);     // Purple - Protein

  // Dairy cup (Blue cylinder on top right side)
  const dairyCupGeom = new THREE.CylinderGeometry(0.38, 0.34, 0.08, 12);
  const dairyCupMat = new THREE.MeshStandardMaterial({ color: '#06b6d4', roughness: 0.4 });
  const dairyCup = new THREE.Mesh(dairyCupGeom, dairyCupMat);
  dairyCup.position.set(1.4, 0.08, -1.0);
  group.add(dairyCup);

  const dairyRimGeom = new THREE.TorusGeometry(0.38, 0.02, 4, 16);
  const dairyRimMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4 });
  const dairyRim = new THREE.Mesh(dairyRimGeom, dairyRimMat);
  dairyRim.rotation.x = Math.PI / 2;
  dairyRim.position.set(1.4, 0.12, -1.0);
  group.add(dairyRim);

  group.name = 'plate';
  return group;
}

// Factory to spawn models by ID
export function getFoodModel(id) {
  switch (id) {
    case 'apple': return createAppleModel();
    case 'carrot': return createCarrotModel();
    case 'banana': return createBananaModel();
    case 'broccoli': return createBroccoliModel();
    case 'bread': return createBreadModel();
    case 'cheese': return createCheeseModel();
    case 'steak': return createSteakModel();
    case 'fish': return createFishModel();
    case 'milk': return createMilkModel();
    default:
      console.warn(`Unknown model ID: ${id}`);
      return new THREE.Group();
  }
}
