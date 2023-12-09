const fs = require("fs");

const input = fs.readFileSync("p8.input", "utf8").split("\r\n");

const navigation = input
  .shift()
  .split("")
  .map((d) => (d === "L" ? 0 : 1));

const map = new Map();
const startingKeys = [];

for (const line of input) {
  if (!line) continue;
  const [key, ways] = line.split("=").map((s) => s.trim());
  const [l, r] = ways.replace("(", "").replace(")", "").split(", ");

  map.set(key, [l, r]);
  if (key.endsWith("A")) startingKeys.push(key);
}

// let keys = [...startingKeys];
// let steps = 0;
// while (!keys.every((k) => k.endsWith("Z"))) {
//   for (let k = 0; k < keys.length; k++) {
//     const key = keys[k];
//     const direction = navigation[steps % navigation.length];
//     keys[k] = map.get(key)[direction];
//   }

//   steps++;
// }

// console.log(steps);

const waysSteps = [];
for (let key of startingKeys) {
  let steps = 0;
  while (true) {
    const direction = navigation[steps % navigation.length];
    key = map.get(key)[direction];
    steps++;

    if (key.endsWith("Z")) console.log(steps);

    if (steps > 100000) break;
  }

  waysSteps.push(steps);
  break;
}

console.log(waysSteps);
// const totalSteps = waysSteps.reduce((a, b) => a * b);

function findFactors(n) {
  const factors = [];
  let number = n;
  if (number % 2 === 0) {
    factors.push(2);
    number /= 2;
  }

  for (let f = 3; f < Math.sqrt(n) + 1; f += 2) {
    if (number % f === 0) {
      factors.push(f);
      number /= f;
    }
  }

  factors.push(number);

  return factors;
}

const factors = waysSteps.map(findFactors); //.flat();

// TODO: fix bug in case some factor is (81) => [3, 9, 3]
const uniqueFactors = [...new Set(factors.flat())];

console.log(uniqueFactors.reduce((a, b) => a * b));
