// js/Controladores/WindowController.js
import { clearCanvas } from '../utils/ClearCanvas.js';

export class WindowController {
  constructor(canvasWidth, canvasHeight, entityManager, selectionController) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    const container = document.getElementById('canvas-container');
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.entityManager = entityManager;
    this.selectionController = selectionController;
  }

  start() {
    this.loop();
  }

  loop() {
    clearCanvas(this.ctx, this.canvas);
    const entidades = this.entityManager.getAll();
    const selected = this.selectionController.getSelectedEntity();

    entidades.forEach(ent => {
      // ✅ Solo mover la entidad seleccionada, y pasarle la figura y canvas
      if (
        ent === selected &&
        ent.controller &&
        typeof ent.controller.getMovement === 'function'
      ) {
        ent.controller.getMovement(ent, this.canvas);
      }

      // Dibujar entidad
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
