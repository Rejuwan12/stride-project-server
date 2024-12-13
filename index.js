const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app =express();
const port = process.env.PORT || 4000

// middleware
app.use(cors())
app.use(express.json())

//mongodb




//api

app.get('/',(req,res)=>{
    res.send('server is running')
});

app.listen(port,()=>{
    console.log(`server is runnung on ${port}`)
})