const fs = require("fs");

const input = fs
  .readFileSync("p11.input", "utf8")
  .split("\r\n")
  .map((r) => r.split(""));

const emptyColumns = [];
for (let c = 0; c < input[0].length; c++) {
  if (input.every((r) => r[c] === ".")) emptyColumns.push(c);
}
emptyColumns.reverse();

const galaxy = [];

for (let r = 0; r < input.length; r++) {
  const row = [...input[r]];
  emptyColumns.forEach((c) => row.splice(c, 0, "."));
  galaxy.push([...row]);
  if (row.every((c) => c === ".")) galaxy.push([...row]);
}

// console.log(galaxy.map((r) => r.join("")).join("\n"));

const positions = [];

for (let r = 0; r < galaxy.length; r++) {
  for (let c = 0; c < galaxy[r].length; c++) {
    const char = galaxy[r][c];

    if (char === "#") positions.push([r, c]);
  }
}

let total = 0;

for (let i = 0; i < positions.length; i++) {
  for (let j = i + 1; j < positions.length; j++) {
    const [x1, y1] = positions[i];
    const [x2, y2] = positions[j];

    total += Math.abs(x1 - x2);
    total += Math.abs(y1 - y2);
  }
}

console.log(positions.length, total);
