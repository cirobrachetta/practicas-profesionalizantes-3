export class MoveController {
  constructor() {
    this.pressedKeys = new Set();
    this.ROTATION_SPEED = Math.PI / 60;
    this.MOVE_DISTANCE = 2.5;
  }

  init() {
    window.addEventListener('keydown', this.onKeyDownPressEvent.bind(this));
    window.addEventListener('keyup', this.onKeyUpPressEvent.bind(this));
  }

  release() {
    window.removeEventListener('keydown', this.onKeyDownPressEvent.bind(this));
    window.removeEventListener('keyup', this.onKeyUpPressEvent.bind(this));
  }

  onKeyDownPressEvent(e) {
    this.pressedKeys.add(e.key);
  }

  onKeyUpPressEvent(e) {
    this.pressedKeys.delete(e.key);
  }

  getMovement(rectangle, canvas) {
    let dx = 0, dy = 0;
    const cos = Math.cos(rectangle.angle);
    const sin = Math.sin(rectangle.angle);

    if (this.pressedKeys.has('ArrowUp') || this.pressedKeys.has('w')) {
      dx += this.MOVE_DISTANCE * cos;
      dy += this.MOVE_DISTANCE * sin;
    }
    if (this.pressedKeys.has('ArrowDown') || this.pressedKeys.has('s')) {
      dx -= this.MOVE_DISTANCE * cos;
      dy -= this.MOVE_DISTANCE * sin;
    }
    if (this.pressedKeys.has('ArrowLeft') || this.pressedKeys.has('a')) {
      rectangle.rotate(-this.ROTATION_SPEED);
    }
    if (this.pressedKeys.has('ArrowRight') || this.pressedKeys.has('d')) {
      rectangle.rotate(this.ROTATION_SPEED);
    }

    const nextX = rectangle.x + dx;
    const nextY = rectangle.y + dy;
    const halfW = rectangle.width / 2;
    const halfH = rectangle.height / 2;

    if (
      nextX - halfW >= 0 && nextX + halfW <= canvas.width &&
      nextY - halfH >= 0 && nextY + halfH <= canvas.height
    ) {
      rectangle.move(dx, dy);
      rectangle.updateColor();
    }
  }
}
