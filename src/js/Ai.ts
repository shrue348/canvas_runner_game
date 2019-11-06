// AI

const brain = require("brain.js")
export const network: any = new brain.recurrent.LSTMTimeStep({
  inputSize: 2,
  hiddenLayers: [10],
  outputSize: 2,
})

// network.train([[1, 3], [2, 2], [3, 1]])

// network.train([
// 	{ input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },
//   { input: { r: 0.1, g: 0.84, b: 0.72 }, output: { light: 1 } },
//   { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
//   { input: { r: 0.74, g: 0.78, b: 0.86 }, output: { light: 1 } },
//   { input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
//   { input: { r: 1, g: 0.99, b: 0 }, output: { light: 1 } },
//   { input: { r: 1, g: 0.42, b: 0.52 }, output: { dark: 1 } },
// ])

// const result = network.run({ r: 0, g: 1, b: 1 })
// console.log(result)


// const trainingData = [
//   'Jane saw Doug.',
//   'Doug saw Jane.',
//   'Spot saw Doug and Jane looking at each other.',
//   'It was love at first sight, and Spot had a frontrow seat. It was a very special moment for all.'
// ];

// const lstm = new brain.recurrent.LSTM();
// const result = lstm.train(trainingData, {
//   iterations: 1500,
//   log: (details: any) => console.log(details),
//   errorThresh: 0.011
// });

// const run1 = lstm.run('Jane');
// const run2 = lstm.run('Doug');
// const run3 = lstm.run('Spot');
// const run4 = lstm.run('It');

// console.log('run 1: Jane' + run1);
// console.log('run 2: Doug' + run2);
// console.log('run 3: Spot' + run3);
// console.log('run 4: It' + run4);


// let input = document.querySelector('input'),
//     res = document.querySelector('.res');

// input.addEventListener('keyup', function(e){
//   if (e.key == 'Enter') {
//     let obj = {
//       r: Number(e.target.value.split(',')[0]),
//       g: Number(e.target.value.split(',')[1]),
//       b: Number(e.target.value.split(',')[2])
//     }
//     let init = network.run(obj)

//     console.log(obj)
//     res.innerText = 'light: ' + init.light + ', dark: ' + init.dark 
//   }
// })
