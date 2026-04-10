const fs = require('fs');
const xml = fs.readFileSync('word/document.xml', 'utf8');
const texts = xml.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
if (texts) {
    const cleanText = texts.map(t => t.replace(/<w:t[^>]*>|<\/w:t>/g, '')).join(' ');
    fs.writeFileSync('extracted_ordpat.txt', cleanText);
    console.log('Text extracted to extracted_ordpat.txt');
} else {
    console.log('No text found');
}
