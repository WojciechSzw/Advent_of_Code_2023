const fs = require("fs");

const strings = fs.readFileSync("strings.txt", "utf-8").split(",");
let boxes = new Array(256).fill().map((x) => new Map());
let answer2 = 0;

strings.forEach((x) => {
  if (x.includes("=")) {
    let label = x.split("=");
    let boxNr = 0;

    label[0].split("").forEach((c) => {
      boxNr += c.charCodeAt(0);
      boxNr *= 17;
      boxNr %= 256;
    });

    boxes[boxNr].set(label[0], label[1]);
  } else {
    let toDel = x.slice(0, -1);
    let boxNr = 0;

    toDel.split("").forEach((c) => {
      boxNr += c.charCodeAt(0);
      boxNr *= 17;
      boxNr %= 256;
    });
    boxes[boxNr].delete(toDel);
  }
});
console.log(boxes);
boxes.forEach((box, b) => {
  let l = 1;
  box.forEach((lens) => {
    answer2 += (b + 1) * l * lens;
    l++;
  });
});

console.log(answer2);
