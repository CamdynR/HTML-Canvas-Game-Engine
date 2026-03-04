// main.js

export const ELEMS = {
  buttons: {
    w: undefined,
    a: undefined,
    s: undefined,
    d: undefined,
  },
  canvas: {
    ref: undefined,
    ctx: undefined,
  },
};

function queryElements() {
  // Buttons
  ELEMS.buttons.w = document.querySelector('#wBtn');
  ELEMS.buttons.a = document.querySelector('#aBtn');
  ELEMS.buttons.s = document.querySelector('#sBtn');
  ELEMS.buttons.d = document.querySelector('#dBtn');
  // Canvas
  ELEMS.canvas.ref = document.querySelector('#screen');
  ELEMS.canvas.ctx = ELEMS.canvas.ref.getContext('2d');
}

function attachListeners() {
  function _toggleActive(e) {
    ELEMS.buttons[e.key]?.classList.toggle('active', e.type === 'keydown');
  }

  window.addEventListener('keydown', _toggleActive);
  window.addEventListener('keyup', _toggleActive);
}

function main() {
  queryElements();
  attachListeners();
}

main();
