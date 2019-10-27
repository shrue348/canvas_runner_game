import { display, tileSize } from './index';
import { Star } from './Star';
import { randomInt } from './helper';

let screenSizeArr: Array<number> = [10, 10],
  screenWidth = screenSizeArr[0],
  screenHeight = screenSizeArr[1];

/**
 * Подгружаем текстуры тайлов и фона в массив textures
 */
let textures: Array<any> = [];
for (let i = 0; i < 19; i++) {
  let texture = new Image();
  texture.src = `/images/${i}.png`;
  textures.push(texture);
}
let background = new Image();
background.src = '/images/BG.png';
textures.push(background);

/**
 * Текстура дерево
 */
let textureTree = new Image();
textureTree.src = `/images/Tree_1.png`;

/**
 * Текстура дерево
 */
let textureTree2 = new Image();
textureTree2.src = `/images/Tree_2.png`;

/**
 * Текстура дерево
 */
let textureTree3 = new Image();
textureTree3.src = `/images/Tree_3.png`;
/**
 * Текстура монетка
 */
let star = new Image();
star.src = `/images/icon-petshop.png`;

/**
 * Массив экранов для карты
 */
export let mapPartsArr = [
  [ // 0 (finish) TODO: запилить финиш
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2
  ],
  [ // 1
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 99,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 14, 16, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 2, 2, 3, 0, 1, 2, 2
  ],
  [ // 2
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 14, 15, 16, 0, 0, 0, 0, 0,
    0, 14, 16, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 14, 16, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    3, 0, 1, 2, 2, 3, 0, 0, 1, 2
  ],
  [ // 3
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 18, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 14, 15, 16, 0, 0, 0, 0, 0, 0,
    14, 16, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 2, 2, 3, 0, 0, 1, 2
  ],
  [ // 4
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 14, 15, 16,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 14, 16, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 14, 16, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 3, 0, 1, 2, 2, 3, 0, 1, 2
  ],
  [ // 5
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 14, 16, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    14, 15, 16, 0, 0, 0, 18, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 3, 0, 0, 1, 3, 0, 1, 2
  ],
  [ // 6
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 14, 15, 15, 16, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 14, 16, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 14, 16, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 3, 0, 1, 3, 0, 0, 1
  ],
  [ // 7
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 14, 15, 16, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 14, 16, 0, 0, 0, 0, 0, 0, 0,
    18, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    14, 16, 0, 0, 0, 14, 15, 15, 15, 16,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 3, 0, 0, 1, 3, 0, 0, 0, 1
  ],
  [ // 8
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 14, 16,
    0, 0, 0, 0, 0, 0, 18, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 18, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 18, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2
  ],
  [ // 9
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 18, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 14, 15, 15, 16, 0,
    0, 14, 16, 0, 0, 0, 0, 0, 18, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 3, 0, 1, 2, 2, 2, 2
  ],
  [ // 10
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 18, 0, 0, 0, 0,
    0, 18, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 18, 0, 0, 18, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 14, 15, 15, 15, 16, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 2, 2, 2, 3, 0, 0, 1
  ],
  [ // 11
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 14, 16, 0, 0, 14, 16, 0, 0, 18,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 14, 15, 16, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 18, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 3, 0, 0, 1, 2, 2, 2, 2
  ],
  [ // 12
    0, 0, 0, 0, 0, 0, 0, 0, 0, 99,
    0, 0, 0, 0, 14, 15, 15, 15, 15, 16,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 18, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 18, 0, 0, 0, 0, 0, 0, 14, 16,
    0, 0, 0, 0, 0, 0, 14, 16, 0, 0,
    18, 0, 0, 0, 14, 16, 0, 0, 0, 0,
    0, 0, 14, 16, 0, 0, 0, 0, 0, 0,
    2, 3, 0, 0, 0, 0, 0, 0, 0, 1
  ],
  [ // 13
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 14, 16,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 14, 16, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    14, 16, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2
  ]
];

/**
 * Массив эффектов для экранов в mapPartsArr
 * texture - переменная текстуры объявлена выше
 * coords - расположение на карте для левого верхнего угла текстуры
 * size - размер текстуры в px
 */
let mapPartsEffectsArr = [
  [ // 0 (finish)
    {
      texture: textureTree,
      coords: [100, 440],
      size: [114, 140]
    },
    {
      texture: textureTree3,
      coords: [340, 440],
      size: [114, 140]
    }
  ],
  [ // 1

  ],
  [ // 2
    {
      texture: textureTree,
      coords: [200, 440],
      size: [114, 140]
    }
  ],
  [ // 3
    {
      texture: textureTree2,
      coords: [200, 440],
      size: [114, 140]
    }
  ],
  [ // 4
    {
      texture: textureTree3,
      coords: [200, 440],
      size: [114, 140]
    }
  ],
  [ // 5

  ],
  [ // 6

  ],
  [ // 7

  ],
  [ // 8
    {
      texture: textureTree3,
      coords: [10, 440],
      size: [114, 140]
    },
    {
      texture: textureTree2,
      coords: [260, 440],
      size: [114, 140]
    },
    {
      texture: textureTree,
      coords: [390, 440],
      size: [114, 140]
    }
  ],
  [ // 9

  ],
  [ // 10

  ],
  [ // 11
    {
      texture: textureTree2,
      coords: [290, 440],
      size: [114, 140]
    },
    {
      texture: textureTree,
      coords: [490, 440],
      size: [114, 140]
    }
  ],
  [ // 12

  ],
  [ // 13

  ]
];

