import 'babel-polyfill';
import './../sass/styles.scss';

import { controller } from './controller';
import { Button } from './Button';
import { Label } from './Label';
import { Player } from './Player';
import { Barrier } from './Barrier';
import { drawMap } from './map';

import { randomInt } from './helper';

export let size = 30; // размер клетки для кнопок

/**
 * Объявляем контекст игры
 */
export let context = document.querySelector('canvas').getContext('2d', { alpha: false });
context.canvas.width = 800;
context.canvas.height = 600;

/**
 * Объявляем буфер размером в контекст
 * его будем рисовать в канву
 */
export let buffer = document.createElement('canvas').getContext('2d');
buffer.canvas.width = context.canvas.width;
buffer.canvas.height = context.canvas.height;

/**
 * Создаем игрока
 */
let players: Array<Player> = [];
for (let i = 0; i < 1; i++) {
  let player = new Player(0 /* очков =) */);

  players.push(player);
}

/**
 * Создаем барьеры
 */
let barriers: Array<Barrier> = [];

/**
 * Создаем очки
 */
export let labels: Array<Label> = [];
let score = new Label(
	'score',
	'0',
	30,
	'sans-serif',
	'white',
	30,
	30,
	false
);
labels.push(score);

/**
 * Создаем кнопки
 */


/**
 * Такт игры
 */
let gameLoop = (): void => {
	/**
	 * Обнуляем карту
	 */
  context.fillStyle = '#1f2529';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  drawMap();

	/**
	 * Отрисовка
	 * игрока
	 * барьеры
	 * пол
	 * надписи
	 * кнопки
	 */
  players.forEach(item => item.draw());

  // barriers.forEach(item => item.draw());
  labels.forEach(item => item.draw());
  controller.buttons.forEach((item: { draw: () => void; }) => item.draw());

  window.requestAnimationFrame(gameLoop);
};

/**
 * Слушатели событий
 */
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
 * Старт
 */
window.requestAnimationFrame(gameLoop);
