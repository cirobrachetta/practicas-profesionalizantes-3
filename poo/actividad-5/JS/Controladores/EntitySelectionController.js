export class EntitySelectionController {
  constructor(containerElement, entityManager) {
    this.containerElement = containerElement;
    this.entityManager = entityManager;
    this.selectedEntity = null;
    this.selectionListeners = []; // <- NUEVO
  }

  onSelectionChange(callback) {
    this.selectionListeners.push(callback);
  }

  notifySelectionChanged() {
    this.selectionListeners.forEach(cb => cb(this.selectedEntity));
  }

  updateButtons() {
    this.containerElement.innerHTML = '';

    const entities = this.entityManager.getAll();

    entities.forEach(entity => {
      const btn = document.createElement('button');
      btn.textContent = entity.name || `Entidad-${entity.id}`;
      btn.dataset.entityId = entity.id;

      if (this.selectedEntity && this.selectedEntity.id === entity.id) {
        btn.style.backgroundColor = 'lightblue';
      }

      btn.addEventListener('click', () => {
        this.selectEntityById(entity.id);
      });

      this.containerElement.appendChild(btn);
    });
  }

  selectEntityById(id) {
    const entity = this.entityManager.getEntityById(id);
    if (entity) {
      this.selectedEntity = entity;
      this.updateButtons();
      this.notifySelectionChanged(); // <- NOTIFICAMOS
    }
  }

  getSelectedEntity() {
    return this.selectedEntity;
  }
}
