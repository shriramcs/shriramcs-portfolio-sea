// Simple sea-creature components built as inline SVG, positioned & animated via CSS.
import { spawnGlowParticles } from './particles.js';

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function fishMarkup(color) {
  return `
    <svg width="46" height="26" viewBox="0 0 46 26" fill="none">
      <path d="M4 13c6-9 22-9 30-4-4 3-4 5 0 8-8 5-24 5-30-4z" fill="${color}"/>
      <path d="M4 13 L14 6 L14 20 Z" fill="${color}" opacity="0.85"/>
      <circle class="eye-white" cx="26" cy="10" r="3" fill="#f4fdff" stroke="#06202c" stroke-width="0.6"/>
      <circle class="eye-pupil" cx="26" cy="10" r="1.4" fill="#06202c"/>
    </svg>`;
}

/** Nemo-style clownfish: fixed orange/white/black colouring, same coordinate
 *  scale as `fishMarkup` so it drops into the same swim rig. */
function clownfishMarkup() {
  return `
    <svg width="60" height="34" viewBox="0 0 60 34" fill="none">
      <path d="M2 17 C-2 9 -2 25 2 17 L12 10 C9 14 9 20 12 24 Z" fill="#fff8f0" stroke="#1a1a1a" stroke-width="1.4"/>
      <path d="M10 17c0-8 12-13 24-13 11 0 20 6 22 13-2 7-11 13-22 13-12 0-24-5-24-13z" fill="#f6791e" stroke="#1a1a1a" stroke-width="1.6"/>
      <path d="M27 5c3-4 9-5 13-3-3 3-5 4-8 7z" fill="#f6791e" stroke="#1a1a1a" stroke-width="1.3"/>
      <path d="M28 26c2 4 7 6 11 5-2-3-5-5-8-7z" fill="#f6791e" stroke="#1a1a1a" stroke-width="1.3"/>
      <path d="M20 5c-2 4-2 20 0 24-4-2-7-7-7-12s3-10 7-12z" fill="#fff" stroke="#1a1a1a" stroke-width="1.4"/>
      <path d="M33 4c-3 5-3 22 0 26-5-2-8-8-8-13s3-11 8-13z" fill="#fff" stroke="#1a1a1a" stroke-width="1.4"/>
      <path d="M50 19c1.5 1 3 1 4.5 0" stroke="#1a1a1a" stroke-width="1.1" fill="none" stroke-linecap="round"/>
      <circle class="eye-white" cx="45" cy="13" r="4" fill="#f4fdff" stroke="#1a1a1a" stroke-width="1"/>
      <circle class="eye-pupil" cx="46.2" cy="13" r="1.9" fill="#1a1a1a"/>
    </svg>`;
}

function jellyfishMarkup(color) {
  return `
    <svg width="54" height="70" viewBox="0 0 54 70" fill="none">
      <path class="bell" d="M4 30 C4 10 50 10 50 30 C50 34 46 34 46 30 C46 18 8 18 8 30 C8 34 4 34 4 30Z" fill="${color}" opacity="0.75"/>
      <path d="M14 32 Q16 50 12 66" stroke="${color}" stroke-width="2" fill="none" opacity="0.55"/>
      <path d="M24 32 Q26 54 21 68" stroke="${color}" stroke-width="2" fill="none" opacity="0.55"/>
      <path d="M34 32 Q32 50 37 66" stroke="${color}" stroke-width="2" fill="none" opacity="0.55"/>
      <path d="M44 32 Q42 48 46 62" stroke="${color}" stroke-width="2" fill="none" opacity="0.55"/>
    </svg>`;
}

function seaweedMarkup(color) {
  return `
    <svg width="26" height="90" viewBox="0 0 26 90" fill="none">
      <path d="M13 90 C 2 70 24 55 8 38 C -4 22 20 12 13 0"
        stroke="${color}" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.8"/>
    </svg>`;
}

/**
 * Places a fish inside `container` at a random vertical position, swimming
 * horizontally across the zone along a randomized, curvy path.
 */
