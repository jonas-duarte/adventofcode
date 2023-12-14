const fs = require("fs");

const input = fs.readFileSync("p12.input", "utf8").split("\r\n");

const REPEAT = 5;

const springs = [];
for (const line of input) {
  const [m, g] = line.split(" ");
  const groups = new Array(REPEAT).fill(m).join("?").split(".").filter(Boolean);
  const sizes = new Array(REPEAT).fill(g).join(",").split(",").map(Number);
  springs.push({ groups, sizes });
}

function replaceMapAt(map, index, char) {
  return map.map((c, i) => (i === index ? char : c));
}

function navigate(map, jumps, index = 0, jump = 0, cache = new Map()) {
  const isPossibleToJump = !jump;

  if (jump) {
    jump--;
  }

  if (index === map.length) {
    if (jump) return 0;
    if (jumps.length) return 0;
    return 1;
  }

  const totalJumps = (jumps?.length ? jumps.reduce((a, b) => a + b + 1) : 0) + jump;
  const remainingLength = map.length - index;
  if (remainingLength < totalJumps) return 0;

  if (jump) {
    if (map[index] === ".") return 0;
    map[index] = "#";
    return navigate(map, jumps, index + 1, jump, cache);
  }

  if (map[index] === ".") return navigate(map, jumps, index + 1, 0, cache);

  const [curJump, ...nextJumps] = jumps;
  if (map[index] === "#") {
    if (!isPossibleToJump || !curJump) return 0;
    return navigate(map, nextJumps, index + 1, curJump, cache);
  }

  const key = `${jumps.length}|${index}|${jump}`;
  if (isPossibleToJump) {
    const value = cache.get(key);
    if (value !== undefined) {
      return value;
    }
  }

  const map1 = replaceMapAt(map, index, ".");
  const value1 = navigate(map1, jumps, index + 1, 0, cache);

  const map2 = replaceMapAt(map, index, "#");
  const value2 =
    isPossibleToJump && curJump ? navigate(map2, nextJumps, index + 1, curJump, cache) : 0;

  if (isPossibleToJump) cache.set(key, value1 + value2);

  return value1 + value2;
}

console.time("total");
let total = 0;
for (let s = 0; s < springs.length; s++) {
  const { groups, sizes } = springs[s];
  const ways = navigate(groups.join(".").split(""), sizes);
  total += ways;
  console.timeLog("total", `row (${s})`, ways);
}
console.timeLog("total", total);

// 1
// 4
// 1
// 1
// 4
// 10
