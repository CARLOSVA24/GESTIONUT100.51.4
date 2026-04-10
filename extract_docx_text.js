const fs = require('fs');
const xml = fs.readFileSync('temp_docx_extract/word/document.xml', 'utf8');
const texts = xml.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
if (texts) {
    const cleanText = texts.map(t => t.replace(/<w:t[^>]*>|<\/w:t>/g, '')).join('\n');
    fs.writeFileSync('extracted_ordpat_format.txt', cleanText);
    console.log('Text extracted to extracted_ordpat_format.txt');
} else {
    console.log('No text found');
}
