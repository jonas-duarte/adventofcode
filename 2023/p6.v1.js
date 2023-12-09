const fs = require("fs");

const input = fs.readFileSync("p6.input", "utf8").split("\r\n");

const times = input[0]
  .split(":")[1]
  .split(" ")
  .filter((a) => a.trim());

const records = input[1]
  .split(":")[1]
  .split(" ")
  .filter((a) => a.trim());

const races = [[times.join(""), records.join("")].map(Number)];

let waysToWin = 1;

for (let race of races) {
  const [time, record] = race;

  const times = [];

  for (let i = parseInt(time / 2); i >= 0; i--) {
    const min = i;
    const max = time - i;

    const distance = min * max;

    if (distance <= record) break;

    times.push(distance);
    if (min !== max) times.push(distance);
  }

  waysToWin *= times.length;
  //   break;
}

console.log(waysToWin);
