const fs = require("fs");

const input = fs
  .readFileSync("p11.input", "utf8")
  .split("\r\n")
  .map((r) => r.split(""));

const emptyRows = [];
for (let r = 0; r < input.length; r++) {
  if (input[r].every((c) => c === ".")) emptyRows.push(r);
}

const emptyColumns = [];
for (let c = 0; c < input[0].length; c++) {
  if (input.every((r) => r[c] === ".")) emptyColumns.push(c);
}

const positions = [];

for (let r = 0; r < input.length; r++) {
  for (let c = 0; c < input[r].length; c++) {
    const char = input[r][c];

    if (char === "#") positions.push([r, c]);
  }
}

let total = 0;

for (let i = 0; i < positions.length; i++) {
  for (let j = i + 1; j < positions.length; j++) {
    const [r1, c1] = positions[i];
    const [r2, c2] = positions[j];

    total += Math.abs(r1 - r2);
    total += Math.abs(c1 - c2);

    total += emptyRows.filter((r) => Math.min(r1, r2) < r && Math.max(r1, r2) > r).length * 999999;
    total +=
      emptyColumns.filter((c) => Math.min(c1, c2) < c && Math.max(c1, c2) > c).length * 999999;
  }
}

console.log(positions.length, total); // 8410
