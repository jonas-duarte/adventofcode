const fs = require("fs");

const input = fs.readFileSync("p14.input", "utf8").split("\r\n");

function spinMap(map) {
  return map[0].split("").map((_, i) =>
    map
      .map((c) => c[i])
      .reverse()
      .join("")
  );
}

function roll(map) {
  const newMap = [];
  for (const row of map) {
    const groups = row.split("#");

    for (let g = 0; g < groups.length; g++) {
      const splittedGroup = groups[g].split("");
      groups[g] =
        splittedGroup.filter((c) => c === ".").join("") +
        splittedGroup.filter((c) => c === "O").join("");
    }

    const finalRow = groups.join("#").split("");

    newMap.push(finalRow.join(""));
  }

  return newMap;
}

const CICLES = 1000000000;

let cache = new Set();

let firstRepeat = null;
let repeatEach = null;

let last = 0;

let map = input;
for (let i = 0; i < 4 * CICLES; i++) {
  map = spinMap(map);
  map = roll(map);

  if (i % 4 == 3) {
    const result = map.join("\n");
    if (cache.has(result)) {
      if (!firstRepeat) firstRepeat = (i + 1) / 4;
      else {
        repeatEach = (i + 1 - last) / 4;
        break;
      }
      last = i + 1;
      cache = new Set();
      cache.add(result);
      continue;
    }
    cache.add(result);
  }
}

console.log({ firstRepeat, repeatEach });

const optimizedCicles = (CICLES - firstRepeat) % repeatEach;

console.log(optimizedCicles);

map = [...cache][0].split("\n");
for (let i = 0; i < 4 * optimizedCicles; i++) {
  map = spinMap(map);
  map = roll(map);
}

function countBeams(map) {
  let total = 0;
  for (let r = 0; r < map.length; r++) {
    const row = map[r];
    total += row.split("").filter((c) => c === "O").length * (map.length - r);
  }

  return total;
}

console.log(map.join("\n"));

console.log(countBeams(map)); // 64
