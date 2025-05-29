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

  onKeyDownPressEvent(e) {
    this.pressedKeys.add(e.key);
  }

  onKeyUpPressEvent(e) {
    this.pressedKeys.delete(e.key);
  }

  getMovement(figura, canvas) {
    let dx = 0;
    let dy = 0;

    const angle = figura.angle || 0;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Movimiento
    if (this.pressedKeys.has('ArrowUp') || this.pressedKeys.has('w')) {
      dx += this.MOVE_DISTANCE * cos;
      dy += this.MOVE_DISTANCE * sin;
    }

    if (this.pressedKeys.has('ArrowDown') || this.pressedKeys.has('s')) {
      dx -= this.MOVE_DISTANCE * cos;
      dy -= this.MOVE_DISTANCE * sin;
    }

    // Rotación (solo si tiene rotate)
    if ((this.pressedKeys.has('ArrowLeft') || this.pressedKeys.has('a')) && typeof figura.rotate === 'function') {
      figura.rotate(-this.ROTATION_SPEED);
    }

    if ((this.pressedKeys.has('ArrowRight') || this.pressedKeys.has('d')) && typeof figura.rotate === 'function') {
      figura.rotate(this.ROTATION_SPEED);
    }

    // Verificación de límites básicos
    const nextX = figura.x + dx;
    const nextY = figura.y + dy;

    // Intentamos calcular límites, suponiendo tamaño (si tiene ancho/alto/radio)
    const halfW = figura.width ? figura.width / 2 : (figura.radio || 0);
    const halfH = figura.height ? figura.height / 2 : (figura.radio || 0);

    if (
      nextX - halfW >= 0 && nextX + halfW <= canvas.width &&
      nextY - halfH >= 0 && nextY + halfH <= canvas.height
    ) {
      figura.move(dx, dy);

      if (typeof figura.updateColor === 'function') {
        figura.updateColor();
      }
    }
  }
}
