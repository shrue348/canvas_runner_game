/**
 * Барьеры
 */
import { display } from './index';
import { Animator } from './Animator';
import { randomInt, inRad } from './helper';

export class Enemy {
  height: number;
  width: number;
  x: number;
  y: number;
  xMultipler: number;
  yMultipler: number;
  speed?: number;
  animation: Animator;
  collisionModel: any;

  constructor (speed?: number) {
    this.width = 118;
    this.height = 68;
    this.x = display.buffer.canvas.width + 100;
    this.y = randomInt(50, 180);
    this.speed = speed ? speed : 1;
    this.xMultipler = 1;
    this.yMultipler = 3;

    // @ts-ignore
    this.animation = new Animator();
    this.animation.change(this.spriteSheet.frame_sets[0], 5);
    this.spriteSheet.image.src = '/images/bird.png';

    this.collisionModel = [
      [0, 29, this.width, 23],
      [20, 15, 70, 23],
      [25, 40, 60, 23]
    ];
  }

  get bottom (): number { return this.y + this.height; }
  get left (): number { return this.x; }
  get top (): number { return this.y; }
  get right (): number { return this.x + this.width; }
  get center (): Array<number> { return [this.x + this.width/2, this.y + this.height/2] }

  spriteSheet = {
    frame_sets: [[0, 1, 2, 3, 2, 1]],
    image: new Image()
  };

  draw (): void {
    this.x -= this.speed;
    this.y += Math.sin(inRad(this.x * this.xMultipler)) * this.yMultipler;
    this.animation.update();

    if (this.x < -this.width) {
      this.x = display.buffer.canvas.width + randomInt(1000, 2500);
      this.y = randomInt(50, 150);
      this.xMultipler = randomInt(.6, 1.3);
      this.yMultipler = randomInt(2, 6);
    }

    if (this.x > - this.width && this.x < display.buffer.canvas.width) {
      display.buffer.drawImage(
        this.spriteSheet.image,
        this.animation.frame * this.width,
        0,
        this.width,
        this.height,
        Math.floor(this.x),
        Math.floor(this.y),
        this.width,
        this.height
      );
    }
      
    /**
     * Рисуем модель коллизий
     */
    // this.collisionModel.forEach((element: any[]): void => {
    //   display.buffer.fillStyle = '#ff0000';
    //   display.buffer.fillRect(this.x + element[0], this.y + element[1], element[2], element[3]);
    // });

  }
}
