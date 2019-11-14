// AI
import { controller } from './controller';
// import { player } from './index';

const brain = require('brain.js');

export const net = new brain.NeuralNetwork({
	 hiddenLayers: [128, 64]
});


// net.train([
// { input: [0, 0], output: [0] },
// { input: [0, 1], output: [1] },
// { input: [1, 0], output: [1] },
// { input: [1, 1], output: [0] }
// ]);

// net.train([
//   { input: [0, 0], output: [0] }
// ]);

// network.train([
// 	{ input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },
//   { input: { r: 0.1, g: 0.84, b: 0.72 }, output: { light: 1 } },
//   { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
//   { input: { r: 0.74, g: 0.78, b: 0.86 }, output: { light: 1 } },
//   { input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
//   { input: { r: 1, g: 0.99, b: 0 }, output: { light: 1 } },
//   { input: { r: 1, g: 0.42, b: 0.52 }, output: { dark: 1 } },
// ])

// net.train([
// 	{ input: { x: 50 }, output: { up: 0 } },
// 	{ input: { x: 600 }, output: { up: 1 } }
// ]);
console.log('train');
// let output = net.run([1, 0]);  // [0.987]

// @ts-ignore
window.net = net;
// @ts-ignore
window.controller = controller;
