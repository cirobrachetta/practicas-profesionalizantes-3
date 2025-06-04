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
}
