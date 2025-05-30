// js/main.js
import { WindowController } from "./Controladores/WindowController.js";
import { EntityCreatorController } from './Controladores/EntityCreatorController.js';
import { EntityManager } from './Managers/EntityManager.js';
import { EntitySelectionController } from './Controladores/EntitySelectionController.js';



function main() {
  const manager = new EntityManager();

  const selectElement = document.getElementById('entity-select');
  const selectionController = new EntitySelectionController(selectElement, manager);
  const creator = new EntityCreatorController(null, manager, selectionController);

  const app = new WindowController(745, 400, manager, selectionController);
  creator.canvas = app.getCanvas();
  creator.init();

  app.start();
}
window.onload = main;
