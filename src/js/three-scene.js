import * as THREE from 'three';

export function initThreeJS() {
  const canvas = document.querySelector('#hero-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  
  // Camera
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 10;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Elegant Glass Geometry (Torus Knot)
  const geometry = new THREE.TorusKnotGeometry(2, 0.6, 200, 32);
  
  // High-End Glass Material
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.9, // Glass effect
    thickness: 1.5,
    ior: 1.5,
    envMapIntensity: 1.0,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Lighting to make the glass look premium
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xD4AF37, 2); // Gold light
  dirLight1.position.set(5, 5, 5);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xff1493, 1); // Subtle neon pink light
  dirLight2.position.set(-5, -5, -5);
  scene.add(dirLight2);

  // Mouse Interaction for smooth parallax rotation
  let targetRotationX = 0;
  let targetRotationY = 0;

  document.addEventListener('mousemove', (event) => {
    targetRotationY = (event.clientX / window.innerWidth - 0.5) * 0.5;
    targetRotationX = (event.clientY / window.innerHeight - 0.5) * 0.5;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Base slow rotation
    mesh.rotation.y = elapsedTime * 0.1;
    mesh.rotation.x = elapsedTime * 0.05;

    // Add mouse parallax rotation
    mesh.rotation.x += targetRotationX * 0.5;
    mesh.rotation.y += targetRotationY * 0.5;

    // Gentle floating
    mesh.position.y = Math.sin(elapsedTime * 0.5) * 0.2;

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }

  animate();

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}
