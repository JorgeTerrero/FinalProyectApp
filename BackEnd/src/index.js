const express = require('express');
const app = express();
const morgan = require('morgan');
//middleware
app.use(morgan());
app.use(express.json());

app.listen('3000' , err =>{
    if(err) throw err;
    console.log('LISTEN ON PORT 3000');
});