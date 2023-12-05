const fs = require("fs");

const input = fs.readFileSync("puzzle1.input", "utf8").split("");

let value = 0;
for (let i = 0; i < input.length; i++) {
    value += input[i] === "(" ? 1 : -1;

    if (value === -1) {
        console.log(i + 1);
        break;
    }    
}



