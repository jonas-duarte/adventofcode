const fs = require("fs");

const input = fs
  .readFileSync("p3.input", "utf8")
  .split("\r\n")
  .map((s) => s.split("").map((s) => (s === "." ? null : s)));

const VALID_NUMBERS = "0123456789".split("");

const numbers = [];

function getAdjacentSymbols(input, r, c) {
  const symbols = [];

  for (let _r = r - 1; _r <= r + 1; _r++) {
    if (_r < 0) continue;
    for (let _c = c - 1; _c <= c + 1; _c++) {
      if (_c < 0) continue;
      if (input[_r] && input[_r][_c] && !VALID_NUMBERS.includes(input[_r][_c])) {
        symbols.push({ s: input[_r][_c], r: _r, c: _c });
      }
    }
  }

  return symbols;
}

function removeDuplicatedSymbols(symbols) {
  const uniques = [];

  for (let s of symbols) {
    const index = uniques.findIndex((v) => v.s === s.s && v.r === s.r && v.c === s.c);
    if (index === -1) uniques.push(s);
  }

  return uniques;
}
let j = 0;
for (let r = 0; r < input.length; r++) {
  const row = input[r];

  let number = [];
  let symbols = [];
  for (let c = 0; c < row.length; c++) {
    const value = row[c];
    if (VALID_NUMBERS.includes(value)) {
      number.push(value);
      symbols.push(...getAdjacentSymbols(input, r, c));
    } else {
      if (number.length > 0 && symbols.length > 0) {
        numbers.push({
          v: Number(number.join("")),
          s: removeDuplicatedSymbols(symbols),
        });
      }
      number = [];
      symbols = [];
    }
  }

  if (number.length > 0 && symbols.length > 0) {
    numbers.push({
      v: Number(number.join("")),
      s: removeDuplicatedSymbols(symbols),
    });
  }
  number = [];
  symbols = [];
}

console.log(numbers.length); // 1071

const totals = new Map();
const keyCounter = new Map();
for (let n of numbers) {
  const s = n.s[0];
  if(s.s !== "*") continue;
  const key = `${s.s}|${s.r}|${s.c}`;
  let total = totals.get(key);
  if (total) {
    if (s.s === "*") {
      totals.set(key, total * n.v);
    } else {
      totals.set(key, total + n.v);
    }
    keyCounter.set(key, 999)
  } else {
    totals.set(key, n.v);
    keyCounter.set(key, 1)
  }

  console.log(s, n.v, totals.get(key))
}

// 529618

console.log(keyCounter)

let total = 0;
for (let [k, v] of totals) {
  if(keyCounter.get(k) !== 999) continue;
  total += v;
}
console.log(total); // ex: 467835
