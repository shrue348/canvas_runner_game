/**
 * Барьеры
 */
import { display } from './index';

export class Barrier {
  width: number;
  height: number;
  x: number;
  y: number;
  speed: number;

  constructor (width: number, height: number, x: number, y: number, speed: number) {
    this.width = width ? width : 3;
    this.height = this.width;
    this.x = x ? x : 0;
    this.y = y ? y : 0;
    this.speed = speed ? speed / 20 : 1;
  }

  draw (): void {
    this.x = this.x + this.speed;
    this.y = this.y + this.speed;

    display.buffer.fillStyle = 'grey';
    display.buffer.fillRect(this.x, this.y, this.width, this.height);

    if (this.x > display.buffer.canvas.width) this.x = -this.width;
    if (this.y > display.buffer.canvas.height) this.y = -this.height;
  }
}
