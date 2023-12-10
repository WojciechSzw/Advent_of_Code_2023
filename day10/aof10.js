const { Console, timeLog } = require("console");
const fs = require("fs");
const { getUnpackedSettings } = require("http2");
const { json } = require("stream/consumers");

const map = fs
  .readFileSync("./map.txt", "utf-8")
  .split("\r\n")
  .map((line) => line.split(""));
const guide = {
  //guide.actType.actDir = nextDir
  "|": { 0: 0, 2: 2 },
  "-": { 1: 1, 3: 3 },
  L: { 2: 1, 3: 0 },
  J: { 2: 3, 1: 0 },
  7: { 0: 3, 1: 2 },
  F: { 0: 1, 3: 2 },
};
const dirToVec = {
  //dirs: 0up, 1right, 2down, 3left
  0: [-1, 0],
  1: [0, 1],
  2: [1, 0],
  3: [0, -1],
};
let lopPosSet = new Set();
let insideTilesSet = new Set();

function findS() {
  let posS = [];
  map.forEach((row, r) => {
    row.forEach((char, c) => {
      if (char === "S") {
        posS = [r, c];
      }
    });
  });
  return posS;
}

function countLoop() {
  let [rowS, colS] = findS();

  //foreach potential loop start:
  [
    [rowS - 1, colS],
    [rowS, colS + 1],
    [rowS + 1, colS],
    [rowS, colS - 1],
  ].forEach((pos, dir) => {
    if (!checkIfInMap(pos)) {
      return;
    }
    lopPosSet.clear();
    insideTilesSet.clear();

    console.log("new road: " + pos + " dir: " + dir);
    let actPos = pos;
    let actType = map[pos[0]][pos[1]];
    let actDir = dir; //0-up,1-right,2-down,3-left
    let loopdirs = actDir.toString();
    lopPosSet.add(JSON.stringify(actPos));

    while (actType !== "S") {
      if (actType === ".") return;

      actDir = guide[actType][actDir];
      if (actDir === undefined) return;

      actPos = [
        actPos[0] + dirToVec[actDir][0],
        actPos[1] + dirToVec[actDir][1],
      ];

      lopPosSet.add(JSON.stringify(actPos));
      loopdirs = loopdirs + actDir;

      if (!checkIfInMap(actPos)) return;
      actType = map[actPos[0]][actPos[1]];
    }

    //looking for inside tiles on right of direction:
    [...lopPosSet].forEach((pos, i) => {
      countTilesOnRight(
        pos
          .replace(/\[|\]/g, "")
          .split(",")
          .map((x) => parseInt(x)),
        parseInt(loopdirs[i])
      );
    });
    //look for inside tiles in frontof direction if next direction turns left
    loopdirs.split("").forEach((dir, i) => {
      if ((dir === 0 && loopdirs[i + 1] === 3) || dir - loopdirs[i + 1] === 1) {
        countTilesInFront(
          [...lopPosSet][i]
            .replace(/\[|\]/g, "")
            .split(",")
            .map((x) => parseInt(x)),
          parseInt(dir)
        );
      }
    });

    console.log("furthest pipe element: " + Math.ceil(loopdirs.length / 2));
    //if TilesSet hasnt -10,-10 (the marker of bumping into wall):
    if (!insideTilesSet.has(JSON.stringify([-10, -10]))) {
      console.log("inside loop elements: " + insideTilesSet.size);
    } else insideTilesSet.clear();
  });
}

function checkIfInMap(pos) {
  if (
    pos[0] < 0 ||
    pos[0] > map.length - 1 ||
    pos[1] < 0 ||
    pos[1] > map[0].length - 1
  ) {
    // console.log("not in map");
    return false;
  } else {
    // console.log("in map");
    return true;
  }
}
function countTilesOnRight(pos, dir) {
  let lookingRDir;
  if (dir === 3) {
    lookingRDir = 0;
  } else {
    lookingRDir = dir + 1;
  }
  let actPos = [
    pos[0] + dirToVec[lookingRDir][0],
    pos[1] + dirToVec[lookingRDir][1],
  ];
  let toAdd = [];

  //until actPos isnt in loop:
  while (!lopPosSet.has(JSON.stringify(actPos))) {
    //if  line of counting is out of map:
    if (!checkIfInMap(actPos)) {
      insideTilesSet.add(JSON.stringify([-10, -10])); //to see after if it was wrong set
      return;
    }
    //stacking positions of potential inside elements:
    toAdd.push(JSON.stringify(actPos));
    actPos = [
      actPos[0] + dirToVec[lookingRDir][0],
      actPos[1] + dirToVec[lookingRDir][1],
    ];
  }
  //adding stacked positions into Set:
  toAdd.forEach((posStr) => {
    insideTilesSet.add(posStr);
  });
}

function countTilesInFront(pos, dir) {
  let lookingFDir = dir;
  let actPos = [
    pos[0] + dirToVec[lookingFDir][0],
    pos[1] + dirToVec[lookingFDir][1],
  ];
  let toAdd = [];

  //until actPos isnt in loop:
  while (!lopPosSet.has(JSON.stringify(actPos))) {
    //if  line of counting is out of map:
    if (!checkIfInMap(actPos)) {
      toAdd = [];
      return;
    }

    //stacking positions of potential inside elements:
    toAdd.push(JSON.stringify(actPos));
    actPos = [
      actPos[0] + dirToVec[lookingFDir][0],
      actPos[1] + dirToVec[lookingFDir][1],
    ];
  }

  //adding stacked positions into Set:
  toAdd.forEach((posStr) => {
    insideTilesSet.add(posStr);
  });
}

countLoop();
