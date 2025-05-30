import { Rectangle } from '../Entidades/Rectangle.js';
import { Circulo } from '../Entidades/Circle.js';
import { MoveController } from './MoveController.js';
import { IdGenerator } from '../utils/IdGenerator.js';

export class EntityCreatorController {
  constructor(canvas, manager, selectionController, idGenerator) {
    this.canvas = canvas;
    this.manager = manager;
    this.selectionController = selectionController;
    this.idGenerator = idGenerator;
  }

  init() {
    document.getElementById('crear-rect').addEventListener('click', () => this.createRectangle());
    document.getElementById('crear-circ').addEventListener('click', () => this.createCircle());
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
    rect.id = this.idGenerator.next();     // ID interno
    rect.name = data.name || `Entidad-${rect.id}`; // Nombre visible
    rect.controller = new MoveController(); // Asociamos el controlador de movimiento
    
    rect.controller.init();

    if (this.manager.addEntity(rect)) {
      this.selectionController.updateButtons();
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
    circ.id = this.idGenerator.next();     // ID interno
    circ.name = data.name || `Entidad-${circ.id}`; // Nombre visible
    circ.controller = new MoveController(); // Asociamos el controlador de movimiento
    circ.controller.init();

    if (this.manager.addEntity(circ)) {
      this.selectionController.updateButtons();
      console.log(`Círculo "${data.id}" creado`);
    }
  }

  deleteEntity() {
    // Pedimos al usuario el nombre (visible) de la entidad
    const name = prompt("Nombre de la entidad a eliminar:");
    if (!name) {
      alert("Nombre inválido");
      return;
    }

    // Buscar la entidad por nombre
    const entities = this.manager.getAll();
    const entityToRemove = entities.find(ent => ent.name === name);

    if (!entityToRemove) {
      alert(`No existe entidad con nombre "${name}"`);
      return;
    }

    // Usar el id interno para eliminarla
    if (this.manager.removeEntity(entityToRemove.id)) {
      alert(`Entidad "${name}" eliminada`);
      this.selectionController.updateButtons();
    }
  }
}
