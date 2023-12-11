const fs = require("fs");

let map = fs
  .readFileSync("./space.txt", "utf-8")
  .split("\r\n")
  .map((x) => x.split(""));

let columnExtensions = [...Array(map[0].length).keys()];
let rowsExtensions = [];
let galaxiesPos = [];
const extension = 999999;
let answ = 0;

map.forEach((line, l) => {
  let isRowEmpty = true;
  line.forEach((pixel, p) => {
    if (pixel !== ".") {
      isRowEmpty = false;
      if (columnExtensions.indexOf(p) !== -1) {
        columnExtensions.splice(columnExtensions.indexOf(p), 1);
      }
    }
  });
  if (isRowEmpty) {
    rowsExtensions.push(l);
  }
});

/////////////////////////////////////

map.forEach((line, l) => {
  line.forEach((pixel, p) => {
    if (pixel === "#") {
      galaxiesPos.push([l, p]);
    }
  });
});

galaxiesPos.forEach((pos1, i) => {
  for (let j = i + 1; j < galaxiesPos.length; j++) {
    answ +=
      Math.abs(galaxiesPos[j][0] - pos1[0]) +
      Math.abs(galaxiesPos[j][1] - pos1[1]);
    for (let x = pos1[0] + 1; x < galaxiesPos[j][0]; x++) {
      if (rowsExtensions.find((row) => row === x)) {
        answ += extension;
      }
    }
    let bigger = 0;
    let smaller = 0;
    if (pos1[1] <= galaxiesPos[j][1]) {
      smaller = pos1[1];
      bigger = galaxiesPos[j][1];
    } else {
      smaller = galaxiesPos[j][1];
      bigger = pos1[1];
    }
    for (let x = smaller; x < bigger; x++) {
      if (columnExtensions.find((col) => col === x)) {
        answ += extension;
      }
    }
  }
});
/////////////////////////////////////

//print it nicely:
map.forEach((line) => {
  line.forEach((p) => {
    process.stdout.write(p);
  });
  console.log();
});
console.log(rowsExtensions);
console.log(columnExtensions);
console.log(answ);
