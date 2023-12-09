const fs = require("fs");

const input = fs.readFileSync("p5.input", "utf8").split("\r\n");

const seedRanges = input.shift().split(": ")[1].split(" ").map(Number);

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

function getDestinationFromSource(step, source) {
  const mapping = mappings.get(step);

  for (const [to, from, range] of mapping) {
    if (source >= from && source < from + range) {
      return to + (source - from);
    }
  }

  return source;
}

function getLocation(source) {
  let result = source;
  for (let step = 0; step < CULTIVE_STEPS.length; step++) {
    result = getDestinationFromSource(CULTIVE_STEPS[step], result);
  }
  return result;
}

let lowerLocation = Infinity;
for (let i = 0; i < seedRanges.length; i += 2) {
  const s = seedRanges[i];
  const r = seedRanges[i + 1];

  console.log(`***** RANGE ${i / 2} (${r}) START *****`);

  for (let seed = s; seed < s + r; seed++) {
    const location = getLocation(seed);
    if (location < lowerLocation) {
      lowerLocation = location;
    }
  }

  console.log(lowerLocation);

  console.log(`***** RANGE ${i / 2} END *****`);
}

console.log("FINAL RESULT", lowerLocation); // 2254686
