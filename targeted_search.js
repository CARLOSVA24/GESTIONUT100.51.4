const fs = require('fs');
const text = fs.readFileSync('clean_ordpat.txt', 'utf8');

const targets = [
    "4.",
    "5.",
    "MANDO Y",
    "ADMINISTRACIÓN",
    "CPNV-EMC",
    "FIDEL ERAZO"
];

targets.forEach(t => {
    let index = -1;
    while ((index = text.indexOf(t, index + 1)) !== -1) {
        console.log(`Found "${t}" at index ${index}`);
        console.log(`Context: ${text.substring(index - 50, index + 200)}`);
    }
});
