//Dependencies
const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

//Initialization
const app = express();


//Configuration


//Middleware
app.use(logger('common',{stream: fs.createWriteStream('./logs.txt', {flags:'a'})} ))
app.use(cors())
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin',"*");
//     res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,PATCH,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization, Content-Length");
//     next();
// })
app.use("/picture", express.static(__dirname +"/assets/pics/"))



//Router
app.use('/students', require('./routes/students'));
app.all('*', (req,res)=>{res.send('PAGE NOT FOUND!!!')});

//Error Handler
app.use(function(err,req,res,next){
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') == 'development'? err : {};
    res.status(err.status || 500)
    res.send(err.message)
})

//StartUp
app.listen(4000);