const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const cors = require('cors')
require('dotenv/config')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middlewares
app.use(cors())

//imports and requests
const uri = process.env.DB
//make the database connection

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connection to the database is successful")
}).catch((err) => {
    console.log("error is" + err)
})


app.get('/test', (req, res) => {
    res.json({message : "This is a test route"})
})

const userRouter = require("./routes/UserRouter")
app.use('/user', userRouter)

const userContactRouter = require("./routes/UserContactRouter")
app.use('/contact', userContactRouter)


var port = process.env.PORT || 9001
app.listen(port, function(){
    console.log("server started on PORT ", port)
})

