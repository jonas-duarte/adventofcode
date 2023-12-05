const fs = require("fs");

const input = fs.readFileSync("puzzle2.input", "utf8").split("\r\n");

let total = 0;
for (let line of input) {
  const [l, w, h] = line.split("x").map(Number).sort((a, b) => a - b);
  const ribbon = l + l + w + w + l * w * h;
  total += ribbon;
}

console.log(total);
