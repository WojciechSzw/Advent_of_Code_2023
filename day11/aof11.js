const fs = require("fs");

let map = fs
  .readFileSync("./space.txt", "utf-8")
  .split("\r\n")
  .map((x) => x.split(""));
let isGalaxyInColumn = new Array(map[0].length).fill(0);
let galaxiesPos = [];
let answ1 = 0;

for (let l = 0; l < map.length; l++) {
  const line = map[l];
  let isRowEmpty = true;
  line.forEach((pixel, p) => {
    if (pixel !== ".") {
      isRowEmpty = false;
      isGalaxyInColumn[p] = 1;
    }
  });
  if (isRowEmpty) {
    map.splice(l, 0, line);
    l++;
  }
}

let actColumn = 0;
isGalaxyInColumn.forEach((statement) => {
  if (!statement) {
    map = map.map((line) => {
      let newLine = [...line];
      newLine.splice(actColumn, 0, ".");
      return newLine;
    });
    actColumn++;
  }
  actColumn++;
});

map.forEach((line, l) => {
  line.forEach((pixel, p) => {
    if (pixel === "#") {
      galaxiesPos.push([l, p]);
    }
  });
});

galaxiesPos.forEach((pos1, i) => {
  for (let j = i + 1; j < galaxiesPos.length; j++) {
    answ1 +=
      Math.abs(galaxiesPos[j][0] - pos1[0]) +
      Math.abs(galaxiesPos[j][1] - pos1[1]);
  }
});

//print it nicely:
map.forEach((line) => {
  line.forEach((p) => {
    process.stdout.write(p);
  });
  console.log();
});
console.log(answ1);
