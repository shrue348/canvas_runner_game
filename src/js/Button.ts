import { display } from './index';

export class Button {
  name: string;
  active: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  texture: any;
  isShow: boolean;

  constructor (name: string, x: number, y: number, width: number, height: number, texture: string, isShow?: boolean) {
    this.name = name;
    this.active = false;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.texture = new Image();
    this.texture.src = texture;
    this.isShow = isShow ;
  }

  containsPoint (x: number, y: number): boolean {
    if (this.isShow) {
      if (x < this.x || x > this.x + this.width || y < this.y || y > this.y + this.width) {
        return false;
      }
      return true;
    } else return false;
  }

  draw (): void {
    // display.buffer.fillStyle = this.color;
    // display.buffer.fillRect(this.x, this.y, this.width, this.height);
    if (this.isShow) {
      if (this.active) display.buffer.globalAlpha = 0.67;

      display.buffer.drawImage(this.texture, this.x, this.y, this.width, this.height);
      display.buffer.globalAlpha = 1;
    }
  }
}
