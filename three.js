(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('[three-bg] THREE not loaded — check script order.');
    return;
  }

  /* ── Canvas lives INSIDE .hero, positioned absolute ───── */
  const canvas = document.getElementById('ewc-three-bg');
  if (!canvas) return;

  /* Make the canvas fill its hero parent */
  canvas.style.cssText = [
    'position:absolute',
    'inset:0',
    'width:100%',
    'height:100%',
    'pointer-events:none',
    'z-index:0',
  ].join(';');

  /* hero needs relative positioning so the canvas can fill it */
  const hero = canvas.closest('.hero') || canvas.parentElement;

  /* ── Renderer ─────────────────────────────────────────── */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  /* ── Scene & Camera ───────────────────────────────────── */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.z = 28;

  /* ── Resize helper ────────────────────────────────────── */
  function syncSize() {
    const w = hero.offsetWidth;
    const h = hero.offsetHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  syncSize();

  /* ── Build ♻ sprite texture ───────────────────────────── */
  function makeTexture(hexColor) {
    const px  = 256;
    const c   = document.createElement('canvas');
    c.width   = px;
    c.height  = px;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, px, px);
    ctx.shadowColor = hexColor;
    ctx.shadowBlur  = px * 0.12;
    ctx.fillStyle   = hexColor;
    ctx.font        = `${Math.round(px * 0.80)}px serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('♻', px / 2, px / 2 + px * 0.03);
    const t = new THREE.CanvasTexture(c);
    t.needsUpdate = true;
    return t;
  }

  /* ── EWC green palette — very low opacity ─────────────── */
  const VARIANTS = [
    { color: '#5DB83A', opacity: 0.22 },
    { color: '#8DC63F', opacity: 0.18 },
    { color: '#1B5E35', opacity: 0.26 },
    { color: '#3a9e5f', opacity: 0.20 },
    { color: '#a8e063', opacity: 0.15 },
  ];
  const textures = VARIANTS.map(v => makeTexture(v.color));

  /* ── Spawn symbols ────────────────────────────────────── */
  const COUNT   = 50;
  const RANGE_X = 46;
  const RANGE_Y = 30;
  const RANGE_Z = 26;
  const symbols = [];

  for (let i = 0; i < COUNT; i++) {
    const vi  = i % VARIANTS.length;
    const geo = new THREE.PlaneGeometry(1, 1);
    const mat = new THREE.MeshBasicMaterial({
      map:         textures[vi],
      transparent: true,
      opacity:     VARIANTS[vi].opacity,
      depthWrite:  false,
      side:        THREE.DoubleSide,
    });

    const mesh  = new THREE.Mesh(geo, mat);
    const scale = 2.5 + Math.random() * 5.5;
    mesh.scale.setScalar(scale);

    const ox = (Math.random() - 0.5) * RANGE_X;
    const oy = (Math.random() - 0.5) * RANGE_Y;

    mesh.position.set(ox, oy, (Math.random() - 0.5) * RANGE_Z - 4);
    mesh.rotation.z = Math.random() * Math.PI * 2;

    mesh.userData = {
      rotSpeed : (Math.random() - 0.5) * 0.0022,
      driftX   : (Math.random() - 0.5) * 0.0032,
      driftY   : (Math.random() - 0.5) * 0.0022,
      floatAmp : 0.22 + Math.random() * 0.60,
      floatFreq: 0.16 + Math.random() * 0.40,
      phase    : Math.random() * Math.PI * 2,
      ox, oy,
    };

    scene.add(mesh);
    symbols.push(mesh);
  }

  /* ── Scroll parallax ──────────────────────────────────── */
  let scrollY     = 0;
  let camYTarget  = 0;
  let camYCurrent = 0;

  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  /* ── Animation loop ───────────────────────────────────── */
  const clock = new THREE.Clock();
  let   raf   = null;

  function animate() {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    camYTarget   = -(scrollY * 0.009);
    camYCurrent += (camYTarget - camYCurrent) * 0.05;
    camera.position.y = camYCurrent;

    symbols.forEach(m => {
      const d = m.userData;
      m.rotation.z += d.rotSpeed;
      m.position.x = d.ox + Math.sin(t * d.floatFreq + d.phase) * d.floatAmp;
      m.position.y = d.oy + Math.cos(t * d.floatFreq * 0.65 + d.phase) * d.floatAmp * 0.5;
      d.ox += d.driftX;
      d.oy += d.driftY;
      if (d.ox >  RANGE_X / 2) d.ox = -RANGE_X / 2;
      if (d.ox < -RANGE_X / 2) d.ox =  RANGE_X / 2;
      if (d.oy >  RANGE_Y / 2) d.oy = -RANGE_Y / 2;
      if (d.oy < -RANGE_Y / 2) d.oy =  RANGE_Y / 2;
    });

    renderer.render(scene, camera);
  }

  animate();

  /* ── Resize ───────────────────────────────────────────── */
  new ResizeObserver(syncSize).observe(hero);

  /* ── Pause rendering when hero scrolls out of view ────── */
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!raf) animate(); }
    else { cancelAnimationFrame(raf); raf = null; }
  }, { threshold: 0 }).observe(hero);

})();