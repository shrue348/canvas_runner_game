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
 * Текстура табличка
 */
let textureAlert = new Image();
textureAlert.src = `/images/Sign_1.png`;

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
 * Текстура иглу
 */
let textureIgloo = new Image();
textureIgloo.src = `/images/Igloo.png`;

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
    0, 0, 0, 0, 0, 0, 0, 18, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 99,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 14, 16,
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
    99, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
    0, 0, 0, 0, 0, 0, 0, 0, 0, 99,
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
    0, 0, 0, 0, 0, 0, 0, 0, 99, 0,
    0, 14, 15, 16, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 14, 16, 0, 0, 0, 0, 0, 0, 0,
    18, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
    {
      texture: textureAlert,
      coords: [220, 485],
      size: [87, 94]
    },
    {
      texture: textureIgloo,
      coords: [340, 485],
      size: [255, 100]
    }
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
      coords: [140, 475],
      size: [96, 105]
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
      coords: [190, 438],
      size: [114, 140]
    },
    {
      texture: textureStone,
      coords: [10, 538],
      size: [62, 39]
    }
  ],
  [ // 4
    {
      texture: textureTrees,
      coords: [205, 437],
      size: [182, 140]
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
    },
    {
      texture: textureIcebox,
      coords: [364, 461],
      size: [39, 39]
    },
    {
      texture: textureIcebox,
      coords: [408, 461],
      size: [39, 39]
    },
    {
      texture: textureIcebox,
      coords: [378, 422],
      size: [39, 39]
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
  mapPartsArr: Array<any>; // массив экранов учавствующих в игре
  mapStartX: number; // левый край карты
  mapDifficultyMultipler: number; // кол-во тактов игры
  speed: number; // скорость сдвига слева
  globalShift: number; // глобальный сдвиг мира (влево)
  globalBackShift: number; // глобальный сдвиг фона (влево)

  constructor () {
    this.mapParts = [1, randomInt(2, mapPartsArr.length - 1), randomInt(2, mapPartsArr.length - 1)];
    this.mapPartsArr = [[...mapPartsArr[1]],[...mapPartsArr[this.mapParts[1]]],[...mapPartsArr[this.mapParts[2]]]];
    this.mapStartX = 0;
    this.mapDifficultyMultipler = 0;
    this.speed = 3;
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
   * Добавляем звезду в каждый четный индекс экрана если там ее нет
   */
  _addStar = () => {
    let index = this.mapParts[this.mapParts.length - 1],
      arr = mapPartsArr[index];

    if (index % 2 === 0 && !arr.some((el: number) => el === 99)) {
      let i = randomInt(0, 20);
      arr[i] = 99;
    }
  }

  /**
   * Удаляем звезду с уходящего экрана чтоб в сл раз добавить ее на новом месте
   */
  // _removeStar = () => {
  //   let index = this.mapParts[0],
  //     arr = mapPartsArr[index];

  //   for (let i = 0; i < arr.length; i++) {
  //     if (arr[i] === 99) {
  //     	console.log(`removeStar on index ${index}-${i}`)
  //     	arr[i] = 0;
  //     }
  //   }
  // }

  _addScreen = () => { 	
	  //this._removeStar();
    this.mapParts.shift();
    this.mapPartsArr.shift();
  	this.globalShift = 0;
    this.mapParts.push(randomInt(0, mapPartsArr.length - 1));
    this.mapPartsArr.push([...mapPartsArr[this.mapParts[2]]])
    //this._addStar();
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
    display.buffer.drawImage(textures[19], this.globalBackShift, 0, 1290, screenHeight * tileSize);
    display.buffer.drawImage(textures[19], this.globalBackShift + 1290, 0, 1290, screenHeight * tileSize);

    /**
     * Для каждой части карты
     */
    for (let p = 0; p < this.mapPartsArr.length; p++) {
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
    if (this.globalBackShift <= -1290) {
      this.globalBackShift = 0;
    }

    /**
     * Карта уехала на экран вправо
     * сдвигаем на 0
     * первый экран из 3х в this.mapParts удаляем и добавляем в конец раномный экран из массива mapPartsArr от 1 до последнего (0 экран - финиш)
     */
    if (this.globalShift < -screenWidth * tileSize) {
      this._addScreen();
    }

    /**
     * Повышаем скорость
     */
    if (Math.random() < 1 - Math.pow(.993, (this.mapDifficultyMultipler) % 200 / 250) && this.speed < 9) {
      // this.speed += .4;
    }

    // display.message2.innerHTML = 'globalShift: ' + this.globalShift;
  }
}
