// js/Controladores/WindowController.js
import { clearCanvas } from '../utils/ClearCanvas.js';
import { MoveController } from './MoveController.js';

export class WindowController {
  constructor(canvasWidth, canvasHeight, entityManager) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.entityManager = entityManager;
  }

  start() {
    this.loop();
  }

  loop() {
    clearCanvas(this.ctx, this.canvas);
    const entidades = this.entityManager.getAll();

    entidades.forEach(ent => {
        if (ent.controller instanceof MoveController) {
        ent.controller.getMovement(ent, this.canvas); // pasamos figura y canvas
        }

        ent.draw(this.ctx);
    });

    requestAnimationFrame(() => this.loop());
    }

  getCanvas() {
    return this.canvas;
  }

  getContext() {
    return this.ctx;
  }
}
