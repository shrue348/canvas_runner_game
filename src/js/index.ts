import 'babel-polyfill';
import './../sass/styles.scss';

import { controller } from './controller';
import { Button } from './Button';
import { Label } from './Label';
import { Player } from './Player';
import { Barrier } from './Barrier';
import { Map } from './map';
import { Snow } from './Snow';
import { AssetManager } from './Assets';

import { randomInt } from './helper';

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
import '../images/Sign_2.png';
import '../images/SnowMan.png';
import '../images/Crystal.png';
import '../images/Tree_1.png';
import '../images/Tree_2.png';
import '../images/Stone.png';
import '../images/IceBox.png';

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
    display.output.canvas.width = Math.floor(document.documentElement.clientWidth - 32);
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
 * Создаем барьеры
 */
let barriers: Array<Barrier> = [];

/**
 * TODO: Создаем врагов
 */

/**
 * TODO: Создаем монетки
 */

/**
 * Создаем очки и лейблы на кнопки
 */
export let labels: Array<Label> = [];
let score = new Label(
	'score',
	'0',
	30,
	'sans-serif',
	'white',
	30,
	50,
	false
);
labels.push(score);
let leftBtnLabel = new Label('leftBtnLabel', '🢤', 70,'sans-serif', 'white', 60, 760, false)
labels.push(leftBtnLabel);
let rightBtnLabel = new Label('rightBtnLabel', '🢥', 70,'sans-serif', 'white', 225, 760, false)
labels.push(rightBtnLabel);
let jumpBtnLabel = new Label('jumpBtnLabel', 'JUMP', 70,'sans-serif', 'white', 385, 760, false)
labels.push(jumpBtnLabel);

/**
 * Создаем карту
 */
let map = new Map();

/**
 * Создаем снег
 */
let snow = new Snow();

/**
 * Такт игры
 */
let gameLoop = (): void => {
	/**
	 * Обнуляем карту
	 */
  display.clear();

  map.drawMap();
  snow.drawSnow();

  if(!player.isDead) player.draw(map);
  else player.draw_die();

  // barriers.forEach(item => item.draw());
  controller.buttons.forEach((item: { draw: () => void; }) => item.draw());
  labels.forEach(item => item.draw());

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
