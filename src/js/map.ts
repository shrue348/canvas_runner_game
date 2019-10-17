import { display, tileSize } from './index';
import { Star } from './star';
import { randomInt } from './helper';

let screenSizeArr: Array<number> = [10, 10],
  screenWidth = screenSizeArr[0],
  screenHeight = screenSizeArr[1];

/**
 * Подгружаем текстуры тайлов и фона в массив textures
 */
let textures: Array<any> = [];
for (let i = 0; i < 18; i++) {
  let texture = new Image();
  texture.src = `/images/${i}.png`;
  textures.push(texture);
}
let background = new Image();
background.src = '/images/BG.png';
textures.push(background);

/**
 * Текстура стрелка вправо
 */
let textureArrow = new Image();
textureArrow.src = `/images/Sign_2.png`;

/**
 * Текстура снеговик
 */
let textureSnowman = new Image();
textureSnowman.src = `/images/SnowMan.png`;

/**
 * Текстура ледяной куб
 */
let textureCrystal = new Image();
textureCrystal.src = `/images/Crystal.png`;

/**
 * Текстура елки
 */
let textureTrees = new Image();
textureTrees.src = `/images/Tree_1.png`;

/**
 * Текстура елки
 */
let textureTree = new Image();
textureTree.src = `/images/Tree_2.png`;

/**
 * Текстура камень
 */
let textureStone = new Image();
textureStone.src = `/images/Stone.png`;

/**
 * Текстура ледяной куб
 */
let textureIcebox = new Image();
textureIcebox.src = `/images/IceBox.png`;

/**
 * Массив экранов для карты
 */
export let mapPartsArr = [
  [ // 0 (finish) TODO: запилить финиш

  ],
  [ // 1
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 14, 16,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 2, 2, 3, 0, 0, 1, 2, 2, 2
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
    2, 2, 2, 2, 2, 2, 3, 0, 1, 2
  ],
  [ // 3
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
    14, 15, 16, 0, 0, 0, 0, 0, 0, 0,
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
    2, 2, 2, 3, 0, 1, 3, 0, 1, 2
  ],
  [ // 7
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 14, 15, 16, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    14, 16, 0, 0, 0, 14, 15, 15, 15, 16,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    2, 3, 0, 0, 1, 3, 0, 0, 0, 1
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

  ],
  [ // 1
    {
      texture: textureArrow,
      coords: [160, 485],
      size: [87, 93]
    }
  ],
  [ // 2
    {
      texture: textureSnowman,
      coords: [100, 385],
      size: [193, 210]
    },
    {
      texture: textureCrystal,
      coords: [390, 370],
      size: [97, 78]
    }
  ],
  [ // 3
    {
      texture: textureTree,
      coords: [160, 298],
      size: [228, 280]
    },
    {
      texture: textureStone,
      coords: [10, 498],
      size: [124, 78]
    }
  ],
  [ // 4
    {
      texture: textureTrees,
      coords: [145, 298],
      size: [364, 280]
    },
    {
      texture: textureCrystal,
      coords: [500, 120],
      size: [97, 78]
    }
  ],
  [ // 5
    {
      texture: textureArrow,
      coords: [345, 485],
      size: [87, 93]
    },
    {
      texture: textureStone,
      coords: [10, 498],
      size: [124, 78]
    }
  ],
  [ // 6
    {
      texture: textureIcebox,
      coords: [360, 498],
      size: [78, 78]
    }
  ],
  [ // 7
    {
      texture: textureTrees,
      coords: [300, 170],
      size: [364, 280]
    }
  ]
];

export class Map {
  mapParts: Array<number>; // ссылки на массив частей карты (при уезжании за экран влево первый элемент убирается и добавляется рандомно новый)
  mapStartX: number; // левый край карты
  mapDifficultyMultipler: number; // кол-во тактов игры
  speed: number; // скорость сдвига слева
  globalShift: number; // глобальный сдвиг мира (влево)
  globalBackShift: number; // глобальный сдвиг фона (влево)

  constructor () {
    this.mapParts = [1, 2, 3];
    this.mapStartX = 0;
    this.mapDifficultyMultipler = 0;
    this.speed = 1;
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
     * первый экран из 3х в this.mapParts удаляем и добавляем в конец раномный экран из массива mapPartsArr от 1 до последнего (0 экран - финиш)
     */
    if (this.globalShift <= -screenWidth * tileSize) {
      this.globalShift = 0;

      this.mapParts.shift();
      this.mapParts.push(randomInt(1, mapPartsArr.length - 1));
    }

    /**
     * Повышаем скорость
     */

    // if (Math.random() < 1 - Math.pow(.993, (this.mapDifficultyMultipler) % 200 / 200)) {
    //   console.log('speed up!');
    //   this.speed += .4;
    // }

    display.message2.innerHTML = 'globalShift: ' + this.globalShift;
  }
}
