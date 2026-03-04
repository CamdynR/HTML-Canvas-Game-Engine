// gfx.js

import Square from './entities/Square.js';
import { ELEMS } from './index.js';

const TARGET_FPS = 60;
const FRAME_DURATION = 1000 / TARGET_FPS; // ~16.67ms

const CANVAS = ELEMS.canvas.ref;
const CTX = ELEMS.canvas.ctx;

let lastTime = 0;

const STATE = {
  entities: [],
};

const CONTROLS = {
  'w': false,
  'a': false,
  's': false,
  'd': false,
  ' ': false,
};

function initState() {
  // Player Character
  STATE.entities.push(new Square());
}

function initControls() {
  function _updateControlState(e) {
    if (CONTROLS[e.key] === undefined) return;
    CONTROLS[e.key] = e.type === 'keydown';
  }

  window.addEventListener('keydown', _updateControlState);
  window.addEventListener('keyup', _updateControlState);
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = CANVAS.getBoundingClientRect();
  CANVAS.width = Math.round(rect.width * dpr);
  CANVAS.height = Math.round(rect.height * dpr);
  CTX.scale(dpr, dpr);
}

function render() {
  // Wait for elements to be queried
  if (!CTX) return;

  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
  CTX.imageSmoothingEnabled = false;
  STATE.entities.forEach((entity) => entity.render(CTX));
}

function loop(timestamp) {
  const elapsed = timestamp - lastTime;
  lastTime = timestamp;

  const player = STATE.entities[0];
  const speed = player.speed * (CONTROLS[' '] ? 2 : 1);
  const maxX = CANVAS.width / (window.devicePixelRatio || 1) - player.size;
  const maxY = CANVAS.height / (window.devicePixelRatio || 1) - player.size;

  if (CONTROLS.w) player.y -= speed;
  if (CONTROLS.a) player.x -= speed;
  if (CONTROLS.s) player.y += speed;
  if (CONTROLS.d) player.x += speed;

  player.x = Math.max(0, Math.min(player.x, maxX));
  player.y = Math.max(0, Math.min(player.y, maxY));

  render();
  requestAnimationFrame(loop);
}

function initGame() {
  resizeCanvas();
  initState();
  initControls();
  requestAnimationFrame((timestamp) => {
    lastTime = timestamp;
    requestAnimationFrame(loop);
  });
  window.addEventListener('resize', resizeCanvas);
}

initGame();
