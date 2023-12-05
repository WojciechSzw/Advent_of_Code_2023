const fs = require("fs");

engine = fs.readFileSync("./engine.txt", "utf-8").split("\r\n");

let partNumbers = [];

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
engine.forEach((line, row) => {
  line.split("").forEach((czar, column) => {
    if (isNaN(czar) && czar !== ".") {
      positions.forEach((vector) => {
        const r = row + vector[1],
          c = column + vector[0];
        if (!isNaN(engine[r][c])) {
          let pos = [r, c];
          let num = "";
          for (x = 0; x < 5; x++) {
            if (!isNaN(engine[r][c - 2 + x])) {
              num = num + engine[r][c - 2 + x];
              if (x < 2 && pos[1] > c - 2 + x) {
                pos = [r, c - 2 + x];
              }
            } else if (x < 2) {
              num = "";
              pos = [r, c];
            } else if (x > 2) {
              x = 5;
            }
          }
          if (
            !partNumbers.find(
              (g) => g[0] === num && g[1][0] === pos[0] && g[1][1] === pos[1]
            )
          ) {
            partNumbers.push([num, pos]);
          }
        }
      });
    }
  });
});
let sum = 0;
partNumbers.forEach((el) => {
  sum = sum + parseInt(el[0]);
});
console.log(sum);
