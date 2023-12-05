const fs = require("fs");

const input = fs.readFileSync("puzzle2.input", "utf8").split("\r\n");

let total = 0;
for (let line of input) {
  const [l, w, h] = line.split("x");
  const s = [l * w, w * h, l * h];
  const calc = s.reduce((a, b) => a + b * 2, 0) + Math.min(...s);
  total += calc;
}

console.log(total);
