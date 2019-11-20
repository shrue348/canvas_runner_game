// AI
// @ts-ignore
const brain = require('brain.js');

const config = {
  binaryThresh: 0.5,
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
}
export  const net = new brain.NeuralNetwork(config)

// @ts-ignore
window.net = net;

