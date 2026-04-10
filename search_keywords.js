const fs = require('fs');
const text = fs.readFileSync('extracted_ordpat.txt', 'utf8');

const keywords = [
    "LOGÍSTICA",
    "MANDO",
    "COMUNICACIONES",
    "INSTRUCCIONES DE COORDINACIÓN",
    "FIRMA",
    "RESERVADO"
];

keywords.forEach(k => {
    const index = text.indexOf(k);
    console.log(`${k} found at index: ${index}`);
    if (index !== -1) {
        console.log(`Snippet: ${text.substring(index, index + 200)}...`);
    }
});
