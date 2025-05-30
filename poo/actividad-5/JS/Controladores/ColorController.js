export class ColorController {
  constructor(selectionController) {
    this.selectionController = selectionController;
    this.colorPicker = document.getElementById('color-picker');

    this.init();
  }

  init() {
    // Mostrar/ocultar el color picker
    document.getElementById('toggle-color-picker').addEventListener('click', () => {
      const visible = this.colorPicker.style.display === 'block';
      this.colorPicker.style.display = visible ? 'none' : 'block';
    });

    // Aplicar el color seleccionado
    document.getElementById('apply-selected-color').addEventListener('click', () => {
      const selectedEntity = this.selectionController.getSelectedEntity();
      if (selectedEntity) {
        selectedEntity.color = this.colorPicker.value;
        selectedEntity.useDynamicColor = false;
      } else {
        alert('Selecciona una entidad primero.');
      }
    });

    // Activar modo dinámico
    document.getElementById('set-dynamic-color').addEventListener('click', () => {
      const selectedEntity = this.selectionController.getSelectedEntity();
      if (selectedEntity) {
        selectedEntity.useDynamicColor = true;
      } else {
        alert('Selecciona una entidad primero.');
      }
    });
  }
}
