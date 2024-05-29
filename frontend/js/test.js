document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/questions')
        .then(response => response.json())
        .then(data => {
            const questionsRes = data.questionsAndAnswers;
            window.sessionStorage.setItem("score", JSON.stringify(data.itemsCurrentScore));
            window.sessionStorage.setItem("questions", JSON.stringify(questionsRes));
            window.sessionStorage.setItem("items", JSON.stringify(data.allItems));

            let questionIndex = 0;

            const displayNextQuestion = () => {
                const questionsContainer = document.getElementById('questions-container');
                questionsContainer.innerHTML = '';
                if (questionIndex < questionsRes.length) {
                    const question = questionsRes[questionIndex];
                    const questionElement = document.createElement('div');
                    questionElement.innerHTML = `<h2>${question.question}</h2>`;
                    const atributes = question.atributes
                    question.awnsers.forEach(answer => {
                        const answerElement = document.createElement('button');
                        let pickedAwnser = {
                            atributes,
                            value: answer.value

                        }

                        answerElement.addEventListener('click', () => {
                            sendAnswer(pickedAwnser, () => {
                                questionIndex++;
                                displayNextQuestion();
                                displayFridges()
                            });
                        });
                        
                        answerElement.textContent = answer.text;
                        questionElement.appendChild(answerElement);
                    });

                    questionsContainer.appendChild(questionElement);
                } else {
                    questionsContainer.innerHTML = '<h2>Ni vec vprasanj</h2>';
                }
            };

            displayNextQuestion();
        })
        .catch(error => console.error('Error fetching questions:', error));
});


function sendAnswer(answer, callback) {
    const currentScoreArr = JSON.parse(window.sessionStorage.getItem('Fridges'));
    console.log(answer.value);

    const data = {
        answer,
        currentScoreArr
    };

    fetch('http://localhost:3000/send-answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        window.sessionStorage.setItem("score", JSON.stringify(result.newScoreArr));
        callback(); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayFridges() {
    const sortedScore = sortByAbsoluteScore(JSON.parse(window.sessionStorage.getItem('score')))
    const container = document.getElementById('topItems')
    container.innerHTML = ""
    for (let i = 0; i < 20; i++) {

        const element = sortedScore[i];
        let div = document.createElement('div')
        div.innerHTML = `${element.Serijska_stevilka}: ${element.score}`
        container.appendChild(div)
        
    }
    
}

function sortByScoreDescending(arr) {
    return arr.sort((a, b) => b.score - a.score);
}

function sortByAbsoluteScoreDescending(arr) {
    return arr.sort((a, b) => Math.abs(b.score) - Math.abs(a.score));
}

function sortByAbsoluteScore(arr) {
    return arr.sort((a, b) => Math.abs(a.score) - Math.abs(b.score));
}