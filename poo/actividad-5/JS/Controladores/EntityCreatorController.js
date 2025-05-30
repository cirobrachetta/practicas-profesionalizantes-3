import { Rectangle } from '../Entidades/Rectangle.js';
import { Circulo } from '../Entidades/Circle.js';
import { MoveController } from './MoveController.js';
import { EntitySelectionController } from './EntitySelectionController.js';

export class EntityCreatorController {
  constructor(canvas, manager, selectionController) {
    this.canvas = canvas;
    this.manager = manager;
    this.selectionController = selectionController;
  }

  init() {
    document.getElementById('crear-rect').addEventListener('click', () => this.createRectangle());
    document.getElementById('crear-circ').addEventListener('click', () => this.createCircle());
    document.getElementById('eliminar-figura').addEventListener('click', () => this.deleteEntity());
  }

  promptCommonData() {
    const id = prompt("ID único de la figura:");
    const x = parseFloat(prompt("Coordenada X:"));
    const y = parseFloat(prompt("Coordenada Y:"));
    if (!id || isNaN(x) || isNaN(y)) {
      alert("Datos inválidos");
      return null;
    }
    return { id, x, y };
  }

  createRectangle() {
    const data = this.promptCommonData();
    if (!data) return;

    const width = parseFloat(prompt("Ancho del rectángulo:"));
    const height = parseFloat(prompt("Alto del rectángulo:"));
    if (isNaN(width) || isNaN(height)) {
      alert("Dimensiones inválidas");
      return;
    }

    const rect = new Rectangle(data.x, data.y, width, height);
    rect.controller = new MoveController(); // Asociamos el controlador de movimiento
    rect.controller.init();

    if (this.manager.addEntity(data.id, rect)) {
      this.selectionController.updateSelectOptions();
      console.log(`Rectángulo "${data.id}" creado`);
    }
  }

  createCircle() {
    const data = this.promptCommonData();
    if (!data) return;

    const radio = parseFloat(prompt("Radio del círculo:"));
    if (isNaN(radio)) {
      alert("Radio inválido");
      return;
    }

    const circ = new Circulo(data.x, data.y, radio);
    circ.controller = new MoveController(); // Asociamos el controlador de movimiento
    circ.controller.init();

    if (this.manager.addEntity(data.id, circ)) {
      this.selectionController.updateSelectOptions();
      console.log(`Círculo "${data.id}" creado`);
    }
  }

  deleteEntity() {
    const id = prompt("ID de la entidad a eliminar:");
    if (this.manager.removeEntity(id)) {
      console.log(`Entidad "${id}" eliminada`);
    }
  }
}
