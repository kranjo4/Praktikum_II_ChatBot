const express = require("express");
const path = require("path");
const { readJSON, calculateScore } = require("./scoring");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/questions", (req, res) => {
  const questionsAndAnswers = readJSON("vprasnjaOdgovori.json");
  const itemsCurrentScoreRead = readJSON("skup.json");
  let itemsCurrentScore = [];
  if (Array.isArray(itemsCurrentScoreRead)) {
    itemsCurrentScoreRead.forEach((item) => {
      let curItem = {
        Serijska_stevilka: item.Serijska_stevilka,
        score: item.score,
      };

      itemsCurrentScore.push(curItem);
    });
  }

  if (questionsAndAnswers) {
    res.json({
      questionsAndAnswers: questionsAndAnswers,
      itemsCurrentScore: itemsCurrentScore,
      allItems: itemsCurrentScoreRead
    });
  } else {
    res.status(500).json({ error: "Could not read questions and answers" });
  }
});


app.post("/send-answer", (req, res) => {
  const { answer, currentScoreArr } = req.body;


    let newScoreArr = []
    // console.log(currentScoreArr);

    if (currentScoreArr && answer) {
        newScoreArr = calculateScore(currentScoreArr, answer);
        res.json({ answer, newScoreArr });
    } else {
        res.status(500).json({ error: 'Could not read products or questions and answers' });
    }
  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
