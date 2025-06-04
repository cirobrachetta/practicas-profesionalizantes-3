export class Triangle {
  constructor(x, y, lado) {
    this.x = x;
    this.y = y;
    this.lado = lado;
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
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.useDynamicColor
      ? `hsl(${this.hue}, 100%, 50%)`
      : this.color;

    // Dibujar triángulo equilátero centrado
    const h = (Math.sqrt(3) / 2) * this.lado;
    ctx.beginPath();
    ctx.moveTo(-this.lado / 2, h / 3);
    ctx.lineTo(this.lado / 2, h / 3);
    ctx.lineTo(0, -2 * h / 3);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}
