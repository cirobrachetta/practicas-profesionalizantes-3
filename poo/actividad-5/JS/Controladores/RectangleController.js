export class RectangleController {
  constructor(rectangle, canvas, movimientoController) {
    this.rectangle = rectangle;
    this.canvas = canvas;
    this.movimientoController = movimientoController;
  }

  init() {
    this.movimientoController.init();
  }

  update() {
    // Movimiento (delegado al movimientoController con este controlador)
    this.movimientoController.getMovement(this, this.canvas);

    // Color dinámico
    if (this.rectangle.useDynamicColor) {
      this.updateColor();
    }
  }

  updateColor() {
    this.rectangle.hue = (this.rectangle.hue + 1) % 360;
  }

  move(dx, dy) {
    this.rectangle.x += dx;
    this.rectangle.y += dy;
  }

  rotate(radians) {
    this.rectangle.angle += radians;
  }
}
