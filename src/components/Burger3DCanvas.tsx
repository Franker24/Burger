import React, { useEffect, useRef, useState, Component, ErrorInfo, ReactNode } from 'react';
import * as THREE from 'three';
import {
  createBriocheCrownTexture,
  createBriocheBumpMap,
  createToastedCrumbTexture,
  createSmashBeefTexture,
  createSmashBeefBumpMap,
  createCheddarTexture,
  createSauceTexture,
  createCrispyOnionTexture,
} from '../utils/burgerTextures';

interface Burger3DCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  onLayerPositionsUpdate?: (positions: { id: string; x: number; y: number; visible: boolean }[]) => void;
  isMobile?: boolean;
}

// Comprobación segura de soporte WebGL antes de instanciar THREE.WebGLRenderer
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// =========================================================================
// FALLBACK EN 2D/CSS: Para entornos sandboxed o dispositivos sin aceleración GPU
// =========================================================================
const BurgerFallbackExplodedView: React.FC<Burger3DCanvasProps> = ({
  scrollProgress,
  onLayerPositionsUpdate,
  isMobile = false,
}) => {
  // Cálculo de factor de explosión según scroll
  let explosion = 0;
  if (scrollProgress < 0.2) {
    explosion = 0;
  } else if (scrollProgress < 0.45) {
    explosion = (scrollProgress - 0.2) / 0.25;
  } else if (scrollProgress < 0.75) {
    explosion = 1.0;
  } else if (scrollProgress < 0.9) {
    explosion = 1.0 - (scrollProgress - 0.75) / 0.15;
  } else {
    explosion = 0;
  }

  const distBunTop = -(isMobile ? 130 : 180) * explosion;
  const distSauce = -(isMobile ? 70 : 95) * explosion;
  const distOnions = -(isMobile ? 22 : 30) * explosion;
  const distCheese = +(isMobile ? 25 : 35) * explosion;
  const distPatty = +(isMobile ? 75 : 100) * explosion;
  const distBunBottom = +(isMobile ? 130 : 180) * explosion;

  useEffect(() => {
    if (!onLayerPositionsUpdate) return;
    const centerY = window.innerHeight * 0.5;
    const centerX = window.innerWidth * 0.5;

    const positions = [
      { id: 'top-bun', x: centerX, y: centerY + distBunTop, visible: explosion > 0.35 && explosion < 0.95 },
      { id: 'sauce', x: centerX, y: centerY + distSauce, visible: explosion > 0.35 && explosion < 0.95 },
      { id: 'onions', x: centerX, y: centerY + distOnions, visible: explosion > 0.35 && explosion < 0.95 },
      { id: 'cheese', x: centerX, y: centerY + distCheese, visible: explosion > 0.35 && explosion < 0.95 },
      { id: 'patty', x: centerX, y: centerY + distPatty, visible: explosion > 0.35 && explosion < 0.95 },
      { id: 'bottom-bun', x: centerX, y: centerY + distBunBottom, visible: explosion > 0.35 && explosion < 0.95 },
    ];

    onLayerPositionsUpdate(positions);
  }, [explosion, distBunTop, distSauce, distOnions, distCheese, distPatty, distBunBottom, onLayerPositionsUpdate]);

  const burgerWidth = isMobile ? 260 : 340;

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden select-none">
      {/* Sombra de suelo */}
      <div
        className="absolute bottom-[20%] w-[320px] sm:w-[420px] h-10 bg-black/15 rounded-[100%] blur-xl transition-all duration-300"
        style={{
          transform: `scale(${1 - explosion * 0.25})`,
          opacity: 0.8 - explosion * 0.3,
        }}
      />

      {/* Contenedor de capas de hamburguesa despiezables */}
      <div className="relative flex flex-col items-center justify-center" style={{ width: burgerWidth, height: 420 }}>
        
        {/* Capa 1: Pan Brioche Corona */}
        <div
          className="absolute z-60 transition-transform duration-200 ease-out filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)]"
          style={{ transform: `translateY(${distBunTop}px)` }}
        >
          <svg width={burgerWidth} height={isMobile ? 100 : 120} viewBox="0 0 340 120">
            {/* Domo de brioche dorado */}
            <path
              d="M20,110 C20,35 90,8 170,8 C250,8 320,35 320,110 C320,118 20,118 20,110 Z"
              fill="url(#briocheGrad)"
            />
            {/* Brillo de manteca */}
            <path
              d="M70,35 C110,18 230,18 270,35 C220,24 120,24 70,35 Z"
              fill="#FFF0D4"
              opacity="0.5"
            />
            {/* Semillas de sésamo */}
            <ellipse cx="110" cy="40" rx="3.5" ry="2" fill="#FFF7EA" transform="rotate(-15 110 40)" />
            <ellipse cx="140" cy="28" rx="3.5" ry="2" fill="#FFF7EA" transform="rotate(10 140 28)" />
            <ellipse cx="170" cy="35" rx="3.5" ry="2" fill="#FFF7EA" transform="rotate(-5 170 35)" />
            <ellipse cx="200" cy="26" rx="3.5" ry="2" fill="#FFF7EA" transform="rotate(20 200 26)" />
            <ellipse cx="230" cy="42" rx="3.5" ry="2" fill="#FFF7EA" transform="rotate(-25 230 42)" />
            <ellipse cx="150" cy="55" rx="3.5" ry="2" fill="#FFF7EA" transform="rotate(5 150 55)" />
            <ellipse cx="190" cy="50" rx="3.5" ry="2" fill="#FFF7EA" transform="rotate(-10 190 50)" />
            <defs>
              <linearGradient id="briocheGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CA7429" />
                <stop offset="50%" stopColor="#964710" />
                <stop offset="100%" stopColor="#753208" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Capa 2: Salsa Brasa */}
        <div
          className="absolute z-50 transition-transform duration-200 ease-out filter drop-shadow-[0_8px_16px_rgba(229,37,37,0.3)]"
          style={{ transform: `translateY(${distSauce}px)` }}
        >
          <svg width={burgerWidth * 0.9} height={45} viewBox="0 0 300 45">
            <path
              d="M10,15 Q50,5 90,18 Q140,5 190,16 Q240,6 290,15 Q260,35 220,38 Q180,42 140,36 Q90,40 50,34 Q20,32 10,15 Z"
              fill="#E52525"
            />
            <path
              d="M60,18 Q110,12 150,22 Q210,14 260,20"
              stroke="#FFA885"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Capa 3: Cebolla Crispy */}
        <div
          className="absolute z-40 transition-transform duration-200 ease-out filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.2)]"
          style={{ transform: `translateY(${distOnions}px)` }}
        >
          <svg width={burgerWidth * 0.88} height={40} viewBox="0 0 300 40">
            {/* Tiras de cebolla dorada frita */}
            <path d="M30,22 Q60,10 90,24 Q130,8 160,20 Q200,12 240,25 Q270,16 290,22" stroke="#D9822B" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M40,15 Q80,28 120,16 Q170,26 210,18 Q250,26 280,18" stroke="#87480C" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M55,26 Q95,14 135,26 Q185,16 225,24" stroke="#FBBF24" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Capa 4: Queso Cheddar Fundido */}
        <div
          className="absolute z-30 transition-transform duration-200 ease-out filter drop-shadow-[0_10px_20px_rgba(245,158,11,0.4)]"
          style={{ transform: `translateY(${distCheese}px)` }}
        >
          <svg width={burgerWidth * 0.94} height={50} viewBox="0 0 320 50">
            <path
              d="M15,10 L305,10 Q315,22 300,32 Q270,38 250,22 Q220,44 190,26 Q160,46 130,28 Q100,42 70,24 Q40,36 15,10 Z"
              fill="#F59E0B"
            />
            {/* Brillo del queso derretido */}
            <path
              d="M30,14 L290,14"
              stroke="#FEF3C7"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Capa 5: Smash Beef Patty */}
        <div
          className="absolute z-20 transition-transform duration-200 ease-out filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
          style={{ transform: `translateY(${distPatty}px)` }}
        >
          <svg width={burgerWidth * 0.98} height={60} viewBox="0 0 330 60">
            {/* Medallón con costra irregular crocante */}
            <path
              d="M10,25 Q5,15 25,12 Q80,6 165,6 Q250,6 305,12 Q325,15 320,25 Q325,42 305,48 Q240,54 165,54 Q90,54 25,48 Q5,42 10,25 Z"
              fill="#341A0B"
            />
            {/* Detalles de costra Maillard a la chapa */}
            <path d="M35,28 Q75,18 120,30 Q180,18 240,28 Q280,20 300,30" stroke="#1F0E05" strokeWidth="4" fill="none" />
            <path d="M45,36 Q95,44 150,34 Q210,44 275,34" stroke="#4A2610" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Capa 6: Pan Brioche Base (Heel) */}
        <div
          className="absolute z-10 transition-transform duration-200 ease-out filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.25)]"
          style={{ transform: `translateY(${distBunBottom}px)` }}
        >
          <svg width={burgerWidth * 0.92} height={70} viewBox="0 0 310 70">
            {/* Base de pan brioche tostado */}
            <path
              d="M15,10 C15,8 295,8 295,10 C295,35 255,60 155,60 C55,60 15,35 15,10 Z"
              fill="#9A4E15"
            />
            {/* Borde tostado a la plancha */}
            <path
              d="M18,12 L292,12"
              stroke="#602E0A"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

      </div>
    </div>
  );
};

