const fs = require("fs");

const input = fs
  .readFileSync("./springs.txt", "utf-8")
  .split("\r\n")
  .map((x) => x.split(" "));

const springs = input.map((x) => x[0]);
const guideline = input.map((x) => x[1].split(",").map((n) => parseInt(n)));
let answ1 = 0;
// console.log(springs, guideline);
// console.log(springs[0].length);

function allPosibilites(inGuide, length) {
  let possible = [""];
  let guide = [...inGuide];

  inGuide.forEach((num) => {
    // console.log("\r\n", num);
    let newPossible = [];
    let restSum = guide.reduce((acc, cur) => acc + cur);
    restSum += guide.length - 1;

    possible.forEach((inStr, i) => {
      //   console.log([inStr]);

      for (let x = inStr.length; x <= length - restSum; x++) {
        let str = "";

        for (let y = inStr.length; y < x; y++) {
          str += ".";
        }

        for (let n = 0; n < guide[0]; n++) {
          str += "#";
        }
        if (i !== possible.length) {
          str += ".";
        }
        // console.log(inStr + str);
        newPossible.push(inStr + str);
      }
    });

    possible = [...newPossible];
    guide.shift();
  });
  possible = possible.map((str) => {
    // console.log(str);
    let newStr = str;
    for (let x = str.length; x < length; x++) {
      newStr += ".";
    }
    return newStr;
  });
  //   console.log(possible);
  return possible;
}

function howManyFit(original, possArr) {
  let toStrainArr = [...possArr];
  //   console.log(toStrainArr);
  original.split("").forEach((char, c) => {
    if (char === "?") return;
    for (let x = 0; x < toStrainArr.length; x++) {
      if (toStrainArr[x][c] !== char) {
        toStrainArr.splice(x, 1);
        x--;
      }
    }
  });
  //   console.log(original)
  //   console.log(possArr);
  console.log(toStrainArr);
  return toStrainArr.length;
}

// console.log(springs);
// console.log(guideline);

springs.forEach((spring, i) => {
  answ1 += howManyFit(spring, allPosibilites(guideline[i], spring.length));
});
console.log(answ1);
