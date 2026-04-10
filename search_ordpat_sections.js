const fs = require('fs');
const xml = fs.readFileSync('word/document.xml', 'utf8');

// Clean XML: replace all tags with spaces and normalize whitespace
const cleanText = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

const targets = [
    "4. ADMINISTRACIÓN Y LOGÍSTICA",
    "5. MANDO Y COMUNICACIONES",
    "RESERVADO",
    "FIRMA",
    "COMANDANTE EN JEFE",
    "GUAYAQUIL"
];

targets.forEach(t => {
    const index = cleanText.indexOf(t);
    if (index !== -1) {
        console.log(`Found "${t}" at index ${index}`);
        console.log(`Context: ${cleanText.substring(index - 50, index + 500)}`);
    } else {
        // Try without spaces in the section number
        const altT = t.replace(/^\d\.\s/, (match) => match.trim());
        const altIndex = cleanText.indexOf(altT);
        if (altIndex !== -1) {
            console.log(`Found "${altT}" at index ${altIndex}`);
            console.log(`Context: ${cleanText.substring(altIndex - 50, altIndex + 500)}`);
        }
    }
});
