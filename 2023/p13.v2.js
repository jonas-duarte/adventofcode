const fs = require("fs");

const input = fs
  .readFileSync("p13.input", "utf8")
  .replaceAll(".", "0")
  .replaceAll("#", "1")
  .split("\r\n");

function* getMirrorsFromInput() {
  let mirror = [];
  for (const line of input) {
    if (!line) {
      yield mirror;
      mirror = [];
      continue;
    }

    mirror.push(line);
  }

  yield mirror;
}

const mirrors = [...getMirrorsFromInput()];

function validateMirror(mirror, index1, index2, hasFoundTheError = false) {
  if (!mirror[index1] || !mirror[index2]) {
    if (index1 === index2 - 1) return false;
    return hasFoundTheError;
  }
  const comparison = String(Math.abs(Number(mirror[index1]) - Number(mirror[index2])))
    .split("")
    .filter(Number).length;

  if (comparison === 0 || comparison === 1) {
    if (comparison === 1 && hasFoundTheError) return false;
    return validateMirror(mirror, index1 - 1, index2 + 1, hasFoundTheError || comparison === 1);
  }
  return false;
}

let total = 0;
for (const mirror of mirrors) {
  let h = 0;
  for (let i = 0; i < mirror.length; i++) {
    if (validateMirror(mirror, i, i + 1)) {
      h = i + 1;
      break;
    }
  }

  const verticalMirror = mirror[0].split("").map((_, i) => mirror.map((c) => c[i]).join(""));

  let v = 0;
  for (let i = 0; i < verticalMirror.length; i++) {
    if (validateMirror(verticalMirror, i, i + 1)) {
      v = i + 1;
      break;
    }
  }

  total += h * 100 + v;
}

console.log(total);

// console.log(validateMirror(mirrors[1], VALUE, VALUE + 1));
