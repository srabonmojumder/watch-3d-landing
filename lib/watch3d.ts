import * as THREE from "three";

export type DialType = "blue" | "silver" | "slate";
export type StrapType = "cognac" | "blue" | "steel";

export interface Watch3DComponents {
  root: THREE.Group;
  caseMesh: THREE.Mesh;
  bezelMesh: THREE.Mesh;
  crystalMesh: THREE.Mesh;
  dialMesh: THREE.Mesh;
  hourHand: THREE.Group;
  minuteHand: THREE.Group;
  secondHand: THREE.Group;
  balanceWheel: THREE.Group;
  strapGroup: THREE.Group;
  crownMesh: THREE.Mesh;
  updateDial: (dial: DialType) => void;
  updateStrap: (strap: StrapType) => void;
  tick: (time: number) => void;
}

// Generate procedural high-resolution textures for dials (1024x1024)
function createDialTexture(dialType: DialType): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.49;

  ctx.clearRect(0, 0, size, size);

  if (dialType === "blue") {
    // Fill entire dial area with deep cobalt blue
    ctx.fillStyle = "#0c1527";
    ctx.fillRect(0, 0, size, size);

    // Radiant Bleu de Paris galvanic sunburst
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    grad.addColorStop(0, "#2563eb"); // Royal sapphire blue center
    grad.addColorStop(0.35, "#1d4ed8");
    grad.addColorStop(0.7, "#1e3a8a");
    grad.addColorStop(1, "#070c17"); // Deep midnight perimeter
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // 120 Sunburst guilloché micro-rays
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 120; i++) {
      const angle = (i * Math.PI) / 60;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.stroke();
    }
  } else if (dialType === "silver") {
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(0, 0, size, size);

    // Argent brossé vertical
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.5, "#f1f5f9");
    grad.addColorStop(1, "#cbd5e1");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Fine vertical brushed grain
    ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= size; x += 3) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
  } else {
    // Slate Ardoise guilloché
    ctx.fillStyle = "#18181b";
    ctx.fillRect(0, 0, size, size);

    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    grad.addColorStop(0, "#27272a");
    grad.addColorStop(0.7, "#18181b");
    grad.addColorStop(1, "#09090b");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Clous de Paris hobnail pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    const step = 14;
    for (let x = 0; x < size; x += step) {
      for (let y = 0; y < size; y += step) {
        if (Math.hypot(x - cx, y - cy) < r * 0.96) {
          ctx.strokeRect(x, y, step - 1, step - 1);
        }
      }
    }
  }

  // Outer Railway Minute Track
  ctx.strokeStyle = dialType === "silver" ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.9)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.92, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.88, 0, Math.PI * 2);
  ctx.stroke();

  // 60 minute ticks
  for (let i = 0; i < 60; i++) {
    const angle = (i * Math.PI) / 30 - Math.PI / 2;
    const isMajor = i % 5 === 0;
    const inner = isMajor ? r * 0.83 : r * 0.88;
    const outer = r * 0.92;

    ctx.lineWidth = isMajor ? 3.5 : 1.5;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
    ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
    ctx.stroke();
  }

  // Sub-seconds dial at 6 o'clock (Petite Seconde)
  const subY = cy + r * 0.44;
  const subR = r * 0.28;
  const subGrad = ctx.createRadialGradient(cx, subY, 2, cx, subY, subR);
  if (dialType === "blue") {
    subGrad.addColorStop(0, "#1e3a8a");
    subGrad.addColorStop(1, "#0a1122");
  } else if (dialType === "silver") {
    subGrad.addColorStop(0, "#e2e8f0");
    subGrad.addColorStop(1, "#94a3b8");
  } else {
    subGrad.addColorStop(0, "#09090b");
    subGrad.addColorStop(1, "#18181b");
  }
  ctx.fillStyle = subGrad;
  ctx.beginPath();
  ctx.arc(cx, subY, subR, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = dialType === "silver" ? "rgba(15, 23, 42, 0.5)" : "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Sub-seconds track ticks
  for (let s = 0; s < 12; s++) {
    const sAngle = (s * Math.PI) / 6;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(sAngle) * (subR * 0.78), subY + Math.sin(sAngle) * (subR * 0.78));
    ctx.lineTo(cx + Math.cos(sAngle) * (subR * 0.95), subY + Math.sin(sAngle) * (subR * 0.95));
    ctx.stroke();
  }

  // Brandmark Typography: VÉRAN PARIS
  ctx.fillStyle = dialType === "silver" ? "#0f172a" : "#ffffff";
  ctx.font = "bold 44px sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "10px";
  ctx.fillText("VÉRAN", cx, cy - r * 0.42);

  ctx.font = "400 22px sans-serif";
  ctx.letterSpacing = "8px";
  ctx.fillStyle = dialType === "silver" ? "#475569" : "rgba(255, 255, 255, 0.8)";
  ctx.fillText("PARIS", cx, cy - r * 0.31);

  ctx.font = "300 17px sans-serif";
  ctx.letterSpacing = "5px";
  ctx.fillText("CHRONOMÈTRE", cx, cy + r * 0.08);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  texture.anisotropy = 16;
  return texture;
}

