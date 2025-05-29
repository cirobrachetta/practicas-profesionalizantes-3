export class Circulo {
  constructor(x, y, radio) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.hue = 0; // para cambiar color si quieres animación
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  updateColor() {
    this.hue = (this.hue + 1) % 360;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
    ctx.fill();
    ctx.restore();
  }
}
