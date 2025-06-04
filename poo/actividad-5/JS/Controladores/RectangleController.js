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
    this.movimientoController.getMovement(this.rectangle, this.canvas);
  }
}
