const XLSX = require('xlsx');
const path = 'PLANIFICACIÓN GT. 100-51 CODESC 14 MAR 2026.xlsx';

try {
    const workbook = XLSX.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, {header: 1});
    
    const fs = require('fs');
    let out = `SHEET NAME: ${sheetName}\n\n`;
    data.slice(0, 100).forEach((row, i) => {
        const line = row.map(cell => String(cell || "").replace(/\n/g, " ")).join(" | ");
        out += `L${i}: ${line}\n`;
    });
    fs.writeFileSync('xlsx_output.txt', out);
    console.log("Output written to xlsx_output.txt");
} catch (e) {
    console.error("Error reading excel:", e.message);
}
