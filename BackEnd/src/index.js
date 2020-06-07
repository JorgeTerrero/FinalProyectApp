const express = require('express');
const app = express();
const {mongoose} = require('./mongoDB');
const morgan = require('morgan');
//middleware
app.use(morgan('dev'));
app.use(express.json());

//imports middleware
app.use(require('./util/imports'));

app.listen(3000 , err =>{
    if(err) throw err;
    console.log('LISTEN ON PORT 3000');
});