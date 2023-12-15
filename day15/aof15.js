const fs = require("fs");

const strings = fs.readFileSync("strings.txt", "utf-8").split(",");
let answer1 = [];

strings.forEach((x) => {
  let answToPush = 0;
  x.split("").forEach((y) => {
    answToPush += y.charCodeAt(0);
    answToPush *= 17;
    answToPush %= 256;
  });
  answer1.push(answToPush);
});

console.log(answer1.reduce((acc, cur) => acc + cur));
