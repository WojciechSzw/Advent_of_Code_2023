const fs = require("fs");

const inpt = fs.readFileSync("./timedist.txt", "utf8").split("\r\n");
const times = inpt[0].slice(5).trim().split("     ");
const distances = inpt[1].slice(9).trim().split("   ");

console.log(times);
console.log(distances);
let answ1 = new Array(distances.length).fill(0);

times.forEach((time, d) => {
  const t = parseInt(time);
  for (let s = 0; s < t; s++) {
    const x = (t - s) * (s * 1);
    if (x > distances[d]) {
      answ1[d]++;
    }
  }
});
console.log(answ1.reduce((acc, cur) => acc * cur));

//part2
const time2 = times.reduce((acc, cur) => acc + cur);
const dist2 = distances.reduce((acc, cur) => acc + cur);
let answ2 = 0;
// XD:
// for (let s = 0; s < time2; s++) {
//   const x = (time2 - s) * (s * 1);
//   if (x > dist2) {
//     answ2++;
//   }
// }

answ2 = time2;
let x = 0;
i = 0;

while (x < dist2) {
  i++;
  x = (time2 - i) * (i * 1);
}

answ2 = answ2 - i + 1;
i = 0;
x = 0;

while (x < dist2) {
  i++;
  x = i * (time2 - i);
}

answ2 = answ2 - i;
console.log(time2);
console.log(dist2);
console.log(answ2);
