import '../images/dog.png';
import '../images/0.png';
import '../images/1.png';
import '../images/2.png';
import '../images/3.png';
import '../images/4.png';
import '../images/5.png';
import '../images/6.png';
import '../images/7.png';
import '../images/8.png';
import '../images/9.png';
import '../images/10.png';
import '../images/11.png';
import '../images/12.png';
import '../images/13.png';
import '../images/14.png';
import '../images/15.png';
import '../images/16.png';
import '../images/17.png';
import '../images/18.png';
import '../images/BG.png';
import '../images/Tree_1.png';
import '../images/Tree_2.png';
import '../images/Tree_3.png';
import '../images/icon-petshop.png';
import '../images/bird.png';
import '../images/left.png';
import '../images/right.png';
import '../images/jump.png';
import '../images/restart.png';
import '../images/start.png';
import '../images/logo.png';

import 'babel-polyfill';
import './../sass/styles.scss';

import { controller } from './controller';
import { Label } from './Label';
import { Button } from './Button';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { Map } from './map';
import { Snow } from './Snow';
import { AssetManager } from './Assets';
import { timeStamp, wrapText } from './helper'

/**
 * Размер тайла
 */
export const tileSize = 64;
export const screenDiag = 905;

/**
 * Аудио
 */
export let soundBack = new Audio();
// soundBack.src = '../audio/back.mp3';
// soundBack.volume = 1;
// soundBack.addEventListener('canplay', e => soundBack.play());

/**
 * Настройки экрана и буфера для него
 */
interface IDisplay {
  buffer: CanvasRenderingContext2D;
  output: CanvasRenderingContext2D;
  message: HTMLElement;
  message2: HTMLElement;
  buffer_output_ratio: number;
  boundingRectangle: ClientRect | undefined;
  clear: () => void;
  render: () => void;
  resize: (event?: Event) => void;
}

export const display: IDisplay = {
  buffer:   document.createElement('canvas').getContext('2d'),
  output:   document.querySelector('canvas').getContext('2d'),
  message:  document.querySelector('p'),
  message2: document.querySelector('p.p'),
  buffer_output_ratio: 1,
  boundingRectangle: undefined,
  clear: (color?: string) => {
    display.buffer.fillStyle = color || '#1f2529';
    display.buffer.fillRect(0, 0, display.buffer.canvas.width, display.buffer.canvas.height);
  },
  render: () => {
    display.output.drawImage(display.buffer.canvas, 0, 0, display.buffer.canvas.width, display.buffer.canvas.height, 0, 0, display.output.canvas.width, display.output.canvas.height);
  },
  resize: () => {
    display.output.canvas.width = Math.floor(document.documentElement.clientWidth);
    display.output.canvas.height = Math.floor(display.output.canvas.width * 1.3);
    display.boundingRectangle = display.output.canvas.getBoundingClientRect();
    display.buffer_output_ratio = display.buffer.canvas.width / display.output.canvas.width;
  }
};

display.buffer.canvas.width = 640;
display.buffer.canvas.height = 832;

/**
 * Создаем игрока
 */
export let player = new Player(0 /* очков =) */);
player.animation.change(player.spriteSheet.frame_sets[2], 5);

/**
 * Создаем врагов
 */
export let enemy = new Enemy(6);

/**
 * Создаем очки и лейблы на кнопки
 */
let labels: Array<Label> = [];
let score = new Label(
	'score',
	player.score.toString(),
	28,
	'sans-serif',
	'#002a09',
	60,
	50,
	false
);
labels.push(score);

let desc = 'Помоги весёлому пёселю пробежать как можно дальше! Cобирай бонусы и берегись злых птиц!';
let copy = '© shure348 2019';


let pslogo = new Image();
pslogo.src = '../images/icon-petshop.png';

let logo = new Image();
logo.src = '../images/logo.png';

/**
 * Создаем карту
 */
let map = new Map();

/**
 * Создаем снег
 */
// let snow = new Snow();

