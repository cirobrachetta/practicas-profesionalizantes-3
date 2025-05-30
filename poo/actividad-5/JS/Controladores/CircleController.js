export class CircleController {
  constructor(circulo, canvas, movimientoController) {
    this.circulo = circulo;
    this.canvas = canvas;
    this.movimientoController = movimientoController;
  }

  init() {
    this.movimientoController.init();
  }

  update() {
    this.movimientoController.getMovement(this.circulo, this.canvas);
  }
}
