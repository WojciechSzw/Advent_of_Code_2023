const fs = require("fs");
const { blob } = require("stream/consumers");
const input = fs.readFileSync("./directions.txt", "utf-8").split("\r\n\r\n");
const directions = input[0];
let ins = input[1].split("\r\n");
ins = ins.map((x) =>
  x
    .replaceAll(/[=,()]/gi, "")
    .split(" ")
    .filter(Boolean)
);

const instructions = {};

for (let i = 0; i < ins.length - 1; ++i) {
  instructions[ins[i][0]] = [ins[i][1], ins[i][2]];
}

part1();
function part1() {
  let curr = "AAA";
  let x = 0;

  while (1) {
    if (dir(x) === "L") {
      curr = instructions[curr][0];
    } else if (dir(x) === "R") {
      curr = instructions[curr][1];
    }

    if (curr === "ZZZ") {
      console.log(x + 1);
      return;
    }
    x++;
  }
}

function part2() {
  let answ2 = [];
  let beginings = Object.keys(instructions).filter((x) => x[2] === "A");
  beginings.forEach((start) => {
    let curr = start;
    let x = 0;
    while (1) {
      // console.log(curr);
      // console.log(instructions[curr]);
      // console.log(dir(x));
      if (dir(x) === "L") {
        curr = instructions[curr][0];
      } else if (dir(x) === "R") {
        curr = instructions[curr][1];
      }

      if (curr[2] === "Z") {
        answ2.push([x + 1]);

        // console.log(answ2.reduce());

        return;
      }
      x++;
    }
  });

  return answ2;
}
function lcm(n1, n2) {
  return (n1 * n2) / gcd(n1, n2);
}

function gcd(n1, n2) {
  if (n1 == 0) {
    return n2;
  } else {
    return gcd(n2 % n1, n1);
  }
}

function dir(nr) {
  return directions[nr % directions.length];
}

console.log(part2().reduce(lcm));
