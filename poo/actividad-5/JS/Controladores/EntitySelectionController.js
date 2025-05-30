export class EntitySelectionController {
  constructor(containerElement, entityManager) {
    this.containerElement = containerElement; // div donde se crearán botones
    this.entityManager = entityManager;
    this.selectedEntity = null;
  }

  updateButtons() {
    this.containerElement.innerHTML = ''; // limpiar botones previos

    const entities = this.entityManager.getAll();

    entities.forEach(entity => {
      const btn = document.createElement('button');
      btn.textContent = entity.name || `Entidad-${entity.id}`;
      btn.dataset.entityId = entity.id;

      if (this.selectedEntity && this.selectedEntity.id === entity.id) {
        btn.style.backgroundColor = 'lightblue'; // destacar seleccionado
      }

      btn.addEventListener('click', () => {
        this.selectEntityById(entity.id);
      });

      this.containerElement.appendChild(btn);
    });
  }

  selectEntityById(id) {
    const entity = this.entityManager.entities[id];
    if (entity) {
      this.selectedEntity = entity;
      this.updateButtons(); // para actualizar el highlight del botón seleccionado
    }
  }

  getSelectedEntity() {
    return this.selectedEntity;
  }
}
