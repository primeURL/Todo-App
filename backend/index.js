const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const connectToMongo = require('./db')
const todoRoutes = require('./routes/index')
const PORT = process.env.PORT || 8000;

connectToMongo()

app.use(cors())
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.send('Inside index.js')
})

app.use("/todos", todoRoutes);


app.listen(PORT,()=>console.log('Server started at port 8000'))