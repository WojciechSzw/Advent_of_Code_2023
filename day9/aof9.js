const fs = require("fs");

let lines = fs.readFileSync("./lines.txt", "utf-8").split("\r\n");
lines = lines.map((x) => x.split(" "));
console.log(lines);
let answ1 = 0;
let answ2 = 0;

function findNext(i) {
  let newLine = [lines[i]];
  let isAllzeros = false;
  while (!isAllzeros) {
    isAllzeros = true;
    let currLvl = newLine[newLine.length - 1];
    newLine.push([]);
    for (let x = 1; x < currLvl.length; x++) {
      const diff = currLvl[x] - currLvl[x - 1];
      newLine[newLine.length - 1].push(diff);
      //if now or before in this for is all zeros was false
      //then line cant be all zeros
      if (diff !== 0 || !isAllzeros) {
        isAllzeros = false;
      }
    }
  }
  let next = 0;
  for (let x = newLine.length - 2; x >= 0; x--) {
    next = next + parseInt(newLine[x][newLine[x].length - 1]);
  }

  return next;
}

lines.forEach((line, i) => {
  answ1 = answ1 + findNext(i);
});
lines = lines.map((x) => x.reverse());
lines.forEach((line, i) => {
  answ2 = answ2 + findNext(i);
});
console.log("answ1: " + answ1);
console.log("answ2: " + answ2);
