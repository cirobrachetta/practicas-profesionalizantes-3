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

  // Ahora recibe el controlador de la figura, no la figura directa
  getMovement(controladorFigura, canvas) {
    let dx = 0;
    let dy = 0;

    const entidad = controladorFigura[Object.keys(controladorFigura).find(k => typeof controladorFigura[k] === 'object')];
    // Esto asume que el primer objeto que encuentre es la entidad, por ejemplo controladorFigura.triangle

    const angle = entidad.angle || 0;
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

    // Rotación
    if ((this.pressedKeys.has('ArrowLeft') || this.pressedKeys.has('a')) && typeof controladorFigura.rotate === 'function') {
      controladorFigura.rotate(-this.ROTATION_SPEED);
    }

    if ((this.pressedKeys.has('ArrowRight') || this.pressedKeys.has('d')) && typeof controladorFigura.rotate === 'function') {
      controladorFigura.rotate(this.ROTATION_SPEED);
    }

    // Límites (usando datos de la entidad)
    const nextX = entidad.x + dx;
    const nextY = entidad.y + dy;

    // Tamaño (width/height/radio)
    const halfW = entidad.width ? entidad.width / 2 : (entidad.radio || 0);
    const halfH = entidad.height ? entidad.height / 2 : (entidad.radio || 0);

    if (
      nextX - halfW >= 0 && nextX + halfW <= canvas.width &&
      nextY - halfH >= 0 && nextY + halfH <= canvas.height
    ) {
      controladorFigura.move(dx, dy);

      if (typeof controladorFigura.updateColor === 'function') {
        controladorFigura.updateColor();
      }
    }
  }
}
