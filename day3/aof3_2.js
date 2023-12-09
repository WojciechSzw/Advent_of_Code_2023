const fs = require("fs");
const { findSourceMap } = require("module");

engine = fs.readFileSync("./engine.txt", "utf-8").split("\r\n");
let answ2 = [];

const positions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

engine.forEach((line, l) => {
  line.split("").forEach((char, c) => {
    if (char === "*") {
      answ2.push(findIfGear(l, c));
    }
  });
});

function findIfGear(row, col) {
  let numPos = [];
  let gearSet = new Set();

  positions.forEach((vec) => {
    if (!isNaN(engine[row + vec[0]][col + vec[1]])) {
      numPos.push([[row + vec[0]], [col + vec[1]]]);
    }
  });
  if (numPos.length < 2) return 0;

  numPos.forEach((pos) => {
    let num = "";

    for (x = 0; x < 5; x++) {
      if (!isNaN(engine[pos[0]][pos[1] - 2 + x])) {
        num = num + engine[pos[0]][pos[1] - 2 + x];
      } else if (x < 2) {
        num = "";
      } else if (x > 2) {
        x = 5;
      }
    }
    gearSet.add(num);
  });
  if (gearSet.size < 2) return 0;

  return [...gearSet][0] * [...gearSet][1];
}

console.log(answ2.reduce((a, c) => a + c));
