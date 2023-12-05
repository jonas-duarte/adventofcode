const fs = require("fs");

const input = fs.readFileSync("puzzle1.input", "utf8").split("");

console.log(input.reduce((a, b) => (b === "(" ? a + 1 : a - 1), 0));


