// js/controladores/WindowController.js
import { clearCanvas } from '../utils/ClearCanvas.js';

export class WindowController {
  constructor(canvasWidth, canvasHeight, rectangleController) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.rectangleController = rectangleController;
  }

  start() {
    this.rectangleController.init();
    this.loop();
  }

  loop() {
    this.rectangleController.update();
    clearCanvas(this.ctx, this.canvas);
    this.rectangleController.rectangle.draw(this.ctx);
    requestAnimationFrame(() => this.loop());
  }
}
