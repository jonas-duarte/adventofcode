const fs = require("fs");

const input = fs.readFileSync("p9.input", "utf8").split("\r\n");

function findDiff(numbers) {
  const diff = [];
  for (let i = 1; i < numbers.length; i++) {
    diff.push(numbers[i] - numbers[i - 1]);
  }
  return diff;
}

function predictNextNumber(numbers) {
  const diff = findDiff(numbers);

  if (diff.every((n) => n === diff[0])) {
    return numbers[numbers.length - 1] + diff[0];
  }

  return predictNextNumber(diff) + numbers[numbers.length - 1];
}

let total = 0;
for (const line of input) {
  const numbers = line.split(" ").map(Number).reverse();
  total += predictNextNumber(numbers);
}

console.log(total); // 114
