const fs = require("fs");

const input = fs.readFileSync("p1.input", "utf8").split("\r\n");

// const input = [
// 'fourknflljrbrq63five',
// '42onef6seven'
// ]

const NUMBERS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

let total = 0;

for (let line of input) {
  let firstNumber = null;
  let lastNumber = null;
  for (let x = 0; x < line.length; x++) {
    if (firstNumber === null) {
      const substring = line.substring(x);
      const number = NUMBERS.findIndex((n) => substring.startsWith(n)) % 9;
      if (number !== -1) firstNumber = number + 1;
    }
    if (lastNumber === null) {
      const substring = line.substring(0, line.length - x);
      const number = NUMBERS.findIndex((n) => substring.endsWith(n)) % 9;
      if (number !== -1) lastNumber = number + 1;
    }

    if (firstNumber && lastNumber) break;
  }

  total += Number(`${firstNumber}${lastNumber}`);
}

console.log(total);