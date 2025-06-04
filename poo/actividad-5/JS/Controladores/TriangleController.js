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
    this.movimientoController.getMovement(this.triangle, this.canvas);
  }
}
