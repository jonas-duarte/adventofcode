const fs = require("fs");

const input = fs.readFileSync("p7.input", "utf8").split("\r\n");

const cards = [];

const CARDS_ORDER = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"].reverse();

function getType(_hand) {
  const stack = [];

  const hand = [..._hand].sort((a, b) => b - a);

  let card = hand[0];
  let count = 1;
  for (let i = 1; i < hand.length; i++) {
    if (card === hand[i]) {
      count++;
    } else {
      stack.push(count);
      card = hand[i];
      count = 1;
    }
    if (i === hand.length - 1) stack.push(count);
  }

  stack.sort((a, b) => b - a);

  if (stack[0] === 5) return 50;
  if (stack[0] === 4) return 40;
  if (stack[0] === 3 && stack[1] === 2) return 32;
  if (stack[0] === 3) return 30;
  if (stack[0] === 2 && stack[1] === 2) return 22;
  if (stack[0] === 2) return 20;
  if (stack[0] === 1) return 10;
}

for (const line of input) {
  const [_cards, _bid] = line.split(" ");

  const hand = [..._cards.split("").map((a) => CARDS_ORDER.indexOf(a))];
  const type = getType(hand);
  const power = Number(`${type}${hand.map((v) => String(v).padStart(2, "0")).join("")}`);
  cards.push({ hand, power, bid: Number(_bid) });
}

cards.sort((a, b) => a.power - b.power);

console.log(cards)

console.log(cards.map((c, i) => (i + 1) * c.bid).reduce((a, b) => a + b));
