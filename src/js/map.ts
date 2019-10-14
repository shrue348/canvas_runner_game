import { context } from './index';

export let floor = {
  width: 800,
  height: 30,
  x: 0,
  y: 400
};

/**
 * Заполняем буфер тайлами
 */
export function drawMap (): void {
  /**
   * Рисуем небо
   */
  context.fillStyle = '#8ed0ff';
  context.fillRect(0, 0, context.canvas.width, floor.y);
  /**
   * Рисуем пол
   */
  context.fillStyle = '#009900';
  context.fillRect(floor.x, floor.y, context.canvas.width, floor.height);
}
