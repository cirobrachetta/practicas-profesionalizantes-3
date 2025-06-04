import { Rectangle } from '../Entidades/Rectangle.js';
import { Circulo } from '../Entidades/Circle.js';
import { Triangle } from '../Entidades/Triangle.js';

export class EntityCreatorController {
  constructor(canvas, manager, selectionController, idGenerator, moveController) {
    this.canvas = canvas;
    this.manager = manager;
    this.selectionController = selectionController;
    this.idGenerator = idGenerator;
    this.moveController = moveController; // singleton MoveController
  }

  init() {
    document.getElementById('crear-rect').addEventListener('click', () => this.createRectangle());
    document.getElementById('crear-circ').addEventListener('click', () => this.createCircle());
    document.getElementById('crear-trian').addEventListener('click', () => this.createTriangle());
    document.getElementById('eliminar-figura').addEventListener('click', () => this.deleteEntity());
  }

  promptCommonData() {
    const name = prompt("Nombre de la figura:");
    const x = parseFloat(prompt("Coordenada X:"));
    const y = parseFloat(prompt("Coordenada Y:"));
    if (!name || isNaN(x) || isNaN(y)) {
      alert("Datos inválidos");
      return null;
    }
    return { name, x, y };
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
    rect.id = this.idGenerator.next();
    rect.name = data.name || `Entidad-${rect.id}`;

    if (this.manager.addEntity(rect)) {
      this.selectionController.updateButtons();
      console.log(`Rectángulo "${rect.name}" creado`);
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
    circ.id = this.idGenerator.next();
    circ.name = data.name || `Entidad-${circ.id}`;

    if (this.manager.addEntity(circ)) {
      this.selectionController.updateButtons();
      console.log(`Círculo "${circ.name}" creado`);
    }
  }

  createTriangle() {
    const data = this.promptCommonData();
    if (!data) return;

    const lado = parseFloat(prompt("Lado del triángulo:"));
    if (isNaN(lado)) {
      alert("Lado inválido");
      return;
    }

    const trian = new Triangle(data.x, data.y, lado);
    trian.id = this.idGenerator.next();
    trian.name = data.name || `Entidad-${trian.id}`;

    if (this.manager.addEntity(trian)) {
      this.selectionController.updateButtons();
      console.log(`Triángulo "${trian.name}" creado`);
    }
  }

  deleteEntity() {
    const name = prompt("Nombre de la entidad a eliminar:");
    if (!name) {
      alert("Nombre inválido");
      return;
    }

    const entities = this.manager.getAll();
    const entityToRemove = entities.find(ent => ent.name === name);

    if (!entityToRemove) {
      alert(`No existe entidad con nombre "${name}"`);
      return;
    }

    if (this.manager.removeEntity(entityToRemove.id)) {
      alert(`Entidad "${name}" eliminada`);
      this.selectionController.updateButtons();
    }
  }
}
