export class MoveController {
  constructor(entityManager) {
    this.entityManager = entityManager;
    this.pressedKeys = new Set();
    this.ROTATION_SPEED = Math.PI / 60;
    this.MOVE_DISTANCE = 2.5;
    this.selectedEntity = null;
  }

  init() {
    window.addEventListener('keydown', this.onKeyDownPressEvent.bind(this));
    window.addEventListener('keyup', this.onKeyUpPressEvent.bind(this));
  }

  onKeyDownPressEvent(e) {
    this.pressedKeys.add(e.key);
  }

  onKeyUpPressEvent(e) {
    this.pressedKeys.delete(e.key);
  }

  setSelectedEntity(entity) {
    this.selectedEntity = entity;
  }

  update(canvas) {
    const entidad = this.selectedEntity;
    if (!entidad) return;

    let dx = 0;
    let dy = 0;

    const angle = entidad.angle || 0;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    if (this.pressedKeys.has('ArrowUp') || this.pressedKeys.has('w')) {
      dx += this.MOVE_DISTANCE * cos;
      dy += this.MOVE_DISTANCE * sin;
    }

    if (this.pressedKeys.has('ArrowDown') || this.pressedKeys.has('s')) {
      dx -= this.MOVE_DISTANCE * cos;
      dy -= this.MOVE_DISTANCE * sin;
    }

    if (this.pressedKeys.has('ArrowLeft') || this.pressedKeys.has('a')) {
      entidad.rotate(-this.ROTATION_SPEED);
    }

    if (this.pressedKeys.has('ArrowRight') || this.pressedKeys.has('d')) {
      entidad.rotate(this.ROTATION_SPEED);
    }

    const nextX = entidad.x + dx;
    const nextY = entidad.y + dy;

    const halfW = entidad.width ? entidad.width / 2 : (entidad.radio || entidad.lado / 2);
    const halfH = entidad.height ? entidad.height / 2 : (entidad.radio || (Math.sqrt(3) / 2) * entidad.lado / 2);

    if (
      nextX - halfW >= 0 && nextX + halfW <= canvas.width &&
      nextY - halfH >= 0 && nextY + halfH <= canvas.height
    ) {
      entidad.move(dx, dy);
      entidad.updateColor?.();
    }
  }
}
