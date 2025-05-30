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

  draw(ctx) {
    const altura = (Math.sqrt(3) / 2) * this.lado;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(0, -altura / 2);
    ctx.lineTo(-this.lado / 2, altura / 2);
    ctx.lineTo(this.lado / 2, altura / 2);
    ctx.closePath();
    ctx.fillStyle = this.useDynamicColor
      ? `hsl(${this.hue}, 100%, 50%)`
      : this.color;
    ctx.fill();
    ctx.restore();
  }
}