// Generate exhibition caseback movement texture (Glashütte lines & perlage)
function createMovementTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.48;

  ctx.fillStyle = "#94a3b8";
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = "#e2e8f0";
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Glashütte Ribbing (Côtes de Genève)
  const stripeH = 36;
  for (let y = 0; y < size; y += stripeH) {
    const grad = ctx.createLinearGradient(0, y, 0, y + stripeH);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.5)");
    grad.addColorStop(0.5, "rgba(148, 163, 184, 0.15)");
    grad.addColorStop(1, "rgba(71, 85, 105, 0.45)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, size, stripeH);
  }

  // Ruby Jewel bearings (translucent red dots)
  const jewels = [
    { x: cx - 120, y: cy - 90 },
    { x: cx + 130, y: cy - 70 },
    { x: cx - 90, y: cy + 120 },
    { x: cx + 100, y: cy + 100 },
    { x: cx, y: cy },
  ];

  jewels.forEach((j) => {
    // Gold chaton surround
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(j.x, j.y, 24, 0, Math.PI * 2);
    ctx.fill();

    // Red synthetic ruby
    const rubyGrad = ctx.createRadialGradient(j.x - 3, j.y - 3, 2, j.x, j.y, 16);
    rubyGrad.addColorStop(0, "#f43f5e");
    rubyGrad.addColorStop(0.7, "#be123c");
    rubyGrad.addColorStop(1, "#881337");
    ctx.fillStyle = rubyGrad;
    ctx.beginPath();
    ctx.arc(j.x, j.y, 16, 0, Math.PI * 2);
    ctx.fill();

    // Flame-blued screws around chatons
    ctx.fillStyle = "#1d4ed8";
    ctx.beginPath();
    ctx.arc(j.x - 26, j.y + 6, 7, 0, Math.PI * 2);
    ctx.arc(j.x + 26, j.y + 6, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  // Engraving on bridge
  ctx.fillStyle = "#475569";
  ctx.font = "bold 22px serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText("CALIBRE V-101 · TWENTY-ONE JEWELS", cx, cy - 190);
  ctx.fillText("ADJUSTED FIVE POSITIONS · PARIS", cx, cy + 200);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  texture.anisotropy = 16;
  return texture;
}

// Generate realistic leather strap bump texture with saddle stitches
function createLeatherTexture(colorHex: string): THREE.CanvasTexture {
  const w = 512;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = colorHex;
  ctx.fillRect(0, 0, w, h);

  // Subtle organic grain
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  for (let i = 0; i < 4000; i++) {
    const rx = Math.random() * w;
    const ry = Math.random() * h;
    const rw = Math.random() * 2 + 1;
    ctx.fillRect(rx, ry, rw, rw);
  }

  // Saddle stitching along both borders
  ctx.strokeStyle = "#fef08a";
  ctx.lineWidth = 4;
  ctx.setLineDash([16, 12]);

  // Left stitch
  ctx.beginPath();
  ctx.moveTo(32, 20);
  ctx.lineTo(32, h - 20);
  ctx.stroke();

  // Right stitch
  ctx.beginPath();
  ctx.moveTo(w - 32, 20);
  ctx.lineTo(w - 32, h - 20);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function build3DWatch(): Watch3DComponents {
  const root = new THREE.Group();

  // -------------------------------------------------------------
  // 1. MATERIALS (Physically Based Rendering - PBR)
  // -------------------------------------------------------------
  const steelMaterial = new THREE.MeshStandardMaterial({
    color: 0xe4e4e7,
    metalness: 0.90,
    roughness: 0.25,
  });

  const polishedSteelMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.96,
    roughness: 0.10,
  });

  // Clean, high-performance optical sapphire crystal
  const sapphireMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0f9ff,
    transparent: true,
    opacity: 0.18,
    roughness: 0.03,
    metalness: 0.2,
  });

  const bluedSteelMaterial = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8, // Vibrant flame-blued leaf hands
    metalness: 0.85,
    roughness: 0.15,
  });

  const rhodiumMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.98,
    roughness: 0.05,
  });

  // -------------------------------------------------------------
  // 2. 316L STAINLESS STEEL CASE (Front normal facing +Z)
  // -------------------------------------------------------------
  const caseRadius = 2.4; // Proportionate units (~39mm)
  const caseHeight = 0.55;

  // Case body aligned along Z axis (z extends from -0.275 to +0.275)
  const caseGeo = new THREE.CylinderGeometry(caseRadius, caseRadius * 0.96, caseHeight, 64);
  caseGeo.rotateX(Math.PI / 2);
  const caseMesh = new THREE.Mesh(caseGeo, steelMaterial);
  caseMesh.castShadow = true;
  caseMesh.receiveShadow = true;
  root.add(caseMesh);

  // Stepped Mirror-Polished Coin-Edge Bezel
  const bezelGeo = new THREE.TorusGeometry(caseRadius * 0.98, 0.09, 16, 64);
  const bezelMesh = new THREE.Mesh(bezelGeo, polishedSteelMaterial);
  bezelMesh.position.z = 0.28;
  root.add(bezelMesh);

  // 4 Ergonomic Curved Lugs (Protruding at 10, 2, 4, 8 o'clock)
  const lugGeo = new THREE.BoxGeometry(0.32, 1.1, 0.42);
  const lugAngles = [
    Math.PI * 0.28,
    Math.PI * 0.72,
    Math.PI * 1.28,
    Math.PI * 1.72,
  ];

  lugAngles.forEach((angle) => {
    const lug = new THREE.Mesh(lugGeo, steelMaterial);
    const dist = caseRadius * 0.92;
    lug.position.set(Math.cos(angle) * dist, Math.sin(angle) * dist, -0.06);
    lug.rotation.z = angle - Math.PI / 2;
    lug.rotation.y = 0.22;
    root.add(lug);
  });

  // Knurled Winding Crown at 3 o'clock (+X axis)
  const crownGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.32, 24);
  crownGeo.rotateZ(Math.PI / 2);
  const crownMesh = new THREE.Mesh(crownGeo, polishedSteelMaterial);
  crownMesh.position.set(caseRadius + 0.20, 0, 0);
  root.add(crownMesh);

  // -------------------------------------------------------------
  // 3. DIAL & SAPPHIRE CRYSTAL (Facing +Z directly toward camera)
  // -------------------------------------------------------------
  let currentDialTexture = createDialTexture("blue");
  const dialMaterial = new THREE.MeshStandardMaterial({
    map: currentDialTexture,
    roughness: 0.55,
    metalness: 0.18,
  });

  // Dial positioned slightly in front of cylinder cap (z = 0.282)
  const dialGeo = new THREE.CircleGeometry(caseRadius * 0.91, 64);
  const dialMesh = new THREE.Mesh(dialGeo, dialMaterial);
  dialMesh.position.z = 0.282;
  root.add(dialMesh);

  // 12 Applied 3D Rhodium Hour Markers (z = 0.288)
  for (let i = 0; i < 12; i++) {
    const markerAngle = (i * Math.PI) / 6;
    const isCardinal = i % 3 === 0;
    const markerGeo = new THREE.BoxGeometry(
      isCardinal ? 0.08 : 0.05,
      isCardinal ? 0.38 : 0.25,
      0.03
    );
    const marker = new THREE.Mesh(markerGeo, rhodiumMaterial);
    const dist = caseRadius * 0.76;
    marker.position.set(
      Math.sin(markerAngle) * dist,
      Math.cos(markerAngle) * dist,
      0.288
    );
    marker.rotation.z = -markerAngle;
    root.add(marker);
  }

  // Curved Double-Domed Sapphire Crystal (z = 0.34)
  const crystalGeo = new THREE.SphereGeometry(
    caseRadius * 1.05,
    64,
    32,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.22
  );
  crystalGeo.rotateX(Math.PI / 2);
  const crystalMesh = new THREE.Mesh(crystalGeo, sapphireMaterial);
  crystalMesh.position.z = 0.34;
  root.add(crystalMesh);

  // -------------------------------------------------------------
  // 4. FLAME-BLUED 3D HANDS (Hour, Minute, Petite Seconde)
  // -------------------------------------------------------------
  const handsCenterZ = 0.298;

  // Center Pinion Cap
  const pinionGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
  pinionGeo.rotateX(Math.PI / 2);
  const pinionMesh = new THREE.Mesh(pinionGeo, polishedSteelMaterial);
  pinionMesh.position.set(0, 0, handsCenterZ + 0.02);
  root.add(pinionMesh);

  // Hour Hand (Leaf shaped, rotating around Z)
  const hourHand = new THREE.Group();
  hourHand.position.set(0, 0, handsCenterZ);
  const hourGeo = new THREE.BoxGeometry(0.08, 1.1, 0.02);
  hourGeo.translate(0, 0.55, 0);
  const hourMesh = new THREE.Mesh(hourGeo, bluedSteelMaterial);
  hourHand.add(hourMesh);
  root.add(hourHand);

  // Minute Hand (Extended Leaf, rotating around Z)
  const minuteHand = new THREE.Group();
  minuteHand.position.set(0, 0, handsCenterZ + 0.015);
  const minuteGeo = new THREE.BoxGeometry(0.06, 1.6, 0.02);
  minuteGeo.translate(0, 0.8, 0);
  const minuteMesh = new THREE.Mesh(minuteGeo, bluedSteelMaterial);
  minuteHand.add(minuteMesh);
  root.add(minuteHand);

  // Sub-seconds Hand at 6 o'clock (-Y axis)
  const secondHand = new THREE.Group();
  const subY = -caseRadius * 0.44;
  secondHand.position.set(0, subY, handsCenterZ);
  const secondGeo = new THREE.BoxGeometry(0.025, 0.55, 0.015);
  secondGeo.translate(0, 0.25, 0);
  const secondMesh = new THREE.Mesh(secondGeo, bluedSteelMaterial);
  secondHand.add(secondMesh);
  root.add(secondHand);

  // -------------------------------------------------------------
  // 5. EXHIBITION CASEBACK & CALIBRE V-101 MOVEMENT (Turn 180° around Y)
  // -------------------------------------------------------------
  const movementTexture = createMovementTexture();
  const movementMaterial = new THREE.MeshStandardMaterial({
    map: movementTexture,
    metalness: 0.40,
    roughness: 0.40,
  });

  const movementGeo = new THREE.CircleGeometry(caseRadius * 0.85, 48);
  movementGeo.rotateY(Math.PI); // Facing -Z
  const movementMesh = new THREE.Mesh(movementGeo, movementMaterial);
  movementMesh.position.z = -0.282;
  root.add(movementMesh);

  // Caseback Sapphire Crystal
  const backCrystalGeo = new THREE.CircleGeometry(caseRadius * 0.86, 48);
  backCrystalGeo.rotateY(Math.PI);
  const backCrystalMesh = new THREE.Mesh(backCrystalGeo, sapphireMaterial);
  backCrystalMesh.position.z = -0.286;
  root.add(backCrystalMesh);

  // Rotating Screw Balance Wheel
  const balanceWheel = new THREE.Group();
  balanceWheel.position.set(-caseRadius * 0.35, -caseRadius * 0.2, -0.278);
  const balanceRimGeo = new THREE.TorusGeometry(0.55, 0.03, 12, 32);
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.95,
    roughness: 0.15,
  });
  const balanceRim = new THREE.Mesh(balanceRimGeo, goldMaterial);
  balanceWheel.add(balanceRim);
  root.add(balanceWheel);

  // -------------------------------------------------------------
  // 6. QUICK-RELEASE INTERCHANGEABLE STRAPS (Top at +Y, Bottom at -Y)
  // -------------------------------------------------------------
  const strapGroup = new THREE.Group();
  root.add(strapGroup);

  const strapWidth = 1.6;
  const strapLength = 3.6;
  const strapThick = 0.22;

  let currentStrapMat: THREE.MeshStandardMaterial;

  const buildStrapMeshes = (type: StrapType) => {
    while (strapGroup.children.length > 0) {
      strapGroup.remove(strapGroup.children[0]);
    }

    if (type === "cognac") {
      const tex = createLeatherTexture("#854d0e");
      currentStrapMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.75,
        metalness: 0.1,
      });
    } else if (type === "blue") {
      const tex = createLeatherTexture("#1e3a8a");
      currentStrapMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.75,
        metalness: 0.1,
      });
    } else {
      // Milanese 316L Stainless Steel Mesh
      currentStrapMat = new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        metalness: 0.95,
        roughness: 0.3,
      });
    }

    // Top Strap (12 o'clock, +Y)
    const topStrapGeo = new THREE.BoxGeometry(strapWidth, strapLength, strapThick);
    const topStrap = new THREE.Mesh(topStrapGeo, currentStrapMat);
    topStrap.position.set(0, caseRadius + strapLength / 2 - 0.25, -0.15);
    topStrap.rotation.x = -0.18; // Curves back around the wrist
    topStrap.castShadow = true;
    strapGroup.add(topStrap);

    // Bottom Strap (6 o'clock, -Y)
    const bottomStrapGeo = new THREE.BoxGeometry(strapWidth, strapLength * 1.15, strapThick);
    const bottomStrap = new THREE.Mesh(bottomStrapGeo, currentStrapMat);
    bottomStrap.position.set(0, -caseRadius - (strapLength * 1.15) / 2 + 0.25, -0.15);
    bottomStrap.rotation.x = 0.18; // Curves back around the wrist
    bottomStrap.castShadow = true;
    strapGroup.add(bottomStrap);

    // 316L Steel Pin Buckle on bottom strap
    const buckleGeo = new THREE.TorusGeometry(strapWidth * 0.55, 0.06, 12, 24);
    const buckleMesh = new THREE.Mesh(buckleGeo, polishedSteelMaterial);
    buckleMesh.position.set(0, -caseRadius - strapLength * 1.1, -0.12);
    strapGroup.add(buckleMesh);
  };

  buildStrapMeshes("cognac");

  // Dynamic Dial Switcher
  const updateDial = (dial: DialType) => {
    currentDialTexture.dispose();
    currentDialTexture = createDialTexture(dial);
    dialMaterial.map = currentDialTexture;
    dialMaterial.needsUpdate = true;
  };

  // Dynamic Strap Switcher
  const updateStrap = (strap: StrapType) => {
    buildStrapMeshes(strap);
  };

  // Real-time mechanical tick & animation
  const tick = (time: number) => {
    // 28,800 vph (4 Hz) balance wheel harmonic oscillation
    const balanceOsc = Math.sin(time * 25) * 1.2;
    balanceWheel.rotation.z = balanceOsc;

    // Smooth second hand progression
    secondHand.rotation.z = -time * 1.2;

    // Minute and Hour hand progression
    minuteHand.rotation.z = -time * 0.1;
    hourHand.rotation.z = -time * 0.008 - Math.PI * 0.35;
  };

  return {
    root,
    caseMesh,
    bezelMesh,
    crystalMesh,
    dialMesh,
    hourHand,
    minuteHand,
    secondHand,
    balanceWheel,
    strapGroup,
    crownMesh,
    updateDial,
    updateStrap,
    tick,
  };
}
