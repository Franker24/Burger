import * as THREE from 'three';

/**
 * Procedural High-Resolution PBR Texture Generator for Gourmet Burger Materials
 * Generates Albedo, Bump, Roughness, and Clearcoat maps directly into THREE.CanvasTexture
 */

// Helper to create an offscreen canvas
function createCanvas(width = 512, height = 512): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  return { canvas, ctx };
}

// Simple pseudo-random noise helper
function noise(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return n - Math.floor(n);
}

/**
 * 1. BRIOCHE BUN TEXTURES
 */
export function createBriocheCrownTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(1024, 1024);

  // Radial gradient: warm golden center to deep caramelized toasted edges
  const grad = ctx.createRadialGradient(512, 380, 80, 512, 512, 520);
  grad.addColorStop(0, '#E5953B');    // Golden toasted apex
  grad.addColorStop(0.35, '#C6711E'); // Rich brioche brown
  grad.addColorStop(0.75, '#8C3D08'); // Dark oven caramelized crust
  grad.addColorStop(1, '#4A1C04');    // Deep toasted rim
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Add micro-crust grain and baking freckles
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let y = 0; y < 1024; y++) {
    for (let x = 0; x < 1024; x++) {
      const idx = (y * 1024 + x) * 4;
      const n = (Math.random() - 0.5) * 26;
      data[idx] = Math.min(255, Math.max(0, data[idx] + n));
      data[idx + 1] = Math.min(255, Math.max(0, data[idx + 1] + n * 0.7));
      data[idx + 2] = Math.min(255, Math.max(0, data[idx + 2] + n * 0.4));
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Subtle egg-wash glaze streaks
  ctx.strokeStyle = 'rgba(255, 230, 180, 0.08)';
  ctx.lineWidth = 14;
  for (let i = 0; i < 16; i++) {
    ctx.beginPath();
    ctx.arc(512, 512, 100 + i * 25, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  return texture;
}

export function createBriocheBumpMap(): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(512, 512);
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);

  // Porous bread texture & crust wrinkles
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const val = 128 + (Math.random() - 0.5) * 45;
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
  }
  ctx.putImageData(imgData, 0, 0);

  // Subtle natural crust stretching lines
  ctx.strokeStyle = 'rgba(170, 170, 170, 0.25)';
  ctx.lineWidth = 4;
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    const cx = Math.random() * 512;
    const cy = Math.random() * 512;
    ctx.ellipse(cx, cy, 30 + Math.random() * 40, 6 + Math.random() * 8, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createToastedCrumbTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(512, 512);
  
  // Base creamy yellow brioche interior
  ctx.fillStyle = '#F3D298';
  ctx.fillRect(0, 0, 512, 512);

  // Plancha butter-toasted ring & golden charred spots
  const radial = ctx.createRadialGradient(256, 256, 60, 256, 256, 250);
  radial.addColorStop(0, 'rgba(180, 95, 20, 0.7)');
  radial.addColorStop(0.5, 'rgba(215, 135, 45, 0.85)');
  radial.addColorStop(0.9, 'rgba(150, 70, 15, 0.9)');
  radial.addColorStop(1, 'rgba(90, 40, 10, 0.95)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 512, 512);

  // Toasted bread pores & air pockets
  ctx.fillStyle = '#4A2208';
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 1 + Math.random() * 2.8;
    ctx.globalAlpha = 0.2 + Math.random() * 0.45;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 2. SMASH BEEF PATTY TEXTURES (300°C Cast Iron Plancha Searing)
 */
export function createSmashBeefTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(1024, 1024);

  // Deep caramelized base: rich mahogany brown with grilled undertones
  ctx.fillStyle = '#220E05';
  ctx.fillRect(0, 0, 1024, 1024);

  // Plancha searing gradient with caramelized crust patterns
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const w = 30 + Math.random() * 160;
    const h = 15 + Math.random() * 80;
    const rot = (Math.random() - 0.5) * 1.2;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    
    // Charred crust and Maillard reaction spots
    const splotchGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, w / 2);
    splotchGrad.addColorStop(0, '#090301');   // Intense black char
    splotchGrad.addColorStop(0.4, '#1F0B04'); // Deep seared crust
    splotchGrad.addColorStop(0.7, '#3A180B'); // Caramelized beef brown
    splotchGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = splotchGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Minced meat fiber grain and glistening fat specks
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const rNoise = Math.random();
    if (rNoise > 0.85) {
      // Juicy sizzling fat droplet sheen
      data[i] = Math.min(255, data[i] + 90);
      data[i + 1] = Math.min(255, data[i + 1] + 50);
      data[i + 2] = Math.min(255, data[i + 2] + 25);
    } else if (rNoise < 0.20) {
      // Crunchy charred fringe speck
      data[i] = Math.max(0, data[i] - 35);
      data[i + 1] = Math.max(0, data[i + 1] - 25);
      data[i + 2] = Math.max(0, data[i + 2] - 20);
    }
  }
  ctx.putImageData(imgData, 0, 0);

  // Plancha grill marks and fine meat texture strokes
  ctx.strokeStyle = 'rgba(10, 4, 1, 0.4)';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    const sx = Math.random() * 1024;
    const sy = Math.random() * 1024;
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + (Math.random() - 0.5) * 50, sy + (Math.random() - 0.5) * 20);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  return texture;
}

