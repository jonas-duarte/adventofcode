const fs = require("fs");

const map = fs
  .readFileSync("p17.input", "utf8")
  .split("\r\n")
  .map((r) => r.split("").map(Number));

const graph = mapToGraph(map);

function getDestinies(map, [r, c, d]) {
  const destinies = [];
  let totalAfter = 0;
  for (let i = 1; i <= 3; i++) {
    switch (d) {
      case "H":
        const row = r + i;
        if (row < 0 || row >= map.length) break;
        var distance = map?.[row]?.[c];
        totalAfter += distance;
        destinies.push([`${row}|${c}|V`, totalAfter]);
        break;
      case "V":
        const column = c + i;
        if (column < 0 || column >= map[r].length) break;
        var distance = map?.[r]?.[column];
        totalAfter += distance;
        destinies.push([`${r}|${column}|H`, totalAfter]);
        break;
    }
  }

  let totalBefore = 0;
  for (let i = -1; i >= -3; i--) {
    switch (d) {
      case "H":
        const row = r + i;
        if (row < 0 || row >= map.length) break;
        var distance = map?.[row]?.[c];
        totalBefore += distance;
        destinies.push([`${row}|${c}|V`, totalBefore]);
        break;
      case "V":
        const column = c + i;
        if (column < 0 || column >= map[r].length) break;
        var distance = map?.[r]?.[column];
        totalBefore += distance;
        destinies.push([`${r}|${column}|H`, totalBefore]);
        break;
    }
  }

  return destinies;
}

function mapToGraph(map) {
  const graph = new Map();

  for (const d of ["H", "V"]) {
    for (let r = 0; r < map.length; r++) {
      for (let c = 0; c < map[r].length; c++) {
        graph.set(`${r}|${c}|${d}`, getDestinies(map, [r, c, d]));
      }
    }
  }

  return graph;
}

function findNextPath(distanceGraph) {
  return [...distanceGraph.entries()]
    .filter(([key, distance]) => distance && distance !== Infinity)
    .sort((a, b) => a[1] - b[1])?.[0]?.[0];
}

function updateNeighbors(distanceGraph, node) {
  const currentDistance = distanceGraph.get(node);

  const neighbors = graph.get(node);

  for (const [key, distance] of neighbors) {
    const oldDistance = distanceGraph.get(key);
    const newDistance = currentDistance + distance;
    if (newDistance < oldDistance) distanceGraph.set(key, currentDistance + distance);
  }
}

const STARTING_NODES = ["0|0|V", "0|0|H"];

const distanceGraph = new Map();

graph.forEach((v, k) => distanceGraph.set(k, Infinity));

STARTING_NODES.forEach((key) => {
  distanceGraph.set(key, 0);
  updateNeighbors(distanceGraph, key);
});

let currentNode = null;
const LAST_ITEM = `${map.length - 1}|${map[0].length - 1}`;

while (true) {
  currentNode = findNextPath(distanceGraph);

  if (!currentNode || currentNode.startsWith(LAST_ITEM)) break;

  updateNeighbors(distanceGraph, currentNode);

  distanceGraph.set(currentNode, 0);
}

console.log([...distanceGraph.entries()].filter(([k]) => k.startsWith(LAST_ITEM))); // 771
