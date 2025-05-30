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
      // Dibujar entidad
      ent.draw(this.ctx);
    });

    // Actualizar entidad seleccionada (movimiento, color, rotación...)
    if (selected && selected.controller && typeof selected.controller.update === 'function') {
      selected.controller.update();
    }

    requestAnimationFrame(() => this.loop());
  }

  getCanvas() {
    return this.canvas;
  }

  getContext() {
    return this.ctx;
  }
}
