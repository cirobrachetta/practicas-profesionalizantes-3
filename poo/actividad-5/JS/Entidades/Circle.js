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

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    ctx.fillStyle = this.useDynamicColor
      ? `hsl(${this.hue}, 100%, 50%)`
      : this.color;
    ctx.fill();
    ctx.restore();
  }
}
