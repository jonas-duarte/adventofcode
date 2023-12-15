const fs = require("fs");

const input = fs.readFileSync("p13.input", "utf8").split("\r\n");

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

function validateMirror(mirror, index1, index2) {
  if (!mirror[index1] || !mirror[index2]) {
    if (index1 === index2 - 1) return false;
    return true;
  }
  if (mirror[index1] === mirror[index2]) return validateMirror(mirror, index1 - 1, index2 + 1);
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
