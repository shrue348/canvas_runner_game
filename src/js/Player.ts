import { display, size, labels } from './index';
import { floor } from './map';
import { controller } from './controller';
import { Animator } from './Animator';

// класс игрока

export class Player {
  animation: Animator;
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
  isRun: boolean; // игра началась
  isDead: boolean; // игра закончилась
  controller: any;
  score: number;
  texture: any;
  animations: Array<Animator>;
  frameSet: any;

  constructor (core: number) {
    this.width = 76;
    this.height = 53;
    this.x = 50;
    this.y = 100;
    this.oldY = this.y;
    this.speed = 1;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.jumping = true;
    this.isRun = false;
    this.isDead = false;
    this.controller = controller;
    this.texture = new Image();
    this.texture.src = '/images/dog.png';

    // @ts-ignore
    this.animation = new Animator();
  }

  spriteSheet = {
    frame_sets: [[0, 1], [2, 2, 2]],
    image: new Image()
  };

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

  /**
   * Решаем коллизию с полом
   */
  resolveFloorCollision (): void {
    this.y = floor.y - this.height;
    this.yVelocity = 0;
    this.jumping = false;
  }

  draw (): void {

     /**
     * Двигаемся влево
     */
    if (this.controller.left) {
      this.xVelocity -= 1.9;
      //display.message.innerHTML += "left ";

    }

    /**
     * Двигаемся вправо
     */
    if (this.controller.right) {
      this.xVelocity += 2.9;
      //display.message.innerHTML += "right ";

    }

    /**
     * Прыжок
     */
    if ((this.controller.up || this.controller.mouse === true || this.controller.jump === true) && !this.jumping) {
      this.yVelocity = -17;
      this.jumping = true;
      this.isRun = true;

      labels[0].increment();
      display.message.innerHTML += "jump ";

    }

    /**
     * Гравитация
     */
    if (this.yVelocity < 20) this.yVelocity += 1.194;
    
    /**
     * Ускорение
     */
    if (this.isRun) this.x += this.xVelocity;
    this.y += this.yVelocity;

    /**
     *  Коллизии c полом
     */
    if (this.testPlatformCollision(floor)) {
      this.resolveFloorCollision();
    }

    /**
     * Коллизии с краем экрана
     */
    if (this.x < 0) {
      this.xVelocity = 0;
      this.x = 0.001;
    } else if (this.x + this.width > display.buffer.canvas.width) {
      this.xVelocity = 0;
      this.x = display.buffer.canvas.width - this.width - 0.001;
    }

    // телеметрия
    let tileX = Math.floor((this.x + this.width * 0.5) / size);
    let tileY = Math.floor((this.y + this.height) / size);
    //display.message.innerHTML = '<br>xVelocity: ' + this.xVelocity + '<br>yVelocity: ' + this.yVelocity + '<br>X' + this.x + '<br>isRun: ' + this.isRun;

    // трение / торможение
    this.xVelocity *= .55;
    if (Math.abs(this.xVelocity) < .001) this.xVelocity = 0
    this.xVelocity *= .9;


    /**
     * Анимашки
     */
    if (!this.isRun) {
      this.animation.change(this.spriteSheet.frame_sets[1], 15);
    }
    else {
      if (this.jumping) // в прыжке замирает
        this.animation.change(this.spriteSheet.frame_sets[1], 5);
      else if (this.xVelocity == 0) // стоя замирает
        this.animation.change(this.spriteSheet.frame_sets[1], 5);      
      else if (this.isDead) // конец игры
        this.animation.change(this.spriteSheet.frame_sets[1], 5);
      else //бежит
        this.animation.change(this.spriteSheet.frame_sets[0], 5);
    }

    this.spriteSheet.image.src = '/images/dog.png';

    display.buffer.drawImage(this.spriteSheet.image, this.animation.frame * this.width, 0, this.width, this.height, Math.floor(this.x), Math.floor(this.y), this.width, this.height);
    this.animation.update();

  }
}
