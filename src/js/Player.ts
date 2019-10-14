import { context, size, labels } from './index';
import { floor } from './map';
import { controller } from './controller';

// класс игрока

export class Player {
  width: number;
  height: number;
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  speed: number;
  xVelocity: number;
  yVelocity: number;
  jumping: boolean;
  controller: any;
  score: number;
  texture: any;

	/**
	 * @param width ширина игрока
	 * @param height высота игрока равна ширине
	 * @param x координата по горизонтали
	 * @param y коорддината по вертикали
	 * @param speed скорость
	 * @param xVelocity иннерция
	 * @param yVelocity гравитация
	 */
  constructor (core: number) {
    this.width = 76;
    this.height = 53;
    this.x = 50;
    this.y = 100;
    this.oldY = this.y;
    this.speed = 1;
    this.yVelocity = 0;
    this.jumping = true;
    this.controller = controller;
    this.texture = new Image();
    this.texture.src = '/images/dog.png';
  }

  get bottom (): number { return this.y + this.height; }
  get left (): number { return this.x; }
  get top (): number { return this.y; }
  get right (): number { return this.x + this.width; }

  /**
   * Коллизия с любым прямоугольником
   */
  testPlatformCollision (rectangle: any): boolean {
    if (this.top > rectangle.y + rectangle.height || this.right < rectangle.x || this.bottom < rectangle.y || this.left > rectangle.x + rectangle.width) {
      return false;
    }
    return true;
  }

  resolveFloorCollision (): void {
    console.log('resolve');
    this.y = floor.y - this.height;
    this.x = 50;
    this.yVelocity = 0;
    this.jumping = false;
  }

  draw (): void {
    context.fillStyle = '#ff0000';
    context.fillRect(this.x, this.y, this.width, this.height);
    // context.drawImage(this.texture, this.x, this.y, this.width, this.height);

    /**
     * ЛКМ
     */
    if (this.controller.mouse === true) {
      this.x = this.controller.pointerX - (this.width / 2);
      this.y = this.controller.pointerY - (this.height);
    }

    /**
     * ПКМ
     */
    if (this.controller.reset === true) {
      this.x = 50;
      this.y = 50;
    }

    /**
     * Прыжок
     */
    if (this.controller.up && !this.jumping) {
      this.yVelocity = -13;
      this.jumping = true;
      labels[0].increment();
    }

    /**
     * Жмем вниз
     */
    // if (this.controller.down) { }

    /**
     * Гравитация
     */
    if (this.yVelocity < 20) this.yVelocity += .8;
    this.y += this.yVelocity;

    /**
     *  Коллизии c полом
     */
    if (this.testPlatformCollision(floor)) {
      this.resolveFloorCollision();
    }

    // телеметрия
    let tileX = Math.floor((this.x + this.width * 0.5) / size);
    let tileY = Math.floor((this.y + this.height) / size);
    // document.querySelector('p').innerHTML = '<br>tileX: ' + tileX + '<br>tileY: ' + tileY + '<br>map index: ' + tileY + ' * ' + widthMiltipler + ' + ' + tileX + ' = ' + String(valueAtIndex) + '<br>tile value: ' + map[tileY * widthMiltipler + tileX];

    // трение / торможение
    this.xVelocity *= .9;
    this.xVelocity *= .9;

  }
}
