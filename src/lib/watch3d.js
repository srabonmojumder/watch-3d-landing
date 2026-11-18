import * as THREE from "three";

// Global Texture Caches to prevent duplicate canvas allocations and GPU memory bloat
const dialTextureCache = new Map();
let movementTextureCache = null;
const leatherTextureCache = new Map();

// Generate procedural high-resolution textures for dials (1024x1024) - Cached
function getDialTexture(dialType) {
  if (dialTextureCache.has(dialType)) {
    return dialTextureCache.get(dialType);
  }

  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.485;

  ctx.clearRect(0, 0, size, size);

  if (dialType === "blue") {
    // Fill entire dial base with deep midnight cobalt
    ctx.fillStyle = "#060d1a";
    ctx.fillRect(0, 0, size, size);

    // Radiant Bleu de Paris galvanic sunburst with rich optical depth
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    grad.addColorStop(0, "#2563eb");   // Royal sapphire blue core
    grad.addColorStop(0.3, "#1d4ed8");
    grad.addColorStop(0.68, "#1e3a8a");
    grad.addColorStop(0.92, "#0f172a");
    grad.addColorStop(1, "#030712");   // Midnight perimeter vignette
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // 120 Sunburst guilloché micro-rays
    ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 120; i++) {
      const angle = (i * Math.PI) / 60;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.stroke();
    }
  } else if (dialType === "silver") {
    // Argent brossé base
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(0, 0, size, size);

    // Subtle brushed silver gradient
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.45, "#f8fafc");
    grad.addColorStop(0.55, "#f1f5f9");
    grad.addColorStop(1, "#cbd5e1");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Fine vertical brushed satin grain
    ctx.strokeStyle = "rgba(15, 23, 42, 0.04)";
    ctx.lineWidth = 1.0;
    for (let x = 0; x <= size; x += 3) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
  } else if (dialType === "salmon") {
    // Parisian Saumon Vendôme sunburst
    ctx.fillStyle = "#9a3412";
    ctx.fillRect(0, 0, size, size);

    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    grad.addColorStop(0, "#fdba74");   // Warm copper-salmon highlight
    grad.addColorStop(0.3, "#fb923c");
    grad.addColorStop(0.7, "#ea580c");
    grad.addColorStop(0.92, "#c2410c");
    grad.addColorStop(1, "#431407");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // 100 delicate sunburst rays
    ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 100; i++) {
      const angle = (i * Math.PI) / 50;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.stroke();
    }
  } else if (dialType === "noir") {
    // Obsidian deep galvanic black
    ctx.fillStyle = "#020203";
    ctx.fillRect(0, 0, size, size);

    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    grad.addColorStop(0, "#27272a");
    grad.addColorStop(0.4, "#18181b");
    grad.addColorStop(0.85, "#09090b");
    grad.addColorStop(1, "#000000");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Fine concentric record-groove grain (azurage)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1.0;
    for (let cr = r * 0.12; cr < r * 0.96; cr += 10) {
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else {
    // Slate Ardoise Clous de Paris guilloché
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, size, size);

    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    grad.addColorStop(0, "#334155");
    grad.addColorStop(0.6, "#1e293b");
    grad.addColorStop(1, "#020617");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Clous de Paris hobnail pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1.0;
    const step = 16;
    for (let x = 0; x < size; x += step) {
      for (let y = 0; y < size; y += step) {
        if (Math.hypot(x - cx, y - cy) < r * 0.95) {
          ctx.strokeRect(x, y, step - 1.5, step - 1.5);
        }
      }
    }
  }

  // Outer Railway Minute Track (Chemin de fer)
  ctx.strokeStyle = dialType === "silver" ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.85)";
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
    subGrad.addColorStop(1, "#080e1c");
  } else if (dialType === "silver") {
    subGrad.addColorStop(0, "#f1f5f9");
    subGrad.addColorStop(1, "#cbd5e1");
  } else if (dialType === "salmon") {
    subGrad.addColorStop(0, "#fb923c");
    subGrad.addColorStop(1, "#7c2d12");
  } else if (dialType === "noir") {
    subGrad.addColorStop(0, "#18181b");
    subGrad.addColorStop(1, "#000000");
  } else {
    subGrad.addColorStop(0, "#1e293b");
    subGrad.addColorStop(1, "#020617");
  }
  ctx.fillStyle = subGrad;
  ctx.beginPath();
  ctx.arc(cx, subY, subR, 0, Math.PI * 2);
  ctx.fill();

  // Sub-seconds azurage grooves
  ctx.strokeStyle = dialType === "silver" ? "rgba(15, 23, 42, 0.45)" : "rgba(255, 255, 255, 0.45)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Sub-seconds track ticks
  for (let s = 0; s < 12; s++) {
    const sAngle = (s * Math.PI) / 6;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(sAngle) * (subR * 0.76), subY + Math.sin(sAngle) * (subR * 0.76));
    ctx.lineTo(cx + Math.cos(sAngle) * (subR * 0.94), subY + Math.sin(sAngle) * (subR * 0.94));
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
  ctx.fillStyle = dialType === "silver" ? "#334155" : "rgba(255, 255, 255, 0.85)";
  ctx.fillText("PARIS", cx, cy - r * 0.31);

  ctx.font = "300 17px sans-serif";
  ctx.letterSpacing = "5px";
  ctx.fillText("CHRONOMÈTRE", cx, cy + r * 0.08);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  texture.anisotropy = 4; // Capped for performance
  dialTextureCache.set(dialType, texture);
  return texture;
}

