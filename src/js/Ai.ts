// AI
const brain  = require('brain.js');

export const net = new brain.NeuralNetwork({
	 hiddenLayers: [256, 128, 64, 32, 16]
});

// @ts-ignore
window.net = net;

