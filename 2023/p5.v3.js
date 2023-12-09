console.time("TEMPO: ");

const fs = require("fs");

const input = fs.readFileSync("p5.input", "utf8").split("\r\n");

const seedRanges = input.shift().split(": ")[1].split(" ").map(Number);

const ranges = [];
for (let i = 0; i < seedRanges.length; i += 2) {
  ranges.push([seedRanges[i], seedRanges[i] + seedRanges[i + 1] - 1, 0]);
}

const mappings = new Map();

let key = "";
for (const line of input) {
  if (!line) continue;

  if (line.includes("map:")) {
    key = line.split(" ")[0];
    mappings.set(key, []);
    continue;
  }

  const [to, from, range] = line.split(" ").map(Number);
  mappings.get(key).push([to, from, range]);
}

const CULTIVE_STEPS = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
];

function getDestinationDiff(mapping, source) {
  for (const [to, from, range] of mapping) {
    if (source >= from && source < from + range) {
      return to - from;
    }
  }

  return 0;
}

function getNextRanges(step, ranges) {
  const mapping = mappings.get(step);

  let breakPoints = [];

  for (let m = 0; m < mapping.length; m++) {
    const [to, from, range] = mapping[m];
    breakPoints.push(from, from + range);
  }

  breakPoints = [...new Set(breakPoints)].sort((a, b) => a - b);

  const nextRanges = [];

  for (let r = 0; r < ranges.length; r++) {
    let [min, max] = ranges[r];

    for (let b = 0; b < breakPoints.length; b++) {
      const breakPoint = breakPoints[b];

      if (breakPoint < min) continue;
      if (breakPoint > max) continue;

      const destinationDiff = getDestinationDiff(mapping, min);
      nextRanges.push([min + destinationDiff, breakPoint - 1 + destinationDiff]);
      min = breakPoint;
    }

    const destinationDiff = getDestinationDiff(mapping, min);
    nextRanges.push([min + destinationDiff, max + destinationDiff]);
  }

  return nextRanges;
}

function calculateRanges(ranges) {
  for (const step of CULTIVE_STEPS) {
    ranges = getNextRanges(step, ranges);
  }
  return ranges.sort((a, b) => a[0] - b[0]);
}

const result = calculateRanges(ranges);
console.log(result[0][0], result.length);

console.timeEnd("TEMPO: ");
