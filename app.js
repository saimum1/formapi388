const express = require("express");
const app = express();
const cors= require('cors');
const postRouter=require('./routes/post');

require('./config');




app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());



app.use("/api/posts" , postRouter);



module.exports=app;