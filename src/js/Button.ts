import { display } from './index';

export class Button {
  name: string;
  active: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor (name: string, x: number, y: number, width: number, height: number, color: string) {
    this.name = name;
    this.active = false;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  containsPoint (x: number, y: number): boolean {
    if (x < this.x || x > this.x + this.width || y < this.y || y > this.y + this.width) {
      return false;
    }
    return true;
  }

  draw (): void {
    display.buffer.fillStyle = this.color;
    display.buffer.fillRect(this.x, this.y, this.width, this.height);
  }
}
