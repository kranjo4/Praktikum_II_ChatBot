const express = require('express')
const app = express()

app.get("/",(req,res)=>{
    res.send("DELA")
})

const modelRouter = require('./routes/model')

app.use('/model', modelRouter)
app.listen(3000)