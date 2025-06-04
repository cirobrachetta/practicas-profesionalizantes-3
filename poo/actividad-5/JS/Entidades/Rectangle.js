export class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}
