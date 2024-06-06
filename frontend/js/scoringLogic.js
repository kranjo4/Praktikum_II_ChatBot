document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/questions")
    .then((response) => response.json())
    .then((data) => {
      const questionsRes = data.questionsAndAnswers;
      window.sessionStorage.setItem(
        "score",
        JSON.stringify(data.itemsCurrentScore)
      );
      window.sessionStorage.setItem("questions", JSON.stringify(questionsRes));
      window.sessionStorage.setItem("items", JSON.stringify(data.allItems));

      let questionIndex = 0;

      const displayNextQuestion = () => {
        // const questionsContainer = document.getElementById('questions-container');
        // questionsContainer.innerHTML = '';

        const chatMessages = document.querySelector(".chat-messages");
        const messageContainer = document.createElement("div");
        messageContainer.className = "message-container";

        if (questionIndex < questionsRes.length) {
          const question = questionsRes[questionIndex];
          // const questionElement = document.createElement('div');
          // questionElement.innerHTML = `<h2>${question.question}</h2>`;
          const atributes = question.atributes;

          const questionText = document.createElement("div");
          questionText.textContent = question.question;
          questionText.className = "question-text";
          messageContainer.appendChild(questionText);

          const answerContainer = document.createElement("div");
          answerContainer.className = "answer-container";

          question.awnsers.forEach((answer) => {
            const button = document.createElement("button");
            button.textContent = answer.text;
            // console.log(answer);
            button.className = "answer-button";
            // button.onclick = () => handleAnswer(answer, messageContainer);
            answerContainer.appendChild(button);
            // const answerElement = document.createElement('button');
            let pickedAwnser = {
              atributes,
              value: answer.value,
              text: answer.text,
            };

            button.addEventListener("click", () => {
              sendAnswer(pickedAwnser, messageContainer, () => {
                questionIndex++;
                displayNextQuestion();
                displayFridges();
              });
            });

            // answerElement.textContent = answer.text;
            // questionElement.appendChild(answerElement);
            messageContainer.appendChild(answerContainer);
          });
          chatMessages.appendChild(messageContainer);
          // questionsContainer.appendChild(questionElement);
        } else {
          const thanksMessage = document.createElement("div");
          thanksMessage.textContent = "Hvala za vaše odgovore!";
          thanksMessage.className = "thanks-message";
          chatMessages.appendChild(thanksMessage);
          // questionsContainer.innerHTML = '<h2>Ni vec vprasanj</h2>';
        }
      };

      displayNextQuestion();
    })
    .catch((error) => console.error("Error fetching questions:", error));
});

function sendAnswer(answer, messageContainer, callback) {
  const currentScoreArr = JSON.parse(window.sessionStorage.getItem("score"));
  // console.log(answer.value);
  // console.log(answer);
  const userAnswer = document.createElement("div");
  userAnswer.textContent = "Izbran odgovor: " + answer.text;
  userAnswer.className = "user-answer";
  messageContainer.appendChild(userAnswer);

  Array.from(document.querySelectorAll(".answer-button")).forEach((button) => {
    button.remove();
  });

  const data = {
    answer,
    currentScoreArr,
  };

  fetch("http://localhost:3000/send-answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      window.sessionStorage.setItem(
        "score",
        JSON.stringify(result.newScoreArr)
      );
      callback();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayFridges() {
  const sortedScore = sortByAbsoluteScore(
    JSON.parse(window.sessionStorage.getItem("score"))
  );
  const container = document.getElementById("topItems");
  // container.innerHTML = ""
  for (let i = 0; i < 3; i++) {
    // const element = sortedScore[i];
    // let div = document.createElement('div')
    // div.innerHTML = `${element.Serijska_stevilka}: ${element.score}`
    // container.appendChild(div)
    //TODO da bo odvisn od score

    const fridgeList = document.getElementById("fridge-list");
    const data = JSON.parse(window.sessionStorage.getItem("items"));
    let currentPosition = 0;

    function showFridges(startIndex, endIndex) {
      fridgeList.innerHTML = "";

      for (let i = startIndex; i < Math.min(endIndex, data.length); i++) {
        const fridge =  data.find(item => item.Serijska_stevilka === sortedScore[i].Serijska_stevilka);
        // console.log(fridge);
        // const fridge = data[i];
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
                    
            <div class=up_row>

                    <div class=img_container>
                        <a href="${fridge.Več_informacij}"><img src="${fridge.Slika}" alt="Slika hladilnika ${fridge.Ime_hladilnika}"></a>
                    </div>

                    <div class=stats_container>
                        <h2 class="fridge-name">${fridge.Ime_hladilnika} - ${fridge.Serijska_stevilka}</h2> 
                        <div class="fridge-specs">
                            Razred energijske učinkovitosti: ${fridge.Razred_energijske_učinkovitosti}, 
                            Način postavitve: ${fridge.Način_postavitve}, 
                            Širina izdelka: ${fridge.Širina_izdelka},
                            Višina izdelka: ${fridge.Višina_izdelka}
                        </div>
                    </div>

                </div>

                <div class=efficency-class>
                    <p>${fridge.Razred_energijske_učinkovitosti}</p>
                </div>

                <div class=bottom_row>
                    <div class=checkbox>
                        
                    </div>
                    <div class=stats_container>
                        <div class="price-old">€ ${fridge.Redna_Cena}</div>
                        <div class="price-new">€ ${fridge.Trenutna_Cena}</div>
                    </div>
                </div>
                
            </div>
              
              `;
        fridgeList.appendChild(productElement);
      }
    }

    showFridges(currentPosition, currentPosition + 3);

    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    prevButton.addEventListener("click", function () {
      if (currentPosition > 0) {
        currentPosition -= 1;
        showFridges(currentPosition, currentPosition + 3);
      }
    });

    nextButton.addEventListener("click", function () {
      if (currentPosition + 3 < data.length) {
        currentPosition += 1;
        showFridges(currentPosition, currentPosition + 3);
      }
    });
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

document.getElementById("chatbotButton").addEventListener("click", function () {
  document.getElementById("chatbotContainer").style.visibility = "visible";
});

document
  .getElementById("chatbotButton1")
  .addEventListener("click", function () {
    document.getElementById("chatbotContainer").style.visibility = "visible";
  });

document
  .getElementById("chatbotButtonClose")
  .addEventListener("click", function () {
    document.getElementById("chatbotContainer").style.visibility = "hidden";
  });
