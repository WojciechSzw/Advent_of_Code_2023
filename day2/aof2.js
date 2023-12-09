const fs = require("fs");

const games = fs
  .readFileSync("./games.txt", "utf-8")
  .replace(/ /g, "")
  .replace(/,/g, ";")
  .split("\r\n")
  .map((x) => x.split(":").pop().split(";"));

let answ1 = 0;
let answ2 = [];

function doTheThingPls() {
  games.forEach((game, i) => {
    let r = 0,
      g = 0,
      b = 0;

    game.forEach((draw) => {
      //draw = "1green" or "12green"
      let nr;
      if (!isNaN(draw.split("")[1])) {
        nr = parseInt(draw.split("")[0] + draw.split("")[1]);
      } else {
        nr = parseInt(draw.split("")[0]);
      }
      if (draw.indexOf("red") !== -1) {
        if (nr > r) r = nr;
      } else if (draw.indexOf("green") !== -1) {
        if (nr > g) g = nr;
      } else if (draw.indexOf("blue") !== -1) {
        if (nr > b) b = nr;
      }
    });
    console.log(r + " " + g + " " + b);
    console.log(r * g * b);
    if (r < 13 && g < 14 && b < 15) {
      answ1 = answ1 + i + 1;
    }
    answ2.push(r * g * b);
  });
  console.log(answ1);
  console.log(answ2.reduce((acc, curr) => acc + curr));
}
doTheThingPls();