let scene = 0;
controller.buttons.forEach((el: Button) => el.isShow = false);
controller.buttons[4].isShow = true;

/**
 * Запускаем новую игру
 * в игроке сбрасываем очки, координаты и ускорение
 * в карте сбрасываем координаты и экраны
 */
let startNewGame = () => {
  scene = 1;
  controller.buttons[4].isShow = false;
  player.startNewGame();
  map.startNewGame();
  enemy.x = display.buffer.canvas.width + 200;
};

/**
 * Такт игры
 */
let now,
  dt = 0,
  last = timeStamp(),
  step = 1 / 60;

let gameLoop = (): void => {
  if ((controller.restart || controller.start)) startNewGame();

  now = timeStamp();
  dt = dt + Math.min(1, (now - last) / 1000);

  while (dt > step) {
    dt = dt - step;

    display.clear();

    map.drawMap();
    // snow.drawSnow();

    enemy.speed = map.speed + 2;
    enemy.draw();
    
    if (scene === 0) {
      display.buffer.drawImage(logo, 165, 108, 316, 248);
      player.drawStart(map);
    } else {
      if (!player.isDead) player.draw(map);
      else player.drawDie();
      player._testEnemyCollision(enemy, map);
      player._testStarsCollision(map, player);
    }


		/**
     * Кнопки
     */
    display.buffer.fillStyle = '#1f2529';
    display.buffer.fillRect(0, 640, 640, 256);
    controller.buttons.forEach((item: { draw: () => void }) => item.draw());

    labels[0].text = player.score.toString();
    labels.forEach(item => item.draw());
    display.buffer.drawImage(pslogo, 20, 26, 28, 28);
  }
  
  last = now;


  if (scene === 0) {
    display.buffer.font = '27px Arial';
    display.buffer.fillStyle = '#869b98';
    display.buffer.textAlign = 'center';
    // display.buffer.fillText(desc, 320, 680, 500);
    wrapText(display.buffer, desc, 320, 690, 480, 30);

    display.buffer.font = '15px Arial';
    display.buffer.fillStyle = '#465855';
    wrapText(display.buffer, copy, 320, 820, 580, 26);
  }
  
  /**
   * Рендерим буфер в канву
   */
  display.render();
  window.requestAnimationFrame(gameLoop); 
};

// setInterval(gameLoop, 1000/60)


/**
 * Слушатели событий
 */
window.addEventListener('resize', display.resize);
window.addEventListener('mousedown', controller.keyListener);
window.addEventListener('mouseup', controller.keyListener);
window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
document.querySelector('canvas').addEventListener('touchend', controller.touchEnd, { passive: false });
document.querySelector('canvas').addEventListener('touchmove', controller.touchMove, { passive: false });
document.querySelector('canvas').addEventListener('touchstart', controller.touchStart, { passive: false });


/**
 * Загрузка ассетов
 */
let assetsSources = [
  '../images/dog.png',
  '../images/0.png',
  '../images/1.png',
  '../images/2.png',
  '../images/3.png',
  '../images/4.png',
  '../images/5.png',
  '../images/6.png',
  '../images/7.png',
  '../images/8.png',
  '../images/9.png',
  '../images/10.png',
  '../images/11.png',
  '../images/12.png',
  '../images/13.png',
  '../images/14.png',
  '../images/15.png',
  '../images/16.png',
  '../images/17.png',
  '../images/18.png',
  '../images/BG.png',
  '../images/Tree_1.png',
  '../images/Tree_2.png',
  '../images/Tree_3.png',
  '../images/icon-petshop.png',
  '../images/bird.png',
  '../images/left.png',
  '../images/right.png',
  '../images/jump.png',
  '../images/restart.png',
  '../images/start.png',
  '../images/logo.png'
];

export let assets = new AssetManager();

assetsSources.forEach(item => assets.add(item));
assets.downloadAll(() => {
  /**
   * Старт
   */
  display.resize();
  gameLoop();
});
