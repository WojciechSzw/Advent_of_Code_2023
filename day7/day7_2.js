const { error } = require("console");
const fs = require("fs");
const { isNumberObject } = require("util/types");

let cards = fs
  .readFileSync("./cards.txt", "utf-8")
  .split("\r\n")
  .map((card) => card.split(" "));

const strength = "J23456789TQKA";

// five 6
// four 5
// full 4
// three 3
// two pair 2
// one pair 1
// high card 0

for (let x = 0; x < cards.length; x++) {
  cards[x].push(checkHand(cards[x][0]));
}

function checkHand(hand) {
  let cardsSet = new Set();
  for (x = 0; x < hand.length; x++) {
    cardsSet.add(hand[x]);
  }

  let cardClass;
  const setArr = [...cardsSet];

  const cnt0 = hand.split(setArr[0]).length - 1;
  const cnt1 = hand.split(setArr[1]).length - 1;
  const cnt2 = hand.split(setArr[2]).length - 1;

  switch (setArr.length) {
    case 1:
      cardClass = 6;
      break;
    case 2:
      if (cnt0 === 1 || cnt0 === 4) {
        cardClass = 5;
      } else {
        cardClass = 4;
      }
      break;
    case 3:
      if (cnt0 === 3 || cnt1 === 3 || cnt2 === 3) {
        cardClass = 3;
      } else {
        cardClass = 2;
      }
      break;
    case 4:
      cardClass = 1;
      break;
    case 5:
      cardClass = 0;
      break;
  }
  if (cardsSet.has("J")) {
    const cntJ = hand.split("J").length - 1;
    switch (cardClass) {
      case 0:
        cardClass = 1;
        break;
      case 1:
        cardClass = 3;
        break;
      case 2:
        if (cntJ == 1) {
          cardClass = 4;
        } else {
          cardClass = 5;
        }
        break;
      case 3:
        cardClass = 5;
        break;
      case 4:
        cardClass = 6;
        break;
      case 5:
        cardClass = 6;
        break;
    }
  }
  return cardClass;
}

cards.sort((a, b) => {
  if (a[2] < b[2]) return -1;
  if (a[2] > b[2]) return 1;

  for (let x = 0; x < 5; x++) {
    if (strength.indexOf(a[0][x]) < strength.indexOf(b[0][x])) {
      return -1;
    } else if (strength.indexOf(a[0][x]) > strength.indexOf(b[0][x])) {
      return 1;
    }
  }
  return 0;
});

console.log(cards);
let answ1 = 0;
for (let x = 0; x < cards.length; x++) {
  answ1 = answ1 + cards[x][1] * (x + 1);
}
console.log(answ1);
