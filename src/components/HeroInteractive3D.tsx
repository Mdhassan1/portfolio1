import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Layers, RotateCcw } from 'lucide-react';
import type { PortfolioTheme } from './Navbar';

export type SectorNodeId = 'core' | 'web' | 'mobile' | 'database' | 'design';

interface SectorNodeMeta {
  id: SectorNodeId;
  label: string;
  role: string;
  stack: string;
}

const SECTOR_NODES: Record<SectorNodeId, SectorNodeMeta> = {
  core: {
    id: 'core',
    label: 'AR Core',
    role: 'Abdul Rahim S · Digital Builder',
    stack: 'Full-Stack Architecture & Product Execution',
  },
  web: {
    id: 'web',
    label: 'Web',
    role: 'Web Application Layer',
    stack: 'React.js · Responsive Interfaces · Event Platforms',
  },
  mobile: {
    id: 'mobile',
    label: 'Mobile',
    role: 'Mobile Engineering Layer',
    stack: 'React Native · FlutterFlow · Cross-Platform Apps',
  },
  database: {
    id: 'database',
    label: 'Data',
    role: 'Database & Backend Layer',
    stack: 'Supabase · Structured Data & Business Ledgers',
  },
  design: {
    id: 'design',
    label: 'Design',
    role: 'UI/UX & Visual Systems',
    stack: 'Figma · Stitch',
  },
};

const NODE_KEYS: SectorNodeId[] = ['core', 'web', 'mobile', 'database', 'design'];

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function createMonogramTexture(isDark: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = isDark ? '#121614' : '#ECEEE9';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = isDark ? 'rgba(244,246,245,0.08)' : 'rgba(9,11,10,0.08)';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 512; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }

    ctx.strokeStyle = '#C5FF4A';
    ctx.lineWidth = 8;
    ctx.strokeRect(32, 32, 448, 448);

    ctx.fillStyle = isDark ? '#F4F6F5' : '#090B0A';
    ctx.font = '800 184px Archivo, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AR', 256, 236);

    ctx.fillStyle = isDark ? '#C5FF4A' : '#345600';
    ctx.font = '600 26px "JetBrains Mono", monospace';
    ctx.fillText('DEV / BUILDER', 256, 368);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createUiScreenTexture(variant: 'web' | 'mobile', isDark: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = variant === 'mobile' ? 384 : 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = isDark ? '#0E1210' : '#FFFFFF';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#C5FF4A';
    ctx.fillRect(18, 22, w - 36, 14);

    ctx.fillStyle = isDark ? 'rgba(244,246,245,0.14)' : 'rgba(9,11,10,0.12)';
    ctx.fillRect(18, 54, w - 36, 56);
    ctx.fillRect(18, 124, (w - 48) / 2, 64);
    ctx.fillRect(18 + (w - 48) / 2 + 12, 124, (w - 48) / 2, 64);

    if (variant === 'mobile') {
      ctx.fillStyle = isDark ? 'rgba(197,255,74,0.28)' : 'rgba(197,255,74,0.65)';
      ctx.fillRect(18, 206, w - 36, 72);
      ctx.fillStyle = isDark ? 'rgba(244,246,245,0.12)' : 'rgba(9,11,10,0.1)';
      ctx.fillRect(18, 294, w - 36, 48);
    } else {
      ctx.fillStyle = isDark ? 'rgba(197,255,74,0.28)' : 'rgba(197,255,74,0.65)';
      ctx.fillRect(18, 202, w - 36, 32);
    }

    ctx.strokeStyle = isDark ? 'rgba(244,246,245,0.25)' : 'rgba(9,11,10,0.28)';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, w - 4, h - 4);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.14)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  return new THREE.CanvasTexture(canvas);
}

interface HeroInteractive3DProps {
  theme: PortfolioTheme;
}

