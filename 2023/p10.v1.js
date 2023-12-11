const fs = require("fs");

const map = fs
  .readFileSync("p10.input", "utf8")
  .split("\r\n")
  .map((s) => s.split(""));

const STARTING = "S";
const UP = ["|", "7", "F"];
const DOWN = ["|", "L", "J"];
const LEFT = ["-", "F", "L"];
const RIGHT = ["-", "7", "J"];

function findTheStartingPositions(map) {
  const startingPositions = [];
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y] === STARTING) {
        startingPositions.push([x, y]);
      }
    }
  }
  return startingPositions;
}

function getCharFromPosition([x, y], map) {
  if (x < 0) return ".";
  if (y < 0) return ".";
  if (x >= map.length) return ".";
  if (y >= map[0].length) return ".";
  return map[x][y];
}

async function findTheFarthestPosition(_map) {
  const map = [..._map.map((m) => [...m])];

  const startingPositions = findTheStartingPositions(map);

  if (startingPositions.length === 0) return 0;

  for (const [x, y] of startingPositions) {
    const posLeft = [x, y - 1];
    const posRight = [x, y + 1];
    const posUp = [x - 1, y];
    const posDown = [x + 1, y];

    if (UP.includes(getCharFromPosition(posUp, map))) map[posUp[0]][posUp[1]] = "S";
    if (DOWN.includes(getCharFromPosition(posDown, map))) map[posDown[0]][posDown[1]] = "S";
    if (LEFT.includes(getCharFromPosition(posLeft, map))) map[posLeft[0]][posLeft[1]] = "S";
    if (RIGHT.includes(getCharFromPosition(posRight, map))) map[posRight[0]][posRight[1]] = "S";
    map[x][y] = ".";
  }

  return new Promise((r) => {
    setTimeout(async () => r(1 + (await findTheFarthestPosition(map))));
  });
}

findTheFarthestPosition(map).then((r) => console.log(r - 1));
