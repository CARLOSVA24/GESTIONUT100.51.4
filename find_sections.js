const fs = require('fs');
const text = fs.readFileSync('extracted_ordpat.txt', 'utf8');

const sections = [
    "1. SITUACIÓN",
    "2. MISIÓN",
    "3. EJECUCIÓN",
    "4. ADMINISTRACIÓN Y LOGÍSTICA",
    "5. MANDO Y COMUNICACIONES"
];

sections.forEach(s => {
    const index = text.indexOf(s);
    console.log(`${s} found at index: ${index}`);
    if (index !== -1) {
        console.log(`Snippet: ${text.substring(index, index + 200)}...`);
    }
});