// =========================================================================
// COMPONENTE 3D THREE.JS ORIGINAL (Protegido con try/catch ante WebGL inactivo)
// =========================================================================
const Burger3DCanvasThree: React.FC<Burger3DCanvasProps> = ({
  scrollProgress,
  onLayerPositionsUpdate,
  isMobile = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const layersGroupRef = useRef<THREE.Group | null>(null);

  // References to the individual layers
  const topBunRef = useRef<THREE.Group | null>(null);
  const sauceRef = useRef<THREE.Group | null>(null);
  const onionsRef = useRef<THREE.Group | null>(null);
  const cheeseRef = useRef<THREE.Group | null>(null);
  const pattyRef = useRef<THREE.Group | null>(null);
  const bottomBunRef = useRef<THREE.Group | null>(null);

  const targetProgressRef = useRef(scrollProgress);
  targetProgressRef.current = scrollProgress;
  const currentProgressRef = useRef(scrollProgress);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    try {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // 1. Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // 2. Camera
      const fov = isMobile ? 42 : 36;
      const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
      camera.position.set(0, 0.4, isMobile ? 12 : 9.5);
      cameraRef.current = camera;

      // 3. Renderer protegido
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // 4. Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.85);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffeedd, 2.8);
      keyLight.position.set(5, 7, 6);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.bias = -0.001;
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xe54522, 2.2);
      rimLight.position.set(-6, 3, -4);
      scene.add(rimLight);

      const underLight = new THREE.DirectionalLight(0xffaa22, 1.4);
      underLight.position.set(0, -5, 3);
      scene.add(underLight);

      const shadowGeo = new THREE.PlaneGeometry(12, 12);
      const shadowMat = new THREE.ShadowMaterial({ opacity: 0.45 });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.y = -3.2;
      shadowMesh.receiveShadow = true;
      scene.add(shadowMesh);

      // Procedural textures
      const briocheTexture = createBriocheCrownTexture();
      const briocheBump = createBriocheBumpMap();
      const crumbTexture = createToastedCrumbTexture();
      const smashBeefTexture = createSmashBeefTexture();
      const smashBeefBump = createSmashBeefBumpMap();
      const cheddarTexture = createCheddarTexture();
      const sauceTexture = createSauceTexture();
      const onionTexture = createCrispyOnionTexture();

      // Materials
      const briocheMat = new THREE.MeshStandardMaterial({
        map: briocheTexture,
        bumpMap: briocheBump,
        bumpScale: 0.05,
        roughness: 0.35,
        metalness: 0.05,
      });

      const briocheCrumbMat = new THREE.MeshStandardMaterial({
        map: crumbTexture,
        roughness: 0.85,
        metalness: 0.0,
      });

      const sauceMat = new THREE.MeshStandardMaterial({
        map: sauceTexture,
        roughness: 0.15,
        metalness: 0.1,
        transparent: true,
        opacity: 0.95,
      });

      const onionMat = new THREE.MeshStandardMaterial({
        map: onionTexture,
        roughness: 0.45,
        metalness: 0.15,
      });

      const cheddarMat = new THREE.MeshStandardMaterial({
        map: cheddarTexture,
        roughness: 0.3,
        metalness: 0.08,
      });

      const smashPattyMat = new THREE.MeshStandardMaterial({
        map: smashBeefTexture,
        bumpMap: smashBeefBump,
        bumpScale: 0.14,
        roughness: 0.72,
        metalness: 0.12,
      });

      const sesameMat = new THREE.MeshStandardMaterial({
        color: 0xf5ebd7,
        roughness: 0.4,
        metalness: 0.05,
      });

      const layersGroup = new THREE.Group();
      layersGroupRef.current = layersGroup;
      scene.add(layersGroup);

      // --- LAYER 1: TOP BRIOCHE CROWN BUN ---
      const topBunGroup = new THREE.Group();
      topBunRef.current = topBunGroup;
      const topBunGeo = new THREE.CylinderGeometry(2.35, 2.5, 1.1, 48);
      const topBunMesh = new THREE.Mesh(topBunGeo, [briocheMat, briocheCrumbMat, briocheMat]);
      topBunMesh.castShadow = true;
      topBunMesh.receiveShadow = true;
      topBunGroup.add(topBunMesh);

      // Sesame seeds on crown
      const sesameGeo = new THREE.SphereGeometry(0.045, 8, 8);
      sesameGeo.scale(1, 0.4, 1.8);
      for (let i = 0; i < 48; i++) {
        const seed = new THREE.Mesh(sesameGeo, sesameMat);
        const r = Math.sqrt(Math.random()) * 1.95;
        const theta = Math.random() * Math.PI * 2;
        seed.position.set(r * Math.cos(theta), 0.58, r * Math.sin(theta));
        seed.rotation.set(0, Math.random() * Math.PI, Math.random() * 0.2);
        topBunGroup.add(seed);
      }
      layersGroup.add(topBunGroup);

      // --- LAYER 2: SALSA BRASA ---
      const sauceGroup = new THREE.Group();
      sauceRef.current = sauceGroup;
      const sauceGeo = new THREE.CylinderGeometry(2.3, 2.45, 0.15, 36);
      const sauceMesh = new THREE.Mesh(sauceGeo, sauceMat);
      sauceMesh.castShadow = true;
      sauceGroup.add(sauceMesh);
      layersGroup.add(sauceGroup);

      // --- LAYER 3: CEBOLLA CRISPY ---
      const onionsGroup = new THREE.Group();
      onionsRef.current = onionsGroup;
      const ringGeo = new THREE.TorusGeometry(0.55, 0.065, 8, 20);
      for (let i = 0; i < 9; i++) {
        const ring = new THREE.Mesh(ringGeo, onionMat);
        const r = 0.5 + Math.random() * 1.35;
        const theta = (i / 9) * Math.PI * 2 + Math.random() * 0.4;
        ring.position.set(r * Math.cos(theta), (Math.random() - 0.5) * 0.08, r * Math.sin(theta));
        ring.rotation.set(Math.random() * 0.8, Math.random() * Math.PI, Math.random() * 0.8);
        ring.castShadow = true;
        onionsGroup.add(ring);
      }
      layersGroup.add(onionsGroup);

      // --- LAYER 4: MELTED CHEDDAR CHEESE ---
      const cheeseGroup = new THREE.Group();
      cheeseRef.current = cheeseGroup;
      const cheeseGeo = new THREE.BoxGeometry(3.6, 0.12, 3.6);
      const cheeseMesh = new THREE.Mesh(cheeseGeo, cheddarMat);
      cheeseMesh.rotation.y = Math.PI / 4;
      cheeseMesh.castShadow = true;
      cheeseMesh.receiveShadow = true;
      cheeseGroup.add(cheeseMesh);
      layersGroup.add(cheeseGroup);

      // --- LAYER 5: SMASH BEEF PATTY ---
      const pattyGroup = new THREE.Group();
      pattyRef.current = pattyGroup;
      const pattyGeo = new THREE.CylinderGeometry(2.6, 2.65, 0.55, 48);
      const pattyMesh = new THREE.Mesh(pattyGeo, smashPattyMat);
      pattyMesh.castShadow = true;
      pattyMesh.receiveShadow = true;
      pattyGroup.add(pattyMesh);
      layersGroup.add(pattyGroup);

      // --- LAYER 6: BOTTOM BRIOCHE HEEL ---
      const bottomBunGroup = new THREE.Group();
      bottomBunRef.current = bottomBunGroup;
      const bottomBunGeo = new THREE.CylinderGeometry(2.45, 2.3, 0.7, 48);
      const bottomBunMesh = new THREE.Mesh(bottomBunGeo, [briocheMat, briocheCrumbMat, briocheMat]);
      bottomBunMesh.castShadow = true;
      bottomBunMesh.receiveShadow = true;
      bottomBunGroup.add(bottomBunMesh);
      layersGroup.add(bottomBunGroup);

      // Animación de rotación y explosión
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.08;
        const p = currentProgressRef.current;

        let explosionFactor = 0;
        if (p < 0.2) {
          explosionFactor = 0;
        } else if (p < 0.45) {
          explosionFactor = (p - 0.2) / 0.25;
        } else if (p < 0.75) {
          explosionFactor = 1.0;
        } else if (p < 0.9) {
          explosionFactor = 1.0 - (p - 0.75) / 0.15;
        } else {
          explosionFactor = 0;
        }

        const maxSep = isMobile ? 1.6 : 2.2;

        if (topBunRef.current) topBunRef.current.position.y = 1.1 + maxSep * 1.8 * explosionFactor;
        if (sauceRef.current) sauceRef.current.position.y = 0.55 + maxSep * 1.05 * explosionFactor;
        if (onionsRef.current) onionsRef.current.position.y = 0.35 + maxSep * 0.45 * explosionFactor;
        if (cheeseRef.current) cheeseRef.current.position.y = 0.05 - maxSep * 0.25 * explosionFactor;
        if (pattyRef.current) pattyRef.current.position.y = -0.35 - maxSep * 0.95 * explosionFactor;
        if (bottomBunRef.current) bottomBunRef.current.position.y = -1.05 - maxSep * 1.75 * explosionFactor;

        if (layersGroupRef.current) {
          layersGroupRef.current.rotation.y = 0.2 + p * Math.PI * 1.6;
          layersGroupRef.current.rotation.x = 0.12 - p * 0.15;
        }

        renderer.render(scene, camera);

        if (onLayerPositionsUpdate && cameraRef.current) {
          const w = container.clientWidth;
          const h = container.clientHeight;

          const layers = [
            { id: 'top-bun', ref: topBunRef.current },
            { id: 'sauce', ref: sauceRef.current },
            { id: 'onions', ref: onionsRef.current },
            { id: 'cheese', ref: cheeseRef.current },
            { id: 'patty', ref: pattyRef.current },
            { id: 'bottom-bun', ref: bottomBunRef.current },
          ];

          const positions = layers.map((layer) => {
            if (!layer.ref) return { id: layer.id, x: 0, y: 0, visible: false };

            const worldPos = new THREE.Vector3();
            layer.ref.getWorldPosition(worldPos);

            const screenPos = worldPos.clone().project(camera);
            const x = (screenPos.x * 0.5 + 0.5) * w;
            const y = (-(screenPos.y * 0.5) + 0.5) * h;

            return {
              id: layer.id,
              x,
              y,
              visible: explosionFactor > 0.35 && explosionFactor < 0.95,
            };
          });

          onLayerPositionsUpdate(positions);
        }
      };

      animate();

      const handleResize = () => {
        if (!container || !rendererRef.current || !cameraRef.current) return;
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        cameraRef.current.aspect = newW / newH;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newW, newH);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);

        briocheTexture.dispose();
        briocheBump.dispose();
        crumbTexture.dispose();
        smashBeefTexture.dispose();
        smashBeefBump.dispose();
        cheddarTexture.dispose();
        sauceTexture.dispose();
        onionTexture.dispose();

        briocheMat.dispose();
        briocheCrumbMat.dispose();
        sauceMat.dispose();
        onionMat.dispose();
        cheddarMat.dispose();
        smashPattyMat.dispose();
        sesameMat.dispose();

        if (rendererRef.current && rendererRef.current.domElement) {
          container.removeChild(rendererRef.current.domElement);
          rendererRef.current.dispose();
        }
      };
    } catch (err) {
      console.warn('WebGL context could not be created, using 2D fallback:', err);
      setHasError(true);
    }
  }, [isMobile, onLayerPositionsUpdate]);

  if (hasError) {
    return (
      <BurgerFallbackExplodedView
        scrollProgress={scrollProgress}
        onLayerPositionsUpdate={onLayerPositionsUpdate}
        isMobile={isMobile}
      />
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full absolute inset-0 pointer-events-none touch-none"
      style={{ overflow: 'hidden' }}
    />
  );
};

// =========================================================================
// ERROR BOUNDARY & EXPORT PRINCIPAL
// =========================================================================
interface ErrorBoundaryState {
  hasError: boolean;
}

class Burger3DErrorBoundary extends Component<Burger3DCanvasProps, ErrorBoundaryState> {
  constructor(props: Burger3DCanvasProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Burger3DCanvas caught error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError || !isWebGLAvailable()) {
      return (
        <BurgerFallbackExplodedView
          scrollProgress={this.props.scrollProgress}
          onLayerPositionsUpdate={this.props.onLayerPositionsUpdate}
          isMobile={this.props.isMobile}
        />
      );
    }

    return <Burger3DCanvasThree {...this.props} />;
  }
}

export const Burger3DCanvas: React.FC<Burger3DCanvasProps> = (props) => {
  return <Burger3DErrorBoundary {...props} />;
};
