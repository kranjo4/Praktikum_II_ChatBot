const express = require('express')
const axios = require('axios')
const router = express.Router()

const getChat = async (question) => {
    if (!question) return;
    const payload = {
        model: "testNeuralChat",
        prompt: question,
        stream: false
    };
    try {
        const response = await axios.post("http://127.0.0.1:11434/api/generate", payload);
        console.log('API response:', response);
        return response?.data;
    } catch (error){
        console.log("error", error)
        return "";
    }
}

router.post("/generate", async (req, res) => {
    const {question} = req.body;
    const answer = await getChat(question);
    res.json({answer});
})




module.exports = router;
