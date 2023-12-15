const fs = require("fs");

const input = fs.readFileSync("p15.input", "utf8").split(",");

function hashString(str, value = 0) {
  if (!str) return value;
  const newValue = ((value + str.charCodeAt(0)) * 17) % 256;
  return hashString(str.substring(1), newValue);
}

let total = 0;
for (const str of input) {
  total += hashString(str);
}
console.log(total);
