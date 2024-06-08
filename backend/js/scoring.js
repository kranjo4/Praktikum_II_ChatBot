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
    const products = readJSON(allItems);
    if (!products) return [];

    let newScoreArr = [];
    products.forEach(product => {
        const matchingProduct = scoreArr.find(scoringProduct => scoringProduct.Serijska_stevilka === product.Serijska_stevilka);

        if (matchingProduct) {

            let atributes = answer.atributes
            let newScore = (matchingProduct.score || 0)
            for (let i = 0; i < answer.atributes.length; i++) {
                let atribute = atributes[i]
                let curAtribute = atribute.atribute
                switch (atribute.type) {
                    case "number":
                        {
                            let productString = product[curAtribute]
                            let productValue = product[curAtribute]
                            if(typeof productString == "string"){
                                let stringArr = productString.split(' ')
                                productValue = stringArr[0]
                            }
                            let tenPercent = answer.value[i] * 0.10

                            let currentScore = (Math.abs(productValue - answer.value[i]) / tenPercent);

                            // if (productValue > answer.value[i]) {
                            //     currentScore *= 2;
                            // }
            
                            newScore += currentScore;
                        }
                        
                        break;
                    case "compare":
                            if(!(answer.value[i] == product[curAtribute])){
                                newScore += 10
                            }                       
                        break;
                    
                    case "class":
                        if(answer.value[i] == "Yes"){

                            let sortedClass = (getUniqueRazredHrupa(products, curAtribute)).sort()
                            
                            for (let i = 0; i < sortedClass.length; i++) {
                                if(product[curAtribute] == sortedClass[i]){
                                    newScore += i*2
                                }
                                
                            }
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

function getUniqueRazredHrupa(products, atributes) {
    const uniqueValues = new Set();

    products.forEach(product => {
        if (product[atributes]) {
            uniqueValues.add(product[atributes]);
        }
    });

    return Array.from(uniqueValues);
}


module.exports = {
    readJSON,
    calculateScore
};
