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
 * Объявляем буфер размером в контекст
 * его будем рисовать в канву
 */
export let buffer = document.createElement('canvas').getContext('2d');
buffer.canvas.width = 800
buffer.canvas.height = 600

/**
 * Объявляем контекст игры
 */
let context = document.querySelector('canvas').getContext('2d');

interface IDisplay {
	buffer: any,
	output: any,
	message: HTMLElement,
	buffer_output_ratio: number,
	boundingRectangle: any,
	clear: () => void,
	render: () => void,
	resize: (event?: any) => void,

}

export let display: IDisplay = {
	buffer: document.createElement("canvas").getContext("2d"),
	output: document.querySelector("canvas").getContext("2d"),
	message: document.querySelector("p"),
	buffer_output_ratio: 1,
	boundingRectangle: undefined,
	clear: (color?: string) => {
    display.buffer.fillStyle = color || "#1f2529";
    display.buffer.fillRect(0, 0, display.buffer.canvas.width, display.buffer.canvas.height);
  },
  render: () => {
    display.output.drawImage(display.buffer.canvas, 0, 0, display.buffer.canvas.width, display.buffer.canvas.height, 0, 0, display.output.canvas.width, display.output.canvas.height);
  },
  resize: (event) => {
    display.output.canvas.width = Math.floor(document.documentElement.clientWidth - 32);

    if (display.output.canvas.width > document.documentElement.clientHeight) {
      display.output.canvas.width = Math.floor(document.documentElement.clientHeight);
    }

    // display.output.canvas.height = Math.floor(display.output.canvas.width * 0.6875);
    display.output.canvas.height = Math.floor(display.output.canvas.width * 1.3);
    display.boundingRectangle = display.output.canvas.getBoundingClientRect();
    display.buffer_output_ratio = display.buffer.canvas.width / display.output.canvas.width;
  }
}

display.buffer.canvas.width = 600
display.buffer.canvas.height = 780


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
  display.clear();
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

	display.render();
  window.requestAnimationFrame(gameLoop);
};

let resize = (): void => {
	var client_height = document.documentElement.clientHeight;

	context.canvas.width = document.documentElement.clientWidth - 32;

	if (context.canvas.width > client_height) {
		context.canvas.width = client_height;
	}

	context.canvas.height = Math.floor(context.canvas.width * 0.75);
}

/**
 * Слушатели событий
 */
window.addEventListener("resize", display.resize);
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
display.resize();
gameLoop();

