import { display, tileSize } from './index';
import { randomInt } from './helper';

export let floor = {
  width: 640,
  height: 30,
  x: 0,
  y: 574
};

export let mapPartsArr = [
  [ // 0
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 14, 16,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 14, 16, 0,
    2, 2, 2, 3, 0, 0, 1, 2, 2, 2
  ],
  [ // 1
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 14, 15, 16, 0, 0, 0, 0, 0,
    0, 14, 16, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 14, 16, 0, 0,
    14, 16, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 2, 2, 2, 3, 0, 1, 2
  ],
  [ // 2
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 14, 15, 16, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 2, 2, 2, 3, 0, 1, 2
  ],
  [ // 3
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 14, 16, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 3, 0, 1, 2, 2, 3, 0, 1, 2
  ],
  [ // 4
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 14, 16, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 2, 2, 2, 3, 0, 1, 2
  ],
  [ // 5
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 14, 15, 15, 16, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 14, 16, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 14, 16, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 3, 0, 1, 3, 0, 1, 2
  ],
  [ // 6
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 14, 15, 16, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 14, 15, 16, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    14, 16, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 3, 0, 0, 1, 2, 3, 0, 1, 2
  ]
];

let screenSizeArr: Array<number> = [10, 10],
  screenWidth = screenSizeArr[0],
  screenHeight = screenSizeArr[1];

let textures: Array<any> = [];

for (let i = 0; i < 18; i++) {
  let texture = new Image();
  texture.src = `/images/${i}.png`;
  textures.push(texture);
}

/**
 * Фон индекс 18
 */
let background = new Image();
background.src = '/images/BG.png';
textures.push(background);

export class Map {
  mapParts: Array<number>; // ссылки на массив частей карты (при уезжании за экран влево первый элемент убирается и добавляется рандомно новый)
  mapStartX: number; // левый край карты
  mapDifficultyMultipler: number; // кол-во тактов игры
  speed: number; // скорость сдвига слева
  globalShift: number; // глобальный сдвиг мира (влево)
  globalBackShift: number; // глобальный сдвиг фона (влево)

  constructor () {
    this.mapParts = [0, 1, 2];
    this.mapStartX = 0;
    this.mapDifficultyMultipler = 0;
    this.speed = 0;
    this.globalShift = 0;
    this.globalBackShift = 0;
  }

  drawMap = (): void => {
    /**
     * Рисуем небо
     */
    display.buffer.fillStyle = '#8ed0ff';
    display.buffer.fillRect(0, 0, display.buffer.canvas.width, display.buffer.canvas.width);

    /**
     * Рисуем фон
     */
    display.buffer.drawImage(textures[18], this.globalBackShift, 0, 1290, screenHeight * tileSize);
    display.buffer.drawImage(textures[18], this.globalBackShift + 1290, 0, 1290, screenHeight * tileSize);

    /**
     * Для каждой части карты
     */
    for (let p = 0; p < this.mapParts.length; p++) {
      let map = mapPartsArr[this.mapParts[p]],
        mapPartShiftX = tileSize * 10 * p;

      /**
       * Рисуем речку
       */
      for (let r = 0; r < screenWidth; r++) {
        display.buffer.drawImage(textures[17], (r % screenWidth) * tileSize + mapPartShiftX + this.globalShift, 9.5 * tileSize, tileSize, tileSize);
      }

      /**
       * Заполняем тайлы текстурой
       */
      for (let i = 0; i < map.length; i++) {
        if (map[i] > 0) {
          display.buffer.drawImage(textures[map[i]], (i % screenWidth) * tileSize + mapPartShiftX + this.globalShift, Math.floor(i / screenWidth) * tileSize, tileSize, tileSize);
        }
      }
    }

    this.globalShift -= this.speed;
    this.globalBackShift -= this.speed * 1.22;

    /**
     * Фон уезжает за экран
     * сбрасываем сдвиг на 0
     */
    if (this.globalBackShift <= -1290) {
      this.globalBackShift = 0;
    }

    /**
     * Карта уехала на экран вправо
     * сдвигаем на 0
     * первый экран из 3х в this.mapParts удаляем и добавляем в конец раномный экран из массива mapPartsArr
     */
    if (this.globalShift <= -screenWidth * tileSize) {
      this.globalShift = 0;

      this.mapParts.shift();
      this.mapParts.push(randomInt(0, mapPartsArr.length - 1));
    }

    /**
     * Повышаем скорость
     */
    this.mapDifficultyMultipler ++;

    if (Math.random() < 1 - Math.pow(.993, (this.mapDifficultyMultipler) % 200 / 200)) {
      // console.log('speed up!')
      // this.speed += .4;
    }
  }
}
