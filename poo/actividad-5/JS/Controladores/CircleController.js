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
    // Ya no hace falta manipular directamente desde aquí
    this.movimientoController.getMovement(this.circulo, this.canvas);
  }
}