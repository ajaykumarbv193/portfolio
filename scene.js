import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('#scene');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
} catch (error) {
  canvas.style.display = 'none';
}

if (renderer) {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.25 : 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 8;

  const group = new THREE.Group();
  scene.add(group);
  const core = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.08, 0.31, 220, 20, 2, 3),
    new THREE.MeshStandardMaterial({ color: 0xa9c8e8, metalness: 0.72, roughness: 0.32, wireframe: true, transparent: true, opacity: 0.78 })
  );
  group.add(core);
  const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xa9c8e8, metalness: 0.55, roughness: 0.35, wireframe: true, transparent: true, opacity: 0.34 });
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.82 + i * 0.2, 0.009, 6, 150), ringMaterial);
    ring.rotation.set(i * 0.7, i * 0.5, i * 0.4);
    group.add(ring);
  }

  // A denser field of small, visible blue-white particles across the whole page.
  const particleCount = window.innerWidth < 700 ? 2400 : 4200;
  const positions = new Float32Array(particleCount * 3);
  const drift = new Float32Array(particleCount);
  const twinkle = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    drift[i] = 0.0006 + Math.random() * 0.0017;
    twinkle[i] = 0.45 + Math.random() * 0.55;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({ color: 0xd4e5f8, size: 0.024, transparent: true, opacity: 0.84, sizeAttenuation: true, depthWrite: false });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  scene.add(new THREE.AmbientLight(0xc0c7df, 1.25));
  const blueLight = new THREE.PointLight(0x9dbbe8, 18);
  blueLight.position.set(3, 2, 5);
  scene.add(blueLight);
  const softLight = new THREE.PointLight(0x789bc5, 8);
  softLight.position.set(-3, -2, 2);
  scene.add(softLight);

  let pointerX = 0, pointerY = 0, smoothX = 0, smoothY = 0;
  const updatePointer = (x, y) => {
    pointerX = (x / window.innerWidth - 0.5) * 2;
    pointerY = (y / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('pointermove', event => updatePointer(event.clientX, event.clientY), { passive: true });
  window.addEventListener('deviceorientation', event => {
    if (typeof event.gamma === 'number' && typeof event.beta === 'number') {
      pointerX = THREE.MathUtils.clamp(event.gamma / 35, -1, 1);
      pointerY = THREE.MathUtils.clamp(event.beta / 60, -1, 1);
    }
  }, { passive: true });
  window.addEventListener('resize', () => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.25 : 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tick() {
    requestAnimationFrame(tick);
    smoothX += (pointerX - smoothX) * 0.035;
    smoothY += (pointerY - smoothY) * 0.035;
    const width = window.innerWidth;
    const isMobile = width < 720;
    const isTablet = width >= 720 && width < 1050;

    // Center the artwork within the hero composition, with safe spacing from the top navigation.
    const targetScale = isMobile ? 0.72 : (isTablet ? 0.98 : 1.12);
    group.scale.setScalar(targetScale);
    const targetX = isMobile ? 0.08 : (isTablet ? 0.9 : 2.05);
    const targetY = isMobile ? -0.38 : -0.24;
    group.position.x += (targetX - group.position.x) * 0.035;
    group.position.y += (targetY - group.position.y) * 0.035;

    group.rotation.y += ((smoothX * 0.20) - group.rotation.y) * 0.018;
    group.rotation.x += ((-smoothY * 0.14) - group.rotation.x) * 0.018;
    if (!reducedMotion) {
      core.rotation.z += 0.00045;
      particles.rotation.y += 0.00008;
      const pos = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += drift[i];
        if (pos[i * 3 + 1] > 8) pos[i * 3 + 1] = -8;
      }
      particleGeometry.attributes.position.needsUpdate = true;
      particleMaterial.opacity = 0.72 + Math.sin(Date.now() * 0.0012) * 0.06;
    }
    renderer.render(scene, camera);
  }
  tick();
}
