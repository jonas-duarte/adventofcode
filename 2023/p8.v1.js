const fs = require("fs");

const input = fs.readFileSync("p8.input", "utf8").split("\r\n");

const navigation = input
  .shift()
  .split("")
  .map((d) => (d === "L" ? 0 : 1));

const map = new Map();

for (const line of input) {
  if (!line) continue;
  const [key, ways] = line.split("=").map((s) => s.trim());
  const [l, r] = ways.replace("(", "").replace(")", "").split(", ");

  map.set(key, [l, r]);
}

let key = "AAA";
let steps = 0;
while (key !== "ZZZ") {
  const direction = navigation[steps % navigation.length];
  console.log(key)
  key = map.get(key)[direction];
  steps++;
}

console.log(steps);
