// Bubble & glow-particle ambience — simple DOM-based particle component.

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Continuously spawns rising bubbles inside a fixed-position container.
 * @param {HTMLElement} container
 * @param {number} count number of concurrent bubbles
 */
export function spawnBubbles(container, count = 26) {
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const size = rand(4, 16);
    const left = rand(0, 100);
    const duration = rand(36, 88);
    const delay = rand(0, 72);
    const drift = rand(-40, 40);

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.setProperty('--drift', `${drift}px`);
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `-${delay}s`;

    container.appendChild(bubble);
  }
}

/**
 * Sprinkles slow-twinkling bioluminescent specks (used in deep/abyss zones).
 * @param {HTMLElement} container
 * @param {number} count
 */
export function spawnGlowParticles(container, count = 14) {
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'glow-particle';

    const size = rand(2, 5);
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${rand(2, 98)}%`;
    dot.style.top = `${rand(5, 95)}%`;
    dot.style.animationDelay = `-${rand(0, 14)}s`;
    dot.style.animationDuration = `${rand(10, 20)}s`;

    container.appendChild(dot);
  }
}