export function createSmashBeefBumpMap(): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(512, 512);
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);

  // Rugged, porous ground beef granules and plancha crags
  for (let i = 0; i < 1400; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 1.2 + Math.random() * 5.0;
    const isCavity = Math.random() > 0.45;

    ctx.fillStyle = isCavity ? 'rgba(20, 20, 20, 0.6)' : 'rgba(245, 245, 245, 0.5)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * 3. CHEDDAR CHEESE TEXTURES (Molten American Cheddar)
 */
export function createCheddarTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(512, 512);

  // Vibrant molten cheddar yellow-orange
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#FFB200');
  grad.addColorStop(0.4, '#FFA000');
  grad.addColorStop(0.8, '#FF8A00');
  grad.addColorStop(1, '#E67500');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Melted cheese butterfat sheen & soft micro-swirls
  ctx.strokeStyle = 'rgba(255, 235, 140, 0.22)';
  ctx.lineWidth = 18;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 512, Math.random() * 512);
    ctx.bezierCurveTo(
      Math.random() * 512, Math.random() * 512,
      Math.random() * 512, Math.random() * 512,
      Math.random() * 512, Math.random() * 512
    );
    ctx.stroke();
  }

  // Micro molten bubbles
  ctx.fillStyle = 'rgba(255, 245, 200, 0.3)';
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 512, 2 + Math.random() * 3, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 4. SALSA BRASA (Special House Sauce with Chili Flecks)
 */
export function createSauceTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(512, 512);

  // Glossy rich burnt-red sauce base
  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 280);
  grad.addColorStop(0, '#E5381B');
  grad.addColorStop(0.6, '#B8220C');
  grad.addColorStop(1, '#781105');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Roasted chili flakes & cracked black pepper flecks
  for (let i = 0; i < 350; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const isPepper = Math.random() > 0.4;
    ctx.fillStyle = isPepper ? '#2A0804' : '#FFAA33';
    ctx.globalAlpha = 0.6 + Math.random() * 0.4;
    ctx.beginPath();
    ctx.arc(x, y, 0.8 + Math.random() * 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  // Gloss highlight veins
  ctx.strokeStyle = 'rgba(255, 140, 110, 0.25)';
  ctx.lineWidth = 12;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.arc(256, 256, 80 + i * 35, 0, Math.PI * 1.5);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 5. CRISPY ONION TEXTURES
 */
export function createCrispyOnionTexture(): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(256, 256);

  // Caramelized golden fried onion with darker crunchy tips
  const grad = ctx.createLinearGradient(0, 0, 256, 256);
  grad.addColorStop(0, '#F5BE58');
  grad.addColorStop(0.5, '#CF8820');
  grad.addColorStop(0.85, '#8C480E');
  grad.addColorStop(1, '#4A1D05');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  // Onion fiber striations
  ctx.strokeStyle = 'rgba(74, 29, 5, 0.35)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * 9);
    ctx.lineTo(256, i * 9 + (Math.random() - 0.5) * 10);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
