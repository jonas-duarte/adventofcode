const fs = require("fs");

const input = fs.readFileSync("p14.input", "utf8").split("\r\n");

const map = input[0].split("").map((_, i) =>
  input
    .map((c) => c[i])
    .reverse()
    .join("")
);

let total = 0;
for (const row of map) {
  const groups = row.split("#");

  for (let g = 0; g < groups.length; g++) {
    const splittedGroup = groups[g].split("");
    groups[g] =
      splittedGroup.filter((c) => c === ".").join("") +
      splittedGroup.filter((c) => c === "O").join("");
  }

  const finalRow = groups.join("#").split("");

  for (let i = 0; i < finalRow.length; i++) if (finalRow[i] === "O") total += i + 1;
}

console.log(total);
