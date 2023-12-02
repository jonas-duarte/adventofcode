const fs = require("fs");

const input = fs.readFileSync("puzzle2.input", "utf8").split("\r\n");

const BAG = {
  red: 12,
  green: 13,
  blue: 14,
};

const gameIds = [];

function isRoundPossible(round) {
  const cubes = round.split(", ").map((v) => v.split(" "));

  const gameTotals = new Map();
  for (const [v, k] of cubes) {
    const c = gameTotals.get(k) ?? 0;
    gameTotals.set(k, c + Number(v));
  }

  return Object.keys(BAG).every((k) => BAG[k] >= (gameTotals.get(k) ?? 0));
}

for (const line of input) {
  const [game, values] = line.split(": ");
  const gameRounds = values.split("; ");

  if (gameRounds.every(isRoundPossible)) {
    const [_, gameId] = game.split(" ");
    gameIds.push(Number(gameId));
  }
}

console.log(gameIds.reduce((a, b) => a + b));
