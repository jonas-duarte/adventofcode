const fs = require("fs");

const input = fs.readFileSync("p12.input", "utf8").split("\r\n");

const REPEAT = 1;

const springs = [];
for (const line of input) {
  const [m, g] = line.split(" ");
  const groups = new Array(REPEAT).fill(m).join("?").split(".").filter(Boolean);
  const sizes = new Array(REPEAT).fill(g).join(",").split(",").map(Number);
  springs.push({ groups, sizes });
}

function validatePattern(pattern, sizes) {
  const groups = pattern.split(".");

  const result = [];

  let currentGroup = null;
  for (let s = 0; s < sizes.length; s++) {
    const size = sizes[s];

    while (true) {
      currentGroup = groups.shift();

      if (currentGroup === "") {
        result.push("");
        continue;
      }

      if (!currentGroup) break;

      if (currentGroup.length < size && currentGroup.indexOf("#") === -1) {
        result.push(new Array(currentGroup.length).fill(".").join(""));
        continue;
      }

      if (currentGroup.length === size) {
        result.push(currentGroup);
        break;
      }

      if (currentGroup[size] === "?") {
        result.push(currentGroup.substring(0, size));
        const remaining = currentGroup.substring(size + 1);
        if (remaining) groups.unshift(remaining);
        else result.push("");
        break;
      }

      if (currentGroup[0] === "#") {
        
        if (currentGroup[sizes[s - 1]] === "?") {
          const size = sizes[s - 1];
          const lastIndex = result.findLastIndex((c) => c.includes("?") || c.includes("#"));
          result[lastIndex] = new Array(result[lastIndex].length).fill(".").join("");
          result.push(currentGroup.substring(0, size));
          const remaining = currentGroup.substring(size + 1);
          if (remaining) groups.unshift(remaining);
          else result.push("");
          continue;
        }

        return null;
      }

      groups.unshift(currentGroup.substring(1));
      result.push("");
    }
  }

  const groupsStr = groups.join(".");

  const remaining = new Array(groupsStr.length).fill(".").join("");

  return result.filter((s) => s && !s.includes(".")).length === sizes.length
    ? [result.join("."), remaining].filter(Boolean).join(".")
    : null;
}

function checkCombinations(pattern, sizes, startIndex = 0) {
  const result = validatePattern(pattern, sizes);
  if (!result) {
    const indexOfPattern = pattern.indexOf("?", startIndex);

    if (indexOfPattern === -1) return 0;

    let counter = 0;
    const results = [];
    for (let i = indexOfPattern; i < pattern.length; i++) {
      if (pattern[i] !== "?") continue;
      const newPattern = pattern
        .split("")
        .map((c, j) => {
          if (j === i) return ".";
          return c;
        })
        .join("");
      const result = validatePattern(newPattern, sizes)?.replaceAll("?", "#");

      console.log(newPattern, result, pattern.length, newPattern.length);
      if (!result) continue;
      if (results.includes(result)) break;
      const combinations = checkCombinations(newPattern, sizes, i);
      counter += combinations;
      results.push(result);
    }
    return counter;
  }

  let counter = 1;
  let isResultInvalid = false;

  try {
    for (let i = startIndex; i < result.length; i++) {
      if (result[i] === "." && pattern[i] === "#") {
        isResultInvalid = true;
      }
      if (result[i] !== "?") continue;
      const newPattern = pattern
        .split("")
        .map((c, j) => {
          if (j === i) return ".";
          if (j < i && c === "?" && result[j] === "?") return "#";
          return c;
        })
        .join("");
      const combinations = checkCombinations(newPattern, sizes, i);
      counter += combinations;
    }
  } catch (error) {
    console.log("ERROR", pattern);
  }

  if (isResultInvalid) counter--;

  return counter;
}

console.log(".?????????#.#??.?", validatePattern(".?????????#.#??.?", [1, 1, 1, 2, 3]));
return;

console.time("LOG");

let total = 0;
for (let s = 0; s < springs.length; s++) {
  const { groups, sizes } = springs[s];
  const pattern = groups.join(".");
  const combinations = checkCombinations(pattern, sizes);
  console.timeLog("LOG", `ROW (${s}):`, combinations);
  total += combinations;
  // break
}

console.log("TOTAL:", total); // 86

console.timeEnd("LOG");
