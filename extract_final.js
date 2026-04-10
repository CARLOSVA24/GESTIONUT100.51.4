const fs = require('fs');
const xml = fs.readFileSync('word/document.xml', 'utf8');

// Match everything between <w:t> and </w:t>
const matches = xml.match(/<w:t[^>]*>(.*?)<\/w:t>/g);

if (matches) {
    const cleanTexts = matches.map(m => {
        // Remove the outer tags
        return m.replace(/<w:t[^>]*>/, '').replace(/<\/w:t>/, '');
    });
    
    // Join with spaces
    const result = cleanTexts.join(' ');
    fs.writeFileSync('final_ordpat.txt', result);
    console.log('Final text extracted to final_ordpat.txt');
    
    // Search for sections
    const sections = [
        "1. SITUACIÓN",
        "2. MISIÓN",
        "3. EJECUCIÓN",
        "4. ADMINISTRACIÓN Y LOGÍSTICA",
        "5. MANDO Y COMUNICACIONES"
    ];
    
    sections.forEach(s => {
        const index = result.indexOf(s);
        if (index !== -1) {
            console.log(`Section ${s} found at index ${index}`);
            console.log(`Snippet: ${result.substring(index, index + 500)}`);
        } else {
            // Try normalized search (without spaces in the section number)
            const normS = s.replace(/\s+/g, ' ');
            const nIndex = result.indexOf(normS);
             if (nIndex !== -1) {
                console.log(`Section ${normS} (normalized) found at index ${nIndex}`);
            }
        }
    });
} else {
    console.log('No <w:t> matches found.');
}
