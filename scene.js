import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('#scene');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
} catch (error) {
  canvas.style.display = 'none';
}

if (renderer) {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 8;

  const group = new THREE.Group();
  scene.add(group);
  const core = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.08, 0.31, 220, 20, 2, 3),
    new THREE.MeshStandardMaterial({ color: 0xa9c8e8, metalness: 0.75, roughness: 0.3, wireframe: true, transparent: true, opacity: 0.72 })
  );
  group.add(core);
  const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xa9c8e8, metalness: 0.55, roughness: 0.35, wireframe: true, transparent: true, opacity: 0.3 });
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.82 + i * 0.2, 0.009, 6, 150), ringMaterial);
    ring.rotation.set(i * 0.7, i * 0.5, i * 0.4);
    group.add(ring);
  }

  // Fine particles spread across the full viewport and drift gently over time.
  const particleCount = 900;
  const positions = new Float32Array(particleCount * 3);
  const drift = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    drift[i] = 0.0008 + Math.random() * 0.002;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0xc6d9ef, size: 0.018, transparent: true, opacity: 0.5, sizeAttenuation: true }));
  scene.add(particles);

  scene.add(new THREE.AmbientLight(0xc0c7df, 1.25));
  const blueLight = new THREE.PointLight(0x9dbbe8, 18);
  blueLight.position.set(3, 2, 5);
  scene.add(blueLight);
  const softLight = new THREE.PointLight(0x789bc5, 8);
  softLight.position.set(-3, -2, 2);
  scene.add(softLight);

  let mx = 0, my = 0, tx = 0, ty = 0;
  window.addEventListener('pointermove', event => {
    tx = event.clientX / window.innerWidth - 0.5;
    ty = event.clientY / window.innerHeight - 0.5;
  }, { passive: true });
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tick() {
    requestAnimationFrame(tick);
    mx += (tx - mx) * 0.035;
    my += (ty - my) * 0.035;
    if (!reducedMotion) {
      group.rotation.y += 0.001 + mx * 0.0007;
      group.rotation.x = my * 0.15;
      core.rotation.z += 0.0005;
      particles.rotation.y += 0.00012;
      particles.rotation.x += 0.000035;
      const pos = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += drift[i];
        if (pos[i * 3 + 1] > 7.5) pos[i * 3 + 1] = -7.5;
      }
      particleGeometry.attributes.position.needsUpdate = true;
    }
    // Keep the 3D object centered on narrow screens; use a larger, offset composition on desktop.
    const isMobile = window.innerWidth < 720;
    group.scale.setScalar(isMobile ? 0.92 : 1.28);
    group.position.set(isMobile ? 0 : 2.35, isMobile ? -0.05 : 0.25, 0);
    renderer.render(scene, camera);
  }
  tick();
}
