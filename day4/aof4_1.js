const fs = require("fs");

let cards = fs.readFileSync("./scratch_cards.txt", "utf-8").split("\r\n");
let WiningNums, ScratchedNums;

cards = cards.map((card) => {
  return card.slice(10);
});
WiningNums = cards.map((card) =>
  card.split("|")[0].trim().split(" ").filter(Boolean)
);
ScratchedNums = cards.map((card) =>
  card.split("|")[1].trim().split(" ").filter(Boolean)
);

let overallPoints = 0;
WiningNums.forEach((singleCardNums, i) => {
  let singleCardPoints = 0;
  singleCardNums.forEach((num) => {
    if (ScratchedNums[i].find((s) => s === num)) {
      if (singleCardPoints) {
        singleCardPoints = singleCardPoints * 2;
      } else {
        singleCardPoints = 1;
      }
    }
  });
  overallPoints = overallPoints + singleCardPoints;
});
console.log(overallPoints);
