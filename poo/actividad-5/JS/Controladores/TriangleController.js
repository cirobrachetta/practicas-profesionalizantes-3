export class TriangleController {
  constructor(triangle, canvas, movimientoController) {
    this.triangle = triangle;
    this.canvas = canvas;
    this.movimientoController = movimientoController;
  }

  init() {
    this.movimientoController.init();
  }

  update() {
    // Movimiento delegando al movimientoController, pasándole este controlador
    this.movimientoController.getMovement(this, this.canvas);

    // Color dinámico
    if (this.triangle.useDynamicColor) {
      this.updateColor();
    }
  }

  updateColor() {
    this.triangle.hue = (this.triangle.hue + 1) % 360;
  }

  move(dx, dy) {
    this.triangle.x += dx;
    this.triangle.y += dy;
  }

  rotate(radians) {
    this.triangle.angle += radians;
  }
}
