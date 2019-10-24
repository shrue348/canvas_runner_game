import { display, tileSize, labels } from './index';
import { mapPartsArr } from './map';
import { controller } from './controller';
import { Animator } from './Animator';
import { Enemy } from './Enemy';

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
    this.score = 0;
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
      [4, 10, 38, 43], // для пола
      [35, 0, 25, 40], // + ниже для призов и врагов
      [35, 10, 40, 16]
    ];

    // @ts-ignore
    this.animation = new Animator();

    this.collision = {
      1: (object: any, row: number, column: number): void => {
        if (this.collision.topCollision(object, row)) { return; }
      },
      topCollision (object: any, row: number): boolean {
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
  _testPlatformCollision (rectangle: any): boolean {
    if (this.top > rectangle.y + rectangle.height || this.right < rectangle.x || this.bottom < rectangle.y || this.left > rectangle.x + rectangle.width) {
      return false;
    }
    return true;
  }

  _testRectanglesCollision (rectangle1: any, rectangle2: any): boolean {
    if (rectangle1.x + rectangle1.width < rectangle2.x || rectangle1.x > rectangle2.x + rectangle2.width || rectangle1.y + rectangle1.height < rectangle2.y || rectangle1.y > rectangle2.y + rectangle2.height) {
      return false;
    }
    return true;
  }

  /**
   * mapPartsArr - карты экранов
   * @param map- экземпляр карты
   */
  _testStarsCollision (map: any, player: Player): boolean {
    for (let a = 0; a < 3; a ++) {
      let mapPartShiftX = tileSize * 10 * a;

      for (let i = 0; i < mapPartsArr[map.mapParts[0]].length; i++) {
        if (mapPartsArr[map.mapParts[0]][i] === 99) {
          let obj = {
            x: (i % 10) * tileSize + map.globalShift + mapPartShiftX,
            y: Math.floor(i / 10) * tileSize,
            width: tileSize,
            height: tileSize
          };

          for (let p = 0; p < this.collisionModel.length; p++) {
            if (this._testRectanglesCollision({
              x: this.x + this.collisionModel[p][0],
              y: this.y + this.collisionModel[p][1],
              width: this.collisionModel[p][2],
              height: this.collisionModel[p][3]
            }, obj)) {

              player.score += 300;
              mapPartsArr[map.mapParts[0]][i] = 0;
            }
          }
        }
      }
    }

    return false;
  }

  /**
   * TODO: сделать тест с моделью коллизий врага
   * @param enemy экземпляр Enemy
   * @param mapExample
   */
  _testEnemyCollision (enemy: Enemy, mapExample: any): void {
    if (!this.isDead) {
      if (this._testPlatformCollision(enemy)) this.die(mapExample);
    }
  }

  /**
   * Старт новой игры
   */
  startNewGame = (): void => {
    console.log('start new game');
    this.x = 50;
    this.y = 100;
    this.score = 0;
    this.isDead = false;
    this.animation.change(this.spriteSheet.frame_sets[0], 5);
  }

  die (mapExample?: any) {
    this.isDead = true;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.animation.change(this.spriteSheet.frame_sets[1], 15);

    this.controller.buttons[0].isShow = true;
    this.controller.buttons[1].isShow = false;
    if (this.controller.buttons[2]) this.controller.buttons[2].isShow = false;
    if (this.controller.buttons[3]) this.controller.buttons[3].isShow = false;

    if (mapExample) {
      mapExample.mapDifficultyMultipler = 0;
      mapExample.speed = 0;
    }
  }

  /**
   * Анимация концовки игры
   */
  draw_die (): void {
    if (this.controller.reset) {
      this.startNewGame();
    }

    this.xVelocity = 0;
    if (!this.jumping) {
      this.yVelocity -= 15;
      this.jumping = true;
    }

    if (this.yVelocity < 20) this.yVelocity += 1.194;
    this.oldY = this.y;
    this.y += this.yVelocity;

    display.buffer.drawImage(this.spriteSheet.image, this.animation.frame * this.width, 0, this.width, this.height, Math.floor(this.x), Math.floor(this.y), this.width, this.height);
  }

  /**
   * @param mapExample - экземпляр карты
   */
  draw (mapExample?: any): void {
    /**
     * если мертв return из функции
     */
    if (this.isDead) {
      display.buffer.drawImage(this.spriteSheet.image, this.animation.frame * this.width, 0, this.width, this.height, Math.floor(this.x), Math.floor(this.y), this.width, this.height);
      return;
    }

    /**
     * Двигаемся влево
     */
    if (this.controller.left) {
      this.xVelocity -= 2.2;
    }

    /**
     * Двигаемся вправо
     */
    if (this.controller.right) {
      this.xVelocity += 2.9;
    }

    /**
     * Прыжок
     */
    if ((this.controller.up || this.controller.jump === true) && !this.jumping) {
      this.yVelocity = -21;
      this.jumping = true;
      this.isRun = true;

      // let soundJump = new Audio('../audio/jump.mp3');
      // soundJump.addEventListener('canplay', e => soundJump.play());
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

    /*
     * Коллизии с водой (смерть)
     */
    if (this.bottom > 639) {
      this.die(mapExample);
    }

    /**
     * Коллизии с тайлами
     * считаем для 2х тайлов - под левым и правым краем персонажа
     * mapExample.globalShift - глобальный сдвиг карты относительно лево-верх вьюпорта
     * mapIndex - индекс в массиве экрана - нужен чтобы знать в каком экране искать значение тайла
     */
    if (this.y - this.oldY > 0) { // bottom collision
      let leftColumn = Math.floor((this.left - mapExample.globalShift) / tileSize);
      let rightColumn = Math.floor((this.right - mapExample.globalShift) / tileSize);
      let bottomRow = Math.floor(this.bottom / tileSize);

      let mapIndex = 0;
      if (leftColumn >= 10) {
        mapIndex = Math.floor(leftColumn / 10);
        leftColumn = Math.floor(leftColumn % 10);
      }

      let map = mapPartsArr[mapExample.mapParts[mapIndex]];
      let valueAtIndex = map[bottomRow * 10 + leftColumn];

      display.message2.innerHTML = '' + valueAtIndex;

      if (valueAtIndex !== 99) {
        if (valueAtIndex > 0) valueAtIndex = 1;
        if (valueAtIndex > 0 && valueAtIndex !== undefined) {
          this.collision[valueAtIndex](this, bottomRow, leftColumn);
        }
      }

      if (rightColumn >= 10) {
        mapIndex = Math.floor(rightColumn / 10);
        rightColumn = Math.floor(rightColumn % 10);
      }
      map = mapPartsArr[mapExample.mapParts[mapIndex]];
      valueAtIndex = map[bottomRow * 10 + rightColumn];

      if (valueAtIndex !== 99) {
        if (valueAtIndex > 0) valueAtIndex = 1;
        if (valueAtIndex > 0) {
          this.collision[valueAtIndex](this, bottomRow, rightColumn);
        }
      }

      // display.message.innerHTML = 'currentScreen: ' + leftColumn + ' ' + rightColumn + ' ' + mapIndex;
    }

    // телеметрия
    // let tileX = Math.floor((this.x + this.width * 0.5) / tileSize);
    // let tileY = Math.floor((this.y + this.height) / tileSize);
    // display.message.innerHTML = '<br>xVelocity: ' + this.xVelocity + '<br>yVelocity: ' + this.yVelocity + '<br>X' + this.x + '<br>isRun: ' + this.isRun;

    // трение / торможение
    this.xVelocity *= .55;
    if (Math.abs(this.xVelocity) < .01) this.xVelocity = 0;
    // this.xVelocity *= .9;

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

    this.score ++;

    display.buffer.drawImage(this.spriteSheet.image, this.animation.frame * this.width, 0, this.width, this.height, Math.floor(this.x), Math.floor(this.y), this.width, this.height);

    this.animation.update();
    if (!this.isDead) mapExample.mapDifficultyMultipler ++;

  /**
   * Рисуем модель коллизий
   */
    // this.collisionModel.forEach((element: any[]): void => {
    //   display.buffer.fillStyle = '#ff0000';
    //   display.buffer.fillRect(this.x + element[0], this.y + element[1], element[2], element[3]);
    // });

  }
}
