// js/main.js
import { WindowController } from "./Controladores/WindowController.js";
import { EntityCreatorController } from './Controladores/EntityCreatorController.js';
import { EntityManager } from './Managers/EntityManager.js';
import { EntitySelectionController } from './Controladores/EntitySelectionController.js';
import { IdGenerator } from "./utils/IdGenerator.js";
import { ColorController } from './Controladores/ColorController.js';

function main() {
  const manager = new EntityManager();

  // Contenedor donde irán los botones para seleccionar entidades
  const buttonsContainer = document.getElementById('buttons-container');

  const selectionController = new EntitySelectionController(buttonsContainer, manager);

  const colorController = new ColorController(selectionController);

  const idGenerator = new IdGenerator();

  const creator = new EntityCreatorController(null, manager, selectionController, idGenerator);

  const app = new WindowController(745, 400, manager, selectionController);

  // Asignar el canvas del WindowController al creador de entidades
  creator.canvas = app.getCanvas();

  // Inicializar los eventos de creación y eliminación de entidades
  creator.init();

  app.start();
}

window.onload = main;
