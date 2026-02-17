let express = require('express')
let cors = require('cors')
require('dotenv').config()

let { GoogleGenerativeAI } = require('@google/generative-ai')

let app = express()

app.use(cors()) // middleware to use cors
app.use(express.json())

let genAI = new GoogleGenerativeAI(process.env.api_key)
let model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

//api 
app.post('/ask', async (req, res) => {
    let { query } = req.body
    let data = await model.generateContent(query)
    let result = data.response.text()
    res.send({
        status: true,
        message: "generate content sucessfull",
        result
    })
})

const port = 8000
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
});