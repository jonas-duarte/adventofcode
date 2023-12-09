const fs = require("fs");

const input = fs.readFileSync("p2.input", "utf8").split("\r\n");

const gamePowerLevels = [];

function getGameSet(gameRounds) {
  const gameSet = new Map();
  for (const round of gameRounds) {
    const cubes = round.split(", ").map((v) => v.split(" "));

    for (const [v, k] of cubes) {
      const c = gameSet.get(k) ?? 0;
      if (v > c) {
        gameSet.set(k, Number(v));
      }
    }
  }

  return gameSet;
}

for (const line of input) {
  const [game, values] = line.split(": ");
  const gameRounds = values.split("; ");

  const gameSet = getGameSet(gameRounds);

  gamePowerLevels.push(gameSet.get("red") * gameSet.get("blue") * gameSet.get("green"));
}

console.log(gamePowerLevels);

console.log(gamePowerLevels.reduce((a, b) => a + b));
