const fs = require("fs");

const input = fs.readFileSync("p1.input", "utf8").split("\r\n");

let total = 0;

for (let line of input) {
  let firstNumber = null;
  let lastNumber = null;
  for (let x = 0; x < line.length; x++) {
    if (firstNumber === null && !isNaN(Number(line[x]))) {
      firstNumber = line[x];
    }
    if (lastNumber === null && !isNaN(Number(line[line.length - x - 1]))) {
      lastNumber = line[line.length - x - 1];
    }
  }

  total += Number(`${firstNumber}${lastNumber}`);
}

console.log(total); // 54968