export class Map {
  mapParts: Array<number>; // ссылки на массив частей карты (при уезжании за экран влево первый элемент убирается и добавляется рандомно новый)
  mapPartsArr: Array<number[]>; // массив экранов учавствующих в игре
  mapStartX: number; // левый край карты
  mapDifficultyMultipler: number; // кол-во тактов игры
  speed: number; // скорость сдвига слева
  globalShift: number; // глобальный сдвиг мира (влево)
  globalBackShift: number; // глобальный сдвиг фона (влево)

  constructor () {
    this.mapParts = [1, randomInt(2, mapPartsArr.length - 1), randomInt(2, mapPartsArr.length - 1)];
    this.mapPartsArr = [[...mapPartsArr[this.mapParts[0]]],[...mapPartsArr[this.mapParts[1]]],[...mapPartsArr[this.mapParts[2]]]];
    this.mapStartX = 0;
    this.mapDifficultyMultipler = 0;
    this.speed = 0;
    this.globalShift = 0;
    this.globalBackShift = 0;
  }

  startNewGame = () => {
    this.mapParts = [1, randomInt(2, mapPartsArr.length - 1), randomInt(2, mapPartsArr.length - 1)];
    this.mapPartsArr = [[...mapPartsArr[1]],[...mapPartsArr[this.mapParts[1]]],[...mapPartsArr[this.mapParts[2]]]];
    this.mapStartX = 0;
    this.mapDifficultyMultipler = 0;
    this.speed = 3;
    this.globalShift = 0;
    this.globalBackShift = 0;
  }

  /**
   * Добавляем или нет звезду
   */
  _addStar = () => {
    let x = randomInt(1, 10);

    if (x < 6) {
      let n = randomInt(0, 19);
      if (this.mapPartsArr[2][n] === 0) this.mapPartsArr[2][n] = 99;
    }
  }

  /**
   * Добавляем кость
   */
  _addBone = () => {
    //
  }

  _addScreen = () => {
    this.mapParts.shift();
    this.mapPartsArr.shift();
  	this.globalShift = -1; // -1 потому что меняем с 0 (иначе 2 одинаковых кадра кадра подряд)
    this.mapParts.push(randomInt(0, mapPartsArr.length - 1));
    this.mapPartsArr.push([...mapPartsArr[this.mapParts[2]]]);
    this._addStar();
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
    display.buffer.drawImage(textures[19], this.globalBackShift, 0, 1920, screenHeight * tileSize);
    display.buffer.drawImage(textures[19], this.globalBackShift + 1920, 0, 1920, screenHeight * tileSize);

    /**
     * Для первых двух частей карты (только они попадают во вьюпорт)
     */
    for (let p = 0; p < this.mapPartsArr.length - 1; p++) {
      let map = this.mapPartsArr[p],
        mapEffects = mapPartsEffectsArr[this.mapParts[p]],
        mapPartShiftX = tileSize * 10 * p;

      /**
       * Рисуем речку
       */
      for (let r = 0; r < screenWidth; r++) {
        display.buffer.drawImage(textures[17], (r % screenWidth) * tileSize + mapPartShiftX + this.globalShift, 9.5 * tileSize, tileSize, tileSize);
      }

      /**
       * Добавляем елочки-снеговики
       */
      for (let r = 0; r < mapEffects.length; r++) {
        let effect = mapEffects[r];
        display.buffer.drawImage(effect.texture, effect.coords[0] + mapPartShiftX + this.globalShift, effect.coords[1], effect.size[0], effect.size[1]);
      }

      /**
       * Заполняем тайлы текстурой
       */
      for (let i = 0; i < map.length; i++) {
        if (map[i] > 0 && map[i] !== 99 /** не звезда */) {
          display.buffer.drawImage(textures[map[i]], (i % screenWidth) * tileSize + mapPartShiftX + this.globalShift, Math.floor(i / screenWidth) * tileSize, tileSize, tileSize);
        }

        if (map[i] === 99 /** звезда */) {
          display.buffer.drawImage(star, (i % screenWidth) * tileSize + mapPartShiftX + this.globalShift, Math.floor(i / screenWidth) * tileSize, tileSize, tileSize);
        }
      }
    }

    this.globalShift -= this.speed;
    this.globalBackShift -= this.speed * 1.22;

    /**
     * Фон уезжает за экран
     * сбрасываем сдвиг на 0
     */
    if (this.globalBackShift <= -1920) {
      this.globalBackShift = 0;
    }

    /**
     * Карта уехала на экран вправо
     * сдвигаем на -1
     * первый экран из 3х в this.mapParts удаляем и добавляем в конец раномный экран из массива mapPartsArr от 1 до последнего (0 экран - финиш)
     */
    if (this.globalShift < -screenWidth * tileSize) {
      this._addScreen();
    }

    /**
     * Повышаем скорость
     */// эталон 0.1 /  if (Math.random() < 1 - Math.pow(.993, (this.mapDifficultyMultipler) % 200 / 250) && this.speed < 9) {
    if (Math.random() < 1 - Math.pow(.993, (this.mapDifficultyMultipler) % 200 / 280) && this.speed < 9) {
      this.speed += .4;
    }
  }
}
