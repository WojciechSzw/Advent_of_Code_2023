const fs = require("fs");
const input = fs.readFileSync("./seeds.txt", "utf-8");
let seeds = input.split("\r\n\r\n")[0].slice(7).split(" ");
let maps = input.split("\r\n\r\n");
let positions = new Array(seeds.length);

maps = maps.map((map) => {
  map = map.split("\r\n");
  map.shift();
  map = map.map((line) => line.split(" "));
  return map;
});
maps.shift();

seeds.forEach((seed, s) => {
  positions[s] = seed;
  maps.forEach((map) => {
    map.forEach((line) => {
      const cond = positions[s] - line[1];
      if (cond < line[2] && cond > -1) {
        seeds[s] = parseInt(seeds[s]) + (line[0] - line[1]);
      }
    });
    positions[s] = seeds[s];
  });
});
console.log(seeds);
