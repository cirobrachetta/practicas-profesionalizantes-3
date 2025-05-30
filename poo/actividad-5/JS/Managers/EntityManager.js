export class EntityManager {
  constructor() {
    this.entities = {};
  }

  addEntity(entity) {
    const id = entity.id;

    if (!id || this.entities[id]) {
      alert(`Ya existe una entidad con id "${id}" o el ID es inválido`);
      return false;
    }

    // Validamos que la entidad tenga un controlador asignado
    if (!entity.controller) {
      alert(`La entidad con id "${id}" no tiene controlador asignado.`);
      return false;
    }

    this.entities[id] = entity;
    return true;
  }

  removeEntity(id) {
    if (this.entities[id]) {
      delete this.entities[id];
      return true;
    }
    alert(`No se encontró la entidad con id "${id}"`);
    return false;
  }

  getAll() {
    return Object.values(this.entities);
  }

  getEntityById(id) {
    return this.entities[id] || null;
  }

  // NUEVOS MÉTODOS para el ciclo principal

  updateAll() {
    for (const entity of this.getAll()) {
      if (entity.controller && typeof entity.controller.update === 'function') {
        entity.controller.update();
      }
    }
  }

  drawAll(ctx) {
    for (const entity of this.getAll()) {
      if (entity && typeof entity.draw === 'function') {
        entity.draw(ctx);
      } else {
        console.warn(`Entidad con id ${entity.id} no tiene método draw`);
      }
    }
  }
}
