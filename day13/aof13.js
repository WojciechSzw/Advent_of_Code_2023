const { ADDRGETNETWORKPARAMS } = require("dns");
const fs = require("fs");

inputs = fs
  .readFileSync("./mirrors.txt", "utf-8")
  .split("\r\n\r\n")
  .map((x) => x.split("\r\n").map((y) => y.split("")));

console.log(inputs);
let answ = [];

inputs.forEach((input, i) => {
  console.log("line", i);
  let ansToPush = 0;
  input.forEach((row, r) => {
    if (checkIfMirr(input, r)) {
      ansToPush += r * 100;
    }
  });
  if (ansToPush === 0) {
    let colToRows = new Array(input[0].length);
    for (let x = 0; x < input[0].length; x++) {
      colToRows[x] = new Array(input.length);
      for (let y = 0; y < input.length; y++) {
        colToRows[x][y] = input[y][x];
      }
    }
    colToRows.forEach((row, r) => {
      if (checkIfMirr(colToRows, r)) {
        ansToPush += r;
      }
    });
  }
  answ.push(ansToPush);
  console.log("\r\n", ansToPush, "\r\n");
});

function checkIfMirr(input, row) {
  let smuge = false;
  if (row === 0) return false;
  else if (row <= input.length / 2) {
    for (x = 0; x < row; x++) {
      for (let i = 0; i < input[0].length; i++) {
        if (input[row - 1 - x][i] !== input[row + x][i]) {
          if (smuge) {
            return false;
          } else {
            smuge = true;
          }
        }
      }
    }
    if (smuge) {
      return true;
    } else {
      return false;
    }
  } else if (row > input.length / 2) {
    for (x = 0; x < input.length - row; x++) {
      for (let i = 0; i < input[0].length; i++) {
        if (input[row - 1 - x][i] !== input[row + x][i]) {
          if (smuge) {
            return false;
          } else {
            smuge = true;
          }
        }
      }
    }
    if (smuge) {
      return true;
    } else {
      return false;
    }
  }
}

console.log(answ.reduce((acc, cur) => acc + cur));