// Generate exhibition caseback movement texture (Glashütte lines & perlage) - Cached
function getMovementTexture() {
  if (movementTextureCache) {
    return movementTextureCache;
  }

  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.48;

  ctx.fillStyle = "#64748b";
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = "#e2e8f0";
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Glashütte Ribbing (Côtes de Genève)
  const stripeH = 36;
  for (let y = 0; y < size; y += stripeH) {
    const grad = ctx.createLinearGradient(0, y, 0, y + stripeH);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.65)");
    grad.addColorStop(0.5, "rgba(148, 163, 184, 0.15)");
    grad.addColorStop(1, "rgba(51, 65, 85, 0.55)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, size, stripeH);
  }

  // Ruby Jewel bearings (translucent red dots in gold chatons)
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
    rubyGrad.addColorStop(0, "#fb7185");
    rubyGrad.addColorStop(0.7, "#be123c");
    rubyGrad.addColorStop(1, "#881337");
    ctx.fillStyle = rubyGrad;
    ctx.beginPath();
    ctx.arc(j.x, j.y, 16, 0, Math.PI * 2);
    ctx.fill();

    // Flame-blued micro screws around chatons
    ctx.fillStyle = "#1d4ed8";
    ctx.beginPath();
    ctx.arc(j.x - 26, j.y + 6, 7, 0, Math.PI * 2);
    ctx.arc(j.x + 26, j.y + 6, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  // Engravings on bridge
  ctx.fillStyle = "#334155";
  ctx.font = "bold 22px serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText("CALIBRE V-101 · TWENTY-ONE JEWELS", cx, cy - 190);
  ctx.fillText("ADJUSTED FIVE POSITIONS · PARIS", cx, cy + 200);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  texture.anisotropy = 4;
  movementTextureCache = texture;
  return texture;
}

// Generate realistic leather strap bump texture with saddle stitches - Cached
function getLeatherTexture(colorHex) {
  if (leatherTextureCache.has(colorHex)) {
    return leatherTextureCache.get(colorHex);
  }

  const w = 512;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = colorHex;
  ctx.fillRect(0, 0, w, h);

  // Subtle organic grain
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  for (let i = 0; i < 3000; i++) {
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
  leatherTextureCache.set(colorHex, texture);
  return texture;
}

export function build3DWatch(initialDial = "blue", initialStrap = "cognac") {
  const root = new THREE.Group();

  // 1. MATERIALS (Optimized Physically Based Rendering)
  const steelMaterial = new THREE.MeshStandardMaterial({
    color: 0xf4f4f5,
    metalness: 0.92,
    roughness: 0.22,
  });

  const polishedSteelMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.96,
    roughness: 0.08,
  });

  // Fast, lightweight sapphire crystal (eliminates heavy transmission render target copies)
  const sapphireMaterial = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    transparent: true,
    opacity: 0.22,
    roughness: 0.04,
    metalness: 0.15,
  });

  const bluedSteelMaterial = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    metalness: 0.88,
    roughness: 0.12,
  });

  const rhodiumMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.98,
    roughness: 0.05,
  });

  // 2. 316L STAINLESS STEEL CASE (Optimized segment count)
  const caseRadius = 2.4;
  const caseHeight = 0.55;

  const caseGeo = new THREE.CylinderGeometry(caseRadius, caseRadius * 0.96, caseHeight, 40);
  caseGeo.rotateX(Math.PI / 2);
  const caseMesh = new THREE.Mesh(caseGeo, steelMaterial);
  root.add(caseMesh);

  // Bezel with polished chamfer
  const bezelGeo = new THREE.TorusGeometry(caseRadius * 0.98, 0.09, 12, 40);
  const bezelMesh = new THREE.Mesh(bezelGeo, polishedSteelMaterial);
  bezelMesh.position.z = 0.28;
  root.add(bezelMesh);

  // Ergonomic curved lugs
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

  // Fluted winding crown
  const crownGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.32, 20);
  crownGeo.rotateZ(Math.PI / 2);
  const crownMesh = new THREE.Mesh(crownGeo, polishedSteelMaterial);
  crownMesh.position.set(caseRadius + 0.20, 0, 0);
  root.add(crownMesh);

  // 3. DIAL & SAPPHIRE CRYSTAL
  let currentDialTexture = getDialTexture(initialDial);
  const dialMaterial = new THREE.MeshStandardMaterial({
    map: currentDialTexture,
    roughness: 0.52,
    metalness: 0.20,
  });

  const dialGeo = new THREE.CircleGeometry(caseRadius * 0.91, 40);
  const dialMesh = new THREE.Mesh(dialGeo, dialMaterial);
  dialMesh.position.z = 0.282;
  root.add(dialMesh);

  // Applied 3D rhodium indices
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

  // Domed sapphire crystal
  const crystalGeo = new THREE.SphereGeometry(
    caseRadius * 1.05,
    36,
    18,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.22
  );
  crystalGeo.rotateX(Math.PI / 2);
  const crystalMesh = new THREE.Mesh(crystalGeo, sapphireMaterial);
  crystalMesh.position.z = 0.34;
  root.add(crystalMesh);

  // 4. FLAME-BLUED 3D HANDS
  const handsCenterZ = 0.298;

  const pinionGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
  pinionGeo.rotateX(Math.PI / 2);
  const pinionMesh = new THREE.Mesh(pinionGeo, polishedSteelMaterial);
  pinionMesh.position.set(0, 0, handsCenterZ + 0.02);
  root.add(pinionMesh);

  // Hour hand
  const hourHand = new THREE.Group();
  hourHand.position.set(0, 0, handsCenterZ);
  const hourGeo = new THREE.BoxGeometry(0.08, 1.1, 0.02);
  hourGeo.translate(0, 0.55, 0);
  const hourMesh = new THREE.Mesh(hourGeo, bluedSteelMaterial);
  hourHand.add(hourMesh);
  root.add(hourHand);

  // Minute hand
  const minuteHand = new THREE.Group();
  minuteHand.position.set(0, 0, handsCenterZ + 0.015);
  const minuteGeo = new THREE.BoxGeometry(0.06, 1.6, 0.02);
  minuteGeo.translate(0, 0.8, 0);
  const minuteMesh = new THREE.Mesh(minuteGeo, bluedSteelMaterial);
  minuteHand.add(minuteMesh);
  root.add(minuteHand);

  // Sub-seconds counter hand
  const secondHand = new THREE.Group();
  const subY = -caseRadius * 0.44;
  secondHand.position.set(0, subY, handsCenterZ);
  const secondGeo = new THREE.BoxGeometry(0.025, 0.55, 0.015);
  secondGeo.translate(0, 0.25, 0);
  const secondMesh = new THREE.Mesh(secondGeo, bluedSteelMaterial);
  secondHand.add(secondMesh);
  root.add(secondHand);

  // 5. EXHIBITION CASEBACK & CALIBRE V-101 MOVEMENT
  const movementTexture = getMovementTexture();
  const movementMaterial = new THREE.MeshStandardMaterial({
    map: movementTexture,
    metalness: 0.45,
    roughness: 0.38,
  });

  const movementGeo = new THREE.CircleGeometry(caseRadius * 0.85, 36);
  movementGeo.rotateY(Math.PI);
  const movementMesh = new THREE.Mesh(movementGeo, movementMaterial);
  movementMesh.position.z = -0.282;
  root.add(movementMesh);

  const backCrystalGeo = new THREE.CircleGeometry(caseRadius * 0.86, 36);
  backCrystalGeo.rotateY(Math.PI);
  const backCrystalMesh = new THREE.Mesh(backCrystalGeo, sapphireMaterial);
  backCrystalMesh.position.z = -0.286;
  root.add(backCrystalMesh);

  const balanceWheel = new THREE.Group();
  balanceWheel.position.set(-caseRadius * 0.35, -caseRadius * 0.2, -0.278);
  const balanceRimGeo = new THREE.TorusGeometry(0.55, 0.035, 12, 24);
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.98,
    roughness: 0.12,
  });
  const balanceRim = new THREE.Mesh(balanceRimGeo, goldMaterial);
  balanceWheel.add(balanceRim);
  root.add(balanceWheel);

  // 6. QUICK-RELEASE INTERCHANGEABLE STRAPS
  const strapGroup = new THREE.Group();
  root.add(strapGroup);

  const strapWidth = 1.6;
  const strapLength = 3.6;
  const strapThick = 0.22;

  let currentStrapMat;

  const buildStrapMeshes = (type) => {
    while (strapGroup.children.length > 0) {
      strapGroup.remove(strapGroup.children[0]);
    }

    if (type === "cognac") {
      const tex = getLeatherTexture("#854d0e");
      currentStrapMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.72,
        metalness: 0.08,
      });
    } else if (type === "blue") {
      const tex = getLeatherTexture("#1e3a8a");
      currentStrapMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.72,
        metalness: 0.08,
      });
    } else if (type === "black") {
      const tex = getLeatherTexture("#18181b");
      currentStrapMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.72,
        metalness: 0.08,
      });
    } else {
      // Milanese Steel Mesh
      currentStrapMat = new THREE.MeshStandardMaterial({
        color: 0xe4e4e7,
        metalness: 0.96,
        roughness: 0.24,
      });
    }

    const topStrapGeo = new THREE.BoxGeometry(strapWidth, strapLength, strapThick);
    const topStrap = new THREE.Mesh(topStrapGeo, currentStrapMat);
    topStrap.position.set(0, caseRadius + strapLength / 2 - 0.25, -0.15);
    topStrap.rotation.x = -0.18;
    strapGroup.add(topStrap);

    const bottomStrapGeo = new THREE.BoxGeometry(strapWidth, strapLength * 1.15, strapThick);
    const bottomStrap = new THREE.Mesh(bottomStrapGeo, currentStrapMat);
    bottomStrap.position.set(0, -caseRadius - (strapLength * 1.15) / 2 + 0.25, -0.15);
    bottomStrap.rotation.x = 0.18;
    strapGroup.add(bottomStrap);

    const buckleGeo = new THREE.TorusGeometry(strapWidth * 0.55, 0.06, 10, 20);
    const buckleMesh = new THREE.Mesh(buckleGeo, polishedSteelMaterial);
    buckleMesh.position.set(0, -caseRadius - strapLength * 1.1, -0.12);
    strapGroup.add(buckleMesh);
  };

  buildStrapMeshes(initialStrap);

  const updateDial = (dial) => {
    dialMaterial.map = getDialTexture(dial);
    dialMaterial.needsUpdate = true;
  };

  const updateStrap = (strap) => {
    buildStrapMeshes(strap);
  };

  const tick = (time, isWinding = false) => {
    const speed = isWinding ? 48 : 25;
    const balanceOsc = Math.sin(time * speed) * (isWinding ? 1.6 : 1.2);
    balanceWheel.rotation.z = balanceOsc;

    secondHand.rotation.z = -time * (isWinding ? 2.5 : 1.2);
    minuteHand.rotation.z = -time * 0.1;
    hourHand.rotation.z = -time * 0.008 - Math.PI * 0.35;

    if (isWinding) {
      crownMesh.rotation.x += 0.25;
    }
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
