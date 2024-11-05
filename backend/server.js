const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./utilities/db');
require('dotenv').config()


const app = express();

app.use(cors({
    origin:['http://127.0.0.1:3000','http://localhost:3000'],
    credentials:true
}))

app.use(bodyParser.json())
app.use(cookieParser())

//app.get('/',(req,res)=>res.send('server up and running'))
app.use('/api',require('./routes/authRoutes'))
const port = process.env.PORT

dbConnect()

app.listen(port,()=>{
    console.log(`server started on ${port}`)
})