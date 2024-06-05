const fs = require('fs');
const path = require('path');

const allItems = 'skup.json';
const allQuestionAndAwnsers = 'vprasnjaOdgovori.json';

function readJSON(file) {
    const filePath = path.join(__dirname,'..','json', file);
    if (!fs.existsSync(filePath)) {
        console.error(`Datoteka ni najdena: ${file}`);
        return;
    }

    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if(Array.isArray(data)){
            return data;
        }
    } catch (error) {
        console.error(`Napaka pri branju ${file.filename}:`, error);
    }
}



function calculateScore(scoreArr, answer) {
    console.log(1);
    const products = readJSON(allItems);
    if (!products) return [];

    let newScoreArr = [];

    products.forEach(product => {
        const matchingProduct = scoreArr.find(scoringProduct => scoringProduct.Serijska_stevilka === product.Serijska_stevilka);

        if (matchingProduct) {

            let atribute = answer.atributes
            let newScore = (matchingProduct.score || 0)
            for (let i = 0; i < answer.atributes.length; i++) {
            
                switch (atribute[i].type) {
                    case "number":
                        {
                            let productString = product[atribute[i].atribute]
                            let productValue = product[atribute[i].atribute]
                            if(typeof productString == "string"){
                                let stringArr = productString.split(' ')
                                productValue = stringArr[0]
                            }

                            let currentScore = Math.abs( Math.floor((answer.value[i] - productValue) / 100));
                            newScore += currentScore;
                        }
                        
                        break;
                    case "compare":
                            if(!(answer.value[i] == product[atribute[i].atribute])){
                                newScore += 10
                            }                       
                        break;
                
                    default:
                        break;
                }

             
                
                
            }
            
           
            let curItem = {
                Serijska_stevilka: matchingProduct.Serijska_stevilka,
                score: newScore,
            };

            newScoreArr.push(curItem);
        }
    });

    // console.log(newScoreArr);
    return newScoreArr;
}

module.exports = {
    readJSON,
    calculateScore
};
