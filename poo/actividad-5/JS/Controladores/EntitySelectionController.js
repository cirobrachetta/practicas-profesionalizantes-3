export class EntitySelectionController {
  constructor(selectElement, entityManager) {
    this.selectElement = selectElement;
    this.entityManager = entityManager;
    this.selectedEntity = null;

    this.selectElement.addEventListener('change', this.handleSelectionChange.bind(this));
  }

  handleSelectionChange() {
    const id = this.selectElement.value;
    this.selectedEntity = this.entityManager.entities[id] || null;
  }

  updateSelectOptions() {
    // Limpia y reconstruye las opciones
    this.selectElement.innerHTML = `<option value="">-- Ninguna --</option>`;
    for (const id in this.entityManager.entities) {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = id;
      this.selectElement.appendChild(option);
    }
  }

  getSelectedEntity() {
    return this.selectedEntity;
  }
}
