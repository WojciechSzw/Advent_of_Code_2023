const fs = require("fs");

let cards = fs.readFileSync("./scratch_cards.txt", "utf-8").split("\r\n");

cards = cards.map((card) => {
  return card.slice(10);
});
let winingNums = cards.map((card) =>
  card.split("|")[0].trim().split(" ").filter(Boolean)
);
let scratchedNums = cards.map((card) =>
  card.split("|")[1].trim().split(" ").filter(Boolean)
);
let wins = new Array(cards.length).fill(0);
let instances = new Array(cards.length).fill(1);

winingNums.forEach((singleCardNums, i) => {
  singleCardNums.forEach((num) => {
    if (scratchedNums[i].find((s) => s === num)) {
      wins[i]++;
    }
  });
  for (wn = 1; wn < wins[i] + 1; wn++) {
    instances[i + wn] = instances[i + wn] + instances[i];
  }
});
console.log(
  instances.reduce((accumulator, currentValue) => accumulator + currentValue)
);
