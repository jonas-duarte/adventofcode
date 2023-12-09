const fs = require("fs");

const input = fs.readFileSync("p4.input", "utf8").split("\r\n");

let total = 0;

for (let c = 0; c < input.length; c++) {
  const card = input[c];
  const [cardId, numbers] = card.split(":");
  const [winningNumbers, cardNumbers] = numbers.split("|").map((n) =>
    n
      .split(" ")
      .filter((n) => n.trim())
      .map(Number)
      .sort((a, b) => a - b)
  );

  const matches = cardNumbers.filter((c) => winningNumbers.includes(c));
  const points = matches.length ? Math.pow(2, matches.length - 1) : 0;

  total += points;
}

console.log(total)
