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
    console.log("connection to DB is successfull")
}).catch((err) => {
    console.log("error is" + err)
})

/***************************************************************/
//here lets look at the routers part of it
//app.get -> to get
//app.post -> to add essentially
//app.delete -> to dlt

app.get('/test', (req, res) => {
    res.send("Tests is succesful right")
})

const userRouter = require("./routes/UserRouter")
app.use('/user', userRouter)

// const adminRouter = require("./routes/Admin")
// app.use('/admin', adminRouter)

app.listen(9001, function(){
    console.log("server started on PORT 9001")
})

