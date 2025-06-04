export class Circulo {
  constructor(x, y, radio) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.angle = 0;
    this.hue = 0;
    this.color = '#000000';
    this.useDynamicColor = true;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  rotate(radians) {
    this.angle += radians;
  }

  updateColor() {
    if (this.useDynamicColor) {
      this.hue = (this.hue + 1) % 360;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.arc(0, 0, this.radio, 0, Math.PI * 2);
    ctx.fillStyle = this.useDynamicColor
      ? `hsl(${this.hue}, 100%, 50%)`
      : this.color;
    ctx.fill();
    ctx.restore();
  }
}
