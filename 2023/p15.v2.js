const fs = require("fs");

const input = fs.readFileSync("p15.input", "utf8").split(",");

function hashString(str, value = 0) {
  if (!str) return value;
  const newValue = ((value + str.charCodeAt(0)) * 17) % 256;
  return hashString(str.substring(1), newValue);
}

const lens = new Map();

for (let index = 0; index < input.length; index++) {
  const str = input[index];
  if (str.includes("=")) {
    const [label, value] = str.split("=");
    lens.set(label, value);
  } else if (str.includes("-")) {
    const label = str.replace("-", "");
    lens.delete(label);
  }
}

let total = 0;

const boxes = new Map();

for (const [label, value] of lens) {
  const boxId = hashString(label);
  const slot = boxes.get(boxId) ?? 1;
  const power = value * slot * (boxId + 1);
  boxes.set(boxId, slot + 1);
  total += power;
}

console.log(total);