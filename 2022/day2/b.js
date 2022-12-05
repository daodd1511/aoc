const fs = require('fs');

const response = {
    'X': 1,
    'Y': 2,
    'Z': 3,
}

const INTEND = {
    'X': 'lose',
    'Y': 'draw',
    'Z': 'win',
}

const LOST_AGAINST = {
    'A': 'Z',
    'B': 'X',
    'C': 'Y',
}

const WIN_AGAINST = {
    'A': 'Y',
    'B': 'Z',
    'C': 'X',
}

const DRAW_AGAINST = {
    'A': 'X',
    'B': 'Y',
    'C': 'Z',
}


const POINT = {
    'win': 6,
    'draw': 3,
    'loss': 0,
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const input = data.split('\n');
  const grouped = input.map((line) => line.split(' '));
  console.log(grouped);
  let point = 0;
  grouped.forEach((group) => {
    if (INTEND[group[1]] === 'draw') {
        const choice = DRAW_AGAINST[group[0]];
        point += POINT.draw + response[choice];
    }
    if (INTEND[group[1]] === 'win') {
        const choice = WIN_AGAINST[group[0]];
        point += POINT.win + response[choice];
    }
    if (INTEND[group[1]] === 'lose') {
        const choice = LOST_AGAINST[group[0]];
        point += POINT.loss + response[choice];
    }
  })
  console.log(point);
});