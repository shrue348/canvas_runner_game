import { display } from './index';

export let floor = {
  width: 600,
  height: 30,
  x: 0,
  y: 600
};

/**
 * Заполняем буфер тайлами
 */
export function drawMap (): void {
  /**
   * Рисуем небо
   */
  display.buffer.fillStyle = '#8ed0ff';
  display.buffer.fillRect(0, 0, display.buffer.canvas.width, floor.y);

  /**
   * Рисуем пол
   */
  display.buffer.fillStyle = '#009900';
  display.buffer.fillRect(floor.x, floor.y, display.buffer.canvas.width, floor.height); 

  /**
   * Рисуем перспективу пола
   */
  display.buffer.fillStyle = '#009900';
  display.buffer.fillRect(floor.x, floor.y - 15, display.buffer.canvas.width, 15);
}
