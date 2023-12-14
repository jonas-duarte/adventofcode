const fs = require("fs");

const input = fs.readFileSync("p12.input", "utf8").split("\r\n");

const springs = [];

for (const line of input) {
  const [_map, _groups] = line.split(" ");
  const map = _map.split(".").filter(Boolean);
  const groups = _groups.split(",").map(Number);
  springs.push({ map, groups });
}

function findMapCombinations(submap) {
  if (submap.indexOf("?") === -1) return [submap];

  return [
    ...findMapCombinations(submap.replace("?", ".")),
    ...findMapCombinations(submap.replace("?", "#")),
  ];
}

function matchCombinations(combination, combinations, groups) {
  if (combinations.length === 0) {
    const finalCombination = combination.split(".").filter(Boolean);
    if (
      groups.length === finalCombination.length &&
      groups.every((g, i) => g === finalCombination[i].length)
    ) {
      return [combination];
    } else {
      return [];
    }
  }

  const [combinationSet, ...otherCombinations] = combinations;

  const matches = [];
  for (const combinationOpt of combinationSet) {
    const newMatches = matchCombinations(
      `${combination}.${combinationOpt}`,
      otherCombinations,
      groups
    );
    matches.push(...newMatches);
  }

  return matches;
}

function findCombinations(springRow) {
  const map = [...springRow.map];

  const combinations = [];
  for (const submap of map) {
    const subMapCombinations = findMapCombinations(submap);
    combinations.push(subMapCombinations);
  }

  return matchCombinations("", combinations, springRow.groups);
}

let total = 0;
for (const row of springs) {
  const combinations = findCombinations(row);
  console.log(combinations.length)
  total += combinations.length;
}

console.log(total)
