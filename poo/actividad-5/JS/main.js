// js/main.js
import { WindowController } from "./Controladores/WindowController.js";
import { EntityCreatorController } from './Controladores/EntityCreatorController.js';
import { EntityManager } from './Managers/EntityManager.js';


function main() {
  const entityManager = new EntityManager();
  const app = new WindowController(745, 400, entityManager);

  const canvas = app.getCanvas();
  const creator = new EntityCreatorController(canvas, entityManager);
  creator.init();

  app.start();
}
window.onload = main;
