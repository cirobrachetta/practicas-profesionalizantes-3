import { MoveController } from "./Controladores/MoveController.js";
import { Rectangle } from "./Entidades/Rectangle.js";
import { RectangleController } from './Controladores/RectangleController.js';
import { WindowController } from "./Controladores/WindowController.js";

function main() {
  const rect = new Rectangle(200, 200, 100, 50);
  const movimiento = new MoveController();
  const rectController = new RectangleController(rect, null, movimiento); // canvas lo tomará WindowController

  const app = new WindowController(745, 400, rectController);
  rectController.canvas = app.canvas; // ahora sí, lo enlazamos
  app.start();
}

window.onload = main;
