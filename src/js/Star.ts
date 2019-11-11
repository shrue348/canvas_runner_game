/**
 * Барьеры
 */
import { display, tileSize } from './index';
import { mapPartsArr } from './map';

// export class Star {
//   width: number;
//   height: number;
//   x: number;
//   y: number;
//   show: boolean;
//   texture: any;

//   constructor (tileNum: number) {
//     this.width = 128;
//     this.height = 128;
//     this.x = 268;
//     this.y = 28;
//     this.show = false;

//     this.texture = new Image();
//     this.texture.src = './images/icon-petshop.png';

//   }

//   /**
//    * Геттеры координат коллиззи с землей и платформами
//    */
//   get bottom (): number { return this.y + this.height; }
//   get left (): number { return this.x; }
//   get top (): number { return this.y; }
//   get right (): number { return this.x + this.width; }

//   draw (mapExample?: any): void {

//     display.buffer.drawImage(this.texture, this.x + mapExample.globalShift, this.y, 28, 28);
//   }
// }
