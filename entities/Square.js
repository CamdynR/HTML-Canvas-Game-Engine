// Square.js

export default class Square {
  constructor({
    x = 0,
    y = 0,
    size = 100,
    color = '#00FF00',
    rotation = 0,
    opacity = 1,
  } = {}) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.rotation = rotation; // in radians
    this.opacity = opacity;
    this.speed = 5;
  }

  render(ctx) {
    const x = Math.floor(this.x);
    const y = Math.floor(this.y);

    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;

    if (this.rotation !== 0) {
      ctx.translate(x + this.size / 2, y + this.size / 2);
      ctx.rotate(this.rotation);
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    } else {
      ctx.fillRect(x, y, this.size, this.size);
    }

    ctx.restore();
  }
}
