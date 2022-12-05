// Advent of code 2022 day 1
// Path: a.js
const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const nums = data.split('\n\n');
  const groupSums = nums.map((num) => {
    const numbers = num.split('\n').map(n => parseInt(n, 10));
    return numbers.reduce((acc, n) => acc + n, 0);
  });
  const max = Math.max(...groupSums);
  const topThree = groupSums.sort((a, b) => b - a).slice(0, 3);
  const sum = topThree.reduce((acc, n) => acc + n, 0);
  console.log(sum)
  
});

// Advent of code 2022 day 1

// Path: b.js

// const fs = require('fs');

// fs.readFile('./input.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const nums = data.split('

// ').map(Number);
//   const target = 2020;
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         if (nums[i] + nums[j] + nums[k] === target) {
//           console.log(nums[i] * nums[j] * nums[k]);
//           return;
//         }
//       }
//     }
//   }
// });
