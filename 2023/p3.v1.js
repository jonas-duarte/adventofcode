const fs = require("fs");

const input = fs
  .readFileSync("p3.input", "utf8")
  .split("\r\n")
  .map((s) => s.split("").map((s) => (s === "." ? null : s)));

const VALID_NUMBERS = "0123456789".split("");

const numbers = [];

function getAdjacentSymbols(input, r, c) {
  for (let _r = r - 1; _r <= r + 1; _r++) {
    if (_r < 0) continue;
    for (let _c = c - 1; _c <= c + 1; _c++) {
      if (_c < 0) continue;
      if (input[_r] && input[_r][_c] && !VALID_NUMBERS.includes(input[_r][_c])) {
        return input[_r][_c];
      }
    }
  }

  return null;
}

for (let r = 0; r < input.length; r++) {
  const row = input[r];

  let number = [];
  let symbol = null;
  for (let c = 0; c < row.length; c++) {
    const value = row[c];
    if (VALID_NUMBERS.includes(value)) {
      number.push(value);
      symbol = symbol || getAdjacentSymbols(input, r, c);
    } else {
      if (number.length > 0 && symbol !== null) {
        numbers.push(number);
      }
      number = [];
      symbol = null;
    }
  }

  if (number.length > 0 && symbol !== null) {
    numbers.push(number);
  }
  number = [];
  symbol = null;
}

console.log(numbers.length)
console.log(numbers.map((n) => Number(n.join(""))).reduce((a, b) => a + b));
