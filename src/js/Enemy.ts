/**
 * Барьеры
 */
import { display } from './index';
import { Animator } from './Animator';
import { randomInt } from './helper';

export class Enemy {
  height: number;
  width: number;
  x: number;
  y: number;
  speed?: number;
  animation: Animator;

  constructor (speed?: number) {
    this.width = 118;
    this.height = 68;
    this.x = display.buffer.canvas.width + 100;
    this.y = randomInt(50, 150);
    this.speed = speed ? speed : 1;

    // @ts-ignore
    this.animation = new Animator();
    this.animation.change(this.spriteSheet.frame_sets[0], 5);
    this.spriteSheet.image.src = '/images/bird.png';
  }

  get bottom (): number { return this.y + this.height; }
  get left (): number { return this.x; }
  get top (): number { return this.y; }
  get right (): number { return this.x + this.width; }

  spriteSheet = {
    frame_sets: [[0, 1, 2, 3, 2, 1]],
    image: new Image()
  };

  draw (): void {
    this.x -= this.speed;
    this.animation.update();

    if (this.x < -this.width) {
      this.x = display.buffer.canvas.width + randomInt(1000, 2500);
      this.y = randomInt(50, 150);
    }

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
}
