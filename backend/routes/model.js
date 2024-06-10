const express = require('express')
const axios = require('axios')
const router = express.Router()

const getChat = async (products) => {
    if (!products) return;
    const payload = {
        model: "gorenjko",
        prompt: products,
        stream: false
    };
    try {
        const response = await axios.post("http://127.0.0.1:11434/api/generate", payload);
        console.log('API response:', response);
        return response?.data;
    } catch (error){
        console.log("error", error)
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        return "";
    }
}

router.post("/generate", async (req, res) => {
    console.log('Received request:', req);
    console.log('Received request body:', req.body);
    const {products} = req.body;
    console.log('Received question:', products);
    const answer = await getChat(products);
    res.json(answer.response);
    console.log('Generated answer:', answer.response);
})




module.exports = router;
