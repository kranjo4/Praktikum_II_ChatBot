const fs = require('fs');
const path = require('path');

const files = [
    { filename: 'ProstostojeciHladilniki.json', score: 0 },
    { filename: 'VgradniHladilniki.json', score: 0 },
    { filename: 'ZmrzovalniHladilniki.json', score: 0 }
];

const combinedData = [];

function readAndAppend(file) {
    const filePath = path.join(__dirname, file.filename);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${file.filename}`);
        return;
    }

    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (Array.isArray(data)) {
            data.forEach(obj => {
                if (typeof obj === 'object' && obj !== null) {
                    obj.score = file.score;
                    combinedData.push(obj);
                }
            });
        } else if (typeof data === 'object' && data !== null) {
            data.score = file.score;
            combinedData.push(data);
        }
    } catch (error) {
        console.error(`Error reading or parsing file ${file.filename}:`, error);
    }
}

files.forEach(readAndAppend);

const outputFilename = 'js/skup.json';
try {
    fs.writeFileSync(outputFilename, JSON.stringify(combinedData, null, 4), 'utf8');
    console.log(`JSON files combined and saved as ${outputFilename}`);
} catch (error) {
    console.error(`Error writing to file ${outputFilename}:`, error);
}