export function createFish(container, { color = '#0d3b4d', reverse = false, topRange = [10, 80], species = 'fish' } = {}) {
  const el = document.createElement('div');
  el.className = reverse ? 'fish reverse' : 'fish';

  const body = document.createElement('div');
  body.className = 'fish-body';
  body.innerHTML = species === 'clownfish' ? clownfishMarkup() : fishMarkup(color);

  const top = rand(topRange[0], topRange[1]);
  const duration = rand(56, 104);
  const delay = rand(0, 56);
  const scale = rand(0.45, 2.3);

  el.style.top = `${top}%`;
  el.style.animationDuration = `${duration}s`;
  el.style.animationDelay = `-${delay}s`;

  // Size (and, for `reverse` fish, the horizontal mirror flip) is applied via
  // a static `transform` on the separate `.fish-body` wrapper, so it never
  // composes with the animated `transform` (translate/rotate) on the outer
  // `.fish` element — mixing the two on the same element was flipping the
  // whole swim path for reverse fish, not just the sprite.
  body.style.transform = reverse ? `scale(${-scale}, ${scale})` : `scale(${scale})`;

  // Randomize the vertical waypoints & gentle turning angles used by the
  // swim/swim-reverse keyframes so every fish follows its own curvy path
  // instead of one identical straight line.
  const fy0 = rand(-6, 6);
  el.style.setProperty('--fy0', `${fy0}px`);
  el.style.setProperty('--fy1', `${rand(-26, 26)}px`);
  el.style.setProperty('--fy2', `${rand(-26, 26)}px`);
  el.style.setProperty('--fy3', `${rand(-26, 26)}px`);
  el.style.setProperty('--fy4', `${rand(-26, 26)}px`);
  el.style.setProperty('--fr1', `${rand(-6, 6)}deg`);
  el.style.setProperty('--fr2', `${rand(-6, 6)}deg`);
  el.style.setProperty('--fr3', `${rand(-6, 6)}deg`);
  el.style.setProperty('--fr4', `${rand(-6, 6)}deg`);

  const pupil = body.querySelector('.eye-pupil');
  if (pupil) {
    pupil.style.animationDuration = `${rand(2.4, 4.2)}s`;
    pupil.style.animationDelay = `-${rand(0, 4)}s`;
  }

  el.appendChild(body);
  container.appendChild(el);
}

/** Places a slowly-pulsing jellyfish drifting within the zone. */
export function createJellyfish(container, { color = '#bfeaf0' } = {}) {
  const el = document.createElement('div');
  el.className = 'jellyfish';
  el.innerHTML = jellyfishMarkup(color);

  const left = rand(5, 90);
  const top = rand(8, 70);
  const duration = rand(32, 56);
  const delay = rand(0, 32);
  const scale = rand(0.6, 1.2);

  el.style.left = `${left}%`;
  el.style.top = `${top}%`;
  el.style.animationDuration = `${duration}s`;
  el.style.animationDelay = `-${delay}s`;
  el.style.transform = `scale(${scale})`;

  container.appendChild(el);
}

/** Anchors a swaying seaweed strand to the bottom of the zone. */
export function createSeaweed(container, { color = '#0a2e22' } = {}) {
  const el = document.createElement('div');
  el.className = 'seaweed';
  el.innerHTML = seaweedMarkup(color);

  const left = rand(2, 96);
  const duration = rand(14, 24);
  const delay = rand(0, 16);
  const scale = rand(0.7, 1.5);

  el.style.left = `${left}%`;
  el.style.animationDuration = `${duration}s`;
  el.style.animationDelay = `-${delay}s`;
  el.style.transform = `scale(${scale})`;

  container.appendChild(el);
}

/** Populates a zone's creature layer according to its depth theme. */
export function populateZone(container, zone) {
  switch (zone) {
    case 'hero': {
      // Keep fish clear of the vertically-centered hero text by only
      // spawning them in a thin band near the top and bottom of the viewport.
      createFish(container, { color: '#0f5c78', reverse: true, topRange: [2, 14] });
      createFish(container, { species: 'clownfish', topRange: [86, 97] });
      break;
    }

    case 'surface':
      for (let i = 0; i < 3; i++) createFish(container, { color: '#0d3b4d', reverse: i % 2 === 0 });
      createFish(container, { species: 'clownfish', topRange: [30, 55] });
      createJellyfish(container, { color: '#e9fbff' });
      break;

    case 'twilight':
      for (let i = 0; i < 2; i++) createFish(container, { color: '#dff3fa', reverse: i % 2 === 0 });
      for (let i = 0; i < 2; i++) createJellyfish(container, { color: '#a9e8e0' });
      break;

    case 'deep':
      createFish(container, { color: '#7fe7d4' });
      for (let i = 0; i < 2; i++) createJellyfish(container, { color: '#7fe7d4' });
      spawnGlowParticles(container, 10);
      break;

    case 'abyss':
      createJellyfish(container, { color: '#ffd88a' });
      spawnGlowParticles(container, 12);
      break;

    case 'floor':
      for (let i = 0; i < 3; i++) createSeaweed(container, { color: '#12402f' });
      spawnGlowParticles(container, 6);
      break;

    default:
      break;
  }
}
