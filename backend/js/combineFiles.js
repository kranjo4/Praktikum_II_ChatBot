const fs = require('fs');
const path = require('path');

const files = [
    { filename: 'ProstostojeciHladilniki.json', score: 0 },
    { filename: 'VgradniHladilniki.json', score: 0 },
    { filename: 'ZmrzovalniHladilniki.json', score: 0 }
];

const combinedData = [];

function readAndAppend(file) {
    const filePath = path.join(__dirname,'..','json', file.filename);
    if (!fs.existsSync(filePath)) {
        console.error(`Datoteka ni najdena: ${file.filename}`);
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
        console.error(`Napaka pri branju ${file.filename}:`, error);
    }
}

files.forEach(readAndAppend);

const outputFilename = 'json/skup.json';
try {
    fs.writeFileSync(outputFilename, JSON.stringify(combinedData, null, 4), 'utf8');
    console.log(`JSON shranjen v ${outputFilename}`);
} catch (error) {
    console.error(`Napaka pri pisanju ${outputFilename}:`, error);
}