export default function HeroInteractive3D({ theme }: HeroInteractive3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<SectorNodeId>('core');
  const [exploded, setExploded] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  const selectedNodeRef = useRef<SectorNodeId>('core');
  const explodedRef = useRef(false);
  const themeRef = useRef<PortfolioTheme>(theme);
  const resetCameraFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    selectedNodeRef.current = selectedNode;
  }, [selectedNode]);

  useEffect(() => {
    explodedRef.current = exploded;
  }, [exploded]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const mount = containerRef.current;
    if (!mount) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = mount.clientWidth || 620;
    const height = mount.clientHeight || 560;

    // Transparent scene so the 3D assembly sits directly on the hero plane
    const scene = new THREE.Scene();
    const initialDark = themeRef.current === 'dark';

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.1, 2.45, 5.15);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setContextLost(true);
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.touchAction = 'pan-y';

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmrem.dispose();

    // 3-Point Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xdce7ff, 0x1e2420, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e0, 2.15);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc5ff4a, 1.4);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = Math.PI * 0.22;
    controls.maxPolarAngle = Math.PI * 0.62;
    controls.target.set(0, 0.05, 0);

    let userInteracting = false;
    controls.addEventListener('start', () => {
      userInteracting = true;
    });
    controls.addEventListener('end', () => {
      userInteracting = false;
    });

    resetCameraFnRef.current = () => {
      camera.position.set(4.1, 2.45, 5.15);
      controls.target.set(0, 0.05, 0);
      controls.update();
    };

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    const darkMonogramTex = createMonogramTexture(true);
    darkMonogramTex.anisotropy = maxAnisotropy;
    const lightMonogramTex = createMonogramTexture(false);
    lightMonogramTex.anisotropy = maxAnisotropy;

    const darkWebTex = createUiScreenTexture('web', true);
    darkWebTex.anisotropy = maxAnisotropy;
    const lightWebTex = createUiScreenTexture('web', false);
    lightWebTex.anisotropy = maxAnisotropy;

    const darkMobileTex = createUiScreenTexture('mobile', true);
    darkMobileTex.anisotropy = maxAnisotropy;
    const lightMobileTex = createUiScreenTexture('mobile', false);
    lightMobileTex.anisotropy = maxAnisotropy;

    const shadowTex = createContactShadowTexture();
    textures.push(
      darkMonogramTex,
      lightMonogramTex,
      darkWebTex,
      lightWebTex,
      darkMobileTex,
      lightMobileTex,
      shadowTex,
      envTarget.texture
    );

    const chassisMat = new THREE.MeshStandardMaterial({
      color: initialDark ? 0x1a1f1c : 0x262b28,
      metalness: 0.78,
      roughness: 0.28,
    });
    const trimMat = new THREE.MeshStandardMaterial({
      color: initialDark ? 0x353d39 : 0x5c645f,
      metalness: 0.88,
      roughness: 0.18,
    });
    const limeMat = new THREE.MeshStandardMaterial({
      color: 0xc5ff4a,
      emissive: 0xc5ff4a,
      emissiveIntensity: initialDark ? 0.42 : 0.15,
      metalness: 0.2,
      roughness: 0.25,
    });
    const conduitMat = new THREE.MeshStandardMaterial({
      color: initialDark ? 0x5f7a24 : 0x4b6812,
      emissive: 0xc5ff4a,
      emissiveIntensity: initialDark ? 0.3 : 0.08,
      metalness: 0.5,
      roughness: 0.35,
    });
    const coreFaceMat = new THREE.MeshStandardMaterial({
      map: initialDark ? darkMonogramTex : lightMonogramTex,
      roughness: 0.35,
      metalness: 0.15,
    });
    const webScreenMat = new THREE.MeshStandardMaterial({
      map: initialDark ? darkWebTex : lightWebTex,
      roughness: 0.3,
      metalness: 0.1,
    });
    const mobileScreenMat = new THREE.MeshStandardMaterial({
      map: initialDark ? darkMobileTex : lightMobileTex,
      roughness: 0.25,
      metalness: 0.1,
    });
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: initialDark ? 0.5 : 0.22,
    });

    materials.push(
      chassisMat,
      trimMat,
      limeMat,
      conduitMat,
      coreFaceMat,
      webScreenMat,
      mobileScreenMat,
      shadowMat
    );

    // Subtle grounded contact shadow directly on the hero plane
    const shadowGeo = new THREE.PlaneGeometry(5.6, 5.6);
    geometries.push(shadowGeo);
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.72;
    scene.add(shadowPlane);

    const rootGroup = new THREE.Group();
    rootGroup.position.y = 0.14;
    rootGroup.scale.setScalar(0.84);
    scene.add(rootGroup);

    const clickableTargets: THREE.Object3D[] = [];
    const registerModuleHitbox = (group: THREE.Group, id: SectorNodeId, size: [number, number, number]) => {
      const hitGeo = new THREE.BoxGeometry(size[0], size[1], size[2]);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      geometries.push(hitGeo);
      materials.push(hitMat);
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData.sectorId = id;
      hitMesh.layers.set(1);
      group.add(hitMesh);
      clickableTargets.push(hitMesh);
    };

    // 1. CENTRAL AR ENGINEERING CORE
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);

    const coreShape = new THREE.Shape();
    coreShape.moveTo(-0.52, -0.52);
    coreShape.lineTo(0.52, -0.52);
    coreShape.lineTo(0.52, 0.52);
    coreShape.lineTo(-0.52, 0.52);
    coreShape.closePath();

    const coreBodyGeo = new THREE.ExtrudeGeometry(coreShape, {
      depth: 0.88,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 2,
    });
    coreBodyGeo.center();
    geometries.push(coreBodyGeo);
    const coreBody = new THREE.Mesh(coreBodyGeo, chassisMat);
    coreBody.castShadow = !isSoftwareGl;
    coreBody.receiveShadow = !isSoftwareGl;
    coreGroup.add(coreBody);

    const badgeGeo = new THREE.PlaneGeometry(0.86, 0.86);
    geometries.push(badgeGeo);
    const frontBadge = new THREE.Mesh(badgeGeo, coreFaceMat);
    frontBadge.position.z = 0.53;
    coreGroup.add(frontBadge);

    const backBadge = new THREE.Mesh(badgeGeo, coreFaceMat);
    backBadge.rotation.y = Math.PI;
    backBadge.position.z = -0.53;
    coreGroup.add(backBadge);

    const coreRingGeo = new THREE.TorusGeometry(0.94, 0.024, 12, 48);
    geometries.push(coreRingGeo);
    const coreRing = new THREE.Mesh(coreRingGeo, limeMat);
    coreRing.rotation.x = Math.PI / 2.4;
    coreGroup.add(coreRing);

    registerModuleHitbox(coreGroup, 'core', [1.25, 1.25, 1.25]);

    // 2. MODULE 01: WEB ARCHITECTURE
    const webGroup = new THREE.Group();
    const webBasePos = new THREE.Vector3(-1.38, 0.72, 0.38);
    const webExplodeOffset = new THREE.Vector3(-0.62, 0.36, 0.22);
    webGroup.position.copy(webBasePos);
    rootGroup.add(webGroup);

    const webFrameGeo = new THREE.BoxGeometry(1.12, 0.82, 0.08);
    const webScreenGeo = new THREE.PlaneGeometry(1.0, 0.7);
    const webAccentGeo = new THREE.BoxGeometry(0.28, 0.06, 0.11);
    geometries.push(webFrameGeo, webScreenGeo, webAccentGeo);

    const webFrame = new THREE.Mesh(webFrameGeo, chassisMat);
    webFrame.castShadow = !isSoftwareGl;
    webGroup.add(webFrame);

    const webScreen = new THREE.Mesh(webScreenGeo, webScreenMat);
    webScreen.position.z = 0.045;
    webGroup.add(webScreen);

    const webAccent = new THREE.Mesh(webAccentGeo, limeMat);
    webAccent.position.set(-0.34, 0.43, 0);
    webGroup.add(webAccent);
    webGroup.rotation.set(-0.15, 0.35, 0.04);
    registerModuleHitbox(webGroup, 'web', [1.25, 0.95, 0.3]);

    // 3. MODULE 02: MOBILE ENGINEERING
    const mobileGroup = new THREE.Group();
    const mobileBasePos = new THREE.Vector3(1.42, 0.36, 0.42);
    const mobileExplodeOffset = new THREE.Vector3(0.64, 0.2, 0.22);
    mobileGroup.position.copy(mobileBasePos);
    rootGroup.add(mobileGroup);

    const phoneShape = new THREE.Shape();
    const pw = 0.32;
    const ph = 0.56;
    const pr = 0.06;
    phoneShape.moveTo(-pw + pr, -ph);
    phoneShape.lineTo(pw - pr, -ph);
    phoneShape.quadraticCurveTo(pw, -ph, pw, -ph + pr);
    phoneShape.lineTo(pw, ph - pr);
    phoneShape.quadraticCurveTo(pw, ph, pw - pr, ph);
    phoneShape.lineTo(-pw + pr, ph);
    phoneShape.quadraticCurveTo(-pw, ph, -pw, ph - pr);
    phoneShape.lineTo(-pw, -ph + pr);
    phoneShape.quadraticCurveTo(-pw, -ph, -pw + pr, -ph);

    const phoneGeo = new THREE.ExtrudeGeometry(phoneShape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    });
    phoneGeo.center();
    const phoneScreenGeo = new THREE.PlaneGeometry(0.54, 0.96);
    const phoneBarGeo = new THREE.BoxGeometry(0.18, 0.025, 0.09);
    geometries.push(phoneGeo, phoneScreenGeo, phoneBarGeo);

    const phoneBody = new THREE.Mesh(phoneGeo, trimMat);
    phoneBody.castShadow = !isSoftwareGl;
    mobileGroup.add(phoneBody);

    const phoneScreen = new THREE.Mesh(phoneScreenGeo, mobileScreenMat);
    phoneScreen.position.z = 0.055;
    mobileGroup.add(phoneScreen);

    const phoneIndicator = new THREE.Mesh(phoneBarGeo, limeMat);
    phoneIndicator.position.set(0, -0.5, 0.02);
    mobileGroup.add(phoneIndicator);
    mobileGroup.rotation.set(0.12, -0.4, -0.08);
    registerModuleHitbox(mobileGroup, 'mobile', [0.85, 1.25, 0.3]);

    // 4. MODULE 03: SUPABASE DATA CORE
    const dbGroup = new THREE.Group();
    const dbBasePos = new THREE.Vector3(-1.18, -0.82, -0.42);
    const dbExplodeOffset = new THREE.Vector3(-0.55, -0.38, -0.22);
    dbGroup.position.copy(dbBasePos);
    rootGroup.add(dbGroup);

    const discGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.14, 32);
    const discRingGeo = new THREE.TorusGeometry(0.47, 0.018, 10, 36);
    geometries.push(discGeo, discRingGeo);

    [-0.24, 0, 0.24].forEach((yOffset, i) => {
      const disc = new THREE.Mesh(discGeo, i === 1 ? trimMat : chassisMat);
      disc.position.y = yOffset;
      disc.castShadow = !isSoftwareGl;
      dbGroup.add(disc);

      if (i === 2) {
        const accentRing = new THREE.Mesh(discRingGeo, limeMat);
        accentRing.rotation.x = Math.PI / 2;
        accentRing.position.y = yOffset + 0.07;
        dbGroup.add(accentRing);
      }
    });
    registerModuleHitbox(dbGroup, 'database', [1.1, 0.85, 1.1]);

    // 5. MODULE 04: DESIGN / UI-UX FRAME
    const designGroup = new THREE.Group();
    const designBasePos = new THREE.Vector3(1.15, -0.78, -0.48);
    const designExplodeOffset = new THREE.Vector3(0.55, -0.36, -0.25);
    designGroup.position.copy(designBasePos);
    rootGroup.add(designGroup);

    const artboardGeo = new THREE.BoxGeometry(0.86, 0.68, 0.06);
    const caliperGeo = new THREE.TorusGeometry(0.28, 0.032, 12, 32);
    const nodeBoxGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    geometries.push(artboardGeo, caliperGeo, nodeBoxGeo);

    const artboard = new THREE.Mesh(artboardGeo, chassisMat);
    artboard.castShadow = !isSoftwareGl;
    designGroup.add(artboard);

    const caliper = new THREE.Mesh(caliperGeo, limeMat);
    caliper.position.set(0.14, 0.06, 0.08);
    designGroup.add(caliper);

    const nodeCube = new THREE.Mesh(nodeBoxGeo, trimMat);
    nodeCube.position.set(-0.24, -0.1, 0.12);
    nodeCube.rotation.set(0.4, 0.6, 0);
    designGroup.add(nodeCube);
    designGroup.rotation.set(-0.25, -0.35, 0.12);
    registerModuleHitbox(designGroup, 'design', [1.05, 0.9, 0.4]);

    // Bus Conduits
    const conduitTargets = [webBasePos, mobileBasePos, dbBasePos, designBasePos];
    conduitTargets.forEach((targetVec) => {
      const mid = targetVec.clone().multiplyScalar(0.5);
      mid.y += 0.18;
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        mid,
        targetVec
      );
      const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.015, 8, false);
      geometries.push(tubeGeo);
      const tube = new THREE.Mesh(tubeGeo, conduitMat);
      rootGroup.add(tube);
    });

    // Orbital Ring + Instanced Data Nodes
    const orbitRingGeo = new THREE.TorusGeometry(2.12, 0.012, 8, 84);
    geometries.push(orbitRingGeo);
    const orbitRing = new THREE.Mesh(orbitRingGeo, trimMat);
    orbitRing.rotation.set(Math.PI / 2.25, 0.2, 0);
    rootGroup.add(orbitRing);

    const microNodeGeo = new THREE.BoxGeometry(0.055, 0.055, 0.055);
    geometries.push(microNodeGeo);
    const nodeCount = 24;
    const instancedNodes = new THREE.InstancedMesh(microNodeGeo, limeMat, nodeCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      dummy.position.set(Math.cos(angle) * 2.12, Math.sin(angle) * 2.12, 0);
      dummy.rotation.set(angle, angle * 0.5, 0);
      dummy.updateMatrix();
      instancedNodes.setMatrixAt(i, dummy.matrix);
    }
    instancedNodes.instanceMatrix.needsUpdate = true;
    instancedNodes.computeBoundingSphere();
    orbitRing.add(instancedNodes);

    // Raycaster & Pointer Interaction
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const pointerNdc = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };
    let lastHoverCheck = 0;

    const updateNdc = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      const dx = e.clientX - pointerDownPos.x;
      const dy = e.clientY - pointerDownPos.y;
      if (Math.hypot(dx, dy) > 8) return;

      updateNdc(e.clientX, e.clientY);
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(clickableTargets, false);
      if (hits.length > 0) {
        const sectorId = hits[0].object.userData.sectorId as SectorNodeId | undefined;
        if (sectorId) {
          setSelectedNode(sectorId);
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastHoverCheck < 48) return;
      lastHoverCheck = now;

      updateNdc(e.clientX, e.clientY);
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(clickableTargets, false);
      renderer.domElement.style.cursor = hits.length > 0 ? 'pointer' : 'grab';
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);
    renderer.domElement.addEventListener('pointermove', handlePointerMove);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(240, Math.floor(entry.contentRect.width));
        const h = Math.max(240, Math.floor(entry.contentRect.height));
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(mount);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let frameId = 0;
    let disposed = false;
    let lastTime = performance.now();
    let elapsed = 0;
    let lastAppliedTheme: PortfolioTheme = themeRef.current;

    const moduleConfigs: {
      id: SectorNodeId;
      group: THREE.Group;
      base: THREE.Vector3;
      explode: THREE.Vector3;
    }[] = [
      { id: 'core', group: coreGroup, base: new THREE.Vector3(0, 0, 0), explode: new THREE.Vector3(0, 0, 0) },
      { id: 'web', group: webGroup, base: webBasePos, explode: webExplodeOffset },
      { id: 'mobile', group: mobileGroup, base: mobileBasePos, explode: mobileExplodeOffset },
      { id: 'database', group: dbGroup, base: dbBasePos, explode: dbExplodeOffset },
      { id: 'design', group: designGroup, base: designBasePos, explode: designExplodeOffset },
    ];

    const syncThemeMaterials = (nextTheme: PortfolioTheme) => {
      const dark = nextTheme === 'dark';
      chassisMat.color.setHex(dark ? 0x1a1f1c : 0x262b28);
      trimMat.color.setHex(dark ? 0x353d39 : 0x5c645f);
      limeMat.emissiveIntensity = dark ? 0.42 : 0.15;
      conduitMat.color.setHex(dark ? 0x5f7a24 : 0x4b6812);
      conduitMat.emissiveIntensity = dark ? 0.3 : 0.08;
      coreFaceMat.map = dark ? darkMonogramTex : lightMonogramTex;
      coreFaceMat.needsUpdate = true;
      webScreenMat.map = dark ? darkWebTex : lightWebTex;
      webScreenMat.needsUpdate = true;
      mobileScreenMat.map = dark ? darkMobileTex : lightMobileTex;
      mobileScreenMat.needsUpdate = true;
      shadowMat.opacity = dark ? 0.5 : 0.22;
    };

    const afterDraw = (cb: () => void) => {
      if (disposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      if (disposed) return;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      elapsed += dt;

      if (themeRef.current !== lastAppliedTheme) {
        lastAppliedTheme = themeRef.current;
        syncThemeMaterials(lastAppliedTheme);
      }

      if (!reducedMotion && !userInteracting) {
        rootGroup.rotation.y += dt * 0.22;
        orbitRing.rotation.z += dt * 0.18;
      }

      const isExploded = explodedRef.current;
      const activeId = selectedNodeRef.current;

      for (const mod of moduleConfigs) {
        const targetScale = mod.id === activeId ? 1.12 : 1.0;
        const s = THREE.MathUtils.damp(mod.group.scale.x, targetScale, 7, dt);
        mod.group.scale.setScalar(s);

        const floatY = reducedMotion ? 0 : Math.sin(elapsed * 1.4 + mod.base.x) * 0.05;
        const tx = mod.base.x + (isExploded ? mod.explode.x : 0);
        const ty = mod.base.y + (isExploded ? mod.explode.y : 0) + floatY;
        const tz = mod.base.z + (isExploded ? mod.explode.z : 0);

        mod.group.position.x = THREE.MathUtils.damp(mod.group.position.x, tx, 6, dt);
        mod.group.position.y = THREE.MathUtils.damp(mod.group.position.y, ty, 6, dt);
        mod.group.position.z = THREE.MathUtils.damp(mod.group.position.z, tz, 6, dt);
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      controls.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, []);

  const activeInfo = SECTOR_NODES[selectedNode];

  return (
    <div className="relative flex w-full flex-col items-center">
      {/* Unboxed Open-Plane 3D Stage */}
      <div className="relative h-[340px] sm:h-[410px] lg:h-[450px] w-full">
        {contextLost ? (
          <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
            <p className="font-display text-lg font-bold text-[var(--text-primary)]">
              AR Full-Stack Architecture
            </p>
            <p className="mt-2 font-mono text-xs text-[var(--text-muted)]">
              Web · Mobile · Supabase · UI/UX Design
            </p>
          </div>
        ) : (
          <div
            ref={containerRef}
            aria-label="Interactive 3D representation of Abdul Rahim S's software engineering and design stack. Drag to rotate or select any module below."
            className="h-full w-full"
          />
        )}
      </div>

      {/* Minimal Floating Control Dock Below Model (Unobstructed 3D Center) */}
      <div className="w-full max-w-md border border-[var(--border-hairline)] bg-[var(--bg-surface)]/95 p-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold text-[var(--text-primary)]">
              {activeInfo.role}
            </p>
            <p className="mt-0.5 truncate font-mono text-[11px] text-[var(--text-muted)]">
              {activeInfo.stack}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setExploded((prev) => !prev)}
              aria-pressed={exploded}
              title={exploded ? 'Assemble 3D layers' : 'Explode 3D layers'}
              className={`inline-flex h-8 items-center gap-1.5 border px-2.5 font-mono text-[10px] font-semibold uppercase transition-colors cursor-pointer ${
                exploded
                  ? 'border-[#090B0A] dark:border-[#C5FF4A] bg-[#C5FF4A] text-[#090B0A]'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
              }`}
            >
              <Layers className="h-3 w-3" aria-hidden="true" />
              <span>{exploded ? 'Assemble' : 'Explode'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedNode('core');
                setExploded(false);
                resetCameraFnRef.current?.();
              }}
              aria-label="Reset 3D view"
              title="Reset 3D view"
              className="inline-flex h-8 w-8 items-center justify-center border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Sector Layer Quick-Select Row */}
        <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-[var(--border-hairline)] pt-2.5">
          {NODE_KEYS.map((key) => {
            const active = selectedNode === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedNode(key)}
                className={`min-h-[28px] border px-2.5 py-1 font-mono text-[10px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'border-[#090B0A] dark:border-[#C5FF4A] bg-[#C5FF4A] text-[#090B0A] font-semibold'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                }`}
              >
                {SECTOR_NODES[key].label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
