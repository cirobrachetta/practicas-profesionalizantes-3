export class EntityManager {
  constructor() {
    this.entities = {};
  }

  addEntity(id, entity) {
    if (this.entities[id]) {
      alert(`Ya existe una entidad con id "${id}"`);
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
}
