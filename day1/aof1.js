const fs = require("fs");

const codes = fs.readFileSync("./hidden_codes.txt", "utf-8").split("\r\n");
sum(codes);

function sum(codes) {
  let sum = 0;
  const wordNumbers = new Map([
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
  ]);

  const lines = codes.map((line) => {
    let indexLeftNumber = line.length;
    let leftNumber;
    let indexRightNumber = line.length;
    let rightNumber;

    [...wordNumbers.keys()].forEach((key) => {
      const lineReversed = line.split("").reverse().join("");
      const keyReversed = key.split("").reverse().join("");
      if (line.indexOf(key) < indexLeftNumber && line.indexOf(key) !== -1) {
        indexLeftNumber = line.indexOf(key);
        leftNumber = wordNumbers.get(key);
      }

      if (
        lineReversed.indexOf(keyReversed) < indexRightNumber &&
        lineReversed.indexOf(keyReversed) !== -1
      ) {
        indexRightNumber = lineReversed.indexOf(keyReversed);
        rightNumber = wordNumbers.get(key);
      }
    });
    sum = sum + (leftNumber * 10 + rightNumber);
  });

  console.log(sum);
}
