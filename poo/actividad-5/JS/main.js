// js/main.js
import { WindowController } from "./Controladores/WindowController.js";
import { EntityCreatorController } from './Controladores/EntityCreatorController.js';
import { EntityManager } from './Managers/EntityManager.js';
import { EntitySelectionController } from './Controladores/EntitySelectionController.js';
import { IdGenerator } from "./utils/IdGenerator.js";



function main() {
  const manager = new EntityManager();

  const buttonsContainer = document.getElementById('buttons-container');
  const selectionController = new EntitySelectionController(buttonsContainer, manager);
  const idGenerator = new IdGenerator();
  const creator = new EntityCreatorController(null, manager, selectionController, idGenerator);

  const app = new WindowController(745, 400, manager, selectionController);
  creator.canvas = app.getCanvas();
  creator.init();

  app.start();
}
window.onload = main;
