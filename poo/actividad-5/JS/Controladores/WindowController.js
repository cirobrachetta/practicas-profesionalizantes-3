import { clearCanvas } from '../utils/ClearCanvas.js';

export class WindowController {
  constructor(canvasWidth, canvasHeight, entityManager, selectionController, moveController) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    document.getElementById('canvas-container').appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.entityManager = entityManager;
    this.selectionController = selectionController;
    this.moveController = moveController;
  }

  start() {
    this.loop();
  }

  loop() {
    clearCanvas(this.ctx, this.canvas);

    this.moveController.update(this.canvas);

    const entidades = this.entityManager.getAll();
    entidades.forEach(ent => ent.draw(this.ctx));

    requestAnimationFrame(() => this.loop());
  }

  getCanvas() {
    return this.canvas;
  }

  getContext() {
    return this.ctx;
  }
}
