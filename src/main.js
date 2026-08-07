import { spawnBubbles } from './components/particles.js';
import { populateZone } from './components/creatures.js';
import { initReveal } from './components/reveal.js';

// --- ambience: bubbles drifting across the whole page ---
spawnBubbles(document.getElementById('bubble-layer'), 30);

// --- populate each zone with its own creatures ---
document.querySelectorAll('[data-creatures]').forEach((layer) => {
  populateZone(layer, layer.dataset.creatures);
});

// --- scroll reveal for cards/headings ---
initReveal();

// --- depth gauge + parallax, batched into one scroll handler ---
const gaugeFill = document.getElementById('depth-gauge-fill');
const depthLabel = document.getElementById('depth-label');
const parallaxLayers = Array.from(document.querySelectorAll('.creature-layer[data-speed]'));
const MAX_DEPTH_M = 4200;

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let prefersReducedMotion = motionQuery.matches;
motionQuery.addEventListener('change', (e) => {
  prefersReducedMotion = e.matches;
  if (prefersReducedMotion) {
    parallaxLayers.forEach((layer) => { layer.style.transform = ''; });
  }
});

let ticking = false;

function updateOnScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

  if (gaugeFill && depthLabel) {
    gaugeFill.style.height = `${progress * 100}%`;
    depthLabel.style.top = `${progress * 100}%`;
    depthLabel.textContent = `${Math.round(progress * MAX_DEPTH_M)}m`;
  }

  if (!prefersReducedMotion) {
    parallaxLayers.forEach((layer) => {
      const speed = Number.parseFloat(layer.dataset.speed) || 0.2;
      const rect = layer.parentElement.getBoundingClientRect();
      const offset = rect.top * speed;
      layer.style.transform = `translateY(${offset * -1}px)`;
    });
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}, { passive: true });

updateOnScroll();
