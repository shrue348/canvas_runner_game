import { context } from './index';

export let floor = {
  width: 800,
  height: 10,
  x: 0,
  y: 400
};

/**
 * Заполняем буфер тайлами
 */
export function drawFloor (): void {
  /**
   * Рисуем пол
   */
  context.fillStyle = '#fff';
  context.fillRect(floor.x, floor.y, context.canvas.width, floor.height);

  /**
   * Рисуем буфер в канву
   */
  // context.drawImage(context.canvas, 0, 0, context.canvas.width, context.canvas.height, 0, 0, context.canvas.width, context.canvas.height);
}
