// js/main.js
import { WindowController } from "./Controladores/WindowController.js";
import { EntityCreatorController } from './Controladores/EntityCreatorController.js';
import { EntityManager } from './Managers/EntityManager.js';
import { EntitySelectionController } from './Controladores/EntitySelectionController.js';
import { IdGenerator } from "./utils/IdGenerator.js";
import { ColorController } from './Controladores/ColorController.js';
import { MoveController } from './Controladores/MoveController.js';

function main() {
  const manager = new EntityManager();
  const idGenerator = new IdGenerator();

  const buttonsContainer = document.getElementById('buttons-container');
  const selectionController = new EntitySelectionController(buttonsContainer, manager);
  const moveController = new MoveController();

  moveController.init(); // <--- Agrega esta línea para escuchar teclas

  selectionController.onSelectionChange(selectedEntity => {
    moveController.setSelectedEntity(selectedEntity);
  });

  const colorController = new ColorController(selectionController);

  const creator = new EntityCreatorController(null, manager, selectionController, idGenerator);

  const app = new WindowController(745, 400, manager, selectionController, moveController);

  creator.canvas = app.getCanvas();
  creator.init();

  app.start();
}

window.onload = main;
