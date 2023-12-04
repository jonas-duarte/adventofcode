const fs = require("fs");

const input = fs.readFileSync("puzzle4.input", "utf8").split("\r\n");

const cardLengths = new Array(input.length);
const copies = new Array(input.length).fill(1);

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
  cardLengths.push(matches.length);

  for (let cl = c + 1; cl <= c + matches.length; cl++) {
    copies[cl] += copies[c];
  }
}

console.log(
  copies.reduce((a, b) => a + b)
);
