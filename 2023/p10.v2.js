const fs = require("fs");

const map = fs
  .readFileSync("p10.input", "utf8")
  .split("\r\n")
  .map((s) => s.split(""));

const STARTING = "S";
const CONNECT_DOWN = ["|", "7", "F"];
const CONNECT_UP = ["|", "L", "J"];
const CONNECT_RIGHT = ["-", "F", "L"];
const CONNECT_LEFT = ["-", "7", "J"];

function findTheStartingPosition(map) {
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y] === STARTING) {
        return [x, y];
      }
    }
  }
  return null;
}

function getCharFromPosition([x, y], map) {
  if (x < 0) return ".";
  if (y < 0) return ".";
  if (x >= map.length) return ".";
  if (y >= map[0].length) return ".";
  return map[x][y];
}

function cleanWrongWays(_map) {
  const map = [..._map.map((m) => [...m])];

  let hasAdjusted = true;

  while (hasAdjusted === true) {
    hasAdjusted = false;

    for (let x = 0; x < map.length; x++) {
      for (let y = 0; y < map[x].length; y++) {
        const pipe = getCharFromPosition([x, y], map);

        if (CONNECT_RIGHT.includes(pipe)) {
          const posRight = [x, y + 1];
          const pipeRight = getCharFromPosition(posRight, map);
          if (pipeRight === "S") continue;
          if (!CONNECT_LEFT.includes(pipeRight)) {
            map[x][y] = ".";
            hasAdjusted = true;
          }
        }

        if (CONNECT_LEFT.includes(pipe)) {
          const posLeft = [x, y - 1];
          const pipeLeft = getCharFromPosition(posLeft, map);
          if (pipeLeft === "S") continue;
          if (!CONNECT_RIGHT.includes(pipeLeft)) {
            map[x][y] = ".";
            hasAdjusted = true;
          }
        }

        if (CONNECT_UP.includes(pipe)) {
          const posUp = [x - 1, y];
          const pipeUp = getCharFromPosition(posUp, map);
          if (pipeUp === "S") continue;
          if (!CONNECT_DOWN.includes(pipeUp)) {
            map[x][y] = ".";
            hasAdjusted = true;
          }
        }

        if (CONNECT_DOWN.includes(pipe)) {
          const posDown = [x + 1, y];
          const pipeDown = getCharFromPosition(posDown, map);
          if (pipeDown === "S") continue;
          if (!CONNECT_UP.includes(pipeDown)) {
            map[x][y] = ".";
            hasAdjusted = true;
          }
        }
      }
    }
  }

  const newMap = new Array(map.length).fill(null).map((_) => new Array(map[0].length).fill("."));

  const navIterator = navigator(map);

  for (const [x, y] of navIterator) {
    newMap[x][y] = map[x][y];
  }

  return newMap;
}

function* navigator(_map) {
  const startingPosition = findTheStartingPosition(_map);

  const map = [..._map.map((m) => [...m])];
  let pos = [...startingPosition];

  yield pos;

  const UP = ["|", "7", "F"];
  const DOWN = ["|", "L", "J"];
  const LEFT = ["-", "F", "L"];
  const RIGHT = ["-", "7", "J"];

  while (true) {
    const [x, y] = pos;
    const posUp = [x - 1, y];
    const posDown = [x + 1, y];
    const posLeft = [x, y - 1];
    const posRight = [x, y + 1];

    if (UP.includes(getCharFromPosition(posUp, map))) {
      map[posUp[0]][posUp[1]] = "S";
      pos = posUp;
    } else if (DOWN.includes(getCharFromPosition(posDown, map))) {
      map[posDown[0]][posDown[1]] = "S";
      pos = posDown;
    } else if (LEFT.includes(getCharFromPosition(posLeft, map))) {
      map[posLeft[0]][posLeft[1]] = "S";
      pos = posLeft;
    } else if (RIGHT.includes(getCharFromPosition(posRight, map))) {
      map[posRight[0]][posRight[1]] = "S";
      pos = posRight;
    } else break;
    map[x][y] = ".";

    yield pos;
  }

  yield startingPosition;
}

function replaceIfDot(map, [x, y], char) {
  if (x < 0) return false;
  if (y < 0) return false;
  if (x >= map.length) return false;
  if (y >= map[0].length) return false;
  if (map[x][y] !== ".") return false;
  map[x][y] = char;
  return true;
}

function drawLeftRightChar(map, [x1, y1], [x2, y2]) {
  if (x1 - x2 === 1) {
    replaceIfDot(map, [x1, y1 + 1], "r");
    replaceIfDot(map, [x2, y2 + 1], "r");
    replaceIfDot(map, [x1, y1 - 1], "l");
    replaceIfDot(map, [x2, y2 - 1], "l");
  } else if (x1 - x2 === -1) {
    replaceIfDot(map, [x1, y1 + 1], "l");
    replaceIfDot(map, [x2, y2 + 1], "l");
    replaceIfDot(map, [x1, y1 - 1], "r");
    replaceIfDot(map, [x2, y2 - 1], "r");
  } else if (y1 - y2 === 1) {
    replaceIfDot(map, [x1 + 1, y1], "l");
    replaceIfDot(map, [x2 + 1, y2], "l");
    replaceIfDot(map, [x1 - 1, y1], "r");
    replaceIfDot(map, [x2 - 1, y2], "r");
  } else if (y1 - y2 === -1) {
    replaceIfDot(map, [x1 + 1, y1], "r");
    replaceIfDot(map, [x2 + 1, y2], "r");
    replaceIfDot(map, [x1 - 1, y1], "l");
    replaceIfDot(map, [x2 - 1, y2], "l");
  }
}

function navigate(map) {
  const navIterator = navigator(map);

  let lastPosition = navIterator.next().value;
  for (const currentPosition of navIterator) {
    drawLeftRightChar(map, lastPosition, currentPosition);
    lastPosition = currentPosition;
  }
}

function fillWithLeftRightChars(map) {
  navigate(map);

  let hasChanged = true;

  while (hasChanged) {
    hasChanged = false;
    for (let x = 0; x < map.length; x++) {
      for (let y = 0; y < map[x].length; y++) {
        let c = map[x][y];

        if (!["r", "l"].includes(c)) continue;

        const posUp = [x - 1, y];
        hasChanged = replaceIfDot(map, posUp, c) || hasChanged;
        const posDown = [x + 1, y];
        hasChanged = replaceIfDot(map, posDown, c) || hasChanged;
        const posLeft = [x, y - 1];
        hasChanged = replaceIfDot(map, posLeft, c) || hasChanged;
        const posRight = [x, y + 1];
        hasChanged = replaceIfDot(map, posRight, c) || hasChanged;
      }
    }
  }

  return map;
}

function drawMap(map) {
  return map
    .map((r) => r.join(""))
    .join("\n")
    .replaceAll(".", " ")
    .replaceAll("-", "─")
    .replaceAll("|", "│")
    .replaceAll("L", "└")
    .replaceAll("F", "┌")
    .replaceAll("J", "┘")
    .replaceAll("7", "┐");
}

const finalMap = drawMap(fillWithLeftRightChars(cleanWrongWays(map)));

console.log(finalMap);

console.log("R", finalMap.split("").filter((c) => c === "r").length);

console.log("L", finalMap.split("").filter((c) => c === "l").length);
