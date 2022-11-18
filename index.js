const app=require("./app");
require('dotenv').config();
const port =process.env.PORT || 1000;
const express=require('express')


const cors= require('cors');
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/' , (req ,res)=>{

    res.status(200).sendFile(__dirname + '/view/index.html');
})

app.listen(port , ()=>{
    console.log(`running at http://localhost:${port}`)
})