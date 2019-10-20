import 'babel-polyfill';
import './../sass/styles.scss';

import { controller } from './controller';
import { Label } from './Label';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { Map } from './map';
import { Snow } from './Snow';
import { AssetManager } from './Assets';
import { Animator } from './Animator';

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
import '../images/BG.png';
import '../images/Sign_1.png';
import '../images/Sign_2.png';
import '../images/SnowMan.png';
import '../images/Crystal.png';
import '../images/Tree_1.png';
import '../images/Tree_2.png';
import '../images/Stone.png';
import '../images/IceBox.png';
import '../images/Igloo.png';
import '../images/icon-petshop.png';
import '../images/bird.png';

import '../images/left.png';
import '../images/right.png';
import '../images/jump.png';
import '../images/restart.png';

// import '../audio/back.mp3';

/**
 * Размер тайла
 */
export const tileSize = 64;

/**
 * Аудио
 */
// export let soundBack = new Audio();
// soundBack.src = '../audio/back.mp3';
// soundBack.volume = .7;
// soundBack.addEventListener('canplay', e => setTimeout(() => {
//   soundBack.play();
// }, 2000));

/**
 * Настройки экрана и буфера для него
 */
interface IDisplay {
  buffer: any;
  output: any;
  message: HTMLElement;
  message2: HTMLElement;
  buffer_output_ratio: number;
  boundingRectangle: any;
  clear: () => void;
  render: () => void;
  resize: (event?: any) => void;
}

export let display: IDisplay = {
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
  resize: (event) => {
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
let player = new Player(0 /* очков =) */);

/**
 * TODO: Создаем врагов
 */
let enemy = new Enemy(6);

/**
 * TODO: Создаем монетки
 */
// let stars: Array<Star> = [];
// let star = new Star(9);
// stars.push(star);
// let star = new Image();
// star.src = './images/icon-petshop.png';

/**
 * Создаем очки и лейблы на кнопки
 */
export let labels: Array<Label> = [];
let score = new Label(
	'score',
	'0',
	28,
	'sans-serif',
	'white',
	60,
	50,
	false
);
labels.push(score);

let pslogo = new Image();
pslogo.src = '../images/icon-petshop.png';

/**
 * Создаем карту
 */
let map = new Map();

/**
 * Создаем снег
 */
let snow = new Snow();

/**
 * Запускаем новую игру
 * в игроке сбрасываем очки, координаты и ускорение
 * в карте сбрасываем координаты и экраны
 */
let startNewGame = () => {
  player.startNewGame();
  map.startNewGame();

  controller.buttons[0].isShow = false;
  controller.buttons[1].isShow = true;
  if (controller.buttons[2]) controller.buttons[2].isShow = true;
  if (controller.buttons[3]) controller.buttons[3].isShow = true;

  labels[0].text = '0';
};
// @ts-ignore
window.start = startNewGame;

/**
 * Такт игры
 */
let gameLoop = (): void => {
  if (controller.restart && player.isDead) startNewGame();
	/**
	 * Обнуляем карту
	 */
  display.clear();

  map.drawMap();
  snow.drawSnow();

  if (!player.isDead) player.draw(map);
  else player.draw_die();
  enemy.draw();

  player._testEnemyCollision(enemy, map);

  display.buffer.fillStyle = '#1f2529';
  display.buffer.fillRect(0, 640, 640, 256);
  controller.buttons.forEach((item: { draw: () => void; }) => item.draw());
  labels.forEach(item => item.draw());
  display.buffer.drawImage(pslogo, 20, 26, 28, 28);

  /**
   * Рендерим буфер в канву
   */
  display.render();
  window.requestAnimationFrame(gameLoop);
};

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
 * Колбек animationframe
 */
window.requestAnimationFrame = (() => {
  return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		// @ts-ignore
		window.mozRequestAnimationFrame ||
		// @ts-ignore
		window.oRequestAnimationFrame ||
		// @ts-ignore
		window.msRequestAnimationFrame ||
		function (callback: TimerHandler): void {
  window.setTimeout(callback, 1000 / 30);
};
})();

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
  '../images/BG.png'
];
let assets = new AssetManager();
for (let item in assetsSources) {
  assets.add(item);
}
// assets.downloadAll(() => console.log('download assets complete!'));

/**
 * Старт
 */
display.resize();
gameLoop();
