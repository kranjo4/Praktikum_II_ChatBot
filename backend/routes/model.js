const express = require('express')
const axios = require('axios')
const router = express.Router()

router.post("/generate", async (req, res) => {
    const {prompt} = req.body;

    try {
        const response = await axios.post('http://localhost:11434/api/generate', {
            prompt: prompt,
            model: "testNeuralChat"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let data = '';

        response.data.on('data', chunk => {
            data += chunk.toString();
        })

        response.data.on('end',()=>{
            res.json(JSON.parse(data))
        })

    }catch (error){
        console.error(error);
        res.status(500).send('Error generating response');
    }
})

module.exports = router
