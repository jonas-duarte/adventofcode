const fs = require("fs");
const { join } = require("path");

const input = fs.readFileSync("p16.input", "utf8").split("\r\n");

const map = input.map((r) => r.split(""));

const DIRECTION = {
  UP: "^",
  DOWN: "v",
  RIGHT: ">",
  LEFT: "<",
};

const BLOCK = {
  EMPTY: ".",
  ENERGIZED: "#",
  ENERGIZED_V: "V",
  ENERGIZED_H: "H",
  S_VERTICAL: "|",
  S_HORIZONTAL: "-",
  M_R_UP_L_DOWN: "/",
  M_R_DOWN_L_UP: "\\",
};

function navigate(map, [r, c, d], energized = undefined) {
  if (!energized) {
    energized = [...map].map((r) => r.map(() => BLOCK.EMPTY));
  }

  const block = map?.[r]?.[c];

  if (!block) return energized;

  const energizedBlock = energized?.[r]?.[c];

  if (!energizedBlock) return energized;

  if (energizedBlock === BLOCK.ENERGIZED && block === BLOCK.EMPTY) return energized;

  if ([DIRECTION.UP, DIRECTION.DOWN].includes(d)) {
    if (energizedBlock === BLOCK.ENERGIZED_V && block === BLOCK.EMPTY) return energized;
    energized[r][c] = energizedBlock === BLOCK.EMPTY ? BLOCK.ENERGIZED_V : BLOCK.ENERGIZED;
  } else if ([DIRECTION.LEFT, DIRECTION.RIGHT].includes(d)) {
    if (energizedBlock === BLOCK.ENERGIZED_H && block === BLOCK.EMPTY) return energized;
    energized[r][c] = energizedBlock === BLOCK.EMPTY ? BLOCK.ENERGIZED_H : BLOCK.ENERGIZED;
  }

  switch (d) {
    case DIRECTION.UP:
      switch (block) {
        case BLOCK.S_HORIZONTAL:
          navigate(map, [r, c - 1, DIRECTION.LEFT], energized);
          navigate(map, [r, c + 1, DIRECTION.RIGHT], energized);
          break;
        case BLOCK.M_R_DOWN_L_UP:
          navigate(map, [r, c - 1, DIRECTION.LEFT], energized);
          break;
        case BLOCK.M_R_UP_L_DOWN:
          navigate(map, [r, c + 1, DIRECTION.RIGHT], energized);
          break;
        default:
          navigate(map, [r - 1, c, DIRECTION.UP], energized);
          break;
      }
      break;
    case DIRECTION.DOWN:
      switch (block) {
        case BLOCK.S_HORIZONTAL:
          navigate(map, [r, c + 1, DIRECTION.RIGHT], energized);
          navigate(map, [r, c - 1, DIRECTION.LEFT], energized);
          break;
        case BLOCK.M_R_DOWN_L_UP:
          navigate(map, [r, c + 1, DIRECTION.RIGHT], energized);
          break;
        case BLOCK.M_R_UP_L_DOWN:
          navigate(map, [r, c - 1, DIRECTION.LEFT], energized);
          break;
        default:
          navigate(map, [r + 1, c, DIRECTION.DOWN], energized);
          break;
      }
      break;
    case DIRECTION.LEFT:
      switch (block) {
        case BLOCK.S_VERTICAL:
          navigate(map, [r - 1, c, DIRECTION.UP], energized);
          navigate(map, [r + 1, c, DIRECTION.DOWN], energized);
          break;
        case BLOCK.M_R_DOWN_L_UP:
          navigate(map, [r - 1, c, DIRECTION.UP], energized);
          break;
        case BLOCK.M_R_UP_L_DOWN:
          navigate(map, [r + 1, c, DIRECTION.DOWN], energized);
          break;
        default:
          navigate(map, [r, c - 1, DIRECTION.LEFT], energized);
          break;
      }
      break;
    case DIRECTION.RIGHT:
      switch (block) {
        case BLOCK.S_VERTICAL:
          navigate(map, [r + 1, c, DIRECTION.DOWN], energized);
          navigate(map, [r - 1, c, DIRECTION.UP], energized);
          break;
        case BLOCK.M_R_DOWN_L_UP:
          navigate(map, [r + 1, c, DIRECTION.DOWN], energized);
          break;
        case BLOCK.M_R_UP_L_DOWN:
          navigate(map, [r - 1, c, DIRECTION.UP], energized);
          break;
        default:
          navigate(map, [r, c + 1, DIRECTION.RIGHT], energized);
          break;
      }
      break;
  }

  return energized;
}

let bestResult = 0;

// FROM UP
for (let c = 0; c < map[0].length; c++) {
  const energizedMap = navigate(map, [0, c, DIRECTION.DOWN])
    .map((r) => r.join(""))
    .join("\n");

  const energizedTiles = energizedMap
    .split("")
    .filter((c) => [BLOCK.ENERGIZED, BLOCK.ENERGIZED_H, BLOCK.ENERGIZED_V].includes(c)).length;

  if (energizedTiles > bestResult) bestResult = energizedTiles;
}

// FROM DOWN
for (let c = 0; c < map[0].length; c++) {
  const energizedMap = navigate(map, [map.length - 1, c, DIRECTION.UP])
    .map((r) => r.join(""))
    .join("\n");

  const energizedTiles = energizedMap
    .split("")
    .filter((c) => [BLOCK.ENERGIZED, BLOCK.ENERGIZED_H, BLOCK.ENERGIZED_V].includes(c)).length;

  if (energizedTiles > bestResult) bestResult = energizedTiles;
}

// FROM LEFT
for (let r = 0; r < map.length; r++) {
  const energizedMap = navigate(map, [r, 0, DIRECTION.RIGHT])
    .map((r) => r.join(""))
    .join("\n");

  const energizedTiles = energizedMap
    .split("")
    .filter((c) => [BLOCK.ENERGIZED, BLOCK.ENERGIZED_H, BLOCK.ENERGIZED_V].includes(c)).length;

  if (energizedTiles > bestResult) bestResult = energizedTiles;
}

// FROM RIGHT
for (let r = 0; r < map.length; r++) {
  const energizedMap = navigate(map, [r, map.length - 1, DIRECTION.LEFT])
    .map((r) => r.join(""))
    .join("\n");

  const energizedTiles = energizedMap
    .split("")
    .filter((c) => [BLOCK.ENERGIZED, BLOCK.ENERGIZED_H, BLOCK.ENERGIZED_V].includes(c)).length;

  if (energizedTiles > bestResult) bestResult = energizedTiles;
}

console.log(bestResult)