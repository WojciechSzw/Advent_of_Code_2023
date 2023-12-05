const fs = require("fs");
const input = fs.readFileSync("./seeds.txt", "utf-8");
let seeds = input.split("\r\n\r\n")[0].slice(7).split(" ");
let maps = input.split("\r\n\r\n");
maps = maps.map((map) => {
  map = map.split("\r\n");
  map.shift();
  map = map.map((line) => line.split(" "));
  return map;
});
maps.shift();
let seedsBefore = [];
let seedsAfter = [];
for (let x = 0; x < seeds.length; x = x + 2) {
  seedsBefore.push([
    parseInt(seeds[x]),
    parseInt(seeds[x + 1]) + parseInt(seeds[x]) - 1,
  ]);
}

maps.forEach((map) => {
  seedsAfter = [];
  while (seedsBefore[0]) {
    const toCheck = seedsBefore[0];
    checkThisSeed(map, toCheck);
    seedsBefore.shift();
  }
  seedsBefore = seedsAfter;
});

let min = seedsAfter[0][0];
for (let x = 0; x < seedsAfter.length; x++) {
  if (seedsAfter[x][0] < min) {
    min = seedsAfter[x][0];
  }
}
console.log(min);

function checkThisSeed(map, seed) {
  let stop = false;
  map.forEach((line) => {
    const l = [parseInt(line[0]), parseInt(line[1]), parseInt(line[2])];
    if (l[1] > seed[0] && l[1] < seed[1] && !stop) {
      seedsBefore.push([seed[0], l[1] - 1]);
      seedsBefore.push([l[1], seed[1]]);
      stop = true;
    } else if (l[1] <= seed[0] && !stop) {
      if (l[1] + l[2] - 1 >= seed[1]) {
        seedsAfter.push([seed[0] + (l[0] - l[1]), seed[1] + (l[0] - l[1])]);
        stop = true;
      } else if (l[1] + l[2] - 1 > seed[0]) {
        seedsAfter.push([seed[0] + (l[0] - l[1]), l[0] + l[2] - 1]);
        seedsBefore.push([l[1] + l[2] - 1, seed[1]]);
        stop = true;
      }
    }
  });
  if (!stop) {
    seedsAfter.push(seed);
  }
}
