import { display, tileSize, labels } from './index';
import { floor, mapPartsArr } from './map';
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
  collisionModel: any;
  collision: any;

  map: any;

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
    this.isRun = true; // TODO: додлать анимацию
    this.isDead = false;
    this.controller = controller;
    this.texture = new Image();
    this.texture.src = '/images/dog.png';

    this.map = mapPartsArr[0];

    /**
     * Модель коллизий персонажа
     * считается от левого верхнего края текстуры персонажа
     * [x, y, width, height]
     */
    this.collisionModel = [
      [0, 10, 45, 43], // для пола
      [35, 0, 25, 40], // + ниже для призов и врагов
      [35, 10, 40, 16]
    ];

    // @ts-ignore
    this.animation = new Animator();

    this.collision = {
      1: (object: any, row: number, column: number): void => {
        if (this.collision.topCollision(object, row)) { return; }
        console.log(1);
      },
      topCollision (object: any, row: number): boolean {
        // console.log(row);
        if (object.yVelocity > 0) {
          let top = row * tileSize;
          if (object.y + object.height > top && object.oldY + object.height <= top) {
            object.jumping = false;
            object.yVelocity = 0;
            object.oldY = object.y = top - object.height - 0.01;
            return true;
          }
        }
        return false;
      }
    };
  }

  spriteSheet = {
    frame_sets: [[0, 1], [2, 2, 2]],
    image: new Image()
  };

  /**
   * Геттеры координат коллиззи с землей и платформами
   */
  get bottom (): number { return this.y + this.collisionModel[0][1] + this.collisionModel[0][3]; }
  get left (): number { return this.x + this.collisionModel[0][0]; }
  get top (): number { return this.y + this.collisionModel[0][1]; }
  get right (): number { return this.x + this.collisionModel[0][0] + this.collisionModel[0][3]; }

  /**
   * Коллизия героя с любым прямоугольником
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
    // this.y = floor.y - this.height;
    // this.yVelocity = 0;
    // this.jumping = false;
  }

  /**
   * @param mapExample - экземпляр карты
   */
  draw (mapExample?: any): void {
    let map = mapPartsArr[mapExample.mapParts[0]];
    // console.log(mapExample.globalShift);

    /**
     * Двигаемся влево
     */
    if (this.controller.left) {
      this.xVelocity -= 2.2;
      // display.message.innerHTML += "left ";
    }

    /**
     * Двигаемся вправо
     */
    if (this.controller.right) {
      this.xVelocity += 2.9;
      // display.message.innerHTML += "right ";
    }

    /**
     * Прыжок
     */
    if ((this.controller.up || this.controller.mouse === true || this.controller.jump === true) && !this.jumping) {
      this.yVelocity = -21;
      this.jumping = true;
      this.isRun = true;

      let soundJump = new Audio('../audio/jump.mp3');
      soundJump.addEventListener('canplay', e => soundJump.play());
    }

    /**
     * Гравитация
     */
    if (this.yVelocity < 20) this.yVelocity += 1.194;
    this.oldY = this.y;

    /**
     * Ускорение
     */
    if (this.isRun) this.x += this.xVelocity;
    this.y += this.yVelocity;

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

    /**
     * Коллизии с тайлами
     */
    if (this.y - this.oldY > 0) { // bottom collision
      let leftColumn = Math.floor((this.left + mapExample.globalShift) / tileSize);
      let bottomRow = Math.floor(this.bottom / tileSize);
      let valueAtIndex = map[bottomRow * 10 + leftColumn];
      let rightColumn = Math.floor((this.right + mapExample.globalShift) / tileSize);

      if (valueAtIndex > 0) valueAtIndex = 1;
      if (valueAtIndex > 0 && valueAtIndex !== undefined) {
        this.collision[valueAtIndex](this, bottomRow, leftColumn);
      }

      valueAtIndex = map[bottomRow * 10 + rightColumn];
      if (valueAtIndex > 0) valueAtIndex = 1;
      if (valueAtIndex > 0) {
        this.collision[valueAtIndex](this, bottomRow, rightColumn);
      }
    }

    // телеметрия
    // let tileX = Math.floor((this.x + this.width * 0.5) / tileSize);
    // let tileY = Math.floor((this.y + this.height) / tileSize);
    // display.message.innerHTML = '<br>xVelocity: ' + this.xVelocity + '<br>yVelocity: ' + this.yVelocity + '<br>X' + this.x + '<br>isRun: ' + this.isRun;

    // трение / торможение
    this.xVelocity *= .55;
    if (Math.abs(this.xVelocity) < .01) this.xVelocity = 0;
    this.xVelocity *= .9;

    /**
     * Анимашки
     */
    if (!this.isRun) {
      this.animation.change(this.spriteSheet.frame_sets[1], 15);
    } else {
      if (this.jumping) { // в прыжке замирает
        this.animation.change(this.spriteSheet.frame_sets[1], 5);
      } else if (this.xVelocity === 0) { // стоя замирает
        this.animation.change(this.spriteSheet.frame_sets[0], 5);
      } else if (this.isDead) { // конец игры
        this.animation.change(this.spriteSheet.frame_sets[1], 5);
      } else { // бежит
        this.animation.change(this.spriteSheet.frame_sets[0], 5);
      }
    }

    this.spriteSheet.image.src = '/images/dog.png';

    labels[0].increment();
    display.buffer.drawImage(this.spriteSheet.image, this.animation.frame * this.width, 0, this.width, this.height, Math.floor(this.x), Math.floor(this.y), this.width, this.height);

    /**
     * Рисуем модель коллизий
     */
    // this.collisionModel.forEach((element: any[]): void => {
    //   display.buffer.fillStyle = '#ff0000';
    //   display.buffer.fillRect(this.x + element[0], this.y + element[1], element[2], element[3]);
    // });

    this.animation.update();
  }
}
